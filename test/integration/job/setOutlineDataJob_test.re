open Wonderjs;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("set outline data job", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareState = () => {
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~isInitJob=false,
        ~context=
          {|
            {
        "alpha": true,
        "depth": true,
        "stencil": true,
        "antialias": true,
        "premultiplied_alpha": true,
        "preserve_drawing_buffer": false
        }
            |},
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~loopPipelines=
              {|
             [
         {
           "name": "default",
           "jobs": [
            {
                "name": "set_outline_data"
            }
           ]
         }
       ]
             |},
            ~loopJobs=
              {|
             [
            {
                "name": "set_outline_data"
            }
             ]
             |},
            (),
          ),
        (),
      );

      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
    };

    beforeEach(() => {
      sandbox := createSandbox();

      _prepareState();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    test("gl context->stencil should be true", () =>
      StateEngineService.unsafeGetState()
      |> ViewToolEngine.unsafeGetContext
      |>
      expect == {
                  alpha: true,
                  depth: true,
                  stencil: true,
                  antialias: true,
                  premultipliedAlpha: true,
                  preserveDrawingBuffer: false,
                }
    );

    describe("set outline data", () => {
      describe("if current scene tree node exist", () => {
        test("set outline color", () => {
          StateLogicService.getAndSetEngineState(
            MainUtils._handleEngineState,
          );
          GameObjectTool.setCurrentSceneTreeNode(
            MainEditorSceneTool.getFirstCube
            |> StateLogicService.getEngineStateToGetData,
          );

          StateLogicService.getAndSetEngineState(
            DirectorToolEngine.runWithDefaultTime,
          );

          JobDataEngineService.getOutlineColor
          |> StateLogicService.getEngineStateToGetData
          |> expect == SetOutlineDataJobTool.getOutlineColor();
        });
        test(
          "set current scene tree node and its children to be gameObjects need drawOutline",
          () => {
            StateLogicService.getAndSetEngineState(
              MainUtils._handleEngineState,
            );
            let engineState = StateEngineService.unsafeGetState();
            let firstCube = MainEditorSceneTool.getFirstCube(engineState);
            let secondCube = MainEditorSceneTool.getSecondCube(engineState);
            let engineState =
              GameObjectTool.addChild(firstCube, secondCube, engineState);
            engineState |> StateEngineService.setState |> ignore;
            GameObjectTool.setCurrentSceneTreeNode(firstCube);

            StateLogicService.getAndSetEngineState(
              DirectorToolEngine.runWithDefaultTime,
            );

            SetOutlineDataJobTool.getGameObjectsNeedDrawOutline
            |> StateLogicService.getEngineStateToGetData
            |> expect == [|firstCube, secondCube|];
          },
        );
      });

      describe("else", () =>
        test("set gameObjects need drawOutline to be empty", () => {
          StateLogicService.getAndSetEngineState(
            MainUtils._handleEngineState,
          );

          GameObjectTool.setCurrentSceneTreeNode(
            MainEditorSceneTool.getFirstCube
            |> StateLogicService.getEngineStateToGetData,
          );
          StateLogicService.getAndSetEngineState(
            DirectorToolEngine.runWithDefaultTime,
          );
          GameObjectTool.clearCurrentSceneTreeNode();
          StateLogicService.getAndSetEngineState(
            DirectorToolEngine.runWithDefaultTime,
          );

          SetOutlineDataJobTool.getGameObjectsNeedDrawOutline
          |> StateLogicService.getEngineStateToGetData
          |> expect == [||];
        })
      );
    });
  });