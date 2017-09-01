import { combineEpics } from "redux-observable";
import {returnSceneData} from "../../editor/mainEditor/sceneTree/ui/epic/SceneTreeEpic";

export const rootEpics = combineEpics(
    returnSceneData
);
