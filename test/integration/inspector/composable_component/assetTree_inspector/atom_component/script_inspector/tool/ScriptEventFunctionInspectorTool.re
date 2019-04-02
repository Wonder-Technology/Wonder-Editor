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
  })
  |> StringTool.removeNewLinesAndSpaces;