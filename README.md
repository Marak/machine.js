
# machine.js

## turn css selectors into state machines

machine.js is a simple plugin that will allow you to treat DOM elements as state machines. you apply the "machine" behavior to any DOM element and that element now has four states : entering, entered, exiting, exited

# online demo - [http://maraksquires.com/machine.js/](http://maraksquires.com/machine.js/)

### super simple jQuery stop light

      // here we state that the content div is now a state machine
      $('#content').machine({
        entered: function( state ){ 
          // when the content div has entered a new state
          var color = state;
          // assign the back-ground color of #content to the name of it's current state 
          $(this).css('background-color', color); 
        }
      });

      // here we define a click event for our buttons
      $('button').click( function(){
        // when a button is clicked, enter a new state based on the button's value
        machine.enter( $(this).html() ); // optional second argument "context" will default to value "document"
      });

      ...

      <button>red</button>
      <button>green</button>
      <button>yellow</button>
      <button>purple</button>
      
      <div id="content"></div>

### using this simple principle you can build complex UI interactions such as nested layout managers


