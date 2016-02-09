'use strict';

/**
 * Bootstraps LocalStorage with the imported / mapped Backbone instance.
 *
 * Exports the LocalStorage class.
 */

import Backbone      from 'backbone';
import LocalStorage  from './LocalStorage.js';
import Utils         from 'typhonjs-core-utils';

import localSync     from './localSync.js';

// Modify Backbone --------------------------------------------------------------------------------------------------

/**
 * Store the original sync function from Backbone.
 *
 * @type {function}
 */
Backbone.origSync = Backbone.sync;

/**
 * Returns the appropriate sync method given optional parameters requesting the default Backbone sync or if
 * the model / collection contains a valid localStorage instance the local sync method.
 *
 * @param {object}   model    - The model or collection instance to synchronize.
 * @param {object}   options  - Optional parameters
 * @returns {function}
 */
Backbone.getSyncMethod = (model, options) =>
{
   const forceOriginalSync = options && options.origSync;

   return !forceOriginalSync && (Utils.invokeOrValue(model, 'localStorage') || Utils.invokeOrValue(model.collection,
    'localStorage')) ? localSync : Backbone.origSync;
};

/**
 * Override 'Backbone.sync' to default to s_LOCAL_SYNC, the original 'Backbone.sync' is still available in
 * 'Backbone.origSync'.
 *
 * @param {string}   method   - A string that defines the synchronization action to perform.
 * @param {object}   model    - The model or collection instance to synchronize.
 * @param {object}   options  - Optional parameters
 * @returns {*}
 */
Backbone.sync = (method, model, options) =>
{
   return Backbone.getSyncMethod(model, options).apply(this, [method, model, options]);
};

/**
 * Store LocalStorage class in the instance of Backbone.
 *
 * @type {LocalStorage}
 */
Backbone.LocalStorage = LocalStorage;

/**
 * Exports the LocalStorage class.
 */
export default LocalStorage;