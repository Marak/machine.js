// create the machine selector

$.fn.machine = function(settings) {
  var config = {
    state : "default",
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

  //if (settings) $.extend(config, settings);
  var settings = settings || config;
  
  
  debug.log($(this).data('machine') || {});
  // check if there is already a machine behavior defined, this code is not optimal (see: wrong) and should be replaced with better settings / config
  if($(this).data('machine') != null){
   debug.log('is already a machine! not going to reapply machine settings');
   return false;  
  }
  
  debug.log('machine behavior being applied to ', $(this) , settings);
  
  // attach the machine metadata to DOM selector
  $(this).data( 'machine' , settings );  
  
  // in addition to setting the machine metadata we are going to actually set the data-behaviors tag attribute ( for consistancy / easy parsing )
  $(this).attr('data-behaviors', 'machine');
        
  return this;
};

// create the machine itself
var machine = {};
machine.enter = function( state ){
  debug.log('entering state : ', state);
  // a new state has been entered, find all elements that are machines and check if they match
  $("[data-behaviors*='machine']").each(function(i,e){
    var stateMachine = $(e).data('machine') || false;
    if(stateMachine){
      debug.log(stateMachine, $(e));
      //debug.log('the state is ', state);
      debug.log('about to execute ', stateMachine.entered.toString());
      stateMachine.entered( state );
      //$(e).data('machine');
    }
    
  });
  
  
};