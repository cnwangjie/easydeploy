const {spawn} = require('child_process')
const {mapLimit} = require('async')

/**
 * @function shell.script
 */
const executeShellCommands = (flow, handler) => {
  const config = handler.config
  const script = config.script
  const opt = { shell: true }
  if ('cwd' in config) opt.cwd = config.cwd
  if ('env' in config) opt.env = config.env

  return new Promise((resolve, reject) => {
    mapLimit(script, 1, (cmd, next) => {
      const cp = spawn(cmd, opt)

      const io = {out: '', err: ''}
      cp.stdout.on('data', data => io.out += data.toString())
      cp.stderr.on('data', data => io.err += data.toString())

      cp.on('exit', () => next(io.err, io.out))
    }, (err, re) => {
      if (err) reject(err)
      else resolve(re)
    })
  }).then(out => {
    flow.log.push({
      handler: 'shell.script',
      status: 'success',
      stdout: out
    })
  }).catch(err => {
    flow.log.push({
      handler: 'shell.script',
      status: 'failed',
      stdout: err
    })
  })
}

module.exports = {
  script: executeShellCommands
}
