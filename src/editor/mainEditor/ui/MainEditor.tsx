import * as React from "react";
import Transform from "../components/transform/ui/Transform";
import SceneTree from "../components/sceneTree/ui/SceneTree";
import { resizeCanvas } from "../utils/canvasUtils";
import { start } from "../logic/view/MainView";
import Asset from "../components/asset/ui/Asset";
import {setCurrentGameObject} from "../logic/view/SceneView";
import {
    insertDragedTreeNodeToTargetTreeNode, setSceneTreeData,
    updateTreeNodeParent
} from "../components/sceneTree/logic/view/SceneTreeView";

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

        var sceneTreeProps ={
            getSceneTreeData,
            setCurrentGameObject,
            insertDragedTreeNodeToTargetTreeNode,
            updateTreeNodeParent,
            setSceneTreeData,

            sceneTreeData
        };

        return (
            <div className="main-editor">
                <div className="vertical-direction">
                    <SceneTree {...sceneTreeProps}  />
                    <div className="canvas-parent">
                        <canvas id="webgl"></canvas>
                    </div>
                    <Transform/>

                </div>
                <div className="horizontal-direction">
                    <Asset getImageFile={getImageFile} assetFiles={assetFiles}/>
                </div>
            </div>
        )
    }
}