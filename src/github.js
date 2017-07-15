const request = require('request-promise')

/**
 * @function github.getCommit(option)
 * @description get commit message
 * @param {Object} option
 * @return {Promise}
 */
const getCommit = ({username, repository, sha, token}) => {
  const authorization = new Buffer(`${username}:${token}`).toString('base64')

  return request({
    uri: `https://api.github.com/repos/${username}/${repository}/commits/${sha}`,
    method: 'GET',
    headers: {
      'User-Agent': 'devopstool',
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Basic ${authorization}`
    }
  }).then(json => JSON.parse(json))
}

module.exports = {
  getCommit
}
