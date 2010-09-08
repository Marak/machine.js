
# machine.js

## turn css selectors into state machines


machine.js is a simple plugin that will allow you to treat DOM elements as state machines. you apply the "machine" behavior to any DOM element and that element now has four states : entering, entered, exiting, exited

### super simple jQuery stop light

      $('.content').machine({
        entered: function( state ){
          var color = state;
          $(this).css('background-color', color);
        }
      });

      $('button').click( function(){
        machine.enter( $(this).html() );
      });


      <button>red</button>
      <button>green</button>
      <button>yellow</button>
      <button>purple</button>
      
      <div id="content"></div>

### using this simple principle you can build complex UI interactions such as nested layout managers

### online demo (with usage docs and more comprehensive examples)

[http://maraksquires.com/machine.js/](http://maraksquires.com/machine.js/)

