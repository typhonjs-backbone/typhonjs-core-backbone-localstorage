# typhonjs-core-backbone-localstorage

A simple module to replace `Backbone.sync` with browser `localStorage`-based persistence. Models are given GUIDS
and saved into a JSON object.

## Usage

The recommended way to consume `typhonjs-core-backbone-localstorage` is via JSPM / SystemJS via an ES6 project.

Please see this JSPM / SystemJS / ES6 demo: [backbone-es6-localstorage-todos](https://github.com/typhonjs-demos/backbone-es6-localstorage-todos)

In addition there is a desktop version using [Electron](http://electron.atom.io/) here:
[electron-backbone-es6-localstorage-todos](https://github.com/typhonjs-demos/electron-backbone-es6-localstorage-todos)

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

This code was forked and updated to ES6 from: 
[Backbone.localStorage](https://github.com/jeromegn/Backbone.localStorage)

Original author: [Jerome Gravel-Niquet](https://github.com/jeromegn) (many thanks!)
