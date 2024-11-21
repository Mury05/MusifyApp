export function sendUser(params) {
  let currentUser = params
  currentUser.isAuthenticated = true
  sessionStorage.setItem('user', JSON.stringify(currentUser))
}

export function getUser() {
  let data = sessionStorage.getItem('user')
  return JSON.parse(data)
}

export function deleteUser() {
  sessionStorage.removeItem('user')
}
