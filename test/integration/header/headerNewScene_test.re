open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("header->file->New Scene", () => {
    let sandbox = getSandboxDefaultVal();

    let _handleNewScene =
        (
          ~editorState=StateEditorService.getState(),
          ~engineState=StateEngineService.unsafeGetState(),
          ~dispatchFunc=TestTool.getDispatch(),
          (),
        ) =>
      HeaderFileNewSceneUtils.handleNewScene(
        dispatchFunc,
        (editorState, engineState),
      );

    beforeEach(() => {
      sandbox := createSandbox();

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
                                   "name": "dispose"
                               }
                           ]
                       }
                   ]
               |},
            (),
          ),
        (),
      );
      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("replace scene with default scene", () =>
      test("test", () => {
        MainEditorLeftHeaderTool.addCube();
        let (editorState, engineState) = _handleNewScene();

        HierarchyGameObjectEngineService.getAllChildren(
          SceneEngineService.getSceneGameObject(engineState),
          engineState,
        )
        |> Js.Array.length
        |> expect == 4;
      })
    );

    test("default geometry shouldn't be disposed", () => {
      let (editorState, engineState) = _handleNewScene();

      GeometryToolEngine.isGeometryDisposed(
        GeometryDataAssetEditorService.unsafeGetDefaultCubeGeometryComponent
        |> StateLogicService.getEditorState,
        engineState,
      )
      |> expect == false;
    });
    test("default material shouldn't be disposed", () => {
      let (editorState, engineState) = _handleNewScene();

      LightMaterialToolEngine.isAlive(
        MaterialDataAssetEditorService.unsafeGetDefaultLightMaterial
        |> StateLogicService.getEditorState,
        engineState,
      )
      |> expect == true;
    });

    describe("update active basic camera view", () => {
      let _prepare = sandbox => {
        let _ =
          MainEditorInspectorAddComponentTool.buildTwoAddedArcballCameraControllerCamera(
            sandbox,
          );
        MainEditorSceneTool.setSceneSecondCameraToBeCurrentSceneTreeNode();
        MainEditorCameraViewTool.setCurrentCamera(
          ~cameraView=GameObjectTool.getCurrentSceneTreeNodeBasicCameraView(),
          (),
        );
      };

      test("test editorState", () => {
        _prepare(sandbox);
        let editorState = StateEditorService.getState();
        let activedBasicCameraViewBefore =
          editorState
          |> GameViewEditorService.getActivedBasicCameraView
          |> OptionService.unsafeGet;

        let (editorState, engineState) = _handleNewScene();

        editorState
        |> GameViewEditorService.getActivedBasicCameraView
        |> OptionService.unsafeGet
        |> expect !== activedBasicCameraViewBefore;
      });
      test("test engineState", () => {
        _prepare(sandbox);
        let engineState = StateEngineService.unsafeGetState();
        let activedBasicCameraViewBefore =
          engineState
          |> BasicCameraViewEngineService.getActiveBasicCameraView
          |> OptionService.unsafeGet;

        let (editorState, engineState) = _handleNewScene();

        engineState
        |> BasicCameraViewEngineService.getActiveBasicCameraView
        |> OptionService.unsafeGet
        |> expect !== activedBasicCameraViewBefore;
      });
    });

    test(
      "should clear current scene tree node before exec update_transform_gizmos job",
      () => {
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~isBuildFakeDom=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~loopPipelines=
              {|
                   [
                       {
                           "name": "default",
                           "jobs": [
                               {
                                   "name": "dispose"
                               },
            {
                "name": "update_transform_gizmos"
            }
                           ]
                       }
                   ]
               |},
            (),
          ),
        (),
      );
      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
      StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);
      MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();
      TestTool.openContractCheck();

      let (editorState, engineState) = _handleNewScene();
      editorState |> StateEditorService.setState |> ignore;

      GameObjectTool.getCurrentSceneTreeNode() |> expect == None;
    });
  });