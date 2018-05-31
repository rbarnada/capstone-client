'use strict'
const config = require('../config')
const store = require('../store')

const createExpense = function (data) {
  // console.log('api connected, data = ', data)
  return $.ajax({
    url: config.apiUrl + `/expenses`,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const indexExpenses = function () {
  // console.log('api connected')
  return $.ajax({
    url: config.apiUrl + `/expenses`,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showExpense = function (data) {
  // console.log(data)
  return $.ajax({
    url: config.apiUrl + '/expenses/' + data,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateExpense = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + `/expenses/` + store.expenseId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deleteExpense = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + `/expenses/` + data.expense.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  createExpense,
  indexExpenses,
  showExpense,
  deleteExpense,
  updateExpense
}
