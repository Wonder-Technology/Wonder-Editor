open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("test MainEditorMaterialMap", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepare = () => {
      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

      MainEditorAssetTool.buildFakeFileReader();

      LoadTool.buildFakeTextDecoder(
        LoadTool.convertUint8ArrayToBuffer,
      );
      LoadTool.buildFakeURL(sandbox^);

      LoadTool.buildFakeLoadImage(.);

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    testPromise(
      {|load asset wdb;
      drag wdb;
      select wdb;

      inspector->material map should show its map|},
      () => {
        open Js.Promise;

        _prepare();

        DragWDBTool.testDragWDB(
          sandbox,
          "BoxTextured",
          (
            shaderSourceCountBeforeDrag,
            shaderSourceCountAfterDrag,
            glShaderSource,
          ) => {
            LoadWDBTool.getBoxTexturedMeshGameObject(
              StateEngineService.unsafeGetState(),
            )
            |> GameObjectTool.setCurrentSceneTreeNode;

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch
            |> resolve;
          },
        );
      },
    );
  });