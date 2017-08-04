const {spawnSync} = require('child_process')

/**
 * @function command.commandExists(cmd)
 * @description return current system have these command or not
 * @param {String|Array} cmd to verify
 * @return {Boolean} true if all commands exist
 */
const commandExists = cmd =>
  Array.isArray(cmd) ? cmd : [cmd]
    .every(i =>
      spawnSync(`command -v ${cmd} > /dev/null 2>&1`, { shell: true })
        .status === 0)

module.exports = {
  commandExists
}
