const subpathToKey = {
  '/home': 'sword',
  '/projects': 'hammer',
  '/categories': 'pencil',
  '/tags': 'pencil',
  '/gallery': 'hammer',
  '/archives': 'pencil',
  '/about': 'bubble'
};

const spriteAtlas = {
  pencil: [0, 0],
  hammer: [1, 0],
  sword: [2, 0],
  bubble: [3, 0],
  none: [-1, 0]
};

const lastPathIcon = document.getElementById('lastPathIcon');
const lastPathIconFader = lastPathIcon.parentElement;
const pathIcon = document.getElementById('pathIcon');
const pathIconFader = pathIcon.parentElement;
const bufferPathIcon = document.getElementById('bufferPathIcon');

const blitSpritePos = (sprite, x, y) => {
  sprite.style.setProperty('--sprite-x', x);
  sprite.style.setProperty('--sprite-y', y);
};
const blitSpriteKey = (sprite, key) => {
  if (!key) key = 'none';
  blitSpritePos(sprite, spriteAtlas[key][0], spriteAtlas[key][1]);
};

var hoverIconPair = undefined; // [hovered link, iconkey]

const readIconKey = (url) => {
  if (url === '/') return 'sword';
  let result = 'pencil';
  for (const [basePath, pathKey] of Object.entries(subpathToKey)) {
    if (url.startsWith(basePath)) {
      result = pathKey;
      break;
    }
  }
  const projectDir = '/projects/';
  if (url.startsWith(projectDir) && url !== projectDir) {
    result = 'hammer';
  }
  return result;
};

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

const updatePageIcon = () => {
  if (!pathIcon || !lastPathIcon) return;
  const prevKey = sessionStorage.getItem('pathIconKey') || 'none';
  const nextKey = readIconKey(window.location.pathname);

  if (prevKey === 'none') {
    blitSpriteKey(pathIcon, nextKey);
    void pathIconFader.offsetWidth;
    pathIconFader.classList.add('fade-in');
  } else if (prevKey !== nextKey) {
    blitSpriteKey(pathIcon, nextKey);
    blitSpriteKey(lastPathIcon, prevKey);
    void pathIconFader.offsetWidth;
    pathIconFader.classList.add('fade-in');
  } else {
    blitSpriteKey(pathIcon, nextKey);
  }
  sessionStorage.setItem('pathIconKey', nextKey);
};

var bufferKey = undefined;
var hoverKey = undefined;

const trueUpdateBufferPathIcon = debounce(() => {
  const pageKey = readIconKey(window.location.pathname);
  if (hoverKey === pageKey) {
    pathIcon.classList.add('ping');
    hoverKey = null;
  } else {
    pathIcon.classList.remove('ping');
  }

  if (bufferKey === hoverKey) return;

  bufferPathIcon.classList.remove('enter', 'exit', 'swap');
  if (hoverKey && !bufferKey) {
    // enter
    blitSpriteKey(bufferPathIcon, hoverKey);

    bufferPathIcon.offsetHeight;
    bufferPathIcon.classList.add('enter');
  } else if (!hoverKey && bufferKey) {
    // exit
    blitSpriteKey(bufferPathIcon, bufferKey);

    bufferPathIcon.offsetHeight;
    bufferPathIcon.classList.add('exit');
  } else {
    // swap
    blitSpriteKey(bufferPathIcon, hoverKey);

    bufferPathIcon.offsetHeight;
    bufferPathIcon.classList.add('swap');
  }
  bufferKey = hoverKey;
}, 150);

const updateBufferPathIcon = (key) => {
  hoverKey = key;
  trueUpdateBufferPathIcon();
};

document.addEventListener('DOMContentLoaded', () => {
  updatePageIcon();

  const sidebar = document.getElementById('sidebar');

  sidebar.addEventListener('mouseover', (e) => {
    const anchor = e.target.closest('nav a');
    if (!anchor || anchor.tagName.toLowerCase() !== 'a') return;
    const href = anchor.getAttribute('href');
    if (!href || href.charAt(0) !== '/') return;

    hoverIconPair = [anchor, readIconKey(href)];
    updateBufferPathIcon(hoverIconPair[1]);
  });

  sidebar.addEventListener('mouseout', (e) => {
    const anchor = e.target.closest('nav a');
    if (!anchor || anchor.tagName.toLowerCase() !== 'a') return;
    const href = anchor.getAttribute('href');
    if (!href || href.charAt(0) !== '/') return;

    if (hoverIconPair && hoverIconPair[0] === anchor) hoverIconPair = null;
    updateBufferPathIcon(null);
  });
});
