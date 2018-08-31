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

    describe("resizeCanvasAndViewPort", () => {
      describe("set canvas size", () =>
        test(
          "two canvas's width and height should == these parent's width and height",
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
        })
      );

      describe("send uniform projection mat data", () =>
        test("test", () => {
          let (parentDom, editCanvasDom, runCanvasDom) =
            stubCanvasParentAndCanvas(sandbox);
          let (editGl, runGl) =
            FakeGlToolEngine.getEditEngineStateGlAndRunEngineStateGl();
          let pos1 = 10;
          let pos2 = 11;
          editGl##getUniformLocation
          |> withTwoArgs(Sinon.matchAny, "u_projectionMat")
          |> returns(pos1);
          runGl##getUniformLocation
          |> withTwoArgs(Sinon.matchAny, "u_projectionMat")
          |> returns(pos2);

          MainEditor.Method.resizeCanvasAndViewPort();

          (
            editGl##uniformMatrix4fv |> withOneArg(pos1) |> getCallCount,
            runGl##uniformMatrix4fv |> withOneArg(pos2) |> getCallCount,
          )
          |> expect == (1, 1);
        })
      );

      describe("set viewport", () =>
        test(
          "two canvas's viewport should == canvas parent's width and height",
          () => {
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
        })
      );
    });
  });