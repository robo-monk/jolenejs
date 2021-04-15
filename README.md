![npm-size](https://img.shields.io/npm/v/jolenejs?style=flat-square)
![npm-size](https://img.shields.io/github/commit-activity/m/robo-monk/__pkg?style=flat-square)
![npm-size](https://img.shields.io/npm/dw/jolenejs?style=flat-square)

# jolenejs 
> made with ❤ ️by robo-monk


### [ Demo ](https://robo-monk.github.io/jolenejs)

## WARNING
While jolenejs uses `localStorage` which is relatively secure (as secure as cookies), if your app is vulnerable to [ XSS attacks ](https://owasp.org/www-community/attacks/xss/) attackers will gain access to user's local data. Use jolenejs with caution.


## Usage

```javascript

jolene = new jolenejs.Jolene
jolene.on("set", (key, value) => {
    console.log('jolene just set', key, value)
})

//jolene.set('key', 1)

jolene.set("fready-user > token > digest ", "ahdfjadfh-adfkaljdfa-fakfj")
token = jolene.get("fready-user > token")

console.log(jolene.get('fready-user'))
setTimeout(() => {
    jolene.set("fready-user > yoinger > shiiii ", "ahdfjadfh-adfkaljdfa-fakfj")
    console.log(jolene.get('fready-user'))
}, 1000)

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
