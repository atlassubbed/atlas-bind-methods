module.exports = inst => {
  const proto = inst.constructor.prototype;
  Object.getOwnPropertyNames(proto).forEach(m => {
    if (m === "constructor") return;
    inst[m] = inst[m].bind(inst);
  })
  return inst;
}
