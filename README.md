> Open this page at [https://iowadave.github.io/pxt-makerbit-esp12/](https://iowadave.github.io/pxt-makerbit-esp12/)

## For Use as a MakeCode Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/iowadave/pxt-makerbit-esp12** and import

## Inspired From Outer Space

My sister's son is an aerospace robotics engineer. His capstone project as an undergraduate was to build an orientation mechanism to keep a satellite aligned with the Sun. 

He solved the problem with two Arduinos working cooperatively: one handled all the sensors, the other operated the mechanism. 

The two microcontrollers communicated via their serial ports.

Wow! I thought. Very cool. Then a friend, Roger Wagner, asked whether MakeCode could be used to program an 8266 microcontroller. I remembered my nephew's satellite and said, "Why not?"

Strictly speaking the answer is No, because MakeCode does not support the 8266 directly. However, the answer becomes Yes when you connect the 8266 to one of Roger's MakerBits.

All it would need is a firmware on the 8266 that can receive, process, act upon and respond to commands sent by MakeCode running on the MakerBit. And then, how nice to have a set of custom blocks for sending the commands and receiving the responses.

This Extension package provides the custom blocks.

## Interact with an 8266 Model ESP-12E or ESP-12F microcontroller

Note: The blocks and functions defined in this code are designed to communicate via serial with custom firmware installed on an Expressif 8266 microcontroller, in particular the models ESP-12E or -12F, mounted on a development module such as a NodeMCU or Wemos (Lolin) design.

You will need to install suitable firmware on the 8266 separately. An example can be found on github at [https://github.com/IowaDave/8266-Firmware-for-MakerBit](https://github.com/IowaDave/8266-Firmware-for-MakerBit).

### Put the 8266 on a Companion Board

A Companion Board for the 8266 can support direct connection of many devices and sensors to the 8266. It gives MakeCode the power to control more sensors and actuators than could connect to the MakerBit alone.

A tutorial for how to make a Companion Board is available on the firmware's web page, [https://iowadave/github.io/8266-Firmware-for-MakerBit/](https://iowadave/github.io/8266-Firmware-for-MakerBit/).

#### Make the serial connection

Also, you will need to connect the MakerBit to the 8266 Companion Board via the devices' serial I/O pins. This article assumes that you will choose the default pins, as described in the tutorial mentioned above.

#### Tell MakeCode to use the serial pins 

This is done with a block from the Serial group, found in the Advanced list of standard blocks. Figure 1 shows MakeCode instruction for using pins P0 and P1 for serial communication. Those pins are the default serial pins for the MakerBit.

![List of Blocks](https://raw.githubusercontent.com/IowaDave/pxt-makerbit-esp12/master/images/SerialRedirect.png)

[Figure 1]

## About the Custom Blocks

You must import the blocks before you can use them, as explained above in "For Use as a MakeCode Extension".

Figure 2 shows the package of blocks as it appears on the List of Blocks after being imported. It is named, "EspCompanion". 

Clicking on the name in the list opens a popup menu that lists the blocks available.

![List of Blocks](https://raw.githubusercontent.com/IowaDave/pxt-makerbit-esp12/master/images/ListTheBlocks.png)

[Figure 2]

The blocks group into several categories. The following descriptions and examples will be organized by groups.

### Digital Pin Blocks

These blocks work with the digital pins on the 8266. The blocks allow you to set the value of a digital pin or to obtain the current value of a pin. Figure 3 displays the blocks.

![Digital Pin Blocks](https://raw.githubusercontent.com/IowaDave/pxt-makerbit-esp12/master/images/DigitalPins.png)

[Figure 3]

#### Set a digital pin to "LOW" or "HIGH"

Figure 4 shows an example of using a block to set the value of digital pin D5 to "HIGH". The block includes a dropdown list of the digital pins on an ESP-12E or ESP-12F module. It also has a dropdown (not shown) for choosing between the "HIGH" or "LOW" setting.

![Set Digital Pin D5](https://raw.githubusercontent.com/IowaDave/pxt-makerbit-esp12/master/images/SetDigitalPinD5.png)

[Figure 4]

#### Read the value of a digital pin

Figure 5 shows an example of using a block to obtain the value of digital pin D5 and then to display it on the micro:bit's LED panel. 

This block is an oval-shaped "reporter" block that returns the value as a number. It can be used anywhere that a numeric variable would be expected. In this example, it is used in the basic "show number" block.

The number will be "1" when the pin is set to HIGH. It will be "0" (zero) when the pin is set to LOW. Reading the value of a pin does not change its value.

Again, the block features a drop-down list of the digital pins on the ESP-12E or ESP-12F module.

![Read Digital Pin D5](https://raw.githubusercontent.com/IowaDave/pxt-makerbit-esp12/master/images/ReadDigitalPinD5.png)

[Figure 5]

#### Do the Digital Blinky Thing

Figure 6 shows a simple "Blinky" sketch that lets MakeCode program an action on the Companion Board. It turns the LED on and off. This algorithm has gained the cult status of the famous "Hello World" program, but for microcontrollers rather than computers.

The "pause" block in the startup block only runs once. It allows time for the CompanionBoard to complete its internal startup procedures. This practice may be advisable when both devices will be started simultaneously.

![Read Digital Pin D5](https://raw.githubusercontent.com/IowaDave/pxt-makerbit-esp12/master/images/BlinkySketch.png)

[Figure 6]

### The Analog Input Pin Block

There is just one block related to the analog input pin, A0. It is oval-shaped and returns a number in a range between 0 and 1023, derived from the voltage being sensed on that pin. Figure 7 illustrates the block being used to print the value on the MakerBit's LED display.

![Read Analog Pin A0](https://raw.githubusercontent.com/IowaDave/pxt-makerbit-esp12/master/images/AnalogBlock.png)

[Figure 7]

There is no drop-down list of analog pins for this block, because the 8266 supports only a single analog input, which is A0.

Watch out! Some ESP-12-type modules can tolerate a maximum of only 1 volt on pin A0. Others can tolerate up to 3.2 volts. Your module may vary. Concepts for controlling the voltage of a circuit are outside the scope of this article.

### The Pulse Wave Modulation (PWM) Blocks

Pulse wave modulation is a digital technique that works like a dimmer switch or a motor speed control. The 8266 can perform PWM on all of its digital pins. Figure 8 shows the blocks for setting the PWM level of a digital pin.

![PWM Blocks](https://raw.githubusercontent.com/IowaDave/pxt-makerbit-esp12/master/images/PWMblocks.png)

[Figure 8]

This article does not try to explain how PWM works. The Web crawls with tutorials and articles about PWM.

#### Use PWM to Dim an LED

The firmware we wrote to work with these blocks adjusts the 8266 so that its PWM levels range between 0 = "off" and 100 = "fully on". That is why the block to set a PWM value accepts a number in the range of 0 to 100.

Figure 9 illustrates a short sketch to dim an brighten an LED.

 ![PWM Dimmer Sketch](https://raw.githubusercontent.com/IowaDave/pxt-makerbit-esp12/master/images/Dimmer.png)

[Figure 9]



#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
