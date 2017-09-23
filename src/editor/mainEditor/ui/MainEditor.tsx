import * as React from "react";
import SceneTree from "../component/sceneTree/ui/SceneTree";
import { resizeCanvas } from "../utils/canvasUtils";
import {getAllComponentData, start} from "../logic/view/MainView";
import {getCurrentGameObjectUId, removeCurrentGameObject, setCurrentGameObject} from "../logic/view/SceneView";
import Asset from "../component/asset/ui/Asset";
import {
    insertDragedTreeNodeToTargetTreeNode, setSceneTreeData,
    updateTreeNodeParent
} from "../component/sceneTree/logic/view/SceneTreeView";
import Inspector from "../component/inspector/ui/Inspector";

interface IProps {
    changeEditorState:Function;
    editorState:number;

    getSceneTreeData: Function;
    sceneTreeData: any;

    getImageFile:Function;
    assetFiles:any;
}

export default class MainEditor extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
    }

    public componentDidMount() {
        start();
        this.execComponentsInit();

        resizeCanvas();
    }

    public execComponentsInit(){
        this.props.getSceneTreeData();
    }

    public render() {
        var currentGameObjectId = getCurrentGameObjectUId();

        var { getSceneTreeData, sceneTreeData,changeEditorState } = this.props,
            { getImageFile,assetFiles } = this.props;

        var sceneTreeProps = {
            changeEditorState,

            getSceneTreeData,
            setCurrentGameObject,
            removeCurrentGameObject,
            insertDragedTreeNodeToTargetTreeNode,
            updateTreeNodeParent,
            setSceneTreeData,

            sceneTreeData
        };

        var inspectorProps = {
            currentGameObjectId,
            getAllComponentData
        };

        return (
            <article className="main-editor">
                <article className="vertical-direction">
                    <SceneTree {...sceneTreeProps} />
                    <article className="canvas-parent">
                        <canvas id="webgl"></canvas>
                    </article>
                    <Inspector {...inspectorProps}/>
                </article>
                <article className="horizontal-direction">
                    <Asset getImageFile={getImageFile} assetFiles={assetFiles}/>
                </article>
            </article>
        )
    }
}
