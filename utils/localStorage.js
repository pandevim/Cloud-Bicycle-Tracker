import AsyncStorage from '@react-native-async-storage/async-storage'

export default localStorage = {

  get: (item) => {
    return AsyncStorage
      .getItem(item)
      .then(JSON.parse)
      .catch(err => `(localStorage): ${err}`)
  },

  set: (key, item) => {
    const data = JSON.stringify(item)
    return AsyncStorage
      .setItem(key, data)
      .catch(err => `(localStorage): ${err}`)
  },

  delete: (key) => {
    return AsyncStorage
      .setItem(key, "{}")
      .catch(err => `(localStorage): ${err}`)
  }

}
