import * as React from "react";
import Button from "antd/lib/button";
import {addName} from "../../../../../typescript/decorator";

interface IProps{
    rotate:Function;
}

@addName("Rotation")
export default class Rotation extends React.Component<IProps,any>{
    constructor(props:IProps){
        super(props);
    }

    setAngle(value:number){
        this.props.rotate(value,0,1,0);
    }

    render(){
        return(
            <div className="btns">
                <p>rotate:</p>
                <Button type="primary" onClick={()=>this.setAngle(1)}>angle: +1</Button>
                <Button type="primary" onClick={()=>this.setAngle(-1)}>angle: -1</Button>
            </div>
        )
    }
}
