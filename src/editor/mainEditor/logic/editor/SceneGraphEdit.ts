import { IGameObject } from "../interface/ISceneGraph";
import { Map } from "immutable";
import {GameObject} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";

/*export const saveSceneGraphData = (state: Map<any, any>, sceneGraphData: ISceneGraph) => {
    var resultState: Map<any, any> = state;

    for (let key in sceneGraphData) {
        if (sceneGraphData.hasOwnProperty(key)) {
            let item = sceneGraphData[key];

            resultState = resultState.setIn(["scene", key], item);
        }
    }

    return resultState;
};*/

export const saveSceneGraphData = (state: Map<any, any>, sceneChildren:GameObject[]) => {
    var resultState: Map<any, any> = state;
    var scene:IGameObject[] = [];

    sceneChildren.forEach(gameObject => {
        var obj:IGameObject = {
            uid:gameObject.uid,
            name:"gameObject"+gameObject.uid,
            component:[]
        } as any;

        //todo get gameobject name by uid
        //todo get gameobject component by uid,store in component array
        //obj.name = getGameObjectName(gameObject.uid);

        scene.push(obj);
    });
    resultState = resultState.setIn(["scene"], scene);

    return resultState;
};
