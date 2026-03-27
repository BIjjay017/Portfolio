import gsap from 'gsap';
import SplitType from 'split-type';

export function splitTextAnimation(selector) {
  const target = document.querySelector(selector);
  if (!target) {
    return null;
  }

  SplitType.revert(selector);
  const split = new SplitType(target, { types: 'chars' });

  gsap.from(split.chars, {
    y: 70,
    opacity: 0,
    stagger: 0.03,
    duration: 0.9,
    ease: 'power3.out',
  });

  return split;
}
