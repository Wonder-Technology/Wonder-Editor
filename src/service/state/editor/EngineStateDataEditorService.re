open EditorStateDataType;

let getEditEngineStateData = () => EditorStateData.editorStateData.engineStateDataForEdit;

let getRunEngineStateData = () => EditorStateData.editorStateData.engineStateDataForRun;

let getIsRun = () => EditorStateData.editorStateData.isRun;

let setIsRun = (isRun) => EditorStateData.editorStateData.isRun = isRun;