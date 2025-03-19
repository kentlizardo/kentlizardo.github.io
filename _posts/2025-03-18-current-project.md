---
title: Static site and current work
author: kent
date: 2025-03-18
categories: [General, Reflection]
tags: [godot, project management, c#, devlog, portfolio, webdev]
---

# Hello Jekyll!

This post is the first post on my new GH pages static site! I already had a minimal blog before using *SvelteKit* and *mdsvex*, but I was limited with what I could add that would be supported by *SvelteKit*'s SSG. This also made it so that I would have to leverage a lot more work to just write markdown posts which was really not my intention at the time. I decided to bite the bullet and use a Jekyll theme.

~~Honestly I'd prefer to use Obsidian with some custom theming but Publish and Quartz don't support themes in their entirety at the moment.~~

I decided to use *Chirpy*! It took me a bit of headscratching to set up the Docker dev container for VS Code properly with Windows but it was not in vain. The theme looks clean and with some tweaking is suitable for the purposes of this portfolio. Having ported over my little animated icon from the previous version, I'm satisfied with what I have now.

> The following features are ones I want to add in the future but I just set up Chirpy at the start of today and it's my first time using Jekyll.
> - [ ] Auto generated project cards and related posts. The pagination setup is a little confusing with how the theme sends the posts. It seems it's linked closely to the index.html in some way and I'll have to dig into the `/_includes/`{: .filepath} folder to find out more.
> - [ ] A bricks based image gallery to link media with metadata such as alt text, that can be embedded from any page. I had trouble setting this up with svelte-img before.

# Game development

I have been putting work on a passion project for a while now. During the school year, work on it was pretty irregular but since my graduation I have been able to put a lot more work on the project. This game was originally created for a jam, but I was not able to finish a working prototype in time. I felt a strong connection to the concept so I decided to make it into a larger game.

Here are some gifs showcasing the current systems.

## Grid based inventory concepts

Here is a silly concept to show irregularly shaped item shapes with slots that can move.

![Irregular shaped inventory concepts](https://ik.imagekit.io/uwzmgirgsx/inventory-test.gif?updatedAt=1742350060048)

At some point, I implemented a custom editor and addon for containers and items. I'm still not entirely satisfied with the workflow and editing interface but I learned a lot from the process.

> From my experience, Godot needs proper separation of editor and runtime behavior before **GDScript** & **C#** tool scripts and addons can be used in larger contexts. Unity supports preprocessing directives which is less ambiguous but there are other reasons why I am using Godot. I'd like to see an option where we can define editor behavior not through the script binding system, but instead apply an 'archetype' script to the type itself so that we can separate code like `_get_property_list()` or `_get_configuration_warnings()` from runtime behavior.
{: .prompt-warning }

![Item occlusion shape editor](/inv-0.gif?updatedAt=1742348943814)

![Vault capacity and mapping editor](/inv-1.gif?updatedAt=1742348943814)

![Ingame view of vault](/inv-2.gif?updatedAt=1742348943814)

## Advanced Player Controller

The feature I'm currently putting a huge amount of work into is a physics based player controller. This feature is such a crucial part of the gameplay that it warranted creating preliminary concepts in both Unity and Godot before finally settling on Godot (with the Jolt Physics Engine).

Safe to say, I'm really satisfied with the current work I've done and the seamlessness of the controller's states. I'd like to write a more extensive post soon about the system so I will leave you with just some screenshots and gifs as well.

![Movement 1](/01-movement-c01.gif?updatedAt=1742422950918)

The player body supports any gravitational force. "Ground" is determined by the direction of G forces applied to the player. The player also can sense "passive" forces similar to the functions of the inner ear, aligning the camera when needed. The forces are determined with a process which I will call "reverse force integration."

Both Unity and Godot do not give access to accurate contact impulse with access to frictional impulses which was necessary for the systems I needed to calculate. However Godot is open-source, which meant I could "reverse integrate" the physics system's effect on the rigidbody's acceleration. This is done by comparing and tracking all applied forces while also determining properties  to the forces applied such as marking a force as a locomotion force. Jolt also helped with the natural stability of the physics system which made things easier.

![Movement 2](/01-movement-c02.gif?updatedAt=1742422948119)

Here are a few clips testing the vaulting system. It's based on shapecast validation. A damped harmonic force is applied to push the player up (similar to the force used to stand) in addition to a frictional force dependent on velocity relative to the surface.

Another neat feature is the more force the player hits the vault with, the momentum is applied to carry over to the vault speed.

![Vaulting 1](/01-vaulting-c01.gif?updatedAt=1742422954984)

A special case happens when the player cancels a vault right when the vault is completed. The previously built velocity allows them to "jump" with more force applied horizontally. Additionally, there is also some directional influence being applied from the player's input direction.

![Vaulting 2](/01-vaulting-c02.gif?updatedAt=1742422949587)

The part of the game I am currently taking a break from working on-in order to add to my portfolio-is the climbing system. Most of it is handled procedurally but not in the way you might think. I took a look at many attempts to recreate the system of Shadow of the Colossus in Unity (which used barycentric coordinates to traverse a climbable mesh) but settled on a simpler approach using mesh analysis. I'm designing the large creatures in my game to be more like how dolls are designed-with fixed rigid parts-since they will be mechanical in nature rather than organic. (This also largely simplifies the implementation as I do not have to support deformation of collision meshes)

Here are a few clips of the current ledge grab integration in the climbing state. This is for a "flat" grab, meaning only forces from the surface's normal and friction force are applicable. The clutches are placed procedurally through analysis of a trimesh which I will go into further detail in a later post.

![Climbing 1](/01-climbing-c01.gif?updatedAt=1742422925303)

The system also works with any direction of gravity. A very cool feature of working with robust systems like the reverse force integration I mentioned earlier is that code created for previous applications can be reused for many things. I reused the first iteration of the "ledge walk" integration (which included damped harmonic forces and drive-based frictional forces on a non centered position of the rigidbody) in order to achieve proper mantling from a ledge grab state.

![Climbing 2](/01-climbing-c02.gif?updatedAt=1742422931262)
