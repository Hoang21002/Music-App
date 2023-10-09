export class Account {
    id: string;
    password: string;
    balance: number;

    constructor(id: string, password: string, balance: number) {
        this.id = id;
        this.password = password;
        this.balance = balance;
    }
}