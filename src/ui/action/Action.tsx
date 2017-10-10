import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";

import { ISceneTreeAction } from "../../editor/mainEditor/component/sceneTree/ui/action/SceneTreeAction";
import * as sceneAction from "../../editor/mainEditor/component/sceneTree/ui/action/SceneTreeAction";

import {IAssetAction} from "../../editor/mainEditor/component/asset/ui/action/AssetAction";
import * as assetAction from "../../editor/mainEditor/component/asset/ui/action/AssetAction";

import {IMainEditorAction} from "../../editor/mainEditor/ui/action/MainAction";
import * as mainEditorAction from "../../editor/mainEditor/ui/action/MainAction";

export interface IAction extends ISceneTreeAction, IAssetAction,IMainEditorAction{ }

export const getAllAction = () => {
    var result: any = {};

    result = ExtendUtils.extend(result, sceneAction);
    result = ExtendUtils.extend(result, assetAction);
    result = ExtendUtils.extend(result, mainEditorAction);

    return result;
};

