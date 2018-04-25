open EditorType;

open EditorStateDataType;

let _createState = () => {
  assetRecord: {assetTree: None, index: 0, currentTreeNode: None, imageMap: None},
  sceneRecord: {root: None, diffMap: None, currentGameObject: None, isRun: false},
  currentTree:"",
  loopId: (-1)
};

let editorStateData = {
  state: _createState(),
  isDebug: true,
  engineStateDataForEdit: StateEngineService.createStateData(),
  engineStateDataForRun: StateEngineService.createStateData()
};