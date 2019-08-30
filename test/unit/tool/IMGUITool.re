let unsafeGetIMGUIFuncStr = (name, engineState) =>
  ExecIMGUIEngineService.getExecFunc(name, engineState)
  |> Obj.magic
  |> Wonderjs.SerializeService.serializeFunction;

/* let unsafeGetIMGUIFuncStrFromEditorState = editorState =>
   IMGUIEditorService.unsafeGetGameViewIMGUIFunc(editorState)
   |> Obj.magic
   |> Wonderjs.SerializeService.serializeFunction; */

let getCustomData = (name, engineState) =>
  ExecIMGUIEngineService.getCustomData(name, engineState);

let containMultiline = (source: string, targetLineArray: list(string)) =>
  targetLineArray
  |> List.for_all(targetLine =>
       Js.String.includes(targetLine |> Js.String.trim, source)
     );

let prepareFntData = engineState =>
  Wonderjs.StateDataMainType.{
    ...engineState,
    imguiRecord: {
      ...engineState.imguiRecord,
      wonderImguiIMGUIRecord:
        WonderImgui.RenderIMGUITool.prepareFntData(
          Wonderjs.RecordIMGUIMainService.getWonderIMGUIRecord(engineState),
        ),
    },
  };

let prepareImgui = () => {
  let prepareFontAsset = engineState =>
    Wonderjs.StateDataMainType.{
      ...engineState,
      imguiRecord: {
        ...engineState.imguiRecord,
        wonderImguiIMGUIRecord:
          engineState.imguiRecord.wonderImguiIMGUIRecord
          |> WonderImgui.AssetTool.prepareFontAsset,
      },
    };

  StateEngineService.unsafeGetState()
  |> prepareFontAsset
  |> StateEngineService.setState
  |> ignore;

  TestToolEngine.initEngineState();
};

let stubMainCanvasAndInspectorCanvasDom = sandbox => {
  let (mainParentDom, mainCanvasDom, inspectorParentDom, inspectorCanvasDom) =
    CanvasTool.stubMainCanvasAndInspectorCanvasDom(~sandbox, ());

  prepareImgui();

  (mainParentDom, mainCanvasDom, inspectorParentDom, inspectorCanvasDom);
};