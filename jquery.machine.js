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
  
  //console.log($(this));
  // attach the machine metadata to DOM selector
  $(this).data('machine' , settings );  
  
  // in addition to setting the machine metadata we are going to actually set the data-behaviors tag attribute ( for consistancy / easy parsing )
  $(this).attr('data-behaviors', 'machine');
  
  // continue the chain
  return this;
};

// create the machine itself
var machine = {}; // global namespace is not ideal

// history contains an array of objects 
//   {
//      "state": state,
//      "context": context    
//   }

machine.history = [];

// the machine can enter diffirent states in diffirent contextes
machine.enter = function( state , context ){
  //console.log('machine.enter', state, context);
  if(typeof context == 'undefined' || context == 'document'){
    var context = document;
  }

  //console.log('machine._enter ', state, context);  
  machine.history.push({
    "state"   : state,
    "context" : context
  });

  //debug.log('entering state : ', state, ' with context ', context);

  // we need to determine what our current state is before attempting a state change
  // the convention is that states stored as "/" delimited strings (like a url)
  // we need to traverse all state machines and attempt to fix the path where we should be changing our state
  
  // get all states 
  var states = state.split('/');

  //console.log($(context), states);

  if(states.length>1){
    // we are going to iterate through all the machines and drill into our current state
    
    machine._enter(states[0], context);
    var walk = machine.findByState( states[0], document);
    machine._enter(states[1], walk);

    /*
    for(var i = 1; i < states.length; i++){
      if(walk==false){
        
      }
      else{
        machine.enter( states[i+1], walk);
        return;
      }
    }
    */

  }
  else{
    machine._enter(state, context);
  }
  
};


machine._enter = function(state, context){
  
  /*** this is a bit of a hack in case a user passes in a context which is the machine itself */
  var sel = $("[data-behaviors*='machine']:first", $(context));
  // check to see if we found any machines in the current context
  if(sel.length == 0){
    // if we have not found any machines, lets bubble up one level of the DOM
    sel = $("[data-behaviors*='machine']:first", $(context).parent());
  }

  // a new state has been entered, find all elements that are machines and check if they match
  sel.each(function(i,e){
    var stateMachine = $(e).data('machine') || false;
    if(stateMachine){
      var currentState = $(e).data( 'state' );
      $(e).data( 'state' , state );  
      stateMachine.entered( [state].toString() );
    }
  });
    
}

machine.findByState = function( state, context ){
  //console.log('machine.findByState', state, context);
  var r = false;
  // iterate through every machine in the context
  $("[data-behaviors*='machine']", $(context)).each(function(i,e){
    if( $(e).data('state') == state){
      //console.log('we found a machine with that state', state,  $(e));
      r = $(e);
    }
  });
  return r;
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
