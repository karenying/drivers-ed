import { Group, BoxGeometry,  Mesh, MeshToonMaterial, Geometry, VertexColors} from "three";
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

class MalePedestrianShorts extends Group {
    constructor(parent, materials) {
        super();

        // Init state
        this.state = {
            bob: true,
            walking: true,
        };

        const geo = new Geometry();

        let chadColors = {
            eye: 0x36699c,
            hair: 0xd1c569,
            skin: 0xb48a78,
            shorts: 0xed7490,
            shirt: 0x72afed,
            shoes: 0x3b2403,
        };

        // head
        const headGeometry = new BoxGeometry(1.5, 1.5, 0.75);
        headGeometry.faces.forEach(f => f.color.set(chadColors.skin));
        geo.merge(headGeometry);

        var leftEyeGeometry = new BoxGeometry(0.1, 0.1, 0.1);
        leftEyeGeometry.faces.forEach(f => f.color.set(chadColors.eye));
        leftEyeGeometry.translate(-0.4, 0.25, 0.4);
        geo.merge(leftEyeGeometry);

        var rightEyeGeometry = new BoxGeometry(0.1, 0.1, 0.1);
        rightEyeGeometry.faces.forEach(f => f.color.set(chadColors.eye));
        rightEyeGeometry.translate(0.4, 0.25, 0.4);
        geo.merge(rightEyeGeometry);

        var leftEarGeometry = new BoxGeometry(0.2, 0.5, 0.25);
        leftEarGeometry.faces.forEach(f => f.color.set(chadColors.skin));
        leftEarGeometry.translate(-0.85, 0, 0);
        geo.merge(leftEarGeometry)

        var rightEarGeometry = new BoxGeometry(0.2, 0.5, 0.25);
        rightEarGeometry.faces.forEach(f => f.color.set(chadColors.skin));
        rightEarGeometry.translate(0.85, 0, 0);
        geo.merge(rightEarGeometry)

        var hairGeometry = new BoxGeometry(1.7, 0.5, 1);
        hairGeometry.faces.forEach(f => f.color.set(chadColors.hair));
        hairGeometry.translate(0, 0.9, 0);
        geo.merge(hairGeometry)

        var noseGeometry = new BoxGeometry(0.25, 0.5, 0.25);
        noseGeometry.faces.forEach(f => f.color.set(chadColors.skin));
        noseGeometry.rotateX(-20 * (Math.PI/180));
        noseGeometry.translate(0, 0, 0.4);
        geo.merge(noseGeometry)

        var shirtGeometry = new BoxGeometry(1.75, 2, 1);
        shirtGeometry.faces.forEach(f => f.color.set(chadColors.shirt));
        shirtGeometry.translate(0, -1.75, 0);
        geo.merge(shirtGeometry)

        // left arm
        const geoLeftArm = new Geometry();

        var leftArmGeometry = new BoxGeometry(0.45, 2, 0.5);
        leftArmGeometry.faces.forEach(f => f.color.set(chadColors.skin));
        leftArmGeometry.translate(0, -1, 0);
        geoLeftArm.merge(leftArmGeometry);

        var leftShirtGeometry = new BoxGeometry(0.65, 0.75, 0.65);
        leftShirtGeometry.faces.forEach(f => f.color.set(chadColors.shirt));
        geoLeftArm.merge(leftShirtGeometry)

        // right arm
        const geoRightArm = new Geometry();

        var rightArmGeometry = new BoxGeometry(0.45, 2, 0.5);
        rightArmGeometry.faces.forEach(f => f.color.set(chadColors.skin));
        rightArmGeometry.translate(0, -1, 0);
        geoRightArm.merge(rightArmGeometry);

        var rightShirtGeometry = new BoxGeometry(0.65, 0.75, 0.65);
        rightShirtGeometry.faces.forEach(f => f.color.set(chadColors.shirt));
        geoRightArm.merge(rightShirtGeometry)

        // left leg
        const geoLeftLeg = new Geometry();

        var leftLegGeometry = new BoxGeometry(0.6, 2.75, 0.55);
        leftLegGeometry.faces.forEach(f => f.color.set(chadColors.skin));
        leftLegGeometry.translate(0, -1, 0);
        geoLeftLeg.merge(leftLegGeometry);

        var leftShortsGeometry = new BoxGeometry(0.7, 1.25, 0.65);
        leftShortsGeometry.faces.forEach(f => f.color.set(chadColors.shorts));
        leftShortsGeometry.translate(0, -0.5, 0);
        geoLeftLeg.merge(leftShortsGeometry);

        var leftShoeGeometry = new BoxGeometry(0.75, 0.5, 1.25);
        leftShoeGeometry.faces.forEach(f => f.color.set(chadColors.shoes));
        leftShoeGeometry.translate(0, -2.5, 0.25);
        geoLeftLeg.merge(leftShoeGeometry);

        // right leg
        const geoRightLeg = new Geometry();

        var rightLegGeometry = new BoxGeometry(0.6, 2.75, 0.55);
        rightLegGeometry.faces.forEach(f => f.color.set(chadColors.skin));
        rightLegGeometry.translate(0, -1, 0);
        geoRightLeg.merge(leftLegGeometry);

        var rightShortsGeometry = new BoxGeometry(0.7, 1.25, 0.65);
        rightShortsGeometry.faces.forEach(f => f.color.set(chadColors.shorts));
        rightShortsGeometry.translate(0, -0.5, 0);
        geoRightLeg.merge(rightShortsGeometry);

        var rightShoeGeometry = new BoxGeometry(0.75, 0.5, 1.25);
        rightShoeGeometry.faces.forEach(f => f.color.set(chadColors.shoes));
        rightShoeGeometry.translate(0, -2.5, 0.25);
        geoRightLeg.merge(rightShoeGeometry);

        // this.add(head, leftArm, rightArm, leftLeg, rightLeg);
        const headMesh = new Mesh(
            geo,
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )

        const leftArmMesh = new Mesh(
            geoLeftArm,
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )
        leftArmMesh.position.set(-1.15, -1, 0);

        const rightArmMesh = new Mesh(
            geoRightArm,
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )
        rightArmMesh.position.set(1.15, -1, 0);

        const leftLegMesh = new Mesh(
            geoLeftLeg,
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )
        leftLegMesh.position.set(-0.5, -2.5, 0);

        const rightLegMesh = new Mesh(
            geoRightLeg,
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )
        rightLegMesh.position.set(0.5, -2.5, 0);

        this.add(headMesh, leftArmMesh, rightArmMesh, leftLegMesh, rightLegMesh)


        // Add self to parent's update list
        parent.addToUpdateList(this);
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

        // Advance tween animations, if any exist
        TWEEN.update();
    }
}

export default MalePedestrianShorts;