export class Player {
    private _id: string;
    private _name: string;
    private _score: number;
    private _balance: number;
    private _isBot: boolean;
    private _isActive: boolean;
    private _isReady: boolean;
    private _isSpectator: boolean;
    private _isHost: boolean;
    private _hand: string[];

    constructor(
        id: string,
        name: string,
        balance: number = 1000,
        isBot: boolean = false,
        isHost: boolean = false
    ) {
        this._id = id;
        this._name = name;
        this._score = 0;
        this._balance = balance;
        this._isBot = isBot;
        this._isActive = true;
        this._isReady = false;
        this._isSpectator = false;
        this._isHost = isHost;
        this._hand = [];
    }

    get id(): string { return this._id; }
    get name(): string { return this._name; }
    get score(): number { return this._score; }
    get balance(): number { return this._balance; }
    get isBot(): boolean { return this._isBot; }
    get isActive(): boolean { return this._isActive; }
    get isReady(): boolean { return this._isReady; }
    get isSpectator(): boolean { return this._isSpectator; }
    get isHost(): boolean { return this._isHost; }
    get hand(): string[] { return this._hand; }

    addMoney(amount: number): void {
        this._balance += amount;
    }

    removeMoney(amount: number): boolean {
        if (this._balance >= amount) {
            this._balance -= amount;
            return true;
        }
        return false;
    }

    addToHand(card: string): void {
        this._hand.push(card);
    }

    clearHand(): void {
        this._hand = [];
    }

    setReady(isReady: boolean): void {
        this._isReady = isReady;
    }

    setActive(isActive: boolean): void {
        this._isActive = isActive;
    }

    setSpectator(isSpectator: boolean): void {
        this._isSpectator = isSpectator;
    }

    updateScore(points: number): void {
        this._score += points;
    }

    resetScore(): void {
        this._score = 0;
    }
}