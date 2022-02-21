import 'reflect-metadata';

const formatMetadataKey = Symbol('format');

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter {
  @format('Hello, %s')
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    const formatString = getFormat(this, 'greeting');
    return formatString.replace('%s', this.greeting);
  }
}

const greeter = new Greeter('james');
console.log(greeter.greet());
