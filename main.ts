/**
 * pull next serial byte into _byteWaiting
 * return true if the byte expresses a utf-8 ASCII character 
 * side effect: the byte is no longer in the serial Rx buffer
 * rather, it is now in the _byteWaiting container
 */
function serialMessageWaiting () {
    _byteWaiting = serial.read();
    if (_byteWaiting > 31 && _byteWaiting < 127) {
        return true
    }
    return false
}

/**
 * evaluate the byte in the _byteWaiting container 
 * append it to the return string if it is a utf-8 ASCII value 
 * exit when a tilde (0x7e = 126) is encountered,
 * as that is the string delimiter used by the 8266 firmware
 */
function readStringFromSerial () {
    receivedString = ""
    while (_byteWaiting > 0 && _byteWaiting < 127) {
        if (_byteWaiting == 126) {
            _byteWaiting = 0
            return receivedString
        }
        receivedString = receivedString.concat(String.fromCharCode(_byteWaiting));
        // we don't want to block 
        basic.pause(1)
        _byteWaiting = serial.read();
    }
    // return 'NA' if a byte <= 0 or byte > 126 is encountered
    return "NA"
}

/**
 * A timeout function for serial input 
 * returns true if a utf-8 ASCII byte is obtained 
 * from the serial Rx buffer 
 * within the time allowed by the function parameter. 
 * Side effect (from serialMessageWaiting() function): 
 * the byte obtained is no longer in the serial Rx Buffer,
 * rather, it is in the _byteWaiting container.
 */
function espRespondsWithinMilliseconds (timeAllowed: number) {
    functionStartTime = input.runningTime()
    while (input.runningTime() - functionStartTime < timeAllowed) {
        if (serialMessageWaiting()) {
            return true
        }
        // we don't want to block 
        basic.pause(1)
    }
    return false
}

/**
 * Custom functions and blocks for MakerBitX ESP extension board.
 * 
 * David "IowaDave" Sparks  September 9, 2020
 */
let functionStartTime = 0
let theAnswer = false
let receivedString = ""
let _8266MessageWaiting = false
let _byteWaiting = 0
enum espLowHigh {
    LOW,
    HIGH
}
enum espDigitalPin {
    D0,
    D1,
    D2,
    D3,
    D4,
    D5,
    D6,
    D7,
    D8
}
namespace EspCompanion {

    /**
     * Send the ESP-device an AT-command to set a digital pin level
     */
    //% blockID="setESPpin" block="set ESP pin %espPin %level"
    export function setESPpin(espPin: espDigitalPin, level: espLowHigh): void {
        switch (espPin) {
            case espDigitalPin.D0:
                if (level == espLowHigh.LOW) {
                    serial.writeString("AT+DP0=0~");
                } else {
                    serial.writeString("AT+DP0=1~");}
                break;
            case espDigitalPin.D1:
                if (level == espLowHigh.LOW) {
                    serial.writeString("AT+DP1=0~");
                } else {
                    serial.writeString("AT+DP1=1~");}
                break;
            case espDigitalPin.D2:
                if (level == espLowHigh.LOW) {
                    serial.writeString("AT+DP2=0~");
                } else {
                    serial.writeString("AT+DP2=1~");}
                break;
            case espDigitalPin.D3:
                if (level == espLowHigh.LOW) {
                    serial.writeString("AT+DP3=0~");
                } else {
                    serial.writeString("AT+DP3=1~");}
                break;
            case espDigitalPin.D4:
                if (level == espLowHigh.LOW) {
                    serial.writeString("AT+DP4=0~");
                } else {
                    serial.writeString("AT+DP4=1~");}
                break;
            case espDigitalPin.D5:
                if (level == espLowHigh.LOW) {
                    serial.writeString("AT+DP5=0~");
                } else {
                    serial.writeString("AT+DP5=1~");}
                break;
            case espDigitalPin.D6:
                if (level == espLowHigh.LOW) {
                    serial.writeString("AT+DP6=0~");
                } else {
                    serial.writeString("AT+DP6=1~");}
                break;
            case espDigitalPin.D7:
                if (level == espLowHigh.LOW) {
                    serial.writeString("AT+DP7=0~");
                } else {
                    serial.writeString("AT+DP7=1~");}
                break;
            case espDigitalPin.D8:
                if (level == espLowHigh.LOW) {
                    serial.writeString("AT+DP8=0~");
                } else {
                    serial.writeString("AT+DP8=1~");}
                break;
            default: 
                //
        }

    }

    /**
     * Read the value of analog pin A0
     */
    //% blockID="getESPpinA0" block="read ESP pin A0"
    export function readEspA0 (): number {
        let returnedValue = -1;
        serial.writeString("AT+AP0?~");
        if (espRespondsWithinMilliseconds(1000)) {
            returnedValue = -2;
            let analogString = readStringFromSerial();
            if (analogString.indexOf("A0=") == 0) {
                returnedValue = parseInt(analogString.slice(3));
            }
        }
        return returnedValue;
    }

