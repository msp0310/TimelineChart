/*!
 * Timeline.js v0.1.3
 *
 * (c) 2019 Sawada Makoto.
 * Released under the MIT License
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.TimelineChart = factory());
}(this, (function () { 'use strict';

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     */
    const VOID0 = void 0,
          _BOOLEAN = typeof true,
          _NUMBER = typeof 0,
          _STRING = typeof "",
          _SYMBOL = "symbol",
          _OBJECT = typeof {},
          _UNDEFINED = typeof VOID0,
          _FUNCTION = typeof function () {},
          LENGTH = "length"; // Only used for primitives.


    const typeInfoRegistry = {};
    /**
     * Exposes easy access to type information including inquiring about members.
     */

    class TypeInfo {
      constructor(target, onBeforeFreeze) {
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

        switch (this.type = typeof target) {
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
              this.isArray = target instanceof Array;
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


      member(name) {
        const t = this.target;
        return TypeInfo.getFor(t && name in t ? t[name] : VOID0);
      }
      /**
       * Returns a TypeInfo for any target object.
       * If the target object is of a primitive type, it returns the TypeInfo instance assigned to that type.
       * @param target
       * @returns {TypeInfo}
       */


      static getFor(target) {
        const type = typeof target;

        switch (type) {
          case _OBJECT:
          case _FUNCTION:
            return new TypeInfo(target);
        }

        let info = typeInfoRegistry[type];
        if (!info) typeInfoRegistry[type] = info = new TypeInfo(target);
        return info;
      }
      /**
       * Returns true if the target matches the type (instanceof).
       * @param type
       * @returns {boolean}
       */


      is(type) {
        return this.target instanceof type;
      }
      /**
       * Returns null if the target does not match the type (instanceof).
       * Otherwise returns the target as the type.
       * @param type
       * @returns {T|null}
       */


      as(type) {
        return this.target instanceof type ? this.target : null;
      }

    }
    function Type(target) {
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

      function is(target, type) {
        return target instanceof type;
      }

      Type.is = is;
      /**
       * Returns null if the target does not match the type (instanceof).
       * Otherwise returns the target as the type.
       * @param target
       * @param type
       * @returns {T|null}
       */

      function as(target, type) {
        return target instanceof type ? target : null;
      }

      Type.as = as;
      /**
       * Returns true if the value parameter is null or undefined.
       * @param value
       * @returns {boolean}
       */

      function isNullOrUndefined(value) {
        return value == null;
      }

      Type.isNullOrUndefined = isNullOrUndefined;
      /**
       * Returns true if the value parameter is a boolean.
       * @param value
       * @returns {boolean}
       */

      function isBoolean(value) {
        return typeof value === _BOOLEAN;
      }

      Type.isBoolean = isBoolean;
      /**
       * Returns true if the value parameter is a number.
       * @param value
       * @param ignoreNaN Default is false. When true, NaN is not considered a number and will return false.
       * @returns {boolean}
       */

      function isNumber(value, ignoreNaN = false) {
        return typeof value === _NUMBER && (!ignoreNaN || !isNaN(value));
      }

      Type.isNumber = isNumber;
      /**
       * Returns true if is a number and is NaN.
       * @param value
       * @returns {boolean}
       */

      function isTrueNaN(value) {
        return typeof value === _NUMBER && isNaN(value);
      }

      Type.isTrueNaN = isTrueNaN;
      /**
       * Returns true if the value parameter is a string.
       * @param value
       * @returns {boolean}
       */

      function isString(value) {
        return typeof value === _STRING;
      }

      Type.isString = isString;
      /**
       * Returns true if the value is a boolean, string, number, null, or undefined.
       * @param value
       * @param allowUndefined if set to true will return true if the value is undefined.
       * @returns {boolean}
       */

      function isPrimitive(value, allowUndefined = false) {
        const t = typeof value;

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

      function isPrimitiveOrSymbol(value, allowUndefined = false) {
        return typeof value === _SYMBOL ? true : isPrimitive(value, allowUndefined);
      }

      Type.isPrimitiveOrSymbol = isPrimitiveOrSymbol;
      /**
       * Returns true if the value is a string, number, or symbol.
       * @param value
       * @returns {boolean}
       */

      function isPropertyKey(value) {
        const t = typeof value;

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

      function isFunction(value) {
        return typeof value === _FUNCTION;
      }

      Type.isFunction = isFunction;
      /**
       * Returns true if the value parameter is an object.
       * @param value
       * @param allowNull If false (default) null is not considered an object.
       * @returns {boolean}
       */

      function isObject(value, allowNull = false) {
        return typeof value === _OBJECT && (allowNull || value !== null);
      }

      Type.isObject = isObject;
      /**
       * Guarantees a number value or NaN instead.
       * @param value
       * @returns {number}
       */

      function numberOrNaN(value) {
        return isNaN(value) ? NaN : value;
      }

      Type.numberOrNaN = numberOrNaN;
      /**
       * Returns a TypeInfo object for the target.
       * @param target
       * @returns {TypeInfo}
       */

      function of(target) {
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

      function hasMember(instance, property, ignoreUndefined = true) {
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

      function hasMemberOfType(instance, property, type) {
        return hasMember(instance, property) && typeof instance[property] === type;
      }

      Type.hasMemberOfType = hasMemberOfType;

      function hasMethod(instance, property) {
        return hasMemberOfType(instance, property, _FUNCTION);
      }

      Type.hasMethod = hasMethod;

      function isArrayLike(instance) {
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
        return instance instanceof Array || Type.isString(instance) || !Type.isFunction(instance) && hasMember(instance, LENGTH);
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
      function toMilliseconds(value, units = TimeUnit.Milliseconds) {
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

      function fromMilliseconds(ms, units) {
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

      function from(quantity, unit) {
        return quantity && fromMilliseconds(quantity.getTotalMilliseconds(), unit);
      }

      TimeUnit.from = from;

      function assertValid(unit) {
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
    const VOID0$1 = void 0;
    /**
     * Used for special comparison including NaN.
     * @param a
     * @param b
     * @param strict
     * @returns {boolean|any}
     */

    function areEqual(a, b, strict = true) {
      return a === b || !strict && a == b || isTrueNaN(a) && isTrueNaN(b);
    }
    const COMPARE_TO = "compareTo";
    function compare(a, b, strict = true) {
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
    const NAME = 'Exception';
    /**
     * Represents errors that occur during application execution.
     */

    class Exception {
      /**
       * Initializes a new instance of the Exception class with a specified error message and optionally a reference to the inner exception that is the cause of this exception.
       * @param message
       * @param innerException
       * @param beforeSealing This delegate is used to allow actions to occur just before this constructor finishes.  Since some compilers do not allow the use of 'this' before super.
       */
      constructor(message, innerException, beforeSealing) {
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
          let stack = eval("new Error()").stack;
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


      getName() {
        return NAME;
      }
      /**
       * The string representation of the Exception instance.
       */


      toString() {
        return `[${this.toStringWithoutBrackets()}]`;
      }

      toStringWithoutBrackets() {
        const _ = this;

        const m = _.message;
        return _.name + (m ? ': ' + m : '');
      }
      /**
       * Clears the data object.
       */


      dispose() {
        const data = this.data;

        for (let k in data) {
          if (data.hasOwnProperty(k)) delete data[k];
        }
      }

    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     * Based upon: https://msdn.microsoft.com/en-us/library/system.systemexception%28v=vs.110%29.aspx
     */

    const NAME$1 = 'SystemException';
    class SystemException extends Exception {
      /*
          constructor(
              message:string = null,
              innerException:Error = null,
              beforeSealing?:(ex:any)=>void)
          {
              super(message, innerException, beforeSealing);
          }
      */
      getName() {
        return NAME$1;
      }

    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
     */

    const NAME$2 = 'InvalidOperationException';
    class InvalidOperationException extends SystemException {
      getName() {
        return NAME$2;
      }

    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
     */

    const NAME$3 = 'ObjectDisposedException';
    class ObjectDisposedException extends InvalidOperationException {
      // For simplicity and consistency, lets stick with 1 signature.
      constructor(objectName, message, innerException) {
        super(message || '', innerException, _ => {
          _.objectName = objectName;
        });
      }

      getName() {
        return NAME$3;
      }

      toString() {
        const _ = this;

        let oName = _.objectName;
        oName = oName ? '{' + oName + '} ' : '';
        return '[' + _.name + ': ' + oName + _.message + ']';
      }

      static throwIfDisposed(disposable, objectName, message) {
        if (disposable.wasDisposed) throw new ObjectDisposedException(objectName, message);
        return true;
      }

    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     */
    class DisposableBase {
      constructor(_disposableObjectName, __finalizer) {
        this._disposableObjectName = _disposableObjectName;
        this.__finalizer = __finalizer;
        this.__wasDisposed = false;
      }

      get wasDisposed() {
        return this.__wasDisposed;
      }

      throwIfDisposed(message, objectName = this._disposableObjectName) {
        if (this.__wasDisposed) throw new ObjectDisposedException(objectName, message);
        return true;
      }

      dispose() {
        const _ = this;

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


      _onDispose() {}

    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     */
    const EMPTY = '';
    /**
     * Escapes a RegExp sequence.
     * @param source
     * @returns {string}
     */

    function escapeRegExp(source) {
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

    function trim(source, chars, ignoreCase) {
      if (chars === EMPTY) return source;

      if (chars) {
        const escaped = escapeRegExp(chars instanceof Array ? chars.join() : chars);
        return source.replace(new RegExp('^[' + escaped + ']+|[' + escaped + ']+$', 'g' + (ignoreCase ? 'i' : '')), EMPTY);
      }

      return source.replace(/^\s+|\s+$/g, EMPTY);
    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
     */

    const NAME$4 = 'ArgumentException';
    class ArgumentException extends SystemException {
      // For simplicity and consistency, lets stick with 1 signature.
      constructor(paramName, message, innerException, beforeSealing) {
        let pn = paramName ? '{' + paramName + '} ' : '';
        super(trim(pn + (message || '')), innerException, _ => {
          _.paramName = paramName;
          if (beforeSealing) beforeSealing(_);
        });
      }

      getName() {
        return NAME$4;
      }

    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
     */

    const NAME$5 = 'ArgumentNullException';
    class ArgumentNullException extends ArgumentException {
      constructor(paramName, message = `'${paramName}' is null (or undefined).`, innerException) {
        super(paramName, message, innerException);
      }

      getName() {
        return NAME$5;
      }

    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     */

    const NULL = null;
    const NAME$6 = "ResolverBase";
    /**
     * The ResolverBase class handles resolving a factory method and detects recursion.
     * Since JS does not have a synchronization mechanism (lock or otherwise)
     * we have to prevent getValue from double triggering the value factory (optimistic concurrency)
     * or returning return a value that is intermediate between resolving and resolved.
     */

    class ResolverBase extends DisposableBase {
      constructor(_valueFactory, _trapExceptions, _allowReset = false) {
        super(NAME$6);
        this._valueFactory = _valueFactory;
        this._trapExceptions = _trapExceptions;
        this._allowReset = _allowReset;
        if (!_valueFactory) throw new ArgumentNullException("valueFactory");
        this._isValueCreated = false;
      }

      getError() {
        return this._error;
      }

      get error() {
        return this.getError();
      }

      getValue() {
        const _ = this;

        _.throwIfDisposed();

        if (_._isValueCreated === null) throw new Error("Recursion detected.");

        if (!_._isValueCreated && _._valueFactory) {
          _._isValueCreated = null; // Mark this as 'resolving'.

          try {
            let c;

            if (!_._isValueCreated && (c = _._valueFactory)) {
              _._isValueCreated = null; // Mark this as 'resolving'.

              if (!this._allowReset) this._valueFactory = NULL;
              const v = c();
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
      }

      get canReset() {
        return this._allowReset && !!this._valueFactory;
      }

      _onDispose() {
        this._valueFactory = NULL;
        this._value = NULL;
        this._isValueCreated = NULL;
      }

      tryReset() {
        const _ = this;

        if (!_._valueFactory) return false;else {
          _._isValueCreated = false;
          _._value = NULL;
          _._error = void 0;
          return true;
        }
      }

    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     */
    // We need a non-resettable lazy to ensure it can be passed safely around.

    class Lazy extends ResolverBase {
      constructor(valueFactory, trapExceptions = false, allowReset = false) {
        super(valueFactory, trapExceptions, allowReset); // @ts-ignore // Force this override.

        this._disposableObjectName = 'Lazy';
        this._isValueCreated = false;
      }

      get isValueCreated() {
        return !!this._isValueCreated;
      }

      get value() {
        return this.getValue();
      }

      equals(other) {
        return this == other;
      }

      valueEquals(other) {
        return this.equals(other) || this.value === other.value;
      }

      static create(valueFactory, trapExceptions = false, allowReset = false) {
        return new Lazy(valueFactory, trapExceptions, allowReset);
      }

    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     */
    /**
     * This class provides a simple means for storing and calculating time quantities.
     */

    class TimeQuantity {
      constructor(_quantity = 0) {
        this._quantity = _quantity;

        this._resetTotal();
      } // Provides an overridable mechanism for extending this class.


      getTotalMilliseconds() {
        return this._quantity;
      }
      /**
       * +1, 0, or -1 depending on the time direction.
       * @returns {number}
       */


      get direction() {
        return compare(this.getTotalMilliseconds(), 0);
      }
      /**
       * Compares this instance against any other time quantity instance and return true if the amount of time is the same.
       * @param other
       * @returns {boolean}
       */


      equals(other) {
        return areEqual(this.getTotalMilliseconds(), other && other.total && other.total.milliseconds);
      }
      /**
       * Compares this instance against any other time quantity instance.
       * @param other
       * @returns {number}
       */


      compareTo(other) {
        return compare(this.getTotalMilliseconds(), other && other.total && other.total.milliseconds);
      }

      _resetTotal() {
        const t = this._total;

        if (!t || t.isValueCreated) {
          this._total = Lazy.create(() => {
            const ms = this.getTotalMilliseconds();
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


      get total() {
        return this._total.value;
      }
      /**
       * Returns the total amount of time measured in the requested TimeUnit.
       * @param units
       * @returns {number}
       */


      getTotal(units) {
        return TimeUnit.fromMilliseconds(this.getTotalMilliseconds(), units);
      }

    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Originally based upon .NET source but with many additions and improvements.
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     */

    class ClockTime extends TimeQuantity {
      constructor(...args) {
        super(args.length > 1 ? ClockTime.millisecondsFromTime(args[0] || 0, args[1] || 0, args.length > 2 && args[2] || 0, args.length > 3 && args[3] || 0) : args.length > 0 && args[0] || 0);
        const ms = Math.abs(this.getTotalMilliseconds());
        let msi = Math.floor(ms);
        this.tick = (ms - msi) * 10000
        /* Millisecond */
        ;
        this.days = msi / 86400000
        /* Day */
        | 0;
        msi -= this.days * 86400000
        /* Day */
        ;
        this.hour = msi / 3600000
        /* Hour */
        | 0;
        msi -= this.hour * 3600000
        /* Hour */
        ;
        this.minute = msi / 60000
        /* Minute */
        | 0;
        msi -= this.minute * 60000
        /* Minute */
        ;
        this.second = msi / 1000
        /* Second */
        | 0;
        msi -= this.second * 1000
        /* Second */
        ;
        this.millisecond = msi;
        Object.freeze(this);
      } // Static version for relative consistency.  Constructor does allow this format.


      static from(hours, minutes, seconds = 0, milliseconds = 0) {
        return new ClockTime(hours, minutes, seconds, milliseconds);
      }

      static millisecondsFromTime(hours, minutes, seconds = 0, milliseconds = 0) {
        let value = hours;
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
      }

      toString()
      /*format?:string, formatProvider?:IFormatProvider*/
      {
        /* INSERT CUSTOM FORMATTING CODE HERE */
        const _ = this;

        const a = [];
        if (_.days) a.push(pluralize(_.days, "day"));
        if (_.hour) a.push(pluralize(_.hour, "hour"));
        if (_.minute) a.push(pluralize(_.minute, "minute"));
        if (_.second) a.push(pluralize(_.second, "second"));
        if (a.length > 1) a.splice(a.length - 1, 0, "and");
        return a.join(", ").replace(", and, ", " and ");
      }

    } // Temporary until the full TimeSpanFormat is available.

    function pluralize(value, label) {
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

    class TimeSpan extends TimeQuantity {
      // In .NET the default type is Ticks, but for JavaScript, we will use Milliseconds.
      constructor(value, units = TimeUnit.Milliseconds) {
        const ms = TimeUnit.toMilliseconds(value, units);
        super(ms);
        this.ticks = ms * 10000
        /* Millisecond */
        ;
        this.milliseconds = ms;
        this.seconds = ms / 1000
        /* Second */
        ;
        this.minutes = ms / 60000
        /* Minute */
        ;
        this.hours = ms / 3600000
        /* Hour */
        ;
        this.days = ms / 86400000
        /* Day */
        ;
        this._time = Lazy.create(() => new ClockTime(this.getTotalMilliseconds()));
        Object.freeze(this);
      }
      /**
       * Provides an standard interface for acquiring the total time.
       * @returns {TimeSpan}
       */


      get total() {
        return this;
      } // Instead of the confusing getTotal versus unit name, expose a 'ClockTime' value which reports the individual components.


      get time() {
        return this._time.value;
      }

      add(other) {
        if (Type.isNumber(other)) throw new Error("Use .addUnit(value:number,units:TimeUnit) to add a numerical value amount.  Default units are milliseconds.\n" + ".add only supports quantifiable time values (ITimeTotal).");
        return new TimeSpan(this.getTotalMilliseconds() + other.total.milliseconds);
      }

      addUnit(value, units = TimeUnit.Milliseconds) {
        return new TimeSpan(this.getTotalMilliseconds() + TimeUnit.toMilliseconds(value, units));
      }

      static from(value, units) {
        return new TimeSpan(value, units);
      }

      static fromDays(value) {
        return new TimeSpan(value, TimeUnit.Days);
      }

      static fromHours(value) {
        return new TimeSpan(value, TimeUnit.Hours);
      }

      static fromMinutes(value) {
        return new TimeSpan(value, TimeUnit.Minutes);
      }

      static fromSeconds(value) {
        return new TimeSpan(value, TimeUnit.Seconds);
      }

      static fromMilliseconds(value) {
        return new TimeSpan(value, TimeUnit.Milliseconds);
      }

      static fromTicks(value) {
        return new TimeSpan(value, TimeUnit.Ticks);
      }

      static get zero() {
        return timeSpanZero || (timeSpanZero = new TimeSpan(0));
      }

    }
    let timeSpanZero;

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     */
    /**
     * An alternative to Date or DateTime.  Is a model representing the exact date and time.
     */

    class TimeStamp {
      constructor(year, month, day = 1, hour = 0, minute = 0, second = 0, millisecond = 0, tick = 0) {
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

      toJsDate() {
        const _ = this;

        return new Date(_.year, _.month, _.day, _.hour, _.minute, _.second, _.millisecond + _.tick / 10000
        /* Millisecond */
        );
      }

      static from(d) {
        if (!(d instanceof Date) && Type.hasMember(d, 'toJsDate')) d = d.toJsDate();

        if (d instanceof Date) {
          return new TimeStamp(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
        } else {
          throw Error('Invalid date type.');
        }
      }

    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Based on .NET DateTime's interface.
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     */
    const VOID0$2 = void 0;
    class DateTime {
      toJsDate() {
        return new Date(this._value.getTime()); // return a clone.
      }

      constructor(value = new Date(), kind = DateTime.Kind.Local) {
        this._kind = kind;

        if (value instanceof DateTime) {
          this._value = value.toJsDate();
          if (kind === VOID0$2) this._kind = value._kind;
        } else {
          // noinspection SuspiciousInstanceOfGuard
          if (value instanceof Date) this._value = new Date(value.getTime());else this._value = value === VOID0$2 ? new Date() : new Date(value);
        }
      }

      get kind() {
        return this._kind;
      }

      get year() {
        return this._value.getFullYear();
      }
      /**
       * Returns the Gregorian Month (zero indexed).
       * @returns {number}
       */


      get month() {
        return this._value.getMonth();
      }
      /**
       * Returns the month number (1-12).
       * @returns {number}
       */


      get calendarMonth() {
        return this._value.getMonth() + 1;
      }

      get calendar() {
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


      get day() {
        return this._value.getDate();
      }
      /**
       * Returns the day of the month indexed starting at zero.
       * @returns {number}
       */


      get dayIndex() {
        return this._value.getDate() - 1;
      }
      /**
       * Returns the zero indexed day of the week. (Sunday == 0)
       * @returns {number}
       */


      get dayOfWeek() {
        return this._value.getDay();
      }

      addMilliseconds(ms) {
        ms = ms || 0;
        return new DateTime(this._value.getTime() + ms, this._kind);
      }

      addSeconds(seconds) {
        seconds = seconds || 0;
        return this.addMilliseconds(seconds * 1000
        /* Second */
        );
      }

      addMinutes(minutes) {
        minutes = minutes || 0;
        return this.addMilliseconds(minutes * 60000
        /* Minute */
        );
      }

      addHours(hours) {
        hours = hours || 0;
        return this.addMilliseconds(hours * 3600000
        /* Hour */
        );
      }

      addDays(days) {
        days = days || 0;
        return this.addMilliseconds(days * 86400000
        /* Day */
        );
      }

      addMonths(months) {
        months = months || 0;
        const d = this.toJsDate();
        d.setMonth(d.getMonth() + months);
        return new DateTime(d, this._kind);
      }

      addYears(years) {
        years = years || 0;
        const d = this.toJsDate();
        d.setFullYear(d.getFullYear() + years);
        return new DateTime(d, this._kind);
      }
      /**
       * Receives an ITimeQuantity value and adds based on the total milliseconds.
       * @param {ITimeQuantity} time
       * @returns {DateTime}
       */


      add(time) {
        return this.addMilliseconds(time.getTotalMilliseconds());
      }
      /**
       * Receives an ITimeQuantity value and subtracts based on the total milliseconds.
       * @param {ITimeQuantity} time
       * @returns {DateTime}
       */


      subtract(time) {
        return this.addMilliseconds(-time.getTotalMilliseconds());
      }
      /**
       * Returns a TimeSpan representing the amount of time between two dates.
       * @param previous
       * @returns {TimeSpan}
       */


      timePassedSince(previous) {
        return DateTime.between(previous, this);
      }
      /**
       * Returns a DateTime object for 00:00 of this date.
       */


      get date() {
        const _ = this;

        return new DateTime(new Date(_.year, _.month, _.day), _._kind);
      }
      /**
       * Returns the time of day represented by a ClockTime object.
       * @returns {ClockTime}
       */


      get timeOfDay() {
        const _ = this;

        let t = _._time;

        if (!t) {
          const d = this._value;
          _._time = t = new ClockTime(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
        }

        return t;
      }
      /**
       * Returns a readonly object which contains all the date and time components.
       */


      toTimeStamp() {
        return TimeStamp.from(this);
      }
      /**
       * Returns the now local time.
       * @returns {DateTime}
       */


      static get now() {
        return new DateTime();
      }
      /**
       * Returns a UTC version of this date if its kind is local.
       * @returns {DateTime}
       */


      toUniversalTime() {
        const _ = this;

        if (_._kind != DateTime.Kind.Local) return new DateTime(_, _._kind);
        const d = _._value;
        return new DateTime(new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()), DateTime.Kind.Utc);
      }

      equals(other, strict = false) {
        if (!other) return false;
        if (other == this) return true;

        if (other instanceof Date) {
          let v = this._value;
          return other == v || other.getTime() == v.getTime();
        }

        if (other instanceof DateTime) {
          if (strict) {
            let ok = other._kind;
            if (!ok && this._kind || ok != this._kind) return false;
          }

          return this.equals(other._value);
        } else if (strict) return false;

        return this.equals(other.toJsDate());
      } // https://msdn.microsoft.com/en-us/library/System.IComparable.CompareTo(v=vs.110).aspx


      compareTo(other) {
        if (!other) throw new ArgumentNullException("other");
        if (other == this) return 0;

        if (other instanceof DateTime) {
          other = other._value;
        }

        const ms = this._value.getTime();

        if (other instanceof Date) {
          return ms - other.getTime();
        }

        return ms - other.toJsDate().getTime();
      }

      equivalent(other) {
        if (!other) return false;
        if (other == this) return true;

        if (other instanceof Date) {
          let v = this._value; // TODO: What is the best way to handle this when kinds match or don't?

          return v.toUTCString() == other.toUTCString();
        }

        if (other instanceof DateTime) {
          if (this.equals(other, true)) return true;
        }

        return this.equivalent(other.toJsDate());
      }
      /**
       * The date component for now.
       * @returns {DateTime}
       */


      static get today() {
        return DateTime.now.date;
      }
      /**
       * Midnight tomorrow.
       * @returns {DateTime}
       */


      static get tomorrow() {
        const today = DateTime.today;
        return today.addDays(1);
      }
      /**
       * Measures the difference between two dates as a TimeSpan.
       * @param first
       * @param last
       */


      static between(first, last) {
        const f = first instanceof DateTime ? first._value : first,
              l = last instanceof DateTime ? last._value : last;
        return new TimeSpan(l.getTime() - f.getTime());
      }
      /**
       * Calculates if the given year is a leap year using the formula:
       * ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
       * @param year
       * @returns {boolean}
       */


      static isLeapYear(year) {
        return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
      }
      /**
       * Returns the number of days for the specific year and month.
       * @param year
       * @param month
       * @returns {any}
       */


      static daysInMonth(year, month) {
        // Basically, add 1 month, subtract a day... What's the date?
        return new Date(year, month + 1, 0).getDate();
      }

      static from(yearOrDate, month = 0, day = 1) {
        let year;

        if (typeof yearOrDate == "object") {
          day = yearOrDate.day;
          month = yearOrDate.month;
          year = yearOrDate.year;
        } else {
          year = yearOrDate;
        }

        return new DateTime(new Date(year, month, day));
      }

      static fromCalendarDate(yearOrDate, month = 1, day = 1) {
        let year;

        if (typeof yearOrDate == "object") {
          day = yearOrDate.day;
          month = yearOrDate.month;
          year = yearOrDate.year;
        } else {
          year = yearOrDate;
        }

        return new DateTime(new Date(year, month - 1, day));
      }

    } // Extend DateTime's usefulness.

    (function (DateTime) {
      let Kind;

      (function (Kind) {
        Kind[Kind["Unspecified"] = 0] = "Unspecified";
        Kind[Kind["Local"] = 1] = "Local";
        Kind[Kind["Utc"] = 2] = "Utc";
      })(Kind = DateTime.Kind || (DateTime.Kind = {}));
    })(DateTime || (DateTime = {}));

    Object.freeze(DateTime);
    var DateTime$1 = DateTime;

    var DateTimeHelper = /** @class */ (function () {
        function DateTimeHelper() {
        }
        DateTimeHelper.parse = function (dateString) {
            var matchArray = dateString.match(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/);
            var date = matchArray ? matchArray[0] : null;
            var time = dateString.replace(date, '').trimLeft().split(':');
            var datetime = date == null || date.length == 0
                ? DateTime$1.today : new DateTime$1(date);
            datetime = datetime.addHours(parseInt(time[0] || '0'));
            datetime = datetime.addMinutes(parseInt(time[1] || '0'));
            return datetime;
        };
        return DateTimeHelper;
    }());
    //# sourceMappingURL=DateTimeExtension.js.map

    /**
     * 設定.
     */
    var Config = /** @class */ (function () {
        /**
         * Constructor
         * @param config Config
         */
        function Config(config) {
            config = config || {};
            this.borderColor = config.borderColor || '#000';
            this.borderWidth = Number(config.borderWidth || 1);
            this.backgroundColor = config.backgroundColor || "transparent";
            this.tooltip = config.tooltip;
            this.layout = LayoutConfig.from(config.layout || {});
            this.time = TimeConfig.from(config.time || {});
            this.label = LabelConfig.from(config.label || {});
        }
        return Config;
    }());
    /**
     * 時間に関する設定
     */
    var TimeConfig = /** @class */ (function () {
        function TimeConfig() {
        }
        Object.defineProperty(TimeConfig.prototype, "totalMinutes", {
            /**
             * 合計(分)
             */
            get: function () {
                return DateTime$1.between(this.start, this.end).minutes;
            },
            enumerable: true,
            configurable: true
        });
        TimeConfig.from = function (config) {
            config = config || {};
            var timeConfig = new TimeConfig();
            timeConfig.start = DateTimeHelper.parse(config.start || '00:00');
            timeConfig.end = DateTimeHelper.parse(config.end || '24:00');
            return timeConfig;
        };
        return TimeConfig;
    }());
    /**
     * ラベルに関する設定
     */
    var LabelConfig = /** @class */ (function () {
        function LabelConfig() {
        }
        LabelConfig.from = function (config) {
            var labelConfig = new LabelConfig;
            labelConfig.fontFamily = config.fontFamily || 'メイリオ';
            labelConfig.fontSize = config.fontSize || '14px';
            labelConfig.showLabel = config.showLabel || false;
            return labelConfig;
        };
        return LabelConfig;
    }());
    /**
     * レイアウトに関する設定
     */
    var LayoutConfig = /** @class */ (function () {
        function LayoutConfig() {
        }
        LayoutConfig.from = function (layout) {
            var padding = layout.padding || {};
            var config = new LayoutConfig();
            config.padding = PaddingConfig.from(padding.left, padding.top, padding.right, padding.bottom);
            return config;
        };
        return LayoutConfig;
    }());
    /**
     * Paddingの設定
     */
    var PaddingConfig = /** @class */ (function () {
        function PaddingConfig() {
        }
        Object.defineProperty(PaddingConfig.prototype, "x", {
            get: function () {
                return this.top + this.bottom;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaddingConfig.prototype, "y", {
            get: function () {
                return this.left + this.right;
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
    }());
    //# sourceMappingURL=config.js.map

    /**
     * Time Unit Element.
     */
    var TimeUnitElement = /** @class */ (function () {
        function TimeUnitElement(startTime, endTime, oneMinuteWidth, color, label) {
            if (color === void 0) { color = "#fff"; }
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
            get: function () {
                return DateTime$1.between(this.startTime, this.endTime).minutes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeUnitElement.prototype, "startTimeText", {
            get: function () {
                return this.getDateTimeText(this.startTime);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeUnitElement.prototype, "endTimeText", {
            get: function () {
                return this.getDateTimeText(this.endTime);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeUnitElement.prototype, "width", {
            get: function () {
                return this.oneMinuteWidth * this.totalMinutes;
            },
            enumerable: true,
            configurable: true
        });
        TimeUnitElement.prototype.getDateTimeText = function (date) {
            var timestamp = date.toTimeStamp();
            var zeroPadding = function (num, length) { return ('0000000000' + num).slice(-length); };
            return timestamp.year + "/" + timestamp.month + "/" + timestamp.day + " " + timestamp.hour + ":" + zeroPadding(timestamp.minute, 2);
        };
        return TimeUnitElement;
    }());
    //# sourceMappingURL=time-unit.js.map

    var Tooltip = /** @class */ (function () {
        function Tooltip() {
            /**
             * 表示位置 x
             */
            this.x = 0;
            /**
            * 表示位置 y
            */
            this.y = 0;
            this.container = this.getOrCreateTooltipContainer("timeline-tooltip-" + this.getUniqueText());
        }
        Tooltip.prototype.setPosition = function (x, y) {
            this.x = x;
            this.y = y;
            var margin = 15;
            this.container.style.left = this.x - (this.container.offsetWidth / 2) + "px";
            this.container.style.top = (this.y - (this.container.offsetHeight + margin) + "px");
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
        Tooltip.prototype.getUniqueText = function () {
            return new Date().getTime().toString(16) + Math.floor(5 * Math.random()).toString(16);
        };
        return Tooltip;
    }());
    //# sourceMappingURL=tooltip.js.map

    /**
     * Timeline Chart.
     *
     * (C) Sawada Makoto | MIT License
     */
    var TimelineChart = /** @class */ (function () {
        function TimelineChart(element, obj) {
            var _this = this;
            this.element = element;
            this.canvas = this.element.getContext("2d");
            this.tooltip = new Tooltip();
            this.config = new Config(obj.config);
            // generate time units.
            this.timeUnits = obj.data.map(function (unit) {
                return new TimeUnitElement(DateTimeHelper.parse(unit.startTime), DateTimeHelper.parse(unit.endTime), _this.oneMinuteWidth, unit.color, unit.label);
            });
            this.Initialize();
            // Attach Events.
            this.element.addEventListener("mousemove", function (ev) { return _this.onMouseMove(_this, ev); }, false);
            this.element.addEventListener("mouseout", function (ev) { return _this.onMouseOut(_this, ev); }, false);
        }
        Object.defineProperty(TimelineChart.prototype, "totalMinutes", {
            /**
             * 合計（分）
             */
            get: function () {
                return this.config.time.totalMinutes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineChart.prototype, "oneMinuteWidth", {
            /**
             * 1分当たりの幅
             */
            get: function () {
                return this.drawableWidth / this.totalMinutes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineChart.prototype, "elementWidth", {
            /**
             * Canvasの幅
             */
            get: function () {
                return this.element.clientWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineChart.prototype, "elementHeight", {
            /**
            * Canvasの高さ
            */
            get: function () {
                return this.element.clientHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineChart.prototype, "drawableWidth", {
            /**
             * 描画可能な幅
             * (ボーダー・パディングを除く)
             */
            get: function () {
                return this.elementWidth -
                    this.config.borderWidth -
                    (this.config.layout.padding.left + this.config.layout.padding.right);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineChart.prototype, "drawableHeight", {
            /**
             * 描画可能な高さ
             */
            get: function () {
                return this.elementHeight;
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
            var self = this;
            // Draw Time Units
            this.timeUnits.forEach(function (timeUnit, index) {
                // Guard If Zero Minutes.
                if (timeUnit.totalMinutes == 0) {
                    return;
                }
                var x = borderWidth;
                if (index > 0) {
                    var startMinutes = DateTime$1.between(startDateTime, timeUnit.startTime).minutes;
                    x = startMinutes * self.oneMinuteWidth;
                }
                var y = borderWidth;
                var height = self.drawableHeight - borderWidth * 2;
                var width = timeUnit.width;
                self.canvas.fillStyle = timeUnit.color;
                self.canvas.fillRect(x, y, width, height);
                if (labelConfig.showLabel) {
                    self.canvas.fillStyle = 'black';
                    self.canvas.font = labelConfig.fontSize + ' ' + labelConfig.fontFamily;
                    self.canvas.fillText(timeUnit.label, x, height / 2 + 5, width);
                }
            });
        };
        // #region Private Functions.
        TimelineChart.prototype.onMouseMove = function (sender, event) {
            var rect = this.element.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            var padding = this.config.layout.padding;
            var shouldShowTooltip = this.config.tooltip != null;
            var startDateTime = this.config.time.start;
            if (!shouldShowTooltip) {
                return;
            }
            // パディング範囲は無視
            // left, right, top, bottom
            if (x < padding.left
                || x > (this.drawableWidth - padding.right)
                || y < padding.top
                || y > (this.drawableHeight - padding.bottom)) {
                this.tooltip.hide();
                return;
            }
            for (var _i = 0, _a = this.timeUnits; _i < _a.length; _i++) {
                var unit = _a[_i];
                var offset = padding.left;
                var startMinutes = DateTime$1.between(startDateTime, unit.startTime).minutes;
                offset += startMinutes * this.oneMinuteWidth;
                if (x >= offset && x <= (offset + unit.width)) {
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
            var padding = this.config.layout.padding;
            // top and bottom
            this.canvas.strokeStyle = this.config.borderColor;
            this.canvas.lineWidth = this.config.borderWidth * 2;
            this.canvas.strokeRect(padding.left, padding.top, this.element.width - padding.y, this.element.height - padding.x);
        };
        /**
         * Draw Background.
         */
        TimelineChart.prototype.drawBackground = function () {
            var padding = this.config.layout.padding;
            this.canvas.fillStyle = this.config.backgroundColor;
            this.canvas.fillRect(this.config.layout.padding.left, this.config.layout.padding.top, this.drawableWidth, this.drawableHeight - padding.x);
        };
        return TimelineChart;
    }());

    return TimelineChart;

})));
