import { combineEpics } from "redux-observable";
import { sceneTreeEpic } from "../../editor/mainEditor/component/sceneTree/ui/epic/SceneTreeEpic";

export const rootEpics = combineEpics(
    sceneTreeEpic
);
