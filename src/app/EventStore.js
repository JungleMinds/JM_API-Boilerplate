import EventEmitter from 'events'

class EventStore extends EventEmitter {
  constructor() {
    super()
    this.outputs = {}
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

export default EventStore
