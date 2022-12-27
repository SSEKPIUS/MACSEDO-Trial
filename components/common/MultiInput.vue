<template>
  <div class=" border w-full rounded-md">
    <div class=" text-left font-medium my-2 px-4 capitalize">
      {{ header }}
    </div>
    <div class=" border rounded-md m-5">
      <div class="flex flex-row flex-wrap text-xs overflow-y-auto w-full">
        <div v-for="(email_, n) in emails" :key="n">
          <div class=" bg-gray-400 m-1 px-2 py-1 rounded-lg">
            <span> {{ email_.email }}</span>
            <span class=" bg-white px-1 ml-2 text-left align-middle rounded-sm font-bold hover:text-red-600" @click="splice(email_.email)">x</span>
          </div>
        </div>
      </div>
      <div class=" w-full flex flex-row py-2 px-2">
        <input
          v-model="new_mail"
          for="email"
          type="email"
          placeholder="Please enter your email here"
          required
          class=" mr-0 w-1/2 border"
        >
        <button class=" bg-black text-white ml-0 px-2" @click="appendMail()">
          ADD
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiInput',
  props: {
    value: {
      type: Array,
      required: true
    },
    header: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      emails: this.value,
      new_mail: null,
      // eslint-disable-next-line no-useless-escape
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.emails = val
      }
    }
  },
  methods: {
    appendMail () {
      if (!this.isEmailValid()) {
        this.$toast.error('Provide Proper Email Address')
        return
      }
      for (let i = 0; i < this.emails.length; i++) {
        if (this.emails[i].email == this.new_mail) {
          this.$toast.error('Email Exists ALready!')
          return
        }
      }
      this.emails.push({ email: this.new_mail })
      this.new_mail = null
    },
    isEmailValid () {
      return (this.new_mail == '') ? false : !!(this.reg.test(this.new_mail))
    },
    splice (email) {
      for (let i = 0; i < this.emails.length; i++) {
        if (this.emails[i].email == email) {
          this.emails.splice(i, 1)
          this.$emit('input', this.emails)
        }
      }
    }
  }

}
</script>
