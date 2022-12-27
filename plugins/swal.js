import Swal from 'sweetalert2'

export default ({ app }, inject) => {
  inject('swal', Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  }))
}

/*
await this.$swal.fire({
title: 'Are you sure?',
html: `<form class="w-full">
          <div class="flex items-center mb-6">
              <div class="w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  Full Name
                </label>
              </div>
              <div class="w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="inline-full-name" type="text" value="Jane Doe">
              </div>
            </div>
            <div class="flex items-center mb-6">
              <div class="w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                  Password
                </label>
              </div>
              <div class="w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="inline-password" type="password" placeholder="******************">
              </div>
            </div>
          </form>`,
text: "You won't be able to revert this!",
icon: 'warning',
showCancelButton: true,
confirmButtonText: 'Yes, delete it!',
cancelButtonText: 'No, cancel!',
reverseButtons: true,
showLoaderOnConfirm: true,
preConfirm: (login) => {
  return fetch(`//api.github.com/users/${login}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .catch((error) => {
      this.$swal.showValidationMessage(
`Request failed: ${error}`
      )
    })
},
allowOutsideClick: () => !this.$swal.isLoading()
}).then((result) => {
if (result.isConfirmed) {
  this.$swal.fire(
    'Deleted!',
    'Your file has been deleted.',
    'success'
  )
} else if (
// Read more about handling dismissals below
  result.dismiss === this.$swal.DismissReason.cancel
) {
  this.$swal.fire(
    'Cancelled',
    'Your imaginary file is safe :)',
    'error'
  )
}
})
*/
