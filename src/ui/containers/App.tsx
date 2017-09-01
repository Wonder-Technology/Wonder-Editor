import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import MainEditor from "../../editor/mainEditor/ui/MainEditor";
import {getAllAction, IAction} from "../action/Action";

interface IProps{
    dispatch:any;
}

class App extends React.Component<IProps,any>{

    constructor(props:IProps){
        super(props);
    }

    private _dispatch = this.props.dispatch;

    render(){
        var actions:IAction = bindActionCreators(getAllAction(),this._dispatch);

        return (
            <div className="root" >
                <MainEditor {...this.props} {...actions}></MainEditor>
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>{
    console.log(state)
    return {
        sceneTree:state.sceneTree
    }
};

export default connect(mapStateToProps)(App);
