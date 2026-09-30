let transactions = [];
let editingId = null;


/* CATEGORY LISTS */

const expenseCategories = [
    "Food",
    "Transportation",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Others"
];

const incomeCategories = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Gift",
    "Other Income"
];


/* LOAD FROM LOCAL STORAGE */

function loadTransactions() {

    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);
    } else {
        transactions = [];
    }
}


/* SAVE TO LOCAL STORAGE */

function saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}


/* LOAD FORM CATEGORIES */

function loadCategories() {

    const type = document.getElementById("type").value;
    const category = document.getElementById("category");
    category.innerHTML = "";
    let categories;
    if (type === "expense") {
        categories = expenseCategories;
    } else {
        categories = incomeCategories;
    }

    categories.forEach(function (item) {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        category.appendChild(option);
    });
}


/* SAVE / UPDATE TRANSACTION */

function saveTransaction() {
    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;
    const amountError = document.getElementById("amountError");
    const dateError = document.getElementById("dateError");
    const descError = document.getElementById("descError");


    /* Clear previous errors */

    amountError.textContent = "";
    dateError.textContent = "";
    descError.textContent = "";

    let valid = true;
    /* VALIDATION */
    if (amount === "" || Number(amount) <= 0) {
        amountError.textContent = "Please enter a valid amount.";
        valid = false;
    }
    if (date === "") {
        dateError.textContent = "Please select a date.";
        valid = false;
    }


    if (description.trim() === "") {
        descError.textContent = "Please enter a description.";
        valid = false;
    }


    if (!valid) {
        return;
    }

    /* UPDATE TRANSACTION */

    if (editingId !== null) {
        const transaction = transactions.find(function (item) {
            return item.id === editingId;
            });

        if (transaction) {
            transaction.type = type;
            transaction.amount = Number(amount);
            transaction.category = category;
            transaction.date = date;
            transaction.description = description.trim();
        }

        editingId = null;
        document.getElementById("saveBtn").textContent = "Add";
        document.getElementById("formTitle").textContent = "Add Transaction";
    }

/* ADD NEW TRANSACTION */

    else {
        const transaction = {
            id: Date.now(),
            type: type,
            amount: Number(amount),
            category: category,
            date: date,
            description: description.trim()
        };

        transactions.push(transaction);
    }

    /* Save to localStorage */
    saveToLocalStorage();

    /* Update page */

    clearForm();
    displayTransactions();
    updateSummary();
}


/* DISPLAY TRANSACTIONS */

function displayTransactions() {

    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = "";
    const typeFilter = document.getElementById("filterType").value;
    const categoryFilter = document.getElementById("filterCategory").value;
    const filteredTransactions = transactions.filter(function (transaction) {

        const typeMatch = typeFilter === "all" || transaction.type === typeFilter;
        const categoryMatch = categoryFilter === "all" || transaction.category === categoryFilter;
        return typeMatch && categoryMatch;
    });


    /* No transactions */

    if (filteredTransactions.length === 0) {
        transactionList.innerHTML = `
            <p style="text-align:center; color:#777;">
                No transactions found.
            </p>
        `;
       return;
    }

    /* Display transactions */

    filteredTransactions.forEach(function (transaction) {
        const div = document.createElement("div");
        div.className = "transaction-item";
        const sign = transaction.type === "income" ? "+" : "-";
        div.innerHTML = ` 
        <div class="transaction-details">
                <h3>${transaction.description}</h3>
                <p>${transaction.category} • ${transaction.date}</p>
            </div>

        <div class="transaction-right">
                <strong class="${transaction.type}">${sign} ₹${transaction.amount.toFixed(2)}</strong>
                <div class="actions">

                    <button onclick="editTransaction(${transaction.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
                </div>
                </div>
        `;

        transactionList.appendChild(div);
    });
}


/* DELETE TRANSACTION */

function deleteTransaction(id) {

    transactions = transactions.filter(function (transaction) {
        return transaction.id !== id;
    });


    /* If currently editing this transaction */

    if (editingId === id) {
        editingId = null;
        document.getElementById("saveBtn").textContent = "Add";
        document.getElementById("formTitle").textContent = "Add Transaction";
    }


    /* Save updated array */

    saveToLocalStorage();
    displayTransactions();
    updateSummary();

}


/* EDIT TRANSACTION */

function editTransaction(id) {
    const transaction = transactions.find(function (transaction) {
        return transaction.id === id;
    });
    if (!transaction) {
        return;
    }
    editingId = id;

/* Set type */

    document.getElementById("type").value = transaction.type;
    /* Load correct categories */
    loadCategories();
    /* Set existing category */
    document.getElementById("category").value = transaction.category;
    /* Set existing values */
    document.getElementById("amount").value = transaction.amount;
    document.getElementById("date").value = transaction.date;
    document.getElementById("description").value = transaction.description;
    /* Change button */
    document.getElementById("saveBtn").textContent = "Update";
    document.getElementById("formTitle").textContent = "Edit Transaction";
}


/* UPDATE SUMMARY */

function updateSummary() {

    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach(function (transaction) {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });


    const balance = totalIncome - totalExpense;
    document.getElementById("totalIncome").textContent = `₹${totalIncome.toFixed(2)}`;
    document.getElementById("totalExpense").textContent = `₹${totalExpense.toFixed(2)}`;
    document.getElementById("currentBalance").textContent = `₹${balance.toFixed(2)}`;
}


/* UPDATE CATEGORY FILTER */

function updateSummary() {

    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach(function(transaction) {
        if (transaction.type === "income") {
            totalIncome += Number(transaction.amount);
        } else if (transaction.type === "expense") {
            totalExpense += Number(transaction.amount);
        }
    });
    const balance = totalIncome - totalExpense;
    document.getElementById("totalIncome").textContent = `₹${totalIncome.toFixed(2)}`;
    document.getElementById("totalExpense").textContent = `₹${totalExpense.toFixed(2)}`;
    document.getElementById("currentBalance").textContent = `₹${balance.toFixed(2)}`;
}

/* FILTER TRANSACTIONS */

function filterTransactions() {
    displayTransactions();

}

/* CLEAR FORM */

function clearForm() {

    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
    document.getElementById("amountError").textContent = "";
    document.getElementById("dateError").textContent = "";
    document.getElementById("descError").textContent = "";
    document.getElementById("saveBtn").textContent = "Add";
    document.getElementById("formTitle").textContent = "Add Transaction";
}

/* INITIAL PAGE LOAD */

loadTransactions();
loadCategories();
displayTransactions();
updateSummary();