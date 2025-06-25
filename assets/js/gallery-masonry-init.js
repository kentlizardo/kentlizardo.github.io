var masonry = new MiniMasonry({
  container: '#gallery-list',
  baseWidth: 300,
  gutterX: 20,
  gutterY: 20
});

const updateMasonry = function (instance, image) {
  masonry.layout();
};

var imgLoad = imagesLoaded(
  '#gallery-list',
  { background: true },
  updateMasonry
);
imgLoad.on('progress', updateMasonry);
