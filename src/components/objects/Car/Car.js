import * as THREE from 'three';
import {
    Group,
    Mesh,
    MeshToonMaterial,
    PlaneGeometry,
    BoxGeometry,
    DoubleSide,
    CircleGeometry,
    SpotLight,
    CylinderGeometry,
    AxesHelper,
} from 'three';

var Colors = {
    red: 0xcf4f48,
    black: 0x211f1f,
    gray: 0x83939c,
    yellow: 0xf7ee6d,
    darkyellow: 0xff8617,
    gray1: 0x5c6061,
};

function createCylinder(x, y, z, s, r, color, dx, dy, dz) {
    let geo = new CylinderGeometry(x, y, z, s);
    geo.rotateX(r);
    let mat = new MeshToonMaterial({
        color: color,
        flatShading: true,
    });
    let mesh = new Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(dx, dy, dz);
    return mesh;
}

function createCylinderTwo(x, y, z, s, r, color, dx, dy, dz) {
    let geo = new CylinderGeometry(x, y, z, s);
    geo.rotateZ(r);
    let mat = new MeshToonMaterial({
        color: color,
        flatShading: true,
    });
    let mesh = new Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(dx, dy, dz);
    return mesh;
}

function createWindshield(x, y, z, dx, dy, dz) {
    let geo = new CylinderGeometry(
        0.8 / Math.sqrt(2),
        0.93 / Math.sqrt(2),
        1,
        4,
        1
    );
    geo.rotateY(Math.PI / 4);
    geo.computeFlatVertexNormals();
    let mat = new MeshToonMaterial({
        color: Colors.gray,
    });
    let mesh = new Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(dx, dy, dz);
    mesh.scale.set(x, y, z);
    return mesh;
}

