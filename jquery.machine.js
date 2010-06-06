// create the machine selector

$.fn.machine = function(settings) {
  var config = {
    state : "/",
    entering : function(){
      debug.log('entering state');
    },
    entered : function(){
      debug.log('entered state');
    },
    exiting : function(){
      debug.log('exiting state');
    },
    exited : function(){
      debug.log('exited state');
    }
  };

  if (settings) $.extend(config, settings);
  $(this).data( 'machine' , config );        
  return this;
};

// create the machine itself
var machine = {};
machine.enter = function( state ){
  console.log('entering state : ', state);
  // a new state has been entered, find all elements that are machines and check if they match
  $("[data-behaviors*='machine']").each(function(i,e){
    console.log($(e).data('machine'));
  });
  
  
};
