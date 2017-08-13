import * as React from "react";
import {main} from "../logic/Main";
import Position from "./component/Position";
import Angle from "./component/Angle";

interface Props{
    positionX:Function;
    positionY:Function;
    positionZ:Function;
    changeAngle:Function;
}

export default class MainEditor extends React.Component<Props,any>{
    constructor(props:Props){
        super(props);
    }

    componentDidMount(){
        main();
    }

    render(){
/*        var names = ["A","B"];
        names.forEach(item => {
            switch (item){
                case getComponentName(A):this._fcks.push(<A></A>);break;
                case getComponentName(B):this._fcks.push(<B name="wejhfjkwef"></B>);break;
            }
        });*/
        let {position,changeAngle,reset} = this.props;
        let positionClick = {
            xClick:this.props.positionX,
            yClick:this.props.positionY,
            zClick:this.props.positionZ
        };

        reset();

        return(
            <div>
                <div id="parent"></div>
                <div className="root_btn">
                    <Position clicks={positionClick} position={position}></Position>
                    <Angle angleClick={changeAngle}></Angle>
                </div>
            </div>
        )
    }
}
