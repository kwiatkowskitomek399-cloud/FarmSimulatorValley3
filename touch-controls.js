class TouchControls {
    constructor() {
        this.joystickActive = false;
        this.joystickData = { x: 0, y: 0 };
        this.cameraDelta = { x: 0, y: 0 };
        this.initListeners();
    }

    initListeners() {
        const zone = document.getElementById('joystick-zone');
        
        zone.addEventListener('pointerdown', (e) => {
            this.joystickActive = true;
            this.updateJoystick(e);
        });

        window.addEventListener('pointermove', (e) => {
            if (this.joystickActive) {
                this.updateJoystick(e);
            } else if (e.clientX > window.innerWidth / 2) {
                this.cameraDelta.x = e.movementX || 0;
                this.cameraDelta.y = e.movementY || 0;
            }
        });

        window.addEventListener('pointerup', () => {
            this.joystickActive = false;
            this.joystickData = { x: 0, y: 0 };
            this.cameraDelta = { x: 0, y: 0 };
            const stick = document.getElementById('joystick-stick');
            stick.style.transform = `translate(0px, 0px)`;
        });
    }

    updateJoystick(e) {
        const rect = document.getElementById('joystick-zone').getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        let dx = e.clientX - centerX;
        let dy = e.clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 40;

        if (dist > maxDist) {
            dx = (dx / dist) * maxDist;
            dy = (dy / dist) * maxDist;
        }

        const stick = document.getElementById('joystick-stick');
        stick.style.transform = `translate(${dx}px, ${dy}px)`;

        this.joystickData.x = dx / maxDist;
        this.joystickData.y = dy / maxDist;
    }
}
