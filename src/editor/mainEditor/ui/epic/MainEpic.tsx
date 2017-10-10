// import "rxjs/add/operator/mergeMap";
// import "rxjs/add/operator/map";
// import "rxjs/add/operator/delay";
// import {GET_CURRENT_GAME_OBJECT_ID, setCurrentGameObjectId} from "../action/MainAction";
// import {getCurrentGameObject} from "../../logic/view/SceneView";
// import {GameObject} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
// import { of } from "rxjs/observable/of";
//
// export const mainEditorEpic = (action$:any) => (
//     action$.ofType(GET_CURRENT_GAME_OBJECT_ID)
//         .mergeMap( () => {
//             var gameObject:GameObject = getCurrentGameObject(),
//                 uid:number = -1;
//
//             if(gameObject !== null){
//                 uid = gameObject.uid;
//             }
//             return of(uid).map(id => setCurrentGameObjectId(id));
//         })
// );
//

