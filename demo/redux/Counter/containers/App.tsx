import * as React from "react";
import {connect} from "react-redux";
import * as CountAction from "../action/Action";
import Counter from "../components/Counter";
import {bindActionCreators} from "redux";

class App extends React.Component<any,any>{
    render(){
        const {dispatch} = this.props;
        const boundAction = bindActionCreators(CountAction,dispatch);

        return (
            <Counter {...this.props} {...boundAction}></Counter>
        )
    }
}

const mapStateToProps = (state:any)=>{
    console.log(state)
    return {
        countNumber:state.countReducer.present.countNumber,
        name:state.countReducer.present.name,
        age:state.countReducer.present.age
    }
}

export default connect(mapStateToProps)(App);
