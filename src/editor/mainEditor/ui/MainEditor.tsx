import * as React from "react";
import {start} from "../logic/view/MainView";
import Transform from "../transform/ui/Transform";
import SceneTree from "../sceneTree/ui/SceneTree";

interface IProps{
}

export default class MainEditor extends React.Component<IProps,any>{
    constructor(props:IProps){
        super(props);
    }

    componentDidMount(){
        start();
    }

    render(){
/*        var names = ["A","B"];
        names.forEach(item => {
            switch (item){
                case getComponentName(A):this._fcks.push(<A></A>);break;
                case getComponentName(B):this._fcks.push(<B name="wejhfjkwef"></B>);break;
            }
        });*/

        return(
            <div className="main-editor">
                <SceneTree />
                <div className="canvas-parent">
                    <canvas id="webgl"></canvas>
                </div>
                <Transform/>
            </div>
        )
    }
}
