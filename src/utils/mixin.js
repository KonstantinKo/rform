export default function mixin(target, source) {
  const targetProto = target.prototype
  const sourceProto = source.prototype

  Object.getOwnPropertyNames(sourceProto).forEach(name => {
    if (name !== "constructor") {
      Object.defineProperty(
        targetProto, name, Object.getOwnPropertyDescriptor(sourceProto, name)
      )
    }
  })
}
