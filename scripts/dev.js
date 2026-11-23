import { spawn } from 'node:child_process'

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const children = [
  spawn(npmCommand, ['run', 'server'], { stdio: 'inherit' }),
  spawn(npmCommand, ['run', 'dev:client', '--', '--host', '0.0.0.0'], { stdio: 'inherit' }),
]
let stopping = false

function shutdown(code = 0) {
  if (stopping) return
  stopping = true
  process.exitCode = code
  children.forEach((child) => child.kill('SIGTERM'))
}

children.forEach((child) => {
  child.on('error', () => shutdown(1))
  child.on('exit', (code) => {
    if (!stopping) shutdown(code || 0)
  })
})

process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))