import * as React from "react";
interface Props{
    clicks:Object;
    position:Object;
}

export default class Position extends React.Component<Props,any>{
    constructor(props:Props){
        super(props);
    }
    render(){
        let {clicks,position} = this.props;
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
