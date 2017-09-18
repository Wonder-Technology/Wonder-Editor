import * as React from "react";
import Transform from "../component/transform/ui/Transform";
import SceneTree from "../component/sceneTree/ui/SceneTree";
import { resizeCanvas } from "../utils/canvasUtils";
import { start } from "../logic/view/MainView";
import { removeCurrentGameObject, setCurrentGameObject } from "../logic/view/SceneView";
import Asset from "../component/asset/ui/Asset";
import {
    insertDragedTreeNodeToTargetTreeNode, setSceneTreeData,
    updateTreeNodeParent
} from "../component/sceneTree/logic/view/SceneTreeView";

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
        /*        var names = ["A","B"];
                names.forEach(item => {
                    switch (item){
                        case getComponentName(A):this._fcks.push(<A></A>);break;
                        case getComponentName(B):this._fcks.push(<B name="wejhfjkwef"></B>);break;
                    }
                });*/
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
                    <Transform />

                </article>
                <article className="horizontal-direction">
                    <Asset getImageFile={getImageFile} assetFiles={assetFiles}/>
                </article>
            </article>
        )
    }
}