class Car extends Group {
    constructor(parent) {
        super();
        this.state = {
          night: parent.night,
          timeElapsed: -1,
          lightsOn: false,
          startTime: null,
          lightsOn: false,
          threshold: 10,
          bobbing: true,
        }

        var bb = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.bb = bb;

        this.init();
        this.name = 'car';
        this.bb = bb;
        this.maxPos = 2.5;

        this.init();

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    init() {
        let body = new BoxGeometry(2.5, 0.5, 4);
        let bodyMat = new MeshToonMaterial({
            color: Colors.red,
        });
        let carBody = new Mesh(body, bodyMat);
        carBody.castShadow = true;
        carBody.receiveShadow = true;
        carBody.position.set(0, 1, 0);
        this.add(carBody);

        // // creates the top of the car
        let top = new CylinderGeometry(
            0.8 / Math.sqrt(2),
            1 / Math.sqrt(2),
            1,
            4,
        );
        top.rotateY(Math.PI / 4);
        top.computeFlatVertexNormals();
        let topMat = new MeshToonMaterial({
            color: Colors.red,
            flatShading: true,
        });
        let carTop = new Mesh(top, topMat);
        carTop.scale.set(2.5, 2, 2.5);
        carTop.castShadow = true;
        carTop.receiveShadow = true;
        carTop.position.set(0, 2, 0);
        this.add(carTop);

        let windshield = createWindshield(2, 1.4, 3, 0, 2.2, 0);
        this.add(windshield);
        // let windshieldTwo = createWindshield(1.77, 1.4, 1.7,5,5,5);
        // this.add(windshieldTwo);

        // creates the wheel
        let wheelOne = createCylinder(
            0.4,
            0.4,
            0.2,
            16,
            Math.PI / 2,
            Colors.black,
            1.2,
            0.6,
            -1.2
        );
        let wheelTwo = createCylinder(
            0.4,
            0.4,
            0.2,
            16,
            Math.PI / 2,
            Colors.black,
            -1.2,
            0.6,
            -1.2
        );
        let wheelThree = createCylinder(
            0.4,
            0.4,
            0.2,
            16,
            Math.PI / 2,
            Colors.black,
            1.2,
            0.6,
            1.2
        );
        let wheelFour = createCylinder(
            0.4,
            0.4,
            0.2,
            16,
            Math.PI / 2,
            Colors.black,
            -1.2,
            0.6,
            1.2
        );
        wheelOne.rotation.y = Math.PI/2;
        wheelTwo.rotation.y = Math.PI/2;
        wheelThree.rotation.y = Math.PI/2;
        wheelFour.rotation.y = Math.PI/2;
        carBody.add(wheelOne);
        carBody.add(wheelTwo);
        carBody.add(wheelThree);
        carBody.add(wheelFour);


        this.add(wheelOne);
        this.add(wheelTwo);
        this.add(wheelThree);
        this.add(wheelFour);

        // creates license plate
        let licenseGeo = new PlaneGeometry(0.6, 0.3, 0.6);
        let licenseMaterial = new MeshToonMaterial({
            color: Colors.yellow,
            side: DoubleSide,
        });
        let license = new Mesh(licenseGeo, licenseMaterial);
        carBody.add(license);
        license.position.set(0, 0, 2.01)

        // creates headlights
        let headLightGeo = new CircleGeometry(0.15, 32);
        let headLightMaterial = new MeshToonMaterial({
            color: Colors.darkyellow,
            side: DoubleSide,
        });
        let headLightOne = new Mesh(headLightGeo, headLightMaterial);
        let headLightTwo = new Mesh(headLightGeo, headLightMaterial);
        carBody.add(headLightOne);
        headLightOne.position.set(1, 0, 2.01);
        carBody.add(headLightTwo);
        headLightTwo.position.set(-1, 0, 2.01);

        // create exhaust pipe
        let pipe = createCylinderTwo(
            0.08,
            0.01,
            0.4,
            16,
            Math.PI / 2,
            Colors.black,
            -2,
            0.78,
            -0.8
        );
        carBody.add(pipe);
        pipe.rotation.y = Math.PI/2;
        pipe.position.set(-0.75, -0.2, 2);

        let geo = new BoxGeometry(0.2, 0.2, 0.2);
        let mat = new MeshToonMaterial({
            color: Colors.gray1,
        });
        let exhaust = new Mesh(geo, mat);
        exhaust.castShadow = true;
        exhaust.receiveShadow = true;
        exhaust.position.set(-0.75, 0.75, 2.5);
        this.add(exhaust);
        exhaust.name = "exhaust"

        this.scale.set(0.4, 0.4, 0.4);
        this.position.set(0, 0, 21);
        // create night mode headlights
        let beamerOne = new SpotLight(0xffffff, 0);
        beamerOne.position.set(1, 1, 1);
        beamerOne.angle = 0.1;
        beamerOne.distance = 80;
        beamerOne.name = "beamer1";
        let beamerTwo= new SpotLight(0xffffff, 0);
        beamerTwo.position.set(-1, 1, 1);
        beamerTwo.angle = 0.1;
        beamerTwo.distance = 80;
        beamerTwo.name = "beamer2";
        // beamerOne.target.position.set(1, 1, -5);
        this.add(beamerOne, beamerTwo);

        // compute bounding box
        for (const mesh of this.children) {
          var box = new THREE.Box3();
          box.setFromObject(mesh);
          this.bb.union(box);
        }

        // visualize bounding box
        var bbHelper = new THREE.Box3Helper(this.bb, 0xffff00);
        // this.add(bbHelper);
    }

    update(timeStamp) {
        const { lightsOn, startTime } = this.state;

        // figures out time elapsed since beginning
        if (startTime == null) {
          this.state.startTime = Date.now() / 1000;
        } else {
          const currentTime = Date.now() / 1000;
          this.state.timeElapsed = currentTime - this.state.startTime;
        }

        // toggle night mode
        if (this.state.timeElapsed > this.state.threshold) {
          this.state.night = !this.state.night;
          this.state.startTime = Date.now() / 1000;
          this.state.threshold = 20;
        }

        // turns lights on
        if (!lightsOn && this.state.night) {
          let beamer = this.getObjectByName("beamer1", true);
          beamer.intensity = 2.25;
          beamer = this.getObjectByName("beamer2", true);
          beamer.intensity = 2.25;
          this.state.lightsOn = true;
        }
        // turns lights off
        if (lightsOn && !this.state.night) {
          let beamer = this.getObjectByName("beamer1", true);
          beamer.intensity = 0;
          beamer = this.getObjectByName("beamer2", true);
          beamer.intensity = 0;
          this.state.lightsOn = false;
        }

        if (this.state.bobbing) {
            // Bob car and exhaust back and forth
            this.rotation.x = 0.03 * Math.sin(timeStamp / 200);
            this.children[18].rotation.z = Math.sin(timeStamp / 200);
        }
    }

    bobble(timeStamp) {
        if (this.state.bobbing) {
            // Bob car and exhaust back and forth
            this.rotation.x = 0.03 * Math.sin(timeStamp / 200);
            this.children[18].rotation.z = Math.sin(timeStamp / 200);
        }
    }
}

export default Car;
