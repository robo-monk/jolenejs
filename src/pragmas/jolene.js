import { Pragma } from "pragmajs"


const isObj = o => (o !== null) && typeof o === 'object'

function deepMerge(obj, edit) {
  if (!isObj(obj) || !isObj(edit)) return edit

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


export class Jolene extends Pragma {
    constructor() {
        super()

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
        let shape = keys.reduceRight((dict, current, i) => { 
            let val = i == keys.length-1 ? value : Object.assign({}, dict)
            return { [current]: val, lastModified: new Date() }
        } , {})

        let origin_key = keys[0] 
        let diff = deepMerge(this._get(origin_key), shape)
        console.log('existing', this._get(origin_key))
        console.log('diff', diff)
        console.log('shape', shape)
        setLocal(origin_key, diff)
        
        return value
    }

    _get(...keys){
        let value = keys.slice(1).reduce((last, current) => {

            if (last != null && isObj(last) && (current in last)) {
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
