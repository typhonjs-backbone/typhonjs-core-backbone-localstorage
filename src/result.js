'use strict';

/**
 * Invokes the property as a function if it exists or returns the result.
 *
 * @param {object}   object - Object to inspect.
 * @param {string}   property - Property / function name to invoke or return.
 * @returns {*}
 */
export default function result(object, property)
{
   if (typeof object !== 'object') { return void 0; }
   const value = object[property];
   return (typeof value === 'function') ? object[property]() : value;
}
