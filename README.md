# atlas-bind-methods

Binds an instance's prototype methods to itself.

[![Travis](https://img.shields.io/travis/atlassubbed/atlas-bind-methods.svg)](https://travis-ci.org/atlassubbed/atlas-bind-methods)

---

## install

```
npm install --save atlas-bind-methods
```

## why

Suppose you have a class which uses instance variables in its methods:

```javascript
// Animal.js
module.exports = class Animal {
  constructor(sound){
    this.sound = sound;
  }
  rawr(){
    console.log(this.sound)
  }
}
```

Normally, the following won't work:

```javascript
const Animal = require("./Animal");
const cat = new Animal("meow!");
const rawr = cat.rawr;
rawr(); // TypeError: Cannot read property 'sound' of undefined
```

It fails because the reference loses the method's context, but you already knew that! The fix is pretty simple -- just bind the function to the instance:

```javascript
...
const rawr = cat.rawr.bind(cat)
rawr() // meow!
```

But, this is kind of annoying when I have to do this for many methods. With this package, we can do all of the binding without cluttering our business logic.

## examples

#### inline

```javascript
const Animal = require("./Animal");
const bind = require("atlas-bind-methods");
const cat = bind(new Animal("meow!"));
const rawr = cat.rawr;
rawr() // meow!
```

#### as a side-effect

```javascript
...
const cat = new Animal("meow!");
bind(cat);
const rawr = cat.rawr;
rawr() // meow!
```

## caveats

This doesn't support subclassing, so it would only pre-bind the prototype methods of the direct constructor which is used to instantiate the object.
