const createBudgetSuccess = function (data) {
  console.log('successful created budget')
  $('#status-message').text('Successfully created budget')
  $('#status-message').css('background-color', '#E0F0D9')
  setTimeout(() => $('#status-message').text(''), 3000)
}

const createBudgetFailure = function (data) {
  console.log('Failed to create budget')
  $('#status-message').text('Could not create budget')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
}

const indexBudgetsSuccess = function (data) {
  console.log(data.budgets)
  data.budgets.forEach(function (budget) {
    $('#budget-display').append(`
      <div>
        <p>ID: ${budget.id}</p>
        <p>Income: ${budget.income}</p>
        <p>Budget: ${budget.month_budget}</p>
        <p>Start Date: ${budget.start_date}</p>
      </div>
      <hr>
    `)
  })
}

const indexBudgetsFailure = function () {
  $('#status-message').text('Failed to retrieve budgets')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
}

const showBudgetSuccess = function (data) {
  $('#budget-display').append(`
    <div>
      <p>Income: ${data.budget.income}</p>
      <p>Budget: ${data.budget.month_budget}</p>
      <p>Start Date: ${data.budget.start_date}</p>
    </div>
  `)
}

const showBudgetFailure = function () {
  $('#status-message').text('Failed to retrieve budget')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
}

const updateBudgetSuccess = function () {
  $('#status-message').text('Budget Updated')
  $('#status-message').css('background-color', '#d5fdd5')
  setTimeout(() => $('#status-message').html(''), 2000)
  $('form').trigger('reset')
}
const updateBudgetFailure = function (data) {
  $('#status-message').text('Failed to update budget')
  $('#status-message').css('background-color', '#ff6666')
  setTimeout(() => $('#status-message').html(''), 2000)
  $('form').trigger('reset')
}

const deleteBudgetSuccess = function (data) {
  $('#status-message').text('Budget deleted')
  $('#status-message').css('background-color', '#d5fdd5')
  setTimeout(() => $('#status-message').text(''), 3000)
}

const deleteBudgetFailure = function (data) {
  $('#status-message').text('Failed to delete budget')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
}
module.exports = {
  createBudgetSuccess,
  createBudgetFailure,
  indexBudgetsSuccess,
  indexBudgetsFailure,
  showBudgetSuccess,
  showBudgetFailure,
  updateBudgetSuccess,
  updateBudgetFailure,
  deleteBudgetSuccess,
  deleteBudgetFailure
}
