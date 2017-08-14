import * as React from "react";
import {setRotate} from "../../logic/view/MainViewSystem";
interface Props{
    angleClick:Function;
    angle:number;
}

export default class Angle extends React.Component<Props,any>{
    constructor(props:Props){
        super(props);
    }
    render(){
        let {angleClick,angle} = this.props;

        if(angle){
            setRotate(angle);
        }

        return(
            <div className="btns">
                <p>translate:</p>
                <div className="btns">
                    <p>rotate:</p>
                    <button onClick={()=>angleClick(1)}>angle:+1</button>
                    <button onClick={()=>angleClick(-1)}>angle:-1</button>
                </div>
            </div>
        )
    }
}
