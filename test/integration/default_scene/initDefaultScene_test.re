open Wonderjs;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("engine: test init default scene", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    test("add three gameObjects to scene", () =>
      GameObjectTool.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 4
    );
    describe("add camera", () => {
      test("add current camera", () =>
        MainEditorCameraTool.getCurrentCameraGameObject(
          StateLogicService.getRunEngineState(),
        )
        |> Js.Option.isSome
        |> expect == true
      );
      test("set perspective camera's near,far,fovy,aspect", () => {
        let engineState = StateLogicService.getRunEngineState();
        let cameraProjection =
          MainEditorCameraTool.getCurrentCameraProjection(engineState);
        (
          PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraNear(
            cameraProjection,
            engineState,
          ),
          PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFar(
            cameraProjection,
            engineState,
          ),
          PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraAspect(
            cameraProjection,
            engineState,
          ),
          PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFovy(
            cameraProjection,
            engineState,
          ),
        )
        |> expect == (0.1, 1000., 1.0, 60.);
      });
      test("move camera", () => {
        let engineState = StateLogicService.getRunEngineState();
        let gameObject =
          MainEditorCameraTool.getCurrentCameraGameObject(engineState)
          |> OptionService.unsafeGet;
        let transform =
          engineState
          |> GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject);
        engineState
        |> TransformAPI.getTransformLocalPosition(transform)
        |> expect == (0., 0., 40.);
      });
    });
    describe("add box", () =>
      describe("test components", () => {
        test("add material component", () => {
          let engineState = StateLogicService.getRunEngineState();
          let box = MainEditorSceneTool.getBoxInDefaultScene(engineState);

          engineState
          |> GameObjectComponentEngineService.hasLightMaterialComponent(box)
          |> expect == true;
        });
        test("add meshRenderer component", () => {
          let engineState = StateLogicService.getRunEngineState();
          let box = MainEditorSceneTool.getBoxInDefaultScene(engineState);
          engineState
          |> GameObjectComponentEngineService.hasMeshRendererComponent(box)
          |> expect == true;
        });
        describe("test geometry component", ()
          =>
            test("add geometry component", () => {
              let engineState = StateLogicService.getRunEngineState();
              let box = MainEditorSceneTool.getBoxInDefaultScene(engineState);
              engineState
              |> GameObjectComponentEngineService.hasBoxGeometryComponent(
                   box,
                 )
              |> expect == true;
            })
          );
          /* test(
               "set config data",
               () => {
                 open WonderCommonlib;
                 let engineState = StateLogicService.getRunEngineState();
                 let box = MainEditorSceneTool.getBoxInDefaultScene(engineState);
                 let geometry =
                   engineState |> GameObjectComponentEngineService.getCustomGeometryComponent(box);
                 let configData =
                   engineState |> GeometryEngineService.getConfigData(geometry);
                 (
                   HashMapService.unsafeGet("width", configData),
                   HashMapService.unsafeGet("height", configData),
                   HashMapService.unsafeGet("depth", configData),
                   HashMapService.unsafeGet("widthSegment", configData),
                   HashMapService.unsafeGet("heightSegment", configData),
                   HashMapService.unsafeGet("depthSegment", configData)
                 )
                 |> expect == (5., 5., 5., 1., 1., 1.)
               }
             ) */
      })
    );
    describe("add directionLight gameObject", () =>
      describe("test components", () =>
        describe("test light component", () =>
          test("add light component", () => {
            let engineStateToGetData = StateLogicService.getRunEngineState();
            let directionLight =
              MainEditorSceneTool.getDirectionLightInDefaultScene(
                engineStateToGetData,
              );

            engineStateToGetData
            |> LightEngineService.hasLightComponent(directionLight)
            |> expect == true;
          })
        )
      )
    );
  });