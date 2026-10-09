class MultiplayerSystem {
    constructor(gameInstance) {
        this.game = gameInstance;
        this.socket = null;
        this.isConnected = false;
        this.otherPlayers = {};
    }

    connect(serverUrl = "wss://echo.websocket.events") {
        // Domyślnie używamy testowego serwera echo WebSocket. 
        // W docelowej wersji podajesz adres swojego serwera Node.js / WebSocket.
        console.log("Łączenie z serwerem multiplayer...");
        
        try {
            this.socket = new WebSocket(serverUrl);

            this.socket.onopen = () => {
                this.isConnected = true;
                console.log("Połączono z serwerem multiplayer!");
                alert("Połączono z sesją online!");
            };

            this.socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.handleNetworkData(data);
            };

            this.socket.onclose = () => {
                this.isConnected = false;
                console.log("Rozłączono z serwerem.");
            };
        } catch (e) {
            console.error("Błąd połączenia multiplayer:", e);
            alert("Nie udało się połączyć z serwerem multiplayer.");
        }
    }

    sendPlayerState(position, rotation) {
        if (!this.isConnected || !this.socket) return;
        
        const payload = {
            type: "player_move",
            x: position.x,
            y: position.y,
            z: position.z,
            rot: rotation
        };
        
        this.socket.send(JSON.stringify(payload));
    }

    handleNetworkData(data) {
        // Obsługa nadchodzących pakietów od innych graczy
        if (data.type === "player_move") {
            // Tutaj aktualizujemy pozycję innych graczy na mapie 3D
            console.log(`Gracz ${data.id} zmienił pozycję.`);
        }
    }
}
