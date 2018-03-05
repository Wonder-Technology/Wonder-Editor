open EditorStateDataTypeEdit;

let editorState = {sceneData: {scene: None, currentGameObject: None}};

let stateData = {state: editorState, isDebug: true};

let getStateIsDebug = () => stateData.isDebug;