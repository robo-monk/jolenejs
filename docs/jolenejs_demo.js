jolenejs.compose() // creates the _page object with all the pragmas defined in the html
jolenejs.injectStyle('main')

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
//bobValue =jolene.get("fready-user-token").get("bob").value
//jolene.get("fready-user-token").set("user", "bob")

console.log(_page.displayWrapper)
console.log(_page.display)
_page.display
    .css("height 250px")
    .createWire('icon')
    .on('iconChange', function (v) {
        if (this._last) this._last.destroy()
        this._last = _e(jolenejs.icons[this._icons[v]])
            .addClass('fade-onload')
            .css('fill whitesmoke')
            .appendTo(this)
    })
    .run(function () {
        this._icons = Object.keys(jolenejs.icons)
        this.setIconLoop(0, this._icons.length - 1)
        setInterval(() => {
            this.icon++
        }, 420+69);
    })
    .setIcon(0)



