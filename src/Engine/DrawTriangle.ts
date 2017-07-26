import {Main} from "amyjs/dist/commonjs/core/Main";
import {GameObject} from "amyjs/dist/commonjs/core/Entity/GameObject";
import {BasicMaterial} from "amyjs/dist/commonjs/Component/Material/BasicMaterial";
import {Color} from "amyjs/dist/commonjs/Math/Color";
import {TriangleGeometry} from "amyjs/dist/commonjs/Component/Geometry/TriangleGeometry";
import {MeshRenderer} from "amyjs/dist/commonjs/Component/Render/MeshRender/MeshRenderer";
import {Director} from "amyjs/dist/commonjs/core/Director";
import {Device} from "amyjs/dist/commonjs/core/device/Device";
import {PerspectiveCamera} from "amyjs/dist/commonjs/Component/Camera/PerspectiveCamera";
import {CameraController} from "amyjs/dist/commonjs/Component/Camera/Controll/CameraController";
import {Geometry} from "amyjs/dist/commonjs/Component/Geometry/Geometry";
import {BoxGeometry} from "amyjs/dist/commonjs/Component/Geometry/BoxGeometry";

export default class DrawTriangle {

    public static create(){
        var obj = new this();

        return obj;
    }

    private _triangle = this._createTriangle();
    private _director = Director.getInstance();
    render(){
        Main.setCanvas("webgl","canvas").init();

        this._director.renderer.setClearColor(0,0,0,1);
        this._director.scene.addChild(this._triangle);
        this._director.scene.addChild(this._createCamera());

        // this._director.init();
        // const animate = () => {
        //
        //     this._director.Render();
        //
        //     window.requestAnimationFrame(animate);
        // };
        // animate();
        this._director.start();
    }

    public setTrianglePosition(position){
        this._triangle.transform.translate(position.x,position.y,position.z);
    }

    public setTriangleRotate(angle){
        this._triangle.transform.rotate(angle,0,1,0);
    }

    public addTriangle(){
        var triangle = this._createTriangle();
        triangle.init();
        this._director.scene.addChild(triangle);
    }

    public addCube(){
        var obj = this._createCube();
        obj.init();
        this._director.scene.addChild(obj);
    }

    public changeMaterial(color){
        var material = BasicMaterial.create();
        material.color = Color.create("#"+color);
        material.opacity = 1;

        material.init();

        this._triangle.getComponent(Geometry).material = material;
    }

    private _createCube(){
        const gameObject = GameObject.create();

        const material = BasicMaterial.create();
        material.color = Color.create("#ff00ff");
        material.opacity = 1;

        const cube = BoxGeometry.create();
        cube.material = material;

        gameObject.addComponent(cube);
        gameObject.addComponent(MeshRenderer.create());

        return gameObject;
    }

    private _createTriangle(){
        const gameObject = GameObject.create();

        const material = BasicMaterial.create();
        material.color = Color.create("#0000ff");
        material.opacity = 1;

        const triangle = TriangleGeometry.create();
        triangle.material = material;

        gameObject.addComponent(triangle);
        gameObject.addComponent(MeshRenderer.create());

        return gameObject;
    }

    private _createCamera(){
        const camera = GameObject.create(),
            view = Device.getInstance().view,
            cameraComponent = PerspectiveCamera.create();

        cameraComponent.fovy = 30;
        cameraComponent.aspect = view.width / view.height;
        cameraComponent.near = 1;
        cameraComponent.far = 1000;

        cameraComponent.translate(0,0,-5);

        var cameraControll = CameraController.create(cameraComponent);
        camera.addComponent(cameraControll);

        return camera;
    }

}
