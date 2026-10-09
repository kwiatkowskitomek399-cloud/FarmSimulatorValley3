class Tractor {
    constructor(scene) {
        this.scene = scene;
        this.speed = 0;
        this.maxSpeed = 15;

        const group = new THREE.Group();
        
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0xD32F2F, metalness: 0.5 });
        const chassis = new THREE.Mesh(new THREE.BoxGeometry(2, 1.5, 3.5), bodyMat);
        chassis.position.y = 1;
        group.add(chassis);

        const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.4, 1.8), new THREE.MeshStandardMaterial({ color: 0x333333, transparent: true, opacity: 0.7 }));
        cabin.position.set(0, 2.4, -0.2);
        group.add(cabin);

        this.mesh = group;
        this.mesh.position.set(0, 0, 10);
        this.scene.add(this.mesh);
    }

    accelerate(val) {
        this.speed = val * this.maxSpeed;
    }

    update(delta) {
        if (this.speed !== 0) {
            this.mesh.translateZ(this.speed * delta);
        }
    }
}
