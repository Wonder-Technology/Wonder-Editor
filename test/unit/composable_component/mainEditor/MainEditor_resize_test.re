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
          "two canvas's width and height should == these parent's width and height",
          () => {
          _prepareState();
          let (parentDom, editCanvasDom, runCanvasDom) =
            IMGUITool.stubCanvasParentAndCanvas(sandbox);

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
          _prepareState();
          let (parentDom, editCanvasDom, runCanvasDom) =
            IMGUITool.stubCanvasParentAndCanvas(sandbox);
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
          _prepareState();
          let (parentDom, editCanvasDom, _runCanvasDom) =
            IMGUITool.stubCanvasParentAndCanvas(sandbox);

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

      describe("update all cameraProjections by new aspect", () => {
        let _setFakeCanvasd = (width, height) =>
          SettingToolEngine.setFakeCanvasToEditAndRunEngineState(
            ~width,
            ~height,
            (),
          );

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
            let (parentDom, editCanvasDom, runCanvasDom) =
              IMGUITool.stubCanvasParentAndCanvas(sandbox);

            MainEditor.Method.resizeCanvasAndViewPort();
            _setFakeCanvasd(100., 200.);
            MainEditor.Method.resizeCanvasAndViewPort();

            let editEngineState = StateLogicService.getEditEngineState();
            let runEngineState = StateLogicService.getRunEngineState();
            let pMatrix =
              PerspectiveCameraProjectionToolEngine.buildPerspective(
                60.,
                100. /. 200.,
                0.1,
                1000.,
              );
            (
              _getAllPMatrixs(editEngineState),
              _getAllPMatrixs(runEngineState),
            )
            |> expect == ([|pMatrix, pMatrix|], [|pMatrix|]);
          },
        );
      });
    });
  });