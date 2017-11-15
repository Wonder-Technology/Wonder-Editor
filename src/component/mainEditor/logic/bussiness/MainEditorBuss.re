/* let createState = () => {
    /* todo create editor state in edit layer */
    a:1
}; */

let createEditorState = () => {
StateSystemEdit.createState()
};
/* let getEditorState = () => {

}; */

let setEditorState = (editorState) => {
    StateSystemEdit.setState(StateDataEdit.stateData, editorState)
};

/* let getEngineState = () => {

}; */

/* let setEngineStateToEngineData = (engineState) => {

}; */

let initEngineMain = (canvasId) => {
    MainEditorMainOper.init(canvasId);
};

let initEngineDirector = (engineState) => {
    MainEditorDirectorOper.init(engineState);
};

let loopBody = (time:float, ( editorState, engineState )) => {
    let engineState = MainEditorDirectorOper.loopBody(time, engineState);

    (editorState, engineState)
};