class Game {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.controls = new TouchControls();
        this.world = new World(this.scene);
        this.player = new Player(this.scene);
        this.tractor = new Tractor(this.scene);
        this.economy = new Economy();
        this.farming = new FarmingSystem();
        this.shop = new Shop(this.economy);

        this.inVehicle = false;
        this.clock = new THREE.Clock();
        this.initCamera();
    }

    initCamera() {
        this.camera.position.set(0, 5, 10);
    }

    start() {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('game-hud').classList.remove('hidden');
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        const delta = this.clock.getDelta();

        if (this.inVehicle) {
            this.tractor.update(delta);
            this.camera.position.copy(this.tractor.mesh.position).add(new THREE.Vector3(0, 4, -8));
            this.camera.lookAt(this.tractor.mesh.position);
        } else {
            this.player.update(this.controls, delta);
            this.camera.position.copy(this.player.mesh.position).add(new THREE.Vector3(0, 3, 6));
            this.camera.lookAt(this.player.mesh.position);

            if (this.player.mesh.position.distanceTo(this.tractor.mesh.position) < 3) {
                document.getElementById('btn-action').innerText = 'Wsiądź';
            } else {
                document.getElementById('btn-action').innerText = 'Akcja';
            }
        }

        this.renderer.render(this.scene, this.camera);
    }

    triggerAction() {
        if (!this.inVehicle && this.player.mesh.position.distanceTo(this.tractor.mesh.position) < 3) {
            this.inVehicle = true;
            this.player.mesh.visible = false;
            document.getElementById('vehicle-controls').classList.remove('hidden');
        } else if (this.inVehicle) {
            this.inVehicle = false;
            this.player.mesh.visible = true;
            this.player.mesh.position.copy(this.tractor.mesh.position).add(new THREE.Vector3(2, 0, 0));
            document.getElementById('vehicle-controls').classList.add('hidden');
        }
    }

    vehicleGas(val) {
        this.tractor.accelerate(val ? 1 : 0);
    }

    vehicleBrake(val) {
        this.tractor.accelerate(val ? -0.5 : 0);
    }
}
