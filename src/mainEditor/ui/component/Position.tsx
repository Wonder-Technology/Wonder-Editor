import * as React from "react";
import {setTranslate} from "../../logic/view/MainViewSystem";

interface clicksType{
    xClick:Function;
    yClick:Function;
    zClick:Function;
}

interface Props{
    clicks:clicksType;
    position:any;
}

export default class Position extends React.Component<Props,any>{
    constructor(props:Props){
        super(props);
    }
    render(){
        let {clicks,position} = this.props;

        if(position){
            setTranslate(position.x,position.y,position.z);
        }

        return(
            <div className="btns">
                <p>translate:</p>
                <button onClick={()=>clicks.xClick(0.1)}>x:+0.1</button>
                <button onClick={()=>clicks.xClick(-0.1)}>x:-0.1</button>
                <button onClick={()=>clicks.yClick(0.1)}>y:+0.1</button>
                <button onClick={()=>clicks.yClick(-0.1)}>y:-0.1</button>
                <button onClick={()=>clicks.zClick(0.1)}>z:+0.1</button>
                <button onClick={()=>clicks.zClick(-0.1)}>z:-0.1</button>
            </div>
        )
    }
}
