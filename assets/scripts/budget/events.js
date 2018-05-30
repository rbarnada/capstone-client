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
    .then(api.indexBudgets)
    .catch(ui.createBudgetFailure)
}

const onIndexBudgets = function (event) {
  event.preventDefault()
  $('#budget-display').text('')
  api.indexBudgets()
    .then(ui.indexBudgetsSuccess)
    .catch(ui.indexBudgetsFailure)
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
  api.deleteBudget(data)
    .then(ui.deleteBudgetSuccess)
    .catch(ui.deleteBudgetFailure)
}

const onBackBudgets = function (event) {
  event.preventDefault()
  // $('.body-content').append(budgetTemplate)
  ui.returnToBudgets()
}

const addHandlers = function () {
  $('.body-content').on('submit', '#create-budget', onCreateBudget)
  $('.body-content').on('submit', '#index-budgets', onIndexBudgets)
  $('.container').on('submit', '.show-budget', onShowBudget)
  $('.container').on('submit', '#update-budget', onUpdateBudget)
  $('.container').on('submit', '.delete-budget', onDeleteBudget)
  $('.container').on('click', '.backToBudgets', onBackBudgets)
}

module.exports = {
  addHandlers
}
