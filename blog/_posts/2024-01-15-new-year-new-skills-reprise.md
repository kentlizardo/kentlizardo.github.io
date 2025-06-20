---
title: New Year New Skills Jam Retrospective with Godot 4 (Reprise)
categories: [Game Development, Devlog]
tags: [godot, 2d, devlog, visual novel, jam, reprise]
reprise: https://gamesbykent.itch.io/ol-cupid/devlog/665894/post-jam-retrospective-new-year-new-skills-jam-with-godot-4
---

I don't usually write these sorts of things, but I decided I want to take a step in keeping track of my lessons learned as a game developer. I've participated and submitted to other game jams like Ludum Dare and Mini Jam. If you aren't familiar with the game, it's a visual novel where you work as a corporate "cupid," matching clients together to their alleged soulmate. Development took place over a 7-day time frame, meaning it was actually one of the longest jams I've done. I worked with 1 artist and also asked a mutual friend to do some sketches for various messages in the game.

A list of the tools used:
- Godot 4
- Clip Studio Paint
- Krita
- Aseprite
- VS Code
- Audacity

Here are screenshots of some bugs from during development:

|![Text messages from an NPC with oversized images](https://ik.imagekit.io/uwzmgirgsx/2024-01-15-new-year-new-skills-reprise/texting.png?updatedAt=1749595359598)|![Bug with hundreds of papers cluttering the desk](https://ik.imagekit.io/uwzmgirgsx/2024-01-15-new-year-new-skills-reprise/papers.png?updatedAt=1749595359821)|

## What worked

### Creating a scripting language for "texting"

A basic description of this feature would be a system that converted plaintext .txt files to visual novel dialogue chains.

In more detail, this feature was a Node script that parsed a source file containing a BASIC-like language with branches, labeled instructions, and actor text to create a Node subtree. (Technically, it's more of a compiler because it creates **MessageEvent** nodes that cannot be modified non-destructively after creation, but it's simple enough to just be called a parser.)

I've tackled systems like this in the past since I have researched creating JRPGs in both Godot and Unity, involving complex structures for purposes of dialogue and cutscene events.

The reason this was made was because I had found myself writing in a very simple format for most of my dialogue scripts. It's based on a rough method I use for writing dialogue and cutscenes in a Google Doc: dialogue lines corresponding to actors with notation indicating for certain visual effects (such as a dialogue bubble shaking or bust texture change) and state and data management (changing data flags or calling functions). The format boiled down to the following:

```
Actor Name: "This is a message" (descriptors)
<game_function>
```

Some notable features include:
- If the actor name is omitted, use the last valid actor
- Descriptors used for emotions, game events, or dev notes
- Labeling commands
- Control flow and choices to link to command labels

This parser allowed for easy iteration and rapid conversion to content. I can just input in my prewritten scripts and rerun the Parser node in a debug scene, and it will reflect the changes in-game! It was very neat and satisfying to see it finished. I also really enjoyed designing how it worked and wish I had more experience in lexers, languages, and the like to improve its design and implementation.

### Spending the first 1-2 days conceptualizing and planning

Thinking through the main parts of the game at an early point definitely saved us from a lot of headaches. We were able to get the main mechanics and notable parts of the game loop down pat. It's also generally a good idea to save your energy from programming something you don't need or will completely rewrite later.

### Exporting early

Early on, I tested and played the game solely in Godot's editor. Fortunately, I had learned from a previous jam the hard lesson that I should export and publish a jam entry as soon as a minimum viable prototype is created (I spent the last few hours of a jam stressing over properly exporting a Godot 4 project for C#).

I bit the bullet and exported to web at around the 4th day, which let me find game-breaking and jam-ruining issues such as the DirAccess class not being usable for `res://` files in exported builds. I managed to fix it for the web and standalone builds before the final crunch! I'm still genuinely shocked at how this isn't in the documentation. ~~I'll talk about how I solved this possibly in the future.~~

> **Future Me**:
> Well now is that time... In order to use **DirAccess** in exported standalone and web builds for my jam game before the deadline, I had to make a very quick and dirty solution. **DirAccess** was needed to list all files in a folder for building the actor registry. When a Godot 4 project is exported, those text resources are converted into a different binary format for the .PCK build file. The binary form of these resources are compatible with the simple `load` and`preload` functions and the **ResourceLoader** class, but folder and file structure is not preserved.
>
> A nice-to-have feature was including the text files internally in the game build rather than needing a separate data folder along with the executable file. However, this change is *required* for deploying on web, which is my target export platform for game jams including this one.
>
> My solution at the time was running a tool script that ran functions requiring **DirAccess** in my editor runtime and creating "index" files for each directory I needed to read. These index files stored each filename in the directory, and when pointed to `res://[dir]/index.txt`{: .filepath} in the exported game, could replicate the required **DirAccess** functionality.
>
> This solution does come with obvious limitations such as forgetting to run the editor script, having incorrect index files, keeping old index files, not being able to dynamically choose which folders are used, and more. Nevertheless, when working with a deadline and focus on running code, quick thinking and dirty implementation rewards you with time and effort. It's important to choose your enemies: I only had a small and fixed amount of directories that needed to be searched. Likewise, the user won't appreciate the fact that your feature is clean and modular, if you don't get to implement other ones as a result.
{: .gh-alert.tip }

### Using Trello to organize tasks

Using Trello when a team member had a valuable idea, feature, or bugfix turned out to be very useful. After writing it down into a card, we could easily and visually define the task's priority and whether it was necessary, polish, or just nice to have. It also helped to keep track of asset credits and licenses.

### Programmer art

A common mistake I make is filling my games with rendered art to get a "feel" for how the game should look and play. Although, with having an artist on the team, I was motivated to solely focus on the systems, since we were trying to keep game visually consistent. I spent about most of the week using basic representations of the objects, with the most effort I put into art being a very crude pixel paper icon, and the smallest effort being a white **ColorRect**. When the production assets were ready, swapping in textures was very simple and painless.

### Dedicated time for audio

I have to admit, this is the first time I've done more effort than just using *jsfxr* or simple sound generators for sound design. It definitely paid off: Sound is a huge part of the game's feel and content. The sound of the coffee pouring, the squeak of Mina's halo in the morning cutscene is just so cute and reminds me that some little things do matter a lot. Despite relying on public assets, which isn't shameful at all. Big thanks to all those devs I hear encouraging to use premade assets.

### Using public assets in asset creation

For our game, we used background images from sources like Pexels in order to provide the background for many CGs in our game. Transformative assets can still give a very polished feel if done correctly. It takes effort, technique, and expertise to get effective results when using assets from multiple sources. The techniques used by my team's artist give the game a distinct coziness.

### Embracing bad coding practices

I used a lot of shortcuts towards the end when I realized I couldn't focus on clean implementation over a finished product. A few notable examples are:
- Singletons: Using it for classes like *DataManager* and *Workday* is sensible, but I also had game entities like *ClientProfile*, *Tray*, and more referenced with static references to a single instance.
- Using `get_node()` calls instead of using exported references was quicker, and came with editor support for dragging and dropping nodes directly into the code.
- Frequent redundant is_instance_valid() checks instead of keeping track of non-empty and safe object references

## What didn't work

### Creating a scripting language for "texting"

Yep, despite this being one of the reasons I was able to write and iterate routes very quickly, creating the system *during* the 7-day time frame just took too much work and stress to get working. It didn't translate directly into content which is the main point of a game jam. It ate into much of the time I spent writing, meaning less time for the artist to know what and how to draw (but technically this wouldn't apply if we had a writer on the team). The critical part of a game is not a tool that lets you make content better, but the content itself. 

