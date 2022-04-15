const incomeSection = document.querySelector('.income-area')
const expensesSection = document.querySelector('.expenses-area')
const availableMoney = document.querySelector('.available-money')
const addTransactionPanel = document.querySelector('.add-transaction-panel')

const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const categorySelect = document.querySelector('#category')

const addTransactionBtn = document.querySelector('.add-transaction')
const saveBtn = document.querySelector('.save')
const cancleBtn = document.querySelector('.cancel')
const deleteBtn = document.querySelector('.delete')
const deleteAllBtn = document.querySelector('.delete-all')

let root = document.documentElement
let ID = 0
let categoryIcon
let selectedCategory
let moneyArr = [0]

const showPanel = () => {
	addTransactionPanel.style.display = 'none'

	addTransactionPanel.style.display = 'flex'
}
const closePanel = () => {
	addTransactionPanel.style.display = 'none'
	clearInputs()
}

const checkForm = () => {
	if (nameInput.value === '' || amountInput.value === '' || categorySelect.value === 'none') {
		console.log(`eror`)
	} else {
		createNewTransaction()
	}
}

const clearInputs = () => {
	nameInput.value = ''
	amountInput.value = ''
	categorySelect.selectedIndex = 'none'
}

const createNewTransaction = () => {
	const newTransaction = document.createElement('div')
	newTransaction.classList.add('transaction')
	newTransaction.setAttribute('id', ID)

	checkCategory(selectedCategory)

	newTransaction.innerHTML = `
    <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
    <p class="transaction-amount">${amountInput.value}zł 
    <button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button>
    </p>
`

	amountInput.value > 0
		? incomeSection.appendChild(newTransaction) && newTransaction.classList.add('income')
		: expensesSection.appendChild(newTransaction) && expensesSection.classList.add('expense')

	moneyArr.push(amountInput.value * 1) //nie wiem czy bd dzialac jak nie to parseFloat(amountInput.value)
	countMoney(moneyArr)
	closePanel()
	ID++
	clearInputs()
}

const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text
}

const checkCategory = transaction => {
	switch (transaction) {
		case '[ + ] Przychód':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
			break
		case '[ - ] Zakupy':
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>'
			break
		case '[ - ] Jedzenie':
			categoryIcon = '<i class="fas fa-hamburger"></i>'
			break
		case '[ - ] Kino':
			categoryIcon = '<i class="fas fa-film"></i>'
			break
	}
}

const countMoney = money => {
	const newMoney = money.reduce((a, b) => a + b)
	availableMoney.textContent = `${newMoney}zł`
}

const deleteTransaction = id => {
	const transactionToDelete = document.getElementById(id)
	const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText)
	const indexOfTransaction = moneyArr.indexOf(transactionAmount)

	moneyArr.splice(indexOfTransaction, 1)

	transactionToDelete.classList.contains('income')
		? incomeSection.removeChild(transactionToDelete)
		: expensesSection.removeChild(transactionToDelete)

	countMoney(moneyArr)
}

saveBtn.addEventListener('click', checkForm)
cancleBtn.addEventListener('click', closePanel)
addTransactionBtn.addEventListener('click', showPanel)
