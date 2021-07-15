radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        Earthquake_level += 1
    }
    if (receivedNumber == 2) {
        Earthquake_level += -1
    }
})
function normal () {
    strip.setPixelColor(1, neopixel.colors(NeoPixelColors.White))
    strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Blue))
    strip.setPixelColor(3, neopixel.colors(NeoPixelColors.White))
    strip.setPixelColor(4, neopixel.colors(NeoPixelColors.Blue))
    strip.setPixelColor(5, neopixel.colors(NeoPixelColors.White))
    strip.setPixelColor(6, neopixel.colors(NeoPixelColors.Blue))
    strip.setPixelColor(7, neopixel.colors(NeoPixelColors.White))
    strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Blue))
    strip.show()
    basic.pause(100)
    strip.rotate(randint(0, 4))
    strip.show()
}
let Earthquake_level = 0
let strip: neopixel.Strip = null
radio.setGroup(1)
strip = neopixel.create(DigitalPin.P1, 8, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.White))
basic.forever(function () {
    basic.pause(1000)
    if (Earthquake_level <= 0) {
        Earthquake_level = 0
    }
    if (input.buttonIsPressed(Button.A)) {
        Earthquake_level += 1
    }
    if (input.buttonIsPressed(Button.B)) {
        Earthquake_level += -1
    }
    if (Earthquake_level >= 3 && Earthquake_level <= 5) {
        basic.showString("w")
        for (let index = 0; index < 4; index++) {
            basic.pause(2000)
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            basic.pause(2000)
            strip.showColor(neopixel.colors(NeoPixelColors.Black))
        }
    } else {
        normal()
    }
    if (Earthquake_level > 5) {
        basic.showString("A")
        music.playTone(262, music.beat(BeatFraction.Whole))
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        basic.pause(500)
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
    } else {
        normal()
        music.rest(music.beat(BeatFraction.Whole))
    }
})
basic.forever(function () {
    radio.sendNumber(Earthquake_level)
})
