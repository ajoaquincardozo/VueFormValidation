Vue.use(vuelidate.default)

// * Tip🃏: En caso de escalar, se extrae la validacion y se mueve a un archivo.
// * Se puede extrar del mismo modo, las validaciones definidas por vuelidate. 😃
const pizzaOrBurger = value => value === 'pizza' || value === 'burger' || !validators.helpers.req(value)
const oldEnoughAndAlive = validators.between(12, 120)

new Vue({
  el: "#app",

  data() {
    return {
      form: {
        name: null,
        age: null,
        food: null,
        newsletter: null
      }
    }
  },

  validations: {
    form: {
      name: {
        required: validators.required
      },

      age: {
        required: validators.required, // $v.form.age.required
        integer: validators.integer, // $v.form.age.integer
        oldEnoughAndAlive // $v.form.age.oldEnoughAndAlive
      },

      email: {
        email: validators.email,
        required: validators.requiredIf(function () {
          return !!this.form.newsletter // usar function, para usar this (ref al component)
        })
      },

      food: {
        pizzaOrBurger
      }
    }
  },

  computed: {
    nameIsValid() {
      return !!this.form.name
    },

    ageIsValid() {
      return typeof this.form.age === 'number' && this.form.age > 12 && this.form.age < 120
    },

    formIsValid() {
      return this.nameIsValid && this.ageIsValid
    }
  },

  methods: {
    // Helpers (Tip 🃏): Necesitan estar disponibles de forma global, en los componentes. Se puede exportar mediante un mixin o plugin.

    // field.$model: tiene el mismo valor, en el campo en data(). vuelidate observa $model y ejec. autom. touch()
    shouldAppendValidClass(field) {
      return !field.$invalid && field.$model && field.$dirty
    },

    shouldAppendErrorClass(field) {
      return field.$error
    },

    // Fin de helpers

    // * P/ que las validaciones sean trasparentes para el usuario, deben poder verse. Para ello usamos el metodo $touch.
    // * Es posible usarlo, a nivel de prop, form o globalmente (this.$v.form|this.$v.form.propName|this.$v).$touch() dentro del componente.
    submitForm() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        console.log('📄 Form submitted', this.form)
      } else {
        console.log('❌ Invalid form')
      }
    }
  }
})
