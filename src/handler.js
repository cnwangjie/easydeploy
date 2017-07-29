const {pull} = require('./../git.js')

const solver = {
  pull: gitpull
}

/**
 * @function executeHander
 * @return resolved promise
 */
const executeHander = async (flow) => {
  const handlers = flow.handle instanceof Array ? flow.handle : [flow.handle]

  for (let handle of handlers) {
    await solver[handle](flow)
  }

  return new Promise((r) => r())
}

/**
 * @function gitPull
 * @private
 */
const gitPull = (flow) => {
  const config = flow.config
  const opt = { key_path: config.git_ssh_key_path }

  if ('git_remote' in config)
    opt.remote = config.git_remote

  if ('git_remote_branch' in config)
    opt.remote_branch = config.git_remote_branch

  return git.pull(config.deploy_path, opt)
    .then(out => console.log(out.map(i => i ? i.toString() : i).join('')))
    .catch(err => console.log(err))
}

module.exports = {
  executeHander,
}
