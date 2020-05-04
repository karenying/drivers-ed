import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Road, Car, WoodyWoo } from 'objects';
import { BasicLights } from 'lights';

class Washington extends Scene {
    constructor(camera) {
        super();

        this.state = {
            gui: new Dat.GUI(),
            gameSpeed: 1,
            updateList: [],
        };

        this.camera = camera;
        this.background = new Color(0x7ec0ee);

        const colors = [
            new Color(0x5171ff),
            new Color(0x8c52ff),
            new Color(0xcb6be7),
            new Color(0xff66c5),
            new Color(0xff5757),
        ];

        const zPositions = [0, -20, -40, -60, -80];

        for (let i = 0; i < 5; i++) {
            const road = new Road(this, colors[i]);
            road.position.set(0, 0, zPositions[i]);
            this.add(road);
        }

        const car = new Car(this);

        const building = new WoodyWoo(this);

        const lights = new BasicLights();
        this.add(lights, car, building);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { updateList } = this.state;

        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default Washington;
