'use strict'
// const budgetTemplate = require('../templates/index-budget-template.handlebars')
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onCreateBudget = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log('data in create is ', data)
  api.createBudget(data)
    .then(ui.createBudgetSuccess)
    .then(refresh)
    .catch(ui.createBudgetFailure)
}

const onCreateFirstBudget = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createBudget(data)
    .then(data => api.showBudget(data))
    // .then((data) => // console.log(data))
    .then(ui.showBudgetSuccess)
    // .then(ui.createFirstBudgetSuccess)
}

const onIndexBudgets = function (event) {
  event.preventDefault()
  $('#budget-display').text('')
  api.indexBudgets()
    .then(ui.indexBudgetsSuccess)
    .catch(ui.indexBudgetsFailure)
}

const refresh = function (event) {
  api.indexBudgets()
    .then(ui.indexBudgetsSuccess)
}

const onShowBudget = function (event) {
  event.preventDefault()
  $('#budget-display').text('')
  const data = getFormFields(event.target)
  api.showBudget(data)
    .then(ui.showBudgetSuccess)
    // .catch(ui.showSurveyFailure)
}

const budgetRefresh = function (data) {
  // $('#budget-display').text('')
  api.showBudget(data)
    .then(ui.showBudgetSuccess)
}

const onUpdateBudget = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.updateBudget(data)
    .then(ui.updateBudgetSuccess)
    .then(() => budgetRefresh(data))
    .catch(ui.updateBudgetFailure)
}

const onDeleteBudget = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (confirm('Deleting budget will delete all expense. Continue?')) {
    api.deleteBudget(data)
      .then(ui.deleteBudgetSuccess)
      .then(refresh)
      .catch(ui.deleteBudgetFailure)
  }
}

const onAddFirstForm = function (event) {
  ui.addFirstForm()
}

// const calcIncome = function (event) {
//   event.preventDefault()
//   const value = parseInt($(this).serialize().split('=').pop())
//   console.log(value)
// }

const addHandlers = function () {
  $('.body-content').on('submit', '#create-budget', onCreateBudget)
  $('.body-content').on('submit', '#create-first-budget', onCreateFirstBudget)
  $('.body-content').on('submit', '#index-budgets', onIndexBudgets)
  $('.container').on('submit', '.show-budget', onShowBudget)
  $('.container').on('submit', '#update-budget', onUpdateBudget)
  $('.container').on('submit', '.delete-budget', onDeleteBudget)
  $('.container').on('click', '.backToBudgets', onIndexBudgets)
  $('.container').on('click', '.add-first-form', onAddFirstForm)
  $('.container').on('click', '.add-first-form', onAddFirstForm)
  // $('.container').on('submit', '#percentIncome', calcIncome)
}

module.exports = {
  addHandlers
}
