import {ISceneTreeAction} from "../../editor/mainEditor/sceneTree/ui/action/SceneTreeAction";
import * as sceneAction from "../../editor/mainEditor/sceneTree/ui/action/SceneTreeAction";
import * as transformAction from "../../editor/mainEditor/transform/ui/action/transformAction";
import {ExtendUtils} from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import {ITransformAction} from "../../editor/mainEditor/transform/ui/action/transformAction";

export interface IAction extends ISceneTreeAction,ITransformAction{}

export const getAllAction = () => {
    var result:any = {};

    result = ExtendUtils.extend(result,sceneAction);
    result = ExtendUtils.extend(result,transformAction);

    return result;
};

