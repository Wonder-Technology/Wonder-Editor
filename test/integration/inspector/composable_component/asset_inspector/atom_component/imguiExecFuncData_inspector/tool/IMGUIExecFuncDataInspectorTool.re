let _getCustomData = (nodeId, editorState) =>
  (
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
    |> IMGUIExecFuncDataNodeAssetService.getNodeData
  ).
    execFuncData.
    customData;

let addExecFuncData = nodeId => {
  let (editorState, engineState) = (
    StateEditorService.getState(),
    StateEngineService.unsafeGetState(),
  );

  ExecIMGUIEngineService.addExecFuncData(
    IMGUIExecFuncDataNodeAssetEditorService.getNodeName(nodeId, editorState),
    _getCustomData(nodeId, editorState),
    IMGUIExecFuncDataNodeAssetEditorService.getExecOrder(nodeId, editorState),
    IMGUIExecFuncDataNodeAssetEditorService.getExecFunc(nodeId, editorState),
    engineState,
  )
  |> StateEngineService.setState
  |> ignore;
};

let setNodeData =
    (
      ~nodeId,
      ~name,
      ~execFunc,
      ~execOrder,
      ~editorState=StateEditorService.getState(),
      (),
    ) =>
  IMGUIExecFuncDataNodeAssetEditorService.setNodeData(
    nodeId,
    IMGUIExecFuncDataNodeAssetService.buildNodeData(
      ~name,
      ~execFunc,
      ~execOrder,
    ),
    editorState,
  );

let buildExecFuncStr1 = () => {|function (customData, imguiAPIJsObj, state){
    var box = imguiAPIJsObj.box;

    return state;
 }|};

let buildExecFunc1 = () =>
  buildExecFuncStr1() |> SerializeService.deserializeFunction;

let submitAll =
    (
      ~nodeId,
      ~execFunc,
      ~execOrder,
      ~originExecFuncDataName,
      ~send=SinonTool.createOneLengthStub(Sinon.createSandbox()),
      (),
    ) =>
  IMGUIExecFuncDataInspector.Method.submit(
    nodeId,
    {execFunc, execOrder, originExecFuncDataName}: IMGUIExecFuncDataInspector.state,
    send,
  );