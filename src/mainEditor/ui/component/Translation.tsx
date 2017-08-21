import * as React from "react";
import {addName} from "../../../ts/decorator";

interface Props{
    translate:Function;
}

@addName("Position")
export default class Position extends React.Component<Props,any>{
    constructor(props:Props){
        super(props);
    }

    clickX(value:number){
        this.props.translate(value,0,0);
    }

    clickY(value:number){
        this.props.translate(0,value,0);
    }

    clickZ(value:number){
        this.props.translate(0,0,value);
    }

    render(){
        return(
            <div className="btns">
                <p>translate:</p>
                <button onClick={()=>this.clickX(0.1)}>x:+0.1</button>
                <button onClick={()=>this.clickX(-0.1)}>x:-0.1</button>
                <button onClick={()=>this.clickY(0.1)}>y:+0.1</button>
                <button onClick={()=>this.clickY(-0.1)}>y:-0.1</button>
                <button onClick={()=>this.clickZ(0.1)}>z:+0.1</button>
                <button onClick={()=>this.clickZ(-0.1)}>z:-0.1</button>
            </div>
        )
    }
}