    /**
     * Read the value of a digital pin
     */
    //% blockID="getESPdigitalPin" block="read ESP pin %thePin"
    export function readEspDigitalPin (thePin: espDigitalPin): number {
        switch (thePin) {
            case espDigitalPin.D0:
                serial.writeString("AT+DP0?~");
                break;
            case espDigitalPin.D1:
                serial.writeString("AT+DP1?~");
                break;
             case espDigitalPin.D2:
                serial.writeString("AT+DP2?~");
                break;
            case espDigitalPin.D3:
                serial.writeString("AT+DP3?~");
                break;
            case espDigitalPin.D4:
                serial.writeString("AT+DP4?~");
                break;
            case espDigitalPin.D5:
                serial.writeString("AT+DP5?~");
                break;
            case espDigitalPin.D6:
                serial.writeString("AT+DP6?~");
                break;
            case espDigitalPin.D7:
                serial.writeString("AT+DP7?~");
                break;
            case espDigitalPin.D8:
                serial.writeString("AT+DP8?~");
                break;               
            default:
                // no operation
        }
        if (espRespondsWithinMilliseconds(1000)) {
            let digitalString = readStringFromSerial();
            digitalString = digitalString.slice(3);
                if (digitalString == "0") return 0;
                if (digitalString == "1") return 1;
        }
        return -1;
    }

    /**
     * Send the ESP-device an AT-command to set a digital pin PWM level
     */
    //% blockID="setESPpwm" block="set ESP pin %espPin PWM to %level"
    //% level.min=0 level.max=100 level.defl=50
    export function setESPpwm(espPin: espDigitalPin, level: number): void {
        switch (espPin) {
            case espDigitalPin.D0:
                serial.writeString("AT+PWM0=" + level + "~");
                break;
            case espDigitalPin.D1:
                serial.writeString("AT+PWM1=" + level + "~");
                break;
            case espDigitalPin.D2:
                serial.writeString("AT+PWM2=" + level + "~");
                break;
            case espDigitalPin.D3:
                serial.writeString("AT+PWM3=" + level + "~");
                break;
            case espDigitalPin.D4:
                serial.writeString("AT+PWM4=" + level + "~");
                break;
            case espDigitalPin.D5:
                serial.writeString("AT+PWM5=" + level + "~");
                break;
            case espDigitalPin.D6:
                serial.writeString("AT+PWM6=" + level + "~");
                break;
            case espDigitalPin.D7:
                serial.writeString("AT+PWM7=" + level + "~");
                break;
            case espDigitalPin.D8:
                serial.writeString("AT+PWM8=" + level + "~");
                break;
            default:
                //no operation 
        }
    }

    /**
     * Read the PWM value of a digital pin
     */
    //% blockID="getESPpinPWM" block="ESP pin %thePin PWM value"
    export function readEspPinPwmValue (thePin: espDigitalPin): number {
        switch (thePin) {
            case espDigitalPin.D0:
                serial.writeString("AT+PWM0?~");
                break;
            case espDigitalPin.D1:
                serial.writeString("AT+PWM1?~");
                break;
            case espDigitalPin.D2:
                serial.writeString("AT+PWM2?~");
                break;
            case espDigitalPin.D3:
                serial.writeString("AT+PWM3?~");
                break;
            case espDigitalPin.D4:
                serial.writeString("AT+PWM4?~");
                break;
            case espDigitalPin.D5:
                serial.writeString("AT+PWM5?~");
                break;
            case espDigitalPin.D6:
                serial.writeString("AT+PWM6?~");
                break;
            case espDigitalPin.D7:
                serial.writeString("AT+PWM7?~");
                break;
            case espDigitalPin.D8:
                serial.writeString("AT+PWM8?~");
                break;
            default:
                // no operation 
        }
        let returnedValue2 = -1;
        if (espRespondsWithinMilliseconds(1000)) {
            returnedValue2 = -2;
            let analogString2 = readStringFromSerial();
            if ((analogString2.indexOf("PWM") == 0) 
                && (analogString2.indexOf("=") == 4)) {
                returnedValue2 = parseInt(analogString2.slice(5));
            }
        }
        return returnedValue2;
    }




    /**
     * Send the ESP-device an AT-command to initialize the LCD
     */
    //% blockID="init_LCD" block="activate LCD"
    export function initLCD(): void {
        serial.writeString("AT+LCDI~");      
    }

    /**
     * Send the ESP-device an AT-command to clear the LCD
     */
    //% blockID="clear_LCD" block="clear LCD"
    export function clearLCD(): void {
        serial.writeString("AT+LCDCLR~");      
    }

    /**
     * Send the ESP-device an AT-command to set the LCD address
     */
    //% blockID="address_LCD" block="set LCD address to %i2caddress"
    export function addressLCD(i2caddress: number): void {
        serial.writeString("AT+LCDA=" + i2caddress + "~");      
    }

    /**
     * Send the ESP-device AT-commands to print to the LCD
     */
    //% blockID="print_LCD" block="print %lcdText on LCD at row %lcdRow column %lcdCol"
    //% lcdRow.min=0 lcdRow.max=1 lcdRow.defl=0
    //% lcdCol.min=0 lcdCol.max=15 lcdCol.defl=0
    export function printLCD(lcdText: string, lcdRow: number, lcdCol: number  ): void {
        // set the row
        serial.writeString("AT+LCDY=" + lcdRow + "~");
        basic.pause(50);
        // set the column
        serial.writeString("AT+LCDX=" + lcdCol + "~");
        basic.pause(50);
        // print the text
        serial.writeString("AT+LCDP=" + lcdText + "~");
        basic.pause(50);   
    }


}
