'use strict'
const config = require('../config')
const store = require('../store')

const createBudget = function (data) {
  // console.log('api connected, data = ', data)
  return $.ajax({
    url: config.apiUrl + `/budgets`,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const indexBudgets = function () {
  // console.log('api connected')
  return $.ajax({
    url: config.apiUrl + `/budgets`,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showBudget = function (data) {
  // console.log(data)
  return $.ajax({
    url: config.apiUrl + '/budgets/' + data.budget.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showAfterDelete = function () {
  return $.ajax({
    url: config.apiUrl + '/budgets/' + store.budgetId,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateBudget = function (data) {
  // console.log(data)
  return $.ajax({
    url: config.apiUrl + `/budgets/` + data.budget.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deleteBudget = function (data) {
  // console.log(data)
  return $.ajax({
    url: config.apiUrl + `/budgets/` + data.budget.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  createBudget,
  indexBudgets,
  showBudget,
  updateBudget,
  deleteBudget,
  showAfterDelete
}
