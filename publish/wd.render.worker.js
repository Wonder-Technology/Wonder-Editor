(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.wdrd = {})));
}(this, (function (exports) { 'use strict';

	var out_of_memory = /* tuple */[
	  "Out_of_memory",
	  0
	];

	var sys_error = /* tuple */[
	  "Sys_error",
	  -1
	];

	var failure = /* tuple */[
	  "Failure",
	  -2
	];

	var invalid_argument = /* tuple */[
	  "Invalid_argument",
	  -3
	];

	var end_of_file = /* tuple */[
	  "End_of_file",
	  -4
	];

	var division_by_zero = /* tuple */[
	  "Division_by_zero",
	  -5
	];

	var not_found = /* tuple */[
	  "Not_found",
	  -6
	];

	var match_failure = /* tuple */[
	  "Match_failure",
	  -7
	];

	var stack_overflow = /* tuple */[
	  "Stack_overflow",
	  -8
	];

	var sys_blocked_io = /* tuple */[
	  "Sys_blocked_io",
	  -9
	];

	var assert_failure = /* tuple */[
	  "Assert_failure",
	  -10
	];

	var undefined_recursive_module = /* tuple */[
	  "Undefined_recursive_module",
	  -11
	];

	out_of_memory.tag = 248;

	sys_error.tag = 248;

	failure.tag = 248;

	invalid_argument.tag = 248;

	end_of_file.tag = 248;

	division_by_zero.tag = 248;

	not_found.tag = 248;

	match_failure.tag = 248;

	stack_overflow.tag = 248;

	sys_blocked_io.tag = 248;

	assert_failure.tag = 248;

	undefined_recursive_module.tag = 248;


	/*  Not a pure module */

	function caml_array_sub(x, offset, len) {
	  var result = new Array(len);
	  var j = 0;
	  var i = offset;
	  while(j < len) {
	    result[j] = x[i];
	    j = j + 1 | 0;
	    i = i + 1 | 0;
	  }
	  return result;
	}

	function caml_array_get(xs, index) {
	  if (index < 0 || index >= xs.length) {
	    throw [
	          invalid_argument,
	          "index out of bounds"
	        ];
	  } else {
	    return xs[index];
	  }
	}

	function caml_array_dup(prim) {
	  return prim.slice(0);
	}


	/* No side effect */

	function app(_f, _args) {
	  while(true) {
	    var args = _args;
	    var f = _f;
	    var arity = f.length;
	    var arity$1 = arity === 0 ? 1 : arity;
	    var len = args.length;
	    var d = arity$1 - len | 0;
	    if (d === 0) {
	      return f.apply(null, args);
	    } else if (d < 0) {
	      _args = caml_array_sub(args, arity$1, -d | 0);
	      _f = f.apply(null, caml_array_sub(args, 0, arity$1));
	      continue ;
	    } else {
	      return (function(f,args){
	      return function (x) {
	        return app(f, args.concat(/* array */[x]));
	      }
	      }(f,args));
	    }
	  }
	}

	function curry_1(o, a0, arity) {
	  if (arity > 7 || arity < 0) {
	    return app(o, /* array */[a0]);
	  } else {
	    switch (arity) {
	      case 0 : 
	      case 1 : 
	          return o(a0);
	      case 2 : 
	          return (function (param) {
	              return o(a0, param);
	            });
	      case 3 : 
	          return (function (param, param$1) {
	              return o(a0, param, param$1);
	            });
	      case 4 : 
	          return (function (param, param$1, param$2) {
	              return o(a0, param, param$1, param$2);
	            });
	      case 5 : 
	          return (function (param, param$1, param$2, param$3) {
	              return o(a0, param, param$1, param$2, param$3);
	            });
	      case 6 : 
	          return (function (param, param$1, param$2, param$3, param$4) {
	              return o(a0, param, param$1, param$2, param$3, param$4);
	            });
	      case 7 : 
	          return (function (param, param$1, param$2, param$3, param$4, param$5) {
	              return o(a0, param, param$1, param$2, param$3, param$4, param$5);
	            });
	      
	    }
	  }
	}

	function _1(o, a0) {
	  var arity = o.length;
	  if (arity === 1) {
	    return o(a0);
	  } else {
	    return curry_1(o, a0, arity);
	  }
	}

	function curry_2(o, a0, a1, arity) {
	  if (arity > 7 || arity < 0) {
	    return app(o, /* array */[
	                a0,
	                a1
	              ]);
	  } else {
	    switch (arity) {
	      case 0 : 
	      case 1 : 
	          return app(o(a0), /* array */[a1]);
	      case 2 : 
	          return o(a0, a1);
	      case 3 : 
	          return (function (param) {
	              return o(a0, a1, param);
	            });
	      case 4 : 
	          return (function (param, param$1) {
	              return o(a0, a1, param, param$1);
	            });
	      case 5 : 
	          return (function (param, param$1, param$2) {
	              return o(a0, a1, param, param$1, param$2);
	            });
	      case 6 : 
	          return (function (param, param$1, param$2, param$3) {
	              return o(a0, a1, param, param$1, param$2, param$3);
	            });
	      case 7 : 
	          return (function (param, param$1, param$2, param$3, param$4) {
	              return o(a0, a1, param, param$1, param$2, param$3, param$4);
	            });
	      
	    }
	  }
	}

	function _2(o, a0, a1) {
	  var arity = o.length;
	  if (arity === 2) {
	    return o(a0, a1);
	  } else {
	    return curry_2(o, a0, a1, arity);
	  }
	}

	function curry_3(o, a0, a1, a2, arity) {
	  var exit = 0;
	  if (arity > 7 || arity < 0) {
	    return app(o, /* array */[
	                a0,
	                a1,
	                a2
	              ]);
	  } else {
	    switch (arity) {
	      case 0 : 
	      case 1 : 
	          exit = 1;
	          break;
	      case 2 : 
	          return app(o(a0, a1), /* array */[a2]);
	      case 3 : 
	          return o(a0, a1, a2);
	      case 4 : 
	          return (function (param) {
	              return o(a0, a1, a2, param);
	            });
	      case 5 : 
	          return (function (param, param$1) {
	              return o(a0, a1, a2, param, param$1);
	            });
	      case 6 : 
	          return (function (param, param$1, param$2) {
	              return o(a0, a1, a2, param, param$1, param$2);
	            });
	      case 7 : 
	          return (function (param, param$1, param$2, param$3) {
	              return o(a0, a1, a2, param, param$1, param$2, param$3);
	            });
	      
	    }
	  }
	  if (exit === 1) {
	    return app(o(a0), /* array */[
	                a1,
	                a2
	              ]);
	  }
	  
	}

	function _3(o, a0, a1, a2) {
	  var arity = o.length;
	  if (arity === 3) {
	    return o(a0, a1, a2);
	  } else {
	    return curry_3(o, a0, a1, a2, arity);
	  }
	}

	function curry_4(o, a0, a1, a2, a3, arity) {
	  var exit = 0;
	  if (arity > 7 || arity < 0) {
	    return app(o, /* array */[
	                a0,
	                a1,
	                a2,
	                a3
	              ]);
	  } else {
	    switch (arity) {
	      case 0 : 
	      case 1 : 
	          exit = 1;
	          break;
	      case 2 : 
	          return app(o(a0, a1), /* array */[
	                      a2,
	                      a3
	                    ]);
	      case 3 : 
	          return app(o(a0, a1, a2), /* array */[a3]);
	      case 4 : 
	          return o(a0, a1, a2, a3);
	      case 5 : 
	          return (function (param) {
	              return o(a0, a1, a2, a3, param);
	            });
	      case 6 : 
	          return (function (param, param$1) {
	              return o(a0, a1, a2, a3, param, param$1);
	            });
	      case 7 : 
	          return (function (param, param$1, param$2) {
	              return o(a0, a1, a2, a3, param, param$1, param$2);
	            });
	      
	    }
	  }
	  if (exit === 1) {
	    return app(o(a0), /* array */[
	                a1,
	                a2,
	                a3
	              ]);
	  }
	  
	}

	function _4(o, a0, a1, a2, a3) {
	  var arity = o.length;
	  if (arity === 4) {
	    return o(a0, a1, a2, a3);
	  } else {
	    return curry_4(o, a0, a1, a2, a3, arity);
	  }
	}


	/* No side effect */

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function Stream (source) {
	  this.source = source;
	}

	Stream.prototype.run = function (sink, scheduler) {
	  return this.source.run(sink, scheduler)
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */

	// Non-mutating array operations

	// cons :: a -> [a] -> [a]
	// a with x prepended
	function cons(x, a) {
	  var l = a.length;
	  var b = new Array(l + 1);
	  b[0] = x;
	  for (var i = 0; i < l; ++i) {
	    b[i + 1] = a[i];
	  }
	  return b;
	}

	// append :: a -> [a] -> [a]
	// a with x appended
	function append(x, a) {
	  var l = a.length;
	  var b = new Array(l + 1);
	  for (var i = 0; i < l; ++i) {
	    b[i] = a[i];
	  }

	  b[l] = x;
	  return b;
	}

	// drop :: Int -> [a] -> [a]
	// drop first n elements
	function drop(n, a) {
	  // eslint-disable-line complexity
	  if (n < 0) {
	    throw new TypeError('n must be >= 0');
	  }

	  var l = a.length;
	  if (n === 0 || l === 0) {
	    return a;
	  }

	  if (n >= l) {
	    return [];
	  }

	  return unsafeDrop(n, a, l - n);
	}

	// unsafeDrop :: Int -> [a] -> Int -> [a]
	// Internal helper for drop
	function unsafeDrop(n, a, l) {
	  var b = new Array(l);
	  for (var i = 0; i < l; ++i) {
	    b[i] = a[n + i];
	  }
	  return b;
	}

	// tail :: [a] -> [a]
	// drop head element
	function tail(a) {
	  return drop(1, a);
	}

	// map :: (a -> b) -> [a] -> [b]
	// transform each element with f
	function map(f, a) {
	  var l = a.length;
	  var b = new Array(l);
	  for (var i = 0; i < l; ++i) {
	    b[i] = f(a[i]);
	  }
	  return b;
	}

	// reduce :: (a -> b -> a) -> a -> [b] -> a
	// accumulate via left-fold
	function reduce(f, z, a) {
	  var r = z;
	  for (var i = 0, l = a.length; i < l; ++i) {
	    r = f(r, a[i], i);
	  }
	  return r;
	}

	// replace :: a -> Int -> [a]
	// replace element at index
	function replace(x, i, a) {
	  // eslint-disable-line complexity
	  if (i < 0) {
	    throw new TypeError('i must be >= 0');
	  }

	  var l = a.length;
	  var b = new Array(l);
	  for (var j = 0; j < l; ++j) {
	    b[j] = i === j ? x : a[j];
	  }
	  return b;
	}

	// remove :: Int -> [a] -> [a]
	// remove element at index
	function remove(i, a) {
	  // eslint-disable-line complexity
	  if (i < 0) {
	    throw new TypeError('i must be >= 0');
	  }

	  var l = a.length;
	  if (l === 0 || i >= l) {
	    // exit early if index beyond end of array
	    return a;
	  }

	  if (l === 1) {
	    // exit early if index in bounds and length === 1
	    return [];
	  }

	  return unsafeRemove(i, a, l - 1);
	}

	// unsafeRemove :: Int -> [a] -> Int -> [a]
	// Internal helper to remove element at index
	function unsafeRemove(i, a, l) {
	  var b = new Array(l);
	  var j = void 0;
	  for (j = 0; j < i; ++j) {
	    b[j] = a[j];
	  }
	  for (j = i; j < l; ++j) {
	    b[j] = a[j + 1];
	  }

	  return b;
	}

	// removeAll :: (a -> boolean) -> [a] -> [a]
	// remove all elements matching a predicate
	// @deprecated
	function removeAll(f, a) {
	  var l = a.length;
	  var b = new Array(l);
	  var j = 0;
	  for (var x, i = 0; i < l; ++i) {
	    x = a[i];
	    if (!f(x)) {
	      b[j] = x;
	      ++j;
	    }
	  }

	  b.length = j;
	  return b;
	}

	// findIndex :: a -> [a] -> Int
	// find index of x in a, from the left
	function findIndex(x, a) {
	  for (var i = 0, l = a.length; i < l; ++i) {
	    if (x === a[i]) {
	      return i;
	    }
	  }
	  return -1;
	}

	// isArrayLike :: * -> boolean
	// Return true iff x is array-like
	function isArrayLike(x) {
	  return x != null && typeof x.length === 'number' && typeof x !== 'function';
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */

	// id :: a -> a
	var id = function id(x) {
	  return x;
	};

	// compose :: (b -> c) -> (a -> b) -> (a -> c)
	var compose = function compose(f, g) {
	  return function (x) {
	    return f(g(x));
	  };
	};

	// apply :: (a -> b) -> a -> b
	var apply = function apply(f, x) {
	  return f(x);
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Create a new Disposable which will dispose its underlying resource.
	 * @param {function} dispose function
	 * @param {*?} data any data to be passed to disposer function
	 * @constructor
	 */
	function Disposable (dispose, data) {
	  this._dispose = dispose;
	  this._data = data;
	}

	Disposable.prototype.dispose = function () {
	  return this._dispose(this._data)
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function SettableDisposable () {
	  this.disposable = void 0;
	  this.disposed = false;
	  this._resolve = void 0;

	  var self = this;
	  this.result = new Promise(function (resolve) {
	    self._resolve = resolve;
	  });
	}

	SettableDisposable.prototype.setDisposable = function (disposable) {
	  if (this.disposable !== void 0) {
	    throw new Error('setDisposable called more than once')
	  }

	  this.disposable = disposable;

	  if (this.disposed) {
	    this._resolve(disposable.dispose());
	  }
	};

	SettableDisposable.prototype.dispose = function () {
	  if (this.disposed) {
	    return this.result
	  }

	  this.disposed = true;

	  if (this.disposable !== void 0) {
	    this.result = this.disposable.dispose();
	  }

	  return this.result
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function isPromise (p) {
	  return p !== null && typeof p === 'object' && typeof p.then === 'function'
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	var map$1 = map;
	var identity = id;

	/**
	 * Call disposable.dispose.  If it returns a promise, catch promise
	 * error and forward it through the provided sink.
	 * @param {number} t time
	 * @param {{dispose: function}} disposable
	 * @param {{error: function}} sink
	 * @return {*} result of disposable.dispose
	 */
	function tryDispose (t, disposable, sink) {
	  var result = disposeSafely(disposable);
	  return isPromise(result)
	    ? result.catch(function (e) {
	      sink.error(t, e);
	    })
	    : result
	}

	/**
	 * Create a new Disposable which will dispose its underlying resource
	 * at most once.
	 * @param {function} dispose function
	 * @param {*?} data any data to be passed to disposer function
	 * @return {Disposable}
	 */
	function create (dispose, data) {
	  return once(new Disposable(dispose, data))
	}

	/**
	 * Create a noop disposable. Can be used to satisfy a Disposable
	 * requirement when no actual resource needs to be disposed.
	 * @return {Disposable|exports|module.exports}
	 */
	function empty$1 () {
	  return new Disposable(identity, void 0)
	}

	/**
	 * Create a disposable that will dispose all input disposables in parallel.
	 * @param {Array<Disposable>} disposables
	 * @return {Disposable}
	 */
	function all (disposables) {
	  return create(disposeAll, disposables)
	}

	function disposeAll (disposables) {
	  return Promise.all(map$1(disposeSafely, disposables))
	}

	function disposeSafely (disposable) {
	  try {
	    return disposable.dispose()
	  } catch (e) {
	    return Promise.reject(e)
	  }
	}

	/**
	 * Create a disposable from a promise for another disposable
	 * @param {Promise<Disposable>} disposablePromise
	 * @return {Disposable}
	 */


	/**
	 * Create a disposable proxy that allows its underlying disposable to
	 * be set later.
	 * @return {SettableDisposable}
	 */
	function settable () {
	  return new SettableDisposable()
	}

	/**
	 * Wrap an existing disposable (which may not already have been once()d)
	 * so that it will only dispose its underlying resource at most once.
	 * @param {{ dispose: function() }} disposable
	 * @return {Disposable} wrapped disposable
	 */
	function once (disposable) {
	  return new Disposable(disposeMemoized, memoized(disposable))
	}

	function disposeMemoized (memoized) {
	  if (!memoized.disposed) {
	    memoized.disposed = true;
	    memoized.value = disposeSafely(memoized.disposable);
	    memoized.disposable = void 0;
	  }

	  return memoized.value
	}

	function memoized (disposable) {
	  return { disposed: false, disposable: disposable, value: void 0 }
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function fatalError (e) {
	  setTimeout(function () {
	    throw e
	  }, 0);
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function PropagateTask (run, value, sink) {
	  this._run = run;
	  this.value = value;
	  this.sink = sink;
	  this.active = true;
	}

	PropagateTask.event = function (value, sink) {
	  return new PropagateTask(emit, value, sink)
	};

	PropagateTask.end = function (value, sink) {
	  return new PropagateTask(end, value, sink)
	};

	PropagateTask.error = function (value, sink) {
	  return new PropagateTask(error, value, sink)
	};

	PropagateTask.prototype.dispose = function () {
	  this.active = false;
	};

	PropagateTask.prototype.run = function (t) {
	  if (!this.active) {
	    return
	  }
	  this._run(t, this.value, this.sink);
	};

	PropagateTask.prototype.error = function (t, e) {
	  if (!this.active) {
	    return fatalError(e)
	  }
	  this.sink.error(t, e);
	};

	function error (t, e, sink) {
	  sink.error(t, e);
	}

	function emit (t, x, sink) {
	  sink.event(t, x);
	}

	function end (t, x, sink) {
	  sink.end(t, x);
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Stream containing only x
	 * @param {*} x
	 * @returns {Stream}
	 */
	function of (x) {
	  return new Stream(new Just(x))
	}

	function Just (x) {
	  this.value = x;
	}

	Just.prototype.run = function (sink, scheduler) {
	  return scheduler.asap(new PropagateTask(runJust, this.value, sink))
	};

	function runJust (t, x, sink) {
	  sink.event(t, x);
	  sink.end(t, void 0);
	}

	/**
	 * Stream containing no events and ends immediately
	 * @returns {Stream}
	 */
	function empty () {
	  return EMPTY
	}

	function EmptySource () {}

	EmptySource.prototype.run = function (sink, scheduler) {
	  var task = PropagateTask.end(void 0, sink);
	  scheduler.asap(task);

	  return create(disposeEmpty, task)
	};

	function disposeEmpty (task) {
	  return task.dispose()
	}

	var EMPTY = new Stream(new EmptySource());

	/**
	 * Stream containing no events and never ends
	 * @returns {Stream}
	 */

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function fromArray (a) {
	  return new Stream(new ArraySource(a))
	}

	function ArraySource (a) {
	  this.array = a;
	}

	ArraySource.prototype.run = function (sink, scheduler) {
	  return scheduler.asap(new PropagateTask(runProducer, this.array, sink))
	};

	function runProducer (t, array, sink) {
	  for (var i = 0, l = array.length; i < l && this.active; ++i) {
	    sink.event(t, array[i]);
	  }

	  this.active && sink.end(t);
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/* global Set, Symbol */
	var iteratorSymbol;
	// Firefox ships a partial implementation using the name @@iterator.
	// https://bugzilla.mozilla.org/show_bug.cgi?id=907077#c14
	if (typeof Set === 'function' && typeof new Set()['@@iterator'] === 'function') {
	  iteratorSymbol = '@@iterator';
	} else {
	  iteratorSymbol = typeof Symbol === 'function' ? Symbol.iterator
	  : '_es6shim_iterator_';
	}

	function isIterable (o) {
	  return typeof o[iteratorSymbol] === 'function'
	}

	function getIterator (o) {
	  return o[iteratorSymbol]()
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function fromIterable (iterable) {
	  return new Stream(new IterableSource(iterable))
	}

	function IterableSource (iterable) {
	  this.iterable = iterable;
	}

	IterableSource.prototype.run = function (sink, scheduler) {
	  return scheduler.asap(new PropagateTask(runProducer$1, getIterator(this.iterable), sink))
	};

	function runProducer$1 (t, iterator, sink) {
	  var r = iterator.next();

	  while (!r.done && this.active) {
	    sink.event(t, r.value);
	    r = iterator.next();
	  }

	  sink.end(t, r.value);
	}

	function symbolObservablePonyfill(root) {
		var result;
		var Symbol = root.Symbol;

		if (typeof Symbol === 'function') {
			if (Symbol.observable) {
				result = Symbol.observable;
			} else {
				result = Symbol('observable');
				Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	}

	/* global window */
	var root;

	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (typeof module !== 'undefined') {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = symbolObservablePonyfill(root);

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function getObservable (o) { // eslint-disable-line complexity
	  var obs = null;
	  if (o) {
	  // Access foreign method only once
	    var method = o[result];
	    if (typeof method === 'function') {
	      obs = method.call(o);
	      if (!(obs && typeof obs.subscribe === 'function')) {
	        throw new TypeError('invalid observable ' + obs)
	      }
	    }
	  }

	  return obs
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function tryEvent (t, x, sink) {
	  try {
	    sink.event(t, x);
	  } catch (e) {
	    sink.error(t, e);
	  }
	}

	function tryEnd (t, x, sink) {
	  try {
	    sink.end(t, x);
	  } catch (e) {
	    sink.error(t, e);
	  }
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function fromObservable (observable) {
	  return new Stream(new ObservableSource(observable))
	}

	function ObservableSource (observable) {
	  this.observable = observable;
	}

	ObservableSource.prototype.run = function (sink, scheduler) {
	  var sub = this.observable.subscribe(new SubscriberSink(sink, scheduler));
	  if (typeof sub === 'function') {
	    return create(sub)
	  } else if (sub && typeof sub.unsubscribe === 'function') {
	    return create(unsubscribe, sub)
	  }

	  throw new TypeError('Observable returned invalid subscription ' + String(sub))
	};

	function SubscriberSink (sink, scheduler) {
	  this.sink = sink;
	  this.scheduler = scheduler;
	}

	SubscriberSink.prototype.next = function (x) {
	  tryEvent(this.scheduler.now(), x, this.sink);
	};

	SubscriberSink.prototype.complete = function (x) {
	  tryEnd(this.scheduler.now(), x, this.sink);
	};

	SubscriberSink.prototype.error = function (e) {
	  this.sink.error(this.scheduler.now(), e);
	};

	function unsubscribe (subscription) {
	  return subscription.unsubscribe()
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function from (a) { // eslint-disable-line complexity
	  if (a instanceof Stream) {
	    return a
	  }

	  var observable = getObservable(a);
	  if (observable != null) {
	    return fromObservable(observable)
	  }

	  if (Array.isArray(a) || isArrayLike(a)) {
	    return fromArray(a)
	  }

	  if (isIterable(a)) {
	    return fromIterable(a)
	  }

	  throw new TypeError('from(x) must be observable, iterable, or array-like: ' + a)
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Create a stream that emits the current time periodically
	 * @param {Number} period periodicity of events in millis
	 * @param {*} deprecatedValue @deprecated value to emit each period
	 * @returns {Stream} new stream that emits the current time every period
	 */

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function ScheduledTask (delay, period, task, scheduler) {
	  this.time = delay;
	  this.period = period;
	  this.task = task;
	  this.scheduler = scheduler;
	  this.active = true;
	}

	ScheduledTask.prototype.run = function () {
	  return this.task.run(this.time)
	};

	ScheduledTask.prototype.error = function (e) {
	  return this.task.error(this.time, e)
	};

	ScheduledTask.prototype.dispose = function () {
	  this.scheduler.cancel(this);
	  return this.task.dispose()
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function defer (task) {
	  return Promise.resolve(task).then(runTask)
	}

	function runTask (task) {
	  try {
	    return task.run()
	  } catch (e) {
	    return task.error(e)
	  }
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function Scheduler (timer, timeline) {
	  this.timer = timer;
	  this.timeline = timeline;

	  this._timer = null;
	  this._nextArrival = Infinity;

	  var self = this;
	  this._runReadyTasksBound = function () {
	    self._runReadyTasks(self.now());
	  };
	}

	Scheduler.prototype.now = function () {
	  return this.timer.now()
	};

	Scheduler.prototype.asap = function (task) {
	  return this.schedule(0, -1, task)
	};

	Scheduler.prototype.delay = function (delay, task) {
	  return this.schedule(delay, -1, task)
	};

	Scheduler.prototype.periodic = function (period, task) {
	  return this.schedule(0, period, task)
	};

	Scheduler.prototype.schedule = function (delay, period, task) {
	  var now = this.now();
	  var st = new ScheduledTask(now + Math.max(0, delay), period, task, this);

	  this.timeline.add(st);
	  this._scheduleNextRun(now);
	  return st
	};

	Scheduler.prototype.cancel = function (task) {
	  task.active = false;
	  if (this.timeline.remove(task)) {
	    this._reschedule();
	  }
	};

	Scheduler.prototype.cancelAll = function (f) {
	  this.timeline.removeAll(f);
	  this._reschedule();
	};

	Scheduler.prototype._reschedule = function () {
	  if (this.timeline.isEmpty()) {
	    this._unschedule();
	  } else {
	    this._scheduleNextRun(this.now());
	  }
	};

	Scheduler.prototype._unschedule = function () {
	  this.timer.clearTimer(this._timer);
	  this._timer = null;
	};

	Scheduler.prototype._scheduleNextRun = function (now) { // eslint-disable-line complexity
	  if (this.timeline.isEmpty()) {
	    return
	  }

	  var nextArrival = this.timeline.nextArrival();

	  if (this._timer === null) {
	    this._scheduleNextArrival(nextArrival, now);
	  } else if (nextArrival < this._nextArrival) {
	    this._unschedule();
	    this._scheduleNextArrival(nextArrival, now);
	  }
	};

	Scheduler.prototype._scheduleNextArrival = function (nextArrival, now) {
	  this._nextArrival = nextArrival;
	  var delay = Math.max(0, nextArrival - now);
	  this._timer = this.timer.setTimer(this._runReadyTasksBound, delay);
	};

	Scheduler.prototype._runReadyTasks = function (now) {
	  this._timer = null;
	  this.timeline.runTasks(now, runTask);
	  this._scheduleNextRun(this.now());
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/* global setTimeout, clearTimeout */

	function ClockTimer () {}

	ClockTimer.prototype.now = Date.now;

	ClockTimer.prototype.setTimer = function (f, dt) {
	  return dt <= 0 ? runAsap(f) : setTimeout(f, dt)
	};

	ClockTimer.prototype.clearTimer = function (t) {
	  return t instanceof Asap ? t.cancel() : clearTimeout(t)
	};

	function Asap (f) {
	  this.f = f;
	  this.active = true;
	}

	Asap.prototype.run = function () {
	  return this.active && this.f()
	};

	Asap.prototype.error = function (e) {
	  throw e
	};

	Asap.prototype.cancel = function () {
	  this.active = false;
	};

	function runAsap (f) {
	  var task = new Asap(f);
	  defer(task);
	  return task
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function Timeline () {
	  this.tasks = [];
	}

	Timeline.prototype.nextArrival = function () {
	  return this.isEmpty() ? Infinity : this.tasks[0].time
	};

	Timeline.prototype.isEmpty = function () {
	  return this.tasks.length === 0
	};

	Timeline.prototype.add = function (st) {
	  insertByTime(st, this.tasks);
	};

	Timeline.prototype.remove = function (st) {
	  var i = binarySearch(st.time, this.tasks);

	  if (i >= 0 && i < this.tasks.length) {
	    var at = findIndex(st, this.tasks[i].events);
	    if (at >= 0) {
	      this.tasks[i].events.splice(at, 1);
	      return true
	    }
	  }

	  return false
	};

	Timeline.prototype.removeAll = function (f) {
	  for (var i = 0, l = this.tasks.length; i < l; ++i) {
	    removeAllFrom(f, this.tasks[i]);
	  }
	};

	Timeline.prototype.runTasks = function (t, runTask) {
	  var tasks = this.tasks;
	  var l = tasks.length;
	  var i = 0;

	  while (i < l && tasks[i].time <= t) {
	    ++i;
	  }

	  this.tasks = tasks.slice(i);

	  // Run all ready tasks
	  for (var j = 0; j < i; ++j) {
	    this.tasks = runTasks(runTask, tasks[j], this.tasks);
	  }
	};

	function runTasks (runTask, timeslot, tasks) { // eslint-disable-line complexity
	  var events = timeslot.events;
	  for (var i = 0; i < events.length; ++i) {
	    var task = events[i];

	    if (task.active) {
	      runTask(task);

	      // Reschedule periodic repeating tasks
	      // Check active again, since a task may have canceled itself
	      if (task.period >= 0 && task.active) {
	        task.time = task.time + task.period;
	        insertByTime(task, tasks);
	      }
	    }
	  }

	  return tasks
	}

	function insertByTime (task, timeslots) { // eslint-disable-line complexity
	  var l = timeslots.length;

	  if (l === 0) {
	    timeslots.push(newTimeslot(task.time, [task]));
	    return
	  }

	  var i = binarySearch(task.time, timeslots);

	  if (i >= l) {
	    timeslots.push(newTimeslot(task.time, [task]));
	  } else if (task.time === timeslots[i].time) {
	    timeslots[i].events.push(task);
	  } else {
	    timeslots.splice(i, 0, newTimeslot(task.time, [task]));
	  }
	}

	function removeAllFrom (f, timeslot) {
	  timeslot.events = removeAll(f, timeslot.events);
	}

	function binarySearch (t, sortedArray) { // eslint-disable-line complexity
	  var lo = 0;
	  var hi = sortedArray.length;
	  var mid, y;

	  while (lo < hi) {
	    mid = Math.floor((lo + hi) / 2);
	    y = sortedArray[mid];

	    if (t === y.time) {
	      return mid
	    } else if (t < y.time) {
	      hi = mid;
	    } else {
	      lo = mid + 1;
	    }
	  }
	  return hi
	}

	function newTimeslot (t, events) {
	  return { time: t, events: events }
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var defaultScheduler = new Scheduler(new ClockTimer(), new Timeline());

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function subscribe (subscriber, stream) {
	  if (Object(subscriber) !== subscriber) {
	    throw new TypeError('subscriber must be an object')
	  }

	  var disposable = settable();
	  var observer = new SubscribeObserver(fatalError, subscriber, disposable);

	  disposable.setDisposable(stream.source.run(observer, defaultScheduler));

	  return new Subscription(disposable)
	}

	function SubscribeObserver (fatalError$$1, subscriber, disposable) {
	  this.fatalError = fatalError$$1;
	  this.subscriber = subscriber;
	  this.disposable = disposable;
	}

	SubscribeObserver.prototype.event = function (t, x) {
	  if (!this.disposable.disposed && typeof this.subscriber.next === 'function') {
	    this.subscriber.next(x);
	  }
	};

	SubscribeObserver.prototype.end = function (t, x) {
	  if (!this.disposable.disposed) {
	    var s = this.subscriber;
	    var fatalError$$1 = this.fatalError;
	    Promise.resolve(this.disposable.dispose()).then(function () {
	      if (typeof s.complete === 'function') {
	        s.complete(x);
	      }
	    }).catch(function (e) {
	      throwError(e, s, fatalError$$1);
	    });
	  }
	};

	SubscribeObserver.prototype.error = function (t, e) {
	  var s = this.subscriber;
	  var fatalError$$1 = this.fatalError;
	  Promise.resolve(this.disposable.dispose()).then(function () {
	    throwError(e, s, fatalError$$1);
	  });
	};

	function Subscription (disposable) {
	  this.disposable = disposable;
	}

	Subscription.prototype.unsubscribe = function () {
	  this.disposable.dispose();
	};

	function throwError (e1, subscriber, throwError) {
	  if (typeof subscriber.error === 'function') {
	    try {
	      subscriber.error(e1);
	    } catch (e2) {
	      throwError(e2);
	    }
	  } else {
	    throwError(e1);
	  }
	}

	/** @license MIT License (c) copyright 2010-2017 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function thru (f, stream) {
	  return f(stream)
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function EventTargetSource (event, source, capture) {
	  this.event = event;
	  this.source = source;
	  this.capture = capture;
	}

	EventTargetSource.prototype.run = function (sink, scheduler) {
	  function addEvent (e) {
	    tryEvent(scheduler.now(), e, sink);
	  }

	  this.source.addEventListener(this.event, addEvent, this.capture);

	  return create(disposeEventTarget,
	    { target: this, addEvent: addEvent })
	};

	function disposeEventTarget (info) {
	  var target = info.target;
	  target.source.removeEventListener(target.event, info.addEvent, target.capture);
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function DeferredSink (sink) {
	  this.sink = sink;
	  this.events = [];
	  this.active = true;
	}

	DeferredSink.prototype.event = function (t, x) {
	  if (!this.active) {
	    return
	  }

	  if (this.events.length === 0) {
	    defer(new PropagateAllTask(this.sink, t, this.events));
	  }

	  this.events.push({ time: t, value: x });
	};

	DeferredSink.prototype.end = function (t, x) {
	  if (!this.active) {
	    return
	  }

	  this._end(new EndTask(t, x, this.sink));
	};

	DeferredSink.prototype.error = function (t, e) {
	  this._end(new ErrorTask(t, e, this.sink));
	};

	DeferredSink.prototype._end = function (task) {
	  this.active = false;
	  defer(task);
	};

	function PropagateAllTask (sink, time, events) {
	  this.sink = sink;
	  this.events = events;
	  this.time = time;
	}

	PropagateAllTask.prototype.run = function () {
	  var events = this.events;
	  var sink = this.sink;
	  var event;

	  for (var i = 0, l = events.length; i < l; ++i) {
	    event = events[i];
	    this.time = event.time;
	    sink.event(event.time, event.value);
	  }

	  events.length = 0;
	};

	PropagateAllTask.prototype.error = function (e) {
	  this.sink.error(this.time, e);
	};

	function EndTask (t, x, sink) {
	  this.time = t;
	  this.value = x;
	  this.sink = sink;
	}

	EndTask.prototype.run = function () {
	  this.sink.end(this.time, this.value);
	};

	EndTask.prototype.error = function (e) {
	  this.sink.error(this.time, e);
	};

	function ErrorTask (t, e, sink) {
	  this.time = t;
	  this.value = e;
	  this.sink = sink;
	}

	ErrorTask.prototype.run = function () {
	  this.sink.error(this.time, this.value);
	};

	ErrorTask.prototype.error = function (e) {
	  throw e
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function EventEmitterSource (event, source) {
	  this.event = event;
	  this.source = source;
	}

	EventEmitterSource.prototype.run = function (sink, scheduler) {
	  // NOTE: Because EventEmitter allows events in the same call stack as
	  // a listener is added, use a DeferredSink to buffer events
	  // until the stack clears, then propagate.  This maintains most.js's
	  // invariant that no event will be delivered in the same call stack
	  // as an observer begins observing.
	  var dsink = new DeferredSink(sink);

	  function addEventVariadic (a) {
	    var l = arguments.length;
	    if (l > 1) {
	      var arr = new Array(l);
	      for (var i = 0; i < l; ++i) {
	        arr[i] = arguments[i];
	      }
	      tryEvent(scheduler.now(), arr, dsink);
	    } else {
	      tryEvent(scheduler.now(), a, dsink);
	    }
	  }

	  this.source.addListener(this.event, addEventVariadic);

	  return create(disposeEventEmitter, { target: this, addEvent: addEventVariadic })
	};

	function disposeEventEmitter (info) {
	  var target = info.target;
	  target.source.removeListener(target.event, info.addEvent);
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Create a stream from an EventTarget, such as a DOM Node, or EventEmitter.
	 * @param {String} event event type name, e.g. 'click'
	 * @param {EventTarget|EventEmitter} source EventTarget or EventEmitter
	 * @param {*?} capture for DOM events, whether to use
	 *  capturing--passed as 3rd parameter to addEventListener.
	 * @returns {Stream} stream containing all events of the specified type
	 * from the source.
	 */
	function fromEvent (event, source, capture) { // eslint-disable-line complexity
	  var s;

	  if (typeof source.addEventListener === 'function' && typeof source.removeEventListener === 'function') {
	    if (arguments.length < 3) {
	      capture = false;
	    }

	    s = new EventTargetSource(event, source, capture);
	  } else if (typeof source.addListener === 'function' && typeof source.removeListener === 'function') {
	    s = new EventEmitterSource(event, source);
	  } else {
	    throw new Error('source must support addEventListener/removeEventListener or addListener/removeListener')
	  }

	  return new Stream(s)
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function withDefaultScheduler (source) {
	  return withScheduler(source, defaultScheduler)
	}

	function withScheduler (source, scheduler) {
	  return new Promise(function (resolve, reject) {
	    runSource(source, scheduler, resolve, reject);
	  })
	}

	function runSource (source, scheduler, resolve, reject) {
	  var disposable = settable();
	  var observer = new Drain(resolve, reject, disposable);

	  disposable.setDisposable(source.run(observer, scheduler));
	}

	function Drain (end, error, disposable) {
	  this._end = end;
	  this._error = error;
	  this._disposable = disposable;
	  this.active = true;
	}

	Drain.prototype.event = function (t, x) {};

	Drain.prototype.end = function (t, x) {
	  if (!this.active) {
	    return
	  }
	  this.active = false;
	  disposeThen(this._end, this._error, this._disposable, x);
	};

	Drain.prototype.error = function (t, e) {
	  this.active = false;
	  disposeThen(this._error, this._error, this._disposable, e);
	};

	function disposeThen (end, error, disposable, x) {
	  Promise.resolve(disposable.dispose()).then(function () {
	    end(x);
	  }, error);
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * A sink mixin that simply forwards event, end, and error to
	 * another sink.
	 * @param sink
	 * @constructor
	 */
	function Pipe (sink) {
	  this.sink = sink;
	}

	Pipe.prototype.event = function (t, x) {
	  return this.sink.event(t, x)
	};

	Pipe.prototype.end = function (t, x) {
	  return this.sink.end(t, x)
	};

	Pipe.prototype.error = function (t, e) {
	  return this.sink.error(t, e)
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function Filter (p, source) {
	  this.p = p;
	  this.source = source;
	}

	/**
	 * Create a filtered source, fusing adjacent filter.filter if possible
	 * @param {function(x:*):boolean} p filtering predicate
	 * @param {{run:function}} source source to filter
	 * @returns {Filter} filtered source
	 */
	Filter.create = function createFilter (p, source) {
	  if (source instanceof Filter) {
	    return new Filter(and(source.p, p), source.source)
	  }

	  return new Filter(p, source)
	};

	Filter.prototype.run = function (sink, scheduler) {
	  return this.source.run(new FilterSink(this.p, sink), scheduler)
	};

	function FilterSink (p, sink) {
	  this.p = p;
	  this.sink = sink;
	}

	FilterSink.prototype.end = Pipe.prototype.end;
	FilterSink.prototype.error = Pipe.prototype.error;

	FilterSink.prototype.event = function (t, x) {
	  var p = this.p;
	  p(x) && this.sink.event(t, x);
	};

	function and (p, q) {
	  return function (x) {
	    return p(x) && q(x)
	  }
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function FilterMap (p, f, source) {
	  this.p = p;
	  this.f = f;
	  this.source = source;
	}

	FilterMap.prototype.run = function (sink, scheduler) {
	  return this.source.run(new FilterMapSink(this.p, this.f, sink), scheduler)
	};

	function FilterMapSink (p, f, sink) {
	  this.p = p;
	  this.f = f;
	  this.sink = sink;
	}

	FilterMapSink.prototype.event = function (t, x) {
	  var f = this.f;
	  var p = this.p;
	  p(x) && this.sink.event(t, f(x));
	};

	FilterMapSink.prototype.end = Pipe.prototype.end;
	FilterMapSink.prototype.error = Pipe.prototype.error;

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function Map (f, source) {
	  this.f = f;
	  this.source = source;
	}

	/**
	 * Create a mapped source, fusing adjacent map.map, filter.map,
	 * and filter.map.map if possible
	 * @param {function(*):*} f mapping function
	 * @param {{run:function}} source source to map
	 * @returns {Map|FilterMap} mapped source, possibly fused
	 */
	Map.create = function createMap (f, source) {
	  if (source instanceof Map) {
	    return new Map(compose(f, source.f), source.source)
	  }

	  if (source instanceof Filter) {
	    return new FilterMap(source.p, f, source.source)
	  }

	  return new Map(f, source)
	};

	Map.prototype.run = function (sink, scheduler) { // eslint-disable-line no-extend-native
	  return this.source.run(new MapSink(this.f, sink), scheduler)
	};

	function MapSink (f, sink) {
	  this.f = f;
	  this.sink = sink;
	}

	MapSink.prototype.end = Pipe.prototype.end;
	MapSink.prototype.error = Pipe.prototype.error;

	MapSink.prototype.event = function (t, x) {
	  var f = this.f;
	  this.sink.event(t, f(x));
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Transform each value in the stream by applying f to each
	 * @param {function(*):*} f mapping function
	 * @param {Stream} stream stream to map
	 * @returns {Stream} stream containing items transformed by f
	 */
	function map$2 (f, stream) {
	  return new Stream(Map.create(f, stream.source))
	}

	/**
	* Replace each value in the stream with x
	* @param {*} x
	* @param {Stream} stream
	* @returns {Stream} stream containing items replaced with x
	*/
	function constant (x, stream) {
	  return map$2(function () {
	    return x
	  }, stream)
	}

	/**
	* Perform a side effect for each item in the stream
	* @param {function(x:*):*} f side effect to execute for each item. The
	*  return value will be discarded.
	* @param {Stream} stream stream to tap
	* @returns {Stream} new stream containing the same items as this stream
	*/
	function tap (f, stream) {
	  return new Stream(new Tap(f, stream.source))
	}

	function Tap (f, source) {
	  this.source = source;
	  this.f = f;
	}

	Tap.prototype.run = function (sink, scheduler) {
	  return this.source.run(new TapSink(this.f, sink), scheduler)
	};

	function TapSink (f, sink) {
	  this.sink = sink;
	  this.f = f;
	}

	TapSink.prototype.end = Pipe.prototype.end;
	TapSink.prototype.error = Pipe.prototype.error;

	TapSink.prototype.event = function (t, x) {
	  var f = this.f;
	  f(x);
	  this.sink.event(t, x);
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Observe all the event values in the stream in time order. The
	 * provided function `f` will be called for each event value
	 * @param {function(x:T):*} f function to call with each event value
	 * @param {Stream<T>} stream stream to observe
	 * @return {Promise} promise that fulfills after the stream ends without
	 *  an error, or rejects if the stream ends with an error.
	 */
	function observe (f, stream) {
	  return drain(tap(f, stream))
	}

	/**
	 * "Run" a stream by creating demand and consuming all events
	 * @param {Stream<T>} stream stream to drain
	 * @return {Promise} promise that fulfills after the stream ends without
	 *  an error, or rejects if the stream ends with an error.
	 */
	function drain (stream) {
	  return withDefaultScheduler(stream.source)
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Generalized feedback loop. Call a stepper function for each event. The stepper
	 * will be called with 2 params: the current seed and the an event value.  It must
	 * return a new { seed, value } pair. The `seed` will be fed back into the next
	 * invocation of stepper, and the `value` will be propagated as the event value.
	 * @param {function(seed:*, value:*):{seed:*, value:*}} stepper loop step function
	 * @param {*} seed initial seed value passed to first stepper call
	 * @param {Stream} stream event stream
	 * @returns {Stream} new stream whose values are the `value` field of the objects
	 * returned by the stepper
	 */
	function loop (stepper, seed, stream) {
	  return new Stream(new Loop(stepper, seed, stream.source))
	}

	function Loop (stepper, seed, source) {
	  this.step = stepper;
	  this.seed = seed;
	  this.source = source;
	}

	Loop.prototype.run = function (sink, scheduler) {
	  return this.source.run(new LoopSink(this.step, this.seed, sink), scheduler)
	};

	function LoopSink (stepper, seed, sink) {
	  this.step = stepper;
	  this.seed = seed;
	  this.sink = sink;
	}

	LoopSink.prototype.error = Pipe.prototype.error;

	LoopSink.prototype.event = function (t, x) {
	  var result = this.step(this.seed, x);
	  this.seed = result.seed;
	  this.sink.event(t, result.value);
	};

	LoopSink.prototype.end = function (t) {
	  this.sink.end(t, this.seed);
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Create a stream containing successive reduce results of applying f to
	 * the previous reduce result and the current stream item.
	 * @param {function(result:*, x:*):*} f reducer function
	 * @param {*} initial initial value
	 * @param {Stream} stream stream to scan
	 * @returns {Stream} new stream containing successive reduce results
	 */
	function scan (f, initial, stream) {
	  return new Stream(new Scan(f, initial, stream.source))
	}

	function Scan (f, z, source) {
	  this.source = source;
	  this.f = f;
	  this.value = z;
	}

	Scan.prototype.run = function (sink, scheduler) {
	  var d1 = scheduler.asap(PropagateTask.event(this.value, sink));
	  var d2 = this.source.run(new ScanSink(this.f, this.value, sink), scheduler);
	  return all([d1, d2])
	};

	function ScanSink (f, z, sink) {
	  this.f = f;
	  this.value = z;
	  this.sink = sink;
	}

	ScanSink.prototype.event = function (t, x) {
	  var f = this.f;
	  this.value = f(this.value, x);
	  this.sink.event(t, this.value);
	};

	ScanSink.prototype.error = Pipe.prototype.error;
	ScanSink.prototype.end = Pipe.prototype.end;

	/**
	* Reduce a stream to produce a single result.  Note that reducing an infinite
	* stream will return a Promise that never fulfills, but that may reject if an error
	* occurs.
	* @param {function(result:*, x:*):*} f reducer function
	* @param {*} initial initial value
	* @param {Stream} stream to reduce
	* @returns {Promise} promise for the file result of the reduce
	*/
	function reduce$1 (f, initial, stream) {
	  return withDefaultScheduler(new Reduce(f, initial, stream.source))
	}

	function Reduce (f, z, source) {
	  this.source = source;
	  this.f = f;
	  this.value = z;
	}

	Reduce.prototype.run = function (sink, scheduler) {
	  return this.source.run(new ReduceSink(this.f, this.value, sink), scheduler)
	};

	function ReduceSink (f, z, sink) {
	  this.f = f;
	  this.value = z;
	  this.sink = sink;
	}

	ReduceSink.prototype.event = function (t, x) {
	  var f = this.f;
	  this.value = f(this.value, x);
	  this.sink.event(t, this.value);
	};

	ReduceSink.prototype.error = Pipe.prototype.error;

	ReduceSink.prototype.end = function (t) {
	  this.sink.end(t, this.value);
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Compute a stream by unfolding tuples of future values from a seed value
	 * Event times may be controlled by returning a Promise from f
	 * @param {function(seed:*):{value:*, seed:*, done:boolean}|Promise<{value:*, seed:*, done:boolean}>} f unfolding function accepts
	 *  a seed and returns a new tuple with a value, new seed, and boolean done flag.
	 *  If tuple.done is true, the stream will end.
	 * @param {*} seed seed value
	 * @returns {Stream} stream containing all value of all tuples produced by the
	 *  unfolding function.
	 */

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Compute a stream by iteratively calling f to produce values
	 * Event times may be controlled by returning a Promise from f
	 * @param {function(x:*):*|Promise<*>} f
	 * @param {*} x initial value
	 * @returns {Stream}
	 */

	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Compute a stream using an *async* generator, which yields promises
	 * to control event times.
	 * @param f
	 * @returns {Stream}
	 */

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function continueWith (f, stream) {
	  return new Stream(new ContinueWith(f, stream.source))
	}

	function ContinueWith (f, source) {
	  this.f = f;
	  this.source = source;
	}

	ContinueWith.prototype.run = function (sink, scheduler) {
	  return new ContinueWithSink(this.f, this.source, sink, scheduler)
	};

	function ContinueWithSink (f, source, sink, scheduler) {
	  this.f = f;
	  this.sink = sink;
	  this.scheduler = scheduler;
	  this.active = true;
	  this.disposable = once(source.run(this, scheduler));
	}

	ContinueWithSink.prototype.error = Pipe.prototype.error;

	ContinueWithSink.prototype.event = function (t, x) {
	  if (!this.active) {
	    return
	  }
	  this.sink.event(t, x);
	};

	ContinueWithSink.prototype.end = function (t, x) {
	  if (!this.active) {
	    return
	  }

	  tryDispose(t, this.disposable, this.sink);
	  this._startNext(t, x, this.sink);
	};

	ContinueWithSink.prototype._startNext = function (t, x, sink) {
	  try {
	    this.disposable = this._continue(this.f, x, sink);
	  } catch (e) {
	    sink.error(t, e);
	  }
	};

	ContinueWithSink.prototype._continue = function (f, x, sink) {
	  return f(x).source.run(sink, this.scheduler)
	};

	ContinueWithSink.prototype.dispose = function () {
	  this.active = false;
	  return this.disposable.dispose()
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * @param {*} x value to prepend
	 * @param {Stream} stream
	 * @returns {Stream} new stream with x prepended
	 */
	function cons$1 (x, stream) {
	  return concat(of(x), stream)
	}

	/**
	* @param {Stream} left
	* @param {Stream} right
	* @returns {Stream} new stream containing all events in left followed by all
	*  events in right.  This *timeshifts* right to the end of left.
	*/
	function concat (left, right) {
	  return continueWith(function () {
	    return right
	  }, left)
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function IndexSink (i, sink) {
	  this.sink = sink;
	  this.index = i;
	  this.active = true;
	  this.value = void 0;
	}

	IndexSink.prototype.event = function (t, x) {
	  if (!this.active) {
	    return
	  }
	  this.value = x;
	  this.sink.event(t, this);
	};

	IndexSink.prototype.end = function (t, x) {
	  if (!this.active) {
	    return
	  }
	  this.active = false;
	  this.sink.end(t, { index: this.index, value: x });
	};

	IndexSink.prototype.error = Pipe.prototype.error;

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function invoke (f, args) {
	  /* eslint complexity: [2,7] */
	  switch (args.length) {
	    case 0: return f()
	    case 1: return f(args[0])
	    case 2: return f(args[0], args[1])
	    case 3: return f(args[0], args[1], args[2])
	    case 4: return f(args[0], args[1], args[2], args[3])
	    case 5: return f(args[0], args[1], args[2], args[3], args[4])
	    default:
	      return f.apply(void 0, args)
	  }
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var map$3 = map;
	var tail$1 = tail;

	/**
	 * Combine latest events from all input streams
	 * @param {function(...events):*} f function to combine most recent events
	 * @returns {Stream} stream containing the result of applying f to the most recent
	 *  event of each input stream, whenever a new event arrives on any stream.
	 */
	function combine (f /*, ...streams */) {
	  return combineArray(f, tail$1(arguments))
	}

	/**
	* Combine latest events from all input streams
	* @param {function(...events):*} f function to combine most recent events
	* @param {[Stream]} streams most recent events
	* @returns {Stream} stream containing the result of applying f to the most recent
	*  event of each input stream, whenever a new event arrives on any stream.
	*/
	function combineArray (f, streams) {
	  var l = streams.length;
	  return l === 0 ? empty()
	  : l === 1 ? map$2(f, streams[0])
	  : new Stream(combineSources(f, streams))
	}

	function combineSources (f, streams) {
	  return new Combine(f, map$3(getSource, streams))
	}

	function getSource (stream) {
	  return stream.source
	}

	function Combine (f, sources) {
	  this.f = f;
	  this.sources = sources;
	}

	Combine.prototype.run = function (sink, scheduler) {
	  var l = this.sources.length;
	  var disposables = new Array(l);
	  var sinks = new Array(l);

	  var mergeSink = new CombineSink(disposables, sinks, sink, this.f);

	  for (var indexSink, i = 0; i < l; ++i) {
	    indexSink = sinks[i] = new IndexSink(i, mergeSink);
	    disposables[i] = this.sources[i].run(indexSink, scheduler);
	  }

	  return all(disposables)
	};

	function CombineSink (disposables, sinks, sink, f) {
	  this.sink = sink;
	  this.disposables = disposables;
	  this.sinks = sinks;
	  this.f = f;

	  var l = sinks.length;
	  this.awaiting = l;
	  this.values = new Array(l);
	  this.hasValue = new Array(l);
	  for (var i = 0; i < l; ++i) {
	    this.hasValue[i] = false;
	  }

	  this.activeCount = sinks.length;
	}

	CombineSink.prototype.error = Pipe.prototype.error;

	CombineSink.prototype.event = function (t, indexedValue) {
	  var i = indexedValue.index;
	  var awaiting = this._updateReady(i);

	  this.values[i] = indexedValue.value;
	  if (awaiting === 0) {
	    this.sink.event(t, invoke(this.f, this.values));
	  }
	};

	CombineSink.prototype._updateReady = function (index) {
	  if (this.awaiting > 0) {
	    if (!this.hasValue[index]) {
	      this.hasValue[index] = true;
	      this.awaiting -= 1;
	    }
	  }
	  return this.awaiting
	};

	CombineSink.prototype.end = function (t, indexedValue) {
	  tryDispose(t, this.disposables[indexedValue.index], this.sink);
	  if (--this.activeCount === 0) {
	    this.sink.end(t, indexedValue.value);
	  }
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Assume fs is a stream containing functions, and apply the latest function
	 * in fs to the latest value in xs.
	 * fs:         --f---------g--------h------>
	 * xs:         -a-------b-------c-------d-->
	 * ap(fs, xs): --fa-----fb-gb---gc--hc--hd->
	 * @param {Stream} fs stream of functions to apply to the latest x
	 * @param {Stream} xs stream of values to which to apply all the latest f
	 * @returns {Stream} stream containing all the applications of fs to xs
	 */
	function ap (fs, xs) {
	  return combine(apply, fs, xs)
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Transform a stream by passing its events through a transducer.
	 * @param  {function} transducer transducer function
	 * @param  {Stream} stream stream whose events will be passed through the
	 *  transducer
	 * @return {Stream} stream of events transformed by the transducer
	 */
	function transduce (transducer, stream) {
	  return new Stream(new Transduce(transducer, stream.source))
	}

	function Transduce (transducer, source) {
	  this.transducer = transducer;
	  this.source = source;
	}

	Transduce.prototype.run = function (sink, scheduler) {
	  var xf = this.transducer(new Transformer(sink));
	  return this.source.run(new TransduceSink(getTxHandler(xf), sink), scheduler)
	};

	function TransduceSink (adapter, sink) {
	  this.xf = adapter;
	  this.sink = sink;
	}

	TransduceSink.prototype.event = function (t, x) {
	  var next = this.xf.step(t, x);

	  return this.xf.isReduced(next)
	    ? this.sink.end(t, this.xf.getResult(next))
	    : next
	};

	TransduceSink.prototype.end = function (t, x) {
	  return this.xf.result(x)
	};

	TransduceSink.prototype.error = function (t, e) {
	  return this.sink.error(t, e)
	};

	function Transformer (sink) {
	  this.time = -Infinity;
	  this.sink = sink;
	}

	Transformer.prototype['@@transducer/init'] = Transformer.prototype.init = function () {};

	Transformer.prototype['@@transducer/step'] = Transformer.prototype.step = function (t, x) {
	  if (!isNaN(t)) {
	    this.time = Math.max(t, this.time);
	  }
	  return this.sink.event(this.time, x)
	};

	Transformer.prototype['@@transducer/result'] = Transformer.prototype.result = function (x) {
	  return this.sink.end(this.time, x)
	};

	/**
	* Given an object supporting the new or legacy transducer protocol,
	* create an adapter for it.
	* @param {object} tx transform
	* @returns {TxAdapter|LegacyTxAdapter}
	*/
	function getTxHandler (tx) {
	  return typeof tx['@@transducer/step'] === 'function'
	    ? new TxAdapter(tx)
	    : new LegacyTxAdapter(tx)
	}

	/**
	* Adapter for new official transducer protocol
	* @param {object} tx transform
	* @constructor
	*/
	function TxAdapter (tx) {
	  this.tx = tx;
	}

	TxAdapter.prototype.step = function (t, x) {
	  return this.tx['@@transducer/step'](t, x)
	};
	TxAdapter.prototype.result = function (x) {
	  return this.tx['@@transducer/result'](x)
	};
	TxAdapter.prototype.isReduced = function (x) {
	  return x != null && x['@@transducer/reduced']
	};
	TxAdapter.prototype.getResult = function (x) {
	  return x['@@transducer/value']
	};

	/**
	* Adapter for older transducer protocol
	* @param {object} tx transform
	* @constructor
	*/
	function LegacyTxAdapter (tx) {
	  this.tx = tx;
	}

	LegacyTxAdapter.prototype.step = function (t, x) {
	  return this.tx.step(t, x)
	};
	LegacyTxAdapter.prototype.result = function (x) {
	  return this.tx.result(x)
	};
	LegacyTxAdapter.prototype.isReduced = function (x) {
	  return x != null && x.__transducers_reduced__
	};
	LegacyTxAdapter.prototype.getResult = function (x) {
	  return x.value
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Doubly linked list
	 * @constructor
	 */
	function LinkedList () {
	  this.head = null;
	  this.length = 0;
	}

	/**
	 * Add a node to the end of the list
	 * @param {{prev:Object|null, next:Object|null, dispose:function}} x node to add
	 */
	LinkedList.prototype.add = function (x) {
	  if (this.head !== null) {
	    this.head.prev = x;
	    x.next = this.head;
	  }
	  this.head = x;
	  ++this.length;
	};

	/**
	 * Remove the provided node from the list
	 * @param {{prev:Object|null, next:Object|null, dispose:function}} x node to remove
	 */
	LinkedList.prototype.remove = function (x) { // eslint-disable-line  complexity
	  --this.length;
	  if (x === this.head) {
	    this.head = this.head.next;
	  }
	  if (x.next !== null) {
	    x.next.prev = x.prev;
	    x.next = null;
	  }
	  if (x.prev !== null) {
	    x.prev.next = x.next;
	    x.prev = null;
	  }
	};

	/**
	 * @returns {boolean} true iff there are no nodes in the list
	 */
	LinkedList.prototype.isEmpty = function () {
	  return this.length === 0
	};

	/**
	 * Dispose all nodes
	 * @returns {Promise} promise that fulfills when all nodes have been disposed,
	 *  or rejects if an error occurs while disposing
	 */
	LinkedList.prototype.dispose = function () {
	  if (this.isEmpty()) {
	    return Promise.resolve()
	  }

	  var promises = [];
	  var x = this.head;
	  this.head = null;
	  this.length = 0;

	  while (x !== null) {
	    promises.push(x.dispose());
	    x = x.next;
	  }

	  return Promise.all(promises)
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function mergeConcurrently (concurrency, stream) {
	  return mergeMapConcurrently(id, concurrency, stream)
	}

	function mergeMapConcurrently (f, concurrency, stream) {
	  return new Stream(new MergeConcurrently(f, concurrency, stream.source))
	}

	function MergeConcurrently (f, concurrency, source) {
	  this.f = f;
	  this.concurrency = concurrency;
	  this.source = source;
	}

	MergeConcurrently.prototype.run = function (sink, scheduler) {
	  return new Outer(this.f, this.concurrency, this.source, sink, scheduler)
	};

	function Outer (f, concurrency, source, sink, scheduler) {
	  this.f = f;
	  this.concurrency = concurrency;
	  this.sink = sink;
	  this.scheduler = scheduler;
	  this.pending = [];
	  this.current = new LinkedList();
	  this.disposable = once(source.run(this, scheduler));
	  this.active = true;
	}

	Outer.prototype.event = function (t, x) {
	  this._addInner(t, x);
	};

	Outer.prototype._addInner = function (t, x) {
	  if (this.current.length < this.concurrency) {
	    this._startInner(t, x);
	  } else {
	    this.pending.push(x);
	  }
	};

	Outer.prototype._startInner = function (t, x) {
	  try {
	    this._initInner(t, x);
	  } catch (e) {
	    this.error(t, e);
	  }
	};

	Outer.prototype._initInner = function (t, x) {
	  var innerSink = new Inner(t, this, this.sink);
	  innerSink.disposable = mapAndRun(this.f, x, innerSink, this.scheduler);
	  this.current.add(innerSink);
	};

	function mapAndRun (f, x, sink, scheduler) {
	  return f(x).source.run(sink, scheduler)
	}

	Outer.prototype.end = function (t, x) {
	  this.active = false;
	  tryDispose(t, this.disposable, this.sink);
	  this._checkEnd(t, x);
	};

	Outer.prototype.error = function (t, e) {
	  this.active = false;
	  this.sink.error(t, e);
	};

	Outer.prototype.dispose = function () {
	  this.active = false;
	  this.pending.length = 0;
	  return Promise.all([this.disposable.dispose(), this.current.dispose()])
	};

	Outer.prototype._endInner = function (t, x, inner) {
	  this.current.remove(inner);
	  tryDispose(t, inner, this);

	  if (this.pending.length === 0) {
	    this._checkEnd(t, x);
	  } else {
	    this._startInner(t, this.pending.shift());
	  }
	};

	Outer.prototype._checkEnd = function (t, x) {
	  if (!this.active && this.current.isEmpty()) {
	    this.sink.end(t, x);
	  }
	};

	function Inner (time, outer, sink) {
	  this.prev = this.next = null;
	  this.time = time;
	  this.outer = outer;
	  this.sink = sink;
	  this.disposable = void 0;
	}

	Inner.prototype.event = function (t, x) {
	  this.sink.event(Math.max(t, this.time), x);
	};

	Inner.prototype.end = function (t, x) {
	  this.outer._endInner(Math.max(t, this.time), x, this);
	};

	Inner.prototype.error = function (t, e) {
	  this.outer.error(Math.max(t, this.time), e);
	};

	Inner.prototype.dispose = function () {
	  return this.disposable.dispose()
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Map each value in the stream to a new stream, and merge it into the
	 * returned outer stream. Event arrival times are preserved.
	 * @param {function(x:*):Stream} f chaining function, must return a Stream
	 * @param {Stream} stream
	 * @returns {Stream} new stream containing all events from each stream returned by f
	 */
	function flatMap (f, stream) {
	  return mergeMapConcurrently(f, Infinity, stream)
	}

	/**
	 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
	 * streams to the outer. Event arrival times are preserved.
	 * @param {Stream<Stream<X>>} stream stream of streams
	 * @returns {Stream<X>} new stream containing all events of all inner streams
	 */
	function join (stream) {
	  return mergeConcurrently(Infinity, stream)
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Map each value in stream to a new stream, and concatenate them all
	 * stream:              -a---b---cX
	 * f(a):                 1-1-1-1X
	 * f(b):                        -2-2-2-2X
	 * f(c):                                -3-3-3-3X
	 * stream.concatMap(f): -1-1-1-1-2-2-2-2-3-3-3-3X
	 * @param {function(x:*):Stream} f function to map each value to a stream
	 * @param {Stream} stream
	 * @returns {Stream} new stream containing all events from each stream returned by f
	 */
	function concatMap (f, stream) {
	  return mergeMapConcurrently(f, 1, stream)
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var reduce$2 = reduce;

	/**
	 * @returns {Stream} stream containing events from all streams in the argument
	 * list in time order.  If two events are simultaneous they will be merged in
	 * arbitrary order.
	 */


	/**
	 * @param {Array} streams array of stream to merge
	 * @returns {Stream} stream containing events from all input observables
	 * in time order.  If two events are simultaneous they will be merged in
	 * arbitrary order.
	 */
	function mergeArray (streams) {
	  var l = streams.length;
	  return l === 0 ? empty()
	    : l === 1 ? streams[0]
	    : new Stream(mergeSources(streams))
	}

	/**
	 * This implements fusion/flattening for merge.  It will
	 * fuse adjacent merge operations.  For example:
	 * - a.merge(b).merge(c) effectively becomes merge(a, b, c)
	 * - merge(a, merge(b, c)) effectively becomes merge(a, b, c)
	 * It does this by concatenating the sources arrays of
	 * any nested Merge sources, in effect "flattening" nested
	 * merge operations into a single merge.
	 */
	function mergeSources (streams) {
	  return new Merge(reduce$2(appendSources, [], streams))
	}

	function appendSources (sources, stream) {
	  var source = stream.source;
	  return source instanceof Merge
	    ? sources.concat(source.sources)
	    : sources.concat(source)
	}

	function Merge (sources) {
	  this.sources = sources;
	}

	Merge.prototype.run = function (sink, scheduler) {
	  var l = this.sources.length;
	  var disposables = new Array(l);
	  var sinks = new Array(l);

	  var mergeSink = new MergeSink(disposables, sinks, sink);

	  for (var indexSink, i = 0; i < l; ++i) {
	    indexSink = sinks[i] = new IndexSink(i, mergeSink);
	    disposables[i] = this.sources[i].run(indexSink, scheduler);
	  }

	  return all(disposables)
	};

	function MergeSink (disposables, sinks, sink) {
	  this.sink = sink;
	  this.disposables = disposables;
	  this.activeCount = sinks.length;
	}

	MergeSink.prototype.error = Pipe.prototype.error;

	MergeSink.prototype.event = function (t, indexValue) {
	  this.sink.event(t, indexValue.value);
	};

	MergeSink.prototype.end = function (t, indexedValue) {
	  tryDispose(t, this.disposables[indexedValue.index], this.sink);
	  if (--this.activeCount === 0) {
	    this.sink.end(t, indexedValue.value);
	  }
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * When an event arrives on sampler, emit the result of calling f with the latest
	 * values of all streams being sampled
	 * @param {function(...values):*} f function to apply to each set of sampled values
	 * @param {Stream} sampler streams will be sampled whenever an event arrives
	 *  on sampler
	 * @returns {Stream} stream of sampled and transformed values
	 */


	/**
	 * When an event arrives on sampler, emit the latest event value from stream.
	 * @param {Stream} sampler stream of events at whose arrival time
	 *  stream's latest value will be propagated
	 * @param {Stream} stream stream of values
	 * @returns {Stream} sampled stream of values
	 */
	function sampleWith (sampler, stream) {
	  return new Stream(new Sampler(id, sampler.source, [stream.source]))
	}

	function sampleArray (f, sampler, streams) {
	  return new Stream(new Sampler(f, sampler.source, map(getSource$1, streams)))
	}

	function getSource$1 (stream) {
	  return stream.source
	}

	function Sampler (f, sampler, sources) {
	  this.f = f;
	  this.sampler = sampler;
	  this.sources = sources;
	}

	Sampler.prototype.run = function (sink, scheduler) {
	  var l = this.sources.length;
	  var disposables = new Array(l + 1);
	  var sinks = new Array(l);

	  var sampleSink = new SampleSink(this.f, sinks, sink);

	  for (var hold, i = 0; i < l; ++i) {
	    hold = sinks[i] = new Hold(sampleSink);
	    disposables[i] = this.sources[i].run(hold, scheduler);
	  }

	  disposables[i] = this.sampler.run(sampleSink, scheduler);

	  return all(disposables)
	};

	function Hold (sink) {
	  this.sink = sink;
	  this.hasValue = false;
	}

	Hold.prototype.event = function (t, x) {
	  this.value = x;
	  this.hasValue = true;
	  this.sink._notify(this);
	};

	Hold.prototype.end = function () {};
	Hold.prototype.error = Pipe.prototype.error;

	function SampleSink (f, sinks, sink) {
	  this.f = f;
	  this.sinks = sinks;
	  this.sink = sink;
	  this.active = false;
	}

	SampleSink.prototype._notify = function () {
	  if (!this.active) {
	    this.active = this.sinks.every(hasValue);
	  }
	};

	SampleSink.prototype.event = function (t) {
	  if (this.active) {
	    this.sink.event(t, invoke(this.f, map(getValue, this.sinks)));
	  }
	};

	SampleSink.prototype.end = Pipe.prototype.end;
	SampleSink.prototype.error = Pipe.prototype.error;

	function hasValue (hold) {
	  return hold.hasValue
	}

	function getValue (hold) {
	  return hold.value
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	// Based on https://github.com/petkaantonov/deque

	function Queue (capPow2) {
	  this._capacity = capPow2 || 32;
	  this._length = 0;
	  this._head = 0;
	}

	Queue.prototype.push = function (x) {
	  var len = this._length;
	  this._checkCapacity(len + 1);

	  var i = (this._head + len) & (this._capacity - 1);
	  this[i] = x;
	  this._length = len + 1;
	};

	Queue.prototype.shift = function () {
	  var head = this._head;
	  var x = this[head];

	  this[head] = void 0;
	  this._head = (head + 1) & (this._capacity - 1);
	  this._length--;
	  return x
	};

	Queue.prototype.isEmpty = function () {
	  return this._length === 0
	};

	Queue.prototype.length = function () {
	  return this._length
	};

	Queue.prototype._checkCapacity = function (size) {
	  if (this._capacity < size) {
	    this._ensureCapacity(this._capacity << 1);
	  }
	};

	Queue.prototype._ensureCapacity = function (capacity) {
	  var oldCapacity = this._capacity;
	  this._capacity = capacity;

	  var last = this._head + this._length;

	  if (last > oldCapacity) {
	    copy$2(this, 0, this, oldCapacity, last & (oldCapacity - 1));
	  }
	};

	function copy$2 (src, srcIndex, dst, dstIndex, len) {
	  for (var j = 0; j < len; ++j) {
	    dst[j + dstIndex] = src[j + srcIndex];
	    src[j + srcIndex] = void 0;
	  }
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var map$4 = map;
	/**
	 * Combine streams pairwise (or tuple-wise) by index by applying f to values
	 * at corresponding indices.  The returned stream ends when any of the input
	 * streams ends.
	 * @param {function} f function to combine values
	 * @returns {Stream} new stream with items at corresponding indices combined
	 *  using f
	 */


	/**
	* Combine streams pairwise (or tuple-wise) by index by applying f to values
	* at corresponding indices.  The returned stream ends when any of the input
	* streams ends.
	* @param {function} f function to combine values
	* @param {[Stream]} streams streams to zip using f
	* @returns {Stream} new stream with items at corresponding indices combined
	*  using f
	*/
	function zipArray (f, streams) {
	  return streams.length === 0 ? empty()
	: streams.length === 1 ? map$2(f, streams[0])
	: new Stream(new Zip(f, map$4(getSource$2, streams)))
	}

	function getSource$2 (stream) {
	  return stream.source
	}

	function Zip (f, sources) {
	  this.f = f;
	  this.sources = sources;
	}

	Zip.prototype.run = function (sink, scheduler) {
	  var l = this.sources.length;
	  var disposables = new Array(l);
	  var sinks = new Array(l);
	  var buffers = new Array(l);

	  var zipSink = new ZipSink(this.f, buffers, sinks, sink);

	  for (var indexSink, i = 0; i < l; ++i) {
	    buffers[i] = new Queue();
	    indexSink = sinks[i] = new IndexSink(i, zipSink);
	    disposables[i] = this.sources[i].run(indexSink, scheduler);
	  }

	  return all(disposables)
	};

	function ZipSink (f, buffers, sinks, sink) {
	  this.f = f;
	  this.sinks = sinks;
	  this.sink = sink;
	  this.buffers = buffers;
	}

	ZipSink.prototype.event = function (t, indexedValue) { // eslint-disable-line complexity
	  var buffers = this.buffers;
	  var buffer = buffers[indexedValue.index];

	  buffer.push(indexedValue.value);

	  if (buffer.length() === 1) {
	    if (!ready(this.buffers)) {
	      return
	    }

	    emitZipped(this.f, t, buffers, this.sink);

	    if (ended(this.buffers, this.sinks)) {
	      this.sink.end(t, void 0);
	    }
	  }
	};

	ZipSink.prototype.end = function (t, indexedValue) {
	  var buffer = this.buffers[indexedValue.index];
	  if (buffer.isEmpty()) {
	    this.sink.end(t, indexedValue.value);
	  }
	};

	ZipSink.prototype.error = Pipe.prototype.error;

	function emitZipped (f, t, buffers, sink) {
	  sink.event(t, invoke(f, map$4(head, buffers)));
	}

	function head (buffer) {
	  return buffer.shift()
	}

	function ended (buffers, sinks) {
	  for (var i = 0, l = buffers.length; i < l; ++i) {
	    if (buffers[i].isEmpty() && !sinks[i].active) {
	      return true
	    }
	  }
	  return false
	}

	function ready (buffers) {
	  for (var i = 0, l = buffers.length; i < l; ++i) {
	    if (buffers[i].isEmpty()) {
	      return false
	    }
	  }
	  return true
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Given a stream of streams, return a new stream that adopts the behavior
	 * of the most recent inner stream.
	 * @param {Stream} stream of streams on which to switch
	 * @returns {Stream} switching stream
	 */
	function switchLatest (stream) {
	  return new Stream(new Switch(stream.source))
	}

	function Switch (source) {
	  this.source = source;
	}

	Switch.prototype.run = function (sink, scheduler) {
	  var switchSink = new SwitchSink(sink, scheduler);
	  return all([switchSink, this.source.run(switchSink, scheduler)])
	};

	function SwitchSink (sink, scheduler) {
	  this.sink = sink;
	  this.scheduler = scheduler;
	  this.current = null;
	  this.ended = false;
	}

	SwitchSink.prototype.event = function (t, stream) {
	  this._disposeCurrent(t); // TODO: capture the result of this dispose
	  this.current = new Segment(t, Infinity, this, this.sink);
	  this.current.disposable = stream.source.run(this.current, this.scheduler);
	};

	SwitchSink.prototype.end = function (t, x) {
	  this.ended = true;
	  this._checkEnd(t, x);
	};

	SwitchSink.prototype.error = function (t, e) {
	  this.ended = true;
	  this.sink.error(t, e);
	};

	SwitchSink.prototype.dispose = function () {
	  return this._disposeCurrent(this.scheduler.now())
	};

	SwitchSink.prototype._disposeCurrent = function (t) {
	  if (this.current !== null) {
	    return this.current._dispose(t)
	  }
	};

	SwitchSink.prototype._disposeInner = function (t, inner) {
	  inner._dispose(t); // TODO: capture the result of this dispose
	  if (inner === this.current) {
	    this.current = null;
	  }
	};

	SwitchSink.prototype._checkEnd = function (t, x) {
	  if (this.ended && this.current === null) {
	    this.sink.end(t, x);
	  }
	};

	SwitchSink.prototype._endInner = function (t, x, inner) {
	  this._disposeInner(t, inner);
	  this._checkEnd(t, x);
	};

	SwitchSink.prototype._errorInner = function (t, e, inner) {
	  this._disposeInner(t, inner);
	  this.sink.error(t, e);
	};

	function Segment (min, max, outer, sink) {
	  this.min = min;
	  this.max = max;
	  this.outer = outer;
	  this.sink = sink;
	  this.disposable = empty$1();
	}

	Segment.prototype.event = function (t, x) {
	  if (t < this.max) {
	    this.sink.event(Math.max(t, this.min), x);
	  }
	};

	Segment.prototype.end = function (t, x) {
	  this.outer._endInner(Math.max(t, this.min), x, this);
	};

	Segment.prototype.error = function (t, e) {
	  this.outer._errorInner(Math.max(t, this.min), e, this);
	};

	Segment.prototype._dispose = function (t) {
	  this.max = t;
	  tryDispose(t, this.disposable, this.sink);
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Retain only items matching a predicate
	 * @param {function(x:*):boolean} p filtering predicate called for each item
	 * @param {Stream} stream stream to filter
	 * @returns {Stream} stream containing only items for which predicate returns truthy
	 */
	function filter (p, stream) {
	  return new Stream(Filter.create(p, stream.source))
	}

	/**
	 * Skip repeated events, using === to detect duplicates
	 * @param {Stream} stream stream from which to omit repeated events
	 * @returns {Stream} stream without repeated events
	 */
	function skipRepeats (stream) {
	  return skipRepeatsWith(same, stream)
	}

	/**
	 * Skip repeated events using the provided equals function to detect duplicates
	 * @param {function(a:*, b:*):boolean} equals optional function to compare items
	 * @param {Stream} stream stream from which to omit repeated events
	 * @returns {Stream} stream without repeated events
	 */
	function skipRepeatsWith (equals, stream) {
	  return new Stream(new SkipRepeats(equals, stream.source))
	}

	function SkipRepeats (equals, source) {
	  this.equals = equals;
	  this.source = source;
	}

	SkipRepeats.prototype.run = function (sink, scheduler) {
	  return this.source.run(new SkipRepeatsSink(this.equals, sink), scheduler)
	};

	function SkipRepeatsSink (equals, sink) {
	  this.equals = equals;
	  this.sink = sink;
	  this.value = void 0;
	  this.init = true;
	}

	SkipRepeatsSink.prototype.end = Pipe.prototype.end;
	SkipRepeatsSink.prototype.error = Pipe.prototype.error;

	SkipRepeatsSink.prototype.event = function (t, x) {
	  if (this.init) {
	    this.init = false;
	    this.value = x;
	    this.sink.event(t, x);
	  } else if (!this.equals(this.value, x)) {
	    this.value = x;
	    this.sink.event(t, x);
	  }
	};

	function same (a, b) {
	  return a === b
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * @param {number} n
	 * @param {Stream} stream
	 * @returns {Stream} new stream containing only up to the first n items from stream
	 */
	function take (n, stream) {
	  return slice(0, n, stream)
	}

	/**
	 * @param {number} n
	 * @param {Stream} stream
	 * @returns {Stream} new stream with the first n items removed
	 */
	function skip (n, stream) {
	  return slice(n, Infinity, stream)
	}

	/**
	 * Slice a stream by index. Negative start/end indexes are not supported
	 * @param {number} start
	 * @param {number} end
	 * @param {Stream} stream
	 * @returns {Stream} stream containing items where start <= index < end
	 */
	function slice (start, end, stream) {
	  return end <= start ? empty()
	    : new Stream(sliceSource(start, end, stream.source))
	}

	function sliceSource (start, end, source) {
	  return source instanceof Map ? commuteMapSlice(start, end, source)
	    : source instanceof Slice ? fuseSlice(start, end, source)
	    : new Slice(start, end, source)
	}

	function commuteMapSlice (start, end, source) {
	  return Map.create(source.f, sliceSource(start, end, source.source))
	}

	function fuseSlice (start, end, source) {
	  start += source.min;
	  end = Math.min(end + source.min, source.max);
	  return new Slice(start, end, source.source)
	}

	function Slice (min, max, source) {
	  this.source = source;
	  this.min = min;
	  this.max = max;
	}

	Slice.prototype.run = function (sink, scheduler) {
	  var disposable = settable();
	  var sliceSink = new SliceSink(this.min, this.max - this.min, sink, disposable);

	  disposable.setDisposable(this.source.run(sliceSink, scheduler));
	  return disposable
	};

	function SliceSink (skip, take, sink, disposable) {
	  this.sink = sink;
	  this.skip = skip;
	  this.take = take;
	  this.disposable = disposable;
	}

	SliceSink.prototype.end = Pipe.prototype.end;
	SliceSink.prototype.error = Pipe.prototype.error;

	SliceSink.prototype.event = function (t, x) {
	  /* eslint complexity: [1, 4] */
	  if (this.skip > 0) {
	    this.skip -= 1;
	    return
	  }

	  if (this.take === 0) {
	    return
	  }

	  this.take -= 1;
	  this.sink.event(t, x);
	  if (this.take === 0) {
	    this.disposable.dispose();
	    this.sink.end(t, x);
	  }
	};

	function takeWhile (p, stream) {
	  return new Stream(new TakeWhile(p, stream.source))
	}

	function TakeWhile (p, source) {
	  this.p = p;
	  this.source = source;
	}

	TakeWhile.prototype.run = function (sink, scheduler) {
	  var disposable = settable();
	  var takeWhileSink = new TakeWhileSink(this.p, sink, disposable);

	  disposable.setDisposable(this.source.run(takeWhileSink, scheduler));
	  return disposable
	};

	function TakeWhileSink (p, sink, disposable) {
	  this.p = p;
	  this.sink = sink;
	  this.active = true;
	  this.disposable = disposable;
	}

	TakeWhileSink.prototype.end = Pipe.prototype.end;
	TakeWhileSink.prototype.error = Pipe.prototype.error;

	TakeWhileSink.prototype.event = function (t, x) {
	  if (!this.active) {
	    return
	  }

	  var p = this.p;
	  this.active = p(x);
	  if (this.active) {
	    this.sink.event(t, x);
	  } else {
	    this.disposable.dispose();
	    this.sink.end(t, x);
	  }
	};

	function skipWhile (p, stream) {
	  return new Stream(new SkipWhile(p, stream.source))
	}

	function SkipWhile (p, source) {
	  this.p = p;
	  this.source = source;
	}

	SkipWhile.prototype.run = function (sink, scheduler) {
	  return this.source.run(new SkipWhileSink(this.p, sink), scheduler)
	};

	function SkipWhileSink (p, sink) {
	  this.p = p;
	  this.sink = sink;
	  this.skipping = true;
	}

	SkipWhileSink.prototype.end = Pipe.prototype.end;
	SkipWhileSink.prototype.error = Pipe.prototype.error;

	SkipWhileSink.prototype.event = function (t, x) {
	  if (this.skipping) {
	    var p = this.p;
	    this.skipping = p(x);
	    if (this.skipping) {
	      return
	    }
	  }

	  this.sink.event(t, x);
	};

	function skipAfter (p, stream) {
	  return new Stream(new SkipAfter(p, stream.source))
	}

	function SkipAfter (p, source) {
	  this.p = p;
	  this.source = source;
	}

	SkipAfter.prototype.run = function run (sink, scheduler) {
	  return this.source.run(new SkipAfterSink(this.p, sink), scheduler)
	};

	function SkipAfterSink (p, sink) {
	  this.p = p;
	  this.sink = sink;
	  this.skipping = false;
	}

	SkipAfterSink.prototype.event = function event (t, x) {
	  if (this.skipping) {
	    return
	  }

	  var p = this.p;
	  this.skipping = p(x);
	  this.sink.event(t, x);

	  if (this.skipping) {
	    this.sink.end(t, x);
	  }
	};

	SkipAfterSink.prototype.end = Pipe.prototype.end;
	SkipAfterSink.prototype.error = Pipe.prototype.error;

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function takeUntil (signal, stream) {
	  return new Stream(new Until(signal.source, stream.source))
	}

	function skipUntil (signal, stream) {
	  return new Stream(new Since(signal.source, stream.source))
	}

	function during (timeWindow, stream) {
	  return takeUntil(join(timeWindow), skipUntil(timeWindow, stream))
	}

	function Until (maxSignal, source) {
	  this.maxSignal = maxSignal;
	  this.source = source;
	}

	Until.prototype.run = function (sink, scheduler) {
	  var min = new Bound(-Infinity, sink);
	  var max = new UpperBound(this.maxSignal, sink, scheduler);
	  var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler);

	  return all([min, max, disposable])
	};

	function Since (minSignal, source) {
	  this.minSignal = minSignal;
	  this.source = source;
	}

	Since.prototype.run = function (sink, scheduler) {
	  var min = new LowerBound(this.minSignal, sink, scheduler);
	  var max = new Bound(Infinity, sink);
	  var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler);

	  return all([min, max, disposable])
	};

	function Bound (value, sink) {
	  this.value = value;
	  this.sink = sink;
	}

	Bound.prototype.error = Pipe.prototype.error;
	Bound.prototype.event = noop;
	Bound.prototype.end = noop;
	Bound.prototype.dispose = noop;

	function TimeWindowSink (min, max, sink) {
	  this.min = min;
	  this.max = max;
	  this.sink = sink;
	}

	TimeWindowSink.prototype.event = function (t, x) {
	  if (t >= this.min.value && t < this.max.value) {
	    this.sink.event(t, x);
	  }
	};

	TimeWindowSink.prototype.error = Pipe.prototype.error;
	TimeWindowSink.prototype.end = Pipe.prototype.end;

	function LowerBound (signal, sink, scheduler) {
	  this.value = Infinity;
	  this.sink = sink;
	  this.disposable = signal.run(this, scheduler);
	}

	LowerBound.prototype.event = function (t /*, x */) {
	  if (t < this.value) {
	    this.value = t;
	  }
	};

	LowerBound.prototype.end = noop;
	LowerBound.prototype.error = Pipe.prototype.error;

	LowerBound.prototype.dispose = function () {
	  return this.disposable.dispose()
	};

	function UpperBound (signal, sink, scheduler) {
	  this.value = Infinity;
	  this.sink = sink;
	  this.disposable = signal.run(this, scheduler);
	}

	UpperBound.prototype.event = function (t, x) {
	  if (t < this.value) {
	    this.value = t;
	    this.sink.end(t, x);
	  }
	};

	UpperBound.prototype.end = noop;
	UpperBound.prototype.error = Pipe.prototype.error;

	UpperBound.prototype.dispose = function () {
	  return this.disposable.dispose()
	};

	function noop () {}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * @param {Number} delayTime milliseconds to delay each item
	 * @param {Stream} stream
	 * @returns {Stream} new stream containing the same items, but delayed by ms
	 */
	function delay (delayTime, stream) {
	  return delayTime <= 0 ? stream
	    : new Stream(new Delay(delayTime, stream.source))
	}

	function Delay (dt, source) {
	  this.dt = dt;
	  this.source = source;
	}

	Delay.prototype.run = function (sink, scheduler) {
	  var delaySink = new DelaySink(this.dt, sink, scheduler);
	  return all([delaySink, this.source.run(delaySink, scheduler)])
	};

	function DelaySink (dt, sink, scheduler) {
	  this.dt = dt;
	  this.sink = sink;
	  this.scheduler = scheduler;
	}

	DelaySink.prototype.dispose = function () {
	  var self = this;
	  this.scheduler.cancelAll(function (scheduledTask) {
	    return scheduledTask.task.sink === self.sink
	  });
	};

	DelaySink.prototype.event = function (t, x) {
	  this.scheduler.delay(this.dt, PropagateTask.event(x, this.sink));
	};

	DelaySink.prototype.end = function (t, x) {
	  this.scheduler.delay(this.dt, PropagateTask.end(x, this.sink));
	};

	DelaySink.prototype.error = Pipe.prototype.error;

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function timestamp (stream) {
	  return new Stream(new Timestamp(stream.source))
	}

	function Timestamp (source) {
	  this.source = source;
	}

	Timestamp.prototype.run = function (sink, scheduler) {
	  return this.source.run(new TimestampSink(sink), scheduler)
	};

	function TimestampSink (sink) {
	  this.sink = sink;
	}

	TimestampSink.prototype.end = Pipe.prototype.end;
	TimestampSink.prototype.error = Pipe.prototype.error;

	TimestampSink.prototype.event = function (t, x) {
	  this.sink.event(t, { time: t, value: x });
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Limit the rate of events by suppressing events that occur too often
	 * @param {Number} period time to suppress events
	 * @param {Stream} stream
	 * @returns {Stream}
	 */
	function throttle (period, stream) {
	  return new Stream(throttleSource(period, stream.source))
	}

	function throttleSource (period, source) {
	  return source instanceof Map ? commuteMapThrottle(period, source)
	    : source instanceof Throttle ? fuseThrottle(period, source)
	    : new Throttle(period, source)
	}

	function commuteMapThrottle (period, source) {
	  return Map.create(source.f, throttleSource(period, source.source))
	}

	function fuseThrottle (period, source) {
	  return new Throttle(Math.max(period, source.period), source.source)
	}

	function Throttle (period, source) {
	  this.period = period;
	  this.source = source;
	}

	Throttle.prototype.run = function (sink, scheduler) {
	  return this.source.run(new ThrottleSink(this.period, sink), scheduler)
	};

	function ThrottleSink (period, sink) {
	  this.time = 0;
	  this.period = period;
	  this.sink = sink;
	}

	ThrottleSink.prototype.event = function (t, x) {
	  if (t >= this.time) {
	    this.time = t + this.period;
	    this.sink.event(t, x);
	  }
	};

	ThrottleSink.prototype.end = Pipe.prototype.end;

	ThrottleSink.prototype.error = Pipe.prototype.error;

	/**
	 * Wait for a burst of events to subside and emit only the last event in the burst
	 * @param {Number} period events occuring more frequently than this
	 *  will be suppressed
	 * @param {Stream} stream stream to debounce
	 * @returns {Stream} new debounced stream
	 */
	function debounce (period, stream) {
	  return new Stream(new Debounce(period, stream.source))
	}

	function Debounce (dt, source) {
	  this.dt = dt;
	  this.source = source;
	}

	Debounce.prototype.run = function (sink, scheduler) {
	  return new DebounceSink(this.dt, this.source, sink, scheduler)
	};

	function DebounceSink (dt, source, sink, scheduler) {
	  this.dt = dt;
	  this.sink = sink;
	  this.scheduler = scheduler;
	  this.value = void 0;
	  this.timer = null;
	  this.disposable = source.run(this, scheduler);
	}

	DebounceSink.prototype.event = function (t, x) {
	  this._clearTimer();
	  this.value = x;
	  this.timer = this.scheduler.delay(this.dt, new DebounceTask(this, x));
	};

	DebounceSink.prototype._event = function (t, x) {
	  this._clearTimer();
	  this.sink.event(t, x);
	};

	DebounceSink.prototype.end = function (t, x) {
	  if (this._clearTimer()) {
	    this.sink.event(t, this.value);
	    this.value = void 0;
	  }
	  this.sink.end(t, x);
	};

	DebounceSink.prototype.error = function (t, x) {
	  this._clearTimer();
	  this.sink.error(t, x);
	};

	DebounceSink.prototype.dispose = function () {
	  this._clearTimer();
	  return this.disposable.dispose()
	};

	DebounceSink.prototype._clearTimer = function () {
	  if (this.timer === null) {
	    return false
	  }
	  this.timer.dispose();
	  this.timer = null;
	  return true
	};

	function DebounceTask (debounce, value) {
	  this.debounce = debounce;
	  this.value = value;
	}

	DebounceTask.prototype.run = function (t) {
	  this.debounce._event(t, this.value);
	};

	DebounceTask.prototype.error = function (t, e) {
	  this.debounce.error(t, e);
	};

	DebounceTask.prototype.dispose = function () {};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * Create a stream containing only the promise's fulfillment
	 * value at the time it fulfills.
	 * @param {Promise<T>} p promise
	 * @return {Stream<T>} stream containing promise's fulfillment value.
	 *  If the promise rejects, the stream will error
	 */
	function fromPromise (p) {
	  return awaitPromises(of(p))
	}

	/**
	 * Turn a Stream<Promise<T>> into Stream<T> by awaiting each promise.
	 * Event order is preserved.
	 * @param {Stream<Promise<T>>} stream
	 * @return {Stream<T>} stream of fulfillment values.  The stream will
	 * error if any promise rejects.
	 */
	function awaitPromises (stream) {
	  return new Stream(new Await(stream.source))
	}

	function Await (source) {
	  this.source = source;
	}

	Await.prototype.run = function (sink, scheduler) {
	  return this.source.run(new AwaitSink(sink, scheduler), scheduler)
	};

	function AwaitSink (sink, scheduler) {
	  this.sink = sink;
	  this.scheduler = scheduler;
	  this.queue = Promise.resolve();
	  var self = this;

	  // Pre-create closures, to avoid creating them per event
	  this._eventBound = function (x) {
	    self.sink.event(self.scheduler.now(), x);
	  };

	  this._endBound = function (x) {
	    self.sink.end(self.scheduler.now(), x);
	  };

	  this._errorBound = function (e) {
	    self.sink.error(self.scheduler.now(), e);
	  };
	}

	AwaitSink.prototype.event = function (t, promise) {
	  var self = this;
	  this.queue = this.queue.then(function () {
	    return self._event(promise)
	  }).catch(this._errorBound);
	};

	AwaitSink.prototype.end = function (t, x) {
	  var self = this;
	  this.queue = this.queue.then(function () {
	    return self._end(x)
	  }).catch(this._errorBound);
	};

	AwaitSink.prototype.error = function (t, e) {
	  var self = this;
	  // Don't resolve error values, propagate directly
	  this.queue = this.queue.then(function () {
	    return self._errorBound(e)
	  }).catch(fatalError);
	};

	AwaitSink.prototype._event = function (promise) {
	  return promise.then(this._eventBound)
	};

	AwaitSink.prototype._end = function (x) {
	  return Promise.resolve(x).then(this._endBound)
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function SafeSink (sink) {
	  this.sink = sink;
	  this.active = true;
	}

	SafeSink.prototype.event = function (t, x) {
	  if (!this.active) {
	    return
	  }
	  this.sink.event(t, x);
	};

	SafeSink.prototype.end = function (t, x) {
	  if (!this.active) {
	    return
	  }
	  this.disable();
	  this.sink.end(t, x);
	};

	SafeSink.prototype.error = function (t, e) {
	  this.disable();
	  this.sink.error(t, e);
	};

	SafeSink.prototype.disable = function () {
	  this.active = false;
	  return this.sink
	};

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * If stream encounters an error, recover and continue with items from stream
	 * returned by f.
	 * @param {function(error:*):Stream} f function which returns a new stream
	 * @param {Stream} stream
	 * @returns {Stream} new stream which will recover from an error by calling f
	 */
	function recoverWith (f, stream) {
	  return new Stream(new RecoverWith(f, stream.source))
	}

	var flatMapError = recoverWith;

	/**
	 * Create a stream containing only an error
	 * @param {*} e error value, preferably an Error or Error subtype
	 * @returns {Stream} new stream containing only an error
	 */


	function RecoverWith (f, source) {
	  this.f = f;
	  this.source = source;
	}

	RecoverWith.prototype.run = function (sink, scheduler) {
	  return new RecoverWithSink(this.f, this.source, sink, scheduler)
	};

	function RecoverWithSink (f, source, sink, scheduler) {
	  this.f = f;
	  this.sink = new SafeSink(sink);
	  this.scheduler = scheduler;
	  this.disposable = source.run(this, scheduler);
	}

	RecoverWithSink.prototype.event = function (t, x) {
	  tryEvent(t, x, this.sink);
	};

	RecoverWithSink.prototype.end = function (t, x) {
	  tryEnd(t, x, this.sink);
	};

	RecoverWithSink.prototype.error = function (t, e) {
	  var nextSink = this.sink.disable();

	  tryDispose(t, this.disposable, this.sink);
	  this._startNext(t, e, nextSink);
	};

	RecoverWithSink.prototype._startNext = function (t, x, sink) {
	  try {
	    this.disposable = this._continue(this.f, x, sink);
	  } catch (e) {
	    sink.error(t, e);
	  }
	};

	RecoverWithSink.prototype._continue = function (f, x, sink) {
	  var stream = f(x);
	  return stream.source.run(sink, this.scheduler)
	};

	RecoverWithSink.prototype.dispose = function () {
	  return this.disposable.dispose()
	};

	var MulticastDisposable = function MulticastDisposable (source, sink) {
	  this.source = source;
	  this.sink = sink;
	  this.disposed = false;
	};

	MulticastDisposable.prototype.dispose = function dispose () {
	  if (this.disposed) {
	    return
	  }
	  this.disposed = true;
	  var remaining = this.source.remove(this.sink);
	  return remaining === 0 && this.source._dispose()
	};

	function tryEvent$1 (t, x, sink) {
	  try {
	    sink.event(t, x);
	  } catch (e) {
	    sink.error(t, e);
	  }
	}

	function tryEnd$1 (t, x, sink) {
	  try {
	    sink.end(t, x);
	  } catch (e) {
	    sink.error(t, e);
	  }
	}

	var dispose = function (disposable) { return disposable.dispose(); };

	var emptyDisposable = {
	  dispose: function dispose$1 () {}
	};

	var MulticastSource = function MulticastSource (source) {
	  this.source = source;
	  this.sinks = [];
	  this._disposable = emptyDisposable;
	};

	MulticastSource.prototype.run = function run (sink, scheduler) {
	  var n = this.add(sink);
	  if (n === 1) {
	    this._disposable = this.source.run(this, scheduler);
	  }
	  return new MulticastDisposable(this, sink)
	};

	MulticastSource.prototype._dispose = function _dispose () {
	  var disposable = this._disposable;
	  this._disposable = emptyDisposable;
	  return Promise.resolve(disposable).then(dispose)
	};

	MulticastSource.prototype.add = function add (sink) {
	  this.sinks = append(sink, this.sinks);
	  return this.sinks.length
	};

	MulticastSource.prototype.remove = function remove$1 (sink) {
	  var i = findIndex(sink, this.sinks);
	  // istanbul ignore next
	  if (i >= 0) {
	    this.sinks = remove(i, this.sinks);
	  }

	  return this.sinks.length
	};

	MulticastSource.prototype.event = function event (time, value) {
	  var s = this.sinks;
	  if (s.length === 1) {
	    return s[0].event(time, value)
	  }
	  for (var i = 0; i < s.length; ++i) {
	    tryEvent$1(time, value, s[i]);
	  }
	};

	MulticastSource.prototype.end = function end (time, value) {
	  var s = this.sinks;
	  for (var i = 0; i < s.length; ++i) {
	    tryEnd$1(time, value, s[i]);
	  }
	};

	MulticastSource.prototype.error = function error (time, err) {
	  var s = this.sinks;
	  for (var i = 0; i < s.length; ++i) {
	    s[i].error(time, err);
	  }
	};

	function multicast (stream) {
	  var source = stream.source;
	  return source instanceof MulticastSource
	    ? stream
	    : new stream.constructor(new MulticastSource(source))
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/* eslint import/first: 0 */

	// Add of and empty to constructor for fantasy-land compat
	Stream.of = of;
	Stream.empty = empty;
	// Add from to constructor for ES Observable compat
	Stream.from = from;
	// -----------------------------------------------------------------------
	// Draft ES Observable proposal interop
	// https://github.com/zenparsing/es-observable

	Stream.prototype.subscribe = function (subscriber) {
	  return subscribe(subscriber, this)
	};

	Stream.prototype[result] = function () {
	  return this
	};

	// -----------------------------------------------------------------------
	// Fluent adapter

	/**
	 * Adapt a functional stream transform to fluent style.
	 * It applies f to the this stream object
	 * @param  {function(s: Stream): Stream} f function that
	 * receives the stream itself and must return a new stream
	 * @return {Stream}
	 */
	Stream.prototype.thru = function (f) {
	  return thru(f, this)
	};

	// -----------------------------------------------------------------------
	// Observing

	/**
	 * Process all the events in the stream
	 * @returns {Promise} promise that fulfills when the stream ends, or rejects
	 *  if the stream fails with an unhandled error.
	 */
	Stream.prototype.observe = Stream.prototype.forEach = function (f) {
	  return observe(f, this)
	};

	/**
	 * Consume all events in the stream, without providing a function to process each.
	 * This causes a stream to become active and begin emitting events, and is useful
	 * in cases where all processing has been setup upstream via other combinators, and
	 * there is no need to process the terminal events.
	 * @returns {Promise} promise that fulfills when the stream ends, or rejects
	 *  if the stream fails with an unhandled error.
	 */
	Stream.prototype.drain = function () {
	  return drain(this)
	};

	// -------------------------------------------------------

	/**
	 * Generalized feedback loop. Call a stepper function for each event. The stepper
	 * will be called with 2 params: the current seed and the an event value.  It must
	 * return a new { seed, value } pair. The `seed` will be fed back into the next
	 * invocation of stepper, and the `value` will be propagated as the event value.
	 * @param {function(seed:*, value:*):{seed:*, value:*}} stepper loop step function
	 * @param {*} seed initial seed value passed to first stepper call
	 * @returns {Stream} new stream whose values are the `value` field of the objects
	 * returned by the stepper
	 */
	Stream.prototype.loop = function (stepper, seed) {
	  return loop(stepper, seed, this)
	};

	// -------------------------------------------------------

	/**
	 * Create a stream containing successive reduce results of applying f to
	 * the previous reduce result and the current stream item.
	 * @param {function(result:*, x:*):*} f reducer function
	 * @param {*} initial initial value
	 * @returns {Stream} new stream containing successive reduce results
	 */
	Stream.prototype.scan = function (f, initial) {
	  return scan(f, initial, this)
	};

	/**
	 * Reduce the stream to produce a single result.  Note that reducing an infinite
	 * stream will return a Promise that never fulfills, but that may reject if an error
	 * occurs.
	 * @param {function(result:*, x:*):*} f reducer function
	 * @param {*} initial optional initial value
	 * @returns {Promise} promise for the file result of the reduce
	 */
	Stream.prototype.reduce = function (f, initial) {
	  return reduce$1(f, initial, this)
	};

	/**
	 * @param {Stream} tail
	 * @returns {Stream} new stream containing all items in this followed by
	 *  all items in tail
	 */
	Stream.prototype.concat = function (tail$$1) {
	  return concat(this, tail$$1)
	};

	/**
	 * @param {*} x value to prepend
	 * @returns {Stream} a new stream with x prepended
	 */
	Stream.prototype.startWith = function (x) {
	  return cons$1(x, this)
	};

	// -----------------------------------------------------------------------
	// Transforming

	/**
	 * Transform each value in the stream by applying f to each
	 * @param {function(*):*} f mapping function
	 * @returns {Stream} stream containing items transformed by f
	 */
	Stream.prototype.map = function (f) {
	  return map$2(f, this)
	};

	/**
	 * Assume this stream contains functions, and apply each function to each item
	 * in the provided stream.  This generates, in effect, a cross product.
	 * @param {Stream} xs stream of items to which
	 * @returns {Stream} stream containing the cross product of items
	 */
	Stream.prototype.ap = function (xs) {
	  return ap(this, xs)
	};

	/**
	 * Replace each value in the stream with x
	 * @param {*} x
	 * @returns {Stream} stream containing items replaced with x
	 */
	Stream.prototype.constant = function (x) {
	  return constant(x, this)
	};

	/**
	 * Perform a side effect for each item in the stream
	 * @param {function(x:*):*} f side effect to execute for each item. The
	 *  return value will be discarded.
	 * @returns {Stream} new stream containing the same items as this stream
	 */
	Stream.prototype.tap = function (f) {
	  return tap(f, this)
	};

	// -----------------------------------------------------------------------
	// Transducer support

	/**
	 * Transform this stream by passing its events through a transducer.
	 * @param  {function} transducer transducer function
	 * @return {Stream} stream of events transformed by the transducer
	 */
	Stream.prototype.transduce = function (transducer) {
	  return transduce(transducer, this)
	};

	// -----------------------------------------------------------------------
	// FlatMapping

	/**
	 * Map each value in the stream to a new stream, and merge it into the
	 * returned outer stream. Event arrival times are preserved.
	 * @param {function(x:*):Stream} f chaining function, must return a Stream
	 * @returns {Stream} new stream containing all events from each stream returned by f
	 */
	Stream.prototype.chain = function (f) {
	  return flatMap(f, this)
	};

	// @deprecated use chain instead
	Stream.prototype.flatMap = Stream.prototype.chain;

	  /**
	 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
	 * streams to the outer. Event arrival times are preserved.
	 * @returns {Stream<X>} new stream containing all events of all inner streams
	 */
	Stream.prototype.join = function () {
	  return join(this)
	};

	/**
	 * Map the end event to a new stream, and begin emitting its values.
	 * @param {function(x:*):Stream} f function that receives the end event value,
	 * and *must* return a new Stream to continue with.
	 * @returns {Stream} new stream that emits all events from the original stream,
	 * followed by all events from the stream returned by f.
	 */
	Stream.prototype.continueWith = function (f) {
	  return continueWith(f, this)
	};

	// @deprecated use continueWith instead
	Stream.prototype.flatMapEnd = Stream.prototype.continueWith;

	Stream.prototype.concatMap = function (f) {
	  return concatMap(f, this)
	};

	// -----------------------------------------------------------------------
	// Concurrent merging

	/**
	 * Flatten a Stream<Stream<X>> to Stream<X> by merging inner
	 * streams to the outer, limiting the number of inner streams that may
	 * be active concurrently.
	 * @param {number} concurrency at most this many inner streams will be
	 *  allowed to be active concurrently.
	 * @return {Stream<X>} new stream containing all events of all inner
	 *  streams, with limited concurrency.
	 */
	Stream.prototype.mergeConcurrently = function (concurrency) {
	  return mergeConcurrently(concurrency, this)
	};

	// -----------------------------------------------------------------------
	// Merging

	/**
	 * Merge this stream and all the provided streams
	 * @returns {Stream} stream containing items from this stream and s in time
	 * order.  If two events are simultaneous they will be merged in
	 * arbitrary order.
	 */
	Stream.prototype.merge = function (/* ...streams */) {
	  return mergeArray(cons(this, arguments))
	};

	// -----------------------------------------------------------------------
	// Combining

	/**
	 * Combine latest events from all input streams
	 * @param {function(...events):*} f function to combine most recent events
	 * @returns {Stream} stream containing the result of applying f to the most recent
	 *  event of each input stream, whenever a new event arrives on any stream.
	 */
	Stream.prototype.combine = function (f /*, ...streams */) {
	  return combineArray(f, replace(this, 0, arguments))
	};

	// -----------------------------------------------------------------------
	// Sampling

	/**
	 * When an event arrives on sampler, emit the latest event value from stream.
	 * @param {Stream} sampler stream of events at whose arrival time
	 *  signal's latest value will be propagated
	 * @returns {Stream} sampled stream of values
	 */
	Stream.prototype.sampleWith = function (sampler) {
	  return sampleWith(sampler, this)
	};

	/**
	 * When an event arrives on this stream, emit the result of calling f with the latest
	 * values of all streams being sampled
	 * @param {function(...values):*} f function to apply to each set of sampled values
	 * @returns {Stream} stream of sampled and transformed values
	 */
	Stream.prototype.sample = function (f /* ...streams */) {
	  return sampleArray(f, this, tail(arguments))
	};

	// -----------------------------------------------------------------------
	// Zipping

	/**
	 * Pair-wise combine items with those in s. Given 2 streams:
	 * [1,2,3] zipWith f [4,5,6] -> [f(1,4),f(2,5),f(3,6)]
	 * Note: zip causes fast streams to buffer and wait for slow streams.
	 * @param {function(a:Stream, b:Stream, ...):*} f function to combine items
	 * @returns {Stream} new stream containing pairs
	 */
	Stream.prototype.zip = function (f /*, ...streams */) {
	  return zipArray(f, replace(this, 0, arguments))
	};

	// -----------------------------------------------------------------------
	// Switching

	/**
	 * Given a stream of streams, return a new stream that adopts the behavior
	 * of the most recent inner stream.
	 * @returns {Stream} switching stream
	 */
	Stream.prototype.switchLatest = function () {
	  return switchLatest(this)
	};

	// @deprecated use switchLatest instead
	Stream.prototype.switch = Stream.prototype.switchLatest;

	// -----------------------------------------------------------------------
	// Filtering

	/**
	 * Retain only items matching a predicate
	 * stream:                           -12345678-
	 * filter(x => x % 2 === 0, stream): --2-4-6-8-
	 * @param {function(x:*):boolean} p filtering predicate called for each item
	 * @returns {Stream} stream containing only items for which predicate returns truthy
	 */
	Stream.prototype.filter = function (p) {
	  return filter(p, this)
	};

	/**
	 * Skip repeated events, using === to compare items
	 * stream:           -abbcd-
	 * distinct(stream): -ab-cd-
	 * @returns {Stream} stream with no repeated events
	 */
	Stream.prototype.skipRepeats = function () {
	  return skipRepeats(this)
	};

	/**
	 * Skip repeated events, using supplied equals function to compare items
	 * @param {function(a:*, b:*):boolean} equals function to compare items
	 * @returns {Stream} stream with no repeated events
	 */
	Stream.prototype.skipRepeatsWith = function (equals) {
	  return skipRepeatsWith(equals, this)
	};

	// -----------------------------------------------------------------------
	// Slicing

	/**
	 * stream:          -abcd-
	 * take(2, stream): -ab|
	 * @param {Number} n take up to this many events
	 * @returns {Stream} stream containing at most the first n items from this stream
	 */
	Stream.prototype.take = function (n) {
	  return take(n, this)
	};

	/**
	 * stream:          -abcd->
	 * skip(2, stream): ---cd->
	 * @param {Number} n skip this many events
	 * @returns {Stream} stream not containing the first n events
	 */
	Stream.prototype.skip = function (n) {
	  return skip(n, this)
	};

	/**
	 * Slice a stream by event index. Equivalent to, but more efficient than
	 * stream.take(end).skip(start);
	 * NOTE: Negative start and end are not supported
	 * @param {Number} start skip all events before the start index
	 * @param {Number} end allow all events from the start index to the end index
	 * @returns {Stream} stream containing items where start <= index < end
	 */
	Stream.prototype.slice = function (start, end) {
	  return slice(start, end, this)
	};

	/**
	 * stream:                        -123451234->
	 * takeWhile(x => x < 5, stream): -1234|
	 * @param {function(x:*):boolean} p predicate
	 * @returns {Stream} stream containing items up to, but not including, the
	 * first item for which p returns falsy.
	 */
	Stream.prototype.takeWhile = function (p) {
	  return takeWhile(p, this)
	};

	/**
	 * stream:                        -123451234->
	 * skipWhile(x => x < 5, stream): -----51234->
	 * @param {function(x:*):boolean} p predicate
	 * @returns {Stream} stream containing items following *and including* the
	 * first item for which p returns falsy.
	 */
	Stream.prototype.skipWhile = function (p) {
	  return skipWhile(p, this)
	};

	/**
	 * stream:                         -123456789->
	 * skipAfter(x => x === 5, stream):-12345|
	 * @param {function(x:*):boolean} p predicate
	 * @returns {Stream} stream containing items up to, *and including*, the
	 * first item for which p returns truthy.
	 */
	Stream.prototype.skipAfter = function (p) {
	  return skipAfter(p, this)
	};

	// -----------------------------------------------------------------------
	// Time slicing

	/**
	 * stream:                    -a-b-c-d-e-f-g->
	 * signal:                    -------x
	 * takeUntil(signal, stream): -a-b-c-|
	 * @param {Stream} signal retain only events in stream before the first
	 * event in signal
	 * @returns {Stream} new stream containing only events that occur before
	 * the first event in signal.
	 */
	Stream.prototype.until = function (signal) {
	  return takeUntil(signal, this)
	};

	// @deprecated use until instead
	Stream.prototype.takeUntil = Stream.prototype.until;

	  /**
	 * stream:                    -a-b-c-d-e-f-g->
	 * signal:                    -------x
	 * takeUntil(signal, stream): -------d-e-f-g->
	 * @param {Stream} signal retain only events in stream at or after the first
	 * event in signal
	 * @returns {Stream} new stream containing only events that occur after
	 * the first event in signal.
	 */
	Stream.prototype.since = function (signal) {
	  return skipUntil(signal, this)
	};

	// @deprecated use since instead
	Stream.prototype.skipUntil = Stream.prototype.since;

	  /**
	 * stream:                    -a-b-c-d-e-f-g->
	 * timeWindow:                -----s
	 * s:                               -----t
	 * stream.during(timeWindow): -----c-d-e-|
	 * @param {Stream<Stream>} timeWindow a stream whose first event (s) represents
	 *  the window start time.  That event (s) is itself a stream whose first event (t)
	 *  represents the window end time
	 * @returns {Stream} new stream containing only events within the provided timespan
	 */
	Stream.prototype.during = function (timeWindow) {
	  return during(timeWindow, this)
	};

	// -----------------------------------------------------------------------
	// Delaying

	/**
	 * @param {Number} delayTime milliseconds to delay each item
	 * @returns {Stream} new stream containing the same items, but delayed by ms
	 */
	Stream.prototype.delay = function (delayTime) {
	  return delay(delayTime, this)
	};

	// -----------------------------------------------------------------------
	// Getting event timestamp

	/**
	 * Expose event timestamps into the stream. Turns a Stream<X> into
	 * Stream<{time:t, value:X}>
	 * @returns {Stream<{time:number, value:*}>}
	 */
	Stream.prototype.timestamp = function () {
	  return timestamp(this)
	};

	// -----------------------------------------------------------------------
	// Rate limiting

	/**
	 * Limit the rate of events
	 * stream:              abcd----abcd----
	 * throttle(2, stream): a-c-----a-c-----
	 * @param {Number} period time to suppress events
	 * @returns {Stream} new stream that skips events for throttle period
	 */
	Stream.prototype.throttle = function (period) {
	  return throttle(period, this)
	};

	/**
	 * Wait for a burst of events to subside and emit only the last event in the burst
	 * stream:              abcd----abcd----
	 * debounce(2, stream): -----d-------d--
	 * @param {Number} period events occuring more frequently than this
	 *  on the provided scheduler will be suppressed
	 * @returns {Stream} new debounced stream
	 */
	Stream.prototype.debounce = function (period) {
	  return debounce(period, this)
	};

	// -----------------------------------------------------------------------
	// Awaiting Promises

	/**
	 * Await promises, turning a Stream<Promise<X>> into Stream<X>.  Preserves
	 * event order, but timeshifts events based on promise resolution time.
	 * @returns {Stream<X>} stream containing non-promise values
	 */
	Stream.prototype.awaitPromises = function () {
	  return awaitPromises(this)
	};

	// @deprecated use awaitPromises instead
	Stream.prototype.await = Stream.prototype.awaitPromises;

	// -----------------------------------------------------------------------
	// Error handling

	/**
	 * If this stream encounters an error, recover and continue with items from stream
	 * returned by f.
	 * stream:                  -a-b-c-X-
	 * f(X):                           d-e-f-g-
	 * flatMapError(f, stream): -a-b-c-d-e-f-g-
	 * @param {function(error:*):Stream} f function which returns a new stream
	 * @returns {Stream} new stream which will recover from an error by calling f
	 */
	Stream.prototype.recoverWith = function (f) {
	  return flatMapError(f, this)
	};

	// @deprecated use recoverWith instead
	Stream.prototype.flatMapError = Stream.prototype.recoverWith;

	// -----------------------------------------------------------------------
	// Multicasting

	/**
	 * Transform the stream into multicast stream.  That means that many subscribers
	 * to the stream will not cause multiple invocations of the internal machinery.
	 * @returns {Stream} new stream which will multicast events to all observers.
	 */
	Stream.prototype.multicast = function () {
	  return multicast(this)
	};

	// export the instance of the defaultScheduler for third-party libraries
	// export an implementation of Task used internally for third-party libraries

	var id$1 = /* record */[/* contents */0];

	function get_id() {
	  id$1[0] += 1;
	  return id$1[0];
	}

	function create$1(str) {
	  var v_001 = get_id(/* () */0);
	  var v = /* tuple */[
	    str,
	    v_001
	  ];
	  v.tag = 248;
	  return v;
	}


	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	var Check_fail = create$1("Exception-WonderLog.Check_fail");

	var $$throw = (
	    function(msg){
	            throw new Error(msg)
	    });


	/* throw Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE


	var log$1 = function (msg){
	    !!window.wonder_console && window.wonder_console.log(msg);
	  };

	var error$3 = function (msg){
	    !!window.wonder_console && window.wonder_console.error(msg);
	  };

	var warn$1 = function (msg){
	    !!window.wonder_console && window.wonder_console.warn(msg);
	  };

	var trace = function (func){
	    !!window.wonder_console && window.wonder_console.trace(func);
	  };


	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function _log(msg) {
	  console.log(msg);
	  return log$1(msg);
	}

	function _warn(msg) {
	  console.warn(msg);
	  return warn$1(msg);
	}

	function _error(msg) {
	  console.error(msg);
	  return error$3(msg);
	}

	function _trace(func) {
	  console.trace();
	  trace(func);
	  return /* () */0;
	}

	function getJsonStr(json) {
	  return JSON.stringify(json);
	}

	function warn(msg) {
	  return _warn("Warn: " + (String(msg) + ""));
	}

	function buildDebugMessage(description, params, _) {
	  return "\n  Debug:\n\n  description\n  " + (String(description) + ("\n\n  params\n  " + (String(params) + "\n\n  ")));
	}

	function debugWithFunc(func, isTest) {
	  if (isTest) {
	    return _1(func, /* () */0);
	  } else {
	    return /* () */0;
	  }
	}

	function debug(buildMessageFunc, isTest) {
	  if (isTest) {
	    _log(_1(buildMessageFunc, /* () */0));
	    return _trace(debug);
	  } else {
	    return /* () */0;
	  }
	}

	function buildDebugJsonMessage(description, $$var, _) {
	  var varStr = JSON.stringify($$var);
	  return "\n  DebugJson:\n\n  description\n  " + (String(description) + ("\n\n  variable value\n  " + (String(varStr) + "\n  ")));
	}

	function debugJson(buildMessageFunc, isTest) {
	  if (isTest) {
	    _log(_1(buildMessageFunc, /* () */0));
	    return _trace(debugJson);
	  } else {
	    return /* () */0;
	  }
	}

	function buildFatalMessage(title, description, reason, solution, params) {
	  return "\n  Fatal:\n\n  title\n  " + (String(title) + ("\n\n  description\n  " + (String(description) + ("\n\n  reason\n  " + (String(reason) + ("\n\n  solution\n  " + (String(solution) + ("\n\n  params\n  " + (String(params) + "\n\n   ")))))))));
	}

	function fatal(msg) {
	  return _1($$throw, msg);
	}

	function buildErrorMessage(title, description, reason, solution, params) {
	  return "\n  Error:\n\n  title\n  " + (String(title) + ("\n\n  description\n  " + (String(description) + ("\n\n  reason\n  " + (String(reason) + ("\n\n  solution\n  " + (String(solution) + ("\n\n  params\n  " + (String(params) + "\n\n   ")))))))));
	}

	function error$2(msg) {
	  _error(msg);
	  return _trace(error$2);
	}

	function buildAssertMessage(expect, actual) {
	  return "expect " + (String(expect) + (", but actual " + (String(actual) + "")));
	}


	/* Exception-WonderLog Not a pure module */

	var getSelf = (
	    function(){
	      if(typeof window !== "undefined"){
	        if(typeof window.fake_self_wonder !== "undefined"){
	          return window.fake_self_wonder;
	        }
	      }

	        return self;
	    }
	    );

	function postMessage(data, worker) {
	  worker.postMessage(data);
	  return /* () */0;
	}


	/* getSelf Not a pure module */

	function values(dict) {
	  var keys = Object.keys(dict);
	  var l = keys.length;
	  var values$1 = new Array(l);
	  for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
	    values$1[i] = dict[keys[i]];
	  }
	  return values$1;
	}

	function fromList$1(entries) {
	  var dict = { };
	  var _param = entries;
	  while(true) {
	    var param = _param;
	    if (param) {
	      var match = param[0];
	      dict[match[0]] = match[1];
	      _param = param[1];
	      continue ;
	    } else {
	      return dict;
	    }
	  }
	}


	/* unsafeDeleteKey Not a pure module */

	var undefinedHeader = /* array */[];

	function some$1(x) {
	  if (x === undefined) {
	    var block = /* tuple */[
	      undefinedHeader,
	      0
	    ];
	    block.tag = 256;
	    return block;
	  } else if (x !== null && x[0] === undefinedHeader) {
	    var nid = x[1] + 1 | 0;
	    var block$1 = /* tuple */[
	      undefinedHeader,
	      nid
	    ];
	    block$1.tag = 256;
	    return block$1;
	  } else {
	    return x;
	  }
	}

	function nullable_to_opt(x) {
	  if (x === null || x === undefined) {
	    return undefined;
	  } else {
	    return some$1(x);
	  }
	}

	function undefined_to_opt(x) {
	  if (x === undefined) {
	    return undefined;
	  } else {
	    return some$1(x);
	  }
	}

	function valFromOption(x) {
	  if (x !== null && x[0] === undefinedHeader) {
	    var depth = x[1];
	    if (depth === 0) {
	      return undefined;
	    } else {
	      return /* tuple */[
	              undefinedHeader,
	              depth - 1 | 0
	            ];
	    }
	  } else {
	    return x;
	  }
	}


	/* No side effect */

	function isSome(param) {
	  return param !== undefined;
	}

	function getExn(x) {
	  if (x !== undefined) {
	    return valFromOption(x);
	  } else {
	    throw new Error("getExn");
	  }
	}


	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function createEmpty() {
	  return { };
	}

	function set(key, value, map) {
	  map[key] = value;
	  return map;
	}

	function get(key, map) {
	  return undefined_to_opt(map[key]);
	}

	function unsafeGet(key, map) {
	  return map[key];
	}

	var fromList = fromList$1;


	/* Js_dict Not a pure module */

	var $$Error = create$1("Js_exn.Error");


	/* No side effect */

	/* No side effect */

	function caml_int_compare(x, y) {
	  if (x < y) {
	    return -1;
	  } else if (x === y) {
	    return 0;
	  } else {
	    return 1;
	  }
	}

	function caml_bool_compare(x, y) {
	  if (x) {
	    if (y) {
	      return 0;
	    } else {
	      return 1;
	    }
	  } else if (y) {
	    return -1;
	  } else {
	    return 0;
	  }
	}

	function caml_string_compare(s1, s2) {
	  if (s1 === s2) {
	    return 0;
	  } else if (s1 < s2) {
	    return -1;
	  } else {
	    return 1;
	  }
	}


	/* No side effect */

	var for_in = function (o,foo){
	        for (var x in o) { foo(x); }
	      };

	function caml_compare(_a, _b) {
	  while(true) {
	    var b = _b;
	    var a = _a;
	    if (a === b) {
	      return 0;
	    } else {
	      var a_type = typeof a;
	      var b_type = typeof b;
	      var exit = 0;
	      switch (a_type) {
	        case "boolean" : 
	            if (b_type === "boolean") {
	              return caml_bool_compare(a, b);
	            } else {
	              exit = 1;
	            }
	            break;
	        case "function" : 
	            if (b_type === "function") {
	              throw [
	                    invalid_argument,
	                    "compare: functional value"
	                  ];
	            } else {
	              exit = 1;
	            }
	            break;
	        case "number" : 
	            if (b_type === "number") {
	              return caml_int_compare(a, b);
	            } else {
	              exit = 1;
	            }
	            break;
	        case "string" : 
	            if (b_type === "string") {
	              return caml_string_compare(a, b);
	            } else {
	              return 1;
	            }
	        case "undefined" : 
	            return -1;
	        default:
	          exit = 1;
	      }
	      if (exit === 1) {
	        switch (b_type) {
	          case "string" : 
	              return -1;
	          case "undefined" : 
	              return 1;
	          default:
	            if (a_type === "boolean") {
	              return 1;
	            } else if (b_type === "boolean") {
	              return -1;
	            } else if (a_type === "function") {
	              return 1;
	            } else if (b_type === "function") {
	              return -1;
	            } else if (a_type === "number") {
	              if (b === null || b.tag === 256) {
	                return 1;
	              } else {
	                return -1;
	              }
	            } else if (b_type === "number") {
	              if (a === null || a.tag === 256) {
	                return -1;
	              } else {
	                return 1;
	              }
	            } else if (a === null) {
	              if (b.tag === 256) {
	                return 1;
	              } else {
	                return -1;
	              }
	            } else if (b === null) {
	              if (a.tag === 256) {
	                return -1;
	              } else {
	                return 1;
	              }
	            } else {
	              var tag_a = a.tag | 0;
	              var tag_b = b.tag | 0;
	              if (tag_a === 250) {
	                _a = a[0];
	                continue ;
	              } else if (tag_b === 250) {
	                _b = b[0];
	                continue ;
	              } else if (tag_a === 256) {
	                if (tag_b === 256) {
	                  return caml_int_compare(a[1], b[1]);
	                } else {
	                  return -1;
	                }
	              } else if (tag_a === 248) {
	                return caml_int_compare(a[1], b[1]);
	              } else if (tag_a === 251) {
	                throw [
	                      invalid_argument,
	                      "equal: abstract value"
	                    ];
	              } else if (tag_a !== tag_b) {
	                if (tag_a < tag_b) {
	                  return -1;
	                } else {
	                  return 1;
	                }
	              } else {
	                var len_a = a.length | 0;
	                var len_b = b.length | 0;
	                if (len_a === len_b) {
	                  if (Array.isArray(a)) {
	                    var a$1 = a;
	                    var b$1 = b;
	                    var _i = 0;
	                    var same_length = len_a;
	                    while(true) {
	                      var i = _i;
	                      if (i === same_length) {
	                        return 0;
	                      } else {
	                        var res = caml_compare(a$1[i], b$1[i]);
	                        if (res !== 0) {
	                          return res;
	                        } else {
	                          _i = i + 1 | 0;
	                          continue ;
	                        }
	                      }
	                    }
	                  } else {
	                    var a$2 = a;
	                    var b$2 = b;
	                    var min_key_lhs = /* record */[/* contents */undefined];
	                    var min_key_rhs = /* record */[/* contents */undefined];
	                    var do_key = function (param, key) {
	                      var min_key = param[2];
	                      var b = param[1];
	                      if (!b.hasOwnProperty(key) || caml_compare(param[0][key], b[key]) > 0) {
	                        var match = min_key[0];
	                        if (match !== undefined && key >= match) {
	                          return 0;
	                        } else {
	                          min_key[0] = key;
	                          return /* () */0;
	                        }
	                      } else {
	                        return 0;
	                      }
	                    };
	                    var partial_arg = /* tuple */[
	                      a$2,
	                      b$2,
	                      min_key_rhs
	                    ];
	                    var do_key_a = (function(partial_arg){
	                    return function do_key_a(param) {
	                      return do_key(partial_arg, param);
	                    }
	                    }(partial_arg));
	                    var partial_arg$1 = /* tuple */[
	                      b$2,
	                      a$2,
	                      min_key_lhs
	                    ];
	                    var do_key_b = (function(partial_arg$1){
	                    return function do_key_b(param) {
	                      return do_key(partial_arg$1, param);
	                    }
	                    }(partial_arg$1));
	                    for_in(a$2, do_key_a);
	                    for_in(b$2, do_key_b);
	                    var match = min_key_lhs[0];
	                    var match$1 = min_key_rhs[0];
	                    if (match !== undefined) {
	                      if (match$1 !== undefined) {
	                        return caml_string_compare(match, match$1);
	                      } else {
	                        return -1;
	                      }
	                    } else if (match$1 !== undefined) {
	                      return 1;
	                    } else {
	                      return 0;
	                    }
	                  }
	                } else if (len_a < len_b) {
	                  var a$3 = a;
	                  var b$3 = b;
	                  var _i$1 = 0;
	                  var short_length = len_a;
	                  while(true) {
	                    var i$1 = _i$1;
	                    if (i$1 === short_length) {
	                      return -1;
	                    } else {
	                      var res$1 = caml_compare(a$3[i$1], b$3[i$1]);
	                      if (res$1 !== 0) {
	                        return res$1;
	                      } else {
	                        _i$1 = i$1 + 1 | 0;
	                        continue ;
	                      }
	                    }
	                  }
	                } else {
	                  var a$4 = a;
	                  var b$4 = b;
	                  var _i$2 = 0;
	                  var short_length$1 = len_b;
	                  while(true) {
	                    var i$2 = _i$2;
	                    if (i$2 === short_length$1) {
	                      return 1;
	                    } else {
	                      var res$2 = caml_compare(a$4[i$2], b$4[i$2]);
	                      if (res$2 !== 0) {
	                        return res$2;
	                      } else {
	                        _i$2 = i$2 + 1 | 0;
	                        continue ;
	                      }
	                    }
	                  }
	                }
	              }
	            }
	        }
	      }
	      
	    }
	  }
	}

	function caml_equal(_a, _b) {
	  while(true) {
	    var b = _b;
	    var a = _a;
	    if (a === b) {
	      return true;
	    } else {
	      var a_type = typeof a;
	      if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
	        return false;
	      } else {
	        var b_type = typeof b;
	        if (a_type === "function" || b_type === "function") {
	          throw [
	                invalid_argument,
	                "equal: functional value"
	              ];
	        } else if (b_type === "number" || b_type === "undefined" || b === null) {
	          return false;
	        } else {
	          var tag_a = a.tag | 0;
	          var tag_b = b.tag | 0;
	          if (tag_a === 250) {
	            _a = a[0];
	            continue ;
	          } else if (tag_b === 250) {
	            _b = b[0];
	            continue ;
	          } else if (tag_a === 248) {
	            return a[1] === b[1];
	          } else if (tag_a === 251) {
	            throw [
	                  invalid_argument,
	                  "equal: abstract value"
	                ];
	          } else if (tag_a !== tag_b) {
	            return false;
	          } else if (tag_a === 256) {
	            return a[1] === b[1];
	          } else {
	            var len_a = a.length | 0;
	            var len_b = b.length | 0;
	            if (len_a === len_b) {
	              if (Array.isArray(a)) {
	                var a$1 = a;
	                var b$1 = b;
	                var _i = 0;
	                var same_length = len_a;
	                while(true) {
	                  var i = _i;
	                  if (i === same_length) {
	                    return true;
	                  } else if (caml_equal(a$1[i], b$1[i])) {
	                    _i = i + 1 | 0;
	                    continue ;
	                  } else {
	                    return false;
	                  }
	                }
	              } else {
	                var a$2 = a;
	                var b$2 = b;
	                var result = /* record */[/* contents */true];
	                var do_key_a = (function(b$2,result){
	                return function do_key_a(key) {
	                  if (b$2.hasOwnProperty(key)) {
	                    return 0;
	                  } else {
	                    result[0] = false;
	                    return /* () */0;
	                  }
	                }
	                }(b$2,result));
	                var do_key_b = (function(a$2,b$2,result){
	                return function do_key_b(key) {
	                  if (!a$2.hasOwnProperty(key) || !caml_equal(b$2[key], a$2[key])) {
	                    result[0] = false;
	                    return /* () */0;
	                  } else {
	                    return 0;
	                  }
	                }
	                }(a$2,b$2,result));
	                for_in(a$2, do_key_a);
	                if (result[0]) {
	                  for_in(b$2, do_key_b);
	                }
	                return result[0];
	              }
	            } else {
	              return false;
	            }
	          }
	        }
	      }
	    }
	  }
	}

	function caml_notequal(a, b) {
	  return !caml_equal(a, b);
	}

	function caml_greaterequal(a, b) {
	  return caml_compare(a, b) >= 0;
	}

	function caml_greaterthan(a, b) {
	  return caml_compare(a, b) > 0;
	}

	function caml_lessequal(a, b) {
	  return caml_compare(a, b) <= 0;
	}

	function caml_lessthan(a, b) {
	  return caml_compare(a, b) < 0;
	}


	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function _assert(result, msg) {
	  if (result) {
	    return /* () */0;
	  } else {
	    throw [
	          Check_fail,
	          msg
	        ];
	  }
	}

	var test = function (message,func){
	  try{
	  func();
	  } catch(e){
	    throw new Error(JSON.stringify(message));
	  }
	  };

	function requireCheck(f, isTest) {
	  if (isTest) {
	    return _1(f, /* () */0);
	  } else {
	    return /* () */0;
	  }
	}

	function ensureCheck(f, isTest, returnVal) {
	  if (isTest) {
	    _1(f, returnVal);
	    return returnVal;
	  } else {
	    return returnVal;
	  }
	}

	function assertPass() {
	  return /* () */0;
	}

	function assertTrue(source) {
	  return _assert(source === true, "expect to be true, but actual is false");
	}

	function assertFalse(source) {
	  return _assert(source === false, "expect to be false, but actual is true");
	}

	function assertJsTrue(source) {
	  return _assert(source === true, "expect to be true, but actual is false");
	}

	function assertJsFalse(source) {
	  return _assert(source === false, "expect to be false, but actual is true");
	}

	var _isNullableExist = (
	function(source) {
	    return source !== undefined && source !== null;
	}
	);

	function assertNullableExist(source) {
	  return _assert(_1(_isNullableExist, source), "expect exist, but actual not");
	}

	function assertExist(source) {
	  return _assert(isSome(source), "expect exist, but actual not");
	}

	function _getEqualMessage(source, target) {
	  return "\"expect to be " + (String(target) + (", but actual is " + (String(source) + "\"")));
	}

	function assertEqual(_, source, target) {
	  return _assert(caml_equal(source, target), _getEqualMessage(source, target));
	}

	function _getNotEqualMessage(source, target) {
	  return "\"expect not to be " + (String(target) + (", but actual is " + (String(source) + "\"")));
	}

	function assertNotEqual(_, source, target) {
	  return _assert(caml_notequal(source, target), _getNotEqualMessage(source, target));
	}

	function assertGt(_, source, target) {
	  return _assert(caml_greaterthan(source, target), "expect " + (String(source) + (" > " + (String(target) + ", but actual isn\'t"))));
	}

	function assertGte(_, source, target) {
	  return _assert(caml_greaterequal(source, target), "expect " + (String(source) + (" >= " + (String(target) + ", but actual isn\'t"))));
	}

	function assertLt(_, source, target) {
	  return _assert(caml_lessthan(source, target), "expect " + (String(source) + (" < " + (String(target) + ", but actual isn\'t"))));
	}

	function assertLte(_, source, target) {
	  return _assert(caml_lessequal(source, target), "expect " + (String(source) + (" <= " + (String(target) + ", but actual isn\'t"))));
	}

	function $eq(a, b) {
	  return assertEqual(/* Int */0, a, b);
	}

	function $eq$eq$dot(a, b) {
	  return assertEqual(/* Float */1, a, b);
	}

	function $eq$eq$caret(a, b) {
	  return assertEqual(/* String */2, a, b);
	}

	function $less$great$eq(a, b) {
	  return assertNotEqual(/* Int */0, a, b);
	}

	function $less$great$eq$dot(a, b) {
	  return assertNotEqual(/* Float */1, a, b);
	}

	function $great(a, b) {
	  return assertGt(/* Int */0, a, b);
	}

	function $great$dot(a, b) {
	  return assertGt(/* Float */1, a, b);
	}

	function $great$eq(a, b) {
	  return assertGte(/* Int */0, a, b);
	}

	function $great$eq$dot(a, b) {
	  return assertGte(/* Float */1, a, b);
	}

	function $less(a, b) {
	  return assertLt(/* Int */0, a, b);
	}

	function $less$dot(a, b) {
	  return assertLt(/* Float */1, a, b);
	}

	function $less$eq(a, b) {
	  return assertLte(/* Int */0, a, b);
	}

	function $less$eq$dot(a, b) {
	  return assertLte(/* Float */1, a, b);
	}

	var Operators = /* module */[
	  /* = */$eq,
	  /* ==. */$eq$eq$dot,
	  /* ==^ */$eq$eq$caret,
	  /* <>= */$less$great$eq,
	  /* <>=. */$less$great$eq$dot,
	  /* > */$great,
	  /* >. */$great$dot,
	  /* >= */$great$eq,
	  /* >=. */$great$eq$dot,
	  /* < */$less,
	  /* <. */$less$dot,
	  /* <= */$less$eq,
	  /* <=. */$less$eq$dot
	];


	/* _isNullableExist Not a pure module */

	function createStateData() {
	  return /* record */[
	          /* state */undefined,
	          /* isDebug */false
	        ];
	}


	/* No side effect */

	var stateData = createStateData(/* () */0);


	/* stateData Not a pure module */

	function getIsDebug(stateData) {
	  return stateData[/* isDebug */1];
	}

	function setIsDebug(stateData, isDebug) {
	  stateData[/* isDebug */1] = isDebug;
	  return stateData;
	}


	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function createEmpty$1() {
	  return /* array */[];
	}

	function isNotEqual(index, target, arr) {
	  if (index >= arr.length) {
	    return true;
	  } else {
	    return caml_notequal(arr[index], target);
	  }
	}

	function forEach(func, arr) {
	  for(var i = 0 ,i_finish = arr.length - 1 | 0; i <= i_finish; ++i){
	    func(arr[i]);
	  }
	  return /* () */0;
	}

	function reduceOneParam(func, param, arr) {
	  var mutableParam = param;
	  for(var i = 0 ,i_finish = arr.length - 1 | 0; i <= i_finish; ++i){
	    mutableParam = func(mutableParam, arr[i]);
	  }
	  return mutableParam;
	}

	function reduceOneParami(func, param, arr) {
	  var mutableParam = param;
	  for(var i = 0 ,i_finish = arr.length - 1 | 0; i <= i_finish; ++i){
	    mutableParam = func(mutableParam, arr[i], i);
	  }
	  return mutableParam;
	}


	/* HashMapService-WonderCommonlib Not a pure module */

	var _isFromEventStream = (
	  function(stream) {
	    var source = stream.source;
	    return !!source.event && !!source.source;
	  }
	  );

	function concatArray(streamArr) {
	  var match = streamArr.length;
	  if (match !== 0) {
	    return reduceOneParam((function (stream1, stream2) {
	                  _1(_isFromEventStream, stream1) === true;
	                  return stream1.concat(stream2);
	                }), caml_array_get(streamArr, 0), streamArr.slice(1));
	  } else {
	    return of(1);
	  }
	}

	function concatStreamFuncArray(stateData$$1, streamFuncArr) {
	  requireCheck((function () {
	          var count = streamFuncArr.length;
	          test(buildAssertMessage("stream count >= 2", "is " + (String(count) + "")), (function () {
	                  return Operators[/* >= */7](count, 2);
	                }));
	          test("the first stream should be fromEvent stream", (function () {
	                  return assertJsTrue(_1(_isFromEventStream, caml_array_get(streamFuncArr, 0)));
	                }));
	          return test("only the first stream should be fromEvent stream", (function () {
	                        return forEach((function (stream) {
	                                      return assertJsFalse(_1(_isFromEventStream, stream));
	                                    }), streamFuncArr.slice(1));
	                      }));
	        }), getIsDebug(stateData));
	  return reduceOneParam((function (stream1, streamFunc2) {
	                return concatMap((function (e) {
	                              return _2(streamFunc2, e, stateData$$1);
	                            }), stream1);
	              }), _2(caml_array_get(streamFuncArr, 0), undefined, stateData$$1), streamFuncArr.slice(1));
	}

	function callFunc(func) {
	  return map$2((function (func) {
	                return _1(func, /* () */0);
	              }), of(func));
	}


	/* _isFromEventStream Not a pure module */

	function range$1(a, b) {
	  var result = createEmpty$1(/* () */0);
	  for(var i = a; i <= b; ++i){
	    result.push(i);
	  }
	  return result;
	}

	function push(item, arr) {
	  arr.push(item);
	  return arr;
	}


	/* Log-WonderLog Not a pure module */

	function unsafeGet$1(optionData) {
	  requireCheck((function () {
	          return test(buildAssertMessage("data exist(get by getExn)", "not"), (function () {
	                        return assertExist(optionData);
	                      }));
	        }), getIsDebug(stateData));
	  return getExn(optionData);
	}

	function isJsonSerializedValueNone(value) {
	  if (value === null) {
	    return true;
	  } else {
	    return value === undefined;
	  }
	}

	var unsafeGetJsonSerializedValue = unsafeGet$1;


	/* Log-WonderLog Not a pure module */

	function unsafeFindFirst(arr, targetValue, func) {
	  return ensureCheck((function (first) {
	                var arrJson = getJsonStr(arr);
	                return test(buildAssertMessage("find " + (String(targetValue) + (" in " + (String(arrJson) + ""))), "not"), (function () {
	                              return assertNullableExist(first);
	                            }));
	              }), getIsDebug(stateData), arr.find(func));
	}

	var filterTargetName = caml_equal;

	function _throwJobFlagsShouldBeDefined() {
	  return fatal(buildFatalMessage("throwJobFlagsShouldBeDefined", "jobFlags should be defined", "", "", ""));
	}

	function unsafeGetFlags(flags) {
	  if (flags !== undefined) {
	    return valFromOption(flags);
	  } else {
	    return _throwJobFlagsShouldBeDefined(/* () */0);
	  }
	}


	/* Log-WonderLog Not a pure module */

	function _getExecutableWorkerJob(jobs, jobItemName) {
	  return unsafeFindFirst(jobs, jobItemName, (function (param) {
	                return filterTargetName(param[/* name */0], jobItemName);
	              }));
	}

	function _buildWorkerStreamFuncArr(param, getJobHandleFunc) {
	  var jobs = param[3];
	  var jobHandleMap = param[0];
	  return reduceOneParam((function (streamArr, job) {
	                var jobName = job[/* name */0];
	                var match = _getExecutableWorkerJob(jobs, jobName);
	                var handleFunc = _2(getJobHandleFunc, jobName, jobHandleMap);
	                return push(_1(handleFunc, match[/* flags */1]), streamArr);
	              }), /* array */[], param[1]);
	}

	function getRenderWorkerJobStreamArr$1(param, jobHandleMap, stateData$$1, getJobHandleFunc) {
	  var workerJobs = param[1];
	  return reduceOneParam((function (streamArr, pipelineSubJobs) {
	                return push(concatStreamFuncArray(stateData$$1, _buildWorkerStreamFuncArr(/* tuple */[
	                                    jobHandleMap,
	                                    pipelineSubJobs,
	                                    stateData$$1,
	                                    workerJobs
	                                  ], getJobHandleFunc)), streamArr);
	              }), /* array */[], param[0]);
	}


	/* Log-WonderLog Not a pure module */

	/* node_std_output Not a pure module */

	/* No side effect */

	var imul = ( Math.imul || function (x,y) {
	  y |= 0; return ((((x >> 16) * y) << 16) + (x & 0xffff) * y)|0; 
	}
	);


	/* imul Not a pure module */

	/* repeat Not a pure module */

	/* two_ptr_32_dbl Not a pure module */

	/* float_of_string Not a pure module */

	/* No side effect */

	/* No side effect */

	/* No side effect */

	var Exit = create$1("Pervasives.Exit");


	/* No side effect */

	/* No side effect */

	/* MostUtils-Wonderjs Not a pure module */

	/* most Not a pure module */

	/* most Not a pure module */

	function getRenderWorkerJobStreamArr(pipelineJobs, workerJobs, param, stateData) {
	  return getRenderWorkerJobStreamArr$1(/* tuple */[
	              pipelineJobs,
	              workerJobs
	            ], _1(param[0], /* () */0), stateData, param[1]);
	}


	/* HashMapService-WonderCommonlib Not a pure module */

	var renderWorkerStateData = /* record */[/* state */undefined];


	/* No side effect */

	function handleGetNoneJob(name, jobHandleMap) {
	  return fatal(buildFatalMessage("get no job", "can\'t find job handle function whose job name is " + (String(name) + ""), "", "make sure that the job name defined in config record be correctly", "jobHandleMap:" + (getJsonStr(jobHandleMap) + ("\nname: " + (String(name) + "")))));
	}


	/* Log-WonderLog Not a pure module */

	/* Js_dict Not a pure module */

	var createJobHandleMap = fromList;


	/* HashMapService-Wonderjs Not a pure module */

	var hexFloat_of_string = (
	function(str) {
	    return parseInt(str, 16);
	}
	);


	/* hexFloat_of_string Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* TimeControllerService-Wonderjs Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	function commit(gl) {
	  gl.commit();
	  return /* () */0;
	}


	/* No side effect */

	function unsafeGetGl(record) {
	  var gl = record[/* gl */0];
	  requireCheck((function () {
	          return test(buildAssertMessage("gl exist", "not"), (function () {
	                        return assertExist(gl);
	                      }));
	        }), getIsDebug(stateData));
	  return unsafeGet$1(gl);
	}

	function setGl(gl, record) {
	  return /* record */[
	          /* gl */some$1(gl),
	          /* colorWrite */record[/* colorWrite */1],
	          /* clearColor */record[/* clearColor */2],
	          /* side */record[/* side */3],
	          /* depthTest */record[/* depthTest */4],
	          /* scissorTest */record[/* scissorTest */5],
	          /* scissor */record[/* scissor */6],
	          /* viewport */record[/* viewport */7]
	        ];
	}

	function setColorWrite(gl, param, record) {
	  var colorWrite = record[/* colorWrite */1];
	  var writeAlpha = param[3];
	  var writeBlue = param[2];
	  var writeGreen = param[1];
	  var writeRed = param[0];
	  var exit = 0;
	  if (colorWrite !== undefined) {
	    var match = colorWrite;
	    if (match[0] === writeRed && match[1] === writeGreen && match[2] === writeBlue && match[3] === writeAlpha) {
	      return record;
	    } else {
	      exit = 1;
	    }
	  } else {
	    exit = 1;
	  }
	  if (exit === 1) {
	    gl.colorMask(writeRed, writeGreen, writeBlue, writeAlpha);
	    return /* record */[
	            /* gl */record[/* gl */0],
	            /* colorWrite *//* tuple */[
	              writeRed,
	              writeGreen,
	              writeBlue,
	              writeAlpha
	            ],
	            /* clearColor */record[/* clearColor */2],
	            /* side */record[/* side */3],
	            /* depthTest */record[/* depthTest */4],
	            /* scissorTest */record[/* scissorTest */5],
	            /* scissor */record[/* scissor */6],
	            /* viewport */record[/* viewport */7]
	          ];
	  }
	  
	}

	function _setSide(gl, targetSide) {
	  switch (targetSide) {
	    case 0 : 
	        gl.enable(gl.CULL_FACE);
	        gl.cullFace(gl.FRONT_AND_BACK);
	        return /* () */0;
	    case 1 : 
	        gl.disable(gl.CULL_FACE);
	        return /* () */0;
	    case 2 : 
	        gl.enable(gl.CULL_FACE);
	        gl.cullFace(gl.BACK);
	        return /* () */0;
	    case 3 : 
	        gl.enable(gl.CULL_FACE);
	        gl.cullFace(gl.FRONT);
	        return /* () */0;
	    
	  }
	}

	function setSide(gl, targetSide, record) {
	  var side = record[/* side */3];
	  var exit = 0;
	  if (side !== undefined && side === targetSide) {
	    return record;
	  } else {
	    exit = 1;
	  }
	  if (exit === 1) {
	    _setSide(gl, targetSide);
	    return /* record */[
	            /* gl */record[/* gl */0],
	            /* colorWrite */record[/* colorWrite */1],
	            /* clearColor */record[/* clearColor */2],
	            /* side */targetSide,
	            /* depthTest */record[/* depthTest */4],
	            /* scissorTest */record[/* scissorTest */5],
	            /* scissor */record[/* scissor */6],
	            /* viewport */record[/* viewport */7]
	          ];
	  }
	  
	}

	function _setDepthTest(gl, targetDepthTest) {
	  if (targetDepthTest) {
	    gl.enable(gl.DEPTH_TEST);
	    return /* () */0;
	  } else {
	    gl.disable(gl.DEPTH_TEST);
	    return /* () */0;
	  }
	}

	function setDepthTest(gl, targetDepthTest, record) {
	  var depthTest = record[/* depthTest */4];
	  var exit = 0;
	  if (depthTest !== undefined && depthTest === targetDepthTest) {
	    return record;
	  } else {
	    exit = 1;
	  }
	  if (exit === 1) {
	    _setDepthTest(gl, targetDepthTest);
	    return /* record */[
	            /* gl */record[/* gl */0],
	            /* colorWrite */record[/* colorWrite */1],
	            /* clearColor */record[/* clearColor */2],
	            /* side */record[/* side */3],
	            /* depthTest */targetDepthTest,
	            /* scissorTest */record[/* scissorTest */5],
	            /* scissor */record[/* scissor */6],
	            /* viewport */record[/* viewport */7]
	          ];
	  }
	  
	}

	function clearBuffer(gl, bit, record) {
	  var record$1 = setColorWrite(gl, /* tuple */[
	        true,
	        true,
	        true,
	        true
	      ], record);
	  gl.clear(bit);
	  return record$1;
	}

	function clearColor(gl, param, record) {
	  var clearColor$1 = record[/* clearColor */2];
	  var a = param[3];
	  var b = param[2];
	  var g = param[1];
	  var r = param[0];
	  var exit = 0;
	  if (clearColor$1 !== undefined) {
	    var match = clearColor$1;
	    if (match[0] === r && match[1] === g && match[2] === b && match[3] === a) {
	      return record;
	    } else {
	      exit = 1;
	    }
	  } else {
	    exit = 1;
	  }
	  if (exit === 1) {
	    gl.clearColor(r, g, b, a);
	    return /* record */[
	            /* gl */record[/* gl */0],
	            /* colorWrite */record[/* colorWrite */1],
	            /* clearColor *//* tuple */[
	              r,
	              g,
	              b,
	              a
	            ],
	            /* side */record[/* side */3],
	            /* depthTest */record[/* depthTest */4],
	            /* scissorTest */record[/* scissorTest */5],
	            /* scissor */record[/* scissor */6],
	            /* viewport */record[/* viewport */7]
	          ];
	  }
	  
	}

	function setViewportOfGl(gl, param, record) {
	  var viewport = record[/* viewport */7];
	  var height = param[3];
	  var width = param[2];
	  var y = param[1];
	  var x = param[0];
	  var exit = 0;
	  if (viewport !== undefined) {
	    var match = viewport;
	    if (match[0] === x && match[1] === y && match[2] === width && match[3] === height) {
	      return record;
	    } else {
	      exit = 1;
	    }
	  } else {
	    exit = 1;
	  }
	  if (exit === 1) {
	    gl.viewport(x, y, width, height);
	    return /* record */[
	            /* gl */record[/* gl */0],
	            /* colorWrite */record[/* colorWrite */1],
	            /* clearColor */record[/* clearColor */2],
	            /* side */record[/* side */3],
	            /* depthTest */record[/* depthTest */4],
	            /* scissorTest */record[/* scissorTest */5],
	            /* scissor */record[/* scissor */6],
	            /* viewport *//* tuple */[
	              x,
	              y,
	              width,
	              height
	            ]
	          ];
	  }
	  
	}


	/* Log-WonderLog Not a pure module */

	function setState$1(stateData, state) {
	  stateData[/* state */0] = state;
	  return state;
	}

	function unsafeGetState$1(stateData) {
	  return unsafeGet$1(stateData[/* state */0]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function execJob$2(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var gl = unsafeGetGl(state[/* deviceManagerRecord */4]);
	                commit(gl);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE


	function isEmpty(value) {
	  if (value === null) {
	    return true;
	  } else {
	    return value === undefined;
	  }
	}


	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function createEmpty$2() {
	  return /* array */[];
	}

	function unsafeGet$2(key, map) {
	  return map[key];
	}

	function get$3(key, map) {
	  var value = map[key];
	  var match = isEmpty(value);
	  if (match) {
	    return undefined;
	  } else {
	    return some$1(value);
	  }
	}

	function set$1(key, value, map) {
	  map[key] = value;
	  return map;
	}

	function deleteVal$1(key, map) {
	  map[key] = undefined;
	  return map;
	}


	/* No side effect */

	/* ArrayService-Wonderjs Not a pure module */

	/* ArrayService-Wonderjs Not a pure module */

	/* BindDomEventMainService-Wonderjs Not a pure module */

	/* BindDomEventMainService-Wonderjs Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* ArrayService-WonderCommonlib Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	/* SparseMapService-Wonderjs Not a pure module */

	/* _isSupportSharedArrayBuffer Not a pure module */

	function getLocalToWorldMatricesLength(count) {
	  return (count << 4);
	}

	function getLocalToWorldMatricesOffset() {
	  return 0;
	}

	function getLocalPositionsLength(count) {
	  return imul(count, 3);
	}

	function getLocalPositionsOffset(count) {
	  return 0 + imul((count << 4), Float32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getLocalRotationsLength(count) {
	  return (count << 2);
	}

	function getLocalRotationsOffset(count) {
	  return getLocalPositionsOffset(count) + imul(imul(count, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getLocalScalesLength(count) {
	  return imul(count, 3);
	}

	function getLocalScalesOffset(count) {
	  return getLocalRotationsOffset(count) + imul((count << 2), Float32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getLocalToWorldMatrixIndex(index) {
	  return (index << 4);
	}


	/* Worker-Wonderjs Not a pure module */

	/* No side effect */

	/* No side effect */

	/* hasProperty Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	/* Worker-Wonderjs Not a pure module */

	function createTypeArrays(buffer, count) {
	  return /* tuple */[
	          new Float32Array(buffer, getLocalToWorldMatricesOffset(count), getLocalToWorldMatricesLength(count)),
	          new Float32Array(buffer, getLocalPositionsOffset(count), getLocalPositionsLength(count)),
	          new Float32Array(buffer, getLocalRotationsOffset(count), getLocalRotationsLength(count)),
	          new Float32Array(buffer, getLocalScalesOffset(count), getLocalScalesLength(count))
	        ];
	}


	/* BufferTransformService-Wonderjs Not a pure module */

	function getUint8_1(index, typeArray) {
	  return typeArray[index];
	}

	function getUint16_1(index, typeArray) {
	  return typeArray[index];
	}

	function getUint32_1(index, typeArray) {
	  return typeArray[index];
	}

	function getFloat1(index, typeArray) {
	  return typeArray[index];
	}

	function getFloat3(index, typeArray) {
	  return /* array */[
	          typeArray[index],
	          typeArray[index + 1 | 0],
	          typeArray[index + 2 | 0]
	        ];
	}

	function _checkNotExceedBound(index, typeArray, getLengthFunc) {
	  return test(buildAssertMessage("not exceed bound", "exceed"), (function () {
	                return Operators[/* < */9](index, _1(getLengthFunc, typeArray));
	              }));
	}

	function setUint8_1(index, value, typeArray) {
	  requireCheck((function () {
	          return _checkNotExceedBound(index, typeArray, (function (prim) {
	                        return prim.length;
	                      }));
	        }), getIsDebug(stateData));
	  typeArray[index] = value;
	  return typeArray;
	}

	function setUint32_1(index, value, typeArray) {
	  requireCheck((function () {
	          return _checkNotExceedBound(index, typeArray, (function (prim) {
	                        return prim.length;
	                      }));
	        }), getIsDebug(stateData));
	  typeArray[index] = value;
	  return typeArray;
	}

	function getFloat16TypeArray(index, typeArray) {
	  return typeArray.subarray(index, index + 16 | 0);
	}

	function getFloat32ArraySubarray(typeArray, startIndex, endIndex) {
	  return typeArray.subarray(startIndex, endIndex);
	}

	function getUint16ArraySubarray(typeArray, startIndex, endIndex) {
	  return typeArray.subarray(startIndex, endIndex);
	}

	function getUint32ArraySubarray(typeArray, startIndex, endIndex) {
	  return typeArray.subarray(startIndex, endIndex);
	}

	function _setFloat32ArrayWithFloat32Array(targetTypeArr, sourceTypeArr, typeArrIndex, i) {
	  targetTypeArr[typeArrIndex] = sourceTypeArr[i];
	  return /* () */0;
	}

	function _fillTypeArrayWithTypeArr(param, param$1, endIndex, _setTypeArrWithTypeArr) {
	  var sourceTypeArr = param$1[0];
	  var targetTypeArr = param[0];
	  var typeArrIndex = param[1];
	  for(var i = param$1[1] ,i_finish = endIndex - 1 | 0; i <= i_finish; ++i){
	    _setTypeArrWithTypeArr(targetTypeArr, sourceTypeArr, typeArrIndex, i);
	    typeArrIndex = typeArrIndex + 1 | 0;
	  }
	  return typeArrIndex;
	}

	function fillFloat32ArrayWithFloat32Array(targetData, sourceData, endIndex) {
	  return _fillTypeArrayWithTypeArr(targetData, sourceData, endIndex, _setFloat32ArrayWithFloat32Array);
	}


	/* Log-WonderLog Not a pure module */

	function getLocalToWorldMatrixTypeArray(index, typeArr) {
	  return getFloat16TypeArray(getLocalToWorldMatrixIndex(index), typeArr);
	}


	/* TypeArrayService-Wonderjs Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* ComponentMapService-Wonderjs Not a pure module */

	/* ArrayService-WonderCommonlib Not a pure module */

	/* BindDomEventMainService-Wonderjs Not a pure module */

	/* BindCustomEventMainService-Wonderjs Not a pure module */

	/* No side effect */

	/* No side effect */

	function fatalUnknownBrowser(title, browser) {
	  return fatal(buildFatalMessage(title, "unknown browser", "", "", "browser: " + (String(browser) + "")));
	}


	/* Log-WonderLog Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* No side effect */

	/* ArrayService-WonderCommonlib Not a pure module */

	/* No side effect */

	/* ArrayService-WonderCommonlib Not a pure module */

	/* most Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE


	var vs = "\nprecision mediump float;\n\nattribute vec2 a_position;\nattribute vec3 a_color;\nattribute vec2 a_texCoord;\n\nuniform mat4 u_projectionMat;\n\nvarying vec3 v_color;\nvarying vec2 v_texCoord;\n\nvoid main() {\n  gl_Position = u_projectionMat * vec4(a_position, 0, 1);\n  v_color = a_color;\n  v_texCoord = a_texCoord;\n}\n    ";

	var fs = "\nprecision mediump float;\n\nvarying vec3 v_color;\nvarying vec2 v_texCoord;\n\nuniform sampler2D u_sampler2D;\n\nvoid main() {\n  vec4 sample = texture2D(u_sampler2D, v_texCoord);\n\n  //gl_FragColor = vec4(v_color.xyz * sample.xyz, sample.x * vColor.a );\n  gl_FragColor = vec4(v_color * sample.xyz, sample.w);\n}\n    ";


	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function range$2(a, b) {
	  var result = createEmpty$1(/* () */0);
	  for(var i = a; i <= b; ++i){
	    result.push(i);
	  }
	  return result;
	}

	function push$1(item, arr) {
	  arr.push(item);
	  return arr;
	}


	/* ArrayService-WonderCommonlib Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function unsafeGet$3(optionData) {
	  requireCheck((function () {
	          return test(buildAssertMessage("data exist(get by getExn)", "not"), (function () {
	                        return assertExist(optionData);
	                      }));
	        }), true);
	  return getExn(optionData);
	}


	/* Log-WonderLog Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE


	function createIdentityMatrix4() {
	  return new Float32Array(/* array */[
	              1,
	              0,
	              0,
	              0,
	              0,
	              1,
	              0,
	              0,
	              0,
	              0,
	              1,
	              0,
	              0,
	              0,
	              0,
	              1
	            ]);
	}

	function ortho(left, right, bottom, top, near, far, resultFloat32Arr) {
	  var lr = 1 / (left - right);
	  var bt = 1 / (bottom - top);
	  var nf = 1 / (near - far);
	  resultFloat32Arr[0] = -2 * lr;
	  resultFloat32Arr[1] = 0;
	  resultFloat32Arr[2] = 0;
	  resultFloat32Arr[3] = 0;
	  resultFloat32Arr[4] = 0;
	  resultFloat32Arr[5] = -2 * bt;
	  resultFloat32Arr[6] = 0;
	  resultFloat32Arr[7] = 0;
	  resultFloat32Arr[8] = 0;
	  resultFloat32Arr[9] = 0;
	  resultFloat32Arr[10] = 2 * nf;
	  resultFloat32Arr[11] = 0;
	  resultFloat32Arr[12] = (left + right) * lr;
	  resultFloat32Arr[13] = (top + bottom) * bt;
	  resultFloat32Arr[14] = (far + near) * nf;
	  resultFloat32Arr[15] = 1;
	  return resultFloat32Arr;
	}


	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function _compileShader(gl, glslSource, shader) {
	  gl.shaderSource(shader, glslSource);
	  gl.compileShader(shader);
	  debugWithFunc((function () {
	          var match = gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false;
	          if (match) {
	            var message = gl.getShaderInfoLog(shader);
	            var partial_arg = "" + (String(message) + "");
	            debug((function (param) {
	                    return buildDebugMessage("shader info log", partial_arg, param);
	                  }), true);
	            var partial_arg$1 = "" + (String(glslSource) + "");
	            return debug((function (param) {
	                          return buildDebugMessage("glsl source", partial_arg$1, param);
	                        }), true);
	          } else {
	            return /* () */0;
	          }
	        }), true);
	  return shader;
	}

	function _linkProgram(program, gl) {
	  gl.linkProgram(program);
	  debugWithFunc((function () {
	          var match = gl.getProgramParameter(program, gl.LINK_STATUS) === false;
	          if (match) {
	            var message = gl.getProgramInfoLog(program);
	            return fatal(buildFatalMessage("link program error", "" + (String(message) + ""), "", "", ""));
	          } else {
	            return /* () */0;
	          }
	        }), true);
	  return /* () */0;
	}

	function initShader(vsSource, fsSource, gl, program) {
	  var vs = _compileShader(gl, vsSource, gl.createShader(gl.VERTEX_SHADER));
	  var fs = _compileShader(gl, fsSource, gl.createShader(gl.FRAGMENT_SHADER));
	  gl.attachShader(program, vs);
	  gl.attachShader(program, fs);
	  gl.bindAttribLocation(program, 0, "a_position");
	  _linkProgram(program, gl);
	  gl.deleteShader(vs);
	  gl.deleteShader(fs);
	  return program;
	}


	/* Log-WonderLog Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE



	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function clamp$1(num, below, up) {
	  var match = caml_lessthan(num, below);
	  if (match) {
	    return below;
	  } else {
	    var match$1 = caml_greaterthan(num, up);
	    if (match$1) {
	      return up;
	    } else {
	      return num;
	    }
	  }
	}


	/* convertStringToInt Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE


	/* most Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE


	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE


	/* most Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function unsafeGetWebglData(record) {
	  return unsafeGet$3(record[/* webglData */3]);
	}

	function getSetting$1(record) {
	  return record[/* setting */0];
	}

	function setSetting$1(setting, record) {
	  return /* record */[
	          /* setting */setting,
	          /* assetData */record[/* assetData */1],
	          /* fontData */record[/* fontData */2],
	          /* webglData */record[/* webglData */3],
	          /* drawData */record[/* drawData */4],
	          /* imguiFuncData */record[/* imguiFuncData */5],
	          /* controlData */record[/* controlData */6],
	          /* ioData */record[/* ioData */7],
	          /* layoutData */record[/* layoutData */8]
	        ];
	}

	function getIOData$1(record) {
	  return record[/* ioData */7];
	}

	function getRadioButtonData(record) {
	  return record[/* controlData */6][/* radioButtonData */0];
	}

	function getFontTextureDrawData(record) {
	  return record[/* drawData */4][/* fontTextureDrawData */0];
	}

	function getCustomTextureDrawDataMap(record) {
	  return record[/* drawData */4][/* customTextureDrawDataMap */1];
	}


	/* OptionService-WonderImgui Not a pure module */

	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE



	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function buildKerningHashMapKey(first, second) {
	  return imul(first, 1000) + second | 0;
	}


	/* Log-WonderLog Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE


	/* most Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function getFntData(record) {
	  var assetData = record[/* assetData */1];
	  return get(assetData[/* fntId */0], assetData[/* fntDataMap */2]);
	}

	function setFntData(fntData, record) {
	  var assetData = record[/* assetData */1];
	  set(assetData[/* fntId */0], fntData, assetData[/* fntDataMap */2]);
	  return record;
	}

	function getBitmap(record) {
	  var assetData = record[/* assetData */1];
	  return get(assetData[/* bitmapId */1], assetData[/* bitmapMap */3]);
	}

	function unsafeGetBitmap(record) {
	  return unsafeGet$3(getBitmap(record));
	}

	function setBitmap(bitmap, record) {
	  var assetData = record[/* assetData */1];
	  set(assetData[/* bitmapId */1], bitmap, assetData[/* bitmapMap */3]);
	  return record;
	}

	function isLoadAsset(record) {
	  return isSome(getBitmap(record));
	}

	function createCustomTextures(gl, customImageArr, customTextureMap) {
	  var rgb = gl.RGB;
	  var rgba = gl.RGBA;
	  var target = gl.TEXTURE_2D;
	  return reduceOneParam((function (customTextureMap, data) {
	                var format;
	                switch (data[2]) {
	                  case 0 : 
	                      format = rgb;
	                      break;
	                  case 1 : 
	                      format = rgba;
	                      break;
	                  case 2 : 
	                      format = fatal(buildFatalMessage("createCustomTextures", "unknown image type. type should be jpg or png.", "", "", ""));
	                      break;
	                  
	                }
	                var texture = gl.createTexture();
	                gl.bindTexture(target, texture);
	                gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	                gl.texImage2D(target, 0, format, format, gl.UNSIGNED_BYTE, data[0]);
	                return set(data[1], texture, customTextureMap);
	              }), customTextureMap, customImageArr);
	}

	function unsafeGetCustomTexture(id, param) {
	  return unsafeGet(id, param[/* assetData */1][/* customTextureMap */5]);
	}

	function setCustomImageArr(customImageArr, record) {
	  var init = record[/* assetData */1];
	  return /* record */[
	          /* setting */record[/* setting */0],
	          /* assetData : record */[
	            /* fntId */init[/* fntId */0],
	            /* bitmapId */init[/* bitmapId */1],
	            /* fntDataMap */init[/* fntDataMap */2],
	            /* bitmapMap */init[/* bitmapMap */3],
	            /* customImageArr */customImageArr,
	            /* customTextureMap */init[/* customTextureMap */5]
	          ],
	          /* fontData */record[/* fontData */2],
	          /* webglData */record[/* webglData */3],
	          /* drawData */record[/* drawData */4],
	          /* imguiFuncData */record[/* imguiFuncData */5],
	          /* controlData */record[/* controlData */6],
	          /* ioData */record[/* ioData */7],
	          /* layoutData */record[/* layoutData */8]
	        ];
	}


	/* most Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function addPoints(points, pointArr) {
	  return reduceOneParam((function (arr, point) {
	                return push$1(point, arr);
	              }), pointArr, points);
	}

	var concatArrays = function (arrays){
	  return [].concat.apply([], arrays);  
	  };

	function getBaseIndex(verticeArr) {
	  return verticeArr.length / 2 | 0;
	}


	/* ArrayService-WonderImgui Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function _bufferArrayBufferData(param, gl) {
	  var $$location = param[2];
	  gl.bindBuffer(gl.ARRAY_BUFFER, param[0]);
	  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(param[1]), gl.DYNAMIC_DRAW);
	  gl.enableVertexAttribArray($$location);
	  gl.vertexAttribPointer($$location, param[3], gl.FLOAT, false, 0, 0);
	  gl.bindBuffer(gl.ARRAY_BUFFER, null);
	  return gl;
	}

	function _bufferElementArrayBufferData(buffer, pointArr, gl) {
	  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
	  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(pointArr), gl.DYNAMIC_DRAW);
	  return gl;
	}

	function bufferAllData(gl, groupedDrawDataArr, record) {
	  var match = unsafeGetWebglData(record);
	  var match$1 = reduceOneParam((function (param, param$1) {
	          var indexArr = param$1[/* indexArr */5];
	          var totalIndexArr = param[5];
	          var totalTexCoordArr = param[4];
	          var totalColorArr = param[3];
	          var totalVerticeArr = param[2];
	          var countOffset = param[1];
	          var drawElementsDataArr = param[0];
	          var count = indexArr.length;
	          if (count !== 0) {
	            var newCountOffset = countOffset + (count << 1) | 0;
	            return /* tuple */[
	                    push$1(/* record */[
	                          /* drawType */param$1[/* drawType */0],
	                          /* customTexture */param$1[/* customTexture */1],
	                          /* count */count,
	                          /* countOffset */countOffset
	                        ], drawElementsDataArr),
	                    newCountOffset,
	                    totalVerticeArr.concat(param$1[/* verticeArr */2]),
	                    totalColorArr.concat(param$1[/* colorArr */3]),
	                    totalTexCoordArr.concat(param$1[/* texCoordArr */4]),
	                    totalIndexArr.concat(indexArr)
	                  ];
	          } else {
	            return /* tuple */[
	                    drawElementsDataArr,
	                    0,
	                    totalVerticeArr,
	                    totalColorArr,
	                    totalTexCoordArr,
	                    totalIndexArr
	                  ];
	          }
	        }), /* tuple */[
	        /* array */[],
	        0,
	        /* array */[],
	        /* array */[],
	        /* array */[],
	        /* array */[]
	      ], groupedDrawDataArr);
	  _bufferElementArrayBufferData(match[/* indexBuffer */4], match$1[5], _bufferArrayBufferData(/* tuple */[
	            match[/* texCoordBuffer */3],
	            match$1[4],
	            match[/* aTexCoordLocation */8],
	            2
	          ], _bufferArrayBufferData(/* tuple */[
	                match[/* colorBuffer */2],
	                match$1[3],
	                match[/* aColorLocation */7],
	                3
	              ], _bufferArrayBufferData(/* tuple */[
	                    match[/* positionBuffer */1],
	                    match$1[2],
	                    match[/* aPositonLocation */6],
	                    2
	                  ], gl))));
	  return /* tuple */[
	          record,
	          match$1[0]
	        ];
	}

	function coloredVertex(positionX, positionY, color, param, fontTexUvForWhite) {
	  return /* tuple */[
	          push$1(positionY, push$1(positionX, param[0])),
	          addPoints(color, param[1]),
	          addPoints(fontTexUvForWhite, param[2])
	        ];
	}


	/* ArrayService-WonderImgui Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function beginGroup(position, record) {
	  var groupData = record[/* layoutData */8][/* groupData */0];
	  groupData[/* positionArr */0][groupData[/* index */1]] = position;
	  return /* record */[
	          /* setting */record[/* setting */0],
	          /* assetData */record[/* assetData */1],
	          /* fontData */record[/* fontData */2],
	          /* webglData */record[/* webglData */3],
	          /* drawData */record[/* drawData */4],
	          /* imguiFuncData */record[/* imguiFuncData */5],
	          /* controlData */record[/* controlData */6],
	          /* ioData */record[/* ioData */7],
	          /* layoutData : record */[/* groupData : record */[
	              /* positionArr */groupData[/* positionArr */0],
	              /* index */groupData[/* index */1] + 1 | 0
	            ]]
	        ];
	}

	function endGroup(record) {
	  var groupData = record[/* layoutData */8][/* groupData */0];
	  return /* record */[
	          /* setting */record[/* setting */0],
	          /* assetData */record[/* assetData */1],
	          /* fontData */record[/* fontData */2],
	          /* webglData */record[/* webglData */3],
	          /* drawData */record[/* drawData */4],
	          /* imguiFuncData */record[/* imguiFuncData */5],
	          /* controlData */record[/* controlData */6],
	          /* ioData */record[/* ioData */7],
	          /* layoutData : record */[/* groupData : record */[
	              /* positionArr */groupData[/* positionArr */0],
	              /* index */groupData[/* index */1] - 1 | 0
	            ]]
	        ];
	}

	function _getGroupPosition(record) {
	  var groupData = record[/* layoutData */8][/* groupData */0];
	  var match = groupData[/* index */1] <= 0;
	  if (match) {
	    return undefined;
	  } else {
	    var match$1 = reduceOneParam((function (param, index) {
	            var match = param[1];
	            var positionArr = param[0];
	            var match$1 = positionArr[index];
	            return /* tuple */[
	                    positionArr,
	                    /* tuple */[
	                      match[0] + match$1[0] | 0,
	                      match[1] + match$1[1] | 0
	                    ]
	                  ];
	          }), /* tuple */[
	          groupData[/* positionArr */0],
	          /* tuple */[
	            0,
	            0
	          ]
	        ], range$2(0, groupData[/* index */1] - 1 | 0));
	    return match$1[1];
	  }
	}

	function computeRectBasedOnTopLeftOfView(rect, record) {
	  var match = _getGroupPosition(record);
	  if (match !== undefined) {
	    var match$1 = match;
	    return /* tuple */[
	            rect[0] + match$1[0] | 0,
	            rect[1] + match$1[1] | 0,
	            rect[2],
	            rect[3]
	          ];
	  } else {
	    return rect;
	  }
	}


	/* ArrayService-WonderImgui Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE


	function convertIntRectToFloatRect(param) {
	  return /* tuple */[
	          param[0],
	          param[1],
	          param[2],
	          param[3]
	        ];
	}

	function convertIntPositionToFloatPosition(param) {
	  return /* tuple */[
	          param[0],
	          param[1]
	        ];
	}


	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function draw(param, color, record) {
	  var height = param[3];
	  var width = param[2];
	  var y = param[1];
	  var x = param[0];
	  var match = getSetting$1(record);
	  var fontTexUvForWhite = match[/* fontTexUvForWhite */1];
	  var match$1 = getFontTextureDrawData(record);
	  var verticeArr = match$1[/* verticeArr */2];
	  var baseIndex = getBaseIndex(verticeArr);
	  var init = record[/* drawData */4];
	  var init$1 = record[/* drawData */4][/* fontTextureDrawData */0];
	  return /* record */[
	          /* setting */record[/* setting */0],
	          /* assetData */record[/* assetData */1],
	          /* fontData */record[/* fontData */2],
	          /* webglData */record[/* webglData */3],
	          /* drawData : record */[
	            /* fontTextureDrawData : record */[
	              /* drawType */init$1[/* drawType */0],
	              /* customTexture */init$1[/* customTexture */1],
	              /* verticeArr */addPoints(/* array */[
	                    x,
	                    y,
	                    x,
	                    y + height,
	                    x + width,
	                    y,
	                    x + width,
	                    y + height
	                  ], verticeArr),
	              /* colorArr */addPoints(concatArrays(/* array */[
	                        color,
	                        color,
	                        color,
	                        color
	                      ]), match$1[/* colorArr */3]),
	              /* texCoordArr */addPoints(concatArrays(/* array */[
	                        fontTexUvForWhite,
	                        fontTexUvForWhite,
	                        fontTexUvForWhite,
	                        fontTexUvForWhite
	                      ]), match$1[/* texCoordArr */4]),
	              /* indexArr */addPoints(/* array */[
	                    baseIndex,
	                    baseIndex + 1 | 0,
	                    baseIndex + 2 | 0,
	                    baseIndex + 3 | 0,
	                    baseIndex + 2 | 0,
	                    baseIndex + 1 | 0
	                  ], match$1[/* indexArr */5])
	            ],
	            /* customTextureDrawDataMap */init[/* customTextureDrawDataMap */1]
	          ],
	          /* imguiFuncData */record[/* imguiFuncData */5],
	          /* controlData */record[/* controlData */6],
	          /* ioData */record[/* ioData */7],
	          /* layoutData */record[/* layoutData */8]
	        ];
	}


	/* RecordIMGUIService-WonderImgui Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function getKerning(fntData, left, right) {
	  var match = get$3(buildKerningHashMapKey(left, right), fntData[/* kerningMap */5]);
	  if (match !== undefined) {
	    return match;
	  } else {
	    return 0;
	  }
	}


	/* ParseFntIMGUIService-WonderImgui Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE


	function length$3(prim) {
	  return prim.length;
	}

	function getValidValues$1(map) {
	  return map.filter((function (value) {
	                return value !== undefined;
	              }));
	}


	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function _getGlyphById(fntData, id) {
	  var dict = fntData[/* fontDefDictionary */4];
	  return get$3(id, dict);
	}

	function getGlyph(param, fntData, id) {
	  _getGlyphById(fntData, id);
	  var match = _getGlyphById(fntData, id);
	  if (match !== undefined) {
	    return match;
	  } else {
	    var match$1 = id === "\t".charCodeAt(0);
	    if (match$1) {
	      return param[1];
	    } else {
	      var match$2 = id === " ".charCodeAt(0);
	      if (match$2) {
	        return param[0];
	      } else {
	        return undefined;
	      }
	    }
	  }
	}

	function _getMGlyph(fntData) {
	  var m_widthArr = /* array */[
	    "m",
	    "w"
	  ];
	  return reduceOneParam((function (glyph, m_width) {
	                if (glyph !== undefined) {
	                  return glyph;
	                } else {
	                  return _getGlyphById(fntData, m_width.charCodeAt(0));
	                }
	              }), undefined, m_widthArr);
	}

	function _getFirstGlyph(fntData) {
	  return getValidValues$1(fntData[/* fontDefDictionary */4])[0];
	}

	function setupSpaceGlyphs(fntData, tabSize) {
	  var match = _getGlyphById(fntData, " ".charCodeAt(0));
	  var space;
	  if (match !== undefined) {
	    space = match;
	  } else {
	    var match$1 = _getMGlyph(fntData);
	    space = match$1 !== undefined ? match$1 : _getFirstGlyph(fntData);
	  }
	  return /* tuple */[
	          space,
	          /* record */[
	            /* id */"\t".charCodeAt(0),
	            /* rect : tuple */[
	              0,
	              0,
	              0,
	              0
	            ],
	            /* xOffset */0,
	            /* yOffset */0,
	            /* xAdvance */imul(tabSize, space[/* xAdvance */4])
	          ]
	        ];
	}


	/* ArrayService-WonderCommonlib Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function hasFontDefDictionaryData(param) {
	  return length$3(param[/* fontDefDictionary */4]) > 0;
	}


	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function _computeMetrics(fntData, text, letterSpacing, start, end_, width, hasFontDefDictionaryDataFunc, getGlyphFunc, getKerningFunc) {
	  var match = !_1(hasFontDefDictionaryDataFunc, fntData);
	  if (match) {
	    return /* tuple */[
	            start,
	            start,
	            0
	          ];
	  } else {
	    var curPen = 0;
	    var curWidth = 0;
	    var count = 0;
	    var lastGlyph = undefined;
	    var $$break = false;
	    for(var i = start ,i_finish = Math.min(text.length, end_) - 1 | 0; i <= i_finish; ++i){
	      var match$1 = $$break;
	      if (!match$1) {
	        var id = text.charCodeAt(i);
	        var glyph = _2(getGlyphFunc, fntData, id);
	        if (glyph !== undefined) {
	          var glyph$1 = glyph;
	          var match$2 = glyph$1[/* rect */1];
	          var match$3 = lastGlyph;
	          var kern = match$3 !== undefined ? _3(getKerningFunc, fntData, match$3[/* id */0], glyph$1[/* id */0]) : 0;
	          curPen = curPen + kern | 0;
	          var nextPen = (curPen + glyph$1[/* xAdvance */4] | 0) + letterSpacing | 0;
	          var nextWidth = curPen + match$2[2] | 0;
	          var match$4 = nextWidth > width || nextPen > width;
	          if (match$4) {
	            var match$5 = count === 0;
	            if (match$5) {
	              count = 1;
	              curWidth = nextWidth;
	            }
	            $$break = true;
	          }
	          curPen = nextPen;
	          curWidth = nextWidth;
	          lastGlyph = glyph$1;
	        }
	        count = count + 1 | 0;
	      }
	      
	    }
	    var match$6 = lastGlyph;
	    if (match$6 !== undefined) {
	      curWidth = curWidth + match$6[/* xOffset */2] | 0;
	    }
	    return /* tuple */[
	            start,
	            start + count | 0,
	            curWidth
	          ];
	  }
	}

	function _findNewLineIndex(text, $$char, start, end_) {
	  var idx = text.indexOf($$char, start);
	  var match = idx === -1 || idx > end_;
	  if (match) {
	    return end_;
	  } else {
	    return idx;
	  }
	}

	function _isWhitespace($$char) {
	  return (/\s/).test($$char);
	}

	var _greedy = function (fntData,text,letterSpacing,start,end_,width,hasFontDefDictionaryDataFunc,getGlyphFunc,getKerningFunc){
	             /* A greedy word wrapper based on LibGDX algorithm
	            https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/BitmapFontCache.java */
	    const NEWLINE_CHAR = '\n';

	            var lines = [],
	                textWidth = width;

	            while (start < end_ && start < text.length) {
	                /* get next newline position */
	                let newLine = _findNewLineIndex(text, NEWLINE_CHAR, start, end_);

	                /* eat whitespace at start of line */
	                while (start < newLine) {
	                    if (!_isWhitespace( text.charAt(start) )){
	                        break;
	                    }

	                    start++;
	                }

	                /* determine visible # of glyphs for the available width */
	                let measured = _computeMetrics(fntData, text, letterSpacing, start, newLine, textWidth, hasFontDefDictionaryDataFunc, getGlyphFunc, getKerningFunc),
	                    lineEnd = start + (measured[1]-measured[0]),
	                    nextStart = lineEnd + NEWLINE_CHAR.length;


	                /* if we had to cut the line before the next newline... */
	                if (lineEnd < newLine) {
	                    /* find char to break on */
	                    while (lineEnd > start) {
	                        if (_isWhitespace(text.charAt(lineEnd))){
	                            break;
	                        }

	                        lineEnd--;
	                    }

	                    if (lineEnd === start) {
	                        if (nextStart > start + NEWLINE_CHAR.length){
	                            nextStart--;
	                        }

	 /* If no characters to break, show all. */
	                        lineEnd = nextStart ;
	                    }
	                    else {
	                        nextStart = lineEnd;

	                        /* eat whitespace at end_ of line */
	                        while (lineEnd > start) {
	                            if (!_isWhitespace(text.charAt(lineEnd - NEWLINE_CHAR.length))){
	                                break;
	                            }

	                            lineEnd--;
	                        }
	                    }
	                }

	                if (lineEnd >= start) {
	                    lines.push(_computeMetrics(fntData, text, letterSpacing, start, lineEnd, textWidth, hasFontDefDictionaryDataFunc, getGlyphFunc, getKerningFunc));
	                }

	                start = nextStart;
	            }
	            return lines


	            };

	function getLines(fntData, text, param, fallbackGlyphTuple) {
	  return _greedy(fntData, text, param[0], param[2], param[3], param[1], hasFontDefDictionaryData, (function (param, param$1) {
	                return getGlyph(fallbackGlyphTuple, param, param$1);
	              }), getKerning);
	}


	/* BitmapFontParserIMGUIService-WonderImgui Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function _computeYForCenterYAlignment(totalHeight, lineHeight, lines) {
	  var linesHeight = imul(lines.length, lineHeight);
	  return (totalHeight - linesHeight | 0) / 2 | 0;
	}

	function getLayoutData(text, param, fntData, _) {
	  var align = param[4];
	  var letterSpacing = param[3];
	  var width = param[0];
	  var fallbackGlyphTuple = setupSpaceGlyphs(fntData, param[2]);
	  var lines = getLines(fntData, text, /* tuple */[
	        letterSpacing,
	        width,
	        0,
	        text.length
	      ], fallbackGlyphTuple);
	  var lineHeight = fntData[/* commonHeight */0];
	  var maxLineWidth = reduceOneParam((function (width$1, param) {
	          return Math.max(width$1, param[2], width);
	        }), 0, lines);
	  return reduceOneParami((function (param, param$1, lineIndex) {
	                  var lineWidth = param$1[2];
	                  var layoutDataArr = param[0];
	                  var lastGlyph = undefined;
	                  var x = param[1];
	                  var y = param[2];
	                  for(var i = param$1[0] ,i_finish = param$1[1] - 1 | 0; i <= i_finish; ++i){
	                    var id = text.charCodeAt(i);
	                    var match = getGlyph(fallbackGlyphTuple, fntData, id);
	                    if (match !== undefined) {
	                      var glyph = match;
	                      var match$1 = lastGlyph;
	                      var tx;
	                      if (match$1 !== undefined) {
	                        x = x + getKerning(fntData, match$1[/* id */0], glyph[/* id */0]) | 0;
	                        tx = x;
	                      } else {
	                        tx = x;
	                      }
	                      var tx$1;
	                      switch (align) {
	                        case 0 : 
	                            tx$1 = tx;
	                            break;
	                        case 1 : 
	                            tx$1 = tx + ((maxLineWidth - lineWidth | 0) / 2 | 0) | 0;
	                            break;
	                        case 2 : 
	                            tx$1 = tx + (maxLineWidth - lineWidth | 0) | 0;
	                            break;
	                        
	                      }
	                      push$1(/* record */[
	                            /* position : tuple */[
	                              tx$1 + glyph[/* xOffset */2] | 0,
	                              y + glyph[/* yOffset */3] | 0
	                            ],
	                            /* data */glyph,
	                            /* index */i,
	                            /* line */lineIndex
	                          ], layoutDataArr);
	                      x = (x + glyph[/* xAdvance */4] | 0) + letterSpacing | 0;
	                      lastGlyph = glyph;
	                    }
	                    
	                  }
	                  return /* tuple */[
	                          layoutDataArr,
	                          0,
	                          y + lineHeight | 0,
	                          lastGlyph
	                        ];
	                }), /* tuple */[
	                /* array */[],
	                0,
	                _computeYForCenterYAlignment(param[1], lineHeight, lines),
	                undefined
	              ], lines)[0];
	}


	/* ArrayService-WonderImgui Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function _generateVertices(posX, posY, param, verticeArr) {
	  var position = param[/* position */0];
	  var match = param[/* data */1][/* rect */1];
	  var charHeightInImage = match[3];
	  var charWidthInImage = match[2];
	  var leftUpX = position[0] + posX;
	  var leftUpY = position[1] + posY;
	  return addPoints(/* array */[
	              leftUpX,
	              leftUpY,
	              leftUpX,
	              leftUpY + charHeightInImage,
	              leftUpX + charWidthInImage,
	              leftUpY,
	              leftUpX + charWidthInImage,
	              leftUpY + charHeightInImage
	            ], verticeArr);
	}

	function _generateTexCoords(param, textureWidth, textureHeight, texCoordArr) {
	  var match = param[/* data */1][/* rect */1];
	  var charYInImage = match[1];
	  var charXInImage = match[0];
	  var s0 = charXInImage / textureWidth;
	  var t0 = charYInImage / textureHeight;
	  var s1 = (charXInImage + match[2] | 0) / textureWidth;
	  var t1 = (charYInImage + match[3] | 0) / textureHeight;
	  return addPoints(/* array */[
	              s0,
	              t0,
	              s0,
	              t1,
	              s1,
	              t0,
	              s1,
	              t1
	            ], texCoordArr);
	}

	function _generateIndices(baseIndex, indexArr) {
	  return addPoints(/* array */[
	              baseIndex,
	              baseIndex + 1 | 0,
	              baseIndex + 2 | 0,
	              baseIndex + 3 | 0,
	              baseIndex + 2 | 0,
	              baseIndex + 1 | 0
	            ], indexArr);
	}

	function draw$1(param, str, align, record) {
	  var y = param[1];
	  var x = param[0];
	  var match = getSetting$1(record);
	  var textColor = match[/* textColor */0];
	  var textColorArrPerPoint = concatArrays(/* array */[
	        textColor,
	        textColor,
	        textColor,
	        textColor
	      ]);
	  var match$1 = getFntData(record);
	  if (match$1 !== undefined) {
	    var fntData = match$1;
	    var layoutDataArr = getLayoutData(str, /* tuple */[
	          param[2],
	          param[3],
	          4,
	          0,
	          align
	        ], fntData, record);
	    var match$2 = getFontTextureDrawData(record);
	    var match$3 = reduceOneParam((function (param, layoutData) {
	            var verticeArr = param[0];
	            var baseIndex = getBaseIndex(verticeArr);
	            return /* tuple */[
	                    _generateVertices(x, y, layoutData, verticeArr),
	                    addPoints(textColorArrPerPoint, param[1]),
	                    _generateTexCoords(layoutData, fntData[/* scaleW */2], fntData[/* scaleH */3], param[2]),
	                    _generateIndices(baseIndex, param[3])
	                  ];
	          }), /* tuple */[
	          match$2[/* verticeArr */2],
	          match$2[/* colorArr */3],
	          match$2[/* texCoordArr */4],
	          match$2[/* indexArr */5]
	        ], layoutDataArr);
	    var init = record[/* drawData */4];
	    var init$1 = record[/* drawData */4][/* fontTextureDrawData */0];
	    return /* record */[
	            /* setting */record[/* setting */0],
	            /* assetData */record[/* assetData */1],
	            /* fontData */record[/* fontData */2],
	            /* webglData */record[/* webglData */3],
	            /* drawData : record */[
	              /* fontTextureDrawData : record */[
	                /* drawType */init$1[/* drawType */0],
	                /* customTexture */init$1[/* customTexture */1],
	                /* verticeArr */match$3[0],
	                /* colorArr */match$3[1],
	                /* texCoordArr */match$3[2],
	                /* indexArr */match$3[3]
	              ],
	              /* customTextureDrawDataMap */init[/* customTextureDrawDataMap */1]
	            ],
	            /* imguiFuncData */record[/* imguiFuncData */5],
	            /* controlData */record[/* controlData */6],
	            /* ioData */record[/* ioData */7],
	            /* layoutData */record[/* layoutData */8]
	          ];
	  } else {
	    return fatal(buildFatalMessage("getLayoutData", "impossible to create font: not find fnt file", "", "", ""));
	  }
	}


	/* Log-WonderLog Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function _getOrCreateCustomTextureDrawData(id, record) {
	  var match = get(id, getCustomTextureDrawDataMap(record));
	  if (match !== undefined) {
	    return match;
	  } else {
	    return /* record */[
	            /* drawType : CustomTexture */1,
	            /* customTexture */some$1(unsafeGetCustomTexture(id, record)),
	            /* verticeArr : array */[],
	            /* colorArr : array */[],
	            /* texCoordArr : array */[],
	            /* indexArr : array */[]
	          ];
	  }
	}

	function draw$2(param, param$1, id, record) {
	  var t1 = param$1[3];
	  var s1 = param$1[2];
	  var t0 = param$1[1];
	  var s0 = param$1[0];
	  var height = param[3];
	  var width = param[2];
	  var y = param[1];
	  var x = param[0];
	  var drawData = _getOrCreateCustomTextureDrawData(id, record);
	  var verticeArr = drawData[/* verticeArr */2];
	  var baseIndex = getBaseIndex(verticeArr);
	  var drawData_000 = /* drawType */drawData[/* drawType */0];
	  var drawData_001 = /* customTexture */drawData[/* customTexture */1];
	  var drawData_002 = /* verticeArr */addPoints(/* array */[
	        x,
	        y,
	        x,
	        y + height,
	        x + width,
	        y,
	        x + width,
	        y + height
	      ], verticeArr);
	  var drawData_003 = /* colorArr */addPoints(/* array */[
	        1,
	        1,
	        1,
	        1,
	        1,
	        1,
	        1,
	        1,
	        1,
	        1,
	        1,
	        1
	      ], drawData[/* colorArr */3]);
	  var drawData_004 = /* texCoordArr */addPoints(/* array */[
	        s0,
	        t0,
	        s0,
	        t1,
	        s1,
	        t0,
	        s1,
	        t1
	      ], drawData[/* texCoordArr */4]);
	  var drawData_005 = /* indexArr */addPoints(/* array */[
	        baseIndex,
	        baseIndex + 1 | 0,
	        baseIndex + 2 | 0,
	        baseIndex + 3 | 0,
	        baseIndex + 2 | 0,
	        baseIndex + 1 | 0
	      ], drawData[/* indexArr */5]);
	  var drawData$1 = /* record */[
	    drawData_000,
	    drawData_001,
	    drawData_002,
	    drawData_003,
	    drawData_004,
	    drawData_005
	  ];
	  var init = record[/* drawData */4];
	  return /* record */[
	          /* setting */record[/* setting */0],
	          /* assetData */record[/* assetData */1],
	          /* fontData */record[/* fontData */2],
	          /* webglData */record[/* webglData */3],
	          /* drawData : record */[
	            /* fontTextureDrawData */init[/* fontTextureDrawData */0],
	            /* customTextureDrawDataMap */set(id, drawData$1, record[/* drawData */4][/* customTextureDrawDataMap */1])
	          ],
	          /* imguiFuncData */record[/* imguiFuncData */5],
	          /* controlData */record[/* controlData */6],
	          /* ioData */record[/* ioData */7],
	          /* layoutData */record[/* layoutData */8]
	        ];
	}


	/* AssetIMGUIService-WonderImgui Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE


	function isInBox(param, param$1) {
	  var x = param[0];
	  var y = param[1];
	  var posY = param$1[1];
	  var posX = param$1[0];
	  var maxX = x + param[2];
	  var maxY = y + param[3];
	  if (x <= posX && posX <= maxX && y <= posY) {
	    return posY <= maxY;
	  } else {
	    return false;
	  }
	}

	function isInCircle(param, param$1) {
	  var width = param[2];
	  var centerX = param[0] + 0.5 * width;
	  var centerY = param[1] + 0.5 * param[3];
	  var radius = width / 2;
	  var dist = Math.sqrt(Math.pow(param$1[0] - centerX, 2) + Math.pow(param$1[1] - centerY, 2));
	  return dist <= radius;
	}


	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function isClick(record) {
	  var match = getIOData$1(record);
	  if (match[/* pointDown */1]) {
	    return match[/* pointUp */0];
	  } else {
	    return false;
	  }
	}


	/* RecordIMGUIService-WonderImgui Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function button$1(rect, str, record) {
	  var match = getSetting$1(record)[/* buttonSetting */2];
	  var clickButtonColor = match[/* clickButtonColor */2];
	  var match$1 = getIOData$1(record);
	  var match$2 = isInBox(rect, convertIntPositionToFloatPosition(match$1[/* pointPosition */2]));
	  var match$3;
	  if (match$2) {
	    var match$4 = isClick(record);
	    match$3 = match$4 ? /* tuple */[
	        true,
	        clickButtonColor
	      ] : (
	        match$1[/* pointDown */1] ? /* tuple */[
	            false,
	            clickButtonColor
	          ] : /* tuple */[
	            false,
	            match[/* hoverButtonColor */1]
	          ]
	      );
	  } else {
	    match$3 = /* tuple */[
	      false,
	      match[/* buttonColor */0]
	    ];
	  }
	  return /* tuple */[
	          draw$1(rect, str, /* Center */1, draw(rect, match$3[1], record)),
	          match$3[0]
	        ];
	}


	/* IOIMGUIService-WonderImgui Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function _addIndex(record) {
	  var init = record[/* controlData */6];
	  var init$1 = record[/* controlData */6][/* sliderData */2];
	  return /* record */[
	          /* setting */record[/* setting */0],
	          /* assetData */record[/* assetData */1],
	          /* fontData */record[/* fontData */2],
	          /* webglData */record[/* webglData */3],
	          /* drawData */record[/* drawData */4],
	          /* imguiFuncData */record[/* imguiFuncData */5],
	          /* controlData : record */[
	            /* radioButtonData */init[/* radioButtonData */0],
	            /* checkboxData */init[/* checkboxData */1],
	            /* sliderData : record */[
	              /* index */record[/* controlData */6][/* sliderData */2][/* index */0] + 1 | 0,
	              /* valueMap */init$1[/* valueMap */1]
	            ]
	          ],
	          /* ioData */record[/* ioData */7],
	          /* layoutData */record[/* layoutData */8]
	        ];
	}

	function _getValue(index, defaultValue, record) {
	  var match = get$3(index, record[/* controlData */6][/* sliderData */2][/* valueMap */1]);
	  if (match !== undefined) {
	    return match;
	  } else {
	    return defaultValue;
	  }
	}

	function _setValue(index, value, record) {
	  set$1(index, value, record[/* controlData */6][/* sliderData */2][/* valueMap */1]);
	  return record;
	}

	function _computeValue(param, param$1, param$2, record) {
	  var min = param$2[0];
	  var x = param$1[0];
	  if (param[0]) {
	    var xMax = x + param$1[2];
	    var mouseX = clamp$1(param[1][0], x, xMax);
	    var value = (param$2[1] - min) * ((mouseX - x) / (xMax - x)) + min;
	    if (param$2[2]) {
	      return Math.round(value);
	    } else {
	      return value;
	    }
	  } else {
	    return _getValue(param[2], param[3], record);
	  }
	}

	function _slider(param, param$1, param$2, record) {
	  var numDecimalDigits = param$1[3];
	  var doRounding = param$1[2];
	  var max = param$1[1];
	  var min = param$1[0];
	  var rect = param[0];
	  var height = rect[3];
	  var width = rect[2];
	  var y = rect[1];
	  var x = rect[0];
	  var match = getSetting$1(record)[/* sliderSetting */5];
	  var sliderFillColorHover = match[/* sliderFillColorHover */3];
	  var sliderBackgroundColorHover = match[/* sliderBackgroundColorHover */2];
	  var match$1 = getIOData$1(record);
	  var pointPosition = match$1[/* pointPosition */2];
	  var match$2 = isInBox(rect, convertIntPositionToFloatPosition(pointPosition));
	  var match$3 = match$2 ? (
	      match$1[/* pointDown */1] ? /* tuple */[
	          true,
	          sliderBackgroundColorHover,
	          sliderFillColorHover
	        ] : /* tuple */[
	          false,
	          sliderBackgroundColorHover,
	          sliderFillColorHover
	        ]
	    ) : /* tuple */[
	      false,
	      match[/* sliderBackgroundColor */0],
	      match[/* sliderFillColor */1]
	    ];
	  var isSelected = match$3[0];
	  var index = record[/* controlData */6][/* sliderData */2][/* index */0];
	  var value = _computeValue(/* tuple */[
	        isSelected,
	        pointPosition,
	        index,
	        param$2[0]
	      ], rect, /* tuple */[
	        min,
	        max,
	        doRounding,
	        numDecimalDigits
	      ], record);
	  var sliderFill = (value - min) / (max - min);
	  var sliderValueStr = value.toFixed(doRounding ? 0 : numDecimalDigits);
	  var record$1 = draw(rect, match$3[1], record);
	  var record$2 = draw(/* tuple */[
	        x,
	        y,
	        width * sliderFill,
	        height
	      ], match$3[2], record$1);
	  var record$3 = draw$1(rect, sliderValueStr, /* Center */1, record$2);
	  var record$4 = draw$1(/* tuple */[
	        x + width,
	        y,
	        param[1],
	        height
	      ], param$2[1], /* Left */0, record$3);
	  var record$5 = _addIndex(_setValue(index, value, record$4));
	  return /* tuple */[
	          record$5,
	          isSelected,
	          value
	        ];
	}

	function sliderInt$1(param, param$1, param$2, record) {
	  var match = _slider(/* tuple */[
	        param[0],
	        param[1]
	      ], /* tuple */[
	        param$1[0],
	        param$1[1],
	        true,
	        0
	      ], /* tuple */[
	        param$2[0],
	        param$2[1]
	      ], record);
	  return /* tuple */[
	          match[0],
	          match[1],
	          match[2]
	        ];
	}

	function sliderFloat$1(param, param$1, param$2, record) {
	  return _slider(/* tuple */[
	              param[0],
	              param[1]
	            ], /* tuple */[
	              param$1[0],
	              param$1[1],
	              false,
	              param$1[2]
	            ], /* tuple */[
	              param$2[0],
	              param$2[1]
	            ], record);
	}


	/* NumberService-WonderImgui Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function _addIndex$1(record) {
	  var init = record[/* controlData */6];
	  var init$1 = record[/* controlData */6][/* checkboxData */1];
	  return /* record */[
	          /* setting */record[/* setting */0],
	          /* assetData */record[/* assetData */1],
	          /* fontData */record[/* fontData */2],
	          /* webglData */record[/* webglData */3],
	          /* drawData */record[/* drawData */4],
	          /* imguiFuncData */record[/* imguiFuncData */5],
	          /* controlData : record */[
	            /* radioButtonData */init[/* radioButtonData */0],
	            /* checkboxData : record */[
	              /* index */record[/* controlData */6][/* checkboxData */1][/* index */0] + 1 | 0,
	              /* isSelectedMap */init$1[/* isSelectedMap */1]
	            ],
	            /* sliderData */init[/* sliderData */2]
	          ],
	          /* ioData */record[/* ioData */7],
	          /* layoutData */record[/* layoutData */8]
	        ];
	}

	function _getIsSelectedByDefaultAndMap(index, defaultIsSelected, record) {
	  var match = get$3(index, record[/* controlData */6][/* checkboxData */1][/* isSelectedMap */1]);
	  if (match !== undefined) {
	    return match;
	  } else {
	    return defaultIsSelected;
	  }
	}

	function _setIsSlected(index, value, record) {
	  set$1(index, value, record[/* controlData */6][/* checkboxData */1][/* isSelectedMap */1]);
	  return record;
	}

	function checkbox$1(rect, defaultIsSelected, str, record) {
	  var height = rect[3];
	  var y = rect[1];
	  var x = rect[0];
	  var match = getSetting$1(record)[/* checkboxSetting */4];
	  var checkboxInnerColorHover = match[/* checkboxInnerColorHover */3];
	  var checkboxOuterColorHover = match[/* checkboxOuterColorHover */2];
	  var match$1 = getIOData$1(record);
	  var innerSize = height * match[/* checkboxInnerSizeRatio */4];
	  var outerSize = height * match[/* checkboxOuterSizeRatio */5];
	  var outerBoxRect = /* tuple */[
	    x,
	    y,
	    outerSize,
	    outerSize
	  ];
	  var index = record[/* controlData */6][/* checkboxData */1][/* index */0];
	  var isSelectedByDefaultAndMap = _getIsSelectedByDefaultAndMap(index, defaultIsSelected, record);
	  var isInBox$$1 = isInBox(outerBoxRect, convertIntPositionToFloatPosition(match$1[/* pointPosition */2]));
	  var match$2 = isInBox$$1 && isClick(record);
	  var isSelected = match$2 ? (
	      isSelectedByDefaultAndMap ? false : true
	    ) : isSelectedByDefaultAndMap;
	  var match$3 = isSelected || isInBox$$1 ? /* tuple */[
	      checkboxInnerColorHover,
	      checkboxOuterColorHover
	    ] : /* tuple */[
	      match[/* checkboxInnerColor */1],
	      match[/* checkboxOuterColor */0]
	    ];
	  var record$1 = _setIsSlected(index, isSelected, record);
	  var record$2 = draw(outerBoxRect, match$3[1], record$1);
	  var record$3 = isSelected ? draw(/* tuple */[
	          Math.round(0.5 * (x + (x + outerSize) - innerSize)),
	          Math.round(0.5 * (y + (y + outerSize) - innerSize)),
	          innerSize,
	          innerSize
	        ], match$3[0], record$2) : record$2;
	  var record$4 = draw$1(/* tuple */[
	        x + outerSize,
	        y,
	        rect[2] - outerSize,
	        height
	      ], str, /* Center */1, record$3);
	  var record$5 = _addIndex$1(record$4);
	  return /* tuple */[
	          record$5,
	          isSelected
	        ];
	}


	/* IOIMGUIService-WonderImgui Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function _drawCircle(_param, _theta, _curIndex, _param$1) {
	  while(true) {
	    var param = _param$1;
	    var param$1 = _param;
	    var curIndex = _curIndex;
	    var theta = _theta;
	    var indexArr = param[3];
	    var texCoordArr = param[2];
	    var colorArr = param[1];
	    var verticeArr = param[0];
	    var max = param$1[7];
	    var stepSize = param$1[6];
	    var radius = param$1[5];
	    var centerVertexIndex = param$1[4];
	    var fontTexUvForWhite = param$1[3];
	    var color = param$1[2];
	    var centerY = param$1[1];
	    var centerX = param$1[0];
	    var match = theta <= max;
	    if (match) {
	      var match$1 = coloredVertex(centerX + radius * Math.cos(theta), centerY + radius * Math.sin(theta), color, /* tuple */[
	            verticeArr,
	            colorArr,
	            texCoordArr
	          ], fontTexUvForWhite);
	      var match$2 = theta !== 0;
	      var indexArr$1 = match$2 ? push$1(centerVertexIndex, push$1(curIndex - 1 | 0, push$1(curIndex + 0 | 0, indexArr))) : indexArr;
	      _param$1 = /* tuple */[
	        match$1[0],
	        match$1[1],
	        match$1[2],
	        indexArr$1
	      ];
	      _curIndex = curIndex + 1 | 0;
	      _theta = theta + stepSize;
	      _param = /* tuple */[
	        centerX,
	        centerY,
	        color,
	        fontTexUvForWhite,
	        centerVertexIndex,
	        radius,
	        stepSize,
	        max
	      ];
	      continue ;
	    } else {
	      return /* tuple */[
	              verticeArr,
	              colorArr,
	              texCoordArr,
	              indexArr
	            ];
	    }
	  }
	}

	function draw$3(param, color, segments, record) {
	  var width = param[2];
	  var match = getSetting$1(record);
	  var fontTexUvForWhite = match[/* fontTexUvForWhite */1];
	  var centerX = param[0] + 0.5 * width;
	  var centerY = param[1] + 0.5 * param[3];
	  var radius = width / 2;
	  var match$1 = getFontTextureDrawData(record);
	  var verticeArr = match$1[/* verticeArr */2];
	  var baseIndex = getBaseIndex(verticeArr);
	  var match$2 = coloredVertex(centerX, centerY, color, /* tuple */[
	        verticeArr,
	        match$1[/* colorArr */3],
	        match$1[/* texCoordArr */4]
	      ], fontTexUvForWhite);
	  var centerVertexIndex = baseIndex + 0 | 0;
	  var match$3 = _drawCircle(/* tuple */[
	        centerX,
	        centerY,
	        color,
	        fontTexUvForWhite,
	        centerVertexIndex,
	        radius,
	        2 * Math.PI / segments,
	        2 * Math.PI + 0.1
	      ], 0, baseIndex + 1 | 0, /* tuple */[
	        match$2[0],
	        match$2[1],
	        match$2[2],
	        match$1[/* indexArr */5]
	      ]);
	  var init = record[/* drawData */4];
	  var init$1 = record[/* drawData */4][/* fontTextureDrawData */0];
	  return /* record */[
	          /* setting */record[/* setting */0],
	          /* assetData */record[/* assetData */1],
	          /* fontData */record[/* fontData */2],
	          /* webglData */record[/* webglData */3],
	          /* drawData : record */[
	            /* fontTextureDrawData : record */[
	              /* drawType */init$1[/* drawType */0],
	              /* customTexture */init$1[/* customTexture */1],
	              /* verticeArr */match$3[0],
	              /* colorArr */match$3[1],
	              /* texCoordArr */match$3[2],
	              /* indexArr */match$3[3]
	            ],
	            /* customTextureDrawDataMap */init[/* customTextureDrawDataMap */1]
	          ],
	          /* imguiFuncData */record[/* imguiFuncData */5],
	          /* controlData */record[/* controlData */6],
	          /* ioData */record[/* ioData */7],
	          /* layoutData */record[/* layoutData */8]
	        ];
	}


	/* ArrayService-WonderImgui Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function _getSelectIndex(defaultSelectIndex, group$$1, record) {
	  var match = get(group$$1, getRadioButtonData(record)[/* isSelectedMap */0]);
	  if (match !== undefined) {
	    return match;
	  } else {
	    return defaultSelectIndex;
	  }
	}

	function _buildDrawData(defaultSelectIndex, groupDataArr, group$$1, record) {
	  var match = getSetting$1(record)[/* radioButtonSetting */3];
	  var radioButtonOuterRadius = match[/* radioButtonOuterRadius */6];
	  var radioButtonInnerRadius = match[/* radioButtonInnerRadius */5];
	  var match$1 = getIOData$1(record);
	  var pointPosition = match$1[/* pointPosition */2];
	  var selectIndex = _getSelectIndex(defaultSelectIndex, group$$1, record);
	  var match$2 = reduceOneParami((function (param, param$1, index) {
	          var resultInHoverIndex = param[2];
	          var resultSelectIndex = param[1];
	          var match = convertIntRectToFloatRect(computeRectBasedOnTopLeftOfView(param$1[0], record));
	          var height = match[3];
	          var y = match[1];
	          var x = match[0];
	          var innerRadius = height / 2 * radioButtonInnerRadius;
	          var outerRadius = height / 2 * radioButtonOuterRadius;
	          var innerCircleWidth = innerRadius * 2;
	          var innerCircleHeight = innerRadius * 2;
	          var outerCircleWidth = outerRadius * 2;
	          var outerCircleHeight = outerRadius * 2;
	          var innerCircleRect = /* tuple */[
	            x,
	            y,
	            innerCircleWidth,
	            innerCircleHeight
	          ];
	          var outerCircleRect = /* tuple */[
	            x,
	            y,
	            outerCircleWidth,
	            outerCircleHeight
	          ];
	          var isInCircle$$1 = isInCircle(outerCircleRect, convertIntPositionToFloatPosition(pointPosition));
	          var isIOSelected = isInCircle$$1 && isClick(record);
	          return /* tuple */[
	                  push$1(/* tuple */[
	                        x,
	                        y,
	                        match[2],
	                        height,
	                        param$1[1],
	                        innerRadius,
	                        outerRadius,
	                        innerCircleWidth,
	                        innerCircleHeight,
	                        outerCircleWidth,
	                        outerCircleHeight,
	                        innerCircleRect,
	                        outerCircleRect
	                      ], param[0]),
	                  resultSelectIndex !== undefined ? resultSelectIndex : (
	                      isIOSelected ? index : undefined
	                    ),
	                  resultInHoverIndex !== undefined ? resultInHoverIndex : (
	                      isInCircle$$1 ? index : undefined
	                    )
	                ];
	        }), /* tuple */[
	        /* array */[],
	        undefined,
	        undefined
	      ], groupDataArr);
	  var ioSelectIndex = match$2[1];
	  return /* tuple */[
	          match$2[0],
	          ioSelectIndex !== undefined ? ioSelectIndex : selectIndex,
	          match$2[2]
	        ];
	}

	function radioButton$1(groupDataArr, defaultSelectIndex, group$$1, record) {
	  requireCheck((function () {
	          return test(buildAssertMessage("defaultSelectIndex < radioButton count", "not"), (function () {
	                        return Operators[/* < */9](defaultSelectIndex, groupDataArr.length);
	                      }));
	        }), true);
	  var match = getSetting$1(record)[/* radioButtonSetting */3];
	  var radioButtonCircleSegments = match[/* radioButtonCircleSegments */4];
	  var radioButtonInnerColorHover = match[/* radioButtonInnerColorHover */3];
	  var radioButtonOuterColorHover = match[/* radioButtonOuterColorHover */2];
	  var radioButtonInnerColor = match[/* radioButtonInnerColor */1];
	  var radioButtonOuterColor = match[/* radioButtonOuterColor */0];
	  var match$1 = _buildDrawData(defaultSelectIndex, groupDataArr, group$$1, record);
	  var ioInHoverIndex = match$1[2];
	  var selectIndex = match$1[1];
	  set(group$$1, selectIndex, getRadioButtonData(record)[/* isSelectedMap */0]);
	  var record$1 = reduceOneParami((function (record, param, index) {
	          var outerCircleWidth = param[9];
	          var innerRadius = param[5];
	          var y = param[1];
	          var x = param[0];
	          var isSelected = selectIndex === index;
	          var match;
	          if (isSelected) {
	            match = /* tuple */[
	              radioButtonInnerColorHover,
	              radioButtonOuterColorHover
	            ];
	          } else if (ioInHoverIndex !== undefined) {
	            var match$1 = ioInHoverIndex === index;
	            match = match$1 ? /* tuple */[
	                radioButtonInnerColorHover,
	                radioButtonOuterColorHover
	              ] : /* tuple */[
	                radioButtonInnerColor,
	                radioButtonOuterColor
	              ];
	          } else {
	            match = /* tuple */[
	              radioButtonInnerColor,
	              radioButtonOuterColor
	            ];
	          }
	          var record$1 = draw$3(param[12], match[1], radioButtonCircleSegments, record);
	          var record$2 = isSelected ? draw$3(/* tuple */[
	                  Math.round(0.5 * (x + (x + outerCircleWidth) - innerRadius * 2)),
	                  Math.round(0.5 * (y + (y + param[10]) - innerRadius * 2)),
	                  param[7],
	                  param[8]
	                ], match[0], radioButtonCircleSegments, record$1) : record$1;
	          return draw$1(/* tuple */[
	                      x + outerCircleWidth,
	                      y,
	                      param[2] - outerCircleWidth,
	                      param[3]
	                    ], param[4], /* Center */1, record$2);
	        }), record, match$1[0]);
	  return /* tuple */[
	          record$1,
	          selectIndex
	        ];
	}


	/* Log-WonderLog Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function label(rect, str, align, record) {
	  return draw$1(convertIntRectToFloatRect(computeRectBasedOnTopLeftOfView(rect, record)), str, align, record);
	}

	function image(rect, uv, id, record) {
	  return draw$2(convertIntRectToFloatRect(computeRectBasedOnTopLeftOfView(rect, record)), uv, id, record);
	}

	function button(rect, str, record) {
	  return button$1(convertIntRectToFloatRect(computeRectBasedOnTopLeftOfView(rect, record)), str, record);
	}

	function box(rect, color, record) {
	  return draw(convertIntRectToFloatRect(computeRectBasedOnTopLeftOfView(rect, record)), color, record);
	}

	var radioButton = radioButton$1;

	function checkbox(rect, defaultSelected, str, record) {
	  return checkbox$1(convertIntRectToFloatRect(computeRectBasedOnTopLeftOfView(rect, record)), defaultSelected, str, record);
	}

	function sliderInt(param, param$1, param$2, record) {
	  return sliderInt$1(/* tuple */[
	              convertIntRectToFloatRect(computeRectBasedOnTopLeftOfView(param[0], record)),
	              param[1]
	            ], /* tuple */[
	              param$1[0],
	              param$1[1]
	            ], /* tuple */[
	              param$2[0],
	              param$2[1]
	            ], record);
	}

	function sliderFloat(param, param$1, param$2, record) {
	  return sliderFloat$1(/* tuple */[
	              convertIntRectToFloatRect(computeRectBasedOnTopLeftOfView(param[0], record)),
	              param[1]
	            ], /* tuple */[
	              param$1[0],
	              param$1[1],
	              param$1[2]
	            ], /* tuple */[
	              param$2[0],
	              param$2[1]
	            ], record);
	}


	/* DrawBoxIMGUIService-WonderImgui Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function _createArrayBuffer(gl) {
	  var buffer = gl.createBuffer();
	  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(/* array */[]), gl.DYNAMIC_DRAW);
	  return buffer;
	}

	function _createElementArrayBuffer(gl) {
	  var buffer = gl.createBuffer();
	  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
	  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(/* array */[]), gl.DYNAMIC_DRAW);
	  return buffer;
	}

	function _createFontTexture(gl, source) {
	  var texture = gl.createTexture();
	  var target = gl.TEXTURE_2D;
	  gl.bindTexture(target, texture);
	  gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	  gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	  gl.texParameteri(target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	  gl.texParameteri(target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	  var format = gl.RGBA;
	  gl.texImage2D(target, 0, format, format, gl.UNSIGNED_BYTE, source);
	  return texture;
	}

	function _buildOrthoProjectionMat4TypeArr(param) {
	  return ortho(0, param[0], param[1], 0, -1, 1, createIdentityMatrix4(/* () */0));
	}

	function _sendUniformProjectionMatData(gl, program, canvasSize) {
	  gl.uniformMatrix4fv(gl.getUniformLocation(program, "u_projectionMat"), false, _buildOrthoProjectionMat4TypeArr(canvasSize));
	  return /* () */0;
	}

	function _sendUniformData(gl, program, canvasSize) {
	  gl.useProgram(program);
	  _sendUniformProjectionMatData(gl, program, canvasSize);
	  gl.uniform1i(gl.getUniformLocation(program, "u_sampler2D"), 0);
	  return /* () */0;
	}

	function init(gl, canvasSize, record) {
	  var match = !isLoadAsset(record);
	  if (match) {
	    return record;
	  } else {
	    var program = initShader(vs, fs, gl, gl.createProgram());
	    var positionBuffer = _createArrayBuffer(gl);
	    var colorBuffer = _createArrayBuffer(gl);
	    var texCoordBuffer = _createArrayBuffer(gl);
	    var indexBuffer = _createElementArrayBuffer(gl);
	    var fontTexture = _createFontTexture(gl, unsafeGetBitmap(record));
	    _sendUniformData(gl, program, canvasSize);
	    var match$1 = record[/* assetData */1];
	    var init$1 = record[/* assetData */1];
	    return /* record */[
	            /* setting */record[/* setting */0],
	            /* assetData : record */[
	              /* fntId */init$1[/* fntId */0],
	              /* bitmapId */init$1[/* bitmapId */1],
	              /* fntDataMap */init$1[/* fntDataMap */2],
	              /* bitmapMap */init$1[/* bitmapMap */3],
	              /* customImageArr */init$1[/* customImageArr */4],
	              /* customTextureMap */createCustomTextures(gl, match$1[/* customImageArr */4], match$1[/* customTextureMap */5])
	            ],
	            /* fontData */record[/* fontData */2],
	            /* webglData *//* record */[
	              /* program */program,
	              /* positionBuffer */positionBuffer,
	              /* colorBuffer */colorBuffer,
	              /* texCoordBuffer */texCoordBuffer,
	              /* indexBuffer */indexBuffer,
	              /* fontTexture */fontTexture,
	              /* aPositonLocation */gl.getAttribLocation(program, "a_position"),
	              /* aColorLocation */gl.getAttribLocation(program, "a_color"),
	              /* aTexCoordLocation */gl.getAttribLocation(program, "a_texCoord"),
	              /* lastWebglData */undefined
	            ],
	            /* drawData */record[/* drawData */4],
	            /* imguiFuncData */record[/* imguiFuncData */5],
	            /* controlData */record[/* controlData */6],
	            /* ioData */record[/* ioData */7],
	            /* layoutData */record[/* layoutData */8]
	          ];
	  }
	}

	function _createEmptyDrawData() {
	  return /* record */[
	          /* fontTextureDrawData : record */[
	            /* drawType : FontTexture */0,
	            /* customTexture */undefined,
	            /* verticeArr : array */[],
	            /* colorArr : array */[],
	            /* texCoordArr : array */[],
	            /* indexArr : array */[]
	          ],
	          /* customTextureDrawDataMap */createEmpty(/* () */0)
	        ];
	}

	function _prepare(ioData, param, data) {
	  var record = _1(param[0], data);
	  var init = record[/* controlData */6];
	  var init$1 = record[/* controlData */6][/* checkboxData */1];
	  var init$2 = record[/* controlData */6][/* sliderData */2];
	  return _2(param[1], /* record */[
	              /* setting */record[/* setting */0],
	              /* assetData */record[/* assetData */1],
	              /* fontData */record[/* fontData */2],
	              /* webglData */record[/* webglData */3],
	              /* drawData */_createEmptyDrawData(/* () */0),
	              /* imguiFuncData */record[/* imguiFuncData */5],
	              /* controlData : record */[
	                /* radioButtonData */init[/* radioButtonData */0],
	                /* checkboxData : record */[
	                  /* index */0,
	                  /* isSelectedMap */init$1[/* isSelectedMap */1]
	                ],
	                /* sliderData : record */[
	                  /* index */0,
	                  /* valueMap */init$2[/* valueMap */1]
	                ]
	              ],
	              /* ioData */ioData,
	              /* layoutData */record[/* layoutData */8]
	            ], data);
	}

	function _unbindVAO(gl) {
	  var match = gl.getExtension("OES_vertex_array_object");
	  if (match == null) {
	    return /* () */0;
	  } else {
	    match.bindVertexArrayOES(null);
	    return /* () */0;
	  }
	}

	function _backupGlState(gl, record) {
	  var init = unsafeGetWebglData(record);
	  return /* record */[
	          /* setting */record[/* setting */0],
	          /* assetData */record[/* assetData */1],
	          /* fontData */record[/* fontData */2],
	          /* webglData *//* record */[
	            /* program */init[/* program */0],
	            /* positionBuffer */init[/* positionBuffer */1],
	            /* colorBuffer */init[/* colorBuffer */2],
	            /* texCoordBuffer */init[/* texCoordBuffer */3],
	            /* indexBuffer */init[/* indexBuffer */4],
	            /* fontTexture */init[/* fontTexture */5],
	            /* aPositonLocation */init[/* aPositonLocation */6],
	            /* aColorLocation */init[/* aColorLocation */7],
	            /* aTexCoordLocation */init[/* aTexCoordLocation */8],
	            /* lastWebglData *//* record */[
	              /* lastProgram */nullable_to_opt(gl.getParameter(gl.CURRENT_PROGRAM)),
	              /* lastElementArrayBuffer */gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING),
	              /* lastArrayBuffer */gl.getParameter(gl.ARRAY_BUFFER_BINDING),
	              /* lastTexture */nullable_to_opt(gl.getParameter(gl.TEXTURE_BINDING_2D)),
	              /* lastIsEnableDepthTest */gl.isEnabled(gl.DEPTH_TEST),
	              /* lastIsEnableBlend */gl.isEnabled(gl.BLEND)
	            ]
	          ],
	          /* drawData */record[/* drawData */4],
	          /* imguiFuncData */record[/* imguiFuncData */5],
	          /* controlData */record[/* controlData */6],
	          /* ioData */record[/* ioData */7],
	          /* layoutData */record[/* layoutData */8]
	        ];
	}

	function _setGlState(gl) {
	  gl.disable(gl.DEPTH_TEST);
	  gl.enable(gl.BLEND);
	  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	  return /* () */0;
	}

	function _draw(gl, drawElementsDataArr, record) {
	  var match = unsafeGetWebglData(record);
	  var fontTexture = match[/* fontTexture */5];
	  forEach((function (param) {
	          var texture = param[/* drawType */0] ? unsafeGet$3(param[/* customTexture */1]) : fontTexture;
	          gl.bindTexture(gl.TEXTURE_2D, texture);
	          gl.drawElements(gl.TRIANGLES, param[/* count */2], gl.UNSIGNED_SHORT, param[/* countOffset */3]);
	          return /* () */0;
	        }), drawElementsDataArr);
	  return record;
	}

	function _restoreGlState(gl, record) {
	  var match = unsafeGet$3(unsafeGetWebglData(record)[/* lastWebglData */9]);
	  var lastTexture = match[/* lastTexture */3];
	  var lastProgram = match[/* lastProgram */0];
	  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, match[/* lastElementArrayBuffer */1]);
	  gl.bindBuffer(gl.ARRAY_BUFFER, match[/* lastArrayBuffer */2]);
	  if (lastProgram !== undefined) {
	    gl.useProgram(valFromOption(lastProgram));
	  }
	  if (lastTexture !== undefined) {
	    gl.bindTexture(gl.TEXTURE_2D, valFromOption(lastTexture));
	  }
	  if (match[/* lastIsEnableDepthTest */4]) {
	    gl.enable(gl.DEPTH_TEST);
	  } else {
	    gl.disable(gl.DEPTH_TEST);
	  }
	  if (match[/* lastIsEnableBlend */5]) {
	    gl.enable(gl.BLEND);
	  } else {
	    gl.disable(gl.BLEND);
	  }
	  return record;
	}

	function _buildGroupedDrawDataArr(record) {
	  var fontTextureDrawData = getFontTextureDrawData(record);
	  var customTextureDrawDataMap = getCustomTextureDrawDataMap(record);
	  var match = reduceOneParam((function (param, drawData) {
	          var baseIndex = getBaseIndex(param[0]) + param[1] | 0;
	          return /* tuple */[
	                  drawData[/* verticeArr */2],
	                  baseIndex,
	                  push$1(/* record */[
	                        /* drawType */drawData[/* drawType */0],
	                        /* customTexture */drawData[/* customTexture */1],
	                        /* verticeArr */drawData[/* verticeArr */2],
	                        /* colorArr */drawData[/* colorArr */3],
	                        /* texCoordArr */drawData[/* texCoordArr */4],
	                        /* indexArr */drawData[/* indexArr */5].map((function (index) {
	                                return index + baseIndex | 0;
	                              }))
	                      ], param[2])
	                ];
	        }), /* tuple */[
	        fontTextureDrawData[/* verticeArr */2],
	        0,
	        /* array */[]
	      ], values(customTextureDrawDataMap));
	  return /* tuple */[
	          record,
	          concatArrays(/* array */[
	                /* array */[fontTextureDrawData],
	                match[2]
	              ])
	        ];
	}

	function _finish(gl, param, data) {
	  var record = _1(param[0], data);
	  _unbindVAO(gl);
	  var record$1 = _backupGlState(gl, record);
	  var match = _buildGroupedDrawDataArr(record$1);
	  var match$1 = bufferAllData(gl, match[1], match[0]);
	  var record$2 = match$1[0];
	  var match$2 = unsafeGetWebglData(record$2);
	  gl.useProgram(match$2[/* program */0]);
	  _setGlState(gl);
	  return _2(param[1], _restoreGlState(gl, _draw(gl, match$1[1], record$2)), data);
	}

	function _clearData(record) {
	  return /* record */[
	          /* setting */record[/* setting */0],
	          /* assetData */record[/* assetData */1],
	          /* fontData */record[/* fontData */2],
	          /* webglData */record[/* webglData */3],
	          /* drawData */record[/* drawData */4],
	          /* imguiFuncData */record[/* imguiFuncData */5],
	          /* controlData : record */[
	            /* radioButtonData : record */[/* isSelectedMap */createEmpty(/* () */0)],
	            /* checkboxData : record */[
	              /* index */0,
	              /* isSelectedMap */createEmpty$2(/* () */0)
	            ],
	            /* sliderData : record */[
	              /* index */0,
	              /* valueMap */createEmpty$2(/* () */0)
	            ]
	          ],
	          /* ioData */record[/* ioData */7],
	          /* layoutData : record */[/* groupData : record */[
	              /* positionArr : array */[],
	              /* index */0
	            ]]
	        ];
	}

	function getIMGUIFunc(param) {
	  return param[/* imguiFuncData */5][/* imguiFunc */0];
	}

	function setIMGUIFunc(customData, func, record) {
	  var init = record[/* imguiFuncData */5];
	  return _clearData(/* record */[
	              /* setting */record[/* setting */0],
	              /* assetData */record[/* assetData */1],
	              /* fontData */record[/* fontData */2],
	              /* webglData */record[/* webglData */3],
	              /* drawData */record[/* drawData */4],
	              /* imguiFuncData : record */[
	                /* imguiFunc */some$1(func),
	                /* customDataForIMGUIFunc */some$1(customData),
	                /* apiJsObj */init[/* apiJsObj */2]
	              ],
	              /* controlData */record[/* controlData */6],
	              /* ioData */record[/* ioData */7],
	              /* layoutData */record[/* layoutData */8]
	            ]);
	}

	function _buildAPIJsObj() {
	  return {
	          label: label,
	          image: image,
	          button: button,
	          box: box,
	          radioButton: radioButton,
	          checkbox: checkbox,
	          sliderInt: sliderInt,
	          sliderFloat: sliderFloat,
	          beginGroup: beginGroup,
	          endGroup: endGroup
	        };
	}

	function _exec(apiJsObj, getRecordFunc, data) {
	  var record = _1(getRecordFunc, data);
	  var match = getIMGUIFunc(record);
	  if (match !== undefined) {
	    return valFromOption(match)(unsafeGet$3(record[/* imguiFuncData */5][/* customDataForIMGUIFunc */1]), apiJsObj, data);
	  } else {
	    return data;
	  }
	}

	function render(gl, ioData, apiJsObj, param, data) {
	  var setRecordFunc = param[1];
	  var getRecordFunc = param[0];
	  var record = _1(getRecordFunc, data);
	  var match = !isLoadAsset(record);
	  if (match) {
	    return data;
	  } else {
	    return _finish(gl, /* tuple */[
	                getRecordFunc,
	                setRecordFunc
	              ], _exec(apiJsObj, getRecordFunc, _prepare(ioData, /* tuple */[
	                        getRecordFunc,
	                        setRecordFunc
	                      ], data)));
	  }
	}

	function createRecord() {
	  return /* record */[
	          /* setting : record */[
	            /* textColor : array */[
	              1,
	              1,
	              1
	            ],
	            /* fontTexUvForWhite : array */[
	              0,
	              0
	            ],
	            /* buttonSetting : record */[
	              /* buttonColor : array */[
	                0.35,
	                0.1,
	                0.1
	              ],
	              /* hoverButtonColor : array */[
	                0.40,
	                0.1,
	                0.1
	              ],
	              /* clickButtonColor : array */[
	                0.50,
	                0.1,
	                0.1
	              ]
	            ],
	            /* radioButtonSetting : record */[
	              /* radioButtonOuterColor : array */[
	                0.3,
	                0.3,
	                0.3
	              ],
	              /* radioButtonInnerColor : array */[
	                0.15,
	                0.15,
	                0.15
	              ],
	              /* radioButtonOuterColorHover : array */[
	                0.33,
	                0.33,
	                0.33
	              ],
	              /* radioButtonInnerColorHover : array */[
	                0.18,
	                0.18,
	                0.18
	              ],
	              /* radioButtonCircleSegments */9,
	              /* radioButtonInnerRadius */0.6,
	              /* radioButtonOuterRadius */1
	            ],
	            /* checkboxSetting : record */[
	              /* checkboxOuterColor : array */[
	                0.3,
	                0.3,
	                0.3
	              ],
	              /* checkboxInnerColor : array */[
	                0.15,
	                0.15,
	                0.15
	              ],
	              /* checkboxOuterColorHover : array */[
	                0.33,
	                0.33,
	                0.33
	              ],
	              /* checkboxInnerColorHover : array */[
	                0.18,
	                0.18,
	                0.18
	              ],
	              /* checkboxInnerSizeRatio */1.4,
	              /* checkboxOuterSizeRatio */2
	            ],
	            /* sliderSetting : record */[
	              /* sliderBackgroundColor : array */[
	                0.16,
	                0.16,
	                0.16
	              ],
	              /* sliderFillColor : array */[
	                0,
	                0.3,
	                0.6
	              ],
	              /* sliderBackgroundColorHover : array */[
	                0.19,
	                0.19,
	                0.19
	              ],
	              /* sliderFillColorHover : array */[
	                0,
	                0.3,
	                0.7
	              ]
	            ]
	          ],
	          /* assetData : record */[
	            /* fntId */"fnt",
	            /* bitmapId */"bitmap",
	            /* fntDataMap */createEmpty(/* () */0),
	            /* bitmapMap */createEmpty(/* () */0),
	            /* customImageArr : array */[],
	            /* customTextureMap */createEmpty(/* () */0)
	          ],
	          /* fontData */undefined,
	          /* webglData */undefined,
	          /* drawData */_createEmptyDrawData(/* () */0),
	          /* imguiFuncData : record */[
	            /* imguiFunc */undefined,
	            /* customDataForIMGUIFunc */undefined,
	            /* apiJsObj */_buildAPIJsObj(/* () */0)
	          ],
	          /* controlData : record */[
	            /* radioButtonData : record */[/* isSelectedMap */createEmpty(/* () */0)],
	            /* checkboxData : record */[
	              /* index */0,
	              /* isSelectedMap */createEmpty$2(/* () */0)
	            ],
	            /* sliderData : record */[
	              /* index */0,
	              /* valueMap */createEmpty$2(/* () */0)
	            ]
	          ],
	          /* ioData : record */[
	            /* pointUp */false,
	            /* pointDown */false,
	            /* pointPosition : tuple */[
	              0,
	              0
	            ],
	            /* pointMovementDelta : tuple */[
	              0,
	              0
	            ]
	          ],
	          /* layoutData : record */[/* groupData : record */[
	              /* positionArr : array */[],
	              /* index */0
	            ]]
	        ];
	}


	/* Js_dict Not a pure module */

	/* ManageIMGUIService-WonderImgui Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	function createGl(contextConfig, canvas) {
	  return canvas.getContext("webgl", contextConfig);
	}


	/* No side effect */

	function getRecord$1(e) {
	  return unsafeGet$1(e).data;
	}


	/* OptionService-Wonderjs Not a pure module */

	function convertContextConfigDataToJsObj(param) {
	  return {
	          alpha: param[/* alpha */0],
	          depth: param[/* depth */1],
	          stencil: param[/* stencil */2],
	          antialias: param[/* antialias */3],
	          premultipliedAlpha: param[/* premultipliedAlpha */4],
	          preserveDrawingBuffer: param[/* preserveDrawingBuffer */5]
	        };
	}


	/* No side effect */

	function execJob$5(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var gl = createGl(convertContextConfigDataToJsObj(data.contextConfig), data.canvas);
	                state[/* deviceManagerRecord */4] = setGl(gl, state[/* deviceManagerRecord */4]);
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function _getExtension(name, gl) {
	  var tmp;
	  switch (name) {
	    case "element_index_uint" : 
	        var match = gl.getExtension("OES_element_index_uint");
	        if (match == null) {
	          fatal(buildFatalMessage("_getExtension", "not support OES_element_index_uint extension", "", "", ""));
	          tmp = false;
	        } else {
	          tmp = true;
	        }
	        break;
	    case "instanced_arrays" : 
	        tmp = gl.getExtension("ANGLE_instanced_arrays");
	        break;
	    default:
	      tmp = gl.getExtension(name);
	  }
	  if (tmp == null) {
	    return undefined;
	  } else {
	    return some$1(tmp);
	  }
	}

	function _detectExtension(gl, record) {
	  return /* record */[
	          /* extensionInstancedArrays */_getExtension("instanced_arrays", gl),
	          /* extensionElementIndexUint */_getExtension("element_index_uint", gl),
	          /* precision */record[/* precision */2],
	          /* maxTextureUnit */record[/* maxTextureUnit */3]
	        ];
	}

	function _detectPrecision(gl, record) {
	  var vertexShader = gl.VERTEX_SHADER;
	  var fragmentShader = gl.FRAGMENT_SHADER;
	  var highFloat = gl.HIGH_FLOAT;
	  var mediumFloat = gl.MEDIUM_FLOAT;
	  var vertexShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(vertexShader, highFloat);
	  var vertexShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(vertexShader, mediumFloat);
	  var fragmentShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(fragmentShader, highFloat);
	  var fragmentShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(fragmentShader, mediumFloat);
	  var highpAvailable = vertexShaderPrecisionHighpFloat.precision > 0 && fragmentShaderPrecisionHighpFloat.precision > 0;
	  var mediumpAvailable = vertexShaderPrecisionMediumpFloat.precision > 0 && fragmentShaderPrecisionMediumpFloat.precision > 0;
	  if (highpAvailable) {
	    return /* record */[
	            /* extensionInstancedArrays */record[/* extensionInstancedArrays */0],
	            /* extensionElementIndexUint */record[/* extensionElementIndexUint */1],
	            /* precision *//* HIGHP */0,
	            /* maxTextureUnit */record[/* maxTextureUnit */3]
	          ];
	  } else if (mediumpAvailable) {
	    warn("not support highp, using mediump instead");
	    return /* record */[
	            /* extensionInstancedArrays */record[/* extensionInstancedArrays */0],
	            /* extensionElementIndexUint */record[/* extensionElementIndexUint */1],
	            /* precision *//* MEDIUMP */1,
	            /* maxTextureUnit */record[/* maxTextureUnit */3]
	          ];
	  } else {
	    warn("not support highp and mediump, using lowp instead");
	    return /* record */[
	            /* extensionInstancedArrays */record[/* extensionInstancedArrays */0],
	            /* extensionElementIndexUint */record[/* extensionElementIndexUint */1],
	            /* precision *//* LOWP */2,
	            /* maxTextureUnit */record[/* maxTextureUnit */3]
	          ];
	  }
	}

	function _getTextureCapability(gl, textureCountPerMaterial, record) {
	  return ensureCheck((function (param) {
	                var maxTextureUnit = unsafeGet$1(param[/* maxTextureUnit */3]);
	                return test(buildAssertMessage("maxTextureUnit:" + (String(maxTextureUnit) + (" >= textureCountPerMaterial:" + (String(textureCountPerMaterial) + ""))), "not"), (function () {
	                              return Operators[/* >= */7](maxTextureUnit, textureCountPerMaterial);
	                            }));
	              }), getIsDebug(stateData), /* record */[
	              /* extensionInstancedArrays */record[/* extensionInstancedArrays */0],
	              /* extensionElementIndexUint */record[/* extensionElementIndexUint */1],
	              /* precision */record[/* precision */2],
	              /* maxTextureUnit */gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)
	            ]);
	}

	function _detectCapability(gl, textureCountPerMaterial, record) {
	  return _detectPrecision(gl, _getTextureCapability(gl, textureCountPerMaterial, record));
	}

	function detect$1(gl, textureCountPerMaterial, record) {
	  return _detectCapability(gl, textureCountPerMaterial, _detectExtension(gl, record));
	}

	var hasExtension = isSome;

	function unsafeGetInstanceExtension(record) {
	  requireCheck((function () {
	          return test(buildAssertMessage("extensionInstancedArrays exist", "not"), (function () {
	                        return assertExist(record[/* extensionInstancedArrays */0]);
	                      }));
	        }), getIsDebug(stateData));
	  return unsafeGet$1(record[/* extensionInstancedArrays */0]);
	}


	/* Log-WonderLog Not a pure module */

	function execJob$6(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                state[/* gpuDetectRecord */3] = detect$1(unsafeGetGl(state[/* deviceManagerRecord */4]), data.bufferData.textureCountPerMaterial, state[/* gpuDetectRecord */3]);
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	/* ArrayService-Wonderjs Not a pure module */

	/* No side effect */

	function createIdentityMatrix3() {
	  return new Float32Array(/* array */[
	              1,
	              0,
	              0,
	              1,
	              0,
	              0,
	              1,
	              0,
	              0
	            ]);
	}

	function createEmptyMatrix3() {
	  return new Float32Array(/* array */[
	              0,
	              0,
	              0,
	              0,
	              0,
	              0,
	              0,
	              0,
	              0
	            ]);
	}

	function transposeSelf$1(mat) {
	  var a01 = mat[1];
	  var a02 = mat[2];
	  var a12 = mat[5];
	  mat[1] = mat[3];
	  mat[2] = mat[6];
	  mat[3] = a01;
	  mat[5] = mat[7];
	  mat[6] = a02;
	  mat[7] = a12;
	  return mat;
	}


	/* No side effect */

	function sub$1(_, param, param$1) {
	  return /* tuple */[
	          param[0] - param$1[0],
	          param[1] - param$1[1],
	          param[2] - param$1[2]
	        ];
	}

	function cross(param, param$1) {
	  var z2 = param$1[2];
	  var y2 = param$1[1];
	  var x2 = param$1[0];
	  var z1 = param[2];
	  var y1 = param[1];
	  var x1 = param[0];
	  return /* tuple */[
	          y1 * z2 - y2 * z1,
	          z1 * x2 - z2 * x1,
	          x1 * y2 - x2 * y1
	        ];
	}


	/* No side effect */

	function invertTo3x3(mat, resultFloat32Arr) {
	  var a00 = mat[0];
	  var a01 = mat[1];
	  var a02 = mat[2];
	  var a10 = mat[4];
	  var a11 = mat[5];
	  var a12 = mat[6];
	  var a20 = mat[8];
	  var a21 = mat[9];
	  var a22 = mat[10];
	  var b11 = a22 * a11 - a12 * a21;
	  var b21 = -a22 * a01 + a02 * a21;
	  var b31 = a12 * a01 - a02 * a11;
	  var b12 = -a22 * a10 + a12 * a20;
	  var b22 = a22 * a00 - a02 * a20;
	  var b32 = -a12 * a00 + a02 * a10;
	  var b13 = a21 * a10 - a11 * a20;
	  var b23 = -a21 * a00 + a01 * a20;
	  var b33 = a11 * a00 - a01 * a10;
	  var det = a00 * b11 + a01 * b12 + a02 * b13;
	  var match = det;
	  if (match !== 0) {
	    det = 1.0 / det;
	    resultFloat32Arr[0] = b11 * det;
	    resultFloat32Arr[1] = b21 * det;
	    resultFloat32Arr[2] = b31 * det;
	    resultFloat32Arr[3] = b12 * det;
	    resultFloat32Arr[4] = b22 * det;
	    resultFloat32Arr[5] = b32 * det;
	    resultFloat32Arr[6] = b13 * det;
	    resultFloat32Arr[7] = b23 * det;
	    resultFloat32Arr[8] = b33 * det;
	    return resultFloat32Arr;
	  } else {
	    return createEmptyMatrix3(/* () */0);
	  }
	}


	/* Log-WonderLog Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	/* ViewService-Wonderjs Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* DirtyArrayService-Wonderjs Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	var setFntData$1 = setFntData;

	var setBitmap$1 = setBitmap;

	var setCustomImageArr$1 = setCustomImageArr;


	/* AssetIMGUIService-WonderImgui Not a pure module */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	function setSetting$2(settingJsObj, record) {
	  var buttonSettingJsObj = settingJsObj.buttonSetting;
	  var radioButtonSettingJsObj = settingJsObj.radioButtonSetting;
	  var checkboxSettingJsObj = settingJsObj.checkboxSetting;
	  var sliderSettingJsObj = settingJsObj.sliderSetting;
	  var buttonSetting_000 = /* buttonColor */buttonSettingJsObj.buttonColor;
	  var buttonSetting_001 = /* hoverButtonColor */buttonSettingJsObj.hoverButtonColor;
	  var buttonSetting_002 = /* clickButtonColor */buttonSettingJsObj.clickButtonColor;
	  var buttonSetting = /* record */[
	    buttonSetting_000,
	    buttonSetting_001,
	    buttonSetting_002
	  ];
	  var radioButtonSetting_000 = /* radioButtonOuterColor */radioButtonSettingJsObj.radioButtonOuterColor;
	  var radioButtonSetting_001 = /* radioButtonInnerColor */radioButtonSettingJsObj.radioButtonInnerColor;
	  var radioButtonSetting_002 = /* radioButtonOuterColorHover */radioButtonSettingJsObj.radioButtonOuterColorHover;
	  var radioButtonSetting_003 = /* radioButtonInnerColorHover */radioButtonSettingJsObj.radioButtonInnerColorHover;
	  var radioButtonSetting_004 = /* radioButtonCircleSegments */radioButtonSettingJsObj.radioButtonCircleSegments;
	  var radioButtonSetting_005 = /* radioButtonInnerRadius */radioButtonSettingJsObj.radioButtonInnerRadius;
	  var radioButtonSetting_006 = /* radioButtonOuterRadius */radioButtonSettingJsObj.radioButtonOuterRadius;
	  var radioButtonSetting = /* record */[
	    radioButtonSetting_000,
	    radioButtonSetting_001,
	    radioButtonSetting_002,
	    radioButtonSetting_003,
	    radioButtonSetting_004,
	    radioButtonSetting_005,
	    radioButtonSetting_006
	  ];
	  var checkboxSetting_000 = /* checkboxOuterColor */checkboxSettingJsObj.checkboxOuterColor;
	  var checkboxSetting_001 = /* checkboxInnerColor */checkboxSettingJsObj.checkboxInnerColor;
	  var checkboxSetting_002 = /* checkboxOuterColorHover */checkboxSettingJsObj.checkboxOuterColorHover;
	  var checkboxSetting_003 = /* checkboxInnerColorHover */checkboxSettingJsObj.checkboxInnerColorHover;
	  var checkboxSetting_004 = /* checkboxInnerSizeRatio */checkboxSettingJsObj.checkboxInnerSizeRatio;
	  var checkboxSetting_005 = /* checkboxOuterSizeRatio */checkboxSettingJsObj.checkboxOuterSizeRatio;
	  var checkboxSetting = /* record */[
	    checkboxSetting_000,
	    checkboxSetting_001,
	    checkboxSetting_002,
	    checkboxSetting_003,
	    checkboxSetting_004,
	    checkboxSetting_005
	  ];
	  var sliderSetting_000 = /* sliderBackgroundColor */sliderSettingJsObj.sliderBackgroundColor;
	  var sliderSetting_001 = /* sliderFillColor */sliderSettingJsObj.sliderFillColor;
	  var sliderSetting_002 = /* sliderBackgroundColorHover */sliderSettingJsObj.sliderBackgroundColorHover;
	  var sliderSetting_003 = /* sliderFillColorHover */sliderSettingJsObj.sliderFillColorHover;
	  var sliderSetting = /* record */[
	    sliderSetting_000,
	    sliderSetting_001,
	    sliderSetting_002,
	    sliderSetting_003
	  ];
	  return setSetting$1(/* record */[
	              /* textColor */settingJsObj.textColor,
	              /* fontTexUvForWhite */settingJsObj.fontTexUvForWhite,
	              /* buttonSetting */buttonSetting,
	              /* radioButtonSetting */radioButtonSetting,
	              /* checkboxSetting */checkboxSetting,
	              /* sliderSetting */sliderSetting
	            ], record);
	}

	var createRecord$1 = createRecord;

	var init$2 = init;

	var setIMGUIFunc$1 = setIMGUIFunc;


	/* ManageIMGUIService-WonderImgui Not a pure module */

	function getRecord$2(param) {
	  return unsafeGet$1(param[/* browserDetectRecord */26]);
	}


	/* OptionService-Wonderjs Not a pure module */

	var _createImageBitmapForChrome = function (imageData,config){
	        return createImageBitmap(imageData, config)
	    };

	var _createImageBitmapForFirefox = function (imageData){
	        return createImageBitmap(imageData)
	    };

	function createImageBitmapFromImageData(param, getFlipYFunc, state) {
	  var imageData = new ImageData(new Uint8ClampedArray(param[0]), param[1], param[2]);
	  var match = getRecord$2(state);
	  var browser = match[/* browser */0];
	  if (browser !== 1) {
	    if (browser !== 0) {
	      return fatalUnknownBrowser("_createImageBitmap", browser);
	    } else {
	      var match$1 = _1(getFlipYFunc, state) === true;
	      return _createImageBitmapForChrome(imageData, {
	                  imageOrientation: match$1 ? "flipY" : "none"
	                });
	    }
	  } else {
	    return _createImageBitmapForFirefox(imageData);
	  }
	}


	/* RecordBrowserDetectAllService-Wonderjs Not a pure module */

	function getRecord$3(state) {
	  return state[/* imguiRecord */27];
	}


	/* No side effect */

	function _getFlipY() {
	  return false;
	}

	function execJob$8(_, e, stateData) {
	  var data = getRecord$1(e);
	  var imguiData = data.imguiData;
	  var match = isJsonSerializedValueNone(imguiData.fntData) || isJsonSerializedValueNone(imguiData.bitmapImageData);
	  if (match) {
	    return of(e);
	  } else {
	    var state = unsafeGetState$1(stateData);
	    return map$2((function () {
	                  return e;
	                }), fromPromise(createImageBitmapFromImageData(unsafeGetJsonSerializedValue(imguiData.bitmapImageData), _getFlipY, state).then((function (imageBitmap) {
	                            var state = unsafeGetState$1(stateData);
	                            var imguiRecord = setFntData$1(JSON.parse(unsafeGetJsonSerializedValue(imguiData.fntData)), setSetting$2(JSON.parse(imguiData.setting), setBitmap$1(imageBitmap, getRecord$3(state))));
	                            state[/* imguiRecord */27] = imguiRecord;
	                            return Promise.resolve(setState$1(stateData, state));
	                          }))).concat(fromPromise(reduce$1((function (customImageArr, imageData) {
	                                return push(imageData, customImageArr);
	                              }), /* array */[], mergeArray(imguiData.customTextureSourceDataArr.map((function (param) {
	                                        var imageType = param[2];
	                                        var id = param[1];
	                                        return fromPromise(createImageBitmapFromImageData(param[0], _getFlipY, state).then((function (imageBitmap) {
	                                                          return Promise.resolve(/* tuple */[
	                                                                      imageBitmap,
	                                                                      id,
	                                                                      imageType
	                                                                    ]);
	                                                        })));
	                                      })))).then((function (customImageArr) {
	                              var state = unsafeGetState$1(stateData);
	                              state[/* imguiRecord */27] = init$2(unsafeGetGl(state[/* deviceManagerRecord */4]), /* tuple */[
	                                    imguiData.canvasWidth,
	                                    imguiData.canvasHeight
	                                  ], setCustomImageArr$1(customImageArr, state[/* imguiRecord */27]));
	                              return Promise.resolve(setState$1(stateData, state));
	                            })))));
	  }
	}


	/* most Not a pure module */

	function execJob$10(deviceManagerRecord) {
	  return setDepthTest(unsafeGetGl(deviceManagerRecord), true, setSide(unsafeGetGl(deviceManagerRecord), /* FRONT */2, deviceManagerRecord));
	}


	/* DeviceManagerService-Wonderjs Not a pure module */

	function execJob$9(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                state[/* deviceManagerRecord */4] = execJob$10(state[/* deviceManagerRecord */4]);
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function getOperateType(flags) {
	  return unsafeGetFlags(flags)[0];
	}


	/* JobConfigService-Wonderjs Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	var max$1 = 2147483647;

	var min$1 = -2147483648;


	/* No side effect */

	function floor_int(f) {
	  if (f > max$1) {
	    return max$1;
	  } else if (f < min$1) {
	    return min$1;
	  } else {
	    return Math.floor(f);
	  }
	}

	var floor = floor_int;


	/* No side effect */

	var regex_num = (/^\#([0-9a-f]{6})$/i);

	function _handleInValidHexStr(hexStr) {
	  return fatal(buildFatalMessage("convert16HexToRGBA", "color should be #xxxxxx, but actual is " + (String(hexStr) + ""), "", "", ""));
	}

	function convert16HexToRGBA(hexStr) {
	  var match = regex_num.exec(hexStr);
	  if (match !== null) {
	    var match$1 = caml_array_get(match, 1);
	    if (match$1 == null) {
	      return _handleInValidHexStr(hexStr);
	    } else {
	      var hex = floor(_1(hexFloat_of_string, match$1));
	      return /* tuple */[
	              ((hex >>> 16) & 255) / 255,
	              ((hex >>> 8) & 255) / 255,
	              (hex & 255) / 255,
	              1
	            ];
	    }
	  } else {
	    return _handleInValidHexStr(hexStr);
	  }
	}


	/* regex_num Not a pure module */

	function execJob$13(flags, deviceManagerRecord) {
	  return clearColor(unsafeGetGl(deviceManagerRecord), convert16HexToRGBA(getOperateType(flags)), deviceManagerRecord);
	}


	/* ColorService-Wonderjs Not a pure module */

	function execJob$12(flags, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                state[/* deviceManagerRecord */4] = execJob$13(flags, state[/* deviceManagerRecord */4]);
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	/* No side effect */

	/* No side effect */

	/* No side effect */

	/* Log-WonderLog Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	function _getBufferAndSetBufferMap(gl, bufferPool) {
	  var match = bufferPool.pop();
	  if (match !== undefined) {
	    return match;
	  } else {
	    return gl.createBuffer();
	  }
	}

	function getArrayBuffer(gl, param) {
	  return _getBufferAndSetBufferMap(gl, param[/* vertexArrayBufferPool */5]);
	}

	function getElementArrayBuffer(gl, param) {
	  return _getBufferAndSetBufferMap(gl, param[/* elementArrayBufferPool */6]);
	}

	function getInstanceBuffer(gl, param) {
	  return _getBufferAndSetBufferMap(gl, param[/* matrixInstanceBufferPool */7]);
	}

	function _addBufferToPool(geometryIndex, bufferMap, pool) {
	  var match = get$3(geometryIndex, bufferMap);
	  if (match !== undefined) {
	    return push(valFromOption(match), pool);
	  } else {
	    return pool;
	  }
	}

	function addGeometryBufferToPool(geometryIndex, record) {
	  return /* record */[
	          /* geometryVertexBufferMap */record[/* geometryVertexBufferMap */0],
	          /* geometryTexCoordBufferMap */record[/* geometryTexCoordBufferMap */1],
	          /* geometryNormalBufferMap */record[/* geometryNormalBufferMap */2],
	          /* geometryElementArrayBufferMap */record[/* geometryElementArrayBufferMap */3],
	          /* matrixInstanceBufferMap */record[/* matrixInstanceBufferMap */4],
	          /* vertexArrayBufferPool */_addBufferToPool(geometryIndex, record[/* geometryNormalBufferMap */2], _addBufferToPool(geometryIndex, record[/* geometryTexCoordBufferMap */1], _addBufferToPool(geometryIndex, record[/* geometryVertexBufferMap */0], record[/* vertexArrayBufferPool */5]))),
	          /* elementArrayBufferPool */_addBufferToPool(geometryIndex, record[/* geometryElementArrayBufferMap */3], record[/* elementArrayBufferPool */6]),
	          /* matrixInstanceBufferPool */record[/* matrixInstanceBufferPool */7]
	        ];
	}

	function addInstanceBufferToPool(sourceInstanceIndex, record) {
	  var match = get$3(sourceInstanceIndex, record[/* matrixInstanceBufferMap */4]);
	  if (match !== undefined) {
	    return /* record */[
	            /* geometryVertexBufferMap */record[/* geometryVertexBufferMap */0],
	            /* geometryTexCoordBufferMap */record[/* geometryTexCoordBufferMap */1],
	            /* geometryNormalBufferMap */record[/* geometryNormalBufferMap */2],
	            /* geometryElementArrayBufferMap */record[/* geometryElementArrayBufferMap */3],
	            /* matrixInstanceBufferMap */record[/* matrixInstanceBufferMap */4],
	            /* vertexArrayBufferPool */record[/* vertexArrayBufferPool */5],
	            /* elementArrayBufferPool */record[/* elementArrayBufferPool */6],
	            /* matrixInstanceBufferPool */push(valFromOption(match), record[/* matrixInstanceBufferPool */7])
	          ];
	  } else {
	    return record;
	  }
	}


	/* Log-WonderLog Not a pure module */

	var disposeSparseMapData = deleteVal$1;


	/* Log-WonderLog Not a pure module */

	function disposeGeometryBufferData(geometry, record) {
	  return /* record */[
	          /* geometryVertexBufferMap */disposeSparseMapData(geometry, record[/* geometryVertexBufferMap */0]),
	          /* geometryTexCoordBufferMap */disposeSparseMapData(geometry, record[/* geometryTexCoordBufferMap */1]),
	          /* geometryNormalBufferMap */disposeSparseMapData(geometry, record[/* geometryNormalBufferMap */2]),
	          /* geometryElementArrayBufferMap */disposeSparseMapData(geometry, record[/* geometryElementArrayBufferMap */3]),
	          /* matrixInstanceBufferMap */record[/* matrixInstanceBufferMap */4],
	          /* vertexArrayBufferPool */record[/* vertexArrayBufferPool */5],
	          /* elementArrayBufferPool */record[/* elementArrayBufferPool */6],
	          /* matrixInstanceBufferPool */record[/* matrixInstanceBufferPool */7]
	        ];
	}

	function disposeInstanceBufferData(sourceInstance, record) {
	  return /* record */[
	          /* geometryVertexBufferMap */record[/* geometryVertexBufferMap */0],
	          /* geometryTexCoordBufferMap */record[/* geometryTexCoordBufferMap */1],
	          /* geometryNormalBufferMap */record[/* geometryNormalBufferMap */2],
	          /* geometryElementArrayBufferMap */record[/* geometryElementArrayBufferMap */3],
	          /* matrixInstanceBufferMap */disposeSparseMapData(sourceInstance, record[/* matrixInstanceBufferMap */4]),
	          /* vertexArrayBufferPool */record[/* vertexArrayBufferPool */5],
	          /* elementArrayBufferPool */record[/* elementArrayBufferPool */6],
	          /* matrixInstanceBufferPool */record[/* matrixInstanceBufferPool */7]
	        ];
	}

	function _disposeVboBuffer(needDisposeVboBufferArr, param, vboBufferRecord) {
	  var disposeBufferDataFunc = param[1];
	  var addBufferToPoolFunc = param[0];
	  return reduceOneParam((function (vboBufferRecord, component) {
	                return disposeBufferDataFunc(component, addBufferToPoolFunc(component, vboBufferRecord));
	              }), vboBufferRecord, needDisposeVboBufferArr);
	}

	function disposeGeometryVboBuffer(geometryNeedDisposeVboBufferArr, vboBufferRecord) {
	  return _disposeVboBuffer(geometryNeedDisposeVboBufferArr, /* tuple */[
	              addGeometryBufferToPool,
	              disposeGeometryBufferData
	            ], vboBufferRecord);
	}

	function disposeSourceInstanceVboBuffer(sourceInstanceNeedDisposeVboBufferArr, vboBufferRecord) {
	  return _disposeVboBuffer(sourceInstanceNeedDisposeVboBufferArr, /* tuple */[
	              addInstanceBufferToPool,
	              disposeInstanceBufferData
	            ], vboBufferRecord);
	}


	/* ArrayService-WonderCommonlib Not a pure module */

	function execJob$15(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                state[/* vboBufferRecord */23] = disposeSourceInstanceVboBuffer(data.sourceInstanceNeedDisposeVboBufferArr, disposeGeometryVboBuffer(data.geometryNeedDisposeVboBufferArr, state[/* vboBufferRecord */23]));
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	/* No side effect */

	/* No side effect */

	function getLocalToWorldMatrixTypeArray$1(transform, localToWorldMatrices, localToWorldMatrixCacheMap) {
	  var match = get$3(transform, localToWorldMatrixCacheMap);
	  if (match !== undefined) {
	    return valFromOption(match);
	  } else {
	    var matrix = getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices);
	    set$1(transform, matrix, localToWorldMatrixCacheMap);
	    return matrix;
	  }
	}

	function _getNormalMatrixTypeArray(transform, localToWorldMatrices, param, getLocalToWorldMatrixTypeArrayFunc) {
	  return transposeSelf$1(invertTo3x3(getLocalToWorldMatrixTypeArrayFunc(transform, localToWorldMatrices, param[0]), param[1]));
	}

	function getNormalMatrixTypeArray(transform, localToWorldMatrices, param) {
	  var normalMatrixCacheMap = param[1];
	  var match = get$3(transform, normalMatrixCacheMap);
	  if (match !== undefined) {
	    return valFromOption(match);
	  } else {
	    var matrix = _getNormalMatrixTypeArray(transform, localToWorldMatrices, /* tuple */[
	          param[0],
	          createIdentityMatrix3(/* () */0)
	        ], getLocalToWorldMatrixTypeArray$1);
	    set$1(transform, matrix, normalMatrixCacheMap);
	    return matrix;
	  }
	}


	/* Matrix4Service-Wonderjs Not a pure module */

	/* Matrix4Service-Wonderjs Not a pure module */

	/* Matrix4Service-Wonderjs Not a pure module */

	/* NumberService-Wonderjs Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* GameObjectMapService-Wonderjs Not a pure module */

	/* DirtyArrayService-Wonderjs Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	function _getBitFromFlags(gl, param, getBufferBitFunc, bit) {
	  var match = param[1].includes(param[0]);
	  if (match) {
	    if (bit !== undefined) {
	      return bit | _1(getBufferBitFunc, gl);
	    } else {
	      return _1(getBufferBitFunc, gl);
	    }
	  } else {
	    return bit;
	  }
	}

	function getBit(gl, flags) {
	  var match = _getBitFromFlags(gl, /* tuple */[
	        "STENCIL_BUFFER",
	        flags
	      ], (function (prim) {
	          return prim.STENCIL_BUFFER_BIT;
	        }), _getBitFromFlags(gl, /* tuple */[
	            "DEPTH_BUFFER",
	            flags
	          ], (function (prim) {
	              return prim.DEPTH_BUFFER_BIT;
	            }), _getBitFromFlags(gl, /* tuple */[
	                "COLOR_BUFFER",
	                flags
	              ], (function (prim) {
	                  return prim.COLOR_BUFFER_BIT;
	                }), undefined)));
	  if (match !== undefined) {
	    return match;
	  } else {
	    return fatal(buildFatalMessage("_getBit", "should find bit", "", "", "flags:" + (String(flags) + "")));
	  }
	}


	/* Log-WonderLog Not a pure module */

	function execJob$17(flags, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var gl = unsafeGetGl(state[/* deviceManagerRecord */4]);
	                state[/* deviceManagerRecord */4] = clearBuffer(gl, getBit(gl, unsafeGetFlags(flags)), state[/* deviceManagerRecord */4]);
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	/* TypeArrayService-Wonderjs Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	/* _isFirefox Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	/* Matrix4Service-Wonderjs Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* Contract-WonderLog Not a pure module */

	/* GameObjectMapService-Wonderjs Not a pure module */

	/* PMatrixService-Wonderjs Not a pure module */

	function getDefaultShaderIndex() {
	  return 429496729;
	}

	function getDefaultSourceInstance() {
	  return 429496729;
	}


	/* No side effect */

	function getTransformIndicesLength(count) {
	  return (count << 0);
	}

	function getTransformIndicesOffset() {
	  return 0;
	}

	function getMaterialIndicesLength(count) {
	  return (count << 0);
	}

	function getMaterialIndicesOffset(count) {
	  return 0 + imul((count << 0), Uint32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getMeshRendererIndicesLength(count) {
	  return (count << 0);
	}

	function getMeshRendererIndicesOffset(count) {
	  return getMaterialIndicesOffset(count) + imul((count << 0), Uint32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getGeometryIndicesLength(count) {
	  return (count << 0);
	}

	function getGeometryIndicesOffset(count) {
	  return getMeshRendererIndicesOffset(count) + imul((count << 0), Uint32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getSourceInstanceIndicesLength(count) {
	  return (count << 0);
	}

	function getSourceInstanceIndicesOffset(count) {
	  return getGeometryIndicesOffset(count) + imul((count << 0), Uint32Array.BYTES_PER_ELEMENT) | 0;
	}

	var getComponent$1 = getUint32_1;

	function hasSourceInstance(sourceInstance) {
	  return sourceInstance !== getDefaultSourceInstance(/* () */0);
	}


	/* TypeArrayService-Wonderjs Not a pure module */

	function createTypeArrays$1(buffer, count) {
	  return /* tuple */[
	          new Uint32Array(buffer, getTransformIndicesOffset(count), getTransformIndicesLength(count)),
	          new Uint32Array(buffer, getMaterialIndicesOffset(count), getMaterialIndicesLength(count)),
	          new Uint32Array(buffer, getMeshRendererIndicesOffset(count), getMeshRendererIndicesLength(count)),
	          new Uint32Array(buffer, getGeometryIndicesOffset(count), getGeometryIndicesLength(count)),
	          new Uint32Array(buffer, getSourceInstanceIndicesOffset(count), getSourceInstanceIndicesLength(count))
	        ];
	}


	/* ArrayService-WonderCommonlib Not a pure module */

	/* Worker-Wonderjs Not a pure module */

	/* Worker-Wonderjs Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	var getTexture = get$3;

	var setTexture = set$1;


	/* OptionService-Wonderjs Not a pure module */

	function initTexture(gl, texture, glTextureMap) {
	  var match = getTexture(texture, glTextureMap);
	  if (match !== undefined) {
	    return glTextureMap;
	  } else {
	    return setTexture(texture, gl.createTexture(), glTextureMap);
	  }
	}

	function initTexturesWithIndexArray(gl, indexInTypeArrayRange, glTextureMap) {
	  return reduceOneParam((function (glTextureMap, textureInTypeArray) {
	                return initTexture(gl, textureInTypeArray, glTextureMap);
	              }), glTextureMap, indexInTypeArrayRange);
	}

	var initTextures = initTexturesWithIndexArray;


	/* ArrayService-WonderCommonlib Not a pure module */

	function unsafeGetInstanceBuffer(param) {
	  return unsafeGet$1(param[/* instanceBuffer */1]);
	}

	function getSourceInstanceCount$1(record) {
	  return unsafeGetInstanceBuffer(record)[/* sourceInstanceCount */0];
	}

	function getObjectInstanceCountPerSourceInstance$1(record) {
	  return unsafeGetInstanceBuffer(record)[/* objectInstanceCountPerSourceInstance */1];
	}

	function getTextureCountPerMaterial$1(param) {
	  return param[/* textureCountPerMaterial */2];
	}

	function unsafeGetBasicSourceTextureCount(param) {
	  return unsafeGet$1(param[/* basicSourceTextureCount */3]);
	}

	function unsafeGetArrayBufferViewSourceTextureCount(param) {
	  return unsafeGet$1(param[/* arrayBufferViewSourceTextureCount */4]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function getGlType(gl, type_) {
	  if (type_ === 0) {
	    return gl.UNSIGNED_BYTE;
	  } else if (type_ === 1) {
	    return gl.UNSIGNED_SHORT_5_6_5;
	  } else if (type_ === 2) {
	    return gl.UNSIGNED_SHORT_4_4_4_4;
	  } else {
	    return gl.UNSIGNED_SHORT_5_5_5_1;
	  }
	}


	/* No side effect */

	function getWrapSsSize() {
	  return 1;
	}

	function getWrapTsSize() {
	  return 1;
	}

	function getMagFiltersSize() {
	  return 1;
	}

	function getMinFiltersSize() {
	  return 1;
	}

	function getFormatsSize() {
	  return 1;
	}

	function getTypesSize() {
	  return 1;
	}

	function getIsNeedUpdatesSize() {
	  return 1;
	}

	function getFlipYsSize() {
	  return 1;
	}

	function getWidthsSize() {
	  return 1;
	}

	function getHeightsSize() {
	  return 1;
	}


	/* No side effect */

	function _getBasicSourceTotalByteLength(basicSourceTextureCount) {
	  return imul(basicSourceTextureCount, imul(Uint8Array.BYTES_PER_ELEMENT, ((((((getWrapSsSize(/* () */0) + getWrapTsSize(/* () */0) | 0) + getMagFiltersSize(/* () */0) | 0) + getMinFiltersSize(/* () */0) | 0) + getFormatsSize(/* () */0) | 0) + getTypesSize(/* () */0) | 0) + getIsNeedUpdatesSize(/* () */0) | 0) + getFlipYsSize(/* () */0) | 0));
	}

	function getBasicSourceTextureOffset() {
	  return 0;
	}

	var getArrayBufferViewSourceTextureOffset = _getBasicSourceTotalByteLength;

	function getNeedUpdate() {
	  return /* NeedUpdate */1;
	}

	function getNotNeedUpdate() {
	  return /* Not_needUpdate */0;
	}

	function getDefaultIsNeedUpdate$1() {
	  return /* NeedUpdate */1;
	}

	function getFlipY() {
	  return /* Flipy */1;
	}

	function getIsNeedUpdateIndex$1(index) {
	  return imul(index, getIsNeedUpdatesSize(/* () */0));
	}


	/* Worker-Wonderjs Not a pure module */

	function getWrapSsLength(basicSourceTextureCount) {
	  return imul(basicSourceTextureCount, getWrapSsSize(/* () */0));
	}

	function getWrapSsOffset() {
	  return getBasicSourceTextureOffset(/* () */0) + 0 | 0;
	}

	function getWrapSIndex(index) {
	  return imul(index, getWrapSsSize(/* () */0));
	}

	function getWrapTsLength(basicSourceTextureCount) {
	  return imul(basicSourceTextureCount, getWrapTsSize(/* () */0));
	}

	function getWrapTsOffset(basicSourceTextureCount) {
	  return (getBasicSourceTextureOffset(/* () */0) + 0 | 0) + imul(imul(basicSourceTextureCount, getWrapSsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getWrapTIndex(index) {
	  return imul(index, getWrapTsSize(/* () */0));
	}

	function getMagFiltersLength(basicSourceTextureCount) {
	  return imul(basicSourceTextureCount, getMagFiltersSize(/* () */0));
	}

	function getMagFiltersOffset(basicSourceTextureCount) {
	  return getWrapTsOffset(basicSourceTextureCount) + imul(imul(basicSourceTextureCount, getWrapTsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getMagFilterIndex(index) {
	  return imul(index, getMagFiltersSize(/* () */0));
	}

	function getMinFiltersLength(basicSourceTextureCount) {
	  return imul(basicSourceTextureCount, getMinFiltersSize(/* () */0));
	}

	function getMinFiltersOffset(basicSourceTextureCount) {
	  return getMagFiltersOffset(basicSourceTextureCount) + imul(imul(basicSourceTextureCount, getMagFiltersSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getMinFilterIndex(index) {
	  return imul(index, getMinFiltersSize(/* () */0));
	}

	function getFormatsLength(basicSourceTextureCount) {
	  return imul(basicSourceTextureCount, getFormatsSize(/* () */0));
	}

	function getFormatsOffset(basicSourceTextureCount) {
	  return getMinFiltersOffset(basicSourceTextureCount) + imul(imul(basicSourceTextureCount, getMinFiltersSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getFormatIndex(index) {
	  return imul(index, getFormatsSize(/* () */0));
	}

	function getTypesLength(basicSourceTextureCount) {
	  return imul(basicSourceTextureCount, getTypesSize(/* () */0));
	}

	function getTypesOffset(basicSourceTextureCount) {
	  return getFormatsOffset(basicSourceTextureCount) + imul(imul(basicSourceTextureCount, getFormatsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getTypeIndex(index) {
	  return imul(index, getTypesSize(/* () */0));
	}

	function getIsNeedUpdatesLength(basicSourceTextureCount) {
	  return imul(basicSourceTextureCount, getIsNeedUpdatesSize(/* () */0));
	}

	function getIsNeedUpdatesOffset(basicSourceTextureCount) {
	  return getTypesOffset(basicSourceTextureCount) + imul(imul(basicSourceTextureCount, getTypesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getFlipYsLength(basicSourceTextureCount) {
	  return imul(basicSourceTextureCount, getFlipYsSize(/* () */0));
	}

	function getFlipYsOffset(basicSourceTextureCount) {
	  return getIsNeedUpdatesOffset(basicSourceTextureCount) + imul(imul(basicSourceTextureCount, getIsNeedUpdatesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getFlipYIndex(index) {
	  return imul(index, getFlipYsSize(/* () */0));
	}

	var getDefaultIsNeedUpdate = getDefaultIsNeedUpdate$1;

	var getIsNeedUpdateIndex = getIsNeedUpdateIndex$1;


	/* BufferSourceTextureService-Wonderjs Not a pure module */

	function createTypeArrays$2(buffer, basicSourceTextureCount) {
	  return /* tuple */[
	          new Uint8Array(buffer, getWrapSsOffset(basicSourceTextureCount), getWrapSsLength(basicSourceTextureCount)),
	          new Uint8Array(buffer, getWrapTsOffset(basicSourceTextureCount), getWrapTsLength(basicSourceTextureCount)),
	          new Uint8Array(buffer, getMagFiltersOffset(basicSourceTextureCount), getMagFiltersLength(basicSourceTextureCount)),
	          new Uint8Array(buffer, getMinFiltersOffset(basicSourceTextureCount), getMinFiltersLength(basicSourceTextureCount)),
	          new Uint8Array(buffer, getFormatsOffset(basicSourceTextureCount), getFormatsLength(basicSourceTextureCount)),
	          new Uint8Array(buffer, getTypesOffset(basicSourceTextureCount), getTypesLength(basicSourceTextureCount)),
	          new Uint8Array(buffer, getIsNeedUpdatesOffset(basicSourceTextureCount), getIsNeedUpdatesLength(basicSourceTextureCount)),
	          new Uint8Array(buffer, getFlipYsOffset(basicSourceTextureCount), getFlipYsLength(basicSourceTextureCount))
	        ];
	}


	/* BufferBasicSourceTextureService-Wonderjs Not a pure module */

	function getRecord$7(param) {
	  return unsafeGet$1(param[/* basicSourceTextureRecord */15]);
	}


	/* OptionService-Wonderjs Not a pure module */

	var getSource$3 = get$3;

	var addSource = set$1;


	/* No side effect */

	function getWrapS(index, typeArr) {
	  return getUint8_1(getWrapSIndex(index), typeArr);
	}

	function getWrapT(index, typeArr) {
	  return getUint8_1(getWrapTIndex(index), typeArr);
	}

	function getMagFilter(index, typeArr) {
	  return getUint8_1(getMagFilterIndex(index), typeArr);
	}

	function getMinFilter(index, typeArr) {
	  return getUint8_1(getMinFilterIndex(index), typeArr);
	}

	function getIsNeedUpdate(index, typeArr) {
	  return getUint8_1(getIsNeedUpdateIndex(index), typeArr);
	}

	function isFlipY(index, typeArr) {
	  return getUint8_1(getFlipYIndex(index), typeArr) === getFlipY(/* () */0);
	}

	function getFormat(index, typeArr) {
	  return getUint8_1(getFormatIndex(index), typeArr);
	}

	function getType$1(index, typeArr) {
	  return getUint8_1(getTypeIndex(index), typeArr);
	}


	/* TypeArrayService-Wonderjs Not a pure module */

	function _addSource(texture, imageBitmap, state) {
	  var match = getRecord$7(state);
	  addSource(texture, imageBitmap, match[/* sourceMap */8]);
	  return state;
	}

	function _getFlipYFunc(texture, state) {
	  var match = getRecord$7(state);
	  return isFlipY(texture, unsafeGet$1(match[/* flipYs */7]));
	}

	function _convertImageArrayBufferDataToImageBitmapStream(imageArrayBufferIndexSizeDataArr, state) {
	  return flatMap((function (param) {
	                var texture = param[3];
	                return map$2((function (imageBitmap) {
	                              return _addSource(texture, imageBitmap, state);
	                            }), fromPromise(createImageBitmapFromImageData(/* tuple */[
	                                    param[0],
	                                    param[1],
	                                    param[2]
	                                  ], (function (param) {
	                                      return _getFlipYFunc(texture, param);
	                                    }), state)));
	              }), from(imageArrayBufferIndexSizeDataArr));
	}

	var addSourceFromImageDataStream = _convertImageArrayBufferDataToImageBitmapStream;


	/* most Not a pure module */

	function getWrapSsLength$1(arrayBufferViewSourceTextureCount) {
	  return imul(arrayBufferViewSourceTextureCount, getWrapSsSize(/* () */0));
	}

	function getWrapSsOffset$1(basicSourceTextureCount, _) {
	  return getArrayBufferViewSourceTextureOffset(basicSourceTextureCount) + 0 | 0;
	}

	function getWrapSIndex$1(index) {
	  return imul(index, getWrapSsSize(/* () */0));
	}

	function getWrapTsLength$1(arrayBufferViewSourceTextureCount) {
	  return imul(arrayBufferViewSourceTextureCount, getWrapTsSize(/* () */0));
	}

	function getWrapTsOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
	  return (getArrayBufferViewSourceTextureOffset(basicSourceTextureCount) + 0 | 0) + imul(imul(arrayBufferViewSourceTextureCount, getWrapSsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getWrapTIndex$1(index) {
	  return imul(index, getWrapTsSize(/* () */0));
	}

	function getMagFiltersLength$1(arrayBufferViewSourceTextureCount) {
	  return imul(arrayBufferViewSourceTextureCount, getMagFiltersSize(/* () */0));
	}

	function getMagFiltersOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
	  return getWrapTsOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + imul(imul(arrayBufferViewSourceTextureCount, getWrapTsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getMagFilterIndex$1(index) {
	  return imul(index, getMagFiltersSize(/* () */0));
	}

	function getMinFiltersLength$1(arrayBufferViewSourceTextureCount) {
	  return imul(arrayBufferViewSourceTextureCount, getMinFiltersSize(/* () */0));
	}

	function getMinFiltersOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
	  return getMagFiltersOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + imul(imul(arrayBufferViewSourceTextureCount, getMagFiltersSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getMinFilterIndex$1(index) {
	  return imul(index, getMinFiltersSize(/* () */0));
	}

	function getFormatsLength$1(arrayBufferViewSourceTextureCount) {
	  return imul(arrayBufferViewSourceTextureCount, getFormatsSize(/* () */0));
	}

	function getFormatsOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
	  return getMinFiltersOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + imul(imul(arrayBufferViewSourceTextureCount, getMinFiltersSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getFormatIndex$1(index) {
	  return imul(index, getFormatsSize(/* () */0));
	}

	function getTypesLength$1(arrayBufferViewSourceTextureCount) {
	  return imul(arrayBufferViewSourceTextureCount, getTypesSize(/* () */0));
	}

	function getTypesOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
	  return getFormatsOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + imul(imul(arrayBufferViewSourceTextureCount, getFormatsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getTypeIndex$1(index) {
	  return imul(index, getTypesSize(/* () */0));
	}

	function getIsNeedUpdatesLength$1(arrayBufferViewSourceTextureCount) {
	  return imul(arrayBufferViewSourceTextureCount, getIsNeedUpdatesSize(/* () */0));
	}

	function getIsNeedUpdatesOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
	  return getTypesOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + imul(imul(arrayBufferViewSourceTextureCount, getTypesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getFlipYsLength$1(arrayBufferViewSourceTextureCount) {
	  return imul(arrayBufferViewSourceTextureCount, getFlipYsSize(/* () */0));
	}

	function getFlipYsOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
	  return getIsNeedUpdatesOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + imul(imul(arrayBufferViewSourceTextureCount, getIsNeedUpdatesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getFlipYIndex$1(index) {
	  return imul(index, getFlipYsSize(/* () */0));
	}

	function getWidthsLength(arrayBufferViewSourceTextureCount) {
	  return imul(arrayBufferViewSourceTextureCount, getWidthsSize(/* () */0));
	}

	function getWidthsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
	  return getFlipYsOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + imul(imul(arrayBufferViewSourceTextureCount, getFlipYsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getWidthIndex(index) {
	  return imul(index, getWidthsSize(/* () */0));
	}

	function getHeightsLength(arrayBufferViewSourceTextureCount) {
	  return imul(arrayBufferViewSourceTextureCount, getHeightsSize(/* () */0));
	}

	function getHeightsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
	  return getWidthsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + imul(imul(arrayBufferViewSourceTextureCount, getWidthsSize(/* () */0)), Uint16Array.BYTES_PER_ELEMENT) | 0;
	}

	function getHeightIndex(index) {
	  return imul(index, getHeightsSize(/* () */0));
	}

	var getDefaultIsNeedUpdate$2 = getDefaultIsNeedUpdate$1;

	var getIsNeedUpdateIndex$2 = getIsNeedUpdateIndex$1;


	/* BufferSourceTextureService-Wonderjs Not a pure module */

	function createTypeArrays$3(buffer, basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
	  return /* tuple */[
	          new Uint8Array(buffer, getWrapSsOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount), getWrapSsLength$1(arrayBufferViewSourceTextureCount)),
	          new Uint8Array(buffer, getWrapTsOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount), getWrapTsLength$1(arrayBufferViewSourceTextureCount)),
	          new Uint8Array(buffer, getMagFiltersOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount), getMagFiltersLength$1(arrayBufferViewSourceTextureCount)),
	          new Uint8Array(buffer, getMinFiltersOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount), getMinFiltersLength$1(arrayBufferViewSourceTextureCount)),
	          new Uint8Array(buffer, getFormatsOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount), getFormatsLength$1(arrayBufferViewSourceTextureCount)),
	          new Uint8Array(buffer, getTypesOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount), getTypesLength$1(arrayBufferViewSourceTextureCount)),
	          new Uint8Array(buffer, getIsNeedUpdatesOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount), getIsNeedUpdatesLength$1(arrayBufferViewSourceTextureCount)),
	          new Uint8Array(buffer, getFlipYsOffset$1(basicSourceTextureCount, arrayBufferViewSourceTextureCount), getFlipYsLength$1(arrayBufferViewSourceTextureCount)),
	          new Uint16Array(buffer, getWidthsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount), getWidthsLength(arrayBufferViewSourceTextureCount)),
	          new Uint16Array(buffer, getHeightsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount), getHeightsLength(arrayBufferViewSourceTextureCount))
	        ];
	}


	/* BufferArrayBufferViewSourceTextureService-Wonderjs Not a pure module */

	function getRecord$8(param) {
	  return unsafeGet$1(param[/* arrayBufferViewSourceTextureRecord */16]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function setSourceMap(sourceMap, state) {
	  var record = getRecord$8(state);
	  var newrecord = caml_array_dup(state);
	  newrecord[/* arrayBufferViewSourceTextureRecord */16] = /* record */[
	    /* wrapSs */record[/* wrapSs */0],
	    /* wrapTs */record[/* wrapTs */1],
	    /* magFilters */record[/* magFilters */2],
	    /* minFilters */record[/* minFilters */3],
	    /* formats */record[/* formats */4],
	    /* types */record[/* types */5],
	    /* isNeedUpdates */record[/* isNeedUpdates */6],
	    /* flipYs */record[/* flipYs */7],
	    /* widths */record[/* widths */8],
	    /* heights */record[/* heights */9],
	    /* sourceMap */sourceMap,
	    /* glTextureMap */record[/* glTextureMap */11],
	    /* bindTextureUnitCacheMap */record[/* bindTextureUnitCacheMap */12]
	  ];
	  return newrecord;
	}

	function addSourceArray(sourceArray, state) {
	  var record = getRecord$8(state);
	  var sourceMap = unsafeGet$1(record[/* sourceMap */10]);
	  reduceOneParam((function (sourceMap, param) {
	          return addSource(param[0], param[1], sourceMap);
	        }), sourceMap, sourceArray);
	  var newrecord = caml_array_dup(state);
	  newrecord[/* arrayBufferViewSourceTextureRecord */16] = /* record */[
	    /* wrapSs */record[/* wrapSs */0],
	    /* wrapTs */record[/* wrapTs */1],
	    /* magFilters */record[/* magFilters */2],
	    /* minFilters */record[/* minFilters */3],
	    /* formats */record[/* formats */4],
	    /* types */record[/* types */5],
	    /* isNeedUpdates */record[/* isNeedUpdates */6],
	    /* flipYs */record[/* flipYs */7],
	    /* widths */record[/* widths */8],
	    /* heights */record[/* heights */9],
	    /* sourceMap */sourceMap,
	    /* glTextureMap */record[/* glTextureMap */11],
	    /* bindTextureUnitCacheMap */record[/* bindTextureUnitCacheMap */12]
	  ];
	  return newrecord;
	}


	/* OptionService-Wonderjs Not a pure module */

	function _createTypeArrays(buffer, basicSourceTextureCount, arrayBufferViewSourceTextureCount, state) {
	  var match = createTypeArrays$2(buffer, basicSourceTextureCount);
	  state[/* basicSourceTextureRecord */15] = /* record */[
	    /* wrapSs */some$1(match[0]),
	    /* wrapTs */some$1(match[1]),
	    /* magFilters */some$1(match[2]),
	    /* minFilters */some$1(match[3]),
	    /* formats */some$1(match[4]),
	    /* types */some$1(match[5]),
	    /* isNeedUpdates */some$1(match[6]),
	    /* flipYs */some$1(match[7]),
	    /* sourceMap */createEmpty$2(/* () */0),
	    /* glTextureMap */createEmpty$2(/* () */0),
	    /* bindTextureUnitCacheMap */createEmpty$2(/* () */0)
	  ];
	  var match$1 = createTypeArrays$3(buffer, basicSourceTextureCount, arrayBufferViewSourceTextureCount);
	  state[/* arrayBufferViewSourceTextureRecord */16] = /* record */[
	    /* wrapSs */some$1(match$1[0]),
	    /* wrapTs */some$1(match$1[1]),
	    /* magFilters */some$1(match$1[2]),
	    /* minFilters */some$1(match$1[3]),
	    /* formats */some$1(match$1[4]),
	    /* types */some$1(match$1[5]),
	    /* isNeedUpdates */some$1(match$1[6]),
	    /* flipYs */some$1(match$1[7]),
	    /* widths */some$1(match$1[8]),
	    /* heights */some$1(match$1[9]),
	    /* sourceMap */undefined,
	    /* glTextureMap */createEmpty$2(/* () */0),
	    /* bindTextureUnitCacheMap */createEmpty$2(/* () */0)
	  ];
	  return state;
	}

	function _buildCreateTypeArraysStream(e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var settingRecord = state[/* settingRecord */1];
	                var data = getRecord$1(e);
	                var textureData = data.textureData;
	                var basicSourceTextureCount = unsafeGetBasicSourceTextureCount(settingRecord);
	                var arrayBufferViewSourceTextureCount = unsafeGetArrayBufferViewSourceTextureCount(settingRecord);
	                return setState$1(stateData, _createTypeArrays(textureData.buffer, basicSourceTextureCount, arrayBufferViewSourceTextureCount, state));
	              }));
	}

	function _buildAddArrayBufferViewSourceStream(e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var textureData = data.textureData;
	                var sourceMap = textureData.arrayBufferViewSourceTextureData.sourceMap;
	                return setState$1(stateData, setSourceMap(sourceMap, state));
	              }));
	}

	function _buildInitTextureStream(e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var textureData = data.textureData;
	                var basicSourceTextureRecord = getRecord$7(state);
	                var arrayBufferViewSourceTextureRecord = getRecord$8(state);
	                state[/* basicSourceTextureRecord */15] = /* record */[
	                  /* wrapSs */basicSourceTextureRecord[/* wrapSs */0],
	                  /* wrapTs */basicSourceTextureRecord[/* wrapTs */1],
	                  /* magFilters */basicSourceTextureRecord[/* magFilters */2],
	                  /* minFilters */basicSourceTextureRecord[/* minFilters */3],
	                  /* formats */basicSourceTextureRecord[/* formats */4],
	                  /* types */basicSourceTextureRecord[/* types */5],
	                  /* isNeedUpdates */basicSourceTextureRecord[/* isNeedUpdates */6],
	                  /* flipYs */basicSourceTextureRecord[/* flipYs */7],
	                  /* sourceMap */basicSourceTextureRecord[/* sourceMap */8],
	                  /* glTextureMap */initTextures(unsafeGetGl(state[/* deviceManagerRecord */4]), range$1(0, textureData.basicSourceTextureData.index - 1 | 0), basicSourceTextureRecord[/* glTextureMap */9]),
	                  /* bindTextureUnitCacheMap */basicSourceTextureRecord[/* bindTextureUnitCacheMap */10]
	                ];
	                state[/* arrayBufferViewSourceTextureRecord */16] = /* record */[
	                  /* wrapSs */arrayBufferViewSourceTextureRecord[/* wrapSs */0],
	                  /* wrapTs */arrayBufferViewSourceTextureRecord[/* wrapTs */1],
	                  /* magFilters */arrayBufferViewSourceTextureRecord[/* magFilters */2],
	                  /* minFilters */arrayBufferViewSourceTextureRecord[/* minFilters */3],
	                  /* formats */arrayBufferViewSourceTextureRecord[/* formats */4],
	                  /* types */arrayBufferViewSourceTextureRecord[/* types */5],
	                  /* isNeedUpdates */arrayBufferViewSourceTextureRecord[/* isNeedUpdates */6],
	                  /* flipYs */arrayBufferViewSourceTextureRecord[/* flipYs */7],
	                  /* widths */arrayBufferViewSourceTextureRecord[/* widths */8],
	                  /* heights */arrayBufferViewSourceTextureRecord[/* heights */9],
	                  /* sourceMap */arrayBufferViewSourceTextureRecord[/* sourceMap */10],
	                  /* glTextureMap */initTextures(unsafeGetGl(state[/* deviceManagerRecord */4]), range$1(0, textureData.arrayBufferViewSourceTextureData.index - 1 | 0), arrayBufferViewSourceTextureRecord[/* glTextureMap */11]),
	                  /* bindTextureUnitCacheMap */arrayBufferViewSourceTextureRecord[/* bindTextureUnitCacheMap */12]
	                ];
	                return state;
	              }));
	}

	function execJob$21(_, e, stateData) {
	  var state = unsafeGetState$1(stateData);
	  var data = getRecord$1(e);
	  var textureData = data.textureData;
	  return fromPromise(observe((function (state) {
	                      setState$1(stateData, state);
	                      return /* () */0;
	                    }), concatArray(/* array */[
	                        _buildCreateTypeArraysStream(e, stateData),
	                        addSourceFromImageDataStream(textureData.basicSourceTextureData.needAddedImageDataArray, state),
	                        _buildAddArrayBufferViewSourceStream(e, stateData),
	                        _buildInitTextureStream(e, stateData)
	                      ])).then((function () {
	                    return Promise.resolve(e);
	                  })));
	}


	/* most Not a pure module */

	function isRender(data) {
	  requireCheck((function () {
	          return test(buildAssertMessage("data##renderData exist", "not"), (function () {
	                        return assertNullableExist(data.renderData);
	                      }));
	        }), getIsDebug(stateData));
	  return data.renderData.isRender === true;
	}


	/* Log-WonderLog Not a pure module */

	function _compileShader$1(gl, glslSource, shader) {
	  gl.shaderSource(shader, glslSource);
	  gl.compileShader(shader);
	  debugWithFunc((function () {
	          var match = gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false;
	          if (match) {
	            var message = gl.getShaderInfoLog(shader);
	            var partial_arg = "" + (String(message) + "");
	            debug((function (param) {
	                    return buildDebugMessage("shader info log", partial_arg, param);
	                  }), getIsDebug(stateData));
	            var partial_arg$1 = "" + (String(glslSource) + "");
	            return debug((function (param) {
	                          return buildDebugMessage("glsl source", partial_arg$1, param);
	                        }), getIsDebug(stateData));
	          } else {
	            return /* () */0;
	          }
	        }), getIsDebug(stateData));
	  return shader;
	}

	function _linkProgram$1(program, gl) {
	  gl.linkProgram(program);
	  debugWithFunc((function () {
	          var match = gl.getProgramParameter(program, gl.LINK_STATUS) === false;
	          if (match) {
	            var message = gl.getProgramInfoLog(program);
	            return fatal(buildFatalMessage("link program error", "" + (String(message) + ""), "", "", ""));
	          } else {
	            return /* () */0;
	          }
	        }), getIsDebug(stateData));
	  return /* () */0;
	}

	function initShader$1(vsSource, fsSource, gl, program) {
	  var vs = _compileShader$1(gl, vsSource, gl.createShader(gl.VERTEX_SHADER));
	  var fs = _compileShader$1(gl, fsSource, gl.createShader(gl.FRAGMENT_SHADER));
	  gl.attachShader(program, vs);
	  gl.attachShader(program, fs);
	  gl.bindAttribLocation(program, 0, "a_position");
	  _linkProgram$1(program, gl);
	  gl.deleteShader(vs);
	  gl.deleteShader(fs);
	  return program;
	}

	function unsafeGetProgram(shaderIndex, param) {
	  return ensureCheck((function (program) {
	                return test(buildAssertMessage("program exist", "not"), (function () {
	                              return assertNullableExist(program);
	                            }));
	              }), getIsDebug(stateData), unsafeGet$2(shaderIndex, param[/* programMap */0]));
	}

	function registerProgram(shaderIndex, param, program) {
	  set$1(shaderIndex, program, param[/* programMap */0]);
	  return program;
	}


	/* Log-WonderLog Not a pure module */

	function drawElement(param, gl) {
	  gl.drawElements(param[0], param[3], param[1], 0);
	  return /* () */0;
	}

	function drawElementsInstancedANGLE(param, extension) {
	  extension.drawElementsInstancedANGLE(param[0], param[3], param[1], 0, param[4]);
	  return /* () */0;
	}


	/* No side effect */

	function _getLocation$1(param, getGlLocationFunc, gl) {
	  var locationMap = param[2];
	  var name = param[1];
	  var match = get(name, locationMap);
	  if (match !== undefined) {
	    return valFromOption(match);
	  } else {
	    var pos = getGlLocationFunc(param[0], name, gl);
	    set(name, pos, locationMap);
	    return pos;
	  }
	}

	function _getGlAttribLocation(program, name, gl) {
	  return gl.getAttribLocation(program, name);
	}

	function _getGlUniformLocation(program, name, gl) {
	  return gl.getUniformLocation(program, name);
	}

	function getAttribLocation(program, name, attributeLocationMap, gl) {
	  return _getLocation$1(/* tuple */[
	              program,
	              name,
	              attributeLocationMap
	            ], _getGlAttribLocation, gl);
	}

	function getUniformLocation(program, name, uniformLocationMap, gl) {
	  return _getLocation$1(/* tuple */[
	              program,
	              name,
	              uniformLocationMap
	            ], _getGlUniformLocation, gl);
	}

	function getAttributeLocationMap(shaderIndex, glslLocationRecord) {
	  return get$3(shaderIndex, glslLocationRecord[/* attributeLocationMap */0]);
	}

	function setAttributeLocationMap(shaderIndex, attributeLocationMap, glslLocationRecord) {
	  set$1(shaderIndex, attributeLocationMap, glslLocationRecord[/* attributeLocationMap */0]);
	  return glslLocationRecord;
	}

	function getUniformLocationMap(shaderIndex, glslLocationRecord) {
	  return get$3(shaderIndex, glslLocationRecord[/* uniformLocationMap */1]);
	}

	function setUniformLocationMap(shaderIndex, uniformLocationMap, glslLocationRecord) {
	  set$1(shaderIndex, uniformLocationMap, glslLocationRecord[/* uniformLocationMap */1]);
	  return glslLocationRecord;
	}

	function isAttributeLocationExist(pos) {
	  return pos !== -1;
	}

	function isUniformLocationExist(pos) {
	  return pos !== null;
	}


	/* HashMapService-WonderCommonlib Not a pure module */

	function unsafeGetIndicesType$1(index, indicesTypeMap) {
	  return unsafeGet$1(get$3(index, indicesTypeMap));
	}


	/* OptionService-Wonderjs Not a pure module */

	function unsafeGetIndicesType(geometry, param) {
	  return unsafeGetIndicesType$1(geometry, param[/* geometryRecord */5][/* indicesTypeMap */9]);
	}

	function getIndexType(gl, geometry, state) {
	  var match = unsafeGetIndicesType(geometry, state);
	  if (match) {
	    return gl.UNSIGNED_INT;
	  } else {
	    return gl.UNSIGNED_SHORT;
	  }
	}

	function getIndexTypeSize(_, geometry, state) {
	  var match = unsafeGetIndicesType(geometry, state);
	  if (match) {
	    return Uint32Array.BYTES_PER_ELEMENT;
	  } else {
	    return Uint16Array.BYTES_PER_ELEMENT;
	  }
	}


	/* IndicesTypeGeometryType-Wonderjs Not a pure module */

	function use(gl, program, state) {
	  var programRecord = state[/* programRecord */4];
	  var match = programRecord[/* lastUsedProgram */1];
	  var exit = 0;
	  if (match !== undefined && program === valFromOption(match)) {
	    return state;
	  } else {
	    exit = 1;
	  }
	  if (exit === 1) {
	    programRecord[/* lastUsedProgram */1] = some$1(program);
	    gl.useProgram(program);
	    return state;
	  }
	  
	}


	/* No side effect */

	function getOrCreateBuffer$1(gl, param, param$1, state) {
	  var bufferMap = param[1];
	  var geometryIndex = param[0];
	  var match = get$3(geometryIndex, bufferMap);
	  if (match !== undefined) {
	    return valFromOption(match);
	  } else {
	    var buffer = param$1[0](gl, param$1[1](geometryIndex, state), state);
	    set$1(geometryIndex, buffer, bufferMap);
	    return buffer;
	  }
	}

	function getOrCreateIndexBuffer(gl, param, createBufferFunc, state) {
	  var bufferMap = param[1];
	  var geometryIndex = param[0];
	  var match = get$3(geometryIndex, bufferMap);
	  if (match !== undefined) {
	    return valFromOption(match);
	  } else {
	    var buffer = createBufferFunc(gl, param[2], state);
	    set$1(geometryIndex, buffer, bufferMap);
	    return buffer;
	  }
	}


	/* No side effect */

	function createBuffer$2(gl, record, state) {
	  var buffer = getArrayBuffer(gl, state[/* vboBufferRecord */1]);
	  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	  gl.bufferData(gl.ARRAY_BUFFER, record, gl.STATIC_DRAW);
	  gl.bindBuffer(gl.ARRAY_BUFFER, null);
	  return buffer;
	}

	function getOrCreateBuffer(gl, param, getDataFunc, state) {
	  return getOrCreateBuffer$1(gl, /* tuple */[
	              param[0],
	              param[1]
	            ], /* tuple */[
	              createBuffer$2,
	              getDataFunc
	            ], state);
	}


	/* PoolVboBufferService-Wonderjs Not a pure module */

	function getDrawModesLength(meshRendererCount) {
	  return (meshRendererCount << 0);
	}

	function getDrawModesOffset() {
	  return 0;
	}

	function getIsRendersLength(meshRendererCount) {
	  return (meshRendererCount << 0);
	}

	function getIsRendersOffset(meshRendererCount) {
	  return 0 + imul((meshRendererCount << 0), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getDrawModeIndex(index) {
	  return (index << 0);
	}


	/* Worker-Wonderjs Not a pure module */

	function getDrawMode(index, typeArr) {
	  return getUint8_1(getDrawModeIndex(index), typeArr);
	}


	/* TypeArrayService-Wonderjs Not a pure module */

	function getGlDrawMode(gl, meshRenderer, state) {
	  var match = getDrawMode(meshRenderer, state[/* meshRendererRecord */9][/* drawModes */0]);
	  switch (match) {
	    case 0 : 
	        return gl.POINTS;
	    case 1 : 
	        return gl.LINES;
	    case 2 : 
	        return gl.LINE_LOOP;
	    case 3 : 
	        return gl.LINE_STRIP;
	    case 4 : 
	        return gl.TRIANGLES;
	    case 5 : 
	        return gl.TRIANGLE_STRIP;
	    case 6 : 
	        return gl.TRIANGLE_FAN;
	    
	  }
	}


	/* OperateTypeArrayMeshRendererService-Wonderjs Not a pure module */

	function create16Buffer(gl, data, state) {
	  var buffer = getElementArrayBuffer(gl, state[/* vboBufferRecord */1]);
	  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
	  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
	  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	  return buffer;
	}

	function create32Buffer(gl, data, state) {
	  var buffer = getElementArrayBuffer(gl, state[/* vboBufferRecord */1]);
	  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
	  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
	  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	  return buffer;
	}

	function getOrCreate16Buffer(gl, param, indices, state) {
	  return getOrCreateIndexBuffer(gl, /* tuple */[
	              param[0],
	              param[1],
	              indices
	            ], create16Buffer, state);
	}

	function getOrCreate32Buffer(gl, param, indices, state) {
	  return getOrCreateIndexBuffer(gl, /* tuple */[
	              param[0],
	              param[1],
	              indices
	            ], create32Buffer, state);
	}


	/* PoolVboBufferService-Wonderjs Not a pure module */

	function getVertexLength(geometryPointCount) {
	  return imul(geometryPointCount, 3);
	}

	function getTexCoordsLength(geometryPointCount) {
	  return (geometryPointCount << 1);
	}

	function getVerticesOffset() {
	  return 0;
	}

	function getTexCoordsOffset(geometryPointCount) {
	  return 0 + imul(imul(geometryPointCount, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getNormalsOffset(geometryPointCount) {
	  return getTexCoordsOffset(geometryPointCount) + imul((geometryPointCount << 1), Float32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getIndicesLength(geometryPointCount) {
	  return (geometryPointCount << 0);
	}

	function getIndicesOffset(geometryPointCount) {
	  return getNormalsOffset(geometryPointCount) + imul(imul(geometryPointCount, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getIndices32Length(geometryPointCount) {
	  return (geometryPointCount << 0);
	}

	function getIndices32Offset(geometryPointCount) {
	  return getIndicesOffset(geometryPointCount) + imul((geometryPointCount << 0), Uint16Array.BYTES_PER_ELEMENT) | 0;
	}

	function getVerticesInfosLength(geometryCount) {
	  return (geometryCount << 1);
	}

	function getVerticesInfosOffset(geometryPointCount) {
	  return getIndices32Offset(geometryPointCount) + imul((geometryPointCount << 0), Uint32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getTexCoordsInfosLength(geometryCount) {
	  return (geometryCount << 1);
	}

	function getTexCoordsInfosOffset(geometryPointCount, geometryCount) {
	  return getVerticesInfosOffset(geometryPointCount) + imul((geometryCount << 1), Uint32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getNormalsInfosLength(geometryCount) {
	  return (geometryCount << 1);
	}

	function getNormalsInfosOffset(geometryPointCount, geometryCount) {
	  return getTexCoordsInfosOffset(geometryPointCount, geometryCount) + imul((geometryCount << 1), Uint32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getIndicesInfosLength(geometryCount) {
	  return (geometryCount << 1);
	}

	function getIndicesInfosOffset(geometryPointCount, geometryCount) {
	  return getNormalsInfosOffset(geometryPointCount, geometryCount) + imul((geometryCount << 1), Uint32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getInfoIndex(index) {
	  return (index << 1);
	}


	/* Worker-Wonderjs Not a pure module */

	function getInfo(infoIndex, infos) {
	  return ensureCheck((function (param) {
	                var endIndex = param[1];
	                var startIndex = param[0];
	                test(buildAssertMessage("has info data", "not"), (function () {
	                        assertNullableExist(startIndex);
	                        return assertNullableExist(endIndex);
	                      }));
	                return test(buildAssertMessage("endIndex >= startIndex", "is " + (String(endIndex) + "")), (function () {
	                              return Operators[/* >= */7](endIndex, startIndex);
	                            }));
	              }), getIsDebug(stateData), /* tuple */[
	              getUint32_1(infoIndex, infos),
	              getUint32_1(infoIndex + 1 | 0, infos)
	            ]);
	}

	function hasPointData(infoIndex, infos) {
	  var match = getInfo(infoIndex, infos);
	  return match[1] > match[0];
	}

	function getFloat32PointData(infoIndex, points, infos) {
	  var match = getInfo(infoIndex, infos);
	  return getFloat32ArraySubarray(points, match[0], match[1]);
	}

	function getUint16PointData(infoIndex, points, infos) {
	  var match = getInfo(infoIndex, infos);
	  return getUint16ArraySubarray(points, match[0], match[1]);
	}

	function getUint32PointData(infoIndex, points, infos) {
	  var match = getInfo(infoIndex, infos);
	  return getUint32ArraySubarray(points, match[0], match[1]);
	}


	/* Log-WonderLog Not a pure module */

	function getIndices(index, param) {
	  var geometryRecord = param[/* geometryRecord */5];
	  return getUint16PointData(getInfoIndex(index), geometryRecord[/* indices */3], geometryRecord[/* indicesInfos */8]);
	}

	function getIndices32(index, param) {
	  var geometryRecord = param[/* geometryRecord */5];
	  return getUint32PointData(getInfoIndex(index), geometryRecord[/* indices32 */4], geometryRecord[/* indicesInfos */8]);
	}

	function getIndicesCount(index, param) {
	  var match = getInfo(getInfoIndex(index), param[/* geometryRecord */5][/* indicesInfos */8]);
	  return match[1] - match[0] | 0;
	}


	/* BufferGeometryService-Wonderjs Not a pure module */

	function hasNormals$1(index, normalsInfos) {
	  return hasPointData(getInfoIndex(index), normalsInfos);
	}


	/* BufferGeometryService-Wonderjs Not a pure module */

	function hasNormals(geometry, geometryRecord) {
	  return hasNormals$1(geometry, geometryRecord[/* normalsInfos */7]);
	}


	/* HasNormalsService-Wonderjs Not a pure module */

	function _getPosition(vertices, vIndex) {
	  return /* tuple */[
	          vertices[vIndex],
	          vertices[vIndex + 1 | 0],
	          vertices[vIndex + 2 | 0]
	        ];
	}

	function _setNormal(param, vIndex, normals) {
	  normals[vIndex] = normals[vIndex] + param[0];
	  normals[vIndex + 1 | 0] = normals[vIndex + 1 | 0] + param[1];
	  normals[vIndex + 2 | 0] = normals[vIndex + 2 | 0] + param[2];
	  return normals;
	}

	function _normalizeNormals(normals) {
	  var len = normals.length;
	  var _index = 0;
	  var normals$1 = normals;
	  while(true) {
	    var index = _index;
	    var match = index >= len;
	    if (match) {
	      return normals$1;
	    } else {
	      var x = normals$1[index];
	      var y = normals$1[index + 1 | 0];
	      var z = normals$1[index + 2 | 0];
	      var d = Math.sqrt(x * x + y * y + z * z);
	      var match$1 = d === 0;
	      if (match$1) {
	        normals$1[index] = 0;
	        normals$1[index + 1 | 0] = 0;
	        normals$1[index + 2 | 0] = 0;
	      } else {
	        normals$1[index] = x / d;
	        normals$1[index + 1 | 0] = y / d;
	        normals$1[index + 2 | 0] = z / d;
	      }
	      _index = index + 3 | 0;
	      continue ;
	    }
	  }
	}

	function computeVertexNormalsByIndices(vertices, indices) {
	  var indicesLen = indices.length;
	  var _compute = function (_index, _normals) {
	    while(true) {
	      var normals = _normals;
	      var index = _index;
	      var match = index >= indicesLen;
	      if (match) {
	        return normals;
	      } else {
	        var va = imul(indices[index], 3);
	        var vb = imul(indices[index + 1 | 0], 3);
	        var vc = imul(indices[index + 2 | 0], 3);
	        var pa = _getPosition(vertices, va);
	        var pb = _getPosition(vertices, vb);
	        var pc = _getPosition(vertices, vc);
	        var v0 = sub$1(/* Float */0, pc, pb);
	        var v1 = sub$1(/* Float */0, pa, pb);
	        var faceNormalTuple = cross(v0, v1);
	        _normals = _setNormal(faceNormalTuple, vc, _setNormal(faceNormalTuple, vb, _setNormal(faceNormalTuple, va, normals)));
	        _index = index + 3 | 0;
	        continue ;
	      }
	    }
	  };
	  return _normalizeNormals(_compute(0, new Float32Array(vertices.length)));
	}

	function computeVertexNormalsByIndices32(vertices, indices32) {
	  var indicesLen = indices32.length;
	  var _compute = function (_index, _normals) {
	    while(true) {
	      var normals = _normals;
	      var index = _index;
	      var match = index >= indicesLen;
	      if (match) {
	        return normals;
	      } else {
	        var va = imul(indices32[index], 3);
	        var vb = imul(indices32[index + 1 | 0], 3);
	        var vc = imul(indices32[index + 2 | 0], 3);
	        var pa = _getPosition(vertices, va);
	        var pb = _getPosition(vertices, vb);
	        var pc = _getPosition(vertices, vc);
	        var v0 = sub$1(/* Float */0, pc, pb);
	        var v1 = sub$1(/* Float */0, pa, pb);
	        var faceNormalTuple = cross(v0, v1);
	        _normals = _setNormal(faceNormalTuple, vc, _setNormal(faceNormalTuple, vb, _setNormal(faceNormalTuple, va, normals)));
	        _index = index + 3 | 0;
	        continue ;
	      }
	    }
	  };
	  return _normalizeNormals(_compute(0, new Float32Array(vertices.length)));
	}


	/* No side effect */

	function getVertices(index, param) {
	  var geometryRecord = param[/* geometryRecord */5];
	  return getFloat32PointData(getInfoIndex(index), geometryRecord[/* vertices */0], geometryRecord[/* verticesInfos */5]);
	}


	/* BufferGeometryService-Wonderjs Not a pure module */

	function computeVertexNormals(index, state) {
	  var match = unsafeGetIndicesType(index, state);
	  if (match) {
	    return computeVertexNormalsByIndices32(getVertices(index, state), getIndices32(index, state));
	  } else {
	    return computeVertexNormalsByIndices(getVertices(index, state), getIndices(index, state));
	  }
	}


	/* GeometryRenderService-Wonderjs Not a pure module */

	function _getNormals(index, param) {
	  var geometryRecord = param[/* geometryRecord */5];
	  return getFloat32PointData(getInfoIndex(index), geometryRecord[/* normals */2], geometryRecord[/* normalsInfos */7]);
	}

	function getNormals(index, state) {
	  var match = hasNormals(index, state[/* geometryRecord */5]);
	  if (match) {
	    return _getNormals(index, state);
	  } else {
	    return computeVertexNormals(index, state);
	  }
	}


	/* BufferGeometryService-Wonderjs Not a pure module */

	function unsafeGetAttributeSendData(shaderIndex, glslSenderRecord) {
	  return ensureCheck((function (sendData) {
	                return test(buildAssertMessage("attribute send record exist", "not"), (function () {
	                              return assertNullableExist(sendData);
	                            }));
	              }), getIsDebug(stateData), unsafeGet$2(shaderIndex, glslSenderRecord[/* attributeSendDataMap */0]));
	}

	function unsafeGetInstanceAttributeSendData(shaderIndex, param) {
	  return ensureCheck((function (sendData) {
	                return test(buildAssertMessage("instance attribute send record exist", "not"), (function () {
	                              return assertNullableExist(sendData);
	                            }));
	              }), getIsDebug(stateData), unsafeGet$2(shaderIndex, param[/* instanceAttributeSendDataMap */1]));
	}


	/* Log-WonderLog Not a pure module */

	function getTexCoords(index, param) {
	  var geometryRecord = param[/* geometryRecord */5];
	  return getFloat32PointData(getInfoIndex(index), geometryRecord[/* texCoords */1], geometryRecord[/* texCoordsInfos */6]);
	}


	/* BufferGeometryService-Wonderjs Not a pure module */

	function getBufferSizeByType(type_) {
	  switch (type_) {
	    case "vec2" : 
	        return 2;
	    case "vec3" : 
	        return 3;
	    default:
	      return fatal(buildFatalMessage("getBufferSizeByType", "invalide type_: " + (String(type_) + ""), "", "", ""));
	  }
	}

	function enableVertexAttribArray(gl, pos, vertexAttribHistoryArray) {
	  var match = isNotEqual(pos, true, vertexAttribHistoryArray);
	  if (match) {
	    gl.enableVertexAttribArray(pos);
	    vertexAttribHistoryArray[pos] = true;
	    return /* () */0;
	  } else {
	    return /* () */0;
	  }
	}

	function sendMatrix3(gl, pos, data) {
	  gl.uniformMatrix3fv(pos, false, data);
	  return /* () */0;
	}

	function sendMatrix4(gl, pos, data) {
	  gl.uniformMatrix4fv(pos, false, data);
	  return /* () */0;
	}

	var getCacheMap = get$3;

	function _queryIsNotCacheWithCache(cache, x, y, z) {
	  var isNotCached = false;
	  if (cache[0] !== x) {
	    cache[0] = x;
	    isNotCached = true;
	  }
	  if (cache[1] !== y) {
	    cache[1] = y;
	    isNotCached = true;
	  }
	  if (cache[2] !== z) {
	    cache[2] = z;
	    isNotCached = true;
	  }
	  return isNotCached;
	}

	function _isNotCacheVector3AndSetCache(shaderCacheMap, name, param) {
	  var z = param[2];
	  var y = param[1];
	  var x = param[0];
	  var match = get(name, shaderCacheMap);
	  if (match !== undefined) {
	    return _queryIsNotCacheWithCache(match, x, y, z);
	  } else {
	    set(name, /* array */[
	          x,
	          y,
	          z
	        ], shaderCacheMap);
	    return true;
	  }
	}

	function _isNotCacheNumberAndSetCache(shaderCacheMap, name, value) {
	  var match = get(name, shaderCacheMap);
	  if (match !== undefined && valFromOption(match) === value) {
	    return false;
	  } else {
	    set(name, value, shaderCacheMap);
	    return true;
	  }
	}

	function sendFloat(gl, shaderCacheMap, param, value) {
	  if (_isNotCacheNumberAndSetCache(shaderCacheMap, param[0], value)) {
	    gl.uniform1f(param[1], value);
	    return /* () */0;
	  } else {
	    return /* () */0;
	  }
	}

	function sendInt(gl, shaderCacheMap, param, value) {
	  if (_isNotCacheNumberAndSetCache(shaderCacheMap, param[0], value)) {
	    gl.uniform1i(param[1], value);
	    return /* () */0;
	  } else {
	    return /* () */0;
	  }
	}

	function sendFloat3(gl, shaderCacheMap, param, valueArr) {
	  requireCheck((function () {
	          return test(buildAssertMessage("valueArr.length === 3", "not"), (function () {
	                        return Operators[/* = */0](valueArr.length, 3);
	                      }));
	        }), getIsDebug(stateData));
	  var x = caml_array_get(valueArr, 0);
	  var y = caml_array_get(valueArr, 1);
	  var z = caml_array_get(valueArr, 2);
	  if (_isNotCacheVector3AndSetCache(shaderCacheMap, param[0], /* tuple */[
	          x,
	          y,
	          z
	        ])) {
	    gl.uniform3f(param[1], x, y, z);
	    return /* () */0;
	  } else {
	    return /* () */0;
	  }
	}

	function sendVec3(gl, shaderCacheMap, param, dataTuple) {
	  if (_isNotCacheVector3AndSetCache(shaderCacheMap, param[0], dataTuple)) {
	    gl.uniform3f(param[1], dataTuple[0], dataTuple[1], dataTuple[2]);
	    return /* () */0;
	  } else {
	    return /* () */0;
	  }
	}


	/* Log-WonderLog Not a pure module */

	function getSendNoCachableDataByType(type_) {
	  switch (type_) {
	    case "mat3" : 
	        return sendMatrix3;
	    case "mat4" : 
	        return sendMatrix4;
	    default:
	      return fatal(buildFatalMessage("getSendNoCachableDataByType", "unknown type:" + (String(type_) + ""), "", "", ""));
	  }
	}

	function getSendCachableDataByType(type_) {
	  switch (type_) {
	    case "float" : 
	        return sendFloat;
	    case "float3" : 
	        return sendFloat3;
	    case "sampler2D" : 
	        return sendInt;
	    case "vec3" : 
	        return sendVec3;
	    default:
	      return fatal(buildFatalMessage("getSendCachableDataByType", "unknown type:" + (String(type_) + ""), "", "", ""));
	  }
	}


	/* Log-WonderLog Not a pure module */

	function unsafeGetUniformSendData$1(shaderIndex, map) {
	  return ensureCheck((function (sendData) {
	                return test(buildAssertMessage("uniform send record exist", "not"), (function () {
	                              return assertNullableExist(sendData);
	                            }));
	              }), getIsDebug(stateData), unsafeGet$2(shaderIndex, map));
	}


	/* Log-WonderLog Not a pure module */

	function addUniformSendDataByType(param, param$1, getDataFunc) {
	  return /* tuple */[
	          push(/* record */[
	                /* pos */param[0],
	                /* getDataFunc */getDataFunc,
	                /* sendDataFunc */getSendNoCachableDataByType(param[1])
	              ], param$1[0]),
	          param$1[1],
	          param$1[2],
	          param$1[3],
	          param$1[4],
	          param$1[5]
	        ];
	}

	function setToUniformSendMap(shaderIndex, uniformRenderObjectSendModelDataMap, renderObjectSendModelDataArr) {
	  set$1(shaderIndex, renderObjectSendModelDataArr, uniformRenderObjectSendModelDataMap);
	  return /* () */0;
	}

	function unsafeGetUniformSendData(shaderIndex, param) {
	  return unsafeGetUniformSendData$1(shaderIndex, param[/* uniformRenderObjectSendModelDataMap */3]);
	}


	/* ArrayService-Wonderjs Not a pure module */

	function addUniformSendDataByType$1(param, param$1, getDataFunc) {
	  return /* tuple */[
	          param$1[0],
	          push(/* record */[
	                /* shaderCacheMap */param[0],
	                /* name */param[1],
	                /* pos */param[2],
	                /* getDataFunc */getDataFunc,
	                /* sendDataFunc */getSendCachableDataByType(param[3])
	              ], param$1[1]),
	          param$1[2],
	          param$1[3],
	          param$1[4],
	          param$1[5]
	        ];
	}

	function addUniformTextureSendDataByType(param, param$1, getDataFunc) {
	  return /* tuple */[
	          param$1[0],
	          push(/* record */[
	                /* shaderCacheMap */param[0],
	                /* name */param[1],
	                /* pos */param[2],
	                /* getDataFunc */getDataFunc,
	                /* sendDataFunc */sendInt
	              ], param$1[1]),
	          param$1[2],
	          param$1[3],
	          param$1[4],
	          param$1[5]
	        ];
	}

	function setToUniformSendMap$1(shaderIndex, uniformRenderObjectSendMaterialDataMap, renderObjectSendMaterialDataArr) {
	  set$1(shaderIndex, renderObjectSendMaterialDataArr, uniformRenderObjectSendMaterialDataMap);
	  return /* () */0;
	}

	function unsafeGetUniformSendData$2(shaderIndex, glslSenderRecord) {
	  return unsafeGetUniformSendData$1(shaderIndex, glslSenderRecord[/* uniformRenderObjectSendMaterialDataMap */4]);
	}


	/* ArrayService-Wonderjs Not a pure module */

	function _getOrCreateBuffer(buffer, param, param$1, state) {
	  var match = param$1[1];
	  var match$1 = param$1[0];
	  var elementArrayBufferMap = match$1[3];
	  var geometryIndex = param[1];
	  var gl = param[0];
	  var exit = 0;
	  switch (buffer) {
	    case 0 : 
	        return getOrCreateBuffer(gl, /* tuple */[
	                    geometryIndex,
	                    match$1[0]
	                  ], match[0], state);
	    case 1 : 
	        return getOrCreateBuffer(gl, /* tuple */[
	                    geometryIndex,
	                    match$1[2]
	                  ], match[2], state);
	    case 2 : 
	        return getOrCreateBuffer(gl, /* tuple */[
	                    geometryIndex,
	                    match$1[1]
	                  ], match[1], state);
	    case 3 : 
	        var match$2 = unsafeGetIndicesType(geometryIndex, state);
	        if (match$2) {
	          return getOrCreate32Buffer(gl, /* tuple */[
	                      geometryIndex,
	                      elementArrayBufferMap
	                    ], match[4](geometryIndex, state), state);
	        } else {
	          return getOrCreate16Buffer(gl, /* tuple */[
	                      geometryIndex,
	                      elementArrayBufferMap
	                    ], match[3](geometryIndex, state), state);
	        }
	    case 4 : 
	    case 5 : 
	        exit = 1;
	        break;
	    
	  }
	  if (exit === 1) {
	    return fatal(buildFatalMessage("_sendAttributeData", "unknown buffer: " + (String(buffer) + ""), "", "", ""));
	  }
	  
	}

	function _directlySendAttributeData(gl, param, state) {
	  var vboBufferRecord = state[/* vboBufferRecord */1];
	  var currentGeometryBufferMapAndGetPointsFuncsTuple_000 = /* tuple */[
	    vboBufferRecord[/* geometryVertexBufferMap */0],
	    vboBufferRecord[/* geometryTexCoordBufferMap */1],
	    vboBufferRecord[/* geometryNormalBufferMap */2],
	    vboBufferRecord[/* geometryElementArrayBufferMap */3]
	  ];
	  var currentGeometryBufferMapAndGetPointsFuncsTuple_001 = /* tuple */[
	    getVertices,
	    getTexCoords,
	    getNormals,
	    getIndices,
	    getIndices32
	  ];
	  var currentGeometryBufferMapAndGetPointsFuncsTuple = /* tuple */[
	    currentGeometryBufferMapAndGetPointsFuncsTuple_000,
	    currentGeometryBufferMapAndGetPointsFuncsTuple_001
	  ];
	  var dataTuple_001 = param[1];
	  var dataTuple = /* tuple */[
	    gl,
	    dataTuple_001
	  ];
	  return reduceOneParam((function (state, param) {
	                var arrayBuffer = _getOrCreateBuffer(param[/* buffer */2], dataTuple, currentGeometryBufferMapAndGetPointsFuncsTuple, state);
	                return param[/* sendFunc */3](gl, /* tuple */[
	                            param[/* size */1],
	                            param[/* pos */0]
	                          ], arrayBuffer, state);
	              }), state, unsafeGetAttributeSendData(param[0], state[/* glslSenderRecord */3]));
	}

	var _sendAttributeData = _directlySendAttributeData;

	function _sendUniformRenderObjectModelData(gl, shaderIndex, transformIndex, state) {
	  return reduceOneParam((function (state, param) {
	                var pos = param[/* pos */0];
	                var match = isUniformLocationExist(pos);
	                if (match) {
	                  param[/* sendDataFunc */2](gl, pos, param[/* getDataFunc */1](transformIndex, state));
	                }
	                return state;
	              }), state, unsafeGetUniformSendData(shaderIndex, state[/* glslSenderRecord */3]));
	}

	function _sendUniformRenderObjectMaterialData(gl, shaderIndex, materialIndex, state) {
	  return reduceOneParam((function (state, param) {
	                param[/* sendDataFunc */4](gl, param[/* shaderCacheMap */0], /* tuple */[
	                      param[/* name */1],
	                      param[/* pos */2]
	                    ], param[/* getDataFunc */3](materialIndex, state));
	                return state;
	              }), state, unsafeGetUniformSendData$2(shaderIndex, state[/* glslSenderRecord */3]));
	}

	function render$3(gl, param, bindAndUpdateFunc, state) {
	  var shaderIndex = param[2];
	  var materialIndex = param[1];
	  var program = unsafeGetProgram(shaderIndex, state[/* programRecord */4]);
	  var state$1 = _sendUniformRenderObjectModelData(gl, shaderIndex, param[0], _sendAttributeData(gl, /* tuple */[
	            shaderIndex,
	            param[4]
	          ], use(gl, program, state)));
	  var record = state$1[/* glslSenderRecord */3];
	  var lastSendMaterialData = record[/* lastSendMaterialData */10];
	  var exit = 0;
	  if (lastSendMaterialData !== undefined) {
	    var match = lastSendMaterialData;
	    if (match[0] === materialIndex && match[1] === shaderIndex) {
	      return state$1;
	    } else {
	      exit = 1;
	    }
	  } else {
	    exit = 1;
	  }
	  if (exit === 1) {
	    record[/* lastSendMaterialData */10] = /* tuple */[
	      materialIndex,
	      shaderIndex
	    ];
	    var state$2 = _sendUniformRenderObjectMaterialData(gl, shaderIndex, materialIndex, state$1);
	    return bindAndUpdateFunc(gl, materialIndex, state$2);
	  }
	  
	}

	function draw$4(gl, meshRendererIndex, geometryIndex, state) {
	  return drawElement(/* tuple */[
	              getGlDrawMode(gl, meshRendererIndex, state),
	              getIndexType(gl, geometryIndex, state),
	              getIndexTypeSize(gl, geometryIndex, state),
	              getIndicesCount(geometryIndex, state)
	            ], gl);
	}


	/* Log-WonderLog Not a pure module */

	function getShaderIndicesLength(count) {
	  return (count << 0);
	}

	function getShaderIndicesOffset() {
	  return 0;
	}

	function getShaderIndex(index, typeArr) {
	  return getUint32_1((index << 0), typeArr);
	}

	function setShaderIndex(index, data, typeArr) {
	  return setUint32_1((index << 0), data, typeArr);
	}


	/* TypeArrayService-Wonderjs Not a pure module */

	var getTextureIndicesLength$1 = imul;

	function getTextureIndexIndex$1(index, textureIndex, textureCountPerMaterial) {
	  return imul(index, textureCountPerMaterial) + textureIndex | 0;
	}


	/* No side effect */

	function getColorsLength(basicMaterialCount) {
	  return imul(basicMaterialCount, 3);
	}

	function getColorsOffset(basicMaterialCount) {
	  return getShaderIndicesOffset(basicMaterialCount) + imul(getShaderIndicesLength(basicMaterialCount), Uint32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getColorIndex(index) {
	  return imul(index, 3);
	}

	function getTextureIndicesOffset(basicMaterialCount, _) {
	  return getColorsOffset(basicMaterialCount) + imul(imul(basicMaterialCount, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getMapUnitsLength(basicMaterialCount) {
	  return (basicMaterialCount << 0);
	}

	function getMapUnitsOffset(basicMaterialCount, textureCountPerMaterial) {
	  return getTextureIndicesOffset(basicMaterialCount, textureCountPerMaterial) + imul(getTextureIndicesLength$1(basicMaterialCount, textureCountPerMaterial), Uint32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getMapUnitIndex(index) {
	  return (index << 0);
	}

	var getTextureIndicesLength = getTextureIndicesLength$1;


	/* Worker-Wonderjs Not a pure module */

	function getTextureIndex$1(param, typeArr) {
	  return getUint32_1(getTextureIndexIndex$1(param[0], param[1], param[2]), typeArr);
	}


	/* TypeArrayService-Wonderjs Not a pure module */

	function getColor(index, typeArr) {
	  return getFloat3(getColorIndex(index), typeArr);
	}

	function getMapUnit(index, typeArr) {
	  return getUint8_1(getMapUnitIndex(index), typeArr);
	}

	var getTextureIndex = getTextureIndex$1;


	/* TypeArrayService-Wonderjs Not a pure module */

	function hasMap(mapUnit) {
	  return mapUnit !== 255;
	}


	/* No side effect */

	function isCached(unit, texture, bindTextureUnitCacheMap) {
	  var match = get$3(unit, bindTextureUnitCacheMap);
	  if (match !== undefined) {
	    return valFromOption(match) === texture;
	  } else {
	    return false;
	  }
	}

	function addActiveTexture(unit, texture, bindTextureUnitCacheMap) {
	  requireCheck((function () {
	          return test(buildAssertMessage("not cached", ""), (function () {
	                        return assertFalse(isCached(unit, texture, bindTextureUnitCacheMap));
	                      }));
	        }), getIsDebug(stateData));
	  return set$1(unit, texture, bindTextureUnitCacheMap);
	}


	/* Log-WonderLog Not a pure module */

	function getArrayBufferViewSourceTextureIndexOffset(basicSourceTextureCount) {
	  return basicSourceTextureCount;
	}

	function getArrayBufferViewSourceTextureIndexInTypeArray(arrayBufferViewSourceTextureIndex, arrayBufferViewSourceTextureIndexOffset) {
	  return ensureCheck((function (index) {
	                return test(buildAssertMessage("index should >= 0", "is " + (String(index) + "")), (function () {
	                              return Operators[/* >= */7](index, 0);
	                            }));
	              }), getIsDebug(stateData), arrayBufferViewSourceTextureIndex - arrayBufferViewSourceTextureIndexOffset | 0);
	}

	function handleByJudgeSourceTextureIndex(textureIndex, arrayBufferViewSourceTextureIndexOffset, funcDataTuple, param) {
	  var match = caml_lessthan(textureIndex, arrayBufferViewSourceTextureIndexOffset);
	  if (match) {
	    return param[0](textureIndex, funcDataTuple);
	  } else {
	    return param[1](getArrayBufferViewSourceTextureIndexInTypeArray(textureIndex, arrayBufferViewSourceTextureIndexOffset), funcDataTuple);
	  }
	}


	/* Log-WonderLog Not a pure module */

	function _bind(gl, unit, texture, dataTuple) {
	  var glTextureMap = dataTuple[1];
	  var bindTextureUnitCacheMap = dataTuple[0];
	  requireCheck((function () {
	          return test(buildAssertMessage("unit should >= 0", "is " + (String(unit) + "")), (function () {
	                        return Operators[/* >= */7](unit, 0);
	                      }));
	        }), getIsDebug(stateData));
	  var match = getTexture(texture, glTextureMap);
	  if (match !== undefined) {
	    var match$1 = isCached(unit, texture, bindTextureUnitCacheMap);
	    if (match$1) {
	      return dataTuple;
	    } else {
	      var bindTextureUnitCacheMap$1 = addActiveTexture(unit, texture, bindTextureUnitCacheMap);
	      var target = gl.TEXTURE_2D;
	      gl.activeTexture(gl.TEXTURE0 + unit | 0);
	      gl.bindTexture(target, valFromOption(match));
	      return /* tuple */[
	              bindTextureUnitCacheMap$1,
	              glTextureMap
	            ];
	    }
	  } else {
	    return dataTuple;
	  }
	}

	function _bindBasicSourceTexture(basicSourceTextureInTypeArray, param) {
	  var state = param[2];
	  var basicSourceTextureRecord = state[/* basicSourceTextureRecord */10];
	  _bind(param[0], param[1], basicSourceTextureInTypeArray, /* tuple */[
	        basicSourceTextureRecord[/* bindTextureUnitCacheMap */10],
	        basicSourceTextureRecord[/* glTextureMap */9]
	      ]);
	  return state;
	}

	function _bindArrayBufferViewSourceTexture(arrayBufferViewTextureInTypeArray, param) {
	  var state = param[2];
	  var arrayBufferViewSourceTextureRecord = state[/* arrayBufferViewSourceTextureRecord */11];
	  _bind(param[0], param[1], arrayBufferViewTextureInTypeArray, /* tuple */[
	        arrayBufferViewSourceTextureRecord[/* bindTextureUnitCacheMap */12],
	        arrayBufferViewSourceTextureRecord[/* glTextureMap */11]
	      ]);
	  return state;
	}

	function bind$4(gl, unit, texture, state) {
	  requireCheck((function () {
	          return test(buildAssertMessage("unit should >= 0", "is " + (String(unit) + "")), (function () {
	                        return Operators[/* >= */7](unit, 0);
	                      }));
	        }), getIsDebug(stateData));
	  return handleByJudgeSourceTextureIndex(texture, state[/* arrayBufferViewSourceTextureRecord */11][/* textureIndexOffset */14], /* tuple */[
	              gl,
	              unit,
	              state
	            ], /* tuple */[
	              _bindBasicSourceTexture,
	              _bindArrayBufferViewSourceTexture
	            ]);
	}


	/* Log-WonderLog Not a pure module */

	function getWidth(source) {
	  return source.width;
	}

	function getHeight(source) {
	  return source.height;
	}


	/* No side effect */

	function getGlWrap(gl, wrap) {
	  switch (wrap) {
	    case 0 : 
	        return gl.CLAMP_TO_EDGE;
	    case 1 : 
	        return gl.MIRRORED_REPEAT;
	    case 2 : 
	        return gl.REPEAT;
	    
	  }
	}


	/* No side effect */

	function getGlFormat(gl, format) {
	  switch (format) {
	    case 0 : 
	        return gl.RGB;
	    case 1 : 
	        return gl.RGBA;
	    case 2 : 
	        return gl.ALPHA;
	    case 3 : 
	        return gl.LUMINANCE;
	    case 4 : 
	        return gl.LUMINANCE_ALPHA;
	    case 5 : 
	        return gl.RGB_S3TC_DXT1;
	    case 6 : 
	        return gl.RGBA_S3TC_DXT1;
	    case 7 : 
	        return gl.RGBA_S3TC_DXT3;
	    case 8 : 
	        return gl.RGBA_S3TC_DXT5;
	    
	  }
	}


	/* No side effect */

	function getGlFilter(gl, filter) {
	  switch (filter) {
	    case 0 : 
	        return gl.NEAREST;
	    case 1 : 
	        return gl.LINEAR;
	    case 2 : 
	        return gl.NEAREST_MIPMAP_NEAREST;
	    case 3 : 
	        return gl.LINEAR_MIPMAP_NEAREST;
	    case 4 : 
	        return gl.NEAREST_MIPMAP_LINEAR;
	    case 5 : 
	        return gl.LINEAR_MIPMAP_LINEAR;
	    
	  }
	}


	/* No side effect */

	function setIsNeedUpdate$1(index, data, typeArr) {
	  return setUint8_1(getIsNeedUpdateIndex$1(index), data, typeArr);
	}


	/* TypeArrayService-Wonderjs Not a pure module */

	function _isPowerOfTwo(value) {
	  if ((value & (value - 1 | 0)) === 0 && value !== 0) {
	    return value !== 1;
	  } else {
	    return false;
	  }
	}

	function _isSourcePowerOfTwo(width, height) {
	  if (_isPowerOfTwo(width)) {
	    return _isPowerOfTwo(height);
	  } else {
	    return false;
	  }
	}

	function _filterFallback(filter, gl) {
	  switch (filter) {
	    case 0 : 
	    case 2 : 
	    case 4 : 
	        return gl.NEAREST;
	    case 1 : 
	    case 3 : 
	    case 5 : 
	        return gl.LINEAR;
	    
	  }
	}

	function _setTextureParameters(gl, target, isSourcePowerOfTwo, param) {
	  var minFilter = param[3];
	  var magFilter = param[2];
	  if (isSourcePowerOfTwo) {
	    gl.texParameteri(target, gl.TEXTURE_WRAP_S, param[0]);
	    gl.texParameteri(target, gl.TEXTURE_WRAP_T, param[1]);
	    gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, getGlFilter(gl, magFilter));
	    gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, getGlFilter(gl, minFilter));
	    return /* () */0;
	  } else {
	    gl.texParameteri(target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	    gl.texParameteri(target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	    gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, _filterFallback(magFilter, gl));
	    gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, _filterFallback(minFilter, gl));
	    return /* () */0;
	  }
	}

	function _isFilterMipmaps(filter) {
	  return filter >= 2;
	}

	function update$4(param, param$1, param$2, param$3) {
	  var target = param$1[9];
	  var minFilter = param$1[5];
	  var magFilter = param$1[4];
	  var gl = param[0];
	  var isSourcePowerOfTwo = _isSourcePowerOfTwo(param$1[0], param$1[1]);
	  _3(param$3[1], gl, param$1[8], param$2[1]);
	  gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
	  _setTextureParameters(gl, target, isSourcePowerOfTwo, /* tuple */[
	        param$1[2],
	        param$1[3],
	        magFilter,
	        minFilter
	      ]);
	  _3(param$3[0], gl, /* tuple */[
	        target,
	        param$1[6],
	        param$1[7]
	      ], param[2]);
	  var match = isSourcePowerOfTwo && (_isFilterMipmaps(magFilter) || _isFilterMipmaps(minFilter));
	  if (match) {
	    gl.generateMipmap(target);
	  }
	  setIsNeedUpdate$1(param[1], getNotNeedUpdate(/* () */0), param$2[0]);
	  return /* () */0;
	}

	function isNeedUpdate$1(textureInTypeArray, _, isNeedUpdates, getIsNeedUpdateFunc) {
	  return getIsNeedUpdateFunc(textureInTypeArray, isNeedUpdates) === getNeedUpdate(/* () */0);
	}


	/* BufferSourceTextureService-Wonderjs Not a pure module */

	function _drawTexture(gl, param) {
	  var glFormat = param[3];
	  gl.texImage2D(param[0], param[1], glFormat, glFormat, param[4], param[2]);
	  return /* () */0;
	}

	function _drawTwoDTexture(gl, param, source) {
	  return _drawTexture(gl, /* tuple */[
	              param[0],
	              0,
	              source,
	              param[1],
	              param[2]
	            ]);
	}

	var _allocateSourceToTexture = _drawTwoDTexture;

	function update$3(gl, textureInTypeArray, param) {
	  var basicSourceTextureRecord = param[0];
	  var browserDetectRecord = param[1];
	  var match = getSource$3(textureInTypeArray, basicSourceTextureRecord[/* sourceMap */8]);
	  if (match !== undefined) {
	    var source = valFromOption(match);
	    var width = getWidth(source);
	    var height = getHeight(source);
	    var glWrapS = getGlWrap(gl, getWrapS(textureInTypeArray, basicSourceTextureRecord[/* wrapSs */0]));
	    var glWrapT = getGlWrap(gl, getWrapT(textureInTypeArray, basicSourceTextureRecord[/* wrapTs */1]));
	    var magFilter = getMagFilter(textureInTypeArray, basicSourceTextureRecord[/* magFilters */2]);
	    var minFilter = getMinFilter(textureInTypeArray, basicSourceTextureRecord[/* minFilters */3]);
	    var glFormat = getGlFormat(gl, getFormat(textureInTypeArray, basicSourceTextureRecord[/* formats */4]));
	    var glType = getGlType(gl, getType$1(textureInTypeArray, basicSourceTextureRecord[/* types */5]));
	    var flipY = isFlipY(textureInTypeArray, basicSourceTextureRecord[/* flipYs */7]);
	    var target = gl.TEXTURE_2D;
	    update$4(/* tuple */[
	          gl,
	          textureInTypeArray,
	          source
	        ], /* tuple */[
	          width,
	          height,
	          glWrapS,
	          glWrapT,
	          magFilter,
	          minFilter,
	          glFormat,
	          glType,
	          flipY,
	          target
	        ], /* tuple */[
	          basicSourceTextureRecord[/* isNeedUpdates */6],
	          browserDetectRecord
	        ], /* tuple */[
	          _allocateSourceToTexture,
	          basicSourceTextureRecord[/* setFlipYFunc */11]
	        ]);
	    return /* tuple */[
	            basicSourceTextureRecord,
	            browserDetectRecord
	          ];
	  } else {
	    return /* tuple */[
	            basicSourceTextureRecord,
	            browserDetectRecord
	          ];
	  }
	}

	function isNeedUpdate(textureInTypeArray, basicSourceTextureRecord) {
	  return isNeedUpdate$1(textureInTypeArray, getDefaultIsNeedUpdate(/* () */0), basicSourceTextureRecord[/* isNeedUpdates */6], getIsNeedUpdate);
	}


	/* BufferBasicSourceTextureService-Wonderjs Not a pure module */

	function getWrapS$1(index, typeArr) {
	  return getUint8_1(getWrapSIndex$1(index), typeArr);
	}

	function getWrapT$1(index, typeArr) {
	  return getUint8_1(getWrapTIndex$1(index), typeArr);
	}

	function getMagFilter$1(index, typeArr) {
	  return getUint8_1(getMagFilterIndex$1(index), typeArr);
	}

	function getMinFilter$1(index, typeArr) {
	  return getUint8_1(getMinFilterIndex$1(index), typeArr);
	}

	function getIsNeedUpdate$1(index, typeArr) {
	  return getUint8_1(getIsNeedUpdateIndex$2(index), typeArr);
	}

	function isFlipY$1(index, typeArr) {
	  return getUint8_1(getFlipYIndex$1(index), typeArr) === getFlipY(/* () */0);
	}

	function getFormat$1(index, typeArr) {
	  return getUint8_1(getFormatIndex$1(index), typeArr);
	}

	function getType$2(index, typeArr) {
	  return getUint8_1(getTypeIndex$1(index), typeArr);
	}

	function getWidth$1(index, typeArr) {
	  return getUint16_1(getWidthIndex(index), typeArr);
	}

	function getHeight$1(index, typeArr) {
	  return getUint16_1(getHeightIndex(index), typeArr);
	}


	/* TypeArrayService-Wonderjs Not a pure module */

	function _drawTexture$1(gl, param, param$1) {
	  var height = param$1[1];
	  var width = param$1[0];
	  var glFormat = param[3];
	  requireCheck((function () {
	          return test(buildAssertMessage("width/height shouldn\'t be 0", "width is " + (String(width) + ("; height is " + (String(height) + "")))), (function () {
	                        Operators[/* <>= */3](width, 0);
	                        return Operators[/* <>= */3](height, 0);
	                      }));
	        }), getIsDebug(stateData));
	  gl.texImage2D(param[0], param[1], glFormat, width, height, 0, glFormat, param[4], param[2]);
	  return /* () */0;
	}

	function _drawTwoDTexture$1(gl, param, sizeTuple, source) {
	  return _drawTexture$1(gl, /* tuple */[
	              param[0],
	              0,
	              source,
	              param[1],
	              param[2]
	            ], sizeTuple);
	}

	function _allocateSourceToTexture$1(sizeTuple, gl, paramTuple, source) {
	  return _drawTwoDTexture$1(gl, paramTuple, sizeTuple, source);
	}

	function update$5(gl, textureInTypeArray, param) {
	  var arrayBufferViewSourceTextureRecord = param[0];
	  var browserDetectRecord = param[1];
	  var match = getSource$3(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* sourceMap */10]);
	  if (match !== undefined) {
	    var width = getWidth$1(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* widths */8]);
	    var height = getHeight$1(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* heights */9]);
	    var glWrapS = getGlWrap(gl, getWrapS$1(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* wrapSs */0]));
	    var glWrapT = getGlWrap(gl, getWrapT$1(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* wrapTs */1]));
	    var magFilter = getMagFilter$1(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* magFilters */2]);
	    var minFilter = getMinFilter$1(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* minFilters */3]);
	    var glFormat = getGlFormat(gl, getFormat$1(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* formats */4]));
	    var glType = getGlType(gl, getType$2(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* types */5]));
	    var flipY = isFlipY$1(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* flipYs */7]);
	    var target = gl.TEXTURE_2D;
	    var partial_arg = /* tuple */[
	      width,
	      height
	    ];
	    update$4(/* tuple */[
	          gl,
	          textureInTypeArray,
	          valFromOption(match)
	        ], /* tuple */[
	          width,
	          height,
	          glWrapS,
	          glWrapT,
	          magFilter,
	          minFilter,
	          glFormat,
	          glType,
	          flipY,
	          target
	        ], /* tuple */[
	          arrayBufferViewSourceTextureRecord[/* isNeedUpdates */6],
	          browserDetectRecord
	        ], /* tuple */[
	          (function (param, param$1, param$2) {
	              return _allocateSourceToTexture$1(partial_arg, param, param$1, param$2);
	            }),
	          arrayBufferViewSourceTextureRecord[/* setFlipYFunc */13]
	        ]);
	    return /* tuple */[
	            arrayBufferViewSourceTextureRecord,
	            browserDetectRecord
	          ];
	  } else {
	    return /* tuple */[
	            arrayBufferViewSourceTextureRecord,
	            browserDetectRecord
	          ];
	  }
	}

	function isNeedUpdate$2(textureInTypeArray, arrayBufferViewSourceTextureRecord) {
	  return isNeedUpdate$1(textureInTypeArray, getDefaultIsNeedUpdate$2(/* () */0), arrayBufferViewSourceTextureRecord[/* isNeedUpdates */6], getIsNeedUpdate$1);
	}


	/* Log-WonderLog Not a pure module */

	function _handleUpdateBasicSourceTexture(basicSourceTextureInTypeArray, param) {
	  var state = param[1];
	  var browserDetectRecord = state[/* browserDetectRecord */22];
	  var basicSourceTextureRecord = state[/* basicSourceTextureRecord */10];
	  var match = isNeedUpdate(basicSourceTextureInTypeArray, basicSourceTextureRecord);
	  if (match) {
	    update$3(param[0], basicSourceTextureInTypeArray, /* tuple */[
	          basicSourceTextureRecord,
	          browserDetectRecord
	        ]);
	  } else {
	    /* tuple */
	  }
	  return state;
	}

	function _handleUpdateArrayBufferViewSourceTexture(arrayBufferViewTextureInTypeArray, param) {
	  var state = param[1];
	  var browserDetectRecord = state[/* browserDetectRecord */22];
	  var arrayBufferViewSourceTextureRecord = state[/* arrayBufferViewSourceTextureRecord */11];
	  var match = isNeedUpdate$2(arrayBufferViewTextureInTypeArray, arrayBufferViewSourceTextureRecord);
	  if (match) {
	    update$5(param[0], arrayBufferViewTextureInTypeArray, /* tuple */[
	          arrayBufferViewSourceTextureRecord,
	          browserDetectRecord
	        ]);
	  } else {
	    /* tuple */
	  }
	  return state;
	}

	function handleUpdate(gl, texture, state) {
	  return handleByJudgeSourceTextureIndex(texture, state[/* arrayBufferViewSourceTextureRecord */11][/* textureIndexOffset */14], /* tuple */[
	              gl,
	              state
	            ], /* tuple */[
	              _handleUpdateBasicSourceTexture,
	              _handleUpdateArrayBufferViewSourceTexture
	            ]);
	}


	/* IndexSourceTextureService-Wonderjs Not a pure module */

	function unsafeGetGPU$1(param) {
	  return unsafeGet$1(param[/* gpu */0]);
	}

	function unsafeGetObjectInstanceCountPerSourceInstance(param) {
	  return unsafeGet$1(param[/* instanceBuffer */1])[/* objectInstanceCountPerSourceInstance */0];
	}

	function getTextureCountPerMaterial$2(param) {
	  return unsafeGet$1(param[/* textureCountPerMaterial */2]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function getTextureIndex$2(material, mapUnit, getTextureIndexFunc, param) {
	  return getTextureIndexFunc(/* tuple */[
	              material,
	              mapUnit,
	              getTextureCountPerMaterial$2(param[1])
	            ], param[0]);
	}

	function bindAndUpdate$1(param, getTextureIndexFunc, stateDataTuple) {
	  var settingRecord = stateDataTuple[1];
	  var textureIndices = stateDataTuple[0];
	  var mapUnit = param[2];
	  var gl = param[0];
	  var match = hasMap(mapUnit);
	  if (match) {
	    var texture = getTextureIndex$2(param[1], mapUnit, getTextureIndexFunc, /* tuple */[
	          textureIndices,
	          settingRecord
	        ]);
	    var state = bind$4(gl, mapUnit, texture, stateDataTuple[2]);
	    return /* tuple */[
	            textureIndices,
	            settingRecord,
	            handleUpdate(gl, texture, state)
	          ];
	  } else {
	    return stateDataTuple;
	  }
	}


	/* BindTextureRenderService-Wonderjs Not a pure module */

	function bindAndUpdate(gl, material, state) {
	  var basicMaterialRecord = state[/* basicMaterialRecord */7];
	  var mapUnit = getMapUnit(material, basicMaterialRecord[/* mapUnits */3]);
	  return bindAndUpdate$1(/* tuple */[
	                gl,
	                material,
	                mapUnit
	              ], getTextureIndex, /* tuple */[
	                basicMaterialRecord[/* textureIndices */2],
	                state[/* settingRecord */20],
	                state
	              ])[2];
	}


	/* OperateTypeArrayBasicMaterialService-Wonderjs Not a pure module */

	function render$4(gl, indexTuple, state) {
	  return render$3(gl, indexTuple, bindAndUpdate, state);
	}


	/* RenderJobUtils-Wonderjs Not a pure module */

	function getShaderIndex$1(materialIndex, getShaderIndexFunc, renderState) {
	  return ensureCheck((function (shaderIndex) {
	                return test(buildAssertMessage("shaderIndex should exist", "not"), (function () {
	                              return Operators[/* <>= */3](shaderIndex, getDefaultShaderIndex(/* () */0));
	                            }));
	              }), getIsDebug(stateData), getShaderIndexFunc(materialIndex, renderState));
	}


	/* Log-WonderLog Not a pure module */

	function isSupportInstance$1(useHardwareInstance, gpuDetectRecord) {
	  if (useHardwareInstance) {
	    return hasExtension(gpuDetectRecord[/* extensionInstancedArrays */0]);
	  } else {
	    return false;
	  }
	}

	var unsafeGetIsSourceInstance = unsafeGet$2;


	/* GPUDetectService-Wonderjs Not a pure module */

	function isSupportInstance(state) {
	  return isSupportInstance$1(unsafeGetGPU$1(state[/* settingRecord */20])[/* useHardwareInstance */0], state[/* gpuDetectRecord */16]);
	}


	/* JudgeInstanceService-Wonderjs Not a pure module */

	/* No side effect */

	var getObjectInstanceTransformCollectionsLength = imul;

	function getObjectInstanceTransformCollectionsOffset(_, _$1) {
	  return 0;
	}

	function getIsTransformStaticsLength(sourceInstanceCount) {
	  return (sourceInstanceCount << 0);
	}

	function getIsTransformStaticsOffset(sourceInstanceCount, objectInstanceCountPerSourceInstance) {
	  return 0 + imul(imul(sourceInstanceCount, objectInstanceCountPerSourceInstance), Uint32Array.BYTES_PER_ELEMENT) | 0;
	}

	var getObjectInstanceTransformCollectionsIndex = imul;

	function getIsTransformStaticsIndex(sourceInstance) {
	  return (sourceInstance << 0);
	}


	/* Worker-Wonderjs Not a pure module */

	var getObjectInstanceTransformIndex = unsafeGet$2;

	function getObjectInstanceTransformCount(objectInstanceTransformIndex) {
	  return objectInstanceTransformIndex;
	}

	function _getStartIndexAndEndIndex(sourceInstance, objectInstanceCountPerSourceInstance, objectInstanceTransformIndex, objectInstanceTransformCollections) {
	  var startIndex = getObjectInstanceTransformCollectionsIndex(sourceInstance, objectInstanceCountPerSourceInstance);
	  return ensureCheck((function (param) {
	                var endIndex = param[1];
	                var startIndex = param[0];
	                test(buildAssertMessage("endIndex should <= objectInstanceTransformCollections->length", "not"), (function () {
	                        return Operators[/* <= */11](endIndex, objectInstanceTransformCollections.length);
	                      }));
	                return test(buildAssertMessage("endIndex + 1 should >= startIndex", "not"), (function () {
	                              return Operators[/* >= */7](endIndex + 1 | 0, startIndex);
	                            }));
	              }), getIsDebug(stateData), /* tuple */[
	              startIndex,
	              startIndex + (objectInstanceTransformIndex - 1 | 0) | 0
	            ]);
	}

	function reduceObjectInstanceTransformCollection(param, initialValue, reduceFunc) {
	  var objectInstanceTransformCollections = param[3];
	  var result = initialValue;
	  var match = _getStartIndexAndEndIndex(param[0], param[1], param[2], objectInstanceTransformCollections);
	  for(var i = match[0] ,i_finish = match[1]; i <= i_finish; ++i){
	    result = reduceFunc(result, getUint32_1(i, objectInstanceTransformCollections));
	  }
	  return result;
	}


	/* Log-WonderLog Not a pure module */

	function build(sourceInstance, state) {
	  var match = state[/* sourceInstanceRecord */15];
	  var objectInstanceTransformIndex = getObjectInstanceTransformIndex(sourceInstance, match[/* objectInstanceTransformIndexMap */0]);
	  return /* tuple */[
	          objectInstanceTransformIndex,
	          /* tuple */[
	            sourceInstance,
	            unsafeGetObjectInstanceCountPerSourceInstance(state[/* settingRecord */20]),
	            objectInstanceTransformIndex,
	            match[/* objectInstanceTransformCollections */1]
	          ]
	        ];
	}


	/* OperateRenderSettingService-Wonderjs Not a pure module */

	function render$7(gl, indexTuple, renderFunc, state) {
	  var geometryIndex = indexTuple[4];
	  var meshRendererIndex = indexTuple[3];
	  var shaderIndex = indexTuple[2];
	  var state$1 = renderFunc(gl, /* tuple */[
	        indexTuple[0],
	        indexTuple[1],
	        shaderIndex,
	        meshRendererIndex,
	        geometryIndex
	      ], state);
	  draw$4(gl, meshRendererIndex, geometryIndex, state$1);
	  var uniformRenderObjectSendModelData = unsafeGetUniformSendData(shaderIndex, state$1[/* glslSenderRecord */3]);
	  var drawMode = getGlDrawMode(gl, meshRendererIndex, state$1);
	  var indexType = getIndexType(gl, geometryIndex, state$1);
	  var indexTypeSize = getIndexTypeSize(gl, geometryIndex, state$1);
	  var indicesCount = getIndicesCount(geometryIndex, state$1);
	  var match = build(indexTuple[5], state$1);
	  return reduceObjectInstanceTransformCollection(match[1], state$1, (function (state, objectInstanceTransform) {
	                var state$1 = reduceOneParam((function (state, param) {
	                        var pos = param[/* pos */0];
	                        var match = isUniformLocationExist(pos);
	                        if (match) {
	                          param[/* sendDataFunc */2](gl, pos, param[/* getDataFunc */1](objectInstanceTransform, state));
	                        }
	                        return state;
	                      }), state, uniformRenderObjectSendModelData);
	                drawElement(/* tuple */[
	                      drawMode,
	                      indexType,
	                      indexTypeSize,
	                      indicesCount
	                    ], gl);
	                return state$1;
	              }));
	}


	/* RenderJobUtils-Wonderjs Not a pure module */

	function render$6(gl, indexTuple, state) {
	  return render$7(gl, indexTuple, render$4, state);
	}


	/* RenderBasicJobCommon-Wonderjs Not a pure module */

	function getFloat32ArrayPoolMap(record) {
	  return record[/* float32ArrayPoolMap */0];
	}

	function _addTypeArrayToPool(count, typeArray, maxSize, map) {
	  var match = get$3(count, map);
	  if (match !== undefined) {
	    var arr = match;
	    var len = arr.length;
	    if (len >= maxSize) {
	      return map;
	    } else {
	      arr.push(typeArray);
	      return map;
	    }
	  } else {
	    return set$1(count, /* array */[typeArray], map);
	  }
	}

	function addFloat32TypeArrayToPool(typeArray, maxSize, map) {
	  return _addTypeArrayToPool(typeArray.length, typeArray, maxSize, map);
	}

	function _getTypeArrayFromPool(count, map) {
	  var match = get$3(count, map);
	  if (match !== undefined) {
	    var arr = match;
	    var match$1 = arr.length;
	    if (match$1 !== 0) {
	      return undefined_to_opt(arr.pop());
	    } else {
	      return undefined;
	    }
	  }
	  
	}

	function getFloat32TypeArrayFromPool(count, record) {
	  return _getTypeArrayFromPool(count, record[/* float32ArrayPoolMap */0]);
	}


	/* SparseMapService-Wonderjs Not a pure module */

	function createBuffer$7(gl, capacity, state) {
	  var buffer = getInstanceBuffer(gl, state[/* vboBufferRecord */1]);
	  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	  gl.bufferData(gl.ARRAY_BUFFER, capacity, gl.DYNAMIC_DRAW);
	  return buffer;
	}

	function _getFloat32InstanceArraySize(capacity) {
	  requireCheck((function () {
	          return test(buildAssertMessage("capacity should be a multiplier of 4", "is " + (String(capacity) + "")), (function () {
	                        return Operators[/* = */0](capacity % 4, 0);
	                      }));
	        }), getIsDebug(stateData));
	  return capacity / 4 | 0;
	}

	function _getCapacity(sourceInstance, defaultCapacity, capacityMap) {
	  var match = get$3(sourceInstance, capacityMap);
	  if (match !== undefined) {
	    return valFromOption(match);
	  } else {
	    return defaultCapacity;
	  }
	}

	function _setCapacity(sourceInstance, capacity, capacityMap) {
	  set$1(sourceInstance, capacity, capacityMap);
	  return capacityMap;
	}

	function getOrCreateBuffer$2(param, param$1, state) {
	  var bufferMap = param$1[1];
	  var sourceInstance = param[1];
	  var match = get$3(sourceInstance, bufferMap);
	  if (match !== undefined) {
	    return valFromOption(match);
	  } else {
	    var buffer = createBuffer$7(param[0], _getCapacity(sourceInstance, param[2], param$1[0]), state);
	    set$1(sourceInstance, buffer, bufferMap);
	    return buffer;
	  }
	}

	function getOrCreateMatrixFloat32Array(sourceInstance, defaultCapacity, param, state) {
	  var matrixFloat32ArrayMap = param[1];
	  var capacity = _getCapacity(sourceInstance, defaultCapacity, param[0]);
	  var match = get$3(sourceInstance, matrixFloat32ArrayMap);
	  if (match !== undefined) {
	    return valFromOption(match);
	  } else {
	    var match$1 = getFloat32TypeArrayFromPool(_getFloat32InstanceArraySize(capacity), state[/* typeArrayPoolRecord */2]);
	    if (match$1 !== undefined) {
	      return valFromOption(match$1);
	    } else {
	      var typeArr = new Float32Array(_getFloat32InstanceArraySize(capacity));
	      set$1(sourceInstance, typeArr, matrixFloat32ArrayMap);
	      return typeArr;
	    }
	  }
	}

	function setCapacityAndUpdateBufferTypeArray(param, param$1, param$2, state) {
	  var capacityMap = param$2[2];
	  var buffer = param$1[0];
	  var capacity = param[2];
	  var sourceInstance = param[1];
	  var gl = param[0];
	  var currentCapacity = _getCapacity(sourceInstance, param[3], capacityMap);
	  var needIncreaseCapacity = false;
	  while(currentCapacity < capacity) {
	    currentCapacity = (currentCapacity << 1);
	    needIncreaseCapacity = true;
	  }
	  if (needIncreaseCapacity) {
	    _setCapacity(sourceInstance, currentCapacity, capacityMap);
	    gl.deleteBuffer(buffer);
	    var buffer$1 = createBuffer$7(gl, currentCapacity, state);
	    set$1(sourceInstance, buffer$1, param$2[0]);
	    var matrixFloat32Array = new Float32Array(_getFloat32InstanceArraySize(currentCapacity));
	    set$1(sourceInstance, matrixFloat32Array, param$2[1]);
	    return /* tuple */[
	            buffer$1,
	            matrixFloat32Array
	          ];
	  } else {
	    return /* tuple */[
	            buffer,
	            param$1[1]
	          ];
	  }
	}

	function updateData(gl, data, buffer) {
	  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	  gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
	  return buffer;
	}

	function bind$5(gl, buffer) {
	  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	  return buffer;
	}


	/* Log-WonderLog Not a pure module */

	function getLocalToWorldMatrixTypeArray$2(transform, state) {
	  var transformRecord = state[/* transformRecord */14];
	  return getLocalToWorldMatrixTypeArray$1(transform, transformRecord[/* localToWorldMatrices */0], transformRecord[/* localToWorldMatrixCacheMap */1]);
	}

	function getNormalMatrixTypeArray$1(transform, param) {
	  var transformRecord = param[/* transformRecord */14];
	  return getNormalMatrixTypeArray(transform, transformRecord[/* localToWorldMatrices */0], /* tuple */[
	              transformRecord[/* localToWorldMatrixCacheMap */1],
	              transformRecord[/* normalMatrixCacheMap */2]
	            ]);
	}


	/* ModelMatrixTransformService-Wonderjs Not a pure module */

	function isTransformStatic$1(sourceInstance, isTransformStatics) {
	  return getUint8_1(getIsTransformStaticsIndex(sourceInstance), isTransformStatics) === 1;
	}


	/* TypeArrayService-Wonderjs Not a pure module */

	var markIsSendTransformMatrixData$1 = set$1;

	function isSendTransformMatrixData(sourceInstance, isSendTransformMatrixDataMap) {
	  var match = get$3(sourceInstance, isSendTransformMatrixDataMap);
	  if (match !== undefined) {
	    return match;
	  } else {
	    return false;
	  }
	}


	/* No side effect */

	function isTransformStatic(sourceInstance, param) {
	  return isTransformStatic$1(sourceInstance, param[/* isTransformStatics */2]);
	}

	function markIsSendTransformMatrixData(sourceInstance, isSend, record) {
	  return /* record */[
	          /* objectInstanceTransformIndexMap */record[/* objectInstanceTransformIndexMap */0],
	          /* objectInstanceTransformCollections */record[/* objectInstanceTransformCollections */1],
	          /* isTransformStatics */record[/* isTransformStatics */2],
	          /* matrixInstanceBufferCapacityMap */record[/* matrixInstanceBufferCapacityMap */3],
	          /* matrixFloat32ArrayMap */record[/* matrixFloat32ArrayMap */4],
	          /* isSendTransformMatrixDataMap */markIsSendTransformMatrixData$1(sourceInstance, isSend, record[/* isSendTransformMatrixDataMap */5])
	        ];
	}


	/* StaticTransformService-Wonderjs Not a pure module */

	function _fillObjectInstanceData(objectInstanceTransformDataTuple, matricesArrayForInstance, fillMatrixTypeArrFunc, stateOffsetTuple) {
	  return reduceObjectInstanceTransformCollection(objectInstanceTransformDataTuple, stateOffsetTuple, (function (stateOffsetTuple, objectInstanceTransform) {
	                  return fillMatrixTypeArrFunc(objectInstanceTransform, matricesArrayForInstance, stateOffsetTuple);
	                }))[0];
	}

	function _sendTransformMatrixDataBuffer(param, param$1, state) {
	  var match = param$1[0];
	  var pos = match[/* pos */0];
	  var gl = param[0];
	  gl.vertexAttribPointer(pos, match[/* size */1], gl.FLOAT, false, param$1[1], match[/* getOffsetFunc */2](param$1[2]));
	  param[1].vertexAttribDivisorANGLE(pos, 1);
	  enableVertexAttribArray(gl, pos, state[/* glslSenderRecord */3][/* vertexAttribHistoryArray */9]);
	  return state;
	}

	function _sendTransformMatrixDataBufferData(glDataTuple, shaderIndex, stride, state) {
	  return reduceOneParami((function (state, sendData, index) {
	                return _sendTransformMatrixDataBuffer(glDataTuple, /* tuple */[
	                            sendData,
	                            stride,
	                            index
	                          ], state);
	              }), state, unsafeGetInstanceAttributeSendData(shaderIndex, state[/* glslSenderRecord */3]));
	}

	function _updateAndSendTransformMatrixDataBufferData(glDataTuple, shaderIndex, param, state) {
	  updateData(glDataTuple[0], param[1], param[2]);
	  return _sendTransformMatrixDataBufferData(glDataTuple, shaderIndex, param[0], state);
	}

	function _sendTransformMatrixData(param, param$1, fillMatrixTypeArrFunc, state) {
	  var match = param$1[2];
	  var matrixFloat32ArrayMap = match[2];
	  var matrixInstanceBufferMap = match[1];
	  var matrixInstanceBufferCapacityMap = match[0];
	  var match$1 = param$1[1];
	  var defaultCapacity = match$1[0];
	  var match$2 = param$1[0];
	  var gl = match$2[0];
	  var sourceInstance = param[1];
	  var matrixInstanceBuffer = getOrCreateBuffer$2(/* tuple */[
	        gl,
	        sourceInstance,
	        defaultCapacity
	      ], /* tuple */[
	        matrixInstanceBufferCapacityMap,
	        matrixInstanceBufferMap
	      ], state);
	  var matricesArrayForInstance = getOrCreateMatrixFloat32Array(sourceInstance, defaultCapacity, /* tuple */[
	        matrixInstanceBufferCapacityMap,
	        matrixFloat32ArrayMap
	      ], state);
	  var match$3 = setCapacityAndUpdateBufferTypeArray(/* tuple */[
	        gl,
	        sourceInstance,
	        imul(match$1[4], match$1[1]),
	        defaultCapacity
	      ], /* tuple */[
	        matrixInstanceBuffer,
	        matricesArrayForInstance
	      ], /* tuple */[
	        matrixInstanceBufferMap,
	        matrixFloat32ArrayMap,
	        matrixInstanceBufferCapacityMap
	      ], state);
	  var matricesArrayForInstance$1 = match$3[1];
	  return _updateAndSendTransformMatrixDataBufferData(/* tuple */[
	              gl,
	              match$2[1]
	            ], match$2[2], /* tuple */[
	              match$1[2],
	              matricesArrayForInstance$1,
	              match$3[0]
	            ], _fillObjectInstanceData(match$1[3], matricesArrayForInstance$1, fillMatrixTypeArrFunc, fillMatrixTypeArrFunc(param[0], matricesArrayForInstance$1, /* tuple */[
	                      state,
	                      0
	                    ])));
	}

	function _sendStaticTransformMatrixData(componentTuple, dataTuple, fillMatrixTypeArrFunc, state) {
	  var match = dataTuple[2];
	  var match$1 = dataTuple[1];
	  var match$2 = dataTuple[0];
	  var gl = match$2[0];
	  var sourceInstance = componentTuple[1];
	  var match$3 = isSendTransformMatrixData(sourceInstance, state[/* sourceInstanceRecord */15][/* isSendTransformMatrixDataMap */5]);
	  if (match$3) {
	    bind$5(gl, getOrCreateBuffer$2(/* tuple */[
	              gl,
	              sourceInstance,
	              match$1[0]
	            ], /* tuple */[
	              match[0],
	              match[1]
	            ], state));
	    return _sendTransformMatrixDataBufferData(/* tuple */[
	                gl,
	                match$2[1]
	              ], match$2[2], match$1[2], state);
	  } else {
	    var state$1 = _sendTransformMatrixData(componentTuple, dataTuple, fillMatrixTypeArrFunc, state);
	    var newrecord = caml_array_dup(state$1);
	    newrecord[/* sourceInstanceRecord */15] = markIsSendTransformMatrixData(sourceInstance, true, state$1[/* sourceInstanceRecord */15]);
	    return newrecord;
	  }
	}

	function _sendDynamicTransformMatrixData(componentTuple, dataTuple, fillMatrixTypeArrFunc, state) {
	  var newrecord = caml_array_dup(state);
	  return _sendTransformMatrixData(componentTuple, dataTuple, fillMatrixTypeArrFunc, (newrecord[/* sourceInstanceRecord */15] = markIsSendTransformMatrixData(componentTuple[1], false, state[/* sourceInstanceRecord */15]), newrecord));
	}

	function _geMatrixMapTuple(state) {
	  var match = state[/* vboBufferRecord */1];
	  var match$1 = state[/* sourceInstanceRecord */15];
	  return /* tuple */[
	          match$1[/* matrixInstanceBufferCapacityMap */3],
	          match[/* matrixInstanceBufferMap */4],
	          match$1[/* matrixFloat32ArrayMap */4]
	        ];
	}

	function _renderSourceInstanceGameObject(gl, indexTuple, renderFunc, state) {
	  return renderFunc(gl, indexTuple, state);
	}

	function _prepareData(gl, shaderIndex, param, state) {
	  var extension = unsafeGetInstanceExtension(state[/* gpuDetectRecord */16]);
	  var match = build(param[0], state);
	  var instanceRenderListCount = getObjectInstanceTransformCount(match[0]) + 1 | 0;
	  return /* tuple */[
	          /* tuple */[
	            gl,
	            extension,
	            shaderIndex
	          ],
	          /* tuple */[
	            param[1],
	            param[2],
	            param[3],
	            match[1],
	            instanceRenderListCount
	          ],
	          _geMatrixMapTuple(state)
	        ];
	}

	function _unbind(shaderIndex, extension, state) {
	  forEach((function (param) {
	          extension.vertexAttribDivisorANGLE(param[/* pos */0], 0);
	          return /* () */0;
	        }), unsafeGetInstanceAttributeSendData(shaderIndex, state[/* glslSenderRecord */3]));
	  return state;
	}

	function render$9(gl, param, param$1, state) {
	  var fillMatrixTypeArrFunc = param$1[1];
	  var indexTuple = param[0];
	  var sourceInstance = indexTuple[5];
	  var geometryIndex = indexTuple[4];
	  var meshRendererIndex = indexTuple[3];
	  var shaderIndex = indexTuple[2];
	  var transformIndex = indexTuple[0];
	  var state$1 = _renderSourceInstanceGameObject(gl, /* tuple */[
	        transformIndex,
	        indexTuple[1],
	        shaderIndex,
	        meshRendererIndex,
	        geometryIndex
	      ], param$1[0], state);
	  var dataTuple = _prepareData(gl, shaderIndex, /* tuple */[
	        sourceInstance,
	        param[1],
	        param[2],
	        param[3]
	      ], state$1);
	  var match = dataTuple[0];
	  var extension = match[1];
	  var gl$1 = match[0];
	  var match$1 = isTransformStatic(sourceInstance, state$1[/* sourceInstanceRecord */15]);
	  var state$2 = match$1 ? _sendStaticTransformMatrixData(/* tuple */[
	          transformIndex,
	          sourceInstance
	        ], dataTuple, fillMatrixTypeArrFunc, state$1) : _sendDynamicTransformMatrixData(/* tuple */[
	          transformIndex,
	          sourceInstance
	        ], dataTuple, fillMatrixTypeArrFunc, state$1);
	  drawElementsInstancedANGLE(/* tuple */[
	        getGlDrawMode(gl$1, meshRendererIndex, state$2),
	        getIndexType(gl$1, geometryIndex, state$2),
	        getIndexTypeSize(gl$1, geometryIndex, state$2),
	        getIndicesCount(geometryIndex, state$2),
	        dataTuple[1][4]
	      ], extension);
	  return _unbind(shaderIndex, extension, state$2);
	}

	function fillMatrixTypeArr(transformIndex, matricesArrayForInstance, param) {
	  return fillFloat32ArrayWithFloat32Array(/* tuple */[
	              matricesArrayForInstance,
	              param[1]
	            ], /* tuple */[
	              getLocalToWorldMatrixTypeArray$2(transformIndex, param[0]),
	              0
	            ], 16);
	}


	/* GPUDetectService-Wonderjs Not a pure module */

	function _fillMatrixTypeArr(transform, matricesArrayForInstance, tuple) {
	  fillMatrixTypeArr(transform, matricesArrayForInstance, tuple);
	  return /* tuple */[
	          tuple[0],
	          tuple[1] + 16 | 0
	        ];
	}

	function render$8(gl, indexTuple, state) {
	  return render$9(gl, /* tuple */[
	              indexTuple,
	              4096,
	              64,
	              64
	            ], /* tuple */[
	              render$4,
	              _fillMatrixTypeArr
	            ], state);
	}


	/* RenderBasicJobCommon-Wonderjs Not a pure module */

	function render$5(gl, indexTuple, state) {
	  if (isSupportInstance(state)) {
	    return render$8(gl, indexTuple, state);
	  } else {
	    return render$6(gl, indexTuple, state);
	  }
	}


	/* JudgeInstanceRenderService-Wonderjs Not a pure module */

	function getShaderIndex$2(materialIndex, param) {
	  return getShaderIndex(materialIndex, param[/* basicMaterialRecord */7][/* shaderIndices */0]);
	}


	/* ShaderIndicesService-Wonderjs Not a pure module */

	function render$2(gl, param, state) {
	  var sourceInstanceIndices = param[5];
	  var geometryIndices = param[4];
	  var meshRendererIndices = param[3];
	  var materialIndices = param[2];
	  var transformIndices = param[1];
	  return reduceOneParam((function (state, index) {
	                var transformIndex = getComponent$1(index, transformIndices);
	                var materialIndex = getComponent$1(index, materialIndices);
	                var shaderIndex = getShaderIndex$1(materialIndex, getShaderIndex$2, state);
	                var meshRendererIndex = getComponent$1(index, meshRendererIndices);
	                var geometryIndex = getComponent$1(index, geometryIndices);
	                var sourceInstance = getComponent$1(index, sourceInstanceIndices);
	                if (hasSourceInstance(sourceInstance)) {
	                  return render$5(gl, /* tuple */[
	                              transformIndex,
	                              materialIndex,
	                              shaderIndex,
	                              meshRendererIndex,
	                              geometryIndex,
	                              sourceInstance
	                            ], state);
	                } else {
	                  var state$1 = render$4(gl, /* tuple */[
	                        transformIndex,
	                        materialIndex,
	                        shaderIndex,
	                        meshRendererIndex,
	                        geometryIndex
	                      ], state);
	                  draw$4(gl, meshRendererIndex, geometryIndex, state$1);
	                  return state$1;
	                }
	              }), state, param[0]);
	}


	/* RenderJobUtils-Wonderjs Not a pure module */

	function getCameraRecord$1(state) {
	  return state[/* renderRecord */21][/* cameraRecord */2];
	}

	function getBasicRenderObjectRecord$1(state) {
	  return state[/* renderRecord */21][/* basicRenderObjectRecord */0];
	}

	function getLightRenderObjectRecord$1(state) {
	  return state[/* renderRecord */21][/* lightRenderObjectRecord */1];
	}


	/* OptionService-Wonderjs Not a pure module */

	function getRecord$9(state) {
	  return unsafeGet$1(state[/* geometryRecord */18]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function getRecord$10(param) {
	  return unsafeGet$1(param[/* transformRecord */17]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function getRecord$11(param) {
	  return unsafeGet$1(param[/* pointLightRecord */20]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function getPositionMap(record) {
	  return unsafeGet$1(record[/* positionMap */1]);
	}

	function getRenderLightArr(record) {
	  return unsafeGet$1(record[/* renderLightArr */2]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function getAmbientLightColor(param) {
	  var sceneRecord = param[/* sceneRecord */0];
	  return sceneRecord[/* ambientLight */0][/* color */0];
	}

	function setAmbientLightColor(color, state) {
	  var newrecord = caml_array_dup(state);
	  newrecord[/* sceneRecord */0] = /* record */[/* ambientLight : record */[/* color */color]];
	  return newrecord;
	}


	/* No side effect */

	function getArrayBufferViewSourceTextureIndexOffset$1(state) {
	  var settingRecord = state[/* settingRecord */1];
	  return getArrayBufferViewSourceTextureIndexOffset(unsafeGetBasicSourceTextureCount(settingRecord));
	}


	/* IndexSourceTextureService-Wonderjs Not a pure module */

	function getRecord$12(param) {
	  return unsafeGet$1(param[/* meshRendererRecord */14]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function getRecord$13(param) {
	  return unsafeGet$1(param[/* workerDetectRecord */25]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function getRecord$14(param) {
	  return unsafeGet$1(param[/* basicMaterialRecord */12]);
	}

	function unsafeGetShaderIndices(state) {
	  return unsafeGet$1(getRecord$14(state)[/* shaderIndices */0]);
	}

	function unsafeGetMapUnits(state) {
	  return unsafeGet$1(getRecord$14(state)[/* mapUnits */3]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function getRecord$15(param) {
	  return unsafeGet$1(param[/* lightMaterialRecord */13]);
	}

	function unsafeGetShaderIndices$1(state) {
	  return unsafeGet$1(getRecord$15(state)[/* shaderIndices */0]);
	}

	function unsafeGetDiffuseMapUnits(state) {
	  return unsafeGet$1(getRecord$15(state)[/* diffuseMapUnits */5]);
	}

	function unsafeGetSpecularMapUnits(state) {
	  return unsafeGet$1(getRecord$15(state)[/* specularMapUnits */6]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function setFlipY$2(gl, flipY, param) {
	  var browser = param[/* browser */0];
	  if (browser !== 1) {
	    if (browser !== 0) {
	      return fatal(buildFatalMessage("setFlipY", "unknown browser", "", "", ""));
	    } else {
	      return /* () */0;
	    }
	  } else {
	    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
	    return /* () */0;
	  }
	}


	/* Log-WonderLog Not a pure module */

	function getRecord$16(param) {
	  return unsafeGet$1(param[/* directionLightRecord */19]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function getDirectionMap(record) {
	  return unsafeGet$1(record[/* directionMap */1]);
	}

	function getRenderLightArr$1(record) {
	  return unsafeGet$1(record[/* renderLightArr */2]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function create$10() {
	  return /* record */[
	          /* objectInstanceTransformIndexMap */undefined,
	          /* objectInstanceTransformCollections */undefined,
	          /* isTransformStatics */undefined,
	          /* matrixInstanceBufferCapacityMap */createEmpty$2(/* () */0),
	          /* matrixFloat32ArrayMap */createEmpty$2(/* () */0),
	          /* isSendTransformMatrixDataMap */createEmpty$2(/* () */0)
	        ];
	}

	function unsafeGetObjectInstanceTransformIndexMap(record) {
	  return unsafeGet$1(record[/* objectInstanceTransformIndexMap */0]);
	}

	function unsafeGetObjectInstanceTransformCollections(record) {
	  return unsafeGet$1(record[/* objectInstanceTransformCollections */1]);
	}

	function unsafeGetIsTransformStaticMap(record) {
	  return unsafeGet$1(record[/* isTransformStatics */2]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function createRenderState(state) {
	  var settingRecord = state[/* settingRecord */1];
	  var gpuDetectRecord = state[/* gpuDetectRecord */3];
	  var deviceManagerRecord = state[/* deviceManagerRecord */4];
	  var shaderRecord = state[/* shaderRecord */5];
	  var programRecord = state[/* programRecord */6];
	  var glslSenderRecord = state[/* glslSenderRecord */8];
	  var sourceInstanceRecord = state[/* sourceInstanceRecord */11];
	  var typeArrayPoolRecord = state[/* typeArrayPoolRecord */22];
	  var vboBufferRecord = state[/* vboBufferRecord */23];
	  var globalTempRecord = state[/* globalTempRecord */24];
	  var transformRecord = getRecord$10(state);
	  var geometryRecord = getRecord$9(state);
	  var basicMaterialRecord = getRecord$14(state);
	  var lightMaterialRecord = getRecord$15(state);
	  var meshRendererRecord = getRecord$12(state);
	  var directionLightRecord = getRecord$16(state);
	  var pointLightRecord = getRecord$11(state);
	  var basicSourceTextureRecord = getRecord$7(state);
	  var arrayBufferViewSourceTextureRecord = getRecord$8(state);
	  var workerDetectRecord = getRecord$13(state);
	  var browserDetectRecord = getRecord$2(state);
	  return /* record */[
	          /* sceneRecord : record */[/* ambientLight : record */[/* color */getAmbientLightColor(state)]],
	          /* vboBufferRecord */vboBufferRecord,
	          /* typeArrayPoolRecord */typeArrayPoolRecord,
	          /* glslSenderRecord */glslSenderRecord,
	          /* programRecord */programRecord,
	          /* geometryRecord : record */[
	            /* vertices */geometryRecord[/* vertices */0],
	            /* texCoords */geometryRecord[/* texCoords */1],
	            /* normals */geometryRecord[/* normals */2],
	            /* indices */geometryRecord[/* indices */3],
	            /* indices32 */geometryRecord[/* indices32 */4],
	            /* verticesInfos */geometryRecord[/* verticesInfos */5],
	            /* texCoordsInfos */geometryRecord[/* texCoordsInfos */6],
	            /* normalsInfos */geometryRecord[/* normalsInfos */7],
	            /* indicesInfos */geometryRecord[/* indicesInfos */8],
	            /* indicesTypeMap */geometryRecord[/* indicesTypeMap */9]
	          ],
	          /* cameraRecord */getCameraRecord$1(state),
	          /* basicMaterialRecord : record */[
	            /* shaderIndices */unsafeGetShaderIndices(state),
	            /* colors */unsafeGet$1(basicMaterialRecord[/* colors */1]),
	            /* textureIndices */unsafeGet$1(basicMaterialRecord[/* textureIndices */2]),
	            /* mapUnits */unsafeGetMapUnits(state)
	          ],
	          /* lightMaterialRecord : record */[
	            /* shaderIndices */unsafeGetShaderIndices$1(state),
	            /* diffuseColors */unsafeGet$1(lightMaterialRecord[/* diffuseColors */1]),
	            /* specularColors */unsafeGet$1(lightMaterialRecord[/* specularColors */2]),
	            /* shininess */unsafeGet$1(lightMaterialRecord[/* shininess */3]),
	            /* textureIndices */unsafeGet$1(lightMaterialRecord[/* textureIndices */4]),
	            /* diffuseMapUnits */unsafeGetDiffuseMapUnits(state),
	            /* specularMapUnits */unsafeGetSpecularMapUnits(state)
	          ],
	          /* meshRendererRecord : record */[/* drawModes */meshRendererRecord[/* drawModes */0]],
	          /* basicSourceTextureRecord : record */[
	            /* wrapSs */unsafeGet$1(basicSourceTextureRecord[/* wrapSs */0]),
	            /* wrapTs */unsafeGet$1(basicSourceTextureRecord[/* wrapTs */1]),
	            /* magFilters */unsafeGet$1(basicSourceTextureRecord[/* magFilters */2]),
	            /* minFilters */unsafeGet$1(basicSourceTextureRecord[/* minFilters */3]),
	            /* formats */unsafeGet$1(basicSourceTextureRecord[/* formats */4]),
	            /* types */unsafeGet$1(basicSourceTextureRecord[/* types */5]),
	            /* isNeedUpdates */unsafeGet$1(basicSourceTextureRecord[/* isNeedUpdates */6]),
	            /* flipYs */unsafeGet$1(basicSourceTextureRecord[/* flipYs */7]),
	            /* sourceMap */basicSourceTextureRecord[/* sourceMap */8],
	            /* glTextureMap */basicSourceTextureRecord[/* glTextureMap */9],
	            /* bindTextureUnitCacheMap */basicSourceTextureRecord[/* bindTextureUnitCacheMap */10],
	            /* setFlipYFunc */setFlipY$2
	          ],
	          /* arrayBufferViewSourceTextureRecord : record */[
	            /* wrapSs */unsafeGet$1(arrayBufferViewSourceTextureRecord[/* wrapSs */0]),
	            /* wrapTs */unsafeGet$1(arrayBufferViewSourceTextureRecord[/* wrapTs */1]),
	            /* magFilters */unsafeGet$1(arrayBufferViewSourceTextureRecord[/* magFilters */2]),
	            /* minFilters */unsafeGet$1(arrayBufferViewSourceTextureRecord[/* minFilters */3]),
	            /* formats */unsafeGet$1(arrayBufferViewSourceTextureRecord[/* formats */4]),
	            /* types */unsafeGet$1(arrayBufferViewSourceTextureRecord[/* types */5]),
	            /* isNeedUpdates */unsafeGet$1(arrayBufferViewSourceTextureRecord[/* isNeedUpdates */6]),
	            /* flipYs */unsafeGet$1(arrayBufferViewSourceTextureRecord[/* flipYs */7]),
	            /* widths */unsafeGet$1(arrayBufferViewSourceTextureRecord[/* widths */8]),
	            /* heights */unsafeGet$1(arrayBufferViewSourceTextureRecord[/* heights */9]),
	            /* sourceMap */unsafeGet$1(arrayBufferViewSourceTextureRecord[/* sourceMap */10]),
	            /* glTextureMap */arrayBufferViewSourceTextureRecord[/* glTextureMap */11],
	            /* bindTextureUnitCacheMap */arrayBufferViewSourceTextureRecord[/* bindTextureUnitCacheMap */12],
	            /* setFlipYFunc */setFlipY$2,
	            /* textureIndexOffset */getArrayBufferViewSourceTextureIndexOffset$1(state)
	          ],
	          /* directionLightRecord : record */[
	            /* index */directionLightRecord[/* index */0],
	            /* colors */directionLightRecord[/* colors */3],
	            /* intensities */directionLightRecord[/* intensities */4],
	            /* renderLightArr */getRenderLightArr$1(directionLightRecord),
	            /* directionMap */getDirectionMap(directionLightRecord)
	          ],
	          /* pointLightRecord : record */[
	            /* index */pointLightRecord[/* index */0],
	            /* colors */pointLightRecord[/* colors */3],
	            /* intensities */pointLightRecord[/* intensities */4],
	            /* constants */pointLightRecord[/* constants */5],
	            /* linears */pointLightRecord[/* linears */6],
	            /* quadratics */pointLightRecord[/* quadratics */7],
	            /* ranges */pointLightRecord[/* ranges */8],
	            /* renderLightArr */getRenderLightArr(pointLightRecord),
	            /* positionMap */getPositionMap(pointLightRecord)
	          ],
	          /* transformRecord : record */[
	            /* localToWorldMatrices */transformRecord[/* localToWorldMatrices */0],
	            /* localToWorldMatrixCacheMap */transformRecord[/* localToWorldMatrixCacheMap */4],
	            /* normalMatrixCacheMap */transformRecord[/* normalMatrixCacheMap */5]
	          ],
	          /* sourceInstanceRecord : record */[
	            /* objectInstanceTransformIndexMap */unsafeGetObjectInstanceTransformIndexMap(sourceInstanceRecord),
	            /* objectInstanceTransformCollections */unsafeGetObjectInstanceTransformCollections(sourceInstanceRecord),
	            /* isTransformStatics */unsafeGetIsTransformStaticMap(sourceInstanceRecord),
	            /* matrixInstanceBufferCapacityMap */sourceInstanceRecord[/* matrixInstanceBufferCapacityMap */3],
	            /* matrixFloat32ArrayMap */sourceInstanceRecord[/* matrixFloat32ArrayMap */4],
	            /* isSendTransformMatrixDataMap */sourceInstanceRecord[/* isSendTransformMatrixDataMap */5]
	          ],
	          /* gpuDetectRecord */gpuDetectRecord,
	          /* globalTempRecord */globalTempRecord,
	          /* deviceManagerRecord */deviceManagerRecord,
	          /* shaderRecord : record */[/* usedShaderIndexArray */shaderRecord[/* usedShaderIndexArray */3]],
	          /* settingRecord : record */[
	            /* gpu */settingRecord[/* gpu */0],
	            /* instanceBuffer *//* record */[/* objectInstanceCountPerSourceInstance */getObjectInstanceCountPerSourceInstance$1(settingRecord)],
	            /* textureCountPerMaterial */getTextureCountPerMaterial$1(settingRecord)
	          ],
	          /* workerDetectRecord : record */[/* isUseWorker */workerDetectRecord[/* isUseWorker */0]],
	          /* browserDetectRecord : record */[/* browser */browserDetectRecord[/* browser */0]]
	        ];
	}


	/* OptionService-Wonderjs Not a pure module */

	function _render(gl, state) {
	  var match = getBasicRenderObjectRecord$1(state);
	  if (match !== undefined) {
	    var match$1 = match;
	    render$2(gl, /* tuple */[
	          match$1[/* renderArray */0],
	          match$1[/* transformIndices */1],
	          match$1[/* materialIndices */2],
	          match$1[/* meshRendererIndices */3],
	          match$1[/* geometryIndices */4],
	          match$1[/* sourceInstanceIndices */5]
	        ], createRenderState(state));
	    return state;
	  } else {
	    return state;
	  }
	}

	function execJob$22(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var match = isRender(getRecord$1(e));
	                if (match) {
	                  var gl = unsafeGetGl(state[/* deviceManagerRecord */4]);
	                  setState$1(stateData, _render(gl, state));
	                  return e;
	                } else {
	                  return e;
	                }
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	var deserializeFunction = function (funcStr){
	    return eval('(' + funcStr + ')');
	    };

	var deserializeValueWithFunction = function (value){
	    return JSON.parse(value, (key, value) => {
	      if (typeof value != "string") {
	        return value;
	      }

	      return (value.substring(0, 8) == "function") ? eval('(' + value + ')') : value;
	    });
	    };


	/* No side effect */

	function getCustomDataInRenderWorker(state) {
	  return state[/* customRecord */29][/* customDataInRenderWorker */0];
	}

	function setCustomDataInRenderWorker(customData, state) {
	  var init = state[/* customRecord */29];
	  state[/* customRecord */29] = /* record */[
	    /* customDataInRenderWorker */customData,
	    /* customDataFromRenderWorkerToMainWorker */init[/* customDataFromRenderWorkerToMainWorker */1],
	    /* customDataFromMainWorkerToRenderWorker */init[/* customDataFromMainWorkerToRenderWorker */2]
	  ];
	  return state;
	}

	function getCustomDataFromRenderWorkerToMainWorker(state) {
	  return state[/* customRecord */29][/* customDataFromRenderWorkerToMainWorker */1];
	}

	function setCustomDataFromRenderWorkerToMainWorker(customData, state) {
	  var init = state[/* customRecord */29];
	  state[/* customRecord */29] = /* record */[
	    /* customDataInRenderWorker */init[/* customDataInRenderWorker */0],
	    /* customDataFromRenderWorkerToMainWorker */customData,
	    /* customDataFromMainWorkerToRenderWorker */init[/* customDataFromMainWorkerToRenderWorker */2]
	  ];
	  return state;
	}

	function getCustomDataFromMainWorkerToRenderWorker(state) {
	  return state[/* customRecord */29][/* customDataFromMainWorkerToRenderWorker */2];
	}

	function setCustomDataFromMainWorkerToRenderWorker(customData, state) {
	  var init = state[/* customRecord */29];
	  state[/* customRecord */29] = /* record */[
	    /* customDataInRenderWorker */init[/* customDataInRenderWorker */0],
	    /* customDataFromRenderWorkerToMainWorker */init[/* customDataFromRenderWorkerToMainWorker */1],
	    /* customDataFromMainWorkerToRenderWorker */customData
	  ];
	  return state;
	}


	/* No side effect */

	// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

	var beginGroup$2 = beginGroup;

	var endGroup$2 = endGroup;


	/* GroupLayoutIMGUIService-WonderImgui Not a pure module */

	var getRecord$17 = getRecord$3;

	function setRecord(record, state) {
	  state[/* imguiRecord */27] = record;
	  return state;
	}


	/* No side effect */

	function label$1(rect, str, align, state) {
	  var __x = label(rect, str, align, getRecord$17(state));
	  return setRecord(__x, state);
	}

	function image$1(rect, uv, id, state) {
	  var __x = image(rect, uv, id, getRecord$17(state));
	  return setRecord(__x, state);
	}

	function button$2(rect, str, state) {
	  var match = button(rect, str, getRecord$17(state));
	  return /* tuple */[
	          setRecord(match[0], state),
	          match[1]
	        ];
	}

	function box$1(rect, color, state) {
	  var __x = box(rect, color, getRecord$17(state));
	  return setRecord(__x, state);
	}

	function radioButton$2(groupDataArr, defaultSelectIndex, group, state) {
	  var match = radioButton(groupDataArr, defaultSelectIndex, group, getRecord$17(state));
	  return /* tuple */[
	          setRecord(match[0], state),
	          match[1]
	        ];
	}

	function checkbox$2(rect, defaultIsSelected, str, state) {
	  var match = checkbox(rect, defaultIsSelected, str, getRecord$17(state));
	  return /* tuple */[
	          setRecord(match[0], state),
	          match[1]
	        ];
	}

	function sliderInt$2(param, param$1, param$2, state) {
	  var match = sliderInt(/* tuple */[
	        param[0],
	        param[1]
	      ], /* tuple */[
	        param$1[0],
	        param$1[1]
	      ], /* tuple */[
	        param$2[0],
	        param$2[1]
	      ], getRecord$17(state));
	  return /* tuple */[
	          setRecord(match[0], state),
	          match[1],
	          match[2]
	        ];
	}

	function sliderFloat$2(param, param$1, param$2, state) {
	  var match = sliderFloat(/* tuple */[
	        param[0],
	        param[1]
	      ], /* tuple */[
	        param$1[0],
	        param$1[1],
	        param$1[2]
	      ], /* tuple */[
	        param$2[0],
	        param$2[1]
	      ], getRecord$17(state));
	  return /* tuple */[
	          setRecord(match[0], state),
	          match[1],
	          match[2]
	        ];
	}

	function beginGroup$1(position, state) {
	  var __x = beginGroup$2(position, getRecord$17(state));
	  return setRecord(__x, state);
	}

	function endGroup$1(state) {
	  var __x = endGroup$2(getRecord$17(state));
	  return setRecord(__x, state);
	}


	/* GroupLayoutIMGUIAPI-WonderImgui Not a pure module */

	function getAPIJsObj$1(state) {
	  return state[/* apiRecord */28][/* apiJsObj */0];
	}

	function create$11() {
	  return /* record */[/* apiJsObj */{
	            label: label$1,
	            image: image$1,
	            button: button$2,
	            box: box$1,
	            radioButton: radioButton$2,
	            checkbox: checkbox$2,
	            sliderInt: sliderInt$2,
	            sliderFloat: sliderFloat$2,
	            beginGroup: beginGroup$1,
	            endGroup: endGroup$1,
	            getCustomDataInRenderWorker: getCustomDataInRenderWorker,
	            setCustomDataInRenderWorker: setCustomDataInRenderWorker,
	            getCustomDataFromMainWorkerToRenderWorker: getCustomDataFromMainWorkerToRenderWorker,
	            getCustomDataFromRenderWorkerToMainWorker: getCustomDataFromRenderWorkerToMainWorker,
	            setCustomDataFromRenderWorkerToMainWorker: setCustomDataFromRenderWorkerToMainWorker
	          }];
	}


	/* FixedLayoutControlIMGUIRenderWorkerService-Wonderjs Not a pure module */

	function execJob$23(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var imguiData = data.imguiData;
	                var match = isJsonSerializedValueNone(imguiData.imguiFunc) || isJsonSerializedValueNone(imguiData.customData);
	                var imguiRecord = match ? getRecord$3(state) : setIMGUIFunc$1(deserializeValueWithFunction(unsafeGetJsonSerializedValue(imguiData.customData)), deserializeFunction(unsafeGetJsonSerializedValue(imguiData.imguiFunc)), getRecord$3(state));
	                state[/* imguiRecord */27] = imguiRecord;
	                var state$1 = render(unsafeGetGl(state[/* deviceManagerRecord */4]), imguiData.ioData, getAPIJsObj$1(state), /* tuple */[
	                      getRecord$17,
	                      setRecord
	                    ], state);
	                setState$1(stateData, state$1);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	/* No side effect */

	/* MostUtils-Wonderjs Not a pure module */

	function execJob$25(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var viewportData = data.viewportData;
	                state[/* deviceManagerRecord */4] = setViewportOfGl(unsafeGetGl(state[/* deviceManagerRecord */4]), viewportData, state[/* deviceManagerRecord */4]);
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function createTypeArrays$4(buffer, geometryPointCount, geometryCount) {
	  return /* tuple */[
	          new Float32Array(buffer, getVerticesOffset(geometryPointCount), getVertexLength(geometryPointCount)),
	          new Float32Array(buffer, getTexCoordsOffset(geometryPointCount), getTexCoordsLength(geometryPointCount)),
	          new Float32Array(buffer, getNormalsOffset(geometryPointCount), getVertexLength(geometryPointCount)),
	          new Uint16Array(buffer, getIndicesOffset(geometryPointCount), getIndicesLength(geometryPointCount)),
	          new Uint32Array(buffer, getIndices32Offset(geometryPointCount), getIndices32Length(geometryPointCount)),
	          new Uint32Array(buffer, getVerticesInfosOffset(geometryPointCount), getVerticesInfosLength(geometryCount)),
	          new Uint32Array(buffer, getTexCoordsInfosOffset(geometryPointCount, geometryCount), getTexCoordsInfosLength(geometryCount)),
	          new Uint32Array(buffer, getNormalsInfosOffset(geometryPointCount, geometryCount), getNormalsInfosLength(geometryCount)),
	          new Uint32Array(buffer, getIndicesInfosOffset(geometryPointCount, geometryCount), getIndicesInfosLength(geometryCount))
	        ];
	}


	/* BufferGeometryService-Wonderjs Not a pure module */

	function _createTypeArrays$1(buffer, geometryPointCount, geometryCount, indicesTypeMap, state) {
	  var match = createTypeArrays$4(buffer, geometryPointCount, geometryCount);
	  state[/* geometryRecord */18] = /* record */[
	    /* vertices */match[0],
	    /* texCoords */match[1],
	    /* normals */match[2],
	    /* indices */match[3],
	    /* indices32 */match[4],
	    /* verticesInfos */match[5],
	    /* texCoordsInfos */match[6],
	    /* normalsInfos */match[7],
	    /* indicesInfos */match[8],
	    /* indicesTypeMap */indicesTypeMap
	  ];
	  return state;
	}

	function execJob$26(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var geometryData = data.geometryData;
	                var buffer = geometryData.buffer;
	                var indicesTypeMap = geometryData.indicesTypeMap;
	                var geometryPointCount = data.bufferData.geometryPointCount;
	                var geometryCount = data.bufferData.geometryCount;
	                setState$1(stateData, _createTypeArrays$1(buffer, geometryPointCount, geometryCount, indicesTypeMap, state));
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function createTypeArrays$5(buffer, sourceInstanceCount, objectInstanceCountPerSourceInstance) {
	  return /* tuple */[
	          new Uint32Array(buffer, getObjectInstanceTransformCollectionsOffset(sourceInstanceCount, objectInstanceCountPerSourceInstance), getObjectInstanceTransformCollectionsLength(sourceInstanceCount, objectInstanceCountPerSourceInstance)),
	          new Uint8Array(buffer, getIsTransformStaticsOffset(sourceInstanceCount, objectInstanceCountPerSourceInstance), getIsTransformStaticsLength(sourceInstanceCount))
	        ];
	}


	/* BufferSourceInstanceService-Wonderjs Not a pure module */

	function _createTypeArrays$2(buffer, sourceInstanceCount, objectInstanceCountPerSourceInstance, state) {
	  var match = createTypeArrays$5(buffer, sourceInstanceCount, objectInstanceCountPerSourceInstance);
	  var init = state[/* sourceInstanceRecord */11];
	  state[/* sourceInstanceRecord */11] = /* record */[
	    /* objectInstanceTransformIndexMap */init[/* objectInstanceTransformIndexMap */0],
	    /* objectInstanceTransformCollections */some$1(match[0]),
	    /* isTransformStatics */some$1(match[1]),
	    /* matrixInstanceBufferCapacityMap */init[/* matrixInstanceBufferCapacityMap */3],
	    /* matrixFloat32ArrayMap */init[/* matrixFloat32ArrayMap */4],
	    /* isSendTransformMatrixDataMap */init[/* isSendTransformMatrixDataMap */5]
	  ];
	  return state;
	}

	function execJob$27(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var settingRecord = state[/* settingRecord */1];
	                var data = getRecord$1(e);
	                var sourceInstanceData = data.sourceInstanceData;
	                var state$1 = _createTypeArrays$2(sourceInstanceData.buffer, getSourceInstanceCount$1(settingRecord), getObjectInstanceCountPerSourceInstance$1(settingRecord), state);
	                var init = state$1[/* sourceInstanceRecord */11];
	                state$1[/* sourceInstanceRecord */11] = /* record */[
	                  /* objectInstanceTransformIndexMap */sourceInstanceData.objectInstanceTransformIndexMap,
	                  /* objectInstanceTransformCollections */init[/* objectInstanceTransformCollections */1],
	                  /* isTransformStatics */init[/* isTransformStatics */2],
	                  /* matrixInstanceBufferCapacityMap */init[/* matrixInstanceBufferCapacityMap */3],
	                  /* matrixFloat32ArrayMap */init[/* matrixFloat32ArrayMap */4],
	                  /* isSendTransformMatrixDataMap */init[/* isSendTransformMatrixDataMap */5]
	                ];
	                setState$1(stateData, state$1);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	/* ViewService-Wonderjs Not a pure module */

	/* No side effect */

	/* No side effect */

	function addValueWithoutDuplicate(key, value, arrayMap) {
	  var match = get$3(key, arrayMap);
	  if (match !== undefined) {
	    var valueArr = match;
	    var match$1 = valueArr.includes(value);
	    if (match$1) {
	      return arrayMap;
	    } else {
	      push(value, valueArr);
	      return arrayMap;
	    }
	  } else {
	    return set$1(key, /* array */[value], arrayMap);
	  }
	}

	function checkDuplicate(expectedMessage, key, _, arrayMap) {
	  return test(buildAssertMessage(expectedMessage, "not"), (function () {
	                var match = get$3(key, arrayMap);
	                if (match !== undefined) {
	                  var match$1 = reduceOneParam((function (param, value) {
	                          var map = param[0];
	                          var match = get$3(value, map);
	                          if (match !== undefined) {
	                            return /* tuple */[
	                                    map,
	                                    true
	                                  ];
	                          } else {
	                            return /* tuple */[
	                                    set$1(value, true, map),
	                                    param[1]
	                                  ];
	                          }
	                        }), /* tuple */[
	                        createEmpty$2(/* () */0),
	                        false
	                      ], match);
	                  return assertFalse(match$1[1]);
	                } else {
	                  return assertPass(/* () */0);
	                }
	              }));
	}


	/* Log-WonderLog Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* ComponentMapService-Wonderjs Not a pure module */

	/* Log-WonderLog Not a pure module */

	function getBufferMaxCount() {
	  return 4;
	}

	function getColorIndex$1(index) {
	  return imul(index, 3);
	}

	function getColorsOffset$1() {
	  return 0;
	}

	function getColorsLength$1(count) {
	  return imul(count, 3);
	}

	function getIntensitiesOffset(count) {
	  return imul(imul(count, 3), Float32Array.BYTES_PER_ELEMENT);
	}

	function getIntensitiesLength(count) {
	  return (count << 0);
	}

	function getConstantsOffset(count) {
	  return imul(imul(count, 3), Float32Array.BYTES_PER_ELEMENT) + imul((count << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getConstantsLength(count) {
	  return (count << 0);
	}

	function getLinearsOffset(count) {
	  return getConstantsOffset(count) + imul((count << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getLinearsLength(count) {
	  return (count << 0);
	}

	function getQuadraticsOffset(count) {
	  return getLinearsOffset(count) + imul((count << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getQuadraticsLength(count) {
	  return (count << 0);
	}

	function getRangesOffset(count) {
	  return getQuadraticsOffset(count) + imul((count << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getRangesLength(count) {
	  return (count << 0);
	}


	/* Worker-Wonderjs Not a pure module */

	function createTypeArrays$6(buffer, count) {
	  return /* tuple */[
	          new Float32Array(buffer, getColorsOffset$1(count), getColorsLength$1(count)),
	          new Float32Array(buffer, getIntensitiesOffset(count), getIntensitiesLength(count)),
	          new Float32Array(buffer, getConstantsOffset(count), getConstantsLength(count)),
	          new Float32Array(buffer, getLinearsOffset(count), getLinearsLength(count)),
	          new Float32Array(buffer, getQuadraticsOffset(count), getQuadraticsLength(count)),
	          new Float32Array(buffer, getRangesOffset(count), getRangesLength(count))
	        ];
	}


	/* BufferPointLightService-Wonderjs Not a pure module */

	function getColor$1(index, typeArr) {
	  return getFloat3(getColorIndex$1(index), typeArr);
	}

	function getIntensity(index, typeArr) {
	  return typeArr[index];
	}

	function getConstant(index, typeArr) {
	  return typeArr[index];
	}

	function getLinear(index, typeArr) {
	  return typeArr[index];
	}

	function getQuadratic(index, typeArr) {
	  return typeArr[index];
	}

	function getRange(index, typeArr) {
	  return typeArr[index];
	}


	/* OptionService-Wonderjs Not a pure module */

	/* ArrayService-WonderCommonlib Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	function getDefaultColor$1() {
	  return /* array */[
	          0,
	          0,
	          0
	        ];
	}


	/* No side effect */

	/* Log-WonderLog Not a pure module */

	/* No side effect */

	/* BufferService-Wonderjs Not a pure module */

	/* Contract-WonderLog Not a pure module */

	/* AddComponentService-Wonderjs Not a pure module */

	/* AddComponentService-Wonderjs Not a pure module */

	/* AddComponentService-Wonderjs Not a pure module */

	/* AddComponentService-Wonderjs Not a pure module */

	/* AddComponentService-Wonderjs Not a pure module */

	/* AddComponentService-Wonderjs Not a pure module */

	/* No side effect */

	/* AddComponentService-Wonderjs Not a pure module */

	/* AddComponentService-Wonderjs Not a pure module */

	function createTypeArrays$7(buffer, meshRendererCount) {
	  return /* tuple */[
	          new Uint8Array(buffer, getDrawModesOffset(meshRendererCount), getDrawModesLength(meshRendererCount)),
	          new Uint8Array(buffer, getIsRendersOffset(meshRendererCount), getIsRendersLength(meshRendererCount))
	        ];
	}


	/* BufferMeshRendererService-Wonderjs Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	/* GameObjectMapService-Wonderjs Not a pure module */

	/* SparseMapService-Wonderjs Not a pure module */

	/* HasComponentGameObjectService-Wonderjs Not a pure module */

	/* BufferMeshRendererService-Wonderjs Not a pure module */

	/* Log-WonderLog Not a pure module */

	function createTypeArrays$8(buffer, basicMaterialCount, textureCountPerMaterial) {
	  return /* tuple */[
	          new Uint32Array(buffer, getShaderIndicesOffset(basicMaterialCount), getShaderIndicesLength(basicMaterialCount)),
	          new Float32Array(buffer, getColorsOffset(basicMaterialCount), getColorsLength(basicMaterialCount)),
	          new Uint32Array(buffer, getTextureIndicesOffset(basicMaterialCount, textureCountPerMaterial), getTextureIndicesLength(basicMaterialCount, textureCountPerMaterial)),
	          new Uint8Array(buffer, getMapUnitsOffset(basicMaterialCount, textureCountPerMaterial), getMapUnitsLength(basicMaterialCount))
	        ];
	}


	/* ShaderIndicesService-Wonderjs Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	function getDiffuseColorsLength(lightMaterialCount) {
	  return imul(lightMaterialCount, 3);
	}

	function getDiffuseColorsOffset(lightMaterialCount) {
	  return imul(getShaderIndicesLength(lightMaterialCount), Uint32Array.BYTES_PER_ELEMENT);
	}

	function getSpecularColorsLength(lightMaterialCount) {
	  return imul(lightMaterialCount, 3);
	}

	function getSpecularColorsOffset(lightMaterialCount) {
	  return imul(getShaderIndicesLength(lightMaterialCount), Uint32Array.BYTES_PER_ELEMENT) + imul(imul(lightMaterialCount, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getShininessLength(lightMaterialCount) {
	  return (lightMaterialCount << 0);
	}

	function getShininessOffset(lightMaterialCount) {
	  return getSpecularColorsOffset(lightMaterialCount) + imul(imul(lightMaterialCount, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getDiffuseColorIndex(index) {
	  return imul(index, 3);
	}

	function getSpecularColorIndex(index) {
	  return imul(index, 3);
	}

	function getShininessIndex(index) {
	  return (index << 0);
	}

	function getTextureIndicesOffset$1(lightMaterialCount, _) {
	  return getShininessOffset(lightMaterialCount) + imul((lightMaterialCount << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getDiffuseMapUnitsLength(lightMaterialCount) {
	  return (lightMaterialCount << 0);
	}

	function getDiffuseMapUnitsOffset(lightMaterialCount, textureCountPerMaterial) {
	  return getTextureIndicesOffset$1(lightMaterialCount, textureCountPerMaterial) + imul(getTextureIndicesLength$1(lightMaterialCount, textureCountPerMaterial), Uint32Array.BYTES_PER_ELEMENT) | 0;
	}

	function getDiffuseMapUnitIndex(index) {
	  return (index << 0);
	}

	function getSpecularMapUnitsLength(lightMaterialCount) {
	  return (lightMaterialCount << 0);
	}

	function getSpecularMapUnitsOffset(lightMaterialCount, textureCountPerMaterial) {
	  return getDiffuseMapUnitsOffset(lightMaterialCount, textureCountPerMaterial) + imul((lightMaterialCount << 0), Uint8Array.BYTES_PER_ELEMENT) | 0;
	}

	function getSpecularMapUnitIndex(index) {
	  return (index << 0);
	}

	var getTextureIndicesLength$2 = getTextureIndicesLength$1;


	/* Worker-Wonderjs Not a pure module */

	function createTypeArrays$9(buffer, lightMaterialCount, textureCountPerMaterial) {
	  return /* tuple */[
	          new Uint32Array(buffer, getShaderIndicesOffset(lightMaterialCount), getShaderIndicesLength(lightMaterialCount)),
	          new Float32Array(buffer, getDiffuseColorsOffset(lightMaterialCount), getDiffuseColorsLength(lightMaterialCount)),
	          new Float32Array(buffer, getSpecularColorsOffset(lightMaterialCount), getSpecularColorsLength(lightMaterialCount)),
	          new Float32Array(buffer, getShininessOffset(lightMaterialCount), getShininessLength(lightMaterialCount)),
	          new Uint32Array(buffer, getTextureIndicesOffset$1(lightMaterialCount, textureCountPerMaterial), getTextureIndicesLength$2(lightMaterialCount, textureCountPerMaterial)),
	          new Uint8Array(buffer, getDiffuseMapUnitsOffset(lightMaterialCount, textureCountPerMaterial), getDiffuseMapUnitsLength(lightMaterialCount)),
	          new Uint8Array(buffer, getSpecularMapUnitsOffset(lightMaterialCount, textureCountPerMaterial), getSpecularMapUnitsLength(lightMaterialCount))
	        ];
	}


	/* ShaderIndicesService-Wonderjs Not a pure module */

	function getDiffuseColor(index, typeArr) {
	  return getFloat3(getDiffuseColorIndex(index), typeArr);
	}

	function getSpecularColor(index, typeArr) {
	  return getFloat3(getSpecularColorIndex(index), typeArr);
	}

	function getShininess(index, typeArr) {
	  return getFloat1(getShininessIndex(index), typeArr);
	}

	function getDiffuseMapUnit(index, typeArr) {
	  return getUint8_1(getDiffuseMapUnitIndex(index), typeArr);
	}

	function getSpecularMapUnit(index, typeArr) {
	  return getUint8_1(getSpecularMapUnitIndex(index), typeArr);
	}

	var getTextureIndex$3 = getTextureIndex$1;


	/* TypeArrayService-Wonderjs Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	function getBufferMaxCount$1() {
	  return 4;
	}

	function getColorIndex$2(index) {
	  return imul(index, 3);
	}

	function getIntensityIndex$1(index) {
	  return (index << 0);
	}

	function getColorsOffset$2() {
	  return 0;
	}

	function getColorsLength$2(count) {
	  return imul(count, 3);
	}

	function getIntensitiesOffset$1(count) {
	  return imul(imul(count, 3), Float32Array.BYTES_PER_ELEMENT);
	}

	function getIntensitiesLength$1(count) {
	  return (count << 0);
	}


	/* Worker-Wonderjs Not a pure module */

	function createTypeArrays$10(buffer, count) {
	  return /* tuple */[
	          new Float32Array(buffer, getColorsOffset$2(count), getColorsLength$2(count)),
	          new Float32Array(buffer, getIntensitiesOffset$1(count), getIntensitiesLength$1(count))
	        ];
	}


	/* BufferDirectionLightService-Wonderjs Not a pure module */

	function getColor$2(index, typeArr) {
	  return getFloat3(getColorIndex$2(index), typeArr);
	}

	function getIntensity$1(index, typeArr) {
	  return getFloat1(getIntensityIndex$1(index), typeArr);
	}


	/* OptionService-Wonderjs Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	/* AddComponentService-Wonderjs Not a pure module */

	/* AddComponentService-Wonderjs Not a pure module */

	/* AddGeometryService-Wonderjs Not a pure module */

	/* No side effect */

	/* No side effect */

	/* CreateTransformMainService-Wonderjs Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	/* RecordSceneMainService-Wonderjs Not a pure module */

	/* BufferSettingService-Wonderjs Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	/* OptionService-Wonderjs Not a pure module */

	/* ArrayService-Wonderjs Not a pure module */

	/* ArrayService-Wonderjs Not a pure module */

	/* No side effect */

	/* GameObjectMapService-Wonderjs Not a pure module */

	/* PositionLightMainService-Wonderjs Not a pure module */

	/* No side effect */

	/* RecordBasicSourceTextureMainService-Wonderjs Not a pure module */

	/* No side effect */

	/* GameObjectMapService-Wonderjs Not a pure module */

	/* ArrayService-WonderCommonlib Not a pure module */

	/* drawImage Not a pure module */

	/* Canvas-Wonderjs Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	function execJob$29(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var match = data.renderData.camera;
	                state[/* renderRecord */21][/* cameraRecord */2] = (match == null) ? undefined : /* record */[
	                    /* vMatrix */match.vMatrix,
	                    /* pMatrix */match.pMatrix,
	                    /* position */match.position
	                  ];
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function execJob$30(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var state$1 = setCustomDataFromMainWorkerToRenderWorker(data.customData, state);
	                setState$1(stateData, state$1);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function _createGetWorkerDataStream(flags, target) {
	  return filter((function (e) {
	                return e.data.operateType === getOperateType(flags);
	              }), fromEvent("message", target));
	}

	function createGetMainWorkerDataStream(flags, target) {
	  return map$2((function (e) {
	                return some$1(e);
	              }), _createGetWorkerDataStream(flags, target));
	}


	/* most Not a pure module */

	function execJob$31(flags, _, _$1) {
	  return createGetMainWorkerDataStream(flags, _1(getSelf, /* () */0));
	}


	/* WorkerService-Wonderjs Not a pure module */

	function _createTypeArrays$3(buffer, count, state) {
	  var match = createTypeArrays(buffer, count);
	  state[/* transformRecord */17] = /* record */[
	    /* localToWorldMatrices */match[0],
	    /* localPositions */match[1],
	    /* localRotations */match[2],
	    /* localScales */match[3],
	    /* localToWorldMatrixCacheMap */createEmpty$2(/* () */0),
	    /* normalMatrixCacheMap */createEmpty$2(/* () */0)
	  ];
	  return state;
	}

	function execJob$32(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var transformData = data.transformData;
	                var buffer = transformData.buffer;
	                var count = data.bufferData.transformCount;
	                setState$1(stateData, _createTypeArrays$3(buffer, count, state));
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	/* UpdateTransformMainService-Wonderjs Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	function execJob$35(flags, _, _$1) {
	  return createGetMainWorkerDataStream(flags, _1(getSelf, /* () */0));
	}


	/* WorkerService-Wonderjs Not a pure module */

	function execJob$36(_, e, _$1) {
	  return callFunc((function () {
	                var data = getRecord$1(e);
	                setIsDebug(stateData, data.isDebug);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function execJob$37(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var gpuData = data.gpuData;
	                var memoryData = data.memoryData;
	                var instanceBufferData = data.instanceBufferData;
	                state[/* settingRecord */1] = /* record */[
	                  /* gpu *//* record */[/* useHardwareInstance */gpuData.useHardwareInstance],
	                  /* instanceBuffer *//* record */[
	                    /* sourceInstanceCount */instanceBufferData.sourceInstanceCount,
	                    /* objectInstanceCountPerSourceInstance */instanceBufferData.objectInstanceCountPerSourceInstance
	                  ],
	                  /* textureCountPerMaterial */data.bufferData.textureCountPerMaterial,
	                  /* basicSourceTextureCount */data.bufferData.basicSourceTextureCount,
	                  /* arrayBufferViewSourceTextureCount */data.bufferData.arrayBufferViewSourceTextureCount,
	                  /* memory *//* record */[/* maxBigTypeArrayPoolSize */memoryData.maxBigTypeArrayPoolSize]
	                ];
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function _createRecordWithCreatedTypeArrays(buffer, count, index, state) {
	  var match = createTypeArrays$6(buffer, count);
	  state[/* pointLightRecord */20] = /* record */[
	    /* index */index,
	    /* positionMap */undefined,
	    /* renderLightArr */undefined,
	    /* colors */match[0],
	    /* intensities */match[1],
	    /* constants */match[2],
	    /* linears */match[3],
	    /* quadratics */match[4],
	    /* ranges */match[5]
	  ];
	  return state;
	}

	function _getData(pointLightData, state) {
	  var init = getRecord$11(state);
	  state[/* pointLightRecord */20] = /* record */[
	    /* index */init[/* index */0],
	    /* positionMap */init[/* positionMap */1],
	    /* renderLightArr */pointLightData.renderLightArr,
	    /* colors */init[/* colors */3],
	    /* intensities */init[/* intensities */4],
	    /* constants */init[/* constants */5],
	    /* linears */init[/* linears */6],
	    /* quadratics */init[/* quadratics */7],
	    /* ranges */init[/* ranges */8]
	  ];
	  return state;
	}

	function execJob$38(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var pointLightData = data.pointLightData;
	                var buffer = pointLightData.buffer;
	                var count = getBufferMaxCount(/* () */0);
	                setState$1(stateData, _getData(pointLightData, _createRecordWithCreatedTypeArrays(buffer, count, pointLightData.index, state)));
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function getChunk(name, glslChunkRecord) {
	  return getExn(get(name, glslChunkRecord[/* chunkMap */0]));
	}

	function _buildChunk(param, varDeclare, param$1, body) {
	  return /* record */[
	          /* top */param[0],
	          /* define */param[1],
	          /* varDeclare */varDeclare,
	          /* funcDeclare */param$1[0],
	          /* funcDefine */param$1[1],
	          /* body */body
	        ];
	}

	function create$26() {
	  return /* record */[/* chunkMap */set("webgl1_basic_map_fragment", _buildChunk(/* tuple */[
	                    "\n\n",
	                    "\n\n"
	                  ], "\nvarying vec2 v_mapCoord0;\n", /* tuple */[
	                    "\n\n",
	                    "\n\n"
	                  ], "\nvec4 totalColor = vec4(texture2D(u_mapSampler, v_mapCoord0).rgb * u_color, 1.0);\n"), set("webgl1_basic_map_vertex", _buildChunk(/* tuple */[
	                        "\n\n",
	                        "\n\n"
	                      ], "\nvarying vec2 v_mapCoord0;\n", /* tuple */[
	                        "\n\n",
	                        "\n\n"
	                      ], "\n//    vec2 sourceTexCoord0 = a_texCoord * u_map0SourceRegion.zw + u_map0SourceRegion.xy;\n//\n//    v_mapCoord0 = sourceTexCoord0 * u_map0RepeatRegion.zw + u_map0RepeatRegion.xy;\n\n    v_mapCoord0 = a_texCoord;\n"), set("webgl1_no_basic_map_fragment", _buildChunk(/* tuple */[
	                            "\n\n",
	                            "\n\n"
	                          ], "\n\n", /* tuple */[
	                            "\n\n",
	                            "\n\n"
	                          ], "\nvec4 totalColor = vec4(u_color, 1.0);\n"), set("webgl1_basic_end_fragment", _buildChunk(/* tuple */[
	                                "\n\n",
	                                "\n\n"
	                              ], "\n\n", /* tuple */[
	                                "\n\n",
	                                "\n\n"
	                              ], "\ngl_FragColor = vec4(totalColor.rgb, totalColor.a);\n"), set("webgl1_basic_vertex", _buildChunk(/* tuple */[
	                                    "\n\n",
	                                    "\n\n"
	                                  ], "\n\n", /* tuple */[
	                                    "\n\n",
	                                    "\n\n"
	                                  ], "\ngl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);\n"), set("common_define", _buildChunk(/* tuple */[
	                                        "\n\n",
	                                        "\n\n"
	                                      ], "\n\n", /* tuple */[
	                                        "\n\n",
	                                        "\n\n"
	                                      ], "\n\n"), set("common_fragment", _buildChunk(/* tuple */[
	                                            "\n\n",
	                                            "\n\n"
	                                          ], "\n\n", /* tuple */[
	                                            "\n\n",
	                                            "\n\n"
	                                          ], "\n\n"), set("common_function", _buildChunk(/* tuple */[
	                                                "\n\n",
	                                                "\n\n"
	                                              ], "\n\n", /* tuple */[
	                                                "\n\n",
	                                                "\n// mat2 transpose(mat2 m) {\n//   return mat2(  m[0][0], m[1][0],   // new col 0\n//                 m[0][1], m[1][1]    // new col 1\n//              );\n//   }\n\n// mat3 transpose(mat3 m) {\n//   return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0\n//                 m[0][1], m[1][1], m[2][1],  // new col 1\n//                 m[0][2], m[1][2], m[2][2]   // new col 1\n//              );\n//   }\n\n//bool isRenderArrayEmpty(int isRenderArrayEmpty){\n//  return isRenderArrayEmpty == 1;\n//}\n"
	                                              ], "\n\n"), set("common_vertex", _buildChunk(/* tuple */[
	                                                    "\n\n",
	                                                    "\n\n"
	                                                  ], "\n\n", /* tuple */[
	                                                    "\n\n",
	                                                    "\n// mat2 transpose(mat2 m) {\n//   return mat2(  m[0][0], m[1][0],   // new col 0\n//                 m[0][1], m[1][1]    // new col 1\n//              );\n//   }\n\n// mat3 transpose(mat3 m) {\n//   return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0\n//                 m[0][1], m[1][1], m[2][1],  // new col 1\n//                 m[0][2], m[1][2], m[2][2]   // new col 1\n//              );\n//   }\n\n//bool isRenderArrayEmpty(int isRenderArrayEmpty){\n//  return isRenderArrayEmpty == 1;\n//}\n"
	                                                  ], "\n\n"), set("highp_fragment", _buildChunk(/* tuple */[
	                                                        "\nprecision highp float;\nprecision highp int;\n",
	                                                        "\n\n"
	                                                      ], "\n\n", /* tuple */[
	                                                        "\n\n",
	                                                        "\n\n"
	                                                      ], "\n\n"), set("lowp_fragment", _buildChunk(/* tuple */[
	                                                            "\nprecision lowp float;\nprecision lowp int;\n",
	                                                            "\n\n"
	                                                          ], "\n\n", /* tuple */[
	                                                            "\n\n",
	                                                            "\n\n"
	                                                          ], "\n\n"), set("mediump_fragment", _buildChunk(/* tuple */[
	                                                                "\nprecision mediump float;\nprecision mediump int;\n",
	                                                                "\n\n"
	                                                              ], "\n\n", /* tuple */[
	                                                                "\n\n",
	                                                                "\n\n"
	                                                              ], "\n\n"), set("webgl1_setPos_mvp", _buildChunk(/* tuple */[
	                                                                    "\n\n",
	                                                                    "\n\n"
	                                                                  ], "\n\n", /* tuple */[
	                                                                    "\n\n",
	                                                                    "\n\n"
	                                                                  ], "\ngl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);\n"), set("modelMatrix_batch_instance_vertex", _buildChunk(/* tuple */[
	                                                                        "\n\n",
	                                                                        "\n\n"
	                                                                      ], "\n\n", /* tuple */[
	                                                                        "\n\n",
	                                                                        "\n\n"
	                                                                      ], "\nmat4 mMatrix = u_mMatrix;\n"), set("normalMatrix_batch_instance_vertex", _buildChunk(/* tuple */[
	                                                                            "\n\n",
	                                                                            "\n\n"
	                                                                          ], "\n\n", /* tuple */[
	                                                                            "\n\n",
	                                                                            "\n\n"
	                                                                          ], "\nmat3 normalMatrix = u_normalMatrix;\n"), set("modelMatrix_hardware_instance_vertex", _buildChunk(/* tuple */[
	                                                                                "\n\n",
	                                                                                "\n\n"
	                                                                              ], "\n\n", /* tuple */[
	                                                                                "\n\n",
	                                                                                "\n\n"
	                                                                              ], "\nmat4 mMatrix = mat4(a_mVec4_0, a_mVec4_1, a_mVec4_2, a_mVec4_3);\n"), set("normalMatrix_hardware_instance_vertex", _buildChunk(/* tuple */[
	                                                                                    "\n\n",
	                                                                                    "\n\n"
	                                                                                  ], "\n\n", /* tuple */[
	                                                                                    "\n\n",
	                                                                                    "\n\n"
	                                                                                  ], "\nmat3 normalMatrix = mat3(a_normalVec3_0, a_normalVec3_1, a_normalVec3_2);\n"), set("modelMatrix_noInstance_vertex", _buildChunk(/* tuple */[
	                                                                                        "\n\n",
	                                                                                        "\n\n"
	                                                                                      ], "\n\n", /* tuple */[
	                                                                                        "\n\n",
	                                                                                        "\n\n"
	                                                                                      ], "\nmat4 mMatrix = u_mMatrix;\n"), set("normalMatrix_noInstance_vertex", _buildChunk(/* tuple */[
	                                                                                            "\n\n",
	                                                                                            "\n\n"
	                                                                                          ], "\n\n", /* tuple */[
	                                                                                            "\n\n",
	                                                                                            "\n\n"
	                                                                                          ], "\nmat3 normalMatrix = u_normalMatrix;\n"), set("webgl1_diffuse_map_fragment", _buildChunk(/* tuple */[
	                                                                                                "\n\n",
	                                                                                                "\n\n"
	                                                                                              ], "\nvarying vec2 v_diffuseMapTexCoord;\n", /* tuple */[
	                                                                                                "\n\n",
	                                                                                                "\nvec3 getMaterialDiffuse() {\n        return texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord).rgb * u_diffuse;\n    }\n"
	                                                                                              ], "\n\n"), set("webgl1_diffuse_map_vertex", _buildChunk(/* tuple */[
	                                                                                                    "\n\n",
	                                                                                                    "\n\n"
	                                                                                                  ], "\nvarying vec2 v_diffuseMapTexCoord;\n", /* tuple */[
	                                                                                                    "\n\n",
	                                                                                                    "\n\n"
	                                                                                                  ], "\n//TODO optimize(combine, reduce compute numbers)\n    //TODO BasicTexture extract textureMatrix\n//    vec2 sourceTexCoord = a_texCoord * u_diffuseMapSourceRegion.zw + u_diffuseMapSourceRegion.xy;\n//    v_diffuseMapTexCoord = sourceTexCoord * u_diffuseMapRepeatRegion.zw + u_diffuseMapRepeatRegion.xy;\n\n    v_diffuseMapTexCoord = a_texCoord;\n"), set("webgl1_no_diffuse_map_fragment", _buildChunk(/* tuple */[
	                                                                                                        "\n\n",
	                                                                                                        "\n\n"
	                                                                                                      ], "\n\n", /* tuple */[
	                                                                                                        "\n\n",
	                                                                                                        "\nvec3 getMaterialDiffuse() {\n        return u_diffuse;\n    }\n"
	                                                                                                      ], "\n\n"), set("webgl1_no_emission_map_fragment", _buildChunk(/* tuple */[
	                                                                                                            "\n\n",
	                                                                                                            "\n\n"
	                                                                                                          ], "\n\n", /* tuple */[
	                                                                                                            "\n\n",
	                                                                                                            "\nvec3 getMaterialEmission() {\n        return vec3(0.0);\n    }\n"
	                                                                                                          ], "\n\n"), set("webgl1_no_light_map_fragment", _buildChunk(/* tuple */[
	                                                                                                                "\n\n",
	                                                                                                                "\n\n"
	                                                                                                              ], "\n\n", /* tuple */[
	                                                                                                                "\n\n",
	                                                                                                                "\nvec3 getMaterialLight() {\n        return vec3(0.0);\n    }\n"
	                                                                                                              ], "\n\n"), set("webgl1_no_normal_map_fragment", _buildChunk(/* tuple */[
	                                                                                                                    "\n\n",
	                                                                                                                    "\n\n"
	                                                                                                                  ], "\nvarying vec3 v_normal;\n", /* tuple */[
	                                                                                                                    "\nvec3 getNormal();\n",
	                                                                                                                    "\nvec3 getNormal(){\n    return v_normal;\n}\n\n#if POINT_LIGHTS_COUNT > 0\nvec3 getPointLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return getPointLightDirByLightPos(u_pointLights[x].position);\n        }\n    }\n    /*!\n    solve error in window7 chrome/firefox:\n    not all control paths return a value.\n    failed to create d3d shaders\n    */\n    return vec3(0.0);\n}\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvec3 getDirectionLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return getDirectionLightDir(u_directionLights[x].direction);\n        }\n    }\n\n    /*!\n    solve error in window7 chrome/firefox:\n    not all control paths return a value.\n    failed to create d3d shaders\n    */\n    return vec3(0.0);\n}\n#endif\n\n\nvec3 getViewDir(){\n    return normalize(u_cameraPos - v_worldPosition);\n}\n"
	                                                                                                                  ], "\n\n"), set("webgl1_no_normal_map_vertex", _buildChunk(/* tuple */[
	                                                                                                                        "\n\n",
	                                                                                                                        "\n\n"
	                                                                                                                      ], "\nvarying vec3 v_normal;\n", /* tuple */[
	                                                                                                                        "\n\n",
	                                                                                                                        "\n\n"
	                                                                                                                      ], "\nv_normal = normalize(normalMatrix * a_normal);\n"), set("webgl1_no_shadow_map_fragment", _buildChunk(/* tuple */[
	                                                                                                                            "\n\n",
	                                                                                                                            "\n\n"
	                                                                                                                          ], "\n\n", /* tuple */[
	                                                                                                                            "\n\n",
	                                                                                                                            "\nfloat getShadowVisibility() {\n        return 1.0;\n    }\n"
	                                                                                                                          ], "\n\n"), set("webgl1_no_specular_map_fragment", _buildChunk(/* tuple */[
	                                                                                                                                "\n\n",
	                                                                                                                                "\n\n"
	                                                                                                                              ], "\n\n", /* tuple */[
	                                                                                                                                "\n\n",
	                                                                                                                                "\nfloat getSpecularStrength() {\n        return 1.0;\n    }\n"
	                                                                                                                              ], "\n\n"), set("webgl1_specular_map_fragment", _buildChunk(/* tuple */[
	                                                                                                                                    "\n\n",
	                                                                                                                                    "\n\n"
	                                                                                                                                  ], "\nvarying vec2 v_specularMapTexCoord;\n", /* tuple */[
	                                                                                                                                    "\n\n",
	                                                                                                                                    "\nfloat getSpecularStrength() {\n        return texture2D(u_specularMapSampler, v_specularMapTexCoord).r;\n    }\n"
	                                                                                                                                  ], "\n\n"), set("webgl1_specular_map_vertex", _buildChunk(/* tuple */[
	                                                                                                                                        "\n\n",
	                                                                                                                                        "\n\n"
	                                                                                                                                      ], "\nvarying vec2 v_specularMapTexCoord;\n", /* tuple */[
	                                                                                                                                        "\n\n",
	                                                                                                                                        "\n\n"
	                                                                                                                                      ], "\nv_specularMapTexCoord = a_texCoord;\n"), set("webgl1_ambientLight_fragment", _buildChunk(/* tuple */[
	                                                                                                                                            "\n\n",
	                                                                                                                                            "\n\n"
	                                                                                                                                          ], "\nuniform vec3 u_ambient;\n", /* tuple */[
	                                                                                                                                            "\n\n",
	                                                                                                                                            "\n\n"
	                                                                                                                                          ], "\n\n"), set("webgl1_frontLight_common_fragment", _buildChunk(/* tuple */[
	                                                                                                                                                "\n\n",
	                                                                                                                                                "\n\n"
	                                                                                                                                              ], "\nvarying vec3 v_worldPosition;\n\n#if POINT_LIGHTS_COUNT > 0\nstruct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nstruct DirectionLight {\n    vec3 direction;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n", /* tuple */[
	                                                                                                                                                "\nvec3 getDirectionLightDir(vec3 lightDirection);\nvec3 getPointLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);\n",
	                                                                                                                                                "\nvec3 getDirectionLightDir(vec3 lightDirection){\n    lightDirection =  normalize(lightDirection);\n\n    return -lightDirection;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos){\n    return lightPos - v_worldPosition;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n"
	                                                                                                                                              ], "\n\n"), set("webgl1_frontLight_common_vertex", _buildChunk(/* tuple */[
	                                                                                                                                                    "\n\n",
	                                                                                                                                                    "\n\n"
	                                                                                                                                                  ], "\nvarying vec3 v_worldPosition;\n\n#if POINT_LIGHTS_COUNT > 0\nstruct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nstruct DirectionLight {\n    vec3 direction;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n", /* tuple */[
	                                                                                                                                                    "\nvec3 getDirectionLightDir(vec3 lightDirection);\nvec3 getPointLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);\n",
	                                                                                                                                                    "\nvec3 getDirectionLightDir(vec3 lightDirection){\n    lightDirection =  normalize(lightDirection);\n\n    return -lightDirection;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos){\n    return lightPos - v_worldPosition;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n"
	                                                                                                                                                  ], "\n\n"), set("webgl1_frontLight_common", _buildChunk(/* tuple */[
	                                                                                                                                                        "\n\n",
	                                                                                                                                                        "\n\n"
	                                                                                                                                                      ], "\nvarying vec3 v_worldPosition;\n\n#if POINT_LIGHTS_COUNT > 0\nstruct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nstruct DirectionLight {\n    vec3 direction;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n", /* tuple */[
	                                                                                                                                                        "\nvec3 getDirectionLightDir(vec3 lightDirection);\nvec3 getPointLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);\n",
	                                                                                                                                                        "\nvec3 getDirectionLightDir(vec3 lightDirection){\n    lightDirection =  normalize(lightDirection);\n\n    return -lightDirection;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos){\n    return lightPos - v_worldPosition;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n"
	                                                                                                                                                      ], "\n\n"), set("webgl1_frontLight_end_fragment", _buildChunk(/* tuple */[
	                                                                                                                                                            "\n\n",
	                                                                                                                                                            "\n\n"
	                                                                                                                                                          ], "\n\n", /* tuple */[
	                                                                                                                                                            "\n\n",
	                                                                                                                                                            "\n\n"
	                                                                                                                                                          ], "\ngl_FragColor = totalColor;\n"), set("webgl1_frontLight_fragment", _buildChunk(/* tuple */[
	                                                                                                                                                                "\n\n",
	                                                                                                                                                                "\n\n"
	                                                                                                                                                              ], "\n\n", /* tuple */[
	                                                                                                                                                                "\n\n",
	                                                                                                                                                                "\nfloat getBlinnShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){\n        vec3 halfAngle = normalize(lightDir + viewDir);\n\n        float blinnTerm = dot(normal, halfAngle);\n\n        blinnTerm = clamp(blinnTerm, 0.0, 1.0);\n        blinnTerm = dotResultBetweenNormAndLight != 0.0 ? blinnTerm : 0.0;\n        blinnTerm = pow(blinnTerm, shininess);\n\n        return blinnTerm;\n}\n\n// float getPhongShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){\n//         vec3 reflectDir = reflect(-lightDir, normal);\n//         float phongTerm = dot(viewDir, reflectDir);\n\n//         phongTerm = clamp(phongTerm, 0.0, 1.0);\n//         phongTerm = dotResultBetweenNormAndLight != 0.0 ? phongTerm : 0.0;\n//         phongTerm = pow(phongTerm, shininess);\n\n//         return phongTerm;\n// }\n\nvec3 calcAmbientColor(vec3 materialDiffuse){\n        vec3 materialLight = getMaterialLight();\n\n        return (u_ambient + materialLight) * materialDiffuse.rgb;\n}\n\nvec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir)\n{\n        vec3 materialDiffuse = getMaterialDiffuse();\n        vec3 materialSpecular = u_specular;\n        vec3 materialEmission = getMaterialEmission();\n\n        float specularStrength = getSpecularStrength();\n\n        float dotResultBetweenNormAndLight = dot(normal, lightDir);\n        float diff = max(dotResultBetweenNormAndLight, 0.0);\n\n        vec3 emissionColor = materialEmission;\n\n        vec3 ambientColor = calcAmbientColor(materialDiffuse);\n\n\n        // if(u_lightModel == 3){\n        //     return emissionColor + ambientColor;\n        // }\n\n//        vec4 diffuseColor = vec4(color * materialDiffuse.rgb * diff * intensity, materialDiffuse.a);\n        vec3 diffuseColor = color * materialDiffuse.rgb * diff * intensity;\n\n        float spec = 0.0;\n\n        // if(u_lightModel == 2){\n        //         spec = getPhongShininess(u_shininess, normal, lightDir, viewDir, diff);\n        // }\n        // else if(u_lightModel == 1){\n        //         spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);\n        // }\n\n        spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);\n\n\n        vec3 specularColor = spec * materialSpecular * specularStrength * intensity;\n\n//        return vec4(emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor), diffuseColor.a);\n        return emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor);\n}\n\n\n\n\n#if POINT_LIGHTS_COUNT > 0\n        vec3 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir)\n{\n        //lightDir is not normalize computing distance\n        float distance = length(lightDir);\n\n        float attenuation = 0.0;\n\n        if(distance < light.range)\n        {\n            attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));\n        }\n\n        lightDir = normalize(lightDir);\n\n        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\n        vec3 calcDirectionLight(vec3 lightDir, DirectionLight light, vec3 normal, vec3 viewDir)\n{\n        float attenuation = 1.0;\n\n        // lightDir = normalize(lightDir);\n\n        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n\n\n\nvec4 calcTotalLight(vec3 norm, vec3 viewDir){\n    vec4 totalLight = vec4(0.0, 0.0, 0.0, 1.0);\n\n\n    #if (DIRECTION_LIGHTS_COUNT == 0 && POINT_LIGHTS_COUNT == 0 )\n        return vec4(calcAmbientColor(getMaterialDiffuse()), 1.0);\n    #endif\n\n\n    #if POINT_LIGHTS_COUNT > 0\n                for(int i = 0; i < POINT_LIGHTS_COUNT; i++){\n                totalLight += vec4(calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir), 0.0);\n        }\n    #endif\n\n    #if DIRECTION_LIGHTS_COUNT > 0\n                for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){\n                totalLight += vec4(calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir), 0.0);\n        }\n    #endif\n\n        return totalLight;\n}\n"
	                                                                                                                                                              ], "\nvec3 normal = normalize(getNormal());\n\n// #ifdef BOTH_SIdE\n// normal = normal * (-1.0 + 2.0 * float(gl_FrontFacing));\n// #endif\n\nvec3 viewDir = normalize(getViewDir());\n\nvec4 totalColor = calcTotalLight(normal, viewDir);\n\n// totalColor.a *= u_opacity;\n\ntotalColor.rgb = totalColor.rgb * getShadowVisibility();\n"), set("webgl1_frontLight_setWorldPosition_vertex", _buildChunk(/* tuple */[
	                                                                                                                                                                    "\n\n",
	                                                                                                                                                                    "\n\n"
	                                                                                                                                                                  ], "\n\n", /* tuple */[
	                                                                                                                                                                    "\n\n",
	                                                                                                                                                                    "\n\n"
	                                                                                                                                                                  ], "\nv_worldPosition = vec3(mMatrix * vec4(a_position, 1.0));\n"), set("webgl1_frontLight_vertex", _buildChunk(/* tuple */[
	                                                                                                                                                                        "\n\n",
	                                                                                                                                                                        "\n\n"
	                                                                                                                                                                      ], "\n\n", /* tuple */[
	                                                                                                                                                                        "\n\n",
	                                                                                                                                                                        "\n\n"
	                                                                                                                                                                      ], "\ngl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);\n"), createEmpty(/* () */0)))))))))))))))))))))))))))))))))))))))];
	}


	/* HashMapService-WonderCommonlib Not a pure module */

	function getPrecisionSource(gpuDetectRecord, glslChunkRecord) {
	  var $$default = getChunk("highp_fragment", glslChunkRecord)[/* top */0];
	  var match = gpuDetectRecord[/* precision */2];
	  if (match !== undefined) {
	    switch (match) {
	      case 0 : 
	          return getChunk("highp_fragment", glslChunkRecord)[/* top */0];
	      case 1 : 
	          return getChunk("mediump_fragment", glslChunkRecord)[/* top */0];
	      case 2 : 
	          return getChunk("lowp_fragment", glslChunkRecord)[/* top */0];
	      
	    }
	  } else {
	    return $$default;
	  }
	}


	/* ShaderChunkSystem-Wonderjs Not a pure module */

	function execJob$39(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                state[/* glslRecord */7][/* precision */0] = getPrecisionSource(state[/* gpuDetectRecord */3], state[/* glslChunkRecord */10]);
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function execJob$40(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var geometryData = data.renderData.geometryData;
	                var indicesTypeMap = geometryData.indicesTypeMap;
	                var geometeryRecord = getRecord$9(state);
	                state[/* geometryRecord */18] = /* record */[
	                  /* vertices */geometeryRecord[/* vertices */0],
	                  /* texCoords */geometeryRecord[/* texCoords */1],
	                  /* normals */geometeryRecord[/* normals */2],
	                  /* indices */geometeryRecord[/* indices */3],
	                  /* indices32 */geometeryRecord[/* indices32 */4],
	                  /* verticesInfos */geometeryRecord[/* verticesInfos */5],
	                  /* texCoordsInfos */geometeryRecord[/* texCoordsInfos */6],
	                  /* normalsInfos */geometeryRecord[/* normalsInfos */7],
	                  /* indicesInfos */geometeryRecord[/* indicesInfos */8],
	                  /* indicesTypeMap */indicesTypeMap
	                ];
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function execJob$41(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var sourceInstanceData = data.renderData.sourceInstance;
	                var init = state[/* sourceInstanceRecord */11];
	                state[/* sourceInstanceRecord */11] = /* record */[
	                  /* objectInstanceTransformIndexMap */sourceInstanceData.objectInstanceTransformIndexMap,
	                  /* objectInstanceTransformCollections */init[/* objectInstanceTransformCollections */1],
	                  /* isTransformStatics */init[/* isTransformStatics */2],
	                  /* matrixInstanceBufferCapacityMap */init[/* matrixInstanceBufferCapacityMap */3],
	                  /* matrixFloat32ArrayMap */init[/* matrixFloat32ArrayMap */4],
	                  /* isSendTransformMatrixDataMap */init[/* isSendTransformMatrixDataMap */5]
	                ];
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function execJob$42(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var basicMaterialData = data.basicMaterialData;
	                state[/* basicMaterialRecord */12] = /* record */[
	                  /* shaderIndices */undefined,
	                  /* colors */undefined,
	                  /* textureIndices */undefined,
	                  /* mapUnits */undefined,
	                  /* index */basicMaterialData.index,
	                  /* disposedIndexArray */basicMaterialData.disposedIndexArray,
	                  /* isSourceInstanceMap */basicMaterialData.isSourceInstanceMap
	                ];
	                var lightMaterialData = data.lightMaterialData;
	                state[/* lightMaterialRecord */13] = /* record */[
	                  /* shaderIndices */undefined,
	                  /* diffuseColors */undefined,
	                  /* specularColors */undefined,
	                  /* shininess */undefined,
	                  /* textureIndices */undefined,
	                  /* diffuseMapUnits */undefined,
	                  /* specularMapUnits */undefined,
	                  /* index */lightMaterialData.index,
	                  /* disposedIndexArray */lightMaterialData.disposedIndexArray,
	                  /* isSourceInstanceMap */lightMaterialData.isSourceInstanceMap
	                ];
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function bindAndUpdate$2(gl, material, state) {
	  var lightMaterialRecord = state[/* lightMaterialRecord */8];
	  var diffuseMapUnit = getDiffuseMapUnit(material, lightMaterialRecord[/* diffuseMapUnits */5]);
	  var specularMapUnit = getSpecularMapUnit(material, lightMaterialRecord[/* specularMapUnits */6]);
	  return bindAndUpdate$1(/* tuple */[
	                gl,
	                material,
	                specularMapUnit
	              ], getTextureIndex$3, bindAndUpdate$1(/* tuple */[
	                    gl,
	                    material,
	                    diffuseMapUnit
	                  ], getTextureIndex$3, /* tuple */[
	                    lightMaterialRecord[/* textureIndices */4],
	                    state[/* settingRecord */20],
	                    state
	                  ]))[2];
	}


	/* OperateTypeArrayLightMaterialService-Wonderjs Not a pure module */

	function render$11(gl, indexTuple, state) {
	  return render$3(gl, indexTuple, bindAndUpdate$2, state);
	}


	/* RenderJobUtils-Wonderjs Not a pure module */

	function render$13(gl, indexTuple, state) {
	  return render$7(gl, indexTuple, render$11, state);
	}


	/* FrontRenderLightJobCommon-Wonderjs Not a pure module */

	function _fillMatrixTypeArr$1(transform, matricesArrayForInstance, tuple) {
	  var offset = tuple[1];
	  var state = tuple[0];
	  fillMatrixTypeArr(transform, matricesArrayForInstance, tuple);
	  var normalMatrix = getNormalMatrixTypeArray$1(transform, state);
	  fillFloat32ArrayWithFloat32Array(/* tuple */[
	        matricesArrayForInstance,
	        offset + 16 | 0
	      ], /* tuple */[
	        normalMatrix,
	        0
	      ], 9);
	  return /* tuple */[
	          state,
	          (offset + 16 | 0) + 9 | 0
	        ];
	}

	function render$14(gl, indexTuple, state) {
	  return render$9(gl, /* tuple */[
	              indexTuple,
	              6400,
	              112,
	              100
	            ], /* tuple */[
	              render$11,
	              _fillMatrixTypeArr$1
	            ], state);
	}


	/* TypeArrayService-Wonderjs Not a pure module */

	function render$12(gl, indexTuple, state) {
	  if (isSupportInstance(state)) {
	    return render$14(gl, indexTuple, state);
	  } else {
	    return render$13(gl, indexTuple, state);
	  }
	}


	/* JudgeInstanceRenderService-Wonderjs Not a pure module */

	function getShaderIndex$3(materialIndex, param) {
	  return getShaderIndex(materialIndex, param[/* lightMaterialRecord */8][/* shaderIndices */0]);
	}


	/* ShaderIndicesService-Wonderjs Not a pure module */

	function render$10(gl, param, state) {
	  var sourceInstanceIndices = param[5];
	  var geometryIndices = param[4];
	  var meshRendererIndices = param[3];
	  var materialIndices = param[2];
	  var transformIndices = param[1];
	  return reduceOneParam((function (state, index) {
	                var transformIndex = getComponent$1(index, transformIndices);
	                var materialIndex = getComponent$1(index, materialIndices);
	                var shaderIndex = getShaderIndex$1(materialIndex, getShaderIndex$3, state);
	                var meshRendererIndex = getComponent$1(index, meshRendererIndices);
	                var geometryIndex = getComponent$1(index, geometryIndices);
	                var sourceInstance = getComponent$1(index, sourceInstanceIndices);
	                if (hasSourceInstance(sourceInstance)) {
	                  return render$12(gl, /* tuple */[
	                              transformIndex,
	                              materialIndex,
	                              shaderIndex,
	                              meshRendererIndex,
	                              geometryIndex,
	                              sourceInstance
	                            ], state);
	                } else {
	                  var state$1 = render$11(gl, /* tuple */[
	                        transformIndex,
	                        materialIndex,
	                        shaderIndex,
	                        meshRendererIndex,
	                        geometryIndex
	                      ], state);
	                  draw$4(gl, meshRendererIndex, geometryIndex, state$1);
	                  return state$1;
	                }
	              }), state, param[0]);
	}


	/* RenderJobUtils-Wonderjs Not a pure module */

	function _render$1(gl, state) {
	  var match = getLightRenderObjectRecord$1(state);
	  if (match !== undefined) {
	    var match$1 = match;
	    render$10(gl, /* tuple */[
	          match$1[/* renderArray */0],
	          match$1[/* transformIndices */1],
	          match$1[/* materialIndices */2],
	          match$1[/* meshRendererIndices */3],
	          match$1[/* geometryIndices */4],
	          match$1[/* sourceInstanceIndices */5]
	        ], createRenderState(state));
	    return state;
	  } else {
	    return state;
	  }
	}

	function execJob$43(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var match = isRender(getRecord$1(e));
	                if (match) {
	                  var gl = unsafeGetGl(state[/* deviceManagerRecord */4]);
	                  setState$1(stateData, _render$1(gl, state));
	                  return e;
	                } else {
	                  return e;
	                }
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function _createTypeArrays$4(buffer, meshRendererCount, state) {
	  var match = createTypeArrays$7(buffer, meshRendererCount);
	  state[/* meshRendererRecord */14] = /* record */[
	    /* drawModes */match[0],
	    /* isRenders */match[1]
	  ];
	  return state;
	}

	function execJob$44(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var meshRendererData = data.meshRendererData;
	                var buffer = meshRendererData.buffer;
	                var meshRendererCount = data.bufferData.meshRendererCount;
	                setState$1(stateData, _createTypeArrays$4(buffer, meshRendererCount, state));
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	/* ArrayService-Wonderjs Not a pure module */

	function getShaders(param) {
	  return param[/* shaders */0];
	}

	function getShaderLibs(param) {
	  return param[/* shaderLibs */1];
	}

	function getPass(param) {
	  return param[/* pass */2];
	}

	function getFail(param) {
	  return param[/* fail */3];
	}


	/* No side effect */

	/* OptionService-Wonderjs Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* GetWorkerDataUtils-Wonderjs Not a pure module */

	/* most Not a pure module */

	function execJob$47(flags, _, _$1) {
	  return createGetMainWorkerDataStream(flags, _1(getSelf, /* () */0));
	}


	/* WorkerService-Wonderjs Not a pure module */

	function execJob$48(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var pointLightData = data.pointLightData;
	                var pointLightRecord = getRecord$11(state);
	                state[/* pointLightRecord */20] = /* record */[
	                  /* index */pointLightData.index,
	                  /* positionMap */pointLightData.positionMap,
	                  /* renderLightArr */pointLightData.renderLightArr,
	                  /* colors */pointLightRecord[/* colors */3],
	                  /* intensities */pointLightRecord[/* intensities */4],
	                  /* constants */pointLightRecord[/* constants */5],
	                  /* linears */pointLightRecord[/* linears */6],
	                  /* quadratics */pointLightRecord[/* quadratics */7],
	                  /* ranges */pointLightRecord[/* ranges */8]
	                ];
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function isNotDisposed(disposedIndexArray) {
	  return disposedIndexArray.length === 0;
	}


	/* ArrayService-Wonderjs Not a pure module */

	function _initMaterialShader(gl, param, param$1, param$2) {
	  var state = param$2[2];
	  var renderConfigRecord = param$2[1];
	  var materialIndex = param[0];
	  var shaders = getShaders(renderConfigRecord);
	  param$1[2](materialIndex, _4(param$1[0], materialIndex, /* tuple */[
	            gl,
	            param$1[4](materialIndex, /* tuple */[
	                  param[1],
	                  param[2]
	                ], /* tuple */[
	                  shaders,
	                  _1(param$1[3], shaders),
	                  getShaderLibs(renderConfigRecord)
	                ], state)
	          ], param$1[1], state), param$2[0]);
	  return state;
	}

	var initMaterial$1 = _initMaterialShader;

	function init$6(gl, param, initMaterialFunc, param$1) {
	  var disposedIndexArray = param$1[1];
	  var isSupportInstance = param[1];
	  var isSourceInstanceMap = param[0];
	  requireCheck((function () {
	          return test(buildAssertMessage("not dispose any material before init", "do"), (function () {
	                        return assertTrue(isNotDisposed(disposedIndexArray));
	                      }));
	        }), getIsDebug(stateData));
	  return reduceOneParam((function (state, materialIndex) {
	                return initMaterialFunc(gl, /* tuple */[
	                            materialIndex,
	                            unsafeGetIsSourceInstance(materialIndex, isSourceInstanceMap),
	                            isSupportInstance
	                          ], state);
	              }), param$1[2], range$1(0, param$1[0] - 1 | 0));
	}


	/* Log-WonderLog Not a pure module */

	function getShaderIndex$4(key, param) {
	  var shaderIndexMap = param[/* shaderIndexMap */1];
	  return get(key, shaderIndexMap);
	}

	function setShaderIndex$1(key, shaderIndex, param) {
	  var shaderIndexMap = param[/* shaderIndexMap */1];
	  return set(key, shaderIndex, shaderIndexMap);
	}

	function genereateShaderIndex(record) {
	  var index = record[/* index */0];
	  record[/* index */0] = index + 1 | 0;
	  return ensureCheck((function (r) {
	                var defaultShaderIndex = getDefaultShaderIndex(/* () */0);
	                return test(buildAssertMessage("not equal default shader index:" + (String(defaultShaderIndex) + " "), "equal"), (function () {
	                              return Operators[/* <>= */3](r, defaultShaderIndex);
	                            }));
	              }), getIsDebug(stateData), index);
	}

	function useShaderIndex(shaderIndex, record) {
	  var usedShaderIndexArray = record[/* usedShaderIndexArray */3];
	  push(shaderIndex, usedShaderIndexArray);
	  return record;
	}


	/* Log-WonderLog Not a pure module */

	function addMaterialWithoutDuplicate(shaderIndex, material, record) {
	  var materialsMap = record[/* materialsMap */2];
	  addValueWithoutDuplicate(shaderIndex, material, materialsMap);
	  return ensureCheck((function (param) {
	                var materialsMap = param[/* materialsMap */2];
	                return checkDuplicate("material should only use the same shaderIndex once", shaderIndex, material, materialsMap);
	              }), getIsDebug(stateData), record);
	}


	/* Contract-WonderLog Not a pure module */

	function _join(array) {
	  var output = "";
	  for(var i = 0 ,i_finish = array.length - 1 | 0; i <= i_finish; ++i){
	    output = output + caml_array_get(array, i)[/* name */0];
	  }
	  return output;
	}

	function _createProgramAndInit(gl, shaderIndex, param, programRecord) {
	  return initShader$1(param[0], param[1], gl, registerProgram(shaderIndex, programRecord, gl.createProgram()));
	}

	function _initNewShader(_, shaderIndex, key, param, param$1, param$2) {
	  var shaderLibDataArr = param[1];
	  var gl = param[0];
	  setShaderIndex$1(key, shaderIndex, useShaderIndex(shaderIndex, param$2[0]));
	  var match = param$1[0](shaderLibDataArr, param$1[1], /* tuple */[
	        param$2[2],
	        param$2[5]
	      ]);
	  var program = _createProgramAndInit(gl, shaderIndex, /* tuple */[
	        match[0],
	        match[1]
	      ], param$2[1]);
	  var recordTuple = param$1[2](/* tuple */[
	        gl,
	        shaderIndex,
	        program
	      ], shaderLibDataArr, /* tuple */[
	        param$2[3],
	        param$2[4]
	      ]);
	  param$1[3](gl, /* tuple */[
	        program,
	        shaderIndex,
	        shaderLibDataArr
	      ], recordTuple);
	  return shaderIndex;
	}

	function _initShader(materialIndex, param, param$1, param$2) {
	  var shaderRecord = param$2[0];
	  var shaderLibDataArr = param[1];
	  var key = _join(shaderLibDataArr);
	  var match = getShaderIndex$4(key, shaderRecord);
	  if (match !== undefined) {
	    var shaderIndex = match;
	    addMaterialWithoutDuplicate(shaderIndex, materialIndex, shaderRecord);
	    return shaderIndex;
	  } else {
	    var shaderIndex$1 = genereateShaderIndex(shaderRecord);
	    var shaderRecord$1 = addMaterialWithoutDuplicate(shaderIndex$1, materialIndex, shaderRecord);
	    return _initNewShader(materialIndex, shaderIndex$1, key, /* tuple */[
	                param[0],
	                shaderLibDataArr
	              ], /* tuple */[
	                param$1[0],
	                param$1[1],
	                param$1[2],
	                param$1[3]
	              ], /* tuple */[
	                shaderRecord$1,
	                param$2[1],
	                param$2[2],
	                param$2[3],
	                param$2[4],
	                param$2[5]
	              ]);
	  }
	}

	function initMaterialShader$1(materialIndex, param, param$1, param$2) {
	  return _initShader(materialIndex, /* tuple */[
	              param[0],
	              param[1]
	            ], /* tuple */[
	              param$1[0],
	              param$1[1],
	              param$1[2],
	              param$1[3]
	            ], /* tuple */[
	              param$2[0],
	              param$2[1],
	              param$2[2],
	              param$2[3],
	              param$2[4],
	              param$2[5]
	            ]);
	}


	/* ProgramService-Wonderjs Not a pure module */

	function getHandle(name) {
	  return fatal(buildFatalMessage("getHandle", "unknown handle name: " + (String(name) + ""), "", "", ""));
	}


	/* Log-WonderLog Not a pure module */

	function addUniformSendDataByType$2(pos, param, param$1) {
	  return /* tuple */[
	          param[0],
	          param[1],
	          param[2],
	          param[3],
	          param[4],
	          push(/* record */[
	                /* pos */pos,
	                /* getDataFunc */param$1[0],
	                /* sendDataFunc */param$1[1]
	              ], param[5])
	        ];
	}

	function setToUniformSendMap$2(shaderIndex, uniformInstanceSendNoCachableDataMap, instanceSendNoCachableDataArr) {
	  set$1(shaderIndex, instanceSendNoCachableDataArr, uniformInstanceSendNoCachableDataMap);
	  return /* () */0;
	}


	/* ArrayService-Wonderjs Not a pure module */

	function addModelSendData(param, sendDataArrTuple) {
	  var type_ = param[3];
	  var pos = param[1];
	  var field = param[0];
	  switch (field) {
	    case "instance_mMatrix" : 
	        return addUniformSendDataByType$2(pos, sendDataArrTuple, /* tuple */[
	                    getLocalToWorldMatrixTypeArray$2,
	                    sendMatrix4
	                  ]);
	    case "instance_normalMatrix" : 
	        return addUniformSendDataByType$2(pos, sendDataArrTuple, /* tuple */[
	                    getNormalMatrixTypeArray$1,
	                    sendMatrix3
	                  ]);
	    case "mMatrix" : 
	        return addUniformSendDataByType(/* tuple */[
	                    pos,
	                    type_
	                  ], sendDataArrTuple, getLocalToWorldMatrixTypeArray$2);
	    case "normalMatrix" : 
	        return addUniformSendDataByType(/* tuple */[
	                    pos,
	                    type_
	                  ], sendDataArrTuple, getNormalMatrixTypeArray$1);
	    default:
	      return fatal(buildFatalMessage("_addModelSendData", "unknow field:" + (String(field) + ""), "", "", ""));
	  }
	}


	/* Log-WonderLog Not a pure module */

	function hasCameraRecord$1(state) {
	  return isSome(state[/* cameraRecord */6]);
	}

	function getCameraVMatrixData(state) {
	  return unsafeGet$1(state[/* cameraRecord */6])[/* vMatrix */0];
	}

	function getCameraPMatrixData(state) {
	  return unsafeGet$1(state[/* cameraRecord */6])[/* pMatrix */1];
	}

	function getCameraPositionData(state) {
	  return unsafeGet$1(state[/* cameraRecord */6])[/* position */2];
	}


	/* OptionService-Wonderjs Not a pure module */

	function addUniformSendDataByType$3(param, param$1, getDataFunc) {
	  return /* tuple */[
	          param$1[0],
	          param$1[1],
	          param$1[2],
	          push(/* record */[
	                /* shaderCacheMap */param[0],
	                /* name */param[1],
	                /* pos */param[2],
	                /* getDataFunc */getDataFunc,
	                /* sendDataFunc */getSendCachableDataByType(param[3])
	              ], param$1[3]),
	          param$1[4],
	          param$1[5]
	        ];
	}

	function setToUniformSendMap$3(shaderIndex, uniformShaderSendCachableDataMap, shaderSendCachableDataArr) {
	  return set$1(shaderIndex, shaderSendCachableDataArr, uniformShaderSendCachableDataMap);
	}

	function unsafeGetUniformSendData$4(shaderIndex, glslSenderRecord) {
	  return unsafeGetUniformSendData$1(shaderIndex, glslSenderRecord[/* uniformShaderSendCachableDataMap */6]);
	}


	/* ArrayService-Wonderjs Not a pure module */

	function addUniformSendDataByType$4(param, param$1, getDataFunc) {
	  return /* tuple */[
	          param$1[0],
	          param$1[1],
	          push(/* record */[
	                /* pos */param[1],
	                /* getDataFunc */getDataFunc,
	                /* sendDataFunc */getSendNoCachableDataByType(param[0])
	              ], param$1[2]),
	          param$1[3],
	          param$1[4],
	          param$1[5]
	        ];
	}

	function setToUniformSendMap$4(shaderIndex, uniformShaderSendNoCachableDataMap, shaderSendNoCachableDataArr) {
	  return set$1(shaderIndex, shaderSendNoCachableDataArr, uniformShaderSendNoCachableDataMap);
	}

	function unsafeGetUniformSendData$5(shaderIndex, glslSenderRecord) {
	  return unsafeGetUniformSendData$1(shaderIndex, glslSenderRecord[/* uniformShaderSendNoCachableDataMap */5]);
	}


	/* ArrayService-Wonderjs Not a pure module */

	function addCameraSendData(param, sendDataArrTuple) {
	  var type_ = param[3];
	  var pos = param[1];
	  var field = param[0];
	  switch (field) {
	    case "pMatrix" : 
	        return addUniformSendDataByType$4(/* tuple */[
	                    type_,
	                    pos
	                  ], sendDataArrTuple, getCameraPMatrixData);
	    case "position" : 
	        return addUniformSendDataByType$3(/* tuple */[
	                    param[4],
	                    param[2],
	                    pos,
	                    type_
	                  ], sendDataArrTuple, getCameraPositionData);
	    case "vMatrix" : 
	        return addUniformSendDataByType$4(/* tuple */[
	                    type_,
	                    pos
	                  ], sendDataArrTuple, getCameraVMatrixData);
	    default:
	      return fatal(buildFatalMessage("_addCameraSendData", "unknow field:" + (String(field) + ""), "", "", ""));
	  }
	}


	/* Log-WonderLog Not a pure module */

	function getColor$3(material, param) {
	  return getColor(material, param[/* basicMaterialRecord */7][/* colors */1]);
	}

	function getMapUnit$1(material, param) {
	  return getMapUnit(material, param[/* basicMaterialRecord */7][/* mapUnits */3]);
	}


	/* OperateTypeArrayBasicMaterialService-Wonderjs Not a pure module */

	function getDiffuseColor$1(material, param) {
	  return getDiffuseColor(material, param[/* lightMaterialRecord */8][/* diffuseColors */1]);
	}

	function getSpecularColor$1(material, param) {
	  return getSpecularColor(material, param[/* lightMaterialRecord */8][/* specularColors */2]);
	}

	function getShininess$1(material, param) {
	  return getShininess(material, param[/* lightMaterialRecord */8][/* shininess */3]);
	}

	function getDiffuseMapUnit$1(material, param) {
	  return getDiffuseMapUnit(material, param[/* lightMaterialRecord */8][/* diffuseMapUnits */5]);
	}

	function getSpecularMapUnit$1(material, param) {
	  return getSpecularMapUnit(material, param[/* lightMaterialRecord */8][/* specularMapUnits */6]);
	}


	/* OperateTypeArrayLightMaterialService-Wonderjs Not a pure module */

	function addBasicMaterialSendData(param, sendDataArrTuple) {
	  var uniformCacheMap = param[4];
	  var type_ = param[3];
	  var name = param[2];
	  var pos = param[1];
	  var field = param[0];
	  switch (field) {
	    case "color" : 
	        return addUniformSendDataByType$1(/* tuple */[
	                    uniformCacheMap,
	                    name,
	                    pos,
	                    type_
	                  ], sendDataArrTuple, getColor$3);
	    case "map" : 
	        return addUniformTextureSendDataByType(/* tuple */[
	                    uniformCacheMap,
	                    name,
	                    pos,
	                    type_
	                  ], sendDataArrTuple, getMapUnit$1);
	    default:
	      return fatal(buildFatalMessage("_addBasicMaterialSendData", "unknow field:" + (String(field) + ""), "", "", ""));
	  }
	}

	function addLightMaterialSendData(param, sendDataArrTuple) {
	  var uniformCacheMap = param[4];
	  var type_ = param[3];
	  var name = param[2];
	  var pos = param[1];
	  var field = param[0];
	  switch (field) {
	    case "diffuseColor" : 
	        return addUniformSendDataByType$1(/* tuple */[
	                    uniformCacheMap,
	                    name,
	                    pos,
	                    type_
	                  ], sendDataArrTuple, getDiffuseColor$1);
	    case "diffuseMap" : 
	        return addUniformTextureSendDataByType(/* tuple */[
	                    uniformCacheMap,
	                    name,
	                    pos,
	                    type_
	                  ], sendDataArrTuple, getDiffuseMapUnit$1);
	    case "shininess" : 
	        return addUniformSendDataByType$1(/* tuple */[
	                    uniformCacheMap,
	                    name,
	                    pos,
	                    type_
	                  ], sendDataArrTuple, getShininess$1);
	    case "specularColor" : 
	        return addUniformSendDataByType$1(/* tuple */[
	                    uniformCacheMap,
	                    name,
	                    pos,
	                    type_
	                  ], sendDataArrTuple, getSpecularColor$1);
	    case "specularMap" : 
	        return addUniformTextureSendDataByType(/* tuple */[
	                    uniformCacheMap,
	                    name,
	                    pos,
	                    type_
	                  ], sendDataArrTuple, getSpecularMapUnit$1);
	    default:
	      return fatal(buildFatalMessage("_addLightMaterialSendData", "unknow field:" + (String(field) + ""), "", "", ""));
	  }
	}


	/* Log-WonderLog Not a pure module */

	function getOrCreateHashMap(map) {
	  if (map !== undefined) {
	    return valFromOption(map);
	  } else {
	    return createEmpty(/* () */0);
	  }
	}


	/* HashMapService-WonderCommonlib Not a pure module */

	function addUniformSendDataByType$5(param, param$1, sendDataFunc) {
	  return /* tuple */[
	          param$1[0],
	          param$1[1],
	          param$1[2],
	          param$1[3],
	          push(/* record */[
	                /* program */param[0],
	                /* shaderCacheMap */param[1],
	                /* locationMap */param[2],
	                /* sendCachableFunctionDataFunc */sendDataFunc
	              ], param$1[4]),
	          param$1[5]
	        ];
	}

	function setToUniformSendMap$5(shaderIndex, uniformShaderSendCachableFunctionDataMap, shaderSendCachableFunctionDataArr) {
	  return set$1(shaderIndex, shaderSendCachableFunctionDataArr, uniformShaderSendCachableFunctionDataMap);
	}

	function unsafeGetUniformSendData$6(shaderIndex, glslSenderRecord) {
	  return unsafeGetUniformSendData$1(shaderIndex, glslSenderRecord[/* uniformShaderSendCachableFunctionDataMap */7]);
	}


	/* ArrayService-Wonderjs Not a pure module */

	function _setToUniformSendMap(shaderIndex, param, param$1) {
	  setToUniformSendMap(shaderIndex, param[/* uniformRenderObjectSendModelDataMap */3], param$1[0]);
	  setToUniformSendMap$1(shaderIndex, param[/* uniformRenderObjectSendMaterialDataMap */4], param$1[1]);
	  setToUniformSendMap$4(shaderIndex, param[/* uniformShaderSendNoCachableDataMap */5], param$1[2]);
	  setToUniformSendMap$3(shaderIndex, param[/* uniformShaderSendCachableDataMap */6], param$1[3]);
	  setToUniformSendMap$5(shaderIndex, param[/* uniformShaderSendCachableFunctionDataMap */7], param$1[4]);
	  setToUniformSendMap$2(shaderIndex, param[/* uniformInstanceSendNoCachableDataMap */8], param$1[5]);
	  return /* () */0;
	}

	function readUniformSendData(shaderLibDataArr, param, readUniformsFunc, param$1) {
	  var uniformCacheMap = param$1[1];
	  var uniformLocationMap = param$1[0];
	  var program = param[1];
	  var gl = param[0];
	  return reduceOneParam((function (sendDataArrTuple, param) {
	                var variables = param[/* variables */2];
	                var match = isJsonSerializedValueNone(variables);
	                if (match) {
	                  return sendDataArrTuple;
	                } else {
	                  var match$1 = unsafeGetJsonSerializedValue(variables);
	                  return readUniformsFunc(/* tuple */[
	                              gl,
	                              program,
	                              uniformLocationMap,
	                              uniformCacheMap
	                            ], sendDataArrTuple, match$1[/* uniforms */0]);
	                }
	              }), /* tuple */[
	              /* array */[],
	              /* array */[],
	              /* array */[],
	              /* array */[],
	              /* array */[],
	              /* array */[]
	            ], shaderLibDataArr);
	}

	function addUniformSendData$1(gl, param, readUniformSendDataFunc, param$1) {
	  var glslLocationRecord = param$1[1];
	  var glslSenderRecord = param$1[0];
	  var shaderIndex = param[1];
	  var uniformLocationMap = getOrCreateHashMap(getUniformLocationMap(shaderIndex, glslLocationRecord));
	  return /* tuple */[
	          _setToUniformSendMap(shaderIndex, glslSenderRecord, readUniformSendDataFunc(param[2], gl, param[0], /* tuple */[
	                    uniformLocationMap,
	                    getOrCreateHashMap(getCacheMap(shaderIndex, glslSenderRecord[/* uniformCacheMap */2]))
	                  ])),
	          setUniformLocationMap(shaderIndex, uniformLocationMap, glslLocationRecord)
	        ];
	}


	/* Log-WonderLog Not a pure module */

	function _readUniforms(param, sendDataArrTuple, uniforms) {
	  var uniformCacheMap = param[3];
	  var uniformLocationMap = param[2];
	  var program = param[1];
	  var gl = param[0];
	  var match = isJsonSerializedValueNone(uniforms);
	  if (match) {
	    return sendDataArrTuple;
	  } else {
	    return reduceOneParam((function (sendDataArrTuple, param) {
	                  var from = param[/* from */3];
	                  var type_ = param[/* type_ */2];
	                  var field = param[/* field */1];
	                  var name = param[/* name */0];
	                  switch (from) {
	                    case "basicMaterial" : 
	                        return addBasicMaterialSendData(/* tuple */[
	                                    field,
	                                    getUniformLocation(program, name, uniformLocationMap, gl),
	                                    name,
	                                    type_,
	                                    uniformCacheMap
	                                  ], sendDataArrTuple);
	                    case "camera" : 
	                        return addCameraSendData(/* tuple */[
	                                    field,
	                                    getUniformLocation(program, name, uniformLocationMap, gl),
	                                    name,
	                                    type_,
	                                    uniformCacheMap
	                                  ], sendDataArrTuple);
	                    case "model" : 
	                        return addModelSendData(/* tuple */[
	                                    field,
	                                    getUniformLocation(program, name, uniformLocationMap, gl),
	                                    name,
	                                    type_,
	                                    uniformCacheMap
	                                  ], sendDataArrTuple);
	                    default:
	                      return fatal(buildFatalMessage("_readUniforms", "unknow from:" + (String(from) + ""), "", "", ""));
	                  }
	                }), sendDataArrTuple, unsafeGetJsonSerializedValue(uniforms));
	  }
	}

	function _readUniformSendData(shaderLibDataArr, gl, program, param) {
	  return readUniformSendData(shaderLibDataArr, /* tuple */[
	              gl,
	              program
	            ], _readUniforms, /* tuple */[
	              param[0],
	              param[1]
	            ]);
	}

	function addUniformSendData(gl, param, recordTuple) {
	  return addUniformSendData$1(gl, /* tuple */[
	              param[0],
	              param[1],
	              param[2]
	            ], _readUniformSendData, recordTuple);
	}


	/* Log-WonderLog Not a pure module */

	function sendBuffer(gl, param, buffer, state) {
	  var pos = param[1];
	  var match = isAttributeLocationExist(pos);
	  if (match) {
	    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	    gl.vertexAttribPointer(pos, param[0], gl.FLOAT, false, 0, 0);
	    enableVertexAttribArray(gl, pos, state[/* glslSenderRecord */3][/* vertexAttribHistoryArray */9]);
	  }
	  return state;
	}


	/* GLSLLocationService-Wonderjs Not a pure module */

	function bindElementArrayBuffer(gl, _, buffer, renderState) {
	  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
	  return renderState;
	}


	/* No side effect */

	function addModelMatrixInstanceArrayBufferSendData(param, param$1) {
	  return /* tuple */[
	          param$1[0],
	          push(/* record */[
	                /* pos */getAttribLocation(param[1], param[2], param[3], param[0]),
	                /* size */4,
	                /* getOffsetFunc */(function (index) {
	                    return (index << 4);
	                  })
	              ], param$1[1])
	        ];
	}

	function addOtherArrayBufferSendData(param, param$1) {
	  return /* tuple */[
	          push(/* record */[
	                /* pos */getAttribLocation(param[1], param[2], param[5], param[0]),
	                /* size */getBufferSizeByType(param[4]),
	                /* buffer */param[3],
	                /* sendFunc */sendBuffer
	              ], param$1[0]),
	          param$1[1]
	        ];
	}

	function addElementBufferSendData(buffer, param) {
	  return /* tuple */[
	          push(/* record */[
	                /* pos */0,
	                /* size */0,
	                /* buffer */buffer,
	                /* sendFunc */bindElementArrayBuffer
	              ], param[0]),
	          param[1]
	        ];
	}

	function readAttributeSendData(shaderLibDataArr, param, readAttributesFunc, attributeLocationMap) {
	  var program = param[1];
	  var gl = param[0];
	  return reduceOneParam((function (sendDataArrTuple, param) {
	                var variables = param[/* variables */2];
	                var match = isJsonSerializedValueNone(variables);
	                if (match) {
	                  return sendDataArrTuple;
	                } else {
	                  var match$1 = unsafeGetJsonSerializedValue(variables);
	                  return readAttributesFunc(/* tuple */[
	                              gl,
	                              program,
	                              attributeLocationMap
	                            ], sendDataArrTuple, match$1[/* attributes */1]);
	                }
	              }), /* tuple */[
	              /* array */[],
	              /* array */[]
	            ], shaderLibDataArr);
	}

	function _setToAttributeSendMap(shaderIndex, _, glslSenderRecord, param) {
	  set$1(shaderIndex, param[0], glslSenderRecord[/* attributeSendDataMap */0]);
	  set$1(shaderIndex, param[1], glslSenderRecord[/* instanceAttributeSendDataMap */1]);
	  return glslSenderRecord;
	}

	function addAttributeSendData$1(param, shaderLibDataArr, readAttributeSendDataFunc, param$1) {
	  var glslLocationRecord = param$1[1];
	  var shaderIndex = param[1];
	  var attributeLocationMap = getOrCreateHashMap(getAttributeLocationMap(shaderIndex, glslLocationRecord));
	  return /* tuple */[
	          _setToAttributeSendMap(shaderIndex, attributeLocationMap, param$1[0], readAttributeSendDataFunc(shaderLibDataArr, param[0], param[2], attributeLocationMap)),
	          setAttributeLocationMap(shaderIndex, attributeLocationMap, glslLocationRecord)
	        ];
	}


	/* ArrayService-Wonderjs Not a pure module */

	function _readAttributes(param, sendDataArrTuple, attributes) {
	  var attributeLocationMap = param[2];
	  var program = param[1];
	  var gl = param[0];
	  var match = isJsonSerializedValueNone(attributes);
	  if (match) {
	    return sendDataArrTuple;
	  } else {
	    return reduceOneParam((function (sendDataArrTuple, param) {
	                  var type_ = param[/* type_ */2];
	                  var buffer = param[/* buffer */1];
	                  var name = param[/* name */0];
	                  var match = !isJsonSerializedValueNone(name) && !isJsonSerializedValueNone(type_);
	                  if (match) {
	                    var name$1 = unsafeGetJsonSerializedValue(name);
	                    var type_$1 = unsafeGetJsonSerializedValue(type_);
	                    if (buffer >= 5) {
	                      return addModelMatrixInstanceArrayBufferSendData(/* tuple */[
	                                  gl,
	                                  program,
	                                  name$1,
	                                  attributeLocationMap
	                                ], sendDataArrTuple);
	                    } else {
	                      return addOtherArrayBufferSendData(/* tuple */[
	                                  gl,
	                                  program,
	                                  name$1,
	                                  buffer,
	                                  type_$1,
	                                  attributeLocationMap
	                                ], sendDataArrTuple);
	                    }
	                  } else {
	                    return addElementBufferSendData(buffer, sendDataArrTuple);
	                  }
	                }), sendDataArrTuple, unsafeGetJsonSerializedValue(attributes));
	  }
	}

	function _readAttributeSendData(shaderLibDataArr, gl, program, attributeLocationMap) {
	  return readAttributeSendData(shaderLibDataArr, /* tuple */[
	              gl,
	              program
	            ], _readAttributes, attributeLocationMap);
	}

	function addAttributeSendData(glTuple, shaderLibDataArr, recordTuple) {
	  return addAttributeSendData$1(glTuple, shaderLibDataArr, _readAttributeSendData, recordTuple);
	}


	/* OptionService-Wonderjs Not a pure module */

	function initMaterialShader(materialIndex, param, buildGLSLSourceFunc, state) {
	  return initMaterialShader$1(materialIndex, /* tuple */[
	              param[0],
	              param[1]
	            ], /* tuple */[
	              buildGLSLSourceFunc,
	              getHandle,
	              addAttributeSendData,
	              addUniformSendData
	            ], /* tuple */[
	              state[/* shaderRecord */2],
	              state[/* programRecord */3],
	              state[/* glslRecord */4],
	              state[/* glslSenderRecord */5],
	              state[/* glslLocationRecord */6],
	              state[/* glslChunkRecord */7]
	            ]);
	}


	/* InitShaderInitMaterialService-Wonderjs Not a pure module */

	var webgl1_main_begin = "void main(void){\n";

	var webgl1_main_end = "}\n";

	function _generateAttributeSource(shaderLibDataArr) {
	  return shaderLibDataArr.reduce((function (result, param) {
	                var variables = param[/* variables */2];
	                var match = isJsonSerializedValueNone(variables);
	                if (match) {
	                  return result;
	                } else {
	                  var optionalAttributes = unsafeGetJsonSerializedValue(variables)[/* attributes */1];
	                  var match$1 = isJsonSerializedValueNone(optionalAttributes);
	                  if (match$1) {
	                    return result;
	                  } else {
	                    return result + unsafeGetJsonSerializedValue(optionalAttributes).reduce((function (result, param) {
	                                  var type_ = param[/* type_ */2];
	                                  var name = param[/* name */0];
	                                  var match = !isJsonSerializedValueNone(name) && !isJsonSerializedValueNone(type_);
	                                  if (match) {
	                                    var name$1 = unsafeGetJsonSerializedValue(name);
	                                    var type_$1 = unsafeGetJsonSerializedValue(type_);
	                                    return result + ("attribute " + (String(type_$1) + (" " + (String(name$1) + ";\n  "))));
	                                  } else {
	                                    return result;
	                                  }
	                                }), "");
	                  }
	                }
	              }), "");
	}

	function _isInSource(key, source) {
	  return source.indexOf(key) > -1;
	}

	function _generateUniformSourceType(type_) {
	  if (type_ === "float3") {
	    return "vec3";
	  } else {
	    return type_;
	  }
	}

	function _generateUniformSource(shaderLibDataArr, sourceVarDeclare, sourceFuncDefine, sourceBody) {
	  return shaderLibDataArr.reduce((function (result, param) {
	                var variables = param[/* variables */2];
	                var match = isJsonSerializedValueNone(variables);
	                if (match) {
	                  return result;
	                } else {
	                  var optionalUniforms = unsafeGetJsonSerializedValue(variables)[/* uniforms */0];
	                  var match$1 = isJsonSerializedValueNone(optionalUniforms);
	                  if (match$1) {
	                    return result;
	                  } else {
	                    return result + unsafeGetJsonSerializedValue(optionalUniforms).filter((function (param) {
	                                    var name = param[/* name */0];
	                                    if (_isInSource(name, sourceVarDeclare) || _isInSource(name, sourceFuncDefine)) {
	                                      return true;
	                                    } else {
	                                      return _isInSource(name, sourceBody);
	                                    }
	                                  })).reduce((function (result, param) {
	                                  var type_ = _generateUniformSourceType(param[/* type_ */2]);
	                                  return result + ("uniform " + (String(type_) + (" " + (String(param[/* name */0]) + ";\n"))));
	                                }), "");
	                  }
	                }
	              }), "");
	}

	function _setSource(sourceChunk, param) {
	  var sourceTop = sourceChunk[/* top */0];
	  var sourceDefine = sourceChunk[/* define */1];
	  var sourceVarDeclare = sourceChunk[/* varDeclare */2];
	  var sourceFuncDeclare = sourceChunk[/* funcDeclare */3];
	  var sourceFuncDefine = sourceChunk[/* funcDefine */4];
	  var sourceBody = sourceChunk[/* body */5];
	  var top = param[/* top */0];
	  var define = param[/* define */1];
	  var varDeclare = param[/* varDeclare */2];
	  var funcDeclare = param[/* funcDeclare */3];
	  var funcDefine = param[/* funcDefine */4];
	  var body = param[/* body */5];
	  sourceChunk[/* top */0] = sourceTop + top;
	  sourceChunk[/* define */1] = sourceDefine + define;
	  sourceChunk[/* varDeclare */2] = sourceVarDeclare + varDeclare;
	  sourceChunk[/* funcDeclare */3] = sourceFuncDeclare + funcDeclare;
	  sourceChunk[/* funcDefine */4] = sourceFuncDefine + funcDefine;
	  sourceChunk[/* body */5] = sourceBody + body;
	  return sourceChunk;
	}

	function _buildBody(param, webgl1_main_end) {
	  var body = param[/* body */5];
	  return body + webgl1_main_end;
	}

	function _buildVarDeclare(param, shaderLibDataArr) {
	  var varDeclare = param[/* varDeclare */2];
	  var funcDefine = param[/* funcDefine */4];
	  var body = param[/* body */5];
	  return varDeclare + ("\n" + _generateUniformSource(shaderLibDataArr, varDeclare, funcDefine, body));
	}

	function _addAlllParts(param) {
	  var top = param[/* top */0];
	  var define = param[/* define */1];
	  var varDeclare = param[/* varDeclare */2];
	  var funcDeclare = param[/* funcDeclare */3];
	  var funcDefine = param[/* funcDefine */4];
	  var body = param[/* body */5];
	  return top + (define + (varDeclare + (funcDeclare + (funcDefine + body))));
	}

	function _buildVsAndFsByType(param, param$1, execHandleFunc, glslChunkRecord) {
	  var name = param$1[1];
	  var type_ = param$1[0];
	  var fs = param[1];
	  var vs = param[0];
	  switch (type_) {
	    case "fs" : 
	        return /* tuple */[
	                vs,
	                _setSource(fs, getChunk(name, glslChunkRecord))
	              ];
	    case "fs_function" : 
	        return /* tuple */[
	                vs,
	                _setSource(fs, _1(execHandleFunc, name))
	              ];
	    case "vs" : 
	        return /* tuple */[
	                _setSource(vs, getChunk(name, glslChunkRecord)),
	                fs
	              ];
	    case "vs_function" : 
	        return /* tuple */[
	                _setSource(vs, _1(execHandleFunc, name)),
	                fs
	              ];
	    default:
	      return fatal(buildFatalMessage("buildGLSLSource", "unknown glsl type: " + (String(type_) + ""), "", "", "name: " + (String(name) + "")));
	  }
	}

	function _buildVsAndFs(param, shaderLibDataArr, execHandleFunc, glslChunkRecord) {
	  return reduceOneParam((function (glslTuple, param) {
	                var glsls = param[/* glsls */1];
	                var match = isJsonSerializedValueNone(glsls);
	                if (match) {
	                  return glslTuple;
	                } else {
	                  return reduceOneParam((function (sourceTuple, param) {
	                                return _buildVsAndFsByType(sourceTuple, /* tuple */[
	                                            param[/* type_ */0],
	                                            param[/* name */1]
	                                          ], execHandleFunc, glslChunkRecord);
	                              }), glslTuple, unsafeGetJsonSerializedValue(glsls));
	                }
	              }), /* tuple */[
	              param[0],
	              param[1]
	            ], shaderLibDataArr);
	}

	function buildGLSLSource(shaderLibDataArr, execHandleFunc, param) {
	  var precision = param[0][/* precision */0];
	  var vs = /* record */[
	    /* top */"",
	    /* define */"",
	    /* varDeclare */"",
	    /* funcDeclare */"",
	    /* funcDefine */"",
	    /* body */""
	  ];
	  var fs = /* record */[
	    /* top */"",
	    /* define */"",
	    /* varDeclare */"",
	    /* funcDeclare */"",
	    /* funcDefine */"",
	    /* body */""
	  ];
	  vs[/* body */5] = vs[/* body */5] + webgl1_main_begin;
	  fs[/* body */5] = fs[/* body */5] + webgl1_main_begin;
	  var precision$1 = unsafeGet$1(precision);
	  vs[/* top */0] = precision$1 + vs[/* top */0];
	  fs[/* top */0] = precision$1 + fs[/* top */0];
	  var match = _buildVsAndFs(/* tuple */[
	        vs,
	        fs
	      ], shaderLibDataArr, execHandleFunc, param[1]);
	  var fs$1 = match[1];
	  var vs$1 = match[0];
	  vs$1[/* body */5] = _buildBody(vs$1, webgl1_main_end);
	  fs$1[/* body */5] = _buildBody(fs$1, webgl1_main_end);
	  vs$1[/* varDeclare */2] = "\n" + (_generateAttributeSource(shaderLibDataArr) + vs$1[/* varDeclare */2]);
	  vs$1[/* varDeclare */2] = _buildVarDeclare(vs$1, shaderLibDataArr);
	  fs$1[/* varDeclare */2] = _buildVarDeclare(fs$1, shaderLibDataArr);
	  return /* tuple */[
	          _addAlllParts(vs$1),
	          _addAlllParts(fs$1)
	        ];
	}


	/* Log-WonderLog Not a pure module */

	function findFirstShaderData(shaderLibName, shaderLibs) {
	  return unsafeFindFirst(shaderLibs, shaderLibName, (function (item) {
	                return filterTargetName(item[/* name */0], shaderLibName);
	              }));
	}

	function _getMaterialShaderLibDataArrByGroup(groups, name, shaderLibs, resultDataArr) {
	  return resultDataArr.concat(unsafeFindFirst(groups, name, (function (item) {
	                        return filterTargetName(item[/* name */0], name);
	                      }))[/* value */1].map((function (name) {
	                    return findFirstShaderData(name, shaderLibs);
	                  })));
	}

	function handleUnknownNameWhenGetMaterialShaderLibDataArrByStaticBranch(name, staticBranchs) {
	  var partial_arg = "staticBranchs";
	  debugJson((function (param) {
	          return buildDebugJsonMessage(partial_arg, staticBranchs, param);
	        }), getIsDebug(stateData));
	  return fatal(buildFatalMessage("_getMaterialShaderLibDataArrByStaticBranch", "unknown name:" + (String(name) + ""), "", "", ""));
	}

	function getMaterialShaderLibDataArrByStaticBranchInstance(param, param$1, resultDataArr) {
	  var value = param$1[1];
	  return push(findFirstShaderData(param[0] ? (
	                    param[1] ? caml_array_get(value, 1) : caml_array_get(value, 2)
	                  ) : caml_array_get(value, 0), param$1[0]), resultDataArr);
	}

	function getMaterialShaderLibDataArrByDynamicBranch(param, param$1, isPassFunc, resultDataArr) {
	  var name = param[1];
	  var dynamicBranchData = unsafeFindFirst(param$1[0], name, (function (item) {
	          return filterTargetName(item[/* name */0], name);
	        }));
	  var match = isPassFunc(param[0], dynamicBranchData[/* condition */1], param$1[2]);
	  var dynamicBranchShaderLibNameOption = match ? getPass(dynamicBranchData) : getFail(dynamicBranchData);
	  var match$1 = isJsonSerializedValueNone(dynamicBranchShaderLibNameOption);
	  if (match$1) {
	    return resultDataArr;
	  } else {
	    return push(findFirstShaderData(unsafeGetJsonSerializedValue(dynamicBranchShaderLibNameOption), param$1[1]), resultDataArr);
	  }
	}

	function getMaterialShaderLibDataArrByType(param, param$1, param$2, resultDataArr) {
	  var shaderLibs = param$1[0];
	  var name = param[3];
	  var type_ = param[1];
	  switch (type_) {
	    case "dynamic_branch" : 
	        return getMaterialShaderLibDataArrByDynamicBranch(/* tuple */[
	                    param[0],
	                    name
	                  ], /* tuple */[
	                    param$1[2],
	                    shaderLibs,
	                    param$1[3]
	                  ], param$2[1], resultDataArr);
	    case "group" : 
	        return _getMaterialShaderLibDataArrByGroup(param[2], name, shaderLibs, resultDataArr);
	    case "static_branch" : 
	        return param$2[0](/* tuple */[
	                    name,
	                    param[4],
	                    param[5]
	                  ], /* tuple */[
	                    param$1[1],
	                    shaderLibs
	                  ], resultDataArr);
	    default:
	      var partial_arg = "shaderLibs";
	      debugJson((function (param) {
	              return buildDebugJsonMessage(partial_arg, shaderLibs, param);
	            }), getIsDebug(stateData));
	      return fatal(buildFatalMessage("_getMaterialShaderLibDataArrByType", "unknown type_:" + (String(type_) + ""), "", "", ""));
	  }
	}

	function getMaterialShaderLibDataArr$1(param, param$1, param$2, state) {
	  var isPassFunc = param$2[1];
	  var getMaterialShaderLibDataArrByStaticBranchFunc = param$2[0];
	  var shaderLibs = param$1[2];
	  var match = param$1[0];
	  var groups = match[/* groups */2];
	  var dynamicBranchs = match[/* dynamicBranchs */1];
	  var staticBranchs = match[/* staticBranchs */0];
	  var isSupportInstance = param[2];
	  var isSourceInstance = param[1];
	  var materialIndex = param[0];
	  return reduceOneParam((function (resultDataArr, param) {
	                var name = param[/* name */1];
	                var type_ = param[/* type_ */0];
	                var match = isJsonSerializedValueNone(type_);
	                if (match) {
	                  return push(findFirstShaderData(name, shaderLibs), resultDataArr);
	                } else {
	                  return getMaterialShaderLibDataArrByType(/* tuple */[
	                              materialIndex,
	                              unsafeGetJsonSerializedValue(type_),
	                              groups,
	                              name,
	                              isSourceInstance,
	                              isSupportInstance
	                            ], /* tuple */[
	                              shaderLibs,
	                              staticBranchs,
	                              dynamicBranchs,
	                              state
	                            ], /* tuple */[
	                              getMaterialShaderLibDataArrByStaticBranchFunc,
	                              isPassFunc
	                            ], resultDataArr);
	                }
	              }), createEmpty$1(/* () */0), param$1[1]);
	}


	/* Log-WonderLog Not a pure module */

	function _getMaterialShaderLibDataArrByStaticBranch(param, param$1, resultDataArr) {
	  var staticBranchs = param$1[0];
	  var name = param[0];
	  if (name === "modelMatrix_instance") {
	    var match = unsafeFindFirst(staticBranchs, name, (function (item) {
	            return filterTargetName(item[/* name */0], name);
	          }));
	    return getMaterialShaderLibDataArrByStaticBranchInstance(/* tuple */[
	                param[1],
	                param[2]
	              ], /* tuple */[
	                param$1[1],
	                match[/* value */1]
	              ], resultDataArr);
	  } else {
	    return handleUnknownNameWhenGetMaterialShaderLibDataArrByStaticBranch(name, staticBranchs);
	  }
	}

	function _isPass(materialIndex, condition, state) {
	  if (condition === "basic_has_map") {
	    return hasMap(getMapUnit(materialIndex, state[/* materialRecord */0][/* mapUnits */3]));
	  } else {
	    return fatal(buildFatalMessage("_isPass", "unknown condition:" + (String(condition) + ""), "", "", ""));
	  }
	}

	function getMaterialShaderLibDataArr(materialIndex, param, shaderLibTuple, state) {
	  return getMaterialShaderLibDataArr$1(/* tuple */[
	              materialIndex,
	              param[0],
	              param[1]
	            ], shaderLibTuple, /* tuple */[
	              _getMaterialShaderLibDataArrByStaticBranch,
	              _isPass
	            ], state);
	}


	/* Log-WonderLog Not a pure module */

	function _getShaderLibItems(param) {
	  var shaderName = "render_basic";
	  return unsafeFindFirst(param[/* materialShaders */3], shaderName, (function (param) {
	                  return filterTargetName(param[/* name */0], shaderName);
	                }))[/* shaderLibs */1];
	}

	function initMaterial(gl, dataTuple, state) {
	  return initMaterial$1(gl, dataTuple, /* tuple */[
	              initMaterialShader,
	              buildGLSLSource,
	              setShaderIndex,
	              _getShaderLibItems,
	              getMaterialShaderLibDataArr
	            ], /* tuple */[
	              state[/* materialRecord */0][/* shaderIndices */2],
	              state[/* renderConfigRecord */1],
	              state
	            ]);
	}

	function init$5(gl, instanceTuple, state) {
	  var materialRecord = state[/* materialRecord */0];
	  return init$6(gl, instanceTuple, initMaterial, /* tuple */[
	              materialRecord[/* index */0],
	              materialRecord[/* disposedIndexArray */1],
	              state
	            ]);
	}


	/* JobConfigService-Wonderjs Not a pure module */

	function unsafeGetGPU$2(param) {
	  return unsafeGet$1(param[/* gpu */0]);
	}

	function unsafeGetMemory$1(param) {
	  return unsafeGet$1(param[/* memory */5]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function isSupportInstance$3(state) {
	  return isSupportInstance$1(unsafeGetGPU$2(state[/* settingRecord */1])[/* useHardwareInstance */0], state[/* gpuDetectRecord */3]);
	}


	/* JudgeInstanceService-Wonderjs Not a pure module */

	function initMaterials(param, isSourceInstanceMap, state) {
	  _3(param[1], unsafeGetGl(state[/* deviceManagerRecord */4]), /* tuple */[
	        isSourceInstanceMap,
	        isSupportInstance$3(state)
	      ], _1(param[0], state));
	  return state;
	}


	/* DeviceManagerService-Wonderjs Not a pure module */

	function getRecord$31(state) {
	  return unsafeGet$1(state[/* renderConfigRecord */2]);
	}


	/* OptionService-Wonderjs Not a pure module */

	function createInitMaterialState(state) {
	  var shaderRecord = state[/* shaderRecord */5];
	  var programRecord = state[/* programRecord */6];
	  var glslRecord = state[/* glslRecord */7];
	  var glslSenderRecord = state[/* glslSenderRecord */8];
	  var glslLocationRecord = state[/* glslLocationRecord */9];
	  var glslChunkRecord = state[/* glslChunkRecord */10];
	  var match = getRecord$14(state);
	  return /* record */[
	          /* materialRecord : record */[
	            /* index */match[/* index */4],
	            /* disposedIndexArray */match[/* disposedIndexArray */5],
	            /* shaderIndices */unsafeGetShaderIndices(state),
	            /* mapUnits */unsafeGetMapUnits(state)
	          ],
	          /* renderConfigRecord */getRecord$31(state),
	          /* shaderRecord */shaderRecord,
	          /* programRecord */programRecord,
	          /* glslRecord */glslRecord,
	          /* glslSenderRecord */glslSenderRecord,
	          /* glslLocationRecord */glslLocationRecord,
	          /* glslChunkRecord */glslChunkRecord
	        ];
	}


	/* RecordRenderConfigRenderWorkerService-Wonderjs Not a pure module */

	function _createTypeArrays$5(buffer, basicMaterialCount, textureCountPerMaterial, state) {
	  var match = createTypeArrays$8(buffer, basicMaterialCount, textureCountPerMaterial);
	  var basicMaterialRecord = getRecord$14(state);
	  state[/* basicMaterialRecord */12] = /* record */[
	    /* shaderIndices */some$1(match[0]),
	    /* colors */some$1(match[1]),
	    /* textureIndices */some$1(match[2]),
	    /* mapUnits */some$1(match[3]),
	    /* index */basicMaterialRecord[/* index */4],
	    /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */5],
	    /* isSourceInstanceMap */basicMaterialRecord[/* isSourceInstanceMap */6]
	  ];
	  return state;
	}

	function execJob$49(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var basicMaterialData = data.basicMaterialData;
	                var basicMaterialCount = data.bufferData.basicMaterialCount;
	                var textureCountPerMaterial = data.bufferData.textureCountPerMaterial;
	                setState$1(stateData, initMaterials(/* tuple */[
	                          createInitMaterialState,
	                          init$5
	                        ], getRecord$14(state)[/* isSourceInstanceMap */6], _createTypeArrays$5(basicMaterialData.buffer, basicMaterialCount, textureCountPerMaterial, state)));
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function checkNotExceedMaxCount$1(count, _) {
	  requireCheck((function () {
	          var maxCount = getBufferMaxCount$1(/* () */0);
	          return test(buildAssertMessage("light count: " + (String(count) + (" <= max count: " + (String(maxCount) + ""))), "not"), (function () {
	                        return assertLte(/* Int */0, count, maxCount);
	                      }));
	        }), getIsDebug(stateData));
	  return count;
	}

	function getLightCount$1(renderLightArr) {
	  return renderLightArr.length;
	}


	/* Log-WonderLog Not a pure module */

	function getLightCount(param) {
	  var __x = getLightCount$1(param[/* renderLightArr */1]);
	  return checkNotExceedMaxCount$1(__x, getBufferMaxCount(/* () */0));
	}


	/* CountLightService-Wonderjs Not a pure module */

	function getLightCount$2(param) {
	  var __x = getLightCount$1(param[/* renderLightArr */1]);
	  return checkNotExceedMaxCount$1(__x, getBufferMaxCount$1(/* () */0));
	}


	/* CountLightService-Wonderjs Not a pure module */

	function execHandle(param) {
	  var directionLightCount = getLightCount$2(param[0]);
	  var pointLightCount = getLightCount(param[1]);
	  return /* record */[
	          /* top */"",
	          /* define */"#define DIRECTION_LIGHTS_COUNT " + (String(directionLightCount) + ("\n#define POINT_LIGHTS_COUNT " + (String(pointLightCount) + ""))),
	          /* varDeclare */"",
	          /* funcDeclare */"",
	          /* funcDefine */"",
	          /* body */""
	        ];
	}


	/* CountInitLightMaterialPointLightService-Wonderjs Not a pure module */

	function getHandle$1(recordTuple, name) {
	  if (name === "defineLightCount") {
	    return execHandle(recordTuple);
	  } else {
	    return fatal(buildFatalMessage("getHandle", "unknown handle name: " + (String(name) + ""), "", "", ""));
	  }
	}


	/* Log-WonderLog Not a pure module */

	var getPosition$2 = unsafeGet$2;


	/* No side effect */

	function getColor$4(mappedIndex, param) {
	  return getColor$1(mappedIndex, param[/* colors */1]);
	}

	function getIntensity$2(mappedIndex, param) {
	  return getIntensity(mappedIndex, param[/* intensities */2]);
	}

	function getConstant$1(mappedIndex, param) {
	  return getConstant(mappedIndex, param[/* constants */3]);
	}

	function getLiear(mappedIndex, param) {
	  return getLinear(mappedIndex, param[/* linears */4]);
	}

	function getQuadratic$1(mappedIndex, param) {
	  return getQuadratic(mappedIndex, param[/* quadratics */5]);
	}

	function getRange$1(mappedIndex, param) {
	  return getRange(mappedIndex, param[/* ranges */6]);
	}


	/* RecordPointLightMainService-Wonderjs Not a pure module */

	function getLightGLSLDataStructureMemberNameArr() {
	  return /* array */[
	          /* record */[
	            /* position */"u_pointLights[0].position",
	            /* color */"u_pointLights[0].color",
	            /* intensity */"u_pointLights[0].intensity",
	            /* constant */"u_pointLights[0].constant",
	            /* linear */"u_pointLights[0].linear",
	            /* quadratic */"u_pointLights[0].quadratic",
	            /* range */"u_pointLights[0].range"
	          ],
	          /* record */[
	            /* position */"u_pointLights[1].position",
	            /* color */"u_pointLights[1].color",
	            /* intensity */"u_pointLights[1].intensity",
	            /* constant */"u_pointLights[1].constant",
	            /* linear */"u_pointLights[1].linear",
	            /* quadratic */"u_pointLights[1].quadratic",
	            /* range */"u_pointLights[1].range"
	          ],
	          /* record */[
	            /* position */"u_pointLights[2].position",
	            /* color */"u_pointLights[2].color",
	            /* intensity */"u_pointLights[2].intensity",
	            /* constant */"u_pointLights[2].constant",
	            /* linear */"u_pointLights[2].linear",
	            /* quadratic */"u_pointLights[2].quadratic",
	            /* range */"u_pointLights[2].range"
	          ],
	          /* record */[
	            /* position */"u_pointLights[3].position",
	            /* color */"u_pointLights[3].color",
	            /* intensity */"u_pointLights[3].intensity",
	            /* constant */"u_pointLights[3].constant",
	            /* linear */"u_pointLights[3].linear",
	            /* quadratic */"u_pointLights[3].quadratic",
	            /* range */"u_pointLights[3].range"
	          ]
	        ];
	}

	function _sendAttenuation(light, param, param$1, pointLightRecord) {
	  var range$$1 = param$1[/* range */6];
	  var quadratic = param$1[/* quadratic */5];
	  var linear = param$1[/* linear */4];
	  var constant = param$1[/* constant */3];
	  var uniformLocationMap = param[3];
	  var uniformCacheMap = param[2];
	  var program = param[1];
	  var gl = param[0];
	  sendFloat(gl, uniformCacheMap, /* tuple */[
	        constant,
	        getUniformLocation(program, constant, uniformLocationMap, gl)
	      ], getConstant$1(light, pointLightRecord));
	  sendFloat(gl, uniformCacheMap, /* tuple */[
	        linear,
	        getUniformLocation(program, linear, uniformLocationMap, gl)
	      ], getLiear(light, pointLightRecord));
	  sendFloat(gl, uniformCacheMap, /* tuple */[
	        quadratic,
	        getUniformLocation(program, quadratic, uniformLocationMap, gl)
	      ], getQuadratic$1(light, pointLightRecord));
	  sendFloat(gl, uniformCacheMap, /* tuple */[
	        range$$1,
	        getUniformLocation(program, range$$1, uniformLocationMap, gl)
	      ], getRange$1(light, pointLightRecord));
	  return pointLightRecord;
	}

	function send(gl, param, param$1) {
	  var pointLightRecord = param$1[/* pointLightRecord */13];
	  var uniformLocationMap = param[2];
	  var uniformCacheMap = param[1];
	  var program = param[0];
	  requireCheck((function () {
	          var maxCount = getBufferMaxCount(/* () */0);
	          return test(buildAssertMessage("max buffer count === 4", "is " + (String(maxCount) + "")), (function () {
	                        return Operators[/* = */0](maxCount, 4);
	                      }));
	        }), getIsDebug(stateData));
	  var lightGLSLDataStructureMemberNameArr = getLightGLSLDataStructureMemberNameArr(/* () */0);
	  var positionMap = pointLightRecord[/* positionMap */8];
	  reduceOneParami((function (pointLightRecord, light, index) {
	          var structureMemberNameData = caml_array_get(lightGLSLDataStructureMemberNameArr, index);
	          var intensity = structureMemberNameData[/* intensity */2];
	          var color = structureMemberNameData[/* color */1];
	          var position = structureMemberNameData[/* position */0];
	          sendVec3(gl, uniformCacheMap, /* tuple */[
	                position,
	                getUniformLocation(program, position, uniformLocationMap, gl)
	              ], getPosition$2(light, positionMap));
	          sendFloat3(gl, uniformCacheMap, /* tuple */[
	                color,
	                getUniformLocation(program, color, uniformLocationMap, gl)
	              ], getColor$4(light, pointLightRecord));
	          sendFloat(gl, uniformCacheMap, /* tuple */[
	                intensity,
	                getUniformLocation(program, intensity, uniformLocationMap, gl)
	              ], getIntensity$2(light, pointLightRecord));
	          return _sendAttenuation(light, /* tuple */[
	                      gl,
	                      program,
	                      uniformCacheMap,
	                      uniformLocationMap
	                    ], structureMemberNameData, pointLightRecord);
	        }), pointLightRecord, pointLightRecord[/* renderLightArr */7]);
	  return /* () */0;
	}


	/* Log-WonderLog Not a pure module */

	function getColor$5(param) {
	  return param[/* ambientLight */0][/* color */0];
	}


	/* No side effect */

	function send$1(gl, param, param$1) {
	  var name = "u_ambient";
	  return sendFloat3(gl, param[1], /* tuple */[
	              name,
	              getUniformLocation(param[0], name, param[2], gl)
	            ], getColor$5(param$1[/* sceneRecord */0]));
	}


	/* GLSLLocationService-Wonderjs Not a pure module */

	var getDirection$1 = unsafeGet$2;


	/* No side effect */

	function getColor$6(mappedIndex, param) {
	  return getColor$2(mappedIndex, param[/* colors */1]);
	}

	function getIntensity$3(mappedIndex, param) {
	  return getIntensity$1(mappedIndex, param[/* intensities */2]);
	}


	/* RecordDirectionLightMainService-Wonderjs Not a pure module */

	function send$2(gl, param, param$1) {
	  var directionLightRecord = param$1[/* directionLightRecord */12];
	  var uniformLocationMap = param[2];
	  var uniformCacheMap = param[1];
	  var program = param[0];
	  requireCheck((function () {
	          var maxCount = getBufferMaxCount$1(/* () */0);
	          return test(buildAssertMessage("max buffer count === 4", "is " + (String(maxCount) + "")), (function () {
	                        return Operators[/* = */0](maxCount, 4);
	                      }));
	        }), getIsDebug(stateData));
	  var lightGLSLDataStructureMemberNameArr = /* array */[
	    /* record */[
	      /* direction */"u_directionLights[0].direction",
	      /* color */"u_directionLights[0].color",
	      /* intensity */"u_directionLights[0].intensity"
	    ],
	    /* record */[
	      /* direction */"u_directionLights[1].direction",
	      /* color */"u_directionLights[1].color",
	      /* intensity */"u_directionLights[1].intensity"
	    ],
	    /* record */[
	      /* direction */"u_directionLights[2].direction",
	      /* color */"u_directionLights[2].color",
	      /* intensity */"u_directionLights[2].intensity"
	    ],
	    /* record */[
	      /* direction */"u_directionLights[3].direction",
	      /* color */"u_directionLights[3].color",
	      /* intensity */"u_directionLights[3].intensity"
	    ]
	  ];
	  var directionMap = directionLightRecord[/* directionMap */4];
	  reduceOneParami((function (directionLightRecord, light, index) {
	          var match = caml_array_get(lightGLSLDataStructureMemberNameArr, index);
	          var intensity = match[/* intensity */2];
	          var color = match[/* color */1];
	          var direction = match[/* direction */0];
	          sendVec3(gl, uniformCacheMap, /* tuple */[
	                direction,
	                getUniformLocation(program, direction, uniformLocationMap, gl)
	              ], getDirection$1(light, directionMap));
	          sendFloat3(gl, uniformCacheMap, /* tuple */[
	                color,
	                getUniformLocation(program, color, uniformLocationMap, gl)
	              ], getColor$6(light, directionLightRecord));
	          sendFloat(gl, uniformCacheMap, /* tuple */[
	                intensity,
	                getUniformLocation(program, intensity, uniformLocationMap, gl)
	              ], getIntensity$3(light, directionLightRecord));
	          return directionLightRecord;
	        }), directionLightRecord, directionLightRecord[/* renderLightArr */3]);
	  return /* () */0;
	}


	/* Log-WonderLog Not a pure module */

	function addAmbientLightSendData(param, sendDataArrTuple) {
	  var field = param[0];
	  if (field === "send") {
	    return addUniformSendDataByType$5(/* tuple */[
	                param[1],
	                param[2],
	                param[3]
	              ], sendDataArrTuple, send$1);
	  } else {
	    return fatal(buildFatalMessage("_addAmbientLightSendData", "unknow field:" + (String(field) + ""), "", "", ""));
	  }
	}

	function addDirectionLightSendData(param, sendDataArrTuple) {
	  var field = param[0];
	  if (field === "send") {
	    return addUniformSendDataByType$5(/* tuple */[
	                param[1],
	                param[2],
	                param[3]
	              ], sendDataArrTuple, send$2);
	  } else {
	    return fatal(buildFatalMessage("_addDirectionLightSendData", "unknow field:" + (String(field) + ""), "", "", ""));
	  }
	}

	function addPointLightSendData(param, sendDataArrTuple) {
	  var field = param[0];
	  if (field === "send") {
	    return addUniformSendDataByType$5(/* tuple */[
	                param[1],
	                param[2],
	                param[3]
	              ], sendDataArrTuple, send);
	  } else {
	    return fatal(buildFatalMessage("_addPointLightSendData", "unknow field:" + (String(field) + ""), "", "", ""));
	  }
	}


	/* Log-WonderLog Not a pure module */

	function _readUniforms$1(param, sendDataArrTuple, uniforms) {
	  var uniformCacheMap = param[3];
	  var uniformLocationMap = param[2];
	  var program = param[1];
	  var gl = param[0];
	  var match = isJsonSerializedValueNone(uniforms);
	  if (match) {
	    return sendDataArrTuple;
	  } else {
	    return reduceOneParam((function (sendDataArrTuple, param) {
	                  var from = param[/* from */3];
	                  var type_ = param[/* type_ */2];
	                  var field = param[/* field */1];
	                  var name = param[/* name */0];
	                  switch (from) {
	                    case "ambientLight" : 
	                        return addAmbientLightSendData(/* tuple */[
	                                    field,
	                                    program,
	                                    uniformCacheMap,
	                                    uniformLocationMap
	                                  ], sendDataArrTuple);
	                    case "basicMaterial" : 
	                        return addBasicMaterialSendData(/* tuple */[
	                                    field,
	                                    getUniformLocation(program, name, uniformLocationMap, gl),
	                                    name,
	                                    type_,
	                                    uniformCacheMap
	                                  ], sendDataArrTuple);
	                    case "camera" : 
	                        return addCameraSendData(/* tuple */[
	                                    field,
	                                    getUniformLocation(program, name, uniformLocationMap, gl),
	                                    name,
	                                    type_,
	                                    uniformCacheMap
	                                  ], sendDataArrTuple);
	                    case "directionLight" : 
	                        return addDirectionLightSendData(/* tuple */[
	                                    field,
	                                    program,
	                                    uniformCacheMap,
	                                    uniformLocationMap
	                                  ], sendDataArrTuple);
	                    case "lightMaterial" : 
	                        return addLightMaterialSendData(/* tuple */[
	                                    field,
	                                    getUniformLocation(program, name, uniformLocationMap, gl),
	                                    name,
	                                    type_,
	                                    uniformCacheMap
	                                  ], sendDataArrTuple);
	                    case "model" : 
	                        return addModelSendData(/* tuple */[
	                                    field,
	                                    getUniformLocation(program, name, uniformLocationMap, gl),
	                                    name,
	                                    type_,
	                                    uniformCacheMap
	                                  ], sendDataArrTuple);
	                    case "pointLight" : 
	                        return addPointLightSendData(/* tuple */[
	                                    field,
	                                    program,
	                                    uniformCacheMap,
	                                    uniformLocationMap
	                                  ], sendDataArrTuple);
	                    default:
	                      return fatal(buildFatalMessage("_readUniforms", "unknow from:" + (String(from) + ""), "", "", ""));
	                  }
	                }), sendDataArrTuple, unsafeGetJsonSerializedValue(uniforms));
	  }
	}

	function _readUniformSendData$1(shaderLibDataArr, gl, program, param) {
	  return readUniformSendData(shaderLibDataArr, /* tuple */[
	              gl,
	              program
	            ], _readUniforms$1, /* tuple */[
	              param[0],
	              param[1]
	            ]);
	}

	function addUniformSendData$2(gl, param, recordTuple) {
	  return addUniformSendData$1(gl, /* tuple */[
	              param[0],
	              param[1],
	              param[2]
	            ], _readUniformSendData$1, recordTuple);
	}


	/* Log-WonderLog Not a pure module */

	function _addNormalMatrixInstanceArrayBufferSendData(param, param$1) {
	  return /* tuple */[
	          param$1[0],
	          push(/* record */[
	                /* pos */getAttribLocation(param[1], param[2], param[3], param[0]),
	                /* size */3,
	                /* getOffsetFunc */(function (index) {
	                    return imul(index - 4 | 0, 12) + 64 | 0;
	                  })
	              ], param$1[1])
	        ];
	}

	function _readAttributes$1(param, sendDataArrTuple, attributes) {
	  var attributeLocationMap = param[2];
	  var program = param[1];
	  var gl = param[0];
	  var match = isJsonSerializedValueNone(attributes);
	  if (match) {
	    return sendDataArrTuple;
	  } else {
	    return reduceOneParam((function (sendDataArrTuple, param) {
	                  var type_ = param[/* type_ */2];
	                  var buffer = param[/* buffer */1];
	                  var name = param[/* name */0];
	                  var match = !isJsonSerializedValueNone(name) && !isJsonSerializedValueNone(type_);
	                  if (match) {
	                    var name$1 = unsafeGetJsonSerializedValue(name);
	                    var type_$1 = unsafeGetJsonSerializedValue(type_);
	                    if (buffer !== 4) {
	                      if (buffer >= 5) {
	                        return addModelMatrixInstanceArrayBufferSendData(/* tuple */[
	                                    gl,
	                                    program,
	                                    name$1,
	                                    attributeLocationMap
	                                  ], sendDataArrTuple);
	                      } else {
	                        return addOtherArrayBufferSendData(/* tuple */[
	                                    gl,
	                                    program,
	                                    name$1,
	                                    buffer,
	                                    type_$1,
	                                    attributeLocationMap
	                                  ], sendDataArrTuple);
	                      }
	                    } else {
	                      return _addNormalMatrixInstanceArrayBufferSendData(/* tuple */[
	                                  gl,
	                                  program,
	                                  name$1,
	                                  attributeLocationMap
	                                ], sendDataArrTuple);
	                    }
	                  } else {
	                    return addElementBufferSendData(buffer, sendDataArrTuple);
	                  }
	                }), sendDataArrTuple, unsafeGetJsonSerializedValue(attributes));
	  }
	}

	function _readAttributeSendData$1(shaderLibDataArr, gl, program, attributeLocationMap) {
	  return readAttributeSendData(shaderLibDataArr, /* tuple */[
	              gl,
	              program
	            ], _readAttributes$1, attributeLocationMap);
	}

	function addAttributeSendData$2(glTuple, shaderLibDataArr, recordTuple) {
	  return addAttributeSendData$1(glTuple, shaderLibDataArr, _readAttributeSendData$1, recordTuple);
	}


	/* ArrayService-Wonderjs Not a pure module */

	function initMaterialShader$2(materialIndex, param, buildGLSLSourceFunc, state) {
	  var partial_arg_000 = state[/* directionLightRecord */1];
	  var partial_arg_001 = state[/* pointLightRecord */2];
	  var partial_arg = /* tuple */[
	    partial_arg_000,
	    partial_arg_001
	  ];
	  return initMaterialShader$1(materialIndex, /* tuple */[
	              param[0],
	              param[1]
	            ], /* tuple */[
	              buildGLSLSourceFunc,
	              (function (param) {
	                  return getHandle$1(partial_arg, param);
	                }),
	              addAttributeSendData$2,
	              addUniformSendData$2
	            ], /* tuple */[
	              state[/* shaderRecord */4],
	              state[/* programRecord */5],
	              state[/* glslRecord */6],
	              state[/* glslSenderRecord */7],
	              state[/* glslLocationRecord */8],
	              state[/* glslChunkRecord */9]
	            ]);
	}


	/* InitShaderInitMaterialService-Wonderjs Not a pure module */

	function _getMaterialShaderLibDataArrByStaticBranch$1(param, param$1, resultDataArr) {
	  var staticBranchs = param$1[0];
	  var name = param[0];
	  var exit = 0;
	  switch (name) {
	    case "modelMatrix_instance" : 
	    case "normalMatrix_instance" : 
	        exit = 1;
	        break;
	    default:
	      return handleUnknownNameWhenGetMaterialShaderLibDataArrByStaticBranch(name, staticBranchs);
	  }
	  if (exit === 1) {
	    var match = unsafeFindFirst(staticBranchs, name, (function (item) {
	            return filterTargetName(item[/* name */0], name);
	          }));
	    return getMaterialShaderLibDataArrByStaticBranchInstance(/* tuple */[
	                param[1],
	                param[2]
	              ], /* tuple */[
	                param$1[1],
	                match[/* value */1]
	              ], resultDataArr);
	  }
	  
	}

	function _isPass$1(materialIndex, condition, state) {
	  var materialRecord = state[/* materialRecord */0];
	  switch (condition) {
	    case "has_diffuse_map" : 
	        return hasMap(getDiffuseMapUnit(materialIndex, materialRecord[/* diffuseMapUnits */3]));
	    case "has_specular_map" : 
	        return hasMap(getSpecularMapUnit(materialIndex, materialRecord[/* specularMapUnits */4]));
	    case "light_has_map" : 
	        if (hasMap(getDiffuseMapUnit(materialIndex, materialRecord[/* diffuseMapUnits */3]))) {
	          return true;
	        } else {
	          return hasMap(getSpecularMapUnit(materialIndex, materialRecord[/* specularMapUnits */4]));
	        }
	    default:
	      return fatal(buildFatalMessage("_isPass", "unknown condition:" + (String(condition) + ""), "", "", ""));
	  }
	}

	function getMaterialShaderLibDataArr$2(materialIndex, param, shaderLibTuple, state) {
	  return getMaterialShaderLibDataArr$1(/* tuple */[
	              materialIndex,
	              param[0],
	              param[1]
	            ], shaderLibTuple, /* tuple */[
	              _getMaterialShaderLibDataArrByStaticBranch$1,
	              _isPass$1
	            ], state);
	}


	/* Log-WonderLog Not a pure module */

	function _getShaderLibItems$1(param) {
	  var shaderName = "front_render_light";
	  return unsafeFindFirst(param[/* materialShaders */3], shaderName, (function (param) {
	                  return filterTargetName(param[/* name */0], shaderName);
	                }))[/* shaderLibs */1];
	}

	function initMaterial$2(gl, dataTuple, state) {
	  return initMaterial$1(gl, dataTuple, /* tuple */[
	              initMaterialShader$2,
	              buildGLSLSource,
	              setShaderIndex,
	              _getShaderLibItems$1,
	              getMaterialShaderLibDataArr$2
	            ], /* tuple */[
	              state[/* materialRecord */0][/* shaderIndices */2],
	              state[/* renderConfigRecord */3],
	              state
	            ]);
	}

	function init$7(gl, instanceTuple, state) {
	  var materialRecord = state[/* materialRecord */0];
	  return init$6(gl, instanceTuple, initMaterial$2, /* tuple */[
	              materialRecord[/* index */0],
	              materialRecord[/* disposedIndexArray */1],
	              state
	            ]);
	}


	/* JobConfigService-Wonderjs Not a pure module */

	function createInitMaterialState$1(state) {
	  var shaderRecord = state[/* shaderRecord */5];
	  var programRecord = state[/* programRecord */6];
	  var glslRecord = state[/* glslRecord */7];
	  var glslSenderRecord = state[/* glslSenderRecord */8];
	  var glslLocationRecord = state[/* glslLocationRecord */9];
	  var glslChunkRecord = state[/* glslChunkRecord */10];
	  var directionLightRecord = getRecord$16(state);
	  var pointLightRecord = getRecord$11(state);
	  var match = getRecord$15(state);
	  return /* record */[
	          /* materialRecord : record */[
	            /* index */match[/* index */7],
	            /* disposedIndexArray */match[/* disposedIndexArray */8],
	            /* shaderIndices */unsafeGetShaderIndices$1(state),
	            /* diffuseMapUnits */unsafeGetDiffuseMapUnits(state),
	            /* specularMapUnits */unsafeGetSpecularMapUnits(state)
	          ],
	          /* directionLightRecord : record */[
	            /* index */directionLightRecord[/* index */0],
	            /* renderLightArr */getRenderLightArr$1(directionLightRecord)
	          ],
	          /* pointLightRecord : record */[
	            /* index */pointLightRecord[/* index */0],
	            /* renderLightArr */getRenderLightArr(pointLightRecord)
	          ],
	          /* renderConfigRecord */getRecord$31(state),
	          /* shaderRecord */shaderRecord,
	          /* programRecord */programRecord,
	          /* glslRecord */glslRecord,
	          /* glslSenderRecord */glslSenderRecord,
	          /* glslLocationRecord */glslLocationRecord,
	          /* glslChunkRecord */glslChunkRecord
	        ];
	}


	/* RecordPointLightRenderWorkerService-Wonderjs Not a pure module */

	function _createTypeArrays$6(buffer, lightMaterialCount, textureCountPerMaterial, state) {
	  var match = createTypeArrays$9(buffer, lightMaterialCount, textureCountPerMaterial);
	  var lightMaterialRecord = getRecord$15(state);
	  state[/* lightMaterialRecord */13] = /* record */[
	    /* shaderIndices */some$1(match[0]),
	    /* diffuseColors */some$1(match[1]),
	    /* specularColors */some$1(match[2]),
	    /* shininess */some$1(match[3]),
	    /* textureIndices */some$1(match[4]),
	    /* diffuseMapUnits */some$1(match[5]),
	    /* specularMapUnits */some$1(match[6]),
	    /* index */lightMaterialRecord[/* index */7],
	    /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */8],
	    /* isSourceInstanceMap */lightMaterialRecord[/* isSourceInstanceMap */9]
	  ];
	  return state;
	}

	function execJob$50(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var lightMaterialData = data.lightMaterialData;
	                var lightMaterialCount = data.bufferData.lightMaterialCount;
	                var textureCountPerMaterial = data.bufferData.textureCountPerMaterial;
	                setState$1(stateData, initMaterials(/* tuple */[
	                          createInitMaterialState$1,
	                          init$7
	                        ], getRecord$15(state)[/* isSourceInstanceMap */9], _createTypeArrays$6(lightMaterialData.buffer, lightMaterialCount, textureCountPerMaterial, state)));
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	/* OperateSettingService-Wonderjs Not a pure module */

	/* MemorySettingService-Wonderjs Not a pure module */

	/* No side effect */

	/* No side effect */

	/* Log-WonderLog Not a pure module */

	/* ArrayService-WonderCommonlib Not a pure module */

	/* QueryCPUMemoryService-Wonderjs Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	/* most Not a pure module */

	/* GetWorkerDataJobUtils-Wonderjs Not a pure module */

	/* GetWorkerDataJobUtils-Wonderjs Not a pure module */

	function _createRecordWithCreatedTypeArrays$1(buffer, count, index, state) {
	  var match = createTypeArrays$10(buffer, count);
	  state[/* directionLightRecord */19] = /* record */[
	    /* index */index,
	    /* directionMap */undefined,
	    /* renderLightArr */undefined,
	    /* colors */match[0],
	    /* intensities */match[1]
	  ];
	  return state;
	}

	function _getData$1(directionLightData, state) {
	  var init = getRecord$16(state);
	  state[/* directionLightRecord */19] = /* record */[
	    /* index */init[/* index */0],
	    /* directionMap */init[/* directionMap */1],
	    /* renderLightArr */directionLightData.renderLightArr,
	    /* colors */init[/* colors */3],
	    /* intensities */init[/* intensities */4]
	  ];
	  return state;
	}

	function execJob$56(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var directionLightData = data.directionLightData;
	                var buffer = directionLightData.buffer;
	                var count = getBufferMaxCount$1(/* () */0);
	                setState$1(stateData, _getData$1(directionLightData, _createRecordWithCreatedTypeArrays$1(buffer, count, directionLightData.index, state)));
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function execJob$57(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var ambientLightData = data.ambientLightData;
	                var state$1 = setAmbientLightColor(ambientLightData.color, state);
	                setState$1(stateData, state$1);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function create$27(param) {
	  return /* record */[
	          /* shaders */param[0],
	          /* shaderLibs */param[1]
	        ];
	}


	/* No side effect */

	function execJob$58(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var renderConfigData = data.renderConfigData;
	                state[/* renderConfigRecord */2] = create$27(/* tuple */[
	                      JSON.parse(renderConfigData.shaders),
	                      JSON.parse(renderConfigData.shaderLibs)
	                    ]);
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function execJob$59(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var workerDetectData = data.workerDetectData;
	                state[/* workerDetectRecord */25] = /* record */[/* isUseWorker */workerDetectData.isUseWorker];
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function execJob$60(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var browserDetectData = data.browserDetectData;
	                state[/* browserDetectRecord */26] = /* record */[/* browser */browserDetectData.browser];
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function _buildAddArrayBufferViewSourceStream$1(e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var initData = data.initData;
	                var textureData = initData.textureData;
	                return setState$1(stateData, addSourceArray(textureData.arrayBufferViewSourceTextureData.needAddedSourceArray, state));
	              }));
	}

	function _buildInitTextureStream$1(e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var initData = data.initData;
	                var textureData = initData.textureData;
	                var basicSourceTextureRecord = getRecord$7(state);
	                var arrayBufferViewSourceTextureRecord = getRecord$8(state);
	                state[/* basicSourceTextureRecord */15] = /* record */[
	                  /* wrapSs */basicSourceTextureRecord[/* wrapSs */0],
	                  /* wrapTs */basicSourceTextureRecord[/* wrapTs */1],
	                  /* magFilters */basicSourceTextureRecord[/* magFilters */2],
	                  /* minFilters */basicSourceTextureRecord[/* minFilters */3],
	                  /* formats */basicSourceTextureRecord[/* formats */4],
	                  /* types */basicSourceTextureRecord[/* types */5],
	                  /* isNeedUpdates */basicSourceTextureRecord[/* isNeedUpdates */6],
	                  /* flipYs */basicSourceTextureRecord[/* flipYs */7],
	                  /* sourceMap */basicSourceTextureRecord[/* sourceMap */8],
	                  /* glTextureMap */initTexturesWithIndexArray(unsafeGetGl(state[/* deviceManagerRecord */4]), textureData.basicSourceTextureData.needInitedTextureIndexArray, basicSourceTextureRecord[/* glTextureMap */9]),
	                  /* bindTextureUnitCacheMap */basicSourceTextureRecord[/* bindTextureUnitCacheMap */10]
	                ];
	                state[/* arrayBufferViewSourceTextureRecord */16] = /* record */[
	                  /* wrapSs */arrayBufferViewSourceTextureRecord[/* wrapSs */0],
	                  /* wrapTs */arrayBufferViewSourceTextureRecord[/* wrapTs */1],
	                  /* magFilters */arrayBufferViewSourceTextureRecord[/* magFilters */2],
	                  /* minFilters */arrayBufferViewSourceTextureRecord[/* minFilters */3],
	                  /* formats */arrayBufferViewSourceTextureRecord[/* formats */4],
	                  /* types */arrayBufferViewSourceTextureRecord[/* types */5],
	                  /* isNeedUpdates */arrayBufferViewSourceTextureRecord[/* isNeedUpdates */6],
	                  /* flipYs */arrayBufferViewSourceTextureRecord[/* flipYs */7],
	                  /* widths */arrayBufferViewSourceTextureRecord[/* widths */8],
	                  /* heights */arrayBufferViewSourceTextureRecord[/* heights */9],
	                  /* sourceMap */arrayBufferViewSourceTextureRecord[/* sourceMap */10],
	                  /* glTextureMap */initTexturesWithIndexArray(unsafeGetGl(state[/* deviceManagerRecord */4]), textureData.arrayBufferViewSourceTextureData.needInitedTextureIndexArray, arrayBufferViewSourceTextureRecord[/* glTextureMap */11]),
	                  /* bindTextureUnitCacheMap */arrayBufferViewSourceTextureRecord[/* bindTextureUnitCacheMap */12]
	                ];
	                return state;
	              }));
	}

	function execJob$61(_, e, stateData) {
	  var state = unsafeGetState$1(stateData);
	  var data = getRecord$1(e);
	  var initData = data.initData;
	  var textureData = initData.textureData;
	  return fromPromise(observe((function (state) {
	                      setState$1(stateData, state);
	                      return /* () */0;
	                    }), concatArray(/* array */[
	                        addSourceFromImageDataStream(textureData.basicSourceTextureData.needAddedImageDataArray, state),
	                        _buildAddArrayBufferViewSourceStream$1(e, stateData),
	                        _buildInitTextureStream$1(e, stateData)
	                      ])).then((function () {
	                    return Promise.resolve(e);
	                  })));
	}


	/* most Not a pure module */

	function execJob$62(flags, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                postMessage({
	                      operateType: getOperateType(flags),
	                      customData: getCustomDataFromRenderWorkerToMainWorker(state)
	                    }, _1(getSelf, /* () */0));
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function disposeMatrixFloat32ArrayMap(sourceInstance, maxBigTypeArrayPoolSize, matrixFloat32ArrayMap, typeArrayPoolRecord) {
	  var match = get$3(sourceInstance, matrixFloat32ArrayMap);
	  if (match !== undefined) {
	    addFloat32TypeArrayToPool(valFromOption(match), maxBigTypeArrayPoolSize, getFloat32ArrayPoolMap(typeArrayPoolRecord));
	  }
	  return disposeSparseMapData(sourceInstance, matrixFloat32ArrayMap);
	}

	var disposeMatrixInstanceBufferCapacityMap = disposeSparseMapData;

	var disposeIsSendTransformMatrixDataMap = disposeSparseMapData;


	/* TypeArrayPoolService-Wonderjs Not a pure module */

	function getMaxBigTypeArrayPoolSize$1(record) {
	  return unsafeGetMemory$1(record)[/* maxBigTypeArrayPoolSize */0];
	}


	/* OperateRenderWorkerSettingService-Wonderjs Not a pure module */

	function execJob$63(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var settingRecord = state[/* settingRecord */1];
	                var sourceInstanceRecord = state[/* sourceInstanceRecord */11];
	                var typeArrayPoolRecord = state[/* typeArrayPoolRecord */22];
	                var data = getRecord$1(e);
	                var match = reduceOneParam((function (param, sourceInstance) {
	                        return /* tuple */[
	                                disposeMatrixFloat32ArrayMap(sourceInstance, getMaxBigTypeArrayPoolSize$1(settingRecord), param[0], typeArrayPoolRecord),
	                                disposeMatrixInstanceBufferCapacityMap(sourceInstance, param[1]),
	                                disposeIsSendTransformMatrixDataMap(sourceInstance, param[2])
	                              ];
	                      }), /* tuple */[
	                      sourceInstanceRecord[/* matrixFloat32ArrayMap */4],
	                      sourceInstanceRecord[/* matrixInstanceBufferCapacityMap */3],
	                      sourceInstanceRecord[/* isSendTransformMatrixDataMap */5]
	                    ], data.sourceInstanceNeedDisposeVboBufferArr);
	                state[/* sourceInstanceRecord */11] = /* record */[
	                  /* objectInstanceTransformIndexMap */sourceInstanceRecord[/* objectInstanceTransformIndexMap */0],
	                  /* objectInstanceTransformCollections */sourceInstanceRecord[/* objectInstanceTransformCollections */1],
	                  /* isTransformStatics */sourceInstanceRecord[/* isTransformStatics */2],
	                  /* matrixInstanceBufferCapacityMap */match[1],
	                  /* matrixFloat32ArrayMap */match[0],
	                  /* isSendTransformMatrixDataMap */match[2]
	                ];
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function execJob$64(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var directionLightData = data.directionLightData;
	                var directionLightRecord = getRecord$16(state);
	                state[/* directionLightRecord */19] = /* record */[
	                  /* index */directionLightData.index,
	                  /* directionMap */directionLightData.directionMap,
	                  /* renderLightArr */directionLightData.renderLightArr,
	                  /* colors */directionLightRecord[/* colors */3],
	                  /* intensities */directionLightRecord[/* intensities */4]
	                ];
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	/* GetWorkerDataJobUtils-Wonderjs Not a pure module */

	function _initBasicMaterials(gl, basicMaterialData, isSupportInstance, state) {
	  getRecord$14(state);
	  reduceOneParam((function (initBasicMaterialState, param) {
	          return initMaterial(gl, /* tuple */[
	                      param[0],
	                      param[1],
	                      isSupportInstance
	                    ], initBasicMaterialState);
	        }), createInitMaterialState(state), basicMaterialData.materialDataForWorkerInit);
	  return state;
	}

	function _initLightMaterials(gl, lightMaterialData, isSupportInstance, state) {
	  getRecord$15(state);
	  reduceOneParam((function (initLightMaterialState, param) {
	          return initMaterial$2(gl, /* tuple */[
	                      param[0],
	                      param[1],
	                      isSupportInstance
	                    ], initLightMaterialState);
	        }), createInitMaterialState$1(state), lightMaterialData.materialDataForWorkerInit);
	  return state;
	}

	function execJob$66(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var initData = data.initData;
	                initData.materialData;
	                var basicMaterialData = data.initData.materialData.basicMaterialData;
	                var lightMaterialData = data.initData.materialData.lightMaterialData;
	                var gl = unsafeGetGl(state[/* deviceManagerRecord */4]);
	                var isSupportInstance = isSupportInstance$3(state);
	                setState$1(stateData, _initLightMaterials(gl, lightMaterialData, isSupportInstance, _initBasicMaterials(gl, basicMaterialData, isSupportInstance, state)));
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function execJob$68(flags, e, _) {
	  return callFunc((function () {
	                postMessage({
	                      operateType: getOperateType(flags)
	                    }, _1(getSelf, /* () */0));
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	var execJob$67 = execJob$68;


	/* SendWorkerDataJobUtils-Wonderjs Not a pure module */

	var execJob$69 = execJob$68;


	/* SendWorkerDataJobUtils-Wonderjs Not a pure module */

	function getAllShaderIndexArray(param) {
	  return param[/* usedShaderIndexArray */0];
	}


	/* No side effect */

	function execJob$71(renderState) {
	  var match = !hasCameraRecord$1(renderState);
	  if (match) {
	    return renderState;
	  } else {
	    var gl = unsafeGetGl(renderState[/* deviceManagerRecord */18]);
	    return reduceOneParam((function (renderState, shaderIndex) {
	                  var program = unsafeGetProgram(shaderIndex, renderState[/* programRecord */4]);
	                  var renderState$1 = use(gl, program, renderState);
	                  var renderState$2 = reduceOneParam((function (renderState, param) {
	                          var pos = param[/* pos */0];
	                          var match = isUniformLocationExist(pos);
	                          if (match) {
	                            param[/* sendDataFunc */2](gl, pos, param[/* getDataFunc */1](renderState));
	                          }
	                          return renderState;
	                        }), renderState$1, unsafeGetUniformSendData$5(shaderIndex, renderState$1[/* glslSenderRecord */3]));
	                  var renderState$3 = reduceOneParam((function (renderState, param) {
	                          param[/* sendDataFunc */4](gl, param[/* shaderCacheMap */0], /* tuple */[
	                                param[/* name */1],
	                                param[/* pos */2]
	                              ], param[/* getDataFunc */3](renderState));
	                          return renderState;
	                        }), renderState$2, unsafeGetUniformSendData$4(shaderIndex, renderState$2[/* glslSenderRecord */3]));
	                  return reduceOneParam((function (renderState, param) {
	                                param[/* sendCachableFunctionDataFunc */3](gl, /* tuple */[
	                                      param[/* program */0],
	                                      param[/* shaderCacheMap */1],
	                                      param[/* locationMap */2]
	                                    ], renderState);
	                                return renderState;
	                              }), renderState$3, unsafeGetUniformSendData$6(shaderIndex, renderState$3[/* glslSenderRecord */3]));
	                }), renderState, getAllShaderIndexArray(renderState[/* shaderRecord */19]));
	  }
	}


	/* ProgramService-Wonderjs Not a pure module */

	function execJob$70(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var match = isRender(getRecord$1(e));
	                if (match) {
	                  execJob$71(createRenderState(state));
	                  setState$1(stateData, state);
	                  return e;
	                } else {
	                  return e;
	                }
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function execJob$73(glslSenderRecord) {
	  return /* record */[
	          /* attributeSendDataMap */glslSenderRecord[/* attributeSendDataMap */0],
	          /* instanceAttributeSendDataMap */glslSenderRecord[/* instanceAttributeSendDataMap */1],
	          /* uniformCacheMap */glslSenderRecord[/* uniformCacheMap */2],
	          /* uniformRenderObjectSendModelDataMap */glslSenderRecord[/* uniformRenderObjectSendModelDataMap */3],
	          /* uniformRenderObjectSendMaterialDataMap */glslSenderRecord[/* uniformRenderObjectSendMaterialDataMap */4],
	          /* uniformShaderSendNoCachableDataMap */glslSenderRecord[/* uniformShaderSendNoCachableDataMap */5],
	          /* uniformShaderSendCachableDataMap */glslSenderRecord[/* uniformShaderSendCachableDataMap */6],
	          /* uniformShaderSendCachableFunctionDataMap */glslSenderRecord[/* uniformShaderSendCachableFunctionDataMap */7],
	          /* uniformInstanceSendNoCachableDataMap */glslSenderRecord[/* uniformInstanceSendNoCachableDataMap */8],
	          /* vertexAttribHistoryArray */glslSenderRecord[/* vertexAttribHistoryArray */9],
	          /* lastSendMaterialData */undefined
	        ];
	}


	/* No side effect */

	function execJob$72(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                state[/* glslSenderRecord */8] = execJob$73(state[/* glslSenderRecord */8]);
	                setState$1(stateData, state);
	                return e;
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	/* ArrayService-WonderCommonlib Not a pure module */

	/* GameObjectsMapService-Wonderjs Not a pure module */

	/* GroupService-Wonderjs Not a pure module */

	/* ArrayService-WonderCommonlib Not a pure module */

	/* GroupService-Wonderjs Not a pure module */

	/* ArrayService-WonderCommonlib Not a pure module */

	/* GroupService-Wonderjs Not a pure module */

	/* ArrayService-WonderCommonlib Not a pure module */

	/* ComponentMapService-Wonderjs Not a pure module */

	/* No side effect */

	/* Contract-WonderLog Not a pure module */

	/* GameObjectsMapService-Wonderjs Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* Contract-WonderLog Not a pure module */

	/* Contract-WonderLog Not a pure module */

	/* Contract-WonderLog Not a pure module */

	/* DisposeComponentService-Wonderjs Not a pure module */

	/* Contract-WonderLog Not a pure module */

	/* Contract-WonderLog Not a pure module */

	/* No side effect */

	/* GameObjectMapService-Wonderjs Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* GameObjectMapService-Wonderjs Not a pure module */

	/* BufferSettingService-Wonderjs Not a pure module */

	/* Log-WonderLog Not a pure module */

	/* ArrayService-Wonderjs Not a pure module */

	/* Matrix4Service-Wonderjs Not a pure module */

	/* ViewService-Wonderjs Not a pure module */

	/* Contract-WonderLog Not a pure module */

	/* Contract-WonderLog Not a pure module */

	/* ArrayService-Wonderjs Not a pure module */

	/* ComponentMapService-Wonderjs Not a pure module */

	/* ArrayService-Wonderjs Not a pure module */

	/* ArrayService-Wonderjs Not a pure module */

	/* DisposeGameObjectMainService-Wonderjs Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	var execJob$76 = execJob$68;


	/* SendWorkerDataJobUtils-Wonderjs Not a pure module */

	/* ArrayService-Wonderjs Not a pure module */

	/* RecordRenderMainService-Wonderjs Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	/* RecordRenderMainService-Wonderjs Not a pure module */

	/* MostUtils-Wonderjs Not a pure module */

	function execJob$81(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var match = isRender(data);
	                if (match) {
	                  var basicRenderData = data.renderData.basic;
	                  var match$1 = createTypeArrays$1(basicRenderData.buffer, basicRenderData.bufferCount);
	                  state[/* renderRecord */21][/* basicRenderObjectRecord */0] = /* record */[
	                    /* renderArray */basicRenderData.renderArray,
	                    /* transformIndices */match$1[0],
	                    /* materialIndices */match$1[1],
	                    /* meshRendererIndices */match$1[2],
	                    /* geometryIndices */match$1[3],
	                    /* sourceInstanceIndices */match$1[4]
	                  ];
	                  setState$1(stateData, state);
	                  return e;
	                } else {
	                  return e;
	                }
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function execJob$82(_, e, stateData) {
	  return callFunc((function () {
	                var state = unsafeGetState$1(stateData);
	                var data = getRecord$1(e);
	                var match = isRender(data);
	                if (match) {
	                  var lightRenderData = data.renderData.light;
	                  var match$1 = createTypeArrays$1(lightRenderData.buffer, lightRenderData.bufferCount);
	                  state[/* renderRecord */21][/* lightRenderObjectRecord */1] = /* record */[
	                    /* renderArray */lightRenderData.renderArray,
	                    /* transformIndices */match$1[0],
	                    /* materialIndices */match$1[1],
	                    /* meshRendererIndices */match$1[2],
	                    /* geometryIndices */match$1[3],
	                    /* sourceInstanceIndices */match$1[4]
	                  ];
	                  setState$1(stateData, state);
	                  return e;
	                } else {
	                  return e;
	                }
	              }));
	}


	/* MostUtils-Wonderjs Not a pure module */

	function _getWorkerJobHandles() {
	  return /* :: */[
	          /* tuple */[
	            "send_finish_send_job_data",
	            execJob$69
	          ],
	          /* :: */[
	            /* tuple */[
	              "get_init_render_data",
	              execJob$47
	            ],
	            /* :: */[
	              /* tuple */[
	                "get_isDebug_data",
	                execJob$36
	              ],
	              /* :: */[
	                /* tuple */[
	                  "get_renderConfig_data",
	                  execJob$58
	                ],
	                /* :: */[
	                  /* tuple */[
	                    "get_setting_data",
	                    execJob$37
	                  ],
	                  /* :: */[
	                    /* tuple */[
	                      "get_material_data",
	                      execJob$42
	                    ],
	                    /* :: */[
	                      /* tuple */[
	                        "get_browserDetect_data",
	                        execJob$60
	                      ],
	                      /* :: */[
	                        /* tuple */[
	                          "get_workerDetect_data",
	                          execJob$59
	                        ],
	                        /* :: */[
	                          /* tuple */[
	                            "preget_glslData",
	                            execJob$39
	                          ],
	                          /* :: */[
	                            /* tuple */[
	                              "create_gl",
	                              execJob$5
	                            ],
	                            /* :: */[
	                              /* tuple */[
	                                "set_viewport",
	                                execJob$25
	                              ],
	                              /* :: */[
	                                /* tuple */[
	                                  "detect_gl",
	                                  execJob$6
	                                ],
	                                /* :: */[
	                                  /* tuple */[
	                                    "preget_glslData",
	                                    execJob$39
	                                  ],
	                                  /* :: */[
	                                    /* tuple */[
	                                      "init_state",
	                                      execJob$9
	                                    ],
	                                    /* :: */[
	                                      /* tuple */[
	                                        "init_transform",
	                                        execJob$32
	                                      ],
	                                      /* :: */[
	                                        /* tuple */[
	                                          "init_instance",
	                                          execJob$27
	                                        ],
	                                        /* :: */[
	                                          /* tuple */[
	                                            "init_geometry",
	                                            execJob$26
	                                          ],
	                                          /* :: */[
	                                            /* tuple */[
	                                              "init_meshRenderer",
	                                              execJob$44
	                                            ],
	                                            /* :: */[
	                                              /* tuple */[
	                                                "init_basic_material",
	                                                execJob$49
	                                              ],
	                                              /* :: */[
	                                                /* tuple */[
	                                                  "init_direction_light",
	                                                  execJob$56
	                                                ],
	                                                /* :: */[
	                                                  /* tuple */[
	                                                    "init_point_light",
	                                                    execJob$38
	                                                  ],
	                                                  /* :: */[
	                                                    /* tuple */[
	                                                      "init_light_material",
	                                                      execJob$50
	                                                    ],
	                                                    /* :: */[
	                                                      /* tuple */[
	                                                        "init_texture",
	                                                        execJob$21
	                                                      ],
	                                                      /* :: */[
	                                                        /* tuple */[
	                                                          "init_imgui",
	                                                          execJob$8
	                                                        ],
	                                                        /* :: */[
	                                                          /* tuple */[
	                                                            "send_finish_init_render_data",
	                                                            execJob$76
	                                                          ],
	                                                          /* :: */[
	                                                            /* tuple */[
	                                                              "get_render_data",
	                                                              execJob$31
	                                                            ],
	                                                            /* :: */[
	                                                              /* tuple */[
	                                                                "get_instance_data",
	                                                                execJob$41
	                                                              ],
	                                                              /* :: */[
	                                                                /* tuple */[
	                                                                  "get_geometry_data",
	                                                                  execJob$40
	                                                                ],
	                                                                /* :: */[
	                                                                  /* tuple */[
	                                                                    "get_ambient_light_data",
	                                                                    execJob$57
	                                                                  ],
	                                                                  /* :: */[
	                                                                    /* tuple */[
	                                                                      "get_direction_light_data",
	                                                                      execJob$64
	                                                                    ],
	                                                                    /* :: */[
	                                                                      /* tuple */[
	                                                                        "get_point_light_data",
	                                                                        execJob$48
	                                                                      ],
	                                                                      /* :: */[
	                                                                        /* tuple */[
	                                                                          "init_material_for_render",
	                                                                          execJob$66
	                                                                        ],
	                                                                        /* :: */[
	                                                                          /* tuple */[
	                                                                            "init_texture_for_render",
	                                                                            execJob$61
	                                                                          ],
	                                                                          /* :: */[
	                                                                            /* tuple */[
	                                                                              "clear_color",
	                                                                              execJob$12
	                                                                            ],
	                                                                            /* :: */[
	                                                                              /* tuple */[
	                                                                                "clear_buffer",
	                                                                                execJob$17
	                                                                              ],
	                                                                              /* :: */[
	                                                                                /* tuple */[
	                                                                                  "clear_last_send_component",
	                                                                                  execJob$72
	                                                                                ],
	                                                                                /* :: */[
	                                                                                  /* tuple */[
	                                                                                    "create_basic_render_object_typeArray",
	                                                                                    execJob$81
	                                                                                  ],
	                                                                                  /* :: */[
	                                                                                    /* tuple */[
	                                                                                      "create_light_render_object_typeArray",
	                                                                                      execJob$82
	                                                                                    ],
	                                                                                    /* :: */[
	                                                                                      /* tuple */[
	                                                                                        "get_custom_data",
	                                                                                        execJob$30
	                                                                                      ],
	                                                                                      /* :: */[
	                                                                                        /* tuple */[
	                                                                                          "get_camera_data",
	                                                                                          execJob$29
	                                                                                        ],
	                                                                                        /* :: */[
	                                                                                          /* tuple */[
	                                                                                            "send_uniform_shader_data",
	                                                                                            execJob$70
	                                                                                          ],
	                                                                                          /* :: */[
	                                                                                            /* tuple */[
	                                                                                              "render_basic",
	                                                                                              execJob$22
	                                                                                            ],
	                                                                                            /* :: */[
	                                                                                              /* tuple */[
	                                                                                                "front_render_light",
	                                                                                                execJob$43
	                                                                                              ],
	                                                                                              /* :: */[
	                                                                                                /* tuple */[
	                                                                                                  "render_imgui",
	                                                                                                  execJob$23
	                                                                                                ],
	                                                                                                /* :: */[
	                                                                                                  /* tuple */[
	                                                                                                    "commit",
	                                                                                                    execJob$2
	                                                                                                  ],
	                                                                                                  /* :: */[
	                                                                                                    /* tuple */[
	                                                                                                      "send_finish_render_data",
	                                                                                                      execJob$62
	                                                                                                    ],
	                                                                                                    /* :: */[
	                                                                                                      /* tuple */[
	                                                                                                        "get_dispose_data",
	                                                                                                        execJob$35
	                                                                                                      ],
	                                                                                                      /* :: */[
	                                                                                                        /* tuple */[
	                                                                                                          "dispose_vbo",
	                                                                                                          execJob$15
	                                                                                                        ],
	                                                                                                        /* :: */[
	                                                                                                          /* tuple */[
	                                                                                                            "dispose_sourceInstance",
	                                                                                                            execJob$63
	                                                                                                          ],
	                                                                                                          /* :: */[
	                                                                                                            /* tuple */[
	                                                                                                              "send_finish_dispose_data",
	                                                                                                              execJob$67
	                                                                                                            ],
	                                                                                                            /* [] */0
	                                                                                                          ]
	                                                                                                        ]
	                                                                                                      ]
	                                                                                                    ]
	                                                                                                  ]
	                                                                                                ]
	                                                                                              ]
	                                                                                            ]
	                                                                                          ]
	                                                                                        ]
	                                                                                      ]
	                                                                                    ]
	                                                                                  ]
	                                                                                ]
	                                                                              ]
	                                                                            ]
	                                                                          ]
	                                                                        ]
	                                                                      ]
	                                                                    ]
	                                                                  ]
	                                                                ]
	                                                              ]
	                                                            ]
	                                                          ]
	                                                        ]
	                                                      ]
	                                                    ]
	                                                  ]
	                                                ]
	                                              ]
	                                            ]
	                                          ]
	                                        ]
	                                      ]
	                                    ]
	                                  ]
	                                ]
	                              ]
	                            ]
	                          ]
	                        ]
	                      ]
	                    ]
	                  ]
	                ]
	              ]
	            ]
	          ]
	        ];
	}

	function createWorkerJobHandleMap() {
	  return createJobHandleMap(_getWorkerJobHandles(/* () */0));
	}

	function _getJobHandle(name, jobHandleMap) {
	  var match = get(name, jobHandleMap);
	  if (match !== undefined) {
	    return valFromOption(match);
	  } else {
	    return handleGetNoneJob(name, jobHandleMap);
	  }
	}

	var getWorkerJobHandle = _getJobHandle;


	/* JobService-Wonderjs Not a pure module */

	function create$28() {
	  return /* record */[/* precision */undefined];
	}


	/* No side effect */

	function create$29() {
	  return /* record */[
	          /* index */0,
	          /* shaderIndexMap */createEmpty(/* () */0),
	          /* materialsMap */createEmpty$2(/* () */0),
	          /* usedShaderIndexArray : array */[]
	        ];
	}


	/* HashMapService-Wonderjs Not a pure module */

	function create$30() {
	  return /* record */[
	          /* programMap */createEmpty$2(/* () */0),
	          /* lastUsedProgram */undefined
	        ];
	}


	/* No side effect */

	function create$31() {
	  return /* record */[
	          /* geometryVertexBufferMap */createEmpty$2(/* () */0),
	          /* geometryTexCoordBufferMap */createEmpty$2(/* () */0),
	          /* geometryNormalBufferMap */createEmpty$2(/* () */0),
	          /* geometryElementArrayBufferMap */createEmpty$2(/* () */0),
	          /* matrixInstanceBufferMap */createEmpty$2(/* () */0),
	          /* vertexArrayBufferPool */createEmpty$1(/* () */0),
	          /* elementArrayBufferPool */createEmpty$1(/* () */0),
	          /* matrixInstanceBufferPool */createEmpty$1(/* () */0)
	        ];
	}


	/* ArrayService-WonderCommonlib Not a pure module */

	function create$32() {
	  return /* record */[
	          /* float16Array1 */new Float32Array(/* array */[
	                1,
	                0,
	                0,
	                0,
	                0,
	                1,
	                0,
	                0,
	                0,
	                0,
	                1,
	                0,
	                0,
	                0,
	                0,
	                1
	              ]),
	          /* float9Array1 */new Float32Array(/* array */[
	                1,
	                0,
	                0,
	                1,
	                0,
	                0,
	                1,
	                0,
	                0
	              ])
	        ];
	}


	/* No side effect */

	function create$33() {
	  return /* record */[
	          /* attributeLocationMap */createEmpty$2(/* () */0),
	          /* uniformLocationMap */createEmpty$2(/* () */0)
	        ];
	}


	/* No side effect */

	function create$34() {
	  return /* record */[
	          /* gl */undefined,
	          /* colorWrite */undefined,
	          /* clearColor */undefined,
	          /* side */undefined,
	          /* depthTest */undefined,
	          /* scissorTest */undefined,
	          /* scissor */undefined,
	          /* viewport */undefined
	        ];
	}


	/* No side effect */

	function create$35() {
	  return /* record */[
	          /* attributeSendDataMap */createEmpty$2(/* () */0),
	          /* instanceAttributeSendDataMap */createEmpty$2(/* () */0),
	          /* uniformCacheMap */createEmpty$2(/* () */0),
	          /* uniformRenderObjectSendModelDataMap */createEmpty$2(/* () */0),
	          /* uniformRenderObjectSendMaterialDataMap */createEmpty$2(/* () */0),
	          /* uniformShaderSendNoCachableDataMap */createEmpty$2(/* () */0),
	          /* uniformShaderSendCachableDataMap */createEmpty$2(/* () */0),
	          /* uniformShaderSendCachableFunctionDataMap */createEmpty$2(/* () */0),
	          /* uniformInstanceSendNoCachableDataMap */createEmpty$2(/* () */0),
	          /* vertexAttribHistoryArray */createEmpty$1(/* () */0),
	          /* lastSendMaterialData */undefined
	        ];
	}


	/* ArrayService-WonderCommonlib Not a pure module */

	function create$36() {
	  return /* record */[
	          /* float32ArrayPoolMap */createEmpty$2(/* () */0),
	          /* uint16ArrayPoolMap */createEmpty$2(/* () */0)
	        ];
	}


	/* No side effect */

	function create$37() {
	  return /* record */[/* ambientLight : record */[/* color */getDefaultColor$1(/* () */0)]];
	}


	/* No side effect */

	function create$38() {
	  return /* record */[
	          /* customDataInRenderWorker */-1,
	          /* customDataFromRenderWorkerToMainWorker */-1,
	          /* customDataFromMainWorkerToRenderWorker */-1
	        ];
	}


	/* No side effect */

	function create$39() {
	  return /* record */[
	          /* basicRenderObjectRecord */undefined,
	          /* lightRenderObjectRecord */undefined,
	          /* cameraRecord */undefined
	        ];
	}


	/* No side effect */

	function create$40() {
	  return /* record */[
	          /* gpu */undefined,
	          /* instanceBuffer */undefined,
	          /* textureCountPerMaterial */undefined,
	          /* basicSourceTextureCount */undefined,
	          /* arrayBufferViewSourceTextureCount */undefined,
	          /* memory */undefined
	        ];
	}


	/* No side effect */

	function createState() {
	  return /* record */[
	          /* sceneRecord */create$37(/* () */0),
	          /* settingRecord */create$40(/* () */0),
	          /* renderConfigRecord */undefined,
	          /* gpuDetectRecord : record */[
	            /* extensionInstancedArrays */undefined,
	            /* extensionElementIndexUint */undefined,
	            /* precision */undefined,
	            /* maxTextureUnit */undefined
	          ],
	          /* deviceManagerRecord */create$34(/* () */0),
	          /* shaderRecord */create$29(/* () */0),
	          /* programRecord */create$30(/* () */0),
	          /* glslRecord */create$28(/* () */0),
	          /* glslSenderRecord */create$35(/* () */0),
	          /* glslLocationRecord */create$33(/* () */0),
	          /* glslChunkRecord */create$26(/* () */0),
	          /* sourceInstanceRecord */create$10(/* () */0),
	          /* basicMaterialRecord */undefined,
	          /* lightMaterialRecord */undefined,
	          /* meshRendererRecord */undefined,
	          /* basicSourceTextureRecord */undefined,
	          /* arrayBufferViewSourceTextureRecord */undefined,
	          /* transformRecord */undefined,
	          /* geometryRecord */undefined,
	          /* directionLightRecord */undefined,
	          /* pointLightRecord */undefined,
	          /* renderRecord */create$39(/* () */0),
	          /* typeArrayPoolRecord */create$36(/* () */0),
	          /* vboBufferRecord */create$31(/* () */0),
	          /* globalTempRecord */create$32(/* () */0),
	          /* workerDetectRecord */undefined,
	          /* browserDetectRecord */undefined,
	          /* imguiRecord */createRecord$1(/* () */0),
	          /* apiRecord */create$11(/* () */0),
	          /* customRecord */create$38(/* () */0)
	        ];
	}


	/* ManageIMGUIAPI-WonderImgui Not a pure module */

	function onerrorHandler(msg, fileName, lineno) {
	  return error$2(buildErrorMessage("render worker error", "" + (String(msg) + ""), "", "", "fileName:" + (String(fileName) + ("\n        lineno:" + (String(lineno) + "")))));
	}

	function _createAndSetWorkerState() {
	  setState$1(renderWorkerStateData, createState(/* () */0));
	  return /* () */0;
	}

	drain(concatMap((function (e) {
	            return mergeArray((_createAndSetWorkerState(/* () */0), getRenderWorkerJobStreamArr(JSON.parse(e.data.pipelineJobs), JSON.parse(e.data.jobs), /* tuple */[
	                              createWorkerJobHandleMap,
	                              getWorkerJobHandle
	                            ], renderWorkerStateData)));
	          }), filter((function (e) {
	                return e.data.operateType === "SEND_JOB_DATA";
	              }), fromEvent("message", _1(getSelf, /* () */0)))));


	/*  Not a pure module */

	var defineOnError = (
	       function() {
	           onerror = (msg, fileName, lineno) => {
	onerrorHandler(msg, fileName, lineno);
	           };
	       }
	        );

	_1(defineOnError, /* () */0);

	var useThisToImportRenderWorkerSystem = onerrorHandler;


	/* defineOnError Not a pure module */

	exports.useThisToImportRenderWorkerSystem = useThisToImportRenderWorkerSystem;
	exports.defineOnError = defineOnError;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
