const fs = require('fs')

/**
 * @param {string} file file path
 * @return {object} an object and any change will be write in the file
 */
const db = (file) => {
  const storage = file

  const readJson = (file) => {
    const str = fs.readFileSync(file).toString() || '{}'
    const json = JSON.parse(str)
    return json
  }

  const watchData = (data) => {
    if (typeof data !== 'object') return data

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        data[key] = watchData(data[key])
      }
    }

    return new Proxy(data, {
        get(target, key, receiver) {
          return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
          writeFile()
          if (typeof value === 'object') {
            value = watchData(value)
          }
          return Reflect.set(target, key, value, receiver)
        }
    })
  }

  const writeFile = () => {
    setTimeout(() => {
      const str = JSON.stringify(data)
      fs.writeFileSync(storage, str)
    }, 0)
  }

  const data = watchData(readJson(file))
  return data
}

module.exports = db
