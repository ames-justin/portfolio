export type EngineMotion = {
  progress: number
  throttle: number
  speed: number
  lastInputAt: number
  lastFrameAt?: number
  onChange?: () => void
}

// Repeated wheel input keeps adding energy, with diminishing returns at high RPM.
export function addScrollImpulse(motion: EngineMotion, pixels: number, now: number) {
  motion.throttle = 6 - (6 - motion.throttle) * Math.exp(-Math.abs(pixels) * .0012)
  motion.lastInputAt = now
}

export function advanceEngine(motion: EngineMotion, now: number, dt: number) {
  const previous = motion.lastFrameAt ?? now - dt * 1000
  // A brief grace period bridges trackpad events; thereafter energy dissipates.
  const decaySeconds = Math.max(0, now - Math.max(previous, motion.lastInputAt + 160)) / 1000
  motion.throttle *= Math.exp(-decaySeconds * .95)
  const elapsed = Math.max(dt, (now - previous) / 1000)
  const response = motion.throttle > motion.speed ? 12 : 4
  motion.speed += (motion.throttle - motion.speed) * (1 - Math.exp(-elapsed * response))
  if (motion.throttle < .002 && motion.speed < .003) motion.throttle = motion.speed = 0
  motion.lastFrameAt = now
}
