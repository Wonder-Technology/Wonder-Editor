open EditorStateDataType;

let getEngineStateDataForEdit = () => EditorStateData.editorStateData.engineStateDataForEdit;

let getEngineStateDataForRun = () => EditorStateData.editorStateData.engineStateDataForRun;

let getIsRun = () => EditorStateData.editorStateData.isRun;

let setIsRun = (isRun) => EditorStateData.editorStateData.isRun = isRun;