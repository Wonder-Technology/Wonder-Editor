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

      test("test ui", () => {
        MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });

      describe("test change arcballCameraController distance", () => {
        test("test change should set into engine", () => {
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
          describe("not refresh inspector", () => {
            let _prepareAndExec = dispatchFuncStub => {
              MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
              MainEditorTransformTool.setLocalEulerAngleData();
              let currentGameObjectArcballCamera =
                GameObjectTool.getCurrentSceneTreeNodeArcballCamera();
              let value = 21.1;

              let dispatchFuncCallCountBeforeChangeTarget =
                dispatchFuncStub |> getCallCount;
              MainEditorArcballCameraControllerTool.changeDistanceAndBlur(
                ~cameraController=currentGameObjectArcballCamera,
                ~value,
                (),
              );

              dispatchFuncCallCountBeforeChangeTarget;
            };

            test(
              "shouldn't remove current scene tree node->local euler angle data",
              () => {
              _prepareAndExec(ReactTool.createDispatchFuncStub(sandbox));

              MainEditorTransformTool.judgeShouldRemoveLocalEulerAngleData()
              |> expect == false;
            });
            test("not refresh inspector", () => {
              let dispatchFuncStub =
                ReactTool.createDispatchFuncStub(sandbox);

              let dispatchFuncCallCountBeforeChangeTarget =
                _prepareAndExec(dispatchFuncStub);

              dispatchFuncStub
              |> withOneArg(
                   AppStore.UpdateAction(Update([|UpdateStore.Inspector|])),
                 )
              |> getCallCount
              |> expect == dispatchFuncCallCountBeforeChangeTarget;
            });
          })
        );

        describe("if drag drop", () =>
          describe("refresh inspector", () => {
            let _prepareAndExec = dispatchFuncStub => {
              MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
              MainEditorTransformTool.setLocalEulerAngleData();
              let currentGameObjectArcballCamera =
                GameObjectTool.getCurrentSceneTreeNodeArcballCamera();
              let value = 21.1;

              let dispatchFuncCallCountBeforeChangeTarget =
                dispatchFuncStub |> getCallCount;
              MainEditorArcballCameraControllerTool.changeDistanceAndDragDrop(
                ~cameraController=currentGameObjectArcballCamera,
                ~changeValue=value,
                ~dragDropValue=value,
                (),
              );

              dispatchFuncCallCountBeforeChangeTarget;
            };

            test(
              "should remove current scene tree node->local euler angle data",
              () => {
              _prepareAndExec(ReactTool.createDispatchFuncStub(sandbox));

              MainEditorTransformTool.judgeShouldRemoveLocalEulerAngleData()
              |> expect == true;
            });
            test("refresh inspector", () => {
              let dispatchFuncStub =
                ReactTool.createDispatchFuncStub(sandbox);

              let dispatchFuncCallCountBeforeChangeTarget =
                _prepareAndExec(dispatchFuncStub);

              dispatchFuncStub
              |> withOneArg(
                   AppStore.UpdateAction(Update([|UpdateStore.Inspector|])),
                 )
              |> getCallCount
              |> expect == dispatchFuncCallCountBeforeChangeTarget
              + 1;
            });
          })
        );
      });

      describe("test change arcballCameraController minDistance", () =>
        test("test change should set into engine", () => {
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

      describe("test change arcballCameraController phi", () =>
        test("test change should set into engine", () => {
          MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
          let currentGameObjectArcballCamera =
            GameObjectTool.getCurrentSceneTreeNodeArcballCamera();
          let value = 11.1;

          MainEditorArcballCameraControllerTool.changePhiAndBlur(
            ~cameraController=currentGameObjectArcballCamera,
            ~value,
            (),
          );

          ArcballCameraEngineService.unsafeGetArcballCameraControllerPhi(
            currentGameObjectArcballCamera,
          )
          |> StateLogicService.getEngineStateToGetData
          |. FloatService.truncateFloatValue(5)
          |> expect == value;
        })
      );

      describe("test change arcballCameraController theta", () =>
        test("test change should set into engine", () => {
          MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
          let currentGameObjectArcballCamera =
            GameObjectTool.getCurrentSceneTreeNodeArcballCamera();
          let value = 2.0;

          MainEditorArcballCameraControllerTool.changeThetaAndBlur(
            ~cameraController=currentGameObjectArcballCamera,
            ~value,
            (),
          );

          ArcballCameraEngineService.unsafeGetArcballCameraControllerTheta(
            currentGameObjectArcballCamera,
          )
          |> StateLogicService.getEngineStateToGetData
          |. FloatService.truncateFloatValue(5)
          |> expect == value;
        })
      );

      describe("test change arcballCameraController target", () => {
        describe("test change should set into engine", () => {
          let _test = (changeAndBlurFunc, getTargetTargetFunc) => {
            MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
            let currentGameObjectArcballCamera =
              GameObjectTool.getCurrentSceneTreeNodeArcballCamera();
            let value = 11.1;

            changeAndBlurFunc(
              ~cameraController=currentGameObjectArcballCamera,
              ~value,
              (),
            );

            ArcballCameraEngineService.unsafeGetArcballCameraControllerTarget(
              currentGameObjectArcballCamera,
            )
            |> StateLogicService.getEngineStateToGetData
            |> Vector3Service.truncate(5)
            |> expect == getTargetTargetFunc(value);
            /* ; */
          };

          test("test change target x", () =>
            _test(
              MainEditorArcballCameraControllerTool.changeTargetXAndBlur(
                ~uiState=TestTool.buildEmptyAppState(),
                ~dispatchFunc=TestTool.getDispatch(),
              ),
              value =>
              (value, 0., 0.)
            )
          );
          test("test change target y", () =>
            _test(
              MainEditorArcballCameraControllerTool.changeTargetYAndBlur(
                ~uiState=TestTool.buildEmptyAppState(),
                ~dispatchFunc=TestTool.getDispatch(),
              ),
              value =>
              (0., value, 0.)
            )
          );
          test("test change target z", () =>
            _test(
              MainEditorArcballCameraControllerTool.changeTargetZAndBlur(
                ~uiState=TestTool.buildEmptyAppState(),
                ~dispatchFunc=TestTool.getDispatch(),
              ),
              value =>
              (0., 0., value)
            )
          );
        });

        describe("if blur", () =>
          describe("not refresh inspector", () => {
            let _prepareAndExec = dispatchFuncStub => {
              MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
              MainEditorTransformTool.setLocalEulerAngleData();
              let currentGameObjectArcballCamera =
                GameObjectTool.getCurrentSceneTreeNodeArcballCamera();
              let value = 21.1;

              let dispatchFuncCallCountBeforeChangeTarget =
                dispatchFuncStub |> getCallCount;
              MainEditorArcballCameraControllerTool.changeTargetXAndBlur(
                ~cameraController=currentGameObjectArcballCamera,
                ~value,
                (),
              );

              dispatchFuncCallCountBeforeChangeTarget;
            };

            test(
              "shouldn't remove current scene tree node->local euler angle data",
              () => {
              _prepareAndExec(ReactTool.createDispatchFuncStub(sandbox));

              MainEditorTransformTool.judgeShouldRemoveLocalEulerAngleData()
              |> expect == false;
            });
            test("not refresh inspector", () => {
              let dispatchFuncStub =
                ReactTool.createDispatchFuncStub(sandbox);

              let dispatchFuncCallCountBeforeChangeTarget =
                _prepareAndExec(dispatchFuncStub);

              dispatchFuncStub
              |> withOneArg(
                   AppStore.UpdateAction(Update([|UpdateStore.Inspector|])),
                 )
              |> getCallCount
              |> expect == dispatchFuncCallCountBeforeChangeTarget;
            });
          })
        );
      });

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