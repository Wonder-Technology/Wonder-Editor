open Wonderjs;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

open Js.Typed_array;

let _ =
  describe("test reallocate cpu memory job", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareState = () => {
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
                               },
{
                    "name": "reallocate_cpu_memory"
                }
                           ]
                       }
                   ]
               |},
            (),
          ),
        (),
      );
      MainEditorSceneTool.initInspectorEngineState(
        ~sandbox,
        ~isInitJob=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~initPipelines=
              {|
             [
              {
                "name": "default",
                "jobs": [
                    {"name": "init_inspector_engine" }
                ]
              }
            ]
             |},
            ~initJobs=
              {|
             [
                {"name": "init_inspector_engine" }
             ]
             |},
            (),
          ),
        (),
      );

      StateInspectorEngineService.unsafeGetState()
      |> MainUtils._handleInspectorEngineState
      |> StateInspectorEngineService.setState
      |> ignore;

      CanvasTool.prepareInspectorCanvasAndImgCanvas(sandbox) |> ignore;

      MainEditorSceneTool.prepareScene(sandbox);
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test redo-undo after reallocate", () => {
      let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));
      let truckWDBArrayBuffer = ref(Obj.magic(1));

      let _judge = uploadedWDBNodeId => {
        let editorState = StateEditorService.getState();
        let engineState = StateEngineService.unsafeGetState();

        let (vertices, _, _, _, _) = LoadWDBTool.getBoxTexturedGeometryData();

        LoadWDBTool.getBoxTexturedMeshGameObjectFromAssetNode(
          uploadedWDBNodeId,
          (editorState, engineState),
        )
        |> GameObjectComponentEngineService.unsafeGetGeometryComponent(
             _,
             engineState,
           )
        |> GeometryEngineService.unsafeGetGeometryVertices(_, engineState)
        |> expect == vertices
        |> resolve;
      };

      beforeAll(() => {
        boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured");

        truckWDBArrayBuffer := WDBTool.convertGLBToWDB("CesiumMilkTruck");
      });

      beforeEach(() => {
        _prepareState();

        let engineState = StateEngineService.unsafeGetState();
        let engineState =
          SettingToolEngine.setMemory(
            ~state=engineState,
            ~maxDisposeCount=1,
            (),
          );
        engineState |> StateEngineService.setState |> ignore;

        StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);

        MainEditorAssetTool.buildFakeFileReader();

        LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
        LoadTool.buildFakeURL(sandbox^);

        LoadTool.buildFakeLoadImage(.);
      });

      testPromise(
        {|
        load wdb w1;
        remove w1(trigger reallocate);
        undo;

        w1->vertices should exist.
        |},
        () =>
        MainEditorAssetUploadTool.loadOneWDB(
          ~arrayBuffer=boxTexturedWDBArrayBuffer^,
          (),
        )
        |> then_(uploadedWDBNodeId => {
             MainEditorAssetHeaderOperateNodeTool.removeWDBNode(
               ~wdbNodeId=uploadedWDBNodeId,
               (),
             );

             RedoUndoTool.undoHistoryState();

             _judge(uploadedWDBNodeId);
           })
      );
      testPromise(
        {|
        load wdb w1;
        remove w1(trigger reallocate);
        load wdb w2;
        undo;
        undo;

        w1->vertices should exist.
        |},
        () =>
        MainEditorAssetUploadTool.loadOneWDB(
          ~arrayBuffer=boxTexturedWDBArrayBuffer^,
          (),
        )
        |> then_(uploadedWDBNodeId1 => {
             MainEditorAssetHeaderOperateNodeTool.removeWDBNode(
               ~wdbNodeId=uploadedWDBNodeId1,
               (),
             );

             MainEditorAssetUploadTool.loadOneWDB(
               ~arrayBuffer=truckWDBArrayBuffer^,
               (),
             )
             |> then_(uploadedWDBNodeId2 => {
                  RedoUndoTool.undoHistoryState();
                  RedoUndoTool.undoHistoryState();

                  _judge(uploadedWDBNodeId1);
                });
           })
      );
      testPromise(
        {|
        load wdb w1;
        remove w1(trigger reallocate);
        load wdb w2;
        undo;
        undo;
        redo;
        redo;

        w2->vertices should exist.
        |},
        () =>
        MainEditorAssetUploadTool.loadOneWDB(
          ~arrayBuffer=truckWDBArrayBuffer^,
          (),
        )
        |> then_(uploadedWDBNodeId1 => {
             let engineState = StateEngineService.unsafeGetState();

             MainEditorAssetHeaderOperateNodeTool.removeWDBNode(
               ~wdbNodeId=uploadedWDBNodeId1,
               (),
             );

             MainEditorAssetUploadTool.loadOneWDB(
               ~arrayBuffer=boxTexturedWDBArrayBuffer^,
               (),
             )
             |> then_(uploadedWDBNodeId2 => {
                  RedoUndoTool.undoHistoryState();
                  RedoUndoTool.undoHistoryState();
                  RedoUndoTool.redoHistoryState();
                  RedoUndoTool.redoHistoryState();

                  _judge(uploadedWDBNodeId2);
                });
           })
      );
    });
  });