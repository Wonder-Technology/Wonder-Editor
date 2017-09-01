import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/delay";
import {changeSceneData, GETSCENEDATA} from "../action/SceneTreeAction";
import {getSceneTreeData} from "../../logic/view/SceneTreeView";
import {from} from "rxjs/observable/from";

export const returnSceneData = (action$:any) => (
    action$.ofType(GETSCENEDATA)
        .delay(50)
        .mergeMap( () => {
            var data = getSceneTreeData();

            return from([data]).map(data => changeSceneData(data));
        })
);


