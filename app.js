Vue.use(vuelidate.default)

new Vue({
  el: "#app",

  data() {
    return {
      form: {
        name: null,
        age: null
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
        between: validators.between(12, 120) // $v.form.age.between
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
    submitForm() {
      if (!this.$v.form.$invalid) {
        console.log('📄 Form submitted', this.form)
      } else {
        console.log('❌ Invalid form')
      }
    }
  }
})
