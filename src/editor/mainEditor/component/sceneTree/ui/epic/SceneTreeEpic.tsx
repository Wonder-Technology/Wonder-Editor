import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/delay";
import { changeSceneTreeData, GET_SCENE_TREE_DATA } from "../action/SceneTreeAction";
import { getSceneTreeData } from "../../logic/view/SceneTreeView";
import { from } from "rxjs/observable/from";

export const sceneTreeEpic = (action$: any) => (
    action$.ofType(GET_SCENE_TREE_DATA)
        .mergeMap(() => {
            var data = getSceneTreeData();

            return from([data]).map(data => changeSceneTreeData(data));
        })
);
