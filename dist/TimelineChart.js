/*!
 * Timeline.js v0.1.2
 *
 * (c) 2019 Sawada Makoto.
 * Released under the MIT License
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.TimelineChart = factory());
}(this, (function () { 'use strict';

<<<<<<< Updated upstream
	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
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
	 * Layout.
	 */
	var LayoutConfig = /** @class */ (function () {
	    function LayoutConfig(layout) {
	        this.padding = (layout.padding != null
	            ? layout.padding
	            : new PaddingConfig(0, 0, 0, 0));
	    }
	    return LayoutConfig;
	}());
	var PaddingConfig = /** @class */ (function () {
	    function PaddingConfig(left, top, right, bottom) {
	        if (left === void 0) { left = 0; }
	        if (top === void 0) { top = 0; }
	        if (right === void 0) { right = 0; }
	        if (bottom === void 0) { bottom = 0; }
	        this.left = left;
	        this.top = top;
	        this.right = right;
	        this.bottom = bottom;
	    }
	    return PaddingConfig;
	}());
	//# sourceMappingURL=config-layout.js.map

	/**
	 * Config.
	 */
	var Config = /** @class */ (function () {
	    function Config(config) {
	        this.borderColor = config.borderColor || "#000";
	        this.backgroundColor = config.backgroundColor || "#fff";
	        this.data = config.data;
	        this.tooltip = config.tooltip;
	        this.layout = new LayoutConfig(config.layout != null ? config.layout : {});
	    }
	    return Config;
	}());
	//# sourceMappingURL=config.js.map

	/**
	 * Time Unit Element.
	 */
	var TimeUnitElement = /** @class */ (function () {
	    function TimeUnitElement(height, startTime, endTime, oneMinuteWidth, color, label, config) {
	        this.height = height;
	        this.startTime = startTime;
	        this.endTime = endTime;
	        this.oneMinuteWidth = oneMinuteWidth;
	        this.color = color;
	        this.label = label;
	        this.config = config;
	        this.height = height;
	        this.startTime = startTime;
	        this.endTime = endTime;
	        this.oneMinuteWidth = oneMinuteWidth;
	        this.color = color || "#fff";
	    }
	    Object.defineProperty(TimeUnitElement.prototype, "totalMinutes", {
	        get: function () {
	            return this.endTime.totalMinutes() - this.startTime.totalMinutes();
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
	    Object.defineProperty(TimeUnitElement.prototype, "x", {
	        get: function () {
	            var offset = this.startTime.totalMinutes() * this.oneMinuteWidth;
	            // 1px is border
	            return offset + 1 + this.config.layout.padding.left;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TimeUnitElement.prototype, "y", {
	        get: function () {
	            // 1px is border
	            return 1 + this.config.layout.padding.top;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TimeUnitElement.prototype.draw = function (canvas) {
	        canvas.fillStyle = this.color;
	        canvas.fillRect(this.x, this.y, this.width, this.height);
	    };
	    return TimeUnitElement;
	}());
	//# sourceMappingURL=time-unit.js.map

	var Tooltip = /** @class */ (function () {
	    function Tooltip() {
	        this.x = 0;
	        this.y = 0;
	        this.container = this.getOrCreateTooltipContainer("timeline-tooltip");
	    }
	    Tooltip.prototype.setPosition = function (x, y) {
	        this.x = x;
	        this.y = y;
	        this.container.style.left = this.x + "px";
	        this.container.style.top = this.y + "px";
	    };
	    Tooltip.prototype.show = function () {
	        this.container.innerHTML = this.text;
	        this.container.style.visibility = "visible";
	    };
	    Tooltip.prototype.hide = function () {
	        this.container.innerHTML = "";
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
	        document.getElementsByTagName("body")[0].appendChild(containerElement);
	        return containerElement;
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
	        // Set Without Border Px.
	        this.width =
	            this.element.width -
	                2 -
	                (this.config.layout.padding.left + this.config.layout.padding.right);
	        this.height =
	            this.element.height -
	                2 -
	                (this.config.layout.padding.top + this.config.layout.padding.bottom);
	        var oneMinuteWidth = this.width / (24 * 60);
	        this.timeUnits = obj.data.map(function (unit) {
	            var startTime = _this.getTimeSpanFromString(unit.startTime);
	            var endTime = _this.getTimeSpanFromString(unit.endTime);
	            return new TimeUnitElement(_this.height, startTime, endTime, oneMinuteWidth, unit.color, unit.label, _this.config);
	        });
	        this.init();
	        // Attach Events.
	        this.element.addEventListener("mousemove", function (ev) { return _this.onMouseMove(_this, ev); }, false);
	        this.element.addEventListener("mouseout", function (ev) { return _this.onMouseOut(_this, ev); }, false);
	    }
	    /**
	     * Initialize
	     */
	    TimelineChart.prototype.init = function () {
	        this.drawBorder();
	        this.drawBackground();
	    };
	    /**
	     * Draw.
	     */
	    TimelineChart.prototype.draw = function () {
	        for (var _i = 0, _a = this.timeUnits; _i < _a.length; _i++) {
	            var timeUnit = _a[_i];
	            timeUnit.draw(this.canvas);
	        }
	    };
	    // #region Private Functions.
	    TimelineChart.prototype.onMouseMove = function (sender, event) {
	        var rect = this.element.getBoundingClientRect();
	        var x = event.clientX - rect.left;
	        var y = event.clientY - rect.top;
	        var padLeft = function (text, padChar, size) {
	            return (String(padChar).repeat(size) + text).substr(size * -1, size);
	        };
	        var defaultTemplate = function (timeUnit) {
	            return "\u958B\u59CB\u6642\u9593: " + padLeft("" + timeUnit.startTime.hours, "0", 2) + ":" + padLeft("" + timeUnit.startTime.minutes, "0", 2) + " <br>\n              \u7D42\u4E86\u6642\u9593: " + padLeft("" + timeUnit.endTime.hours, "0", 2) + ":" + padLeft("" + timeUnit.endTime.minutes, "0", 2) + " <br>\n              \u30B9\u30C6\u30FC\u30BF\u30B9: " + timeUnit.label;
	        };
	        for (var _i = 0, _a = this.timeUnits; _i < _a.length; _i++) {
	            var timeUnit = _a[_i];
	            // ignore y axis.
	            // always y axis height is 100%.
	            if (timeUnit.x < x && timeUnit.x + timeUnit.width > x) {
	                this.tooltip.setPosition(event.clientX, event.clientY - 50);
	                this.tooltip.text =
	                    this.config.tooltip != null
	                        ? this.config.tooltip(timeUnit)
	                        : defaultTemplate(timeUnit);
	                this.tooltip.show();
	            }
	        }
	    };
	    TimelineChart.prototype.onMouseOut = function (sender, event) {
	        this.tooltip.hide();
	    };
	    /**
	     * Draw Border.
	     */
	    TimelineChart.prototype.drawBorder = function () {
	        this.canvas.strokeStyle = this.config.borderColor;
	        var paddingX = this.config.layout.padding.top + this.config.layout.padding.bottom;
	        var paddingY = this.config.layout.padding.left + this.config.layout.padding.right;
	        this.canvas.strokeRect(this.config.layout.padding.left, this.config.layout.padding.top, this.element.width - paddingY, this.element.height - paddingX);
	    };
	    /**
	     * Draw Background.
	     */
	    TimelineChart.prototype.drawBackground = function () {
	        this.canvas.fillStyle = this.config.backgroundColor;
	        this.canvas.fillRect(this.config.layout.padding.left + 1, this.config.layout.padding.top + 1, this.width, this.height);
	    };
	    /**
	     * Parse Time String.
	     * @param {string} time time ex) "00:00"
	     * @returns {TimeSpan} timespan
	     */
	    TimelineChart.prototype.getTimeSpanFromString = function (time) {
	        var timeArray = time.split(":");
	        var timeSpan$$1 = new timeSpan_1();
	        timeSpan$$1.addHours(parseInt(timeArray[0]));
	        timeSpan$$1.addMinutes(parseInt(timeArray[1]));
	        return timeSpan$$1;
	    };
	    return TimelineChart;
	}());
	//# sourceMappingURL=timeline-chart.js.map

	return TimelineChart;
=======
  /**
   * Layout.
   */
  var LayoutConfig = /** @class */ (function () {
      function LayoutConfig(layout) {
          this.padding = (layout.padding != null ? layout.padding : new PaddingConfig(0, 0, 0, 0));
      }
      return LayoutConfig;
  }());
  var PaddingConfig = /** @class */ (function () {
      function PaddingConfig(left, top, right, bottom) {
          if (left === void 0) { left = 0; }
          if (top === void 0) { top = 0; }
          if (right === void 0) { right = 0; }
          if (bottom === void 0) { bottom = 0; }
          this.left = left;
          this.top = top;
          this.right = right;
          this.bottom = bottom;
      }
      return PaddingConfig;
  }());
  //# sourceMappingURL=config-layout.js.map

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
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
   * TimeSpan Parser
   *
   * Convert string to TimeSpan.
   */
  var TimeSpanParser = /** @class */ (function () {
      function TimeSpanParser() {
      }
      /**
       * Parse
       * @param timeStr time
       */
      TimeSpanParser.parse = function (timeStr) {
          try {
              var timeArray = timeStr.split(":");
              var timeSpan$$1 = new timeSpan_1();
              timeSpan$$1.addHours(parseInt(timeArray[0]));
              timeSpan$$1.addMinutes(parseInt(timeArray[1]));
              return timeSpan$$1;
          }
          catch (_a) {
              return null;
          }
      };
      return TimeSpanParser;
  }());
  //# sourceMappingURL=timespan.js.map

  /**
   * Config.
   */
  var Config = /** @class */ (function () {
      function Config(config) {
          this.borderColor = config.borderColor || "#000";
          this.backgroundColor = config.backgroundColor || "#fff";
          this.data = config.data;
          this.tooltip = config.tooltip;
          this.offset = TimeSpanParser.parse(config.timeOffset || "00:00");
          this.layout = new LayoutConfig(config.layout != null ? config.layout : {});
      }
      return Config;
  }());
  //# sourceMappingURL=config.js.map

  /**
   * Time Unit Element.
   */
  var TimeUnitElement = /** @class */ (function () {
      function TimeUnitElement(height, startTime, endTime, oneMinuteWidth, color, label, config) {
          this.height = height;
          this.startTime = startTime;
          this.endTime = endTime;
          this.oneMinuteWidth = oneMinuteWidth;
          this.color = color;
          this.label = label;
          this.config = config;
          this.color = color || "#fff";
      }
      Object.defineProperty(TimeUnitElement.prototype, "totalMinutes", {
          get: function () {
              return this.endTime.totalMinutes() - this.startTime.totalMinutes();
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
      Object.defineProperty(TimeUnitElement.prototype, "x", {
          get: function () {
              var offset = this.config.offset.totalMinutes() -
                  this.startTime.totalMinutes() * this.oneMinuteWidth;
              // 1px is border
              return offset > 0 ? offset + 1 + this.config.layout.padding.left : 0;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(TimeUnitElement.prototype, "y", {
          get: function () {
              // 1px is border
              return 1 + this.config.layout.padding.top;
          },
          enumerable: true,
          configurable: true
      });
      TimeUnitElement.prototype.draw = function (canvas) {
          canvas.fillStyle = this.color;
          canvas.fillRect(this.x, this.y, this.width, this.height);
      };
      return TimeUnitElement;
  }());

  var Tooltip = /** @class */ (function () {
      function Tooltip() {
          this.x = 0;
          this.y = 0;
          this.container = this.getOrCreateTooltipContainer("timeline-tooltip");
      }
      Tooltip.prototype.setPosition = function (x, y) {
          this.x = x;
          this.y = y;
          this.container.style.left = this.x + "px";
          this.container.style.top = this.y + "px";
      };
      Tooltip.prototype.show = function () {
          this.container.innerHTML = this.text;
          this.container.style.visibility = 'visible';
      };
      Tooltip.prototype.hide = function () {
          this.container.innerHTML = '';
          this.container.style.visibility = 'collapse';
      };
      Tooltip.prototype.getOrCreateTooltipContainer = function (id) {
          var containerElement = document.getElementById(id);
          if (containerElement) {
              return containerElement;
          }
          containerElement = document.createElement("div");
          containerElement.id = id;
          containerElement.style.width = 'auto';
          containerElement.style.height = 'auto';
          containerElement.style.position = "absolute";
          containerElement.style.border = '1px solid #ccc';
          containerElement.style.background = '#fff';
          containerElement.style.visibility = 'collapse';
          containerElement.style.padding = '5px';
          document.getElementsByTagName('body')[0].appendChild(containerElement);
          return containerElement;
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
          // Set Without Border Px.
          this.width =
              this.element.width -
                  2 -
                  (this.config.layout.padding.left + this.config.layout.padding.right);
          this.height =
              this.element.height -
                  2 -
                  (this.config.layout.padding.top + this.config.layout.padding.bottom);
          // one minute width.
          var oneMinuteWidth = this.width / (24 * 60);
          // generate time units.
          this.timeUnits = obj.data.map(function (unit) {
              return new TimeUnitElement(_this.height, TimeSpanParser.parse(unit.startTime), TimeSpanParser.parse(unit.endTime), oneMinuteWidth, unit.color, unit.label, _this.config);
          });
          this.init();
          // Attach Events.
          this.element.addEventListener("mousemove", function (ev) { return _this.onMouseMove(_this, ev); }, false);
          this.element.addEventListener("mouseout", function (ev) { return _this.onMouseOut(_this, ev); }, false);
      }
      /**
       * Initialize
       */
      TimelineChart.prototype.init = function () {
          this.drawBorder();
          this.drawBackground();
      };
      /**
       * Draw.
       */
      TimelineChart.prototype.draw = function () {
          for (var _i = 0, _a = this.timeUnits; _i < _a.length; _i++) {
              var timeUnit = _a[_i];
              timeUnit.draw(this.canvas);
          }
      };
      // #region Private Functions.
      TimelineChart.prototype.onMouseMove = function (sender, event) {
          var rect = this.element.getBoundingClientRect();
          var x = event.clientX - rect.left;
          var y = event.clientY - rect.top;
          var padLeft = function (text, padChar, size) {
              return (String(padChar).repeat(size) + text).substr(size * -1, size);
          };
          var defaultTemplate = function (timeUnit) {
              return "\u958B\u59CB\u6642\u9593: " + padLeft("" + timeUnit.startTime.hours, "0", 2) + ":" + padLeft("" + timeUnit.startTime.minutes, "0", 2) + " <br>\n              \u7D42\u4E86\u6642\u9593: " + padLeft("" + timeUnit.endTime.hours, "0", 2) + ":" + padLeft("" + timeUnit.endTime.minutes, "0", 2) + " <br>\n              \u30B9\u30C6\u30FC\u30BF\u30B9: " + timeUnit.label;
          };
          for (var _i = 0, _a = this.timeUnits; _i < _a.length; _i++) {
              var timeUnit = _a[_i];
              // ignore y axis.
              // always y axis height is 100%.
              if (timeUnit.x < x && timeUnit.x + timeUnit.width > x) {
                  this.tooltip.setPosition(event.clientX, event.clientY - 50);
                  this.tooltip.text =
                      this.config.tooltip != null
                          ? this.config.tooltip(timeUnit)
                          : defaultTemplate(timeUnit);
                  this.tooltip.show();
              }
          }
      };
      TimelineChart.prototype.onMouseOut = function (sender, event) {
          this.tooltip.hide();
      };
      /**
       * Draw Border.
       */
      TimelineChart.prototype.drawBorder = function () {
          this.canvas.strokeStyle = this.config.borderColor;
          var paddingX = this.config.layout.padding.top + this.config.layout.padding.bottom;
          var paddingY = this.config.layout.padding.left + this.config.layout.padding.right;
          this.canvas.strokeRect(this.config.layout.padding.left, this.config.layout.padding.top, this.element.width - paddingY, this.element.height - paddingX);
      };
      /**
       * Draw Background.
       */
      TimelineChart.prototype.drawBackground = function () {
          this.canvas.fillStyle = this.config.backgroundColor;
          this.canvas.fillRect(this.config.layout.padding.left + 1, this.config.layout.padding.top + 1, this.width, this.height);
      };
      return TimelineChart;
  }());
  //# sourceMappingURL=timeline-chart.js.map

  return TimelineChart;
>>>>>>> Stashed changes

})));
