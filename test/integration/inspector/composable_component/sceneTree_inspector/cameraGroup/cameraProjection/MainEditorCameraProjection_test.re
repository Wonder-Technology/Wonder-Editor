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

    describe("test set currentSceneTreeNode to be camera", () =>
      describe("test logic", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
          )
        );

        describe("test cameraProjection's attribute set in engine", () => {
          describe("test change CameraProjection near", () =>
            test("test change near should set into engine", () => {
              let currentGameObjectPerspectiveCamera =
                GameObjectTool.getCurrentSceneTreeNodePerspectiveCamera();
              let value = 10.1;

              MainEditorCameraProjectionTool.changeNearAndBlur(
                ~cameraProjection=currentGameObjectPerspectiveCamera,
                ~value,
                (),
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
                GameObjectTool.getCurrentSceneTreeNodePerspectiveCamera();
              let value = 120.1123;

              MainEditorCameraProjectionTool.changeFarAndBlur(
                ~cameraProjection=currentGameObjectPerspectiveCamera,
                ~value,
                (),
              );

              PerspectiveCameraProjectionEngineService.getPerspectiveCameraFar(
                currentGameObjectPerspectiveCamera,
              )
              |> StateLogicService.getEngineStateToGetData
              |. FloatService.truncateFloatValue(5)
              |> expect == value;
            })
          );

          describe("test change CameraProjection fovy", () =>
            test("test change fovy should set into engine", () => {
              let currentGameObjectPerspectiveCamera =
                GameObjectTool.getCurrentSceneTreeNodePerspectiveCamera();
              let value = 32.123;

              MainEditorCameraProjectionTool.changeFovyAndBlur(
                ~cameraProjection=currentGameObjectPerspectiveCamera,
                ~value,
                (),
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
      })
    );
  });