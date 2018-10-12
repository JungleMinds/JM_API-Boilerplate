import { attributes } from 'structure'

const user = attributes({
  id: Number,
  name: {
    type: String,
    required: true
  }
})(
  class User {
    greet() {
      return `Hello ${this.name}`
    }
  }
)

export default user
