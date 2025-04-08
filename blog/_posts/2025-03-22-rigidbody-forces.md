---
title: The Player Body Problem - Reverse Force Integration
author: kent
date: 2025-03-22
categories: [Game Development, Devlog]
tags: [godot, physics, c#, devlog]
image:
  path: https://ik.imagekit.io/uwzmgirgsx/01-movement-c02.gif?updatedAt=1742422948119
  content-hide: true
---

Physics-based player mobility is commonly defined by rules and assumptions. Many assumptions and constraints are chosen to simplify the implementation of player controllers. The most common player controller in games is driven by kinematics, where the player's input directly changes velocity and acceleration through calculations decided by the developer.

## Kinematics, Kinetics, and Mechanics

A player with kinematic movement is fine-tuned, quick, and designed to make you feel directly in control; as a result, many of the "forces" seen are generated from nothing. In Unity, the driving component would be known as a **CharacterController**, or in Godot, the **CharacterBody3D** Node. They are able to double jump, change direction in mid-air, go from a standstill to running in one direction, and then backwards the next; they ignore natural forces and momentum.

Common rules include the following:
- Player gravity will always goes down.
- The camera will never roll.
- You can move in the air.
- There is no momentum or drag forces.
- You can change running direction without slowing down.

For my current project, some sequences that needed to be possible involve:
- Standing on a moving platform
- Losing balance on uneven or shifting terrain
- Climb and hang onto a massive flying object
- Push a crushing object off themselves
- Catch themselves when gravity flips
- Nullifying an enemy's gravity to make them immobile
- Switching gravity to leap and attack a large creature
  
This meant I needed a character that could be affected by the forces around them, and I could not use a kinematic controller. However, using a rigidbody-based controller meant I had to be clever with how I moved the player. Adding a constant force to move would feel like moving on ice with no maximum speed. Moving on shifting terrain would be no longer trivial. The rigidbody would also have to balance themselves or lock rotation to stay upright.

Even with all these natural forces, an important rule is that the player **should not** feel powerless. The player should always feel like they have agency over themselves and their actions, ~~in order for you as the developer, to take it away at the right time.~~

> If you've watched Nintendo's [presentation at GDC discussing their "Chemistry" engine](https://www.youtube.com/watch?v=QyMsF31NdNc), this mindset is quite similar to theirs when Breath of the Wild was made. Define a set of rules to make a playground where creative players can find interesting and complex situations that just **work**. I find it funny that the name comes from the term "physics" engine. Would this system be called a "physics" engine as well?
{: .prompt-info }

These sort of natural interactions are not so easily achieved, without first breaking the assumptions.

Some AAA games handle the problem with solutions like active ragdoll and/or pose matching. These implementations usually result in movement that seems drunken or sluggish. If you have enough computing power, you can also simulate the human body's natural locomotion [using machine learning](https://youtu.be/JZKaqQKcAnw?si=T5cGiix0Nm-BLr2Z). However, machine learning in most applications of game development are limited to a small number of places. They make sense for shallow and broad systems, like generating [stories and dialogue](https://www.playsuckup.com/), but for complex systems that the player interacts with frequently, it requires tuning of a system that can be unpredictable or inextensible at times.

The other option is designing around an approximation; a commonly used one is a capsule-shaped player body combined with an animation system handling a broad number of cases to ensure "seamlessness." A very good example of this in-practice is the one used for Very Very Valet. They have a [great video explaining the core mechanics](https://youtu.be/qdskE8PJy6Q?si=fN9Zx_O4-XS__2bI) of their physics controller.

I decided to also use a capsule shape while using a shapecast to detect ground. Damped harmonic oscillation is used to hover the player, and movement is generated with a driving friction force. This is a tried-and-true implementation, frequently used to solve issues like moving up stairs. These decisions provided a good starting point and allowed me to focus on the physics **interactions** instead of **fidelity**. In development, I call this controller the Advanced Player Controller, or APC for short, as it's called in my notes and/or code.

![Showcasing the APC in action](https://ik.imagekit.io/uwzmgirgsx/01-movement-c02.gif?updatedAt=1742422948119)


## Breaking Gravity

The first assumption I needed to break was **gravity**, specifically, what and how gravity is perceived. I could not ignore the natural forces, but I had to design my player states focusing around them. What gravity really is to the player is the ground. It's knowing where they will land after a jump. The key thing is that you don't feel gravity when you're in mid-air, (except for drag.)
So, I designed my player with space in mind.

How would they move in artificial gravity? How does artificial gravity work? How do you stand on the inside of a spinning carnival ride?

It's simple, the effect of gravity is perceived through [a constant acceleration that opposes inertia](https://en.wikipedia.org/wiki/Equivalence_principle).

This led to the real problem. I needed contact forces and impulses; specifically, the normal and friction forces acting on the player. In the end, I had to implement a Rigidbody script handling this process in both Unity and Godot.

### Cursed Contact Impulses

It should have been simple: During the integration step divide the `impulse` by `deltaTime`, and you get force.

In Unity, I had encountered the worst kind of problem: undocumented erroneous behavior, which is almost as bad as undefined behavior. At some point, I found out that in OnCollisionStay, the impulse is flipped if the other collider is a rigid body. Some searching and N hours later, I thought I had found my savior! The *~~Experimental~~ Contacts Modification API*. There was an additional value provided by the extended contacts called, 'frictionForceSum.' Here are some excerpts from my notes after the ordeal.

```md
/// 2024-12-27, 
Noticed inaccuracies in force accumulation. Unity does not include non-normal aligned components of collision impulses.
...
- ContactPoint impulse is still reversed in some cases.
 - Why is `frictionForceSum` not implemented? Why does impulse not include friction?

/// 2024-12-28
## Godot C#
Well, it's never too late to switch. Will test the current APC features in Godot. 
... 
```

What was more unfortunate was that Godot had the same kind of issues with it's contact force API. Some specific collision shapes had the impulse direction completely flipped for no logical reason. In another case, a collision was giving the exact same contact twice when a capsule was colliding with the ground at a single contact point. I then switched to Jolt from Godot's default physics engine, and there were still issues of the same magnitude but slightly different in some way.

> *Jolt does provide the disclaimer that their impulse results are estimations. Estimations were fine, but not results that were completely off base.*

*Calculating forces using contact impulses was almost certainly impossible.*

### Just Solve It, but Backwards

I almost gave up; however, I have the habit of writing any possible solution or method whenever I think of one. There was a backup solution I thought sounded too simple, but I had to try.

> Use change in velocity in order to find acceleration, and find net forces. Subtract ~~gravity acceleration~~ \[passive forces].

What this meant, was that I could find the contact forces by subtracting gravity and all applied forces from the net forces. I made a basic design as to how this would be implemented in Godot.

![Flow chart explaining reverse integration in Godot](https://ik.imagekit.io/uwzmgirgsx/2025-03-22-rigidbody-forces/02?updatedAt=1742667920131)
_Above depicts the flow of control for reverse integration of a Godot Rigidbody3D_

At first, I implemented the solution but it was buggy and perceivably off, which made me think it was incorrect. In testing shortly after, I had found that it was a simple issue: I hadn't accounted for [linear damping](https://github.com/godotengine/godot/blob/2582793d408ade0b6ed42f913ae33e7da5fb9184/modules/godot_physics_3d/godot_body_3d.cpp#L636). ~~Later, I would also find out that I should have used Jolt's damping calculation instead~~. Having done a little tweaking to fix the force solver, it worked!

![Test showing the effect of contact forces with changing gravity](https://ik.imagekit.io/uwzmgirgsx/2025-03-22-rigidbody-forces/06.gif?updatedAt=1742708026718)

Turns out, it was incredibly accurate, provided that other forces acting on a rigidbody's net acceleration were known.

Here is my current code for reverse integration.

```cs
// <-- ApcBody.cs -->
void _IntegrateForces(PhysicsDirectBodyState3D state) {
    // At the start of the integration frame, we calculate the force solver results.
    var forceResult = ForceSolver.Solve(state.LinearVelocity, deltaTime);

    // ... 

    
    // End of the integration frame, we defer data of the current frame to the force solver.
    ForceSolver.Clear();
    var damp = Mathf.Max(1.0f - state.TotalLinearDamp * deltaTime, 0f);
    ForceSolver.LastVelocity = state.LinearVelocity * damp;
    ForceSolver.Mass = 1 / state.InverseMass;
    ForceSolver.PassiveForces += state.TotalGravity * ForceSolver.Mass.Value;
    ForceSolver.PassiveForces += state.GetConstantForce();
}
```


```cs
// <-- ForceSolver.cs -->
public Vector3? LastVelocity { get; set; }  // Nullable to ignore the first frame since there is no previous data.
public Vector3 PassiveForces { get; set; }  // Accumulator for gravity and other constant forces on the Rigidbody.
public float Mass { get; set; }  // In the rare case that the rigidbody will change mass.

public ForceSolverResult Solve(Vector3 currentVelocity, float deltaTime) {
    // Jolt Physics reverse integration
    var velocityDelta = currentVelocity - LastVelocity.Value;
    var acceleration = velocityDelta / deltaTime;
    var netForces = acceleration * Mass.Value;
    var contactForces = netForces - AppliedForces - PassiveForces;

    // ... You may include any other force results like inner ear forces

    return new ForceSolverResult() {
        ContactForces = contactForces,
        // ... Return any values needed to be sent to ApcBody
    };
}
```


## Remaining Issues

Even after all this, there are still some limits to this implementation. The following includes some issues and fixes I had implemented that were required to develop further features of the APC.

### Tracking Applied Forces

Each manual or applied force must be accounted for in order to correctly solve for 'contact' forces so I created a `ForceSolver` class to do so. A problem I encountered was that the applied force from hovering the rigidbody was not included as a reactive force. The best way to solve this was to manually add it to an accumulator, then treat it as if it were a contact force.

All forces meant to approximate contacts like walking or standing had to be added back in the force equation in the reverse integration step. This led to another important step for the APC, defining *idle* and *locomotion* forces. These are force accumulators that have special properties. In order to define these forces, I made an abundant amount of diagrams.

![Diagram depicting general equations for reverse integration](https://ik.imagekit.io/uwzmgirgsx/2025-03-22-rigidbody-forces/04.png?updatedAt=1742668757179){: w="400" }

![Diagram depicting different free body states for a floating capsule](https://ik.imagekit.io/uwzmgirgsx/2025-03-22-rigidbody-forces/03.png?updatedAt=1742668306436){: w="400" }
_The above contains free body diagrams depicting states of a floating capsule rigidbody_

![Slope approximation](https://ik.imagekit.io/uwzmgirgsx/2025-03-22-rigidbody-forces/01.png){: w="400" }
_This diagram depicts an iteration of slope approximation, generalizing slopes and stairs_

I encountered some difficulties for balancing the player controller during the running case. As I spent a decent amount of time finding a way to calculate the specific reactive force generated by an applied force, I found out there is another limitation to this method. Unfortunately, it's impossible to isolate the specific reactive forces for one force accumulator. Reverse integration can only find the sum of *all engine forces.*

### Not All Engine Forces Are Contact Forces

The solver's contact forces will include things like joints or constraints. Theoretically, these could also be 'solved' and added to the reverse integration step (or [maybe exposed to an interface in the future](https://github.com/godotengine/godot-proposals/issues/7672).) This has not become relevant at the moment but it could be a future problem.

### Signal Processing for Impulses

A very chaotic physics system can result in the "force" sum being erratic. If there is a high enough restitution or bounce, the value you're using can misrepresent the amount of forces on the player. I've experimented with a spring damping equation, a moving average, and more. I did some searching around on signal processing for accelerometers and the Kalman filter came up.

However, I could not find a guide or document on Kalman filtering that could easily transfer to our problem domain, (implementing the filter with a Vector3 in Godot.) I also did not want to use a Kalman filter implementation I had found online when I did not understand the algorithm in full. When developing my own projects, I have the mindset of not copying code without knowing what it does. I eventually found and implemented the [OneEuro Filter](https://gery.casiez.net/1euro/) which was completely suitable.

![A debug implementation of OneEuro in 2D](https://ik.imagekit.io/uwzmgirgsx/2025-03-22-rigidbody-forces/05.gif?updatedAt=1742707539971)
_A debug implementation of OneEuro in 2D created to get a better understanding_

![Test showing contact forces when using a filter](https://ik.imagekit.io/uwzmgirgsx/2025-03-22-rigidbody-forces/07.gif?updatedAt=1742708485306)
_The output of OneEuro from contact forces as shown with a purple visual indicator_

![Test showing an artificial gravity situation](https://ik.imagekit.io/uwzmgirgsx/2025-03-22-rigidbody-forces/08.gif?updatedAt=1742709062092)
_In the case of artificial gravity, OneEuro is able to help find a smoother gravity than most filters_

I still have yet to find the "best solution" that can handle the disjointed nature of impulses, but OneEuro is very well-behaved in the tests I have used. I might experiment with using a process similar to how Baumgarte stabilization works; however, investigation will be less of a priority as there is no need to overengineer this since the rest of the game needs to be implemented.
