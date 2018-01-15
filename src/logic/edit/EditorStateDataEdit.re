open EditorStateDataTypeEdit;

let editorState = {sceneData: {scene: None, currentGameObject: None}};

let stateData = {state: editorState, isTest: true, isDebug: true};

let getStateIsDebug = () => stateData.isDebug;