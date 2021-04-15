import { _p } from "pragmajs"


export const isObj = o => (o !== null) && typeof o === 'object'

export function deepMerge(obj, edit) {
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


export class Jolene {
    static watcher = _p('jolene-watcher')
                        .createEvents('set', 'get')

    static on() {
        return Jolene.watcher.on(arguments)
    }
    static setLocal(key, value){
        return localStorage.setItem("jolene", JSON.stringify({[key]: value}))
    }

    static getLocal(key=null){
        let jolene = JSON.parse(localStorage.getItem("jolene"))
        if (jolene == null) return null
        if (key == null) return jolene
        return jolene[key]
    }

    static set(key, value) {
        Jolene.watcher.triggerEvent("set", key, value)

        let keys = key.split(">").map(level => level.trim())

        let shape = keys.reduceRight((dict, current, i) => { 
            let val = i == keys.length-1 ? value : Object.assign({}, dict)
            return { [current]: val, lastModified: new Date() }
        } , {})

        let origin_key = keys[0] 
        let diff = deepMerge(Jolene._get(origin_key), shape)
        Jolene.setLocal(origin_key, diff)
        
        return value
    }

    static _get(...keys){
        let value = keys.slice(1).reduce((last, current) => {

            if (last != null && isObj(last) && (current in last)) {
                return last[current]
            } else {
                return null
            }

        }, Jolene.getLocal(keys[0]))


        return value       
    }

    static get(key=null) {
        if (key === null) { return Jolene.getLocal() }

        let keys = key.split(">").map(level => level.trim())
        let value =  Jolene._get(...keys)
        Jolene.watcher.triggerEvent("get", key, value)
        return value 
    }
}

