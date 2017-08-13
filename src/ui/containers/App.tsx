import * as React from "react";
import {connect} from "react-redux";
import * as CountAction from "../../mainEditor/ui/action/Action";
import {bindActionCreators} from "redux";
import MainEditor from "../../mainEditor/ui/MainEditor";
import {ActionType} from "../../mainEditor/ui/action/Action";

interface Props{
    dispatch:Function;
}

class App extends React.Component<Props,any>{

    constructor(props:Props){
        super(props);
    }

    private _dispatch = this.props.dispatch;
    private _actions:ActionType = bindActionCreators(CountAction,this._dispatch);

    render(){
        return (
            <div className="root" >
                <MainEditor {...this.props} {...this._actions}></MainEditor>
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>{
    console.log(state);
    return {
        position:state.position,
        angle:state.angle,
        gameObject:state.gameObject,
    }
};

export default connect(mapStateToProps)(App);
