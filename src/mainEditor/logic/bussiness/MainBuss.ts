import {addSceneChildren} from "../adaptorOperator/SceneOper";
import {Map} from "immutable";
import {mainInit} from "../adaptorOperator/MainOper";
import {directorInit, directorSetClearColor, directorRender} from "../adaptorOperator/DirectorOper";
import {createTriangle} from "../adaptorOperator/primitiveOper";
import {createCamera} from "../adaptorOperator/CameraOper";
import {setRotate, setTranslate} from "../adaptorOperator/GameObjectOper";

export const init = (state:Map<any,any>) => {
    var resultState = null,
        obj = null;

    mainInit("webgl","parent");
    directorSetClearColor(0,0,0,1);

    obj = createTriangle();
    resultState = state.setIn(["MainBuss","triangle"],obj);

    addSceneChildren(obj);
    addSceneChildren(createCamera());
    directorInit();

    return resultState;
};

export const changeTranslate = (state:Map<any,any>,x:number,y:number,z:number) => {
    setTranslate(getCurrentTriangle(state),x,y,z);
};

export const changeRotate = (state:Map<any,any>,angle:number) => {
    setRotate(getCurrentTriangle(state),angle,0,1,0);
};

export const render = (state:Map<any,any>) => {
    directorRender();

    return state;
};

export const getCurrentTriangle = (state:Map<any,any>) => {
    let triangle = state.getIn(["MainBuss","triangle"]);

    return triangle;
};
