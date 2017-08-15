import * as React from "react";
import {setTranslate} from "../../logic/view/MainViewSystem";


interface Props{
}

export default class Position extends React.Component<Props,any>{
    constructor(props:Props){
        super(props);
    }

    xClick(value:number){
        setTranslate(value,0,0);
    }

    yClick(value:number){
        setTranslate(0,value,0);
    }

    zClick(value:number){
        setTranslate(0,0,value);
    }

    render(){

        return(
            <div className="btns">
                <p>translate:</p>
                <button onClick={()=>this.xClick(0.1)}>x:+0.1</button>
                <button onClick={()=>this.xClick(-0.1)}>x:-0.1</button>
                <button onClick={()=>this.yClick(0.1)}>y:+0.1</button>
                <button onClick={()=>this.yClick(-0.1)}>y:-0.1</button>
                <button onClick={()=>this.zClick(0.1)}>z:+0.1</button>
                <button onClick={()=>this.zClick(-0.1)}>z:-0.1</button>
            </div>
        )
    }
}
