import * as Dat from 'dat.gui';
import { Fog, Scene, Color, MeshLambertMaterial} from 'three';
import { Land, Road, Gem, Coin, FemalePedestrianDress, MalePedestrianShorts, MalePedestrianJeans, FemalePedestrianJeans } from 'objects';
import { BasicLights } from 'lights';
import { Car } from '../objects';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0xa7ccd1);
        this.fog = new Fog(0xa7ccd1, 80, 500);

        // // Add meshes to scene
        // var mashaMaterials = {
        //     eye: new MeshLambertMaterial({
        //         color: 0x3b2606,
        //         flatShading: true
        //     }),
        //     hair: new MeshLambertMaterial({
        //         color: 0x000000,
        //         flatShading: true
        //     }),
        //     skin: new MeshLambertMaterial({
        //         color: 0xb48A78,
        //         flatShading: true
        //     }),
        //     dress: new MeshLambertMaterial({
        //         color: 0x7015d1,
        //         flatShading: true
        //     }),
        //     shoes: new MeshLambertMaterial({
        //         color: 0xd8d1e0,
        //         flatShading: true
        //     })
        // };
        // const masha = new FemalePedestrianDress(this, mashaMaterials);
        // masha.position.set(0, 0, 0);

        // var chadMaterials = {
        //     eye: new MeshLambertMaterial({
        //         color: 0x36699c,
        //         flatShading: true
        //     }),
        //     hair: new MeshLambertMaterial({
        //         color: 0xd1c569,
        //         flatShading: true
        //     }),
        //     skin: new MeshLambertMaterial({
        //         color: 0xb48A78,
        //         flatShading: true
        //     }),
        //     shorts: new MeshLambertMaterial({
        //         color: 0xed7490,
        //         flatShading: true
        //     }),
        //     shirt: new MeshLambertMaterial({
        //         color: 0x72afed,
        //         flatShading: true
        //     }),
        //     shoes: new MeshLambertMaterial({
        //         color: 0x3b2403,
        //         flatShading: true
        //     })
        // };
        // const chad = new MalePedestrianShorts(this, chadMaterials);
        // chad.position.set(5, 0, 0);

        // var labibMaterials = {
        //     eye: new MeshLambertMaterial({
        //         color: 0x291b06,
        //         flatShading: true
        //     }),
        //     hair: new MeshLambertMaterial({
        //         color: 0x000000,
        //         flatShading: true
        //     }),
        //     skin: new MeshLambertMaterial({
        //         color: 0x573502,
        //         flatShading: true
        //     }),
        //     jeans: new MeshLambertMaterial({
        //         color: 0x0d1459,
        //         flatShading: true
        //     }),
        //     shirt: new MeshLambertMaterial({
        //         color: 0x245734,
        //         flatShading: true
        //     }),
        //     shoes: new MeshLambertMaterial({
        //         color: 0x470722,
        //         flatShading: true
        //     })
        // };
        // const labib= new MalePedestrianJeans(this, labibMaterials);
        // labib.position.set(-5, 0, 0);

        // var mariaMaterials = {
        //     eye: new MeshLambertMaterial({
        //         color: 0x2d5432,
        //         flatShading: true
        //     }),
        //     hair: new MeshLambertMaterial({
        //         color: 0x4d3803,
        //         flatShading: true
        //     }),
        //     skin: new MeshLambertMaterial({
        //         color: 0x997446,
        //         flatShading: true
        //     }),
        //     jeans: new MeshLambertMaterial({
        //         color: 0x000000,
        //         flatShading: true
        //     }),
        //     shirt: new MeshLambertMaterial({
        //         color: 0xd61a39,
        //         flatShading: true
        //     }),
        //     shoes: new MeshLambertMaterial({
        //         color: 0x237066,
        //         flatShading: true
        //     })
        // };
        // const maria = new FemalePedestrianJeans(this, mariaMaterials);
        // maria.position.set(5, 0, 5);

        // var maxMaterials = {
        //     eye: new MeshLambertMaterial({
        //         color: 0x291b06,
        //         flatShading: true
        //     }),
        //     hair: new MeshLambertMaterial({
        //         color: 0x2e150f,
        //         flatShading: true
        //     }),
        //     skin: new MeshLambertMaterial({
        //         color: 0xb56e50,
        //         flatShading: true
        //     }),
        //     jeans: new MeshLambertMaterial({
        //         color: 0x635f61,
        //         flatShading: true
        //     }),
        //     shirt: new MeshLambertMaterial({
        //         color: 0xd65e9a,
        //         flatShading: true
        //     }),
        //     shoes: new MeshLambertMaterial({
        //         color: 0x000000,
        //         flatShading: true
        //     })
        // };
        // const max = new MalePedestrianJeans(this, maxMaterials);
        // max.position.set(-5, 0, 5);

        // var brittneyMaterials = {
        //     eye: new MeshLambertMaterial({
        //         color: 0x3b2606,
        //         flatShading: true
        //     }),
        //     hair: new MeshLambertMaterial({
        //         color: 0xd1b130,
        //         flatShading: true
        //     }),
        //     skin: new MeshLambertMaterial({
        //         color: 0xb48A78,
        //         flatShading: true
        //     }),
        //     dress: new MeshLambertMaterial({
        //         color: 0x41aba6,
        //         flatShading: true
        //     }),
        //     shoes: new MeshLambertMaterial({
        //         color: 0xd96541,
        //         flatShading: true
        //     })
        // };
        // const brittney = new FemalePedestrianDress(this, brittneyMaterials);
        // brittney.position.set(0, 0, 5);

        // var coin = new Coin(this);
        // coin.position.set(0, 0, 10);

        // var gem = new Gem(this);
        // gem.position.set(5, 0, 10);

        const lights = new BasicLights();

        var road = new Road();
        road.position.set(0, -1, 0);
        var car = new Car(this);
        car.position.set(-60, 0, 0);
        this.add(road, car, lights);
        // this.add(masha, 
        //         chad, 
        //         labib, 
        //         maria, 
        //         max,
        //         brittney,
        //         coin,
        //         gem,
        //         lights);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const {updateList} = this.state;
        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SeedScene;
