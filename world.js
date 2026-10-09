class World {
    constructor(scene) {
        this.scene = scene;
        this.createEnvironment();
    }

    createEnvironment() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(50, 100, 50);
        this.scene.add(dirLight);

        const groundGeo = new THREE.PlaneGeometry(500, 500, 32, 32);
        const groundMat = new THREE.MeshStandardMaterial({ color: 0x3b5323, roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        this.scene.add(ground);

        const fieldGeo = new THREE.PlaneGeometry(60, 60);
        const fieldMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });
        const field = new THREE.Mesh(fieldGeo, fieldMat);
        field.rotation.x = -Math.PI / 2;
        field.position.set(0, 0.1, -80);
        this.scene.add(field);
    }
}
