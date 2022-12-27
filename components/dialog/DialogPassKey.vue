<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class=" flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" />
        </svg>
        <h6 class=" text-center w-full">
          {{ head }}
        </h6>
      </div>
      <div>
        <p>{{ message }}</p>
      </div>
      <div>
        <div class=" border flex flex-wrap w-full mb-4 relative h-15 bg-white items-center rounded pr-10">
          <div class="flex -mr-px justify-center w-15">
            <span class="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd" /></svg></span>
          </div>
          <input v-model="feedmessage" type="text" :placeholder="placeholder" class="flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-8 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-sm outline-none">
        </div>
      </div>
      <button class=" hover:bg-green-500 bg-green-300 uppercase" @click="$emit('click-modal', fail, modalRoutine )">
        {{ cancel }}
      </button>
      <button class=" hover:bg-red-500 bg-red-300 uppercase" @click="$emit('click-modal', success, modalRoutine ,feedmessage); feedmessage=null">
        {{ ok }}
      </button>
    </div>
    <div class="close" @click="$emit('update:showmodal', false ); feedmessage=null">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 close-img text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    head: { type: String, required: false, default: 'Header' },
    message: { type: String, required: false, default: 'message' },
    modalRoutine: { type: String, required: false, default: '' },
    ok: { type: String, required: false, default: 'OK' },
    cancel: { type: String, required: false, default: 'cancel' },
    placeholder: { type: String, required: false, default: 'Reason For Cancelling' }
  },

  data () {
    return {
      success: true,
      fail: false,
      feedmessage: null
    }
  }
}
</script>
<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: max-content;
 width: max-content;
  margin-top: 10%;
  padding: 20px;
  border-radius: 20px;
}

.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 10px 0;
}

p {
  font-size: 16px;
  margin: 10px 0;
}

button {
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 20px;
}
</style>
