import { Scene, Color, MeshToonMaterial } from 'three';
import {
    Sidewalk,
    OvalStatue,
    Road,
    Car,
    Fine,
    WoodyWoo,
    Friend,
    Cap,
    Colonial,
    Firestone,
    Frist,
    McCosh,
    Nassau,
    Fox,
    Grass,
    Lamppost,
    Coin,
    MalePedestrianShorts,
    MalePedestrianJeans,
    FemalePedestrianDress,
    FemalePedestrianJeans,
    Tree,
    OtherCar,
    Coffee,
    Crosswalk,
<<<<<<< HEAD
=======
    Sun,
    Moon,
    Cloud,
    Star,
>>>>>>> c8a60866be0282c3be6c6136d7295dd5d53f2f45
    Bus
} from 'objects';
import { BasicLights } from 'lights';
import * as THREE from 'three';

let currColor = "#7ec0ee";
// crosswalkPositions
const crosswalkZPositions = [
  -420,
  -520,
  -620,
  -720,
  -820,
  -920,
  -1020,
  -1120
];

class Washington extends Scene {
    constructor(camera) {
        super();

        this.state = {
            updateList: [],
            pause: false,
            startTime: null,
            newGameStarted: false,
        };

        this.gameSpeed = 0;
        this.maxGameSpeed = 2.75; // 3
        this.minGameSpeed = 0.75; // 1
        this.accelerating = false;
        this.stopped = false;

        this.camera = camera;
        this.background = new Color(0x7ec0ee);
        this.edge = 12;
        this.collidableMeshList = []; // List of collidable meshes
        this.collidableCarList = []; // List of non-driver vehicles

        this.invincible = false;

        // for night mode
        this.night = 0;
        this.timeElapsed = -1;
        this.threshold = 10;

        // Add road
        const positions = [
            0,
            -90,
            -180,
        ];

        // lampPositions
        const lampPositions = [
            0,
            -40,
            -80,
            -120,
            -160,
            -200,
        ];

        // treePositions
        const treePositions = [
            10,
            -40,
            -90,
            -140,
            -190,
            -240,
        ];

        for (let i = 0; i < 3; i++) {
            const road = new Road(this);
            const leftSidewalk = new Sidewalk(this);
            const rightSidewalk = new Sidewalk(this);
            const grass = new Grass(this);
            road.position.set(0, 0, positions[i]);
            leftSidewalk.position.set(-4, 0, positions[i]);
            rightSidewalk.position.set(4, 0, positions[i]);
            grass.position.set(0, 0, positions[i]);
            this.add(road, grass, leftSidewalk, rightSidewalk);
        }

        // add some pedestrians walking down the sidewalk
        let abigail = new FemalePedestrianDress(this, 'abigail', false);
        abigail.rotation.y = 0;
        abigail.state.sidewalk = true;
        abigail.position.set(
            4,
            0.4,
            -20
        );
        this.add(abigail);
        this.collidableMeshList.push(abigail);

        let dan = new MalePedestrianShorts(this, 'dan', false);
        dan.rotation.y = 0;
        dan.state.sidewalk = true;
        dan.position.set(
            -4,
            0.4,
            -80
        );
        this.add(dan);
        this.collidableMeshList.push(dan);

        // add lamppost
        for (let i = 0; i < 6; i++) {
          const lamppostLeft = new Lamppost(this);
          const lamppostRight = new Lamppost(this);
          lamppostLeft.position.set(-5.6, 1.5, lampPositions[i]);
          lamppostRight.position.set(5.6, 1.5, lampPositions[i] + 20);
          this.add(lamppostLeft, lamppostRight);
        }

        // add some random trees
        for (let i = 0; i < 6; i++) {
            const rightTree = new Tree(this);
            const leftTree = new Tree(this);
            rightTree.state.type = Math.floor(Math.random() * 3);
            leftTree.state.type = Math.floor(Math.random() * 3);
            rightTree.create();
            leftTree.create();
            rightTree.position.set(7, 1.75, treePositions[i]);
            leftTree.position.set(-7, 1.75, treePositions[i] + 20);
            this.add(rightTree);
            this.add(leftTree);
        }

        // Add right buildings
        let fine = new Fine(this);
        let woodywoo = new WoodyWoo(this);
        let friend = new Friend(this);
        let cap = new Cap(this);
        let colonial = new Colonial(this);
        this.add(fine, woodywoo, friend, cap, colonial);

        // add some areas of trees
        let zOffset = 0;
        for (let r = 0; r < 6; r++) {
            let xOffset = 0;
            for (let i = 0; i < 6; i++) {
                const tree = new Tree(this);
                tree.state.type = Math.floor(Math.random() * 3);
                tree.state.offset = 200;
                tree.create();
                tree.position.set(12 + xOffset, 1.75, -170 + zOffset);
                xOffset += 3;
                this.add(tree);
            }
            zOffset += 4;
        }

        // Add left buildings
        let firestone = new Firestone(this);
        let frist = new Frist(this);
        let mccosh = new McCosh(this);
        let nassau = new Nassau(this);
        let ovalStatue = new OvalStatue(this);
        this.add(firestone, frist, mccosh, nassau, ovalStatue);

        const car = new Car(this);
        this.driver = car;

        // OBSTACLES
        // Add fox
        let fox = new Fox(this);
        fox.position.set(
          2 * Math.random() * this.edge - this.edge / 2,
          0.5,
          -(50 * Math.random() + 200)
        );
        this.add(fox);
        this.collidableMeshList.push(fox);

        // Add chad
        let chad = new MalePedestrianShorts(this, 'chad', false);
        chad.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -(50 * Math.random() + 50)
        );
        this.add(chad);
        this.collidableMeshList.push(chad);

