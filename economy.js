class Economy {
    constructor() {
        this.money = 15000;
    }

    addMoney(amount) {
        this.money += amount;
        this.updateHUD();
    }

    removeMoney(amount) {
        if (this.money >= amount) {
            this.money -= amount;
            this.updateHUD();
            return true;
        }
        return false;
    }

    updateHUD() {
        document.getElementById('hud-money').innerText = `PLN: ${this.money}`;
    }
}
