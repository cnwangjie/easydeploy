const _ = require('lodash')
const fs = require('fs')
const path = require('path')

/**
 * @function executeHander
 * @return resolved promise
 */
const executeHander = async (flow) => {
  const handlers = _.isArray(flow.handler) ? flow.handler : [flow.handler]

  const _flow = _.cloneDeep(flow)

  _flow.log = []

  for (let handler of handlers) {
    await solveHander(handler.type)(_flow, handler)
  }

  const logFileName = `${_flow.name}.${Date.now()}.json`
  const logFilePath = path.join(global.FLOW_PATH, logFileName)
  fs.writeFileSync(logFilePath, JSON.stringify(_flow))
  console.log(logFilePath)

  return new Promise((r) => r())
}

/**
 * @function solveHander
 * @private
 * @description solve handle type
 * @param {String} handler identity of one handler
 * @return {Function} method of the handler
 */
const solveHander = handler => {
  const parts = handler.split('.')
  const method = parts.pop()
  const module = './handler/' + parts.join('/') + '.js'
  const fn = require(module)[method]
  return fn
}

module.exports = {
  executeHander,
}
