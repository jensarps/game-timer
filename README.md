#About

This is a simple timer to use in combination with a render loop. It provides timeout and interval methods as found on window (except for default execution
context, see NOTE II).

For games, the built-in timers are not suitable, mainly because of the
following two reasons:

1. If you pause the game, the built-in timer won't pause as well.
2. You will want to fire callbacks within your render loop, not somewhere
   else.

This timer does not maintain it's own clock, so you need to call `update()`
in your render loop.

#Notes

1. If you use it w/ Three.js, keep in mind that the delta obtained
   by Three.js' clock.getDelta() is in seconds, not milliseconds!

2. This timer, by default, does not modify the execution context of
   the callbacks. You can, however pass a context to the set* methods. If
   you don't provide a context object, or don't bind the callbacks
   yourself, the execution context will be the timer instance!

#Usage

Include the timer.js file via script tag or pull it in using an AMD loader
like require.js.

~~~javascript

    var timer = new Timer();

    // setting an interval works like window.setInterval:
    var intervalId = timer.setInterval(someFunc, 100);

    // to set the execution context, pass a context object:
    var intervalId = timer.setInterval(someFunc, 100, someObj);

    // or bind your function:
    var intervalId = timer.setInterval(someFunc.bind(somObj), 100);

    // then, in your render loop:
    function render(){

      //...

      timer.update(delta); // delta needs to be in ms!
    }
 
    // clearing also works as expected:
    timer.clearInterval(intervalId);
     
~~~

#Demo

You can see how it works [over here](http://jensarps.github.com/game-timer/demo/).

#Tests

You can run the tests [over here](http://jensarps.github.com/game-timer/tests/SpecRunner.html).