import { ISceneGraph } from "../interface/ISceneGraph";
import { Map } from "immutable";

export const saveSceneGraphData = (state: Map<any, any>, sceneGraphData: ISceneGraph) => {
    var resultState: Map<any, any> = state;

    for (let key in sceneGraphData) {
        if (sceneGraphData.hasOwnProperty(key)) {
            let item = sceneGraphData[key];

            resultState = resultState.setIn(["scene", key], item);
        }
    }

    return resultState;
}