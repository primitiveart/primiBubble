A small jQuery plugin to display messages in the form of text bubbles. It’s not fully developed yet and is something I’m working on in my spare time.
- - - -
To use primiBubble just execute:

	
```
#!javascript

$([id]).primiBubble([options]);
```


The supported options are: 

| Option        | Values                         | Description                    |
| ------------- | ------------------------------ | ------------------------------ |
| `bounce`      | true/false                     | Enable/disable the animation (bounce) of the parent element.  |
| `message`     | string                         | The message that will be displayed.  |
| `position`    | 'auto'/{left: 'px', top: 'px'} | The absolute position of the bubble. Can be 'auto' OR object: { left: '0px', top: '0px'}. If is set to 'auto' then the position is calculated based on the parent element and the `arrow` option.* |
| `arrow`       | 'side/top/bottom left/right'   | The position of the bubble arrow. It's a combination of 'side/top/bottom' and 'left/right' eg: 'side left'. |
| `clickToClose` | true/false                    | If the user must click on the bubble in order to remove it. |
| `time`        | ''/number                      | Remove the bubble automatically after the given time (ms). Set to empty string to disable automatic remove of the bubble. |



The default options are:

      bounce: false,  
      message : 'This is a helpful primiBubble',
      position : 'auto', 
      arrow : 'side left', 
      clickToClose : false, 
      time : 10000 

## *Bubble position ##

If `position:'auto'` then the position of the bubble is calculated as such:

* check the `arrow` option to get the desired position of the bubble relative to the parent 
     * if `arrow` contains 'side' then the bubble should be beside the parent element (left or right, depends on what option `arrow` is set to)
     * if `arrow` contains 'top' then the bubble should be below the parent element  
     * if `arrow` contains 'bottom' then the bubble should be over the parent element
* calculate the absolute position based on the left/top offset and the width/height of the parent element and the width/height of the bubble element 