const iconOverrides = {
  '/home': 'sword',
  '/projects': 'hammer',
  '/categories': 'pencil',
  '/tags': 'pencil',
  '/gallery': 'hammer',
  '/archives': 'pencil',
  '/about': 'bubble'
};

const iconPositions = {
  pencil: [0, 0],
  hammer: [1, 0],
  sword: [2, 0],
  bubble: [3, 0],
  none: [0, 1]
};

const currentPath = window.location.pathname;
const lastPathIcon = document.getElementById('lastPathIcon');
const pathIcon = document.getElementById('pathIcon');

const switchIcon = (nextIcon) => {
  const previousIcon = sessionStorage.getItem('pathIcon') || 'none';
  console.log(previousIcon);

  if (pathIcon && lastPathIcon) {
    sessionStorage.setItem('pathIcon', nextIcon);
    console.log(lastPathIcon.style);
    if (previousIcon === 'none') {
      pathIcon.style.setProperty('--sprite-x', iconPositions[nextIcon][0]);
      pathIcon.style.setProperty('--sprite-y', iconPositions[nextIcon][1]);

      void pathIcon.offsetWidth;
      pathIcon.classList.add('fade-in');
    } else if (previousIcon !== nextIcon) {
      pathIcon.style.setProperty('--sprite-x', iconPositions[nextIcon][0]);
      pathIcon.style.setProperty('--sprite-y', iconPositions[nextIcon][1]);
      lastPathIcon.style.setProperty(
        '--sprite-x',
        iconPositions[previousIcon][0]
      );
      lastPathIcon.style.setProperty(
        '--sprite-y',
        iconPositions[previousIcon][1]
      );

      void pathIcon.offsetWidth;
      pathIcon.classList.add('fade-in');
    } else {
      pathIcon.style.setProperty('--sprite-x', iconPositions[nextIcon][0]);
      pathIcon.style.setProperty('--sprite-y', iconPositions[nextIcon][1]);
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  let currentIcon = 'pencil';
  for (const [path, icon] of Object.entries(iconOverrides)) {
    if (currentPath.startsWith(path)) {
      currentIcon = icon;
      break;
    }
  }
  // If project subpath, then switch to hammer.
  if (
    currentPath.startsWith('/projects/') &&
    currentPath.slice(10).length > 0
  ) {
    currentIcon = 'hammer';
  }
  if (currentPath === '/') {
    currentIcon = 'sword';
  }
  switchIcon(currentIcon);
});
