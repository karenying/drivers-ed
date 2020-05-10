import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

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
    // bodyColor: 0x3396ff,
    // bodyColor = this.bodyColor;
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

class OtherCar extends Group {
    constructor(parent, bodyColor) {
        super();
        this.state = {
          lightsOn: false,
          threshold: 10,
          bobbing: true
        }

        this.bodyColor = bodyColor;
        this.parent = parent;
        this.speed = 0.5;
        this.idle = false;

        var bb = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.bb = bb;

        // this.init();
        this.name = 'otherCar';
        this.lightTarget = new THREE.Object3D();
        this.lightTarget.position.z = -5;
        this.lightTarget.position.y = 1;
        this.add(this.lightTarget);

        this.init();

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    init() {
        let body = new BoxGeometry(2.5, 0.5, 4);
        let bodyMat = new MeshToonMaterial({
            color: this.bodyColor,
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
            color: this.bodyColor,
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
        let backLicense = new Mesh(licenseGeo, licenseMaterial);
        let frontLicense = new Mesh(licenseGeo, licenseMaterial);
        carBody.add(backLicense);
        carBody.add(frontLicense);
        backLicense.position.set(0, 0, 2.01)
        frontLicense.position.set(0, 0, -2.01)

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

        let frontHeadLight1 = new Mesh(headLightGeo, headLightMaterial);
        let frontHeadLight2 = new Mesh(headLightGeo, headLightMaterial);
        carBody.add(frontHeadLight1);
        frontHeadLight1.position.set(1, 0, -2.01);
        carBody.add(frontHeadLight2);
        frontHeadLight2.position.set(-1, 0, -2.01);

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
        beamerOne.angle = 0.15;
        beamerOne.distance = 30;
        beamerOne.name = "beamer1";
        let beamerTwo= new SpotLight(0xffffff, 0);
        beamerTwo.position.set(-1, 1, 1);
        beamerTwo.angle = 0.15;
        beamerTwo.distance = 30;
        beamerTwo.name = "beamer2";
        beamerOne.target = this.lightTarget;
        beamerTwo.target = this.lightTarget;
        this.add(beamerOne, beamerTwo);

        // compute bounding box
        for (const mesh of this.children) {
          var box = new THREE.Box3();
          box.setFromObject(mesh);
          this.bb.union(box);
        }

        // visualize bounding box
        this.bb = new THREE.Box3(
          new THREE.Vector3(-1.5, -1, -2),
          new THREE.Vector3(1.5, 3, 2)
        );
        var bbHelper = new THREE.Box3Helper(this.bb, 0xffff00);

        this.fbb = new THREE.Box3(
          new THREE.Vector3(-1.5, -1, -4),
          new THREE.Vector3(1.5, 3, 2)
        );
        var fbbHelper = new THREE.Box3Helper(this.fbb, 0xffff00);
        // this.add(fbbHelper);
    }

    update(timeStamp) {
        const { lightsOn, idle } = this.state;

        // turns lights on
        if (!lightsOn && this.parent.night == 2) {
          let beamer = this.getObjectByName("beamer1", true);
          beamer.intensity = 1;
          beamer = this.getObjectByName("beamer2", true);
          beamer.intensity = 1;
          this.state.lightsOn = true;
        }

        // turns lights off
        if (lightsOn && this.parent.night != 2) {
          let beamer = this.getObjectByName("beamer1", true);
          beamer.intensity = 0;
          beamer = this.getObjectByName("beamer2", true);
          beamer.intensity = 0;
          this.state.lightsOn = false;
        }

        if (lightsOn) {
          let beamer = this.getObjectByName("beamer1", true);
          beamer.target.updateMatrixWorld();
          beamer = this.getObjectByName("beamer2", true);
          beamer.target.updateMatrixWorld();
        }

        if (this.state.bobbing) {
            // Bob car and exhaust back and forth
            this.rotation.x = 0.03 * Math.sin(timeStamp / 200);
            this.children[7].rotation.z = Math.sin(timeStamp / 200);
        }

        if (this.idle) {
          if (this.parent.stopped) var newZ = this.position.z;
          else var newZ = this.position.z + this.parent.gameSpeed;
        } else {
          if (this.parent.stopped) var newZ = this.position.z + this.speed;
          else var newZ = this.position.z + this.parent.gameSpeed + this.speed;
        }

        if (newZ > this.parent.camera.position.z) {
          newZ = -(this.parent.fog.far + 70 * Math.random());
          while (newZ > this.parent.camera.position.z - 50) {
            newZ = -(this.parent.fog.far + 70 * Math.random());
          }
        }
        this.position.z = newZ;

        // Advance tween animations, if any exist
        TWEEN.update();
    }

    bobble(timeStamp) {
        if (this.state.bobbing) {
            // Bob car and exhaust back and forth
            this.rotation.x = 0.03 * Math.sin(timeStamp / 200);
            this.children[18].rotation.z = Math.sin(timeStamp / 200);
        }
    }

    resetParams() {
      this.collected = false;
      this.position.y = 0;
    }

    onCollision() {
      if (!this.collected) {
        this.collected = true;
        const spin = new TWEEN.Tween(this.rotation)
            .to({ y: this.rotation.y + 2 * Math.PI }, 200);
        const jumpUp = new TWEEN.Tween(this.position)
            .to({ y: this.position.y + 3 }, 200)
            .easing(TWEEN.Easing.Quadratic.Out);
        const fallDown = new TWEEN.Tween(this.position)
            .to({ y: -1 }, 300)
            .easing(TWEEN.Easing.Quadratic.In);
        const resetPos = new TWEEN.Tween(this.position)
            .to({ z: -(this.parent.fog.far + 50 * Math.random()) }, 0);

        // Reset position after jumping up and down
        jumpUp.onComplete(() => fallDown.start());
        fallDown.onComplete(() => resetPos.start());
        resetPos.onComplete(() => this.resetParams());

        // Start animation
        jumpUp.start();
        spin.start();
      }
    }
}

export default OtherCar;
