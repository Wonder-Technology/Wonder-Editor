open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;

let _ =
  describe("test mainEditor resize", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareState = () => {
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
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("resizeCanvasAndViewPort", () => {
      describe("set canvas size", () =>
        test(
          "canvan's width and height should == parent's width and height", () => {
          _prepareState();
          let (parentDom, canvasDom) =
            IMGUITool.stubCanvasParentAndCanvas(sandbox);

          MainEditor.Method.resizeCanvasAndViewPort();

          (canvasDom##width, canvasDom##height)
          |> expect == (parentDom##offsetWidth, parentDom##offsetHeight);
        })
      );

      /* describe("send uniform projection mat data", () =>
           test("test", () => {
             _prepareState();
             let (parentDom, canvasDom) =
               IMGUITool.stubCanvasParentAndCanvas(sandbox);
             let gl = FakeGlToolEngine.getEngineStateGl();
             let pos1 = 10;
             gl##getUniformLocation
             |> withTwoArgs(Sinon.matchAny, "u_projectionMat")
             |> returns(pos1);

             MainEditor.Method.resizeCanvasAndViewPort();

             gl##uniformMatrix4fv
             |> withOneArg(pos1)
             |> getCallCount
             |> expect == 1;
           })
         ); */

      describe("set viewport", () =>
        test(
          "canvas's viewport should == canvas parent's width and height", () => {
          _prepareState();
          let (parentDom, canvasDom) =
            IMGUITool.stubCanvasParentAndCanvas(sandbox);

          MainEditor.Method.resizeCanvasAndViewPort();

          let (_, _, width, height) =
            StateEngineService.unsafeGetState()
            |> DeviceManagerEngineService.getViewport
            |> OptionService.unsafeGet;

          (width, height)
          |> expect == (parentDom##offsetWidth, parentDom##offsetHeight);
        })
      );

      describe("update view rect", () =>
        test("update scene view and game view rect", () => {
          _prepareState();
          let (parentDom, canvasDom) =
            IMGUITool.stubCanvasParentAndCanvas(sandbox);
          let width = parentDom##offsetWidth;
          let height = parentDom##offsetHeight;

          MainEditor.Method.resizeCanvasAndViewPort();

          let editorState = StateEditorService.getState();
          (
            SceneViewEditorService.unsafeGetViewRect(editorState),
            GameViewEditorService.unsafeGetViewRect(editorState),
          )
          |>
          expect == (
                      (0, 0, width / 2, height),
                      (width / 2, height, width / 2, height),
                    );
        })
      );

      describe("update all cameraProjections by new aspect", () => {
        let _setFakeCanvasd = (width, height) =>
          SettingToolEngine.setFakeCanvasToEngineState(~width, ~height, ());

        let _getAllPMatrixs = engineState =>
          GameObjectComponentEngineService.getAllPerspectiveCameraProjectionComponents(
            engineState,
          )
          |> Js.Array.map(cameraProjection =>
               engineState
               |> Wonderjs.PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraProjectionPMatrix(
                    cameraProjection,
                  )
             );

        beforeEach(() => {
          MainEditorSceneTool.initStateWithJob(
            ~sandbox,
            ~noWorkerJobRecord=
              NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
                ~loopPipelines=
                  {|
                [
            {
              "name": "default",
              "jobs": [
                {
                  "name": "update_camera"
                }
              ]
            }
          ]
                |},
                ~loopJobs=
                  {|
                [
                {
                  "name": "update_camera"
                }
                ]
                |},
                (),
              ),
            (),
          );

          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
          );

          DirectorToolEngine.prepareAllEnginState();
        });

        test(
          "test resize twice(the first resize is to mark all cameraProjections not dirty)",
          () => {
            _setFakeCanvasd(200., 200.);
            let (parentDom, canvasDom) =
              IMGUITool.stubCanvasParentAndCanvas(sandbox);

            MainEditor.Method.resizeCanvasAndViewPort();
            _setFakeCanvasd(100., 200.);
            MainEditor.Method.resizeCanvasAndViewPort();

            let engineState = StateEngineService.unsafeGetState();
            let pMatrix =
              PerspectiveCameraProjectionToolEngine.buildPerspective(
                60.,
                100. /. 200.,
                0.1,
                1000.,
              );

            _getAllPMatrixs(engineState) |> expect == [|pMatrix, pMatrix|];
          },
        );
      });
    });
  });