open Wonder_jest;

open AssetTreeTwoLayerTypeTool;

open Expect;

open Expect.Operators;

open Sinon;

open AssetTreeNodeType;

open Js.Promise;

let _ =
  describe("controller asset header load wdb", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );
    });

    afterEach(() =>
      restoreSandbox(
        refJsObjToSandbox(sandbox^),
        /* StateEditorService.getState()
           |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
           |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
           |> StateEditorService.setState
           |> ignore; */
      )
    );

    describe("test load file", () => {
      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();

        MainEditorAssetHeaderWDBTool.buildFakeTextDecoder(
          MainEditorAssetHeaderWDBTool.convertUint8ArrayToBuffer,
        );
        MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

        MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);
      });

      testPromise("ee and re should not active wdb->camera", () => {
        let editEngineState = StateEngineService.unsafeGetState();
        let eeCurrentCameraGameObject =
          MainEditorCameraTool.getCurrentCameraGameObject(editEngineState);
        let runEngineState = StateEngineService.unsafeGetState();
        let reCurrentCameraGameObject =
          MainEditorCameraTool.getCurrentCameraGameObject(runEngineState);

        let fileName = "Scene";
        let newWDBArrayBuffer =
          MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

        MainEditorAssetTool.fileLoad(
          TestTool.getDispatch(),
          BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
        )
        |> then_(_ => {
             let editEngineState = StateEngineService.unsafeGetState();
             let runEngineState = StateEngineService.unsafeGetState();

             (
               MainEditorCameraTool.getCurrentCameraGameObject(
                 editEngineState,
               ),
               MainEditorCameraTool.getCurrentCameraGameObject(
                 runEngineState,
               ),
             )
             |>
             expect == (eeCurrentCameraGameObject, reCurrentCameraGameObject)
             |> resolve;
           });
      });
    });
  });