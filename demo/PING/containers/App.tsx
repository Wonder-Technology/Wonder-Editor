import * as React from "react";
import {connect} from "react-redux";
import * as CountAction from "../action/Action";
import {bindActionCreators} from "redux";

class App extends React.Component<any,any>{
    render(){
        const {dispatch,isPinging} = this.props;
        const boundAction = bindActionCreators(CountAction,dispatch);

        console.log(isPinging,boundAction)
        return (
            <div>
                <h1>isPinging:{isPinging+""}</h1>
                <button onClick={boundAction.ping}>xme</button>
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>{
    return {
        isPinging:state.isPinging
    }
}

export default connect(mapStateToProps)(App);
