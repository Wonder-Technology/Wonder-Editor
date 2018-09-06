open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

let _ =
  describe("MainEditor CameraProjection", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode to be camera", () => {
      /* describe("test snapshot", () =>
        test("default aspect should be canvas.width/canvas.height", () => {
          let canvas = {"width": 100., "height": 200.};
          let runEngineState = StateLogicService.getRunEngineState();
          let runEngineState =
            ViewToolEngine.setCanvas(canvas, runEngineState);
          StateLogicService.setRunEngineState(runEngineState);

          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode,
          );

          /* let editEngineState = StateLogicService.getEditEngineState();
             let editEngineState = ViewToolEngine.setCanvas(canvas, editEngineState);
             StateLogicService.setRunEngineState(editEngineState); */

          BuildComponentTool.buildCameraProjection()
          |> ReactTestTool.createSnapshotAndMatch;
        })
      ); */

      describe("test logic", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode,
          )
        );

        describe("test cameraProjection's attribute set in engine", () => {
          describe("test change CameraProjection near", () =>
            test("test change near should set into engine", () => {
              let currentGameObjectPerspectiveCamera =
                GameObjectTool.getCurrentGameObjectPerspectiveCamera();
              let value = 10.1;

              let nearDomIndex =
                MainEditorCameraProjectionTool.getNearDomIndex();

              MainEditorCameraProjectionTool.triggerPerspectiveCameraChangeAndBlurEvent(
                nearDomIndex,
                value,
              );

              PerspectiveCameraProjectionEngineService.getPerspectiveCameraNear(
                currentGameObjectPerspectiveCamera,
              )
              |> StateLogicService.getEngineStateToGetData
              |. FloatService.truncateFloatValue(5)
              |> expect == value;
            })
          );

          describe("test change CameraProjection far", () =>
            test("test change far should set into engine", () => {
              let currentGameObjectPerspectiveCamera =
                GameObjectTool.getCurrentGameObjectPerspectiveCamera();
              let value = 120.1123;

              let farDomIndex =
                MainEditorCameraProjectionTool.getFarDomIndex();

              MainEditorCameraProjectionTool.triggerPerspectiveCameraChangeAndBlurEvent(
                farDomIndex,
                value,
              );

              PerspectiveCameraProjectionEngineService.getPerspectiveCameraFar(
                currentGameObjectPerspectiveCamera,
              )
              |> StateLogicService.getEngineStateToGetData
              |. FloatService.truncateFloatValue(5)
              |> expect == value;
            })
          );

          /* describe("test change CameraProjection aspect", () =>
            test("test change aspect should set into engine", () => {
              let currentGameObjectPerspectiveCamera =
                GameObjectTool.getCurrentGameObjectPerspectiveCamera();
              let value = 320.123;

              let aspectDomIndex =
                MainEditorCameraProjectionTool.getAspectDomIndex();

              MainEditorCameraProjectionTool.triggerPerspectiveCameraChangeAndBlurEvent(
                aspectDomIndex,
                value,
              );

              PerspectiveCameraProjectionEngineService.getPerspectiveCameraAspect(
                currentGameObjectPerspectiveCamera,
              )
              |> StateLogicService.getEngineStateToGetData
              |. FloatService.truncateFloatValue(5)
              |> expect == value;
            })
          ); */

          describe("test change CameraProjection fovy", () =>
            test("test change fovy should set into engine", () => {
              let currentGameObjectPerspectiveCamera =
                GameObjectTool.getCurrentGameObjectPerspectiveCamera();
              let value = 32.123;

              let fovyDomIndex =
                MainEditorCameraProjectionTool.getFovyDomIndex();

              MainEditorCameraProjectionTool.triggerPerspectiveCameraChangeAndBlurEvent(
                fovyDomIndex,
                value,
              );

              PerspectiveCameraProjectionEngineService.getPerspectiveCameraFovy(
                currentGameObjectPerspectiveCamera,
              )
              |> StateLogicService.getEngineStateToGetData
              |. FloatService.truncateFloatValue(5)
              |> expect == value;
            })
          );
        });
      });
    });
  });