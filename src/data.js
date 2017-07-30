const fs = require('fs')

/**
 * @param {string} file file path
 * @return {object} an object and any change will be write in the file
 */
const createLocalStorageData = (file) => {

  const readJson = (file) => {
    if (!fs.exists(file)) fs.writeFileSync(file, '')
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
      set(target, propertyKey, value, receiver) {
        if (typeof value === 'object') {
          value = watchData(value)
        }
        return Reflect.set(target, propertyKey, value, receiver)
          && writeFile()
      },
      deleteProperty(target, propertyKey) {
        return Reflect.deleteProperty(target, propertyKey)
          && writeFile()
      }
    })
  }

  const writeFile = () => {
    const str = JSON.stringify(data)
    fs.writeFileSync(file, str)
    return true
  }

  const data = watchData(readJson(file))
  console.log(`create data storage in ${file}`)

  return data
}

module.exports = createLocalStorageData
