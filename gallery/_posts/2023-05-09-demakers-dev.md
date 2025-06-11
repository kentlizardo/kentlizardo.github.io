---
title: Post-Jam Concept Development (Demakers Game)
categories: [Game Development, Concept]
tags: [godot, experimental, shaders, prototype, fps, 3d]
description: >-
  Exploring concepts to research feasibility and accessibility limitations for a previous game.
album:
  - youtube_id: yGq1T0EjWO8
    caption: A barebones concept of the game's visual aesthetic as "terminal-punk."
  - path: https://ik.imagekit.io/uwzmgirgsx/2023-05-09-dg-c.gif?updatedAt=1743041044328
    alt: Game entity swapping between a 2D sprite and 3D model
    caption: An experimental technique to generate "imposter" billboards for 3d models.
  - gumlet_id: 684894c047693213d0a69688
    collection_id: 683f97652ea48d13d43cfaeb
    caption: Testing visuospatial continuity between billboard representation vs actual scene position. The background UI is a wrapper around the <i>RichTextLabel</i> node, allowing for dynamically changing elements and reactive text with optimized rerendering.
  - gumlet_id: 684894c04c0a4d53c438a0d4
    collection_id: 683f97652ea48d13d43cfaeb
    caption: Performance testing the imposter technique.
  - path: https://ik.imagekit.io/uwzmgirgsx/2023-05-dg-2-c.gif?updatedAt=1743042000681
    alt: Consoles appearing then growing to encompass the screen's full size
    caption: Concept showing what switching consoles would look like if they encompassed the entire viewport. Certain objects are visible only to certain viewports. This was made because the tiny window size for the consoles was limiting in accessibility and usability. It uses multiple viewports, UI shaders, and a buffer to mask the previous and next console's screens to render the scene through their cameras' respective view masks. (A requirement was for certain objects to be visible only to some types of consoles)
---
