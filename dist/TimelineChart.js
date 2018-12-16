/*!
 * Timeline.js v1.0.0
 *
 * (c) 2018 Sawada Makoto.
 * Released under the MIT License
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.TimelineChart = factory());
}(this, (function () { 'use strict';

  var _isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var toString = {}.toString;

  var _cof = function (it) {
    return toString.call(it).slice(8, -1);
  };

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _core = createCommonjsModule(function (module) {
    var core = module.exports = {
      version: '2.6.0'
    };
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1 = _core.version;

  var _global = createCommonjsModule(function (module) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
    : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var _library = false;

  var _shared = createCommonjsModule(function (module) {
    var SHARED = '__core-js_shared__';
    var store = _global[SHARED] || (_global[SHARED] = {});
    (module.exports = function (key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: _core.version,
      mode: _library ? 'pure' : 'global',
      copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
    });
  });

  var id = 0;
  var px = Math.random();

  var _uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

  var _wks = createCommonjsModule(function (module) {
    var store = _shared('wks');
    var Symbol = _global.Symbol;
    var USE_SYMBOL = typeof Symbol == 'function';

    var $exports = module.exports = function (name) {
      return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
    };

    $exports.store = store;
  });

  var MATCH = _wks('match');

  var _isRegexp = function (it) {
    var isRegExp;
    return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
  };

  var _anObject = function (it) {
    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var _aFunction = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  var SPECIES = _wks('species');

  var _speciesConstructor = function (O, D) {
    var C = _anObject(O).constructor;
    var S;
    return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
  };

  // 7.1.4 ToInteger
  var ceil = Math.ceil;
  var floor = Math.floor;

  var _toInteger = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  // false -> String#codePointAt

  var _stringAt = function (TO_STRING) {
    return function (that, pos) {
      var s = String(_defined(that));
      var i = _toInteger(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  var at = _stringAt(true); // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex

  var _advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? at(S, index).length : 1);
  };

  var min = Math.min;

  var _toLength = function (it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  var TAG = _wks('toStringTag'); // ES3 wrong here

  var ARG = _cof(function () {
    return arguments;
  }()) == 'Arguments'; // fallback for IE11 Script Access Denied error

  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (e) {
      /* empty */
    }
  };

  var _classof = function (it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T // builtinTag case
    : ARG ? _cof(O) // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };

  var builtinExec = RegExp.prototype.exec; // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec

  var _regexpExecAbstract = function (R, S) {
    var exec = R.exec;

    if (typeof exec === 'function') {
      var result = exec.call(R, S);

      if (typeof result !== 'object') {
        throw new TypeError('RegExp exec method returned something other than an Object or null');
      }

      return result;
    }

    if (_classof(R) !== 'RegExp') {
      throw new TypeError('RegExp#exec called on incompatible receiver');
    }

    return builtinExec.call(R, S);
  };

  var _flags = function () {
    var that = _anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.

  var nativeReplace = String.prototype.replace;
  var patchedExec = nativeExec;
  var LAST_INDEX = 'lastIndex';

  var UPDATES_LAST_INDEX_WRONG = function () {
    var re1 = /a/,
        re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
  }(); // nonparticipating capturing group, copied from es5-shim's String#split patch.


  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
      }

      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];
      match = nativeExec.call(re, str);

      if (UPDATES_LAST_INDEX_WRONG && match) {
        re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
      }

      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        // eslint-disable-next-line no-loop-func
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var _regexpExec = patchedExec;

  var _fails = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  var _descriptors = !_fails(function () {
    return Object.defineProperty({}, 'a', {
      get: function () {
        return 7;
      }
    }).a != 7;
  });

  var document = _global.document; // typeof document.createElement is 'object' in old IE

  var is = _isObject(document) && _isObject(document.createElement);

  var _domCreate = function (it) {
    return is ? document.createElement(it) : {};
  };

  var _ie8DomDefine = !_descriptors && !_fails(function () {
    return Object.defineProperty(_domCreate('div'), 'a', {
      get: function () {
        return 7;
      }
    }).a != 7;
  });

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string

  var _toPrimitive = function (it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP = Object.defineProperty;
  var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject(O);
    P = _toPrimitive(P, true);
    _anObject(Attributes);
    if (_ie8DomDefine) try {
      return dP(O, P, Attributes);
    } catch (e) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };
  var _objectDp = {
    f: f
  };

  var _propertyDesc = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide = _descriptors ? function (object, key, value) {
    return _objectDp.f(object, key, _propertyDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var _has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var _redefine = createCommonjsModule(function (module) {
    var SRC = _uid('src');
    var TO_STRING = 'toString';
    var $toString = Function[TO_STRING];
    var TPL = ('' + $toString).split(TO_STRING);

    _core.inspectSource = function (it) {
      return $toString.call(it);
    };

    (module.exports = function (O, key, val, safe) {
      var isFunction = typeof val == 'function';
      if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
      if (O[key] === val) return;
      if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));

      if (O === _global) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];
        _hide(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        _hide(O, key, val);
      } // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative

    })(Function.prototype, TO_STRING, function toString() {
      return typeof this == 'function' && this[SRC] || $toString.call(this);
    });
  });

  var _ctx = function (fn, that, length) {
    _aFunction(fn);
    if (that === undefined) return fn;

    switch (length) {
      case 1:
        return function (a) {
          return fn.call(that, a);
        };

      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };

      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }

    return function ()
    /* ...args */
    {
      return fn.apply(that, arguments);
    };
  };

  var PROTOTYPE = 'prototype';

  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
    var key, own, out, exp;
    if (IS_GLOBAL) source = name;

    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined; // export native or passed

      out = (own ? target : source)[key]; // bind timers to global for call from export context

      exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out; // extend global

      if (target) _redefine(target, key, out, type & $export.U); // export

      if (exports[key] != out) _hide(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };

  _global.core = _core; // type bitmap

  $export.F = 1; // forced

  $export.G = 2; // global

  $export.S = 4; // static

  $export.P = 8; // proto

  $export.B = 16; // bind

  $export.W = 32; // wrap

  $export.U = 64; // safe

  $export.R = 128; // real proto method for `library`

  var _export = $export;

  _export({
    target: 'RegExp',
    proto: true,
    forced: _regexpExec !== /./.exec
  }, {
    exec: _regexpExec
  });

  var SPECIES$1 = _wks('species');
  var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;

    re.exec = function () {
      var result = [];
      result.groups = {
        a: '7'
      };
      return result;
    };

    return ''.replace(re, '$<a>') !== '7';
  });

  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function () {
    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
    var re = /(?:)/;
    var originalExec = re.exec;

    re.exec = function () {
      return originalExec.apply(this, arguments);
    };

    var result = 'ab'.split(re);
    return result.length === 2 && result[0] === 'a' && result[1] === 'b';
  }();

  var _fixReWks = function (KEY, length, exec) {
    var SYMBOL = _wks(KEY);
    var DELEGATES_TO_SYMBOL = !_fails(function () {
      // String methods call symbol-named RegEp methods
      var O = {};

      O[SYMBOL] = function () {
        return 7;
      };

      return ''[KEY](O) != 7;
    });
    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      re.exec = function () {
        execCalled = true;
        return null;
      };

      if (KEY === 'split') {
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};

        re.constructor[SPECIES$1] = function () {
          return re;
        };
      }

      re[SYMBOL]('');
      return !execCalled;
    }) : undefined;

    if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
      var nativeRegExpMethod = /./[SYMBOL];
      var fns = exec(_defined, SYMBOL, ''[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === _regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return {
              done: true,
              value: nativeRegExpMethod.call(regexp, str, arg2)
            };
          }

          return {
            done: true,
            value: nativeMethod.call(str, regexp, arg2)
          };
        }

        return {
          done: false
        };
      });
      var strfn = fns[0];
      var rxfn = fns[1];
      _redefine(String.prototype, KEY, strfn);
      _hide(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) {
        return rxfn.call(string, this, arg);
      } // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) {
        return rxfn.call(string, this);
      });
    }
  };

  var $min = Math.min;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX$1 = 'lastIndex'; // eslint-disable-next-line no-empty

  var SUPPORTS_Y = !!function () {
    try {
      return new RegExp('x', 'y');
    } catch (e) {}
  }(); // @@split logic

  _fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
    var internalSplit = $split;

    if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = String(this);
        if (separator === undefined && limit === 0) return []; // If `separator` is not a regex, use native split

        if (!_isRegexp(separator)) return $split.call(string, separator, limit);
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        var splitLimit = limit === undefined ? 4294967295 : limit >>> 0; // Make `global` and avoid `lastIndex` issues by working with a copy

        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;

        while (match = _regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy[LAST_INDEX$1];

          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
            lastLength = match[0][LENGTH];
            lastLastIndex = lastIndex;
            if (output[LENGTH] >= splitLimit) break;
          }

          if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
        }

        if (lastLastIndex === string[LENGTH]) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));

        return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
      }; // Chakra, V8

    } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
      };
    }

    return [// `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
    }, // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;
      var rx = _anObject(regexp);
      var S = String(this);
      var C = _speciesConstructor(rx, RegExp);
      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.

      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? 0xffffffff : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];

      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;

        if (z === null || (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
          q = _advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;

          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }

          q = p = e;
        }
      }

      A.push(S.slice(p));
      return A;
    }];
  });

  // eslint-disable-next-line no-prototype-builtins

  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
  };

  var _toIobject = function (it) {
    return _iobject(_defined(it));
  };

  var max = Math.max;
  var min$1 = Math.min;

  var _toAbsoluteIndex = function (index, length) {
    index = _toInteger(index);
    return index < 0 ? max(index + length, 0) : min$1(index, length);
  };

  // true  -> Array#includes

  var _arrayIncludes = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = _toIobject($this);
      var length = _toLength(O.length);
      var index = _toAbsoluteIndex(fromIndex, length);
      var value; // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare

      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++]; // eslint-disable-next-line no-self-compare

        if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
      } else for (; length > index; index++) if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
      return !IS_INCLUDES && -1;
    };
  };

  var shared = _shared('keys');

  var _sharedKey = function (key) {
    return shared[key] || (shared[key] = _uid(key));
  };

  var arrayIndexOf = _arrayIncludes(false);
  var IE_PROTO = _sharedKey('IE_PROTO');

  var _objectKeysInternal = function (object, names) {
    var O = _toIobject(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key); // Don't enum bug & hidden keys


    while (names.length > i) if (_has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }

    return result;
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

  var _objectKeys = Object.keys || function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys);
  };

  var f$1 = Object.getOwnPropertySymbols;
  var _objectGops = {
    f: f$1
  };

  var f$2 = {}.propertyIsEnumerable;
  var _objectPie = {
    f: f$2
  };

  var _toObject = function (it) {
    return Object(_defined(it));
  };

  var $assign = Object.assign; // should work with symbols and should have deterministic property order (V8 bug)

  var _objectAssign = !$assign || _fails(function () {
    var A = {};
    var B = {}; // eslint-disable-next-line no-undef

    var S = Symbol();
    var K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function (k) {
      B[k] = k;
    });
    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
  }) ? function assign(target, source) {
    // eslint-disable-line no-unused-vars
    var T = _toObject(target);
    var aLen = arguments.length;
    var index = 1;
    var getSymbols = _objectGops.f;
    var isEnum = _objectPie.f;

    while (aLen > index) {
      var S = _iobject(arguments[index++]);
      var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;

      while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }

    return T;
  } : $assign;

  _export(_export.S + _export.F, 'Object', {
    assign: _objectAssign
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var timeSpan = createCommonjsModule(function (module, exports) {
    /*
    * JavaScript TimeSpan Library
    *
    * Copyright (c) 2010 Michael Stum, Charlie Robbins
    * 
    * Permission is hereby granted, free of charge, to any person obtaining
    * a copy of this software and associated documentation files (the
    * "Software"), to deal in the Software without restriction, including
    * without limitation the rights to use, copy, modify, merge, publish,
    * distribute, sublicense, and/or sell copies of the Software, and to
    * permit persons to whom the Software is furnished to do so, subject to
    * the following conditions:
    * 
    * The above copyright notice and this permission notice shall be
    * included in all copies or substantial portions of the Software.
    * 
    * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    */
    //
    // ### Time constants
    //
    var msecPerSecond = 1000,
        msecPerMinute = 60000,
        msecPerHour = 3600000,
        msecPerDay = 86400000; //
    // ### Timespan Parsers
    //

    var timeSpanWithDays = /^(\d+):(\d+):(\d+):(\d+)(\.\d+)?/,
        timeSpanNoDays = /^(\d+):(\d+):(\d+)(\.\d+)?/; //
    // ### function TimeSpan (milliseconds, seconds, minutes, hours, days)
    // #### @milliseconds {Number} Number of milliseconds for this instance.
    // #### @seconds {Number} Number of seconds for this instance.
    // #### @minutes {Number} Number of minutes for this instance.
    // #### @hours {Number} Number of hours for this instance.
    // #### @days {Number} Number of days for this instance.
    // Constructor function for the `TimeSpan` object which represents a length
    // of positive or negative milliseconds componentized into milliseconds, 
    // seconds, hours, and days.
    //

    var TimeSpan = exports.TimeSpan = function (milliseconds, seconds, minutes, hours, days) {
      this.msecs = 0;

      if (isNumeric(days)) {
        this.msecs += days * msecPerDay;
      }

      if (isNumeric(hours)) {
        this.msecs += hours * msecPerHour;
      }

      if (isNumeric(minutes)) {
        this.msecs += minutes * msecPerMinute;
      }

      if (isNumeric(seconds)) {
        this.msecs += seconds * msecPerSecond;
      }

      if (isNumeric(milliseconds)) {
        this.msecs += milliseconds;
      }
    }; //
    // ## Factory methods
    // Helper methods for creating new TimeSpan objects
    // from various criteria: milliseconds, seconds, minutes,
    // hours, days, strings and other `TimeSpan` instances.
    //
    //
    // ### function fromMilliseconds (milliseconds)
    // #### @milliseconds {Number} Amount of milliseconds for the new TimeSpan instance.
    // Creates a new `TimeSpan` instance with the specified `milliseconds`.
    //


    exports.fromMilliseconds = function (milliseconds) {
      if (!isNumeric(milliseconds)) {
        return;
      }

      return new TimeSpan(milliseconds, 0, 0, 0, 0);
    }; //
    // ### function fromSeconds (seconds)
    // #### @milliseconds {Number} Amount of seconds for the new TimeSpan instance.
    // Creates a new `TimeSpan` instance with the specified `seconds`.
    //


    exports.fromSeconds = function (seconds) {
      if (!isNumeric(seconds)) {
        return;
      }

      return new TimeSpan(0, seconds, 0, 0, 0);
    }; //
    // ### function fromMinutes (milliseconds)
    // #### @milliseconds {Number} Amount of minutes for the new TimeSpan instance.
    // Creates a new `TimeSpan` instance with the specified `minutes`.
    //


    exports.fromMinutes = function (minutes) {
      if (!isNumeric(minutes)) {
        return;
      }

      return new TimeSpan(0, 0, minutes, 0, 0);
    }; //
    // ### function fromHours (hours)
    // #### @milliseconds {Number} Amount of hours for the new TimeSpan instance.
    // Creates a new `TimeSpan` instance with the specified `hours`.
    //


    exports.fromHours = function (hours) {
      if (!isNumeric(hours)) {
        return;
      }

      return new TimeSpan(0, 0, 0, hours, 0);
    }; //
    // ### function fromDays (days)
    // #### @milliseconds {Number} Amount of days for the new TimeSpan instance.
    // Creates a new `TimeSpan` instance with the specified `days`.
    //


    exports.fromDays = function (days) {
      if (!isNumeric(days)) {
        return;
      }

      return new TimeSpan(0, 0, 0, 0, days);
    }; //
    // ### function parse (str)
    // #### @str {string} Timespan string to parse.
    // Creates a new `TimeSpan` instance from the specified
    // string, `str`.
    //


    exports.parse = function (str) {
      var match;

      function parseMilliseconds(value) {
        return value ? parseFloat('0' + value) * 1000 : 0;
      } // If we match against a full TimeSpan: 
      //   [days]:[hours]:[minutes]:[seconds].[milliseconds]?


      if (match = str.match(timeSpanWithDays)) {
        return new TimeSpan(parseMilliseconds(match[5]), match[4], match[3], match[2], match[1]);
      } // If we match against a partial TimeSpan:
      //   [hours]:[minutes]:[seconds].[milliseconds]?


      if (match = str.match(timeSpanNoDays)) {
        return new TimeSpan(parseMilliseconds(match[4]), match[3], match[2], match[1], 0);
      }

      return null;
    }; //
    // List of default singular time modifiers and associated
    // computation algoritm. Assumes in order, smallest to greatest
    // performing carry forward additiona / subtraction for each
    // Date-Time component.
    //


    var parsers = {
      'milliseconds': {
        exp: /(\d+)milli(?:second)?[s]?/i,
        compute: function (delta, computed) {
          return _compute(delta, computed, {
            current: 'milliseconds',
            next: 'seconds',
            max: 1000
          });
        }
      },
      'seconds': {
        exp: /(\d+)second[s]?/i,
        compute: function (delta, computed) {
          return _compute(delta, computed, {
            current: 'seconds',
            next: 'minutes',
            max: 60
          });
        }
      },
      'minutes': {
        exp: /(\d+)minute[s]?/i,
        compute: function (delta, computed) {
          return _compute(delta, computed, {
            current: 'minutes',
            next: 'hours',
            max: 60
          });
        }
      },
      'hours': {
        exp: /(\d+)hour[s]?/i,
        compute: function (delta, computed) {
          return _compute(delta, computed, {
            current: 'hours',
            next: 'days',
            max: 24
          });
        }
      },
      'days': {
        exp: /(\d+)day[s]?/i,
        compute: function (delta, computed) {
          var days = monthDays(computed.months, computed.years),
              sign = delta >= 0 ? 1 : -1,
              opsign = delta >= 0 ? -1 : 1,
              clean = 0;

          function update(months) {
            if (months < 0) {
              computed.years -= 1;
              return 11;
            } else if (months > 11) {
              computed.years += 1;
              return 0;
            }

            return months;
          }

          if (delta) {
            while (Math.abs(delta) >= days) {
              computed.months += sign * 1;
              computed.months = update(computed.months);
              delta += opsign * days;
              days = monthDays(computed.months, computed.years);
            }

            computed.days += opsign * delta;
          }

          if (computed.days < 0) {
            clean = -1;
          } else if (computed.days > months[computed.months]) {
            clean = 1;
          }

          if (clean === -1 || clean === 1) {
            computed.months += clean;
            computed.months = update(computed.months);
            computed.days = months[computed.months] + computed.days;
          }

          return computed;
        }
      },
      'months': {
        exp: /(\d+)month[s]?/i,
        compute: function (delta, computed) {
          var round = delta > 0 ? Math.floor : Math.ceil;

          if (delta) {
            computed.years += round.call(null, delta / 12);
            computed.months += delta % 12;
          }

          if (computed.months > 11) {
            computed.years += Math.floor((computed.months + 1) / 12);
            computed.months = (computed.months + 1) % 12 - 1;
          }

          return computed;
        }
      },
      'years': {
        exp: /(\d+)year[s]?/i,
        compute: function (delta, computed) {
          if (delta) {
            computed.years += delta;
          }

          return computed;
        }
      }
    }; //
    // Compute the list of parser names for
    // later use.
    //

    var parserNames = Object.keys(parsers); //
    // ### function parseDate (str)
    // #### @str {string} String to parse into a date
    // Parses the specified liberal Date-Time string according to
    // ISO8601 **and**:
    //
    // 1. `2010-04-03T12:34:15Z+12MINUTES`
    // 2. `NOW-4HOURS`
    //
    // Valid modifiers for the more liberal Date-Time string(s):
    //
    //     YEAR, YEARS
    //     MONTH, MONTHS
    //     DAY, DAYS
    //     HOUR, HOURS
    //     MINUTE, MINUTES
    //     SECOND, SECONDS
    //     MILLI, MILLIS, MILLISECOND, MILLISECONDS
    //

    exports.parseDate = function (str) {
      var dateTime = Date.parse(str),
          iso = '^([^Z]+)',
          zulu = 'Z([\\+|\\-])?',
          diff = {},
          computed,
          modifiers,
          sign; //
      // If Date string supplied actually conforms 
      // to UTC Time (ISO8601), return a new Date.
      //

      if (!isNaN(dateTime)) {
        return new Date(dateTime);
      } //
      // Create the `RegExp` for the end component
      // of the target `str` to parse.
      //


      parserNames.forEach(function (group) {
        zulu += '(\\d+[a-zA-Z]+)?';
      });

      if (/^NOW/i.test(str)) {
        //
        // If the target `str` is a liberal `NOW-*`,
        // then set the base `dateTime` appropriately.
        //
        dateTime = Date.now();
        zulu = zulu.replace(/Z/, 'NOW');
      } else if (/^\-/.test(str) || /^\+/.test(str)) {
        dateTime = Date.now();
        zulu = zulu.replace(/Z/, '');
      } else {
        //
        // Parse the `ISO8601` component, and the end
        // component from the target `str`.
        //
        dateTime = str.match(new RegExp(iso, 'i'));
        dateTime = Date.parse(dateTime[1]);
      } //
      // If there was no match on either part then 
      // it must be a bad value.
      //


      if (!dateTime || !(modifiers = str.match(new RegExp(zulu, 'i')))) {
        return null;
      } //
      // Create a new `Date` object from the `ISO8601`
      // component of the target `str`.
      //


      dateTime = new Date(dateTime);
      sign = modifiers[1] === '+' ? 1 : -1; //
      // Create an Object-literal for consistently accessing
      // the various components of the computed Date.
      //

      var computed = {
        milliseconds: dateTime.getMilliseconds(),
        seconds: dateTime.getSeconds(),
        minutes: dateTime.getMinutes(),
        hours: dateTime.getHours(),
        days: dateTime.getDate(),
        months: dateTime.getMonth(),
        years: dateTime.getFullYear()
      }; //
      // Parse the individual component spans (months, years, etc)
      // from the modifier strings that we parsed from the end 
      // of the target `str`.
      //

      modifiers.slice(2).filter(Boolean).forEach(function (modifier) {
        parserNames.forEach(function (name) {
          var match;

          if (!(match = modifier.match(parsers[name].exp))) {
            return;
          }

          diff[name] = sign * parseInt(match[1], 10);
        });
      }); //
      // Compute the total `diff` by iteratively computing 
      // the partial components from smallest to largest.
      //

      parserNames.forEach(function (name) {
        computed = parsers[name].compute(diff[name], computed);
      });
      return new Date(computed.years, computed.months, computed.days, computed.hours, computed.minutes, computed.seconds, computed.milliseconds);
    }; //
    // ### function fromDates (start, end, abs)
    // #### @start {Date} Start date of the `TimeSpan` instance to return
    // #### @end {Date} End date of the `TimeSpan` instance to return
    // #### @abs {boolean} Value indicating to return an absolute value
    // Returns a new `TimeSpan` instance representing the difference between
    // the `start` and `end` Dates.
    //


    exports.fromDates = function (start, end, abs) {
      if (typeof start === 'string') {
        start = exports.parseDate(start);
      }

      if (typeof end === 'string') {
        end = exports.parseDate(end);
      }

      if (!(start instanceof Date && end instanceof Date)) {
        return null;
      }

      var differenceMsecs = end.valueOf() - start.valueOf();

      if (abs) {
        differenceMsecs = Math.abs(differenceMsecs);
      }

      return new TimeSpan(differenceMsecs, 0, 0, 0, 0);
    }; //
    // ## Module Helpers
    // Module-level helpers for various utilities such as:
    // instanceOf, parsability, and cloning.
    //
    //
    // ### function test (str)
    // #### @str {string} String value to test if it is a TimeSpan
    // Returns a value indicating if the specified string, `str`,
    // is a parsable `TimeSpan` value.
    //


    exports.test = function (str) {
      return timeSpanWithDays.test(str) || timeSpanNoDays.test(str);
    }; //
    // ### function instanceOf (timeSpan)
    // #### @timeSpan {Object} Object to check TimeSpan quality.
    // Returns a value indicating if the specified `timeSpan` is
    // in fact a `TimeSpan` instance.
    //


    exports.instanceOf = function (timeSpan) {
      return timeSpan instanceof TimeSpan;
    }; //
    // ### function clone (timeSpan)
    // #### @timeSpan {TimeSpan} TimeSpan object to clone.
    // Returns a new `TimeSpan` instance with the same value
    // as the `timeSpan` object supplied.
    //


    exports.clone = function (timeSpan) {
      if (!(timeSpan instanceof TimeSpan)) {
        return;
      }

      return exports.fromMilliseconds(timeSpan.totalMilliseconds());
    }; //
    // ## Addition
    // Methods for adding `TimeSpan` instances, 
    // milliseconds, seconds, hours, and days to other
    // `TimeSpan` instances.
    //
    //
    // ### function add (timeSpan)
    // #### @timeSpan {TimeSpan} TimeSpan to add to this instance
    // Adds the specified `timeSpan` to this instance.
    //


    TimeSpan.prototype.add = function (timeSpan) {
      if (!(timeSpan instanceof TimeSpan)) {
        return;
      }

      this.msecs += timeSpan.totalMilliseconds();
    }; //
    // ### function addMilliseconds (milliseconds)
    // #### @milliseconds {Number} Number of milliseconds to add.
    // Adds the specified `milliseconds` to this instance.
    //


    TimeSpan.prototype.addMilliseconds = function (milliseconds) {
      if (!isNumeric(milliseconds)) {
        return;
      }

      this.msecs += milliseconds;
    }; //
    // ### function addSeconds (seconds)
    // #### @seconds {Number} Number of seconds to add.
    // Adds the specified `seconds` to this instance.
    //


    TimeSpan.prototype.addSeconds = function (seconds) {
      if (!isNumeric(seconds)) {
        return;
      }

      this.msecs += seconds * msecPerSecond;
    }; //
    // ### function addMinutes (minutes)
    // #### @minutes {Number} Number of minutes to add.
    // Adds the specified `minutes` to this instance.
    //


    TimeSpan.prototype.addMinutes = function (minutes) {
      if (!isNumeric(minutes)) {
        return;
      }

      this.msecs += minutes * msecPerMinute;
    }; //
    // ### function addHours (hours)
    // #### @hours {Number} Number of hours to add.
    // Adds the specified `hours` to this instance.
    //


    TimeSpan.prototype.addHours = function (hours) {
      if (!isNumeric(hours)) {
        return;
      }

      this.msecs += hours * msecPerHour;
    }; //
    // ### function addDays (days)
    // #### @days {Number} Number of days to add.
    // Adds the specified `days` to this instance.
    //


    TimeSpan.prototype.addDays = function (days) {
      if (!isNumeric(days)) {
        return;
      }

      this.msecs += days * msecPerDay;
    }; //
    // ## Subtraction
    // Methods for subtracting `TimeSpan` instances, 
    // milliseconds, seconds, hours, and days from other
    // `TimeSpan` instances.
    //
    //
    // ### function subtract (timeSpan)
    // #### @timeSpan {TimeSpan} TimeSpan to subtract from this instance.
    // Subtracts the specified `timeSpan` from this instance.
    //


    TimeSpan.prototype.subtract = function (timeSpan) {
      if (!(timeSpan instanceof TimeSpan)) {
        return;
      }

      this.msecs -= timeSpan.totalMilliseconds();
    }; //
    // ### function subtractMilliseconds (milliseconds)
    // #### @milliseconds {Number} Number of milliseconds to subtract.
    // Subtracts the specified `milliseconds` from this instance.
    //


    TimeSpan.prototype.subtractMilliseconds = function (milliseconds) {
      if (!isNumeric(milliseconds)) {
        return;
      }

      this.msecs -= milliseconds;
    }; //
    // ### function subtractSeconds (seconds)
    // #### @seconds {Number} Number of seconds to subtract.
    // Subtracts the specified `seconds` from this instance.
    //


    TimeSpan.prototype.subtractSeconds = function (seconds) {
      if (!isNumeric(seconds)) {
        return;
      }

      this.msecs -= seconds * msecPerSecond;
    }; //
    // ### function subtractMinutes (minutes)
    // #### @minutes {Number} Number of minutes to subtract.
    // Subtracts the specified `minutes` from this instance.
    //


    TimeSpan.prototype.subtractMinutes = function (minutes) {
      if (!isNumeric(minutes)) {
        return;
      }

      this.msecs -= minutes * msecPerMinute;
    }; //
    // ### function subtractHours (hours)
    // #### @hours {Number} Number of hours to subtract.
    // Subtracts the specified `hours` from this instance.
    //


    TimeSpan.prototype.subtractHours = function (hours) {
      if (!isNumeric(hours)) {
        return;
      }

      this.msecs -= hours * msecPerHour;
    }; //
    // ### function subtractDays (days)
    // #### @days {Number} Number of days to subtract.
    // Subtracts the specified `days` from this instance.
    //


    TimeSpan.prototype.subtractDays = function (days) {
      if (!isNumeric(days)) {
        return;
      }

      this.msecs -= days * msecPerDay;
    }; //
    // ## Getters
    // Methods for retrieving components of a `TimeSpan`
    // instance: milliseconds, seconds, minutes, hours, and days.
    //
    //
    // ### function totalMilliseconds (roundDown)
    // #### @roundDown {boolean} Value indicating if the value should be rounded down.
    // Returns the total number of milliseconds for this instance, rounding down
    // to the nearest integer if `roundDown` is set.
    //


    TimeSpan.prototype.totalMilliseconds = function (roundDown) {
      var result = this.msecs;

      if (roundDown === true) {
        result = Math.floor(result);
      }

      return result;
    }; //
    // ### function totalSeconds (roundDown)
    // #### @roundDown {boolean} Value indicating if the value should be rounded down.
    // Returns the total number of seconds for this instance, rounding down
    // to the nearest integer if `roundDown` is set.
    //


    TimeSpan.prototype.totalSeconds = function (roundDown) {
      var result = this.msecs / msecPerSecond;

      if (roundDown === true) {
        result = Math.floor(result);
      }

      return result;
    }; //
    // ### function totalMinutes (roundDown)
    // #### @roundDown {boolean} Value indicating if the value should be rounded down.
    // Returns the total number of minutes for this instance, rounding down
    // to the nearest integer if `roundDown` is set.
    //


    TimeSpan.prototype.totalMinutes = function (roundDown) {
      var result = this.msecs / msecPerMinute;

      if (roundDown === true) {
        result = Math.floor(result);
      }

      return result;
    }; //
    // ### function totalHours (roundDown)
    // #### @roundDown {boolean} Value indicating if the value should be rounded down.
    // Returns the total number of hours for this instance, rounding down
    // to the nearest integer if `roundDown` is set.
    //


    TimeSpan.prototype.totalHours = function (roundDown) {
      var result = this.msecs / msecPerHour;

      if (roundDown === true) {
        result = Math.floor(result);
      }

      return result;
    }; //
    // ### function totalDays (roundDown)
    // #### @roundDown {boolean} Value indicating if the value should be rounded down.
    // Returns the total number of days for this instance, rounding down
    // to the nearest integer if `roundDown` is set.
    //


    TimeSpan.prototype.totalDays = function (roundDown) {
      var result = this.msecs / msecPerDay;

      if (roundDown === true) {
        result = Math.floor(result);
      }

      return result;
    }; //
    // ### @milliseconds
    // Returns the length of this `TimeSpan` instance in milliseconds.
    //


    TimeSpan.prototype.__defineGetter__('milliseconds', function () {
      return this.msecs % 1000;
    }); //
    // ### @seconds
    // Returns the length of this `TimeSpan` instance in seconds.
    //


    TimeSpan.prototype.__defineGetter__('seconds', function () {
      return Math.floor(this.msecs / msecPerSecond) % 60;
    }); //
    // ### @minutes
    // Returns the length of this `TimeSpan` instance in minutes.
    //


    TimeSpan.prototype.__defineGetter__('minutes', function () {
      return Math.floor(this.msecs / msecPerMinute) % 60;
    }); //
    // ### @hours
    // Returns the length of this `TimeSpan` instance in hours.
    //


    TimeSpan.prototype.__defineGetter__('hours', function () {
      return Math.floor(this.msecs / msecPerHour) % 24;
    }); //
    // ### @days
    // Returns the length of this `TimeSpan` instance in days.
    //


    TimeSpan.prototype.__defineGetter__('days', function () {
      return Math.floor(this.msecs / msecPerDay);
    }); //
    // ## Instance Helpers
    // Various help methods for performing utilities
    // such as equality and serialization
    //
    //
    // ### function equals (timeSpan)
    // #### @timeSpan {TimeSpan} TimeSpan instance to assert equal
    // Returns a value indicating if the specified `timeSpan` is equal
    // in milliseconds to this instance.
    //


    TimeSpan.prototype.equals = function (timeSpan) {
      if (!(timeSpan instanceof TimeSpan)) {
        return;
      }

      return this.msecs === timeSpan.totalMilliseconds();
    }; //
    // ### function toString () 
    // Returns a string representation of this `TimeSpan`
    // instance according to current `format`.
    //


    TimeSpan.prototype.toString = function () {
      if (!this.format) {
        return this._format();
      }

      return this.format(this);
    }; //
    // ### @private function _format () 
    // Returns the default string representation of this instance.
    //


    TimeSpan.prototype._format = function () {
      return [this.days, this.hours, this.minutes, this.seconds + '.' + this.milliseconds].join(':');
    }; //
    // ### @private function isNumeric (input) 
    // #### @input {Number} Value to check numeric quality of.
    // Returns a value indicating the numeric quality of the 
    // specified `input`.
    //


    function isNumeric(input) {
      return input && !isNaN(parseFloat(input)) && isFinite(input);
    }
    // ### @private function _compute (delta, date, computed, options)
    // #### @delta {Number} Channge in this component of the date
    // #### @computed {Object} Currently computed date.
    // #### @options {Object} Options for the computation
    // Performs carry forward addition or subtraction for the
    // `options.current` component of the `computed` date, carrying 
    // it forward to `options.next` depending on the maximum value,
    // `options.max`.
    //

    function _compute(delta, computed, options) {
      var current = options.current,
          next = options.next,
          max = options.max,
          round = delta > 0 ? Math.floor : Math.ceil;

      if (delta) {
        computed[next] += round.call(null, delta / max);
        computed[current] += delta % max;
      }

      if (Math.abs(computed[current]) >= max) {
        computed[next] += round.call(null, computed[current] / max);
        computed[current] = computed[current] % max;
      }

      return computed;
    } //
    // ### @private monthDays (month, year)
    // #### @month {Number} Month to get days for.
    // #### @year {Number} Year of the month to get days for.
    // Returns the number of days in the specified `month` observing
    // leap years.
    //


    var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function monthDays(month, year) {
      if ((year % 100 !== 0 && year % 4 === 0 || year % 400 === 0) && month === 1) {
        return 29;
      }

      return months[month];
    }
  });
  var timeSpan_1 = timeSpan.TimeSpan;
  var timeSpan_2 = timeSpan.fromMilliseconds;
  var timeSpan_3 = timeSpan.fromSeconds;
  var timeSpan_4 = timeSpan.fromMinutes;
  var timeSpan_5 = timeSpan.fromHours;
  var timeSpan_6 = timeSpan.fromDays;
  var timeSpan_7 = timeSpan.parse;
  var timeSpan_8 = timeSpan.parseDate;
  var timeSpan_9 = timeSpan.fromDates;
  var timeSpan_10 = timeSpan.test;
  var timeSpan_11 = timeSpan.instanceOf;
  var timeSpan_12 = timeSpan.clone;

  /**
   * Configuration
   */
  var config = {
    borderColor: '#000',
    backgroundColor: '#fff'
  };

  /**
   * Timeline Chart.
   *
   * (C) Sawada Makoto | MIT License
   */

  var TimelineChart =
  /*#__PURE__*/
  function () {
    function TimelineChart(element, config$$1) {
      var _this = this;

      _classCallCheck(this, TimelineChart);

      this.element = element;
      this.canvas = element.getContext('2d');
      this.config = Object.assign(config, config$$1);
      this.data = config$$1.data.map(function (unit) {
        var startTime = _this.parseTimeSpanString(unit.startTime);

        var endTime = _this.parseTimeSpanString(unit.endTime);

        return {
          offset: startTime.totalMinutes(),
          minutes: endTime.totalMinutes() - startTime.totalMinutes(),
          color: unit.color
        };
      });
    }
    /**
     * Draw.
     */


    _createClass(TimelineChart, [{
      key: "draw",
      value: function draw() {
        // Draw Border.
        this.canvas.strokeStyle = this.config.borderColor;
        this.canvas.strokeRect(0, 0, this.element.width, this.element.height); // Draw Background Color

        this.canvas.fillStyle = this.config.backgroundColor;
        this.canvas.fillRect(1, 1, this.element.width - 2, this.element.height - 2); // Draw.

        var width = this.element.width - 2;
        var height = this.element.height - 2;
        var oneMinutesWidth = width / (24 * 60);

        for (var i = 0; i < this.data.length; i++) {
          var unit = this.data[i];
          this.canvas.fillStyle = unit.color ? unit.color : '#fff';
          this.canvas.fillRect(unit.offset * oneMinutesWidth + 1, 1, unit.minutes * oneMinutesWidth, height);
        }
      }
      /**
       * Parse Time String.
       * @param {string} time string ex) "00:00"
       * @returns {TimeSpan} timespan
       */

    }, {
      key: "parseTimeSpanString",
      value: function parseTimeSpanString(timeStr) {
        var time = timeStr.split(':');
        var timeSpan$$1 = new timeSpan_1();
        timeSpan$$1.addHours(parseInt(time[0]));
        timeSpan$$1.addMinutes(parseInt(time[1]));
        return timeSpan$$1;
      }
    }]);

    return TimelineChart;
  }();

  return TimelineChart;

})));
