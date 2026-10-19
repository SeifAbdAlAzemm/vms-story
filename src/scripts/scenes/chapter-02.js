/* CHAPTER 2 · lifecycle → split into streams → review loop → reconverge */
VMS.scene("ch2", ({ tl, q, qa, at, draw }) => {
  tl.from(q(".c2-lifehead"), { opacity: 0, duration: 0.4 }, at(0) + 0.1);
  tl.from(qa(".stg"), { opacity: 0, y: 22, stagger: 0.06, duration: 0.42 }, at(0) + 0.15);
  // beat 2: split
  tl.from(q(".team-node"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%", duration: 0.35 }, at(1));
  draw(qa(".sp"), at(1) + 0.15, { duration: 0.5, stagger: 0.04 });
  tl.from(qa(".sl"), { opacity: 0, x: -12, stagger: 0.04, duration: 0.4 }, at(1) + 0.3);
  // beat 3: review loop and reconvergence
  tl.from(q(".rl rect"), { opacity: 0, scaleY: 0.8, transformOrigin: "50% 50%", duration: 0.35 }, at(2));
  tl.from(qa(".rl-w"), { opacity: 0, y: 8, stagger: 0.06, duration: 0.3 }, at(2) + 0.1);
  tl.from(q(".rl-arc"), { opacity: 0, duration: 0.3 }, at(2) + 0.35);
  draw(qa(".mg"), at(2) + 0.35, { duration: 0.4, stagger: 0.03 });
  tl.from(q(".base-node"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%", duration: 0.3 }, at(2) + 0.6);
  tl.from(q(".c2-msg"), { opacity: 0, x: 20, duration: 0.4 }, at(2) + 0.5);
  tl.from(q(".unlocks"), { opacity: 0, duration: 0.3 }, at(2) + 0.62);
});
