import * as React from "react";
import SceneTree from "../component/sceneTree/ui/SceneTree";
import { resizeCanvas } from "../utils/canvasUtils";
import { start } from "../logic/view/MainView";
import { removeCurrentGameObject, setCurrentGameObject } from "../logic/view/SceneView";
import Asset from "../component/asset/ui/Asset";
import {
    insertDragedTreeNodeToTargetTreeNode, setSceneTreeData,
    updateTreeNodeParent
} from "../component/sceneTree/logic/view/SceneTreeView";
import Inspector from "../component/inspector/ui/Inspector";

interface IProps {
    getSceneTreeData: Function;
    sceneTreeData: any;

    getImageFile:Function;
    assetFiles:any;
}

export default class MainEditor extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        start();
        this.props.getSceneTreeData();

        resizeCanvas();
    }

    render() {
        var { getSceneTreeData, sceneTreeData } = this.props,
            { getImageFile,assetFiles } = this.props;

        var sceneTreeProps = {
            getSceneTreeData,
            setCurrentGameObject,
            removeCurrentGameObject,
            insertDragedTreeNodeToTargetTreeNode,
            updateTreeNodeParent,
            setSceneTreeData,

            sceneTreeData
        };

        return (
            <article className="main-editor">
                <article className="vertical-direction">
                    <SceneTree {...sceneTreeProps} />
                    <article className="canvas-parent">
                        <canvas id="webgl"></canvas>
                    </article>
                    <Inspector/>
                </article>
                <article className="horizontal-direction">
                    <Asset getImageFile={getImageFile} assetFiles={assetFiles}/>
                </article>
            </article>
        )
    }
}
