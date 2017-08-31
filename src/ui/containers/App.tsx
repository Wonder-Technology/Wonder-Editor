import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import MainEditor from "../../editor/mainEditor/ui/MainEditor";
import {IAction} from "../action/Action";
import * as CountAction from "../../editor/mainEditor/sceneTree/ui/action/SceneTreeAction";

interface IProps{
    dispatch:any;
}

class App extends React.Component<IProps,any>{

    constructor(props:IProps){
        super(props);
    }

    private _dispatch = this.props.dispatch;
    private _actions:IAction = bindActionCreators(CountAction,this._dispatch);

    render(){
        return (
            <div className="root" >
                {/*<MainEditor {...this.props} {...this._actions}></MainEditor>*/}
                <MainEditor></MainEditor>
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