### Using Godot 4's web export as our sole platform

Some friends tried to stream the game to me after it was done and one of them encountered audio and lag issues along with the console being flooded with thousands of frame output buffer errors. I was stumped on how to fix this since neither I nor my artist had encountered the same errors. 

The colors were also oddly desaturated for some reason. Here's a few examples showing the difference between the web and editor build.

| Web | Standalone |
| --- | --- |
| ![Suitor profile](https://ik.imagekit.io/uwzmgirgsx/2024-01-15-new-year-new-skills-reprise/colors_web.png?updatedAt=1749595357772){: width="300" } | ![Suitor profile with more saturation](https://ik.imagekit.io/uwzmgirgsx/2024-01-15-new-year-new-skills-reprise/colors_standalone.png?updatedAt=1749595357851){: width="340" } |
| ![MC grabs morning coffee](https://ik.imagekit.io/uwzmgirgsx/2024-01-15-new-year-new-skills-reprise/colors_web_2.png?updatedAt=1749595358587){: width="340" }  | ![MC grabs coffee with more color](https://ik.imagekit.io/uwzmgirgsx/2024-01-15-new-year-new-skills-reprise/colors_standalone_2.png?updatedAt=1749595358659){: width="340" }  |

### Using Trello to organize major milestones

Making cards of large tasks didn't help, e.g. creating a "Draft Herring Route" card for a writing character's entire story. We were already aware of that task soon after greenlighting and starting work on it. Tracking large milestones with individual cards weren't all that necessary and cluttered our workflow especially since Trello lacks the hierarchy for sub-cards. The large jobs were finished only after a large and widespread amount of work was complete and we had all the reason to forget about the milestone-only cards. Trello's shallow-style Kanban was more helpful when focused on smaller tasks.

## What we'd do differently

- **Choose a more stable export platform**. Godot 4's export stability and support *is* consistently improving; but in a jam setting, having a guaranteed consistent way to deploy is critical for success. I still use Godot 4 stubbornly because I'm falling in love with how fast the engine improves. I find myself always scouring the Godot Blog for newer features. It's a shame that 3.5 is the better option for web still, considering the disparity in developer experience.
- **Don't force yourself to design & implement an *unfamiliar* system during a short time frame.** This isn't to say that thought-out systems aren't fun to make and test; however, trying to do so in a tight deadline is a recipe for disaster. If you're going to make a visual novel for a jam, it's probably a better idea to use something like RenPy than write your own visual novel engine. A big part of our submission's content as how the world and writing reacted to the player's choices. If we weren't successful in making that feature functional, it would have ruined the entire project. I've made this mistake multible times including trying to make an SRPG in a game jam. It's not a good idea: it's called a *game* jam for a reason, not an engine jam. Although do let me know if any of you readers decide to hold one :P.
- **Smaller scope.** I thought I learned this lesson in the past with previous game jams. It's a mistake I still frequently make, and we thought a game where you match up dates as an office worker would be a very attainable scope for 7 days. In the end we only fully implemented 1 suitor out of the 5 planned with the second suitor (which was actually the final one) only partially. Make the smallest increment of a playable game and expand from there, rather than asking for everything and having to cut down drastically later.

That's pretty much all I can say without going really deep into the technicals. I'll be [open sourcing](https://github.com/kentlizardo/new-year-new-jam) it if you want to take a look at it yourself!
