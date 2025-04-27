---
title: Rasterization Algorithm for Handhold Placement
categories: [Game Development, Devlog]
tags: [godot, algorithm, c#, math, physics, mesh]
description: >-
  Fast analysis of collision trimeshes optimized for physics.
image:
  path: https://ik.imagekit.io/uwzmgirgsx/2025-04-26-rasterization-algo/04_raster_scaling.webm/ik-thumbnail.jpg
  content-hide: true
---

## Context for Mesh Rasterization

For my custom clutch system, I needed to analyze static body meshes in Godot 4 which are typically composed of tri-vertex faces with a possible backface collision.
All **CollisionShape** nodes are analyzed based on their mesh and stored in metadata as **ClutchMeshData**. (*Only concave trimeshes are supported at the moment*)

These edges and faces are then converted into non-discrete agents storing their locations and properties. Spatial info is stored as local offsets and the respective shape node's transform is used to apply to the position when needed, which allows for future space optimization such as *K-D trees* or *ball trees* to be implemented easily. In addition to this, the conversion of mesh data into metadata gives us some versatility and allows us to analyze and bake the clutch data into the scene before runtime.

A second pass is used to determine if an edge is barely convex, if a face is double sided, or if an edge's connected ledge is exposed; which is then used by the clutch system for controlling physics and state behavior.

However, after this analysis, I needed to create a set of points to sample when filtering for the "fall clutch" and "jump clutch" actions which meant I needed to sample
the non-discrete agents **without entering O(n^3)**. I call this process "rasterization," similar to converting vector drawings to pixel drawings; in this case, it is converting
edges and faces to a list of points.

## Greedy Query on ClutchMeshData

First, we filter the mesh data into edges and faces that are within reach. This is determined with a greedy-algorithm based on an origin distance. In the future, we could also optimize this even more by using AABB's for broad phase analysis since for the game this is for involves a large and sparse 3d environment.

{% include embed/video.html src='https://ik.imagekit.io/uwzmgirgsx/2025-04-26-rasterization-algo/01_intro.webm' types='webm' %}
_Showcasing the greedy query with respect to collision shape scaling, distance, and more_

{% include embed/video.html src='https://ik.imagekit.io/uwzmgirgsx/2025-04-26-rasterization-algo/02_greedy.webm' types='webm' %}
_Showcasing the query without rasterized points. Highlighted sections are within range of the origin_

Originally the algorithm was implemented iterating over each vertex but this reached a specific edge case that needed to be solved. If a tri was large enough (where each vertex was farther than the query's corresponding radius), it would not be included by the query, despite the search clearly encompassing the shape agent. In order to solve this, I implemented a method called *FindClosestPoint* in each non-discrete agent to extrapolate closest points from faces and edges.

```cs
// <-- ClutchFaceData.cs -->
public Vector3 GetClosestToPoint(Vector3 localPoint)
{
    var plane = new Plane(Normal, GetCenter());
    var projectedPt = plane.Project(localPoint);
    var barycentric = Geometry3D.GetTriangleBarycentricCoords(projectedPt, PointA, PointB, PointC);
    var ptIsInside = barycentric is { X: >= 0, Y: >= 0, Z: >= 0 };
    if (ptIsInside)
        return projectedPt;
    // Barycentric conditions for whether or not the extrapolated point relies
    if (barycentric.Y <= 0 && barycentric.Z <= 0)
        return PointA;
    if (barycentric.X <= 0 && barycentric.Z <= 0)
        return PointB;
    if (barycentric.X <= 0 && barycentric.Y <= 0)
        return PointC;
    if (barycentric.X <= 0)
        return GeometryUtils.ClosestInEdge(localPoint, PointB, PointC);
    if (barycentric.Y <= 0)
        return GeometryUtils.ClosestInEdge(localPoint, PointA, PointC);
    if (barycentric.Z <= 0)
        return GeometryUtils.ClosestInEdge(localPoint, PointA, PointB);
    throw new UnreachableException("Invalid barycentric coordinates");
}

// <-- ClutchEdgeData.cs -->
public Vector3 GetClosestToPoint(Vector3 localPoint)
{
  // EdgeData is not a half edge structure, meaning its vertices are stored as a minor and major point
  return GeometryUtils.ClosestInEdge(localPoint, Minor, Major);
}

// <-- GeometryUtils.cs -->
public static Vector3 ClosestInEdge(Vector3 point, Vector3 a, Vector3 b)
{
    if (a.IsEqualApprox(b))
      return a;
    var edgeDelta = b - a;
    var t = Mathf.Clamp(edgeDelta.Dot(point - a) / edgeDelta.LengthSquared(), 0f, 1f);
    return a + t * edgeDelta;
}
```

{% include embed/video.html src='https://ik.imagekit.io/uwzmgirgsx/2025-04-26-rasterization-algo/03_large_case.webm' types='webm' %}
_The closest point from each face and edge as shown_

## Rasterization Algorithm

With a query of selected agents, now comes the process of sampling them.

For the edges, it is simple enough: divide the distance from the start to the end point by a **step distance** then create points along those steps.
In my case, I wanted to include the end point for most of the handhold cases, so I checked if the remaining distance was greater than a threshold value, it would add the end point in anyway.

It took some more work for the faces. I started by using the first edge and normal to create a "guide edge". Along this edge, find the mapped height using the second edge which will then give you a "quad" to iterate over. Then check if the point is included in the triangle and if it is, add to the list. With half of the triangle area being misses, this still resulted in O(n\*m) for each face.

![Diagram showing face conversion](https://ik.imagekit.io/uwzmgirgsx/2025-04-26-rasterization-algo/face.png?updatedAt=1745729337286){: height="580" }

> Note, since these agents are stored in local space of the collision node, I also had to keep track of transformations from local space of the mesh to world space.
> This meant I could not just transform a world position to a local position and use the distance comparison since it would not take into account the shape's basis (scale and rotation).
> More importantly, the rasterization algorithm needed to be calculated in world space otherwise they would be based off of the local segment and barycentric coords of the respective agents.
{: .prompt-tip }

{% include embed/video.html src='https://ik.imagekit.io/uwzmgirgsx/2025-04-26-rasterization-algo/04_raster_scaling.webm' types='webm' %}
_The rasterization algorithm properly represents global transforms and allows for adjusting LOD of rasterization_

## Fast Sampling in Action

When this method is used to create **Node3D**s, a large amount of nodes still create staggering performance issues, hinting at the weight of Godot's Node and Object system. Changing these structures into C# objects make the game much less laggier and smoother, but warrants proper handling of object lifetime(s) with respect to the Node tree which is more than trivial.
However, I am pleased with the results.

{% include embed/video.html src='https://ik.imagekit.io/uwzmgirgsx/2025-04-26-rasterization-algo/05_sampling.webm' types='webm' %}
_Grab prompts hook into the clutch system, showing sampled grab points from the camera. Only meshes of a certain group can support clutching on a face_
