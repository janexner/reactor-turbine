var state = require('../data/state.js');

var ensureCSSSelector = function(){
  if (document.querySelectorAll){
    state.hasSelector = true
    return
  }
  state.loadingSizzle = true
  state.sizzleQueue = []
  SL.loadScript(SL.basePath() + 'selector.js', function(){
    if (!SL.Sizzle){
      SL.logError(new Error('Failed to load selector.js'))
      return
    }
    var pending = SL.onEvent.pendingEvents
    _satellite.util.each(pending, function(evt){
      SL.handleEvent(evt)
    }, this)
    SL.onEvent = SL.handleEvent
    state.hasSelector = true
    ;delete state.loadingSizzle
    _satellite.util.each(state.sizzleQueue, function(item){
      SL.cssQuery(item[0], item[1])
    })
    ;delete SL.sizzleQueue

  })
}
