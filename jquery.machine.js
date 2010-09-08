// create the machine selector

$.fn.machine = function(settings) {
  
  // this is an example of a configuration object
  // there are four basic states for every machine: entering, entered, exiting, exited
  var config = {
    entering : function( state ){
      debug.log('entering state ', state);
    },
    entered : function(){
      debug.log('entered state ', state);
    },
    exiting : function(){
      debug.log('exiting state ', state);
    },
    exited : function(){
      debug.log('exited state ', state);
    }
  };

  // override default config with passed in settings
  var settings = settings || config;
  
  // check if there is already a machine behavior defined, this code is not optimal and could be replaced with better settings / config
  if($(this).data('machine') != null){
   debug.log('is already a machine! not going to reapply machine settings');
   return false;  
  }
  
  // attach the machine metadata to DOM selector
  $(this).data('machine' , settings );  
  
  // in addition to setting the machine metadata we are going to actually set the data-behaviors tag attribute ( for consistancy / easy parsing )
  $(this).attr('data-behaviors', 'machine');
  
  // continue the chain
  return this;
};

// create the machine itself
var machine = {}; // global namespace is not ideal

// the machine can enter diffirent states in diffirent contextes
machine.enter = function( state , context ){
  
  if(typeof context == 'undefined' || context == 'document'){
    var context = document;
  }

  //debug.log('entering state : ', state, ' with context ', context);

  // a new state has been entered, find all elements that are machines and check if they match
  $("[data-behaviors*='machine']", $(context)).each(function(i,e){
    var stateMachine = $(e).data('machine') || false;
    if(stateMachine){
      //debug.log(stateMachine, $(e));
      //debug.log('the state is ', state);
      //debug.log('about to execute ', stateMachine.entered.toString());
      $(e).data( 'state' , state );  
      stateMachine.entered.apply( this, [state] );
    }
  });
};

// helper method for getting context, not fully implemented
machine.getContext = function(machine,context){
  
  //debug.log('getting context', machine, context);
  
  // determine the context of the view we are in
  var context = $(machine).parents().find("[data-behaviors*='machine']");
  context = context.toArray().reverse();
  
  if(!context.length){
    context = machine;
  }
  
  return context;
};