(function () {
'use strict';

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var index$1 = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule reactProdInvariant
 * 
 */
function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

var reactProdInvariant_1 = reactProdInvariant;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var validateFormat = function validateFormat(format) {};

function invariant$1(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant$1;

var _prodInvariant = reactProdInvariant_1;

var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler$1 = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler$1 = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var fiveArgumentPooler = function (a1, a2, a3, a4, a5) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4, a5);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4, a5);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass$1 = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler$1,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler$1,
  fiveArgumentPooler: fiveArgumentPooler
};

var PooledClass_1 = PooledClass$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactCurrentOwner
 */

var ReactCurrentOwner$1 = {

  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null

};

var ReactCurrentOwner_1 = ReactCurrentOwner$1;

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction$2 = function emptyFunction() {};

emptyFunction$2.thatReturns = makeEmptyFunction;
emptyFunction$2.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction$2.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction$2.thatReturnsNull = makeEmptyFunction(null);
emptyFunction$2.thatReturnsThis = function () {
  return this;
};
emptyFunction$2.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction$2;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule canDefineProperty
 */

var _assign$1 = index$1;

var ReactCurrentOwner = ReactCurrentOwner_1;

var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

function hasValidRef(config) {
  return config.ref !== undefined;
}

function hasValidKey(config) {
  return config.key !== undefined;
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement$2 = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement$2.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  return ReactElement$2(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement$2.createFactory = function (type) {
  var factory = ReactElement$2.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement$2.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement$2(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement$2.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign$1({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement$2(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement$2.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

ReactElement$2.REACT_ELEMENT_TYPE = REACT_ELEMENT_TYPE;

var ReactElement_1 = ReactElement$2;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getIteratorFn
 * 
 */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn$1(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

var getIteratorFn_1 = getIteratorFn$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule KeyEscapeUtils
 * 
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils$1 = {
  escape: escape,
  unescape: unescape
};

var KeyEscapeUtils_1 = KeyEscapeUtils$1;

var _prodInvariant$1 = reactProdInvariant_1;

var ReactElement$3 = ReactElement_1;

var getIteratorFn = getIteratorFn_1;
var KeyEscapeUtils = KeyEscapeUtils_1;
var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' || ReactElement$3.isValidElement(children)) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      var childrenString = String(children);
      _prodInvariant$1('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren$1(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

var traverseAllChildren_1 = traverseAllChildren$1;

var PooledClass = PooledClass_1;
var ReactElement$1 = ReactElement_1;

var emptyFunction = emptyFunction_1;
var traverseAllChildren = traverseAllChildren_1;

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func;
  var context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result;
  var keyPrefix = bookKeeping.keyPrefix;
  var func = bookKeeping.func;
  var context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement$1.isValidElement(mappedChild)) {
      mappedChild = ReactElement$1.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren$1 = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

var ReactChildren_1 = ReactChildren$1;

function warnNoop(publicInstance, callerName) {
  
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue$1 = {

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

var ReactNoopUpdateQueue_1 = ReactNoopUpdateQueue$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var emptyObject$1 = {};

var emptyObject_1 = emptyObject$1;

var _prodInvariant$2 = reactProdInvariant_1;

var ReactNoopUpdateQueue = ReactNoopUpdateQueue_1;

var emptyObject = emptyObject_1;
function ReactComponent$1(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent$1.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent$1.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? _prodInvariant$2('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent$1.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
var ReactComponent_1 = ReactComponent$1;

var _assign$2 = index$1;

var ReactComponent$2 = ReactComponent_1;
var ReactNoopUpdateQueue$2 = ReactNoopUpdateQueue_1;

var emptyObject$2 = emptyObject_1;

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent$1(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject$2;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue$2;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent$2.prototype;
ReactPureComponent$1.prototype = new ComponentDummy();
ReactPureComponent$1.prototype.constructor = ReactPureComponent$1;
// Avoid an extra prototype jump for these methods.
_assign$2(ReactPureComponent$1.prototype, ReactComponent$2.prototype);
ReactPureComponent$1.prototype.isPureReactComponent = true;

var ReactPureComponent_1 = ReactPureComponent$1;

var invariant$5 = invariant_1;

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror$2 = function keyMirror(obj) {
  var ret = {};
  var key;
  !(obj instanceof Object && !Array.isArray(obj)) ? invariant$5(false) : void 0;
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

var keyMirror_1 = keyMirror$2;

var keyMirror$1 = keyMirror_1;

var ReactPropTypeLocations$1 = keyMirror$1({
  prop: null,
  context: null,
  childContext: null
});

var ReactPropTypeLocations_1 = ReactPropTypeLocations$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPropTypeLocationNames
 */

var ReactPropTypeLocationNames$1 = {};

var ReactPropTypeLocationNames_1 = ReactPropTypeLocationNames$1;

var keyOf$1 = function keyOf(oneKeyObj) {
  var key;
  for (key in oneKeyObj) {
    if (!oneKeyObj.hasOwnProperty(key)) {
      continue;
    }
    return key;
  }
  return null;
};

var keyOf_1 = keyOf$1;

var _prodInvariant$3 = reactProdInvariant_1;
var _assign$3 = index$1;

var ReactComponent$3 = ReactComponent_1;
var ReactElement$4 = ReactElement_1;
var ReactNoopUpdateQueue$3 = ReactNoopUpdateQueue_1;

var emptyObject$3 = emptyObject_1;
var keyMirror = keyMirror_1;
var keyOf = keyOf_1;
var MIXINS_KEY = keyOf({ mixins: null });

/**
 * Policies that describe methods in `ReactClassInterface`.
 */
var SpecPolicy = keyMirror({
  /**
   * These methods may be defined only once by the class specification or mixin.
   */
  DEFINE_ONCE: null,
  /**
   * These methods may be defined by both the class specification and mixins.
   * Subsequent definitions will be chained. These methods must return void.
   */
  DEFINE_MANY: null,
  /**
   * These methods are overriding the base class.
   */
  OVERRIDE_BASE: null,
  /**
   * These methods are similar to DEFINE_MANY, except we assume they return
   * objects. We try to merge the keys of the return values of all the mixed in
   * functions. If there is a key conflict we throw.
   */
  DEFINE_MANY_MERGED: null
});

var injectedMixins = [];

/**
 * Composite components are higher-level components that compose other composite
 * or host components.
 *
 * To create a new type of `ReactClass`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactClassInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will be available on the prototype.
 *
 * @interface ReactClassInterface
 * @internal
 */
var ReactClassInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
  mixins: SpecPolicy.DEFINE_MANY,

  /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   *
   * @type {object}
   * @optional
   */
  statics: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */
  propTypes: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of context types for this component.
   *
   * @type {object}
   * @optional
   */
  contextTypes: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of context types this component sets for its children.
   *
   * @type {object}
   * @optional
   */
  childContextTypes: SpecPolicy.DEFINE_MANY,

  // ==== Definition methods ====

  /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */
  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * @return {object}
   * @optional
   */
  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @nosideeffects
   * @required
   */
  render: SpecPolicy.DEFINE_ONCE,

  // ==== Delegate methods ====

  /**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */
  componentWillMount: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidMount: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */
  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */
  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

  /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
  componentWillUpdate: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidUpdate: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */
  componentWillUnmount: SpecPolicy.DEFINE_MANY,

  // ==== Advanced methods ====

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
  updateComponent: SpecPolicy.OVERRIDE_BASE

};

/**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared like instance properties in the specification
 * when defining classes using `React.createClass`, they are actually static
 * and are accessible on the constructor instead of the prototype. Despite
 * being static, they must be defined outside of the "statics" key under
 * which all other static methods are defined.
 */
var RESERVED_SPEC_KEYS = {
  displayName: function (Constructor, displayName) {
    Constructor.displayName = displayName;
  },
  mixins: function (Constructor, mixins) {
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        mixSpecIntoComponent(Constructor, mixins[i]);
      }
    }
  },
  childContextTypes: function (Constructor, childContextTypes) {
    Constructor.childContextTypes = _assign$3({}, Constructor.childContextTypes, childContextTypes);
  },
  contextTypes: function (Constructor, contextTypes) {
    Constructor.contextTypes = _assign$3({}, Constructor.contextTypes, contextTypes);
  },
  /**
   * Special case getDefaultProps which should move into statics but requires
   * automatic merging.
   */
  getDefaultProps: function (Constructor, getDefaultProps) {
    if (Constructor.getDefaultProps) {
      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
    } else {
      Constructor.getDefaultProps = getDefaultProps;
    }
  },
  propTypes: function (Constructor, propTypes) {
    Constructor.propTypes = _assign$3({}, Constructor.propTypes, propTypes);
  },
  statics: function (Constructor, statics) {
    mixStaticSpecIntoComponent(Constructor, statics);
  },
  autobind: function () {} };

// noop
function validateMethodOverride(isAlreadyDefined, name) {
  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

  // Disallow overriding of base class methods unless explicitly allowed.
  if (ReactClassMixin.hasOwnProperty(name)) {
    !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? _prodInvariant$3('73', name) : void 0;
  }

  // Disallow defining methods more than once unless explicitly allowed.
  if (isAlreadyDefined) {
    !(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? _prodInvariant$3('74', name) : void 0;
  }
}

/**
 * Mixin helper which handles policy validation and reserved
 * specification keys when building React classes.
 */
function mixSpecIntoComponent(Constructor, spec) {
  if (!spec) {
    return;
  }

  !(typeof spec !== 'function') ? _prodInvariant$3('75') : void 0;
  !!ReactElement$4.isValidElement(spec) ? _prodInvariant$3('76') : void 0;

  var proto = Constructor.prototype;
  var autoBindPairs = proto.__reactAutoBindPairs;

  // By handling mixins before any other properties, we ensure the same
  // chaining order is applied to methods with DEFINE_MANY policy, whether
  // mixins are listed before or after these methods in the spec.
  if (spec.hasOwnProperty(MIXINS_KEY)) {
    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === MIXINS_KEY) {
      // We have already handled mixins in a special case above.
      continue;
    }

    var property = spec[name];
    var isAlreadyDefined = proto.hasOwnProperty(name);
    validateMethodOverride(isAlreadyDefined, name);

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](Constructor, property);
    } else {
      // Setup methods on prototype:
      // The following member methods should not be automatically bound:
      // 1. Expected ReactClass methods (in the "interface").
      // 2. Overridden methods (that were mixed in).
      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
      var isFunction = typeof property === 'function';
      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        autoBindPairs.push(name, property);
        proto[name] = property;
      } else {
        if (isAlreadyDefined) {
          var specPolicy = ReactClassInterface[name];

          // These cases should already be caught by validateMethodOverride.
          !(isReactClassMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)) ? _prodInvariant$3('77', specPolicy, name) : void 0;

          // For methods which are defined more than once, call the existing
          // methods before calling the new property, merging if appropriate.
          if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
            proto[name] = createMergedResultFunction(proto[name], property);
          } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property;
          
        }
      }
    }
  }
}

function mixStaticSpecIntoComponent(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in RESERVED_SPEC_KEYS;
    !!isReserved ? _prodInvariant$3('78', name) : void 0;

    var isInherited = name in Constructor;
    !!isInherited ? _prodInvariant$3('79', name) : void 0;
    Constructor[name] = property;
  }
}

/**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
function mergeIntoWithNoDuplicateKeys(one, two) {
  !(one && two && typeof one === 'object' && typeof two === 'object') ? _prodInvariant$3('80') : void 0;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
      !(one[key] === undefined) ? _prodInvariant$3('81', key) : void 0;
      one[key] = two[key];
    }
  }
  return one;
}

/**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createMergedResultFunction(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    mergeIntoWithNoDuplicateKeys(c, a);
    mergeIntoWithNoDuplicateKeys(c, b);
    return c;
  };
}

/**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createChainedFunction(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

/**
 * Binds a method to the component.
 *
 * @param {object} component Component whose method is going to be bound.
 * @param {function} method Method to be bound.
 * @return {function} The bound method.
 */
function bindAutoBindMethod(component, method) {
  var boundMethod = method.bind(component);
  return boundMethod;
}

/**
 * Binds all auto-bound methods in a component.
 *
 * @param {object} component Component whose method is going to be bound.
 */
function bindAutoBindMethods(component) {
  var pairs = component.__reactAutoBindPairs;
  for (var i = 0; i < pairs.length; i += 2) {
    var autoBindKey = pairs[i];
    var method = pairs[i + 1];
    component[autoBindKey] = bindAutoBindMethod(component, method);
  }
}

/**
 * Add more to the ReactClass base class. These are all legacy features and
 * therefore not already part of the modern ReactComponent.
 */
var ReactClassMixin = {

  /**
   * TODO: This will be deprecated because state should always keep a consistent
   * type signature and the only use case for this, is to avoid that.
   */
  replaceState: function (newState, callback) {
    this.updater.enqueueReplaceState(this, newState);
    if (callback) {
      this.updater.enqueueCallback(this, callback, 'replaceState');
    }
  },

  /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function () {
    return this.updater.isMounted(this);
  }
};

var ReactClassComponent = function () {};
_assign$3(ReactClassComponent.prototype, ReactComponent$3.prototype, ReactClassMixin);

/**
 * Module for creating composite components.
 *
 * @class ReactClass
 */
var ReactClass$1 = {

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  createClass: function (spec) {
    var Constructor = function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject$3;
      this.updater = updater || ReactNoopUpdateQueue$3;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? _prodInvariant$3('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

      this.state = initialState;
    };
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    !Constructor.prototype.render ? _prodInvariant$3('83') : void 0;

    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  },

  injection: {
    injectMixin: function (mixin) {
      injectedMixins.push(mixin);
    }
  }

};

var ReactClass_1 = ReactClass$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var hasOwnProperty$2 = Object.prototype.hasOwnProperty;

/**
 * Executes the provided `callback` once for each enumerable own property in the
 * object and constructs a new object from the results. The `callback` is
 * invoked with three arguments:
 *
 *  - the property value
 *  - the property name
 *  - the object being traversed
 *
 * Properties that are added after the call to `mapObject` will not be visited
 * by `callback`. If the values of existing properties are changed, the value
 * passed to `callback` will be the value at the time `mapObject` visits them.
 * Properties that are deleted before being visited are not visited.
 *
 * @grep function objectMap()
 * @grep function objMap()
 *
 * @param {?object} object
 * @param {function} callback
 * @param {*} context
 * @return {?object}
 */
function mapObject$1(object, callback, context) {
  if (!object) {
    return null;
  }
  var result = {};
  for (var name in object) {
    if (hasOwnProperty$2.call(object, name)) {
      result[name] = callback.call(context, object[name], name, object);
    }
  }
  return result;
}

var mapObject_1 = mapObject$1;

var ReactElement$5 = ReactElement_1;

var mapObject = mapObject_1;

/**
 * Create a factory that creates HTML tag elements.
 *
 * @param {string} tag Tag name (e.g. `div`).
 * @private
 */
function createDOMFactory(tag) {
  return ReactElement$5.createFactory(tag);
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOMFactories$1 = mapObject({
  a: 'a',
  abbr: 'abbr',
  address: 'address',
  area: 'area',
  article: 'article',
  aside: 'aside',
  audio: 'audio',
  b: 'b',
  base: 'base',
  bdi: 'bdi',
  bdo: 'bdo',
  big: 'big',
  blockquote: 'blockquote',
  body: 'body',
  br: 'br',
  button: 'button',
  canvas: 'canvas',
  caption: 'caption',
  cite: 'cite',
  code: 'code',
  col: 'col',
  colgroup: 'colgroup',
  data: 'data',
  datalist: 'datalist',
  dd: 'dd',
  del: 'del',
  details: 'details',
  dfn: 'dfn',
  dialog: 'dialog',
  div: 'div',
  dl: 'dl',
  dt: 'dt',
  em: 'em',
  embed: 'embed',
  fieldset: 'fieldset',
  figcaption: 'figcaption',
  figure: 'figure',
  footer: 'footer',
  form: 'form',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  head: 'head',
  header: 'header',
  hgroup: 'hgroup',
  hr: 'hr',
  html: 'html',
  i: 'i',
  iframe: 'iframe',
  img: 'img',
  input: 'input',
  ins: 'ins',
  kbd: 'kbd',
  keygen: 'keygen',
  label: 'label',
  legend: 'legend',
  li: 'li',
  link: 'link',
  main: 'main',
  map: 'map',
  mark: 'mark',
  menu: 'menu',
  menuitem: 'menuitem',
  meta: 'meta',
  meter: 'meter',
  nav: 'nav',
  noscript: 'noscript',
  object: 'object',
  ol: 'ol',
  optgroup: 'optgroup',
  option: 'option',
  output: 'output',
  p: 'p',
  param: 'param',
  picture: 'picture',
  pre: 'pre',
  progress: 'progress',
  q: 'q',
  rp: 'rp',
  rt: 'rt',
  ruby: 'ruby',
  s: 's',
  samp: 'samp',
  script: 'script',
  section: 'section',
  select: 'select',
  small: 'small',
  source: 'source',
  span: 'span',
  strong: 'strong',
  style: 'style',
  sub: 'sub',
  summary: 'summary',
  sup: 'sup',
  table: 'table',
  tbody: 'tbody',
  td: 'td',
  textarea: 'textarea',
  tfoot: 'tfoot',
  th: 'th',
  thead: 'thead',
  time: 'time',
  title: 'title',
  tr: 'tr',
  track: 'track',
  u: 'u',
  ul: 'ul',
  'var': 'var',
  video: 'video',
  wbr: 'wbr',

  // SVG
  circle: 'circle',
  clipPath: 'clipPath',
  defs: 'defs',
  ellipse: 'ellipse',
  g: 'g',
  image: 'image',
  line: 'line',
  linearGradient: 'linearGradient',
  mask: 'mask',
  path: 'path',
  pattern: 'pattern',
  polygon: 'polygon',
  polyline: 'polyline',
  radialGradient: 'radialGradient',
  rect: 'rect',
  stop: 'stop',
  svg: 'svg',
  text: 'text',
  tspan: 'tspan'

}, createDOMFactory);

var ReactDOMFactories_1 = ReactDOMFactories$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPropTypesSecret
 */

var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

var ReactElement$6 = ReactElement_1;
var ReactPropTypeLocationNames$2 = ReactPropTypeLocationNames_1;
var ReactPropTypesSecret = ReactPropTypesSecret_1;

var emptyFunction$3 = emptyFunction_1;
var getIteratorFn$2 = getIteratorFn_1;
var ANONYMOUS = '<<anonymous>>';

var ReactPropTypes$1 = {
  array: createPrimitiveTypeChecker('array'),
  bool: createPrimitiveTypeChecker('boolean'),
  func: createPrimitiveTypeChecker('function'),
  number: createPrimitiveTypeChecker('number'),
  object: createPrimitiveTypeChecker('object'),
  string: createPrimitiveTypeChecker('string'),
  symbol: createPrimitiveTypeChecker('symbol'),

  any: createAnyTypeChecker(),
  arrayOf: createArrayOfTypeChecker,
  element: createElementTypeChecker(),
  instanceOf: createInstanceTypeChecker,
  node: createNodeChecker(),
  objectOf: createObjectOfTypeChecker,
  oneOf: createEnumTypeChecker,
  oneOfType: createUnionTypeChecker,
  shape: createShapeTypeChecker
};

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
/*eslint-disable no-self-compare*/
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}
/*eslint-enable no-self-compare*/

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
    componentName = componentName || ANONYMOUS;
    propFullName = propFullName || propName;
    if (props[propName] == null) {
      var locationName = ReactPropTypeLocationNames$2[location];
      if (isRequired) {
        return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
      }
      return null;
    } else {
      return validate(props, propName, componentName, location, propFullName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createPrimitiveTypeChecker(expectedType) {
  function validate(props, propName, componentName, location, propFullName, secret) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== expectedType) {
      var locationName = ReactPropTypeLocationNames$2[location];
      // `propValue` being instance of, say, date/regexp, pass the 'object'
      // check, but we can offer a more precise error message here rather than
      // 'of type `object`'.
      var preciseType = getPreciseType(propValue);

      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createAnyTypeChecker() {
  return createChainableTypeChecker(emptyFunction$3.thatReturns(null));
}

function createArrayOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    if (typeof typeChecker !== 'function') {
      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
    }
    var propValue = props[propName];
    if (!Array.isArray(propValue)) {
      var locationName = ReactPropTypeLocationNames$2[location];
      var propType = getPropType(propValue);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
    }
    for (var i = 0; i < propValue.length; i++) {
      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
      if (error instanceof Error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createElementTypeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    if (!ReactElement$6.isValidElement(propValue)) {
      var locationName = ReactPropTypeLocationNames$2[location];
      var propType = getPropType(propValue);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createInstanceTypeChecker(expectedClass) {
  function validate(props, propName, componentName, location, propFullName) {
    if (!(props[propName] instanceof expectedClass)) {
      var locationName = ReactPropTypeLocationNames$2[location];
      var expectedClassName = expectedClass.name || ANONYMOUS;
      var actualClassName = getClassName(props[propName]);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createEnumTypeChecker(expectedValues) {
  if (!Array.isArray(expectedValues)) {
    void 0;
    return emptyFunction$3.thatReturnsNull;
  }

  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    for (var i = 0; i < expectedValues.length; i++) {
      if (is(propValue, expectedValues[i])) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames$2[location];
    var valuesString = JSON.stringify(expectedValues);
    return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
  }
  return createChainableTypeChecker(validate);
}

function createObjectOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    if (typeof typeChecker !== 'function') {
      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
    }
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames$2[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
    }
    for (var key in propValue) {
      if (propValue.hasOwnProperty(key)) {
        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createUnionTypeChecker(arrayOfTypeCheckers) {
  if (!Array.isArray(arrayOfTypeCheckers)) {
    void 0;
    return emptyFunction$3.thatReturnsNull;
  }

  function validate(props, propName, componentName, location, propFullName) {
    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames$2[location];
    return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
  }
  return createChainableTypeChecker(validate);
}

function createNodeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!isNode(props[propName])) {
      var locationName = ReactPropTypeLocationNames$2[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createShapeTypeChecker(shapeTypes) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames$2[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
    }
    for (var key in shapeTypes) {
      var checker = shapeTypes[key];
      if (!checker) {
        continue;
      }
      var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
      if (error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function isNode(propValue) {
  switch (typeof propValue) {
    case 'number':
    case 'string':
    case 'undefined':
      return true;
    case 'boolean':
      return !propValue;
    case 'object':
      if (Array.isArray(propValue)) {
        return propValue.every(isNode);
      }
      if (propValue === null || ReactElement$6.isValidElement(propValue)) {
        return true;
      }

      var iteratorFn = getIteratorFn$2(propValue);
      if (iteratorFn) {
        var iterator = iteratorFn.call(propValue);
        var step;
        if (iteratorFn !== propValue.entries) {
          while (!(step = iterator.next()).done) {
            if (!isNode(step.value)) {
              return false;
            }
          }
        } else {
          // Iterator will provide entry [k,v] tuples rather than values.
          while (!(step = iterator.next()).done) {
            var entry = step.value;
            if (entry) {
              if (!isNode(entry[1])) {
                return false;
              }
            }
          }
        }
      } else {
        return false;
      }

      return true;
    default:
      return false;
  }
}

function isSymbol(propType, propValue) {
  // Native Symbol.
  if (propType === 'symbol') {
    return true;
  }

  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
  if (propValue['@@toStringTag'] === 'Symbol') {
    return true;
  }

  // Fallback for non-spec compliant Symbols which are polyfilled.
  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
    return true;
  }

  return false;
}

// Equivalent of `typeof` but with special handling for array and regexp.
function getPropType(propValue) {
  var propType = typeof propValue;
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }
  if (isSymbol(propType, propValue)) {
    return 'symbol';
  }
  return propType;
}

// This handles more types than `getPropType`. Only used for error messages.
// See `createPrimitiveTypeChecker`.
function getPreciseType(propValue) {
  var propType = getPropType(propValue);
  if (propType === 'object') {
    if (propValue instanceof Date) {
      return 'date';
    } else if (propValue instanceof RegExp) {
      return 'regexp';
    }
  }
  return propType;
}

// Returns class name of the object, if any.
function getClassName(propValue) {
  if (!propValue.constructor || !propValue.constructor.name) {
    return ANONYMOUS;
  }
  return propValue.constructor.name;
}

var ReactPropTypes_1 = ReactPropTypes$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactVersion
 */

var ReactVersion$1 = '15.3.0';

var _prodInvariant$4 = reactProdInvariant_1;

var ReactElement$7 = ReactElement_1;

function onlyChild$1(children) {
  !ReactElement$7.isValidElement(children) ? _prodInvariant$4('23') : void 0;
  return children;
}

var onlyChild_1 = onlyChild$1;

var _assign = index$1;

var ReactChildren = ReactChildren_1;
var ReactComponent = ReactComponent_1;
var ReactPureComponent = ReactPureComponent_1;
var ReactClass = ReactClass_1;
var ReactDOMFactories = ReactDOMFactories_1;
var ReactElement = ReactElement_1;
var ReactPropTypes = ReactPropTypes_1;
var ReactVersion = ReactVersion$1;

var onlyChild = onlyChild_1;
var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

var __spread = _assign;

var React = {

  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactComponent,
  PureComponent: ReactPureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: createFactory,
  createMixin: function (mixin) {
    // Currently a noop. Will be used to validate and trace mixins.
    return mixin;
  },

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

var React_1 = React;

var react$1 = React_1;

var react_1 = react$1.Component;
var react_3 = react$1.createElement;
var react_4 = react$1.Children;

var _prodInvariant$6 = reactProdInvariant_1;

function checkMask(value, bitmask) {
  return (value & bitmask) === bitmask;
}

var DOMPropertyInjection = {
  /**
   * Mapping from normalized, camelcased property names to a configuration that
   * specifies how the associated DOM property should be accessed or rendered.
   */
  MUST_USE_PROPERTY: 0x1,
  HAS_BOOLEAN_VALUE: 0x4,
  HAS_NUMERIC_VALUE: 0x8,
  HAS_POSITIVE_NUMERIC_VALUE: 0x10 | 0x8,
  HAS_OVERLOADED_BOOLEAN_VALUE: 0x20,

  /**
   * Inject some specialized knowledge about the DOM. This takes a config object
   * with the following properties:
   *
   * isCustomAttribute: function that given an attribute name will return true
   * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
   * attributes where it's impossible to enumerate all of the possible
   * attribute names,
   *
   * Properties: object mapping DOM property name to one of the
   * DOMPropertyInjection constants or null. If your attribute isn't in here,
   * it won't get written to the DOM.
   *
   * DOMAttributeNames: object mapping React attribute name to the DOM
   * attribute name. Attribute names not specified use the **lowercase**
   * normalized name.
   *
   * DOMAttributeNamespaces: object mapping React attribute name to the DOM
   * attribute namespace URL. (Attribute names not specified use no namespace.)
   *
   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
   * Property names not specified use the normalized name.
   *
   * DOMMutationMethods: Properties that require special mutation methods. If
   * `value` is undefined, the mutation method should unset the property.
   *
   * @param {object} domPropertyConfig the config as described above.
   */
  injectDOMPropertyConfig: function (domPropertyConfig) {
    var Injection = DOMPropertyInjection;
    var Properties = domPropertyConfig.Properties || {};
    var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
    var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

    if (domPropertyConfig.isCustomAttribute) {
      DOMProperty$1._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);
    }

    for (var propName in Properties) {
      !!DOMProperty$1.properties.hasOwnProperty(propName) ? _prodInvariant$6('48', propName) : void 0;

      var lowerCased = propName.toLowerCase();
      var propConfig = Properties[propName];

      var propertyInfo = {
        attributeName: lowerCased,
        attributeNamespace: null,
        propertyName: propName,
        mutationMethod: null,

        mustUseProperty: checkMask(propConfig, Injection.MUST_USE_PROPERTY),
        hasBooleanValue: checkMask(propConfig, Injection.HAS_BOOLEAN_VALUE),
        hasNumericValue: checkMask(propConfig, Injection.HAS_NUMERIC_VALUE),
        hasPositiveNumericValue: checkMask(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
        hasOverloadedBooleanValue: checkMask(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE)
      };
      !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? _prodInvariant$6('50', propName) : void 0;

      if (DOMAttributeNames.hasOwnProperty(propName)) {
        var attributeName = DOMAttributeNames[propName];
        propertyInfo.attributeName = attributeName;
        
      }

      if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
        propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
      }

      if (DOMPropertyNames.hasOwnProperty(propName)) {
        propertyInfo.propertyName = DOMPropertyNames[propName];
      }

      if (DOMMutationMethods.hasOwnProperty(propName)) {
        propertyInfo.mutationMethod = DOMMutationMethods[propName];
      }

      DOMProperty$1.properties[propName] = propertyInfo;
    }
  }
};

/* eslint-disable max-len */
var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
/* eslint-enable max-len */

/**
 * DOMProperty exports lookup objects that can be used like functions:
 *
 *   > DOMProperty.isValid['id']
 *   true
 *   > DOMProperty.isValid['foobar']
 *   undefined
 *
 * Although this may be confusing, it performs better in general.
 *
 * @see http://jsperf.com/key-exists
 * @see http://jsperf.com/key-missing
 */
var DOMProperty$1 = {

  ID_ATTRIBUTE_NAME: 'data-reactid',
  ROOT_ATTRIBUTE_NAME: 'data-reactroot',

  ATTRIBUTE_NAME_START_CHAR: ATTRIBUTE_NAME_START_CHAR,
  ATTRIBUTE_NAME_CHAR: ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040',

  /**
   * Map from property "standard name" to an object with info about how to set
   * the property in the DOM. Each object contains:
   *
   * attributeName:
   *   Used when rendering markup or with `*Attribute()`.
   * attributeNamespace
   * propertyName:
   *   Used on DOM node instances. (This includes properties that mutate due to
   *   external factors.)
   * mutationMethod:
   *   If non-null, used instead of the property or `setAttribute()` after
   *   initial render.
   * mustUseProperty:
   *   Whether the property must be accessed and mutated as an object property.
   * hasBooleanValue:
   *   Whether the property should be removed when set to a falsey value.
   * hasNumericValue:
   *   Whether the property must be numeric or parse as a numeric and should be
   *   removed when set to a falsey value.
   * hasPositiveNumericValue:
   *   Whether the property must be positive numeric or parse as a positive
   *   numeric and should be removed when set to a falsey value.
   * hasOverloadedBooleanValue:
   *   Whether the property can be used as a flag as well as with a value.
   *   Removed when strictly equal to false; present without a value when
   *   strictly equal to true; present with a value otherwise.
   */
  properties: {},

  /**
   * Mapping from lowercase property names to the properly cased version, used
   * to warn in the case of missing properties. Available only in __DEV__.
   * @type {Object}
   */
  getPossibleStandardName: null,

  /**
   * All of the isCustomAttribute() functions that have been injected.
   */
  _isCustomAttributeFunctions: [],

  /**
   * Checks whether a property name is a custom attribute.
   * @method
   */
  isCustomAttribute: function (attributeName) {
    for (var i = 0; i < DOMProperty$1._isCustomAttributeFunctions.length; i++) {
      var isCustomAttributeFn = DOMProperty$1._isCustomAttributeFunctions[i];
      if (isCustomAttributeFn(attributeName)) {
        return true;
      }
    }
    return false;
  },

  injection: DOMPropertyInjection
};

var DOMProperty_1 = DOMProperty$1;

/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMComponentFlags
 */

var ReactDOMComponentFlags$1 = {
  hasCachedChildNodes: 1 << 0
};

var ReactDOMComponentFlags_1 = ReactDOMComponentFlags$1;

var _prodInvariant$5 = reactProdInvariant_1;

var DOMProperty = DOMProperty_1;
var ReactDOMComponentFlags = ReactDOMComponentFlags_1;

var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
var Flags = ReactDOMComponentFlags;

var internalInstanceKey = '__reactInternalInstance$' + Math.random().toString(36).slice(2);

/**
 * Drill down (through composites and empty components) until we get a host or
 * host text component.
 *
 * This is pretty polymorphic but unavoidable with the current structure we have
 * for `_renderedChildren`.
 */
function getRenderedHostOrTextFromComponent(component) {
  var rendered;
  while (rendered = component._renderedComponent) {
    component = rendered;
  }
  return component;
}

/**
 * Populate `_hostNode` on the rendered host/text component with the given
 * DOM node. The passed `inst` can be a composite.
 */
function precacheNode(inst, node) {
  var hostInst = getRenderedHostOrTextFromComponent(inst);
  hostInst._hostNode = node;
  node[internalInstanceKey] = hostInst;
}

function uncacheNode(inst) {
  var node = inst._hostNode;
  if (node) {
    delete node[internalInstanceKey];
    inst._hostNode = null;
  }
}

/**
 * Populate `_hostNode` on each child of `inst`, assuming that the children
 * match up with the DOM (element) children of `node`.
 *
 * We cache entire levels at once to avoid an n^2 problem where we access the
 * children of a node sequentially and have to walk from the start to our target
 * node every time.
 *
 * Since we update `_renderedChildren` and the actual DOM at (slightly)
 * different times, we could race here and see a newer `_renderedChildren` than
 * the DOM nodes we see. To avoid this, ReactMultiChild calls
 * `prepareToManageChildren` before we change `_renderedChildren`, at which
 * time the container's child nodes are always cached (until it unmounts).
 */
function precacheChildNodes(inst, node) {
  if (inst._flags & Flags.hasCachedChildNodes) {
    return;
  }
  var children = inst._renderedChildren;
  var childNode = node.firstChild;
  outer: for (var name in children) {
    if (!children.hasOwnProperty(name)) {
      continue;
    }
    var childInst = children[name];
    var childID = getRenderedHostOrTextFromComponent(childInst)._domID;
    if (childID == null) {
      // We're currently unmounting this child in ReactMultiChild; skip it.
      continue;
    }
    // We assume the child nodes are in the same order as the child instances.
    for (; childNode !== null; childNode = childNode.nextSibling) {
      if (childNode.nodeType === 1 && childNode.getAttribute(ATTR_NAME) === String(childID) || childNode.nodeType === 8 && childNode.nodeValue === ' react-text: ' + childID + ' ' || childNode.nodeType === 8 && childNode.nodeValue === ' react-empty: ' + childID + ' ') {
        precacheNode(childInst, childNode);
        continue outer;
      }
    }
    // We reached the end of the DOM children without finding an ID match.
    _prodInvariant$5('32', childID);
  }
  inst._flags |= Flags.hasCachedChildNodes;
}

/**
 * Given a DOM node, return the closest ReactDOMComponent or
 * ReactDOMTextComponent instance ancestor.
 */
function getClosestInstanceFromNode(node) {
  if (node[internalInstanceKey]) {
    return node[internalInstanceKey];
  }

  // Walk up the tree until we find an ancestor whose instance we have cached.
  var parents = [];
  while (!node[internalInstanceKey]) {
    parents.push(node);
    if (node.parentNode) {
      node = node.parentNode;
    } else {
      // Top of the tree. This node must not be part of a React tree (or is
      // unmounted, potentially).
      return null;
    }
  }

  var closest;
  var inst;
  for (; node && (inst = node[internalInstanceKey]); node = parents.pop()) {
    closest = inst;
    if (parents.length) {
      precacheChildNodes(inst, node);
    }
  }

  return closest;
}

/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 */
function getInstanceFromNode(node) {
  var inst = getClosestInstanceFromNode(node);
  if (inst != null && inst._hostNode === node) {
    return inst;
  } else {
    return null;
  }
}

/**
 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
 * DOM node.
 */
function getNodeFromInstance(inst) {
  // Without this first invariant, passing a non-DOM-component triggers the next
  // invariant for a missing parent, which is super confusing.
  !(inst._hostNode !== undefined) ? _prodInvariant$5('33') : void 0;

  if (inst._hostNode) {
    return inst._hostNode;
  }

  // Walk up the tree until we find an ancestor whose DOM node we have cached.
  var parents = [];
  while (!inst._hostNode) {
    parents.push(inst);
    !inst._hostParent ? _prodInvariant$5('34') : void 0;
    inst = inst._hostParent;
  }

  // Now parents contains each ancestor that does *not* have a cached native
  // node, and `inst` is the deepest ancestor that does.
  for (; parents.length; inst = parents.pop()) {
    precacheChildNodes(inst, inst._hostNode);
  }

  return inst._hostNode;
}

var ReactDOMComponentTree$1 = {
  getClosestInstanceFromNode: getClosestInstanceFromNode,
  getInstanceFromNode: getInstanceFromNode,
  getNodeFromInstance: getNodeFromInstance,
  precacheChildNodes: precacheChildNodes,
  precacheNode: precacheNode,
  uncacheNode: uncacheNode
};

var ReactDOMComponentTree_1 = ReactDOMComponentTree$1;

var keyMirror$3 = keyMirror_1;

var PropagationPhases = keyMirror$3({ bubbled: null, captured: null });

/**
 * Types of raw signals from the browser caught at the top level.
 */
var topLevelTypes$1 = keyMirror$3({
  topAbort: null,
  topAnimationEnd: null,
  topAnimationIteration: null,
  topAnimationStart: null,
  topBlur: null,
  topCanPlay: null,
  topCanPlayThrough: null,
  topChange: null,
  topClick: null,
  topCompositionEnd: null,
  topCompositionStart: null,
  topCompositionUpdate: null,
  topContextMenu: null,
  topCopy: null,
  topCut: null,
  topDoubleClick: null,
  topDrag: null,
  topDragEnd: null,
  topDragEnter: null,
  topDragExit: null,
  topDragLeave: null,
  topDragOver: null,
  topDragStart: null,
  topDrop: null,
  topDurationChange: null,
  topEmptied: null,
  topEncrypted: null,
  topEnded: null,
  topError: null,
  topFocus: null,
  topInput: null,
  topInvalid: null,
  topKeyDown: null,
  topKeyPress: null,
  topKeyUp: null,
  topLoad: null,
  topLoadedData: null,
  topLoadedMetadata: null,
  topLoadStart: null,
  topMouseDown: null,
  topMouseMove: null,
  topMouseOut: null,
  topMouseOver: null,
  topMouseUp: null,
  topPaste: null,
  topPause: null,
  topPlay: null,
  topPlaying: null,
  topProgress: null,
  topRateChange: null,
  topReset: null,
  topScroll: null,
  topSeeked: null,
  topSeeking: null,
  topSelectionChange: null,
  topStalled: null,
  topSubmit: null,
  topSuspend: null,
  topTextInput: null,
  topTimeUpdate: null,
  topTouchCancel: null,
  topTouchEnd: null,
  topTouchMove: null,
  topTouchStart: null,
  topTransitionEnd: null,
  topVolumeChange: null,
  topWaiting: null,
  topWheel: null
});

var EventConstants$1 = {
  topLevelTypes: topLevelTypes$1,
  PropagationPhases: PropagationPhases
};

var EventConstants_1 = EventConstants$1;

var _prodInvariant$8 = reactProdInvariant_1;

var EventPluginOrder = null;

/**
 * Injectable mapping from names to event plugin modules.
 */
var namesToPlugins = {};

/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */
function recomputePluginOrdering() {
  if (!EventPluginOrder) {
    // Wait until an `EventPluginOrder` is injected.
    return;
  }
  for (var pluginName in namesToPlugins) {
    var PluginModule = namesToPlugins[pluginName];
    var pluginIndex = EventPluginOrder.indexOf(pluginName);
    !(pluginIndex > -1) ? _prodInvariant$8('96', pluginName) : void 0;
    if (EventPluginRegistry$1.plugins[pluginIndex]) {
      continue;
    }
    !PluginModule.extractEvents ? _prodInvariant$8('97', pluginName) : void 0;
    EventPluginRegistry$1.plugins[pluginIndex] = PluginModule;
    var publishedEvents = PluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      !publishEventForPlugin(publishedEvents[eventName], PluginModule, eventName) ? _prodInvariant$8('98', eventName, pluginName) : void 0;
    }
  }
}

/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */
function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {
  !!EventPluginRegistry$1.eventNameDispatchConfigs.hasOwnProperty(eventName) ? _prodInvariant$8('99', eventName) : void 0;
  EventPluginRegistry$1.eventNameDispatchConfigs[eventName] = dispatchConfig;

  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        publishRegistrationName(phasedRegistrationName, PluginModule, eventName);
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(dispatchConfig.registrationName, PluginModule, eventName);
    return true;
  }
  return false;
}

/**
 * Publishes a registration name that is used to identify dispatched events and
 * can be used with `EventPluginHub.putListener` to register listeners.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */
function publishRegistrationName(registrationName, PluginModule, eventName) {
  !!EventPluginRegistry$1.registrationNameModules[registrationName] ? _prodInvariant$8('100', registrationName) : void 0;
  EventPluginRegistry$1.registrationNameModules[registrationName] = PluginModule;
  EventPluginRegistry$1.registrationNameDependencies[registrationName] = PluginModule.eventTypes[eventName].dependencies;

  
}

/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */
var EventPluginRegistry$1 = {

  /**
   * Ordered list of injected plugins.
   */
  plugins: [],

  /**
   * Mapping from event name to dispatch config
   */
  eventNameDispatchConfigs: {},

  /**
   * Mapping from registration name to plugin module
   */
  registrationNameModules: {},

  /**
   * Mapping from registration name to event name
   */
  registrationNameDependencies: {},

  /**
   * Mapping from lowercase registration names to the properly cased version,
   * used to warn in the case of missing event handlers. Available
   * only in __DEV__.
   * @type {Object}
   */
  possibleRegistrationNames: null,

  /**
   * Injects an ordering of plugins (by plugin name). This allows the ordering
   * to be decoupled from injection of the actual plugins so that ordering is
   * always deterministic regardless of packaging, on-the-fly injection, etc.
   *
   * @param {array} InjectedEventPluginOrder
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginOrder}
   */
  injectEventPluginOrder: function (InjectedEventPluginOrder) {
    !!EventPluginOrder ? _prodInvariant$8('101') : void 0;
    // Clone the ordering so it cannot be dynamically mutated.
    EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
    recomputePluginOrdering();
  },

  /**
   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
   * in the ordering injected by `injectEventPluginOrder`.
   *
   * Plugins can be injected as part of page initialization or on-the-fly.
   *
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginsByName}
   */
  injectEventPluginsByName: function (injectedNamesToPlugins) {
    var isOrderingDirty = false;
    for (var pluginName in injectedNamesToPlugins) {
      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        continue;
      }
      var PluginModule = injectedNamesToPlugins[pluginName];
      if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== PluginModule) {
        !!namesToPlugins[pluginName] ? _prodInvariant$8('102', pluginName) : void 0;
        namesToPlugins[pluginName] = PluginModule;
        isOrderingDirty = true;
      }
    }
    if (isOrderingDirty) {
      recomputePluginOrdering();
    }
  },

  /**
   * Looks up the plugin for the supplied event.
   *
   * @param {object} event A synthetic event.
   * @return {?object} The plugin that created the supplied event.
   * @internal
   */
  getPluginModuleForEvent: function (event) {
    var dispatchConfig = event.dispatchConfig;
    if (dispatchConfig.registrationName) {
      return EventPluginRegistry$1.registrationNameModules[dispatchConfig.registrationName] || null;
    }
    for (var phase in dispatchConfig.phasedRegistrationNames) {
      if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
        continue;
      }
      var PluginModule = EventPluginRegistry$1.registrationNameModules[dispatchConfig.phasedRegistrationNames[phase]];
      if (PluginModule) {
        return PluginModule;
      }
    }
    return null;
  },

  /**
   * Exposed for unit testing.
   * @private
   */
  _resetEventPlugins: function () {
    EventPluginOrder = null;
    for (var pluginName in namesToPlugins) {
      if (namesToPlugins.hasOwnProperty(pluginName)) {
        delete namesToPlugins[pluginName];
      }
    }
    EventPluginRegistry$1.plugins.length = 0;

    var eventNameDispatchConfigs = EventPluginRegistry$1.eventNameDispatchConfigs;
    for (var eventName in eventNameDispatchConfigs) {
      if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
        delete eventNameDispatchConfigs[eventName];
      }
    }

    var registrationNameModules = EventPluginRegistry$1.registrationNameModules;
    for (var registrationName in registrationNameModules) {
      if (registrationNameModules.hasOwnProperty(registrationName)) {
        delete registrationNameModules[registrationName];
      }
    }

    
  }

};

var EventPluginRegistry_1 = EventPluginRegistry$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactErrorUtils
 */

var caughtError = null;

/**
 * Call a function while guarding against errors that happens within it.
 *
 * @param {?String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} a First argument
 * @param {*} b Second argument
 */
function invokeGuardedCallback(name, func, a, b) {
  try {
    return func(a, b);
  } catch (x) {
    if (caughtError === null) {
      caughtError = x;
    }
    return undefined;
  }
}

var ReactErrorUtils$2 = {
  invokeGuardedCallback: invokeGuardedCallback,

  /**
   * Invoked by ReactTestUtils.Simulate so that any errors thrown by the event
   * handler are sure to be rethrown by rethrowCaughtError.
   */
  invokeGuardedCallbackWithCatch: invokeGuardedCallback,

  /**
   * During execution of guarded functions we will capture the first error which
   * we will rethrow to be handled by the top level error handler.
   */
  rethrowCaughtError: function () {
    if (caughtError) {
      var error = caughtError;
      caughtError = null;
      throw error;
    }
  }
};

var ReactErrorUtils_1 = ReactErrorUtils$2;

var _prodInvariant$9 = reactProdInvariant_1;

var EventConstants$3 = EventConstants_1;
var ReactErrorUtils$1 = ReactErrorUtils_1;

var ComponentTree;
var TreeTraversal;
var injection = {
  injectComponentTree: function (Injected) {
    ComponentTree = Injected;
    
  },
  injectTreeTraversal: function (Injected) {
    TreeTraversal = Injected;
    
  }
};

var topLevelTypes$2 = EventConstants$3.topLevelTypes;

function isEndish(topLevelType) {
  return topLevelType === topLevelTypes$2.topMouseUp || topLevelType === topLevelTypes$2.topTouchEnd || topLevelType === topLevelTypes$2.topTouchCancel;
}

function isMoveish(topLevelType) {
  return topLevelType === topLevelTypes$2.topMouseMove || topLevelType === topLevelTypes$2.topTouchMove;
}
function isStartish(topLevelType) {
  return topLevelType === topLevelTypes$2.topMouseDown || topLevelType === topLevelTypes$2.topTouchStart;
}

function executeDispatch(event, simulated, listener, inst) {
  var type = event.type || 'unknown-event';
  event.currentTarget = EventPluginUtils$2.getNodeFromInstance(inst);
  if (simulated) {
    ReactErrorUtils$1.invokeGuardedCallbackWithCatch(type, listener, event);
  } else {
    ReactErrorUtils$1.invokeGuardedCallback(type, listener, event);
  }
  event.currentTarget = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches.
 */
function executeDispatchesInOrder(event, simulated) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchInstances = event._dispatchInstances;
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and Instances are two parallel arrays that are always in sync.
      executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);
    }
  } else if (dispatchListeners) {
    executeDispatch(event, simulated, dispatchListeners, dispatchInstances);
  }
  event._dispatchListeners = null;
  event._dispatchInstances = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches, but stops
 * at the first dispatch execution returning true, and returns that id.
 *
 * @return {?string} id of the first dispatch execution who's listener returns
 * true, or null if no listener returned true.
 */
function executeDispatchesInOrderStopAtTrueImpl(event) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchInstances = event._dispatchInstances;
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and Instances are two parallel arrays that are always in sync.
      if (dispatchListeners[i](event, dispatchInstances[i])) {
        return dispatchInstances[i];
      }
    }
  } else if (dispatchListeners) {
    if (dispatchListeners(event, dispatchInstances)) {
      return dispatchInstances;
    }
  }
  return null;
}

/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 */
function executeDispatchesInOrderStopAtTrue(event) {
  var ret = executeDispatchesInOrderStopAtTrueImpl(event);
  event._dispatchInstances = null;
  event._dispatchListeners = null;
  return ret;
}

/**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return {*} The return value of executing the single dispatch.
 */
function executeDirectDispatch(event) {
  var dispatchListener = event._dispatchListeners;
  var dispatchInstance = event._dispatchInstances;
  !!Array.isArray(dispatchListener) ? _prodInvariant$9('103') : void 0;
  event.currentTarget = dispatchListener ? EventPluginUtils$2.getNodeFromInstance(dispatchInstance) : null;
  var res = dispatchListener ? dispatchListener(event) : null;
  event.currentTarget = null;
  event._dispatchListeners = null;
  event._dispatchInstances = null;
  return res;
}

/**
 * @param {SyntheticEvent} event
 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
 */
function hasDispatches(event) {
  return !!event._dispatchListeners;
}

/**
 * General utilities that are useful in creating custom Event Plugins.
 */
var EventPluginUtils$2 = {
  isEndish: isEndish,
  isMoveish: isMoveish,
  isStartish: isStartish,

  executeDirectDispatch: executeDirectDispatch,
  executeDispatchesInOrder: executeDispatchesInOrder,
  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
  hasDispatches: hasDispatches,

  getInstanceFromNode: function (node) {
    return ComponentTree.getInstanceFromNode(node);
  },
  getNodeFromInstance: function (node) {
    return ComponentTree.getNodeFromInstance(node);
  },
  isAncestor: function (a, b) {
    return TreeTraversal.isAncestor(a, b);
  },
  getLowestCommonAncestor: function (a, b) {
    return TreeTraversal.getLowestCommonAncestor(a, b);
  },
  getParentInstance: function (inst) {
    return TreeTraversal.getParentInstance(inst);
  },
  traverseTwoPhase: function (target, fn, arg) {
    return TreeTraversal.traverseTwoPhase(target, fn, arg);
  },
  traverseEnterLeave: function (from, to, fn, argFrom, argTo) {
    return TreeTraversal.traverseEnterLeave(from, to, fn, argFrom, argTo);
  },

  injection: injection
};

var EventPluginUtils_1 = EventPluginUtils$2;

var _prodInvariant$10 = reactProdInvariant_1;

function accumulateInto$2(current, next) {
  !(next != null) ? _prodInvariant$10('30') : void 0;

  if (current == null) {
    return next;
  }

  // Both are not empty. Warning: Never call x.concat(y) when you are not
  // certain that x is an Array (x could be a string with concat method).
  if (Array.isArray(current)) {
    if (Array.isArray(next)) {
      current.push.apply(current, next);
      return current;
    }
    current.push(next);
    return current;
  }

  if (Array.isArray(next)) {
    // A bit too dangerous to mutate `next`.
    return [current].concat(next);
  }

  return [current, next];
}

var accumulateInto_1 = accumulateInto$2;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule forEachAccumulated
 * 
 */

function forEachAccumulated$2(arr, cb, scope) {
  if (Array.isArray(arr)) {
    arr.forEach(cb, scope);
  } else if (arr) {
    cb.call(scope, arr);
  }
}

var forEachAccumulated_1 = forEachAccumulated$2;

var _prodInvariant$7 = reactProdInvariant_1;

var EventPluginRegistry = EventPluginRegistry_1;
var EventPluginUtils$1 = EventPluginUtils_1;
var ReactErrorUtils = ReactErrorUtils_1;

var accumulateInto$1 = accumulateInto_1;
var forEachAccumulated$1 = forEachAccumulated_1;
var listenerBank = {};

/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */
var eventQueue = null;

/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @private
 */
var executeDispatchesAndRelease = function (event, simulated) {
  if (event) {
    EventPluginUtils$1.executeDispatchesInOrder(event, simulated);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};
var executeDispatchesAndReleaseSimulated = function (e) {
  return executeDispatchesAndRelease(e, true);
};
var executeDispatchesAndReleaseTopLevel = function (e) {
  return executeDispatchesAndRelease(e, false);
};

var getDictionaryKey = function (inst) {
  return '.' + inst._rootNodeID;
};

/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */
var EventPluginHub$1 = {

  /**
   * Methods for injecting dependencies.
   */
  injection: {

    /**
     * @param {array} InjectedEventPluginOrder
     * @public
     */
    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,

    /**
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     */
    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName

  },

  /**
   * Stores `listener` at `listenerBank[registrationName][key]`. Is idempotent.
   *
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {function} listener The callback to store.
   */
  putListener: function (inst, registrationName, listener) {
    !(typeof listener === 'function') ? _prodInvariant$7('94', registrationName, typeof listener) : void 0;

    var key = getDictionaryKey(inst);
    var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
    bankForRegistrationName[key] = listener;

    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.didPutListener) {
      PluginModule.didPutListener(inst, registrationName, listener);
    }
  },

  /**
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @return {?function} The stored callback.
   */
  getListener: function (inst, registrationName) {
    var bankForRegistrationName = listenerBank[registrationName];
    var key = getDictionaryKey(inst);
    return bankForRegistrationName && bankForRegistrationName[key];
  },

  /**
   * Deletes a listener from the registration bank.
   *
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   */
  deleteListener: function (inst, registrationName) {
    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.willDeleteListener) {
      PluginModule.willDeleteListener(inst, registrationName);
    }

    var bankForRegistrationName = listenerBank[registrationName];
    // TODO: This should never be null -- when is it?
    if (bankForRegistrationName) {
      var key = getDictionaryKey(inst);
      delete bankForRegistrationName[key];
    }
  },

  /**
   * Deletes all listeners for the DOM element with the supplied ID.
   *
   * @param {object} inst The instance, which is the source of events.
   */
  deleteAllListeners: function (inst) {
    var key = getDictionaryKey(inst);
    for (var registrationName in listenerBank) {
      if (!listenerBank.hasOwnProperty(registrationName)) {
        continue;
      }

      if (!listenerBank[registrationName][key]) {
        continue;
      }

      var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
      if (PluginModule && PluginModule.willDeleteListener) {
        PluginModule.willDeleteListener(inst, registrationName);
      }

      delete listenerBank[registrationName][key];
    }
  },

  /**
   * Allows registered plugins an opportunity to extract events from top-level
   * native browser events.
   *
   * @return {*} An accumulation of synthetic events.
   * @internal
   */
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var events;
    var plugins = EventPluginRegistry.plugins;
    for (var i = 0; i < plugins.length; i++) {
      // Not every plugin in the ordering may be loaded at runtime.
      var possiblePlugin = plugins[i];
      if (possiblePlugin) {
        var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
        if (extractedEvents) {
          events = accumulateInto$1(events, extractedEvents);
        }
      }
    }
    return events;
  },

  /**
   * Enqueues a synthetic event that should be dispatched when
   * `processEventQueue` is invoked.
   *
   * @param {*} events An accumulation of synthetic events.
   * @internal
   */
  enqueueEvents: function (events) {
    if (events) {
      eventQueue = accumulateInto$1(eventQueue, events);
    }
  },

  /**
   * Dispatches all synthetic events on the event queue.
   *
   * @internal
   */
  processEventQueue: function (simulated) {
    // Set `eventQueue` to null before processing it so that we can tell if more
    // events get enqueued while processing.
    var processingEventQueue = eventQueue;
    eventQueue = null;
    if (simulated) {
      forEachAccumulated$1(processingEventQueue, executeDispatchesAndReleaseSimulated);
    } else {
      forEachAccumulated$1(processingEventQueue, executeDispatchesAndReleaseTopLevel);
    }
    !!eventQueue ? _prodInvariant$7('95') : void 0;
    // This would be a good time to rethrow if any of the event handlers threw.
    ReactErrorUtils.rethrowCaughtError();
  },

  /**
   * These are needed for tests only. Do not use!
   */
  __purge: function () {
    listenerBank = {};
  },

  __getListenerBank: function () {
    return listenerBank;
  }

};

var EventPluginHub_1 = EventPluginHub$1;

var EventConstants$2 = EventConstants_1;
var EventPluginHub = EventPluginHub_1;
var EventPluginUtils = EventPluginUtils_1;

var accumulateInto = accumulateInto_1;
var forEachAccumulated = forEachAccumulated_1;
var PropagationPhases$1 = EventConstants$2.PropagationPhases;
var getListener = EventPluginHub.getListener;

/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */
function listenerAtPhase(inst, event, propagationPhase) {
  var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return getListener(inst, registrationName);
}

/**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */
function accumulateDirectionalDispatches(inst, upwards, event) {
  var phase = upwards ? PropagationPhases$1.bubbled : PropagationPhases$1.captured;
  var listener = listenerAtPhase(inst, event, phase);
  if (listener) {
    event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
    event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
  }
}

/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We cannot perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    EventPluginUtils.traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
  }
}

/**
 * Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
 */
function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    var targetInst = event._targetInst;
    var parentInst = targetInst ? EventPluginUtils.getParentInstance(targetInst) : null;
    EventPluginUtils.traverseTwoPhase(parentInst, accumulateDirectionalDispatches, event);
  }
}

/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */
function accumulateDispatches(inst, ignoredDirection, event) {
  if (event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = getListener(inst, registrationName);
    if (listener) {
      event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
      event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
    }
  }
}

/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */
function accumulateDirectDispatchesSingle(event) {
  if (event && event.dispatchConfig.registrationName) {
    accumulateDispatches(event._targetInst, null, event);
  }
}

function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}

function accumulateTwoPhaseDispatchesSkipTarget(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
}

function accumulateEnterLeaveDispatches(leave, enter, from, to) {
  EventPluginUtils.traverseEnterLeave(from, to, accumulateDispatches, leave, enter);
}

function accumulateDirectDispatches(events) {
  forEachAccumulated(events, accumulateDirectDispatchesSingle);
}

/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing event a
 * single one.
 *
 * @constructor EventPropagators
 */
var EventPropagators$1 = {
  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
  accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
  accumulateDirectDispatches: accumulateDirectDispatches,
  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
};

var EventPropagators_1 = EventPropagators$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment$2 = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

var ExecutionEnvironment_1 = ExecutionEnvironment$2;

var ExecutionEnvironment$3 = ExecutionEnvironment_1;

var contentKey = null;

/**
 * Gets the key used to access text content on a DOM node.
 *
 * @return {?string} Key used to access text content.
 * @internal
 */
function getTextContentAccessor$1() {
  if (!contentKey && ExecutionEnvironment$3.canUseDOM) {
    // Prefer textContent to innerText because many browsers support both but
    // SVG <text> elements don't support innerText even when <div> does.
    contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
  }
  return contentKey;
}

var getTextContentAccessor_1 = getTextContentAccessor$1;

var _assign$4 = index$1;

var PooledClass$2 = PooledClass_1;

var getTextContentAccessor = getTextContentAccessor_1;

/**
 * This helper class stores information about text content of a target node,
 * allowing comparison of content before and after a given event.
 *
 * Identify the node where selection currently begins, then observe
 * both its text content and its current position in the DOM. Since the
 * browser may natively replace the target node during composition, we can
 * use its position to find its replacement.
 *
 * @param {DOMEventTarget} root
 */
function FallbackCompositionState$1(root) {
  this._root = root;
  this._startText = this.getText();
  this._fallbackText = null;
}

_assign$4(FallbackCompositionState$1.prototype, {
  destructor: function () {
    this._root = null;
    this._startText = null;
    this._fallbackText = null;
  },

  /**
   * Get current text of input.
   *
   * @return {string}
   */
  getText: function () {
    if ('value' in this._root) {
      return this._root.value;
    }
    return this._root[getTextContentAccessor()];
  },

  /**
   * Determine the differing substring between the initially stored
   * text content and the current content.
   *
   * @return {string}
   */
  getData: function () {
    if (this._fallbackText) {
      return this._fallbackText;
    }

    var start;
    var startValue = this._startText;
    var startLength = startValue.length;
    var end;
    var endValue = this.getText();
    var endLength = endValue.length;

    for (start = 0; start < startLength; start++) {
      if (startValue[start] !== endValue[start]) {
        break;
      }
    }

    var minEnd = startLength - start;
    for (end = 1; end <= minEnd; end++) {
      if (startValue[startLength - end] !== endValue[endLength - end]) {
        break;
      }
    }

    var sliceTail = end > 1 ? 1 - end : undefined;
    this._fallbackText = endValue.slice(start, sliceTail);
    return this._fallbackText;
  }
});

PooledClass$2.addPoolingTo(FallbackCompositionState$1);

var FallbackCompositionState_1 = FallbackCompositionState$1;

var _assign$5 = index$1;

var PooledClass$3 = PooledClass_1;

var emptyFunction$4 = emptyFunction_1;
var shouldBeReleasedProperties = ['dispatchConfig', '_targetInst', 'nativeEvent', 'isDefaultPrevented', 'isPropagationStopped', '_dispatchListeners', '_dispatchInstances'];

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var EventInterface = {
  type: null,
  target: null,
  // currentTarget is set when dispatching; no use in copying it here
  currentTarget: emptyFunction$4.thatReturnsNull,
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function (event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {*} targetInst Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @param {DOMEventTarget} nativeEventTarget Target node.
 */
function SyntheticEvent$1(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;

  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    if (!Interface.hasOwnProperty(propName)) {
      continue;
    }
    var normalize = Interface[propName];
    if (normalize) {
      this[propName] = normalize(nativeEvent);
    } else {
      if (propName === 'target') {
        this.target = nativeEventTarget;
      } else {
        this[propName] = nativeEvent[propName];
      }
    }
  }

  var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
  if (defaultPrevented) {
    this.isDefaultPrevented = emptyFunction$4.thatReturnsTrue;
  } else {
    this.isDefaultPrevented = emptyFunction$4.thatReturnsFalse;
  }
  this.isPropagationStopped = emptyFunction$4.thatReturnsFalse;
  return this;
}

_assign$5(SyntheticEvent$1.prototype, {

  preventDefault: function () {
    this.defaultPrevented = true;
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    this.isDefaultPrevented = emptyFunction$4.thatReturnsTrue;
  },

  stopPropagation: function () {
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
    this.isPropagationStopped = emptyFunction$4.thatReturnsTrue;
  },

  /**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */
  persist: function () {
    this.isPersistent = emptyFunction$4.thatReturnsTrue;
  },

  /**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */
  isPersistent: emptyFunction$4.thatReturnsFalse,

  /**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */
  destructor: function () {
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      {
        this[propName] = null;
      }
    }
    for (var i = 0; i < shouldBeReleasedProperties.length; i++) {
      this[shouldBeReleasedProperties[i]] = null;
    }
    
  }

});

SyntheticEvent$1.Interface = EventInterface;

SyntheticEvent$1.augmentClass = function (Class, Interface) {
  var Super = this;

  var E = function () {};
  E.prototype = Super.prototype;
  var prototype = new E();

  _assign$5(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  Class.Interface = _assign$5({}, Super.Interface, Interface);
  Class.augmentClass = Super.augmentClass;

  PooledClass$3.addPoolingTo(Class, PooledClass$3.fourArgumentPooler);
};

PooledClass$3.addPoolingTo(SyntheticEvent$1, PooledClass$3.fourArgumentPooler);

var SyntheticEvent_1 = SyntheticEvent$1;

/**
  * Helper to nullify syntheticEvent instance properties when destructing
  *
  * @param {object} SyntheticEvent
  * @param {String} propName
  * @return {object} defineProperty object
  */

var SyntheticEvent = SyntheticEvent_1;

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */
var CompositionEventInterface = {
  data: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticCompositionEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticCompositionEvent$1, CompositionEventInterface);

var SyntheticCompositionEvent_1 = SyntheticCompositionEvent$1;

var SyntheticEvent$2 = SyntheticEvent_1;

/**
 * @interface Event
 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
 *      /#events-inputevents
 */
var InputEventInterface = {
  data: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticInputEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$2.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$2.augmentClass(SyntheticInputEvent$1, InputEventInterface);

var SyntheticInputEvent_1 = SyntheticInputEvent$1;

var EventConstants = EventConstants_1;
var EventPropagators = EventPropagators_1;
var ExecutionEnvironment$1 = ExecutionEnvironment_1;
var FallbackCompositionState = FallbackCompositionState_1;
var SyntheticCompositionEvent = SyntheticCompositionEvent_1;
var SyntheticInputEvent = SyntheticInputEvent_1;

var keyOf$2 = keyOf_1;

var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
var START_KEYCODE = 229;

var canUseCompositionEvent = ExecutionEnvironment$1.canUseDOM && 'CompositionEvent' in window;

var documentMode = null;
if (ExecutionEnvironment$1.canUseDOM && 'documentMode' in document) {
  documentMode = document.documentMode;
}

// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
var canUseTextInputEvent = ExecutionEnvironment$1.canUseDOM && 'TextEvent' in window && !documentMode && !isPresto();

// In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. Japanese ideographic
// spaces, for instance (\u3000) are not recorded correctly.
var useFallbackCompositionData = ExecutionEnvironment$1.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);

/**
 * Opera <= 12 includes TextEvent in window, but does not fire
 * text input events. Rely on keypress instead.
 */
function isPresto() {
  var opera = window.opera;
  return typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
}

var SPACEBAR_CODE = 32;
var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);

var topLevelTypes = EventConstants.topLevelTypes;

// Events and their corresponding property names.
var eventTypes = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: keyOf$2({ onBeforeInput: null }),
      captured: keyOf$2({ onBeforeInputCapture: null })
    },
    dependencies: [topLevelTypes.topCompositionEnd, topLevelTypes.topKeyPress, topLevelTypes.topTextInput, topLevelTypes.topPaste]
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf$2({ onCompositionEnd: null }),
      captured: keyOf$2({ onCompositionEndCapture: null })
    },
    dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionEnd, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: keyOf$2({ onCompositionStart: null }),
      captured: keyOf$2({ onCompositionStartCapture: null })
    },
    dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionStart, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: keyOf$2({ onCompositionUpdate: null }),
      captured: keyOf$2({ onCompositionUpdateCapture: null })
    },
    dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionUpdate, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
  }
};

// Track whether we've ever handled a keypress on the space key.
var hasSpaceKeypress = false;

/**
 * Return whether a native keypress event is assumed to be a command.
 * This is required because Firefox fires `keypress` events for key commands
 * (cut, copy, select-all, etc.) even though no character is inserted.
 */
function isKeypressCommand(nativeEvent) {
  return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
  // ctrlKey && altKey is equivalent to AltGr, and is not a command.
  !(nativeEvent.ctrlKey && nativeEvent.altKey);
}

/**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */
function getCompositionEventType(topLevelType) {
  switch (topLevelType) {
    case topLevelTypes.topCompositionStart:
      return eventTypes.compositionStart;
    case topLevelTypes.topCompositionEnd:
      return eventTypes.compositionEnd;
    case topLevelTypes.topCompositionUpdate:
      return eventTypes.compositionUpdate;
  }
}

/**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionStart(topLevelType, nativeEvent) {
  return topLevelType === topLevelTypes.topKeyDown && nativeEvent.keyCode === START_KEYCODE;
}

/**
 * Does our fallback mode think that this event is the end of composition?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case topLevelTypes.topKeyUp:
      // Command keys insert or clear IME input.
      return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
    case topLevelTypes.topKeyDown:
      // Expect IME keyCode on each keydown. If we get any other
      // code we must have exited earlier.
      return nativeEvent.keyCode !== START_KEYCODE;
    case topLevelTypes.topKeyPress:
    case topLevelTypes.topMouseDown:
    case topLevelTypes.topBlur:
      // Events are not possible without cancelling IME.
      return true;
    default:
      return false;
  }
}

/**
 * Google Input Tools provides composition data via a CustomEvent,
 * with the `data` property populated in the `detail` object. If this
 * is available on the event object, use it. If not, this is a plain
 * composition event and we have nothing special to extract.
 *
 * @param {object} nativeEvent
 * @return {?string}
 */
function getDataFromCustomEvent(nativeEvent) {
  var detail = nativeEvent.detail;
  if (typeof detail === 'object' && 'data' in detail) {
    return detail.data;
  }
  return null;
}

// Track the current IME composition fallback object, if any.
var currentComposition = null;

/**
 * @return {?object} A SyntheticCompositionEvent.
 */
function extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var eventType;
  var fallbackData;

  if (canUseCompositionEvent) {
    eventType = getCompositionEventType(topLevelType);
  } else if (!currentComposition) {
    if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
      eventType = eventTypes.compositionStart;
    }
  } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
    eventType = eventTypes.compositionEnd;
  }

  if (!eventType) {
    return null;
  }

  if (useFallbackCompositionData) {
    // The current composition is stored statically and must not be
    // overwritten while composition continues.
    if (!currentComposition && eventType === eventTypes.compositionStart) {
      currentComposition = FallbackCompositionState.getPooled(nativeEventTarget);
    } else if (eventType === eventTypes.compositionEnd) {
      if (currentComposition) {
        fallbackData = currentComposition.getData();
      }
    }
  }

  var event = SyntheticCompositionEvent.getPooled(eventType, targetInst, nativeEvent, nativeEventTarget);

  if (fallbackData) {
    // Inject data generated from fallback path into the synthetic event.
    // This matches the property of native CompositionEventInterface.
    event.data = fallbackData;
  } else {
    var customData = getDataFromCustomEvent(nativeEvent);
    if (customData !== null) {
      event.data = customData;
    }
  }

  EventPropagators.accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The string corresponding to this `beforeInput` event.
 */
function getNativeBeforeInputChars(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case topLevelTypes.topCompositionEnd:
      return getDataFromCustomEvent(nativeEvent);
    case topLevelTypes.topKeyPress:
      /**
       * If native `textInput` events are available, our goal is to make
       * use of them. However, there is a special case: the spacebar key.
       * In Webkit, preventing default on a spacebar `textInput` event
       * cancels character insertion, but it *also* causes the browser
       * to fall back to its default spacebar behavior of scrolling the
       * page.
       *
       * Tracking at:
       * https://code.google.com/p/chromium/issues/detail?id=355103
       *
       * To avoid this issue, use the keypress event as if no `textInput`
       * event is available.
       */
      var which = nativeEvent.which;
      if (which !== SPACEBAR_CODE) {
        return null;
      }

      hasSpaceKeypress = true;
      return SPACEBAR_CHAR;

    case topLevelTypes.topTextInput:
      // Record the characters to be added to the DOM.
      var chars = nativeEvent.data;

      // If it's a spacebar character, assume that we have already handled
      // it at the keypress level and bail immediately. Android Chrome
      // doesn't give us keycodes, so we need to blacklist it.
      if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
        return null;
      }

      return chars;

    default:
      // For other native event types, do nothing.
      return null;
  }
}

/**
 * For browsers that do not provide the `textInput` event, extract the
 * appropriate string to use for SyntheticInputEvent.
 *
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The fallback string for this `beforeInput` event.
 */
function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
  // If we are currently composing (IME) and using a fallback to do so,
  // try to extract the composed characters from the fallback object.
  if (currentComposition) {
    if (topLevelType === topLevelTypes.topCompositionEnd || isFallbackCompositionEnd(topLevelType, nativeEvent)) {
      var chars = currentComposition.getData();
      FallbackCompositionState.release(currentComposition);
      currentComposition = null;
      return chars;
    }
    return null;
  }

  switch (topLevelType) {
    case topLevelTypes.topPaste:
      // If a paste event occurs after a keypress, throw out the input
      // chars. Paste events should not lead to BeforeInput events.
      return null;
    case topLevelTypes.topKeyPress:
      /**
       * As of v27, Firefox may fire keypress events even when no character
       * will be inserted. A few possibilities:
       *
       * - `which` is `0`. Arrow keys, Esc key, etc.
       *
       * - `which` is the pressed key code, but no char is available.
       *   Ex: 'AltGr + d` in Polish. There is no modified character for
       *   this key combination and no character is inserted into the
       *   document, but FF fires the keypress for char code `100` anyway.
       *   No `input` event will occur.
       *
       * - `which` is the pressed key code, but a command combination is
       *   being used. Ex: `Cmd+C`. No character is inserted, and no
       *   `input` event will occur.
       */
      if (nativeEvent.which && !isKeypressCommand(nativeEvent)) {
        return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case topLevelTypes.topCompositionEnd:
      return useFallbackCompositionData ? null : nativeEvent.data;
    default:
      return null;
  }
}

/**
 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
 * `textInput` or fallback behavior.
 *
 * @return {?object} A SyntheticInputEvent.
 */
function extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var chars;

  if (canUseTextInputEvent) {
    chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
  } else {
    chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
  }

  // If no characters are being inserted, no BeforeInput event should
  // be fired.
  if (!chars) {
    return null;
  }

  var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, targetInst, nativeEvent, nativeEventTarget);

  event.data = chars;
  EventPropagators.accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * Create an `onBeforeInput` event to match
 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
 *
 * This event plugin is based on the native `textInput` event
 * available in Chrome, Safari, Opera, and IE. This event fires after
 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
 *
 * `beforeInput` is spec'd but not implemented in any browsers, and
 * the `input` event does not provide any useful information about what has
 * actually been added, contrary to the spec. Thus, `textInput` is the best
 * available event to identify the characters that have actually been inserted
 * into the target node.
 *
 * This plugin is also responsible for emitting `composition` events, thus
 * allowing us to share composition fallback code for both `beforeInput` and
 * `composition` event types.
 */
var BeforeInputEventPlugin$1 = {

  eventTypes: eventTypes,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    return [extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget), extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget)];
  }
};

var BeforeInputEventPlugin_1 = BeforeInputEventPlugin$1;

var _prodInvariant$12 = reactProdInvariant_1;
var _assign$7 = index$1;

var PooledClass$5 = PooledClass_1;

function CallbackQueue$1() {
  this._callbacks = null;
  this._contexts = null;
}

_assign$7(CallbackQueue$1.prototype, {

  /**
   * Enqueues a callback to be invoked when `notifyAll` is invoked.
   *
   * @param {function} callback Invoked when `notifyAll` is invoked.
   * @param {?object} context Context to call `callback` with.
   * @internal
   */
  enqueue: function (callback, context) {
    this._callbacks = this._callbacks || [];
    this._contexts = this._contexts || [];
    this._callbacks.push(callback);
    this._contexts.push(context);
  },

  /**
   * Invokes all enqueued callbacks and clears the queue. This is invoked after
   * the DOM representation of a component has been created or updated.
   *
   * @internal
   */
  notifyAll: function () {
    var callbacks = this._callbacks;
    var contexts = this._contexts;
    if (callbacks) {
      !(callbacks.length === contexts.length) ? _prodInvariant$12('24') : void 0;
      this._callbacks = null;
      this._contexts = null;
      for (var i = 0; i < callbacks.length; i++) {
        callbacks[i].call(contexts[i]);
      }
      callbacks.length = 0;
      contexts.length = 0;
    }
  },

  checkpoint: function () {
    return this._callbacks ? this._callbacks.length : 0;
  },

  rollback: function (len) {
    if (this._callbacks) {
      this._callbacks.length = len;
      this._contexts.length = len;
    }
  },

  /**
   * Resets the internal queue.
   *
   * @internal
   */
  reset: function () {
    this._callbacks = null;
    this._contexts = null;
  },

  /**
   * `PooledClass` looks for this.
   */
  destructor: function () {
    this.reset();
  }

});

PooledClass$5.addPoolingTo(CallbackQueue$1);

var CallbackQueue_1 = CallbackQueue$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactFeatureFlags
 * 
 */

var ReactFeatureFlags$1 = {
  // When true, call console.time() before and .timeEnd() after each top-level
  // render (both initial renders and updates). Useful when looking at prod-mode
  // timeline profiles in Chrome, for example.
  logTopLevelRenders: false
};

var ReactFeatureFlags_1 = ReactFeatureFlags$1;

var _prodInvariant$13 = reactProdInvariant_1;

var ReactOwner$1 = {

  /**
   * @param {?object} object
   * @return {boolean} True if `object` is a valid owner.
   * @final
   */
  isValidOwner: function (object) {
    return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function');
  },

  /**
   * Adds a component by ref to an owner component.
   *
   * @param {ReactComponent} component Component to reference.
   * @param {string} ref Name by which to refer to the component.
   * @param {ReactOwner} owner Component on which to record the ref.
   * @final
   * @internal
   */
  addComponentAsRefTo: function (component, ref, owner) {
    !ReactOwner$1.isValidOwner(owner) ? _prodInvariant$13('119') : void 0;
    owner.attachRef(ref, component);
  },

  /**
   * Removes a component by ref from an owner component.
   *
   * @param {ReactComponent} component Component to dereference.
   * @param {string} ref Name of the ref to remove.
   * @param {ReactOwner} owner Component on which the ref is recorded.
   * @final
   * @internal
   */
  removeComponentAsRefFrom: function (component, ref, owner) {
    !ReactOwner$1.isValidOwner(owner) ? _prodInvariant$13('120') : void 0;
    var ownerPublicInstance = owner.getPublicInstance();
    // Check that `component`'s owner is still alive and that `component` is still the current ref
    // because we do not want to detach the ref if another component stole it.
    if (ownerPublicInstance && ownerPublicInstance.refs[ref] === component.getPublicInstance()) {
      owner.detachRef(ref);
    }
  }

};

var ReactOwner_1 = ReactOwner$1;

var ReactOwner = ReactOwner_1;

var ReactRef$1 = {};

function attachRef(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(component.getPublicInstance());
  } else {
    // Legacy ref
    ReactOwner.addComponentAsRefTo(component, ref, owner);
  }
}

function detachRef(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(null);
  } else {
    // Legacy ref
    ReactOwner.removeComponentAsRefFrom(component, ref, owner);
  }
}

ReactRef$1.attachRefs = function (instance, element) {
  if (element === null || element === false) {
    return;
  }
  var ref = element.ref;
  if (ref != null) {
    attachRef(ref, instance, element._owner);
  }
};

ReactRef$1.shouldUpdateRefs = function (prevElement, nextElement) {
  // If either the owner or a `ref` has changed, make sure the newest owner
  // has stored a reference to `this`, and the previous owner (if different)
  // has forgotten the reference to `this`. We use the element instead
  // of the public this.props because the post processing cannot determine
  // a ref. The ref conceptually lives on the element.

  // TODO: Should this even be possible? The owner cannot change because
  // it's forbidden by shouldUpdateReactComponent. The ref can change
  // if you swap the keys of but not the refs. Reconsider where this check
  // is made. It probably belongs where the key checking and
  // instantiateReactComponent is done.

  var prevEmpty = prevElement === null || prevElement === false;
  var nextEmpty = nextElement === null || nextElement === false;

  return(
    // This has a few false positives w/r/t empty components.
    prevEmpty || nextEmpty || nextElement.ref !== prevElement.ref ||
    // If owner changes but we have an unchanged function ref, don't update refs
    typeof nextElement.ref === 'string' && nextElement._owner !== prevElement._owner
  );
};

ReactRef$1.detachRefs = function (instance, element) {
  if (element === null || element === false) {
    return;
  }
  var ref = element.ref;
  if (ref != null) {
    detachRef(ref, instance, element._owner);
  }
};

var ReactRef_1 = ReactRef$1;

/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactInstrumentation
 */

var ReactRef = ReactRef_1;
function attachRefs() {
  ReactRef.attachRefs(this, this._currentElement);
}

var ReactReconciler$2 = {

  /**
   * Initializes the component, renders markup, and registers event listeners.
   *
   * @param {ReactComponent} internalInstance
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {?object} the containing host component instance
   * @param {?object} info about the host container
   * @return {?string} Rendered markup to be inserted into the DOM.
   * @final
   * @internal
   */
  mountComponent: function (internalInstance, transaction, hostParent, hostContainerInfo, context) {
    var markup = internalInstance.mountComponent(transaction, hostParent, hostContainerInfo, context);
    if (internalInstance._currentElement && internalInstance._currentElement.ref != null) {
      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
    }
    return markup;
  },

  /**
   * Returns a value that can be passed to
   * ReactComponentEnvironment.replaceNodeWithMarkup.
   */
  getHostNode: function (internalInstance) {
    return internalInstance.getHostNode();
  },

  /**
   * Releases any resources allocated by `mountComponent`.
   *
   * @final
   * @internal
   */
  unmountComponent: function (internalInstance, safely) {
    ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
    internalInstance.unmountComponent(safely);
    
  },

  /**
   * Update a component using a new element.
   *
   * @param {ReactComponent} internalInstance
   * @param {ReactElement} nextElement
   * @param {ReactReconcileTransaction} transaction
   * @param {object} context
   * @internal
   */
  receiveComponent: function (internalInstance, nextElement, transaction, context) {
    var prevElement = internalInstance._currentElement;

    if (nextElement === prevElement && context === internalInstance._context) {
      // Since elements are immutable after the owner is rendered,
      // we can do a cheap identity compare here to determine if this is a
      // superfluous reconcile. It's possible for state to be mutable but such
      // change should trigger an update of the owner which would recreate
      // the element. We explicitly check for the existence of an owner since
      // it's possible for an element created outside a composite to be
      // deeply mutated and reused.

      // TODO: Bailing out early is just a perf optimization right?
      // TODO: Removing the return statement should affect correctness?
      return;
    }

    var refsChanged = ReactRef.shouldUpdateRefs(prevElement, nextElement);

    if (refsChanged) {
      ReactRef.detachRefs(internalInstance, prevElement);
    }

    internalInstance.receiveComponent(nextElement, transaction, context);

    if (refsChanged && internalInstance._currentElement && internalInstance._currentElement.ref != null) {
      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
    }

    
  },

  /**
   * Flush any dirty changes in a component.
   *
   * @param {ReactComponent} internalInstance
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  performUpdateIfNecessary: function (internalInstance, transaction, updateBatchNumber) {
    if (internalInstance._updateBatchNumber !== updateBatchNumber) {
      // The component's enqueued batch number should always be the current
      // batch or the following one.
      void 0;
      return;
    }
    internalInstance.performUpdateIfNecessary(transaction);
    
  }

};

var ReactReconciler_1 = ReactReconciler$2;

var _prodInvariant$14 = reactProdInvariant_1;

var Mixin = {
  /**
   * Sets up this instance so that it is prepared for collecting metrics. Does
   * so such that this setup method may be used on an instance that is already
   * initialized, in a way that does not consume additional memory upon reuse.
   * That can be useful if you decide to make your subclass of this mixin a
   * "PooledClass".
   */
  reinitializeTransaction: function () {
    this.transactionWrappers = this.getTransactionWrappers();
    if (this.wrapperInitData) {
      this.wrapperInitData.length = 0;
    } else {
      this.wrapperInitData = [];
    }
    this._isInTransaction = false;
  },

  _isInTransaction: false,

  /**
   * @abstract
   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
   */
  getTransactionWrappers: null,

  isInTransaction: function () {
    return !!this._isInTransaction;
  },

  /**
   * Executes the function within a safety window. Use this for the top level
   * methods that result in large amounts of computation/mutations that would
   * need to be safety checked. The optional arguments helps prevent the need
   * to bind in many cases.
   *
   * @param {function} method Member of scope to call.
   * @param {Object} scope Scope to invoke from.
   * @param {Object?=} a Argument to pass to the method.
   * @param {Object?=} b Argument to pass to the method.
   * @param {Object?=} c Argument to pass to the method.
   * @param {Object?=} d Argument to pass to the method.
   * @param {Object?=} e Argument to pass to the method.
   * @param {Object?=} f Argument to pass to the method.
   *
   * @return {*} Return value from `method`.
   */
  perform: function (method, scope, a, b, c, d, e, f) {
    !!this.isInTransaction() ? _prodInvariant$14('27') : void 0;
    var errorThrown;
    var ret;
    try {
      this._isInTransaction = true;
      // Catching errors makes debugging more difficult, so we start with
      // errorThrown set to true before setting it to false after calling
      // close -- if it's still set to true in the finally block, it means
      // one of these calls threw.
      errorThrown = true;
      this.initializeAll(0);
      ret = method.call(scope, a, b, c, d, e, f);
      errorThrown = false;
    } finally {
      try {
        if (errorThrown) {
          // If `method` throws, prefer to show that stack trace over any thrown
          // by invoking `closeAll`.
          try {
            this.closeAll(0);
          } catch (err) {}
        } else {
          // Since `method` didn't throw, we don't want to silence the exception
          // here.
          this.closeAll(0);
        }
      } finally {
        this._isInTransaction = false;
      }
    }
    return ret;
  },

  initializeAll: function (startIndex) {
    var transactionWrappers = this.transactionWrappers;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      try {
        // Catching errors makes debugging more difficult, so we start with the
        // OBSERVED_ERROR state before overwriting it with the real return value
        // of initialize -- if it's still set to OBSERVED_ERROR in the finally
        // block, it means wrapper.initialize threw.
        this.wrapperInitData[i] = Transaction$1.OBSERVED_ERROR;
        this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
      } finally {
        if (this.wrapperInitData[i] === Transaction$1.OBSERVED_ERROR) {
          // The initializer for wrapper i threw an error; initialize the
          // remaining wrappers but silence any exceptions from them to ensure
          // that the first error is the one to bubble up.
          try {
            this.initializeAll(i + 1);
          } catch (err) {}
        }
      }
    }
  },

  /**
   * Invokes each of `this.transactionWrappers.close[i]` functions, passing into
   * them the respective return values of `this.transactionWrappers.init[i]`
   * (`close`rs that correspond to initializers that failed will not be
   * invoked).
   */
  closeAll: function (startIndex) {
    !this.isInTransaction() ? _prodInvariant$14('28') : void 0;
    var transactionWrappers = this.transactionWrappers;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      var initData = this.wrapperInitData[i];
      var errorThrown;
      try {
        // Catching errors makes debugging more difficult, so we start with
        // errorThrown set to true before setting it to false after calling
        // close -- if it's still set to true in the finally block, it means
        // wrapper.close threw.
        errorThrown = true;
        if (initData !== Transaction$1.OBSERVED_ERROR && wrapper.close) {
          wrapper.close.call(this, initData);
        }
        errorThrown = false;
      } finally {
        if (errorThrown) {
          // The closer for wrapper i threw an error; close the remaining
          // wrappers but silence any exceptions from them to ensure that the
          // first error is the one to bubble up.
          try {
            this.closeAll(i + 1);
          } catch (e) {}
        }
      }
    }
    this.wrapperInitData.length = 0;
  }
};

var Transaction$1 = {

  Mixin: Mixin,

  /**
   * Token to look for to determine if an error occurred.
   */
  OBSERVED_ERROR: {}

};

var Transaction_1 = Transaction$1;

var _prodInvariant$11 = reactProdInvariant_1;
var _assign$6 = index$1;

var CallbackQueue = CallbackQueue_1;
var PooledClass$4 = PooledClass_1;
var ReactFeatureFlags = ReactFeatureFlags_1;
var ReactReconciler$1 = ReactReconciler_1;
var Transaction = Transaction_1;

var dirtyComponents = [];
var updateBatchNumber = 0;
var asapCallbackQueue = CallbackQueue.getPooled();
var asapEnqueued = false;

var batchingStrategy = null;

function ensureInjected() {
  !(ReactUpdates$2.ReactReconcileTransaction && batchingStrategy) ? _prodInvariant$11('123') : void 0;
}

var NESTED_UPDATES = {
  initialize: function () {
    this.dirtyComponentsLength = dirtyComponents.length;
  },
  close: function () {
    if (this.dirtyComponentsLength !== dirtyComponents.length) {
      // Additional updates were enqueued by componentDidUpdate handlers or
      // similar; before our own UPDATE_QUEUEING wrapper closes, we want to run
      // these new updates so that if A's componentDidUpdate calls setState on
      // B, B will update before the callback A's updater provided when calling
      // setState.
      dirtyComponents.splice(0, this.dirtyComponentsLength);
      flushBatchedUpdates();
    } else {
      dirtyComponents.length = 0;
    }
  }
};

var UPDATE_QUEUEING = {
  initialize: function () {
    this.callbackQueue.reset();
  },
  close: function () {
    this.callbackQueue.notifyAll();
  }
};

var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];

function ReactUpdatesFlushTransaction() {
  this.reinitializeTransaction();
  this.dirtyComponentsLength = null;
  this.callbackQueue = CallbackQueue.getPooled();
  this.reconcileTransaction = ReactUpdates$2.ReactReconcileTransaction.getPooled(
  /* useCreateElement */true);
}

_assign$6(ReactUpdatesFlushTransaction.prototype, Transaction.Mixin, {
  getTransactionWrappers: function () {
    return TRANSACTION_WRAPPERS;
  },

  destructor: function () {
    this.dirtyComponentsLength = null;
    CallbackQueue.release(this.callbackQueue);
    this.callbackQueue = null;
    ReactUpdates$2.ReactReconcileTransaction.release(this.reconcileTransaction);
    this.reconcileTransaction = null;
  },

  perform: function (method, scope, a) {
    // Essentially calls `this.reconcileTransaction.perform(method, scope, a)`
    // with this transaction's wrappers around it.
    return Transaction.Mixin.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, scope, a);
  }
});

PooledClass$4.addPoolingTo(ReactUpdatesFlushTransaction);

function batchedUpdates(callback, a, b, c, d, e) {
  ensureInjected();
  batchingStrategy.batchedUpdates(callback, a, b, c, d, e);
}

/**
 * Array comparator for ReactComponents by mount ordering.
 *
 * @param {ReactComponent} c1 first component you're comparing
 * @param {ReactComponent} c2 second component you're comparing
 * @return {number} Return value usable by Array.prototype.sort().
 */
function mountOrderComparator(c1, c2) {
  return c1._mountOrder - c2._mountOrder;
}

function runBatchedUpdates(transaction) {
  var len = transaction.dirtyComponentsLength;
  !(len === dirtyComponents.length) ? _prodInvariant$11('124', len, dirtyComponents.length) : void 0;

  // Since reconciling a component higher in the owner hierarchy usually (not
  // always -- see shouldComponentUpdate()) will reconcile children, reconcile
  // them before their children by sorting the array.
  dirtyComponents.sort(mountOrderComparator);

  // Any updates enqueued while reconciling must be performed after this entire
  // batch. Otherwise, if dirtyComponents is [A, B] where A has children B and
  // C, B could update twice in a single batch if C's render enqueues an update
  // to B (since B would have already updated, we should skip it, and the only
  // way we can know to do so is by checking the batch counter).
  updateBatchNumber++;

  for (var i = 0; i < len; i++) {
    // If a component is unmounted before pending changes apply, it will still
    // be here, but we assume that it has cleared its _pendingCallbacks and
    // that performUpdateIfNecessary is a noop.
    var component = dirtyComponents[i];

    // If performUpdateIfNecessary happens to enqueue any new updates, we
    // shouldn't execute the callbacks until the next render happens, so
    // stash the callbacks first
    var callbacks = component._pendingCallbacks;
    component._pendingCallbacks = null;

    var markerName;
    if (ReactFeatureFlags.logTopLevelRenders) {
      var namedComponent = component;
      // Duck type TopLevelWrapper. This is probably always true.
      if (component._currentElement.props === component._renderedComponent._currentElement) {
        namedComponent = component._renderedComponent;
      }
      markerName = 'React update: ' + namedComponent.getName();
      console.time(markerName);
    }

    ReactReconciler$1.performUpdateIfNecessary(component, transaction.reconcileTransaction, updateBatchNumber);

    if (markerName) {
      console.timeEnd(markerName);
    }

    if (callbacks) {
      for (var j = 0; j < callbacks.length; j++) {
        transaction.callbackQueue.enqueue(callbacks[j], component.getPublicInstance());
      }
    }
  }
}

var flushBatchedUpdates = function () {
  // ReactUpdatesFlushTransaction's wrappers will clear the dirtyComponents
  // array and perform any updates enqueued by mount-ready handlers (i.e.,
  // componentDidUpdate) but we need to check here too in order to catch
  // updates enqueued by setState callbacks and asap calls.
  while (dirtyComponents.length || asapEnqueued) {
    if (dirtyComponents.length) {
      var transaction = ReactUpdatesFlushTransaction.getPooled();
      transaction.perform(runBatchedUpdates, null, transaction);
      ReactUpdatesFlushTransaction.release(transaction);
    }

    if (asapEnqueued) {
      asapEnqueued = false;
      var queue = asapCallbackQueue;
      asapCallbackQueue = CallbackQueue.getPooled();
      queue.notifyAll();
      CallbackQueue.release(queue);
    }
  }
};

/**
 * Mark a component as needing a rerender, adding an optional callback to a
 * list of functions which will be executed once the rerender occurs.
 */
function enqueueUpdate(component) {
  ensureInjected();

  // Various parts of our code (such as ReactCompositeComponent's
  // _renderValidatedComponent) assume that calls to render aren't nested;
  // verify that that's the case. (This is called by each top-level update
  // function, like setState, forceUpdate, etc.; creation and
  // destruction of top-level components is guarded in ReactMount.)

  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }

  dirtyComponents.push(component);
  if (component._updateBatchNumber == null) {
    component._updateBatchNumber = updateBatchNumber + 1;
  }
}

/**
 * Enqueue a callback to be run at the end of the current batching cycle. Throws
 * if no updates are currently being performed.
 */
function asap(callback, context) {
  !batchingStrategy.isBatchingUpdates ? _prodInvariant$11('125') : void 0;
  asapCallbackQueue.enqueue(callback, context);
  asapEnqueued = true;
}

var ReactUpdatesInjection = {
  injectReconcileTransaction: function (ReconcileTransaction) {
    !ReconcileTransaction ? _prodInvariant$11('126') : void 0;
    ReactUpdates$2.ReactReconcileTransaction = ReconcileTransaction;
  },

  injectBatchingStrategy: function (_batchingStrategy) {
    !_batchingStrategy ? _prodInvariant$11('127') : void 0;
    !(typeof _batchingStrategy.batchedUpdates === 'function') ? _prodInvariant$11('128') : void 0;
    !(typeof _batchingStrategy.isBatchingUpdates === 'boolean') ? _prodInvariant$11('129') : void 0;
    batchingStrategy = _batchingStrategy;
  }
};

var ReactUpdates$2 = {
  /**
   * React references `ReactReconcileTransaction` using this property in order
   * to allow dependency injection.
   *
   * @internal
   */
  ReactReconcileTransaction: null,

  batchedUpdates: batchedUpdates,
  enqueueUpdate: enqueueUpdate,
  flushBatchedUpdates: flushBatchedUpdates,
  injection: ReactUpdatesInjection,
  asap: asap
};

var ReactUpdates_1 = ReactUpdates$2;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getEventTarget
 */

function getEventTarget$1(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;

  // Normalize SVG <use> element events #4963
  if (target.correspondingUseElement) {
    target = target.correspondingUseElement;
  }

  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
  // @see http://www.quirksmode.org/js/events_properties.html
  return target.nodeType === 3 ? target.parentNode : target;
}

var getEventTarget_1 = getEventTarget$1;

var ExecutionEnvironment$5 = ExecutionEnvironment_1;

var useHasFeature;
if (ExecutionEnvironment$5.canUseDOM) {
  useHasFeature = document.implementation && document.implementation.hasFeature &&
  // always returns true in newer browsers as per the standard.
  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
  document.implementation.hasFeature('', '') !== true;
}

/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported$1(eventNameSuffix, capture) {
  if (!ExecutionEnvironment$5.canUseDOM || capture && !('addEventListener' in document)) {
    return false;
  }

  var eventName = 'on' + eventNameSuffix;
  var isSupported = eventName in document;

  if (!isSupported) {
    var element = document.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}

var isEventSupported_1 = isEventSupported$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isTextInputElement
 * 
 */

var supportedInputTypes = {
  'color': true,
  'date': true,
  'datetime': true,
  'datetime-local': true,
  'email': true,
  'month': true,
  'number': true,
  'password': true,
  'range': true,
  'search': true,
  'tel': true,
  'text': true,
  'time': true,
  'url': true,
  'week': true
};

function isTextInputElement$1(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();

  if (nodeName === 'input') {
    return !!supportedInputTypes[elem.type];
  }

  if (nodeName === 'textarea') {
    return true;
  }

  return false;
}

var isTextInputElement_1 = isTextInputElement$1;

var EventConstants$4 = EventConstants_1;
var EventPluginHub$2 = EventPluginHub_1;
var EventPropagators$2 = EventPropagators_1;
var ExecutionEnvironment$4 = ExecutionEnvironment_1;
var ReactDOMComponentTree$3 = ReactDOMComponentTree_1;
var ReactUpdates$1 = ReactUpdates_1;
var SyntheticEvent$3 = SyntheticEvent_1;

var getEventTarget = getEventTarget_1;
var isEventSupported = isEventSupported_1;
var isTextInputElement = isTextInputElement_1;
var keyOf$3 = keyOf_1;

var topLevelTypes$3 = EventConstants$4.topLevelTypes;

var eventTypes$1 = {
  change: {
    phasedRegistrationNames: {
      bubbled: keyOf$3({ onChange: null }),
      captured: keyOf$3({ onChangeCapture: null })
    },
    dependencies: [topLevelTypes$3.topBlur, topLevelTypes$3.topChange, topLevelTypes$3.topClick, topLevelTypes$3.topFocus, topLevelTypes$3.topInput, topLevelTypes$3.topKeyDown, topLevelTypes$3.topKeyUp, topLevelTypes$3.topSelectionChange]
  }
};

/**
 * For IE shims
 */
var activeElement = null;
var activeElementInst = null;
var activeElementValue = null;
var activeElementValueProp = null;

/**
 * SECTION: handle `change` event
 */
function shouldUseChangeEvent(elem) {
  var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
}

var doesChangeEventBubble = false;
if (ExecutionEnvironment$4.canUseDOM) {
  // See `handleChange` comment below
  doesChangeEventBubble = isEventSupported('change') && (!('documentMode' in document) || document.documentMode > 8);
}

function manualDispatchChangeEvent(nativeEvent) {
  var event = SyntheticEvent$3.getPooled(eventTypes$1.change, activeElementInst, nativeEvent, getEventTarget(nativeEvent));
  EventPropagators$2.accumulateTwoPhaseDispatches(event);

  // If change and propertychange bubbled, we'd just bind to it like all the
  // other events and have it go through ReactBrowserEventEmitter. Since it
  // doesn't, we manually listen for the events and so we have to enqueue and
  // process the abstract event manually.
  //
  // Batching is necessary here in order to ensure that all event handlers run
  // before the next rerender (including event handlers attached to ancestor
  // elements instead of directly on the input). Without this, controlled
  // components don't work properly in conjunction with event bubbling because
  // the component is rerendered and the value reverted before all the event
  // handlers can run. See https://github.com/facebook/react/issues/708.
  ReactUpdates$1.batchedUpdates(runEventInBatch, event);
}

function runEventInBatch(event) {
  EventPluginHub$2.enqueueEvents(event);
  EventPluginHub$2.processEventQueue(false);
}

function startWatchingForChangeEventIE8(target, targetInst) {
  activeElement = target;
  activeElementInst = targetInst;
  activeElement.attachEvent('onchange', manualDispatchChangeEvent);
}

function stopWatchingForChangeEventIE8() {
  if (!activeElement) {
    return;
  }
  activeElement.detachEvent('onchange', manualDispatchChangeEvent);
  activeElement = null;
  activeElementInst = null;
}

function getTargetInstForChangeEvent(topLevelType, targetInst) {
  if (topLevelType === topLevelTypes$3.topChange) {
    return targetInst;
  }
}
function handleEventsForChangeEventIE8(topLevelType, target, targetInst) {
  if (topLevelType === topLevelTypes$3.topFocus) {
    // stopWatching() should be a noop here but we call it just in case we
    // missed a blur event somehow.
    stopWatchingForChangeEventIE8();
    startWatchingForChangeEventIE8(target, targetInst);
  } else if (topLevelType === topLevelTypes$3.topBlur) {
    stopWatchingForChangeEventIE8();
  }
}

/**
 * SECTION: handle `input` event
 */
var isInputEventSupported = false;
if (ExecutionEnvironment$4.canUseDOM) {
  // IE9 claims to support the input event but fails to trigger it when
  // deleting text, so we ignore its input events.
  // IE10+ fire input events to often, such when a placeholder
  // changes or when an input with a placeholder is focused.
  isInputEventSupported = isEventSupported('input') && (!('documentMode' in document) || document.documentMode > 11);
}

/**
 * (For IE <=11) Replacement getter/setter for the `value` property that gets
 * set on the active element.
 */
var newValueProp = {
  get: function () {
    return activeElementValueProp.get.call(this);
  },
  set: function (val) {
    // Cast to a string so we can do equality checks.
    activeElementValue = '' + val;
    activeElementValueProp.set.call(this, val);
  }
};

/**
 * (For IE <=11) Starts tracking propertychange events on the passed-in element
 * and override the value property so that we can distinguish user events from
 * value changes in JS.
 */
function startWatchingForValueChange(target, targetInst) {
  activeElement = target;
  activeElementInst = targetInst;
  activeElementValue = target.value;
  activeElementValueProp = Object.getOwnPropertyDescriptor(target.constructor.prototype, 'value');

  // Not guarded in a canDefineProperty check: IE8 supports defineProperty only
  // on DOM elements
  Object.defineProperty(activeElement, 'value', newValueProp);
  if (activeElement.attachEvent) {
    activeElement.attachEvent('onpropertychange', handlePropertyChange);
  } else {
    activeElement.addEventListener('propertychange', handlePropertyChange, false);
  }
}

/**
 * (For IE <=11) Removes the event listeners from the currently-tracked element,
 * if any exists.
 */
function stopWatchingForValueChange() {
  if (!activeElement) {
    return;
  }

  // delete restores the original property definition
  delete activeElement.value;

  if (activeElement.detachEvent) {
    activeElement.detachEvent('onpropertychange', handlePropertyChange);
  } else {
    activeElement.removeEventListener('propertychange', handlePropertyChange, false);
  }

  activeElement = null;
  activeElementInst = null;
  activeElementValue = null;
  activeElementValueProp = null;
}

/**
 * (For IE <=11) Handles a propertychange event, sending a `change` event if
 * the value of the active element has changed.
 */
function handlePropertyChange(nativeEvent) {
  if (nativeEvent.propertyName !== 'value') {
    return;
  }
  var value = nativeEvent.srcElement.value;
  if (value === activeElementValue) {
    return;
  }
  activeElementValue = value;

  manualDispatchChangeEvent(nativeEvent);
}

/**
 * If a `change` event should be fired, returns the target's ID.
 */
function getTargetInstForInputEvent(topLevelType, targetInst) {
  if (topLevelType === topLevelTypes$3.topInput) {
    // In modern browsers (i.e., not IE8 or IE9), the input event is exactly
    // what we want so fall through here and trigger an abstract event
    return targetInst;
  }
}

function handleEventsForInputEventIE(topLevelType, target, targetInst) {
  if (topLevelType === topLevelTypes$3.topFocus) {
    // In IE8, we can capture almost all .value changes by adding a
    // propertychange handler and looking for events with propertyName
    // equal to 'value'
    // In IE9-11, propertychange fires for most input events but is buggy and
    // doesn't fire when text is deleted, but conveniently, selectionchange
    // appears to fire in all of the remaining cases so we catch those and
    // forward the event if the value has changed
    // In either case, we don't want to call the event handler if the value
    // is changed from JS so we redefine a setter for `.value` that updates
    // our activeElementValue variable, allowing us to ignore those changes
    //
    // stopWatching() should be a noop here but we call it just in case we
    // missed a blur event somehow.
    stopWatchingForValueChange();
    startWatchingForValueChange(target, targetInst);
  } else if (topLevelType === topLevelTypes$3.topBlur) {
    stopWatchingForValueChange();
  }
}

// For IE8 and IE9.
function getTargetInstForInputEventIE(topLevelType, targetInst) {
  if (topLevelType === topLevelTypes$3.topSelectionChange || topLevelType === topLevelTypes$3.topKeyUp || topLevelType === topLevelTypes$3.topKeyDown) {
    // On the selectionchange event, the target is just document which isn't
    // helpful for us so just check activeElement instead.
    //
    // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
    // propertychange on the first input event after setting `value` from a
    // script and fires only keydown, keypress, keyup. Catching keyup usually
    // gets it and catching keydown lets us fire an event for the first
    // keystroke if user does a key repeat (it'll be a little delayed: right
    // before the second keystroke). Other input methods (e.g., paste) seem to
    // fire selectionchange normally.
    if (activeElement && activeElement.value !== activeElementValue) {
      activeElementValue = activeElement.value;
      return activeElementInst;
    }
  }
}

/**
 * SECTION: handle `click` event
 */
function shouldUseClickEvent(elem) {
  // Use the `click` event to detect changes to checkbox and radio inputs.
  // This approach works across all browsers, whereas `change` does not fire
  // until `blur` in IE8.
  return elem.nodeName && elem.nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
}

function getTargetInstForClickEvent(topLevelType, targetInst) {
  if (topLevelType === topLevelTypes$3.topClick) {
    return targetInst;
  }
}

/**
 * This plugin creates an `onChange` event that normalizes change events
 * across form elements. This event fires at a time when it's possible to
 * change the element's value without seeing a flicker.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - select
 */
var ChangeEventPlugin$1 = {

  eventTypes: eventTypes$1,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var targetNode = targetInst ? ReactDOMComponentTree$3.getNodeFromInstance(targetInst) : window;

    var getTargetInstFunc, handleEventFunc;
    if (shouldUseChangeEvent(targetNode)) {
      if (doesChangeEventBubble) {
        getTargetInstFunc = getTargetInstForChangeEvent;
      } else {
        handleEventFunc = handleEventsForChangeEventIE8;
      }
    } else if (isTextInputElement(targetNode)) {
      if (isInputEventSupported) {
        getTargetInstFunc = getTargetInstForInputEvent;
      } else {
        getTargetInstFunc = getTargetInstForInputEventIE;
        handleEventFunc = handleEventsForInputEventIE;
      }
    } else if (shouldUseClickEvent(targetNode)) {
      getTargetInstFunc = getTargetInstForClickEvent;
    }

    if (getTargetInstFunc) {
      var inst = getTargetInstFunc(topLevelType, targetInst);
      if (inst) {
        var event = SyntheticEvent$3.getPooled(eventTypes$1.change, inst, nativeEvent, nativeEventTarget);
        event.type = 'change';
        EventPropagators$2.accumulateTwoPhaseDispatches(event);
        return event;
      }
    }

    if (handleEventFunc) {
      handleEventFunc(topLevelType, targetNode, targetInst);
    }
  }

};

var ChangeEventPlugin_1 = ChangeEventPlugin$1;

var keyOf$4 = keyOf_1;

/**
 * Module that is injectable into `EventPluginHub`, that specifies a
 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
 * plugins, without having to package every one of them. This is better than
 * having plugins be ordered in the same order that they are injected because
 * that ordering would be influenced by the packaging order.
 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
 */
var DefaultEventPluginOrder$1 = [keyOf$4({ ResponderEventPlugin: null }), keyOf$4({ SimpleEventPlugin: null }), keyOf$4({ TapEventPlugin: null }), keyOf$4({ EnterLeaveEventPlugin: null }), keyOf$4({ ChangeEventPlugin: null }), keyOf$4({ SelectEventPlugin: null }), keyOf$4({ BeforeInputEventPlugin: null })];

var DefaultEventPluginOrder_1 = DefaultEventPluginOrder$1;

var SyntheticEvent$4 = SyntheticEvent_1;

var getEventTarget$2 = getEventTarget_1;

/**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var UIEventInterface = {
  view: function (event) {
    if (event.view) {
      return event.view;
    }

    var target = getEventTarget$2(event);
    if (target.window === target) {
      // target is a window object
      return target;
    }

    var doc = target.ownerDocument;
    // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
    if (doc) {
      return doc.defaultView || doc.parentWindow;
    } else {
      return window;
    }
  },
  detail: function (event) {
    return event.detail || 0;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticUIEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$4.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$4.augmentClass(SyntheticUIEvent$1, UIEventInterface);

var SyntheticUIEvent_1 = SyntheticUIEvent$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ViewportMetrics
 */

var ViewportMetrics$1 = {

  currentScrollLeft: 0,

  currentScrollTop: 0,

  refreshScrollValues: function (scrollPosition) {
    ViewportMetrics$1.currentScrollLeft = scrollPosition.x;
    ViewportMetrics$1.currentScrollTop = scrollPosition.y;
  }

};

var ViewportMetrics_1 = ViewportMetrics$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getEventModifierState
 */

var modifierKeyToProp = {
  'Alt': 'altKey',
  'Control': 'ctrlKey',
  'Meta': 'metaKey',
  'Shift': 'shiftKey'
};

// IE8 does not implement getModifierState so we simply map it to the only
// modifier keys exposed by the event itself, does not support Lock-keys.
// Currently, all major browsers except Chrome seems to support Lock-keys.
function modifierStateGetter(keyArg) {
  var syntheticEvent = this;
  var nativeEvent = syntheticEvent.nativeEvent;
  if (nativeEvent.getModifierState) {
    return nativeEvent.getModifierState(keyArg);
  }
  var keyProp = modifierKeyToProp[keyArg];
  return keyProp ? !!nativeEvent[keyProp] : false;
}

function getEventModifierState$1(nativeEvent) {
  return modifierStateGetter;
}

var getEventModifierState_1 = getEventModifierState$1;

var SyntheticUIEvent = SyntheticUIEvent_1;
var ViewportMetrics = ViewportMetrics_1;

var getEventModifierState = getEventModifierState_1;

/**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var MouseEventInterface = {
  screenX: null,
  screenY: null,
  clientX: null,
  clientY: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  getModifierState: getEventModifierState,
  button: function (event) {
    // Webkit, Firefox, IE9+
    // which:  1 2 3
    // button: 0 1 2 (standard)
    var button = event.button;
    if ('which' in event) {
      return button;
    }
    // IE<9
    // which:  undefined
    // button: 0 0 0
    // button: 1 4 2 (onmouseup)
    return button === 2 ? 2 : button === 4 ? 1 : 0;
  },
  buttons: null,
  relatedTarget: function (event) {
    return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
  },
  // "Proprietary" Interface.
  pageX: function (event) {
    return 'pageX' in event ? event.pageX : event.clientX + ViewportMetrics.currentScrollLeft;
  },
  pageY: function (event) {
    return 'pageY' in event ? event.pageY : event.clientY + ViewportMetrics.currentScrollTop;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticMouseEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticMouseEvent$1, MouseEventInterface);

var SyntheticMouseEvent_1 = SyntheticMouseEvent$1;

var EventConstants$5 = EventConstants_1;
var EventPropagators$3 = EventPropagators_1;
var ReactDOMComponentTree$4 = ReactDOMComponentTree_1;
var SyntheticMouseEvent = SyntheticMouseEvent_1;

var keyOf$5 = keyOf_1;

var topLevelTypes$4 = EventConstants$5.topLevelTypes;

var eventTypes$2 = {
  mouseEnter: {
    registrationName: keyOf$5({ onMouseEnter: null }),
    dependencies: [topLevelTypes$4.topMouseOut, topLevelTypes$4.topMouseOver]
  },
  mouseLeave: {
    registrationName: keyOf$5({ onMouseLeave: null }),
    dependencies: [topLevelTypes$4.topMouseOut, topLevelTypes$4.topMouseOver]
  }
};

var EnterLeaveEventPlugin$1 = {

  eventTypes: eventTypes$2,

  /**
   * For almost every interaction we care about, there will be both a top-level
   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
   * we do not extract duplicate events. However, moving the mouse into the
   * browser from outside will not fire a `mouseout` event. In this case, we use
   * the `mouseover` top-level event.
   */
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    if (topLevelType === topLevelTypes$4.topMouseOver && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
      return null;
    }
    if (topLevelType !== topLevelTypes$4.topMouseOut && topLevelType !== topLevelTypes$4.topMouseOver) {
      // Must not be a mouse in or mouse out - ignoring.
      return null;
    }

    var win;
    if (nativeEventTarget.window === nativeEventTarget) {
      // `nativeEventTarget` is probably a window object.
      win = nativeEventTarget;
    } else {
      // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
      var doc = nativeEventTarget.ownerDocument;
      if (doc) {
        win = doc.defaultView || doc.parentWindow;
      } else {
        win = window;
      }
    }

    var from;
    var to;
    if (topLevelType === topLevelTypes$4.topMouseOut) {
      from = targetInst;
      var related = nativeEvent.relatedTarget || nativeEvent.toElement;
      to = related ? ReactDOMComponentTree$4.getClosestInstanceFromNode(related) : null;
    } else {
      // Moving to a node from outside the window.
      from = null;
      to = targetInst;
    }

    if (from === to) {
      // Nothing pertains to our managed components.
      return null;
    }

    var fromNode = from == null ? win : ReactDOMComponentTree$4.getNodeFromInstance(from);
    var toNode = to == null ? win : ReactDOMComponentTree$4.getNodeFromInstance(to);

    var leave = SyntheticMouseEvent.getPooled(eventTypes$2.mouseLeave, from, nativeEvent, nativeEventTarget);
    leave.type = 'mouseleave';
    leave.target = fromNode;
    leave.relatedTarget = toNode;

    var enter = SyntheticMouseEvent.getPooled(eventTypes$2.mouseEnter, to, nativeEvent, nativeEventTarget);
    enter.type = 'mouseenter';
    enter.target = toNode;
    enter.relatedTarget = fromNode;

    EventPropagators$3.accumulateEnterLeaveDispatches(leave, enter, from, to);

    return [leave, enter];
  }

};

var EnterLeaveEventPlugin_1 = EnterLeaveEventPlugin$1;

var DOMProperty$2 = DOMProperty_1;

var MUST_USE_PROPERTY = DOMProperty$2.injection.MUST_USE_PROPERTY;
var HAS_BOOLEAN_VALUE = DOMProperty$2.injection.HAS_BOOLEAN_VALUE;
var HAS_NUMERIC_VALUE = DOMProperty$2.injection.HAS_NUMERIC_VALUE;
var HAS_POSITIVE_NUMERIC_VALUE = DOMProperty$2.injection.HAS_POSITIVE_NUMERIC_VALUE;
var HAS_OVERLOADED_BOOLEAN_VALUE = DOMProperty$2.injection.HAS_OVERLOADED_BOOLEAN_VALUE;

var HTMLDOMPropertyConfig$1 = {
  isCustomAttribute: RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + DOMProperty$2.ATTRIBUTE_NAME_CHAR + ']*$')),
  Properties: {
    /**
     * Standard Properties
     */
    accept: 0,
    acceptCharset: 0,
    accessKey: 0,
    action: 0,
    allowFullScreen: HAS_BOOLEAN_VALUE,
    allowTransparency: 0,
    alt: 0,
    async: HAS_BOOLEAN_VALUE,
    autoComplete: 0,
    // autoFocus is polyfilled/normalized by AutoFocusUtils
    // autoFocus: HAS_BOOLEAN_VALUE,
    autoPlay: HAS_BOOLEAN_VALUE,
    capture: HAS_BOOLEAN_VALUE,
    cellPadding: 0,
    cellSpacing: 0,
    charSet: 0,
    challenge: 0,
    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    cite: 0,
    classID: 0,
    className: 0,
    cols: HAS_POSITIVE_NUMERIC_VALUE,
    colSpan: 0,
    content: 0,
    contentEditable: 0,
    contextMenu: 0,
    controls: HAS_BOOLEAN_VALUE,
    coords: 0,
    crossOrigin: 0,
    data: 0, // For `<object />` acts as `src`.
    dateTime: 0,
    'default': HAS_BOOLEAN_VALUE,
    defer: HAS_BOOLEAN_VALUE,
    dir: 0,
    disabled: HAS_BOOLEAN_VALUE,
    download: HAS_OVERLOADED_BOOLEAN_VALUE,
    draggable: 0,
    encType: 0,
    form: 0,
    formAction: 0,
    formEncType: 0,
    formMethod: 0,
    formNoValidate: HAS_BOOLEAN_VALUE,
    formTarget: 0,
    frameBorder: 0,
    headers: 0,
    height: 0,
    hidden: HAS_BOOLEAN_VALUE,
    high: 0,
    href: 0,
    hrefLang: 0,
    htmlFor: 0,
    httpEquiv: 0,
    icon: 0,
    id: 0,
    inputMode: 0,
    integrity: 0,
    is: 0,
    keyParams: 0,
    keyType: 0,
    kind: 0,
    label: 0,
    lang: 0,
    list: 0,
    loop: HAS_BOOLEAN_VALUE,
    low: 0,
    manifest: 0,
    marginHeight: 0,
    marginWidth: 0,
    max: 0,
    maxLength: 0,
    media: 0,
    mediaGroup: 0,
    method: 0,
    min: 0,
    minLength: 0,
    // Caution; `option.selected` is not updated if `select.multiple` is
    // disabled with `removeAttribute`.
    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    name: 0,
    nonce: 0,
    noValidate: HAS_BOOLEAN_VALUE,
    open: HAS_BOOLEAN_VALUE,
    optimum: 0,
    pattern: 0,
    placeholder: 0,
    poster: 0,
    preload: 0,
    profile: 0,
    radioGroup: 0,
    readOnly: HAS_BOOLEAN_VALUE,
    referrerPolicy: 0,
    rel: 0,
    required: HAS_BOOLEAN_VALUE,
    reversed: HAS_BOOLEAN_VALUE,
    role: 0,
    rows: HAS_POSITIVE_NUMERIC_VALUE,
    rowSpan: HAS_NUMERIC_VALUE,
    sandbox: 0,
    scope: 0,
    scoped: HAS_BOOLEAN_VALUE,
    scrolling: 0,
    seamless: HAS_BOOLEAN_VALUE,
    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    shape: 0,
    size: HAS_POSITIVE_NUMERIC_VALUE,
    sizes: 0,
    span: HAS_POSITIVE_NUMERIC_VALUE,
    spellCheck: 0,
    src: 0,
    srcDoc: 0,
    srcLang: 0,
    srcSet: 0,
    start: HAS_NUMERIC_VALUE,
    step: 0,
    style: 0,
    summary: 0,
    tabIndex: 0,
    target: 0,
    title: 0,
    // Setting .type throws on non-<input> tags
    type: 0,
    useMap: 0,
    value: 0,
    width: 0,
    wmode: 0,
    wrap: 0,

    /**
     * RDFa Properties
     */
    about: 0,
    datatype: 0,
    inlist: 0,
    prefix: 0,
    // property is also supported for OpenGraph in meta tags.
    property: 0,
    resource: 0,
    'typeof': 0,
    vocab: 0,

    /**
     * Non-standard Properties
     */
    // autoCapitalize and autoCorrect are supported in Mobile Safari for
    // keyboard hints.
    autoCapitalize: 0,
    autoCorrect: 0,
    // autoSave allows WebKit/Blink to persist values of input fields on page reloads
    autoSave: 0,
    // color is for Safari mask-icon link
    color: 0,
    // itemProp, itemScope, itemType are for
    // Microdata support. See http://schema.org/docs/gs.html
    itemProp: 0,
    itemScope: HAS_BOOLEAN_VALUE,
    itemType: 0,
    // itemID and itemRef are for Microdata support as well but
    // only specified in the WHATWG spec document. See
    // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
    itemID: 0,
    itemRef: 0,
    // results show looking glass icon and recent searches on input
    // search fields in WebKit/Blink
    results: 0,
    // IE-only attribute that specifies security restrictions on an iframe
    // as an alternative to the sandbox attribute on IE<10
    security: 0,
    // IE-only attribute that controls focus behavior
    unselectable: 0
  },
  DOMAttributeNames: {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv'
  },
  DOMPropertyNames: {}
};

var HTMLDOMPropertyConfig_1 = HTMLDOMPropertyConfig$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DOMNamespaces
 */

var DOMNamespaces$1 = {
  html: 'http://www.w3.org/1999/xhtml',
  mathml: 'http://www.w3.org/1998/Math/MathML',
  svg: 'http://www.w3.org/2000/svg'
};

var DOMNamespaces_1 = DOMNamespaces$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule createMicrosoftUnsafeLocalFunction
 */

/* globals MSApp */

var createMicrosoftUnsafeLocalFunction$3 = function (func) {
  if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
    return function (arg0, arg1, arg2, arg3) {
      MSApp.execUnsafeLocalFunction(function () {
        return func(arg0, arg1, arg2, arg3);
      });
    };
  } else {
    return func;
  }
};

var createMicrosoftUnsafeLocalFunction_1 = createMicrosoftUnsafeLocalFunction$3;

var ExecutionEnvironment$6 = ExecutionEnvironment_1;
var DOMNamespaces$2 = DOMNamespaces_1;

var WHITESPACE_TEST = /^[ \r\n\t\f]/;
var NONVISIBLE_TEST = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;

var createMicrosoftUnsafeLocalFunction$2 = createMicrosoftUnsafeLocalFunction_1;

// SVG temp container for IE lacking innerHTML
var reusableSVGContainer;

/**
 * Set the innerHTML property of a node, ensuring that whitespace is preserved
 * even in IE8.
 *
 * @param {DOMElement} node
 * @param {string} html
 * @internal
 */
var setInnerHTML$2 = createMicrosoftUnsafeLocalFunction$2(function (node, html) {
  // IE does not have innerHTML for SVG nodes, so instead we inject the
  // new markup in a temp node and then move the child nodes across into
  // the target node
  if (node.namespaceURI === DOMNamespaces$2.svg && !('innerHTML' in node)) {
    reusableSVGContainer = reusableSVGContainer || document.createElement('div');
    reusableSVGContainer.innerHTML = '<svg>' + html + '</svg>';
    var newNodes = reusableSVGContainer.firstChild.childNodes;
    for (var i = 0; i < newNodes.length; i++) {
      node.appendChild(newNodes[i]);
    }
  } else {
    node.innerHTML = html;
  }
});

if (ExecutionEnvironment$6.canUseDOM) {
  // IE8: When updating a just created node with innerHTML only leading
  // whitespace is removed. When updating an existing node with innerHTML
  // whitespace in root TextNodes is also collapsed.
  // @see quirksmode.org/bugreports/archives/2004/11/innerhtml_and_t.html

  // Feature detection; only IE8 is known to behave improperly like this.
  var testElement = document.createElement('div');
  testElement.innerHTML = ' ';
  if (testElement.innerHTML === '') {
    setInnerHTML$2 = function (node, html) {
      // Magic theory: IE8 supposedly differentiates between added and updated
      // nodes when processing innerHTML, innerHTML on updated nodes suffers
      // from worse whitespace behavior. Re-adding a node like this triggers
      // the initial and more favorable whitespace behavior.
      // TODO: What to do on a detached node?
      if (node.parentNode) {
        node.parentNode.replaceChild(node, node);
      }

      // We also implement a workaround for non-visible tags disappearing into
      // thin air on IE8, this only happens if there is no visible text
      // in-front of the non-visible tags. Piggyback on the whitespace fix
      // and simply check if any non-visible tags appear in the source.
      if (WHITESPACE_TEST.test(html) || html[0] === '<' && NONVISIBLE_TEST.test(html)) {
        // Recover leading whitespace by temporarily prepending any character.
        // \uFEFF has the potential advantage of being zero-width/invisible.
        // UglifyJS drops U+FEFF chars when parsing, so use String.fromCharCode
        // in hopes that this is preserved even if "\uFEFF" is transformed to
        // the actual Unicode character (by Babel, for example).
        // https://github.com/mishoo/UglifyJS2/blob/v2.4.20/lib/parse.js#L216
        node.innerHTML = String.fromCharCode(0xFEFF) + html;

        // deleteData leaves an empty `TextNode` which offsets the index of all
        // children. Definitely want to avoid this.
        var textNode = node.firstChild;
        if (textNode.data.length === 1) {
          node.removeChild(textNode);
        } else {
          textNode.deleteData(0, 1);
        }
      } else {
        node.innerHTML = html;
      }
    };
  }
  testElement = null;
}

var setInnerHTML_1 = setInnerHTML$2;

/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Based on the escape-html library, which is used under the MIT License below:
 *
 * Copyright (c) 2012-2013 TJ Holowaychuk
 * Copyright (c) 2015 Andreas Lubbe
 * Copyright (c) 2015 Tiancheng "Timothy" Gu
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule escapeTextContentForBrowser
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        // "
        escape = '&quot;';
        break;
      case 38:
        // &
        escape = '&amp;';
        break;
      case 39:
        // '
        escape = '&#x27;'; // modified from escape-html; used to be '&#39'
        break;
      case 60:
        // <
        escape = '&lt;';
        break;
      case 62:
        // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
// end code copied and modified from escape-html

/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */
function escapeTextContentForBrowser$1(text) {
  if (typeof text === 'boolean' || typeof text === 'number') {
    // this shortcircuit helps perf for types that we know will never have
    // special characters, especially given that this function is used often
    // for numeric dom ids.
    return '' + text;
  }
  return escapeHtml(text);
}

var escapeTextContentForBrowser_1 = escapeTextContentForBrowser$1;

var ExecutionEnvironment$7 = ExecutionEnvironment_1;
var escapeTextContentForBrowser = escapeTextContentForBrowser_1;
var setInnerHTML$3 = setInnerHTML_1;

/**
 * Set the textContent property of a node, ensuring that whitespace is preserved
 * even in IE8. innerText is a poor substitute for textContent and, among many
 * issues, inserts <br> instead of the literal newline chars. innerHTML behaves
 * as it should.
 *
 * @param {DOMElement} node
 * @param {string} text
 * @internal
 */
var setTextContent$2 = function (node, text) {
  if (text) {
    var firstChild = node.firstChild;

    if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
};

if (ExecutionEnvironment$7.canUseDOM) {
  if (!('textContent' in document.documentElement)) {
    setTextContent$2 = function (node, text) {
      setInnerHTML$3(node, escapeTextContentForBrowser(text));
    };
  }
}

var setTextContent_1 = setTextContent$2;

var DOMNamespaces = DOMNamespaces_1;
var setInnerHTML$1 = setInnerHTML_1;

var createMicrosoftUnsafeLocalFunction$1 = createMicrosoftUnsafeLocalFunction_1;
var setTextContent$1 = setTextContent_1;

var ELEMENT_NODE_TYPE = 1;
var DOCUMENT_FRAGMENT_NODE_TYPE = 11;

/**
 * In IE (8-11) and Edge, appending nodes with no children is dramatically
 * faster than appending a full subtree, so we essentially queue up the
 * .appendChild calls here and apply them so each node is added to its parent
 * before any children are added.
 *
 * In other browsers, doing so is slower or neutral compared to the other order
 * (in Firefox, twice as slow) so we only do this inversion in IE.
 *
 * See https://github.com/spicyj/innerhtml-vs-createelement-vs-clonenode.
 */
var enableLazy = typeof document !== 'undefined' && typeof document.documentMode === 'number' || typeof navigator !== 'undefined' && typeof navigator.userAgent === 'string' && /\bEdge\/\d/.test(navigator.userAgent);

function insertTreeChildren(tree) {
  if (!enableLazy) {
    return;
  }
  var node = tree.node;
  var children = tree.children;
  if (children.length) {
    for (var i = 0; i < children.length; i++) {
      insertTreeBefore(node, children[i], null);
    }
  } else if (tree.html != null) {
    setInnerHTML$1(node, tree.html);
  } else if (tree.text != null) {
    setTextContent$1(node, tree.text);
  }
}

var insertTreeBefore = createMicrosoftUnsafeLocalFunction$1(function (parentNode, tree, referenceNode) {
  // DocumentFragments aren't actually part of the DOM after insertion so
  // appending children won't update the DOM. We need to ensure the fragment
  // is properly populated first, breaking out of our lazy approach for just
  // this level. Also, some <object> plugins (like Flash Player) will read
  // <param> nodes immediately upon insertion into the DOM, so <object>
  // must also be populated prior to insertion into the DOM.
  if (tree.node.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE || tree.node.nodeType === ELEMENT_NODE_TYPE && tree.node.nodeName.toLowerCase() === 'object' && (tree.node.namespaceURI == null || tree.node.namespaceURI === DOMNamespaces.html)) {
    insertTreeChildren(tree);
    parentNode.insertBefore(tree.node, referenceNode);
  } else {
    parentNode.insertBefore(tree.node, referenceNode);
    insertTreeChildren(tree);
  }
});

function replaceChildWithTree(oldNode, newTree) {
  oldNode.parentNode.replaceChild(newTree.node, oldNode);
  insertTreeChildren(newTree);
}

function queueChild(parentTree, childTree) {
  if (enableLazy) {
    parentTree.children.push(childTree);
  } else {
    parentTree.node.appendChild(childTree.node);
  }
}

function queueHTML(tree, html) {
  if (enableLazy) {
    tree.html = html;
  } else {
    setInnerHTML$1(tree.node, html);
  }
}

function queueText(tree, text) {
  if (enableLazy) {
    tree.text = text;
  } else {
    setTextContent$1(tree.node, text);
  }
}

function toString$1() {
  return this.node.nodeName;
}

function DOMLazyTree$1(node) {
  return {
    node: node,
    children: [],
    html: null,
    text: null,
    toString: toString$1
  };
}

DOMLazyTree$1.insertTreeBefore = insertTreeBefore;
DOMLazyTree$1.replaceChildWithTree = replaceChildWithTree;
DOMLazyTree$1.queueChild = queueChild;
DOMLazyTree$1.queueHTML = queueHTML;
DOMLazyTree$1.queueText = queueText;

var DOMLazyTree_1 = DOMLazyTree$1;

var invariant$19 = invariant_1;

/**
 * Convert array-like objects to arrays.
 *
 * This API assumes the caller knows the contents of the data type. For less
 * well defined inputs use createArrayFromMixed.
 *
 * @param {object|function|filelist} obj
 * @return {array}
 */
function toArray$1(obj) {
  var length = obj.length;

  // Some browsers builtin objects can report typeof 'function' (e.g. NodeList
  // in old versions of Safari).
  !(!Array.isArray(obj) && (typeof obj === 'object' || typeof obj === 'function')) ? invariant$19(false) : void 0;

  !(typeof length === 'number') ? invariant$19(false) : void 0;

  !(length === 0 || length - 1 in obj) ? invariant$19(false) : void 0;

  !(typeof obj.callee !== 'function') ? invariant$19(false) : void 0;

  // Old IE doesn't give collections access to hasOwnProperty. Assume inputs
  // without method will throw during the slice call and skip straight to the
  // fallback.
  if (obj.hasOwnProperty) {
    try {
      return Array.prototype.slice.call(obj);
    } catch (e) {
      // IE < 9 does not support Array#slice on collections objects
    }
  }

  // Fall back to copying key by key. This assumes all keys have a value,
  // so will not preserve sparsely populated inputs.
  var ret = Array(length);
  for (var ii = 0; ii < length; ii++) {
    ret[ii] = obj[ii];
  }
  return ret;
}

/**
 * Perform a heuristic test to determine if an object is "array-like".
 *
 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
 *   Joshu replied: "Mu."
 *
 * This function determines if its argument has "array nature": it returns
 * true if the argument is an actual array, an `arguments' object, or an
 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
 *
 * It will return false for other array-like objects like Filelist.
 *
 * @param {*} obj
 * @return {boolean}
 */
function hasArrayNature(obj) {
  return (
    // not null/false
    !!obj && (
    // arrays are objects, NodeLists are functions in Safari
    typeof obj == 'object' || typeof obj == 'function') &&
    // quacks like an array
    'length' in obj &&
    // not window
    !('setInterval' in obj) &&
    // no DOM node should be considered an array-like
    // a 'select' element has 'length' and 'item' properties on IE8
    typeof obj.nodeType != 'number' && (
    // a real array
    Array.isArray(obj) ||
    // arguments
    'callee' in obj ||
    // HTMLCollection/NodeList
    'item' in obj)
  );
}

/**
 * Ensure that the argument is an array by wrapping it in an array if it is not.
 * Creates a copy of the argument if it is already an array.
 *
 * This is mostly useful idiomatically:
 *
 *   var createArrayFromMixed = require('createArrayFromMixed');
 *
 *   function takesOneOrMoreThings(things) {
 *     things = createArrayFromMixed(things);
 *     ...
 *   }
 *
 * This allows you to treat `things' as an array, but accept scalars in the API.
 *
 * If you need to convert an array-like object, like `arguments`, into an array
 * use toArray instead.
 *
 * @param {*} obj
 * @return {array}
 */
function createArrayFromMixed$1(obj) {
  if (!hasArrayNature(obj)) {
    return [obj];
  } else if (Array.isArray(obj)) {
    return obj.slice();
  } else {
    return toArray$1(obj);
  }
}

var createArrayFromMixed_1 = createArrayFromMixed$1;

var ExecutionEnvironment$10 = ExecutionEnvironment_1;

var invariant$20 = invariant_1;

/**
 * Dummy container used to detect which wraps are necessary.
 */
var dummyNode$1 = ExecutionEnvironment$10.canUseDOM ? document.createElement('div') : null;

/**
 * Some browsers cannot use `innerHTML` to render certain elements standalone,
 * so we wrap them, render the wrapped nodes, then extract the desired node.
 *
 * In IE8, certain elements cannot render alone, so wrap all elements ('*').
 */

var shouldWrap = {};

var selectWrap = [1, '<select multiple="true">', '</select>'];
var tableWrap = [1, '<table>', '</table>'];
var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

var svgWrap = [1, '<svg xmlns="http://www.w3.org/2000/svg">', '</svg>'];

var markupWrap = {
  '*': [1, '?<div>', '</div>'],

  'area': [1, '<map>', '</map>'],
  'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  'legend': [1, '<fieldset>', '</fieldset>'],
  'param': [1, '<object>', '</object>'],
  'tr': [2, '<table><tbody>', '</tbody></table>'],

  'optgroup': selectWrap,
  'option': selectWrap,

  'caption': tableWrap,
  'colgroup': tableWrap,
  'tbody': tableWrap,
  'tfoot': tableWrap,
  'thead': tableWrap,

  'td': trWrap,
  'th': trWrap
};

// Initialize the SVG elements since we know they'll always need to be wrapped
// consistently. If they are created inside a <div> they will be initialized in
// the wrong namespace (and will not display).
var svgElements = ['circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'text', 'tspan'];
svgElements.forEach(function (nodeName) {
  markupWrap[nodeName] = svgWrap;
  shouldWrap[nodeName] = true;
});

/**
 * Gets the markup wrap configuration for the supplied `nodeName`.
 *
 * NOTE: This lazily detects which wraps are necessary for the current browser.
 *
 * @param {string} nodeName Lowercase `nodeName`.
 * @return {?array} Markup wrap configuration, if applicable.
 */
function getMarkupWrap$1(nodeName) {
  !!!dummyNode$1 ? invariant$20(false) : void 0;
  if (!markupWrap.hasOwnProperty(nodeName)) {
    nodeName = '*';
  }
  if (!shouldWrap.hasOwnProperty(nodeName)) {
    if (nodeName === '*') {
      dummyNode$1.innerHTML = '<link />';
    } else {
      dummyNode$1.innerHTML = '<' + nodeName + '></' + nodeName + '>';
    }
    shouldWrap[nodeName] = !dummyNode$1.firstChild;
  }
  return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
}

var getMarkupWrap_1 = getMarkupWrap$1;

var ExecutionEnvironment$9 = ExecutionEnvironment_1;

var createArrayFromMixed = createArrayFromMixed_1;
var getMarkupWrap = getMarkupWrap_1;
var invariant$18 = invariant_1;

/**
 * Dummy container used to render all markup.
 */
var dummyNode = ExecutionEnvironment$9.canUseDOM ? document.createElement('div') : null;

/**
 * Pattern used by `getNodeName`.
 */
var nodeNamePattern = /^\s*<(\w+)/;

/**
 * Extracts the `nodeName` of the first element in a string of markup.
 *
 * @param {string} markup String of markup.
 * @return {?string} Node name of the supplied markup.
 */
function getNodeName(markup) {
  var nodeNameMatch = markup.match(nodeNamePattern);
  return nodeNameMatch && nodeNameMatch[1].toLowerCase();
}

/**
 * Creates an array containing the nodes rendered from the supplied markup. The
 * optionally supplied `handleScript` function will be invoked once for each
 * <script> element that is rendered. If no `handleScript` function is supplied,
 * an exception is thrown if any <script> elements are rendered.
 *
 * @param {string} markup A string of valid HTML markup.
 * @param {?function} handleScript Invoked once for each rendered <script>.
 * @return {array<DOMElement|DOMTextNode>} An array of rendered nodes.
 */
function createNodesFromMarkup$1(markup, handleScript) {
  var node = dummyNode;
  !!!dummyNode ? invariant$18(false) : void 0;
  var nodeName = getNodeName(markup);

  var wrap = nodeName && getMarkupWrap(nodeName);
  if (wrap) {
    node.innerHTML = wrap[1] + markup + wrap[2];

    var wrapDepth = wrap[0];
    while (wrapDepth--) {
      node = node.lastChild;
    }
  } else {
    node.innerHTML = markup;
  }

  var scripts = node.getElementsByTagName('script');
  if (scripts.length) {
    !handleScript ? invariant$18(false) : void 0;
    createArrayFromMixed(scripts).forEach(handleScript);
  }

  var nodes = Array.from(node.childNodes);
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
  return nodes;
}

var createNodesFromMarkup_1 = createNodesFromMarkup$1;

var _prodInvariant$15 = reactProdInvariant_1;

var DOMLazyTree$2 = DOMLazyTree_1;
var ExecutionEnvironment$8 = ExecutionEnvironment_1;

var createNodesFromMarkup = createNodesFromMarkup_1;
var emptyFunction$5 = emptyFunction_1;
var Danger$1 = {

  /**
   * Replaces a node with a string of markup at its current position within its
   * parent. The markup must render into a single root node.
   *
   * @param {DOMElement} oldChild Child node to replace.
   * @param {string} markup Markup to render in place of the child node.
   * @internal
   */
  dangerouslyReplaceNodeWithMarkup: function (oldChild, markup) {
    !ExecutionEnvironment$8.canUseDOM ? _prodInvariant$15('56') : void 0;
    !markup ? _prodInvariant$15('57') : void 0;
    !(oldChild.nodeName !== 'HTML') ? _prodInvariant$15('58') : void 0;

    if (typeof markup === 'string') {
      var newChild = createNodesFromMarkup(markup, emptyFunction$5)[0];
      oldChild.parentNode.replaceChild(newChild, oldChild);
    } else {
      DOMLazyTree$2.replaceChildWithTree(oldChild, markup);
    }
  }

};

var Danger_1 = Danger$1;

var keyMirror$4 = keyMirror_1;

/**
 * When a component's children are updated, a series of update configuration
 * objects are created in order to batch and serialize the required changes.
 *
 * Enumerates all the possible types of update configurations.
 *
 * @internal
 */
var ReactMultiChildUpdateTypes$1 = keyMirror$4({
  INSERT_MARKUP: null,
  MOVE_EXISTING: null,
  REMOVE_NODE: null,
  SET_MARKUP: null,
  TEXT_CONTENT: null
});

var ReactMultiChildUpdateTypes_1 = ReactMultiChildUpdateTypes$1;

var DOMLazyTree = DOMLazyTree_1;
var Danger = Danger_1;
var ReactMultiChildUpdateTypes = ReactMultiChildUpdateTypes_1;
var createMicrosoftUnsafeLocalFunction = createMicrosoftUnsafeLocalFunction_1;
var setInnerHTML = setInnerHTML_1;
var setTextContent = setTextContent_1;

function getNodeAfter(parentNode, node) {
  // Special case for text components, which return [open, close] comments
  // from getHostNode.
  if (Array.isArray(node)) {
    node = node[1];
  }
  return node ? node.nextSibling : parentNode.firstChild;
}

/**
 * Inserts `childNode` as a child of `parentNode` at the `index`.
 *
 * @param {DOMElement} parentNode Parent node in which to insert.
 * @param {DOMElement} childNode Child node to insert.
 * @param {number} index Index at which to insert the child.
 * @internal
 */
var insertChildAt = createMicrosoftUnsafeLocalFunction(function (parentNode, childNode, referenceNode) {
  // We rely exclusively on `insertBefore(node, null)` instead of also using
  // `appendChild(node)`. (Using `undefined` is not allowed by all browsers so
  // we are careful to use `null`.)
  parentNode.insertBefore(childNode, referenceNode);
});

function insertLazyTreeChildAt(parentNode, childTree, referenceNode) {
  DOMLazyTree.insertTreeBefore(parentNode, childTree, referenceNode);
}

function moveChild(parentNode, childNode, referenceNode) {
  if (Array.isArray(childNode)) {
    moveDelimitedText(parentNode, childNode[0], childNode[1], referenceNode);
  } else {
    insertChildAt(parentNode, childNode, referenceNode);
  }
}

function removeChild(parentNode, childNode) {
  if (Array.isArray(childNode)) {
    var closingComment = childNode[1];
    childNode = childNode[0];
    removeDelimitedText(parentNode, childNode, closingComment);
    parentNode.removeChild(closingComment);
  }
  parentNode.removeChild(childNode);
}

function moveDelimitedText(parentNode, openingComment, closingComment, referenceNode) {
  var node = openingComment;
  while (true) {
    var nextNode = node.nextSibling;
    insertChildAt(parentNode, node, referenceNode);
    if (node === closingComment) {
      break;
    }
    node = nextNode;
  }
}

function removeDelimitedText(parentNode, startNode, closingComment) {
  while (true) {
    var node = startNode.nextSibling;
    if (node === closingComment) {
      // The closing comment is removed by ReactMultiChild.
      break;
    } else {
      parentNode.removeChild(node);
    }
  }
}

function replaceDelimitedText(openingComment, closingComment, stringText) {
  var parentNode = openingComment.parentNode;
  var nodeAfterComment = openingComment.nextSibling;
  if (nodeAfterComment === closingComment) {
    // There are no text nodes between the opening and closing comments; insert
    // a new one if stringText isn't empty.
    if (stringText) {
      insertChildAt(parentNode, document.createTextNode(stringText), nodeAfterComment);
    }
  } else {
    if (stringText) {
      // Set the text content of the first node after the opening comment, and
      // remove all following nodes up until the closing comment.
      setTextContent(nodeAfterComment, stringText);
      removeDelimitedText(parentNode, nodeAfterComment, closingComment);
    } else {
      removeDelimitedText(parentNode, openingComment, closingComment);
    }
  }

  
}

var dangerouslyReplaceNodeWithMarkup = Danger.dangerouslyReplaceNodeWithMarkup;
var DOMChildrenOperations$1 = {

  dangerouslyReplaceNodeWithMarkup: dangerouslyReplaceNodeWithMarkup,

  replaceDelimitedText: replaceDelimitedText,

  /**
   * Updates a component's children by processing a series of updates. The
   * update configurations are each expected to have a `parentNode` property.
   *
   * @param {array<object>} updates List of update configurations.
   * @internal
   */
  processUpdates: function (parentNode, updates) {
    for (var k = 0; k < updates.length; k++) {
      var update = updates[k];
      switch (update.type) {
        case ReactMultiChildUpdateTypes.INSERT_MARKUP:
          insertLazyTreeChildAt(parentNode, update.content, getNodeAfter(parentNode, update.afterNode));
          
          break;
        case ReactMultiChildUpdateTypes.MOVE_EXISTING:
          moveChild(parentNode, update.fromNode, getNodeAfter(parentNode, update.afterNode));
          
          break;
        case ReactMultiChildUpdateTypes.SET_MARKUP:
          setInnerHTML(parentNode, update.content);
          
          break;
        case ReactMultiChildUpdateTypes.TEXT_CONTENT:
          setTextContent(parentNode, update.content);
          
          break;
        case ReactMultiChildUpdateTypes.REMOVE_NODE:
          removeChild(parentNode, update.fromNode);
          
          break;
      }
    }
  }

};

var DOMChildrenOperations_1 = DOMChildrenOperations$1;

var DOMChildrenOperations$2 = DOMChildrenOperations_1;
var ReactDOMComponentTree$6 = ReactDOMComponentTree_1;

/**
 * Operations used to process updates to DOM nodes.
 */
var ReactDOMIDOperations$1 = {

  /**
   * Updates a component's children by processing a series of updates.
   *
   * @param {array<object>} updates List of update configurations.
   * @internal
   */
  dangerouslyProcessChildrenUpdates: function (parentInst, updates) {
    var node = ReactDOMComponentTree$6.getNodeFromInstance(parentInst);
    DOMChildrenOperations$2.processUpdates(node, updates);
  }
};

var ReactDOMIDOperations_1 = ReactDOMIDOperations$1;

var DOMChildrenOperations = DOMChildrenOperations_1;
var ReactDOMIDOperations = ReactDOMIDOperations_1;

/**
 * Abstracts away all functionality of the reconciler that requires knowledge of
 * the browser context. TODO: These callers should be refactored to avoid the
 * need for this injection.
 */
var ReactComponentBrowserEnvironment$1 = {

  processChildrenUpdates: ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,

  replaceNodeWithMarkup: DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup,

  /**
   * If a particular environment requires that some resources be cleaned up,
   * specify this in the injected Mixin. In the DOM, we would likely want to
   * purge any cached node ID lookups.
   *
   * @private
   */
  unmountIDFromEnvironment: function (rootNodeID) {}

};

var ReactComponentBrowserEnvironment_1 = ReactComponentBrowserEnvironment$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

function focusNode$1(node) {
  // IE8 can throw "Can't move focus to the control because it is invisible,
  // not enabled, or of a type that does not accept the focus." for all kinds of
  // reasons that are too expensive and fragile to test.
  try {
    node.focus();
  } catch (e) {}
}

var focusNode_1 = focusNode$1;

var ReactDOMComponentTree$8 = ReactDOMComponentTree_1;

var focusNode = focusNode_1;

var AutoFocusUtils$1 = {
  focusDOMComponent: function () {
    focusNode(ReactDOMComponentTree$8.getNodeFromInstance(this));
  }
};

var AutoFocusUtils_1 = AutoFocusUtils$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSProperty
 */

var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */
var shorthandPropertyExpansions = {
  background: {
    backgroundAttachment: true,
    backgroundColor: true,
    backgroundImage: true,
    backgroundPositionX: true,
    backgroundPositionY: true,
    backgroundRepeat: true
  },
  backgroundPosition: {
    backgroundPositionX: true,
    backgroundPositionY: true
  },
  border: {
    borderWidth: true,
    borderStyle: true,
    borderColor: true
  },
  borderBottom: {
    borderBottomWidth: true,
    borderBottomStyle: true,
    borderBottomColor: true
  },
  borderLeft: {
    borderLeftWidth: true,
    borderLeftStyle: true,
    borderLeftColor: true
  },
  borderRight: {
    borderRightWidth: true,
    borderRightStyle: true,
    borderRightColor: true
  },
  borderTop: {
    borderTopWidth: true,
    borderTopStyle: true,
    borderTopColor: true
  },
  font: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    fontFamily: true
  },
  outline: {
    outlineWidth: true,
    outlineStyle: true,
    outlineColor: true
  }
};

var CSSProperty$1 = {
  isUnitlessNumber: isUnitlessNumber,
  shorthandPropertyExpansions: shorthandPropertyExpansions
};

var CSSProperty_1 = CSSProperty$1;

var CSSProperty$2 = CSSProperty_1;
var isUnitlessNumber$1 = CSSProperty$2.isUnitlessNumber;
function dangerousStyleValue$1(name, value, component) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (isNonNumeric || value === 0 || isUnitlessNumber$1.hasOwnProperty(name) && isUnitlessNumber$1[name]) {
    return '' + value; // cast to string
  }

  if (typeof value === 'string') {
    value = value.trim();
  }
  return value + 'px';
}

var dangerousStyleValue_1 = dangerousStyleValue$1;

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate$1(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

var hyphenate_1 = hyphenate$1;

var hyphenate = hyphenate_1;

var msPattern$1 = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName$1(string) {
  return hyphenate(string).replace(msPattern$1, '-ms-');
}

var hyphenateStyleName_1 = hyphenateStyleName$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @typechecks static-only
 */

function memoizeStringOnly$1(callback) {
  var cache = {};
  return function (string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}

var memoizeStringOnly_1 = memoizeStringOnly$1;

var CSSProperty = CSSProperty_1;
var ExecutionEnvironment$11 = ExecutionEnvironment_1;
var dangerousStyleValue = dangerousStyleValue_1;
var hyphenateStyleName = hyphenateStyleName_1;
var memoizeStringOnly = memoizeStringOnly_1;
var processStyleName = memoizeStringOnly(function (styleName) {
  return hyphenateStyleName(styleName);
});

var hasShorthandPropertyBug = false;
var styleFloatAccessor = 'cssFloat';
if (ExecutionEnvironment$11.canUseDOM) {
  var tempStyle = document.createElement('div').style;
  try {
    // IE8 throws "Invalid argument." if resetting shorthand style properties.
    tempStyle.font = '';
  } catch (e) {
    hasShorthandPropertyBug = true;
  }
  // IE8 only supports accessing cssFloat (standard) as styleFloat
  if (document.documentElement.style.cssFloat === undefined) {
    styleFloatAccessor = 'styleFloat';
  }
}

var CSSPropertyOperations$1 = {

  /**
   * Serializes a mapping of style properties for use as inline styles:
   *
   *   > createMarkupForStyles({width: '200px', height: 0})
   *   "width:200px;height:0;"
   *
   * Undefined values are ignored so that declarative programming is easier.
   * The result should be HTML-escaped before insertion into the DOM.
   *
   * @param {object} styles
   * @param {ReactDOMComponent} component
   * @return {?string}
   */
  createMarkupForStyles: function (styles, component) {
    var serialized = '';
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var styleValue = styles[styleName];
      if (styleValue != null) {
        serialized += processStyleName(styleName) + ':';
        serialized += dangerousStyleValue(styleName, styleValue, component) + ';';
      }
    }
    return serialized || null;
  },

  /**
   * Sets the value for multiple styles on a node.  If a value is specified as
   * '' (empty string), the corresponding style property will be unset.
   *
   * @param {DOMElement} node
   * @param {object} styles
   * @param {ReactDOMComponent} component
   */
  setValueForStyles: function (node, styles, component) {
    var style = node.style;
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var styleValue = dangerousStyleValue(styleName, styles[styleName], component);
      if (styleName === 'float' || styleName === 'cssFloat') {
        styleName = styleFloatAccessor;
      }
      if (styleValue) {
        style[styleName] = styleValue;
      } else {
        var expansion = hasShorthandPropertyBug && CSSProperty.shorthandPropertyExpansions[styleName];
        if (expansion) {
          // Shorthand property that IE8 won't like unsetting, so unset each
          // component to placate it
          for (var individualStyleName in expansion) {
            style[individualStyleName] = '';
          }
        } else {
          style[styleName] = '';
        }
      }
    }
  }

};

var CSSPropertyOperations_1 = CSSPropertyOperations$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMInstrumentation
 */

var escapeTextContentForBrowser$3 = escapeTextContentForBrowser_1;

/**
 * Escapes attribute value to prevent scripting attacks.
 *
 * @param {*} value Value to escape.
 * @return {string} An escaped string.
 */
function quoteAttributeValueForBrowser$1(value) {
  return '"' + escapeTextContentForBrowser$3(value) + '"';
}

var quoteAttributeValueForBrowser_1 = quoteAttributeValueForBrowser$1;

var DOMProperty$4 = DOMProperty_1;
var quoteAttributeValueForBrowser = quoteAttributeValueForBrowser_1;
var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + DOMProperty$4.ATTRIBUTE_NAME_START_CHAR + '][' + DOMProperty$4.ATTRIBUTE_NAME_CHAR + ']*$');
var illegalAttributeNameCache = {};
var validatedAttributeNameCache = {};

function isAttributeNameSafe(attributeName) {
  if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
    return true;
  }
  if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
    return false;
  }
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
    validatedAttributeNameCache[attributeName] = true;
    return true;
  }
  illegalAttributeNameCache[attributeName] = true;
  void 0;
  return false;
}

function shouldIgnoreValue(propertyInfo, value) {
  return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
}

/**
 * Operations for dealing with DOM properties.
 */
var DOMPropertyOperations$1 = {

  /**
   * Creates markup for the ID property.
   *
   * @param {string} id Unescaped ID.
   * @return {string} Markup string.
   */
  createMarkupForID: function (id) {
    return DOMProperty$4.ID_ATTRIBUTE_NAME + '=' + quoteAttributeValueForBrowser(id);
  },

  setAttributeForID: function (node, id) {
    node.setAttribute(DOMProperty$4.ID_ATTRIBUTE_NAME, id);
  },

  createMarkupForRoot: function () {
    return DOMProperty$4.ROOT_ATTRIBUTE_NAME + '=""';
  },

  setAttributeForRoot: function (node) {
    node.setAttribute(DOMProperty$4.ROOT_ATTRIBUTE_NAME, '');
  },

  /**
   * Creates markup for a property.
   *
   * @param {string} name
   * @param {*} value
   * @return {?string} Markup string, or null if the property was invalid.
   */
  createMarkupForProperty: function (name, value) {
    var propertyInfo = DOMProperty$4.properties.hasOwnProperty(name) ? DOMProperty$4.properties[name] : null;
    if (propertyInfo) {
      if (shouldIgnoreValue(propertyInfo, value)) {
        return '';
      }
      var attributeName = propertyInfo.attributeName;
      if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
        return attributeName + '=""';
      }
      return attributeName + '=' + quoteAttributeValueForBrowser(value);
    } else if (DOMProperty$4.isCustomAttribute(name)) {
      if (value == null) {
        return '';
      }
      return name + '=' + quoteAttributeValueForBrowser(value);
    }
    return null;
  },

  /**
   * Creates markup for a custom property.
   *
   * @param {string} name
   * @param {*} value
   * @return {string} Markup string, or empty string if the property was invalid.
   */
  createMarkupForCustomAttribute: function (name, value) {
    if (!isAttributeNameSafe(name) || value == null) {
      return '';
    }
    return name + '=' + quoteAttributeValueForBrowser(value);
  },

  /**
   * Sets the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   * @param {*} value
   */
  setValueForProperty: function (node, name, value) {
    var propertyInfo = DOMProperty$4.properties.hasOwnProperty(name) ? DOMProperty$4.properties[name] : null;
    if (propertyInfo) {
      var mutationMethod = propertyInfo.mutationMethod;
      if (mutationMethod) {
        mutationMethod(node, value);
      } else if (shouldIgnoreValue(propertyInfo, value)) {
        this.deleteValueForProperty(node, name);
        return;
      } else if (propertyInfo.mustUseProperty) {
        // Contrary to `setAttribute`, object properties are properly
        // `toString`ed by IE8/9.
        node[propertyInfo.propertyName] = value;
      } else {
        var attributeName = propertyInfo.attributeName;
        var namespace = propertyInfo.attributeNamespace;
        // `setAttribute` with objects becomes only `[object]` in IE8/9,
        // ('' + value) makes it output the correct toString()-value.
        if (namespace) {
          node.setAttributeNS(namespace, attributeName, '' + value);
        } else if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
          node.setAttribute(attributeName, '');
        } else {
          node.setAttribute(attributeName, '' + value);
        }
      }
    } else if (DOMProperty$4.isCustomAttribute(name)) {
      DOMPropertyOperations$1.setValueForAttribute(node, name, value);
      return;
    }

    
  },

  setValueForAttribute: function (node, name, value) {
    if (!isAttributeNameSafe(name)) {
      return;
    }
    if (value == null) {
      node.removeAttribute(name);
    } else {
      node.setAttribute(name, '' + value);
    }

    
  },

  /**
   * Deletes an attributes from a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   */
  deleteValueForAttribute: function (node, name) {
    node.removeAttribute(name);
    
  },

  /**
   * Deletes the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   */
  deleteValueForProperty: function (node, name) {
    var propertyInfo = DOMProperty$4.properties.hasOwnProperty(name) ? DOMProperty$4.properties[name] : null;
    if (propertyInfo) {
      var mutationMethod = propertyInfo.mutationMethod;
      if (mutationMethod) {
        mutationMethod(node, undefined);
      } else if (propertyInfo.mustUseProperty) {
        var propName = propertyInfo.propertyName;
        if (propertyInfo.hasBooleanValue) {
          node[propName] = false;
        } else {
          node[propName] = '';
        }
      } else {
        node.removeAttribute(propertyInfo.attributeName);
      }
    } else if (DOMProperty$4.isCustomAttribute(name)) {
      node.removeAttribute(name);
    }

    
  }

};

var DOMPropertyOperations_1 = DOMPropertyOperations$1;

var EventPluginHub$4 = EventPluginHub_1;

function runEventQueueInBatch(events) {
  EventPluginHub$4.enqueueEvents(events);
  EventPluginHub$4.processEventQueue(false);
}

var ReactEventEmitterMixin$1 = {

  /**
   * Streams a fired top-level event to `EventPluginHub` where plugins have the
   * opportunity to create `ReactEvent`s to be dispatched.
   */
  handleTopLevel: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var events = EventPluginHub$4.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
    runEventQueueInBatch(events);
  }
};

var ReactEventEmitterMixin_1 = ReactEventEmitterMixin$1;

var ExecutionEnvironment$12 = ExecutionEnvironment_1;

/**
 * Generate a mapping of standard vendor prefixes using the defined style property and event name.
 *
 * @param {string} styleProp
 * @param {string} eventName
 * @returns {object}
 */
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};

  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes['Webkit' + styleProp] = 'webkit' + eventName;
  prefixes['Moz' + styleProp] = 'moz' + eventName;
  prefixes['ms' + styleProp] = 'MS' + eventName;
  prefixes['O' + styleProp] = 'o' + eventName.toLowerCase();

  return prefixes;
}

/**
 * A list of event names to a configurable list of vendor prefixes.
 */
var vendorPrefixes = {
  animationend: makePrefixMap('Animation', 'AnimationEnd'),
  animationiteration: makePrefixMap('Animation', 'AnimationIteration'),
  animationstart: makePrefixMap('Animation', 'AnimationStart'),
  transitionend: makePrefixMap('Transition', 'TransitionEnd')
};

/**
 * Event names that have already been detected and prefixed (if applicable).
 */
var prefixedEventNames = {};

/**
 * Element to check for prefixes on.
 */
var style = {};

/**
 * Bootstrap if a DOM exists.
 */
if (ExecutionEnvironment$12.canUseDOM) {
  style = document.createElement('div').style;

  // On some platforms, in particular some releases of Android 4.x,
  // the un-prefixed "animation" and "transition" properties are defined on the
  // style object but the events that fire will still be prefixed, so we need
  // to check if the un-prefixed events are usable, and if not remove them from the map.
  if (!('AnimationEvent' in window)) {
    delete vendorPrefixes.animationend.animation;
    delete vendorPrefixes.animationiteration.animation;
    delete vendorPrefixes.animationstart.animation;
  }

  // Same as above
  if (!('TransitionEvent' in window)) {
    delete vendorPrefixes.transitionend.transition;
  }
}

/**
 * Attempts to determine the correct vendor prefixed event name.
 *
 * @param {string} eventName
 * @returns {string}
 */
function getVendorPrefixedEventName$1(eventName) {
  if (prefixedEventNames[eventName]) {
    return prefixedEventNames[eventName];
  } else if (!vendorPrefixes[eventName]) {
    return eventName;
  }

  var prefixMap = vendorPrefixes[eventName];

  for (var styleProp in prefixMap) {
    if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) {
      return prefixedEventNames[eventName] = prefixMap[styleProp];
    }
  }

  return '';
}

var getVendorPrefixedEventName_1 = getVendorPrefixedEventName$1;

var _assign$9 = index$1;

var EventConstants$7 = EventConstants_1;
var EventPluginRegistry$3 = EventPluginRegistry_1;
var ReactEventEmitterMixin = ReactEventEmitterMixin_1;
var ViewportMetrics$2 = ViewportMetrics_1;

var getVendorPrefixedEventName = getVendorPrefixedEventName_1;
var isEventSupported$3 = isEventSupported_1;

/**
 * Summary of `ReactBrowserEventEmitter` event handling:
 *
 *  - Top-level delegation is used to trap most native browser events. This
 *    may only occur in the main thread and is the responsibility of
 *    ReactEventListener, which is injected and can therefore support pluggable
 *    event sources. This is the only work that occurs in the main thread.
 *
 *  - We normalize and de-duplicate events to account for browser quirks. This
 *    may be done in the worker thread.
 *
 *  - Forward these native events (with the associated top-level type used to
 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
 *    to extract any synthetic events.
 *
 *  - The `EventPluginHub` will then process each event by annotating them with
 *    "dispatches", a sequence of listeners and IDs that care about that event.
 *
 *  - The `EventPluginHub` then dispatches the events.
 *
 * Overview of React and the event system:
 *
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .
 *       |           .
 *       v           .
 * +------------+    .
 * | ReactEvent |    .
 * |  Listener  |    .
 * +------------+    .                         +-----------+
 *       |           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */

var hasEventPageXY;
var alreadyListeningTo = {};
var isMonitoringScrollValue = false;
var reactTopListenersCounter = 0;

// For events like 'submit' which don't consistently bubble (which we trap at a
// lower node than `document`), binding at `document` would cause duplicate
// events so we don't include them here
var topEventMapping = {
  topAbort: 'abort',
  topAnimationEnd: getVendorPrefixedEventName('animationend') || 'animationend',
  topAnimationIteration: getVendorPrefixedEventName('animationiteration') || 'animationiteration',
  topAnimationStart: getVendorPrefixedEventName('animationstart') || 'animationstart',
  topBlur: 'blur',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topChange: 'change',
  topClick: 'click',
  topCompositionEnd: 'compositionend',
  topCompositionStart: 'compositionstart',
  topCompositionUpdate: 'compositionupdate',
  topContextMenu: 'contextmenu',
  topCopy: 'copy',
  topCut: 'cut',
  topDoubleClick: 'dblclick',
  topDrag: 'drag',
  topDragEnd: 'dragend',
  topDragEnter: 'dragenter',
  topDragExit: 'dragexit',
  topDragLeave: 'dragleave',
  topDragOver: 'dragover',
  topDragStart: 'dragstart',
  topDrop: 'drop',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topFocus: 'focus',
  topInput: 'input',
  topKeyDown: 'keydown',
  topKeyPress: 'keypress',
  topKeyUp: 'keyup',
  topLoadedData: 'loadeddata',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topMouseDown: 'mousedown',
  topMouseMove: 'mousemove',
  topMouseOut: 'mouseout',
  topMouseOver: 'mouseover',
  topMouseUp: 'mouseup',
  topPaste: 'paste',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topScroll: 'scroll',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topSelectionChange: 'selectionchange',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTextInput: 'textInput',
  topTimeUpdate: 'timeupdate',
  topTouchCancel: 'touchcancel',
  topTouchEnd: 'touchend',
  topTouchMove: 'touchmove',
  topTouchStart: 'touchstart',
  topTransitionEnd: getVendorPrefixedEventName('transitionend') || 'transitionend',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting',
  topWheel: 'wheel'
};

/**
 * To ensure no conflicts with other potential React instances on the page
 */
var topListenersIDKey = '_reactListenersID' + String(Math.random()).slice(2);

function getListeningForDocument(mountAt) {
  // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
  // directly.
  if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
    mountAt[topListenersIDKey] = reactTopListenersCounter++;
    alreadyListeningTo[mountAt[topListenersIDKey]] = {};
  }
  return alreadyListeningTo[mountAt[topListenersIDKey]];
}

/**
 * `ReactBrowserEventEmitter` is used to attach top-level event listeners. For
 * example:
 *
 *   EventPluginHub.putListener('myID', 'onClick', myFunction);
 *
 * This would allocate a "registration" of `('onClick', myFunction)` on 'myID'.
 *
 * @internal
 */
var ReactBrowserEventEmitter$1 = _assign$9({}, ReactEventEmitterMixin, {

  /**
   * Injectable event backend
   */
  ReactEventListener: null,

  injection: {
    /**
     * @param {object} ReactEventListener
     */
    injectReactEventListener: function (ReactEventListener) {
      ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter$1.handleTopLevel);
      ReactBrowserEventEmitter$1.ReactEventListener = ReactEventListener;
    }
  },

  /**
   * Sets whether or not any created callbacks should be enabled.
   *
   * @param {boolean} enabled True if callbacks should be enabled.
   */
  setEnabled: function (enabled) {
    if (ReactBrowserEventEmitter$1.ReactEventListener) {
      ReactBrowserEventEmitter$1.ReactEventListener.setEnabled(enabled);
    }
  },

  /**
   * @return {boolean} True if callbacks are enabled.
   */
  isEnabled: function () {
    return !!(ReactBrowserEventEmitter$1.ReactEventListener && ReactBrowserEventEmitter$1.ReactEventListener.isEnabled());
  },

  /**
   * We listen for bubbled touch events on the document object.
   *
   * Firefox v8.01 (and possibly others) exhibited strange behavior when
   * mounting `onmousemove` events at some node that was not the document
   * element. The symptoms were that if your mouse is not moving over something
   * contained within that mount point (for example on the background) the
   * top-level listeners for `onmousemove` won't be called. However, if you
   * register the `mousemove` on the document object, then it will of course
   * catch all `mousemove`s. This along with iOS quirks, justifies restricting
   * top-level listeners to the document object only, at least for these
   * movement types of events and possibly all events.
   *
   * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
   *
   * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
   * they bubble to document.
   *
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {object} contentDocumentHandle Document which owns the container
   */
  listenTo: function (registrationName, contentDocumentHandle) {
    var mountAt = contentDocumentHandle;
    var isListening = getListeningForDocument(mountAt);
    var dependencies = EventPluginRegistry$3.registrationNameDependencies[registrationName];

    var topLevelTypes = EventConstants$7.topLevelTypes;
    for (var i = 0; i < dependencies.length; i++) {
      var dependency = dependencies[i];
      if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
        if (dependency === topLevelTypes.topWheel) {
          if (isEventSupported$3('wheel')) {
            ReactBrowserEventEmitter$1.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'wheel', mountAt);
          } else if (isEventSupported$3('mousewheel')) {
            ReactBrowserEventEmitter$1.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'mousewheel', mountAt);
          } else {
            // Firefox needs to capture a different mouse scroll event.
            // @see http://www.quirksmode.org/dom/events/tests/scroll.html
            ReactBrowserEventEmitter$1.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'DOMMouseScroll', mountAt);
          }
        } else if (dependency === topLevelTypes.topScroll) {

          if (isEventSupported$3('scroll', true)) {
            ReactBrowserEventEmitter$1.ReactEventListener.trapCapturedEvent(topLevelTypes.topScroll, 'scroll', mountAt);
          } else {
            ReactBrowserEventEmitter$1.ReactEventListener.trapBubbledEvent(topLevelTypes.topScroll, 'scroll', ReactBrowserEventEmitter$1.ReactEventListener.WINDOW_HANDLE);
          }
        } else if (dependency === topLevelTypes.topFocus || dependency === topLevelTypes.topBlur) {

          if (isEventSupported$3('focus', true)) {
            ReactBrowserEventEmitter$1.ReactEventListener.trapCapturedEvent(topLevelTypes.topFocus, 'focus', mountAt);
            ReactBrowserEventEmitter$1.ReactEventListener.trapCapturedEvent(topLevelTypes.topBlur, 'blur', mountAt);
          } else if (isEventSupported$3('focusin')) {
            // IE has `focusin` and `focusout` events which bubble.
            // @see http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
            ReactBrowserEventEmitter$1.ReactEventListener.trapBubbledEvent(topLevelTypes.topFocus, 'focusin', mountAt);
            ReactBrowserEventEmitter$1.ReactEventListener.trapBubbledEvent(topLevelTypes.topBlur, 'focusout', mountAt);
          }

          // to make sure blur and focus event listeners are only attached once
          isListening[topLevelTypes.topBlur] = true;
          isListening[topLevelTypes.topFocus] = true;
        } else if (topEventMapping.hasOwnProperty(dependency)) {
          ReactBrowserEventEmitter$1.ReactEventListener.trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
        }

        isListening[dependency] = true;
      }
    }
  },

  trapBubbledEvent: function (topLevelType, handlerBaseName, handle) {
    return ReactBrowserEventEmitter$1.ReactEventListener.trapBubbledEvent(topLevelType, handlerBaseName, handle);
  },

  trapCapturedEvent: function (topLevelType, handlerBaseName, handle) {
    return ReactBrowserEventEmitter$1.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
  },

  /**
   * Listens to window scroll and resize events. We cache scroll values so that
   * application code can access them without triggering reflows.
   *
   * ViewportMetrics is only used by SyntheticMouse/TouchEvent and only when
   * pageX/pageY isn't supported (legacy browsers).
   *
   * NOTE: Scroll events do not bubble.
   *
   * @see http://www.quirksmode.org/dom/events/scroll.html
   */
  ensureScrollValueMonitoring: function () {
    if (hasEventPageXY === undefined) {
      hasEventPageXY = document.createEvent && 'pageX' in document.createEvent('MouseEvent');
    }
    if (!hasEventPageXY && !isMonitoringScrollValue) {
      var refresh = ViewportMetrics$2.refreshScrollValues;
      ReactBrowserEventEmitter$1.ReactEventListener.monitorScrollValue(refresh);
      isMonitoringScrollValue = true;
    }
  }

});

var ReactBrowserEventEmitter_1 = ReactBrowserEventEmitter$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DisabledInputUtils
 */

var disableableMouseListenerNames = {
  onClick: true,
  onDoubleClick: true,
  onMouseDown: true,
  onMouseMove: true,
  onMouseUp: true,

  onClickCapture: true,
  onDoubleClickCapture: true,
  onMouseDownCapture: true,
  onMouseMoveCapture: true,
  onMouseUpCapture: true
};

/**
 * Implements a host component that does not receive mouse events
 * when `disabled` is set.
 */
var DisabledInputUtils$1 = {
  getHostProps: function (inst, props) {
    if (!props.disabled) {
      return props;
    }

    // Copy the props, except the mouse listeners
    var hostProps = {};
    for (var key in props) {
      if (!disableableMouseListenerNames[key] && props.hasOwnProperty(key)) {
        hostProps[key] = props[key];
      }
    }

    return hostProps;
  }
};

var DisabledInputUtils_1 = DisabledInputUtils$1;

var DisabledInputUtils = DisabledInputUtils_1;

/**
 * Implements a <button> host component that does not receive mouse events
 * when `disabled` is set.
 */
var ReactDOMButton$1 = {
  getHostProps: DisabledInputUtils.getHostProps
};

var ReactDOMButton_1 = ReactDOMButton$1;

var _prodInvariant$18 = reactProdInvariant_1;

var ReactPropTypes$2 = ReactPropTypes_1;
var ReactPropTypeLocations$2 = ReactPropTypeLocations_1;
var ReactPropTypesSecret$2 = ReactPropTypesSecret_1;

var hasReadOnlyValue = {
  'button': true,
  'checkbox': true,
  'image': true,
  'hidden': true,
  'radio': true,
  'reset': true,
  'submit': true
};

function _assertSingleLink(inputProps) {
  !(inputProps.checkedLink == null || inputProps.valueLink == null) ? _prodInvariant$18('87') : void 0;
}
function _assertValueLink(inputProps) {
  _assertSingleLink(inputProps);
  !(inputProps.value == null && inputProps.onChange == null) ? _prodInvariant$18('88') : void 0;
}

function _assertCheckedLink(inputProps) {
  _assertSingleLink(inputProps);
  !(inputProps.checked == null && inputProps.onChange == null) ? _prodInvariant$18('89') : void 0;
}

var propTypes = {
  value: function (props, propName, componentName) {
    if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
      return null;
    }
    return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
  },
  checked: function (props, propName, componentName) {
    if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
      return null;
    }
    return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
  },
  onChange: ReactPropTypes$2.func
};

var loggedTypeFailures = {};
function getDeclarationErrorAddendum$1(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Provide a linked `value` attribute for controlled forms. You should not use
 * this outside of the ReactDOM controlled form components.
 */
var LinkedValueUtils$1 = {
  checkPropTypes: function (tagName, props, owner) {
    for (var propName in propTypes) {
      if (propTypes.hasOwnProperty(propName)) {
        var error = propTypes[propName](props, propName, tagName, ReactPropTypeLocations$2.prop, null, ReactPropTypesSecret$2);
      }
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var addendum = getDeclarationErrorAddendum$1(owner);
        void 0;
      }
    }
  },

  /**
   * @param {object} inputProps Props for form component
   * @return {*} current value of the input either from value prop or link.
   */
  getValue: function (inputProps) {
    if (inputProps.valueLink) {
      _assertValueLink(inputProps);
      return inputProps.valueLink.value;
    }
    return inputProps.value;
  },

  /**
   * @param {object} inputProps Props for form component
   * @return {*} current checked status of the input either from checked prop
   *             or link.
   */
  getChecked: function (inputProps) {
    if (inputProps.checkedLink) {
      _assertCheckedLink(inputProps);
      return inputProps.checkedLink.value;
    }
    return inputProps.checked;
  },

  /**
   * @param {object} inputProps Props for form component
   * @param {SyntheticEvent} event change event to handle
   */
  executeOnChange: function (inputProps, event) {
    if (inputProps.valueLink) {
      _assertValueLink(inputProps);
      return inputProps.valueLink.requestChange(event.target.value);
    } else if (inputProps.checkedLink) {
      _assertCheckedLink(inputProps);
      return inputProps.checkedLink.requestChange(event.target.checked);
    } else if (inputProps.onChange) {
      return inputProps.onChange.call(undefined, event);
    }
  }
};

var LinkedValueUtils_1 = LinkedValueUtils$1;

var _prodInvariant$17 = reactProdInvariant_1;
var _assign$10 = index$1;

var DisabledInputUtils$2 = DisabledInputUtils_1;
var DOMPropertyOperations$2 = DOMPropertyOperations_1;
var LinkedValueUtils = LinkedValueUtils_1;
var ReactDOMComponentTree$10 = ReactDOMComponentTree_1;
var ReactUpdates$3 = ReactUpdates_1;

function forceUpdateIfMounted() {
  if (this._rootNodeID) {
    // DOM component is still mounted; update
    ReactDOMInput$1.updateWrapper(this);
  }
}

var ReactDOMInput$1 = {
  getHostProps: function (inst, props) {
    var value = LinkedValueUtils.getValue(props);
    var checked = LinkedValueUtils.getChecked(props);

    var hostProps = _assign$10({
      // Make sure we set .type before any other properties (setting .value
      // before .type means .value is lost in IE11 and below)
      type: undefined,
      // Make sure we set .step before .value (setting .value before .step
      // means .value is rounded on mount, based upon step precision)
      step: undefined
    }, DisabledInputUtils$2.getHostProps(inst, props), {
      defaultChecked: undefined,
      defaultValue: undefined,
      value: value != null ? value : inst._wrapperState.initialValue,
      checked: checked != null ? checked : inst._wrapperState.initialChecked,
      onChange: inst._wrapperState.onChange
    });

    return hostProps;
  },

  mountWrapper: function (inst, props) {
    var defaultValue = props.defaultValue;
    inst._wrapperState = {
      initialChecked: props.checked != null ? props.checked : props.defaultChecked,
      initialValue: props.value != null ? props.value : defaultValue,
      listeners: null,
      onChange: _handleChange.bind(inst)
    };

    
  },

  updateWrapper: function (inst) {
    var props = inst._currentElement.props;

    var checked = props.checked;
    if (checked != null) {
      DOMPropertyOperations$2.setValueForProperty(ReactDOMComponentTree$10.getNodeFromInstance(inst), 'checked', checked || false);
    }

    var node = ReactDOMComponentTree$10.getNodeFromInstance(inst);
    var value = LinkedValueUtils.getValue(props);
    if (value != null) {

      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      var newValue = '' + value;

      // To avoid side effects (such as losing text selection), only set value if changed
      if (newValue !== node.value) {
        node.value = newValue;
      }
    } else {
      if (props.value == null && props.defaultValue != null) {
        node.defaultValue = '' + props.defaultValue;
      }
      if (props.checked == null && props.defaultChecked != null) {
        node.defaultChecked = !!props.defaultChecked;
      }
    }
  },

  postMountWrapper: function (inst) {
    var props = inst._currentElement.props;

    // This is in postMount because we need access to the DOM node, which is not
    // available until after the component has mounted.
    var node = ReactDOMComponentTree$10.getNodeFromInstance(inst);

    // Detach value from defaultValue. We won't do anything if we're working on
    // submit or reset inputs as those values & defaultValues are linked. They
    // are not resetable nodes so this operation doesn't matter and actually
    // removes browser-default values (eg "Submit Query") when no value is
    // provided.
    if (props.type !== 'submit' && props.type !== 'reset') {
      node.value = node.value;
    }

    // Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
    // this is needed to work around a chrome bug where setting defaultChecked
    // will sometimes influence the value of checked (even after detachment).
    // Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
    // We need to temporarily unset name to avoid disrupting radio button groups.
    var name = node.name;
    if (name !== '') {
      node.name = '';
    }
    node.defaultChecked = !node.defaultChecked;
    node.defaultChecked = !node.defaultChecked;
    if (name !== '') {
      node.name = name;
    }
  }
};

function _handleChange(event) {
  var props = this._currentElement.props;

  var returnValue = LinkedValueUtils.executeOnChange(props, event);

  // Here we use asap to wait until all updates have propagated, which
  // is important when using controlled components within layers:
  // https://github.com/facebook/react/issues/1698
  ReactUpdates$3.asap(forceUpdateIfMounted, this);

  var name = props.name;
  if (props.type === 'radio' && name != null) {
    var rootNode = ReactDOMComponentTree$10.getNodeFromInstance(this);
    var queryRoot = rootNode;

    while (queryRoot.parentNode) {
      queryRoot = queryRoot.parentNode;
    }

    // If `rootNode.form` was non-null, then we could try `form.elements`,
    // but that sometimes behaves strangely in IE8. We could also try using
    // `form.getElementsByName`, but that will only return direct children
    // and won't include inputs that use the HTML5 `form=` attribute. Since
    // the input might not even be in a form, let's just use the global
    // `querySelectorAll` to ensure we don't miss anything.
    var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');

    for (var i = 0; i < group.length; i++) {
      var otherNode = group[i];
      if (otherNode === rootNode || otherNode.form !== rootNode.form) {
        continue;
      }
      // This will throw if radio buttons rendered by different copies of React
      // and the same name are rendered into the same form (same as #1939).
      // That's probably okay; we don't support it just as we don't support
      // mixing React radio buttons with non-React ones.
      var otherInstance = ReactDOMComponentTree$10.getInstanceFromNode(otherNode);
      !otherInstance ? _prodInvariant$17('90') : void 0;
      // If this is a controlled radio button group, forcing the input that
      // was previously checked to update will cause it to be come re-checked
      // as appropriate.
      ReactUpdates$3.asap(forceUpdateIfMounted, otherInstance);
    }
  }

  return returnValue;
}

var ReactDOMInput_1 = ReactDOMInput$1;

var _assign$12 = index$1;

var DisabledInputUtils$3 = DisabledInputUtils_1;
var LinkedValueUtils$2 = LinkedValueUtils_1;
var ReactDOMComponentTree$12 = ReactDOMComponentTree_1;
var ReactUpdates$4 = ReactUpdates_1;

var didWarnValueDefaultValue$1 = false;

function updateOptionsIfPendingUpdateAndMounted() {
  if (this._rootNodeID && this._wrapperState.pendingUpdate) {
    this._wrapperState.pendingUpdate = false;

    var props = this._currentElement.props;
    var value = LinkedValueUtils$2.getValue(props);

    if (value != null) {
      updateOptions(this, Boolean(props.multiple), value);
    }
  }
}

function updateOptions(inst, multiple, propValue) {
  var selectedValue, i;
  var options = ReactDOMComponentTree$12.getNodeFromInstance(inst).options;

  if (multiple) {
    selectedValue = {};
    for (i = 0; i < propValue.length; i++) {
      selectedValue['' + propValue[i]] = true;
    }
    for (i = 0; i < options.length; i++) {
      var selected = selectedValue.hasOwnProperty(options[i].value);
      if (options[i].selected !== selected) {
        options[i].selected = selected;
      }
    }
  } else {
    // Do not set `select.value` as exact behavior isn't consistent across all
    // browsers for all cases.
    selectedValue = '' + propValue;
    for (i = 0; i < options.length; i++) {
      if (options[i].value === selectedValue) {
        options[i].selected = true;
        return;
      }
    }
    if (options.length) {
      options[0].selected = true;
    }
  }
}

/**
 * Implements a <select> host component that allows optionally setting the
 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
 * stringable. If `multiple` is true, the prop must be an array of stringables.
 *
 * If `value` is not supplied (or null/undefined), user actions that change the
 * selected option will trigger updates to the rendered options.
 *
 * If it is supplied (and not null/undefined), the rendered options will not
 * update in response to user actions. Instead, the `value` prop must change in
 * order for the rendered options to update.
 *
 * If `defaultValue` is provided, any options with the supplied values will be
 * selected.
 */
var ReactDOMSelect$2 = {
  getHostProps: function (inst, props) {
    return _assign$12({}, DisabledInputUtils$3.getHostProps(inst, props), {
      onChange: inst._wrapperState.onChange,
      value: undefined
    });
  },

  mountWrapper: function (inst, props) {
    var value = LinkedValueUtils$2.getValue(props);
    inst._wrapperState = {
      pendingUpdate: false,
      initialValue: value != null ? value : props.defaultValue,
      listeners: null,
      onChange: _handleChange$1.bind(inst),
      wasMultiple: Boolean(props.multiple)
    };

    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue$1) {
      void 0;
      didWarnValueDefaultValue$1 = true;
    }
  },

  getSelectValueContext: function (inst) {
    // ReactDOMOption looks at this initial value so the initial generated
    // markup has correct `selected` attributes
    return inst._wrapperState.initialValue;
  },

  postUpdateWrapper: function (inst) {
    var props = inst._currentElement.props;

    // After the initial mount, we control selected-ness manually so don't pass
    // this value down
    inst._wrapperState.initialValue = undefined;

    var wasMultiple = inst._wrapperState.wasMultiple;
    inst._wrapperState.wasMultiple = Boolean(props.multiple);

    var value = LinkedValueUtils$2.getValue(props);
    if (value != null) {
      inst._wrapperState.pendingUpdate = false;
      updateOptions(inst, Boolean(props.multiple), value);
    } else if (wasMultiple !== Boolean(props.multiple)) {
      // For simplicity, reapply `defaultValue` if `multiple` is toggled.
      if (props.defaultValue != null) {
        updateOptions(inst, Boolean(props.multiple), props.defaultValue);
      } else {
        // Revert the select back to its default unselected state.
        updateOptions(inst, Boolean(props.multiple), props.multiple ? [] : '');
      }
    }
  }
};

function _handleChange$1(event) {
  var props = this._currentElement.props;
  var returnValue = LinkedValueUtils$2.executeOnChange(props, event);

  if (this._rootNodeID) {
    this._wrapperState.pendingUpdate = true;
  }
  ReactUpdates$4.asap(updateOptionsIfPendingUpdateAndMounted, this);
  return returnValue;
}

var ReactDOMSelect_1 = ReactDOMSelect$2;

var _assign$11 = index$1;

var ReactChildren$2 = ReactChildren_1;
var ReactDOMComponentTree$11 = ReactDOMComponentTree_1;
var ReactDOMSelect$1 = ReactDOMSelect_1;

var didWarnInvalidOptionChildren = false;

function flattenChildren(children) {
  var content = '';

  // Flatten children and warn if they aren't strings or numbers;
  // invalid types are ignored.
  ReactChildren$2.forEach(children, function (child) {
    if (child == null) {
      return;
    }
    if (typeof child === 'string' || typeof child === 'number') {
      content += child;
    } else if (!didWarnInvalidOptionChildren) {
      didWarnInvalidOptionChildren = true;
      void 0;
    }
  });

  return content;
}

/**
 * Implements an <option> host component that warns when `selected` is set.
 */
var ReactDOMOption$1 = {
  mountWrapper: function (inst, props, hostParent) {
    // TODO (yungsters): Remove support for `selected` in <option>.
    var selectValue = null;
    if (hostParent != null) {
      var selectParent = hostParent;

      if (selectParent._tag === 'optgroup') {
        selectParent = selectParent._hostParent;
      }

      if (selectParent != null && selectParent._tag === 'select') {
        selectValue = ReactDOMSelect$1.getSelectValueContext(selectParent);
      }
    }

    // If the value is null (e.g., no specified value or after initial mount)
    // or missing (e.g., for <datalist>), we don't change props.selected
    var selected = null;
    if (selectValue != null) {
      var value;
      if (props.value != null) {
        value = props.value + '';
      } else {
        value = flattenChildren(props.children);
      }
      selected = false;
      if (Array.isArray(selectValue)) {
        // multiple
        for (var i = 0; i < selectValue.length; i++) {
          if ('' + selectValue[i] === value) {
            selected = true;
            break;
          }
        }
      } else {
        selected = '' + selectValue === value;
      }
    }

    inst._wrapperState = { selected: selected };
  },

  postMountWrapper: function (inst) {
    // value="" should make a value attribute (#6219)
    var props = inst._currentElement.props;
    if (props.value != null) {
      var node = ReactDOMComponentTree$11.getNodeFromInstance(inst);
      node.setAttribute('value', props.value);
    }
  },

  getHostProps: function (inst, props) {
    var hostProps = _assign$11({ selected: undefined, children: undefined }, props);

    // Read state only from initial mount because <select> updates value
    // manually; we need the initial state only for server rendering
    if (inst._wrapperState.selected != null) {
      hostProps.selected = inst._wrapperState.selected;
    }

    var content = flattenChildren(props.children);

    if (content) {
      hostProps.children = content;
    }

    return hostProps;
  }

};

var ReactDOMOption_1 = ReactDOMOption$1;

var _prodInvariant$19 = reactProdInvariant_1;
var _assign$13 = index$1;

var DisabledInputUtils$4 = DisabledInputUtils_1;
var LinkedValueUtils$3 = LinkedValueUtils_1;
var ReactDOMComponentTree$13 = ReactDOMComponentTree_1;
var ReactUpdates$5 = ReactUpdates_1;

function forceUpdateIfMounted$1() {
  if (this._rootNodeID) {
    // DOM component is still mounted; update
    ReactDOMTextarea$1.updateWrapper(this);
  }
}

/**
 * Implements a <textarea> host component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */
var ReactDOMTextarea$1 = {
  getHostProps: function (inst, props) {
    !(props.dangerouslySetInnerHTML == null) ? _prodInvariant$19('91') : void 0;

    // Always set children to the same thing. In IE9, the selection range will
    // get reset if `textContent` is mutated.  We could add a check in setTextContent
    // to only set the value if/when the value differs from the node value (which would
    // completely solve this IE9 bug), but Sebastian+Ben seemed to like this solution.
    // The value can be a boolean or object so that's why it's forced to be a string.
    var hostProps = _assign$13({}, DisabledInputUtils$4.getHostProps(inst, props), {
      value: undefined,
      defaultValue: undefined,
      children: '' + inst._wrapperState.initialValue,
      onChange: inst._wrapperState.onChange
    });

    return hostProps;
  },

  mountWrapper: function (inst, props) {
    var value = LinkedValueUtils$3.getValue(props);
    var initialValue = value;

    // Only bother fetching default value if we're going to use it
    if (value == null) {
      var defaultValue = props.defaultValue;
      // TODO (yungsters): Remove support for children content in <textarea>.
      var children = props.children;
      if (children != null) {
        !(defaultValue == null) ? _prodInvariant$19('92') : void 0;
        if (Array.isArray(children)) {
          !(children.length <= 1) ? _prodInvariant$19('93') : void 0;
          children = children[0];
        }

        defaultValue = '' + children;
      }
      if (defaultValue == null) {
        defaultValue = '';
      }
      initialValue = defaultValue;
    }

    inst._wrapperState = {
      initialValue: '' + initialValue,
      listeners: null,
      onChange: _handleChange$2.bind(inst)
    };
  },

  updateWrapper: function (inst) {
    var props = inst._currentElement.props;

    var node = ReactDOMComponentTree$13.getNodeFromInstance(inst);
    var value = LinkedValueUtils$3.getValue(props);
    if (value != null) {
      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      var newValue = '' + value;

      // To avoid side effects (such as losing text selection), only set value if changed
      if (newValue !== node.value) {
        node.value = newValue;
      }
      if (props.defaultValue == null) {
        node.defaultValue = newValue;
      }
    }
    if (props.defaultValue != null) {
      node.defaultValue = props.defaultValue;
    }
  },

  postMountWrapper: function (inst) {
    // This is in postMount because we need access to the DOM node, which is not
    // available until after the component has mounted.
    var node = ReactDOMComponentTree$13.getNodeFromInstance(inst);

    // Warning: node.value may be the empty string at this point (IE11) if placeholder is set.
    node.value = node.textContent; // Detach value from defaultValue
  }
};

function _handleChange$2(event) {
  var props = this._currentElement.props;
  var returnValue = LinkedValueUtils$3.executeOnChange(props, event);
  ReactUpdates$5.asap(forceUpdateIfMounted$1, this);
  return returnValue;
}

var ReactDOMTextarea_1 = ReactDOMTextarea$1;

var _prodInvariant$21 = reactProdInvariant_1;

var injected = false;

var ReactComponentEnvironment$1 = {

  /**
   * Optionally injectable environment dependent cleanup hook. (server vs.
   * browser etc). Example: A browser system caches DOM nodes based on component
   * ID and must remove that cache entry when this instance is unmounted.
   */
  unmountIDFromEnvironment: null,

  /**
   * Optionally injectable hook for swapping out mount images in the middle of
   * the tree.
   */
  replaceNodeWithMarkup: null,

  /**
   * Optionally injectable hook for processing a queue of child updates. Will
   * later move into MultiChildComponents.
   */
  processChildrenUpdates: null,

  injection: {
    injectEnvironment: function (environment) {
      !!injected ? _prodInvariant$21('104') : void 0;
      ReactComponentEnvironment$1.unmountIDFromEnvironment = environment.unmountIDFromEnvironment;
      ReactComponentEnvironment$1.replaceNodeWithMarkup = environment.replaceNodeWithMarkup;
      ReactComponentEnvironment$1.processChildrenUpdates = environment.processChildrenUpdates;
      injected = true;
    }
  }

};

var ReactComponentEnvironment_1 = ReactComponentEnvironment$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactInstanceMap
 */

var ReactInstanceMap$1 = {

  /**
   * This API should be called `delete` but we'd have to make sure to always
   * transform these to strings for IE support. When this transform is fully
   * supported we can rename it.
   */
  remove: function (key) {
    key._reactInternalInstance = undefined;
  },

  get: function (key) {
    return key._reactInternalInstance;
  },

  has: function (key) {
    return key._reactInternalInstance !== undefined;
  },

  set: function (key, value) {
    key._reactInternalInstance = value;
  }

};

var ReactInstanceMap_1 = ReactInstanceMap$1;

var _prodInvariant$24 = reactProdInvariant_1;

var ReactElement$9 = ReactElement_1;

var ReactNodeTypes$1 = {
  HOST: 0,
  COMPOSITE: 1,
  EMPTY: 2,

  getType: function (node) {
    if (node === null || node === false) {
      return ReactNodeTypes$1.EMPTY;
    } else if (ReactElement$9.isValidElement(node)) {
      if (typeof node.type === 'function') {
        return ReactNodeTypes$1.COMPOSITE;
      } else {
        return ReactNodeTypes$1.HOST;
      }
    }
    _prodInvariant$24('26', node);
  }
};

var ReactNodeTypes_1 = ReactNodeTypes$1;

var _prodInvariant$25 = reactProdInvariant_1;

var ReactPropTypeLocationNames$3 = ReactPropTypeLocationNames_1;
var ReactPropTypesSecret$3 = ReactPropTypesSecret_1;

var loggedTypeFailures$1 = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec$1(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ? _prodInvariant$25('84', componentName || 'React class', ReactPropTypeLocationNames$3[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$3);
      } catch (ex) {
        error = ex;
      }
      void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures$1)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures$1[error.message] = true;

        var componentStackInfo = '';

        void 0;
      }
    }
  }
}

var checkReactTypeSpec_1 = checkReactTypeSpec$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

var hasOwnProperty$4 = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is$1(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual$2(objA, objB) {
  if (is$1(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty$4.call(objB, keysA[i]) || !is$1(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

var shallowEqual_1 = shallowEqual$2;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule shouldUpdateReactComponent
 */

function shouldUpdateReactComponent$2(prevElement, nextElement) {
  var prevEmpty = prevElement === null || prevElement === false;
  var nextEmpty = nextElement === null || nextElement === false;
  if (prevEmpty || nextEmpty) {
    return prevEmpty === nextEmpty;
  }

  var prevType = typeof prevElement;
  var nextType = typeof nextElement;
  if (prevType === 'string' || prevType === 'number') {
    return nextType === 'string' || nextType === 'number';
  } else {
    return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
  }
}

var shouldUpdateReactComponent_1 = shouldUpdateReactComponent$2;

var _prodInvariant$23 = reactProdInvariant_1;
var _assign$15 = index$1;

var ReactComponentEnvironment$2 = ReactComponentEnvironment_1;
var ReactCurrentOwner$4 = ReactCurrentOwner_1;
var ReactElement$8 = ReactElement_1;
var ReactErrorUtils$3 = ReactErrorUtils_1;
var ReactInstanceMap$2 = ReactInstanceMap_1;
var ReactNodeTypes = ReactNodeTypes_1;
var ReactReconciler$5 = ReactReconciler_1;

var checkReactTypeSpec = checkReactTypeSpec_1;
var emptyObject$4 = emptyObject_1;
var shallowEqual$1 = shallowEqual_1;
var shouldUpdateReactComponent$1 = shouldUpdateReactComponent_1;
var CompositeTypes = {
  ImpureClass: 0,
  PureClass: 1,
  StatelessFunctional: 2
};

function StatelessComponent(Component) {}
StatelessComponent.prototype.render = function () {
  var Component = ReactInstanceMap$2.get(this)._currentElement.type;
  var element = Component(this.props, this.context, this.updater);
  warnIfInvalidElement(Component, element);
  return element;
};

function warnIfInvalidElement(Component, element) {
  
}

function shouldConstruct(Component) {
  return !!(Component.prototype && Component.prototype.isReactComponent);
}

function isPureComponent(Component) {
  return !!(Component.prototype && Component.prototype.isPureReactComponent);
}

/**
 * ------------------ The Life-Cycle of a Composite Component ------------------
 *
 * - constructor: Initialization of state. The instance is now retained.
 *   - componentWillMount
 *   - render
 *   - [children's constructors]
 *     - [children's componentWillMount and render]
 *     - [children's componentDidMount]
 *     - componentDidMount
 *
 *       Update Phases:
 *       - componentWillReceiveProps (only called if parent updated)
 *       - shouldComponentUpdate
 *         - componentWillUpdate
 *           - render
 *           - [children's constructors or receive props phases]
 *         - componentDidUpdate
 *
 *     - componentWillUnmount
 *     - [children's componentWillUnmount]
 *   - [children destroyed]
 * - (destroyed): The instance is now blank, released by React and ready for GC.
 *
 * -----------------------------------------------------------------------------
 */

/**
 * An incrementing ID assigned to each component when it is mounted. This is
 * used to enforce the order in which `ReactUpdates` updates dirty components.
 *
 * @private
 */
var nextMountID = 1;

/**
 * @lends {ReactCompositeComponent.prototype}
 */
var ReactCompositeComponentMixin = {

  /**
   * Base constructor for all composite component.
   *
   * @param {ReactElement} element
   * @final
   * @internal
   */
  construct: function (element) {
    this._currentElement = element;
    this._rootNodeID = null;
    this._compositeType = null;
    this._instance = null;
    this._hostParent = null;
    this._hostContainerInfo = null;

    // See ReactUpdateQueue
    this._updateBatchNumber = null;
    this._pendingElement = null;
    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;

    this._renderedNodeType = null;
    this._renderedComponent = null;
    this._context = null;
    this._mountOrder = 0;
    this._topLevelWrapper = null;

    // See ReactUpdates and ReactUpdateQueue.
    this._pendingCallbacks = null;

    // ComponentWillUnmount shall only be called once
    this._calledComponentWillUnmount = false;

    
  },

  /**
   * Initializes the component, renders markup, and registers event listeners.
   *
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {?object} hostParent
   * @param {?object} hostContainerInfo
   * @param {?object} context
   * @return {?string} Rendered markup to be inserted into the DOM.
   * @final
   * @internal
   */
  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {
    var _this = this;

    this._context = context;
    this._mountOrder = nextMountID++;
    this._hostParent = hostParent;
    this._hostContainerInfo = hostContainerInfo;

    var publicProps = this._currentElement.props;
    var publicContext = this._processContext(context);

    var Component = this._currentElement.type;

    var updateQueue = transaction.getUpdateQueue();

    // Initialize the public class
    var doConstruct = shouldConstruct(Component);
    var inst = this._constructComponent(doConstruct, publicProps, publicContext, updateQueue);
    var renderedElement;

    // Support functional components
    if (!doConstruct && (inst == null || inst.render == null)) {
      renderedElement = inst;
      warnIfInvalidElement(Component, renderedElement);
      !(inst === null || inst === false || ReactElement$8.isValidElement(inst)) ? _prodInvariant$23('105', Component.displayName || Component.name || 'Component') : void 0;
      inst = new StatelessComponent(Component);
      this._compositeType = CompositeTypes.StatelessFunctional;
    } else {
      if (isPureComponent(Component)) {
        this._compositeType = CompositeTypes.PureClass;
      } else {
        this._compositeType = CompositeTypes.ImpureClass;
      }
    }

    inst.props = publicProps;
    inst.context = publicContext;
    inst.refs = emptyObject$4;
    inst.updater = updateQueue;

    this._instance = inst;

    // Store a reference from the instance back to the internal representation
    ReactInstanceMap$2.set(inst, this);

    var initialState = inst.state;
    if (initialState === undefined) {
      inst.state = initialState = null;
    }
    !(typeof initialState === 'object' && !Array.isArray(initialState)) ? _prodInvariant$23('106', this.getName() || 'ReactCompositeComponent') : void 0;

    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;

    var markup;
    if (inst.unstable_handleError) {
      markup = this.performInitialMountWithErrorHandling(renderedElement, hostParent, hostContainerInfo, transaction, context);
    } else {
      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
    }

    if (inst.componentDidMount) {
      {
        transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
      }
    }

    return markup;
  },

  _constructComponent: function (doConstruct, publicProps, publicContext, updateQueue) {
    {
      return this._constructComponentWithoutOwner(doConstruct, publicProps, publicContext, updateQueue);
    }
  },

  _constructComponentWithoutOwner: function (doConstruct, publicProps, publicContext, updateQueue) {
    var Component = this._currentElement.type;
    var instanceOrElement;
    if (doConstruct) {
      instanceOrElement = new Component(publicProps, publicContext, updateQueue);
      
    } else {
      // This can still be an instance in case of factory components
      // but we'll count this as time spent rendering as the more common case.
      instanceOrElement = Component(publicProps, publicContext, updateQueue);
      
    }
    return instanceOrElement;
  },

  performInitialMountWithErrorHandling: function (renderedElement, hostParent, hostContainerInfo, transaction, context) {
    var markup;
    var checkpoint = transaction.checkpoint();
    try {
      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
    } catch (e) {
      transaction.rollback(checkpoint);
      this._instance.unstable_handleError(e);
      if (this._pendingStateQueue) {
        this._instance.state = this._processPendingState(this._instance.props, this._instance.context);
      }
      checkpoint = transaction.checkpoint();

      this._renderedComponent.unmountComponent(true);
      transaction.rollback(checkpoint);

      // Try again - we've informed the component about the error, so they can render an error message this time.
      // If this throws again, the error will bubble up (and can be caught by a higher error boundary).
      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
    }
    return markup;
  },

  performInitialMount: function (renderedElement, hostParent, hostContainerInfo, transaction, context) {
    var inst = this._instance;
    if (inst.componentWillMount) {
      inst.componentWillMount();
      if (this._pendingStateQueue) {
        inst.state = this._processPendingState(inst.props, inst.context);
      }
    }

    // If not a stateless component, we now render
    if (renderedElement === undefined) {
      renderedElement = this._renderValidatedComponent();
    }

    var nodeType = ReactNodeTypes.getType(renderedElement);
    this._renderedNodeType = nodeType;
    var child = this._instantiateReactComponent(renderedElement, nodeType !== ReactNodeTypes.EMPTY /* shouldHaveDebugID */
    );
    this._renderedComponent = child;
    var markup = ReactReconciler$5.mountComponent(child, transaction, hostParent, hostContainerInfo, this._processChildContext(context));

    return markup;
  },

  getHostNode: function () {
    return ReactReconciler$5.getHostNode(this._renderedComponent);
  },

  /**
   * Releases any resources allocated by `mountComponent`.
   *
   * @final
   * @internal
   */
  unmountComponent: function (safely) {
    if (!this._renderedComponent) {
      return;
    }
    var inst = this._instance;

    if (inst.componentWillUnmount && !inst._calledComponentWillUnmount) {
      inst._calledComponentWillUnmount = true;
      if (safely) {
        var name = this.getName() + '.componentWillUnmount()';
        ReactErrorUtils$3.invokeGuardedCallback(name, inst.componentWillUnmount.bind(inst));
      } else {
        inst.componentWillUnmount();
      }
      
    }

    if (this._renderedComponent) {
      ReactReconciler$5.unmountComponent(this._renderedComponent, safely);
      this._renderedNodeType = null;
      this._renderedComponent = null;
      this._instance = null;
    }

    // Reset pending fields
    // Even if this component is scheduled for another update in ReactUpdates,
    // it would still be ignored because these fields are reset.
    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;
    this._pendingCallbacks = null;
    this._pendingElement = null;

    // These fields do not really need to be reset since this object is no
    // longer accessible.
    this._context = null;
    this._rootNodeID = null;
    this._topLevelWrapper = null;

    // Delete the reference from the instance to this internal representation
    // which allow the internals to be properly cleaned up even if the user
    // leaks a reference to the public instance.
    ReactInstanceMap$2.remove(inst);

    // Some existing components rely on inst.props even after they've been
    // destroyed (in event handlers).
    // TODO: inst.props = null;
    // TODO: inst.state = null;
    // TODO: inst.context = null;
  },

  /**
   * Filters the context object to only contain keys specified in
   * `contextTypes`
   *
   * @param {object} context
   * @return {?object}
   * @private
   */
  _maskContext: function (context) {
    var Component = this._currentElement.type;
    var contextTypes = Component.contextTypes;
    if (!contextTypes) {
      return emptyObject$4;
    }
    var maskedContext = {};
    for (var contextName in contextTypes) {
      maskedContext[contextName] = context[contextName];
    }
    return maskedContext;
  },

  /**
   * Filters the context object to only contain keys specified in
   * `contextTypes`, and asserts that they are valid.
   *
   * @param {object} context
   * @return {?object}
   * @private
   */
  _processContext: function (context) {
    var maskedContext = this._maskContext(context);
    return maskedContext;
  },

  /**
   * @param {object} currentContext
   * @return {object}
   * @private
   */
  _processChildContext: function (currentContext) {
    var Component = this._currentElement.type;
    var inst = this._instance;
    var childContext = inst.getChildContext && inst.getChildContext();
    if (childContext) {
      !(typeof Component.childContextTypes === 'object') ? _prodInvariant$23('107', this.getName() || 'ReactCompositeComponent') : void 0;
      for (var name in childContext) {
        !(name in Component.childContextTypes) ? _prodInvariant$23('108', this.getName() || 'ReactCompositeComponent', name) : void 0;
      }
      return _assign$15({}, currentContext, childContext);
    }
    return currentContext;
  },

  /**
   * Assert that the context types are valid
   *
   * @param {object} typeSpecs Map of context field to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @private
   */
  _checkContextTypes: function (typeSpecs, values, location) {
    checkReactTypeSpec(typeSpecs, values, location, this.getName(), null, this._debugID);
  },

  receiveComponent: function (nextElement, transaction, nextContext) {
    var prevElement = this._currentElement;
    var prevContext = this._context;

    this._pendingElement = null;

    this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
  },

  /**
   * If any of `_pendingElement`, `_pendingStateQueue`, or `_pendingForceUpdate`
   * is set, update the component.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  performUpdateIfNecessary: function (transaction) {
    if (this._pendingElement != null) {
      ReactReconciler$5.receiveComponent(this, this._pendingElement, transaction, this._context);
    } else if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
      this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
    } else {
      this._updateBatchNumber = null;
    }
  },

  /**
   * Perform an update to a mounted component. The componentWillReceiveProps and
   * shouldComponentUpdate methods are called, then (assuming the update isn't
   * skipped) the remaining update lifecycle methods are called and the DOM
   * representation is updated.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @param {ReactElement} prevParentElement
   * @param {ReactElement} nextParentElement
   * @internal
   * @overridable
   */
  updateComponent: function (transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
    var inst = this._instance;
    !(inst != null) ? _prodInvariant$23('136', this.getName() || 'ReactCompositeComponent') : void 0;

    var willReceive = false;
    var nextContext;

    // Determine if the context has changed or not
    if (this._context === nextUnmaskedContext) {
      nextContext = inst.context;
    } else {
      nextContext = this._processContext(nextUnmaskedContext);
      willReceive = true;
    }

    var prevProps = prevParentElement.props;
    var nextProps = nextParentElement.props;

    // Not a simple state update but a props update
    if (prevParentElement !== nextParentElement) {
      willReceive = true;
    }

    // An update here will schedule an update but immediately set
    // _pendingStateQueue which will ensure that any state updates gets
    // immediately reconciled instead of waiting for the next batch.
    if (willReceive && inst.componentWillReceiveProps) {
      inst.componentWillReceiveProps(nextProps, nextContext);
      
    }

    var nextState = this._processPendingState(nextProps, nextContext);
    var shouldUpdate = true;

    if (!this._pendingForceUpdate) {
      if (inst.shouldComponentUpdate) {
        shouldUpdate = inst.shouldComponentUpdate(nextProps, nextState, nextContext);
        
      } else {
        if (this._compositeType === CompositeTypes.PureClass) {
          shouldUpdate = !shallowEqual$1(prevProps, nextProps) || !shallowEqual$1(inst.state, nextState);
        }
      }
    }

    this._updateBatchNumber = null;
    if (shouldUpdate) {
      this._pendingForceUpdate = false;
      // Will set `this.props`, `this.state` and `this.context`.
      this._performComponentUpdate(nextParentElement, nextProps, nextState, nextContext, transaction, nextUnmaskedContext);
    } else {
      // If it's determined that a component should not update, we still want
      // to set props and state but we shortcut the rest of the update.
      this._currentElement = nextParentElement;
      this._context = nextUnmaskedContext;
      inst.props = nextProps;
      inst.state = nextState;
      inst.context = nextContext;
    }
  },

  _processPendingState: function (props, context) {
    var inst = this._instance;
    var queue = this._pendingStateQueue;
    var replace = this._pendingReplaceState;
    this._pendingReplaceState = false;
    this._pendingStateQueue = null;

    if (!queue) {
      return inst.state;
    }

    if (replace && queue.length === 1) {
      return queue[0];
    }

    var nextState = _assign$15({}, replace ? queue[0] : inst.state);
    for (var i = replace ? 1 : 0; i < queue.length; i++) {
      var partial = queue[i];
      _assign$15(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
    }

    return nextState;
  },

  /**
   * Merges new props and state, notifies delegate methods of update and
   * performs update.
   *
   * @param {ReactElement} nextElement Next element
   * @param {object} nextProps Next public object to set as properties.
   * @param {?object} nextState Next object to set as state.
   * @param {?object} nextContext Next public object to set as context.
   * @param {ReactReconcileTransaction} transaction
   * @param {?object} unmaskedContext
   * @private
   */
  _performComponentUpdate: function (nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
    var _this2 = this;

    var inst = this._instance;

    var hasComponentDidUpdate = Boolean(inst.componentDidUpdate);
    var prevProps;
    var prevState;
    var prevContext;
    if (hasComponentDidUpdate) {
      prevProps = inst.props;
      prevState = inst.state;
      prevContext = inst.context;
    }

    if (inst.componentWillUpdate) {
      inst.componentWillUpdate(nextProps, nextState, nextContext);
      
    }

    this._currentElement = nextElement;
    this._context = unmaskedContext;
    inst.props = nextProps;
    inst.state = nextState;
    inst.context = nextContext;

    this._updateRenderedComponent(transaction, unmaskedContext);

    if (hasComponentDidUpdate) {
      {
        transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), inst);
      }
    }

    
  },

  /**
   * Call the component's `render` method and update the DOM accordingly.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  _updateRenderedComponent: function (transaction, context) {
    var prevComponentInstance = this._renderedComponent;
    var prevRenderedElement = prevComponentInstance._currentElement;
    var nextRenderedElement = this._renderValidatedComponent();
    if (shouldUpdateReactComponent$1(prevRenderedElement, nextRenderedElement)) {
      ReactReconciler$5.receiveComponent(prevComponentInstance, nextRenderedElement, transaction, this._processChildContext(context));
    } else {
      var oldHostNode = ReactReconciler$5.getHostNode(prevComponentInstance);
      ReactReconciler$5.unmountComponent(prevComponentInstance, false);

      var nodeType = ReactNodeTypes.getType(nextRenderedElement);
      this._renderedNodeType = nodeType;
      var child = this._instantiateReactComponent(nextRenderedElement, nodeType !== ReactNodeTypes.EMPTY /* shouldHaveDebugID */
      );
      this._renderedComponent = child;
      var nextMarkup = ReactReconciler$5.mountComponent(child, transaction, this._hostParent, this._hostContainerInfo, this._processChildContext(context));

      this._replaceNodeWithMarkup(oldHostNode, nextMarkup, prevComponentInstance);
    }
  },

  /**
   * Overridden in shallow rendering.
   *
   * @protected
   */
  _replaceNodeWithMarkup: function (oldHostNode, nextMarkup, prevInstance) {
    ReactComponentEnvironment$2.replaceNodeWithMarkup(oldHostNode, nextMarkup, prevInstance);
  },

  /**
   * @protected
   */
  _renderValidatedComponentWithoutOwnerOrContext: function () {
    var inst = this._instance;

    var renderedComponent = inst.render();
    return renderedComponent;
  },

  /**
   * @private
   */
  _renderValidatedComponent: function () {
    var renderedComponent;
    if ("production" !== 'production' || this._compositeType !== CompositeTypes.StatelessFunctional) {
      ReactCurrentOwner$4.current = this;
      try {
        renderedComponent = this._renderValidatedComponentWithoutOwnerOrContext();
      } finally {
        ReactCurrentOwner$4.current = null;
      }
    } else {
      renderedComponent = this._renderValidatedComponentWithoutOwnerOrContext();
    }
    !(
    // TODO: An `isValidNode` function would probably be more appropriate
    renderedComponent === null || renderedComponent === false || ReactElement$8.isValidElement(renderedComponent)) ? _prodInvariant$23('109', this.getName() || 'ReactCompositeComponent') : void 0;

    return renderedComponent;
  },

  /**
   * Lazily allocates the refs object and stores `component` as `ref`.
   *
   * @param {string} ref Reference name.
   * @param {component} component Component to store as `ref`.
   * @final
   * @private
   */
  attachRef: function (ref, component) {
    var inst = this.getPublicInstance();
    !(inst != null) ? _prodInvariant$23('110') : void 0;
    var publicComponentInstance = component.getPublicInstance();
    var refs = inst.refs === emptyObject$4 ? inst.refs = {} : inst.refs;
    refs[ref] = publicComponentInstance;
  },

  /**
   * Detaches a reference name.
   *
   * @param {string} ref Name to dereference.
   * @final
   * @private
   */
  detachRef: function (ref) {
    var refs = this.getPublicInstance().refs;
    delete refs[ref];
  },

  /**
   * Get a text description of the component that can be used to identify it
   * in error messages.
   * @return {string} The name or null.
   * @internal
   */
  getName: function () {
    var type = this._currentElement.type;
    var constructor = this._instance && this._instance.constructor;
    return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
  },

  /**
   * Get the publicly accessible representation of this component - i.e. what
   * is exposed by refs and returned by render. Can be null for stateless
   * components.
   *
   * @return {ReactComponent} the public component instance.
   * @internal
   */
  getPublicInstance: function () {
    var inst = this._instance;
    if (this._compositeType === CompositeTypes.StatelessFunctional) {
      return null;
    }
    return inst;
  },

  // Stub
  _instantiateReactComponent: null

};

var ReactCompositeComponent$1 = {

  Mixin: ReactCompositeComponentMixin

};

var ReactCompositeComponent_1 = ReactCompositeComponent$1;

/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactEmptyComponent
 */

var emptyComponentFactory;

var ReactEmptyComponentInjection = {
  injectEmptyComponentFactory: function (factory) {
    emptyComponentFactory = factory;
  }
};

var ReactEmptyComponent$1 = {
  create: function (instantiate) {
    return emptyComponentFactory(instantiate);
  }
};

ReactEmptyComponent$1.injection = ReactEmptyComponentInjection;

var ReactEmptyComponent_1 = ReactEmptyComponent$1;

var _prodInvariant$27 = reactProdInvariant_1;
var _assign$16 = index$1;

var genericComponentClass = null;
// This registry keeps track of wrapper classes around host tags.
var tagToComponentClass = {};
var textComponentClass = null;

var ReactHostComponentInjection = {
  // This accepts a class that receives the tag string. This is a catch all
  // that can render any kind of tag.
  injectGenericComponentClass: function (componentClass) {
    genericComponentClass = componentClass;
  },
  // This accepts a text component class that takes the text string to be
  // rendered as props.
  injectTextComponentClass: function (componentClass) {
    textComponentClass = componentClass;
  },
  // This accepts a keyed object with classes as values. Each key represents a
  // tag. That particular tag will use this class instead of the generic one.
  injectComponentClasses: function (componentClasses) {
    _assign$16(tagToComponentClass, componentClasses);
  }
};

/**
 * Get a host internal component class for a specific tag.
 *
 * @param {ReactElement} element The element to create.
 * @return {function} The internal class constructor function.
 */
function createInternalComponent(element) {
  !genericComponentClass ? _prodInvariant$27('111', element.type) : void 0;
  return new genericComponentClass(element);
}

/**
 * @param {ReactText} text
 * @return {ReactComponent}
 */
function createInstanceForText(text) {
  return new textComponentClass(text);
}

/**
 * @param {ReactComponent} component
 * @return {boolean}
 */
function isTextComponent(component) {
  return component instanceof textComponentClass;
}

var ReactHostComponent$1 = {
  createInternalComponent: createInternalComponent,
  createInstanceForText: createInstanceForText,
  isTextComponent: isTextComponent,
  injection: ReactHostComponentInjection
};

var ReactHostComponent_1 = ReactHostComponent$1;

var _prodInvariant$22 = reactProdInvariant_1;
var _assign$14 = index$1;

var ReactCompositeComponent = ReactCompositeComponent_1;
var ReactEmptyComponent = ReactEmptyComponent_1;
var ReactHostComponent = ReactHostComponent_1;
var ReactCompositeComponentWrapper = function (element) {
  this.construct(element);
};
_assign$14(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent.Mixin, {
  _instantiateReactComponent: instantiateReactComponent$1
});

function getDeclarationErrorAddendum$3(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function isInternalComponentType(type) {
  return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
}

function instantiateReactComponent$1(node, shouldHaveDebugID) {
  var instance;

  if (node === null || node === false) {
    instance = ReactEmptyComponent.create(instantiateReactComponent$1);
  } else if (typeof node === 'object') {
    var element = node;
    !(element && (typeof element.type === 'function' || typeof element.type === 'string')) ? _prodInvariant$22('130', element.type == null ? element.type : typeof element.type, getDeclarationErrorAddendum$3(element._owner)) : void 0;

    // Special case string values
    if (typeof element.type === 'string') {
      instance = ReactHostComponent.createInternalComponent(element);
    } else if (isInternalComponentType(element.type)) {
      // This is temporarily available for custom components that are not string
      // representations. I.e. ART. Once those are updated to use the string
      // representation, we can drop this code path.
      instance = new element.type(element);

      // We renamed this. Allow the old name for compat. :(
      if (!instance.getHostNode) {
        instance.getHostNode = instance.getNativeNode;
      }
    } else {
      instance = new ReactCompositeComponentWrapper(element);
    }
  } else if (typeof node === 'string' || typeof node === 'number') {
    instance = ReactHostComponent.createInstanceForText(node);
  } else {
    _prodInvariant$22('131', typeof node);
  }

  instance._mountIndex = 0;
  instance._mountImage = null;

  return instance;
}

var instantiateReactComponent_1 = instantiateReactComponent$1;

var ReactReconciler$4 = ReactReconciler_1;

var instantiateReactComponent = instantiateReactComponent_1;
var shouldUpdateReactComponent = shouldUpdateReactComponent_1;
var traverseAllChildren$2 = traverseAllChildren_1;
function instantiateChild(childInstances, child, name, selfDebugID) {
  // We found a component instance.
  var keyUnique = childInstances[name] === undefined;
  if (child != null && keyUnique) {
    childInstances[name] = instantiateReactComponent(child, true);
  }
}

/**
 * ReactChildReconciler provides helpers for initializing or updating a set of
 * children. Its output is suitable for passing it onto ReactMultiChild which
 * does diffed reordering and insertion.
 */
var ReactChildReconciler$1 = {
  /**
   * Generates a "mount image" for each of the supplied children. In the case
   * of `ReactDOMComponent`, a mount image is a string of markup.
   *
   * @param {?object} nestedChildNodes Nested child maps.
   * @return {?object} A set of child instances.
   * @internal
   */
  instantiateChildren: function (nestedChildNodes, transaction, context, selfDebugID // __DEV__ only
  ) {
    if (nestedChildNodes == null) {
      return null;
    }
    var childInstances = {};

    {
      traverseAllChildren$2(nestedChildNodes, instantiateChild, childInstances);
    }
    return childInstances;
  },

  /**
   * Updates the rendered children and returns a new set of children.
   *
   * @param {?object} prevChildren Previously initialized set of children.
   * @param {?object} nextChildren Flat child element maps.
   * @param {ReactReconcileTransaction} transaction
   * @param {object} context
   * @return {?object} A new set of child instances.
   * @internal
   */
  updateChildren: function (prevChildren, nextChildren, mountImages, removedNodes, transaction, hostParent, hostContainerInfo, context) {
    // We currently don't have a way to track moves here but if we use iterators
    // instead of for..in we can zip the iterators and check if an item has
    // moved.
    // TODO: If nothing has changed, return the prevChildren object so that we
    // can quickly bailout if nothing has changed.
    if (!nextChildren && !prevChildren) {
      return;
    }
    var name;
    var prevChild;
    for (name in nextChildren) {
      if (!nextChildren.hasOwnProperty(name)) {
        continue;
      }
      prevChild = prevChildren && prevChildren[name];
      var prevElement = prevChild && prevChild._currentElement;
      var nextElement = nextChildren[name];
      if (prevChild != null && shouldUpdateReactComponent(prevElement, nextElement)) {
        ReactReconciler$4.receiveComponent(prevChild, nextElement, transaction, context);
        nextChildren[name] = prevChild;
      } else {
        if (prevChild) {
          removedNodes[name] = ReactReconciler$4.getHostNode(prevChild);
          ReactReconciler$4.unmountComponent(prevChild, false);
        }
        // The child must be instantiated before it's mounted.
        var nextChildInstance = instantiateReactComponent(nextElement, true);
        nextChildren[name] = nextChildInstance;
        // Creating mount image now ensures refs are resolved in right order
        // (see https://github.com/facebook/react/pull/7101 for explanation).
        var nextChildMountImage = ReactReconciler$4.mountComponent(nextChildInstance, transaction, hostParent, hostContainerInfo, context);
        mountImages.push(nextChildMountImage);
      }
    }
    // Unmount children that are no longer present.
    for (name in prevChildren) {
      if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
        prevChild = prevChildren[name];
        removedNodes[name] = ReactReconciler$4.getHostNode(prevChild);
        ReactReconciler$4.unmountComponent(prevChild, false);
      }
    }
  },

  /**
   * Unmounts all rendered children. This should be used to clean up children
   * when this component is unmounted.
   *
   * @param {?object} renderedChildren Previously initialized set of children.
   * @internal
   */
  unmountChildren: function (renderedChildren, safely) {
    for (var name in renderedChildren) {
      if (renderedChildren.hasOwnProperty(name)) {
        var renderedChild = renderedChildren[name];
        ReactReconciler$4.unmountComponent(renderedChild, safely);
      }
    }
  }

};

var ReactChildReconciler_1 = ReactChildReconciler$1;

var traverseAllChildren$3 = traverseAllChildren_1;
function flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID) {
  // We found a component instance.
  if (traverseContext && typeof traverseContext === 'object') {
    var result = traverseContext;
    var keyUnique = result[name] === undefined;
    if (keyUnique && child != null) {
      result[name] = child;
    }
  }
}

/**
 * Flattens children that are typically specified as `props.children`. Any null
 * children will not be included in the resulting object.
 * @return {!object} flattened children keyed by name.
 */
function flattenChildren$2(children, selfDebugID) {
  if (children == null) {
    return children;
  }
  var result = {};

  {
    traverseAllChildren$3(children, flattenSingleChildIntoContext, result);
  }
  return result;
}

var flattenChildren_1 = flattenChildren$2;

var _prodInvariant$20 = reactProdInvariant_1;

var ReactComponentEnvironment = ReactComponentEnvironment_1;
var ReactMultiChildUpdateTypes$2 = ReactMultiChildUpdateTypes_1;

var ReactReconciler$3 = ReactReconciler_1;
var ReactChildReconciler = ReactChildReconciler_1;

var flattenChildren$1 = flattenChildren_1;
function makeInsertMarkup(markup, afterNode, toIndex) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: ReactMultiChildUpdateTypes$2.INSERT_MARKUP,
    content: markup,
    fromIndex: null,
    fromNode: null,
    toIndex: toIndex,
    afterNode: afterNode
  };
}

/**
 * Make an update for moving an existing element to another index.
 *
 * @param {number} fromIndex Source index of the existing element.
 * @param {number} toIndex Destination index of the element.
 * @private
 */
function makeMove(child, afterNode, toIndex) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: ReactMultiChildUpdateTypes$2.MOVE_EXISTING,
    content: null,
    fromIndex: child._mountIndex,
    fromNode: ReactReconciler$3.getHostNode(child),
    toIndex: toIndex,
    afterNode: afterNode
  };
}

/**
 * Make an update for removing an element at an index.
 *
 * @param {number} fromIndex Index of the element to remove.
 * @private
 */
function makeRemove(child, node) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: ReactMultiChildUpdateTypes$2.REMOVE_NODE,
    content: null,
    fromIndex: child._mountIndex,
    fromNode: node,
    toIndex: null,
    afterNode: null
  };
}

/**
 * Make an update for setting the markup of a node.
 *
 * @param {string} markup Markup that renders into an element.
 * @private
 */
function makeSetMarkup(markup) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: ReactMultiChildUpdateTypes$2.SET_MARKUP,
    content: markup,
    fromIndex: null,
    fromNode: null,
    toIndex: null,
    afterNode: null
  };
}

/**
 * Make an update for setting the text content.
 *
 * @param {string} textContent Text content to set.
 * @private
 */
function makeTextContent(textContent) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: ReactMultiChildUpdateTypes$2.TEXT_CONTENT,
    content: textContent,
    fromIndex: null,
    fromNode: null,
    toIndex: null,
    afterNode: null
  };
}

/**
 * Push an update, if any, onto the queue. Creates a new queue if none is
 * passed and always returns the queue. Mutative.
 */
function enqueue(queue, update) {
  if (update) {
    queue = queue || [];
    queue.push(update);
  }
  return queue;
}

/**
 * Processes any enqueued updates.
 *
 * @private
 */
function processQueue(inst, updateQueue) {
  ReactComponentEnvironment.processChildrenUpdates(inst, updateQueue);
}

var ReactMultiChild$1 = {

  /**
   * Provides common functionality for components that must reconcile multiple
   * children. This is used by `ReactDOMComponent` to mount, update, and
   * unmount child components.
   *
   * @lends {ReactMultiChild.prototype}
   */
  Mixin: {

    _reconcilerInstantiateChildren: function (nestedChildren, transaction, context) {
      return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
    },

    _reconcilerUpdateChildren: function (prevChildren, nextNestedChildrenElements, mountImages, removedNodes, transaction, context) {
      var nextChildren;
      nextChildren = flattenChildren$1(nextNestedChildrenElements);
      ReactChildReconciler.updateChildren(prevChildren, nextChildren, mountImages, removedNodes, transaction, this, this._hostContainerInfo, context);
      return nextChildren;
    },

    /**
     * Generates a "mount image" for each of the supplied children. In the case
     * of `ReactDOMComponent`, a mount image is a string of markup.
     *
     * @param {?object} nestedChildren Nested child maps.
     * @return {array} An array of mounted representations.
     * @internal
     */
    mountChildren: function (nestedChildren, transaction, context) {
      var children = this._reconcilerInstantiateChildren(nestedChildren, transaction, context);
      this._renderedChildren = children;

      var mountImages = [];
      var index = 0;
      for (var name in children) {
        if (children.hasOwnProperty(name)) {
          var child = children[name];
          var mountImage = ReactReconciler$3.mountComponent(child, transaction, this, this._hostContainerInfo, context);
          child._mountIndex = index++;
          mountImages.push(mountImage);
        }
      }

      return mountImages;
    },

    /**
     * Replaces any rendered children with a text content string.
     *
     * @param {string} nextContent String of content.
     * @internal
     */
    updateTextContent: function (nextContent) {
      var prevChildren = this._renderedChildren;
      // Remove any rendered children.
      ReactChildReconciler.unmountChildren(prevChildren, false);
      for (var name in prevChildren) {
        if (prevChildren.hasOwnProperty(name)) {
          _prodInvariant$20('118');
        }
      }
      // Set new text content.
      var updates = [makeTextContent(nextContent)];
      processQueue(this, updates);
    },

    /**
     * Replaces any rendered children with a markup string.
     *
     * @param {string} nextMarkup String of markup.
     * @internal
     */
    updateMarkup: function (nextMarkup) {
      var prevChildren = this._renderedChildren;
      // Remove any rendered children.
      ReactChildReconciler.unmountChildren(prevChildren, false);
      for (var name in prevChildren) {
        if (prevChildren.hasOwnProperty(name)) {
          _prodInvariant$20('118');
        }
      }
      var updates = [makeSetMarkup(nextMarkup)];
      processQueue(this, updates);
    },

    /**
     * Updates the rendered children with new children.
     *
     * @param {?object} nextNestedChildrenElements Nested child element maps.
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    updateChildren: function (nextNestedChildrenElements, transaction, context) {
      // Hook used by React ART
      this._updateChildren(nextNestedChildrenElements, transaction, context);
    },

    /**
     * @param {?object} nextNestedChildrenElements Nested child element maps.
     * @param {ReactReconcileTransaction} transaction
     * @final
     * @protected
     */
    _updateChildren: function (nextNestedChildrenElements, transaction, context) {
      var prevChildren = this._renderedChildren;
      var removedNodes = {};
      var mountImages = [];
      var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, mountImages, removedNodes, transaction, context);
      if (!nextChildren && !prevChildren) {
        return;
      }
      var updates = null;
      var name;
      // `nextIndex` will increment for each child in `nextChildren`, but
      // `lastIndex` will be the last index visited in `prevChildren`.
      var nextIndex = 0;
      var lastIndex = 0;
      // `nextMountIndex` will increment for each newly mounted child.
      var nextMountIndex = 0;
      var lastPlacedNode = null;
      for (name in nextChildren) {
        if (!nextChildren.hasOwnProperty(name)) {
          continue;
        }
        var prevChild = prevChildren && prevChildren[name];
        var nextChild = nextChildren[name];
        if (prevChild === nextChild) {
          updates = enqueue(updates, this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex));
          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
          prevChild._mountIndex = nextIndex;
        } else {
          if (prevChild) {
            // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
            // The `removedNodes` loop below will actually remove the child.
          }
          // The child must be instantiated before it's mounted.
          updates = enqueue(updates, this._mountChildAtIndex(nextChild, mountImages[nextMountIndex], lastPlacedNode, nextIndex, transaction, context));
          nextMountIndex++;
        }
        nextIndex++;
        lastPlacedNode = ReactReconciler$3.getHostNode(nextChild);
      }
      // Remove children that are no longer present.
      for (name in removedNodes) {
        if (removedNodes.hasOwnProperty(name)) {
          updates = enqueue(updates, this._unmountChild(prevChildren[name], removedNodes[name]));
        }
      }
      if (updates) {
        processQueue(this, updates);
      }
      this._renderedChildren = nextChildren;

      
    },

    /**
     * Unmounts all rendered children. This should be used to clean up children
     * when this component is unmounted. It does not actually perform any
     * backend operations.
     *
     * @internal
     */
    unmountChildren: function (safely) {
      var renderedChildren = this._renderedChildren;
      ReactChildReconciler.unmountChildren(renderedChildren, safely);
      this._renderedChildren = null;
    },

    /**
     * Moves a child component to the supplied index.
     *
     * @param {ReactComponent} child Component to move.
     * @param {number} toIndex Destination index of the element.
     * @param {number} lastIndex Last index visited of the siblings of `child`.
     * @protected
     */
    moveChild: function (child, afterNode, toIndex, lastIndex) {
      // If the index of `child` is less than `lastIndex`, then it needs to
      // be moved. Otherwise, we do not need to move it because a child will be
      // inserted or moved before `child`.
      if (child._mountIndex < lastIndex) {
        return makeMove(child, afterNode, toIndex);
      }
    },

    /**
     * Creates a child component.
     *
     * @param {ReactComponent} child Component to create.
     * @param {string} mountImage Markup to insert.
     * @protected
     */
    createChild: function (child, afterNode, mountImage) {
      return makeInsertMarkup(mountImage, afterNode, child._mountIndex);
    },

    /**
     * Removes a child component.
     *
     * @param {ReactComponent} child Child to remove.
     * @protected
     */
    removeChild: function (child, node) {
      return makeRemove(child, node);
    },

    /**
     * Mounts a child with the supplied name.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to mount.
     * @param {string} name Name of the child.
     * @param {number} index Index at which to insert the child.
     * @param {ReactReconcileTransaction} transaction
     * @private
     */
    _mountChildAtIndex: function (child, mountImage, afterNode, index, transaction, context) {
      child._mountIndex = index;
      return this.createChild(child, afterNode, mountImage);
    },

    /**
     * Unmounts a rendered child.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to unmount.
     * @private
     */
    _unmountChild: function (child, node) {
      var update = this.removeChild(child, node);
      child._mountIndex = null;
      return update;
    }

  }

};

var ReactMultiChild_1 = ReactMultiChild$1;

var _prodInvariant$28 = reactProdInvariant_1;

var ReactInstanceMap$3 = ReactInstanceMap_1;
var ReactUpdates$6 = ReactUpdates_1;

function enqueueUpdate$1(internalInstance) {
  ReactUpdates$6.enqueueUpdate(internalInstance);
}

function formatUnexpectedArgument(arg) {
  var type = typeof arg;
  if (type !== 'object') {
    return type;
  }
  var displayName = arg.constructor && arg.constructor.name || type;
  var keys = Object.keys(arg);
  if (keys.length > 0 && keys.length < 20) {
    return displayName + ' (keys: ' + keys.join(', ') + ')';
  }
  return displayName;
}

function getInternalInstanceReadyForUpdate(publicInstance, callerName) {
  var internalInstance = ReactInstanceMap$3.get(publicInstance);
  if (!internalInstance) {
    return null;
  }

  return internalInstance;
}

/**
 * ReactUpdateQueue allows for state updates to be scheduled into a later
 * reconciliation step.
 */
var ReactUpdateQueue$1 = {

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    var internalInstance = ReactInstanceMap$3.get(publicInstance);
    if (internalInstance) {
      // During componentWillMount and render this will still be null but after
      // that will always render to something. At least for now. So we can use
      // this hack.
      return !!internalInstance._renderedComponent;
    } else {
      return false;
    }
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @param {string} callerName Name of the calling function in the public API.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback, callerName) {
    ReactUpdateQueue$1.validateCallback(callback, callerName);
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance);

    // Previously we would throw an error if we didn't have an internal
    // instance. Since we want to make it a no-op instead, we mirror the same
    // behavior we have in other enqueue* methods.
    // We also need to ignore callbacks in componentWillMount. See
    // enqueueUpdates.
    if (!internalInstance) {
      return null;
    }

    if (internalInstance._pendingCallbacks) {
      internalInstance._pendingCallbacks.push(callback);
    } else {
      internalInstance._pendingCallbacks = [callback];
    }
    // TODO: The callback here is ignored when setState is called from
    // componentWillMount. Either fix it or disallow doing so completely in
    // favor of getInitialState. Alternatively, we can disallow
    // componentWillMount during server-side rendering.
    enqueueUpdate$1(internalInstance);
  },

  enqueueCallbackInternal: function (internalInstance, callback) {
    if (internalInstance._pendingCallbacks) {
      internalInstance._pendingCallbacks.push(callback);
    } else {
      internalInstance._pendingCallbacks = [callback];
    }
    enqueueUpdate$1(internalInstance);
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'forceUpdate');

    if (!internalInstance) {
      return;
    }

    internalInstance._pendingForceUpdate = true;

    enqueueUpdate$1(internalInstance);
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'replaceState');

    if (!internalInstance) {
      return;
    }

    internalInstance._pendingStateQueue = [completeState];
    internalInstance._pendingReplaceState = true;

    enqueueUpdate$1(internalInstance);
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');

    if (!internalInstance) {
      return;
    }

    var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
    queue.push(partialState);

    enqueueUpdate$1(internalInstance);
  },

  enqueueElementInternal: function (internalInstance, nextElement, nextContext) {
    internalInstance._pendingElement = nextElement;
    // TODO: introduce _pendingContext instead of setting it directly.
    internalInstance._context = nextContext;
    enqueueUpdate$1(internalInstance);
  },

  validateCallback: function (callback, callerName) {
    !(!callback || typeof callback === 'function') ? _prodInvariant$28('122', callerName, formatUnexpectedArgument(callback)) : void 0;
  }

};

var ReactUpdateQueue_1 = ReactUpdateQueue$1;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReactUpdateQueue = ReactUpdateQueue_1;
function warnNoop$1(publicInstance, callerName) {
  
}

/**
 * This is the update queue used for server rendering.
 * It delegates to ReactUpdateQueue while server rendering is in progress and
 * switches to ReactNoopUpdateQueue after the transaction has completed.
 * @class ReactServerUpdateQueue
 * @param {Transaction} transaction
 */

var ReactServerUpdateQueue$1 = function () {
  /* :: transaction: Transaction; */

  function ReactServerUpdateQueue(transaction) {
    _classCallCheck(this, ReactServerUpdateQueue);

    this.transaction = transaction;
  }

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */


  ReactServerUpdateQueue.prototype.isMounted = function isMounted(publicInstance) {
    return false;
  };

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */


  ReactServerUpdateQueue.prototype.enqueueCallback = function enqueueCallback(publicInstance, callback, callerName) {
    if (this.transaction.isInTransaction()) {
      ReactUpdateQueue.enqueueCallback(publicInstance, callback, callerName);
    }
  };

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */


  ReactServerUpdateQueue.prototype.enqueueForceUpdate = function enqueueForceUpdate(publicInstance) {
    if (this.transaction.isInTransaction()) {
      ReactUpdateQueue.enqueueForceUpdate(publicInstance);
    } else {
      warnNoop$1(publicInstance, 'forceUpdate');
    }
  };

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object|function} completeState Next state.
   * @internal
   */


  ReactServerUpdateQueue.prototype.enqueueReplaceState = function enqueueReplaceState(publicInstance, completeState) {
    if (this.transaction.isInTransaction()) {
      ReactUpdateQueue.enqueueReplaceState(publicInstance, completeState);
    } else {
      warnNoop$1(publicInstance, 'replaceState');
    }
  };

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object|function} partialState Next partial state to be merged with state.
   * @internal
   */


  ReactServerUpdateQueue.prototype.enqueueSetState = function enqueueSetState(publicInstance, partialState) {
    if (this.transaction.isInTransaction()) {
      ReactUpdateQueue.enqueueSetState(publicInstance, partialState);
    } else {
      warnNoop$1(publicInstance, 'setState');
    }
  };

  return ReactServerUpdateQueue;
}();

var ReactServerUpdateQueue_1 = ReactServerUpdateQueue$1;

var _assign$17 = index$1;

var PooledClass$6 = PooledClass_1;
var Transaction$2 = Transaction_1;
var ReactServerUpdateQueue = ReactServerUpdateQueue_1;

/**
 * Executed within the scope of the `Transaction` instance. Consider these as
 * being member methods, but with an implied ordering while being isolated from
 * each other.
 */
var TRANSACTION_WRAPPERS$1 = [];

var noopCallbackQueue = {
  enqueue: function () {}
};

/**
 * @class ReactServerRenderingTransaction
 * @param {boolean} renderToStaticMarkup
 */
function ReactServerRenderingTransaction$1(renderToStaticMarkup) {
  this.reinitializeTransaction();
  this.renderToStaticMarkup = renderToStaticMarkup;
  this.useCreateElement = false;
  this.updateQueue = new ReactServerUpdateQueue(this);
}

var Mixin$1 = {
  /**
   * @see Transaction
   * @abstract
   * @final
   * @return {array} Empty list of operation wrap procedures.
   */
  getTransactionWrappers: function () {
    return TRANSACTION_WRAPPERS$1;
  },

  /**
   * @return {object} The queue to collect `onDOMReady` callbacks with.
   */
  getReactMountReady: function () {
    return noopCallbackQueue;
  },

  /**
   * @return {object} The queue to collect React async events.
   */
  getUpdateQueue: function () {
    return this.updateQueue;
  },

  /**
   * `PooledClass` looks for this, and will invoke this before allowing this
   * instance to be reused.
   */
  destructor: function () {},

  checkpoint: function () {},

  rollback: function () {}
};

_assign$17(ReactServerRenderingTransaction$1.prototype, Transaction$2.Mixin, Mixin$1);

PooledClass$6.addPoolingTo(ReactServerRenderingTransaction$1);

var ReactServerRenderingTransaction_1 = ReactServerRenderingTransaction$1;

var _prodInvariant$16 = reactProdInvariant_1;
var _assign$8 = index$1;

var AutoFocusUtils = AutoFocusUtils_1;
var CSSPropertyOperations = CSSPropertyOperations_1;
var DOMLazyTree$3 = DOMLazyTree_1;
var DOMNamespaces$3 = DOMNamespaces_1;
var DOMProperty$3 = DOMProperty_1;
var DOMPropertyOperations = DOMPropertyOperations_1;
var EventConstants$6 = EventConstants_1;
var EventPluginHub$3 = EventPluginHub_1;
var EventPluginRegistry$2 = EventPluginRegistry_1;
var ReactBrowserEventEmitter = ReactBrowserEventEmitter_1;
var ReactComponentBrowserEnvironment$2 = ReactComponentBrowserEnvironment_1;
var ReactDOMButton = ReactDOMButton_1;
var ReactDOMComponentFlags$2 = ReactDOMComponentFlags_1;
var ReactDOMComponentTree$7 = ReactDOMComponentTree_1;
var ReactDOMInput = ReactDOMInput_1;
var ReactDOMOption = ReactDOMOption_1;
var ReactDOMSelect = ReactDOMSelect_1;
var ReactDOMTextarea = ReactDOMTextarea_1;
var ReactMultiChild = ReactMultiChild_1;
var ReactServerRenderingTransaction = ReactServerRenderingTransaction_1;

var escapeTextContentForBrowser$2 = escapeTextContentForBrowser_1;
var keyOf$6 = keyOf_1;
var Flags$1 = ReactDOMComponentFlags$2;
var deleteListener = EventPluginHub$3.deleteListener;
var getNode = ReactDOMComponentTree$7.getNodeFromInstance;
var listenTo = ReactBrowserEventEmitter.listenTo;
var registrationNameModules = EventPluginRegistry$2.registrationNameModules;

// For quickly matching children type, to test if can be treated as content.
var CONTENT_TYPES = { 'string': true, 'number': true };

var STYLE = keyOf$6({ style: null });
var HTML = keyOf$6({ __html: null });
var RESERVED_PROPS$1 = {
  children: null,
  dangerouslySetInnerHTML: null,
  suppressContentEditableWarning: null
};

// Node type for document fragments (Node.DOCUMENT_FRAGMENT_NODE).
var DOC_FRAGMENT_TYPE = 11;

function getDeclarationErrorAddendum(internalInstance) {
  if (internalInstance) {
    var owner = internalInstance._currentElement._owner || null;
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' This DOM node was rendered by `' + name + '`.';
      }
    }
  }
  return '';
}

function assertValidProps(component, props) {
  if (!props) {
    return;
  }
  // Note the use of `==` which checks for null or undefined.
  if (voidElementTags[component._tag]) {
    !(props.children == null && props.dangerouslySetInnerHTML == null) ? _prodInvariant$16('137', component._tag, component._currentElement._owner ? ' Check the render method of ' + component._currentElement._owner.getName() + '.' : '') : void 0;
  }
  if (props.dangerouslySetInnerHTML != null) {
    !(props.children == null) ? _prodInvariant$16('60') : void 0;
    !(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML) ? _prodInvariant$16('61') : void 0;
  }
  !(props.style == null || typeof props.style === 'object') ? _prodInvariant$16('62', getDeclarationErrorAddendum(component)) : void 0;
}

function enqueuePutListener(inst, registrationName, listener, transaction) {
  if (transaction instanceof ReactServerRenderingTransaction) {
    return;
  }
  var containerInfo = inst._hostContainerInfo;
  var isDocumentFragment = containerInfo._node && containerInfo._node.nodeType === DOC_FRAGMENT_TYPE;
  var doc = isDocumentFragment ? containerInfo._node : containerInfo._ownerDocument;
  listenTo(registrationName, doc);
  transaction.getReactMountReady().enqueue(putListener, {
    inst: inst,
    registrationName: registrationName,
    listener: listener
  });
}

function putListener() {
  var listenerToPut = this;
  EventPluginHub$3.putListener(listenerToPut.inst, listenerToPut.registrationName, listenerToPut.listener);
}

function inputPostMount() {
  var inst = this;
  ReactDOMInput.postMountWrapper(inst);
}

function textareaPostMount() {
  var inst = this;
  ReactDOMTextarea.postMountWrapper(inst);
}

function optionPostMount() {
  var inst = this;
  ReactDOMOption.postMountWrapper(inst);
}

var mediaEvents = {
  topAbort: 'abort',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topLoadedData: 'loadeddata',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTimeUpdate: 'timeupdate',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting'
};

function trapBubbledEventsLocal() {
  var inst = this;
  // If a component renders to null or if another component fatals and causes
  // the state of the tree to be corrupted, `node` here can be null.
  !inst._rootNodeID ? _prodInvariant$16('63') : void 0;
  var node = getNode(inst);
  !node ? _prodInvariant$16('64') : void 0;

  switch (inst._tag) {
    case 'iframe':
    case 'object':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants$6.topLevelTypes.topLoad, 'load', node)];
      break;
    case 'video':
    case 'audio':

      inst._wrapperState.listeners = [];
      // Create listener for each media event
      for (var event in mediaEvents) {
        if (mediaEvents.hasOwnProperty(event)) {
          inst._wrapperState.listeners.push(ReactBrowserEventEmitter.trapBubbledEvent(EventConstants$6.topLevelTypes[event], mediaEvents[event], node));
        }
      }
      break;
    case 'source':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants$6.topLevelTypes.topError, 'error', node)];
      break;
    case 'img':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants$6.topLevelTypes.topError, 'error', node), ReactBrowserEventEmitter.trapBubbledEvent(EventConstants$6.topLevelTypes.topLoad, 'load', node)];
      break;
    case 'form':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants$6.topLevelTypes.topReset, 'reset', node), ReactBrowserEventEmitter.trapBubbledEvent(EventConstants$6.topLevelTypes.topSubmit, 'submit', node)];
      break;
    case 'input':
    case 'select':
    case 'textarea':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants$6.topLevelTypes.topInvalid, 'invalid', node)];
      break;
  }
}

function postUpdateSelectWrapper() {
  ReactDOMSelect.postUpdateWrapper(this);
}

// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.

var omittedCloseTags = {
  'area': true,
  'base': true,
  'br': true,
  'col': true,
  'embed': true,
  'hr': true,
  'img': true,
  'input': true,
  'keygen': true,
  'link': true,
  'meta': true,
  'param': true,
  'source': true,
  'track': true,
  'wbr': true
};

// NOTE: menuitem's close tag should be omitted, but that causes problems.
var newlineEatingTags = {
  'listing': true,
  'pre': true,
  'textarea': true
};

// For HTML, certain tags cannot have children. This has the same purpose as
// `omittedCloseTags` except that `menuitem` should still have its closing tag.

var voidElementTags = _assign$8({
  'menuitem': true
}, omittedCloseTags);

// We accept any tag to be rendered but since this gets injected into arbitrary
// HTML, we want to make sure that it's a safe tag.
// http://www.w3.org/TR/REC-xml/#NT-Name

var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset
var validatedTagCache = {};
var hasOwnProperty$3 = {}.hasOwnProperty;

function validateDangerousTag(tag) {
  if (!hasOwnProperty$3.call(validatedTagCache, tag)) {
    !VALID_TAG_REGEX.test(tag) ? _prodInvariant$16('65', tag) : void 0;
    validatedTagCache[tag] = true;
  }
}

function isCustomComponent(tagName, props) {
  return tagName.indexOf('-') >= 0 || props.is != null;
}

var globalIdCounter = 1;

/**
 * Creates a new React class that is idempotent and capable of containing other
 * React components. It accepts event listeners and DOM properties that are
 * valid according to `DOMProperty`.
 *
 *  - Event listeners: `onClick`, `onMouseDown`, etc.
 *  - DOM properties: `className`, `name`, `title`, etc.
 *
 * The `style` property functions differently from the DOM API. It accepts an
 * object mapping of style properties to values.
 *
 * @constructor ReactDOMComponent
 * @extends ReactMultiChild
 */
function ReactDOMComponent$1(element) {
  var tag = element.type;
  validateDangerousTag(tag);
  this._currentElement = element;
  this._tag = tag.toLowerCase();
  this._namespaceURI = null;
  this._renderedChildren = null;
  this._previousStyle = null;
  this._previousStyleCopy = null;
  this._hostNode = null;
  this._hostParent = null;
  this._rootNodeID = null;
  this._domID = null;
  this._hostContainerInfo = null;
  this._wrapperState = null;
  this._topLevelWrapper = null;
  this._flags = 0;
  
}

ReactDOMComponent$1.displayName = 'ReactDOMComponent';

ReactDOMComponent$1.Mixin = {

  /**
   * Generates root tag markup then recurses. This method has side effects and
   * is not idempotent.
   *
   * @internal
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {?ReactDOMComponent} the containing DOM component instance
   * @param {?object} info about the host container
   * @param {object} context
   * @return {string} The computed markup.
   */
  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {
    var _this = this;

    this._rootNodeID = globalIdCounter++;
    this._domID = hostContainerInfo._idCounter++;
    this._hostParent = hostParent;
    this._hostContainerInfo = hostContainerInfo;

    var props = this._currentElement.props;

    switch (this._tag) {
      case 'audio':
      case 'form':
      case 'iframe':
      case 'img':
      case 'link':
      case 'object':
      case 'source':
      case 'video':
        this._wrapperState = {
          listeners: null
        };
        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
        break;
      case 'button':
        props = ReactDOMButton.getHostProps(this, props, hostParent);
        break;
      case 'input':
        ReactDOMInput.mountWrapper(this, props, hostParent);
        props = ReactDOMInput.getHostProps(this, props);
        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
        break;
      case 'option':
        ReactDOMOption.mountWrapper(this, props, hostParent);
        props = ReactDOMOption.getHostProps(this, props);
        break;
      case 'select':
        ReactDOMSelect.mountWrapper(this, props, hostParent);
        props = ReactDOMSelect.getHostProps(this, props);
        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
        break;
      case 'textarea':
        ReactDOMTextarea.mountWrapper(this, props, hostParent);
        props = ReactDOMTextarea.getHostProps(this, props);
        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
        break;
    }

    assertValidProps(this, props);

    // We create tags in the namespace of their parent container, except HTML
    // tags get no namespace.
    var namespaceURI;
    var parentTag;
    if (hostParent != null) {
      namespaceURI = hostParent._namespaceURI;
      parentTag = hostParent._tag;
    } else if (hostContainerInfo._tag) {
      namespaceURI = hostContainerInfo._namespaceURI;
      parentTag = hostContainerInfo._tag;
    }
    if (namespaceURI == null || namespaceURI === DOMNamespaces$3.svg && parentTag === 'foreignobject') {
      namespaceURI = DOMNamespaces$3.html;
    }
    if (namespaceURI === DOMNamespaces$3.html) {
      if (this._tag === 'svg') {
        namespaceURI = DOMNamespaces$3.svg;
      } else if (this._tag === 'math') {
        namespaceURI = DOMNamespaces$3.mathml;
      }
    }
    this._namespaceURI = namespaceURI;

    var mountImage;
    if (transaction.useCreateElement) {
      var ownerDocument = hostContainerInfo._ownerDocument;
      var el;
      if (namespaceURI === DOMNamespaces$3.html) {
        if (this._tag === 'script') {
          // Create the script via .innerHTML so its "parser-inserted" flag is
          // set to true and it does not execute
          var div = ownerDocument.createElement('div');
          var type = this._currentElement.type;
          div.innerHTML = '<' + type + '></' + type + '>';
          el = div.removeChild(div.firstChild);
        } else if (props.is) {
          el = ownerDocument.createElement(this._currentElement.type, props.is);
        } else {
          // Separate else branch instead of using `props.is || undefined` above becuase of a Firefox bug.
          // See discussion in https://github.com/facebook/react/pull/6896
          // and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
          el = ownerDocument.createElement(this._currentElement.type);
        }
      } else {
        el = ownerDocument.createElementNS(namespaceURI, this._currentElement.type);
      }
      ReactDOMComponentTree$7.precacheNode(this, el);
      this._flags |= Flags$1.hasCachedChildNodes;
      if (!this._hostParent) {
        DOMPropertyOperations.setAttributeForRoot(el);
      }
      this._updateDOMProperties(null, props, transaction);
      var lazyTree = DOMLazyTree$3(el);
      this._createInitialChildren(transaction, props, context, lazyTree);
      mountImage = lazyTree;
    } else {
      var tagOpen = this._createOpenTagMarkupAndPutListeners(transaction, props);
      var tagContent = this._createContentMarkup(transaction, props, context);
      if (!tagContent && omittedCloseTags[this._tag]) {
        mountImage = tagOpen + '/>';
      } else {
        mountImage = tagOpen + '>' + tagContent + '</' + this._currentElement.type + '>';
      }
    }

    switch (this._tag) {
      case 'input':
        transaction.getReactMountReady().enqueue(inputPostMount, this);
        if (props.autoFocus) {
          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
        }
        break;
      case 'textarea':
        transaction.getReactMountReady().enqueue(textareaPostMount, this);
        if (props.autoFocus) {
          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
        }
        break;
      case 'select':
        if (props.autoFocus) {
          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
        }
        break;
      case 'button':
        if (props.autoFocus) {
          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
        }
        break;
      case 'option':
        transaction.getReactMountReady().enqueue(optionPostMount, this);
        break;
    }

    return mountImage;
  },

  /**
   * Creates markup for the open tag and all attributes.
   *
   * This method has side effects because events get registered.
   *
   * Iterating over object properties is faster than iterating over arrays.
   * @see http://jsperf.com/obj-vs-arr-iteration
   *
   * @private
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {object} props
   * @return {string} Markup of opening tag.
   */
  _createOpenTagMarkupAndPutListeners: function (transaction, props) {
    var ret = '<' + this._currentElement.type;

    for (var propKey in props) {
      if (!props.hasOwnProperty(propKey)) {
        continue;
      }
      var propValue = props[propKey];
      if (propValue == null) {
        continue;
      }
      if (registrationNameModules.hasOwnProperty(propKey)) {
        if (propValue) {
          enqueuePutListener(this, propKey, propValue, transaction);
        }
      } else {
        if (propKey === STYLE) {
          if (propValue) {
            propValue = this._previousStyleCopy = _assign$8({}, props.style);
          }
          propValue = CSSPropertyOperations.createMarkupForStyles(propValue, this);
        }
        var markup = null;
        if (this._tag != null && isCustomComponent(this._tag, props)) {
          if (!RESERVED_PROPS$1.hasOwnProperty(propKey)) {
            markup = DOMPropertyOperations.createMarkupForCustomAttribute(propKey, propValue);
          }
        } else {
          markup = DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
        }
        if (markup) {
          ret += ' ' + markup;
        }
      }
    }

    // For static pages, no need to put React ID and checksum. Saves lots of
    // bytes.
    if (transaction.renderToStaticMarkup) {
      return ret;
    }

    if (!this._hostParent) {
      ret += ' ' + DOMPropertyOperations.createMarkupForRoot();
    }
    ret += ' ' + DOMPropertyOperations.createMarkupForID(this._domID);
    return ret;
  },

  /**
   * Creates markup for the content between the tags.
   *
   * @private
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {object} props
   * @param {object} context
   * @return {string} Content markup.
   */
  _createContentMarkup: function (transaction, props, context) {
    var ret = '';

    // Intentional use of != to avoid catching zero/false.
    var innerHTML = props.dangerouslySetInnerHTML;
    if (innerHTML != null) {
      if (innerHTML.__html != null) {
        ret = innerHTML.__html;
      }
    } else {
      var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
      var childrenToUse = contentToUse != null ? null : props.children;
      if (contentToUse != null) {
        // TODO: Validate that text is allowed as a child of this node
        ret = escapeTextContentForBrowser$2(contentToUse);
        
      } else if (childrenToUse != null) {
        var mountImages = this.mountChildren(childrenToUse, transaction, context);
        ret = mountImages.join('');
      }
    }
    if (newlineEatingTags[this._tag] && ret.charAt(0) === '\n') {
      // text/html ignores the first character in these tags if it's a newline
      // Prefer to break application/xml over text/html (for now) by adding
      // a newline specifically to get eaten by the parser. (Alternately for
      // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
      // \r is normalized out by HTMLTextAreaElement#value.)
      // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
      // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
      // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
      // See: Parsing of "textarea" "listing" and "pre" elements
      //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
      return '\n' + ret;
    } else {
      return ret;
    }
  },

  _createInitialChildren: function (transaction, props, context, lazyTree) {
    // Intentional use of != to avoid catching zero/false.
    var innerHTML = props.dangerouslySetInnerHTML;
    if (innerHTML != null) {
      if (innerHTML.__html != null) {
        DOMLazyTree$3.queueHTML(lazyTree, innerHTML.__html);
      }
    } else {
      var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
      var childrenToUse = contentToUse != null ? null : props.children;
      if (contentToUse != null) {
        // TODO: Validate that text is allowed as a child of this node
        DOMLazyTree$3.queueText(lazyTree, contentToUse);
      } else if (childrenToUse != null) {
        var mountImages = this.mountChildren(childrenToUse, transaction, context);
        for (var i = 0; i < mountImages.length; i++) {
          DOMLazyTree$3.queueChild(lazyTree, mountImages[i]);
        }
      }
    }
  },

  /**
   * Receives a next element and updates the component.
   *
   * @internal
   * @param {ReactElement} nextElement
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {object} context
   */
  receiveComponent: function (nextElement, transaction, context) {
    var prevElement = this._currentElement;
    this._currentElement = nextElement;
    this.updateComponent(transaction, prevElement, nextElement, context);
  },

  /**
   * Updates a DOM component after it has already been allocated and
   * attached to the DOM. Reconciles the root DOM node, then recurses.
   *
   * @param {ReactReconcileTransaction} transaction
   * @param {ReactElement} prevElement
   * @param {ReactElement} nextElement
   * @internal
   * @overridable
   */
  updateComponent: function (transaction, prevElement, nextElement, context) {
    var _this2 = this;

    var lastProps = prevElement.props;
    var nextProps = this._currentElement.props;

    switch (this._tag) {
      case 'button':
        lastProps = ReactDOMButton.getHostProps(this, lastProps);
        nextProps = ReactDOMButton.getHostProps(this, nextProps);
        break;
      case 'input':
        ReactDOMInput.updateWrapper(this);
        lastProps = ReactDOMInput.getHostProps(this, lastProps);
        nextProps = ReactDOMInput.getHostProps(this, nextProps);
        break;
      case 'option':
        lastProps = ReactDOMOption.getHostProps(this, lastProps);
        nextProps = ReactDOMOption.getHostProps(this, nextProps);
        break;
      case 'select':
        lastProps = ReactDOMSelect.getHostProps(this, lastProps);
        nextProps = ReactDOMSelect.getHostProps(this, nextProps);
        break;
      case 'textarea':
        ReactDOMTextarea.updateWrapper(this);
        lastProps = ReactDOMTextarea.getHostProps(this, lastProps);
        nextProps = ReactDOMTextarea.getHostProps(this, nextProps);
        break;
    }

    assertValidProps(this, nextProps);
    this._updateDOMProperties(lastProps, nextProps, transaction);
    this._updateDOMChildren(lastProps, nextProps, transaction, context);

    if (this._tag === 'select') {
      // <select> value update needs to occur after <option> children
      // reconciliation
      transaction.getReactMountReady().enqueue(postUpdateSelectWrapper, this);
    }

    
  },

  /**
   * Reconciles the properties by detecting differences in property values and
   * updating the DOM as necessary. This function is probably the single most
   * critical path for performance optimization.
   *
   * TODO: Benchmark whether checking for changed values in memory actually
   *       improves performance (especially statically positioned elements).
   * TODO: Benchmark the effects of putting this at the top since 99% of props
   *       do not change for a given reconciliation.
   * TODO: Benchmark areas that can be improved with caching.
   *
   * @private
   * @param {object} lastProps
   * @param {object} nextProps
   * @param {?DOMElement} node
   */
  _updateDOMProperties: function (lastProps, nextProps, transaction) {
    var propKey;
    var styleName;
    var styleUpdates;
    for (propKey in lastProps) {
      if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
        continue;
      }
      if (propKey === STYLE) {
        var lastStyle = this._previousStyleCopy;
        for (styleName in lastStyle) {
          if (lastStyle.hasOwnProperty(styleName)) {
            styleUpdates = styleUpdates || {};
            styleUpdates[styleName] = '';
          }
        }
        this._previousStyleCopy = null;
      } else if (registrationNameModules.hasOwnProperty(propKey)) {
        if (lastProps[propKey]) {
          // Only call deleteListener if there was a listener previously or
          // else willDeleteListener gets called when there wasn't actually a
          // listener (e.g., onClick={null})
          deleteListener(this, propKey);
        }
      } else if (isCustomComponent(this._tag, lastProps)) {
        if (!RESERVED_PROPS$1.hasOwnProperty(propKey)) {
          DOMPropertyOperations.deleteValueForAttribute(getNode(this), propKey);
        }
      } else if (DOMProperty$3.properties[propKey] || DOMProperty$3.isCustomAttribute(propKey)) {
        DOMPropertyOperations.deleteValueForProperty(getNode(this), propKey);
      }
    }
    for (propKey in nextProps) {
      var nextProp = nextProps[propKey];
      var lastProp = propKey === STYLE ? this._previousStyleCopy : lastProps != null ? lastProps[propKey] : undefined;
      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
        continue;
      }
      if (propKey === STYLE) {
        if (nextProp) {
          nextProp = this._previousStyleCopy = _assign$8({}, nextProp);
        } else {
          this._previousStyleCopy = null;
        }
        if (lastProp) {
          // Unset styles on `lastProp` but not on `nextProp`.
          for (styleName in lastProp) {
            if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
              styleUpdates = styleUpdates || {};
              styleUpdates[styleName] = '';
            }
          }
          // Update styles that changed since `lastProp`.
          for (styleName in nextProp) {
            if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
              styleUpdates = styleUpdates || {};
              styleUpdates[styleName] = nextProp[styleName];
            }
          }
        } else {
          // Relies on `updateStylesByID` not mutating `styleUpdates`.
          styleUpdates = nextProp;
        }
      } else if (registrationNameModules.hasOwnProperty(propKey)) {
        if (nextProp) {
          enqueuePutListener(this, propKey, nextProp, transaction);
        } else if (lastProp) {
          deleteListener(this, propKey);
        }
      } else if (isCustomComponent(this._tag, nextProps)) {
        if (!RESERVED_PROPS$1.hasOwnProperty(propKey)) {
          DOMPropertyOperations.setValueForAttribute(getNode(this), propKey, nextProp);
        }
      } else if (DOMProperty$3.properties[propKey] || DOMProperty$3.isCustomAttribute(propKey)) {
        var node = getNode(this);
        // If we're updating to null or undefined, we should remove the property
        // from the DOM node instead of inadvertently setting to a string. This
        // brings us in line with the same behavior we have on initial render.
        if (nextProp != null) {
          DOMPropertyOperations.setValueForProperty(node, propKey, nextProp);
        } else {
          DOMPropertyOperations.deleteValueForProperty(node, propKey);
        }
      }
    }
    if (styleUpdates) {
      CSSPropertyOperations.setValueForStyles(getNode(this), styleUpdates, this);
    }
  },

  /**
   * Reconciles the children with the various properties that affect the
   * children content.
   *
   * @param {object} lastProps
   * @param {object} nextProps
   * @param {ReactReconcileTransaction} transaction
   * @param {object} context
   */
  _updateDOMChildren: function (lastProps, nextProps, transaction, context) {
    var lastContent = CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
    var nextContent = CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;

    var lastHtml = lastProps.dangerouslySetInnerHTML && lastProps.dangerouslySetInnerHTML.__html;
    var nextHtml = nextProps.dangerouslySetInnerHTML && nextProps.dangerouslySetInnerHTML.__html;

    // Note the use of `!=` which checks for null or undefined.
    var lastChildren = lastContent != null ? null : lastProps.children;
    var nextChildren = nextContent != null ? null : nextProps.children;

    // If we're switching from children to content/html or vice versa, remove
    // the old content
    var lastHasContentOrHtml = lastContent != null || lastHtml != null;
    var nextHasContentOrHtml = nextContent != null || nextHtml != null;
    if (lastChildren != null && nextChildren == null) {
      this.updateChildren(null, transaction, context);
    } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
      this.updateTextContent('');
      
    }

    if (nextContent != null) {
      if (lastContent !== nextContent) {
        this.updateTextContent('' + nextContent);
        
      }
    } else if (nextHtml != null) {
      if (lastHtml !== nextHtml) {
        this.updateMarkup('' + nextHtml);
      }
      
    } else if (nextChildren != null) {
      this.updateChildren(nextChildren, transaction, context);
    }
  },

  getHostNode: function () {
    return getNode(this);
  },

  /**
   * Destroys all event registrations for this instance. Does not remove from
   * the DOM. That must be done by the parent.
   *
   * @internal
   */
  unmountComponent: function (safely) {
    switch (this._tag) {
      case 'audio':
      case 'form':
      case 'iframe':
      case 'img':
      case 'link':
      case 'object':
      case 'source':
      case 'video':
        var listeners = this._wrapperState.listeners;
        if (listeners) {
          for (var i = 0; i < listeners.length; i++) {
            listeners[i].remove();
          }
        }
        break;
      case 'html':
      case 'head':
      case 'body':
        /**
         * Components like <html> <head> and <body> can't be removed or added
         * easily in a cross-browser way, however it's valuable to be able to
         * take advantage of React's reconciliation for styling and <title>
         * management. So we just document it and throw in dangerous cases.
         */
        _prodInvariant$16('66', this._tag);
        break;
    }

    this.unmountChildren(safely);
    ReactDOMComponentTree$7.uncacheNode(this);
    EventPluginHub$3.deleteAllListeners(this);
    ReactComponentBrowserEnvironment$2.unmountIDFromEnvironment(this._rootNodeID);
    this._rootNodeID = null;
    this._domID = null;
    this._wrapperState = null;

    
  },

  getPublicInstance: function () {
    return getNode(this);
  }

};

_assign$8(ReactDOMComponent$1.prototype, ReactDOMComponent$1.Mixin, ReactMultiChild.Mixin);

var ReactDOMComponent_1 = ReactDOMComponent$1;

var _assign$19 = index$1;

var DOMLazyTree$4 = DOMLazyTree_1;
var ReactDOMComponentTree$14 = ReactDOMComponentTree_1;

var ReactDOMEmptyComponent$1 = function (instantiate) {
  // ReactCompositeComponent uses this:
  this._currentElement = null;
  // ReactDOMComponentTree uses these:
  this._hostNode = null;
  this._hostParent = null;
  this._hostContainerInfo = null;
  this._domID = null;
};
_assign$19(ReactDOMEmptyComponent$1.prototype, {
  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {
    var domID = hostContainerInfo._idCounter++;
    this._domID = domID;
    this._hostParent = hostParent;
    this._hostContainerInfo = hostContainerInfo;

    var nodeValue = ' react-empty: ' + this._domID + ' ';
    if (transaction.useCreateElement) {
      var ownerDocument = hostContainerInfo._ownerDocument;
      var node = ownerDocument.createComment(nodeValue);
      ReactDOMComponentTree$14.precacheNode(this, node);
      return DOMLazyTree$4(node);
    } else {
      if (transaction.renderToStaticMarkup) {
        // Normally we'd insert a comment node, but since this is a situation
        // where React won't take over (static pages), we can simply return
        // nothing.
        return '';
      }
      return '<!--' + nodeValue + '-->';
    }
  },
  receiveComponent: function () {},
  getHostNode: function () {
    return ReactDOMComponentTree$14.getNodeFromInstance(this);
  },
  unmountComponent: function () {
    ReactDOMComponentTree$14.uncacheNode(this);
  }
});

var ReactDOMEmptyComponent_1 = ReactDOMEmptyComponent$1;

var _prodInvariant$29 = reactProdInvariant_1;

function getLowestCommonAncestor(instA, instB) {
  !('_hostNode' in instA) ? _prodInvariant$29('33') : void 0;
  !('_hostNode' in instB) ? _prodInvariant$29('33') : void 0;

  var depthA = 0;
  for (var tempA = instA; tempA; tempA = tempA._hostParent) {
    depthA++;
  }
  var depthB = 0;
  for (var tempB = instB; tempB; tempB = tempB._hostParent) {
    depthB++;
  }

  // If A is deeper, crawl up.
  while (depthA - depthB > 0) {
    instA = instA._hostParent;
    depthA--;
  }

  // If B is deeper, crawl up.
  while (depthB - depthA > 0) {
    instB = instB._hostParent;
    depthB--;
  }

  // Walk in lockstep until we find a match.
  var depth = depthA;
  while (depth--) {
    if (instA === instB) {
      return instA;
    }
    instA = instA._hostParent;
    instB = instB._hostParent;
  }
  return null;
}

/**
 * Return if A is an ancestor of B.
 */
function isAncestor(instA, instB) {
  !('_hostNode' in instA) ? _prodInvariant$29('35') : void 0;
  !('_hostNode' in instB) ? _prodInvariant$29('35') : void 0;

  while (instB) {
    if (instB === instA) {
      return true;
    }
    instB = instB._hostParent;
  }
  return false;
}

/**
 * Return the parent instance of the passed-in instance.
 */
function getParentInstance(inst) {
  !('_hostNode' in inst) ? _prodInvariant$29('36') : void 0;

  return inst._hostParent;
}

/**
 * Simulates the traversal of a two-phase, capture/bubble event dispatch.
 */
function traverseTwoPhase(inst, fn, arg) {
  var path = [];
  while (inst) {
    path.push(inst);
    inst = inst._hostParent;
  }
  var i;
  for (i = path.length; i-- > 0;) {
    fn(path[i], false, arg);
  }
  for (i = 0; i < path.length; i++) {
    fn(path[i], true, arg);
  }
}

/**
 * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
 * should would receive a `mouseEnter` or `mouseLeave` event.
 *
 * Does not invoke the callback on the nearest common ancestor because nothing
 * "entered" or "left" that element.
 */
function traverseEnterLeave(from, to, fn, argFrom, argTo) {
  var common = from && to ? getLowestCommonAncestor(from, to) : null;
  var pathFrom = [];
  while (from && from !== common) {
    pathFrom.push(from);
    from = from._hostParent;
  }
  var pathTo = [];
  while (to && to !== common) {
    pathTo.push(to);
    to = to._hostParent;
  }
  var i;
  for (i = 0; i < pathFrom.length; i++) {
    fn(pathFrom[i], true, argFrom);
  }
  for (i = pathTo.length; i-- > 0;) {
    fn(pathTo[i], false, argTo);
  }
}

var ReactDOMTreeTraversal$1 = {
  isAncestor: isAncestor,
  getLowestCommonAncestor: getLowestCommonAncestor,
  getParentInstance: getParentInstance,
  traverseTwoPhase: traverseTwoPhase,
  traverseEnterLeave: traverseEnterLeave
};

var _prodInvariant$30 = reactProdInvariant_1;
var _assign$20 = index$1;

var DOMChildrenOperations$3 = DOMChildrenOperations_1;
var DOMLazyTree$5 = DOMLazyTree_1;
var ReactDOMComponentTree$15 = ReactDOMComponentTree_1;
var escapeTextContentForBrowser$4 = escapeTextContentForBrowser_1;
var ReactDOMTextComponent$1 = function (text) {
  // TODO: This is really a ReactText (ReactNode), not a ReactElement
  this._currentElement = text;
  this._stringText = '' + text;
  // ReactDOMComponentTree uses these:
  this._hostNode = null;
  this._hostParent = null;

  // Properties
  this._domID = null;
  this._mountIndex = 0;
  this._closingComment = null;
  this._commentNodes = null;
};

_assign$20(ReactDOMTextComponent$1.prototype, {

  /**
   * Creates the markup for this text node. This node is not intended to have
   * any features besides containing text content.
   *
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @return {string} Markup for this text node.
   * @internal
   */
  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {
    var domID = hostContainerInfo._idCounter++;
    var openingValue = ' react-text: ' + domID + ' ';
    var closingValue = ' /react-text ';
    this._domID = domID;
    this._hostParent = hostParent;
    if (transaction.useCreateElement) {
      var ownerDocument = hostContainerInfo._ownerDocument;
      var openingComment = ownerDocument.createComment(openingValue);
      var closingComment = ownerDocument.createComment(closingValue);
      var lazyTree = DOMLazyTree$5(ownerDocument.createDocumentFragment());
      DOMLazyTree$5.queueChild(lazyTree, DOMLazyTree$5(openingComment));
      if (this._stringText) {
        DOMLazyTree$5.queueChild(lazyTree, DOMLazyTree$5(ownerDocument.createTextNode(this._stringText)));
      }
      DOMLazyTree$5.queueChild(lazyTree, DOMLazyTree$5(closingComment));
      ReactDOMComponentTree$15.precacheNode(this, openingComment);
      this._closingComment = closingComment;
      return lazyTree;
    } else {
      var escapedText = escapeTextContentForBrowser$4(this._stringText);

      if (transaction.renderToStaticMarkup) {
        // Normally we'd wrap this between comment nodes for the reasons stated
        // above, but since this is a situation where React won't take over
        // (static pages), we can simply return the text as it is.
        return escapedText;
      }

      return '<!--' + openingValue + '-->' + escapedText + '<!--' + closingValue + '-->';
    }
  },

  /**
   * Updates this component by updating the text content.
   *
   * @param {ReactText} nextText The next text content
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  receiveComponent: function (nextText, transaction) {
    if (nextText !== this._currentElement) {
      this._currentElement = nextText;
      var nextStringText = '' + nextText;
      if (nextStringText !== this._stringText) {
        // TODO: Save this as pending props and use performUpdateIfNecessary
        // and/or updateComponent to do the actual update for consistency with
        // other component types?
        this._stringText = nextStringText;
        var commentNodes = this.getHostNode();
        DOMChildrenOperations$3.replaceDelimitedText(commentNodes[0], commentNodes[1], nextStringText);

        
      }
    }
  },

  getHostNode: function () {
    var hostNode = this._commentNodes;
    if (hostNode) {
      return hostNode;
    }
    if (!this._closingComment) {
      var openingComment = ReactDOMComponentTree$15.getNodeFromInstance(this);
      var node = openingComment.nextSibling;
      while (true) {
        !(node != null) ? _prodInvariant$30('67', this._domID) : void 0;
        if (node.nodeType === 8 && node.nodeValue === ' /react-text ') {
          this._closingComment = node;
          break;
        }
        node = node.nextSibling;
      }
    }
    hostNode = [this._hostNode, this._closingComment];
    this._commentNodes = hostNode;
    return hostNode;
  },

  unmountComponent: function () {
    this._closingComment = null;
    this._commentNodes = null;
    ReactDOMComponentTree$15.uncacheNode(this);
  }

});

var ReactDOMTextComponent_1 = ReactDOMTextComponent$1;

var _assign$21 = index$1;

var ReactUpdates$7 = ReactUpdates_1;
var Transaction$4 = Transaction_1;

var emptyFunction$9 = emptyFunction_1;

var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction$9,
  close: function () {
    ReactDefaultBatchingStrategy$1.isBatchingUpdates = false;
  }
};

var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction$9,
  close: ReactUpdates$7.flushBatchedUpdates.bind(ReactUpdates$7)
};

var TRANSACTION_WRAPPERS$2 = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];

function ReactDefaultBatchingStrategyTransaction() {
  this.reinitializeTransaction();
}

_assign$21(ReactDefaultBatchingStrategyTransaction.prototype, Transaction$4.Mixin, {
  getTransactionWrappers: function () {
    return TRANSACTION_WRAPPERS$2;
  }
});

var transaction = new ReactDefaultBatchingStrategyTransaction();

var ReactDefaultBatchingStrategy$1 = {
  isBatchingUpdates: false,

  /**
   * Call the provided function in a context within which calls to `setState`
   * and friends are batched such that components aren't updated unnecessarily.
   */
  batchedUpdates: function (callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy$1.isBatchingUpdates;

    ReactDefaultBatchingStrategy$1.isBatchingUpdates = true;

    // The code is written this way to avoid extra allocations
    if (alreadyBatchingUpdates) {
      callback(a, b, c, d, e);
    } else {
      transaction.perform(callback, null, a, b, c, d, e);
    }
  }
};

var ReactDefaultBatchingStrategy_1 = ReactDefaultBatchingStrategy$1;

var emptyFunction$10 = emptyFunction_1;

/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener$1 = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function capture(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    } else {
      return {
        remove: emptyFunction$10
      };
    }
  },

  registerDefault: function registerDefault() {}
};

var EventListener_1 = EventListener$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

function getUnboundedScrollPosition$1(scrollable) {
  if (scrollable.Window && scrollable instanceof scrollable.Window) {
    return {
      x: scrollable.pageXOffset || scrollable.document.documentElement.scrollLeft,
      y: scrollable.pageYOffset || scrollable.document.documentElement.scrollTop
    };
  }
  return {
    x: scrollable.scrollLeft,
    y: scrollable.scrollTop
  };
}

var getUnboundedScrollPosition_1 = getUnboundedScrollPosition$1;

var _assign$22 = index$1;

var EventListener = EventListener_1;
var ExecutionEnvironment$13 = ExecutionEnvironment_1;
var PooledClass$7 = PooledClass_1;
var ReactDOMComponentTree$16 = ReactDOMComponentTree_1;
var ReactUpdates$8 = ReactUpdates_1;

var getEventTarget$3 = getEventTarget_1;
var getUnboundedScrollPosition = getUnboundedScrollPosition_1;

/**
 * Find the deepest React component completely containing the root of the
 * passed-in instance (for use when entire React trees are nested within each
 * other). If React trees are not nested, returns null.
 */
function findParent(inst) {
  // TODO: It may be a good idea to cache this to prevent unnecessary DOM
  // traversal, but caching is difficult to do correctly without using a
  // mutation observer to listen for all DOM changes.
  while (inst._hostParent) {
    inst = inst._hostParent;
  }
  var rootNode = ReactDOMComponentTree$16.getNodeFromInstance(inst);
  var container = rootNode.parentNode;
  return ReactDOMComponentTree$16.getClosestInstanceFromNode(container);
}

// Used to store ancestor hierarchy in top level callback
function TopLevelCallbackBookKeeping(topLevelType, nativeEvent) {
  this.topLevelType = topLevelType;
  this.nativeEvent = nativeEvent;
  this.ancestors = [];
}
_assign$22(TopLevelCallbackBookKeeping.prototype, {
  destructor: function () {
    this.topLevelType = null;
    this.nativeEvent = null;
    this.ancestors.length = 0;
  }
});
PooledClass$7.addPoolingTo(TopLevelCallbackBookKeeping, PooledClass$7.twoArgumentPooler);

function handleTopLevelImpl(bookKeeping) {
  var nativeEventTarget = getEventTarget$3(bookKeeping.nativeEvent);
  var targetInst = ReactDOMComponentTree$16.getClosestInstanceFromNode(nativeEventTarget);

  // Loop through the hierarchy, in case there's any nested components.
  // It's important that we build the array of ancestors before calling any
  // event handlers, because event handlers can modify the DOM, leading to
  // inconsistencies with ReactMount's node cache. See #1105.
  var ancestor = targetInst;
  do {
    bookKeeping.ancestors.push(ancestor);
    ancestor = ancestor && findParent(ancestor);
  } while (ancestor);

  for (var i = 0; i < bookKeeping.ancestors.length; i++) {
    targetInst = bookKeeping.ancestors[i];
    ReactEventListener$1._handleTopLevel(bookKeeping.topLevelType, targetInst, bookKeeping.nativeEvent, getEventTarget$3(bookKeeping.nativeEvent));
  }
}

function scrollValueMonitor(cb) {
  var scrollPosition = getUnboundedScrollPosition(window);
  cb(scrollPosition);
}

var ReactEventListener$1 = {
  _enabled: true,
  _handleTopLevel: null,

  WINDOW_HANDLE: ExecutionEnvironment$13.canUseDOM ? window : null,

  setHandleTopLevel: function (handleTopLevel) {
    ReactEventListener$1._handleTopLevel = handleTopLevel;
  },

  setEnabled: function (enabled) {
    ReactEventListener$1._enabled = !!enabled;
  },

  isEnabled: function () {
    return ReactEventListener$1._enabled;
  },

  /**
   * Traps top-level events by using event bubbling.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {string} handlerBaseName Event name (e.g. "click").
   * @param {object} handle Element on which to attach listener.
   * @return {?object} An object with a remove function which will forcefully
   *                  remove the listener.
   * @internal
   */
  trapBubbledEvent: function (topLevelType, handlerBaseName, handle) {
    var element = handle;
    if (!element) {
      return null;
    }
    return EventListener.listen(element, handlerBaseName, ReactEventListener$1.dispatchEvent.bind(null, topLevelType));
  },

  /**
   * Traps a top-level event by using event capturing.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {string} handlerBaseName Event name (e.g. "click").
   * @param {object} handle Element on which to attach listener.
   * @return {?object} An object with a remove function which will forcefully
   *                  remove the listener.
   * @internal
   */
  trapCapturedEvent: function (topLevelType, handlerBaseName, handle) {
    var element = handle;
    if (!element) {
      return null;
    }
    return EventListener.capture(element, handlerBaseName, ReactEventListener$1.dispatchEvent.bind(null, topLevelType));
  },

  monitorScrollValue: function (refresh) {
    var callback = scrollValueMonitor.bind(null, refresh);
    EventListener.listen(window, 'scroll', callback);
  },

  dispatchEvent: function (topLevelType, nativeEvent) {
    if (!ReactEventListener$1._enabled) {
      return;
    }

    var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);
    try {
      // Event queue being processed in the same cycle allows
      // `preventDefault`.
      ReactUpdates$8.batchedUpdates(handleTopLevelImpl, bookKeeping);
    } finally {
      TopLevelCallbackBookKeeping.release(bookKeeping);
    }
  }
};

var ReactEventListener_1 = ReactEventListener$1;

var DOMProperty$5 = DOMProperty_1;
var EventPluginHub$5 = EventPluginHub_1;
var EventPluginUtils$3 = EventPluginUtils_1;
var ReactComponentEnvironment$3 = ReactComponentEnvironment_1;
var ReactClass$2 = ReactClass_1;
var ReactEmptyComponent$2 = ReactEmptyComponent_1;
var ReactBrowserEventEmitter$2 = ReactBrowserEventEmitter_1;
var ReactHostComponent$2 = ReactHostComponent_1;
var ReactUpdates$9 = ReactUpdates_1;

var ReactInjection$1 = {
  Component: ReactComponentEnvironment$3.injection,
  Class: ReactClass$2.injection,
  DOMProperty: DOMProperty$5.injection,
  EmptyComponent: ReactEmptyComponent$2.injection,
  EventPluginHub: EventPluginHub$5.injection,
  EventPluginUtils: EventPluginUtils$3.injection,
  EventEmitter: ReactBrowserEventEmitter$2.injection,
  HostComponent: ReactHostComponent$2.injection,
  Updates: ReactUpdates$9.injection
};

var ReactInjection_1 = ReactInjection$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getNodeForCharacterOffset
 */

function getLeafNode(node) {
  while (node && node.firstChild) {
    node = node.firstChild;
  }
  return node;
}

/**
 * Get the next sibling within a container. This will walk up the
 * DOM if a node's siblings have been exhausted.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {?DOMElement|DOMTextNode}
 */
function getSiblingNode(node) {
  while (node) {
    if (node.nextSibling) {
      return node.nextSibling;
    }
    node = node.parentNode;
  }
}

/**
 * Get object describing the nodes which contain characters at offset.
 *
 * @param {DOMElement|DOMTextNode} root
 * @param {number} offset
 * @return {?object}
 */
function getNodeForCharacterOffset$1(root, offset) {
  var node = getLeafNode(root);
  var nodeStart = 0;
  var nodeEnd = 0;

  while (node) {
    if (node.nodeType === 3) {
      nodeEnd = nodeStart + node.textContent.length;

      if (nodeStart <= offset && nodeEnd >= offset) {
        return {
          node: node,
          offset: offset - nodeStart
        };
      }

      nodeStart = nodeEnd;
    }

    node = getLeafNode(getSiblingNode(node));
  }
}

var getNodeForCharacterOffset_1 = getNodeForCharacterOffset$1;

var ExecutionEnvironment$14 = ExecutionEnvironment_1;

var getNodeForCharacterOffset = getNodeForCharacterOffset_1;
var getTextContentAccessor$2 = getTextContentAccessor_1;

/**
 * While `isCollapsed` is available on the Selection object and `collapsed`
 * is available on the Range object, IE11 sometimes gets them wrong.
 * If the anchor/focus nodes and offsets are the same, the range is collapsed.
 */
function isCollapsed(anchorNode, anchorOffset, focusNode, focusOffset) {
  return anchorNode === focusNode && anchorOffset === focusOffset;
}

/**
 * Get the appropriate anchor and focus node/offset pairs for IE.
 *
 * The catch here is that IE's selection API doesn't provide information
 * about whether the selection is forward or backward, so we have to
 * behave as though it's always forward.
 *
 * IE text differs from modern selection in that it behaves as though
 * block elements end with a new line. This means character offsets will
 * differ between the two APIs.
 *
 * @param {DOMElement} node
 * @return {object}
 */
function getIEOffsets(node) {
  var selection = document.selection;
  var selectedRange = selection.createRange();
  var selectedLength = selectedRange.text.length;

  // Duplicate selection so we can move range without breaking user selection.
  var fromStart = selectedRange.duplicate();
  fromStart.moveToElementText(node);
  fromStart.setEndPoint('EndToStart', selectedRange);

  var startOffset = fromStart.text.length;
  var endOffset = startOffset + selectedLength;

  return {
    start: startOffset,
    end: endOffset
  };
}

/**
 * @param {DOMElement} node
 * @return {?object}
 */
function getModernOffsets(node) {
  var selection = window.getSelection && window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  var anchorNode = selection.anchorNode;
  var anchorOffset = selection.anchorOffset;
  var focusNode = selection.focusNode;
  var focusOffset = selection.focusOffset;

  var currentRange = selection.getRangeAt(0);

  // In Firefox, range.startContainer and range.endContainer can be "anonymous
  // divs", e.g. the up/down buttons on an <input type="number">. Anonymous
  // divs do not seem to expose properties, triggering a "Permission denied
  // error" if any of its properties are accessed. The only seemingly possible
  // way to avoid erroring is to access a property that typically works for
  // non-anonymous divs and catch any error that may otherwise arise. See
  // https://bugzilla.mozilla.org/show_bug.cgi?id=208427
  try {
    /* eslint-disable no-unused-expressions */
    currentRange.startContainer.nodeType;
    currentRange.endContainer.nodeType;
    /* eslint-enable no-unused-expressions */
  } catch (e) {
    return null;
  }

  // If the node and offset values are the same, the selection is collapsed.
  // `Selection.isCollapsed` is available natively, but IE sometimes gets
  // this value wrong.
  var isSelectionCollapsed = isCollapsed(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);

  var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;

  var tempRange = currentRange.cloneRange();
  tempRange.selectNodeContents(node);
  tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);

  var isTempRangeCollapsed = isCollapsed(tempRange.startContainer, tempRange.startOffset, tempRange.endContainer, tempRange.endOffset);

  var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
  var end = start + rangeLength;

  // Detect whether the selection is backward.
  var detectionRange = document.createRange();
  detectionRange.setStart(anchorNode, anchorOffset);
  detectionRange.setEnd(focusNode, focusOffset);
  var isBackward = detectionRange.collapsed;

  return {
    start: isBackward ? end : start,
    end: isBackward ? start : end
  };
}

/**
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */
function setIEOffsets(node, offsets) {
  var range = document.selection.createRange().duplicate();
  var start, end;

  if (offsets.end === undefined) {
    start = offsets.start;
    end = start;
  } else if (offsets.start > offsets.end) {
    start = offsets.end;
    end = offsets.start;
  } else {
    start = offsets.start;
    end = offsets.end;
  }

  range.moveToElementText(node);
  range.moveStart('character', start);
  range.setEndPoint('EndToStart', range);
  range.moveEnd('character', end - start);
  range.select();
}

/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programmatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 *
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */
function setModernOffsets(node, offsets) {
  if (!window.getSelection) {
    return;
  }

  var selection = window.getSelection();
  var length = node[getTextContentAccessor$2()].length;
  var start = Math.min(offsets.start, length);
  var end = offsets.end === undefined ? start : Math.min(offsets.end, length);

  // IE 11 uses modern selection, but doesn't support the extend method.
  // Flip backward selections, so we can set with a single range.
  if (!selection.extend && start > end) {
    var temp = end;
    end = start;
    start = temp;
  }

  var startMarker = getNodeForCharacterOffset(node, start);
  var endMarker = getNodeForCharacterOffset(node, end);

  if (startMarker && endMarker) {
    var range = document.createRange();
    range.setStart(startMarker.node, startMarker.offset);
    selection.removeAllRanges();

    if (start > end) {
      selection.addRange(range);
      selection.extend(endMarker.node, endMarker.offset);
    } else {
      range.setEnd(endMarker.node, endMarker.offset);
      selection.addRange(range);
    }
  }
}

var useIEOffsets = ExecutionEnvironment$14.canUseDOM && 'selection' in document && !('getSelection' in window);

var ReactDOMSelection$1 = {
  /**
   * @param {DOMElement} node
   */
  getOffsets: useIEOffsets ? getIEOffsets : getModernOffsets,

  /**
   * @param {DOMElement|DOMTextNode} node
   * @param {object} offsets
   */
  setOffsets: useIEOffsets ? setIEOffsets : setModernOffsets
};

var ReactDOMSelection_1 = ReactDOMSelection$1;

function isNode$2(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

var isNode_1 = isNode$2;

var isNode$1 = isNode_1;

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode$1(object) {
  return isNode$1(object) && object.nodeType == 3;
}

var isTextNode_1 = isTextNode$1;

var isTextNode = isTextNode_1;

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode$1(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode$1(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

var containsNode_1 = containsNode$1;

function getActiveElement$1(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

var getActiveElement_1 = getActiveElement$1;

var ReactDOMSelection = ReactDOMSelection_1;

var containsNode = containsNode_1;
var focusNode$2 = focusNode_1;
var getActiveElement = getActiveElement_1;

function isInDocument(node) {
  return containsNode(document.documentElement, node);
}

/**
 * @ReactInputSelection: React input selection module. Based on Selection.js,
 * but modified to be suitable for react and has a couple of bug fixes (doesn't
 * assume buttons have range selections allowed).
 * Input selection module for React.
 */
var ReactInputSelection$1 = {

  hasSelectionCapabilities: function (elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    return nodeName && (nodeName === 'input' && elem.type === 'text' || nodeName === 'textarea' || elem.contentEditable === 'true');
  },

  getSelectionInformation: function () {
    var focusedElem = getActiveElement();
    return {
      focusedElem: focusedElem,
      selectionRange: ReactInputSelection$1.hasSelectionCapabilities(focusedElem) ? ReactInputSelection$1.getSelection(focusedElem) : null
    };
  },

  /**
   * @restoreSelection: If any selection information was potentially lost,
   * restore it. This is useful when performing operations that could remove dom
   * nodes and place them back in, resulting in focus being lost.
   */
  restoreSelection: function (priorSelectionInformation) {
    var curFocusedElem = getActiveElement();
    var priorFocusedElem = priorSelectionInformation.focusedElem;
    var priorSelectionRange = priorSelectionInformation.selectionRange;
    if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
      if (ReactInputSelection$1.hasSelectionCapabilities(priorFocusedElem)) {
        ReactInputSelection$1.setSelection(priorFocusedElem, priorSelectionRange);
      }
      focusNode$2(priorFocusedElem);
    }
  },

  /**
   * @getSelection: Gets the selection bounds of a focused textarea, input or
   * contentEditable node.
   * -@input: Look up selection bounds of this input
   * -@return {start: selectionStart, end: selectionEnd}
   */
  getSelection: function (input) {
    var selection;

    if ('selectionStart' in input) {
      // Modern browser with input or textarea.
      selection = {
        start: input.selectionStart,
        end: input.selectionEnd
      };
    } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
      // IE8 input.
      var range = document.selection.createRange();
      // There can only be one selection per document in IE, so it must
      // be in our element.
      if (range.parentElement() === input) {
        selection = {
          start: -range.moveStart('character', -input.value.length),
          end: -range.moveEnd('character', -input.value.length)
        };
      }
    } else {
      // Content editable or old IE textarea.
      selection = ReactDOMSelection.getOffsets(input);
    }

    return selection || { start: 0, end: 0 };
  },

  /**
   * @setSelection: Sets the selection bounds of a textarea or input and focuses
   * the input.
   * -@input     Set selection bounds of this input or textarea
   * -@offsets   Object of same form that is returned from get*
   */
  setSelection: function (input, offsets) {
    var start = offsets.start;
    var end = offsets.end;
    if (end === undefined) {
      end = start;
    }

    if ('selectionStart' in input) {
      input.selectionStart = start;
      input.selectionEnd = Math.min(end, input.value.length);
    } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveStart('character', start);
      range.moveEnd('character', end - start);
      range.select();
    } else {
      ReactDOMSelection.setOffsets(input, offsets);
    }
  }
};

var ReactInputSelection_1 = ReactInputSelection$1;

var _assign$23 = index$1;

var CallbackQueue$2 = CallbackQueue_1;
var PooledClass$8 = PooledClass_1;
var ReactBrowserEventEmitter$3 = ReactBrowserEventEmitter_1;
var ReactInputSelection = ReactInputSelection_1;
var Transaction$5 = Transaction_1;
var ReactUpdateQueue$2 = ReactUpdateQueue_1;

/**
 * Ensures that, when possible, the selection range (currently selected text
 * input) is not disturbed by performing the transaction.
 */
var SELECTION_RESTORATION = {
  /**
   * @return {Selection} Selection information.
   */
  initialize: ReactInputSelection.getSelectionInformation,
  /**
   * @param {Selection} sel Selection information returned from `initialize`.
   */
  close: ReactInputSelection.restoreSelection
};

/**
 * Suppresses events (blur/focus) that could be inadvertently dispatched due to
 * high level DOM manipulations (like temporarily removing a text input from the
 * DOM).
 */
var EVENT_SUPPRESSION = {
  /**
   * @return {boolean} The enabled status of `ReactBrowserEventEmitter` before
   * the reconciliation.
   */
  initialize: function () {
    var currentlyEnabled = ReactBrowserEventEmitter$3.isEnabled();
    ReactBrowserEventEmitter$3.setEnabled(false);
    return currentlyEnabled;
  },

  /**
   * @param {boolean} previouslyEnabled Enabled status of
   *   `ReactBrowserEventEmitter` before the reconciliation occurred. `close`
   *   restores the previous value.
   */
  close: function (previouslyEnabled) {
    ReactBrowserEventEmitter$3.setEnabled(previouslyEnabled);
  }
};

/**
 * Provides a queue for collecting `componentDidMount` and
 * `componentDidUpdate` callbacks during the transaction.
 */
var ON_DOM_READY_QUEUEING = {
  /**
   * Initializes the internal `onDOMReady` queue.
   */
  initialize: function () {
    this.reactMountReady.reset();
  },

  /**
   * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
   */
  close: function () {
    this.reactMountReady.notifyAll();
  }
};

/**
 * Executed within the scope of the `Transaction` instance. Consider these as
 * being member methods, but with an implied ordering while being isolated from
 * each other.
 */
var TRANSACTION_WRAPPERS$3 = [SELECTION_RESTORATION, EVENT_SUPPRESSION, ON_DOM_READY_QUEUEING];

function ReactReconcileTransaction$1(useCreateElement) {
  this.reinitializeTransaction();
  // Only server-side rendering really needs this option (see
  // `ReactServerRendering`), but server-side uses
  // `ReactServerRenderingTransaction` instead. This option is here so that it's
  // accessible and defaults to false when `ReactDOMComponent` and
  // `ReactDOMTextComponent` checks it in `mountComponent`.`
  this.renderToStaticMarkup = false;
  this.reactMountReady = CallbackQueue$2.getPooled(null);
  this.useCreateElement = useCreateElement;
}

var Mixin$2 = {
  /**
   * @see Transaction
   * @abstract
   * @final
   * @return {array<object>} List of operation wrap procedures.
   *   TODO: convert to array<TransactionWrapper>
   */
  getTransactionWrappers: function () {
    return TRANSACTION_WRAPPERS$3;
  },

  /**
   * @return {object} The queue to collect `onDOMReady` callbacks with.
   */
  getReactMountReady: function () {
    return this.reactMountReady;
  },

  /**
   * @return {object} The queue to collect React async events.
   */
  getUpdateQueue: function () {
    return ReactUpdateQueue$2;
  },

  /**
   * Save current transaction state -- if the return value from this method is
   * passed to `rollback`, the transaction will be reset to that state.
   */
  checkpoint: function () {
    // reactMountReady is the our only stateful wrapper
    return this.reactMountReady.checkpoint();
  },

  rollback: function (checkpoint) {
    this.reactMountReady.rollback(checkpoint);
  },

  /**
   * `PooledClass` looks for this, and will invoke this before allowing this
   * instance to be reused.
   */
  destructor: function () {
    CallbackQueue$2.release(this.reactMountReady);
    this.reactMountReady = null;
  }
};

_assign$23(ReactReconcileTransaction$1.prototype, Transaction$5.Mixin, Mixin$2);

PooledClass$8.addPoolingTo(ReactReconcileTransaction$1);

var ReactReconcileTransaction_1 = ReactReconcileTransaction$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SVGDOMPropertyConfig
 */

var NS = {
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace'
};

// We use attributes for everything SVG so let's avoid some duplication and run
// code instead.
// The following are all specified in the HTML config already so we exclude here.
// - class (as className)
// - color
// - height
// - id
// - lang
// - max
// - media
// - method
// - min
// - name
// - style
// - target
// - type
// - width
var ATTRS = {
  accentHeight: 'accent-height',
  accumulate: 0,
  additive: 0,
  alignmentBaseline: 'alignment-baseline',
  allowReorder: 'allowReorder',
  alphabetic: 0,
  amplitude: 0,
  arabicForm: 'arabic-form',
  ascent: 0,
  attributeName: 'attributeName',
  attributeType: 'attributeType',
  autoReverse: 'autoReverse',
  azimuth: 0,
  baseFrequency: 'baseFrequency',
  baseProfile: 'baseProfile',
  baselineShift: 'baseline-shift',
  bbox: 0,
  begin: 0,
  bias: 0,
  by: 0,
  calcMode: 'calcMode',
  capHeight: 'cap-height',
  clip: 0,
  clipPath: 'clip-path',
  clipRule: 'clip-rule',
  clipPathUnits: 'clipPathUnits',
  colorInterpolation: 'color-interpolation',
  colorInterpolationFilters: 'color-interpolation-filters',
  colorProfile: 'color-profile',
  colorRendering: 'color-rendering',
  contentScriptType: 'contentScriptType',
  contentStyleType: 'contentStyleType',
  cursor: 0,
  cx: 0,
  cy: 0,
  d: 0,
  decelerate: 0,
  descent: 0,
  diffuseConstant: 'diffuseConstant',
  direction: 0,
  display: 0,
  divisor: 0,
  dominantBaseline: 'dominant-baseline',
  dur: 0,
  dx: 0,
  dy: 0,
  edgeMode: 'edgeMode',
  elevation: 0,
  enableBackground: 'enable-background',
  end: 0,
  exponent: 0,
  externalResourcesRequired: 'externalResourcesRequired',
  fill: 0,
  fillOpacity: 'fill-opacity',
  fillRule: 'fill-rule',
  filter: 0,
  filterRes: 'filterRes',
  filterUnits: 'filterUnits',
  floodColor: 'flood-color',
  floodOpacity: 'flood-opacity',
  focusable: 0,
  fontFamily: 'font-family',
  fontSize: 'font-size',
  fontSizeAdjust: 'font-size-adjust',
  fontStretch: 'font-stretch',
  fontStyle: 'font-style',
  fontVariant: 'font-variant',
  fontWeight: 'font-weight',
  format: 0,
  from: 0,
  fx: 0,
  fy: 0,
  g1: 0,
  g2: 0,
  glyphName: 'glyph-name',
  glyphOrientationHorizontal: 'glyph-orientation-horizontal',
  glyphOrientationVertical: 'glyph-orientation-vertical',
  glyphRef: 'glyphRef',
  gradientTransform: 'gradientTransform',
  gradientUnits: 'gradientUnits',
  hanging: 0,
  horizAdvX: 'horiz-adv-x',
  horizOriginX: 'horiz-origin-x',
  ideographic: 0,
  imageRendering: 'image-rendering',
  'in': 0,
  in2: 0,
  intercept: 0,
  k: 0,
  k1: 0,
  k2: 0,
  k3: 0,
  k4: 0,
  kernelMatrix: 'kernelMatrix',
  kernelUnitLength: 'kernelUnitLength',
  kerning: 0,
  keyPoints: 'keyPoints',
  keySplines: 'keySplines',
  keyTimes: 'keyTimes',
  lengthAdjust: 'lengthAdjust',
  letterSpacing: 'letter-spacing',
  lightingColor: 'lighting-color',
  limitingConeAngle: 'limitingConeAngle',
  local: 0,
  markerEnd: 'marker-end',
  markerMid: 'marker-mid',
  markerStart: 'marker-start',
  markerHeight: 'markerHeight',
  markerUnits: 'markerUnits',
  markerWidth: 'markerWidth',
  mask: 0,
  maskContentUnits: 'maskContentUnits',
  maskUnits: 'maskUnits',
  mathematical: 0,
  mode: 0,
  numOctaves: 'numOctaves',
  offset: 0,
  opacity: 0,
  operator: 0,
  order: 0,
  orient: 0,
  orientation: 0,
  origin: 0,
  overflow: 0,
  overlinePosition: 'overline-position',
  overlineThickness: 'overline-thickness',
  paintOrder: 'paint-order',
  panose1: 'panose-1',
  pathLength: 'pathLength',
  patternContentUnits: 'patternContentUnits',
  patternTransform: 'patternTransform',
  patternUnits: 'patternUnits',
  pointerEvents: 'pointer-events',
  points: 0,
  pointsAtX: 'pointsAtX',
  pointsAtY: 'pointsAtY',
  pointsAtZ: 'pointsAtZ',
  preserveAlpha: 'preserveAlpha',
  preserveAspectRatio: 'preserveAspectRatio',
  primitiveUnits: 'primitiveUnits',
  r: 0,
  radius: 0,
  refX: 'refX',
  refY: 'refY',
  renderingIntent: 'rendering-intent',
  repeatCount: 'repeatCount',
  repeatDur: 'repeatDur',
  requiredExtensions: 'requiredExtensions',
  requiredFeatures: 'requiredFeatures',
  restart: 0,
  result: 0,
  rotate: 0,
  rx: 0,
  ry: 0,
  scale: 0,
  seed: 0,
  shapeRendering: 'shape-rendering',
  slope: 0,
  spacing: 0,
  specularConstant: 'specularConstant',
  specularExponent: 'specularExponent',
  speed: 0,
  spreadMethod: 'spreadMethod',
  startOffset: 'startOffset',
  stdDeviation: 'stdDeviation',
  stemh: 0,
  stemv: 0,
  stitchTiles: 'stitchTiles',
  stopColor: 'stop-color',
  stopOpacity: 'stop-opacity',
  strikethroughPosition: 'strikethrough-position',
  strikethroughThickness: 'strikethrough-thickness',
  string: 0,
  stroke: 0,
  strokeDasharray: 'stroke-dasharray',
  strokeDashoffset: 'stroke-dashoffset',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeMiterlimit: 'stroke-miterlimit',
  strokeOpacity: 'stroke-opacity',
  strokeWidth: 'stroke-width',
  surfaceScale: 'surfaceScale',
  systemLanguage: 'systemLanguage',
  tableValues: 'tableValues',
  targetX: 'targetX',
  targetY: 'targetY',
  textAnchor: 'text-anchor',
  textDecoration: 'text-decoration',
  textRendering: 'text-rendering',
  textLength: 'textLength',
  to: 0,
  transform: 0,
  u1: 0,
  u2: 0,
  underlinePosition: 'underline-position',
  underlineThickness: 'underline-thickness',
  unicode: 0,
  unicodeBidi: 'unicode-bidi',
  unicodeRange: 'unicode-range',
  unitsPerEm: 'units-per-em',
  vAlphabetic: 'v-alphabetic',
  vHanging: 'v-hanging',
  vIdeographic: 'v-ideographic',
  vMathematical: 'v-mathematical',
  values: 0,
  vectorEffect: 'vector-effect',
  version: 0,
  vertAdvY: 'vert-adv-y',
  vertOriginX: 'vert-origin-x',
  vertOriginY: 'vert-origin-y',
  viewBox: 'viewBox',
  viewTarget: 'viewTarget',
  visibility: 0,
  widths: 0,
  wordSpacing: 'word-spacing',
  writingMode: 'writing-mode',
  x: 0,
  xHeight: 'x-height',
  x1: 0,
  x2: 0,
  xChannelSelector: 'xChannelSelector',
  xlinkActuate: 'xlink:actuate',
  xlinkArcrole: 'xlink:arcrole',
  xlinkHref: 'xlink:href',
  xlinkRole: 'xlink:role',
  xlinkShow: 'xlink:show',
  xlinkTitle: 'xlink:title',
  xlinkType: 'xlink:type',
  xmlBase: 'xml:base',
  xmlns: 0,
  xmlnsXlink: 'xmlns:xlink',
  xmlLang: 'xml:lang',
  xmlSpace: 'xml:space',
  y: 0,
  y1: 0,
  y2: 0,
  yChannelSelector: 'yChannelSelector',
  z: 0,
  zoomAndPan: 'zoomAndPan'
};

var SVGDOMPropertyConfig$1 = {
  Properties: {},
  DOMAttributeNamespaces: {
    xlinkActuate: NS.xlink,
    xlinkArcrole: NS.xlink,
    xlinkHref: NS.xlink,
    xlinkRole: NS.xlink,
    xlinkShow: NS.xlink,
    xlinkTitle: NS.xlink,
    xlinkType: NS.xlink,
    xmlBase: NS.xml,
    xmlLang: NS.xml,
    xmlSpace: NS.xml
  },
  DOMAttributeNames: {}
};

Object.keys(ATTRS).forEach(function (key) {
  SVGDOMPropertyConfig$1.Properties[key] = 0;
  if (ATTRS[key]) {
    SVGDOMPropertyConfig$1.DOMAttributeNames[key] = ATTRS[key];
  }
});

var SVGDOMPropertyConfig_1 = SVGDOMPropertyConfig$1;

var EventConstants$8 = EventConstants_1;
var EventPropagators$4 = EventPropagators_1;
var ExecutionEnvironment$15 = ExecutionEnvironment_1;
var ReactDOMComponentTree$17 = ReactDOMComponentTree_1;
var ReactInputSelection$2 = ReactInputSelection_1;
var SyntheticEvent$5 = SyntheticEvent_1;

var getActiveElement$2 = getActiveElement_1;
var isTextInputElement$2 = isTextInputElement_1;
var keyOf$7 = keyOf_1;
var shallowEqual$3 = shallowEqual_1;

var topLevelTypes$5 = EventConstants$8.topLevelTypes;

var skipSelectionChangeEvent = ExecutionEnvironment$15.canUseDOM && 'documentMode' in document && document.documentMode <= 11;

var eventTypes$3 = {
  select: {
    phasedRegistrationNames: {
      bubbled: keyOf$7({ onSelect: null }),
      captured: keyOf$7({ onSelectCapture: null })
    },
    dependencies: [topLevelTypes$5.topBlur, topLevelTypes$5.topContextMenu, topLevelTypes$5.topFocus, topLevelTypes$5.topKeyDown, topLevelTypes$5.topMouseDown, topLevelTypes$5.topMouseUp, topLevelTypes$5.topSelectionChange]
  }
};

var activeElement$1 = null;
var activeElementInst$1 = null;
var lastSelection = null;
var mouseDown = false;

// Track whether a listener exists for this plugin. If none exist, we do
// not extract events. See #3639.
var hasListener = false;
var ON_SELECT_KEY = keyOf$7({ onSelect: null });

/**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 *
 * @param {DOMElement} node
 * @return {object}
 */
function getSelection(node) {
  if ('selectionStart' in node && ReactInputSelection$2.hasSelectionCapabilities(node)) {
    return {
      start: node.selectionStart,
      end: node.selectionEnd
    };
  } else if (window.getSelection) {
    var selection = window.getSelection();
    return {
      anchorNode: selection.anchorNode,
      anchorOffset: selection.anchorOffset,
      focusNode: selection.focusNode,
      focusOffset: selection.focusOffset
    };
  } else if (document.selection) {
    var range = document.selection.createRange();
    return {
      parentElement: range.parentElement(),
      text: range.text,
      top: range.boundingTop,
      left: range.boundingLeft
    };
  }
}

/**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @return {?SyntheticEvent}
 */
function constructSelectEvent(nativeEvent, nativeEventTarget) {
  // Ensure we have the right element, and that the user is not dragging a
  // selection (this matches native `select` event behavior). In HTML5, select
  // fires only on input and textarea thus if there's no focused element we
  // won't dispatch.
  if (mouseDown || activeElement$1 == null || activeElement$1 !== getActiveElement$2()) {
    return null;
  }

  // Only fire when selection has actually changed.
  var currentSelection = getSelection(activeElement$1);
  if (!lastSelection || !shallowEqual$3(lastSelection, currentSelection)) {
    lastSelection = currentSelection;

    var syntheticEvent = SyntheticEvent$5.getPooled(eventTypes$3.select, activeElementInst$1, nativeEvent, nativeEventTarget);

    syntheticEvent.type = 'select';
    syntheticEvent.target = activeElement$1;

    EventPropagators$4.accumulateTwoPhaseDispatches(syntheticEvent);

    return syntheticEvent;
  }

  return null;
}

/**
 * This plugin creates an `onSelect` event that normalizes select events
 * across form elements.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - contentEditable
 *
 * This differs from native browser implementations in the following ways:
 * - Fires on contentEditable fields as well as inputs.
 * - Fires for collapsed selection.
 * - Fires after user input.
 */
var SelectEventPlugin$1 = {

  eventTypes: eventTypes$3,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    if (!hasListener) {
      return null;
    }

    var targetNode = targetInst ? ReactDOMComponentTree$17.getNodeFromInstance(targetInst) : window;

    switch (topLevelType) {
      // Track the input node that has focus.
      case topLevelTypes$5.topFocus:
        if (isTextInputElement$2(targetNode) || targetNode.contentEditable === 'true') {
          activeElement$1 = targetNode;
          activeElementInst$1 = targetInst;
          lastSelection = null;
        }
        break;
      case topLevelTypes$5.topBlur:
        activeElement$1 = null;
        activeElementInst$1 = null;
        lastSelection = null;
        break;

      // Don't fire the event while the user is dragging. This matches the
      // semantics of the native select event.
      case topLevelTypes$5.topMouseDown:
        mouseDown = true;
        break;
      case topLevelTypes$5.topContextMenu:
      case topLevelTypes$5.topMouseUp:
        mouseDown = false;
        return constructSelectEvent(nativeEvent, nativeEventTarget);

      // Chrome and IE fire non-standard event when selection is changed (and
      // sometimes when it hasn't). IE's event fires out of order with respect
      // to key and input events on deletion, so we discard it.
      //
      // Firefox doesn't support selectionchange, so check selection status
      // after each key entry. The selection changes after keydown and before
      // keyup, but we check on keydown as well in the case of holding down a
      // key, when multiple keydown events are fired but only one keyup is.
      // This is also our approach for IE handling, for the reason above.
      case topLevelTypes$5.topSelectionChange:
        if (skipSelectionChangeEvent) {
          break;
        }
      // falls through
      case topLevelTypes$5.topKeyDown:
      case topLevelTypes$5.topKeyUp:
        return constructSelectEvent(nativeEvent, nativeEventTarget);
    }

    return null;
  },

  didPutListener: function (inst, registrationName, listener) {
    if (registrationName === ON_SELECT_KEY) {
      hasListener = true;
    }
  }
};

var SelectEventPlugin_1 = SelectEventPlugin$1;

var SyntheticEvent$7 = SyntheticEvent_1;

/**
 * @interface Event
 * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
 */
var AnimationEventInterface = {
  animationName: null,
  elapsedTime: null,
  pseudoElement: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticAnimationEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$7.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$7.augmentClass(SyntheticAnimationEvent$1, AnimationEventInterface);

var SyntheticAnimationEvent_1 = SyntheticAnimationEvent$1;

var SyntheticEvent$8 = SyntheticEvent_1;

/**
 * @interface Event
 * @see http://www.w3.org/TR/clipboard-apis/
 */
var ClipboardEventInterface = {
  clipboardData: function (event) {
    return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticClipboardEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$8.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$8.augmentClass(SyntheticClipboardEvent$1, ClipboardEventInterface);

var SyntheticClipboardEvent_1 = SyntheticClipboardEvent$1;

var SyntheticUIEvent$3 = SyntheticUIEvent_1;

/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var FocusEventInterface = {
  relatedTarget: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticFocusEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent$3.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent$3.augmentClass(SyntheticFocusEvent$1, FocusEventInterface);

var SyntheticFocusEvent_1 = SyntheticFocusEvent$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getEventCharCode
 */

function getEventCharCode$2(nativeEvent) {
  var charCode;
  var keyCode = nativeEvent.keyCode;

  if ('charCode' in nativeEvent) {
    charCode = nativeEvent.charCode;

    // FF does not set `charCode` for the Enter-key, check against `keyCode`.
    if (charCode === 0 && keyCode === 13) {
      charCode = 13;
    }
  } else {
    // IE8 does not implement `charCode`, but `keyCode` has the correct value.
    charCode = keyCode;
  }

  // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
  // Must not discard the (non-)printable Enter-key.
  if (charCode >= 32 || charCode === 13) {
    return charCode;
  }

  return 0;
}

var getEventCharCode_1 = getEventCharCode$2;

var getEventCharCode$3 = getEventCharCode_1;

/**
 * Normalization of deprecated HTML5 `key` values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */
var normalizeKey = {
  'Esc': 'Escape',
  'Spacebar': ' ',
  'Left': 'ArrowLeft',
  'Up': 'ArrowUp',
  'Right': 'ArrowRight',
  'Down': 'ArrowDown',
  'Del': 'Delete',
  'Win': 'OS',
  'Menu': 'ContextMenu',
  'Apps': 'ContextMenu',
  'Scroll': 'ScrollLock',
  'MozPrintableKey': 'Unidentified'
};

/**
 * Translation from legacy `keyCode` to HTML5 `key`
 * Only special keys supported, all others depend on keyboard layout or browser
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */
var translateToKey = {
  8: 'Backspace',
  9: 'Tab',
  12: 'Clear',
  13: 'Enter',
  16: 'Shift',
  17: 'Control',
  18: 'Alt',
  19: 'Pause',
  20: 'CapsLock',
  27: 'Escape',
  32: ' ',
  33: 'PageUp',
  34: 'PageDown',
  35: 'End',
  36: 'Home',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
  45: 'Insert',
  46: 'Delete',
  112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5', 117: 'F6',
  118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12',
  144: 'NumLock',
  145: 'ScrollLock',
  224: 'Meta'
};

/**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */
function getEventKey$1(nativeEvent) {
  if (nativeEvent.key) {
    // Normalize inconsistent values reported by browsers due to
    // implementations of a working draft specification.

    // FireFox implements `key` but returns `MozPrintableKey` for all
    // printable characters (normalized to `Unidentified`), ignore it.
    var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
    if (key !== 'Unidentified') {
      return key;
    }
  }

  // Browser does not implement `key`, polyfill as much of it as we can.
  if (nativeEvent.type === 'keypress') {
    var charCode = getEventCharCode$3(nativeEvent);

    // The enter-key is technically both printable and non-printable and can
    // thus be captured by `keypress`, no other non-printable key should.
    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
  }
  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
    // While user keyboard layout determines the actual meaning of each
    // `keyCode` value, almost all function keys have a universal value.
    return translateToKey[nativeEvent.keyCode] || 'Unidentified';
  }
  return '';
}

var getEventKey_1 = getEventKey$1;

var SyntheticUIEvent$4 = SyntheticUIEvent_1;

var getEventCharCode$1 = getEventCharCode_1;
var getEventKey = getEventKey_1;
var getEventModifierState$2 = getEventModifierState_1;

/**
 * @interface KeyboardEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var KeyboardEventInterface = {
  key: getEventKey,
  location: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  repeat: null,
  locale: null,
  getModifierState: getEventModifierState$2,
  // Legacy Interface
  charCode: function (event) {
    // `charCode` is the result of a KeyPress event and represents the value of
    // the actual printable character.

    // KeyPress is deprecated, but its replacement is not yet final and not
    // implemented in any major browser. Only KeyPress has charCode.
    if (event.type === 'keypress') {
      return getEventCharCode$1(event);
    }
    return 0;
  },
  keyCode: function (event) {
    // `keyCode` is the result of a KeyDown/Up event and represents the value of
    // physical keyboard key.

    // The actual meaning of the value depends on the users' keyboard layout
    // which cannot be detected. Assuming that it is a US keyboard layout
    // provides a surprisingly accurate mapping for US and European users.
    // Due to this, it is left to the user to implement at this time.
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }
    return 0;
  },
  which: function (event) {
    // `which` is an alias for either `keyCode` or `charCode` depending on the
    // type of the event.
    if (event.type === 'keypress') {
      return getEventCharCode$1(event);
    }
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }
    return 0;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticKeyboardEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent$4.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent$4.augmentClass(SyntheticKeyboardEvent$1, KeyboardEventInterface);

var SyntheticKeyboardEvent_1 = SyntheticKeyboardEvent$1;

var SyntheticMouseEvent$3 = SyntheticMouseEvent_1;

/**
 * @interface DragEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var DragEventInterface = {
  dataTransfer: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticDragEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticMouseEvent$3.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent$3.augmentClass(SyntheticDragEvent$1, DragEventInterface);

var SyntheticDragEvent_1 = SyntheticDragEvent$1;

var SyntheticUIEvent$5 = SyntheticUIEvent_1;

var getEventModifierState$3 = getEventModifierState_1;

/**
 * @interface TouchEvent
 * @see http://www.w3.org/TR/touch-events/
 */
var TouchEventInterface = {
  touches: null,
  targetTouches: null,
  changedTouches: null,
  altKey: null,
  metaKey: null,
  ctrlKey: null,
  shiftKey: null,
  getModifierState: getEventModifierState$3
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticTouchEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent$5.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent$5.augmentClass(SyntheticTouchEvent$1, TouchEventInterface);

var SyntheticTouchEvent_1 = SyntheticTouchEvent$1;

var SyntheticEvent$9 = SyntheticEvent_1;

/**
 * @interface Event
 * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
 */
var TransitionEventInterface = {
  propertyName: null,
  elapsedTime: null,
  pseudoElement: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticTransitionEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$9.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$9.augmentClass(SyntheticTransitionEvent$1, TransitionEventInterface);

var SyntheticTransitionEvent_1 = SyntheticTransitionEvent$1;

var SyntheticMouseEvent$4 = SyntheticMouseEvent_1;

/**
 * @interface WheelEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var WheelEventInterface = {
  deltaX: function (event) {
    return 'deltaX' in event ? event.deltaX :
    // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
    'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
  },
  deltaY: function (event) {
    return 'deltaY' in event ? event.deltaY :
    // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
    'wheelDeltaY' in event ? -event.wheelDeltaY :
    // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
    'wheelDelta' in event ? -event.wheelDelta : 0;
  },
  deltaZ: null,

  // Browsers without "deltaMode" is reporting in raw wheel delta where one
  // notch on the scroll is always +/- 120, roughly equivalent to pixels.
  // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
  // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
  deltaMode: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticMouseEvent}
 */
function SyntheticWheelEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticMouseEvent$4.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent$4.augmentClass(SyntheticWheelEvent$1, WheelEventInterface);

var SyntheticWheelEvent_1 = SyntheticWheelEvent$1;

var _prodInvariant$31 = reactProdInvariant_1;

var EventConstants$9 = EventConstants_1;
var EventListener$2 = EventListener_1;
var EventPropagators$5 = EventPropagators_1;
var ReactDOMComponentTree$18 = ReactDOMComponentTree_1;
var SyntheticAnimationEvent = SyntheticAnimationEvent_1;
var SyntheticClipboardEvent = SyntheticClipboardEvent_1;
var SyntheticEvent$6 = SyntheticEvent_1;
var SyntheticFocusEvent = SyntheticFocusEvent_1;
var SyntheticKeyboardEvent = SyntheticKeyboardEvent_1;
var SyntheticMouseEvent$2 = SyntheticMouseEvent_1;
var SyntheticDragEvent = SyntheticDragEvent_1;
var SyntheticTouchEvent = SyntheticTouchEvent_1;
var SyntheticTransitionEvent = SyntheticTransitionEvent_1;
var SyntheticUIEvent$2 = SyntheticUIEvent_1;
var SyntheticWheelEvent = SyntheticWheelEvent_1;

var emptyFunction$11 = emptyFunction_1;
var getEventCharCode = getEventCharCode_1;
var keyOf$8 = keyOf_1;

var topLevelTypes$6 = EventConstants$9.topLevelTypes;

var eventTypes$4 = {
  abort: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onAbort: true }),
      captured: keyOf$8({ onAbortCapture: true })
    }
  },
  animationEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onAnimationEnd: true }),
      captured: keyOf$8({ onAnimationEndCapture: true })
    }
  },
  animationIteration: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onAnimationIteration: true }),
      captured: keyOf$8({ onAnimationIterationCapture: true })
    }
  },
  animationStart: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onAnimationStart: true }),
      captured: keyOf$8({ onAnimationStartCapture: true })
    }
  },
  blur: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onBlur: true }),
      captured: keyOf$8({ onBlurCapture: true })
    }
  },
  canPlay: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onCanPlay: true }),
      captured: keyOf$8({ onCanPlayCapture: true })
    }
  },
  canPlayThrough: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onCanPlayThrough: true }),
      captured: keyOf$8({ onCanPlayThroughCapture: true })
    }
  },
  click: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onClick: true }),
      captured: keyOf$8({ onClickCapture: true })
    }
  },
  contextMenu: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onContextMenu: true }),
      captured: keyOf$8({ onContextMenuCapture: true })
    }
  },
  copy: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onCopy: true }),
      captured: keyOf$8({ onCopyCapture: true })
    }
  },
  cut: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onCut: true }),
      captured: keyOf$8({ onCutCapture: true })
    }
  },
  doubleClick: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onDoubleClick: true }),
      captured: keyOf$8({ onDoubleClickCapture: true })
    }
  },
  drag: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onDrag: true }),
      captured: keyOf$8({ onDragCapture: true })
    }
  },
  dragEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onDragEnd: true }),
      captured: keyOf$8({ onDragEndCapture: true })
    }
  },
  dragEnter: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onDragEnter: true }),
      captured: keyOf$8({ onDragEnterCapture: true })
    }
  },
  dragExit: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onDragExit: true }),
      captured: keyOf$8({ onDragExitCapture: true })
    }
  },
  dragLeave: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onDragLeave: true }),
      captured: keyOf$8({ onDragLeaveCapture: true })
    }
  },
  dragOver: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onDragOver: true }),
      captured: keyOf$8({ onDragOverCapture: true })
    }
  },
  dragStart: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onDragStart: true }),
      captured: keyOf$8({ onDragStartCapture: true })
    }
  },
  drop: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onDrop: true }),
      captured: keyOf$8({ onDropCapture: true })
    }
  },
  durationChange: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onDurationChange: true }),
      captured: keyOf$8({ onDurationChangeCapture: true })
    }
  },
  emptied: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onEmptied: true }),
      captured: keyOf$8({ onEmptiedCapture: true })
    }
  },
  encrypted: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onEncrypted: true }),
      captured: keyOf$8({ onEncryptedCapture: true })
    }
  },
  ended: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onEnded: true }),
      captured: keyOf$8({ onEndedCapture: true })
    }
  },
  error: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onError: true }),
      captured: keyOf$8({ onErrorCapture: true })
    }
  },
  focus: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onFocus: true }),
      captured: keyOf$8({ onFocusCapture: true })
    }
  },
  input: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onInput: true }),
      captured: keyOf$8({ onInputCapture: true })
    }
  },
  invalid: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onInvalid: true }),
      captured: keyOf$8({ onInvalidCapture: true })
    }
  },
  keyDown: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onKeyDown: true }),
      captured: keyOf$8({ onKeyDownCapture: true })
    }
  },
  keyPress: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onKeyPress: true }),
      captured: keyOf$8({ onKeyPressCapture: true })
    }
  },
  keyUp: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onKeyUp: true }),
      captured: keyOf$8({ onKeyUpCapture: true })
    }
  },
  load: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onLoad: true }),
      captured: keyOf$8({ onLoadCapture: true })
    }
  },
  loadedData: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onLoadedData: true }),
      captured: keyOf$8({ onLoadedDataCapture: true })
    }
  },
  loadedMetadata: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onLoadedMetadata: true }),
      captured: keyOf$8({ onLoadedMetadataCapture: true })
    }
  },
  loadStart: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onLoadStart: true }),
      captured: keyOf$8({ onLoadStartCapture: true })
    }
  },
  // Note: We do not allow listening to mouseOver events. Instead, use the
  // onMouseEnter/onMouseLeave created by `EnterLeaveEventPlugin`.
  mouseDown: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onMouseDown: true }),
      captured: keyOf$8({ onMouseDownCapture: true })
    }
  },
  mouseMove: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onMouseMove: true }),
      captured: keyOf$8({ onMouseMoveCapture: true })
    }
  },
  mouseOut: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onMouseOut: true }),
      captured: keyOf$8({ onMouseOutCapture: true })
    }
  },
  mouseOver: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onMouseOver: true }),
      captured: keyOf$8({ onMouseOverCapture: true })
    }
  },
  mouseUp: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onMouseUp: true }),
      captured: keyOf$8({ onMouseUpCapture: true })
    }
  },
  paste: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onPaste: true }),
      captured: keyOf$8({ onPasteCapture: true })
    }
  },
  pause: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onPause: true }),
      captured: keyOf$8({ onPauseCapture: true })
    }
  },
  play: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onPlay: true }),
      captured: keyOf$8({ onPlayCapture: true })
    }
  },
  playing: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onPlaying: true }),
      captured: keyOf$8({ onPlayingCapture: true })
    }
  },
  progress: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onProgress: true }),
      captured: keyOf$8({ onProgressCapture: true })
    }
  },
  rateChange: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onRateChange: true }),
      captured: keyOf$8({ onRateChangeCapture: true })
    }
  },
  reset: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onReset: true }),
      captured: keyOf$8({ onResetCapture: true })
    }
  },
  scroll: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onScroll: true }),
      captured: keyOf$8({ onScrollCapture: true })
    }
  },
  seeked: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onSeeked: true }),
      captured: keyOf$8({ onSeekedCapture: true })
    }
  },
  seeking: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onSeeking: true }),
      captured: keyOf$8({ onSeekingCapture: true })
    }
  },
  stalled: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onStalled: true }),
      captured: keyOf$8({ onStalledCapture: true })
    }
  },
  submit: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onSubmit: true }),
      captured: keyOf$8({ onSubmitCapture: true })
    }
  },
  suspend: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onSuspend: true }),
      captured: keyOf$8({ onSuspendCapture: true })
    }
  },
  timeUpdate: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onTimeUpdate: true }),
      captured: keyOf$8({ onTimeUpdateCapture: true })
    }
  },
  touchCancel: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onTouchCancel: true }),
      captured: keyOf$8({ onTouchCancelCapture: true })
    }
  },
  touchEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onTouchEnd: true }),
      captured: keyOf$8({ onTouchEndCapture: true })
    }
  },
  touchMove: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onTouchMove: true }),
      captured: keyOf$8({ onTouchMoveCapture: true })
    }
  },
  touchStart: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onTouchStart: true }),
      captured: keyOf$8({ onTouchStartCapture: true })
    }
  },
  transitionEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onTransitionEnd: true }),
      captured: keyOf$8({ onTransitionEndCapture: true })
    }
  },
  volumeChange: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onVolumeChange: true }),
      captured: keyOf$8({ onVolumeChangeCapture: true })
    }
  },
  waiting: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onWaiting: true }),
      captured: keyOf$8({ onWaitingCapture: true })
    }
  },
  wheel: {
    phasedRegistrationNames: {
      bubbled: keyOf$8({ onWheel: true }),
      captured: keyOf$8({ onWheelCapture: true })
    }
  }
};

var topLevelEventsToDispatchConfig = {
  topAbort: eventTypes$4.abort,
  topAnimationEnd: eventTypes$4.animationEnd,
  topAnimationIteration: eventTypes$4.animationIteration,
  topAnimationStart: eventTypes$4.animationStart,
  topBlur: eventTypes$4.blur,
  topCanPlay: eventTypes$4.canPlay,
  topCanPlayThrough: eventTypes$4.canPlayThrough,
  topClick: eventTypes$4.click,
  topContextMenu: eventTypes$4.contextMenu,
  topCopy: eventTypes$4.copy,
  topCut: eventTypes$4.cut,
  topDoubleClick: eventTypes$4.doubleClick,
  topDrag: eventTypes$4.drag,
  topDragEnd: eventTypes$4.dragEnd,
  topDragEnter: eventTypes$4.dragEnter,
  topDragExit: eventTypes$4.dragExit,
  topDragLeave: eventTypes$4.dragLeave,
  topDragOver: eventTypes$4.dragOver,
  topDragStart: eventTypes$4.dragStart,
  topDrop: eventTypes$4.drop,
  topDurationChange: eventTypes$4.durationChange,
  topEmptied: eventTypes$4.emptied,
  topEncrypted: eventTypes$4.encrypted,
  topEnded: eventTypes$4.ended,
  topError: eventTypes$4.error,
  topFocus: eventTypes$4.focus,
  topInput: eventTypes$4.input,
  topInvalid: eventTypes$4.invalid,
  topKeyDown: eventTypes$4.keyDown,
  topKeyPress: eventTypes$4.keyPress,
  topKeyUp: eventTypes$4.keyUp,
  topLoad: eventTypes$4.load,
  topLoadedData: eventTypes$4.loadedData,
  topLoadedMetadata: eventTypes$4.loadedMetadata,
  topLoadStart: eventTypes$4.loadStart,
  topMouseDown: eventTypes$4.mouseDown,
  topMouseMove: eventTypes$4.mouseMove,
  topMouseOut: eventTypes$4.mouseOut,
  topMouseOver: eventTypes$4.mouseOver,
  topMouseUp: eventTypes$4.mouseUp,
  topPaste: eventTypes$4.paste,
  topPause: eventTypes$4.pause,
  topPlay: eventTypes$4.play,
  topPlaying: eventTypes$4.playing,
  topProgress: eventTypes$4.progress,
  topRateChange: eventTypes$4.rateChange,
  topReset: eventTypes$4.reset,
  topScroll: eventTypes$4.scroll,
  topSeeked: eventTypes$4.seeked,
  topSeeking: eventTypes$4.seeking,
  topStalled: eventTypes$4.stalled,
  topSubmit: eventTypes$4.submit,
  topSuspend: eventTypes$4.suspend,
  topTimeUpdate: eventTypes$4.timeUpdate,
  topTouchCancel: eventTypes$4.touchCancel,
  topTouchEnd: eventTypes$4.touchEnd,
  topTouchMove: eventTypes$4.touchMove,
  topTouchStart: eventTypes$4.touchStart,
  topTransitionEnd: eventTypes$4.transitionEnd,
  topVolumeChange: eventTypes$4.volumeChange,
  topWaiting: eventTypes$4.waiting,
  topWheel: eventTypes$4.wheel
};

for (var type in topLevelEventsToDispatchConfig) {
  topLevelEventsToDispatchConfig[type].dependencies = [type];
}

var ON_CLICK_KEY = keyOf$8({ onClick: null });
var onClickListeners = {};

function getDictionaryKey$1(inst) {
  return '.' + inst._rootNodeID;
}

var SimpleEventPlugin$1 = {

  eventTypes: eventTypes$4,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
    if (!dispatchConfig) {
      return null;
    }
    var EventConstructor;
    switch (topLevelType) {
      case topLevelTypes$6.topAbort:
      case topLevelTypes$6.topCanPlay:
      case topLevelTypes$6.topCanPlayThrough:
      case topLevelTypes$6.topDurationChange:
      case topLevelTypes$6.topEmptied:
      case topLevelTypes$6.topEncrypted:
      case topLevelTypes$6.topEnded:
      case topLevelTypes$6.topError:
      case topLevelTypes$6.topInput:
      case topLevelTypes$6.topInvalid:
      case topLevelTypes$6.topLoad:
      case topLevelTypes$6.topLoadedData:
      case topLevelTypes$6.topLoadedMetadata:
      case topLevelTypes$6.topLoadStart:
      case topLevelTypes$6.topPause:
      case topLevelTypes$6.topPlay:
      case topLevelTypes$6.topPlaying:
      case topLevelTypes$6.topProgress:
      case topLevelTypes$6.topRateChange:
      case topLevelTypes$6.topReset:
      case topLevelTypes$6.topSeeked:
      case topLevelTypes$6.topSeeking:
      case topLevelTypes$6.topStalled:
      case topLevelTypes$6.topSubmit:
      case topLevelTypes$6.topSuspend:
      case topLevelTypes$6.topTimeUpdate:
      case topLevelTypes$6.topVolumeChange:
      case topLevelTypes$6.topWaiting:
        // HTML Events
        // @see http://www.w3.org/TR/html5/index.html#events-0
        EventConstructor = SyntheticEvent$6;
        break;
      case topLevelTypes$6.topKeyPress:
        // Firefox creates a keypress event for function keys too. This removes
        // the unwanted keypress events. Enter is however both printable and
        // non-printable. One would expect Tab to be as well (but it isn't).
        if (getEventCharCode(nativeEvent) === 0) {
          return null;
        }
      /* falls through */
      case topLevelTypes$6.topKeyDown:
      case topLevelTypes$6.topKeyUp:
        EventConstructor = SyntheticKeyboardEvent;
        break;
      case topLevelTypes$6.topBlur:
      case topLevelTypes$6.topFocus:
        EventConstructor = SyntheticFocusEvent;
        break;
      case topLevelTypes$6.topClick:
        // Firefox creates a click event on right mouse clicks. This removes the
        // unwanted click events.
        if (nativeEvent.button === 2) {
          return null;
        }
      /* falls through */
      case topLevelTypes$6.topContextMenu:
      case topLevelTypes$6.topDoubleClick:
      case topLevelTypes$6.topMouseDown:
      case topLevelTypes$6.topMouseMove:
      case topLevelTypes$6.topMouseOut:
      case topLevelTypes$6.topMouseOver:
      case topLevelTypes$6.topMouseUp:
        EventConstructor = SyntheticMouseEvent$2;
        break;
      case topLevelTypes$6.topDrag:
      case topLevelTypes$6.topDragEnd:
      case topLevelTypes$6.topDragEnter:
      case topLevelTypes$6.topDragExit:
      case topLevelTypes$6.topDragLeave:
      case topLevelTypes$6.topDragOver:
      case topLevelTypes$6.topDragStart:
      case topLevelTypes$6.topDrop:
        EventConstructor = SyntheticDragEvent;
        break;
      case topLevelTypes$6.topTouchCancel:
      case topLevelTypes$6.topTouchEnd:
      case topLevelTypes$6.topTouchMove:
      case topLevelTypes$6.topTouchStart:
        EventConstructor = SyntheticTouchEvent;
        break;
      case topLevelTypes$6.topAnimationEnd:
      case topLevelTypes$6.topAnimationIteration:
      case topLevelTypes$6.topAnimationStart:
        EventConstructor = SyntheticAnimationEvent;
        break;
      case topLevelTypes$6.topTransitionEnd:
        EventConstructor = SyntheticTransitionEvent;
        break;
      case topLevelTypes$6.topScroll:
        EventConstructor = SyntheticUIEvent$2;
        break;
      case topLevelTypes$6.topWheel:
        EventConstructor = SyntheticWheelEvent;
        break;
      case topLevelTypes$6.topCopy:
      case topLevelTypes$6.topCut:
      case topLevelTypes$6.topPaste:
        EventConstructor = SyntheticClipboardEvent;
        break;
    }
    !EventConstructor ? _prodInvariant$31('86', topLevelType) : void 0;
    var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
    EventPropagators$5.accumulateTwoPhaseDispatches(event);
    return event;
  },

  didPutListener: function (inst, registrationName, listener) {
    // Mobile Safari does not fire properly bubble click events on
    // non-interactive elements, which means delegated click listeners do not
    // fire. The workaround for this bug involves attaching an empty click
    // listener on the target node.
    if (registrationName === ON_CLICK_KEY) {
      var key = getDictionaryKey$1(inst);
      var node = ReactDOMComponentTree$18.getNodeFromInstance(inst);
      if (!onClickListeners[key]) {
        onClickListeners[key] = EventListener$2.listen(node, 'click', emptyFunction$11);
      }
    }
  },

  willDeleteListener: function (inst, registrationName) {
    if (registrationName === ON_CLICK_KEY) {
      var key = getDictionaryKey$1(inst);
      onClickListeners[key].remove();
      delete onClickListeners[key];
    }
  }

};

var SimpleEventPlugin_1 = SimpleEventPlugin$1;

var BeforeInputEventPlugin = BeforeInputEventPlugin_1;
var ChangeEventPlugin = ChangeEventPlugin_1;
var DefaultEventPluginOrder = DefaultEventPluginOrder_1;
var EnterLeaveEventPlugin = EnterLeaveEventPlugin_1;
var HTMLDOMPropertyConfig = HTMLDOMPropertyConfig_1;
var ReactComponentBrowserEnvironment = ReactComponentBrowserEnvironment_1;
var ReactDOMComponent = ReactDOMComponent_1;
var ReactDOMComponentTree$2 = ReactDOMComponentTree_1;
var ReactDOMEmptyComponent = ReactDOMEmptyComponent_1;
var ReactDOMTreeTraversal = ReactDOMTreeTraversal$1;
var ReactDOMTextComponent = ReactDOMTextComponent_1;
var ReactDefaultBatchingStrategy = ReactDefaultBatchingStrategy_1;
var ReactEventListener = ReactEventListener_1;
var ReactInjection = ReactInjection_1;
var ReactReconcileTransaction = ReactReconcileTransaction_1;
var SVGDOMPropertyConfig = SVGDOMPropertyConfig_1;
var SelectEventPlugin = SelectEventPlugin_1;
var SimpleEventPlugin = SimpleEventPlugin_1;

var alreadyInjected = false;

function inject() {
  if (alreadyInjected) {
    // TODO: This is currently true because these injections are shared between
    // the client and the server package. They should be built independently
    // and not share any injection state. Then this problem will be solved.
    return;
  }
  alreadyInjected = true;

  ReactInjection.EventEmitter.injectReactEventListener(ReactEventListener);

  /**
   * Inject modules for resolving DOM hierarchy and plugin ordering.
   */
  ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
  ReactInjection.EventPluginUtils.injectComponentTree(ReactDOMComponentTree$2);
  ReactInjection.EventPluginUtils.injectTreeTraversal(ReactDOMTreeTraversal);

  /**
   * Some important event plugins included by default (without having to require
   * them).
   */
  ReactInjection.EventPluginHub.injectEventPluginsByName({
    SimpleEventPlugin: SimpleEventPlugin,
    EnterLeaveEventPlugin: EnterLeaveEventPlugin,
    ChangeEventPlugin: ChangeEventPlugin,
    SelectEventPlugin: SelectEventPlugin,
    BeforeInputEventPlugin: BeforeInputEventPlugin
  });

  ReactInjection.HostComponent.injectGenericComponentClass(ReactDOMComponent);

  ReactInjection.HostComponent.injectTextComponentClass(ReactDOMTextComponent);

  ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
  ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);

  ReactInjection.EmptyComponent.injectEmptyComponentFactory(function (instantiate) {
    return new ReactDOMEmptyComponent(instantiate);
  });

  ReactInjection.Updates.injectReconcileTransaction(ReactReconcileTransaction);
  ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);

  ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);
}

var ReactDefaultInjection$1 = {
  inject: inject
};

var DOC_NODE_TYPE$1 = 9;

function ReactDOMContainerInfo$1(topLevelWrapper, node) {
  var info = {
    _topLevelWrapper: topLevelWrapper,
    _idCounter: 1,
    _ownerDocument: node ? node.nodeType === DOC_NODE_TYPE$1 ? node : node.ownerDocument : null,
    _node: node,
    _tag: node ? node.nodeName.toLowerCase() : null,
    _namespaceURI: node ? node.namespaceURI : null
  };
  return info;
}

var ReactDOMContainerInfo_1 = ReactDOMContainerInfo$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMFeatureFlags
 */

var ReactDOMFeatureFlags$1 = {
  useCreateElement: true
};

var ReactDOMFeatureFlags_1 = ReactDOMFeatureFlags$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule adler32
 * 
 */

var MOD = 65521;

// adler32 is not cryptographically strong, and is only used to sanity check that
// markup generated on the server matches the markup generated on the client.
// This implementation (a modified version of the SheetJS version) has been optimized
// for our use case, at the expense of conforming to the adler32 specification
// for non-ascii inputs.
function adler32$1(data) {
  var a = 1;
  var b = 0;
  var i = 0;
  var l = data.length;
  var m = l & ~0x3;
  while (i < m) {
    var n = Math.min(i + 4096, m);
    for (; i < n; i += 4) {
      b += (a += data.charCodeAt(i)) + (a += data.charCodeAt(i + 1)) + (a += data.charCodeAt(i + 2)) + (a += data.charCodeAt(i + 3));
    }
    a %= MOD;
    b %= MOD;
  }
  for (; i < l; i++) {
    b += a += data.charCodeAt(i);
  }
  a %= MOD;
  b %= MOD;
  return a | b << 16;
}

var adler32_1 = adler32$1;

var adler32 = adler32_1;

var TAG_END = /\/?>/;
var COMMENT_START = /^<\!\-\-/;

var ReactMarkupChecksum$1 = {
  CHECKSUM_ATTR_NAME: 'data-react-checksum',

  /**
   * @param {string} markup Markup string
   * @return {string} Markup string with checksum attribute attached
   */
  addChecksumToMarkup: function (markup) {
    var checksum = adler32(markup);

    // Add checksum (handle both parent tags, comments and self-closing tags)
    if (COMMENT_START.test(markup)) {
      return markup;
    } else {
      return markup.replace(TAG_END, ' ' + ReactMarkupChecksum$1.CHECKSUM_ATTR_NAME + '="' + checksum + '"$&');
    }
  },

  /**
   * @param {string} markup to use
   * @param {DOMElement} element root React element
   * @returns {boolean} whether or not the markup is the same
   */
  canReuseMarkup: function (markup, element) {
    var existingChecksum = element.getAttribute(ReactMarkupChecksum$1.CHECKSUM_ATTR_NAME);
    existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
    var markupChecksum = adler32(markup);
    return markupChecksum === existingChecksum;
  }
};

var ReactMarkupChecksum_1 = ReactMarkupChecksum$1;

var _prodInvariant$32 = reactProdInvariant_1;

var DOMLazyTree$6 = DOMLazyTree_1;
var DOMProperty$6 = DOMProperty_1;
var ReactBrowserEventEmitter$4 = ReactBrowserEventEmitter_1;
var ReactDOMComponentTree$19 = ReactDOMComponentTree_1;
var ReactDOMContainerInfo = ReactDOMContainerInfo_1;
var ReactDOMFeatureFlags = ReactDOMFeatureFlags_1;
var ReactElement$10 = ReactElement_1;
var ReactFeatureFlags$2 = ReactFeatureFlags_1;
var ReactInstanceMap$4 = ReactInstanceMap_1;
var ReactMarkupChecksum = ReactMarkupChecksum_1;
var ReactReconciler$6 = ReactReconciler_1;
var ReactUpdateQueue$3 = ReactUpdateQueue_1;
var ReactUpdates$10 = ReactUpdates_1;

var emptyObject$5 = emptyObject_1;
var instantiateReactComponent$2 = instantiateReactComponent_1;
var setInnerHTML$4 = setInnerHTML_1;
var shouldUpdateReactComponent$3 = shouldUpdateReactComponent_1;
var ATTR_NAME$1 = DOMProperty$6.ID_ATTRIBUTE_NAME;
var ROOT_ATTR_NAME = DOMProperty$6.ROOT_ATTRIBUTE_NAME;

var ELEMENT_NODE_TYPE$1 = 1;
var DOC_NODE_TYPE = 9;
var DOCUMENT_FRAGMENT_NODE_TYPE$1 = 11;

var instancesByReactRootID = {};

/**
 * Finds the index of the first character
 * that's not common between the two given strings.
 *
 * @return {number} the index of the character where the strings diverge
 */
function firstDifferenceIndex(string1, string2) {
  var minLen = Math.min(string1.length, string2.length);
  for (var i = 0; i < minLen; i++) {
    if (string1.charAt(i) !== string2.charAt(i)) {
      return i;
    }
  }
  return string1.length === string2.length ? -1 : minLen;
}

/**
 * @param {DOMElement|DOMDocument} container DOM element that may contain
 * a React component
 * @return {?*} DOM element that may have the reactRoot ID, or null.
 */
function getReactRootElementInContainer(container) {
  if (!container) {
    return null;
  }

  if (container.nodeType === DOC_NODE_TYPE) {
    return container.documentElement;
  } else {
    return container.firstChild;
  }
}

function internalGetID(node) {
  // If node is something like a window, document, or text node, none of
  // which support attributes or a .getAttribute method, gracefully return
  // the empty string, as if the attribute were missing.
  return node.getAttribute && node.getAttribute(ATTR_NAME$1) || '';
}

/**
 * Mounts this component and inserts it into the DOM.
 *
 * @param {ReactComponent} componentInstance The instance to mount.
 * @param {DOMElement} container DOM element to mount into.
 * @param {ReactReconcileTransaction} transaction
 * @param {boolean} shouldReuseMarkup If true, do not insert markup
 */
function mountComponentIntoNode(wrapperInstance, container, transaction, shouldReuseMarkup, context) {
  var markerName;
  if (ReactFeatureFlags$2.logTopLevelRenders) {
    var wrappedElement = wrapperInstance._currentElement.props;
    var type = wrappedElement.type;
    markerName = 'React mount: ' + (typeof type === 'string' ? type : type.displayName || type.name);
    console.time(markerName);
  }

  var markup = ReactReconciler$6.mountComponent(wrapperInstance, transaction, null, ReactDOMContainerInfo(wrapperInstance, container), context);

  if (markerName) {
    console.timeEnd(markerName);
  }

  wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance;
  ReactMount$1._mountImageIntoNode(markup, container, wrapperInstance, shouldReuseMarkup, transaction);
}

/**
 * Batched mount.
 *
 * @param {ReactComponent} componentInstance The instance to mount.
 * @param {DOMElement} container DOM element to mount into.
 * @param {boolean} shouldReuseMarkup If true, do not insert markup
 */
function batchedMountComponentIntoNode(componentInstance, container, shouldReuseMarkup, context) {
  var transaction = ReactUpdates$10.ReactReconcileTransaction.getPooled(
  /* useCreateElement */
  !shouldReuseMarkup && ReactDOMFeatureFlags.useCreateElement);
  transaction.perform(mountComponentIntoNode, null, componentInstance, container, transaction, shouldReuseMarkup, context);
  ReactUpdates$10.ReactReconcileTransaction.release(transaction);
}

/**
 * Unmounts a component and removes it from the DOM.
 *
 * @param {ReactComponent} instance React component instance.
 * @param {DOMElement} container DOM element to unmount from.
 * @final
 * @internal
 * @see {ReactMount.unmountComponentAtNode}
 */
function unmountComponentFromNode(instance, container, safely) {
  ReactReconciler$6.unmountComponent(instance, safely);
  if (container.nodeType === DOC_NODE_TYPE) {
    container = container.documentElement;
  }

  // http://jsperf.com/emptying-a-node
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
}

/**
 * True if the supplied DOM node has a direct React-rendered child that is
 * not a React root element. Useful for warning in `render`,
 * `unmountComponentAtNode`, etc.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @return {boolean} True if the DOM element contains a direct child that was
 * rendered by React but is not a root element.
 * @internal
 */
function hasNonRootReactChild(container) {
  var rootEl = getReactRootElementInContainer(container);
  if (rootEl) {
    var inst = ReactDOMComponentTree$19.getInstanceFromNode(rootEl);
    return !!(inst && inst._hostParent);
  }
}

function getHostRootInstanceInContainer(container) {
  var rootEl = getReactRootElementInContainer(container);
  var prevHostInstance = rootEl && ReactDOMComponentTree$19.getInstanceFromNode(rootEl);
  return prevHostInstance && !prevHostInstance._hostParent ? prevHostInstance : null;
}

function getTopLevelWrapperInContainer(container) {
  var root = getHostRootInstanceInContainer(container);
  return root ? root._hostContainerInfo._topLevelWrapper : null;
}

/**
 * Temporary (?) hack so that we can store all top-level pending updates on
 * composites instead of having to worry about different types of components
 * here.
 */
var topLevelRootCounter = 1;
var TopLevelWrapper = function () {
  this.rootID = topLevelRootCounter++;
};
TopLevelWrapper.prototype.isReactComponent = {};
TopLevelWrapper.prototype.render = function () {
  // this.props is actually a ReactElement
  return this.props;
};

/**
 * Mounting is the process of initializing a React component by creating its
 * representative DOM elements and inserting them into a supplied `container`.
 * Any prior content inside `container` is destroyed in the process.
 *
 *   ReactMount.render(
 *     component,
 *     document.getElementById('container')
 *   );
 *
 *   <div id="container">                   <-- Supplied `container`.
 *     <div data-reactid=".3">              <-- Rendered reactRoot of React
 *       // ...                                 component.
 *     </div>
 *   </div>
 *
 * Inside of `container`, the first element rendered is the "reactRoot".
 */
var ReactMount$1 = {

  TopLevelWrapper: TopLevelWrapper,

  /**
   * Used by devtools. The keys are not important.
   */
  _instancesByReactRootID: instancesByReactRootID,

  /**
   * This is a hook provided to support rendering React components while
   * ensuring that the apparent scroll position of its `container` does not
   * change.
   *
   * @param {DOMElement} container The `container` being rendered into.
   * @param {function} renderCallback This must be called once to do the render.
   */
  scrollMonitor: function (container, renderCallback) {
    renderCallback();
  },

  /**
   * Take a component that's already mounted into the DOM and replace its props
   * @param {ReactComponent} prevComponent component instance already in the DOM
   * @param {ReactElement} nextElement component instance to render
   * @param {DOMElement} container container to render into
   * @param {?function} callback function triggered on completion
   */
  _updateRootComponent: function (prevComponent, nextElement, nextContext, container, callback) {
    ReactMount$1.scrollMonitor(container, function () {
      ReactUpdateQueue$3.enqueueElementInternal(prevComponent, nextElement, nextContext);
      if (callback) {
        ReactUpdateQueue$3.enqueueCallbackInternal(prevComponent, callback);
      }
    });

    return prevComponent;
  },

  /**
   * Render a new component into the DOM. Hooked by devtools!
   *
   * @param {ReactElement} nextElement element to render
   * @param {DOMElement} container container to render into
   * @param {boolean} shouldReuseMarkup if we should skip the markup insertion
   * @return {ReactComponent} nextComponent
   */
  _renderNewRootComponent: function (nextElement, container, shouldReuseMarkup, context) {
    // Various parts of our code (such as ReactCompositeComponent's
    // _renderValidatedComponent) assume that calls to render aren't nested;
    // verify that that's the case.
    void 0;

    !(container && (container.nodeType === ELEMENT_NODE_TYPE$1 || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE$1)) ? _prodInvariant$32('37') : void 0;

    ReactBrowserEventEmitter$4.ensureScrollValueMonitoring();
    var componentInstance = instantiateReactComponent$2(nextElement, false);

    // The initial render is synchronous but any updates that happen during
    // rendering, in componentWillMount or componentDidMount, will be batched
    // according to the current batching strategy.

    ReactUpdates$10.batchedUpdates(batchedMountComponentIntoNode, componentInstance, container, shouldReuseMarkup, context);

    var wrapperID = componentInstance._instance.rootID;
    instancesByReactRootID[wrapperID] = componentInstance;

    return componentInstance;
  },

  /**
   * Renders a React component into the DOM in the supplied `container`.
   *
   * If the React component was previously rendered into `container`, this will
   * perform an update on it and only mutate the DOM as necessary to reflect the
   * latest React component.
   *
   * @param {ReactComponent} parentComponent The conceptual parent of this render tree.
   * @param {ReactElement} nextElement Component element to render.
   * @param {DOMElement} container DOM element to render into.
   * @param {?function} callback function triggered on completion
   * @return {ReactComponent} Component instance rendered in `container`.
   */
  renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
    !(parentComponent != null && ReactInstanceMap$4.has(parentComponent)) ? _prodInvariant$32('38') : void 0;
    return ReactMount$1._renderSubtreeIntoContainer(parentComponent, nextElement, container, callback);
  },

  _renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
    ReactUpdateQueue$3.validateCallback(callback, 'ReactDOM.render');
    !ReactElement$10.isValidElement(nextElement) ? _prodInvariant$32('39', typeof nextElement === 'string' ? ' Instead of passing a string like \'div\', pass ' + 'React.createElement(\'div\') or <div />.' : typeof nextElement === 'function' ? ' Instead of passing a class like Foo, pass ' + 'React.createElement(Foo) or <Foo />.' : nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : void 0;

    void 0;

    var nextWrappedElement = ReactElement$10(TopLevelWrapper, null, null, null, null, null, nextElement);

    var nextContext;
    if (parentComponent) {
      var parentInst = ReactInstanceMap$4.get(parentComponent);
      nextContext = parentInst._processChildContext(parentInst._context);
    } else {
      nextContext = emptyObject$5;
    }

    var prevComponent = getTopLevelWrapperInContainer(container);

    if (prevComponent) {
      var prevWrappedElement = prevComponent._currentElement;
      var prevElement = prevWrappedElement.props;
      if (shouldUpdateReactComponent$3(prevElement, nextElement)) {
        var publicInst = prevComponent._renderedComponent.getPublicInstance();
        var updatedCallback = callback && function () {
          callback.call(publicInst);
        };
        ReactMount$1._updateRootComponent(prevComponent, nextWrappedElement, nextContext, container, updatedCallback);
        return publicInst;
      } else {
        ReactMount$1.unmountComponentAtNode(container);
      }
    }

    var reactRootElement = getReactRootElementInContainer(container);
    var containerHasReactMarkup = reactRootElement && !!internalGetID(reactRootElement);
    var containerHasNonRootReactChild = hasNonRootReactChild(container);

    var shouldReuseMarkup = containerHasReactMarkup && !prevComponent && !containerHasNonRootReactChild;
    var component = ReactMount$1._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, nextContext)._renderedComponent.getPublicInstance();
    if (callback) {
      callback.call(component);
    }
    return component;
  },

  /**
   * Renders a React component into the DOM in the supplied `container`.
   * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.render
   *
   * If the React component was previously rendered into `container`, this will
   * perform an update on it and only mutate the DOM as necessary to reflect the
   * latest React component.
   *
   * @param {ReactElement} nextElement Component element to render.
   * @param {DOMElement} container DOM element to render into.
   * @param {?function} callback function triggered on completion
   * @return {ReactComponent} Component instance rendered in `container`.
   */
  render: function (nextElement, container, callback) {
    return ReactMount$1._renderSubtreeIntoContainer(null, nextElement, container, callback);
  },

  /**
   * Unmounts and destroys the React component rendered in the `container`.
   * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.unmountcomponentatnode
   *
   * @param {DOMElement} container DOM element containing a React component.
   * @return {boolean} True if a component was found in and unmounted from
   *                   `container`
   */
  unmountComponentAtNode: function (container) {
    // Various parts of our code (such as ReactCompositeComponent's
    // _renderValidatedComponent) assume that calls to render aren't nested;
    // verify that that's the case. (Strictly speaking, unmounting won't cause a
    // render but we still don't expect to be in a render call here.)
    void 0;

    !(container && (container.nodeType === ELEMENT_NODE_TYPE$1 || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE$1)) ? _prodInvariant$32('40') : void 0;

    var prevComponent = getTopLevelWrapperInContainer(container);
    if (!prevComponent) {
      // Check if the node being unmounted was rendered by React, but isn't a
      // root node.
      var containerHasNonRootReactChild = hasNonRootReactChild(container);

      // Check if the container itself is a React root node.
      var isContainerReactRoot = container.nodeType === 1 && container.hasAttribute(ROOT_ATTR_NAME);

      return false;
    }
    delete instancesByReactRootID[prevComponent._instance.rootID];
    ReactUpdates$10.batchedUpdates(unmountComponentFromNode, prevComponent, container, false);
    return true;
  },

  _mountImageIntoNode: function (markup, container, instance, shouldReuseMarkup, transaction) {
    !(container && (container.nodeType === ELEMENT_NODE_TYPE$1 || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE$1)) ? _prodInvariant$32('41') : void 0;

    if (shouldReuseMarkup) {
      var rootElement = getReactRootElementInContainer(container);
      if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
        ReactDOMComponentTree$19.precacheNode(instance, rootElement);
        return;
      } else {
        var checksum = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
        rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);

        var rootMarkup = rootElement.outerHTML;
        rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, checksum);

        var normalizedMarkup = markup;
        var diffIndex = firstDifferenceIndex(normalizedMarkup, rootMarkup);
        var difference = ' (client) ' + normalizedMarkup.substring(diffIndex - 20, diffIndex + 20) + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);

        !(container.nodeType !== DOC_NODE_TYPE) ? _prodInvariant$32('42', difference) : void 0;

        
      }
    }

    !(container.nodeType !== DOC_NODE_TYPE) ? _prodInvariant$32('43') : void 0;

    if (transaction.useCreateElement) {
      while (container.lastChild) {
        container.removeChild(container.lastChild);
      }
      DOMLazyTree$6.insertTreeBefore(container, markup, null);
    } else {
      setInnerHTML$4(container, markup);
      ReactDOMComponentTree$19.precacheNode(instance, container.firstChild);
    }

    
  }
};

var ReactMount_1 = ReactMount$1;

var ReactNodeTypes$2 = ReactNodeTypes_1;

function getHostComponentFromComposite$2(inst) {
  var type;

  while ((type = inst._renderedNodeType) === ReactNodeTypes$2.COMPOSITE) {
    inst = inst._renderedComponent;
  }

  if (type === ReactNodeTypes$2.HOST) {
    return inst._renderedComponent;
  } else if (type === ReactNodeTypes$2.EMPTY) {
    return null;
  }
}

var getHostComponentFromComposite_1 = getHostComponentFromComposite$2;

var _prodInvariant$33 = reactProdInvariant_1;

var ReactDOMComponentTree$20 = ReactDOMComponentTree_1;
var ReactInstanceMap$5 = ReactInstanceMap_1;

var getHostComponentFromComposite$1 = getHostComponentFromComposite_1;
function findDOMNode$1(componentOrElement) {
  if (componentOrElement == null) {
    return null;
  }
  if (componentOrElement.nodeType === 1) {
    return componentOrElement;
  }

  var inst = ReactInstanceMap$5.get(componentOrElement);
  if (inst) {
    inst = getHostComponentFromComposite$1(inst);
    return inst ? ReactDOMComponentTree$20.getNodeFromInstance(inst) : null;
  }

  if (typeof componentOrElement.render === 'function') {
    _prodInvariant$33('44');
  } else {
    _prodInvariant$33('45', Object.keys(componentOrElement));
  }
}

var findDOMNode_1 = findDOMNode$1;

var ReactMount$2 = ReactMount_1;

var renderSubtreeIntoContainer$1 = ReactMount$2.renderSubtreeIntoContainer;

var ReactDOMComponentTree = ReactDOMComponentTree_1;
var ReactDefaultInjection = ReactDefaultInjection$1;
var ReactMount = ReactMount_1;
var ReactReconciler = ReactReconciler_1;
var ReactUpdates = ReactUpdates_1;
var ReactVersion$3 = ReactVersion$1;

var findDOMNode = findDOMNode_1;
var getHostComponentFromComposite = getHostComponentFromComposite_1;
var renderSubtreeIntoContainer = renderSubtreeIntoContainer$1;
ReactDefaultInjection.inject();

var ReactDOM = {
  findDOMNode: findDOMNode,
  render: ReactMount.render,
  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
  version: ReactVersion$3,

  /* eslint-disable camelcase */
  unstable_batchedUpdates: ReactUpdates.batchedUpdates,
  unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
};

// Inject the runtime into a devtools global hook regardless of browser.
// Allows for debugging when the hook is injected on the page.
/* eslint-enable camelcase */
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
    ComponentTree: {
      getClosestInstanceFromNode: ReactDOMComponentTree.getClosestInstanceFromNode,
      getNodeFromInstance: function (inst) {
        // inst is an internal instance (but could be a composite)
        if (inst._renderedComponent) {
          inst = getHostComponentFromComposite(inst);
        }
        if (inst) {
          return ReactDOMComponentTree.getNodeFromInstance(inst);
        } else {
          return null;
        }
      }
    },
    Mount: ReactMount,
    Reconciler: ReactReconciler
  });
}

var ReactDOM_1 = ReactDOM;

var index$3 = ReactDOM_1;

var index_1 = index$3.render;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

var Symbol$1 = root.Symbol;

var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$6.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$5.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var ponyfill = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}
});

var index$6 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = ponyfill;

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof commonjsGlobal !== 'undefined') {
  root = commonjsGlobal;
} else {
  root = module;
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
});

var index$5 = index$6;

var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[index$5] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[index$5] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning$33(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

function isCrushed() {}

if ("production" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning$33('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof commonjsGlobal !== 'undefined' && commonjsGlobal;
var _root = __window || __global || __self;
var root_1$1 = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();
//# sourceMappingURL=root.js.map

var root$2 = {
	root: root_1$1
};

function isFunction(x) {
    return typeof x === 'function';
}
var isFunction_2 = isFunction;
//# sourceMappingURL=isFunction.js.map

var isFunction_1$1 = {
	isFunction: isFunction_2
};

var isArray_1$1 = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

var isArray = {
	isArray: isArray_1$1
};

function isObject(x) {
    return x != null && typeof x === 'object';
}
var isObject_2 = isObject;
//# sourceMappingURL=isObject.js.map

var isObject_1$1 = {
	isObject: isObject_2
};

var errorObject_1$2 = { e: {} };
//# sourceMappingURL=errorObject.js.map

var errorObject = {
	errorObject: errorObject_1$2
};

var errorObject_1$1 = errorObject;
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1$1.errorObject.e = e;
        return errorObject_1$1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
var tryCatch_2 = tryCatch;

//# sourceMappingURL=tryCatch.js.map

var tryCatch_1$1 = {
	tryCatch: tryCatch_2
};

var __extends$2 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends$2(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
var UnsubscriptionError_2 = UnsubscriptionError;
//# sourceMappingURL=UnsubscriptionError.js.map

var UnsubscriptionError_1$1 = {
	UnsubscriptionError: UnsubscriptionError_2
};

var isArray_1 = isArray;
var isObject_1 = isObject_1$1;
var isFunction_1$3 = isFunction_1$1;
var tryCatch_1 = tryCatch_1$1;
var errorObject_1 = errorObject;
var UnsubscriptionError_1 = UnsubscriptionError_1$1;
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1$3.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
var Subscription_2 = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

var Subscription_1$2 = {
	Subscription: Subscription_2
};

var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

var Observer = {
	empty: empty
};

var rxSubscriber = createCommonjsModule(function (module, exports) {
"use strict";
var root_1 = root$2;
var Symbol = root_1.root.Symbol;
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map
});

var __extends$1 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = isFunction_1$1;
var Subscription_1$1 = Subscription_1$2;
var Observer_1$1 = Observer;
var rxSubscriber_1$2 = rxSubscriber;
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends$1(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1$1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1$1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1$2.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1$1.Subscription));
var Subscriber_2 = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends$1(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1$1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map

var Subscriber_1$2 = {
	Subscriber: Subscriber_2
};

var Subscriber_1$1 = Subscriber_1$2;
var rxSubscriber_1$1 = rxSubscriber;
var Observer_1 = Observer;
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1$1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1$1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1$1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1$1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1$1.Subscriber(nextOrObserver, error, complete);
}
var toSubscriber_2 = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

var toSubscriber_1$1 = {
	toSubscriber: toSubscriber_2
};

var observable = createCommonjsModule(function (module, exports) {
"use strict";
var root_1 = root$2;
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;
//# sourceMappingURL=observable.js.map
});

var root_1 = root$2;
var toSubscriber_1 = toSubscriber_1$1;
var observable_1 = observable;
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is  called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable$$1 = new Observable();
        observable$$1.source = this;
        observable$$1.operator = operator;
        return observable$$1;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observables internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remote this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2,5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
var Observable_2 = Observable;
//# sourceMappingURL=Observable.js.map

var Observable_1$1 = {
	Observable: Observable_2
};

var __extends$3 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends$3(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
var ObjectUnsubscribedError_2 = ObjectUnsubscribedError;
//# sourceMappingURL=ObjectUnsubscribedError.js.map

var ObjectUnsubscribedError_1$1 = {
	ObjectUnsubscribedError: ObjectUnsubscribedError_2
};

var __extends$4 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1$4 = Subscription_1$2;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = (function (_super) {
    __extends$4(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_1$4.Subscription));
var SubjectSubscription_2 = SubjectSubscription;
//# sourceMappingURL=SubjectSubscription.js.map

var SubjectSubscription_1$1 = {
	SubjectSubscription: SubjectSubscription_2
};

var __extends = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = Observable_1$1;
var Subscriber_1 = Subscriber_1$2;
var Subscription_1 = Subscription_1$2;
var ObjectUnsubscribedError_1 = ObjectUnsubscribedError_1$1;
var SubjectSubscription_1 = SubjectSubscription_1$1;
var rxSubscriber_1 = rxSubscriber;
/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = (function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(Subscriber_1.Subscriber));
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[rxSubscriber_1.rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
var Subject_2 = Subject;
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));

var __extends$5 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1$4 = Subscriber_1$2;
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    if (typeof project !== 'function') {
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.lift(new MapOperator(project, thisArg));
}
var map_2 = map;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
var MapOperator_1 = MapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapSubscriber = (function (_super) {
    __extends$5(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_1$4.Subscriber));
//# sourceMappingURL=map.js.map

var map_1 = {
	map: map_2,
	MapOperator: MapOperator_1
};

var __extends$7 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1$5 = Subscriber_1$2;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = (function (_super) {
    __extends$7(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber_1$5.Subscriber));
var OuterSubscriber_2 = OuterSubscriber;
//# sourceMappingURL=OuterSubscriber.js.map

var OuterSubscriber_1$1 = {
	OuterSubscriber: OuterSubscriber_2
};

var isArrayLike_1$1 = (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArrayLike.js.map

var isArrayLike = {
	isArrayLike: isArrayLike_1$1
};

function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
var isPromise_2 = isPromise;
//# sourceMappingURL=isPromise.js.map

var isPromise_1$1 = {
	isPromise: isPromise_2
};

var iterator = createCommonjsModule(function (module, exports) {
"use strict";
var root_1 = root$2;
function symbolIteratorPonyfill(root) {
    var Symbol = root.Symbol;
    if (typeof Symbol === 'function') {
        if (!Symbol.iterator) {
            Symbol.iterator = Symbol('iterator polyfill');
        }
        return Symbol.iterator;
    }
    else {
        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
        var Set_1 = root.Set;
        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
            return '@@iterator';
        }
        var Map_1 = root.Map;
        // required for compatability with es6-shim
        if (Map_1) {
            var keys = Object.getOwnPropertyNames(Map_1.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
                    return key;
                }
            }
        }
        return '@@iterator';
    }
}
exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
exports.iterator = symbolIteratorPonyfill(root_1.root);
/**
 * @deprecated use iterator instead
 */
exports.$$iterator = exports.iterator;
//# sourceMappingURL=iterator.js.map
});

var __extends$8 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1$6 = Subscriber_1$2;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = (function (_super) {
    __extends$8(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber_1$6.Subscriber));
var InnerSubscriber_2 = InnerSubscriber;
//# sourceMappingURL=InnerSubscriber.js.map

var InnerSubscriber_1$1 = {
	InnerSubscriber: InnerSubscriber_2
};

var root_1$2 = root$2;
var isArrayLike_1 = isArrayLike;
var isPromise_1 = isPromise_1$1;
var isObject_1$3 = isObject_1$1;
var Observable_1$3 = Observable_1$1;
var iterator_1 = iterator;
var InnerSubscriber_1 = InnerSubscriber_1$1;
var observable_1$2 = observable;
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof Observable_1$3.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        }
        else {
            return result.subscribe(destination);
        }
    }
    else if (isArrayLike_1.isArrayLike(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (isPromise_1.isPromise(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            root_1$2.root.setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (result && typeof result[iterator_1.iterator] === 'function') {
        var iterator$$1 = result[iterator_1.iterator]();
        do {
            var item = iterator$$1.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (result && typeof result[observable_1$2.observable] === 'function') {
        var obs = result[observable_1$2.observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        var value = isObject_1$3.isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = ("You provided " + value + " where a stream was expected.")
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}
var subscribeToResult_2 = subscribeToResult;
//# sourceMappingURL=subscribeToResult.js.map

var subscribeToResult_1$1 = {
	subscribeToResult: subscribeToResult_2
};

var __extends$6 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = OuterSubscriber_1$1;
var subscribeToResult_1 = subscribeToResult_1$1;
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, emitting values only from the most recently projected Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link switch}.</span>
 *
 * <img src="./img/switchMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each time it observes one of these
 * inner Observables, the output Observable begins emitting the items emitted by
 * that inner Observable. When a new inner Observable is emitted, `switchMap`
 * stops emitting items from the earlier-emitted inner Observable and begins
 * emitting items from the new one. It continues to behave like this for
 * subsequent inner Observables.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switch}
 * @see {@link switchMapTo}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking only the values from the most recently
 * projected inner Observable.
 * @method switchMap
 * @owner Observable
 */
function switchMap(project, resultSelector) {
    return this.lift(new SwitchMapOperator(project, resultSelector));
}
var switchMap_2 = switchMap;
var SwitchMapOperator = (function () {
    function SwitchMapOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
    }
    SwitchMapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
    };
    return SwitchMapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchMapSubscriber = (function (_super) {
    __extends$6(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project, resultSelector) {
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.index = 0;
    }
    SwitchMapSubscriber.prototype._next = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    };
    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = null;
    };
    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    SwitchMapSubscriber.prototype._tryNotifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return SwitchMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=switchMap.js.map

var __extends$10 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1$5 = Observable_1$1;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ScalarObservable = (function (_super) {
    __extends$10(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
        if (scheduler) {
            this._isScalar = false;
        }
    }
    ScalarObservable.create = function (value, scheduler) {
        return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function (state) {
        var done = state.done, value = state.value, subscriber = state.subscriber;
        if (done) {
            subscriber.complete();
            return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
            return;
        }
        state.done = true;
        this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function (subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value: value, subscriber: subscriber
            });
        }
        else {
            subscriber.next(value);
            if (!subscriber.closed) {
                subscriber.complete();
            }
        }
    };
    return ScalarObservable;
}(Observable_1$5.Observable));
var ScalarObservable_2 = ScalarObservable;
//# sourceMappingURL=ScalarObservable.js.map

var ScalarObservable_1$1 = {
	ScalarObservable: ScalarObservable_2
};

var __extends$11 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1$6 = Observable_1$1;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var EmptyObservable = (function (_super) {
    __extends$11(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then complete.</caption>
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following to the console:
     * // x is equal to the count on the interval eg(0,1,2,3,...)
     * // x will occur every 1000ms
     * // if x % 2 is equal to 1 print abc
     * // if x % 2 is not equal to 1 nothing will be output
     *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emission of the complete notification.
     * @return {Observable} An "empty" Observable: emits only the complete
     * notification.
     * @static true
     * @name empty
     * @owner Observable
     */
    EmptyObservable.create = function (scheduler) {
        return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (arg) {
        var subscriber = arg.subscriber;
        subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
        }
        else {
            subscriber.complete();
        }
    };
    return EmptyObservable;
}(Observable_1$6.Observable));
var EmptyObservable_2 = EmptyObservable;
//# sourceMappingURL=EmptyObservable.js.map

var EmptyObservable_1$1 = {
	EmptyObservable: EmptyObservable_2
};

function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
var isScheduler_2 = isScheduler;
//# sourceMappingURL=isScheduler.js.map

var isScheduler_1$1 = {
	isScheduler: isScheduler_2
};

var __extends$9 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1$4 = Observable_1$1;
var ScalarObservable_1 = ScalarObservable_1$1;
var EmptyObservable_1 = EmptyObservable_1$1;
var isScheduler_1 = isScheduler_1$1;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayObservable = (function (_super) {
    __extends$9(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    /**
     * Creates an Observable that emits some values you specify as arguments,
     * immediately one after the other, and then emits a complete notification.
     *
     * <span class="informal">Emits the arguments you provide, then completes.
     * </span>
     *
     * <img src="./img/of.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the arguments given, and the complete notification thereafter. It can
     * be used for composing with other Observables, such as with {@link concat}.
     * By default, it uses a `null` IScheduler, which means the `next`
     * notifications are sent synchronously, although with a different IScheduler
     * it is possible to determine when those notifications will be delivered.
     *
     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
     * var numbers = Rx.Observable.of(10, 20, 30);
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var interval = Rx.Observable.interval(1000);
     * var result = numbers.concat(letters).concat(interval);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link throw}
     *
     * @param {...T} values Arguments that represent `next` values to be emitted.
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emissions of the `next` notifications.
     * @return {Observable<T>} An Observable that emits each given input value.
     * @static true
     * @name of
     * @owner Observable
     */
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
        }
        else {
            return new EmptyObservable_1.EmptyObservable(scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
}(Observable_1$4.Observable));
var ArrayObservable_2 = ArrayObservable;
//# sourceMappingURL=ArrayObservable.js.map

var ArrayObservable_1$1 = {
	ArrayObservable: ArrayObservable_2
};

var ArrayObservable_1 = ArrayObservable_1$1;
var of_1 = ArrayObservable_1.ArrayObservable.of;
//# sourceMappingURL=of.js.map

var __extends$13 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1$3 = root$2;
var Observable_1$8 = Observable_1$1;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var PromiseObservable = (function (_super) {
    __extends$13(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
        _super.call(this);
        this.promise = promise;
        this.scheduler = scheduler;
    }
    /**
     * Converts a Promise to an Observable.
     *
     * <span class="informal">Returns an Observable that just emits the Promise's
     * resolved value, then completes.</span>
     *
     * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
     * Observable. If the Promise resolves with a value, the output Observable
     * emits that resolved value as a `next`, and then completes. If the Promise
     * is rejected, then the output Observable emits the corresponding Error.
     *
     * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
     * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link bindCallback}
     * @see {@link from}
     *
     * @param {PromiseLike<T>} promise The promise to be converted.
     * @param {Scheduler} [scheduler] An optional IScheduler to use for scheduling
     * the delivery of the resolved value (or the rejection).
     * @return {Observable<T>} An Observable which wraps the Promise.
     * @static true
     * @name fromPromise
     * @owner Observable
     */
    PromiseObservable.create = function (promise, scheduler) {
        return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var promise = this.promise;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    subscriber.next(this.value);
                    subscriber.complete();
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.error(err);
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root_1$3.root.setTimeout(function () { throw err; });
                });
            }
        }
        else {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root_1$3.root.setTimeout(function () { throw err; });
                });
            }
        }
    };
    return PromiseObservable;
}(Observable_1$8.Observable));
var PromiseObservable_2 = PromiseObservable;
function dispatchNext(arg) {
    var value = arg.value, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
    }
}
function dispatchError(arg) {
    var err = arg.err, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.error(err);
    }
}
//# sourceMappingURL=PromiseObservable.js.map

var PromiseObservable_1$1 = {
	PromiseObservable: PromiseObservable_2
};

var __extends$14 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1$4 = root$2;
var Observable_1$9 = Observable_1$1;
var iterator_1$3 = iterator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IteratorObservable = (function (_super) {
    __extends$14(IteratorObservable, _super);
    function IteratorObservable(iterator$$1, scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
        if (iterator$$1 == null) {
            throw new Error('iterator cannot be null.');
        }
        this.iterator = getIterator(iterator$$1);
    }
    IteratorObservable.create = function (iterator$$1, scheduler) {
        return new IteratorObservable(iterator$$1, scheduler);
    };
    IteratorObservable.dispatch = function (state) {
        var index = state.index, hasError = state.hasError, iterator$$1 = state.iterator, subscriber = state.subscriber;
        if (hasError) {
            subscriber.error(state.error);
            return;
        }
        var result = iterator$$1.next();
        if (result.done) {
            subscriber.complete();
            return;
        }
        subscriber.next(result.value);
        state.index = index + 1;
        if (subscriber.closed) {
            if (typeof iterator$$1.return === 'function') {
                iterator$$1.return();
            }
            return;
        }
        this.schedule(state);
    };
    IteratorObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, iterator$$1 = _a.iterator, scheduler = _a.scheduler;
        if (scheduler) {
            return scheduler.schedule(IteratorObservable.dispatch, 0, {
                index: index, iterator: iterator$$1, subscriber: subscriber
            });
        }
        else {
            do {
                var result = iterator$$1.next();
                if (result.done) {
                    subscriber.complete();
                    break;
                }
                else {
                    subscriber.next(result.value);
                }
                if (subscriber.closed) {
                    if (typeof iterator$$1.return === 'function') {
                        iterator$$1.return();
                    }
                    break;
                }
            } while (true);
        }
    };
    return IteratorObservable;
}(Observable_1$9.Observable));
var IteratorObservable_2 = IteratorObservable;
var StringIterator = (function () {
    function StringIterator(str, idx, len) {
        if (idx === void 0) { idx = 0; }
        if (len === void 0) { len = str.length; }
        this.str = str;
        this.idx = idx;
        this.len = len;
    }
    StringIterator.prototype[iterator_1$3.iterator] = function () { return (this); };
    StringIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.str.charAt(this.idx++)
        } : {
            done: true,
            value: undefined
        };
    };
    return StringIterator;
}());
var ArrayIterator = (function () {
    function ArrayIterator(arr, idx, len) {
        if (idx === void 0) { idx = 0; }
        if (len === void 0) { len = toLength(arr); }
        this.arr = arr;
        this.idx = idx;
        this.len = len;
    }
    ArrayIterator.prototype[iterator_1$3.iterator] = function () { return this; };
    ArrayIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.arr[this.idx++]
        } : {
            done: true,
            value: undefined
        };
    };
    return ArrayIterator;
}());
function getIterator(obj) {
    var i = obj[iterator_1$3.iterator];
    if (!i && typeof obj === 'string') {
        return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
        return new ArrayIterator(obj);
    }
    if (!i) {
        throw new TypeError('object is not iterable');
    }
    return obj[iterator_1$3.iterator]();
}
var maxSafeInteger = Math.pow(2, 53) - 1;
function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) {
        return 0;
    }
    if (len === 0 || !numberIsFinite(len)) {
        return len;
    }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) {
        return 0;
    }
    if (len > maxSafeInteger) {
        return maxSafeInteger;
    }
    return len;
}
function numberIsFinite(value) {
    return typeof value === 'number' && root_1$4.root.isFinite(value);
}
function sign(value) {
    var valueAsNumber = +value;
    if (valueAsNumber === 0) {
        return valueAsNumber;
    }
    if (isNaN(valueAsNumber)) {
        return valueAsNumber;
    }
    return valueAsNumber < 0 ? -1 : 1;
}
//# sourceMappingURL=IteratorObservable.js.map

var IteratorObservable_1$1 = {
	IteratorObservable: IteratorObservable_2
};

var __extends$15 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1$10 = Observable_1$1;
var ScalarObservable_1$3 = ScalarObservable_1$1;
var EmptyObservable_1$3 = EmptyObservable_1$1;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayLikeObservable = (function (_super) {
    __extends$15(ArrayLikeObservable, _super);
    function ArrayLikeObservable(arrayLike, scheduler) {
        _super.call(this);
        this.arrayLike = arrayLike;
        this.scheduler = scheduler;
        if (!scheduler && arrayLike.length === 1) {
            this._isScalar = true;
            this.value = arrayLike[0];
        }
    }
    ArrayLikeObservable.create = function (arrayLike, scheduler) {
        var length = arrayLike.length;
        if (length === 0) {
            return new EmptyObservable_1$3.EmptyObservable();
        }
        else if (length === 1) {
            return new ScalarObservable_1$3.ScalarObservable(arrayLike[0], scheduler);
        }
        else {
            return new ArrayLikeObservable(arrayLike, scheduler);
        }
    };
    ArrayLikeObservable.dispatch = function (state) {
        var arrayLike = state.arrayLike, index = state.index, length = state.length, subscriber = state.subscriber;
        if (subscriber.closed) {
            return;
        }
        if (index >= length) {
            subscriber.complete();
            return;
        }
        subscriber.next(arrayLike[index]);
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayLikeObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, arrayLike = _a.arrayLike, scheduler = _a.scheduler;
        var length = arrayLike.length;
        if (scheduler) {
            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
                arrayLike: arrayLike, index: index, length: length, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < length && !subscriber.closed; i++) {
                subscriber.next(arrayLike[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayLikeObservable;
}(Observable_1$10.Observable));
var ArrayLikeObservable_2 = ArrayLikeObservable;
//# sourceMappingURL=ArrayLikeObservable.js.map

var ArrayLikeObservable_1$1 = {
	ArrayLikeObservable: ArrayLikeObservable_2
};

var Observable_1$11 = Observable_1$1;
/**
 * Represents a push-based event or value that an {@link Observable} can emit.
 * This class is particularly useful for operators that manage notifications,
 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
 * others. Besides wrapping the actual delivered value, it also annotates it
 * with metadata of, for instance, what type of push message it is (`next`,
 * `error`, or `complete`).
 *
 * @see {@link materialize}
 * @see {@link dematerialize}
 * @see {@link observeOn}
 *
 * @class Notification<T>
 */
var Notification = (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    /**
     * Delivers to the given `observer` the value wrapped by this Notification.
     * @param {Observer} observer
     * @return
     */
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    /**
     * Given some {@link Observer} callbacks, deliver the value represented by the
     * current Notification to the correctly corresponding callback.
     * @param {function(value: T): void} next An Observer `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    };
    /**
     * Takes an Observer or its individual callback functions, and calls `observe`
     * or `do` methods accordingly.
     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
     * the `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    /**
     * Returns a simple Observable that just delivers the notification represented
     * by this Notification instance.
     * @return {any}
     */
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return Observable_1$11.Observable.of(this.value);
            case 'E':
                return Observable_1$11.Observable.throw(this.error);
            case 'C':
                return Observable_1$11.Observable.empty();
        }
        throw new Error('unexpected notification kind value');
    };
    /**
     * A shortcut to create a Notification instance of the type `next` from a
     * given value.
     * @param {T} value The `next` value.
     * @return {Notification<T>} The "next" Notification representing the
     * argument.
     */
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return Notification.undefinedValueNotification;
    };
    /**
     * A shortcut to create a Notification instance of the type `error` from a
     * given error.
     * @param {any} [err] The `error` error.
     * @return {Notification<T>} The "error" Notification representing the
     * argument.
     */
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    /**
     * A shortcut to create a Notification instance of the type `complete`.
     * @return {Notification<any>} The valueless "complete" Notification.
     */
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}());
var Notification_2 = Notification;
//# sourceMappingURL=Notification.js.map

var Notification_1$1 = {
	Notification: Notification_2
};

var __extends$16 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1$7 = Subscriber_1$2;
var Notification_1 = Notification_1$1;
/**
 *
 * Re-emits all notifications from source Observable with specified scheduler.
 *
 * <span class="informal">Ensure a specific scheduler is used, from outside of an Observable.</span>
 *
 * `observeOn` is an operator that accepts a scheduler as a first parameter, which will be used to reschedule
 * notifications emitted by the source Observable. It might be useful, if you do not have control over
 * internal scheduler of a given Observable, but want to control when its values are emitted nevertheless.
 *
 * Returned Observable emits the same notifications (nexted values, complete and error events) as the source Observable,
 * but rescheduled with provided scheduler. Note that this doesn't mean that source Observables internal
 * scheduler will be replaced in any way. Original scheduler still will be used, but when the source Observable emits
 * notification, it will be immediately scheduled again - this time with scheduler passed to `observeOn`.
 * An anti-pattern would be calling `observeOn` on Observable that emits lots of values synchronously, to split
 * that emissions into asynchronous chunks. For this to happen, scheduler would have to be passed into the source
 * Observable directly (usually into the operator that creates it). `observeOn` simply delays notifications a
 * little bit more, to ensure that they are emitted at expected moments.
 *
 * As a matter of fact, `observeOn` accepts second parameter, which specifies in milliseconds with what delay notifications
 * will be emitted. The main difference between {@link delay} operator and `observeOn` is that `observeOn`
 * will delay all notifications - including error notifications - while `delay` will pass through error
 * from source Observable immediately when it is emitted. In general it is highly recommended to use `delay` operator
 * for any kind of delaying of values in the stream, while using `observeOn` to specify which scheduler should be used
 * for notification emissions in general.
 *
 * @example <caption>Ensure values in subscribe are called just before browser repaint.</caption>
 * const intervals = Rx.Observable.interval(10); // Intervals are scheduled
 *                                               // with async scheduler by default...
 *
 * intervals
 * .observeOn(Rx.Scheduler.animationFrame)       // ...but we will observe on animationFrame
 * .subscribe(val => {                           // scheduler to ensure smooth animation.
 *   someDiv.style.height = val + 'px';
 * });
 *
 * @see {@link delay}
 *
 * @param {IScheduler} scheduler Scheduler that will be used to reschedule notifications from source Observable.
 * @param {number} [delay] Number of milliseconds that states with what delay every notification should be rescheduled.
 * @return {Observable<T>} Observable that emits the same notifications as the source Observable,
 * but with provided scheduler.
 *
 * @method observeOn
 * @owner Observable
 */
function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return this.lift(new ObserveOnOperator(scheduler, delay));
}
var observeOn_2 = observeOn;
var ObserveOnOperator = (function () {
    function ObserveOnOperator(scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    };
    return ObserveOnOperator;
}());
var ObserveOnOperator_1 = ObserveOnOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ObserveOnSubscriber = (function (_super) {
    __extends$16(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        _super.call(this, destination);
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnSubscriber.dispatch = function (arg) {
        var notification = arg.notification, destination = arg.destination;
        notification.observe(destination);
        this.unsubscribe();
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function (value) {
        this.scheduleMessage(Notification_1.Notification.createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function (err) {
        this.scheduleMessage(Notification_1.Notification.createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function () {
        this.scheduleMessage(Notification_1.Notification.createComplete());
    };
    return ObserveOnSubscriber;
}(Subscriber_1$7.Subscriber));
var ObserveOnSubscriber_1 = ObserveOnSubscriber;
var ObserveOnMessage = (function () {
    function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
    return ObserveOnMessage;
}());
var ObserveOnMessage_1 = ObserveOnMessage;
//# sourceMappingURL=observeOn.js.map

var observeOn_1$1 = {
	observeOn: observeOn_2,
	ObserveOnOperator: ObserveOnOperator_1,
	ObserveOnSubscriber: ObserveOnSubscriber_1,
	ObserveOnMessage: ObserveOnMessage_1
};

var __extends$12 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isArray_1$2 = isArray;
var isArrayLike_1$2 = isArrayLike;
var isPromise_1$3 = isPromise_1$1;
var PromiseObservable_1 = PromiseObservable_1$1;
var IteratorObservable_1 = IteratorObservable_1$1;
var ArrayObservable_1$3 = ArrayObservable_1$1;
var ArrayLikeObservable_1 = ArrayLikeObservable_1$1;
var iterator_1$2 = iterator;
var Observable_1$7 = Observable_1$1;
var observeOn_1 = observeOn_1$1;
var observable_1$3 = observable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromObservable = (function (_super) {
    __extends$12(FromObservable, _super);
    function FromObservable(ish, scheduler) {
        _super.call(this, null);
        this.ish = ish;
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable from an Array, an array-like object, a Promise, an
     * iterable object, or an Observable-like object.
     *
     * <span class="informal">Converts almost anything to an Observable.</span>
     *
     * <img src="./img/from.png" width="100%">
     *
     * Convert various other objects and data types into Observables. `from`
     * converts a Promise or an array-like or an
     * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
     * object into an Observable that emits the items in that promise or array or
     * iterable. A String, in this context, is treated as an array of characters.
     * Observable-like objects (contains a function named with the ES2015 Symbol
     * for Observable) can also be converted through this operator.
     *
     * @example <caption>Converts an array to an Observable</caption>
     * var array = [10, 20, 30];
     * var result = Rx.Observable.from(array);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 10 20 30
     *
     * @example <caption>Convert an infinite iterable (from a generator) to an Observable</caption>
     * function* generateDoubles(seed) {
     *   var i = seed;
     *   while (true) {
     *     yield i;
     *     i = 2 * i; // double it
     *   }
     * }
     *
     * var iterator = generateDoubles(3);
     * var result = Rx.Observable.from(iterator).take(10);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 3 6 12 24 48 96 192 384 768 1536
     *
     * @see {@link create}
     * @see {@link fromEvent}
     * @see {@link fromEventPattern}
     * @see {@link fromPromise}
     *
     * @param {ObservableInput<T>} ish A subscribable object, a Promise, an
     * Observable-like, an Array, an iterable or an array-like object to be
     * converted.
     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
     * emissions of values.
     * @return {Observable<T>} The Observable whose values are originally from the
     * input object that was converted.
     * @static true
     * @name from
     * @owner Observable
     */
    FromObservable.create = function (ish, scheduler) {
        if (ish != null) {
            if (typeof ish[observable_1$3.observable] === 'function') {
                if (ish instanceof Observable_1$7.Observable && !scheduler) {
                    return ish;
                }
                return new FromObservable(ish, scheduler);
            }
            else if (isArray_1$2.isArray(ish)) {
                return new ArrayObservable_1$3.ArrayObservable(ish, scheduler);
            }
            else if (isPromise_1$3.isPromise(ish)) {
                return new PromiseObservable_1.PromiseObservable(ish, scheduler);
            }
            else if (typeof ish[iterator_1$2.iterator] === 'function' || typeof ish === 'string') {
                return new IteratorObservable_1.IteratorObservable(ish, scheduler);
            }
            else if (isArrayLike_1$2.isArrayLike(ish)) {
                return new ArrayLikeObservable_1.ArrayLikeObservable(ish, scheduler);
            }
        }
        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
    };
    FromObservable.prototype._subscribe = function (subscriber) {
        var ish = this.ish;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            return ish[observable_1$3.observable]().subscribe(subscriber);
        }
        else {
            return ish[observable_1$3.observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
        }
    };
    return FromObservable;
}(Observable_1$7.Observable));
var FromObservable_2 = FromObservable;
//# sourceMappingURL=FromObservable.js.map

var FromObservable_1$1 = {
	FromObservable: FromObservable_2
};

var FromObservable_1 = FromObservable_1$1;
var from_1 = FromObservable_1.FromObservable.create;
//# sourceMappingURL=from.js.map

var __extends$17 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1$8 = Subscriber_1$2;
/* tslint:enable:max-line-length */
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
}
var filter_2 = filter;
var FilterOperator = (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FilterSubscriber = (function (_super) {
    __extends$17(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
        this.predicate = predicate;
    }
    // the try catch block below is left specifically for
    // optimization and perf reasons. a tryCatcher is not necessary here.
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber_1$8.Subscriber));
//# sourceMappingURL=filter.js.map

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionsObservable = function (_Observable) {
  _inherits(ActionsObservable, _Observable);

  _createClass(ActionsObservable, null, [{
    key: 'of',
    value: function of$$1() {
      return new this(of_1.apply(undefined, arguments));
    }
  }, {
    key: 'from',
    value: function from$$1(actions, scheduler) {
      return new this(from_1(actions, scheduler));
    }
  }]);

  function ActionsObservable(actionsSubject) {
    _classCallCheck$1(this, ActionsObservable);

    var _this = _possibleConstructorReturn(this, (ActionsObservable.__proto__ || Object.getPrototypeOf(ActionsObservable)).call(this));

    _this.source = actionsSubject;
    return _this;
  }

  _createClass(ActionsObservable, [{
    key: 'lift',
    value: function lift(operator) {
      var observable = new ActionsObservable(this);
      observable.operator = operator;
      return observable;
    }
  }, {
    key: 'ofType',
    value: function ofType() {
      for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
      }

      return filter_2.call(this, function (_ref) {
        var type = _ref.type;

        var len = keys.length;
        if (len === 1) {
          return type === keys[0];
        } else {
          for (var i = 0; i < len; i++) {
            if (keys[i] === type) {
              return true;
            }
          }
        }
        return false;
      });
    }
  }]);

  return ActionsObservable;
}(Observable_2);

var EPIC_END = '@@redux-observable/EPIC_END';

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultAdapter = {
  input: function input(action$) {
    return action$;
  },
  output: function output(action$) {
    return action$;
  }
};

var defaultOptions = {
  adapter: defaultAdapter
};

function createEpicMiddleware(epic) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;

  if (typeof epic !== 'function') {
    throw new TypeError('You must provide a root Epic to createEpicMiddleware');
  }

  // even though we used default param, we need to merge the defaults
  // inside the options object as well in case they declare only some
  options = _extends$1({}, defaultOptions, options);
  var input$ = new Subject_2();
  var action$ = options.adapter.input(new ActionsObservable(input$));
  var epic$ = new Subject_2();
  var store = void 0;

  var epicMiddleware = function epicMiddleware(_store) {
    store = _store;

    return function (next) {
      var _context;

      (_context = map_2.call(epic$, function (epic) {
        var output$ = 'dependencies' in options ? epic(action$, store, options.dependencies) : epic(action$, store);

        if (!output$) {
          throw new TypeError('Your root Epic "' + (epic.name || '<anonymous>') + '" does not return a stream. Double check you\'re not missing a return statement!');
        }

        return output$;
      }), switchMap_2).call(_context, function (output$) {
        return options.adapter.output(output$);
      }).subscribe(store.dispatch);

      // Setup initial root epic
      epic$.next(epic);

      return function (action) {
        var result = next(action);
        input$.next(action);
        return result;
      };
    };
  };

  epicMiddleware.replaceEpic = function (epic) {
    // gives the previous root Epic a last chance
    // to do some clean up
    store.dispatch({ type: EPIC_END });
    // switches to the new root Epic, synchronously terminating
    // the previous one
    epic$.next(epic);
  };

  return epicMiddleware;
}

var __extends$18 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1$3 = OuterSubscriber_1$1;
var subscribeToResult_1$3 = subscribeToResult_1$1;
/**
 * Converts a higher-order Observable into a first-order Observable which
 * concurrently delivers all values that are emitted on the inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables.</span>
 *
 * <img src="./img/mergeAll.png" width="100%">
 *
 * `mergeAll` subscribes to an Observable that emits Observables, also known as
 * a higher-order Observable. Each time it observes one of these emitted inner
 * Observables, it subscribes to that and delivers all the values from the
 * inner Observable on the output Observable. The output Observable only
 * completes once all inner Observables have completed. Any error delivered by
 * a inner Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var firstOrder = higherOrder.mergeAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
 * var firstOrder = higherOrder.mergeAll(2);
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link merge}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits values coming from all the
 * inner Observables emitted by the source Observable.
 * @method mergeAll
 * @owner Observable
 */
var MergeAllSubscriber = (function (_super) {
    __extends$18(MergeAllSubscriber, _super);
    function MergeAllSubscriber(destination, concurrent) {
        _super.call(this, destination);
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
    }
    MergeAllSubscriber.prototype._next = function (observable) {
        if (this.active < this.concurrent) {
            this.active++;
            this.add(subscribeToResult_1$3.subscribeToResult(this, observable));
        }
        else {
            this.buffer.push(observable);
        }
    };
    MergeAllSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeAllSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeAllSubscriber;
}(OuterSubscriber_1$3.OuterSubscriber));

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var ReactPropTypesSecret$5 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1$2 = ReactPropTypesSecret$5;

var emptyFunction$12 = emptyFunction_1;
var invariant$39 = invariant_1;
var ReactPropTypesSecret$4 = ReactPropTypesSecret_1$2;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret$4) {
      // It is still safe when called from React.
      return;
    }
    invariant$39(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction$12;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var index$8 = createCommonjsModule(function (module) {
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

{
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

var subscriptionShape = index$8.shape({
  trySubscribe: index$8.func.isRequired,
  tryUnsubscribe: index$8.func.isRequired,
  notifyNestedSubs: index$8.func.isRequired,
  isSubscribed: index$8.func.isRequired
});

var storeShape = index$8.shape({
  subscribe: index$8.func.isRequired,
  dispatch: index$8.func.isRequired,
  getState: index$8.func.isRequired
});

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createProvider() {
  var _Provider$childContex;

  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  var subKey = arguments[1];

  var subscriptionKey = subKey || storeKey + 'Subscription';

  var Provider = function (_Component) {
    _inherits$1(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
    };

    function Provider(props, context) {
      _classCallCheck$2(this, Provider);

      var _this = _possibleConstructorReturn$1(this, _Component.call(this, props, context));

      _this[storeKey] = props.store;
      return _this;
    }

    Provider.prototype.render = function render() {
      return react_4.only(this.props.children);
    };

    return Provider;
  }(react_1);

  Provider.propTypes = {
    store: storeShape.isRequired,
    children: index$8.element.isRequired
  };
  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = storeShape.isRequired, _Provider$childContex[subscriptionKey] = subscriptionShape, _Provider$childContex);
  Provider.displayName = 'Provider';

  return Provider;
}

var Provider = createProvider();

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

var index$9 = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};

/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var NODE_ENV = "production";

var invariant$40 = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

var invariant_1$2 = invariant$40;

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];

  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription$1 = function () {
  function Subscription(store, parentSub, onStateChange) {
    _classCallCheck$4(this, Subscription);

    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  Subscription.prototype.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  Subscription.prototype.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();

var _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var hotReloadingVersion = 0;
var dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };

  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory) {
  var _contextTypes, _childContextTypes;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
    return 'ConnectAdvanced(' + name + ')';
  } : _ref$getDisplayName,
      _ref$methodName = _ref.methodName,
      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
      _ref$renderCountProp = _ref.renderCountProp,
      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
      _ref$storeKey = _ref.storeKey,
      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
      _ref$withRef = _ref.withRef,
      withRef = _ref$withRef === undefined ? false : _ref$withRef,
      connectOptions = _objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;

  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = storeShape, _contextTypes[subscriptionKey] = subscriptionShape, _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = subscriptionShape, _childContextTypes);

  return function wrapWithConnect(WrappedComponent) {
    invariant_1$2(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + ('connect. Instead received ' + JSON.stringify(WrappedComponent)));

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends$2({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var Connect = function (_Component) {
      _inherits$2(Connect, _Component);

      function Connect(props, context) {
        _classCallCheck$3(this, Connect);

        var _this = _possibleConstructorReturn$2(this, _Component.call(this, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        invariant_1$2(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

        _this.initSelector();
        _this.initSubscription();
        return _this;
      }

      Connect.prototype.getChildContext = function getChildContext() {
        var _ref2;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return;

        // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        invariant_1$2(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
        return this.wrappedInstance;
      };

      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      Connect.prototype.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      Connect.prototype.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return;

        // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new Subscription$1(this.store, parentSub, this.onStateChange.bind(this));

        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      Connect.prototype.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidMount` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      Connect.prototype.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
        // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad
        var withExtras = _extends$2({}, props);
        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      Connect.prototype.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return react_3(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(react_1);

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;
    Connect.propTypes = contextTypes;

    return index$9(Connect, WrappedComponent);
  };
}

var hasOwn = Object.prototype.hasOwnProperty;

function is$2(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual$4(objA, objB) {
  if (is$2(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is$2(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    };

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      return props;
    };

    return proxy;
  };
}

function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}

function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
    return { dispatch: dispatch };
  }) : undefined;
}

function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? wrapMapToPropsConstant(function (dispatch) {
    return bindActionCreators(mapDispatchToProps, dispatch);
  }) : undefined;
}

var defaultMapDispatchToPropsFactories = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
}

function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(function () {
    return {};
  }) : undefined;
}

var defaultMapStateToPropsFactories = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

var _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends$4({}, ownProps, stateProps, dispatchProps);
}

function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;

    var hasRunOnce = false;
    var mergedProps = void 0;

    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;

        
      }

      return mergedProps;
    };
  };
}

function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}

function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}

var defaultMergePropsFactories = [whenMergePropsIsFunction, whenMergePropsIsOmitted];

function _objectWithoutProperties$2(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}

function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;

  var hasRunAtLeastOnce = false;
  var state = void 0;
  var ownProps = void 0;
  var stateProps = void 0;
  var dispatchProps = void 0;
  var mergedProps = void 0;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;

    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;

    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}

// TODO: Add more comments

// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = _objectWithoutProperties$2(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}

var _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties$1(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error('Invalid value of type ' + typeof arg + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
  };
}

function strictEqual(a, b) {
  return a === b;
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
function createConnect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === undefined ? connectAdvanced : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? defaultMapStateToPropsFactories : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? defaultMapDispatchToPropsFactories : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === undefined ? defaultMergePropsFactories : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === undefined ? finalPropsSelectorFactory : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref2$pure = _ref2.pure,
        pure = _ref2$pure === undefined ? true : _ref2$pure,
        _ref2$areStatesEqual = _ref2.areStatesEqual,
        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? shallowEqual$4 : _ref2$areOwnPropsEqua,
        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? shallowEqual$4 : _ref2$areStatePropsEq,
        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? shallowEqual$4 : _ref2$areMergedPropsE,
        extraOptions = _objectWithoutProperties$1(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, _extends$3({
      // used in error messages
      methodName: 'connect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return 'Connect(' + name + ')';
      },

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual

    }, extraOptions));
  };
}

var connect = createConnect();

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends$19(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var REQUEST = "REQUEST";
var RECEIVE = "RECEIVE";
var POSITIONX = "POSITIONX";
var POSITIONY = "POSITIONY";
var POSITIONZ = "POSITIONZ";
var ANGLE = "ANGLE";
var RESET = "RESET";
var reset = function () { return ({
    type: RESET
}); };
var positionX = function (num) { return ({
    type: POSITIONX,
    num: num
}); };
var positionY = function (num) { return ({
    type: POSITIONY,
    num: num
}); };
var positionZ = function (num) { return ({
    type: POSITIONZ,
    num: num
}); };
var changeAngle = function (num) { return ({
    type: ANGLE,
    num: num
}); };
var requestPosts = function (url) { return ({
    type: REQUEST,
    url: url
}); };
var receivePosts = function (response) { return ({
    type: RECEIVE,
    response: response
}); };
//# sourceMappingURL=Action.js.map


var CountAction = Object.freeze({
	REQUEST: REQUEST,
	RECEIVE: RECEIVE,
	POSITIONX: POSITIONX,
	POSITIONY: POSITIONY,
	POSITIONZ: POSITIONZ,
	ANGLE: ANGLE,
	RESET: RESET,
	reset: reset,
	positionX: positionX,
	positionY: positionY,
	positionZ: positionZ,
	changeAngle: changeAngle,
	requestPosts: requestPosts,
	receivePosts: receivePosts
});

function singleton(isInitWhenCreate) {
    if (isInitWhenCreate === void 0) { isInitWhenCreate = false; }
    return function (target) {
        target._instance = null;
        if (isInitWhenCreate) {
            target.getInstance = function () {
                if (target._instance == null) {
                    var instance = new target();
                    target._instance = instance;
                    instance.initWhenCreate();
                }
                return target._instance;
            };
        }
        else {
            target.getInstance = function () {
                if (target._instance == null) {
                    target._instance = new target();
                }
                return target._instance;
            };
        }
    };
}
//# sourceMappingURL=singleton.js.map

var JudgeUtils = (function () {
    function JudgeUtils() {
    }
    JudgeUtils.isArray = function (arr) {
        var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
        var length = arr && arr.length;
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };
    JudgeUtils.isArrayExactly = function (arr) {
        return Object.prototype.toString.call(arr) === "[object Array]";
    };
    JudgeUtils.isNumber = function (num) {
        return typeof num == "number";
    };
    JudgeUtils.isNumberExactly = function (num) {
        return Object.prototype.toString.call(num) === "[object Number]";
    };
    JudgeUtils.isString = function (str) {
        return typeof str == "string";
    };
    JudgeUtils.isStringExactly = function (str) {
        return Object.prototype.toString.call(str) === "[object String]";
    };
    JudgeUtils.isBoolean = function (bool) {
        return bool === true || bool === false || toString.call(bool) === '[boolect Boolean]';
    };
    JudgeUtils.isDom = function (obj) {
        return !!(obj && obj.nodeType === 1);
    };
    JudgeUtils.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };
    JudgeUtils.isDirectObject = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    };
    JudgeUtils.isHostMethod = function (object, property) {
        var type = typeof object[property];
        return type === "function" ||
            (type === "object" && !!object[property]);
    };
    JudgeUtils.isNodeJs = function () {
        return ((typeof global != "undefined" && global.module) || (typeof module != "undefined")) && typeof module.exports != "undefined";
    };
    JudgeUtils.isFunction = function (func) {
        return true;
    };
    return JudgeUtils;
}());
if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    JudgeUtils.isFunction = function (func) {
        return typeof func == 'function';
    };
}
else {
    JudgeUtils.isFunction = function (func) {
        return Object.prototype.toString.call(func) === "[object Function]";
    };
}
//# sourceMappingURL=JudgeUtils.js.map

var $BREAK = {
    break: true
};

//# sourceMappingURL=Const.js.map

var List = (function () {
    function List() {
        this.children = null;
    }
    List.prototype.getCount = function () {
        return this.children.length;
    };
    List.prototype.hasChild = function (child) {
        var c = null, children = this.children;
        for (var i = 0, len = children.length; i < len; i++) {
            c = children[i];
            if (child.uid && c.uid && child.uid == c.uid) {
                return true;
            }
            else if (child === c) {
                return true;
            }
        }
        return false;
    };
    List.prototype.hasChildWithFunc = function (func) {
        for (var i = 0, len = this.children.length; i < len; i++) {
            if (func(this.children[i], i)) {
                return true;
            }
        }
        return false;
    };
    List.prototype.getChildren = function () {
        return this.children;
    };
    List.prototype.getChild = function (index) {
        return this.children[index];
    };
    List.prototype.addChild = function (child) {
        this.children.push(child);
        return this;
    };
    List.prototype.addChildren = function (arg) {
        if (JudgeUtils.isArray(arg)) {
            var children = arg;
            this.children = this.children.concat(children);
        }
        else if (arg instanceof List) {
            var children = arg;
            this.children = this.children.concat(children.getChildren());
        }
        else {
            var child = arg;
            this.addChild(child);
        }
        return this;
    };
    List.prototype.setChildren = function (children) {
        this.children = children;
        return this;
    };
    List.prototype.unShiftChild = function (child) {
        this.children.unshift(child);
    };
    List.prototype.removeAllChildren = function () {
        this.children = [];
        return this;
    };
    List.prototype.forEach = function (func, context) {
        this._forEach(this.children, func, context);
        return this;
    };
    List.prototype.toArray = function () {
        return this.children;
    };
    List.prototype.copyChildren = function () {
        return this.children.slice(0);
    };
    List.prototype.removeChildHelper = function (arg) {
        var result = null;
        if (JudgeUtils.isFunction(arg)) {
            var func = arg;
            result = this._removeChild(this.children, func);
        }
        else if (arg.uid) {
            result = this._removeChild(this.children, function (e) {
                if (!e.uid) {
                    return false;
                }
                return e.uid === arg.uid;
            });
        }
        else {
            result = this._removeChild(this.children, function (e) {
                return e === arg;
            });
        }
        return result;
    };
    List.prototype._forEach = function (arr, func, context) {
        var scope = context, i = 0, len = arr.length;
        for (i = 0; i < len; i++) {
            if (func.call(scope, arr[i], i) === $BREAK) {
                break;
            }
        }
    };
    List.prototype._removeChild = function (arr, func) {
        var self = this, removedElementArr = [], remainElementArr = [];
        this._forEach(arr, function (e, index) {
            if (!!func.call(self, e)) {
                removedElementArr.push(e);
            }
            else {
                remainElementArr.push(e);
            }
        });
        this.children = remainElementArr;
        return removedElementArr;
    };
    return List;
}());

//# sourceMappingURL=List.js.map

var __extends$22 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Queue = (function (_super) {
    __extends$22(Queue, _super);
    function Queue(children) {
        if (children === void 0) { children = []; }
        var _this = _super.call(this) || this;
        _this.children = children;
        return _this;
    }
    Queue.create = function (children) {
        if (children === void 0) { children = []; }
        var obj = new this(children);
        return obj;
    };
    Object.defineProperty(Queue.prototype, "front", {
        get: function () {
            return this.children[this.children.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "rear", {
        get: function () {
            return this.children[0];
        },
        enumerable: true,
        configurable: true
    });
    Queue.prototype.push = function (element) {
        this.children.unshift(element);
    };
    Queue.prototype.pop = function () {
        return this.children.pop();
    };
    Queue.prototype.clear = function () {
        this.removeAllChildren();
    };
    return Queue;
}(List));

//# sourceMappingURL=Queue.js.map

var View = (function () {
    function View(_dom) {
        this._dom = _dom;
    }
    View.create = function (view) {
        var obj = new this(view);
        return obj;
    };
    Object.defineProperty(View.prototype, "offset", {
        get: function () {
            var view = this._dom, offset = { x: view.offsetLeft, y: view.offsetTop };
            while (view = view.offsetParent) {
                offset.x += view.offsetLeft;
                offset.y += view.offsetTop;
            }
            return offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "dom", {
        get: function () {
            return this._dom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "x", {
        get: function () {
            return this._dom.style.x;
        },
        set: function (val) {
            this._dom.style.x = val + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "y", {
        get: function () {
            return this.dom.style.y;
        },
        set: function (val) {
            this._dom.style.y = val + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "width", {
        get: function () {
            return this.dom.clientWidth;
        },
        set: function (width) {
            this._dom.width = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "height", {
        get: function () {
            return this.dom.clientHeight;
        },
        set: function (height) {
            this._dom.height = height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "styleWidth", {
        get: function () {
            return this._dom.style.width;
        },
        set: function (width) {
            this._dom.style.width = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "styleHeight", {
        get: function () {
            return this._dom.style.height;
        },
        set: function (height) {
            this._dom.style.height = height;
        },
        enumerable: true,
        configurable: true
    });
    View.prototype.getContext = function (contextConfig) {
        var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        var gl;
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var item = names_1[_i];
            try {
                gl = this._dom.getContext(item, contextConfig);
            }
            catch (e) {
            }
            if (gl) {
                break;
            }
        }
        return gl;
    };
    View.prototype.initCanvas = function () {
        this._dom.style.cssText = "position:absolute;left:0;top:0;";
    };
    return View;
}());

//# sourceMappingURL=View.js.map

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Device = (function () {
    function Device() {
    }
    Device.getInstance = function () { };
    Device.prototype.createGL = function (canvasId, contextConfigData, parentId) {
        var canvas = document.createElement("canvas");
        if (canvasId) {
            canvas.setAttribute("id", canvasId);
        }
        if (parentId) {
            this._parentEle = document.querySelector("#" + parentId);
            if (this._parentEle == void 0)
                alert("找不到指定parentId的dom节点");
        }
        if (this._parentEle)
            this._parentEle.appendChild(canvas);
        else {
            var body = document.createElement("body");
            body.style.margin = "0";
            body.appendChild(canvas);
            document.querySelector("html").appendChild(body);
        }
        this.canvas = canvas;
        this.view = View.create(this.canvas);
        this.gl = this.view.getContext(contextConfigData);
        if (!this.gl)
            alert("你的浏览器不支持webgl");
    };
    Device.prototype.setViewport = function (width, height) {
        this.gl.viewport(0, 0, width, height);
    };
    Device.prototype.setScreen = function () {
        var width = 0, height = 0, x = 0, y = 0, styleWidth = null, styleHeight = null;
        if (this._parentEle) {
            x = this._parentEle.offsetLeft;
            y = this._parentEle.offsetTop;
            width = this._parentEle.offsetWidth;
            height = this._parentEle.offsetHeight;
            styleWidth = width + "px";
            styleHeight = height + "px";
        }
        else {
            width = window.innerWidth;
            height = window.innerHeight;
            styleWidth = "100%";
            styleHeight = "100%";
        }
        this.view.initCanvas();
        this.view.x = x;
        this.view.y = y;
        this.view.width = width;
        this.view.height = height;
        this.view.styleWidth = styleWidth;
        this.view.styleHeight = styleHeight;
        console.log(width, height);
        this.gl.viewport(0, 0, width, height);
        this._parentEle = null;
    };
    return Device;
}());
Device = __decorate$3([
    singleton()
], Device);

//# sourceMappingURL=Device.js.map

var WebglState = (function () {
    function WebglState() {
    }
    WebglState.create = function () {
        var obj = new this();
        return obj;
    };
    WebglState.prototype.setClearColor = function (r, g, b, a) {
        var gl = Device.getInstance().gl;
        gl.clearColor(r, g, b, a);
    };
    WebglState.prototype.init = function () {
        this._depthTest();
        this._clear();
    };
    WebglState.prototype._depthTest = function () {
        var gl = Device.getInstance().gl;
        gl.enable(gl.DEPTH_TEST);
    };
    WebglState.prototype._clear = function () {
        var gl = Device.getInstance().gl;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };
    return WebglState;
}());

//# sourceMappingURL=WebglState.js.map

var Renderer = (function () {
    function Renderer() {
        this._wegbglState = WebglState.create();
    }
    Object.defineProperty(Renderer.prototype, "webglState", {
        get: function () {
            return this._wegbglState;
        },
        set: function (webglState) {
            this._wegbglState = webglState;
        },
        enumerable: true,
        configurable: true
    });
    Renderer.prototype.setClearColor = function (r, g, b, a) {
        this._wegbglState.setClearColor(r, g, b, a);
    };
    return Renderer;
}());

//# sourceMappingURL=Renderer.js.map

var __extends$21 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var WebglRenderer = (function (_super) {
    __extends$21(WebglRenderer, _super);
    function WebglRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._commandQueue = new Queue();
        return _this;
    }
    WebglRenderer.create = function () {
        var obj = new this();
        return obj;
    };
    WebglRenderer.prototype.init = function () {
        this.webglState.init();
    };
    WebglRenderer.prototype.render = function () {
        this._commandQueue.forEach(function (renderCmd) {
            renderCmd.draw();
        });
    };
    WebglRenderer.prototype.addCommand = function (renderCmd) {
        this._commandQueue.addChild(renderCmd);
    };
    WebglRenderer.prototype.hasCommand = function () {
        return this._commandQueue.getCount() > 0;
    };
    return WebglRenderer;
}(Renderer));

//# sourceMappingURL=WebglRenderer.js.map

var Entity = (function () {
    function Entity() {
        this.uid = Entity._count;
        Entity._count++;
    }
    return Entity;
}());
Entity._count = 1;
//# sourceMappingURL=Entity.js.map

var JudgeUtils_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JudgeUtils = (function () {
    function JudgeUtils() {
    }
    JudgeUtils.isArray = function (arr) {
        var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
        var length = arr && arr.length;
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };
    JudgeUtils.isArrayExactly = function (arr) {
        return Object.prototype.toString.call(arr) === "[object Array]";
    };
    JudgeUtils.isNumber = function (num) {
        return typeof num == "number";
    };
    JudgeUtils.isNumberExactly = function (num) {
        return Object.prototype.toString.call(num) === "[object Number]";
    };
    JudgeUtils.isString = function (str) {
        return typeof str == "string";
    };
    JudgeUtils.isStringExactly = function (str) {
        return Object.prototype.toString.call(str) === "[object String]";
    };
    JudgeUtils.isBoolean = function (bool) {
        return bool === true || bool === false || toString.call(bool) === '[boolect Boolean]';
    };
    JudgeUtils.isDom = function (obj) {
        return !!(obj && obj.nodeType === 1);
    };
    JudgeUtils.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };
    JudgeUtils.isDirectObject = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    };
    JudgeUtils.isHostMethod = function (object, property) {
        var type = typeof object[property];
        return type === "function" ||
            (type === "object" && !!object[property]);
    };
    JudgeUtils.isNodeJs = function () {
        return ((typeof commonjsGlobal != "undefined" && commonjsGlobal.module) || ('object' != "undefined")) && 'object' != "undefined";
    };
    JudgeUtils.isFunction = function (func) {
        return true;
    };
    return JudgeUtils;
}());
exports.JudgeUtils = JudgeUtils;
if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    JudgeUtils.isFunction = function (func) {
        return typeof func == 'function';
    };
}
else {
    JudgeUtils.isFunction = function (func) {
        return Object.prototype.toString.call(func) === "[object Function]";
    };
}
//# sourceMappingURL=JudgeUtils.js.map
});

var Const = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$BREAK = {
    break: true
};
exports.$REMOVE = void 0;
//# sourceMappingURL=Const.js.map
});

var List_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JudgeUtils_1$$1 = JudgeUtils_1;
var Const_1 = Const;
var List = (function () {
    function List() {
        this.children = null;
    }
    List.prototype.getCount = function () {
        return this.children.length;
    };
    List.prototype.hasChild = function (child) {
        var c = null, children = this.children;
        for (var i = 0, len = children.length; i < len; i++) {
            c = children[i];
            if (child.uid && c.uid && child.uid == c.uid) {
                return true;
            }
            else if (child === c) {
                return true;
            }
        }
        return false;
    };
    List.prototype.hasChildWithFunc = function (func) {
        for (var i = 0, len = this.children.length; i < len; i++) {
            if (func(this.children[i], i)) {
                return true;
            }
        }
        return false;
    };
    List.prototype.getChildren = function () {
        return this.children;
    };
    List.prototype.getChild = function (index) {
        return this.children[index];
    };
    List.prototype.addChild = function (child) {
        this.children.push(child);
        return this;
    };
    List.prototype.addChildren = function (arg) {
        if (JudgeUtils_1$$1.JudgeUtils.isArray(arg)) {
            var children = arg;
            this.children = this.children.concat(children);
        }
        else if (arg instanceof List) {
            var children = arg;
            this.children = this.children.concat(children.getChildren());
        }
        else {
            var child = arg;
            this.addChild(child);
        }
        return this;
    };
    List.prototype.setChildren = function (children) {
        this.children = children;
        return this;
    };
    List.prototype.unShiftChild = function (child) {
        this.children.unshift(child);
    };
    List.prototype.removeAllChildren = function () {
        this.children = [];
        return this;
    };
    List.prototype.forEach = function (func, context) {
        this._forEach(this.children, func, context);
        return this;
    };
    List.prototype.toArray = function () {
        return this.children;
    };
    List.prototype.copyChildren = function () {
        return this.children.slice(0);
    };
    List.prototype.removeChildHelper = function (arg) {
        var result = null;
        if (JudgeUtils_1$$1.JudgeUtils.isFunction(arg)) {
            var func = arg;
            result = this._removeChild(this.children, func);
        }
        else if (arg.uid) {
            result = this._removeChild(this.children, function (e) {
                if (!e.uid) {
                    return false;
                }
                return e.uid === arg.uid;
            });
        }
        else {
            result = this._removeChild(this.children, function (e) {
                return e === arg;
            });
        }
        return result;
    };
    List.prototype._forEach = function (arr, func, context) {
        var scope = context, i = 0, len = arr.length;
        for (i = 0; i < len; i++) {
            if (func.call(scope, arr[i], i) === Const_1.$BREAK) {
                break;
            }
        }
    };
    List.prototype._removeChild = function (arr, func) {
        var self = this, removedElementArr = [], remainElementArr = [];
        this._forEach(arr, function (e, index) {
            if (!!func.call(self, e)) {
                removedElementArr.push(e);
            }
            else {
                remainElementArr.push(e);
            }
        });
        this.children = remainElementArr;
        return removedElementArr;
    };
    return List;
}());
exports.List = List;
//# sourceMappingURL=List.js.map
});

var ExtendUtils_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JudgeUtils_1$$1 = JudgeUtils_1;
var ExtendUtils = (function () {
    function ExtendUtils() {
    }
    ExtendUtils.extendDeep = function (parent, child, filter) {
        if (filter === void 0) { filter = function (val, i) { return true; }; }
        var i = null, len = 0, toStr = Object.prototype.toString, sArr = "[object Array]", sOb = "[object Object]", type = "", _child = null;
        if (toStr.call(parent) === sArr) {
            _child = child || [];
            for (i = 0, len = parent.length; i < len; i++) {
                var member = parent[i];
                if (!filter(member, i)) {
                    continue;
                }
                if (member.clone) {
                    _child[i] = member.clone();
                    continue;
                }
                type = toStr.call(member);
                if (type === sArr || type === sOb) {
                    _child[i] = type === sArr ? [] : {};
                    ExtendUtils.extendDeep(member, _child[i]);
                }
                else {
                    _child[i] = member;
                }
            }
        }
        else if (toStr.call(parent) === sOb) {
            _child = child || {};
            for (i in parent) {
                var member = parent[i];
                if (!filter(member, i)) {
                    continue;
                }
                if (member.clone) {
                    _child[i] = member.clone();
                    continue;
                }
                type = toStr.call(member);
                if (type === sArr || type === sOb) {
                    _child[i] = type === sArr ? [] : {};
                    ExtendUtils.extendDeep(member, _child[i]);
                }
                else {
                    _child[i] = member;
                }
            }
        }
        else {
            _child = parent;
        }
        return _child;
    };
    ExtendUtils.extend = function (destination, source) {
        var property = "";
        for (property in source) {
            if (source.hasOwnProperty(property)) {
                destination[property] = source[property];
            }
        }
        return destination;
    };
    ExtendUtils.assign = function (source, target) {
        for (var property in source) {
            if (source.hasOwnProperty(property)) {
                if (target[property] === void 0 || target[property] === null) {
                    target[property] = source[property];
                }
            }
        }
        return target;
    };
    ExtendUtils.copyPublicAttri = function (source) {
        var property = null, destination = {};
        this.extendDeep(source, destination, function (item, property) {
            return property.slice(0, 1) !== "_"
                && !JudgeUtils_1$$1.JudgeUtils.isFunction(item);
        });
        return destination;
    };
    return ExtendUtils;
}());
exports.ExtendUtils = ExtendUtils;
//# sourceMappingURL=ExtendUtils.js.map
});

var ExtendUtils_2 = ExtendUtils_1.ExtendUtils;

var Collection_1 = createCommonjsModule(function (module, exports) {
"use strict";
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var List_1$$1 = List_1;
var JudgeUtils_1$$1 = JudgeUtils_1;
var ExtendUtils_1$$1 = ExtendUtils_1;
var Const_1 = Const;
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection(children) {
        if (children === void 0) { children = []; }
        var _this = _super.call(this) || this;
        _this.children = children;
        return _this;
    }
    Collection.create = function (children) {
        if (children === void 0) { children = []; }
        var obj = new this(children);
        return obj;
    };
    Collection.prototype.clone = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var target = null, isDeep = null;
        if (args.length === 0) {
            isDeep = false;
            target = Collection.create();
        }
        else if (args.length === 1) {
            if (JudgeUtils_1$$1.JudgeUtils.isBoolean(args[0])) {
                target = Collection.create();
                isDeep = args[0];
            }
            else {
                target = args[0];
                isDeep = false;
            }
        }
        else {
            target = args[0];
            isDeep = args[1];
        }
        if (isDeep === true) {
            target.setChildren(ExtendUtils_1$$1.ExtendUtils.extendDeep(this.children));
        }
        else {
            target.setChildren(ExtendUtils_1$$1.ExtendUtils.extend([], this.children));
        }
        return target;
    };
    Collection.prototype.filter = function (func) {
        var children = this.children, result = [], value = null;
        for (var i = 0, len = children.length; i < len; i++) {
            value = children[i];
            if (func.call(children, value, i)) {
                result.push(value);
            }
        }
        return Collection.create(result);
    };
    Collection.prototype.findOne = function (func) {
        var scope = this.children, result = null;
        this.forEach(function (value, index) {
            if (!func.call(scope, value, index)) {
                return;
            }
            result = value;
            return Const_1.$BREAK;
        });
        return result;
    };
    Collection.prototype.reverse = function () {
        return Collection.create(this.copyChildren().reverse());
    };
    Collection.prototype.removeChild = function (arg) {
        return Collection.create(this.removeChildHelper(arg));
    };
    Collection.prototype.sort = function (func, isSortSelf) {
        if (isSortSelf === void 0) { isSortSelf = false; }
        if (isSortSelf) {
            this.children.sort(func);
            return this;
        }
        return Collection.create(this.copyChildren().sort(func));
    };
    Collection.prototype.map = function (func) {
        var resultArr = [];
        this.forEach(function (e, index) {
            var result = func(e, index);
            if (result !== Const_1.$REMOVE) {
                resultArr.push(result);
            }
        });
        return Collection.create(resultArr);
    };
    Collection.prototype.removeRepeatItems = function () {
        var noRepeatList = Collection.create();
        this.forEach(function (item) {
            if (noRepeatList.hasChild(item)) {
                return;
            }
            noRepeatList.addChild(item);
        });
        return noRepeatList;
    };
    Collection.prototype.hasRepeatItems = function () {
        var noRepeatList = Collection.create(), hasRepeat = false;
        this.forEach(function (item) {
            if (noRepeatList.hasChild(item)) {
                hasRepeat = true;
                return Const_1.$BREAK;
            }
            noRepeatList.addChild(item);
        });
        return hasRepeat;
    };
    return Collection;
}(List_1$$1.List));
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map
});

var Collection_2 = Collection_1.Collection;

var Util = (function () {
    function Util() {
    }
    Util.isArray = function (target) {
        return {}.toString.call(target).slice(8, -1).toLowerCase() == "array";
    };
    Util.ajax = function (config) {
        var url = config.url;
        var success = config.success;
        var error = config.error;
        var data = config.data;
        var type = config.data == void 0 ? "GET" : config.data;
        var xhr = this._createAjax(error);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (success !== null) {
                    success(xhr.responseText);
                }
            }
            else {
                if (this.error !== void 0) {
                    this.error("出错了");
                }
            }
        };
        xhr.open(type, url, true);
        xhr.send(null);
    };
    Util._createAjax = function (error) {
        var xhr = null;
        try {
            xhr = new ActiveXObject("microsoft.xmlhttp");
        }
        catch (e1) {
            try {
                xhr = new XMLHttpRequest();
            }
            catch (e2) {
                error(xhr, { message: "您的浏览器不支持ajax，请更换！" });
                return null;
            }
        }
        return xhr;
    };
    return Util;
}());

//# sourceMappingURL=Util.js.map

var __extends$25 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EntityManager = (function (_super) {
    __extends$25(EntityManager, _super);
    function EntityManager(_entityDispatcher) {
        var _this = _super.call(this) || this;
        _this._entityDispatcher = _entityDispatcher;
        _this._objectList = new Collection_2();
        return _this;
    }
    EntityManager.create = function (entityDispatcher) {
        var obj = new this(entityDispatcher);
        return obj;
    };
    EntityManager.prototype.init = function () {
        this.forEach(function (child) {
            child.init();
        });
    };
    EntityManager.prototype.dispose = function () {
        this.forEach(function (child) {
            child.init();
        });
    };
    EntityManager.prototype.hasChild = function (child) {
        return this._objectList.hasChild(child);
    };
    EntityManager.prototype.addChild = function (child) {
        this._objectList.addChild(child);
        return this;
    };
    EntityManager.prototype.addChildren = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var addChild = args[1] == void 0 ? this.addChild : args[1];
        if (Util.isArray(args[0])) {
            var children = args[0];
            for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
                var child = children_1[_a];
                addChild(child);
            }
        }
        else
            addChild(args[0]);
        return this;
    };
    EntityManager.prototype.forEach = function (func) {
        this._objectList.forEach(func);
        return this;
    };
    EntityManager.prototype.filter = function (func) {
        return this._objectList.filter(func);
    };
    EntityManager.prototype.getChildren = function () {
        return this._objectList;
    };
    EntityManager.prototype.getAllChildren = function () {
        var res = Collection_2.create();
        var getChildren = function (children) {
            res.addChildren(children.getChildren());
            children.forEach(function (child) {
                getChildren(child);
            });
        };
        getChildren(this._entityDispatcher);
        return res;
    };
    EntityManager.prototype.getChild = function (index) {
        return this._objectList.getChild(index);
    };
    EntityManager.prototype.findChildById = function (uid) {
        return this._objectList.findOne(function (child) {
            return child.uid == uid;
        });
    };
    EntityManager.prototype.findChildByName = function (name) {
        return this._objectList.findOne(function (child) {
            return child.name.search(name) > -1;
        });
    };
    EntityManager.prototype.findChildrenByName = function (name) {
        return this.filter(function (child) {
            return child.name.search(name) > -1;
        });
    };
    EntityManager.prototype.removeChild = function (child) {
        this._objectList.removeChild(child);
        return this;
    };
    EntityManager.prototype.removeAllChildren = function () {
        var _this = this;
        this._objectList.forEach(function (child) {
            _this.removeChild(child);
        }, this);
    };
    return EntityManager;
}(Entity));

//# sourceMappingURL=EntityManager.js.map

var __extends$27 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Component = (function (_super) {
    __extends$27(Component, _super);
    function Component() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.entityObject = null;
        return _this;
    }
    Object.defineProperty(Component.prototype, "transform", {
        get: function () {
            if (this.entityObject == void 0)
                return null;
            return this.entityObject.transform;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.init = function () {
    };
    Component.prototype.addToObject = function (entityObject) {
        this.entityObject = entityObject;
        this.addToComponentContainer();
    };
    Component.prototype.addToComponentContainer = function () {
    };
    return Component;
}(Entity));

//# sourceMappingURL=Component.js.map

var GeometryData = (function () {
    function GeometryData() {
        this.vertice = null;
        this.color = null;
        this.indice = null;
        this.normal = null;
        this.texCoord = null;
    }
    GeometryData.create = function () {
        var obj = new this();
        return obj;
    };
    return GeometryData;
}());

//# sourceMappingURL=GeometryData.js.map

var EBufferDataType;
(function (EBufferDataType) {
    EBufferDataType[EBufferDataType["VERTICE"] = "VERTICE"] = "VERTICE";
    EBufferDataType[EBufferDataType["INDICE"] = "INDICE"] = "INDICE";
    EBufferDataType[EBufferDataType["NORMAL"] = "NORMAL"] = "NORMAL";
    EBufferDataType[EBufferDataType["TEXCOORD"] = "TEXCOORD"] = "TEXCOORD";
    EBufferDataType[EBufferDataType["COLOR"] = "COLOR"] = "COLOR";
})(EBufferDataType || (EBufferDataType = {}));
//# sourceMappingURL=EBufferDataType.js.map

var Variable = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JudgeUtils_1$$1 = JudgeUtils_1;
var Log_1$$1 = Log_1;
if (JudgeUtils_1$$1.JudgeUtils.isNodeJs() && typeof commonjsGlobal != "undefined") {
    exports.root = commonjsGlobal;
}
else if (typeof window != "undefined") {
    exports.root = window;
}
else if (typeof self != "undefined") {
    exports.root = self;
}
else {
    Log_1$$1.Log.error("no avaliable root!");
}
//# sourceMappingURL=Variable.js.map
});

var Log_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Variable_1 = Variable;
var Log = (function () {
    function Log() {
    }
    Log.log = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (!this._exec("log", messages)) {
            Variable_1.root.alert(messages.join(","));
        }
        this._exec("trace", messages);
    };
    Log.assert = function (cond) {
        var messages = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            messages[_i - 1] = arguments[_i];
        }
        if (cond) {
            if (!this._exec("assert", arguments, 1)) {
                this.log.apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }
    };
    Log.error = function (cond) {
        var message = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            message[_i - 1] = arguments[_i];
        }
        if (cond) {
            throw new Error(Array.prototype.slice.call(arguments, 1).join("\n"));
        }
    };
    Log.warn = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        var result = this._exec("warn", arguments);
        if (!result) {
            this.log.apply(this, arguments);
        }
        else {
            this._exec("trace", ["warn trace"]);
        }
    };
    Log._exec = function (consoleMethod, args, sliceBegin) {
        if (sliceBegin === void 0) { sliceBegin = 0; }
        if (Variable_1.root.console && Variable_1.root.console[consoleMethod]) {
            Variable_1.root.console[consoleMethod].apply(Variable_1.root.console, Array.prototype.slice.call(args, sliceBegin));
            return true;
        }
        return false;
    };
    return Log;
}());
Log.info = {
    INVALID_PARAM: "invalid parameter",
    helperFunc: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = "";
        args.forEach(function (val) {
            result += String(val) + " ";
        });
        return result.slice(0, -1);
    },
    assertion: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2) {
            return this.helperFunc(args[0], args[1]);
        }
        else if (args.length === 3) {
            return this.helperFunc(args[1], args[0], args[2]);
        }
        else {
            throw new Error("args.length must <= 3");
        }
    },
    FUNC_INVALID: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("invalid");
        return this.assertion.apply(this, args);
    },
    FUNC_MUST: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("must");
        return this.assertion.apply(this, args);
    },
    FUNC_MUST_BE: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("must be");
        return this.assertion.apply(this, args);
    },
    FUNC_MUST_NOT_BE: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("must not be");
        return this.assertion.apply(this, args);
    },
    FUNC_SHOULD: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("should");
        return this.assertion.apply(this, args);
    },
    FUNC_SHOULD_NOT: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("should not");
        return this.assertion.apply(this, args);
    },
    FUNC_SUPPORT: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("support");
        return this.assertion.apply(this, args);
    },
    FUNC_NOT_SUPPORT: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("not support");
        return this.assertion.apply(this, args);
    },
    FUNC_MUST_DEFINE: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("must define");
        return this.assertion.apply(this, args);
    },
    FUNC_MUST_NOT_DEFINE: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("must not define");
        return this.assertion.apply(this, args);
    },
    FUNC_UNKNOW: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("unknow");
        return this.assertion.apply(this, args);
    },
    FUNC_EXPECT: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("expect");
        return this.assertion.apply(this, args);
    },
    FUNC_UNEXPECT: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("unexpect");
        return this.assertion.apply(this, args);
    },
    FUNC_EXIST: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("exist");
        return this.assertion.apply(this, args);
    },
    FUNC_NOT_EXIST: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("not exist");
        return this.assertion.apply(this, args);
    },
    FUNC_ONLY: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("only");
        return this.assertion.apply(this, args);
    },
    FUNC_CAN_NOT: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("can't");
        return this.assertion.apply(this, args);
    }
};
exports.Log = Log;
//# sourceMappingURL=Log.js.map
});

var Hash_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1$$1 = Collection_1;
var JudgeUtils_1$$1 = JudgeUtils_1;
var Const_1 = Const;
var Log_1$$1 = Log_1;
var ExtendUtils_1$$1 = ExtendUtils_1;
var Hash = (function () {
    function Hash(children) {
        if (children === void 0) { children = {}; }
        this._children = null;
        this._children = children;
    }
    Hash.create = function (children) {
        if (children === void 0) { children = {}; }
        var obj = new this(children);
        return obj;
    };
    Hash.prototype.getChildren = function () {
        return this._children;
    };
    Hash.prototype.getCount = function () {
        var result = 0, children = this._children, key = null;
        for (key in children) {
            if (children.hasOwnProperty(key)) {
                result++;
            }
        }
        return result;
    };
    Hash.prototype.getKeys = function () {
        var result = Collection_1$$1.Collection.create(), children = this._children, key = null;
        for (key in children) {
            if (children.hasOwnProperty(key)) {
                result.addChild(key);
            }
        }
        return result;
    };
    Hash.prototype.getValues = function () {
        var result = Collection_1$$1.Collection.create(), children = this._children, key = null;
        for (key in children) {
            if (children.hasOwnProperty(key)) {
                result.addChild(children[key]);
            }
        }
        return result;
    };
    Hash.prototype.getChild = function (key) {
        return this._children[key];
    };
    Hash.prototype.setValue = function (key, value) {
        this._children[key] = value;
        return this;
    };
    Hash.prototype.addChild = function (key, value) {
        this._children[key] = value;
        return this;
    };
    Hash.prototype.addChildren = function (arg) {
        var i = null, children = null;
        if (arg instanceof Hash) {
            children = arg.getChildren();
        }
        else {
            children = arg;
        }
        for (i in children) {
            if (children.hasOwnProperty(i)) {
                this.addChild(i, children[i]);
            }
        }
        return this;
    };
    Hash.prototype.appendChild = function (key, value) {
        if (this._children[key] instanceof Collection_1$$1.Collection) {
            var c = (this._children[key]);
            c.addChild(value);
        }
        else {
            this._children[key] = (Collection_1$$1.Collection.create().addChild(value));
        }
        return this;
    };
    Hash.prototype.setChildren = function (children) {
        this._children = children;
    };
    Hash.prototype.removeChild = function (arg) {
        var result = [];
        if (JudgeUtils_1$$1.JudgeUtils.isString(arg)) {
            var key = arg;
            result.push(this._children[key]);
            this._children[key] = void 0;
            delete this._children[key];
        }
        else if (JudgeUtils_1$$1.JudgeUtils.isFunction(arg)) {
            var func_1 = arg, self_1 = this;
            this.forEach(function (val, key) {
                if (func_1(val, key)) {
                    result.push(self_1._children[key]);
                    self_1._children[key] = void 0;
                    delete self_1._children[key];
                }
            });
        }
        return Collection_1$$1.Collection.create(result);
    };
    Hash.prototype.removeAllChildren = function () {
        this._children = {};
    };
    Hash.prototype.hasChild = function (key) {
        return this._children[key] !== void 0;
    };
    Hash.prototype.hasChildWithFunc = function (func) {
        var result = false;
        this.forEach(function (val, key) {
            if (func(val, key)) {
                result = true;
                return Const_1.$BREAK;
            }
        });
        return result;
    };
    Hash.prototype.forEach = function (func, context) {
        var children = this._children;
        for (var i in children) {
            if (children.hasOwnProperty(i)) {
                if (func.call(context, children[i], i) === Const_1.$BREAK) {
                    break;
                }
            }
        }
        return this;
    };
    Hash.prototype.filter = function (func) {
        var result = {}, children = this._children, value = null;
        for (var key in children) {
            if (children.hasOwnProperty(key)) {
                value = children[key];
                if (func.call(children, value, key)) {
                    result[key] = value;
                }
            }
        }
        return Hash.create(result);
    };
    Hash.prototype.findOne = function (func) {
        var result = [], self = this, scope = this._children;
        this.forEach(function (val, key) {
            if (!func.call(scope, val, key)) {
                return;
            }
            result = [key, self.getChild(key)];
            return Const_1.$BREAK;
        });
        return result;
    };
    Hash.prototype.map = function (func) {
        var resultMap = {};
        this.forEach(function (val, key) {
            var result = func(val, key);
            if (result !== Const_1.$REMOVE) {
                Log_1$$1.Log.error(!JudgeUtils_1$$1.JudgeUtils.isArray(result) || result.length !== 2, Log_1$$1.Log.info.FUNC_MUST_BE("iterator", "[key, value]"));
                resultMap[result[0]] = result[1];
            }
        });
        return Hash.create(resultMap);
    };
    Hash.prototype.toCollection = function () {
        var result = Collection_1$$1.Collection.create();
        this.forEach(function (val, key) {
            if (val instanceof Collection_1$$1.Collection) {
                result.addChildren(val);
            }
            else {
                result.addChild(val);
            }
        });
        return result;
    };
    Hash.prototype.toArray = function () {
        var result = [];
        this.forEach(function (val, key) {
            if (val instanceof Collection_1$$1.Collection) {
                result = result.concat(val.getChildren());
            }
            else {
                result.push(val);
            }
        });
        return result;
    };
    Hash.prototype.clone = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var target = null, isDeep = null;
        if (args.length === 0) {
            isDeep = false;
            target = Hash.create();
        }
        else if (args.length === 1) {
            if (JudgeUtils_1$$1.JudgeUtils.isBoolean(args[0])) {
                target = Hash.create();
                isDeep = args[0];
            }
            else {
                target = args[0];
                isDeep = false;
            }
        }
        else {
            target = args[0];
            isDeep = args[1];
        }
        if (isDeep === true) {
            target.setChildren(ExtendUtils_1$$1.ExtendUtils.extendDeep(this._children));
        }
        else {
            target.setChildren(ExtendUtils_1$$1.ExtendUtils.extend({}, this._children));
        }
        return target;
    };
    return Hash;
}());
exports.Hash = Hash;
//# sourceMappingURL=Hash.js.map
});

var Hash_2 = Hash_1.Hash;

var Buffer = (function () {
    function Buffer() {
        this.buffer = null;
    }
    Buffer.prototype.dispose = function () {
        Device.getInstance().gl.deleteBuffer(this.buffer);
        delete this.buffer;
    };
    return Buffer;
}());

//# sourceMappingURL=Buffer.js.map

var EBufferType;
(function (EBufferType) {
    EBufferType[EBufferType["BYTE"] = "BYTE"] = "BYTE";
    EBufferType[EBufferType["UNSIGNED_BYTE"] = "UNSIGNED_BYTE"] = "UNSIGNED_BYTE";
    EBufferType[EBufferType["SHORT"] = "SHORT"] = "SHORT";
    EBufferType[EBufferType["UNSIGNED_SHORT"] = "UNSIGNED_SHORT"] = "UNSIGNED_SHORT";
    EBufferType[EBufferType["INT"] = "INT"] = "INT";
    EBufferType[EBufferType["UNSIGNED_INT"] = "UNSIGNED_INT"] = "UNSIGNED_INT";
    EBufferType[EBufferType["FLOAT"] = "FLOAT"] = "FLOAT";
})(EBufferType || (EBufferType = {}));
//# sourceMappingURL=EBufferType.js.map

var EBufferUseage;
(function (EBufferUseage) {
    EBufferUseage[EBufferUseage["STREAM_DRAW"] = "STREAM_DRAW"] = "STREAM_DRAW";
    EBufferUseage[EBufferUseage["STATIC_DRAW"] = "STATIC_DRAW"] = "STATIC_DRAW";
    EBufferUseage[EBufferUseage["DYNAMIC_DRAW"] = "DYNAMIC_DRAW"] = "DYNAMIC_DRAW";
})(EBufferUseage || (EBufferUseage = {}));
//# sourceMappingURL=EBufferUseage.js.map

var __extends$28 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ArrayBuffer = (function (_super) {
    __extends$28(ArrayBuffer, _super);
    function ArrayBuffer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.size = null;
        _this.data = null;
        _this.type = null;
        _this.usage = null;
        _this.count = null;
        return _this;
    }
    ArrayBuffer.create = function (data, size, type, usage) {
        if (type === void 0) { type = EBufferType.FLOAT; }
        if (usage === void 0) { usage = EBufferUseage.STATIC_DRAW; }
        var obj = new this();
        obj.initWhenCreate(data, size, type, usage);
        return obj;
    };
    ArrayBuffer.prototype.initWhenCreate = function (data, size, type, usage) {
        if (type === void 0) { type = EBufferType.FLOAT; }
        if (usage === void 0) { usage = EBufferUseage.STATIC_DRAW; }
        if (data == void 0)
            return null;
        var gl = Device.getInstance().gl;
        var typeData = new Float32Array(data);
        this.buffer = gl.createBuffer();
        if (!this.buffer) {
            console.log("the bufferContainer create error");
            return null;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, typeData, gl[usage]);
        this._saveData(typeData, size, type, usage);
        return this.buffer;
    };
    ArrayBuffer.prototype._saveData = function (data, size, type, usage) {
        this.data = data;
        this.size = size;
        this.count = data.length / size;
        this.type = type;
        this.usage = usage;
    };
    return ArrayBuffer;
}(Buffer));

//# sourceMappingURL=ArrayBuffer.js.map

var __extends$29 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ElementBuffer = (function (_super) {
    __extends$29(ElementBuffer, _super);
    function ElementBuffer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = null;
        _this.count = null;
        _this.usage = null;
        _this.data = null;
        return _this;
    }
    ElementBuffer.create = function (data, type, useage) {
        if (type === void 0) { type = EBufferType.UNSIGNED_BYTE; }
        if (useage === void 0) { useage = EBufferUseage.STATIC_DRAW; }
        var obj = new this();
        var result = obj.initWhenCreate(data, type, useage);
        if (result == void 0)
            return null;
        return obj;
    };
    ElementBuffer.prototype.initWhenCreate = function (data, type, useage) {
        if (data == void 0)
            return null;
        var gl = Device.getInstance().gl;
        var typeData = new Uint8Array(data);
        var buffer = gl.createBuffer();
        if (!buffer)
            console.log("element Buffer create buffer error");
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, typeData, gl[useage]);
        this._saveData(typeData, type, useage);
        this.buffer = buffer;
    };
    ElementBuffer.prototype._saveData = function (data, type, useage) {
        this.data = data;
        this.type = type;
        this.usage = useage;
        this.count = data.length;
    };
    return ElementBuffer;
}(Buffer));

//# sourceMappingURL=ElementBuffer.js.map

var BufferContainer = (function () {
    function BufferContainer() {
        this.geometryData = null;
        this._bufferList = new Hash_2();
    }
    BufferContainer.create = function () {
        var obj = new this();
        return obj;
    };
    BufferContainer.prototype.init = function () {
        this.getChild(EBufferDataType.VERTICE);
        this.getChild(EBufferDataType.COLOR);
        this.getChild(EBufferDataType.INDICE);
        this.getChild(EBufferDataType.NORMAL);
        this.getChild(EBufferDataType.TEXCOORD);
    };
    BufferContainer.prototype.addChild = function (bufferName, buffer) {
        this._bufferList.addChild(bufferName, buffer);
    };
    BufferContainer.prototype.hasChild = function (bufferName) {
        return this._bufferList.hasChild(bufferName);
    };
    BufferContainer.prototype.getChildren = function () {
        return this._bufferList.getChildren();
    };
    BufferContainer.prototype.getChild = function (type) {
        var buffer = null;
        switch (type) {
            case EBufferDataType.VERTICE:
                buffer = this._getVerticeBuffer(type);
                break;
            case EBufferDataType.COLOR:
                buffer = this._getColorBuffer(type);
                break;
            case EBufferDataType.INDICE:
                buffer = this._getIndiceBuffer(type);
                break;
            case EBufferDataType.NORMAL:
                buffer = this._getNormalBuffer(type);
                break;
            case EBufferDataType.TEXCOORD:
                buffer = this._getTexCoordBuffer(type);
                break;
        }
        return buffer;
    };
    BufferContainer.prototype._getVerticeBuffer = function (type) {
        var buffer = ArrayBuffer.create(this.geometryData.vertice, 3);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._getColorBuffer = function (type) {
        var buffer = ArrayBuffer.create(this.geometryData.color, 3);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._getNormalBuffer = function (type) {
        var buffer = ArrayBuffer.create(this.geometryData.normal, 3);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._getIndiceBuffer = function (type) {
        var buffer = ElementBuffer.create(this.geometryData.indice);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._getTexCoordBuffer = function (type) {
        var buffer = ArrayBuffer.create(this.geometryData.texCoord, 3);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._bufferCache = function (type, buffer) {
        if (this._bufferList.hasChild(type)) {
            return this._bufferList.getChild(type);
        }
        else {
            this.addChild(type, buffer);
            return buffer;
        }
    };
    return BufferContainer;
}());

//# sourceMappingURL=BufferContainer.js.map

var __extends$26 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Geometry = (function (_super) {
    __extends$26(Geometry, _super);
    function Geometry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bufferContainer = null;
        _this.material = null;
        return _this;
    }
    Object.defineProperty(Geometry.prototype, "geometryData", {
        get: function () {
            return this.bufferContainer.geometryData;
        },
        enumerable: true,
        configurable: true
    });
    Geometry.prototype.init = function () {
        var computeData = this.computeData();
        this.bufferContainer = BufferContainer.create();
        this.bufferContainer.geometryData = this.createGeometryData(computeData);
        this.bufferContainer.init();
        this.material.init();
    };
    Geometry.prototype.createGeometryData = function (computeData) {
        var vertice = computeData.vertice, color = computeData.color, texCoord = computeData.texCoord, normal = computeData.normal, indice = computeData.indice;
        var geometryData = GeometryData.create();
        geometryData.vertice = vertice;
        geometryData.color = color;
        geometryData.texCoord = texCoord;
        geometryData.normal = normal;
        geometryData.indice = indice;
        return geometryData;
    };
    return Geometry;
}(Component));

//# sourceMappingURL=Geometry.js.map

var Vector3 = (function () {
    function Vector3(opt_src) {
        var v = new Float32Array(3);
        if (opt_src && typeof opt_src === 'object') {
            v[0] = opt_src[0];
            v[1] = opt_src[1];
            v[2] = opt_src[2];
        }
        this.elements = v;
    }
    Vector3.prototype.normalize = function () {
        var v = this.elements;
        var c = v[0], d = v[1], e = v[2], g = Math.sqrt(c * c + d * d + e * e);
        if (g) {
            if (g == 1)
                return this;
        }
        else {
            v[0] = 0;
            v[1] = 0;
            v[2] = 0;
            return this;
        }
        g = 1 / g;
        v[0] = c * g;
        v[1] = d * g;
        v[2] = e * g;
        return this;
    };
    return Vector3;
}());

//# sourceMappingURL=Vector3.js.map

var Vector4 = (function () {
    function Vector4(opt_src) {
        var v = new Float32Array(4);
        if (opt_src && typeof opt_src === 'object') {
            v[0] = opt_src[0];
            v[1] = opt_src[1];
            v[2] = opt_src[2];
            v[3] = opt_src[3];
        }
        this.elements = v;
    }
    return Vector4;
}());

//# sourceMappingURL=Vector4.js.map

var Matrix4 = (function () {
    function Matrix4(opt_src) {
        var i, s, d;
        if (opt_src && typeof opt_src === 'object' && opt_src.hasOwnProperty('elements')) {
            s = opt_src.elements;
            d = new Float32Array(16);
            for (i = 0; i < 16; ++i) {
                d[i] = s[i];
            }
            this.elements = d;
        }
        else {
            this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
    }
    
    Matrix4.prototype.setIdentity = function () {
        var e = this.elements;
        e[0] = 1;
        e[4] = 0;
        e[8] = 0;
        e[12] = 0;
        e[1] = 0;
        e[5] = 1;
        e[9] = 0;
        e[13] = 0;
        e[2] = 0;
        e[6] = 0;
        e[10] = 1;
        e[14] = 0;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.set = function (src) {
        var i, s, d;
        s = src.elements;
        d = this.elements;
        if (s === d) {
            return;
        }
        for (i = 0; i < 16; ++i) {
            d[i] = s[i];
        }
        return this;
    };
    Matrix4.prototype.concat = function (other) {
        var i, e, a, b, ai0, ai1, ai2, ai3;
        e = this.elements;
        a = this.elements;
        b = other.elements;
        if (e === b) {
            b = new Float32Array(16);
            for (i = 0; i < 16; ++i) {
                b[i] = e[i];
            }
        }
        for (i = 0; i < 4; i++) {
            ai0 = a[i];
            ai1 = a[i + 4];
            ai2 = a[i + 8];
            ai3 = a[i + 12];
            e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
            e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
            e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
            e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
        }
        return this;
    };
    Matrix4.prototype.multiply = function (other) {
        var i, e, a, b, ai0, ai1, ai2, ai3;
        e = this.elements;
        a = this.elements;
        b = other.elements;
        if (e === b) {
            b = new Float32Array(16);
            for (i = 0; i < 16; ++i) {
                b[i] = e[i];
            }
        }
        for (i = 0; i < 4; i++) {
            ai0 = a[i];
            ai1 = a[i + 4];
            ai2 = a[i + 8];
            ai3 = a[i + 12];
            e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
            e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
            e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
            e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
        }
        return this;
    };
    Matrix4.prototype.multiplyVector3 = function (pos) {
        var e = this.elements;
        var p = pos.elements;
        var v = new Vector3();
        var result = v.elements;
        result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8] + e[11];
        result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9] + e[12];
        result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + e[13];
        return v;
    };
    Matrix4.prototype.multiplyVector4 = function (pos) {
        var e = this.elements;
        var p = pos.elements;
        var v = new Vector4();
        var result = v.elements;
        result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8] + p[3] * e[12];
        result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9] + p[3] * e[13];
        result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + p[3] * e[14];
        result[3] = p[0] * e[3] + p[1] * e[7] + p[2] * e[11] + p[3] * e[15];
        return v;
    };
    Matrix4.prototype.transpose = function () {
        var e, t;
        e = this.elements;
        t = e[1];
        e[1] = e[4];
        e[4] = t;
        t = e[2];
        e[2] = e[8];
        e[8] = t;
        t = e[3];
        e[3] = e[12];
        e[12] = t;
        t = e[6];
        e[6] = e[9];
        e[9] = t;
        t = e[7];
        e[7] = e[13];
        e[13] = t;
        t = e[11];
        e[11] = e[14];
        e[14] = t;
        return this;
    };
    Matrix4.prototype.setInverseOf = function (other) {
        var i, s, d, inv, det;
        s = other.elements;
        d = this.elements;
        inv = new Float32Array(16);
        inv[0] = s[5] * s[10] * s[15] - s[5] * s[11] * s[14] - s[9] * s[6] * s[15]
            + s[9] * s[7] * s[14] + s[13] * s[6] * s[11] - s[13] * s[7] * s[10];
        inv[4] = -s[4] * s[10] * s[15] + s[4] * s[11] * s[14] + s[8] * s[6] * s[15]
            - s[8] * s[7] * s[14] - s[12] * s[6] * s[11] + s[12] * s[7] * s[10];
        inv[8] = s[4] * s[9] * s[15] - s[4] * s[11] * s[13] - s[8] * s[5] * s[15]
            + s[8] * s[7] * s[13] + s[12] * s[5] * s[11] - s[12] * s[7] * s[9];
        inv[12] = -s[4] * s[9] * s[14] + s[4] * s[10] * s[13] + s[8] * s[5] * s[14]
            - s[8] * s[6] * s[13] - s[12] * s[5] * s[10] + s[12] * s[6] * s[9];
        inv[1] = -s[1] * s[10] * s[15] + s[1] * s[11] * s[14] + s[9] * s[2] * s[15]
            - s[9] * s[3] * s[14] - s[13] * s[2] * s[11] + s[13] * s[3] * s[10];
        inv[5] = s[0] * s[10] * s[15] - s[0] * s[11] * s[14] - s[8] * s[2] * s[15]
            + s[8] * s[3] * s[14] + s[12] * s[2] * s[11] - s[12] * s[3] * s[10];
        inv[9] = -s[0] * s[9] * s[15] + s[0] * s[11] * s[13] + s[8] * s[1] * s[15]
            - s[8] * s[3] * s[13] - s[12] * s[1] * s[11] + s[12] * s[3] * s[9];
        inv[13] = s[0] * s[9] * s[14] - s[0] * s[10] * s[13] - s[8] * s[1] * s[14]
            + s[8] * s[2] * s[13] + s[12] * s[1] * s[10] - s[12] * s[2] * s[9];
        inv[2] = s[1] * s[6] * s[15] - s[1] * s[7] * s[14] - s[5] * s[2] * s[15]
            + s[5] * s[3] * s[14] + s[13] * s[2] * s[7] - s[13] * s[3] * s[6];
        inv[6] = -s[0] * s[6] * s[15] + s[0] * s[7] * s[14] + s[4] * s[2] * s[15]
            - s[4] * s[3] * s[14] - s[12] * s[2] * s[7] + s[12] * s[3] * s[6];
        inv[10] = s[0] * s[5] * s[15] - s[0] * s[7] * s[13] - s[4] * s[1] * s[15]
            + s[4] * s[3] * s[13] + s[12] * s[1] * s[7] - s[12] * s[3] * s[5];
        inv[14] = -s[0] * s[5] * s[14] + s[0] * s[6] * s[13] + s[4] * s[1] * s[14]
            - s[4] * s[2] * s[13] - s[12] * s[1] * s[6] + s[12] * s[2] * s[5];
        inv[3] = -s[1] * s[6] * s[11] + s[1] * s[7] * s[10] + s[5] * s[2] * s[11]
            - s[5] * s[3] * s[10] - s[9] * s[2] * s[7] + s[9] * s[3] * s[6];
        inv[7] = s[0] * s[6] * s[11] - s[0] * s[7] * s[10] - s[4] * s[2] * s[11]
            + s[4] * s[3] * s[10] + s[8] * s[2] * s[7] - s[8] * s[3] * s[6];
        inv[11] = -s[0] * s[5] * s[11] + s[0] * s[7] * s[9] + s[4] * s[1] * s[11]
            - s[4] * s[3] * s[9] - s[8] * s[1] * s[7] + s[8] * s[3] * s[5];
        inv[15] = s[0] * s[5] * s[10] - s[0] * s[6] * s[9] - s[4] * s[1] * s[10]
            + s[4] * s[2] * s[9] + s[8] * s[1] * s[6] - s[8] * s[2] * s[5];
        det = s[0] * inv[0] + s[1] * inv[4] + s[2] * inv[8] + s[3] * inv[12];
        if (det === 0) {
            return this;
        }
        det = 1 / det;
        for (i = 0; i < 16; i++) {
            d[i] = inv[i] * det;
        }
        return this;
    };
    Matrix4.prototype.invert = function () {
        return this.setInverseOf(this);
    };
    Matrix4.prototype.setOrtho = function (left, right, bottom, top, near, far) {
        var e, rw, rh, rd;
        if (left === right || bottom === top || near === far) {
            throw 'null frustum';
        }
        rw = 1 / (right - left);
        rh = 1 / (top - bottom);
        rd = 1 / (far - near);
        e = this.elements;
        e[0] = 2 * rw;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 0;
        e[5] = 2 * rh;
        e[6] = 0;
        e[7] = 0;
        e[8] = 0;
        e[9] = 0;
        e[10] = -2 * rd;
        e[11] = 0;
        e[12] = -(right + left) * rw;
        e[13] = -(top + bottom) * rh;
        e[14] = -(far + near) * rd;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.ortho = function (left, right, bottom, top, near, far) {
        return this.concat(new Matrix4().setOrtho(left, right, bottom, top, near, far));
    };
    Matrix4.prototype.setFrustum = function (left, right, bottom, top, near, far) {
        var e, rw, rh, rd;
        if (left === right || top === bottom || near === far) {
            throw 'null frustum';
        }
        if (near <= 0) {
            throw 'near <= 0';
        }
        if (far <= 0) {
            throw 'far <= 0';
        }
        rw = 1 / (right - left);
        rh = 1 / (top - bottom);
        rd = 1 / (far - near);
        e = this.elements;
        e[0] = 2 * near * rw;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 0;
        e[5] = 2 * near * rh;
        e[6] = 0;
        e[7] = 0;
        e[8] = (right + left) * rw;
        e[9] = (top + bottom) * rh;
        e[10] = -(far + near) * rd;
        e[11] = -1;
        e[12] = 0;
        e[13] = 0;
        e[14] = -2 * near * far * rd;
        e[15] = 0;
        return this;
    };
    Matrix4.prototype.frustum = function (left, right, bottom, top, near, far) {
        return this.concat(new Matrix4().setFrustum(left, right, bottom, top, near, far));
    };
    Matrix4.prototype.setPerspective = function (fovy, aspect, near, far) {
        var e, rd, s, ct;
        if (near === far || aspect === 0) {
            throw 'null frustum';
        }
        if (near <= 0) {
            throw 'near <= 0';
        }
        if (far <= 0) {
            throw 'far <= 0';
        }
        fovy = Math.PI * fovy / 180 / 2;
        s = Math.sin(fovy);
        if (s === 0) {
            throw 'null frustum';
        }
        rd = 1 / (far - near);
        ct = Math.cos(fovy) / s;
        e = this.elements;
        e[0] = ct / aspect;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 0;
        e[5] = ct;
        e[6] = 0;
        e[7] = 0;
        e[8] = 0;
        e[9] = 0;
        e[10] = -(far + near) * rd;
        e[11] = -1;
        e[12] = 0;
        e[13] = 0;
        e[14] = -2 * near * far * rd;
        e[15] = 0;
        return this;
    };
    Matrix4.prototype.perspective = function (fovy, aspect, near, far) {
        return this.concat(new Matrix4().setPerspective(fovy, aspect, near, far));
    };
    Matrix4.prototype.setScale = function (x, y, z) {
        var e = this.elements;
        e[0] = x;
        e[4] = 0;
        e[8] = 0;
        e[12] = 0;
        e[1] = 0;
        e[5] = y;
        e[9] = 0;
        e[13] = 0;
        e[2] = 0;
        e[6] = 0;
        e[10] = z;
        e[14] = 0;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.scale = function (x, y, z) {
        var e = this.elements;
        e[0] *= x;
        e[4] *= y;
        e[8] *= z;
        e[1] *= x;
        e[5] *= y;
        e[9] *= z;
        e[2] *= x;
        e[6] *= y;
        e[10] *= z;
        e[3] *= x;
        e[7] *= y;
        e[11] *= z;
        return this;
    };
    Matrix4.prototype.setTranslate = function (x, y, z) {
        var e = this.elements;
        e[0] = 1;
        e[4] = 0;
        e[8] = 0;
        e[12] = x;
        e[1] = 0;
        e[5] = 1;
        e[9] = 0;
        e[13] = y;
        e[2] = 0;
        e[6] = 0;
        e[10] = 1;
        e[14] = z;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.translate = function (x, y, z) {
        var e = this.elements;
        e[12] += e[0] * x + e[4] * y + e[8] * z;
        e[13] += e[1] * x + e[5] * y + e[9] * z;
        e[14] += e[2] * x + e[6] * y + e[10] * z;
        e[15] += e[3] * x + e[7] * y + e[11] * z;
        return this;
    };
    Matrix4.prototype.setRotate = function (angle, x, y, z) {
        var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;
        angle = Math.PI * angle / 180;
        e = this.elements;
        s = Math.sin(angle);
        c = Math.cos(angle);
        if (0 !== x && 0 === y && 0 === z) {
            if (x < 0) {
                s = -s;
            }
            e[0] = 1;
            e[4] = 0;
            e[8] = 0;
            e[12] = 0;
            e[1] = 0;
            e[5] = c;
            e[9] = -s;
            e[13] = 0;
            e[2] = 0;
            e[6] = s;
            e[10] = c;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        }
        else if (0 === x && 0 !== y && 0 === z) {
            if (y < 0) {
                s = -s;
            }
            e[0] = c;
            e[4] = 0;
            e[8] = s;
            e[12] = 0;
            e[1] = 0;
            e[5] = 1;
            e[9] = 0;
            e[13] = 0;
            e[2] = -s;
            e[6] = 0;
            e[10] = c;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        }
        else if (0 === x && 0 === y && 0 !== z) {
            if (z < 0) {
                s = -s;
            }
            e[0] = c;
            e[4] = -s;
            e[8] = 0;
            e[12] = 0;
            e[1] = s;
            e[5] = c;
            e[9] = 0;
            e[13] = 0;
            e[2] = 0;
            e[6] = 0;
            e[10] = 1;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        }
        else {
            len = Math.sqrt(x * x + y * y + z * z);
            if (len !== 1) {
                rlen = 1 / len;
                x *= rlen;
                y *= rlen;
                z *= rlen;
            }
            nc = 1 - c;
            xy = x * y;
            yz = y * z;
            zx = z * x;
            xs = x * s;
            ys = y * s;
            zs = z * s;
            e[0] = x * x * nc + c;
            e[1] = xy * nc + zs;
            e[2] = zx * nc - ys;
            e[3] = 0;
            e[4] = xy * nc - zs;
            e[5] = y * y * nc + c;
            e[6] = yz * nc + xs;
            e[7] = 0;
            e[8] = zx * nc + ys;
            e[9] = yz * nc - xs;
            e[10] = z * z * nc + c;
            e[11] = 0;
            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
        }
        return this;
    };
    Matrix4.prototype.rotate = function (angle, x, y, z) {
        return this.concat(new Matrix4().setRotate(angle, x, y, z));
    };
    Matrix4.prototype.setLookAt = function (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
        var e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;
        fx = centerX - eyeX;
        fy = centerY - eyeY;
        fz = centerZ - eyeZ;
        rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
        fx *= rlf;
        fy *= rlf;
        fz *= rlf;
        sx = fy * upZ - fz * upY;
        sy = fz * upX - fx * upZ;
        sz = fx * upY - fy * upX;
        rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
        sx *= rls;
        sy *= rls;
        sz *= rls;
        ux = sy * fz - sz * fy;
        uy = sz * fx - sx * fz;
        uz = sx * fy - sy * fx;
        e = this.elements;
        e[0] = sx;
        e[1] = ux;
        e[2] = -fx;
        e[3] = 0;
        e[4] = sy;
        e[5] = uy;
        e[6] = -fy;
        e[7] = 0;
        e[8] = sz;
        e[9] = uz;
        e[10] = -fz;
        e[11] = 0;
        e[12] = 0;
        e[13] = 0;
        e[14] = 0;
        e[15] = 1;
        return this.translate(-eyeX, -eyeY, -eyeZ);
    };
    Matrix4.prototype.lookAt = function (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
        return this.concat(new Matrix4().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ));
    };
    Matrix4.prototype.dropShadow = function (plane, light) {
        var mat = new Matrix4();
        var e = mat.elements;
        var dot = plane[0] * light[0] + plane[1] * light[1] + plane[2] * light[2] + plane[3] * light[3];
        e[0] = dot - light[0] * plane[0];
        e[1] = -light[1] * plane[0];
        e[2] = -light[2] * plane[0];
        e[3] = -light[3] * plane[0];
        e[4] = -light[0] * plane[1];
        e[5] = dot - light[1] * plane[1];
        e[6] = -light[2] * plane[1];
        e[7] = -light[3] * plane[1];
        e[8] = -light[0] * plane[2];
        e[9] = -light[1] * plane[2];
        e[10] = dot - light[2] * plane[2];
        e[11] = -light[3] * plane[2];
        e[12] = -light[0] * plane[3];
        e[13] = -light[1] * plane[3];
        e[14] = -light[2] * plane[3];
        e[15] = dot - light[3] * plane[3];
        return this.concat(mat);
    };
    Matrix4.prototype.dropShadowDirectionally = function (normX, normY, normZ, planeX, planeY, planeZ, lightX, lightY, lightZ) {
        var a = planeX * normX + planeY * normY + planeZ * normZ;
        return this.dropShadow([normX, normY, normZ, -a], [lightX, lightY, lightZ, 0]);
    };
    return Matrix4;
}());

//# sourceMappingURL=Matrix4.js.map

var __extends$30 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Transform = (function (_super) {
    __extends$30(Transform, _super);
    function Transform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mMatrix = new Matrix4();
        return _this;
    }
    Transform.create = function () {
        var obj = new this();
        return obj;
    };
    Transform.prototype.rotate = function (angle, x, y, z) {
        this.mMatrix.rotate(angle, x, y, z);
    };
    Transform.prototype.scale = function (x, y, z) {
        this.mMatrix.scale(x, y, z);
    };
    Transform.prototype.translate = function (x, y, z) {
        this.mMatrix.translate(x, y, z);
    };
    return Transform;
}(Component));

//# sourceMappingURL=Transform.js.map

var __extends$32 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RendererComponent = (function (_super) {
    __extends$32(RendererComponent, _super);
    function RendererComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RendererComponent;
}(Component));

//# sourceMappingURL=RendererComponent.js.map

var EDrawMode;
(function (EDrawMode) {
    EDrawMode[EDrawMode["POINTS"] = "POINTS"] = "POINTS";
    EDrawMode[EDrawMode["LINES"] = "LINES"] = "LINES";
    EDrawMode[EDrawMode["LINE_LOOP"] = "LINE_LOOP"] = "LINE_LOOP";
    EDrawMode[EDrawMode["LINE_STRIP"] = "LINE_STRIP"] = "LINE_STRIP";
    EDrawMode[EDrawMode["TRIANGLES"] = "TRIANGLES"] = "TRIANGLES";
    EDrawMode[EDrawMode["TRIANGLE_STRIP"] = "TRIANGLE_STRIP"] = "TRIANGLE_STRIP";
    EDrawMode[EDrawMode["TRIANGLE_FAN"] = "TRIANGLE_FAN"] = "TRIANGLE_FAN";
})(EDrawMode || (EDrawMode = {}));
//# sourceMappingURL=EDrawMode.js.map

var RenderCommand = (function () {
    function RenderCommand() {
        this.buffers = null;
        this.mMatrix = null;
        this.vMatrix = null;
        this.pMatrix = null;
        this.targetObject = null;
        this.material = null;
        this._drawMode = EDrawMode.TRIANGLES;
    }
    RenderCommand.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(RenderCommand.prototype, "color", {
        get: function () {
            return this.material.color.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderCommand.prototype, "opacity", {
        get: function () {
            return this.material.opacity;
        },
        enumerable: true,
        configurable: true
    });
    RenderCommand.prototype.draw = function () {
        var startOffset = 0, gl = Device.getInstance().gl;
        this.material.update(this);
        var elementBuffer = this.buffers.getChild(EBufferDataType.INDICE);
        var verticeBuffer = this.buffers.getChild(EBufferDataType.VERTICE);
        if (elementBuffer != void 0)
            gl.drawElements(gl[this._drawMode], elementBuffer.count, gl[elementBuffer.type], 0);
        else
            gl.drawArrays(gl[this._drawMode], startOffset, verticeBuffer.count);
    };
    return RenderCommand;
}());

//# sourceMappingURL=RenderCommand.js.map

var __extends$33 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CameraController = (function (_super) {
    __extends$33(CameraController, _super);
    function CameraController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.camera = null;
        return _this;
    }
    CameraController.create = function (camera) {
        var obj = new this();
        obj.camera = camera;
        return obj;
    };
    Object.defineProperty(CameraController.prototype, "pMatrix", {
        get: function () {
            return this.camera.pMatrix;
        },
        set: function (pMatrix) {
            this.camera.pMatrix = pMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "vMatrix", {
        get: function () {
            return this.camera.vMatrix;
        },
        enumerable: true,
        configurable: true
    });
    CameraController.prototype.init = function () {
        this.camera.entityObject = this.entityObject;
        this.camera.init();
    };
    return CameraController;
}(Component));

//# sourceMappingURL=CameraController.js.map

var __extends$31 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MeshRenderer = (function (_super) {
    __extends$31(MeshRenderer, _super);
    function MeshRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeshRenderer.create = function () {
        var obj = new this();
        return obj;
    };
    MeshRenderer.prototype.render = function (renderer, targetObject, camera) {
        renderer.addCommand(this._createCmd(targetObject, camera));
    };
    MeshRenderer.prototype._createCmd = function (targetObject, camera) {
        var geometry = targetObject.geometry;
        var renderCmd = RenderCommand.create();
        var cameraComponent = camera.getComponent(CameraController);
        renderCmd.material = geometry.material;
        renderCmd.buffers = geometry.bufferContainer;
        renderCmd.targetObject = targetObject;
        renderCmd.mMatrix = targetObject.transform.mMatrix;
        renderCmd.vMatrix = cameraComponent.vMatrix;
        renderCmd.pMatrix = cameraComponent.pMatrix;
        return renderCmd;
    };
    return MeshRenderer;
}(RendererComponent));

//# sourceMappingURL=MeshRenderer.js.map

var ComponentManager = (function () {
    function ComponentManager(_entityObject) {
        this._entityObject = _entityObject;
        this.transform = null;
        this.geometry = null;
        this._componentList = new Collection_2();
        this._renderComponent = null;
    }
    ComponentManager.create = function (entityObject) {
        var obj = new this(entityObject);
        return obj;
    };
    ComponentManager.prototype.init = function () {
        this._componentList.forEach(function (component) {
            component.init();
        });
    };
    ComponentManager.prototype.addComponent = function (component) {
        if (component instanceof Geometry) {
            this.geometry = component;
        }
        else if (component instanceof Transform) {
            this.transform = component;
        }
        else if (component instanceof MeshRenderer) {
            this._renderComponent = component;
        }
        this._componentList.addChild(component);
        component.addToObject(this._entityObject);
    };
    ComponentManager.prototype.getComponent = function (componentClass) {
        return this._componentList.findOne(function (component) {
            return component instanceof componentClass;
        });
    };
    ComponentManager.prototype.hasComponent = function (componentClass) {
        var res = this._componentList.hasChildWithFunc(function (component) {
            return component instanceof componentClass;
        });
        return res;
    };
    ComponentManager.prototype.removeComponent = function (component) {
        this._componentList.removeChild(component);
    };
    ComponentManager.prototype.getRenderComponent = function () {
        return this._renderComponent;
    };
    ComponentManager.prototype.removeAllComponent = function () {
        this._componentList.removeAllChildren();
    };
    return ComponentManager;
}());

//# sourceMappingURL=ComponentManager.js.map

var __extends$24 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EntityObject = (function (_super) {
    __extends$24(EntityObject, _super);
    function EntityObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.parent = null;
        _this.name = null;
        _this._entityManager = EntityManager.create(_this);
        _this._componentManager = ComponentManager.create(_this);
        return _this;
    }
    Object.defineProperty(EntityObject.prototype, "transform", {
        get: function () {
            return this._componentManager.transform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityObject.prototype, "geometry", {
        get: function () {
            return this._componentManager.geometry;
        },
        enumerable: true,
        configurable: true
    });
    EntityObject.prototype.initWhenCreate = function () {
        this._componentManager.addComponent(this.createTransform());
    };
    EntityObject.prototype.init = function () {
        this._componentManager.init();
        this._entityManager.init();
        return this;
    };
    EntityObject.prototype.render = function (renderer, camera) {
        var renderComponent = this._componentManager.getRenderComponent();
        if (renderComponent != void 0)
            renderComponent.render(renderer, this, camera);
        this.getChildren().forEach(function (child) {
            child.render(renderer, camera);
        });
    };
    EntityObject.prototype.dispose = function () {
        this._entityManager.dispose();
        return this;
    };
    EntityObject.prototype.hasChild = function (child) {
        return this._entityManager.hasChild(child);
    };
    EntityObject.prototype.addChild = function (child) {
        this._entityManager.addChild(child);
        return this;
    };
    EntityObject.prototype.addChildren = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._entityManager.addChildren(args);
        return this;
    };
    EntityObject.prototype.forEach = function (func) {
        this._entityManager.forEach(func);
        return this;
    };
    EntityObject.prototype.filter = function (func) {
        return this._entityManager.filter(func);
    };
    EntityObject.prototype.getChildren = function () {
        return this._entityManager.getChildren();
    };
    EntityObject.prototype.getAllChildren = function () {
        return this._entityManager.getAllChildren();
    };
    EntityObject.prototype.getChild = function (index) {
        return this._entityManager.getChild(index);
    };
    EntityObject.prototype.findChildById = function (uid) {
        return this._entityManager.findChildById(uid);
    };
    EntityObject.prototype.findChildByName = function (name) {
        return this._entityManager.findChildByName(name);
    };
    EntityObject.prototype.findChildrenByName = function (name) {
        return this._entityManager.findChildrenByName(name);
    };
    EntityObject.prototype.removeChild = function (child) {
        return this._entityManager.removeChild(child);
    };
    EntityObject.prototype.removeAllChildren = function () {
        this._entityManager.removeAllChildren();
    };
    EntityObject.prototype.addComponent = function (component) {
        this._componentManager.addComponent(component);
    };
    EntityObject.prototype.getComponent = function (componentClass) {
        return this._componentManager.getComponent(componentClass);
    };
    EntityObject.prototype.hasComponent = function (componentClass) {
        return this._componentManager.hasComponent(componentClass);
    };
    EntityObject.prototype.removeComponent = function (component) {
        this._componentManager.removeComponent(component);
    };
    EntityObject.prototype.removeAllComponent = function () {
        this._componentManager.removeAllComponent();
    };
    return EntityObject;
}(Entity));

//# sourceMappingURL=EntityObject.js.map

var __extends$34 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function (_super) {
    __extends$34(GameObject, _super);
    function GameObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameObject.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    GameObject.prototype.initWhenCreate = function () {
        _super.prototype.initWhenCreate.call(this);
        this.name = "GameObject" + this.uid;
    };
    GameObject.prototype.createTransform = function () {
        return Transform.create();
    };
    return GameObject;
}(EntityObject));

//# sourceMappingURL=GameObject.js.map

var __extends$35 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObjectScene = (function (_super) {
    __extends$35(GameObjectScene, _super);
    function GameObjectScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameObjectScene.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    Object.defineProperty(GameObjectScene.prototype, "currentCamera", {
        get: function () {
            return this._currentCamera;
        },
        enumerable: true,
        configurable: true
    });
    GameObjectScene.prototype.initWhenCreate = function () {
        this.name = "GameObjectScene" + this.uid;
    };
    GameObjectScene.prototype.render = function (renderer) {
        _super.prototype.render.call(this, renderer, this.currentCamera);
    };
    GameObjectScene.prototype.addChild = function (child) {
        if (child.hasComponent(CameraController)) {
            this._currentCamera = child;
        }
        _super.prototype.addChild.call(this, child);
        return this;
    };
    GameObjectScene.prototype.createTransform = function () {
        return null;
    };
    return GameObjectScene;
}(EntityObject));

//# sourceMappingURL=GameObjectScene.js.map

var __extends$23 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scene = (function (_super) {
    __extends$23(Scene, _super);
    function Scene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameObjectScene = GameObjectScene.create();
        return _this;
    }
    Scene.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    Scene.prototype.initWhenCreate = function () {
        this.name = "Scene" + this.uid;
    };
    Scene.prototype.createTransform = function () {
        return null;
    };
    Scene.prototype.addChild = function (child) {
        if (child instanceof GameObject) {
            this.gameObjectScene.addChild(child);
        }
        child.parent = this;
        return this;
    };
    return Scene;
}(EntityObject));

//# sourceMappingURL=Scene.js.map

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Director = (function () {
    function Director() {
        this.renderer = null;
        this.scene = null;
    }
    Director.getInstance = function () { };
    Director.prototype.initWhenCreate = function () {
        this.renderer = WebglRenderer.create();
        this.scene = Scene.create();
    };
    Director.prototype.init = function () {
        this.renderer.init();
        this.scene.gameObjectScene.init();
    };
    Director.prototype.Render = function () {
        this.scene.gameObjectScene.render(this.renderer);
        this.renderer.render();
    };
    Director.prototype.start = function () {
        this.init();
        this.Render();
    };
    return Director;
}());
Director = __decorate$2([
    singleton(true)
], Director);

//# sourceMappingURL=Director.js.map

var getDirector = function () {
    return Director.getInstance();
};
var init = function () {
    getDirector().init();
};
var render = function () {
    getDirector().Render();
};
//# sourceMappingURL=Director.js.map

var Color = (function () {
    function Color() {
        this._r = null;
        this._g = null;
        this._b = null;
        this._a = null;
    }
    Color.create = function (colorVal) {
        var obj = new this();
        obj.initWhenCreate(colorVal);
        return obj;
    };
    Object.defineProperty(Color.prototype, "r", {
        get: function () {
            return this._r;
        },
        set: function (r) {
            if (this._r !== r)
                this._r = r;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        get: function () {
            return this._g;
        },
        set: function (g) {
            if (this._g !== g)
                this._g = g;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        get: function () {
            return this._b;
        },
        set: function (b) {
            if (this._b !== b)
                this._b = b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "a", {
        get: function () {
            return this._a;
        },
        set: function (a) {
            if (this._a !== a)
                this._a = a;
        },
        enumerable: true,
        configurable: true
    });
    Color.prototype.initWhenCreate = function (colorVal) {
        if (colorVal == void 0)
            return;
        this._setColor(colorVal);
    };
    Color.prototype.toArray = function () {
        return [this.r, this.g, this.b];
    };
    Color.prototype._setColor = function (colorVal) {
        var REGEX_RGBA = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([^\)]+)\)$/i, REGEX_RGBA_2 = /^rgba\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+),\s*([^\)]+)\)$/i, REGEX_RGB = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i, REGEX_RGB_2 = /^rgb\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+)\)$/i, REGEX_NUM = /^\#([0-9a-f]{6})$/i;
        var color = null;
        if (REGEX_RGBA.test(colorVal)) {
            color = REGEX_RGBA.exec(colorVal);
            this.r = this._getColorValue(color, 1);
            this.g = this._getColorValue(color, 2);
            this.b = this._getColorValue(color, 3);
            this.a = Number(color[4]);
            return this;
        }
        if (REGEX_RGBA_2.test(colorVal)) {
            color = REGEX_RGBA_2.exec(colorVal);
            this.r = parseFloat(color[1]);
            this.g = parseFloat(color[2]);
            this.b = parseFloat(color[3]);
            this.a = Number(color[4]);
            return this;
        }
        if (REGEX_RGB.test(colorVal)) {
            color = REGEX_RGB.exec(colorVal);
            this.r = this._getColorValue(color, 1);
            this.g = this._getColorValue(color, 2);
            this.b = this._getColorValue(color, 3);
            this.a = 1;
            return this;
        }
        if (REGEX_RGB_2.test(colorVal)) {
            color = REGEX_RGB_2.exec(colorVal);
            this.r = parseFloat(color[1]);
            this.g = parseFloat(color[2]);
            this.b = parseFloat(color[3]);
            this.a = 1;
            return this;
        }
        if (REGEX_NUM.test(colorVal)) {
            color = REGEX_NUM.exec(colorVal);
            this._setHex(parseInt(color[1], 16));
            return this;
        }
    };
    Color.prototype._getColorValue = function (color, index, num) {
        if (num === void 0) { num = 255; }
        return Math.min(num, parseInt(color[index], 10)) / num;
    };
    Color.prototype._setHex = function (hex) {
        hex = Math.floor(hex);
        this.r = (hex >> 16 & 255) / 255;
        this.g = (hex >> 8 & 255) / 255;
        this.b = (hex & 255) / 255;
        this.a = 1;
        return this;
    };
    return Color;
}());

//# sourceMappingURL=Color.js.map

var Material = (function () {
    function Material() {
        this._color = Color.create("#ffffff");
        this.opacity = 1.0;
        this._shader = null;
    }
    Object.defineProperty(Material.prototype, "program", {
        get: function () {
            return this._shader.program;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (color) {
            if (this._color !== color) {
                this._color = color;
            }
        },
        enumerable: true,
        configurable: true
    });
    Material.prototype.initWhenCreate = function () {
        this._shader = this.getShader();
    };
    Material.prototype.init = function () {
        this._shader.init();
    };
    Material.prototype.update = function (cmd) {
        this._shader.update(cmd, this);
    };
    return Material;
}());

//# sourceMappingURL=Material.js.map

var EVariableType;
(function (EVariableType) {
    EVariableType[EVariableType["FLOAT_1"] = "FLOAT_1"] = "FLOAT_1";
    EVariableType[EVariableType["FLOAT_2"] = "FLOAT_2"] = "FLOAT_2";
    EVariableType[EVariableType["FLOAT_3"] = "FLOAT_3"] = "FLOAT_3";
    EVariableType[EVariableType["FLOAT_4"] = "FLOAT_4"] = "FLOAT_4";
    EVariableType[EVariableType["VECTOR_2"] = "VECTOR_2"] = "VECTOR_2";
    EVariableType[EVariableType["VECTOR_3"] = "VECTOR_3"] = "VECTOR_3";
    EVariableType[EVariableType["VECTOR_4"] = "VECTOR_4"] = "VECTOR_4";
    EVariableType[EVariableType["COLOR_3"] = "COLOR_3"] = "COLOR_3";
    EVariableType[EVariableType["FLOAT_MAT3"] = "FLOAT_MAT3"] = "FLOAT_MAT3";
    EVariableType[EVariableType["FLOAT_MAT4"] = "FLOAT_MAT4"] = "FLOAT_MAT4";
    EVariableType[EVariableType["BUFFER"] = "BUFFER"] = "BUFFER";
    EVariableType[EVariableType["SAMPLER_CUBE"] = "SAMPLER_CUBE"] = "SAMPLER_CUBE";
    EVariableType[EVariableType["SAMPLER_2D"] = "SAMPLER_2D"] = "SAMPLER_2D";
    EVariableType[EVariableType["NUMBER_1"] = "NUMBER_1"] = "NUMBER_1";
    EVariableType[EVariableType["STRUCTURE"] = "STRUCTURE"] = "STRUCTURE";
    EVariableType[EVariableType["STRUCTURES"] = "STRUCTURES"] = "STRUCTURES";
    EVariableType[EVariableType["SAMPLER_ARRAY"] = "SAMPLER_ARRAY"] = "SAMPLER_ARRAY";
    EVariableType[EVariableType["FLOAT_MAT4_ARRAY"] = "FLOAT_MAT4_ARRAY"] = "FLOAT_MAT4_ARRAY";
})(EVariableType || (EVariableType = {}));
//# sourceMappingURL=EVariableType.js.map

var GLSLDataSender = (function () {
    function GLSLDataSender(_program) {
        this._program = _program;
        this._getUniformLocationCache = {};
        this._toSendBufferArr = [];
    }
    GLSLDataSender.create = function (program) {
        var obj = new this(program);
        return obj;
    };
    GLSLDataSender.prototype.addBufferToSendList = function (pos, buffer) {
        this._toSendBufferArr[pos] = buffer;
    };
    GLSLDataSender.prototype.sendAllBufferData = function () {
        for (var pos = 0, len = this._toSendBufferArr.length; pos < len; pos++) {
            this.sendBuffer(pos, this._toSendBufferArr[pos]);
        }
    };
    GLSLDataSender.prototype.sendBuffer = function (pos, buffer) {
        this._getGl().bindBuffer(this._getGl().ARRAY_BUFFER, buffer.buffer);
        this._getGl().vertexAttribPointer(pos, buffer.size, this._getGl()[buffer.type], false, 0, 0);
        this._getGl().enableVertexAttribArray(pos);
    };
    GLSLDataSender.prototype.sendFloat1 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform1f(uniform, data);
    };
    GLSLDataSender.prototype.sendFloat2 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform2f(uniform, data[0], data[1]);
    };
    GLSLDataSender.prototype.sendFloat3 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform3f(uniform, data[0], data[1], data[2]);
    };
    GLSLDataSender.prototype.sendFloat4 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform4f(uniform, data[0], data[1], data[2], data[3]);
    };
    GLSLDataSender.prototype.sendVector2 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform2f(uniform, data.x, data.y);
    };
    GLSLDataSender.prototype.sendVector3 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform3f(uniform, data.x, data.y, data.z);
    };
    GLSLDataSender.prototype.sendVector4 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform4f(uniform, data.x, data.y, data.z, data.w);
    };
    GLSLDataSender.prototype.sendNum1 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform1i(uniform, data);
    };
    GLSLDataSender.prototype.sendMatrix4 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniformMatrix4fv(uniform, false, data.elements);
    };
    GLSLDataSender.prototype.sendMatrix4Array = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniformMatrix4fv(uniform, false, data);
    };
    GLSLDataSender.prototype.getUniformLocation = function (name) {
        if (this._getUniformLocationCache[name] != void 0) {
            return this._getUniformLocationCache[name];
        }
        var uniform = this._getGl().getUniformLocation(this._program.glProgram, name);
        if (uniform == void 0) {
            throw new TypeError("the uniform is not find");
        }
        this._getUniformLocationCache[name] = uniform;
        return uniform;
    };
    GLSLDataSender.prototype._getGl = function () {
        return Device.getInstance().gl;
    };
    return GLSLDataSender;
}());

//# sourceMappingURL=GLSLDataSender.js.map

var __extends$39 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Program = (function (_super) {
    __extends$39(Program, _super);
    function Program() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.glProgram = null;
        _this._attributeList = new Hash_2();
        _this._glslSend = GLSLDataSender.create(_this);
        return _this;
    }
    Program.create = function () {
        var obj = new this();
        return obj;
    };
    Program.prototype.use = function () {
        this._getGl().useProgram(this.glProgram);
    };
    Program.prototype.getAttribLocation = function (name) {
        var pos = this._attributeList.getChild(name);
        if (pos !== void 0)
            return pos;
        var attribute = this._getGl().getAttribLocation(this.glProgram, name);
        this._attributeList.addChild(name, attribute);
        return attribute;
    };
    Program.prototype.getUniformLocation = function (name) {
        return this._glslSend.getUniformLocation(name);
    };
    Program.prototype.sendAttributeBuffer = function (name, buffer) {
        var pos = this.getAttribLocation(name);
        if (pos == -1) {
            throw new TypeError("the attribute is not find");
        }
        
        this._glslSend.addBufferToSendList(pos, buffer);
    };
    Program.prototype.sendAllBufferData = function () {
        this._glslSend.sendAllBufferData();
    };
    Program.prototype.sendUniformData = function (name, type, data) {
        if (data === null) {
            return;
        }
        switch (type) {
            case EVariableType.FLOAT_1:
                this._glslSend.sendFloat1(name, data);
                break;
            case EVariableType.FLOAT_2:
                this._glslSend.sendFloat2(name, data);
                break;
            case EVariableType.FLOAT_3:
                this._glslSend.sendFloat3(name, data);
                break;
            case EVariableType.FLOAT_4:
                this._glslSend.sendFloat4(name, data);
                break;
            case EVariableType.VECTOR_2:
                this._glslSend.sendVector2(name, data);
                break;
            case EVariableType.VECTOR_3:
                this._glslSend.sendVector3(name, data);
                break;
            case EVariableType.VECTOR_4:
                this._glslSend.sendVector4(name, data);
                break;
            case EVariableType.FLOAT_MAT4:
                this._glslSend.sendMatrix4(name, data);
                break;
            case EVariableType.NUMBER_1:
            case EVariableType.SAMPLER_CUBE:
            case EVariableType.SAMPLER_2D:
                this._glslSend.sendNum1(name, data);
                break;
            case EVariableType.FLOAT_MAT4_ARRAY:
                this._glslSend.sendMatrix4Array(name, data);
                break;
            default:
                console.log("the type is not find");
                break;
        }
    };
    Program.prototype.sendFloat1 = function (name, data) {
        this._glslSend.sendFloat1(name, data);
    };
    Program.prototype.sendFloat2 = function (name, data) {
        this._glslSend.sendFloat2(name, data);
    };
    Program.prototype.sendFloat3 = function (name, data) {
        this._glslSend.sendFloat3(name, data);
    };
    Program.prototype.sendFloat4 = function (name, data) {
        this._glslSend.sendFloat4(name, data);
    };
    Program.prototype.sendVector2 = function (name, data) {
        this._glslSend.sendVector2(name, data);
    };
    Program.prototype.sendVector3 = function (name, data) {
        this._glslSend.sendVector3(name, data);
    };
    Program.prototype.sendVector4 = function (name, data) {
        this._glslSend.sendVector4(name, data);
    };
    Program.prototype.sendNum1 = function (name, data) {
        this._glslSend.sendNum1(name, data);
    };
    Program.prototype.sendMatrix4 = function (name, data) {
        this._glslSend.sendMatrix4(name, data);
    };
    Program.prototype.sendMatrix4Array = function (name, data) {
        this._glslSend.sendMatrix4Array(name, data);
    };
    Program.prototype.initProgramWithShader = function (shader) {
        var gl = Device.getInstance().gl;
        var program = gl.createProgram();
        var vshader = this._loadShader(gl, gl.VERTEX_SHADER, shader.VSource);
        var fshader = this._loadShader(gl, gl.FRAGMENT_SHADER, shader.FSource);
        if (!vshader || !fshader) {
            return;
        }
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        gl.linkProgram(program);
        var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            var err = gl.getProgramInfoLog(program);
            console.log("faild to link _program:" + err);
            gl.deleteProgram(program);
            gl.deleteShader(vshader);
            gl.deleteShader(vshader);
            return;
        }
        if (!program)
            console.log("program error");
        this.glProgram = program;
    };
    Program.prototype._loadShader = function (gl, type, value) {
        var shader = gl.createShader(type);
        if (shader == null) {
            console.log("unable to create shader");
            return;
        }
        gl.shaderSource(shader, value);
        gl.compileShader(shader);
        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            var error = gl.getShaderInfoLog(shader);
            console.log("faild to compile shader:" + error);
            gl.deleteShader(shader);
            return;
        }
        return shader;
    };
    Program.prototype._getGl = function () {
        return Device.getInstance().gl;
    };
    return Program;
}(Entity));

//# sourceMappingURL=Program.js.map

var VariableLib = (function () {
    function VariableLib() {
    }
    return VariableLib;
}());
VariableLib.a_position = {
    type: EVariableType.FLOAT_3,
    buffer: EBufferDataType.VERTICE
};
VariableLib.a_color = {
    type: EVariableType.FLOAT_3,
    buffer: EBufferDataType.COLOR
};
VariableLib.a_normal = {
    type: EVariableType.FLOAT_3,
    buffer: EBufferDataType.NORMAL
};
VariableLib.u_color = {
    type: EVariableType.FLOAT_3,
    buffer: "color"
};
VariableLib.u_a = {
    type: EVariableType.FLOAT_1,
    buffer: "opacity"
};
VariableLib.u_mMatrix = {
    type: EVariableType.FLOAT_MAT4,
    buffer: "mMatrix"
};
VariableLib.u_vMatrix = {
    type: EVariableType.FLOAT_MAT4,
    buffer: "vMatrix"
};
VariableLib.u_pMatrix = {
    type: EVariableType.FLOAT_MAT4,
    buffer: "pMatrix"
};
VariableLib.u_mvpMatrix = {
    type: EVariableType.FLOAT_MAT4,
};
//# sourceMappingURL=VariableLib.js.map

var __extends$38 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shader = (function (_super) {
    __extends$38(Shader, _super);
    function Shader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.program = Program.create();
        _this._shaderLib = _this.createShaderLib();
        return _this;
    }
    Object.defineProperty(Shader.prototype, "VSource", {
        get: function () {
            return this._shaderLib.VSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "FSource", {
        get: function () {
            return this._shaderLib.FSource;
        },
        enumerable: true,
        configurable: true
    });
    Shader.prototype.init = function () {
        this.initProgram();
        this._shaderLib.init();
    };
    Shader.prototype.sendAttributeBuffer = function (name, data) {
        this.program.sendAttributeBuffer(name, data);
    };
    Shader.prototype.sendUniformData = function (name, data) {
        this.program.sendUniformData(name, VariableLib[name].type, data);
    };
    return Shader;
}(Component));

//# sourceMappingURL=Shader.js.map

var ShaderLib = (function () {
    function ShaderLib() {
        this._attributes = [];
        this._uniforms = [];
    }
    ShaderLib.prototype.getAttributes = function () {
        return this._attributes;
    };
    ShaderLib.prototype.getUniforms = function () {
        return this._uniforms;
    };
    
    return ShaderLib;
}());

//# sourceMappingURL=ShaderLib.js.map

var __extends$40 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BasicShaderLib = (function (_super) {
    __extends$40(BasicShaderLib, _super);
    function BasicShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.VSource = "attribute vec4 a_position;" +
            "uniform mat4 u_mMatrix;" +
            "uniform mat4 u_vMatrix;" +
            "uniform mat4 u_pMatrix;" +
            "void main(){" +
            "   gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;" +
            "}";
        _this.FSource = "#ifdef GL_ES\n" +
            "precision mediump float;\n" +
            "#endif\n" +
            "uniform vec3 u_color;" +
            "uniform float u_a;" +
            "void main(){" +
            "   gl_FragColor = vec4(u_color,u_a);" +
            "}";
        return _this;
    }
    BasicShaderLib.create = function () {
        var obj = new this();
        return obj;
    };
    BasicShaderLib.prototype.init = function () {
        this._attributes.push("a_position");
        this._uniforms.push("u_color");
        this._uniforms.push("u_a");
        this._uniforms.push("u_mMatrix");
        this._uniforms.push("u_vMatrix");
        this._uniforms.push("u_pMatrix");
    };
    return BasicShaderLib;
}(ShaderLib));

//# sourceMappingURL=BasicShaderLib.js.map

var __extends$37 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BasicShader = (function (_super) {
    __extends$37(BasicShader, _super);
    function BasicShader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicShader.create = function () {
        var obj = new this();
        return obj;
    };
    BasicShader.prototype.initProgram = function () {
        this.program.initProgramWithShader(this);
    };
    BasicShader.prototype.createShaderLib = function () {
        return BasicShaderLib.create();
    };
    BasicShader.prototype.update = function (cmd, material) {
        var _this = this;
        this.program.use();
        this._shaderLib.getAttributes().forEach(function (item) {
            var buffer = cmd.buffers.getChild(VariableLib[item].buffer);
            _this.sendAttributeBuffer(item, buffer);
        });
        this.program.sendAllBufferData();
        this._shaderLib.getUniforms().forEach(function (item) {
            _this.sendUniformData(item, cmd[VariableLib[item].buffer]);
        });
    };
    return BasicShader;
}(Shader));

//# sourceMappingURL=BasicShader.js.map

var __extends$36 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BasicMaterial = (function (_super) {
    __extends$36(BasicMaterial, _super);
    function BasicMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicMaterial.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    BasicMaterial.prototype.getShader = function () {
        return BasicShader.create();
    };
    return BasicMaterial;
}(Material));

//# sourceMappingURL=BasicMaterial.js.map

var Vector = (function () {
    function Vector(x, y, z, w) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (w === void 0) { w = 1; }
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    return Vector;
}());

//# sourceMappingURL=Vector.js.map

var Camera = (function () {
    function Camera() {
        this._pMatrix = new Matrix4();
        this._vMatrix = new Matrix4();
        this.view = new Vector();
        this.entityObject = null;
    }
    Object.defineProperty(Camera.prototype, "near", {
        get: function () {
            return this._near;
        },
        set: function (near) {
            this._near = near;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "far", {
        get: function () {
            return this._far;
        },
        set: function (far) {
            this._far = far;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "pMatrix", {
        get: function () {
            return this._pMatrix;
        },
        set: function (pMatrix) {
            this._pMatrix = pMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "vMatrix", {
        get: function () {
            return this._vMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.translate = function (x, y, z) {
        this.view.x = x;
        this.view.y = y;
        this.view.z = z;
    };
    Camera.prototype.init = function () {
        this.updateProjectionMatrix();
    };
    return Camera;
}());

//# sourceMappingURL=Camera.js.map

var __extends$41 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PerspectiveCamera = (function (_super) {
    __extends$41(PerspectiveCamera, _super);
    function PerspectiveCamera() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PerspectiveCamera.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(PerspectiveCamera.prototype, "fovy", {
        get: function () {
            return this._fovy;
        },
        set: function (fovy) {
            this._fovy = fovy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerspectiveCamera.prototype, "aspect", {
        get: function () {
            return this._aspect;
        },
        set: function (aspect) {
            this._aspect = aspect;
        },
        enumerable: true,
        configurable: true
    });
    PerspectiveCamera.prototype.updateProjectionMatrix = function () {
        this.pMatrix.perspective(this._fovy, this._aspect, this.near, this.far);
        this.vMatrix.lookAt(this.view.x, this.view.y, this.view.z, 0, 0, 0, 0, 1, 0);
    };
    return PerspectiveCamera;
}(Camera));

//# sourceMappingURL=PerspectiveCamera.js.map

var __extends$42 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TriangleGeometry = (function (_super) {
    __extends$42(TriangleGeometry, _super);
    function TriangleGeometry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.width = 1;
        _this.height = 1;
        return _this;
    }
    TriangleGeometry.create = function () {
        var obj = new this();
        return obj;
    };
    TriangleGeometry.prototype.computeData = function () {
        var width = this.width, height = this.height, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2, vertice = null, texCoord = null, indice = null, color = null, normal = null;
        vertice = [
            0.0, up, 0,
            left, down, 0,
            right, down, 0
        ];
        indice = [
            0, 1, 2
        ];
        texCoord = [
            0.5, 1.0,
            0.0, 0.0,
            1.0, 0.0
        ];
        normal = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];
        return {
            vertice: vertice,
            texCoord: texCoord,
            normal: normal,
            indice: indice
        };
    };
    return TriangleGeometry;
}(Geometry));

//# sourceMappingURL=TriangleGeometry.js.map

var getScene = function () {
    return getDirector().scene;
};
var setColor = function (r, g, b, a) {
    getDirector().renderer.setClearColor(r, g, b, a);
};
var createCameraObject = function () {
    var camera = GameObject.create(), cameraComponent = PerspectiveCamera.create();
    var cameraControll = CameraController.create(cameraComponent);
    cameraComponent.aspect = 1;
    cameraComponent.fovy = 45;
    cameraComponent.near = 1;
    cameraComponent.far = 1000;
    cameraComponent.translate(0, 0, -5);
    camera.addComponent(cameraControll);
    return camera;
};
var createGameObject = function (geometry, material) {
    var geo = null, mat = null;
    if (!!material) {
        mat = material;
    }
    else {
        mat = BasicMaterial.create();
        mat.color = Color.create("#ff0000");
        mat.opacity = 1;
    }
    if (!!geometry) {
        geo = geometry;
    }
    else {
        geo = TriangleGeometry.create();
    }
    geo.material = mat;
    var obj = GameObject.create();
    obj.addComponent(geo);
    obj.addComponent(MeshRenderer.create());
    return obj;
};
var addGameObject = function (gameObject) {
    getScene().addChild(gameObject);
};
//# sourceMappingURL=Scene.js.map

var Main = (function () {
    function Main() {
    }
    Main.setCanvas = function (canvasId, parentId) {
        this._parentId = parentId;
        this._canvasId = canvasId;
        this._config = {
            alpha: true,
            depth: true,
            stencil: false,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false
        };
        return this;
    };
    Main.init = function () {
        Device.getInstance().createGL(this._canvasId, this._config, this._parentId);
        Device.getInstance().setScreen();
        return this;
    };
    return Main;
}());
Main._parentId = null;
//# sourceMappingURL=Main.js.map

var main = function () {
    Main.setCanvas("webgl", "parent").init();
    setColor(0, 0, 0, 1);
    addGameObject(createGameObject());
    addGameObject(createCameraObject());
    init();
    loop();
};
var loop = function () {
    render();
    window.requestAnimationFrame(loop);
};
//# sourceMappingURL=Main.js.map

var Position = (function (_super) {
    __extends$19(Position, _super);
    function Position(props) {
        return _super.call(this, props) || this;
    }
    Position.prototype.render = function () {
        var _a = this.props, clicks = _a.clicks, position = _a.position;
        return (react_3("div", { className: "btns" },
            react_3("p", null, "translate:"),
            react_3("button", { onClick: function () { return clicks.xClick(0.1); } }, "x:+0.1"),
            react_3("button", { onClick: function () { return clicks.xClick(-0.1); } }, "x:-0.1"),
            react_3("button", { onClick: function () { return clicks.yClick(0.1); } }, "y:+0.1"),
            react_3("button", { onClick: function () { return clicks.yClick(-0.1); } }, "y:-0.1"),
            react_3("button", { onClick: function () { return clicks.zClick(0.1); } }, "z:+0.1"),
            react_3("button", { onClick: function () { return clicks.zClick(-0.1); } }, "z:-0.1")));
    };
    return Position;
}(react_1));

var Angle = (function (_super) {
    __extends$19(Angle, _super);
    function Angle(props) {
        return _super.call(this, props) || this;
    }
    Angle.prototype.render = function () {
        var angleClick = this.props.angleClick;
        return (react_3("div", { className: "btns" },
            react_3("p", null, "translate:"),
            react_3("div", { className: "btns" },
                react_3("p", null, "rotate:"),
                react_3("button", { onClick: function () { return angleClick(1); } }, "angle:+1"),
                react_3("button", { onClick: function () { return angleClick(-1); } }, "angle:-1"))));
    };
    return Angle;
}(react_1));

var MainEditor = (function (_super) {
    __extends$19(MainEditor, _super);
    function MainEditor(props) {
        return _super.call(this, props) || this;
    }
    MainEditor.prototype.componentDidMount = function () {
        main();
    };
    MainEditor.prototype.render = function () {
        /*        var names = ["A","B"];
                names.forEach(item => {
                    switch (item){
                        case getComponentName(A):this._fcks.push(<A></A>);break;
                        case getComponentName(B):this._fcks.push(<B name="wejhfjkwef"></B>);break;
                    }
                });*/
        var _a = this.props, position = _a.position, changeAngle = _a.changeAngle, reset = _a.reset;
        var positionClick = {
            xClick: this.props.positionX,
            yClick: this.props.positionY,
            zClick: this.props.positionZ
        };
        reset();
        return (react_3("div", null,
            react_3("div", { id: "parent" }),
            react_3("div", { className: "root_btn" },
                react_3(Position, { clicks: positionClick, position: position }),
                react_3(Angle, { angleClick: changeAngle }))));
    };
    return MainEditor;
}(react_1));

var App = (function (_super) {
    __extends$19(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this._dispatch = _this.props.dispatch;
        _this._actions = bindActionCreators(CountAction, _this._dispatch);
        return _this;
    }
    App.prototype.render = function () {
        return (react_3("div", { className: "root" },
            react_3(MainEditor, __assign({}, this.props, this._actions))));
    };
    return App;
}(react_1));
var mapStateToProps = function (state) {
    console.log(state);
    return {
        position: state.position,
        angle: state.angle,
        gameObject: state.gameObject,
    };
};
var App$1 = connect(mapStateToProps)(App);
//# sourceMappingURL=App.js.map

var __extends$43 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var subscribeToResult_1$4 = subscribeToResult_1$1;
var OuterSubscriber_1$4 = OuterSubscriber_1$1;
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link mergeAll}.</span>
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
 * var letters = Rx.Observable.of('a', 'b', 'c');
 * var result = letters.mergeMap(x =>
 *   Rx.Observable.interval(1000).map(i => x+i)
 * );
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // a0
 * // b0
 * // c0
 * // a1
 * // b1
 * // c1
 * // continues to list a,b,c with respective ascending integers
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and merging the results of the Observables obtained
 * from this transformation.
 * @method mergeMap
 * @owner Observable
 */
function mergeMap$2(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
        resultSelector = null;
    }
    return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
}
var mergeMap_2 = mergeMap$2;
var MergeMapOperator = (function () {
    function MergeMapOperator(project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
    };
    return MergeMapOperator;
}());
var MergeMapOperator_1 = MergeMapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeMapSubscriber = (function (_super) {
    __extends$43(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(subscribeToResult_1$4.subscribeToResult(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(OuterSubscriber_1$4.OuterSubscriber));
var MergeMapSubscriber_1 = MergeMapSubscriber;
//# sourceMappingURL=mergeMap.js.map

var mergeMap_1$1 = {
	mergeMap: mergeMap_2,
	MergeMapOperator: MergeMapOperator_1,
	MergeMapSubscriber: MergeMapSubscriber_1
};

var Observable_1$13 = Observable_1$1;
var mergeMap_1 = mergeMap_1$1;
Observable_1$13.Observable.prototype.mergeMap = mergeMap_1.mergeMap;
Observable_1$13.Observable.prototype.flatMap = mergeMap_1.mergeMap;
//# sourceMappingURL=mergeMap.js.map

var Observable_1$14 = Observable_1$1;
var map_1$2 = map_1;
Observable_1$14.Observable.prototype.map = map_1$2.map;
//# sourceMappingURL=map.js.map

var __extends$46 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1$5 = Subscription_1$2;
/**
 * A unit of work to be executed in a {@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
var Action = (function (_super) {
    __extends$46(Action, _super);
    function Action(scheduler, work) {
        _super.call(this);
    }
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1$5.Subscription));
var Action_2 = Action;
//# sourceMappingURL=Action.js.map

var Action_1$1 = {
	Action: Action_2
};

var __extends$45 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1$5 = root$2;
var Action_1 = Action_1$1;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsyncAction = (function (_super) {
    __extends$45(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state;
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        var id = this.id;
        var scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return root_1$5.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // or the action has been rescheduled before it's executed, clear the interval id
        return root_1$5.root.clearInterval(id) && undefined || undefined;
    };
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    };
    return AsyncAction;
}(Action_1.Action));
var AsyncAction_2 = AsyncAction;
//# sourceMappingURL=AsyncAction.js.map

var AsyncAction_1$1 = {
	AsyncAction: AsyncAction_2
};

var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
    return Scheduler;
}());
var Scheduler_2 = Scheduler;
//# sourceMappingURL=Scheduler.js.map

var Scheduler_1$1 = {
	Scheduler: Scheduler_2
};

var __extends$47 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scheduler_1 = Scheduler_1$1;
var AsyncScheduler = (function (_super) {
    __extends$47(AsyncScheduler, _super);
    function AsyncScheduler() {
        _super.apply(this, arguments);
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         */
        this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift()); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
var AsyncScheduler_2 = AsyncScheduler;
//# sourceMappingURL=AsyncScheduler.js.map

var AsyncScheduler_1$1 = {
	AsyncScheduler: AsyncScheduler_2
};

var AsyncAction_1 = AsyncAction_1$1;
var AsyncScheduler_1 = AsyncScheduler_1$1;
/**
 *
 * Async Scheduler
 *
 * <span class="informal">Schedule task as if you used setTimeout(task, duration)</span>
 *
 * `async` scheduler schedules tasks asynchronously, by putting them on the JavaScript
 * event loop queue. It is best used to delay tasks in time or to schedule tasks repeating
 * in intervals.
 *
 * If you just want to "defer" task, that is to perform it right after currently
 * executing synchronous code ends (commonly achieved by `setTimeout(deferredTask, 0)`),
 * better choice will be the {@link asap} scheduler.
 *
 * @example <caption>Use async scheduler to delay task</caption>
 * const task = () => console.log('it works!');
 *
 * Rx.Scheduler.async.schedule(task, 2000);
 *
 * // After 2 seconds logs:
 * // "it works!"
 *
 *
 * @example <caption>Use async scheduler to repeat task in intervals</caption>
 * function task(state) {
 *   console.log(state);
 *   this.schedule(state + 1, 1000); // `this` references currently executing Action,
 *                                   // which we reschedule with new state and delay
 * }
 *
 * Rx.Scheduler.async.schedule(task, 3000, 0);
 *
 * // Logs:
 * // 0 after 3s
 * // 1 after 4s
 * // 2 after 5s
 * // 3 after 6s
 *
 * @static true
 * @name async
 * @owner Scheduler
 */
var async_1$1 = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
//# sourceMappingURL=async.js.map

var async = {
	async: async_1$1
};

function isDate(value) {
    return value instanceof Date && !isNaN(+value);
}
var isDate_2 = isDate;
//# sourceMappingURL=isDate.js.map

var isDate_1$1 = {
	isDate: isDate_2
};

var __extends$44 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var async_1 = async;
var isDate_1 = isDate_1$1;
var Subscriber_1$9 = Subscriber_1$2;
var Notification_1$3 = Notification_1$1;
/**
 * Delays the emission of items from the source Observable by a given timeout or
 * until a given Date.
 *
 * <span class="informal">Time shifts each item by some specified amount of
 * milliseconds.</span>
 *
 * <img src="./img/delay.png" width="100%">
 *
 * If the delay argument is a Number, this operator time shifts the source
 * Observable by that amount of time expressed in milliseconds. The relative
 * time intervals between the values are preserved.
 *
 * If the delay argument is a Date, this operator time shifts the start of the
 * Observable execution until the given date occurs.
 *
 * @example <caption>Delay each click by one second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @example <caption>Delay all clicks until a future date happens</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var date = new Date('March 15, 2050 12:00:00'); // in the future
 * var delayedClicks = clicks.delay(date); // click emitted only after that date
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @see {@link debounceTime}
 * @see {@link delayWhen}
 *
 * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
 * a `Date` until which the emission of the source items is delayed.
 * @param {Scheduler} [scheduler=async] The IScheduler to use for
 * managing the timers that handle the time-shift for each item.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified timeout or Date.
 * @method delay
 * @owner Observable
 */
function delay$2(delay, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    var absoluteDelay = isDate_1.isDate(delay);
    var delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
    return this.lift(new DelayOperator(delayFor, scheduler));
}
var delay_2 = delay$2;
var DelayOperator = (function () {
    function DelayOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    DelayOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
    };
    return DelayOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DelaySubscriber = (function (_super) {
    __extends$44(DelaySubscriber, _super);
    function DelaySubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.queue = [];
        this.active = false;
        this.errored = false;
    }
    DelaySubscriber.dispatch = function (state) {
        var source = state.source;
        var queue = source.queue;
        var scheduler = state.scheduler;
        var destination = state.destination;
        while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
            queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
            this.schedule(state, delay_1);
        }
        else {
            source.active = false;
        }
    };
    DelaySubscriber.prototype._schedule = function (scheduler) {
        this.active = true;
        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
            source: this, destination: this.destination, scheduler: scheduler
        }));
    };
    DelaySubscriber.prototype.scheduleNotification = function (notification) {
        if (this.errored === true) {
            return;
        }
        var scheduler = this.scheduler;
        var message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);
        if (this.active === false) {
            this._schedule(scheduler);
        }
    };
    DelaySubscriber.prototype._next = function (value) {
        this.scheduleNotification(Notification_1$3.Notification.createNext(value));
    };
    DelaySubscriber.prototype._error = function (err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
    };
    DelaySubscriber.prototype._complete = function () {
        this.scheduleNotification(Notification_1$3.Notification.createComplete());
    };
    return DelaySubscriber;
}(Subscriber_1$9.Subscriber));
var DelayMessage = (function () {
    function DelayMessage(time, notification) {
        this.time = time;
        this.notification = notification;
    }
    return DelayMessage;
}());
//# sourceMappingURL=delay.js.map

var delay_1$1 = {
	delay: delay_2
};

var Observable_1$15 = Observable_1$1;
var delay_1 = delay_1$1;
Observable_1$15.Observable.prototype.delay = delay_1.delay;
//# sourceMappingURL=delay.js.map

var __extends$48 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1$6 = root$2;
var tryCatch_1$3 = tryCatch_1$1;
var errorObject_1$3 = errorObject;
var Observable_1$16 = Observable_1$1;
var Subscriber_1$10 = Subscriber_1$2;
var map_1$3 = map_1;
function getCORSRequest() {
    if (root_1$6.root.XMLHttpRequest) {
        return new root_1$6.root.XMLHttpRequest();
    }
    else if (!!root_1$6.root.XDomainRequest) {
        return new root_1$6.root.XDomainRequest();
    }
    else {
        throw new Error('CORS is not supported by your browser');
    }
}
function getXMLHttpRequest() {
    if (root_1$6.root.XMLHttpRequest) {
        return new root_1$6.root.XMLHttpRequest();
    }
    else {
        var progId = void 0;
        try {
            var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
            for (var i = 0; i < 3; i++) {
                try {
                    progId = progIds[i];
                    if (new root_1$6.root.ActiveXObject(progId)) {
                        break;
                    }
                }
                catch (e) {
                }
            }
            return new root_1$6.root.ActiveXObject(progId);
        }
        catch (e) {
            throw new Error('XMLHttpRequest is not supported by your browser');
        }
    }
}
function ajaxGet(url, headers) {
    if (headers === void 0) { headers = null; }
    return new AjaxObservable({ method: 'GET', url: url, headers: headers });
}
var ajaxGet_1 = ajaxGet;

function ajaxPost(url, body, headers) {
    return new AjaxObservable({ method: 'POST', url: url, body: body, headers: headers });
}
var ajaxPost_1 = ajaxPost;

function ajaxDelete(url, headers) {
    return new AjaxObservable({ method: 'DELETE', url: url, headers: headers });
}
var ajaxDelete_1 = ajaxDelete;

function ajaxPut(url, body, headers) {
    return new AjaxObservable({ method: 'PUT', url: url, body: body, headers: headers });
}
var ajaxPut_1 = ajaxPut;

function ajaxPatch(url, body, headers) {
    return new AjaxObservable({ method: 'PATCH', url: url, body: body, headers: headers });
}
var ajaxPatch_1 = ajaxPatch;

function ajaxGetJSON(url, headers) {
    return new AjaxObservable({ method: 'GET', url: url, responseType: 'json', headers: headers })
        .lift(new map_1$3.MapOperator(function (x, index) { return x.response; }, null));
}
var ajaxGetJSON_1 = ajaxGetJSON;

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var AjaxObservable = (function (_super) {
    __extends$48(AjaxObservable, _super);
    function AjaxObservable(urlOrRequest) {
        _super.call(this);
        var request = {
            async: true,
            createXHR: function () {
                return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
            },
            crossDomain: false,
            withCredentials: false,
            headers: {},
            method: 'GET',
            responseType: 'json',
            timeout: 0
        };
        if (typeof urlOrRequest === 'string') {
            request.url = urlOrRequest;
        }
        else {
            for (var prop in urlOrRequest) {
                if (urlOrRequest.hasOwnProperty(prop)) {
                    request[prop] = urlOrRequest[prop];
                }
            }
        }
        this.request = request;
    }
    AjaxObservable.prototype._subscribe = function (subscriber) {
        return new AjaxSubscriber(subscriber, this.request);
    };
    /**
     * Creates an observable for an Ajax request with either a request object with
     * url, headers, etc or a string for a URL.
     *
     * @example
     * source = Rx.Observable.ajax('/products');
     * source = Rx.Observable.ajax({ url: 'products', method: 'GET' });
     *
     * @param {string|Object} request Can be one of the following:
     *   A string of the URL to make the Ajax call.
     *   An object with the following properties
     *   - url: URL of the request
     *   - body: The body of the request
     *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
     *   - async: Whether the request is async
     *   - headers: Optional headers
     *   - crossDomain: true if a cross domain request, else false
     *   - createXHR: a function to override if you need to use an alternate
     *   XMLHttpRequest implementation.
     *   - resultSelector: a function to use to alter the output value type of
     *   the Observable. Gets {@link AjaxResponse} as an argument.
     * @return {Observable} An observable sequence containing the XMLHttpRequest.
     * @static true
     * @name ajax
     * @owner Observable
    */
    AjaxObservable.create = (function () {
        var create = function (urlOrRequest) {
            return new AjaxObservable(urlOrRequest);
        };
        create.get = ajaxGet;
        create.post = ajaxPost;
        create.delete = ajaxDelete;
        create.put = ajaxPut;
        create.patch = ajaxPatch;
        create.getJSON = ajaxGetJSON;
        return create;
    })();
    return AjaxObservable;
}(Observable_1$16.Observable));
var AjaxObservable_2 = AjaxObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AjaxSubscriber = (function (_super) {
    __extends$48(AjaxSubscriber, _super);
    function AjaxSubscriber(destination, request) {
        _super.call(this, destination);
        this.request = request;
        this.done = false;
        var headers = request.headers = request.headers || {};
        // force CORS if requested
        if (!request.crossDomain && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        // ensure content type is set
        if (!('Content-Type' in headers) && !(root_1$6.root.FormData && request.body instanceof root_1$6.root.FormData) && typeof request.body !== 'undefined') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        // properly serialize body
        request.body = this.serializeBody(request.body, request.headers['Content-Type']);
        this.send();
    }
    AjaxSubscriber.prototype.next = function (e) {
        this.done = true;
        var _a = this, xhr = _a.xhr, request = _a.request, destination = _a.destination;
        var response = new AjaxResponse(e, xhr, request);
        destination.next(response);
    };
    AjaxSubscriber.prototype.send = function () {
        var _a = this, request = _a.request, _b = _a.request, user = _b.user, method = _b.method, url = _b.url, async = _b.async, password = _b.password, headers = _b.headers, body = _b.body;
        var createXHR = request.createXHR;
        var xhr = tryCatch_1$3.tryCatch(createXHR).call(request);
        if (xhr === errorObject_1$3.errorObject) {
            this.error(errorObject_1$3.errorObject.e);
        }
        else {
            this.xhr = xhr;
            // set up the events before open XHR
            // https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
            // You need to add the event listeners before calling open() on the request.
            // Otherwise the progress events will not fire.
            this.setupEvents(xhr, request);
            // open XHR
            var result = void 0;
            if (user) {
                result = tryCatch_1$3.tryCatch(xhr.open).call(xhr, method, url, async, user, password);
            }
            else {
                result = tryCatch_1$3.tryCatch(xhr.open).call(xhr, method, url, async);
            }
            if (result === errorObject_1$3.errorObject) {
                this.error(errorObject_1$3.errorObject.e);
                return null;
            }
            // timeout, responseType and withCredentials can be set once the XHR is open
            if (async) {
                xhr.timeout = request.timeout;
                xhr.responseType = request.responseType;
            }
            if ('withCredentials' in xhr) {
                xhr.withCredentials = !!request.withCredentials;
            }
            // set headers
            this.setHeaders(xhr, headers);
            // finally send the request
            result = body ? tryCatch_1$3.tryCatch(xhr.send).call(xhr, body) : tryCatch_1$3.tryCatch(xhr.send).call(xhr);
            if (result === errorObject_1$3.errorObject) {
                this.error(errorObject_1$3.errorObject.e);
                return null;
            }
        }
        return xhr;
    };
    AjaxSubscriber.prototype.serializeBody = function (body, contentType) {
        if (!body || typeof body === 'string') {
            return body;
        }
        else if (root_1$6.root.FormData && body instanceof root_1$6.root.FormData) {
            return body;
        }
        if (contentType) {
            var splitIndex = contentType.indexOf(';');
            if (splitIndex !== -1) {
                contentType = contentType.substring(0, splitIndex);
            }
        }
        switch (contentType) {
            case 'application/x-www-form-urlencoded':
                return Object.keys(body).map(function (key) { return (encodeURI(key) + "=" + encodeURI(body[key])); }).join('&');
            case 'application/json':
                return JSON.stringify(body);
            default:
                return body;
        }
    };
    AjaxSubscriber.prototype.setHeaders = function (xhr, headers) {
        for (var key in headers) {
            if (headers.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
    };
    AjaxSubscriber.prototype.setupEvents = function (xhr, request) {
        var progressSubscriber = request.progressSubscriber;
        function xhrTimeout(e) {
            var _a = xhrTimeout, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
            if (progressSubscriber) {
                progressSubscriber.error(e);
            }
            subscriber.error(new AjaxTimeoutError(this, request)); //TODO: Make betterer.
        }
        
        xhr.ontimeout = xhrTimeout;
        xhrTimeout.request = request;
        xhrTimeout.subscriber = this;
        xhrTimeout.progressSubscriber = progressSubscriber;
        if (xhr.upload && 'withCredentials' in xhr) {
            if (progressSubscriber) {
                var xhrProgress_1;
                xhrProgress_1 = function (e) {
                    var progressSubscriber = xhrProgress_1.progressSubscriber;
                    progressSubscriber.next(e);
                };
                if (root_1$6.root.XDomainRequest) {
                    xhr.onprogress = xhrProgress_1;
                }
                else {
                    xhr.upload.onprogress = xhrProgress_1;
                }
                xhrProgress_1.progressSubscriber = progressSubscriber;
            }
            var xhrError_1;
            xhrError_1 = function (e) {
                var _a = xhrError_1, progressSubscriber = _a.progressSubscriber, subscriber = _a.subscriber, request = _a.request;
                if (progressSubscriber) {
                    progressSubscriber.error(e);
                }
                subscriber.error(new AjaxError('ajax error', this, request));
            };
            xhr.onerror = xhrError_1;
            xhrError_1.request = request;
            xhrError_1.subscriber = this;
            xhrError_1.progressSubscriber = progressSubscriber;
        }
        function xhrReadyStateChange(e) {
            var _a = xhrReadyStateChange, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
            if (this.readyState === 4) {
                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                var status_1 = this.status === 1223 ? 204 : this.status;
                var response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
                // fix status code when it is 0 (0 status is undocumented).
                // Occurs when accessing file resources or on Android 4.1 stock browser
                // while retrieving files from application cache.
                if (status_1 === 0) {
                    status_1 = response ? 200 : 0;
                }
                if (200 <= status_1 && status_1 < 300) {
                    if (progressSubscriber) {
                        progressSubscriber.complete();
                    }
                    subscriber.next(e);
                    subscriber.complete();
                }
                else {
                    if (progressSubscriber) {
                        progressSubscriber.error(e);
                    }
                    subscriber.error(new AjaxError('ajax error ' + status_1, this, request));
                }
            }
        }
        
        xhr.onreadystatechange = xhrReadyStateChange;
        xhrReadyStateChange.subscriber = this;
        xhrReadyStateChange.progressSubscriber = progressSubscriber;
        xhrReadyStateChange.request = request;
    };
    AjaxSubscriber.prototype.unsubscribe = function () {
        var _a = this, done = _a.done, xhr = _a.xhr;
        if (!done && xhr && xhr.readyState !== 4 && typeof xhr.abort === 'function') {
            xhr.abort();
        }
        _super.prototype.unsubscribe.call(this);
    };
    return AjaxSubscriber;
}(Subscriber_1$10.Subscriber));
var AjaxSubscriber_1 = AjaxSubscriber;
/**
 * A normalized AJAX response.
 *
 * @see {@link ajax}
 *
 * @class AjaxResponse
 */
var AjaxResponse = (function () {
    function AjaxResponse(originalEvent, xhr, request) {
        this.originalEvent = originalEvent;
        this.xhr = xhr;
        this.request = request;
        this.status = xhr.status;
        this.responseType = xhr.responseType || request.responseType;
        switch (this.responseType) {
            case 'json':
                if ('response' in xhr) {
                    //IE does not support json as responseType, parse it internally
                    this.response = xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
                }
                else {
                    this.response = JSON.parse(xhr.responseText || 'null');
                }
                break;
            case 'xml':
                this.response = xhr.responseXML;
                break;
            case 'text':
            default:
                this.response = ('response' in xhr) ? xhr.response : xhr.responseText;
                break;
        }
    }
    return AjaxResponse;
}());
var AjaxResponse_1 = AjaxResponse;
/**
 * A normalized AJAX error.
 *
 * @see {@link ajax}
 *
 * @class AjaxError
 */
var AjaxError = (function (_super) {
    __extends$48(AjaxError, _super);
    function AjaxError(message, xhr, request) {
        _super.call(this, message);
        this.message = message;
        this.xhr = xhr;
        this.request = request;
        this.status = xhr.status;
    }
    return AjaxError;
}(Error));
var AjaxError_1 = AjaxError;
/**
 * @see {@link ajax}
 *
 * @class AjaxTimeoutError
 */
var AjaxTimeoutError = (function (_super) {
    __extends$48(AjaxTimeoutError, _super);
    function AjaxTimeoutError(xhr, request) {
        _super.call(this, 'ajax timeout', xhr, request);
    }
    return AjaxTimeoutError;
}(AjaxError));
var AjaxTimeoutError_1 = AjaxTimeoutError;
//# sourceMappingURL=AjaxObservable.js.map

var AjaxObservable_1$1 = {
	ajaxGet: ajaxGet_1,
	ajaxPost: ajaxPost_1,
	ajaxDelete: ajaxDelete_1,
	ajaxPut: ajaxPut_1,
	ajaxPatch: ajaxPatch_1,
	ajaxGetJSON: ajaxGetJSON_1,
	AjaxObservable: AjaxObservable_2,
	AjaxSubscriber: AjaxSubscriber_1,
	AjaxResponse: AjaxResponse_1,
	AjaxError: AjaxError_1,
	AjaxTimeoutError: AjaxTimeoutError_1
};

var AjaxObservable_1 = AjaxObservable_1$1;
var ajax_1 = AjaxObservable_1.AjaxObservable.create;
//# sourceMappingURL=ajax.js.map

var postsEpic = function (action$) { return (action$.ofType(REQUEST)
    .mergeMap(function (action) {
    return ajax_1.getJSON(action.url)
        .map(function (response) { return receivePosts(response); });
})); };
var position = function (state, action) {
    if (state === void 0) { state = { x: 0, y: 0, z: 0 }; }
    var assign = ExtendUtils_2.assign;
    switch (action.type) {
        case POSITIONX: return assign(state, { x: action.num, y: 0, z: 0 });
        case POSITIONY: return assign(state, { y: action.num, x: 0, z: 0 });
        case POSITIONZ: return assign(state, { z: action.num, x: 0, y: 0 });
        case RESET: return null;
        default: return state;
    }
};
var angle = function (state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case ANGLE: return state + action.num;
        case RESET: return null;
        default: return state;
    }
};
//# sourceMappingURL=reducer.js.map

var rootReducer = combineReducers({
    position: position,
    angle: angle
});
//# sourceMappingURL=reducer.js.map

var epicMiddleware = createEpicMiddleware(postsEpic);
var store = createStore(rootReducer, applyMiddleware(epicMiddleware));
index_1(react_3("div", null,
    react_3(Provider, { store: store },
        react_3(App$1, null))), document.querySelector("#ct"));
//# sourceMappingURL=index.js.map

}());
