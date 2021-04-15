![npm-size](https://img.shields.io/npm/v/jolenejs?style=flat-square)
![npm-size](https://img.shields.io/github/commit-activity/m/robo-monk/__pkg?style=flat-square)
![npm-size](https://img.shields.io/npm/dw/jolenejs?style=flat-square)

# jolenejs 
> made with ❤ ️by robo-monk


### [ Demo ](https://robo-monk.github.io/jolenejs)

## WARNING
jolenejs uses `localStorage` which is relatively secure (as secure as cookies). But if your app is vulnerable to [ XSS attacks ](https://owasp.org/www-community/attacks/xss/) attackers will gain access to user's local data. Use jolenejs with caution.

## Install
```
yarn add jolenejs
npm i jolenejs
```

## Usage

```javascript

jolene = jolenejs.jolene                         // browser
// const jolene = require('jolenejs').jolene    // commonjs
// import { jolene } from "jolenejs"            // es6

describe('jolene set', () => {
    test("simple set", () => {
        jolene.set("fready-user > token > yeet ", 420)
        token = jolene.get("fready-user > token > yeet")
        expect(token).toBe(420)
    })

    test("saves type of variables", () => {
        jolene.set("fready-user > token > digest ", "420")
        jolene.set("fready-user > token > number ", 420)

        expect(jolene.get("fready-user > token > number")).toBe(420)
        expect(jolene.get("fready-user > token").number).toBe(420)
    })

    test("trip", () => {
        jolene.set("fready-user > token > digest > how > deep > can > this > be", { yeet: "yoing" })

        expect(jolene.get("fready-user > token > digest > how > deep > can > this > be > yeet")).toBe("yoing")
    })

})

describe("jolene on set", () => {
    test("simple case", () => {
        let _set = null
        jolene.on("set", (key, value) => {
            _set = [ key, value ]
        })

        jolene.set("fready-user > token > digest", "xcq")
        expect(_set).toStrictEqual([ "fready-user > token > digest", "xcq"])
    })
})

```


## First time:

```bash
git clone git@github.com:robo-monk/jolenejs.git
cd jolenejs
pnpm dev -r # reload dependencies
```

* Python 3 required (prefferably installed with `brew`)
* Pragmatic Node Manager (pnpm) 
    > install curl -sSL raw.githubusercontent.com/robo-monk/pnpm/master/copy%2Bpaste.py | python3 - && zsh

## Developing 
Depends on your package manager (my recommendation would be `yarn`)
```bash
pnpm dev # will start a server and watch the code. Will
         # also check whether tests pass if configed so;
```

```bash
pnpm release # will release the package to npm repository

# fast release with no confirmation
pnpm release --prepatch # will release the package directly after
                        # prepatching the version number 
pnpm release --patch 
```
