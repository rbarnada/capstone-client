const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const budgetApi = require('../budget/api')

const onSignUp = function (event) {
  // console.log('sign up working')
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .then(() => autoSignIn(data))
    .catch(ui.signUpFailure)
}

const autoSignIn = function (data) {
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignIn = function (event) {
  // console.log('sign in working')
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .then(budgetApi.indexBudgets)
    .then(ui.signInIndex)
    .catch(ui.signInFailure)
}

const onChangePass = function (event) {
  // console.log('change pass button pressed')
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePass(data)
    .then(ui.changePassSuccess)
    .catch(ui.changePassFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  // console.log('sign out pressed')
  const data = getFormFields(event.target)
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onAddForm = function (event) {
  ui.addForm()
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePass)
  $('#sign-out').on('submit', onSignOut)
  $('.container').on('click', '.add-form', onAddForm)
}

$('.modal').on('hidden.bs.modal', function (e) {
  $('input[type="email"], input[type="password"], textarea').val('')
})

module.exports = {
  addHandlers
}
