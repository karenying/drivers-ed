import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Road } from 'objects';
import { BasicLights } from 'lights';

class RoadScene extends Scene {
    constructor() {
        super();

        this.state = {
            gui: new Dat.GUI(),
            gameSpeed: 1,
            updateList: [],
        };

        this.background = new Color(0x7ec0ee);

        const road = new Road();
        const lights = new BasicLights();
        this.add(road, lights);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        this.position.z++;

        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default RoadScene;
