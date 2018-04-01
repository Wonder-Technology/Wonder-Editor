open EditorType;

open EditorStateDataType;

let _createState = () => {sceneRecord: {editRoot: None, runRoot: None, currentGameObject: None}, loopId: (-1)};

let editorStateData = {
  state: _createState(),
  isDebug: true,
  engineStateDataForEdit: StateEngineService.createStateData(),
  engineStateDataForRun: StateEngineService.createStateData(),
  isRun: false
};