open EditorStateDataType;

/* TODO remove ee, re state data */
let getEditEngineStateData = () => CreateEditorStateDataEditorService.editorStateData.engineStateDataForEdit;

let getRunEngineStateData = () => CreateEditorStateDataEditorService.editorStateData.engineStateDataForRun;