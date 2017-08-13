import * as React from "react";
interface Props{
    angleClick:Function;
}

export default class Angle extends React.Component<Props,any>{
    constructor(props:Props){
        super(props);
    }
    render(){
        let {angleClick} = this.props;
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
