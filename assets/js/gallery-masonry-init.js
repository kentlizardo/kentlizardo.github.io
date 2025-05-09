var masonry = new MiniMasonry({
  container: '#mediapost-list',
  baseWidth: 300,
  gutterX: 20,
  gutterY: 20,
});

const updateMasonry = function(instance) {
  masonry.layout();
};

imagesLoaded('#mediapost-list', { background: true }, updateMasonry);
imgLoad.on('progress', updateMasonry);
