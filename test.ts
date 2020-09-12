function cycleThePWMs () {
    pwmLevel = 100
    while (pwmLevel >= 0) {
        EspCompanion.setESPpwm(espDigitalPin.D8, pwmLevel)
        pwmLevel += -10
        basic.pause(1000)
    }
    pwmLevel = 100
    while (pwmLevel >= 0) {
        EspCompanion.setESPpwm(espDigitalPin.D7, pwmLevel)
        pwmLevel += -10
        basic.pause(1000)
    }
    pwmLevel = 100
    while (pwmLevel >= 0) {
        EspCompanion.setESPpwm(espDigitalPin.D6, pwmLevel)
        pwmLevel += -10
        basic.pause(1000)
    }
    pwmLevel = 100
    while (pwmLevel >= 0) {
        EspCompanion.setESPpwm(espDigitalPin.D5, pwmLevel)
        pwmLevel += -10
        basic.pause(1000)
    }
    pwmLevel = 100
    while (pwmLevel >= 0) {
        EspCompanion.setESPpwm(espDigitalPin.D4, pwmLevel)
        pwmLevel += -10
        basic.pause(1000)
    }
    pwmLevel = 100
    while (pwmLevel >= 0) {
        EspCompanion.setESPpwm(espDigitalPin.D3, pwmLevel)
        pwmLevel += -10
        basic.pause(1000)
    }
    pwmLevel = 100
    while (pwmLevel >= 0) {
        EspCompanion.setESPpwm(espDigitalPin.D2, pwmLevel)
        pwmLevel += -10
        basic.pause(1000)
    }
    pwmLevel = 100
    while (pwmLevel >= 0) {
        EspCompanion.setESPpwm(espDigitalPin.D1, pwmLevel)
        pwmLevel += -10
        basic.pause(1000)
    }
    pwmLevel = 100
    while (pwmLevel >= 0) {
        EspCompanion.setESPpwm(espDigitalPin.D0, pwmLevel)
        pwmLevel += -10
        basic.pause(1000)
    }
}
function cycleTheLEDs () {
    EspCompanion.setESPpin(espDigitalPin.D0, espLowHigh.LOW)
    EspCompanion.setESPpin(espDigitalPin.D1, espLowHigh.LOW)
    EspCompanion.setESPpin(espDigitalPin.D2, espLowHigh.LOW)
    EspCompanion.setESPpin(espDigitalPin.D3, espLowHigh.LOW)
    EspCompanion.setESPpin(espDigitalPin.D4, espLowHigh.LOW)
    EspCompanion.setESPpin(espDigitalPin.D5, espLowHigh.LOW)
    EspCompanion.setESPpin(espDigitalPin.D6, espLowHigh.LOW)
    EspCompanion.setESPpin(espDigitalPin.D7, espLowHigh.LOW)
    EspCompanion.setESPpin(espDigitalPin.D8, espLowHigh.LOW)
    EspCompanion.setESPpin(espDigitalPin.D0, espLowHigh.HIGH)
    EspCompanion.setESPpin(espDigitalPin.D1, espLowHigh.HIGH)
    EspCompanion.setESPpin(espDigitalPin.D0, espLowHigh.LOW)
    basic.pause(500)
    EspCompanion.setESPpin(espDigitalPin.D2, espLowHigh.HIGH)
    EspCompanion.setESPpin(espDigitalPin.D1, espLowHigh.LOW)
    basic.pause(500)
    EspCompanion.setESPpin(espDigitalPin.D3, espLowHigh.HIGH)
    EspCompanion.setESPpin(espDigitalPin.D2, espLowHigh.LOW)
    basic.pause(500)
    EspCompanion.setESPpin(espDigitalPin.D4, espLowHigh.HIGH)
    EspCompanion.setESPpin(espDigitalPin.D3, espLowHigh.LOW)
    basic.pause(500)
    EspCompanion.setESPpin(espDigitalPin.D5, espLowHigh.HIGH)
    EspCompanion.setESPpin(espDigitalPin.D4, espLowHigh.LOW)
    basic.pause(500)
    EspCompanion.setESPpin(espDigitalPin.D6, espLowHigh.HIGH)
    EspCompanion.setESPpin(espDigitalPin.D5, espLowHigh.LOW)
    basic.pause(500)
    EspCompanion.setESPpin(espDigitalPin.D7, espLowHigh.HIGH)
    EspCompanion.setESPpin(espDigitalPin.D6, espLowHigh.LOW)
    basic.pause(500)
    EspCompanion.setESPpin(espDigitalPin.D8, espLowHigh.HIGH)
    EspCompanion.setESPpin(espDigitalPin.D7, espLowHigh.LOW)
    basic.pause(500)
    EspCompanion.setESPpin(espDigitalPin.D8, espLowHigh.LOW)
    basic.pause(500)
}
let pwmLevel = 0
serial.redirect(
SerialPin.P0,
SerialPin.P1,
BaudRate.BaudRate115200
)
basic.pause(5000)
EspCompanion.setESPpin(espDigitalPin.D0, espLowHigh.LOW)
EspCompanion.setESPpin(espDigitalPin.D1, espLowHigh.LOW)
EspCompanion.setESPpin(espDigitalPin.D2, espLowHigh.LOW)
EspCompanion.setESPpin(espDigitalPin.D3, espLowHigh.LOW)
EspCompanion.setESPpin(espDigitalPin.D4, espLowHigh.LOW)
EspCompanion.setESPpin(espDigitalPin.D5, espLowHigh.LOW)
EspCompanion.setESPpin(espDigitalPin.D6, espLowHigh.LOW)
EspCompanion.setESPpin(espDigitalPin.D7, espLowHigh.LOW)
EspCompanion.setESPpin(espDigitalPin.D8, espLowHigh.LOW)
EspCompanion.addressLCD(39)
EspCompanion.initLCD()
basic.pause(2000)
EspCompanion.clearLCD()
let cycleCount = 5
for (let index = 0; index < 5; index++) {
    EspCompanion.printLCD(convertToText(cycleCount), 0, 0)
    basic.pause(1000)
    cycleCount += -1
}
cycleCount = 0
EspCompanion.clearLCD()
EspCompanion.printLCD("Cycle", 0, 0)
basic.forever(function () {
    cycleCount += 1
    EspCompanion.printLCD(convertToText(cycleCount), 0, 6)
    EspCompanion.printLCD("Digital pins   ", 1, 0)
    cycleTheLEDs()
    EspCompanion.printLCD("PWM 100 to 0   ", 1, 0)
    cycleThePWMs()
})