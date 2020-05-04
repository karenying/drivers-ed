import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Road, Car, Fine, WoodyWoo, Friend, Cap, Colonial } from 'objects';
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

        // Add road
        const roadPositions = [0, -20, -40, -60, -80];

        for (let i = 0; i < 5; i++) {
            const road = new Road(this);
            road.position.set(0, 0, roadPositions[i]);
            this.add(road);
        }

        // Add right buildings
        /*
        let fine = new Fine(this);
        let woodywoo = new WoodyWoo(this);
        let friend = new Friend(this);
        let cap = new Cap(this);
        let colonial = new Colonial(this);
        this.add(fine, woodywoo, friend, cap, colonial); */

        const car = new Car(this);

        const lights = new BasicLights();
        this.add(lights, car);
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
