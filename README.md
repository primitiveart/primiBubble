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
| `bounce`      | true/false                     | If the parent element will bounce or not while the bubble is visible   |
| `message`     | string                         | The message that will be displayed  |
| `position`    | 'auto'/{left: 'px', top: 'px'} | The absolute position of the bubble. Can be 'auto' OR object: { left: '0px', top: '0px'}. If 'auto' then the position is calculated based on the parent element and the `arrow` option.* |
| `arrow`       | 'side/top/bottom left/right'   | The position of the bubble arrow. It's a combination of 'side/top/bottom' and 'left/right' eg: 'side left' |
| `clickToClose` | true/false                    | If the user must click on the bubble to close. |
| `time`        | ''/number                      | If the bubble will close automatically after the given time in ms. If empty string then the bubble doesn't close automatically |



The default options are:

      bounce: false,  
      message : 'This is a helpful primiBubble',
      position : 'auto', 
      arrow : 'side left', 
      clickToClose : false, 
      time : 10000 

## *Bubble position ##

If `position:'auto'` then the position of the bubble is calculated as such:

* primiBubble checks the `arrow` option to get the desired position based on the parent element
     * if `arrow` option contains side then the bubble should be besides the parent element
          * if `arrow` option contains left then the bubble should be on the right side of the parent element
          * if `arrow` option contains right then the bubble should be on the left side of the parent element 
     * if `arrow` option contains top then the bubble should be below the parent element  
     * if `arrow` option contains bottom then the bubble should be over the parent element
* Once primiBubble calculates the desired position of the element based on the `arrow` option must decide the absolute position based on the left/top offset and the width/height of the parent element and the width/height of the bubble object  