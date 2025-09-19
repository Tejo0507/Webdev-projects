 const elements = {
    clawMachine: document.querySelector('.claw-machine'),
    box: document.querySelector('.box'),
    collectionBox: document.querySelector('.collection-box'),
    collectionArrow: document.querySelector('.collection-arrow'),
    toys: [],
  }

  const settings = {
    targetToy: null,
    collectedNumber: 0,
  }
    {
      w: 20 * m,
      h: 27 * m,
    },
    bunny: {
      w: 20 * m,
      h: 29 * m,
    },
    golem: {
      w: 20 * m,
      h: 27 * m,
    },
    cucumber: {
      w: 16 * m,
      h: 28 * m,
    },
    penguin: {
      w: 24 * m,
      h: 22 * m,
    },
    robot: {const m = 2
  const toys = {
    bear:
      w: 20 * m,
      h: 30 * m,
    },
  }

  const sortedToys = [...Object.keys(toys), ...Object.keys(toys)].sort(
    () => 0.5 - Math.random(),
  )

  const cornerBuffer = 16

  const machineBuffer = {
    x: 36,
    y: 16,
  }

  const radToDeg = rad => Math.round(rad * (180 / Math.PI))
  const calcX = (i, n) => i % n
  const calcY = (i, n) => Math.floor(i / n)

  const {
    width: machineWidth,
    height: machineHeight,
    top: machineTop,
  } = document.querySelector('.claw-machine').getBoundingClientRect()

  const { height: machineTopHeight } = document
    .querySelector('.machine-top')
    .getBoundingClientRect()

  const { height: machineBottomHeight, top: machineBottomTop } = document
    .querySelector('.machine-bottom')
    .getBoundingClientRect()
