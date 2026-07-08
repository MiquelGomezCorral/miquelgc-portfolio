"use client"

import { useEffect, useRef } from "react"
import CONFIG from "@/app/[locale]/(utils)/(constants)/configuration"


type Ball = {
  x: number
  y: number
  vx: number
  vy: number
  createdAt: number
  radius: number
  mass: number
  fill: string
  border: string
  shadow: string
}

type BallSpawn = {
  x: number
  y: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function createBall(width: number, height: number, balls: Ball[], spawn?: BallSpawn): Ball {
  const [minRadius, maxRadius] = CONFIG.physicsBallsRadiusLimits
  const [minSpeed, maxSpeed] = CONFIG.physicsBallsSpeedLimits
  const radius = randomBetween(minRadius, maxRadius)
  const hue = CONFIG.physicsBallsPalette[Math.floor(Math.random() * CONFIG.physicsBallsPalette.length)]
  const angle = randomBetween(0, Math.PI * 2)
  const speed = randomBetween(minSpeed, maxSpeed)
  let x = spawn ? clamp(spawn.x, radius, width - radius) : randomBetween(radius, width - radius)
  let y = spawn ? clamp(spawn.y, radius, height - radius) : randomBetween(radius, height - radius)

  if (!spawn) {
    for (let attempt = 0; attempt < CONFIG.physicsBallsSpawnAttempts; attempt++) {
      const overlaps = balls.some((ball) => Math.hypot(ball.x - x, ball.y - y) < ball.radius + radius)
      if (!overlaps) break

      x = randomBetween(radius, width - radius)
      y = randomBetween(radius, height - radius)
    }
  }

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    createdAt: performance.now(),
    radius,
    mass: radius ** 2,
    fill: `oklch(${randomBetween(78, 86)}% ${randomBetween(0.055, 0.1)} ${hue} / ${randomBetween(0.62, 0.76)})`,
    border: `oklch(${randomBetween(48, 62)}% ${randomBetween(0.055, 0.1)} ${hue} / 0.95)`,
    shadow: `oklch(${randomBetween(68, 78)}% ${randomBetween(0.055, 0.1)} ${hue} / 0.2)`,
  }
}

function createBalls(width: number, height: number): Ball[] {
  const balls: Ball[] = []

  for (let index = 0; index < CONFIG.physicsBallsCount; index++) {
    balls.push(createBall(width, height, balls))
  }

  return balls
}

function collideBalls(balls: Ball[]) {
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const a = balls[i]
      const b = balls[j]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const distance = Math.hypot(dx, dy) || 1
      const minDistance = a.radius + b.radius

      if (distance >= minDistance) continue

      const nx = dx / distance
      const ny = dy / distance
      const overlap = minDistance - distance
      const totalMass = a.mass + b.mass

      a.x -= nx * overlap * (b.mass / totalMass)
      a.y -= ny * overlap * (b.mass / totalMass)
      b.x += nx * overlap * (a.mass / totalMass)
      b.y += ny * overlap * (a.mass / totalMass)

      const relativeVx = b.vx - a.vx
      const relativeVy = b.vy - a.vy
      const speed = relativeVx * nx + relativeVy * ny

      if (speed >= 0) continue

      const impulse = -(1 + CONFIG.physicsBallsCollisionRestitution) * speed / ((1 / a.mass) + (1 / b.mass))
      const impulseX = impulse * nx
      const impulseY = impulse * ny

      a.vx -= impulseX / a.mass
      a.vy -= impulseY / a.mass
      b.vx += impulseX / b.mass
      b.vy += impulseY / b.mass
    }
  }
}

export default function PhysicsBalls() {
  const canvasRef = useRef<HTMLCanvasElement>(null!)

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduceMotion.matches) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    let width = 0
    let height = 0
    let frame = 0
    let lastTime = performance.now()
    const pointer = { x: -9999, y: -9999, vx: 0, vy: 0, lastMove: 0 }
    let balls: Ball[] = []

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      if (balls.length === 0) balls = createBalls(width, height)

      for (const ball of balls) {
        ball.x = Math.min(Math.max(ball.x, ball.radius), width - ball.radius)
        ball.y = Math.min(Math.max(ball.y, ball.radius), height - ball.radius)
      }
    }

    const movePointer = (event: PointerEvent) => {
      const now = performance.now()
      const elapsed = Math.max(now - pointer.lastMove, 16)
      pointer.vx = ((event.clientX - pointer.x) / elapsed) * 16
      pointer.vy = ((event.clientY - pointer.y) / elapsed) * 16
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.lastMove = now
    }

    const addBall = (event: Event) => {
      const { x, y } = (event as CustomEvent<BallSpawn>).detail

      balls.push(createBall(width, height, balls, { x, y }))
    }

    const drawBall = (ball: Ball) => {
      context.beginPath()
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
      context.fillStyle = ball.fill
      context.shadowColor = ball.shadow
      context.shadowBlur = CONFIG.physicsBallsShadowBlur
      context.fill()
      context.shadowBlur = 0
      context.lineWidth = CONFIG.physicsBallsBorderWidth
      context.strokeStyle = ball.border
      context.stroke()
    }

    const tick = (time: number) => {
      const delta = Math.min((time - lastTime) / 16, 2)
      lastTime = time

      context.clearRect(0, 0, width, height)
      balls = balls.filter((ball) => time - ball.createdAt < CONFIG.physicsBallsLifetime)

      for (const ball of balls) {
        ball.x += ball.vx * delta
        ball.y += ball.vy * delta

        const dx = ball.x - pointer.x
        const dy = ball.y - pointer.y
        const distance = Math.hypot(dx, dy) || 1
        const minDistance = ball.radius + CONFIG.physicsBallsPointerRadius

        if (time - pointer.lastMove < CONFIG.physicsBallsKickWindow && distance < minDistance) {
          const nx = dx / distance
          const ny = dy / distance
          const overlap = minDistance - distance
          const ballSpeed = ball.vx * nx + ball.vy * ny
          const pointerSpeed = pointer.vx * nx + pointer.vy * ny
          const impulse = Math.max(CONFIG.physicsBallsMinImpulse, pointerSpeed - ballSpeed) * CONFIG.physicsBallsImpulseMultiplier

          ball.x += nx * overlap
          ball.y += ny * overlap
          ball.vx += nx * impulse
          ball.vy += ny * impulse
        }
      }

      collideBalls(balls)

      for (const ball of balls) {
        ball.vx *= CONFIG.physicsBallsDrag
        ball.vy *= CONFIG.physicsBallsDrag

        if (ball.x < ball.radius) {
          ball.x = ball.radius
          ball.vx = Math.abs(ball.vx) * CONFIG.physicsBallsBounce
        } else if (ball.x > width - ball.radius) {
          ball.x = width - ball.radius
          ball.vx = -Math.abs(ball.vx) * CONFIG.physicsBallsBounce
        }

        if (ball.y < ball.radius) {
          ball.y = ball.radius
          ball.vy = Math.abs(ball.vy) * CONFIG.physicsBallsBounce
        } else if (ball.y > height - ball.radius) {
          ball.y = height - ball.radius
          ball.vy = -Math.abs(ball.vy) * CONFIG.physicsBallsBounce
        }

        drawBall(ball)
      }

      frame = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", movePointer, { passive: true })
    window.addEventListener(CONFIG.physicsBallsCreateEvent, addBall)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", movePointer)
      window.removeEventListener(CONFIG.physicsBallsCreateEvent, addBall)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-app-balls"
    />
  )
}
