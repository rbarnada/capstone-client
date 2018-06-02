const budgetInfo = require('../templates/show-budget-template.handlebars')
const budgetTemplate = require('../templates/index-budget-template.handlebars')
const createBudgetTemplate = require('../templates/create-new-budget.handlebars')
const moment = require('moment')
moment().format()

// Used later for determining month given yyyy-mm-dd
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const createBudgetSuccess = function (data) {
  // console.log('successful created budget')
  $('#status-message').text('Successfully created budget')
  $('#status-message').css('background-color', '#E0F0D9')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')

  return data
}

const createBudgetFailure = function (data) {
  // console.log('Failed to create budget')
  $('#status-message').text('Month already has budget')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')
}

const indexBudgetsSuccess = function (data) {
  // console.log(data.budgets)

  $('#budget-display').text('')
  $('.budget').remove()
  $('#show-budget-info').remove()
  $('.body-content').append(budgetTemplate)

  const sorted = data.budgets.sort(function compare (a, b) {
    const dateA = new Date(a.start_date)
    const dateB = new Date(b.start_date)
    return dateA - dateB
  })
  // console.log(sorted)

  if (data.budgets.length === 0) {
    $('#create-prompt').append(`
<p class='add-form-message'>Notice: You have deleted your only budget. Click <a class="add-first-form" href="#">here</a> to add one</p>
      `)
  }

  const today = new Date()
  let mm = today.getMonth() + 1

  if (mm < 10) {
    mm = '0' + mm
  }

  const findMonth = function (date) {
    const dateSplit = date.split('-')
    return dateSplit[1]
  }
  // use this
  const sortDates = function () {
    for (let i = 0; i < sorted.length; i++) {
      if (findMonth(sorted[i].start_date) === mm) {
        // console.log('true')
        return $('#create-prompt').empty()
      } else {
        // console.log('false')
        $('#create-prompt').empty()
        $('#create-prompt').append(`
          <p class='add-form-message'>Notice: You have deleted this month's budget. Click <a class="add-first-form" href="#">here</a> to add one</p>
        `)
      }
    }
  }
  sortDates()

  sorted.forEach(function (budget) {
    // console.log('month is ', moment(budget.start_date).format('MMMM'))
    // Index display data
    // consider moving to handlebars

    $('#budget-display').append(`
      <div>
        <p><strong>Month:</strong> ${moment(budget.start_date).format('MMMM YYYY')}</p>
        <p><strong>Income:</strong> $${budget.income}</p>
        <p><strong>Budget:</strong> $${budget.month_budget}</p>
        <form data-id="${budget.id}" class="show-budget">
          <input type="number" value="${budget.id}" name="budget[id]" hidden>
          <input type="submit" class="btn-default btn-xs" value="Details">
        </form>
      </div>
      <hr>
    `)
  })

  // Check to see if a budget exists for the following month
  // This may need to be changed when additional months are added. Review after
  // adding functionality for more months
  for (let i = 0; i < data.budgets.length; i++) {
    // checks to see if the budget start date equals this month
    // if so, checks to see if that month is also the last one in the array
    // if it is last, prompt creation on budget for following month
    if (findMonth(data.budgets[i].start_date) === mm) {
      if (i === data.budgets.length - 1) {
        $('#create-prompt').append(`
          <p>Notice: You do not have a budget set up for next month. Click <a class="add-form" href="#">here</a> to add one</p>
          `)
        return
      }
    } else {
      // console.log('other item exists, no prompt')
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
  $('#welcome').remove()

  // Takes string date and split on dash to create array
  // Array values are strings, parseInt to make number
  // Use number - 1 to get correct month from monthNames array
  const getMonth = function (month) {
    const dateArr = month.split('-') // [2018, 02, 26]
    const normalizedNum = parseInt(dateArr[1]) - 1
    return monthNames[normalizedNum]
  }
  const currentMonth = getMonth(data.budget.start_date)

  // calculates total money spent during current budget
  const findTotal = function () {
    const spentArr = []
    const findSum = function (total, num) {
      return total + num
    }

    data.budget.expenses.forEach(function (expense) {
      spentArr.push(expense.cost)
    })

    if (data.budget.expenses.length === 0) {
      return 0
    } else {
      findSum()
      return spentArr.reduce(findSum)
    }
  }
  const totalSpent = findTotal()

  // Calculate end date by splitting date into array values and removing the day
  // Rejoins month and year, the use moment to find the total days in that given month
  // Takes date and split again and replaces the day value in the array with value obtained from moment
  const findEndDate = function (month) {
    const dateArr = month.split('-')
    dateArr.pop()
    const formattedDate = dateArr.join('-')
    const lastDay = moment(formattedDate, 'YYYY-MM').daysInMonth()
    const newDateArr = month.split('-')
    newDateArr[2] = lastDay
    const endDate = newDateArr.join('-')
    return endDate
  }

  // Values to pass to handlebars file for viewing single budget
  const getBudgetInfo = budgetInfo({
    budget: data.budget,
    month: currentMonth,
    total: totalSpent,
    remainder: data.budget.month_budget - totalSpent,
    expense: data.budget.expenses,
    endDay: findEndDate(data.budget.start_date)
  })

  // Removes index handlebar file and previous single budget content in case of refresh
  // Adds page content/refreshes if already on page
  $('#show-budget-info').remove()
  $('.budget').remove()
  $('#budget-display').append(getBudgetInfo)

  $('form').trigger('reset')
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

  // Needed to remove all modal backdrop elements after AJAX call
  $('form').trigger('reset')
  $('body').removeClass('modal-open')
  $('.modal-backdrop').remove()
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

  return data
}

const deleteBudgetFailure = function (data) {
  $('#status-message').text('Failed to delete budget')
  $('#status-message').css('background-color', '#F2DEDE')
  setTimeout(() => $('#status-message').text(''), 3000)
  $('form').trigger('reset')
}

// Used to return to index page from single budget view
const returnToBudgets = function () {
  $('#show-budget-info').remove()
  $('.body-content').append(budgetTemplate)
}

//
const addFirstForm = function () {
  const thisDay = new Date()
  const dd = '01'
  let mm = thisDay.getMonth() + 1
  const yyyy = thisDay.getFullYear()
  if (mm < 10) {
    mm = '0' + mm
  }
  const nextMonth = yyyy + '-' + mm + '-' + dd

  const getCreateNewBudget = createBudgetTemplate({
    startDate: nextMonth
  })

  $('.add-form-message').remove()
  $('#create-prompt').append(getCreateNewBudget)
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
  returnToBudgets,
  addFirstForm
}
