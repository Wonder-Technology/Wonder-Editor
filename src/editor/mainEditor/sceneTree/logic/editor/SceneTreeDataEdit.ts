import { Map } from "immutable";
import {ensureFunc, it} from "../../../../../typescript/contract";
import {ISceneTreeGameObject} from "../interface/ISceneTree";
// import {expect} from "wonder-expect";

//todo finish check
export const saveSceneTreeData = ensureFunc((state:Map<any, any>) => {
    it("if component has uid field, it should be transform component", function(){
        // expect();
    });
}, (state: Map<any, any>, sceneTree:Array<ISceneTreeGameObject>) => {
    var resultState: Map<any, any> = state;

    resultState = resultState.set("sceneTree", sceneTree);

    return resultState;
});

export const getSceneTreeDataFromState = (state:Map<any,any>) => {
    var sceneTreeData = state.get("sceneTree");

    return sceneTreeData;
};