# expense-tracker-candidate-name

Expense Tracker

A simple web-based Expense Tracker built using HTML, CSS and JavaScript.

Features
  - Add income and expense transactions
  - Select transaction categories
  - Add amount, date, and description
  - View total income, total expenses, and current balance
  - Edit transactions
  - Delete transactions
  - Filter transactions by type and category
  - Store transactions using browser localStorage

Technologies Used
  * HTML5
  * CSS
  * JavaScript
  * Browser LocalStorage

How to Run
  1. Clone or download this repository.
  2. Open the project folder.
  3. Open index.html in a web browser.
     
  Using VS Code Live Server
    1. Open the project folder in Visual Studio Code.
    2. Install the Live Server extension if required.
    3. Right-click index.html.
    4. Select Open with Live Server.
    5. The application will open in your default browser.

How to Use

1. Add an Income
  * Select Income from the Type dropdown.
  * Select an income category such as Salary, Freelance, Business, Investment, Gift, or Other Income
  * Enter the amount.
  * Select the date.
  * Enter a description.
  * Click Add.
  * The transaction will appear in the Transaction History and the Total Income and Current Balance will be updated.
         
2. Add an Expense
  * Select Expense from the Type dropdown.
  * Select an expense category such as Food, Transportation, Shopping, Bills, Entertainment, Health, Education, or Others.
  * Enter the amount.
  * Select the date.
  * Enter a description.
  * Click Add.
  * The transaction will appear in the Transaction History and the Total Expense and Current Balance will be updated.
    
3. Edit a Transaction
  * Find the transaction in the Transaction History.
  * Click Edit.
  * The transaction details will be loaded into the form.
  * Make the required changes.
  * Click Add.
  * The transaction and summary will be updated.
    
4. Delete a Transaction
  * Find the transaction in the Transaction History.
  * Click Delete.
  * The selected transaction will be removed.
  * The income, expense, and balance totals will be recalculated.
  * 
5. Filter Transactions
  The application provides two filters:
      * Transaction Type: View all transactions, income only, or expenses only.
      * Category: View transactions belonging to a specific category.
  The summary values are also updated according to the selected filters.

Data Storage

* Transactions are stored in the browser's LocalStorage. This allows the transaction data to remain available when the page is refreshed in the same browser.
* Clearing browser LocalStorage or using the Delete Transactions option will remove the stored transaction data.

Repository
    GitHub: https://github.com/aparnamathew2002/expense-tracker-aparna-mathew.git
