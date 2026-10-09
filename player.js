class Player {
    constructor(scene) {
        this.scene = scene;
        const geom = new THREE.CapsuleGeometry(0.5, 1.5, 4, 8);
        const mat = new THREE.MeshStandardMaterial({ color: 0x1976D2 });
        this.mesh = new THREE.Mesh(geom, mat);
        this.mesh.position.set(0, 1, 0);
        this.scene.add(this.mesh);
    }

    update(controls, delta) {
        const speed = 5;
        this.mesh.position.x += controls.joystickData.x * speed * delta;
        this.mesh.position.z += controls.joystickData.y * speed * delta;
    }
}
