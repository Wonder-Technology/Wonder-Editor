let addCustomControl = nodeId => {
  let (editorState, engineState) = (
    StateEditorService.getState(),
    StateEngineService.unsafeGetState(),
  );

  ExtendIMGUIEngineService.registerCustomControl(
    IMGUICustomControlNodeAssetEditorService.getNodeName(nodeId, editorState),
    IMGUICustomControlNodeAssetEditorService.getCustomControlFunc(
      nodeId,
      editorState,
    ),
    engineState,
  )
  |> StateEngineService.setState
  |> ignore;
};

let setNodeData =
    (
      ~nodeId,
      ~name,
      ~customControlFunc,
      ~editorState=StateEditorService.getState(),
      (),
    ) =>
  IMGUICustomControlNodeAssetEditorService.setNodeData(
    nodeId,
    IMGUICustomControlNodeAssetService.buildNodeData(
      ~name,
      ~customControlFunc,
    ),
    editorState,
  );

let buildCustomControlFuncStr1 = () => {|function (customControlFuncData, showData, apiJsObj, record){
    var box = apiJsObj.box;

    return [record, null];
 }|};

let buildCustomControlFunc1 = () =>
  buildCustomControlFuncStr1() |> SerializeService.deserializeFunction;

let submitAll =
    (
      ~nodeId,
      ~customControlFunc,
      ~originCustomControlName,
      ~send=SinonTool.createOneLengthStub(Sinon.createSandbox()),
      (),
    ) =>
  IMGUICustomControlInspector.Method.submit(
    nodeId,
    {customControlFunc, originCustomControlName}: IMGUICustomControlInspector.state,
    send,
  );