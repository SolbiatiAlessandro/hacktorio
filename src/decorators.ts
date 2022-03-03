// e.g. if decorates "onEvent" you can just add new events
// to the existing events on the parents
export function callAfterSuperCall(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  const _super = Object.getPrototypeOf(target);
  const originalFunction = descriptor.value;
  descriptor.value = function (...args: any[]): any {
    _super[originalFunction.name].bind(this)(...args);
    originalFunction.bind(this)(...args);
  };
}
