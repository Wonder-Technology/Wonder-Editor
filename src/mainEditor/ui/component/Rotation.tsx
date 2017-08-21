import * as React from "react";

interface Props{
    rotate:Function;
}

export default class Angle extends React.Component<Props,any>{
    constructor(props:Props){
        super(props);
    }

    angleClick(value:number){
        this.props.rotate(value);
    }

    render(){
        return(
            <div className="btns">
                <p>translate:</p>
                <div className="btns">
                    <p>rotate:</p>
                    <button onClick={()=>this.angleClick(1)}>angle:+1</button>
                    <button onClick={()=>this.angleClick(-1)}>angle:-1</button>
                </div>
            </div>
        )
    }
}
