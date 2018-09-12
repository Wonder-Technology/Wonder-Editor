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

      testPromise("should not active wdb->camera", () => {
        let engineState = StateEngineService.unsafeGetState();
        let currentCameraGameObject =
          MainEditorCameraTool.getCurrentCameraGameObject(engineState);

        let fileName = "Scene";
        let newWDBArrayBuffer =
          MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

        MainEditorAssetTool.fileLoad(
          TestTool.getDispatch(),
          BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
        )
        |> then_(_ => {
             let engineState = StateEngineService.unsafeGetState();

             MainEditorCameraTool.getCurrentCameraGameObject(engineState)
             |> expect == currentCameraGameObject
             |> resolve;
           });
      });
    });
  });