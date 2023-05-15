
gsap.registerPlugin(MotionPathPlugin);

let targets = gsap.utils.toArray("#icons .icons");
let xdotCenters = [50, 150, 250, 350, 450, 550,
                   50, 150, 250, 350, 450, 550 ];
let ydotCenter =  [112,  82,  52,  52,  82, 112,
                   212, 242, 272, 272, 242, 212];
let maxTravel = 500;
let minTravel = 100;
let mapper = gsap.utils.mapRange(minTravel, maxTravel, 0.5, 1);
let anim;
let activeDot = 0;
let targetDot;
let maxDur = 1;
let maxArc = 150;
let staggers = [0.105, 0.115, 0.115, 0.11, 0.105];

targets.forEach((obj, i) => {
  obj.index = i;
  
  obj.addEventListener("click", letsGoo);
});

function letsGoo() {
  targetDot = this.index;
  if (targetDot != activeDot) {
    if (anim && anim.isActive()) {
      anim.progress(1);
    }

    let oldX = xdotCenters[activeDot];
    let oldy = ydotCenter[activeDot]
    let newX = xdotCenters[targetDot];
    let newy = ydotCenter[targetDot]
    let travel = Math.abs(oldX - newX);
    let factor = mapper(travel);
    let newArc = newy - maxArc * factor;
    let dur = maxDur * factor;
    let newStagger = staggers[travel / 100 - 1];
    console.log(travel / 100 - 1)
    let newPath = `M${oldX},${oldy} Q${
      travel / 2 + Math.min(oldX, newX)
    },${newArc} ${newX},${newy}`;

    gsap.set("#main", { attr: { d: newPath } });
    anim = gsap
      .timeline()
      .to(".jumper", {
        motionPath: {
          path: "#main",
          align: "#main",
          alignOrigin: [0.5, 0.5]
        },
        stagger: newStagger,
        duration: dur,
        ease: "sine.inOut"
      })
      .to(
        ".jumper",
        { duration: dur / 2, attr: { rx: 40, ry: 40 }, yoyo: true, repeat: 1 },
        0
      );
  } else {
    return;
  }

  activeDot = targetDot;
}
