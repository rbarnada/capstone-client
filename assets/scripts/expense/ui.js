const createExpenseSuccess = function (data) {
  // console.log(data)
  $('#add-expense-modal').modal('hide')
  $('body').removeClass('modal-open')
  $('.modal-backdrop').remove()
  $('#status-message').text('Expense added')
  $('#status-message').css('background-color', '#E0F0D9')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')
}

const createExpenseFailure = function (data) {
  // console.log('Failed to add expense')
  $('#status-message').text('Failed to add expense')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')
}

const indexExpensesSuccess = function (data) {
  console.log(data.expenses)
  data.expenses.forEach(function (expense) {
    // if (data.expense.b)
    $('#expense-view').append(`
      <div>
        <p>ID: ${expense.id}</p>
        <p>Date: ${expense.date}</p>
        <p>Cost: $${expense.cost}</p>
        <p>Type: ${expense.expense_category}</p>
        <hr>
      </div>
      <hr>
    `)
  })
  // $('form').trigger('reset')
}

const indexExpensesFailure = function () {
  $('#status-message').text('Failed to retrieve expenses')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
  // $('form').trigger('reset')
}

const showExpenseSuccess = function (data) {
  $('#expense-display').append(`
    <div>
      <p>Date: ${data.expense.date}</p>
      <p>Cost: $${data.expense.cost}</p>
      <p>Type: ${data.expense.expense_category}</p>
    </div>
  `)
  $('form').trigger('reset')
}

const showExpenseFailure = function () {
  $('#status-message').text('Failed to retrieve expense')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')
}

const updateExpenseSuccess = function () {
  $('#status-message').text('Expense Updated')
  $('#status-message').css('background-color', '#d5fdd5')
  setTimeout(() => $('#status-message').html(''), 2000)
  $('form').trigger('reset')
}
const updateExpenseFailure = function (data) {
  $('#status-message').text('Failed to update expense')
  $('#status-message').css('background-color', '#ff6666')
  setTimeout(() => $('#status-message').html(''), 2000)
  $('form').trigger('reset')
}

const deleteExpenseSuccess = function (data) {
  $('#status-message').text('Expense deleted')
  $('#status-message').css('background-color', '#d5fdd5')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')
}

const deleteExpenseFailure = function (data) {
  $('#status-message').text('Failed to delete expense')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')
}

module.exports = {
  createExpenseSuccess,
  createExpenseFailure,
  indexExpensesSuccess,
  indexExpensesFailure,
  showExpenseSuccess,
  showExpenseFailure,
  updateExpenseSuccess,
  updateExpenseFailure,
  deleteExpenseSuccess,
  deleteExpenseFailure
}
