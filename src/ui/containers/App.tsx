import * as React from "react";
import {connect} from "react-redux";
// import {bindActionCreators} from "redux";
import MainEditor from "../../editor/mainEditor/ui/MainEditor";

interface IProps{
    dispatch:Function;
}

class App extends React.Component<IProps,any>{

    constructor(props:IProps){
        super(props);
    }

    // private _dispatch = this.props.dispatch;
    // private _actions:ActionType = bindActionCreators(CountAction,this._dispatch);

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
    return {
    }
};

export default connect(mapStateToProps)(App);
