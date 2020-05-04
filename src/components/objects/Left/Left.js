import { Firestone, Frist, McCosh, Nassau } from 'objects';
import { Group } from 'three';

class Left extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position,
        };

        let firestone = new Firestone();
        firestone.position.set(-5, 0.5, 10);
        firestone.rotation.y = Math.PI;

        let frist = new Frist();
        frist.position.set(-6.5, 1, -10);
        frist.rotation.y = Math.PI;

        let mccosh = new McCosh();
        mccosh.position.set(-6.5, 1, -30);
        mccosh.rotation.y = -Math.PI / 2;

        let nassau = new Nassau();
        nassau.position.set(-6.5, 1, -50);
        nassau.rotation.y = -Math.PI / 2;

        this.add(firestone, frist, mccosh, nassau);
        parent.addToUpdateList(this);
    }

    update(timestamp) {
        const { cameraPosition } = this.state;

        this.position.z++;

        if (this.position.z > cameraPosition.z + 10) {
            this.position.z -= 60;
        }
    }
}

export default Left;
