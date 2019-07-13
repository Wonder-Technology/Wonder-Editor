open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

open Js.Typed_array;

let _ =
  describe("controller header generate scene wdb", () => {
    let sandbox = getSandboxDefaultVal();

    let _generateSceneWDB =
        (
          ~isSceneRoot=false,
          ~generateWDBFunc=GenerateSceneGraphEngineService.generateSceneWDB,
          ~imageUint8ArrayMap=Js.Nullable.return(
                                Uint8ArrayAssetEditorService.buildBasicSourceTextureImageUint8ArrayMap(
                                  StateEditorService.getState(),
                                ),
                              ),
          ~engineState=StateEngineService.unsafeGetState(),
          (),
        ) =>
      HeaderExportSceneWDBUtils.generateSceneWDB(
        isSceneRoot,
        generateWDBFunc,
        imageUint8ArrayMap,
        engineState,
      );

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
      );

      LoadTool.buildFakeTextEncoder();
      LoadTool.buildFakeURL(sandbox^);

      LoadTool.buildFakeLoadImage(.);

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        SceneTreeWidgetService.getWidget(),
      )
      |> StateLogicService.getAndSetEditorState;

      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
      ControllerTool.stubCancelAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );

      MainEditorAssetTool.buildFakeFileReader();

      LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
      LoadTool.buildFakeURL(sandbox^);

      LoadTool.buildFakeLoadImage(.);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe(
      "fix bind arcballCameraController event bug: package should bind event if any basicCameraView is active",
      () => {
        let _getIsBindLength = (gameObject, engineState) =>
          HierarchyGameObjectEngineService.getAllGameObjects(
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
          |> Js.Array.length;

        let _test = controlFunc => {
          MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();

          let basicCameraView =
            GameObjectTool.getCurrentSceneTreeNodeBasicCameraView();

          BasicCameraViewEngineService.activeBasicCameraView(basicCameraView)
          |> StateLogicService.getAndSetEngineState;

          let arcballCameraController =
            GameObjectTool.getCurrentSceneTreeNodeArcballCamera();

          controlFunc();

          let (engineState, wdb) = _generateSceneWDB();

          let isBind = ref(false);

          engineState
          |> AssembleWDBEngineService.assembleWDB(
               wdb,
               true,
               true,
               true,
               true,
               true,
             )
          |> WonderBsMost.Most.tap(((engineState, _, (gameObject, _))) => {
               isBind :=
                 _getIsBindLength(gameObject, engineState)
                 |> JudgeTool.isNotEqual(_, 0);

               ();
             })
          |> WonderBsMost.Most.drain
          |> then_(() => isBind^ |> expect == true |> resolve);
        };

        testPromise("test run", () => _test(() => ControllerTool.run()));

        describe("test stop", () => {
          testPromise("should bind", () =>
            _test(() => {
              ControllerTool.run();
              ControllerTool.stop();
            })
          );
          test("should unbind after package", () => {
            MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
            let basicCameraView =
              GameObjectTool.getCurrentSceneTreeNodeBasicCameraView();
            BasicCameraViewEngineService.activeBasicCameraView(
              basicCameraView,
            )
            |> StateLogicService.getAndSetEngineState;
            ControllerTool.run();
            ControllerTool.stop();

            let (engineState, wdb) = _generateSceneWDB();

            _getIsBindLength(
              SceneEngineService.getSceneGameObject(engineState),
              engineState,
            )
            |> expect == 0;
          });
        });
      },
    );

    describe(
      "fix bind flyCameraController event bug: package should bind event if any basicCameraView is active",
      () => {
        let _getIsBindLength = (gameObject, engineState) =>
          HierarchyGameObjectEngineService.getAllGameObjects(
            gameObject,
            engineState,
          )
          |> GameObjectEngineService.getAllFlyCameraControllers(
               _,
               engineState,
             )
          |> Js.Array.filter(flyCameraController =>
               FlyCameraEngineService.isBindFlyCameraControllerEventForGameView(
                 flyCameraController,
                 engineState,
               )
             )
          |> Js.Array.length;

        let _test = controlFunc => {
          MainEditorInspectorAddComponentTool.addFlyCameraControllerComponent();

          let basicCameraView =
            GameObjectTool.getCurrentSceneTreeNodeBasicCameraView();

          BasicCameraViewEngineService.activeBasicCameraView(basicCameraView)
          |> StateLogicService.getAndSetEngineState;

          controlFunc();

          let (engineState, wdb) = _generateSceneWDB();

          let isBind = ref(false);

          engineState
          |> AssembleWDBEngineService.assembleWDB(
               wdb,
               true,
               true,
               true,
               true,
               true,
             )
          |> WonderBsMost.Most.tap(((engineState, _, (gameObject, _))) => {
               isBind :=
                 _getIsBindLength(gameObject, engineState)
                 |> JudgeTool.isNotEqual(_, 0);

               ();
             })
          |> WonderBsMost.Most.drain
          |> then_(() => isBind^ |> expect == true |> resolve);
        };

        testPromise("test run", () => _test(() => ControllerTool.run()));

        describe("test stop", () => {
          testPromise("should bind", () =>
            _test(() => {
              ControllerTool.run();
              ControllerTool.stop();
            })
          );
          test("should unbind after package", () => {
            MainEditorInspectorAddComponentTool.addFlyCameraControllerComponent();
            let basicCameraView =
              GameObjectTool.getCurrentSceneTreeNodeBasicCameraView();
            BasicCameraViewEngineService.activeBasicCameraView(
              basicCameraView,
            )
            |> StateLogicService.getAndSetEngineState;
            ControllerTool.run();
            ControllerTool.stop();

            let (engineState, wdb) = _generateSceneWDB();

            _getIsBindLength(
              SceneEngineService.getSceneGameObject(engineState),
              engineState,
            )
            |> expect == 0;
          });
        });
      },
    );
  });