import * as React from "react";
import {connect} from "react-redux";
import * as CountAction from "../action/Action";
import {bindActionCreators} from "redux";
import {ActionType} from "../action/Action";
import Index from "../../core/ui/Index";

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
        const {position,angle,gameObject} = this.props;
        return (
            <div className="root" >
                <Index></Index>
                <div className="root_btn">
                    <div className="btns">
                        <p>translate:</p>
                        <button onClick={()=>this._actions.positionX(0.1)}>x:+0.1</button>
                        <button onClick={()=>this._actions.positionX(-0.1)}>x:-0.1</button>
                        <button onClick={()=>this._actions.positionY(0.1)}>y:+0.1</button>
                        <button onClick={()=>this._actions.positionY(-0.1)}>y:-0.1</button>
                        <button onClick={()=>this._actions.positionZ(0.1)}>z:+0.1</button>
                        <button onClick={()=>this._actions.positionZ(-0.1)}>z:-0.1</button>
                    </div>
                    <div className="btns">
                        <p>rotate:</p>
                        <button onClick={()=>this._actions.angle(1)}>angle:+1</button>
                        <button onClick={()=>this._actions.angle(-1)}>angle:-1</button>
                    </div>
                    <div className="btns">
                        <p>gameobject:</p>
                        <button onClick={()=>this._actions.GameObject("triangle")}>add triangle</button>
                        <button onClick={()=>this._actions.GameObject("cube")}>add cube</button>
                    </div>
                </div>
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
