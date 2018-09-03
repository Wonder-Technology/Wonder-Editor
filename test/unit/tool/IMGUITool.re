let unsafeGetIMGUIFuncStr = state =>
  ManageIMGUIEngineService.getIMGUIFunc(state)
  |> OptionService.unsafeGet
  |> Obj.magic
  |> Wonderjs.SerializeService.serializeFunction
  |> StringTool.removeNewLinesAndSpaces;

let prepareFntData = state =>
  Wonderjs.StateDataMainType.{
    ...state,
    imguiRecord: {
      ...state.imguiRecord,
      wonderImguiIMGUIRecord:
        WonderImgui.RenderIMGUITool.prepareFntData(
          Wonderjs.RecordIMGUIMainService.getWonderIMGUIRecord(state),
        ),
    },
  };

let prepareImgui = () => {
  let prepareFontAsset = state =>
    Wonderjs.StateDataMainType.{
      ...state,
      imguiRecord: {
        ...state.imguiRecord,
        wonderImguiIMGUIRecord:
          state.imguiRecord.wonderImguiIMGUIRecord
          |> WonderImgui.AssetTool.prepareFontAsset,
      },
    };

  StateLogicService.getEditEngineState()
  |> prepareFontAsset
  |> StateLogicService.setEditEngineState;
  StateLogicService.getRunEngineState()
  |> prepareFontAsset
  |> StateLogicService.setRunEngineState;

  TestToolEngine.initEngineState();
};

let stubCanvasParentAndCanvas = sandbox => {
  open Sinon;

  let parentDom = {"offsetWidth": 300., "offsetHeight": 500.} |> Obj.magic;
  let editCanvasDom = BuildCanvasTool.getFakeCanvasDom("a", sandbox);
  let runCanvasDom = BuildCanvasTool.getFakeCanvasDom("a", sandbox);
  let getElementStub =
    createMethodStubWithJsObjSandbox(
      sandbox,
      BuildCanvasTool.documentToJsObj(BuildCanvasTool.document),
      "getElementById",
    );

  getElementStub
  |> withOneArg("editCanvasParent")
  |> returns(parentDom)
  |> ignore;

  getElementStub
  |> withOneArg("editCanvas")
  |> returns(editCanvasDom)
  |> stubToJsObj
  |> ignore;

  getElementStub
  |> withOneArg("runCanvas")
  |> returns(runCanvasDom)
  |> stubToJsObj
  |> ignore;

  prepareImgui();

  (parentDom, editCanvasDom, runCanvasDom);
};