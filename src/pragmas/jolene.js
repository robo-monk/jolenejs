import { Pragma } from "pragmajs"


const isObj = o => o && typeof obj === 'object'

function deepMerge(obj, edit) {
  if (!isObj(obj) || !isObj(obj)) return edit

  for (let [key, value] of Object.entries(edit)) {
    if (!(key in edit)) continue
    obj[key] = deepMerge(obj[key], edit[key])
  }

  return obj
}

function setLocal(key, value){
    return localStorage.setItem(key, JSON.stringify(value))
}

function getLocal(key){
    return JSON.parse(localStorage.getItem(key))
}

class Table {
    
}


export class Jolene extends Pragma {
    constructor() {
        super()

        let lastStorage = localStorage.getItem('test')

        this.listener = window.addEventListener('storage', function() {
            console.log('local storage has been modified!')
            // When local storage changes, dump the list to
            // the console.
        })

        this.createEvents("set", "get", "setHash")

        this.on('setHash', (hash) => {
            this._currentHash = hash
        })
    }

    set currentHash(hash) {
        this.triggerEvent("setHash", hash)
    }

    test() {
        console.log('whats up')
    }

    set(key, value) {
        this.triggerEvent("set", key, value)
        let keys = key.split(">").map(level => level.trim())
        let target_key = keys[keys.length-1]
        console.log(keys.reduceRight((dict, current) => { 
            console.log("dict", dict, current)
            let clone = Object.assign({}, dict)
            return { [current]: clone }
        } , {}), 'yeet')

        let diff = deepMerge(this._get(...keys), { [target_key]: value })
        console.log('diff', diff)

        setLocal(key, value)
        return value
    }

    _get(...keys){
        let value = keys.slice(1).reduce((last, current) => {

            if (isObj(last) && current in last) {
                return last[current]
            } else {
                return null
            }

        }, getLocal(keys[0]))


        return value       
    }

    get(key) {
        let keys = key.split(">").map(level => level.trim())
        let value =  this._get(...keys)
        this.triggerEvent("get", key, value)
        return value 
    }

    toHash(){
         
    }
}
