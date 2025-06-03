---
title: Clutch System Update
categories: [Game Development, Showcase]
tags: [godot, physics, c#, devlog, spacegame]
description: >-
  Videos with brief descriptions showing changes and improvements to a custom clutch system.
image:
  path: https://ik.imagekit.io/uwzmgirgsx/2025-06-03-clutch-update/ledge-integration-v2-2.webm/ik-thumbnail.jpg
  hide_cover: true
---

I've been busy focusing on my career for the past few weeks, but I finally found a moment to show off what the current clutch system looks like. These features were already completed when I took my break from the project, though I have just not had the time to record and edit until now. ~~I'm also using this dev log to refresh my mind on the current state of the project.~~

At some point after I finish adding strafe climbing for faces, I plan on writing a more extensive writeup on my clutch system that will go in-depth including things like diagrams, formal definitions, and the general systems/structures needed to make this work.

## Grab Point Sampling, Filtering, and Ordering

The clutch placement algorithm I made is turning out to be very robust. I have a pipeline for filtering the best possible grabs depending on the inner ear and g-forces acting on the player, in addition to prioritizing certain grab points over others in terms of distance and grab type.

{% include embed/video.html src='https://ik.imagekit.io/uwzmgirgsx/2025-06-03-clutch-update/grab-point-sampling.webm' %}
_Grab point sampling using only distance checking_

I want to allow players to grab __any surface that is relatively accelerating to the player__, so designing the grab control prompts will certainly be a fun challenge.

However, the functionality is already in the current clutch grabbing process on the implementation side! At the moment, it's configured to only do a "fall" grab, which is only checking for surfaces are that are rising relatively to the player while also matching the direction of the player's inner ear gravity.

{% include embed/video.html src='https://ik.imagekit.io/uwzmgirgsx/2025-06-03-clutch-update/grab-point-falling.webm' %}
_Grab point sampling for a fall grab_

> Learning how to develop physics features in 3D with no "up" direction is a real challenge, but it's turning out to be very simple. As long as you are relying on reliable and robust properties and designing with no assumptions, you won't struggle *as much*. I draft all of my cases with relativity in mind, e.g. define different cases for "falling" with different velocities and accelerations for the player and ledge.
> 
> The reason the APC is able to control successfully with only the force properties and types of acceleration is because I originally designed the system to work in an artificial gravity environment.
{: .prompt-tip }

## Ledge Hanging Integration V2

I haven't shown the ledge hanging integration during it's initial phases, but it's largely the same for calculating the target DHFs. This is the second version and it already works well to the formal definitions for climbing that I have defined for each clutch agent and grab type. The ledge hanging integration process is now much more stable (smoother and with no oscillation in torque-based DHFs).

The two types of grabs are flat grabs and full grabs, which are defined by each surface.
A **flat grab** can be described as grabbing onto a completely flat surface, meaning only friction derived from the normal reactive force contributes to the target cross-planar[^cross-planar] grab force.
A **full grab** can be described as grabbing onto an infinitely rough surface to simulate surfaces like nets, grates, and wire fences. In my game, some walkways will be made of a metal grate-like material where the player can grab onto, climb, and hang as the gravity changes or ground shifts.

{% include embed/video.html src='https://ik.imagekit.io/uwzmgirgsx/2025-06-03-clutch-update/ledge-integration-v2-1.webm' %}
_Showing off basic ledge hanging physics and grabbing_

{% include embed/video.html src='https://ik.imagekit.io/uwzmgirgsx/2025-06-03-clutch-update/ledge-integration-v2-2.webm' %}
_The orange surface in the video is fully grabbable while the grey surface can only be flat grabbed. Full grab allows for hanging directly from the ceiling, while the flat grab cannot contribute forces in a certain range of angles determined by the edge/vertex agent._

I'm still trying to find a way to differentiate between hanging from a "ceiling" and "wall" properly, but I think I will make that a property calculated from a special player state with a different approximation model than the normal capsule (Likely two bodies connected by a joint).

> This does require a refactor to allow the APC to change its physics representation when needed, which I surmised the need for a long time ago. On the other hand, simplifying the player physics representation in early stages took priority, as I want to have consistent updates and features added rather than tackling everything all at once.
{: .prompt-info }

## Updated Mantling

Mantling has also been improved a lot, in addition to automatically exiting the mantle state when the surface can support the player. I tested with using several implementations and found a combination of using the force properties and comparing DHF direction with ground direction to be the best. Mantling also supports many slopes as well as major gravitational changes.

{% include embed/video.html src='https://ik.imagekit.io/uwzmgirgsx/2025-06-03-clutch-update/mantling-1.webm' %}
_Basic mantling showcase_

{% include embed/video.html src='https://ik.imagekit.io/uwzmgirgsx/2025-06-03-clutch-update/mantling-2.webm' %}
_Mantling testing different angles with both types of climbing integration functions (flat or full)_

## Strafing onto Edges and Vertices

Key strafes are directions for strafing onto edges and vertices using functions from *ClutchMeshData*. Although hanging onto a face (full grabs) is possible at the moment, the strafe point functions for those have not been implemented yet.
Strafing currently just slides the grab position, which looks smooth, but I am considering using IK and "arms" to control the strafe grab if scope allows for it.

{% include embed/video.html src='https://ik.imagekit.io/uwzmgirgsx/2025-06-03-clutch-update/key-strafing.webm?tr=orig' %}
_Key strafe directions are indicated by the green rays_

[^cross-planar]: The plane orthogonal to the relative fall direction
