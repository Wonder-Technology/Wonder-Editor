import * as React from "react";
import {main} from "../logic/view/MainViewSystem";
import Transform from "../transform/ui/Transform";

interface IProps{
}

export default class MainEditor extends React.Component<IProps,any>{
    constructor(props:IProps){
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
        return(
            <div>
                <div id="parent"></div>
                <div className="root-btn">
                    <Transform/>
                    {/*<TreeCom/>*/}
                </div>
            </div>
        )
    }
}
