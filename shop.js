class Shop {
    constructor(economy) {
        this.economy = economy;
        this.items = [
            { name: 'Kultywator Bomet', price: 5000 },
            { name: 'Siewnik Poznaniak', price: 8000 }
        ];
    }

    buy(index) {
        const item = this.items[index];
        if (this.economy.removeMoney(item.price)) {
            alert(`Zakupiono: ${item.name}`);
        } else {
            alert('Brak wystarczających środków!');
        }
    }
}
