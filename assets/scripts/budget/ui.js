// const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December'
// ]

const createBudgetSuccess = function (data) {
  console.log('successful created budget')
  $('#status-message').text('Successfully created budget')
  $('#status-message').css('background-color', '#E0F0D9')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')
}

const createBudgetFailure = function (data) {
  console.log('Failed to create budget')
  $('#status-message').text('Could not create budget')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')
}

const indexBudgetsSuccess = function (data) {
  console.log(data.budgets)

  data.budgets.forEach(function (budget) {
    // console.log(monthNames[1].getMonth())
    $('#budget-display').append(`
      <div>
        <p>ID: ${budget.id}</p>
        <p>Income: ${budget.income}</p>
        <p>Budget: ${budget.month_budget}</p>
        <p>Start Date: ${budget.start_date}</p>
        <form data-id="${budget.id}" class="show-budget">
          <input type="number" value="${budget.id}" name="budget[id]" hidden>
          <input type="submit" class="btn-default btn-xs" value="Details">
        </form>
      </div>
      <hr>
    `)
  })
  // $('form').trigger('reset')
}

const indexBudgetsFailure = function () {
  $('#status-message').text('Failed to retrieve budgets')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
  // $('form').trigger('reset')
}

const showBudgetSuccess = function (data) {
  console.log(data.budget.expenses)

  const totalSpent = function () {
    const spentArr = []
    const findSum = function (total, num) {
      return total + num
    }
    data.budget.expenses.forEach(function (expense) {
      spentArr.push(expense.cost)
      console.log(spentArr)
    })
    if (data.budget.expenses.length === 0) {
      return 0
    } else {
      findSum()
      return spentArr.reduce(findSum)
    }
  }

  $('#budget-display').append(`
    <div>
      <h3>Budget For: ${data.budget.start_date}</h3>
      <p>Income: ${data.budget.income}</p>
      <p>Budget: ${data.budget.month_budget}</p>
      <p>Total Spent: ${totalSpent()}</p>
      <p>Total Remaining: ${data.budget.month_budget - totalSpent()}
      <form data-id="${data.budget.id}" class="delete-budget">
        <input type="number" value="${data.budget.id}" name="budget[id]" hidden>
        <input type="submit" class="btn-default btn-xs" value="Delete Budget">
      </form>
    </div>
  `)
  $('form').trigger('reset')
}

const showBudgetFailure = function () {
  $('#status-message').text('Failed to retrieve budget')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')
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
  $('form').trigger('reset')
}

const deleteBudgetFailure = function (data) {
  $('#status-message').text('Failed to delete budget')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')
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
