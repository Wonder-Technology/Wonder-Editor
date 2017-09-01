import * as React from "react";
import {connect} from "react-redux";
import ColorPicker from '../components/ColorPicker'
// import {bindActionCreators} from "redux";
import MainEditor from "../../editor/mainEditor/ui/MainEditor";

interface IProps{
    dispatch:Function;
}

interface IState {
    testColor: string
}

class App extends React.Component<IProps,IState>{

    constructor(props:IProps){
        super(props);

        this.state = {
            testColor: "#FFFFFF"
        }
    }

    // private _dispatch = this.props.dispatch;
    // private _actions:ActionType = bindActionCreators(CountAction,this._dispatch);

    render(){
        return (
            <div className="root" >
                {/*<MainEditor {...this.props} {...this._actions}></MainEditor>*/}
                <MainEditor></MainEditor>

                <div style={{
                    position: "absolute",
                    top: "20%",
                    left: "20%",
                    width: "100px",
                    height: "30px",
                }}>
                    <ColorPicker color={this.state.testColor} onChange={ (color) => this.handleChange(color)} />
                </div>
            </div>
        )
    }

    handleChange(color: string) {
        this.setState({ testColor: color })
    } 
}

const mapStateToProps = (state:any)=>{
    return {
    }
};

export default connect(mapStateToProps)(App);
