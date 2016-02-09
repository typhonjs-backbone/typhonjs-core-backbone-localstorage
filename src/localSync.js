'use strict';

import Utils from 'typhonjs-core-utils';

/**
 * Delegates to the model or collection `localStorage` property which should be an instance of `BackboneLocalStorage`.
 *
 * @param {string}   method - Sync method name.
 * @param {object}   model - Model to sync.
 * @param {object}   options - Optional parameters.
 * @returns {Promise}
 */
export default function localSync(method, model, options)
{
   const store = Utils.invokeOrValue(model, 'localStorage') || Utils.invokeOrValue(model.collection, 'localStorage');

   let errorMessage, promise, resp;

   try
   {
      switch (method)
      {
         case 'read':
            resp = model.id !== null && typeof model.id !== 'undefined' ? store.find(model) : store.findAll();
            break;
         case 'create':
            resp = store.create(model);
            break;
         case 'update':
            resp = store.update(model);
            break;
         case 'delete':
            resp = store.destroy(model);
            break;
      }
   }
   catch (err)
   {
      errorMessage = err.code === 22 && store._storageSize() === 0 ? 'Private browsing is unsupported' : err.message;
   }

   if (resp)
   {
      if (options && options.success) { options.success(resp); }

      promise = Promise.resolve(resp);
   }
   else
   {
      errorMessage = errorMessage ? errorMessage : 'Record Not Found';

      if (options && options.error) { options.error(errorMessage); }

      promise = Promise.reject(errorMessage);
   }

   // Add compatibility with $.ajax always execute callback for success and error.
   if (options && options.complete) { options.complete(resp); }

   return promise;
}