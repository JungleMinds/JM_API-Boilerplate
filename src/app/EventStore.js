import EventEmitter from 'events'
const define = Object.defineProperty

class EventStore extends EventEmitter {
  static setOutputs(outputs) {
    define(this.prototype, 'outputs', {
      value: createOutputs(outputs)
    })
  }

  on(output, handler) {
    if (this.outputs[output]) {
      return this.addListener(output, handler)
    }

    throw new Error(
      `Invalid output "${output}" to EventStore ${this.constructor.name}.`
    )
  }
}

const createOutputs = outputsArray => {
  return outputsArray.reduce((obj, output) => {
    obj[output] = output
    return obj
  }, Object.create(null))
}

export default EventStore
