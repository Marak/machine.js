$.fn.machine = function(settings) {
  var config = {
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
  $(this).data( 'state', config );        
  return this;
};
