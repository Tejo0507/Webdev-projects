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
  const maxArmLength = machineBottomTop - machineTop - machineBuffer.y

  const adjustAngle = angle => {
    const adjustedAngle = angle % 360
    return adjustedAngle < 0 ? adjustedAngle + 360 : adjustedAngle
  }

  const randomN = (min, max) => {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1))
  }

  //* classes *//

  class Button {
    constructor({ className, action, isLocked, pressAction, releaseAction }) {
      Object.assign(this, {
        el: document.querySelector(`.${className}`),
        isLocked,
      })
      this.el.addEventListener('click', action)
      ;['mousedown', 'touchstart'].forEach(action =>
        this.el.addEventListener(action, pressAction),
      )
      ;['mouseup', 'touchend'].forEach(action =>
        this.el.addEventListener(action, releaseAction),
      )

      if (!isLocked) this.activate()
    }
    activate() {
      this.isLocked = false
      this.el.classList.add('active')
    }
    deactivate() {
      this.isLocked = true
      this.el.classList.remove('active')
    }
  }
    class WorldObject {
    constructor(props) {
      Object.assign(this, {
        x: 0,
        y: 0,
        z: 0,
        angle: 0,
        transformOrigin: { x: 0, y: 0 },
        interval: null,
        default: {},
        moveWith: [],
        el: props.className && document.querySelector(`.${props.className}`),
        ...props,
      })
      this.setStyles()
      if (props.className) {
        const { width, height } = this.el.getBoundingClientRect()
        this.w = width
        this.h = height
      }
      ;['x', 'y', 'w', 'h'].forEach(key => {
        this.default[key] = this[key]
      })
    }
    setStyles() {
     Object.assign(this.el.style, {
        left: `${this.x}px`,
        top: !this.bottom && `${this.y}px`,
        bottom: this.bottom,
        width: `${this.w}px`,
        height: `${this.h}px`,
        transformOrigin: this.transformOrigin,
      })
      this.el.style.zIndex = this.z
    }
    setClawPos(clawPos) {
      this.clawPos = clawPos
    }

    setTransformOrigin(transformOrigin) {
      this.transformOrigin =
        transformOrigin === 'center'
          ? 'center'
          : `${transformOrigin.x}px ${transformOrigin.y}px`
      this.setStyles()
    }

     handleNext(next) {
      clearInterval(this.interval)
      if (next) next()
    }

    resumeMove({ moveKey, target, moveTime, next }) {
      this.interval = null
      this.move({ moveKey, target, moveTime, next })
    }

    resizeShadow() {
      elements.box.style.setProperty('--scale', 0.5 + this.h / maxArmLength / 2)
    }

     move({ moveKey, target, moveTime, next }) {
      if (this.interval) {
        this.handleNext(next)
      } else {
        const moveTarget = target || this.default[moveKey]
        this.interval = setInterval(() => {
          const distance =
            Math.abs(this[moveKey] - moveTarget) < 10
              ? Math.abs(this[moveKey] - moveTarget)
              : 10
          const increment = this[moveKey] > moveTarget ? -distance : distance
          if (
            increment > 0
              ? this[moveKey] < moveTarget
              : this[moveKey] > moveTarget
          ) {
            this[moveKey] += increment
            this.setStyles()
            if (moveKey === 'h') this.resizeShadow()
            if (this.moveWith.length) {
              this.moveWith.forEach(obj => {
                if (!obj) return
                obj[moveKey === 'h' ? 'y' : moveKey] += increment
                obj.setStyles()
              })
            }
          } else {
            this.handleNext(next)
          }
        }, moveTime || 100)
      }
    }
