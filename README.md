> Open this page at [https://iowadave.github.io/pxt-makerbit-esp12/](https://iowadave.github.io/pxt-makerbit-esp12/)

## For Use as a MakeCode Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/iowadave/pxt-makerbit-esp12** and import

## Interact with an 8266 Model ESP-12E or ESP-12F microcontroller

Note: The blocks and functions defined in this code are designed to communicate via serial with custom firmware installed on an Expressif 8266 microcontroller, in particular the models ESP-12E or -12F, mounted on a development module such as a NodeMCU or Wemos (Lolin) design.

You will need to install suitable firmware on the 8266 separately. An example can be found on github at [https://github.com/IowaDave/8266-Firmware-for-MakerBit](https://github.com/IowaDave/8266-Firmware-for-MakerBit).

#### The serial connection

Also, you will need to connect the MakerBit to the 8266 Companion Board via the devices' serial I/O pins. One way to make this connection, using the default serial pins on the two devices, is described on the firmware's web page, [https://iowadave/github.io/8266-Firmware-for-MakerBit/](https://iowadave/github.io/8266-Firmware-for-MakerBit/).


#### Tell MakeCode to use the serial pins 

This is done with a block from the Serial group, found in the Advanced list of standard blocks. Figure 1 shows MakeCode instruction for using pins P0 and P1 for serial communication. Those pins are the default serial pins for the MakerBit.

![List of Blocks](https://raw.githubusercontent.com/IowaDave/pxt-makerbit-esp12/master/images/SerialRedirect.png)

[Figure 1]


## About the Blocks

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

Again, the block features a drop-down list of the digital pins on the ESP-12E or ESP-12F module.

![Read Digital Pin D5](https://raw.githubusercontent.com/IowaDave/pxt-makerbit-esp12/master/images/ReadDigitalPinD5.png)

[Figure 5]

Figure 6 shows a simple "Blinky" sketch that lets MakeCode program an action on the Companion Board. It turns the LED on and off.

The "pause" block in the startup block only runs once. It allows time for the CompanionBoard to complete its internal startup procedures. This practice may be advisable when both devices will be started simultaneously.

![Read Digital Pin D5](https://raw.githubusercontent.com/IowaDave/pxt-makerbit-esp12/master/images/BlinkySketch.png)

[Figure 6]


#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
