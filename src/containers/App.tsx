import * as React from "react";
import {connect} from "react-redux";
import * as CountAction from "../action/Action";
import {bindActionCreators} from "redux";
import {ActionType} from "../action/Action";

interface Props{
    dispatch:Function;
    info:any;
}

class App extends React.Component<Props,any>{

    constructor(props:Props){
        super(props);
    }

    private _dispatch = this.props.dispatch;
    private _actions:ActionType = bindActionCreators(CountAction,this._dispatch);

    componentDidMount(){
        this._actions.requestPosts("./text.json");
    }

    render(){
        const {loaded,name,age,url} = this.props.info;
        return (
            <div>
                <div>{!loaded && <span>loading...</span> }</div>
                <div>{loaded &&
                    <p>{name+","+age+","+url}</p>
                }</div>
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>{
    console.log(state)
    return {
        info:state
    }
}

export default connect(mapStateToProps)(App);
