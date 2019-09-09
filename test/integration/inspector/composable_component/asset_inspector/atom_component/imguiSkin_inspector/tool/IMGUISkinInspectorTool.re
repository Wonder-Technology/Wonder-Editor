let addSkin = nodeId => {
  let (editorState, engineState) = (
    StateEditorService.getState(),
    StateEngineService.unsafeGetState(),
  );

  ExtendIMGUIEngineService.addSkinData(
    IMGUISkinNodeAssetEditorService.getNodeName(nodeId, editorState),
    IMGUISkinNodeAssetEditorService.getSingleSkinData(nodeId, editorState),
    engineState,
  )
  |> StateEngineService.setState
  |> ignore;
};

let createButtonSkinData =
    (
      ~buttonColor=[|0., 0., 0.|],
      ~hoverButtonColor=[|0., 0., 0.|],
      ~clickButtonColor=[|0., 0., 0.|],
      ~buttonImage=Js.Nullable.null,
      ~hoverButtonImage=Js.Nullable.null,
      ~clickButtonImage=Js.Nullable.null,
      ~fontAlign=WonderImgui.FontType.Left,
      ~fontColor=[|0., 0., 0.|],
      (),
    ) =>
  ExtendIMGUIEngineService.createButtonSkinData(
    buttonColor,
    hoverButtonColor,
    clickButtonColor,
    buttonImage,
    hoverButtonImage,
    clickButtonImage,
    fontAlign,
    fontColor,
  );

let createAllCustomStyleData1 = () =>
  ExtendIMGUIEngineService.createAllCustomStyleData()
  |> ExtendIMGUIEngineService.addSingleCustomStyleData(
       "s1",
       ExtendIMGUIEngineService.createSingleCustomStyleData()
       |> ExtendIMGUIEngineService.addCustomStyleData("c1", Obj.magic(1)),
     );

let setNodeData =
    (
      ~nodeId,
      ~name="",
      ~buttonSkinData=ExtendIMGUIEngineService.createButtonSkinData(
                        [|0., 0., 0.|],
                        [|0., 0., 0.|],
                        [|0., 0., 0.|],
                        Js.Nullable.null,
                        Js.Nullable.null,
                        Js.Nullable.null,
                        WonderImgui.FontType.Left,
                        [|0., 0., 0.|],
                      ),
      ~allCustomStyleData=ExtendIMGUIEngineService.createAllCustomStyleData(),
      ~editorState=StateEditorService.getState(),
      (),
    ) =>
  IMGUISkinNodeAssetEditorService.setNodeData(
    nodeId,
    IMGUISkinNodeAssetService.buildNodeData(
      ~name,
      ~buttonSkinData,
      ~allCustomStyleData,
    ),
    editorState,
  );

/* let buildSkinFuncStr1 = () => {|function (skinFuncData, showData, apiJsObj, record){
       var box = apiJsObj.box;

       return [record, null];
    }|};

   let buildSkinFunc1 = () =>
     buildSkinFuncStr1() |> SerializeService.deserializeFunction; */

let submitAll =
    (
      ~nodeId,
      ~buttonSkinData,
      ~allCustomStyleDataStr,
      ~originSkinName,
      ~send=SinonTool.createOneLengthStub(Sinon.createSandbox()),
      (),
    ) =>
  IMGUISkinInspector.Method.submit(
    nodeId,
    {buttonSkinData, allCustomStyleDataStr, originSkinName}: IMGUISkinInspector.state,
    send,
  );

let serializeAllCustomStyleData = IMGUISkinInspector.Method.buildAllCustomStyleDataInputValue;

let deserializeAllCustomStyleData = IMGUISkinInspector.Method._convertInputValueStrToAllCustomStyleData;