        // Add vanessa
        let vanessa = new FemalePedestrianDress(this, 'vanessa', false);
        vanessa.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -(50 * Math.random() + 100)
            );
        this.collidableMeshList.push(vanessa);
        this.add(vanessa);

        // add labib
        let labib= new MalePedestrianJeans(this, 'labib', false);
        labib.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -(50 * Math.random() + 150)
            );
        this.collidableMeshList.push(labib);
        this.add(labib);

        // add maria
        let maria = new FemalePedestrianJeans(this, 'maria', false);
        maria.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -(100 * Math.random() + 100)
            );
        this.collidableMeshList.push(maria);
        this.add(maria);

        let max = new MalePedestrianJeans(this, 'max', false);
        max.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -(100 * Math.random() + 200)
            );
        this.collidableMeshList.push(max);
        this.add(max);

        // add cluster of students
        let crosswalk = new Crosswalk(this);
        this.crosswalkObject = crosswalk;
        this.add(crosswalk);
        this.currCrosswalkPos = crosswalkZPositions[Math.floor(Math.random() * 8)];
        crosswalk.position.z = this.currCrosswalkPos;
        crosswalk.position.y = 0.1;

        let crosswalkWidth = 8;
        let tom = new MalePedestrianShorts(this, 'tom', true);
        tom.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -1 * (crosswalkWidth * Math.random() + (Math.abs(crosswalk.position.z) - 0.5 * crosswalkWidth))
        );
        let jeff = new MalePedestrianShorts(this, 'jeff', true);
        jeff.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -1 * (crosswalkWidth * Math.random() + (Math.abs(crosswalk.position.z) - 0.5 * crosswalkWidth))
        );
        let claire = new FemalePedestrianDress(this, 'claire', true);
        claire.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -1 * (crosswalkWidth * Math.random() + (Math.abs(crosswalk.position.z) - 0.5 * crosswalkWidth))
        );
        let tina = new FemalePedestrianDress(this, 'tina', true);
        tina.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -1 * (crosswalkWidth * Math.random() + (Math.abs(crosswalk.position.z) - 0.5 * crosswalkWidth))
          );
        let matt = new MalePedestrianJeans(this, 'matt', true);
        matt.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -1 * (crosswalkWidth * Math.random() + (Math.abs(crosswalk.position.z) - 0.5 * crosswalkWidth))
        );
        let kaitlyn = new FemalePedestrianJeans(this, 'kaitlyn', true);
        kaitlyn.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -1 * (crosswalkWidth * Math.random() + (Math.abs(crosswalk.position.z) - 0.5 * crosswalkWidth))
        );
        let brittney = new FemalePedestrianJeans(this, 'brittney', true);
        brittney.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -1 * (crosswalkWidth * Math.random() + (Math.abs(crosswalk.position.z) - 0.5 * crosswalkWidth))
        );
        this.collidableMeshList.push(tom, jeff, claire, tina, matt, kaitlyn, brittney);
        this.add(tom, jeff, claire, tina, matt, kaitlyn, brittney);

        const lights = new BasicLights(this);
        this.add(lights, car);

        // Add some coins
        for (let i = 0; i < 12; i++) {
            var coin = new Coin(this);
            coin.position.set(
                2 * car.maxPos * Math.random() - 2.5,
                0,
                -(250 * Math.random())
            );
            this.add(coin);
            this.collidableMeshList.push(coin);
        }

        var coffee = new Coffee(this);
        coffee.position.set(
            2 * car.maxPos * Math.random() - 2.5,
            1,
            -(300 * Math.random() + 300)
        );
        this.add(coffee);

        this.collidableMeshList.push(coffee);

        // Add other cars
        var otherCar1 = new OtherCar(this, 0x3396ff);
        otherCar1.position.set(
          -1.5 + Math.random(),
          0,
          -(250 * Math.random())
        );
        otherCar1.rotation.set(0, Math.PI, 0);
        this.add(otherCar1);
        this.collidableCarList.push(otherCar1);
        this.collidableMeshList.push(otherCar1);

        var otherCar2 = new OtherCar(this, 0xffed16);
        otherCar2.position.set(
          -1.5 + Math.random(),
          0,
          -(250 * Math.random())
        );
        otherCar2.rotation.set(0, Math.PI, 0);
        this.add(otherCar2);
        this.collidableCarList.push(otherCar2);
        this.collidableMeshList.push(otherCar2);

        // Add a bus
        var bus = new Bus(this);
        bus.position.set(
          -1.5 + Math.random(),
          0,
          -(250 * Math.random())
        );
        bus.scale.set(0.18, 0.18, 0.18);
        this.add(bus);
        this.collidableCarList.push(bus);
        this.collidableMeshList.push(bus);

        // sky decor
        // add sun and moon
        let sun = new Sun(this);
        sun.position.set(30 * Math.cos(Math.PI/4), 30 * Math.sin(Math.PI/4), -80);
        sun.scale.set(0.01, 0.01, 0.01);
        this.add(sun);

        let moon = new Moon(this);
        moon.scale.set(0.4, 0.4, 0.4);
        moon.position.set(30 * Math.cos(-Math.PI/4), 30 * Math.sin(-Math.PI/4), -80);
        this.add(moon);

        // add some clouds to the sky
        let cloud1 = new Cloud(this);
        cloud1.position.set(0, 45, -140);
        cloud1.scale.set(1.5, 1.5, 1.5)
        let cloud2 = new Cloud(this);
        cloud2.position.set(-10, 20, -140);
        let cloud3 = new Cloud(this);
        cloud3.position.set(-40, 30, -140);
        cloud3.scale.set(2, 2, 2);
        let cloud4 = new Cloud(this);
        cloud4.position.set(40, 28, -140);
        cloud4.scale.set(2.5, 2.5, 2.5);
        let cloud5 = new Cloud(this);
        cloud5.position.set(60, 40, -140);
        cloud5.scale.set(1.5, 1.5, 1.5)
        let cloud6 = new Cloud(this);
        cloud6.position.set(-95, 20, -140);
        cloud6.scale.set(2.5, 2.5, 2.5)
        let cloud7 = new Cloud(this);
        cloud7.position.set(90, 30, -140);
        cloud7.scale.set(2, 2, 2)
        this.add(cloud1, cloud2, cloud3, cloud4, cloud5, cloud6, cloud7);

        // add some stars to the sky
        let starPosition = -50;
        let star1 = new Star(this);
        star1.position.set(0, 10, starPosition);
        let star2 = new Star(this);
        star2.position.set(-10, 25, starPosition);
        let star3 = new Star(this);
        star3.position.set(-20, 15, starPosition);
        let star4 = new Star(this);
        star4.position.set(-13, 17, starPosition);
        let star5 = new Star(this);
        star5.position.set(-25, 20, starPosition);
        let star6 = new Star(this);
        star6.position.set(-30, 13, starPosition);
        let star7 = new Star(this);
        star7.position.set(-5, 14, starPosition);
        let star8 = new Star(this);
        star8.position.set(2, 23, starPosition);
        let star9 = new Star(this);
        star9.position.set(10, 25, starPosition);
        let star10 = new Star(this);
        star10.position.set(20, 15, starPosition);
        let star11 = new Star(this);
        star11.position.set(13, 17, starPosition);
        let star12 = new Star(this);
        star12.position.set(25, 20, starPosition);
        let star13 = new Star(this);
        star13.position.set(30, 13, starPosition);
        let star14 = new Star(this);
        star14.position.set(5, 14, starPosition);
        let star15 = new Star(this);
        star15.position.set(7, 23, starPosition);
        let star16 = new Star(this);
        star16.position.set(-35, 20, starPosition);
        let star17 = new Star(this);
        star17.position.set(-40, 13, starPosition);
        let star18 = new Star(this);
        star18.position.set(-45, 14, starPosition);
        let star19 = new Star(this);
        star19.position.set(-33, 23, starPosition);
        let star20 = new Star(this);
        star20.position.set(35, 20, starPosition);
        let star21 = new Star(this);
        star21.position.set(40, 13, starPosition);
        let star22 = new Star(this);
        star22.position.set(45, 14, starPosition);
        let star23 = new Star(this);
        star23.position.set(33, 23, starPosition);
        let star24 = new Star(this);
        star24.position.set(35, 25, starPosition);

        this.add(star1, star2, star3, star4, star5, star6, star7, star8,
          star9, star10, star11, star12, star13, star14, star15,
          star16, star17, star18, star19, star20, star21, star22, star23,
          star24);
    }

    addToUpdateList(obj) {
      this.state.updateList.push(obj);
    }

    findCollisions(obj, collidableMeshList) {
        var thisBB = new THREE.Box3()
            .copy(obj.bb)
            .applyMatrix4(obj.matrixWorld);
        for (const mesh of collidableMeshList) {
            var thatBB = new THREE.Box3()
                .copy(mesh.bb)
                .applyMatrix4(mesh.matrixWorld);
            if (thisBB.intersectsBox(thatBB)) return mesh;
        }
        return undefined;
    }

    findOtherCollisions(obj, collidableMeshList) {
        var thisFBB = new THREE.Box3()
            .copy(obj.fbb)
            .applyMatrix4(obj.matrixWorld);
        for (const mesh of collidableMeshList) {
            var thatBB = new THREE.Box3()
                .copy(mesh.bb)
                .applyMatrix4(mesh.matrixWorld);
            if (thisFBB.intersectsBox(thatBB)) return mesh;
        }
        return undefined;
    }

    // blends 2 colors together with the given percent
    // https://stackoverflow.com/questions/3080421/javascript-color-gradient
    getGradientColor(start_color, end_color, percent) {
        // strip the leading # if it's there
        start_color = start_color.replace(/^\s*#|\s*$/g, '');
        end_color = end_color.replace(/^\s*#|\s*$/g, '');

        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if(start_color.length == 3){
          start_color = start_color.replace(/(.)/g, '$1$1');
        }

        if(end_color.length == 3){
          end_color = end_color.replace(/(.)/g, '$1$1');
        }

        // get colors
        var start_red = parseInt(start_color.substr(0, 2), 16),
            start_green = parseInt(start_color.substr(2, 2), 16),
            start_blue = parseInt(start_color.substr(4, 2), 16);

        var end_red = parseInt(end_color.substr(0, 2), 16),
            end_green = parseInt(end_color.substr(2, 2), 16),
            end_blue = parseInt(end_color.substr(4, 2), 16);

        // calculate new color
        var diff_red = end_red - start_red;
        var diff_green = end_green - start_green;
        var diff_blue = end_blue - start_blue;

        diff_red = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
        diff_green = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
        diff_blue = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];

        // ensure 2 digits by color
        if( diff_red.length == 1 ) diff_red = '0' + diff_red
        if( diff_green.length == 1 ) diff_green = '0' + diff_green
        if( diff_blue.length == 1 ) diff_blue = '0' + diff_blue

        return '#' + diff_red + diff_green + diff_blue;
    };

    update(timeStamp) {
        const { startTime, updateList, pause, newGameStarted } = this.state;

        if (this.stopped) {
          this.gameSpeed = Math.max(0, this.gameSpeed - 0.25);
        }

        if (!newGameStarted) {
            // car continues bobbling even when paused
            this.driver.bobble(timeStamp);
        }

        if (!pause && newGameStarted) {
          // accelerate or decelerate if appropriate
          if (this.accelerating)
            this.gameSpeed = Math.min(this.maxGameSpeed, this.gameSpeed + 0.05);
          else {
            if (!this.stopped) {
              // decelerate if slowing down from acceleration
              if (this.gameSpeed >= this.minGameSpeed)
                this.gameSpeed = Math.max(this.minGameSpeed, this.gameSpeed - 0.05);
              // accelerate if starting up from stopped state
              else this.gameSpeed = Math.min(this.maxGameSpeed, this.gameSpeed + 0.1);
            }
          }

          // night mode calculations
          // calculate start time on game start
          if (startTime == null) {
            this.state.startTime = Date.now() / 1000;
          } else {
            const currentTime = Date.now() / 1000;
            this.timeElapsed = currentTime - this.state.startTime;
          }

          if (this.timeElapsed >= this.threshold) {
            this.night = (this.night + 1) % 4;
            this.state.startTime= Date.now() / 1000;
            this.timeElapsed = 0;
          }

          if (this.night == 0) {
            this.background = new Color(0x7ec0ee);
            this.fog.color = new Color(0x7ec0ee);
          } else if (this.night == 1) {
            // dusk
            let newColor = this.getGradientColor('#7ec0ee', '#11223d', this.timeElapsed/this.threshold);
            if (newColor !== currColor) {
                currColor = newColor;
                this.background = new Color(currColor);
                this.fog.color = new Color(currColor);
            }
          } else if (this.night == 2) {
            this.background = new Color(0x11223d);
            this.fog.color = new Color(0x11223d);
          } else if (this.night == 3) {
            // daybreak
            let newColor = this.getGradientColor('#11223d', '#7ec0ee', this.timeElapsed/this.threshold);
            if (newColor !== currColor) {
                currColor = newColor;
                this.background = new Color(currColor);
                this.fog.color = new Color(currColor);
            }
          }

          for (const obj of updateList) {
            obj.update(timeStamp);
          }
        }

        if (pause && newGameStarted) {
          this.state.startTime = Date.now() / 1000 - this.timeElapsed;
        }
    }
}

export default Washington;
