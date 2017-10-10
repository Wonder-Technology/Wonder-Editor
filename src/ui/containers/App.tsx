import * as React from "react";
import { connect } from "react-redux";
import MainEditor from "../../editor/mainEditor/ui/MainEditor";
import { getAllAction, IAction } from "../action/Action";
import {isStart} from "../../editor/mainEditor/logic/view/MainView";
import {getCurrentGameObjectUId} from "../../editor/mainEditor/logic/view/SceneView";
import {bindActionCreators} from "redux";

interface IProps {
    dispatch: any;
    bindActionCreators:Function;
}

class App extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
    }

    render() {
        var {dispatch} = this.props;

        var actions: IAction = bindActionCreators(getAllAction(), dispatch);

        var mainEditorProps = {
            isStart,
            getCurrentGameObjectUId
        };

        return (
            <main className="root" >
                <MainEditor {...this.props} {...actions} {...mainEditorProps}></MainEditor>
            </main>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        sceneTreeData: state.sceneTreeData,
        assetFiles:state.assetFiles,
        editorState:state.editorState
    }
};

export default connect(mapStateToProps)(App);
