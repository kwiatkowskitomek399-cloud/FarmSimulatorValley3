let GameApp;

window.addEventListener('DOMContentLoaded', () => {
    GameApp = {
        gameInstance: null,
        startNewGame: function() {
            this.gameInstance = new Game();
            this.gameInstance.start();
        },
        loadGame: function() {
            SaveSystem.load((data) => {
                if (data) {
                    this.startNewGame();
                } else {
                    alert('Brak zapisu gry!');
                }
            });
        },
        openShop: function() {
            document.getElementById('shop-modal').classList.remove('hidden');
        },
        closeShop: function() {
            document.getElementById('shop-modal').classList.add('hidden');
        },
        openGarage: function() {
            alert('Garaż: Posiadasz ciągnik rolniczy.');
        },
        triggerAction: function() {
            if (this.gameInstance) this.gameInstance.triggerAction();
        },
        switchCamera: function() {},
        vehicleGas: function(val) {
            if (this.gameInstance) this.gameInstance.vehicleGas(val);
        },
        vehicleBrake: function(val) {
            if (this.gameInstance) this.gameInstance.vehicleBrake(val);
        }
    };
});
