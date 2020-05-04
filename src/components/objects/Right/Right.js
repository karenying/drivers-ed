import { Group } from 'three';
import { Fine, WoodyWoo, Friend, Cap, Colonial } from 'objects';

class Right extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position,
        };

        let fine = new Fine();
        fine.position.set(5, 3.5, 10);

        let woodywoo = new WoodyWoo();
        woodywoo.position.set(6.5, 1.5, -10);

        let friend = new Friend();
        friend.position.set(6.5, 0.7, -30);

        let cap = new Cap();
        cap.position.set(6.5, 1.5, -50);
        cap.rotation.y = Math.PI / 2;

        let colonial = new Colonial();
        colonial.position.set(5, 1, -70);
        colonial.rotation.y = Math.PI / 2;

        this.add(fine, woodywoo, friend, cap, colonial);
        parent.addToUpdateList(this);
    }

    update(timestamp) {
        const { cameraPosition } = this.state;

        // this.position.z++;

        if (this.position.z > cameraPosition.z + 10) {
            this.position.z -= 80;
        }
    }
}

export default Right;
