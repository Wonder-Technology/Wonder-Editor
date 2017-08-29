import * as React from "react";
import Translation from "./component/Translation";
import {setTriangleTranslation} from "../logic/view/TransformView";

interface IProps{
}

export default class Transform extends React.Component<IProps,any>{
    constructor(props:IProps){
        super(props);
    }

    render(){
        return(
            <div>
                <div className="root-btn">
                    <Translation translate={setTriangleTranslation}></Translation>
                    {/*<Rotation rotate={setTriangleEulerAngle}></Rotation>*/}
                </div>
            </div>
        )
    }
}
