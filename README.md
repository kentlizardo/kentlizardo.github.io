A customized version of the [Chirpy Jekyll theme](https://chirpy.cotes.page/) to suit a portfolio. You can view the [site here](https://kentmakes.games/). You may refer to the original [repository](https://github.com/cotes2020) before editing.

Differences to the original theme:
- A gallery with responsive masonry and pagination
  - This change required an upgrade to jekyll-paginate-v2 to separate `blog` and `gallery` root category in pagination.
  - A `media.html` layout with an automatic view for image albums, refer to existing gallery posts to how to use the `album` property.
  - The categories, tags, and archives use the `article-icon.html` include to show the root category.
  - MiniMasonry is added to the js-selector and used in the index page.
- Project cards from the `_projects` collection
- Pixel art icon for specific site paths
- Enabled table of contents on the `page.html` layout, set `toc` to true in the frontmater 
