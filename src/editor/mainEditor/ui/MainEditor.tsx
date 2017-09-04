import * as React from "react";
import Transform from "../transform/ui/Transform";
import SceneTree from "../sceneTree/ui/SceneTree";
import {resizeCanvas} from "./utils/canvasUtils";
import {start} from "../logic/view/MainView";

interface IProps{
    getSceneData:Function;
    sceneTree:any;
}

export default class MainEditor extends React.Component<IProps,any>{
    constructor(props:IProps){
        super(props);
    }

    componentDidMount(){
        start();
        this.props.getSceneData();

        resizeCanvas();
    }

    render(){
/*        var names = ["A","B"];
        names.forEach(item => {
            switch (item){
                case getComponentName(A):this._fcks.push(<A></A>);break;
                case getComponentName(B):this._fcks.push(<B name="wejhfjkwef"></B>);break;
            }
        });*/
        var {getSceneData,sceneTree} = this.props;
        return(
            <div className="main-editor">
                <SceneTree getSceneData={getSceneData} sceneTree={sceneTree}/>
                <div className="canvas-parent">
                    <canvas id="webgl"></canvas>
                </div>
                <Transform/>
            </div>
        )
    }
}
