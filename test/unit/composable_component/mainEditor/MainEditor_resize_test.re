open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;

let _ =
  describe("test mainEditor resize", () => {
    let sandbox = getSandboxDefaultVal();
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
      let parentDom =
        {"offsetWidth": 300., "offsetHeight": 500.} |> Obj.magic;
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

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~initPipelines=
              {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_imgui"
        }
      ]
    }
  ]
        |},
            ~initJobs=
              {|
        [
          { "name": "init_imgui" }
        ]
        |},
            ~loopPipelines=
              {|
        [
    {
      "name": "default",
      "jobs": [
      ]
    }
  ]
        |},
            ~loopJobs={|
        []
        |},
            (),
          ),
        (),
      );

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test resize should set canvas size and set viewport", () => {
      test(
        "test two canvas width and height should == these parent width and height",
        () => {
        let (parentDom, editCanvasDom, runCanvasDom) =
          stubCanvasParentAndCanvas(sandbox);

        MainEditor.Method.resizeCanvasAndViewPort();

        (
          editCanvasDom##width,
          editCanvasDom##height,
          runCanvasDom##width,
          runCanvasDom##height,
        )
        |>
        expect == (
                    parentDom##offsetWidth,
                    parentDom##offsetHeight,
                    parentDom##offsetWidth,
                    parentDom##offsetHeight,
                  );
      });
      test(
        "test two canvas viewport should == canvas parent width and height", () => {
        let (parentDom, editCanvasDom, runCanvasDom) =
          stubCanvasParentAndCanvas(sandbox);

        MainEditor.Method.resizeCanvasAndViewPort();

        let (_, _, editWidth, editHeight) =
          StateLogicService.getEditEngineState()
          |> DeviceManagerEngineService.getViewport
          |> OptionService.unsafeGet;

        let (_, _, runWidth, runHeight) =
          StateLogicService.getRunEngineState()
          |> DeviceManagerEngineService.getViewport
          |> OptionService.unsafeGet;

        (editWidth, editHeight, runWidth, runHeight)
        |>
        expect == (
                    parentDom##offsetWidth,
                    parentDom##offsetHeight,
                    parentDom##offsetWidth,
                    parentDom##offsetHeight,
                  );
      });
    });
  });