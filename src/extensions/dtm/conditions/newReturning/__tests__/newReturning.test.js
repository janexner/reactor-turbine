'use strict';

var mockVisitorTracking = {};

var conditionDelegateInjector = require('inject!../newReturning');
var conditionDelegate = conditionDelegateInjector({
  'dtm/visitorTracking': mockVisitorTracking
});

function getConfig(isNew) {
  return {
    conditionConfig: {
      isNew: isNew
    }
  };
}

describe('new vs. returning condition delegate', function() {
  it('returns true when isNew = true and the visitor is new', function() {
    mockVisitorTracking.getIsNewVisitor = function() {
      return true;
    };

    var config = getConfig(true);
    expect(conditionDelegate(config)).toBe(true);
  });

  it('returns true when isNew = false and the visitor is returning', function() {
    mockVisitorTracking.getIsNewVisitor = function() {
      return false;
    };

    var config = getConfig(false);
    expect(conditionDelegate(config)).toBe(true);
  });

  it('returns false when isNew = false and the visitor is new', function() {
    mockVisitorTracking.getIsNewVisitor = function() {
      return true;
    };

    var config = getConfig(false);
    expect(conditionDelegate(config)).toBe(false);
  });

  it('returns false when isNew = true and the visitor is returning', function() {
    mockVisitorTracking.getIsNewVisitor = function() {
      return false;
    };

    var config = getConfig(true);
    expect(conditionDelegate(config)).toBe(false);
  });
});
