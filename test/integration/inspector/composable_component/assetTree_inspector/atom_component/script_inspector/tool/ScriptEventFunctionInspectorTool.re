let updateEventFunctionData = (nodeId, name, eventFunctionJsObjStr) =>
  ScriptEventFunctionInspector.Method.updateEventFunctionData(
    nodeId,
    name,
    eventFunctionJsObjStr,
  );

let getEventFunctionData = (nodeId, editorState) => {
  open NodeAssetType;

  let {eventFunctionData} =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId)
    |> StateLogicService.getEditorState
    |> ScriptEventFunctionNodeAssetService.getNodeData;

  eventFunctionData;
};

let getEventFunctionName = (nodeId, editorState) => {
  open NodeAssetType;

  let {name}: scriptEventFunctionNodeData =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId)
    |> StateLogicService.getEditorState
    |> ScriptEventFunctionNodeAssetService.getNodeData;

  name;
};

let getEventFunctionDataJsObjStr = (nodeId, editorState) =>
  ScriptEventFunctionInspector.Method.convertEventFunctionDataToJsObjStr(
    getEventFunctionData(nodeId, editorState),
  )
  |> StringTool.removeNewLinesAndSpaces;

let buildEventFunctionDataJsObjStr =
    (~initFunc=None, ~updateFunc=None, ~disposeFunc=None, ()) =>
  ScriptEventFunctionInspector.Method.convertEventFunctionDataToJsObjStr({
    init: initFunc,
    update: updateFunc,
    dispose: disposeFunc,
  });

let buildEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces =
    (~initFunc=None, ~updateFunc=None, ~disposeFunc=None, ()) =>
  buildEventFunctionDataJsObjStr(~initFunc, ~updateFunc, ~disposeFunc, ())
  |> StringTool.removeNewLinesAndSpaces;

module TestUpdateScriptEventFunctionInAllScriptComponents = {
  let createDefaultSceneAndAddScriptComponent = sandbox => {
    MainEditorSceneTool.createDefaultScene(
      sandbox,
      MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
    );

    MainEditorInspectorAddComponentTool.addScriptComponent();
  };

  let prepareForOneScriptComponent = sandbox => {
    let script = GameObjectTool.getCurrentSceneTreeNodeScript();
    let assetTreeData =
      MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
    let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
    MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

    MainEditorScriptEventFunctionTool.addScriptEventFunction(
      ~script,
      ~send=SinonTool.createOneLengthStub(sandbox^),
      (),
    );

    (script, addedNodeId);
  };
};