/* eslint-disable no-console */
export default function ({ app, req, store, redirect, route, context }) {
  const token = app.$cookies.get('x-access-token', { fromRes: true }) // get from res instead of req   // server side
  if (!token) {
    try {
      return redirect({ path: '/auth', query: { redirect: route.fullPath, message: 'Token Not Provided' } })
    } catch (error) {
      console.log(error)
    }
  }
  return Promise.resolve()
}
