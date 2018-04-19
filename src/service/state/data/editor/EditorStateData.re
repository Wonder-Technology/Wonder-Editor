open EditorType;

open EditorStateDataType;

let _createState = () => {
  sceneRecord: {root: None, diffMap: None, currentGameObject: None, isRun: false},
  loopId: (-1)
};

let editorStateData = {
  state: _createState(),
  isDebug: true,
  engineStateDataForEdit: StateEngineService.createStateData(),
  engineStateDataForRun: StateEngineService.createStateData()
};