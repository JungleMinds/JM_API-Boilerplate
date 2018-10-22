import { attributes } from 'structure'

//Structure provides a simple interface which allows to add attributes
//to ES6 classes based on a schema, with validations and type coercion.

const User = attributes({
  id: String,
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

export default User
