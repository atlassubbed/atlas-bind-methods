const { describe, it } = require("mocha")
const { expect } = require("chai")
const { Animal, Cat } = require("./helpers")
const bindMethods = require("../src/index")

const animalMethods = ["makeHappy", "makeSad"];
const catMethods = ["meow", "bite", "sharePhotoToReddit", "sharePhotoToFacebook"];

describe("bindMethods", function(){
  it("should return the instance", function(){
    const max = bindMethods(new Animal("mammal"));
    expect(max).to.be.an.instanceof(Animal)
  })
  it("should bind all prototype methods to the instance", function(){
    const max = bindMethods(new Animal("mammal"));
    animalMethods.forEach(m => {
      expect(max[m].name).to.equal(`bound ${m}`)
      const boundMethod = max[m];
      const prevHappiness = max.happiness;
      boundMethod()
      expect(prevHappiness).to.not.equal(max.happiness)
    })
  })
  it("should bind all prototype methods of a child class to the instance", function(){
    const felix = bindMethods(new Cat());
    catMethods.forEach(m => {
      expect(felix[m].name).to.equal(`bound ${m}`)
      const boundMethod = felix[m];
      const prevHappiness = felix.happiness;
      boundMethod()
      expect(prevHappiness).to.not.equal(felix.happiness)
    })
  })
  it("should not bind the constructor to the instance", function(){
    const max = bindMethods(new Animal("mammal"));
    expect(max.constructor).to.equal(Animal)
  })
  it("should not bind the constructor of a child class to the instance", function(){
    const felix = bindMethods(new Cat());
    expect(felix.constructor).to.equal(Cat)
  })
  it("should not bind parent class methods to the instance of a child class", function(){
    const felix = bindMethods(new Cat());
    animalMethods.forEach(m => {
      expect(felix[m].name).to.equal(m)
      const unboundMethod = felix[m];
      expect(unboundMethod).to.throw()
    })
  })
})
