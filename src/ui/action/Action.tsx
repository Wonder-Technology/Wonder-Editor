import { ISceneTreeAction } from "../../editor/mainEditor/components/sceneTree/ui/action/SceneTreeAction";
import {IAssetAction} from "../../editor/mainEditor/components/asset/ui/action/AssetAction";
import * as sceneAction from "../../editor/mainEditor/components/sceneTree/ui/action/SceneTreeAction";
import * as assetAction from "../../editor/mainEditor/components/asset/ui/action/AssetAction";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";

export interface IAction extends ISceneTreeAction, IAssetAction { }

export const getAllAction = () => {
    var result: any = {};

    result = ExtendUtils.extend(result, sceneAction);
    result = ExtendUtils.extend(result, assetAction);

    return result;
};

