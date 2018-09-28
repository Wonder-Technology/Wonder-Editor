open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

open Js.Typed_array;

let _ =
  describe("controller header export package", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test export zip", () => {
      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());

        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
        );

        MainEditorAssetHeaderWDBTool.buildFakeTextEncoder();
        MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

        MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;

        ControllerTool.stubRequestAnimationFrame(
          createEmptyStubWithJsObjSandbox(sandbox),
        );
        ControllerTool.stubCancelAnimationFrame(
          createEmptyStubWithJsObjSandbox(sandbox),
        );

        MainEditorAssetTool.buildFakeFileReader();

        MainEditorAssetHeaderWDBTool.buildFakeTextDecoder(
          MainEditorAssetHeaderWDBTool.convertUint8ArrayToBuffer,
        );
        MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

        MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);
      });

      describe(
        "fix bind arcballCameraController event bug: package should bind event if any basicCameraView is active",
        () => {
          let _test = controlFunc => {
            AddableComponentTool.addArcballCameraInCamera();

            let basicCameraView =
              GameObjectTool.getCurrentGameObjectBasicCameraView();

            BasicCameraViewEngineService.activeBasicCameraView(
              basicCameraView,
            )
            |> StateLogicService.getAndSetEngineState;

            let arcballCameraController =
              GameObjectTool.getCurrentGameObjectArcballCamera();

            controlFunc();

            let (engineState, wdb) =
              HeaderExportUtils._generateWDB(
                StateEngineService.unsafeGetState(),
              );

            let isBind = ref(false);

            engineState
            |> AssembleWDBEngineService.assembleWDB(wdb, true, true, true)
            |> WonderBsMost.Most.tap(((engineState, _, gameObject)) => {
                 isBind :=
                   GameObjectEngineService.getAllGameObjects(
                     gameObject,
                     engineState,
                   )
                   |> GameObjectEngineService.getAllArcballCameraControllers(
                        _,
                        engineState,
                      )
                   |> Js.Array.filter(arcballCameraController =>
                        ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                          arcballCameraController,
                          engineState,
                        )
                      )
                   |> Js.Array.length
                   |> JudgeTool.isEqual(_, 0)
                   |> (!);

                 ();
               })
            |> WonderBsMost.Most.drain
            |> then_(() => isBind^ |> expect == true |> resolve);
          };

          testPromise("test run", () => _test(() => ControllerTool.run()));
          testPromise("test stop", () =>
            _test(() => {
              ControllerTool.run();
              ControllerTool.stop();
            })
          );
        },
      );
    });
  });