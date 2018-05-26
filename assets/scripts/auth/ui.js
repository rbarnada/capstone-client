'use strict'
const store = require('../store')

const signUpSuccess = function (data) {
  // console.log('successful signup')
  $('#up-message').text('Successfully signed up. Sign in to continue')
  $('#up-message').css('background-color', '#E0F0D9')
  setTimeout(() => $('#up-message').text(''), 3000)
  setTimeout(() => $('#up-message').css('background-color', 'white'), 3000)
  // console.log(data)
  $('#sign-up-modal').modal('hide')
}

const signUpFailure = function (data) {
  // console.log('signup failure')
  $('#up-message').text('Failure signing up')
  $('#up-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#up-message').text(''), 3000)
  setTimeout(() => $('#up-message').css('background-color', 'white'), 3000)
  // console.log(data.responseText)
}

const signInSuccess = function (data) {
  // console.log('successful signin')
  $('#status-message').text('Successfully signed in')
  $('#status-message').css('background-color', '#E0F0D9')
  setTimeout(() => $('#status-message').text(''), 3000)
  store.user = data.user
  $('#start').modal('hide')
  $('#sign-in').addClass('hidden')
  $('#sign-up').addClass('hidden')
  $('#change-password').removeClass('hidden')
  $('#sign-out').removeClass('hidden')
  $('#start-modal-button').addClass('hidden')
  $('#change-password-modal-button').removeClass('hidden')
}

const signInFailure = function (data) {
  $('#in-error-message').text('Incorrect Login. Try Again')
  $('#in-error-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#in-error-message').text(''), 3000)
  setTimeout(() => $('#in-error-message').css('background-color', 'white'), 3000)
}

const changePassSuccess = function (data) {
  // console.log('successful signup')
  $('#status-message').text('Successfully changed password')
  $('#status-message').css('background-color', '#E0F0D9')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('.modal').modal('hide')
}

const changePassFailure = function (data) {
  // console.log('signup failure')
  $('#pass-error-message').text('Failure changing password')
  $('#pass-error-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#pass-error-message').text(''), 3000)
  setTimeout(() => $('#pass-error-message').css('background-color', 'white'), 3000)
}

const signOutSuccess = function (data) {
  // console.log('successful signup')
  $('#status-message').text('Successfully signed out')
  $('#status-message').css('background-color', '#F5F5F5')
  $('#status-message').css('border', '2px solid #E1E1E8')
  setTimeout(() => $('#status-message').text(''), 3000)
  setTimeout(() => $('#status-message').css('border', 'none'), 3000)
  $('body').addClass('home')
  store.user = null

  $('#sign-in').removeClass('hidden')
  $('#sign-up').removeClass('hidden')
  $('#change-password').addClass('hidden')
  $('#sign-out').addClass('hidden')
  $('#start-modal-button').removeClass('hidden')
  $('#change-password-modal-button').addClass('hidden')
}

const signOutFailure = function (data) {
  // console.log('signup failure')
  $('#status-message').text('Failure signing out')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePassSuccess,
  changePassFailure,
  signOutSuccess,
  signOutFailure
}
