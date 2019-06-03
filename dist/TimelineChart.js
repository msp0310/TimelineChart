function _assertThisInitialized (self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass (Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose (subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _instanceof (left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof (obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof (obj) { return typeof obj; }; } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Timeline.js v0.1.4
 *
 * (c) 2019 Sawada Makoto.
 * Released under the MIT License
 */
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.TimelineChart = factory();
})(this, function () {
  'use strict';
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   */

  var VOID0 = void 0,
    _BOOLEAN = _typeof(true),
    _NUMBER = _typeof(0),
    _STRING = _typeof(""),
    _SYMBOL = "symbol",
    _OBJECT = _typeof({}),
    _UNDEFINED = _typeof(VOID0),
    _FUNCTION = _typeof(function () { }),
    LENGTH = "length"; // Only used for primitives.


  var typeInfoRegistry = {};
  /**
   * Exposes easy access to type information including inquiring about members.
   */

  var TypeInfo =
    /*#__PURE__*/
    function () {
      function TypeInfo (target, onBeforeFreeze) {
        this.isBoolean = false;
        this.isNumber = false;
        this.isFinite = false;
        this.isValidNumber = false;
        this.isString = false;
        this.isTrueNaN = false;
        this.isObject = false;
        this.isFunction = false;
        this.isUndefined = false;
        this.isNull = false;
        this.isPrimitive = false;
        this.isSymbol = false;
        this.isArray = false;
        this.isNullOrUndefined = false;

        switch (this.type = _typeof(target)) {
          case _BOOLEAN:
            this.isBoolean = true;
            this.isPrimitive = true;
            break;

          case _NUMBER:
            this.isNumber = true;
            this.isTrueNaN = isNaN(target);
            this.isFinite = isFinite(target);
            this.isValidNumber = !this.isTrueNaN;
            this.isPrimitive = true;
            break;

          case _STRING:
            this.isString = true;
            this.isPrimitive = true;
            break;

          case _SYMBOL:
            this.isSymbol = true;
            break;

          case _OBJECT:
            this.target = target;

            if (target === null) {
              this.isNull = true;
              this.isNullOrUndefined = true;
              this.isPrimitive = true;
            } else {
              this.isArray = _instanceof(target, Array);
              this.isObject = true;
            }

            break;

          case _FUNCTION:
            this.target = target;
            this.isFunction = true;
            break;

          case _UNDEFINED:
            this.isUndefined = true;
            this.isNullOrUndefined = true;
            this.isPrimitive = true;
            break;

          default:
            throw "Fatal type failure.  Unknown type: " + this.type;
        }

        if (onBeforeFreeze) onBeforeFreeze(this);
        Object.freeze(this);
      }
      /**
       * Returns a TypeInfo for any member or non-member,
       * where non-members are of type undefined.
       * @param name
       * @returns {TypeInfo}
       */


      var _proto = TypeInfo.prototype;

      _proto.member = function member (name) {
        var t = this.target;
        return TypeInfo.getFor(t && name in t ? t[name] : VOID0);
      }
        /**
         * Returns a TypeInfo for any target object.
         * If the target object is of a primitive type, it returns the TypeInfo instance assigned to that type.
         * @param target
         * @returns {TypeInfo}
         */
        ;

      TypeInfo.getFor = function getFor (target) {
        var type = _typeof(target);

        switch (type) {
          case _OBJECT:
          case _FUNCTION:
            return new TypeInfo(target);
        }

        var info = typeInfoRegistry[type];
        if (!info) typeInfoRegistry[type] = info = new TypeInfo(target);
        return info;
      }
        /**
         * Returns true if the target matches the type (instanceof).
         * @param type
         * @returns {boolean}
         */
        ;

      _proto.is = function is (type) {
        return _instanceof(this.target, type);
      }
        /**
         * Returns null if the target does not match the type (instanceof).
         * Otherwise returns the target as the type.
         * @param type
         * @returns {T|null}
         */
        ;

      _proto.as = function as (type) {
        return _instanceof(this.target, type) ? this.target : null;
      };

      return TypeInfo;
    }();

  function Type (target) {
    return new TypeInfo(target);
  }

  (function (Type) {
    /**
     * typeof true
     * @type {string}
     */
    Type.BOOLEAN = _BOOLEAN;
    /**
     * typeof 0
     * @type {string}
     */

    Type.NUMBER = _NUMBER;
    /**
     * typeof ""
     * @type {string}
     */

    Type.STRING = _STRING;
    /**
     * typeof {}
     * @type {string}
     */

    Type.OBJECT = _OBJECT;
    /**
     * typeof Symbol
     * @type {string}
     */

    Type.SYMBOL = _SYMBOL;
    /**
     * typeof undefined
     * @type {string}
     */

    Type.UNDEFINED = _UNDEFINED;
    /**
     * typeof function
     * @type {string}
     */

    Type.FUNCTION = _FUNCTION;
    /**
     * Returns true if the target matches the type (instanceof).
     * @param target
     * @param type
     * @returns {T|null}
     */

    function is (target, type) {
      return _instanceof(target, type);
    }

    Type.is = is;
    /**
     * Returns null if the target does not match the type (instanceof).
     * Otherwise returns the target as the type.
     * @param target
     * @param type
     * @returns {T|null}
     */

    function as (target, type) {
      return _instanceof(target, type) ? target : null;
    }

    Type.as = as;
    /**
     * Returns true if the value parameter is null or undefined.
     * @param value
     * @returns {boolean}
     */

    function isNullOrUndefined (value) {
      return value == null;
    }

    Type.isNullOrUndefined = isNullOrUndefined;
    /**
     * Returns true if the value parameter is a boolean.
     * @param value
     * @returns {boolean}
     */

    function isBoolean (value) {
      return _typeof(value) === _BOOLEAN;
    }

    Type.isBoolean = isBoolean;
    /**
     * Returns true if the value parameter is a number.
     * @param value
     * @param ignoreNaN Default is false. When true, NaN is not considered a number and will return false.
     * @returns {boolean}
     */

    function isNumber (value, ignoreNaN) {
      if (ignoreNaN === void 0) {
        ignoreNaN = false;
      }

      return _typeof(value) === _NUMBER && (!ignoreNaN || !isNaN(value));
    }

    Type.isNumber = isNumber;
    /**
     * Returns true if is a number and is NaN.
     * @param value
     * @returns {boolean}
     */

    function isTrueNaN (value) {
      return _typeof(value) === _NUMBER && isNaN(value);
    }

    Type.isTrueNaN = isTrueNaN;
    /**
     * Returns true if the value parameter is a string.
     * @param value
     * @returns {boolean}
     */

    function isString (value) {
      return _typeof(value) === _STRING;
    }

    Type.isString = isString;
    /**
     * Returns true if the value is a boolean, string, number, null, or undefined.
     * @param value
     * @param allowUndefined if set to true will return true if the value is undefined.
     * @returns {boolean}
     */

    function isPrimitive (value, allowUndefined) {
      if (allowUndefined === void 0) {
        allowUndefined = false;
      }

      var t = _typeof(value);

      switch (t) {
        case _BOOLEAN:
        case _STRING:
        case _NUMBER:
          return true;

        case _UNDEFINED:
          return allowUndefined;

        case _OBJECT:
          return value === null;
      }

      return false;
    }

    Type.isPrimitive = isPrimitive;
    /**
     * For detecting if the value can be used as a key.
     * @param value
     * @param allowUndefined
     * @returns {boolean|boolean}
     */

    function isPrimitiveOrSymbol (value, allowUndefined) {
      if (allowUndefined === void 0) {
        allowUndefined = false;
      }

      return _typeof(value) === _SYMBOL ? true : isPrimitive(value, allowUndefined);
    }

    Type.isPrimitiveOrSymbol = isPrimitiveOrSymbol;
    /**
     * Returns true if the value is a string, number, or symbol.
     * @param value
     * @returns {boolean}
     */

    function isPropertyKey (value) {
      var t = _typeof(value);

      switch (t) {
        case _STRING:
        case _NUMBER:
        case _SYMBOL:
          return true;
      }

      return false;
    }

    Type.isPropertyKey = isPropertyKey;
    /**
     * Returns true if the value parameter is a function.
     * @param value
     * @returns {boolean}
     */

    function isFunction (value) {
      return _typeof(value) === _FUNCTION;
    }

    Type.isFunction = isFunction;
    /**
     * Returns true if the value parameter is an object.
     * @param value
     * @param allowNull If false (default) null is not considered an object.
     * @returns {boolean}
     */

    function isObject (value, allowNull) {
      if (allowNull === void 0) {
        allowNull = false;
      }

      return _typeof(value) === _OBJECT && (allowNull || value !== null);
    }

    Type.isObject = isObject;
    /**
     * Guarantees a number value or NaN instead.
     * @param value
     * @returns {number}
     */

    function numberOrNaN (value) {
      return isNaN(value) ? NaN : value;
    }

    Type.numberOrNaN = numberOrNaN;
    /**
     * Returns a TypeInfo object for the target.
     * @param target
     * @returns {TypeInfo}
     */

    function of (target) {
      return TypeInfo.getFor(target);
    }

    Type.of = of;
    /**
     * Will detect if a member exists (using 'in').
     * Returns true if a property or method exists on the object or its prototype.
     * @param instance
     * @param property Name of the member.
     * @param ignoreUndefined When ignoreUndefined is true, if the member exists but is undefined, it will return false.
     * @returns {boolean}
     */

    function hasMember (instance, property, ignoreUndefined) {
      if (ignoreUndefined === void 0) {
        ignoreUndefined = true;
      }

      return instance && !isPrimitive(instance) && property in instance && (ignoreUndefined || instance[property] !== VOID0);
    }

    Type.hasMember = hasMember;
    /**
     * Returns true if the member matches the type.
     * @param instance
     * @param property
     * @param type
     * @returns {boolean}
     */

    function hasMemberOfType (instance, property, type) {
      return hasMember(instance, property) && _typeof(instance[property]) === type;
    }

    Type.hasMemberOfType = hasMemberOfType;

    function hasMethod (instance, property) {
      return hasMemberOfType(instance, property, _FUNCTION);
    }

    Type.hasMethod = hasMethod;

    function isArrayLike (instance) {
      /*
       * NOTE:
       *
       * Functions:
       * Enumerating a function although it has a .length property will yield nothing or unexpected results.
       * Effectively, a function is not like an array.
       *
       * Strings:
       * Behave like arrays but don't have the same exact methods.
       */
      return _instanceof(instance, Array) || Type.isString(instance) || !Type.isFunction(instance) && hasMember(instance, LENGTH);
    }

    Type.isArrayLike = isArrayLike;
  })(Type || (Type = {}));

  Object.freeze(Type);
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Originally based upon .NET source but with many additions and improvements.
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   */

  var TimeUnit;

  (function (TimeUnit) {
    TimeUnit[TimeUnit["Ticks"] = 0] = "Ticks";
    TimeUnit[TimeUnit["Milliseconds"] = 1] = "Milliseconds";
    TimeUnit[TimeUnit["Seconds"] = 2] = "Seconds";
    TimeUnit[TimeUnit["Minutes"] = 3] = "Minutes";
    TimeUnit[TimeUnit["Hours"] = 4] = "Hours";
    TimeUnit[TimeUnit["Days"] = 5] = "Days";
  })(TimeUnit || (TimeUnit = {})); // Earth Days


  (function (TimeUnit) {
    function toMilliseconds (value, units) {
      if (units === void 0) {
        units = TimeUnit.Milliseconds;
      }

      // noinspection FallThroughInSwitchStatementJS
      switch (units) {
        case TimeUnit.Days:
          value *= 24
            /* Day */
            ;

        case TimeUnit.Hours:
          value *= 60
            /* Hour */
            ;

        case TimeUnit.Minutes:
          value *= 60
            /* Minute */
            ;

        case TimeUnit.Seconds:
          value *= 1000
            /* Second */
            ;

        case TimeUnit.Milliseconds:
          return value;

        case TimeUnit.Ticks:
          return value / 10000
            /* Millisecond */
            ;

        default:
          throw new Error("Invalid TimeUnit.");
      }
    }

    TimeUnit.toMilliseconds = toMilliseconds;

    function fromMilliseconds (ms, units) {
      switch (units) {
        case TimeUnit.Days:
          return ms / 86400000
            /* Day */
            ;

        case TimeUnit.Hours:
          return ms / 3600000
            /* Hour */
            ;

        case TimeUnit.Minutes:
          return ms / 60000
            /* Minute */
            ;

        case TimeUnit.Seconds:
          return ms / 1000
            /* Second */
            ;

        case TimeUnit.Milliseconds:
          return ms;

        case TimeUnit.Ticks:
          return ms * 10000
            /* Millisecond */
            ;

        default:
          throw new Error("Invalid TimeUnit.");
      }
    }

    TimeUnit.fromMilliseconds = fromMilliseconds;

    function from (quantity, unit) {
      return quantity && fromMilliseconds(quantity.getTotalMilliseconds(), unit);
    }

    TimeUnit.from = from;

    function assertValid (unit) {
      if (isNaN(unit) || unit > TimeUnit.Days || unit < TimeUnit.Ticks || Math.floor(unit) !== unit) throw new Error("Invalid TimeUnit.");
      return true;
    }

    TimeUnit.assertValid = assertValid;
  })(TimeUnit || (TimeUnit = {}));

  Object.freeze(TimeUnit);
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   */

  var isTrueNaN = Type.isTrueNaN;
  var VOID0$1 = void 0;
  /**
   * Used for special comparison including NaN.
   * @param a
   * @param b
   * @param strict
   * @returns {boolean|any}
   */

  function areEqual (a, b, strict) {
    if (strict === void 0) {
      strict = true;
    }

    return a === b || !strict && a == b || isTrueNaN(a) && isTrueNaN(b);
  }

  var COMPARE_TO = "compareTo";

  function compare (a, b, strict) {
    if (strict === void 0) {
      strict = true;
    }

    if (areEqual(a, b, strict)) return 0
      /* Equal */
      ;
    if (a && Type.hasMember(a, COMPARE_TO)) return a.compareTo(b); // If a has compareTo, use it.
    else if (b && Type.hasMember(b, COMPARE_TO)) return -b.compareTo(a); // a doesn't have compareTo? check if b does and invert.
    // Allow for special inequality..

    if (a > b || strict && (a === 0 && b == 0 || a === null && b === VOID0$1)) return 1
      /* Greater */
      ;
    if (b > a || strict && (b === 0 && a == 0 || b === null && a === VOID0$1)) return -1
      /* Less */
      ;
    return NaN;
  }
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
   */


  var NAME = 'Exception';
  /**
   * Represents errors that occur during application execution.
   */

  var Exception =
    /*#__PURE__*/
    function () {
      /**
       * Initializes a new instance of the Exception class with a specified error message and optionally a reference to the inner exception that is the cause of this exception.
       * @param message
       * @param innerException
       * @param beforeSealing This delegate is used to allow actions to occur just before this constructor finishes.  Since some compilers do not allow the use of 'this' before super.
       */
      function Exception (message, innerException, beforeSealing) {
        this.message = message;
        this.name = this.getName();
        this.data = {};
        if (innerException) this.data['innerException'] = innerException;
        /* Originally intended to use 'get' accessors for properties,
         * But debuggers don't display these readily yet.
         * Object.freeze has to be used carefully, but will prevent overriding values at runtime.
         */

        if (beforeSealing) beforeSealing(this); // Node has a .stack, let's use it...

        try {
          var stack = eval("new Error()").stack;
          stack = stack && stack.replace(/^Error\n/, '').replace(/(.|\n)+\s+at new.+/, '') || '';
          this.stack = this.toStringWithoutBrackets() + stack;
        } catch (ex) {
          this.stack = "";
        }

        Object.freeze(this);
      }
      /**
       * A string representation of the error type.
       * The default is 'Error'.
       */


      var _proto2 = Exception.prototype;

      _proto2.getName = function getName () {
        return NAME;
      }
        /**
         * The string representation of the Exception instance.
         */
        ;

      _proto2.toString = function toString () {
        return "[" + this.toStringWithoutBrackets() + "]";
      };

      _proto2.toStringWithoutBrackets = function toStringWithoutBrackets () {
        var _ = this;

        var m = _.message;
        return _.name + (m ? ': ' + m : '');
      }
        /**
         * Clears the data object.
         */
        ;

      _proto2.dispose = function dispose () {
        var data = this.data;

        for (var k in data) {
          if (data.hasOwnProperty(k)) delete data[k];
        }
      };

      return Exception;
    }();
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   * Based upon: https://msdn.microsoft.com/en-us/library/system.systemexception%28v=vs.110%29.aspx
   */


  var NAME$1 = 'SystemException';

  var SystemException =
    /*#__PURE__*/
    function (_Exception) {
      _inheritsLoose(SystemException, _Exception);

      function SystemException () {
        return _Exception.apply(this, arguments) || this;
      }

      var _proto3 = SystemException.prototype;

      /*
          constructor(
              message:string = null,
              innerException:Error = null,
              beforeSealing?:(ex:any)=>void)
          {
              super(message, innerException, beforeSealing);
          }
      */
      _proto3.getName = function getName () {
        return NAME$1;
      };

      return SystemException;
    }(Exception);
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
   */


  var NAME$2 = 'InvalidOperationException';

  var InvalidOperationException =
    /*#__PURE__*/
    function (_SystemException) {
      _inheritsLoose(InvalidOperationException, _SystemException);

      function InvalidOperationException () {
        return _SystemException.apply(this, arguments) || this;
      }

      var _proto4 = InvalidOperationException.prototype;

      _proto4.getName = function getName () {
        return NAME$2;
      };

      return InvalidOperationException;
    }(SystemException);
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
   */


  var NAME$3 = 'ObjectDisposedException';

  var ObjectDisposedException =
    /*#__PURE__*/
    function (_InvalidOperationExce) {
      _inheritsLoose(ObjectDisposedException, _InvalidOperationExce);

      // For simplicity and consistency, lets stick with 1 signature.
      function ObjectDisposedException (objectName, message, innerException) {
        return _InvalidOperationExce.call(this, message || '', innerException, function (_) {
          _.objectName = objectName;
        }) || this;
      }

      var _proto5 = ObjectDisposedException.prototype;

      _proto5.getName = function getName () {
        return NAME$3;
      };

      _proto5.toString = function toString () {
        var _ = this;

        var oName = _.objectName;
        oName = oName ? '{' + oName + '} ' : '';
        return '[' + _.name + ': ' + oName + _.message + ']';
      };

      ObjectDisposedException.throwIfDisposed = function throwIfDisposed (disposable, objectName, message) {
        if (disposable.wasDisposed) throw new ObjectDisposedException(objectName, message);
        return true;
      };

      return ObjectDisposedException;
    }(InvalidOperationException);
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   */


  var DisposableBase =
    /*#__PURE__*/
    function () {
      function DisposableBase (_disposableObjectName, __finalizer) {
        this._disposableObjectName = _disposableObjectName;
        this.__finalizer = __finalizer;
        this.__wasDisposed = false;
      }

      var _proto6 = DisposableBase.prototype;

      _proto6.throwIfDisposed = function throwIfDisposed (message, objectName) {
        if (objectName === void 0) {
          objectName = this._disposableObjectName;
        }

        if (this.__wasDisposed) throw new ObjectDisposedException(objectName, message);
        return true;
      };

      _proto6.dispose = function dispose () {
        var _ = this;

        if (!_.__wasDisposed) {
          // Preemptively set wasDisposed in order to prevent repeated disposing.
          // NOTE: in true multi-threaded scenarios, this needs to be synchronized.
          _.__wasDisposed = true;

          try {
            _._onDispose(); // Protected override.

          } finally {
            if (_.__finalizer) // Private finalizer...
            {
              _.__finalizer();

              _.__finalizer = void 0;
            }
          }
        }
      } // Placeholder for overrides.
        ;

      _proto6._onDispose = function _onDispose () { };

      _createClass(DisposableBase, [{
        key: "wasDisposed",
        get: function get () {
          return this.__wasDisposed;
        }
      }]);

      return DisposableBase;
    }();
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   */


  var EMPTY = '';
  /**
   * Escapes a RegExp sequence.
   * @param source
   * @returns {string}
   */

  function escapeRegExp (source) {
    return source.replace(/[-[\]\/{}()*+?.\\^$|]/g, "\\$&");
  }
  /**
   * Can trim any character or set of characters from the ends of a string.
   * Uses a Regex escapement to replace them with empty.
   * @param source
   * @param chars A string or array of characters desired to be trimmed.
   * @param ignoreCase
   * @returns {string}
   */


  function trim (source, chars, ignoreCase) {
    if (chars === EMPTY) return source;

    if (chars) {
      var escaped = escapeRegExp(_instanceof(chars, Array) ? chars.join() : chars);
      return source.replace(new RegExp('^[' + escaped + ']+|[' + escaped + ']+$', 'g' + (ignoreCase ? 'i' : '')), EMPTY);
    }

    return source.replace(/^\s+|\s+$/g, EMPTY);
  }
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
   */


  var NAME$4 = 'ArgumentException';

  var ArgumentException =
    /*#__PURE__*/
    function (_SystemException2) {
      _inheritsLoose(ArgumentException, _SystemException2);

      // For simplicity and consistency, lets stick with 1 signature.
      function ArgumentException (paramName, message, innerException, beforeSealing) {
        var pn = paramName ? '{' + paramName + '} ' : '';
        return _SystemException2.call(this, trim(pn + (message || '')), innerException, function (_) {
          _.paramName = paramName;
          if (beforeSealing) beforeSealing(_);
        }) || this;
      }

      var _proto7 = ArgumentException.prototype;

      _proto7.getName = function getName () {
        return NAME$4;
      };

      return ArgumentException;
    }(SystemException);
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
   */


  var NAME$5 = 'ArgumentNullException';

  var ArgumentNullException =
    /*#__PURE__*/
    function (_ArgumentException) {
      _inheritsLoose(ArgumentNullException, _ArgumentException);

      function ArgumentNullException (paramName, message, innerException) {
        if (message === void 0) {
          message = "'" + paramName + "' is null (or undefined).";
        }

        return _ArgumentException.call(this, paramName, message, innerException) || this;
      }

      var _proto8 = ArgumentNullException.prototype;

      _proto8.getName = function getName () {
        return NAME$5;
      };

      return ArgumentNullException;
    }(ArgumentException);
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   */


  var NULL = null;
  var NAME$6 = "ResolverBase";
  /**
   * The ResolverBase class handles resolving a factory method and detects recursion.
   * Since JS does not have a synchronization mechanism (lock or otherwise)
   * we have to prevent getValue from double triggering the value factory (optimistic concurrency)
   * or returning return a value that is intermediate between resolving and resolved.
   */

  var ResolverBase =
    /*#__PURE__*/
    function (_DisposableBase) {
      _inheritsLoose(ResolverBase, _DisposableBase);

      function ResolverBase (_valueFactory, _trapExceptions, _allowReset) {
        var _this2;

        if (_allowReset === void 0) {
          _allowReset = false;
        }

        _this2 = _DisposableBase.call(this, NAME$6) || this;
        _this2._valueFactory = _valueFactory;
        _this2._trapExceptions = _trapExceptions;
        _this2._allowReset = _allowReset;
        if (!_valueFactory) throw new ArgumentNullException("valueFactory");
        _this2._isValueCreated = false;
        return _this2;
      }

      var _proto9 = ResolverBase.prototype;

      _proto9.getError = function getError () {
        return this._error;
      };

      _proto9.getValue = function getValue () {
        var _ = this;

        _.throwIfDisposed();

        if (_._isValueCreated === null) throw new Error("Recursion detected.");

        if (!_._isValueCreated && _._valueFactory) {
          _._isValueCreated = null; // Mark this as 'resolving'.

          try {
            var c;

            if (!_._isValueCreated && (c = _._valueFactory)) {
              _._isValueCreated = null; // Mark this as 'resolving'.

              if (!this._allowReset) this._valueFactory = NULL;
              var v = c();
              _._value = v;
              _._error = void 0;
              return v;
            }
          } catch (ex) {
            _._error = ex;
            if (!_._trapExceptions) throw ex;
          } finally {
            _._isValueCreated = true;
          }
        }

        return _._value;
      };

      _proto9._onDispose = function _onDispose () {
        this._valueFactory = NULL;
        this._value = NULL;
        this._isValueCreated = NULL;
      };

      _proto9.tryReset = function tryReset () {
        var _ = this;

        if (!_._valueFactory) return false; else {
          _._isValueCreated = false;
          _._value = NULL;
          _._error = void 0;
          return true;
        }
      };

      _createClass(ResolverBase, [{
        key: "error",
        get: function get () {
          return this.getError();
        }
      }, {
        key: "canReset",
        get: function get () {
          return this._allowReset && !!this._valueFactory;
        }
      }]);

      return ResolverBase;
    }(DisposableBase);
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   */
  // We need a non-resettable lazy to ensure it can be passed safely around.


  var Lazy =
    /*#__PURE__*/
    function (_ResolverBase) {
      _inheritsLoose(Lazy, _ResolverBase);

      function Lazy (valueFactory, trapExceptions, allowReset) {
        var _this3;

        if (trapExceptions === void 0) {
          trapExceptions = false;
        }

        if (allowReset === void 0) {
          allowReset = false;
        }

        _this3 = _ResolverBase.call(this, valueFactory, trapExceptions, allowReset) || this; // @ts-ignore // Force this override.

        _this3._disposableObjectName = 'Lazy';
        _this3._isValueCreated = false;
        return _this3;
      }

      var _proto10 = Lazy.prototype;

      _proto10.equals = function equals (other) {
        return this == other;
      };

      _proto10.valueEquals = function valueEquals (other) {
        return this.equals(other) || this.value === other.value;
      };

      Lazy.create = function create (valueFactory, trapExceptions, allowReset) {
        if (trapExceptions === void 0) {
          trapExceptions = false;
        }

        if (allowReset === void 0) {
          allowReset = false;
        }

        return new Lazy(valueFactory, trapExceptions, allowReset);
      };

      _createClass(Lazy, [{
        key: "isValueCreated",
        get: function get () {
          return !!this._isValueCreated;
        }
      }, {
        key: "value",
        get: function get () {
          return this.getValue();
        }
      }]);

      return Lazy;
    }(ResolverBase);
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   */

  /**
   * This class provides a simple means for storing and calculating time quantities.
   */


  var TimeQuantity =
    /*#__PURE__*/
    function () {
      function TimeQuantity (_quantity) {
        if (_quantity === void 0) {
          _quantity = 0;
        }

        this._quantity = _quantity;

        this._resetTotal();
      } // Provides an overridable mechanism for extending this class.


      var _proto11 = TimeQuantity.prototype;

      _proto11.getTotalMilliseconds = function getTotalMilliseconds () {
        return this._quantity;
      }
        /**
         * +1, 0, or -1 depending on the time direction.
         * @returns {number}
         */
        ;

      /**
       * Compares this instance against any other time quantity instance and return true if the amount of time is the same.
       * @param other
       * @returns {boolean}
       */
      _proto11.equals = function equals (other) {
        return areEqual(this.getTotalMilliseconds(), other && other.total && other.total.milliseconds);
      }
        /**
         * Compares this instance against any other time quantity instance.
         * @param other
         * @returns {number}
         */
        ;

      _proto11.compareTo = function compareTo (other) {
        return compare(this.getTotalMilliseconds(), other && other.total && other.total.milliseconds);
      };

      _proto11._resetTotal = function _resetTotal () {
        var _this4 = this;

        var t = this._total;

        if (!t || t.isValueCreated) {
          this._total = Lazy.create(function () {
            var ms = _this4.getTotalMilliseconds();

            return Object.freeze({
              ticks: ms * 10000
              /* Millisecond */
              ,
              milliseconds: ms,
              seconds: ms / 1000
              /* Second */
              ,
              minutes: ms / 60000
              /* Minute */
              ,
              hours: ms / 3600000
              /* Hour */
              ,
              days: ms / 86400000
              /* Day */

            });
          });
        }
      }
        /**
         * Returns an object with all units exposed as totals.
         * @returns {ITimeMeasurement}
         */
        ;

      /**
       * Returns the total amount of time measured in the requested TimeUnit.
       * @param units
       * @returns {number}
       */
      _proto11.getTotal = function getTotal (units) {
        return TimeUnit.fromMilliseconds(this.getTotalMilliseconds(), units);
      };

      _createClass(TimeQuantity, [{
        key: "direction",
        get: function get () {
          return compare(this.getTotalMilliseconds(), 0);
        }
      }, {
        key: "total",
        get: function get () {
          return this._total.value;
        }
      }]);

      return TimeQuantity;
    }();
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Originally based upon .NET source but with many additions and improvements.
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   */


  var ClockTime =
    /*#__PURE__*/
    function (_TimeQuantity) {
      _inheritsLoose(ClockTime, _TimeQuantity);

      function ClockTime () {
        var _this5;

        _this5 = _TimeQuantity.call(this, arguments.length > 1 ? ClockTime.millisecondsFromTime((arguments.length <= 0 ? undefined : arguments[0]) || 0, (arguments.length <= 1 ? undefined : arguments[1]) || 0, arguments.length > 2 && (arguments.length <= 2 ? undefined : arguments[2]) || 0, arguments.length > 3 && (arguments.length <= 3 ? undefined : arguments[3]) || 0) : arguments.length > 0 && (arguments.length <= 0 ? undefined : arguments[0]) || 0) || this;
        var ms = Math.abs(_this5.getTotalMilliseconds());
        var msi = Math.floor(ms);
        _this5.tick = (ms - msi) * 10000
          /* Millisecond */
          ;
        _this5.days = msi / 86400000
          /* Day */
          | 0;
        msi -= _this5.days * 86400000
          /* Day */
          ;
        _this5.hour = msi / 3600000
          /* Hour */
          | 0;
        msi -= _this5.hour * 3600000
          /* Hour */
          ;
        _this5.minute = msi / 60000
          /* Minute */
          | 0;
        msi -= _this5.minute * 60000
          /* Minute */
          ;
        _this5.second = msi / 1000
          /* Second */
          | 0;
        msi -= _this5.second * 1000
          /* Second */
          ;
        _this5.millisecond = msi;
        Object.freeze(_assertThisInitialized(_this5));
        return _this5;
      } // Static version for relative consistency.  Constructor does allow this format.


      ClockTime.from = function from (hours, minutes, seconds, milliseconds) {
        if (seconds === void 0) {
          seconds = 0;
        }

        if (milliseconds === void 0) {
          milliseconds = 0;
        }

        return new ClockTime(hours, minutes, seconds, milliseconds);
      };

      ClockTime.millisecondsFromTime = function millisecondsFromTime (hours, minutes, seconds, milliseconds) {
        if (seconds === void 0) {
          seconds = 0;
        }

        if (milliseconds === void 0) {
          milliseconds = 0;
        }

        var value = hours;
        value *= 60
          /* Hour */
          ;
        value += minutes;
        value *= 60
          /* Minute */
          ;
        value += seconds;
        value *= 1000
          /* Second */
          ;
        value += milliseconds;
        return value;
      };

      var _proto12 = ClockTime.prototype;

      _proto12.toString = function toString ()
    /*format?:string, formatProvider?:IFormatProvider*/ {
        /* INSERT CUSTOM FORMATTING CODE HERE */
        var _ = this;

        var a = [];
        if (_.days) a.push(pluralize(_.days, "day"));
        if (_.hour) a.push(pluralize(_.hour, "hour"));
        if (_.minute) a.push(pluralize(_.minute, "minute"));
        if (_.second) a.push(pluralize(_.second, "second"));
        if (a.length > 1) a.splice(a.length - 1, 0, "and");
        return a.join(", ").replace(", and, ", " and ");
      };

      return ClockTime;
    }(TimeQuantity); // Temporary until the full TimeSpanFormat is available.


  function pluralize (value, label) {
    if (Math.abs(value) !== 1) label += "s";
    return label;
  }
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Originally based upon .NET source but with many additions and improvements.
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   */

  /**
   * TimeSpan expands on TimeQuantity to provide an class that is similar to .NET's TimeSpan including many useful static methods.
   */


  var TimeSpan =
    /*#__PURE__*/
    function (_TimeQuantity2) {
      _inheritsLoose(TimeSpan, _TimeQuantity2);

      // In .NET the default type is Ticks, but for JavaScript, we will use Milliseconds.
      function TimeSpan (value, units) {
        var _this6;

        if (units === void 0) {
          units = TimeUnit.Milliseconds;
        }

        var ms = TimeUnit.toMilliseconds(value, units);
        _this6 = _TimeQuantity2.call(this, ms) || this;
        _this6.ticks = ms * 10000
          /* Millisecond */
          ;
        _this6.milliseconds = ms;
        _this6.seconds = ms / 1000
          /* Second */
          ;
        _this6.minutes = ms / 60000
          /* Minute */
          ;
        _this6.hours = ms / 3600000
          /* Hour */
          ;
        _this6.days = ms / 86400000
          /* Day */
          ;
        _this6._time = Lazy.create(function () {
          return new ClockTime(_this6.getTotalMilliseconds());
        });
        Object.freeze(_assertThisInitialized(_this6));
        return _this6;
      }
      /**
       * Provides an standard interface for acquiring the total time.
       * @returns {TimeSpan}
       */


      var _proto13 = TimeSpan.prototype;

      _proto13.add = function add (other) {
        if (Type.isNumber(other)) throw new Error("Use .addUnit(value:number,units:TimeUnit) to add a numerical value amount.  Default units are milliseconds.\n" + ".add only supports quantifiable time values (ITimeTotal).");
        return new TimeSpan(this.getTotalMilliseconds() + other.total.milliseconds);
      };

      _proto13.addUnit = function addUnit (value, units) {
        if (units === void 0) {
          units = TimeUnit.Milliseconds;
        }

        return new TimeSpan(this.getTotalMilliseconds() + TimeUnit.toMilliseconds(value, units));
      };

      TimeSpan.from = function from (value, units) {
        return new TimeSpan(value, units);
      };

      TimeSpan.fromDays = function fromDays (value) {
        return new TimeSpan(value, TimeUnit.Days);
      };

      TimeSpan.fromHours = function fromHours (value) {
        return new TimeSpan(value, TimeUnit.Hours);
      };

      TimeSpan.fromMinutes = function fromMinutes (value) {
        return new TimeSpan(value, TimeUnit.Minutes);
      };

      TimeSpan.fromSeconds = function fromSeconds (value) {
        return new TimeSpan(value, TimeUnit.Seconds);
      };

      TimeSpan.fromMilliseconds = function fromMilliseconds (value) {
        return new TimeSpan(value, TimeUnit.Milliseconds);
      };

      TimeSpan.fromTicks = function fromTicks (value) {
        return new TimeSpan(value, TimeUnit.Ticks);
      };

      _createClass(TimeSpan, [{
        key: "total",
        get: function get () {
          return this;
        } // Instead of the confusing getTotal versus unit name, expose a 'ClockTime' value which reports the individual components.

      }, {
        key: "time",
        get: function get () {
          return this._time.value;
        }
      }], [{
        key: "zero",
        get: function get () {
          return timeSpanZero || (timeSpanZero = new TimeSpan(0));
        }
      }]);

      return TimeSpan;
    }(TimeQuantity);

  var timeSpanZero;
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   */

  /**
   * An alternative to Date or DateTime.  Is a model representing the exact date and time.
   */

  var TimeStamp =
    /*#__PURE__*/
    function () {
      function TimeStamp (year, month, day, hour, minute, second, millisecond, tick) {
        if (day === void 0) {
          day = 1;
        }

        if (hour === void 0) {
          hour = 0;
        }

        if (minute === void 0) {
          minute = 0;
        }

        if (second === void 0) {
          second = 0;
        }

        if (millisecond === void 0) {
          millisecond = 0;
        }

        if (tick === void 0) {
          tick = 0;
        }

        // Add validation or properly carry out of range values?
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.millisecond = millisecond;
        this.tick = tick;
        Object.freeze(this);
      }

      var _proto14 = TimeStamp.prototype;

      _proto14.toJsDate = function toJsDate () {
        var _ = this;

        return new Date(_.year, _.month, _.day, _.hour, _.minute, _.second, _.millisecond + _.tick / 10000
          /* Millisecond */
        );
      };

      TimeStamp.from = function from (d) {
        if (!_instanceof(d, Date) && Type.hasMember(d, 'toJsDate')) d = d.toJsDate();

        if (_instanceof(d, Date)) {
          return new TimeStamp(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
        } else {
          throw Error('Invalid date type.');
        }
      };

      return TimeStamp;
    }();
  /*!
   * @author electricessence / https://github.com/electricessence/
   * Based on .NET DateTime's interface.
   * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
   */


  var VOID0$2 = void 0;

  var DateTime =
    /*#__PURE__*/
    function () {
      var _proto15 = DateTime.prototype;

      _proto15.toJsDate = function toJsDate () {
        return new Date(this._value.getTime()); // return a clone.
      };

      function DateTime (value, kind) {
        if (value === void 0) {
          value = new Date();
        }

        if (kind === void 0) {
          kind = DateTime.Kind.Local;
        }

        this._kind = kind;

        if (_instanceof(value, DateTime)) {
          this._value = value.toJsDate();
          if (kind === VOID0$2) this._kind = value._kind;
        } else {
          // noinspection SuspiciousInstanceOfGuard
          if (_instanceof(value, Date)) this._value = new Date(value.getTime()); else this._value = value === VOID0$2 ? new Date() : new Date(value);
        }
      }

      _proto15.addMilliseconds = function addMilliseconds (ms) {
        ms = ms || 0;
        return new DateTime(this._value.getTime() + ms, this._kind);
      };

      _proto15.addSeconds = function addSeconds (seconds) {
        seconds = seconds || 0;
        return this.addMilliseconds(seconds * 1000
          /* Second */
        );
      };

      _proto15.addMinutes = function addMinutes (minutes) {
        minutes = minutes || 0;
        return this.addMilliseconds(minutes * 60000
          /* Minute */
        );
      };

      _proto15.addHours = function addHours (hours) {
        hours = hours || 0;
        return this.addMilliseconds(hours * 3600000
          /* Hour */
        );
      };

      _proto15.addDays = function addDays (days) {
        days = days || 0;
        return this.addMilliseconds(days * 86400000
          /* Day */
        );
      };

      _proto15.addMonths = function addMonths (months) {
        months = months || 0;
        var d = this.toJsDate();
        d.setMonth(d.getMonth() + months);
        return new DateTime(d, this._kind);
      };

      _proto15.addYears = function addYears (years) {
        years = years || 0;
        var d = this.toJsDate();
        d.setFullYear(d.getFullYear() + years);
        return new DateTime(d, this._kind);
      }
        /**
         * Receives an ITimeQuantity value and adds based on the total milliseconds.
         * @param {ITimeQuantity} time
         * @returns {DateTime}
         */
        ;

      _proto15.add = function add (time) {
        return this.addMilliseconds(time.getTotalMilliseconds());
      }
        /**
         * Receives an ITimeQuantity value and subtracts based on the total milliseconds.
         * @param {ITimeQuantity} time
         * @returns {DateTime}
         */
        ;

      _proto15.subtract = function subtract (time) {
        return this.addMilliseconds(-time.getTotalMilliseconds());
      }
        /**
         * Returns a TimeSpan representing the amount of time between two dates.
         * @param previous
         * @returns {TimeSpan}
         */
        ;

      _proto15.timePassedSince = function timePassedSince (previous) {
        return DateTime.between(previous, this);
      }
        /**
         * Returns a DateTime object for 00:00 of this date.
         */
        ;

      /**
       * Returns a readonly object which contains all the date and time components.
       */
      _proto15.toTimeStamp = function toTimeStamp () {
        return TimeStamp.from(this);
      }
        /**
         * Returns the now local time.
         * @returns {DateTime}
         */
        ;

      /**
       * Returns a UTC version of this date if its kind is local.
       * @returns {DateTime}
       */
      _proto15.toUniversalTime = function toUniversalTime () {
        var _ = this;

        if (_._kind != DateTime.Kind.Local) return new DateTime(_, _._kind);
        var d = _._value;
        return new DateTime(new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()), DateTime.Kind.Utc);
      };

      _proto15.equals = function equals (other, strict) {
        if (strict === void 0) {
          strict = false;
        }

        if (!other) return false;
        if (other == this) return true;

        if (_instanceof(other, Date)) {
          var v = this._value;
          return other == v || other.getTime() == v.getTime();
        }

        if (_instanceof(other, DateTime)) {
          if (strict) {
            var ok = other._kind;
            if (!ok && this._kind || ok != this._kind) return false;
          }

          return this.equals(other._value);
        } else if (strict) return false;

        return this.equals(other.toJsDate());
      } // https://msdn.microsoft.com/en-us/library/System.IComparable.CompareTo(v=vs.110).aspx
        ;

      _proto15.compareTo = function compareTo (other) {
        if (!other) throw new ArgumentNullException("other");
        if (other == this) return 0;

        if (_instanceof(other, DateTime)) {
          other = other._value;
        }

        var ms = this._value.getTime();

        if (_instanceof(other, Date)) {
          return ms - other.getTime();
        }

        return ms - other.toJsDate().getTime();
      };

      _proto15.equivalent = function equivalent (other) {
        if (!other) return false;
        if (other == this) return true;

        if (_instanceof(other, Date)) {
          var v = this._value; // TODO: What is the best way to handle this when kinds match or don't?

          return v.toUTCString() == other.toUTCString();
        }

        if (_instanceof(other, DateTime)) {
          if (this.equals(other, true)) return true;
        }

        return this.equivalent(other.toJsDate());
      }
        /**
         * The date component for now.
         * @returns {DateTime}
         */
        ;

      /**
       * Measures the difference between two dates as a TimeSpan.
       * @param first
       * @param last
       */
      DateTime.between = function between (first, last) {
        var f = _instanceof(first, DateTime) ? first._value : first,
          l = _instanceof(last, DateTime) ? last._value : last;
        return new TimeSpan(l.getTime() - f.getTime());
      }
        /**
         * Calculates if the given year is a leap year using the formula:
         * ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
         * @param year
         * @returns {boolean}
         */
        ;

      DateTime.isLeapYear = function isLeapYear (year) {
        return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
      }
        /**
         * Returns the number of days for the specific year and month.
         * @param year
         * @param month
         * @returns {any}
         */
        ;

      DateTime.daysInMonth = function daysInMonth (year, month) {
        // Basically, add 1 month, subtract a day... What's the date?
        return new Date(year, month + 1, 0).getDate();
      };

      DateTime.from = function from (yearOrDate, month, day) {
        if (month === void 0) {
          month = 0;
        }

        if (day === void 0) {
          day = 1;
        }

        var year;

        if (_typeof(yearOrDate) == "object") {
          day = yearOrDate.day;
          month = yearOrDate.month;
          year = yearOrDate.year;
        } else {
          year = yearOrDate;
        }

        return new DateTime(new Date(year, month, day));
      };

      DateTime.fromCalendarDate = function fromCalendarDate (yearOrDate, month, day) {
        if (month === void 0) {
          month = 1;
        }

        if (day === void 0) {
          day = 1;
        }

        var year;

        if (_typeof(yearOrDate) == "object") {
          day = yearOrDate.day;
          month = yearOrDate.month;
          year = yearOrDate.year;
        } else {
          year = yearOrDate;
        }

        return new DateTime(new Date(year, month - 1, day));
      };

      _createClass(DateTime, [{
        key: "kind",
        get: function get () {
          return this._kind;
        }
      }, {
        key: "year",
        get: function get () {
          return this._value.getFullYear();
        }
        /**
         * Returns the Gregorian Month (zero indexed).
         * @returns {number}
         */

      }, {
        key: "month",
        get: function get () {
          return this._value.getMonth();
        }
        /**
         * Returns the month number (1-12).
         * @returns {number}
         */

      }, {
        key: "calendarMonth",
        get: function get () {
          return this._value.getMonth() + 1;
        }
      }, {
        key: "calendar",
        get: function get () {
          return {
            year: this.year,
            month: this.calendarMonth,
            day: this.day
          };
        }
        /**
         * Returns the day of the month.  An integer between 1 and 31.
         * @returns {number}
         */

      }, {
        key: "day",
        get: function get () {
          return this._value.getDate();
        }
        /**
         * Returns the day of the month indexed starting at zero.
         * @returns {number}
         */

      }, {
        key: "dayIndex",
        get: function get () {
          return this._value.getDate() - 1;
        }
        /**
         * Returns the zero indexed day of the week. (Sunday == 0)
         * @returns {number}
         */

      }, {
        key: "dayOfWeek",
        get: function get () {
          return this._value.getDay();
        }
      }, {
        key: "date",
        get: function get () {
          var _ = this;

          return new DateTime(new Date(_.year, _.month, _.day), _._kind);
        }
        /**
         * Returns the time of day represented by a ClockTime object.
         * @returns {ClockTime}
         */

      }, {
        key: "timeOfDay",
        get: function get () {
          var _ = this;

          var t = _._time;

          if (!t) {
            var d = this._value;
            _._time = t = new ClockTime(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
          }

          return t;
        }
      }], [{
        key: "now",
        get: function get () {
          return new DateTime();
        }
      }, {
        key: "today",
        get: function get () {
          return DateTime.now.date;
        }
        /**
         * Midnight tomorrow.
         * @returns {DateTime}
         */

      }, {
        key: "tomorrow",
        get: function get () {
          var today = DateTime.today;
          return today.addDays(1);
        }
      }]);

      return DateTime;
    }(); // Extend DateTime's usefulness.


  (function (DateTime) {
    var Kind;

    (function (Kind) {
      Kind[Kind["Unspecified"] = 0] = "Unspecified";
      Kind[Kind["Local"] = 1] = "Local";
      Kind[Kind["Utc"] = 2] = "Utc";
    })(Kind = DateTime.Kind || (DateTime.Kind = {}));
  })(DateTime || (DateTime = {}));

  Object.freeze(DateTime);
  var DateTime$1 = DateTime;

  var DateTimeHelper =
    /** @class */
    function () {
      function DateTimeHelper () { }

      DateTimeHelper.parse = function (dateString) {
        var matchArray = dateString.match(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/);
        var date = matchArray ? matchArray[0] : null;
        var time = dateString.replace(date, '').trim().replace("：", ":").split(':');
        var datetime = date == null || date.length == 0 ? DateTime$1.today : new DateTime$1(date);
        datetime = datetime.addHours(parseInt(time[0] || '0'));
        datetime = datetime.addMinutes(parseInt(time[1] || '0'));
        return datetime;
      };

      return DateTimeHelper;
    }();
  /**
   * 設定.
   */


  var Config =
    /** @class */
    function () {
      /**
       * Constructor
       * @param config Config
       */
      function Config (config) {
        config = config || {};
        this.borderColor = config.borderColor || '#000';
        this.borderWidth = parseInt(config.borderWidth || '1');
        this.backgroundColor = config.backgroundColor || "transparent";
        this.tooltip = config.tooltip;
        this.layout = LayoutConfig.from(config.layout || {});
        this.time = TimeConfig.from(config.time || {});
        this.label = LabelConfig.from(config.label || {});
      }

      return Config;
    }();
  /**
   * 時間に関する設定
   */


  var TimeConfig =
    /** @class */
    function () {
      function TimeConfig () { }

      Object.defineProperty(TimeConfig.prototype, "totalMinutes", {
        /**
         * 合計(分)
         */
        get: function get () {
          return DateTime$1.between(this.start, this.end).minutes;
        },
        enumerable: true,
        configurable: true
      });

      TimeConfig.from = function (config) {
        config = config || {};
        var timeConfig = new TimeConfig();
        timeConfig.start = DateTimeHelper.parse(config.start || '00:00');
        timeConfig.end = config.end ? DateTimeHelper.parse(config.end) : timeConfig.start.addDays(1);
        return timeConfig;
      };

      return TimeConfig;
    }();
  /**
   * ラベルに関する設定
   */


  var LabelConfig =
    /** @class */
    function () {
      function LabelConfig () { }

      LabelConfig.from = function (config) {
        var labelConfig = new LabelConfig();
        labelConfig.fontFamily = config.fontFamily || 'メイリオ';
        labelConfig.fontSize = config.fontSize || '14px';
        labelConfig.showLabel = config.showLabel || false;
        return labelConfig;
      };

      return LabelConfig;
    }();
  /**
   * レイアウトに関する設定
   */


  var LayoutConfig =
    /** @class */
    function () {
      function LayoutConfig () { }

      LayoutConfig.from = function (layout) {
        var padding = layout.padding || {};
        var config = new LayoutConfig();
        config.padding = PaddingConfig.from(padding.left, padding.top, padding.right, padding.bottom);
        return config;
      };

      return LayoutConfig;
    }();
  /**
   * Paddingの設定
   */


  var PaddingConfig =
    /** @class */
    function () {
      function PaddingConfig () { }

      Object.defineProperty(PaddingConfig.prototype, "x", {
        get: function get () {
          return this.left + this.right;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PaddingConfig.prototype, "y", {
        get: function get () {
          return this.top + this.bottom;
        },
        enumerable: true,
        configurable: true
      });

      PaddingConfig.from = function (left, top, right, bottom) {
        var paddingConfig = new PaddingConfig();
        paddingConfig.left = parseInt(left || '0');
        paddingConfig.top = parseInt(top || '0');
        paddingConfig.right = parseInt(right || '0');
        paddingConfig.bottom = parseInt(bottom || '0');
        return paddingConfig;
      };

      return PaddingConfig;
    }();
  /**
   * Time Unit Element.
   */


  var TimeUnitElement =
    /** @class */
    function () {
      function TimeUnitElement (startTime, endTime, oneMinuteWidth, color, label) {
        if (color === void 0) {
          color = "#fff";
        }
        /**
         * 色
         */


        this.color = "#fff";
        this.startTime = startTime;
        this.endTime = endTime;
        this.oneMinuteWidth = oneMinuteWidth;
        this.color = color;
        this.label = label;
      }

      Object.defineProperty(TimeUnitElement.prototype, "totalMinutes", {
        get: function get () {
          return DateTime$1.between(this.startTime, this.endTime).minutes;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(TimeUnitElement.prototype, "startTimeText", {
        get: function get () {
          return this.getDateTimeText(this.startTime);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(TimeUnitElement.prototype, "endTimeText", {
        get: function get () {
          return this.getDateTimeText(this.endTime);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(TimeUnitElement.prototype, "width", {
        get: function get () {
          return this.oneMinuteWidth * this.totalMinutes;
        },
        enumerable: true,
        configurable: true
      });

      TimeUnitElement.prototype.getDateTimeText = function (date) {
        var timestamp = date.toTimeStamp();

        var zeroPadding = function zeroPadding (num, length) {
          return ('0000000000' + num).slice(-length);
        };

        return timestamp.year + "/" + timestamp.month + "/" + timestamp.day + " " + timestamp.hour + ":" + zeroPadding(timestamp.minute, 2);
      };

      return TimeUnitElement;
    }();

  var Tooltip =
    /** @class */
    function () {
      function Tooltip () {
        /**
         * 表示位置 x
         */
        this.x = 0;
        /**
        * 表示位置 y
        */

        this.y = 0;
        this.container = this.getOrCreateTooltipContainer("timeline-tooltip");
      }

      Tooltip.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
        var margin = 15;
        this.container.style.left = this.x - this.container.offsetWidth / 2 + "px";
        this.container.style.top = this.y - (this.container.offsetHeight + margin) + "px";
      };

      Tooltip.prototype.show = function () {
        if (this.container.innerHTML !== this.text) {
          this.container.innerHTML = this.text;
        }

        this.container.style.visibility = "visible";
      };

      Tooltip.prototype.hide = function () {
        if (!this.container.innerHTML) {
          this.container.innerHTML = "";
        }

        this.container.style.visibility = "collapse";
      };

      Tooltip.prototype.getOrCreateTooltipContainer = function (id) {
        var containerElement = document.getElementById(id);

        if (containerElement) {
          return containerElement;
        }

        containerElement = document.createElement("div");
        containerElement.id = id;
        containerElement.style.width = "auto";
        containerElement.style.height = "auto";
        containerElement.style.position = "absolute";
        containerElement.style.border = "1px solid #ccc";
        containerElement.style.background = "#fff";
        containerElement.style.visibility = "collapse";
        containerElement.style.padding = "5px";
        containerElement.style.zIndex = '99999';
        document.getElementsByTagName("body")[0].appendChild(containerElement);
        return containerElement;
      };

      return Tooltip;
    }();
  /**
   * Timeline Chart.
   *
   * (C) Sawada Makoto | MIT License
   */


  var TimelineChart =
    /** @class */
    function () {
      function TimelineChart (element, obj) {
        var _this = this;

        this.element = element;
        this.canvas = this.element.getContext("2d");
        this.tooltip = new Tooltip();
        this.config = new Config(obj.config); // generate time units.

        this.timeUnits = obj.data.map(function (unit) {
          return new TimeUnitElement(DateTimeHelper.parse(unit.startTime), DateTimeHelper.parse(unit.endTime), _this.oneMinuteWidth, unit.color, unit.label);
        });
        this.Initialize(); // Attach Events.

        this.element.addEventListener("mousemove", function (ev) {
          return _this.onMouseMove(_this, ev);
        }, false);
        this.element.addEventListener("mouseout", function (ev) {
          return _this.onMouseOut(_this, ev);
        }, false);
      }

      Object.defineProperty(TimelineChart.prototype, "totalMinutes", {
        /**
         * 合計（分）
         */
        get: function get () {
          return this.config.time.totalMinutes;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(TimelineChart.prototype, "oneMinuteWidth", {
        /**
         * 1分当たりの幅
         */
        get: function get () {
          return this.drawableWidth / this.totalMinutes;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(TimelineChart.prototype, "elementWidth", {
        /**
         * Canvasの幅
         */
        get: function get () {
          return this.element.width;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(TimelineChart.prototype, "elementHeight", {
        /**
        * Canvasの高さ
        */
        get: function get () {
          return this.element.height;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(TimelineChart.prototype, "drawableWidth", {
        /**
         * 描画可能な幅
         * (ボーダー・パディングを除く)
         */
        get: function get () {
          return this.elementWidth - this.config.borderWidth - this.config.layout.padding.x;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(TimelineChart.prototype, "drawableHeight", {
        /**
         * 描画可能な高さ
         */
        get: function get () {
          return this.elementHeight - this.config.borderWidth * 2 - this.config.layout.padding.y;
        },
        enumerable: true,
        configurable: true
      });
      /**
       * Initialize
       */

      TimelineChart.prototype.Initialize = function () {
        this.drawBackground();
        this.drawBorder();
      };
      /**
       * Draw.
       */


      TimelineChart.prototype.draw = function () {
        var borderWidth = this.config.borderWidth;
        var startDateTime = this.config.time.start;
        var labelConfig = this.config.label;
        var self = this; // Draw Time Units

        this.timeUnits.forEach(function (timeUnit, index) {
          // Guard If Zero Minutes.
          if (timeUnit.totalMinutes == 0) {
            return;
          }

          var x = borderWidth + self.config.layout.padding.left;

          if (index > 0) {
            var startMinutes = DateTime$1.between(startDateTime, timeUnit.startTime).minutes;
            x += startMinutes * self.oneMinuteWidth;
          }

          var y = borderWidth + self.config.layout.padding.top;
          var height = self.drawableHeight;
          var width = timeUnit.width;
          self.canvas.fillStyle = timeUnit.color;
          self.canvas.fillRect(x, y, width, height);

          if (labelConfig.showLabel) {
            var textLeftMargin = 5;
            self.canvas.fillStyle = 'black';
            self.canvas.textBaseline = 'middle';
            self.canvas.font = labelConfig.fontSize + ' ' + labelConfig.fontFamily;
            self.canvas.fillText(timeUnit.label, x + textLeftMargin, y + height / 2, width - textLeftMargin);
          }
        });
      }; // #region Private Functions.


      TimelineChart.prototype.onMouseMove = function (sender, event) {
        var rect = this.element.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        var padding = this.config.layout.padding;
        var shouldShowTooltip = this.config.tooltip != null;
        var startDateTime = this.config.time.start;

        if (!shouldShowTooltip) {
          return;
        } // パディング範囲は無視
        // left, right, top, bottom


        if (x < padding.left || x > this.drawableWidth - padding.right || y < padding.top || y > this.drawableHeight - padding.bottom) {
          this.tooltip.hide();
          return;
        }

        for (var _i = 0, _a = this.timeUnits; _i < _a.length; _i++) {
          var unit = _a[_i];
          var offset = padding.left;
          var startMinutes = DateTime$1.between(startDateTime, unit.startTime).minutes;
          offset += startMinutes * this.oneMinuteWidth;

          if (x >= offset && x <= offset + unit.width) {
            this.tooltip.setPosition(event.clientX, event.clientY);
            this.tooltip.text = this.config.tooltip(unit);
            this.tooltip.show();
            return;
          }
        }

        this.tooltip.hide();
      };

      TimelineChart.prototype.onMouseOut = function (sender, event) {
        this.tooltip.hide();
      };
      /**
       * Draw Border.
       */


      TimelineChart.prototype.drawBorder = function () {
        if (this.config.borderWidth <= 0) {
          return;
        }

        var padding = this.config.layout.padding; // top and bottom

        this.canvas.strokeStyle = this.config.borderColor;
        this.canvas.lineWidth = this.config.borderWidth * 2;
        this.canvas.strokeRect(padding.left, padding.top, this.element.width - padding.x, this.element.height - padding.y);
      };
      /**
       * Draw Background.
       */


      TimelineChart.prototype.drawBackground = function () {
        var padding = this.config.layout.padding;
        this.canvas.fillStyle = this.config.backgroundColor;
        this.canvas.fillRect(this.config.layout.padding.left, this.config.layout.padding.top, this.element.width - padding.x, this.element.height - padding.y);
      };

      return TimelineChart;
    }();

  return TimelineChart;
});