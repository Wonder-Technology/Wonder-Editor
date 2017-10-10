import * as React from "react";
import SceneTree from "../component/sceneTree/ui/SceneTree";
import { resizeCanvas } from "../utils/canvasUtils";
import {getAllComponentData, start} from "../logic/view/MainView";
import {getSceneUId, removeCurrentGameObject, setCurrentGameObject} from "../logic/view/SceneView";
import Asset from "../component/asset/ui/Asset";
import {
    insertDragedTreeNodeToTargetTreeNode, setSceneTreeData,
    updateTreeNodeParent
} from "../component/sceneTree/logic/view/SceneTreeView";
import Inspector from "../component/inspector/ui/Inspector";
import {changeWidthBySplit} from "../component/split/logic/view/SplitView";

interface IProps {
    isStart:Function;
    getCurrentGameObjectUId:Function;

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

    private _isResizeCanvas = false;

    public componentDidMount() {
        start();

        this._execComponentsInit();
    }

    public componentDidUpdate(){
        if(this._isResizeCanvas === false) {
            this._isResizeCanvas = true;

            resizeCanvas();
        }
    }

    private _execComponentsInit(){
        this.props.getSceneTreeData();
    }

    public render() {
        if(!this.props.isStart()){
            return (
                <article className="main-editor">
                    <article className="vertical-direction">
                        <article key="canvas" className="canvas-parent">
                            <canvas id="webgl"></canvas>
                        </article>
                    </article>
                </article>
            )
        }

        var currentGameObjectId = this.props.getCurrentGameObjectUId();

        var { getSceneTreeData, sceneTreeData,changeEditorState } = this.props,
            { getImageFile,assetFiles } = this.props;

        var sceneTreeProps = {
            changeEditorState,

            getSceneUId,
            getSceneTreeData,
            setCurrentGameObject,
            removeCurrentGameObject,
            insertDragedTreeNodeToTargetTreeNode,
            updateTreeNodeParent,
            setSceneTreeData,
            resizeCanvas,
            changeWidthBySplit,

            sceneTreeData
        };

        var inspectorProps = {
            currentGameObjectId,
            getAllComponentData,
            resizeCanvas,
            changeWidthBySplit
        };

        return (
            <article className="main-editor">
                <article className="vertical-direction">
                    <SceneTree {...sceneTreeProps} />
                    <article key="canvas" className="canvas-parent">
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
