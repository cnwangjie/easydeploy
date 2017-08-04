const {pull} = require('./../git.js')

/**
 * @function git.pull
 */
const gitPull = (flow, handler) => {
  const config = handler.config
  const opt = { key_path: config.key_path }

  if ('git_remote' in config)
    opt.remote = config.git_remote

  if ('git_remote_branch' in config)
    opt.remote_branch = config.git_remote_branch

  return pull(config.work_path, opt)
    .then(out => {
      flow.log.push({
        handler: 'git.pull',
        status: 'success',
        stdout: out
      })

      console.log(out.map(i => i ? i.toString() : i).join(''))
    })
    .catch(err => {
      flow.log.push({
        handler: 'git.pull'
        status: 'failed',
        stdout: err
      })

      console.log(err)
    })
}

module.exports = {
  pull: gitPull,
}
