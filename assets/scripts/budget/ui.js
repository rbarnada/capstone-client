const budgetInfo = require('../templates/show-budget-template.handlebars')
const budgetTemplate = require('../templates/index-budget-template.handlebars')
const moment = require('moment')
moment().format()

// Used later for determining month given yyyy-mm-dd
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const createBudgetSuccess = function (data) {
  console.log('successful created budget')
  $('#status-message').text('Successfully created budget')
  $('#status-message').css('background-color', '#E0F0D9')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')

  console.log(data)
  // after creation of first budget, switch to budget manager view
  // if (data.budget.length === 0) {
  //   $('.body-content').append(newUserBudget)
  // } else {
  //   // $('#welcome').remove()
  //   // $('.budget').remove()
  //   // $('.body-content').append(budgetTemplate)
  // }

  return data
}

// const createFirstBudgetSuccess = function (data) {
//   console.log('data in first success is ', data)
//   $('#welcome').remove()
//   $('.body-content').append(budgetInfo)
// }

const createBudgetFailure = function (data) {
  console.log('Failed to create budget')
  $('#status-message').text('Month already has budget')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')
}

const indexBudgetsSuccess = function (data) {
  // console.log(data.budgets)

  // if (data.budgets.length === 0) {
  //   $('#budget-display').append(`
  //     <p> You have no budgets. Try creating one</p>
  //     `)
  // }
  $('#budget-display').text('')
  $('.budget').remove()
  $('#show-budget-info').remove()
  $('.body-content').append(budgetTemplate)
  data.budgets.forEach(function (budget) {
    // console.log('month is ', moment(budget.start_date).format('MMMM'))
    // Index display data
    // consider moving to handlebars
    $('#budget-display').append(`
      <div>
        <p>Month: ${moment(budget.start_date).format('MMMM YYYY')}</p>
        <p>Income: ${budget.income}</p>
        <p>Budget: ${budget.month_budget}</p>
        <form data-id="${budget.id}" class="show-budget">
          <input type="number" value="${budget.id}" name="budget[id]" hidden>
          <input type="submit" class="btn-default btn-xs" value="Details">
        </form>
      </div>
      <hr>
    `)
  })

  // let nextMonth = mm
  // const prependZero = function (month) {
  //   if (nextMonth < 10) {
  //     nextMonth = '0' + nextMonth
  //   }
  // }
  //
  // const addMonth = function (month) {
  //   nextMonth = month
  //   console.log(nextMonth)
  //   nextMonth = parseInt(nextMonth)
  //   nextMonth = nextMonth + 1
  //   prependZero(nextMonth)
  //   console.log(nextMonth)
  //   return nextMonth
  // }
  // $('form').trigger('reset')

  const today = new Date()
  let mm = today.getMonth() + 1

  if (mm < 10) {
    mm = '0' + mm
  }

  const findMonth = function (date) {
    const dateSplit = date.split('-')
    return dateSplit[1]
  }

  for (let i = 0; i < data.budgets.length; i++) {
    // console.log(data.budgets[i].start_date)
    if (findMonth(data.budgets[i].start_date) === mm) {
      console.log(data.budgets[i].start_date)
      console.log('Dates are equal')
      if (i === data.budgets.length - 1) {
        console.log('last item, prompt add item')
        $('#create-prompt').append(`
          <p>Notice: You do not have a budget set up for next month. Click <a class="add-form" href="#">here</a> to add one</p>
          `)
        return
      }
    } else {
      console.log('other item exists, no prompt')
    }
  }
  return data
}

const indexBudgetsFailure = function () {
  $('#status-message').text('Failed to retrieve budgets')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
  // $('form').trigger('reset')
}

const showBudgetSuccess = function (data) {
  console.log(data.budget.expenses)
  $('#welcome').remove()
  // Takes string date and split on dash to create array
  // Array values are strings, parseInt to make number
  // Use number - 1 to get correct month from monthNames array
  const getMonth = function (month) {
    const dateArr = month.split('-') // [2018, 02, 26]
    console.log(dateArr[1])
    const normalizedNum = parseInt(dateArr[1]) - 1
    return monthNames[normalizedNum]
  }
  const currentMonth = getMonth(data.budget.start_date)
  console.log(currentMonth)

  // calculates total money spent during current budget
  const findTotal = function () {
    const spentArr = []
    const findSum = function (total, num) {
      return total + num
    }
    data.budget.expenses.forEach(function (expense) {
      spentArr.push(expense.cost)
      // console.log(spentArr)
    })
    if (data.budget.expenses.length === 0) {
      return 0
    } else {
      findSum()
      return spentArr.reduce(findSum)
    }
  }
  const totalSpent = findTotal()
  console.log(totalSpent)

  const findEndDate = function (month) {
    const dateArr = month.split('-')
    dateArr.pop()
    const formattedDate = dateArr.join('-')
    console.log(formattedDate)
    const lastDay = moment(formattedDate, 'YYYY-MM').daysInMonth()
    const newDateArr = month.split('-')
    newDateArr[2] = lastDay
    const endDate = newDateArr.join('-')
    console.log(month)
    console.log(endDate)
    return endDate
  }
  // findEndDate(data.budget.start_date)

  const getBudgetInfo = budgetInfo({
    budget: data.budget,
    month: currentMonth,
    total: totalSpent,
    remainder: data.budget.month_budget - totalSpent,
    expense: data.budget.expenses,
    endDay: findEndDate(data.budget.start_date)
  })

  $('#show-budget-info').remove()
  $('.budget').remove()
  $('#budget-display').append(getBudgetInfo)
  // Show view with delete button
  // consider moving to handlebars
  // $('#budget-display').append(`
  //   <div>
  //     <h3>${getMonth(data.budget.start_date)} Budget</h3>
  //     <p>Income: ${data.budget.income}</p>
  //     <p>Budget: ${data.budget.month_budget}</p>
  //     <p>Total Spent: ${totalSpent()}</p>
  //     <p>Total Remaining: ${data.budget.month_budget - totalSpent()}
  //     <form data-id="${data.budget.id}" class="delete-budget">
  //       <input type="number" value="${data.budget.id}" name="budget[id]" hidden>
  //       <input type="submit" class="btn-default btn-xs" value="Delete Budget">
  //     </form>
  //   </div>
  // `)
  $('form').trigger('reset')

  // console.log(moment('2012-01', 'YYYY-MM').daysInMonth())
}

const showBudgetFailure = function () {
  $('#status-message').text('Failed to retrieve budget')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')
}

const updateBudgetSuccess = function (data) {
  $('.modal').modal('hide')
  $('#status-message').text('Budget Updated')
  $('#status-message').css('background-color', '#d5fdd5')
  setTimeout(() => $('#status-message').html(''), 2000)
  $('form').trigger('reset')
  // console.log(data)
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

  // $('#show-budget-info').remove()
  // $('.body-content').append(budgetTemplate)
  return data
}

const deleteBudgetFailure = function (data) {
  $('#status-message').text('Failed to delete budget')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')
}

const returnToBudgets = function () {
  $('#show-budget-info').remove()
  $('.body-content').append(budgetTemplate)
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
  deleteBudgetFailure,
  returnToBudgets
  // createFirstBudgetSuccess
}
