import * as React from "react";
import {connect} from "react-redux";
import * as CountAction from "../action/Action";
import {bindActionCreators} from "redux";
import {ActionType} from "../action/Action";

interface Props{
    dispatch:Function;
}

class App extends React.Component<Props,any>{

    constructor(props:Props){
        super(props);
    }

    private _dispatch = this.props.dispatch;
    private _actions:ActionType = bindActionCreators(CountAction,this._dispatch);

    componentDidMount(){
        console.log(this._actions)
        this._actions.fetchUser("redux-observable");
    }

    render(){
        const {info} = this.props;
        const user = info["redux-observable"] || "";
        return (
            <div>
                <div>{user && <span>{JSON.stringify(user)}</span> }</div>
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>{
    return {
        info:state
    }
}

export default connect(mapStateToProps)(App);
