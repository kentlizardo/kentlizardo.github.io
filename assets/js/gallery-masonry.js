FlexMasonry.init('.mediapost-album', {
  responsive: false,
  numCols: 2,
  breakpointCols: {
      'min-width: 1500px': 3,
      'min-width: 700px': 2,
  },
});

const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
          func.apply(this, args);
      }, delay);
  };
}

const forceReload = () => {
  window.requestAnimationFrame(function() {
    FlexMasonry.refreshAll();
  });
}

const forceReloadDebounced = debounce(forceReload, 400);

window.addEventListener('resize', forceReloadDebounced);

if (window.addEventListener) {
  window.addEventListener('load', debounce(forceReload, 200), false);
} else if (window.attachEvent) {
  window.attachEvent('onload', debounce(forceReload, 200));
}
