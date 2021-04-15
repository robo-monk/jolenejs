// jolenejs.compose() // creates the _page object with all the pragmas defined in the html
// jolenejs.injectStyle('main')

let jolene = jolenejs.jolene
// jolene = new jolenejs.Jolene
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
//bobValue =jolene.get("fready-user-token").get("bob").value
//jolene.get("fready-user-token").set("user", "bob")



