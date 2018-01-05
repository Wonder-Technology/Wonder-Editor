/* 所有组件的stateType都需要添加到editorState中 */
open MainEditorSceneTypeEdit;

type editorState = {sceneData};

type stateData = {mutable state: editorState,isTest:bool};