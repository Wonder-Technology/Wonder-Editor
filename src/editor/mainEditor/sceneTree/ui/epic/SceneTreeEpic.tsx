import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/delay";
import { changeSceneData, GET_SCENE_DATA } from "../action/SceneTreeAction";
import { getSceneTreeData } from "../../logic/view/SceneTreeView";
import { from } from "rxjs/observable/from";

export const returnSceneData = (action$: any) => (
    action$.ofType(GET_SCENE_DATA)
        .mergeMap(() => {
            var data = getSceneTreeData();

            return from([data]).map(data => changeSceneData(data));
        })
);
