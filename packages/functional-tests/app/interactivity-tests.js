// Animation configuration

document.addEventListener('DOMContentLoaded', function () {
  LottieInteractivity.create({
    player: '#firstLottie',
    mode: 'scroll',
    actions: [
      {
        visibility: [0, 1.0],
        type: 'seek',
        frames: [0, 300],
      },
    ],
  });

  LottieInteractivity.create({
    player: '#secondLottie',
    mode: 'scroll',
    container: '#MyContainerId',
    actions: [
      {
        visibility: [0, 1.0],
        type: 'seek',
        frames: [90, 123],
      },
    ],
  });

  LottieInteractivity.create({
    player: '#thirdLottie',
    mode: 'scroll',
    actions: [
      {
        visibility: [0, 0.3],
        type: 'stop',
        frames: [50],
      },
      {
        visibility: [0.3, 1.0],
        type: 'seek',
        frames: [50, 240],
      },
    ],
  });

  LottieInteractivity.create({
    player: '#fourthLottie',
    mode: 'scroll',
    actions: [
      {
        visibility: [0, 0.2],
        type: 'stop',
        frames: [0],
      },
      {
        visibility: [0.2, 0.45],
        type: 'seek',
        frames: [0, 45],
      },
      {
        visibility: [0.45, 1.0],
        type: 'loop',
        frames: [45, 60],
      },
    ],
  });

  LottieInteractivity.create({
    player: '#fifthLottie',
    mode: 'scroll',
    actions: [
      {
        visibility: [0, 1.0],
        type: 'loop',
        frames: [70, 500],
      },
    ],
  });

  LottieInteractivity.create({
    player: '#seventhLottie',
    mode: 'cursor',
    actions: [
      {
        position: { x: [0, 1], y: [0, 1] },
        type: 'loop',
        frames: [45, 60],
      },
      {
        position: { x: -1, y: -1 },
        type: 'stop',
        frames: [0],
      },
    ],
  });

  LottieInteractivity.create({
    player: '#eighthLottie',
    mode: 'cursor',
    actions: [
      {
        position: { x: [0, 1], y: [0, 1] },
        type: "seek",
        frames: [0, 288]
      }
    ]
  });

  LottieInteractivity.create({
    player: '#ninthLottie',
    mode: 'cursor',
    actions: [
      {
        position: { x: [0, 1], y: [-1, 2] },
        type: 'seek',
        frames: [0, 180],
      },
    ],
  });

  LottieInteractivity.create({
    player: '#tenthLottie',
    mode: 'cursor',
    actions: [
      {
        type: 'click'
      },
    ],
  });

  LottieInteractivity.create({
    player: '#eleventhLottie',
    mode: 'cursor',
    actions: [
      {
        type: 'hover'
      },
    ],
  });

  LottieInteractivity.create({
    player: '#clickForceFlag',
    mode: 'cursor',
    actions: [
      {
        type: 'click',
        forceFlag: true
      },
    ],
  });

  LottieInteractivity.create({
    player: '#hoverForceFlag',
    mode: 'cursor',
    actions: [
      {
        type: 'hover',
        forceFlag: true
      },
    ],
  });

  LottieInteractivity.create({
    player:'#twelfthLottie',
    mode:"scroll",
    actions: [
      {
        visibility: [0.50, 1.0],
        type: "play"
      },
    ]
  });

  LottieInteractivity.create({
    player:'#visibleAndPlayAgain',
    mode:"scroll",
    actions: [
      {
        visibility: [0.50, 1.0],
        frames: [0, 100],
        type: "loop"
      },
    ]
  });

  LottieInteractivity.create({
    player: '#thirteenthLottie',
    mode: 'cursor',
    actions: [
      {
        type: 'hold'
      }]
  });

  LottieInteractivity.create({
    player: '#fourteenthLottie',
    mode: 'cursor',
    actions: [
      {
        type: 'pauseHold'
      }]
  });

  // use the cursor sync and on frame 30 autoplay the rest
  // of the animation
  LottieInteractivity.create({
    player: '#unlockIphone',
    mode: 'chain',
    actions: [
      {
        state: 'none',
        position: { x: [0, 1], y: [-1, 2] },
        transition: 'seek',
        frames: [0, 30],
      },
      {
        state: 'autoplay',
        transition: 'none',
        frames: [30, 160],
      },
    ],
  });

  LottieInteractivity.create({
    player: '#birdExploding',
    mode: 'chain',
    actions: [
      {
        state: 'loop',
        transition: 'click',
        frames: 'bird'
      },
      {
        state: 'autoplay',
        transition: 'onComplete',
        frames: 'explosion'
      },
      {
        state: 'autoplay',
        frames: 'feathers',
        transition: 'onComplete',
        reset: true
      }
    ],
  })

  LottieInteractivity.create({
    player: '#jumpToTest',
    mode: 'chain',
    actions: [
      {
        state: 'loop',
        transition: 'click',
        frames: [0, 100],
      },
      {
        state: 'autoplay',
        transition: 'onComplete',
        frames: [100, 200]
      },
      {
        state: 'loop',
        loop: 1,
        transition: 'hover',
        frames: [200, 300]
      },
      {
        state: 'loop',
        transition: 'click',
        count: 4,
        frames: [300, 400],
        reset: false
      },
      {
        state: 'loop',
        transition: 'hover',
        count: 4,
        frames: [400, 500],
        reset: false
      },
      {
        state: 'click',
        forceFlag: true,
        transition: 'repeat',
        repeat: 3,
        frames: [500, 600],
      },
      {
        state: 'click',
        forceFlag: false,
        transition: 'repeat',
        repeat: 4,
        frames: [600, 700],
        jumpTo: 3
      }
    ]
  })

  LottieInteractivity.create({
    player: '#clickTest',
    mode: 'chain',
    actions: [
      {
        state: 'click',
        forceFlag: true,
        frames: [0, 70],
        transition: 'click',
        count: 5
      },
      {
        frames: [70, 134],
        state: 'autoplay',
        reset: true,
        transition: 'onComplete'
      }
    ]
  });

  LottieInteractivity.create({
    player: '#hoverTestPlayer',
    mode: 'chain',
    actions: [
      {
        state: 'hover',
        forceFlag: true,
        frames: [0, 70],
        transition: 'click',
        count: 5
      },
      {
        frames: [70, 134],
        state: 'autoplay',
        reset: true,
        transition: 'none'
      }
    ]
  });

  LottieInteractivity.create({
    player: '#clickHoverTestPlayer',
    mode: 'chain',
    actions: [
      {
        state: 'click',
        forceFlag: true,
        frames: [0, 70],
        transition: 'hover',
        count: 5
      },
      {
        frames: [70, 134],
        state: 'autoplay',
        reset: true,
        transition: 'onComplete'
      }
    ]
  });

  LottieInteractivity.create({
    player: '#loadTestPlayer',
    mode: 'chain',
    actions: [
      {
        state: 'autoplay',
        transition: 'onComplete',
      },
      {
        state: 'autoplay',
        reset: false,
        transition: 'onComplete',
        path: './dragon.json'
      },
      {
        state: 'autoplay',
        reset: false,
        transition: 'onComplete',
        path: 'https://assets7.lottiefiles.com/packages/lf20_ISbOsd.json'
      },
      {
        state: 'autoplay',
        reset: false,
        transition: 'onComplete',
        path: 'https://assets5.lottiefiles.com/packages/lf20_nc99k6bp.json'
      },
      {
        state: 'autoplay',
        reset: false,
        transition: 'onComplete',
        path: 'https://assets6.lottiefiles.com/packages/lf20_7ex5ufle.json'
      },
      {
        state: 'autoplay',
        reset: false,
        transition: 'onComplete',
        path: 'https://assets6.lottiefiles.com/packages/lf20_tnt528ff.json'
      },
      {
        state: 'autoplay',
        reset: false,
        transition: 'onComplete',
        path: 'https://assets6.lottiefiles.com/packages/lf20_8sn2ymow.json'
      },
      {
        state: 'autoplay',
        reset: false,
        transition: 'onComplete',
        path: 'https://assets7.lottiefiles.com/packages/lf20_mrg9xhbm.json'
      },
      {
        state: 'loop',
        reset: true,
        transition: 'onComplete',
        path: 'https://assets7.lottiefiles.com/packages/lf20_sefbiwsx.json'
      }
    ]
  });

  LottieInteractivity.create({
    player: '#ignoreResetPlayer',
    mode: 'chain',
    actions: [
      {
        state: 'loop',
        transition: 'click',
        frames: [0, 100],
        reset: true
      },
      {
        state: 'autoplay',
        transition: 'onComplete',
        frames: [100, 200],
        reset: true
      },
      {
        state: 'loop',
        loop: 1,
        transition: 'hover',
        frames: [200, 300],
        reset: true
      },
      {
        state: 'loop',
        transition: 'click',
        count: 4,
        frames: [300, 400],
        reset: true
      },
      {
        state: 'loop',
        transition: 'hover',
        count: 4,
        frames: [400, 500],
        reset: true
      },
      {
        state: 'click',
        forceFlag: true,
        transition: 'repeat',
        repeat: 3,
        frames: [500, 600],
        reset: true
      },
      {
        state: 'click',
        forceFlag: true,
        transition: 'repeat',
        repeat: 4,
        frames: [600, 700],
        jumpTo: 3,
        reset: true
      }
    ]
  });

  LottieInteractivity.create({
    player: '#holdPlayer',
    mode: 'chain',
    actions: [
      {
        state: 'none',
        transition: 'hold',
        frames: [0, 170]
      },
      {
        path: 'https://assets4.lottiefiles.com/packages/lf20_7zara4iv.json',
        state: 'autoplay',
        transition: 'onComplete',
        reset: true
      }
    ]
  });

  LottieInteractivity.create({
    player: '#pauseHoldPlayer',
    mode: 'chain',
    actions: [
      {
        state: 'none',
        transition: 'pauseHold',
        frames: [0, 170]
      },
      {
        path: 'https://assets4.lottiefiles.com/packages/lf20_7zara4iv.json',
        state: 'autoplay',
        transition: 'onComplete',
        reset: true
      }
    ]
  });

  LottieInteractivity.create({
    player: '#dragonSpeedTest',
    mode: 'chain',
    actions: [
      {
        state: 'autoplay',
        transition: 'onComplete',
        speed: 0.5
      },
      {
        state: 'loop',
        transition: 'click',
        path: 'https://assets7.lottiefiles.com/packages/lf20_mrg9xhbm.json',
        speed: 0.5,
        delay: 5000
      },
      {
        state: 'autoplay',
        reset: false,
        transition: 'onComplete',
        delay: 1000,
        speed: 0.5,
        path: 'https://assets7.lottiefiles.com/packages/lf20_ISbOsd.json'
      },
      {
        state: 'autoplay',
        reset: false,
        transition: 'onComplete',
        speed: 1,
        path: 'https://assets5.lottiefiles.com/packages/lf20_nc99k6bp.json'
      },
      {
        state: 'autoplay',
        reset: false,
        transition: 'onComplete',
        delay: 1000,
        speed: 2,
        path: 'https://assets6.lottiefiles.com/packages/lf20_7ex5ufle.json'
      },
      {
        state: 'autoplay',
        reset: false,
        transition: 'onComplete',
        delay: 1500,
        speed: 3,
        path: 'https://assets6.lottiefiles.com/packages/lf20_tnt528ff.json'
      },
      {
        state: 'autoplay',
        reset: false,
        transition: 'onComplete',
        delay: 2000,
        speed: 5,
        path: 'https://assets6.lottiefiles.com/packages/lf20_8sn2ymow.json'
      },
      {
        state: 'autoplay',
        reset: false,
        transition: 'onComplete',
        delay: 3000,
        speed: 10,
        path: 'https://assets7.lottiefiles.com/packages/lf20_mrg9xhbm.json'
      },
      {
        state: 'loop',
        reset: true,
        transition: 'onComplete',
        delay: 5000,
        path: 'https://assets7.lottiefiles.com/packages/lf20_sefbiwsx.json'
      },
      {
        state: 'autoplay',
        transition: 'onComplete',
        speed: 0.5,
        reset: true
      },
      {
        state: 'autoplay',
        transition: 'onComplete',
        speed: 0.1,
        reset: true
      },
    ]
  });

  let listElem = document.getElementById('clickTest');
  listElem.addEventListener('transition', (e) => {
    console.log("Captured event from the 'Click test' example: ");
    console.log(e.detail);
    const evt = new Event("transition");
    window.dispatchEvent(evt);
  });
});
