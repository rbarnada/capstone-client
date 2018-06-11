import Chart from 'chart.js'
const budgetInfo = require('../templates/show-budget-template.handlebars')
const budgetTemplate = require('../templates/index-budget-template.handlebars')
const createBudgetTemplate = require('../templates/create-new-budget.handlebars')
// const Chart = require('chart.js')
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
      <div class="col-md-4">
        <p><strong>Month:</strong> ${moment(budget.start_date).format('MMMM YYYY')}</p>
        <p><strong>Income:</strong> $${budget.income}</p>
        <p><strong>Budget:</strong> $${budget.month_budget}</p>
        <form data-id="${budget.id}" class="show-budget">
          <input type="number" value="${budget.id}" name="budget[id]" hidden>
          <input type="submit" class="btn-default btn-xs" value="Details">
        </form>
      </div>
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

  // attempting to add multiple budgets
  // console.log(parseInt(findMonth(data.budgets[data.budgets.length - 1].start_date)) + 1)
  // console.log(data.budgets[data.budgets.length - 1].start_date)
  //
  // const addMonth = function () {
  //   const lastBudgetDate = data.budgets[data.budgets.length - 1].start_date
  //   console.log(lastBudgetDate)
  //   const dd = '01'
  //   let mm = parseInt(findMonth(lastBudgetDate)) + 1
  //   const yyyy = lastBudgetDate.split('-')[0]
  //
  //   if (mm < 10) {
  //     mm = '0' + mm
  //   }
  //
  //   console.log(yyyy + '-' + mm + '-' + dd)
  //   return yyyy + '-' + mm + '-' + dd
  // }
  // addMonth()

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

  const expenseSort = data.budget.expenses.sort(function compare (a, b) {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateA - dateB
  })

  // console.log(expenseSort)

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

  // arrays to store expense costs in for graph
  const rentArr = []
  const utilArr = []
  const grocArr = []
  const autoArr = []
  const shopArr = []
  const dineArr = []
  const medArr = []
  const eduArr = []
  const otherArr = []

  // loops thru expenses and pushes cost values into corresponding array
  data.budget.expenses.forEach(function (expense) {
    const category = expense.expense_category
    if (category === 'Rent') rentArr.push(expense.cost)
    if (category === 'Utilities') utilArr.push(expense.cost)
    if (category === 'Groceries') grocArr.push(expense.cost)
    if (category === 'Auto/Transportation') autoArr.push(expense.cost)
    if (category === 'Shopping/Entertainment') shopArr.push(expense.cost)
    if (category === 'Restaurant/Dining') dineArr.push(expense.cost)
    if (category === 'Medical') medArr.push(expense.cost)
    if (category === 'Eduation') eduArr.push(expense.cost)
    if (category === 'Other') otherArr.push(expense.cost)
  })

  const sumArr = function (total, num) {
    return total + num
  }

  // totals each array and saves to variable to be passed in as graph data
  const rentTotal = rentArr.reduce(sumArr, 0)
  const utilTotal = utilArr.reduce(sumArr, 0)
  const grocTotal = grocArr.reduce(sumArr, 0)
  const autoTotal = autoArr.reduce(sumArr, 0)
  const shopTotal = shopArr.reduce(sumArr, 0)
  const dineTotal = dineArr.reduce(sumArr, 0)
  const medTotal = medArr.reduce(sumArr, 0)
  const eduTotal = eduArr.reduce(sumArr, 0)
  const otherTotal = otherArr.reduce(sumArr, 0)

  // graph
  const ctx = $('#myChart')
  if (data.budget.expenses.length > 0) {
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Rent', 'Utilities', 'Groceries', 'Auto/Transportation', 'Shopping/Entertainment', 'Restaurant/Dining', 'Medical', 'Education', 'Other'],
        datasets: [{
          label: 'Total Spent',
          data: [rentTotal, utilTotal, grocTotal, autoTotal, shopTotal, dineTotal, medTotal, eduTotal, otherTotal],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(159, 227, 221, 0.2)',
            'rgba(225, 15, 200, 0.2)',
            'rgba(108, 113, 117, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(159, 227, 221, 1)',
            'rgba(225, 15, 200, 1)',
            'rgba(108, 113, 117, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        // legend: {
        //   position: 'left'
        // },
        animation: {
          animateScale: false,
          animateRotate: true
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem, data) {
              return data['labels'][tooltipItem[0]['index']]
            },
            label: function (tooltipItem, data) {
              return '$' + data['datasets'][0]['data'][tooltipItem['index']]
            },
            afterLabel: function (tooltipItem, data) {
              const dataset = data.datasets[tooltipItem.datasetIndex]
              const total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue
              })
              const currentValue = dataset.data[tooltipItem.index]
              const precentage = Math.floor(((currentValue / total) * 100) + 0.5)
              return precentage + '%'
            }
          },
          displayColors: false
        }
      }
    })
  } else {
    ctx.remove()
  }
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
