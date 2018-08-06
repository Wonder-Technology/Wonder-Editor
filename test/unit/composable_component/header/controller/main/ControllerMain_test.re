open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller main", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("set unsafeGetStateFunc and setStateFunc for event", () => {
      let _initWithJobConfigWithoutBuildFakeDom = () =>
        TestToolEngine.initWithJobConfigWithoutBuildFakeDom(
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
                                "name": "clear_color"
                            }
                           ]
                       }
                   ]
               |},
              (),
            ),
          (),
        );

      let _initWithJobConfigWithoutBuildFakeDomAndSetEngineState = () => {
        _initWithJobConfigWithoutBuildFakeDom()
        |> StateLogicService.setEditEngineState;
        _initWithJobConfigWithoutBuildFakeDom()
        |> StateLogicService.setRunEngineState;
      };

      let _prepare = () => {
        _initWithJobConfigWithoutBuildFakeDomAndSetEngineState();

        StateLogicService.getEditEngineState()
        |> FakeGlToolEngine.setFakeGl(
             FakeGlToolEngine.buildFakeGl(~sandbox, ()),
           )
        |> StateLogicService.setEditEngineState;
        StateLogicService.getRunEngineState()
        |> FakeGlToolEngine.setFakeGl(
             FakeGlToolEngine.buildFakeGl(~sandbox, ()),
           )
        |> StateLogicService.setRunEngineState;

        let eeGl =
          FakeGlToolEngine.getGl(StateLogicService.getEditEngineState());
        let reGl =
          FakeGlToolEngine.getGl(StateLogicService.getRunEngineState());
        (eeGl, reGl);
      };

      let _exec = () => {
        let editEngineState =
          MainUtils._setEditEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent(
            StateLogicService.getEditEngineState(),
          );
        StateToolEngine.setStateByFunc(editEngineState) |> ignore;
        let runEngineState =
          MainUtils._setRunEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent(
            StateLogicService.getRunEngineState(),
          );

        StateToolEngine.setStateByFunc(runEngineState) |> ignore;
      };

      beforeEach(() => MainEditorSceneTool.initState(~sandbox, ()));

      test("if is run, not loopBody", () => {
        ControllerTool.stubRequestAnimationFrame(
          createEmptyStubWithJsObjSandbox(sandbox),
        );
        let _ = _prepare();
        ControllerTool.run();

        let (eeGl, reGl) = _prepare();
        _exec();

        (eeGl##clearColor |> getCallCount, reGl##clearColor |> getCallCount)
        |> expect == (0, 0);
      });

      test("else, ee should loopBody but re not", () => {
        ControllerTool.stubRequestAnimationFrame(
          createEmptyStubWithJsObjSandbox(sandbox),
        );
        ControllerTool.stubCancelAnimationFrame(
          createEmptyStubWithJsObjSandbox(sandbox),
        );
        let _ = _prepare();
        ControllerTool.run();
        ControllerTool.stop();

        let (eeGl, reGl) = _prepare();
        _exec();

        (eeGl##clearColor |> getCallCount, reGl##clearColor |> getCallCount)
        |> expect == (1, 0);
      });
    });

    describe("test camera bind arcballCameraControllerEvent", () =>
      describe(
        "test has two camera, and those have arcballCameraController", () => {
        beforeEach(() => {
          MainEditorSceneTool.initState(~sandbox, ());

          CurrentSelectSourceEditorService.setCurrentSelectSource(
            EditorType.SceneTree,
          )
          |> StateLogicService.getAndSetEditorState;

          ControllerTool.stubRequestAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
        });
        let _addArcballCameraInCamera = () => {
          let cameraComponentCount =
            ComponentDomTool.getCameraComponentCount();
          let cameraCategoryDomIndex =
            ComponentDomTool.getCameraCategoryDomIndex();
          let arcballCameraTypeDomIndex =
            ComponentDomTool.getArcballCameraControllerTypeDomIndex();

          OperateComponentEventTool.addComponentIntoCurrentGameObject(
            cameraComponentCount,
            cameraCategoryDomIndex,
            arcballCameraTypeDomIndex,
          );
        };
        let _getTwoAddedArcballCameraControllerCamera = () => {
          let (camera1, camera2, box) =
            SceneTreeTool.buildTwoCameraSceneGraphToEngine(sandbox);

          SceneTreeNodeDomTool.OperateTwoCamera.getFirstCameraDomIndex()
          |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

          _addArcballCameraInCamera();

          SceneTreeNodeDomTool.OperateTwoCamera.getSecondCameraDomIndex()
          |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

          _addArcballCameraInCamera();

          (camera1, camera2);
        };
        test(
          "test click run, the current camera arcballCameraController should bind event, the other camera shouldn't bind event",
          () => {
            let (camera1, camera2) =
              _getTwoAddedArcballCameraControllerCamera();

            ControllerTool.run();

            let runEngineState = StateLogicService.getRunEngineState();

            (
              runEngineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera1,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                   runEngineState,
                 ),
              runEngineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera2,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                   runEngineState,
                 ),
            )
            |> expect == (false, true);
          },
        );
        test(
          "test click stop, the two camera arcballCameraController  shouldn't bind event",
          () => {
            let (camera1, camera2) =
              _getTwoAddedArcballCameraControllerCamera();

            ControllerTool.run();
            ControllerTool.stop();

            let runEngineState = StateLogicService.getRunEngineState();

            (
              runEngineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera1,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                   runEngineState,
                 ),
              runEngineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera2,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                   runEngineState,
                 ),
            )
            |> expect == (false, false);
          },
        );
      })
    );
  });