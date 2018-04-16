open EditorStateDataType;

let getEditEngineStateData = () => EditorStateData.editorStateData.engineStateDataForEdit;

let getRunEngineStateData = () => EditorStateData.editorStateData.engineStateDataForRun;

/* TODO move to editorState->sceneRecord */
/* let getIsRun = () => EditorStateData.editorStateData.isRun;

let setIsRun = (isRun) => EditorStateData.editorStateData.isRun = isRun; */