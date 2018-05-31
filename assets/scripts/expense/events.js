'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const budgetApi = require('../budget/api')
const budgetUi = require('../budget/ui')
const store = require('../store')

const onCreateExpense = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createExpense(data)
    // .then(api.indexExpenses)
    // .then(data => ui.indexExpensesSuccess)
    // .then(data => console.log(data))
    .then((data) => budgetApi.showBudget(data.expense))
    .then((data) => budgetUi.showBudgetSuccess(data))
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
  // console.log(data)
  store.budgetId = $(event.target).parent().data().id
  console.log(store.budgetId)
  api.deleteExpense(data)
    .then(ui.deleteExpenseSuccess)
    .then(budgetApi.showAfterDelete)
    // .then(data => console.log(data))
    .then(budgetUi.showBudgetSuccess)
    .catch(ui.deleteExpenseFailure)
}

const addHandlers = function () {
  $('.container').on('submit', '#create-expense', onCreateExpense)
  $('.container').on('submit', '#index-expenses', onIndexExpenses)
  $('.container').on('submit', '#show-expense', onShowExpense)
  $('.body-content').on('submit', '#update-expense', onUpdateExpense)
  $('.container').on('submit', '.delete-expense', onDeleteExpense)
}

module.exports = {
  addHandlers
}
