class Animal {
  constructor(type, happiness=70){
    this.type = type;
    this.happiness = happiness;
  }
  makeHappy(amt=1){
    this.happiness += amt
  }
  makeSad(amt=1){
    this.happiness -= amt
  }
}

class Cat extends Animal {
  constructor(){
    super("dark", 100);
    this.photoWentViral = false;
  }
  sharePhotoToReddit(){
    this.makeHappy(10)
    this.photoWentViral = true;
  }
  sharePhotoToFacebook(){
    this.makeSad(9001)
    this.photoWentViral = false;
  }
  meow(){
    this.makeHappy();
  }
  bite(){
    this.makeSad();
  }
}

module.exports = { Animal, Cat }
