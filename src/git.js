const {spawnSync} = require('child_process')

/**
 * @function git.pull(path[, option])
 * @description execute git pull in an assigned path
 * @param {string} path git project path
 * @param {Object=} opt option
 * @return {Promise}
 */
const pull = (path, {key_path, remote, remote_branch}) => {
  if (!path) throw new Error('git pull method need set project path')
  else return new Promise((resolve, reject) => {
    const cp = spawnSync('git pull', [
      remote ? remote : 'origin',
      remote_branch ? remote_branch : 'master'
    ], {
      cwd: path,
      shell: true,
      env: key_path ? {
        'GIT_SSH_COMMAND': `ssh -i ${key_path}`
      } : undefined
    })

    if (cp.status === 0)
      resolve(cp.output)
    else
      reject(cp.stderr)
  })
}

module.exports = {
  pull
}
