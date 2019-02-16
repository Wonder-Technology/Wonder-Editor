open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

let _ =
  describe("MainEditor ArcballCameraController", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode to be camera", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          SceneTreeWidgetService.getWidget(),
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test change arcballCameraController distance", () => {
        test("test change distance should set into engine", () => {
          MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
          let currentGameObjectArcballCamera =
            GameObjectTool.getCurrentSceneTreeNodeArcballCamera();
          let value = 21.1;

          MainEditorArcballCameraControllerTool.changeDistanceAndBlur(
            ~cameraController=currentGameObjectArcballCamera,
            ~value,
            (),
          );

          ArcballCameraEngineService.unsafeGetArcballCameraControllerDistance(
            currentGameObjectArcballCamera,
          )
          |> StateLogicService.getEngineStateToGetData
          |. FloatService.truncateFloatValue(5)
          |> expect == value;
        });

        describe("if blur", () =>
          describe("refresh inspector", () => {
            let _prepareAndExec = () => {
              MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
              MainEditorTransformTool.setLocalEulerAngleData();
              let currentGameObjectArcballCamera =
                GameObjectTool.getCurrentSceneTreeNodeArcballCamera();
              let value = 21.1;

              MainEditorArcballCameraControllerTool.changeDistanceAndBlur(
                ~cameraController=currentGameObjectArcballCamera,
                ~value,
                (),
              );
            };

            test(
              "should remove current scene tree node->local euler angle data",
              () => {
              _prepareAndExec();

              MainEditorTransformTool.judgeShouldRemoveLocalEulerAngleData()
              |> expect == true;
            });
            test("refresh inspector", () => {
              let dispatchFuncStub =
                ReactTool.createDispatchFuncStub(sandbox);

              _prepareAndExec();

              dispatchFuncStub
              |> expect
              |> toCalledWith([|
                   AppStore.UpdateAction(Update([|UpdateStore.Inspector|])),
                 |]);
            });
          })
        );
      });

      describe("test change arcballCameraController minDistance", () =>
        test("test change minDistance should set into engine", () => {
          MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
          let currentGameObjectArcballCamera =
            GameObjectTool.getCurrentSceneTreeNodeArcballCamera();
          let value = 11.1;

          MainEditorArcballCameraControllerTool.changeMinDistanceAndBlur(
            ~cameraController=currentGameObjectArcballCamera,
            ~value,
            (),
          );

          ArcballCameraEngineService.unsafeGetArcballCameraControllerMinDistance(
            currentGameObjectArcballCamera,
          )
          |> StateLogicService.getEngineStateToGetData
          |. FloatService.truncateFloatValue(5)
          |> expect == value;
        })
      );

      describe(
        "add shade dom for transformComponent if has arcballCameraController",
        () =>
        test("test snapshot for transform component", () => {
          MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
          let currentGameObjectTransform =
            GameObjectTool.getCurrentSceneTreeNodeTransform();
          let component =
            BuildComponentTool.buildMainEditorTransformComponent(
              TestTool.buildEmptyAppState(),
              currentGameObjectTransform,
            );
          component |> ReactTestTool.createSnapshotAndMatch;
        })
      );
    });
  });