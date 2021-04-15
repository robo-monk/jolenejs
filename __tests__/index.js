
const jolenejs = require('../dist/jolenejs.cjs')
const jolene = jolenejs.jolene

describe('does this work?', () => {
    test("*snap* yes", () => {
        // console.log(jolene)
        localStorage.setItem('test', 1)
        // console.log(localStorage.getItem('test'))
        expect(69).not.toBe(420)
    })
})

describe('jolene set', () => {
    test("simple set", () => {
        //jolene.set('key', 1)
        jolene.set("fready-user > token > yeet ", 420)
        token = jolene.get("fready-user > token > yeet")
        expect(token).toBe(420)
    })

    test("saves type of variables", () => {
        //jolene.set('key', 1)
        jolene.set("fready-user > token > digest ", "420")
        jolene.set("fready-user > token > number ", 420)

        expect(jolene.get("fready-user > token > number")).toBe(420)
        expect(jolene.get("fready-user > token").number).toBe(420)
        // expect(jolene.get("fready-user > token").digest).toBe("420")
    })

    test("trip", () => {
        //jolene.set('key', 1)
        jolene.set("fready-user > token > digest > how > deep > can > this > be", { yeet: "yoing" })

        expect(jolene.get("fready-user > token > digest > how > deep > can > this > be > yeet")).toBe("yoing")
        // expect(jolene.get("fready-user > token > number")).toBe(420)
        // expect(jolene.get("fready-user > token").digest).toBe("420")
    })

})

describe("jolene on set", () => {
    test("simple case", () => {
        let _set = null
        jolene.on("set", (key, value) => {
            _set = [ key, value ]
        })

        //jolene.set('key', 1)

        jolene.set("fready-user > token > digest", "xcq")
        expect(_set).toStrictEqual([ "fready-user > token > digest", "xcq"])
    })
})

