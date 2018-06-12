'use strict'
const store = require('../store')
const budgetTemplate = require('../templates/index-budget-template.handlebars')
const newUserBudget = require('../templates/create-first-budget.handlebars')
const createBudgetTemplate = require('../templates/create-new-budget.handlebars')
const moment = require('moment')
moment().format()

const signUpSuccess = function (data) {
  $('#up-message').text('Successfully signed up. Sign in to continue')
  $('#up-message').css('background-color', '#E0F0D9')
  setTimeout(() => $('#up-message').text(''), 3000)
  setTimeout(() => $('#up-message').css('background-color', 'white'), 3000)
  $('#sign-up-modal').modal('hide')
  $('form').trigger('reset')
}

const signUpFailure = function (data) {
  $('#up-message').text('Failure signing up')
  $('#up-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#up-message').text(''), 3000)
  setTimeout(() => $('#up-message').css('background-color', 'white'), 3000)
  $('form').trigger('reset')
}

const signInSuccess = function (data) {
  $('#status-message').text('Successfully signed in')
  $('#status-message').css('background-color', '#E0F0D9')
  setTimeout(() => $('#status-message').text(''), 3000)

  // stores token to be used for autheticating tasks
  store.user = data.user

  // Hides/shows auth buttons
  $('#start').modal('hide')
  $('#sign-in').addClass('hidden')
  $('#sign-up').addClass('hidden')
  $('.home-content').addClass('hidden')
  $('#change-password').removeClass('hidden')
  $('#sign-out').removeClass('hidden')
  $('#start-modal-button').addClass('hidden')
  $('.backToBudgets').removeClass('hidden')
  $('#change-password-modal-button').removeClass('hidden')

  // creates variable set for first day of following month
  // used when creating budget for next month
  // This may be unused currently as similar functionality exist below. TEST
  const today = new Date()
  const dd = '01'
  let mm = today.getMonth() + 1
  let followingMonth = today.getMonth() + 2
  const yyyy = today.getFullYear()

  if (mm < 10) {
    mm = '0' + mm
  }

  if (followingMonth < 10) {
    followingMonth = '0' + followingMonth
  }

  const firstDay = yyyy + '-' + mm + '-' + dd
  // const nextMonth = yyyy + '-' + followingMonth + '-' + dd
  // console.log('first day is ', firstDay)
  // console.log('first day next month ', nextMonth)

  const getNewUserBudget = newUserBudget({
    startDate: firstDay
  })

  // on sign in, if user has no budgets, load welcome screen to create
  // if user has budgets, send to budgets index
  if (data.user.budgets.length === 0) {
    $('.body-content').append(getNewUserBudget)
  } else {
    $('.body-content').append(budgetTemplate)
  }

  $('form').trigger('reset')
}

// THIS IS REPEATED IN BUDGET UI. FIND PROPER PLACE FOR IT
const signInIndex = function (data) {
  // if (data.budgets.length === 0) {
  //   $('#budget-display').append(`
  //     <p> You have no budgets. Try creating one</p>
  //     `)
  // }
  const sorted = data.budgets.sort(function compare (a, b) {
    const dateA = new Date(a.start_date)
    const dateB = new Date(b.start_date)
    return dateA - dateB
  })

  const today = new Date()
  let mm = today.getMonth() + 1

  if (mm < 10) {
    mm = '0' + mm
  }

  const findMonth = function (date) {
    const dateSplit = date.split('-')
    return dateSplit[1]
  }

  // checks to see if the current month's budget was deleted
  // if it was, prompt user to recreate
  const sortDates = function () {
    for (let i = 0; i < sorted.length; i++) {
      if (findMonth(sorted[i].start_date) === mm) {
        // console.log('true')
        return $('#create-prompt').empty()
      } else {
        // console.log('false')
        $('#create-prompt').empty()
        $('#create-prompt').append(`
          <p class='add-form-message'>Notice: You have deleted this month's budget. Click <a class="add-first-form" href="#">here</a> to add one</p>
        `)
      }
    }
  }
  sortDates()

  // Index display data
  // consider moving to handlebars
  sorted.forEach(function (budget) {
    $('#budget-display').append(`
      <div class="col-sm-4">
        <p><strong>Month:</strong> ${moment(budget.start_date).format('MMMM YYYY')}</p>
        <p><strong>Income:</strong> $${budget.income}</p>
        <p><strong>Budget:</strong> $${budget.month_budget}</p>
        <form data-id="${budget.id}" class="show-budget">
          <input type="number" value="${budget.id}" name="budget[id]" hidden>
          <input type="submit" class="btn-default btn-xs" value="Details">
        </form>
      </div>
    `)
  })

  // checks to see if budget exists for next month. If not, prompts user to create
  for (let i = 0; i < data.budgets.length; i++) {
    // console.log(data.budgets[i].start_date)
    if (findMonth(data.budgets[i].start_date) === mm) {
      // console.log('Dates are equal')
      if (i === data.budgets.length - 1) {
        // console.log('last item, prompt add item')
        $('#create-prompt').append(`
          <p class='add-form-message'>Notice: You do not have a budget set up for next month. Click <a class="add-form" href="#">here</a> to add one</p>
          `)
        return
      }
    } else {
      // console.log('other item exists, no prompt')
    }
  }
}

// creates variable for first of next month to be used when creating budget for that month
const addForm = function () {
  const thisDay = new Date()
  const dd = '01'
  let followingMonth = thisDay.getMonth() + 2
  const yyyy = thisDay.getFullYear()
  if (followingMonth < 10) {
    followingMonth = '0' + followingMonth
  }
  const nextMonth = yyyy + '-' + followingMonth + '-' + dd

  const getCreateNewBudget = createBudgetTemplate({
    startDate: nextMonth
  })

  $('.add-form-message').remove()
  $('#create-prompt').append(getCreateNewBudget)
}

const signInFailure = function (data) {
  $('#in-error-message').text('Incorrect Login. Try Again')
  $('#in-error-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#in-error-message').text(''), 3000)
  setTimeout(() => $('#in-error-message').css('background-color', 'white'), 3000)
  $('form').trigger('reset')
}

const changePassSuccess = function (data) {
  // console.log('successful signup')
  $('#status-message').text('Successfully changed password')
  $('#status-message').css('background-color', '#E0F0D9')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('.modal').modal('hide')
  $('form').trigger('reset')
}

const changePassFailure = function (data) {
  // console.log('signup failure')
  $('#pass-error-message').text('Failure changing password')
  $('#pass-error-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#pass-error-message').text(''), 3000)
  setTimeout(() => $('#pass-error-message').css('background-color', 'white'), 3000)
  $('form').trigger('reset')
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

  $('.budget').remove()
  $('.expense').remove()
  $('#show-budget-info').remove()
  $('#welcome').remove()
  $('#budget-display').text('')

  $('#sign-in').removeClass('hidden')
  $('#sign-up').removeClass('hidden')
  $('#change-password').addClass('hidden')
  $('#sign-out').addClass('hidden')
  $('#start-modal-button').removeClass('hidden')
  $('.home-content').removeClass('hidden')
  $('#change-password-modal-button').addClass('hidden')
  $('.backToBudgets').addClass('hidden')
  $('form').trigger('reset')
}

const signOutFailure = function (data) {
  // console.log('signup failure')
  $('#status-message').text('Failure signing out')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePassSuccess,
  changePassFailure,
  signOutSuccess,
  signOutFailure,
  signInIndex,
  addForm
}
