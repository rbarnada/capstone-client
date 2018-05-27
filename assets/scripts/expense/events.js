'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onCreateExpense = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createExpense(data)
    .then(ui.createExpenseSuccess)
    .catch(ui.createExpenseFailure)
}

const onIndexExpenses = function (event) {
  event.preventDefault()
  $('#expense-display').text('')
  api.indexExpenses()
    .then(ui.indexExpensesSuccess)
    .catch(ui.indexExpensesFailure)
}

const onShowExpense = function (event) {
  event.preventDefault()
  $('#expense-display').text('')
  const data = getFormFields(event.target)
  api.showExpense(data.expense.id)
    .then(ui.showExpenseSuccess)
    .catch(ui.showExpenseFailure)
}

const onUpdateExpense = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.updateExpense(data)
    .then(ui.updateExpenseSuccess)
    .catch(ui.updateExpenseFailure)
}

const onDeleteExpense = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.deleteExpense(data)
    .then(ui.deleteExpenseSuccess)
    .catch(ui.deleteExpenseFailure)
}

const addHandlers = function () {
  $('.body-content').on('submit', '#create-expense', onCreateExpense)
  $('.body-content').on('submit', '#index-expenses', onIndexExpenses)
  $('.body-content').on('submit', '#show-expense', onShowExpense)
  $('.body-content').on('submit', '#update-expense', onUpdateExpense)
  $('.body-content').on('submit', '#delete-expense', onDeleteExpense)
}

module.exports = {
  addHandlers
}
