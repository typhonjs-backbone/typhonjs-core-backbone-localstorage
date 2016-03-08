![typhonjs-core-backbone-localstorage](http://i.imgur.com/De4CUnb.png)

[![Documentation](http://js.docs.typhonrt.org/typhonjs/typhonjs-core-backbone-localstorage/badge.svg)](http://js.docs.typhonrt.org/typhonjs/typhonjs-core-backbone-localstorage/)
[![Code Style](https://img.shields.io/badge/code%20style-allman-yellowgreen.svg?style=flat)](https://en.wikipedia.org/wiki/Indent_style#Allman_style)
[![License](https://img.shields.io/badge/license-MIT-yellowgreen.svg?style=flat)](https://github.com/typhonjs/typhonjs-core-backbone-localstorage/blob/master/LICENSE)

[![Build Status](https://travis-ci.org/typhonjs-backbone/typhonjs-core-backbone-localstorage.svg?branch=master)](https://travis-ci.org/typhonjs-backbone/typhonjs-core-backbone-localstorage)
[![Dependency Status](https://www.versioneye.com/user/projects/56b499c30a0ff5002c85f70f/badge.svg?style=flat)](https://www.versioneye.com/user/projects/56b499c30a0ff5002c85f70f)

An ES6 module to replace `Backbone.sync` with browser `localStorage`-based persistence. Models are given GUIDS
and saved into a JSON object. Please see 
[/dist](https://github.com/typhonjs/typhonjs-core-backbone-localstorage/tree/master/dist) for ES5 bundles for AMD, 
CJS, UMD and global consumption.

For the latest significant changes please see the [CHANGELOG](https://github.com/typhonjs/typhonjs-core-backbone-localstorage/blob/master/CHANGELOG.md).

API documentation can be found in the [/docs](https://github.com/typhonjs/typhonjs-core-backbone-localstorage/tree/master/docs) directory and [online here](http://js.docs.typhonrt.org/typhonjs/typhonjs-core-backbone-localstorage/).

## Usage

The recommended way to consume `typhonjs-core-backbone-localstorage` is via [JSPM](http://jspm.io/) / [SystemJS](https://github.com/systemjs/systemjs) via an ES6 project.

Please see this JSPM / SystemJS / ES6 demo: [backbone-es6-localstorage-todos](https://github.com/typhonjs-demos/backbone-es6-localstorage-todos)

In addition there is a desktop version using [Electron](http://electron.atom.io/) here:
[electron-backbone-es6-localstorage-todos](https://github.com/typhonjs-demos/electron-backbone-es6-localstorage-todos)

Create your ES6 collections like so using a getter for `localStorage`:

```javascript
const s_LOCAL_STORAGE = new Backbone.LocalStorage("SomeCollection"); // Unique name within your app.

export default class SomeCollection extends Backbone.Collection
{
   get localStorage() { return s_LOCAL_STORAGE; }

   get model() { return SomeModel; }

   // ... everything else is normal.
});
```

------

Global usage - Include the global ES6 bundle for Backbone.localStorage after having included Backbone.js:

```html
<script type="text/javascript" src="backbone.js"></script>
<script type="text/javascript" src="typhonjs-core-backbone-localstorage.js"></script>
```

Create your collections like so:

```javascript
window.SomeCollection = Backbone.Collection.extend({

   localStorage: new Backbone.LocalStorage("SomeCollection"), // Unique name within your app.

   // ... everything else is normal.

});
```

If needed, you can use the default `Backbone.sync` (instead of local storage) by passing the `origSync` option flag
to any Backbone function that takes optional parameters, for example:

```javascript
var myModel = new SomeModel();
myModel.fetch({ origSync: true });
myModel.save({ new: "value" }, { origSync: true });
```

Please see this global ES5 demo: [backbone-es6-localstorage-todos-global-es5](https://github.com/typhonjs-demos/backbone-es6-localstorage-todos-global-es5)

### RequireJS

Include [RequireJS](http://requirejs.org):

```html
<script type="text/javascript" src="lib/require.js"></script>
```

RequireJS config:
```javascript
require.config({
   paths: {
       jquery: "lib/jquery",
       underscore: "lib/underscore",
       backbone: "lib/backbone",
       localstorage: "lib/typhonjs-core-backbone-localstorage"
   }
});
```

Define your collection as a module:
```javascript
define("SomeCollection", ["localstorage"], function() {
   var SomeCollection = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("SomeCollection") // Unique name within your app.
   });

   return SomeCollection;
});
```

Require your collection:
```javascript
require(["SomeCollection"], function(SomeCollection) {
 // ready to use SomeCollection
});
```

Please see this RequireJS ES5 demo: [backbone-es6-localstorage-todos-requirejs-es5](https://github.com/typhonjs-demos/backbone-es6-localstorage-todos-requirejs-es5)

------

To suggest a feature or report a bug:
https://github.com/typhonjs/typhonjs-core-backbone-localstorage/issues

This code was forked and updated to ES6 from: 
[Backbone.localStorage](https://github.com/jeromegn/Backbone.localStorage)

Original author: [Jerome Gravel-Niquet](https://github.com/jeromegn) (many thanks!)

typhonjs-core-backbone-localstorage (c) 2016-present Michael Leahy, TyphonRT Inc. 

typhonjs-core-backbone-localstorage may be freely distributed under the MIT license.
