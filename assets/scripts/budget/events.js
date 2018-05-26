'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onCreateBudget = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createBudget(data)
    .then(ui.createBudgetSuccess)
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
  api.showBudget(data.budget.id)
    .then(ui.showBudgetSuccess)
    // .catch(ui.showSurveyFailure)
}

const onUpdateBudget = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.updateBudget(data)
    .then(ui.updateBudgetSuccess)
    .catch(ui.updateBudgetFailure)
}

const onDeleteBudget = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.deleteBudget(data)
    .then(ui.deleteBudgetSuccess)
    .catch(ui.deleteBudgetFailure)
}

const addHandlers = function () {
  $('#create-budget').on('submit', onCreateBudget)
  $('#index-budgets').on('submit', onIndexBudgets)
  $('#show-budget').on('submit', onShowBudget)
  $('#update-budget').on('submit', onUpdateBudget)
  $('#delete-budget').on('submit', onDeleteBudget)
}

module.exports = {
  addHandlers
}
