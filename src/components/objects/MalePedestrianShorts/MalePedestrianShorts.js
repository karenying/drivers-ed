import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { Group, 
    BoxGeometry, 
    Mesh, 
    MeshToonMaterial, 
    Geometry, 
    VertexColors,
    BufferGeometry} from "three";

class MalePedestrianShorts extends Group {
    constructor(parent, nameType, partOfCluster) {
        super();

        // Init state
        this.state = {
            bob: true,
            walking: true,
            type: nameType,
            cluster: partOfCluster,
            sidewalk: false,
        };

        let colors = this.getColors();

        this.name = 'pedestrian';
        this.speed = 0.03; // 0.03

        // Create bounding box
        var bb = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.bb = bb;
        this.collected = false;

        // Add self to parent's update list
        parent.addToUpdateList(this);

        const geo = new Geometry();
        // head
        const headGeometry = new BoxGeometry(1.5, 1.5, 0.75);
        headGeometry.faces.forEach(f => f.color.set(colors.skin));
        geo.merge(headGeometry);

        var leftEyeGeometry = new BoxGeometry(0.1, 0.1, 0.1);
        leftEyeGeometry.faces.forEach(f => f.color.set(colors.eye));
        leftEyeGeometry.translate(-0.4, 0.25, 0.4);
        geo.merge(leftEyeGeometry);

        var rightEyeGeometry = new BoxGeometry(0.1, 0.1, 0.1);
        rightEyeGeometry.faces.forEach(f => f.color.set(colors.eye));
        rightEyeGeometry.translate(0.4, 0.25, 0.4);
        geo.merge(rightEyeGeometry);

        var leftEarGeometry = new BoxGeometry(0.2, 0.5, 0.25);
        leftEarGeometry.faces.forEach(f => f.color.set(colors.skin));
        leftEarGeometry.translate(-0.85, 0, 0);
        geo.merge(leftEarGeometry)

        var rightEarGeometry = new BoxGeometry(0.2, 0.5, 0.25);
        rightEarGeometry.faces.forEach(f => f.color.set(colors.skin));
        rightEarGeometry.translate(0.85, 0, 0);
        geo.merge(rightEarGeometry)

        var hairGeometry = new BoxGeometry(1.7, 0.5, 1);
        hairGeometry.faces.forEach(f => f.color.set(colors.hair));
        hairGeometry.translate(0, 0.9, 0);
        geo.merge(hairGeometry)

        var noseGeometry = new BoxGeometry(0.25, 0.5, 0.25);
        noseGeometry.faces.forEach(f => f.color.set(colors.skin));
        noseGeometry.rotateX(-20 * (Math.PI/180));
        noseGeometry.translate(0, 0, 0.4);
        geo.merge(noseGeometry)

        var shirtGeometry = new BoxGeometry(1.75, 2, 1);
        shirtGeometry.faces.forEach(f => f.color.set(colors.shirt));
        shirtGeometry.translate(0, -1.75, 0);
        geo.merge(shirtGeometry)

        // left arm
        const geoLeftArm = new Geometry();

        var leftArmGeometry = new BoxGeometry(0.45, 2, 0.5);
        leftArmGeometry.faces.forEach(f => f.color.set(colors.skin));
        leftArmGeometry.translate(0, -1, 0);
        geoLeftArm.merge(leftArmGeometry);

        var leftShirtGeometry = new BoxGeometry(0.65, 0.75, 0.65);
        leftShirtGeometry.faces.forEach(f => f.color.set(colors.shirt));
        geoLeftArm.merge(leftShirtGeometry)

        // right arm
        const geoRightArm = new Geometry();

        var rightArmGeometry = new BoxGeometry(0.45, 2, 0.5);
        rightArmGeometry.faces.forEach(f => f.color.set(colors.skin));
        rightArmGeometry.translate(0, -1, 0);
        geoRightArm.merge(rightArmGeometry);

        var rightShirtGeometry = new BoxGeometry(0.65, 0.75, 0.65);
        rightShirtGeometry.faces.forEach(f => f.color.set(colors.shirt));
        geoRightArm.merge(rightShirtGeometry)

        // left leg
        const geoLeftLeg = new Geometry();

        var leftLegGeometry = new BoxGeometry(0.6, 2.75, 0.55);
        leftLegGeometry.faces.forEach(f => f.color.set(colors.skin));
        leftLegGeometry.translate(0, -1, 0);
        geoLeftLeg.merge(leftLegGeometry);

        var leftShortsGeometry = new BoxGeometry(0.7, 1.25, 0.65);
        leftShortsGeometry.faces.forEach(f => f.color.set(colors.shorts));
        leftShortsGeometry.translate(0, -0.5, 0);
        geoLeftLeg.merge(leftShortsGeometry);

        var leftShoeGeometry = new BoxGeometry(0.75, 0.5, 1.25);
        leftShoeGeometry.faces.forEach(f => f.color.set(colors.shoes));
        leftShoeGeometry.translate(0, -2.5, 0.25);
        geoLeftLeg.merge(leftShoeGeometry);

        // right leg
        const geoRightLeg = new Geometry();

        var rightLegGeometry = new BoxGeometry(0.6, 2.75, 0.55);
        rightLegGeometry.faces.forEach(f => f.color.set(colors.skin));
        rightLegGeometry.translate(0, -1, 0);
        geoRightLeg.merge(leftLegGeometry);

        var rightShortsGeometry = new BoxGeometry(0.7, 1.25, 0.65);
        rightShortsGeometry.faces.forEach(f => f.color.set(colors.shorts));
        rightShortsGeometry.translate(0, -0.5, 0);
        geoRightLeg.merge(rightShortsGeometry);

        var rightShoeGeometry = new BoxGeometry(0.75, 0.5, 1.25);
        rightShoeGeometry.faces.forEach(f => f.color.set(colors.shoes));
        rightShoeGeometry.translate(0, -2.5, 0.25);
        geoRightLeg.merge(rightShoeGeometry);

        const headMesh = new Mesh(
            new BufferGeometry().fromGeometry(geo),
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )

        const leftArmMesh = new Mesh(
            new BufferGeometry().fromGeometry(geoLeftArm),
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )
        leftArmMesh.position.set(-1.15, -1, 0);

        const rightArmMesh = new Mesh(
            new BufferGeometry().fromGeometry(geoRightArm),
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )
        rightArmMesh.position.set(1.15, -1, 0);

        const leftLegMesh = new Mesh(
            new BufferGeometry().fromGeometry(geoLeftLeg),
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )
        leftLegMesh.position.set(-0.5, -2.5, 0);

        const rightLegMesh = new Mesh(
            new BufferGeometry().fromGeometry(geoRightLeg),
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )
        rightLegMesh.position.set(0.5, -2.5, 0);

        this.add(headMesh, leftArmMesh, rightArmMesh, leftLegMesh, rightLegMesh)

        this.scale.set(0.25, 0.25, 0.25);
        this.rotation.y = -1 * (Math.PI/2);

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

    getColors() {
        switch(this.state.type) {
            case 'chad':
                let chadColors = {
                    eye: 0x36699c,
                    hair: 0xd1c569,
                    skin: 0xb48a78,
                    shorts: 0xed7490,
                    shirt: 0x72afed,
                    shoes: 0x3b2403,
                };
                return chadColors;
            case 'tom':
                let tomColors = {
                    eye: 0x0d0a02,
                    hair: 0x332601,
                    skin: 0x7a5528,
                    shorts: 0x1e0787,
                    shirt: 0xcdcbd4,
                    shoes: 0x692d36,
                };
                return tomColors;
            case 'jeff':
                let jeffColors = {
                    eye: 0x0d0a02,
                    hair: 0x000000,
                    skin: 0xa1824d,
                    shorts: 0x2c7fa3,
                    shirt: 0x38543c,
                    shoes: 0x8b8f8b,
                };
                return jeffColors;
            case 'dan':
                let danColors = {
                    eye: 0x0d0a02,
                    hair: 0x7d4714,
                    skin: 0xbf7f43,
                    shorts: 0x090459,
                    shirt: 0x4f1121,
                    shoes: 0x789476,
                };
                return danColors;
        }
    }

    update(timeStamp) {
        var Pulse = function(hertz,fn) {
            if (!fn) fn = Math.sin;
            return function (min,max) {
                if (!min) min = 0;
                if (!max) max = 1;
                return min+(0.5*(1+fn(2*Math.PI*hertz*new Date()/1000))*(max-min));
            };
        }

        var pulseSingle = new Pulse(0.75);

        if (this.state.bob) {
            // Bob back and forth
            this.rotation.x = 0.05 * Math.sin(timeStamp / 200);
        }

        if (this.state.walking) {
            // left arm
            this.children[1].rotation.x = pulseSingle(-25,25) * -1 * (Math.PI/180);
            // right arm
            this.children[2].rotation.x = pulseSingle(-25,25) * (Math.PI/180);
            // left leg
            this.children[3].rotation.x = pulseSingle(-20,40) * (Math.PI/180);
            // right leg
            this.children[4].rotation.x = pulseSingle(-40,20) * -1 * (Math.PI/180);
        }

        if (this.state.sidewalk) {
            var newZ = this.position.z + this.parent.gameSpeed + 0.25;
            if (newZ > this.parent.camera.position.z) {
                newZ = -(this.parent.fog.far + 70 * Math.random());
            }
            this.position.z = newZ;
        } else {
            // update positions (cross road and move towards car)
            var newZ = this.position.z + this.parent.gameSpeed;
            if (newZ > this.parent.camera.position.z) {
                if (!this.state.cluster) {
                    newZ = -(this.parent.fog.far + 70 * Math.random());
                } else {
                    newZ = -1 * (8 * Math.random() + (Math.abs(this.parent.currCrosswalkPos) - 0.5 * 8))
                }
            }
            this.position.z = newZ;

            if (!this.collected) {
            var newX = this.position.x - this.speed;

            // if pedestrian is done crossing road or no longer visible in scene
            if (newX < -this.parent.edge) {
                    if (!this.state.cluster) {
                        newZ = -(this.parent.fog.far + 70 * Math.random());
                    } else {
                        newZ = -1 * (8 * Math.random() + (Math.abs(this.parent.currCrosswalkPos) - 0.5 * 8))
                    }
                    newX = Math.floor(Math.random() * this.parent.edge) + this.parent.edge / 2;
                    this.resetParams();
            }
            this.position.x = newX;
            }

            // Advance tween animations, if any exist
            TWEEN.update();
        }
    }

    resetParams() {
      this.position.y = 1.4;
      this.collected = false;
    }

    onCollision() {
      if (!this.collected) {
        this.collected = true;
        const spin = new TWEEN.Tween(this.rotation)
            .to({ y: this.rotation.y + 2 * Math.PI }, 200);
        const jumpUp = new TWEEN.Tween(this.position)
            .to({ y: this.position.y + 2 }, 200)
            .easing(TWEEN.Easing.Quadratic.Out);
        const fallDown = new TWEEN.Tween(this.position)
            .to({ y: -1 }, 300)
            .easing(TWEEN.Easing.Quadratic.In);
        const resetPos = new TWEEN.Tween(this.position)
            .to({ z: -(this.parent.fog.far + 50 * Math.random()) }, 100);

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

export default MalePedestrianShorts;
