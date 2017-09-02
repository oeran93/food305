/*
* This is a generic store to share data across many components
* The store should be used exclusively for data that is retrieved once and is used consistently throughout the app
* A good example is user information. To avoid having to pass the info around the app and to multiple layers of components,
* we can use Store.set to update the data. 
* The Store will automatically re render whatever component has been set as the root of the app.
* If no component was set as root it will re load the page
*/

const local_storage = {}
let appRoot = null

window.store = {
  
  /*
  * Adds or updates data in the store and re renders app or reloads page
  * @param key {string} propery name where data will be saved
  * @param data {Anything you want} data to save
  */
  set: (key, data) => {
    const keys = key.split('.')
    let obj = local_storage
    let last_prop = keys.pop()
    keys.forEach(key => obj = obj[key])
    obj[last_prop] = data
    appRoot.forceUpdate()
  },
  
  /*
  * Used to retrieve data from the store
  * @param key {string} propery name where data is saved
  * @return {Anything stored} null if key was not found
  */
  get: (key, from) => {
      if (!local_storage[key]) return null
      return local_storage[key]
  },
  
  /*
  * Sets the root of the react app
  * @param root {React Component}
  */
  setAppRoot: (root) => {
    appRoot = root
  }
  
}