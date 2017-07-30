const {executeHander} = require('./../handler.js')

/**
 * @function githubPushEventTrigger
 * @description Koa middleware: github push event trigger
 * @param {Object} flows flows config
 * @return {Function} Koa middleware
 */
const githubPushEventTrigger = flows => async (ctx, next) => {
  if (ctx.request.header['x-github-event'] !== 'push') return next()

  const json = JSON.parse(ctx.request.body.payload)
  const refBranch = json.ref.split('/').pop()

  for (let flow of flows) {
    if (flow.trigger !== 'github') continue
    if (flow.config.github_trigger_type !== 'webhook') continue

    const flowBranch = flow.config.branch
    const branchMatch = typeof flowBranch === 'object' &&
      'length' in flowBranch ?
      flowBranch.findIndex(i => i === refBranch) !== -1 :
      flowBranch === refBranch

    if (!branchMatch) continue

    const currentTimeString = new Date().toTimeString().split(' ').shift()
    ctx.response.body = `got in ${currentTimeString}\ntrigger ${flow.name}`
    ctx.response.status = 200
    await next()
    return executeHander(flow)
  }

  return next()
}

module.exports = githubPushEventTrigger
