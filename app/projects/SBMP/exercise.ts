class Money {
    private balance: number;

    constructor(initialBalance: number = 0) {
        this.balance = initialBalance;
    }

    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited: ${amount}. New Balance: ${this.balance}`);
        } else {
            console.log("Deposit amount must be positive.");
        }
    }

    withdraw(amount: number): void {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrew: ${amount}. New Balance: ${this.balance}`);
        } else {
            console.log("Insufficient balance or invalid amount.");
        }
    }

    getBalance(): number {
        console.log(`Current Balance: ${this.balance}`);
        return this.balance;
    }
}

class CategoryScale {
    private transactions: { [category: string]: number };

    constructor() {
        this.transactions = {};
    }

    addTransaction(category: string, amount: number): void {
        if (this.transactions[category]) {
            this.transactions[category] += amount;
        } else {
            this.transactions[category] = amount;
        }
        console.log(`Added transaction in category '${category}': ${amount}`);
    }

    showTransactions(): void {
        console.log("Transaction Summary by Category:");
        for (const category in this.transactions) {
            console.log(`${category}: ${this.transactions[category]}`);
        }
    }
}

// Example usage
const myAccount = new Money(100);  // Starting balance
myAccount.deposit(50);
myAccount.withdraw(30);
myAccount.getBalance();

// Category Scale
const scale = new CategoryScale();
scale.addTransaction("Food", 20);
scale.addTransaction("Entertainment", 15);
scale.addTransaction("Food", 10);
scale.showTransactions();
