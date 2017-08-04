const schedule = require('node-schedule')
const {executeHander} = require('./../handler.js')

const cronTable = flows => {
  for (let flow of flows) {
    for (let trigger of flow.trigger) {
      if (trigger.type !== 'cron') continue

      const config = trigger.config
      schedule.scheduleJob(config.table, () => {
        console.log(`trigger ${flow.name}`)
        executeHander(flow)
      })
      console.log(`register cron table for flow: ${flow.name}`)
    }
  }
}

module.exports = cronTable
