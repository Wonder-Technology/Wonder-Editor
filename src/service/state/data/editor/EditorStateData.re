open EditorType;

open EditorStateDataType;

let _createState = () => {sceneRecord: {root: None, currentGameObject: None}};

let editorStateData = {state: _createState(), isDebug: true};