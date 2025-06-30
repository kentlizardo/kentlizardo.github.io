const observer = new IntersectionObserver(
  ([e]) => e.target.toggleAttribute('data-stuck', e.intersectionRatio < 1),
  { threshold: [1] }
);

export function listenStuck() {
  observer.observe(document.querySelector('.stuck-listen'));
}
