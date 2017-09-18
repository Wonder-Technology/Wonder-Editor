import { ISceneTreeAction } from "../../editor/mainEditor/component/sceneTree/ui/action/SceneTreeAction";
import * as sceneAction from "../../editor/mainEditor/component/sceneTree/ui/action/SceneTreeAction";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";

export interface IAction extends ISceneTreeAction { }

export const getAllAction = () => {
    var result: any = {};

    result = ExtendUtils.extend(result, sceneAction);

    return result;
};

