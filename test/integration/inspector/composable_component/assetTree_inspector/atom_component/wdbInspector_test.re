open Wonder_jest;

open Expect;

open Expect.Operators;

open NodeAssetType;

open Sinon;

open Js.Promise;

let _ =
  describe("wdb inspector", () => {
    let sandbox = getSandboxDefaultVal();

    let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));

    beforeAll(() =>
      boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured")
    );

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );

      MainEditorAssetTool.buildFakeFileReader();

      LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
      LoadTool.buildFakeURL(sandbox^);

      LoadTool.buildFakeLoadImage(.);
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test rename", () =>
      testPromise(
        "if rename to the existed name in the same dir, should fail", () => {
        let fileName1 = "BoxTextured1";
        let fileName2 = "BoxTextured2";

        MainEditorAssetUploadTool.loadOneWDB(
          ~fileName=fileName1,
          ~arrayBuffer=boxTexturedWDBArrayBuffer^,
          (),
        )
        |> then_(uploadedWDBNodeId1 =>
             MainEditorAssetUploadTool.loadOneWDB(
               ~fileName=fileName2,
               ~arrayBuffer=boxTexturedWDBArrayBuffer^,
               (),
             )
             |> then_(uploadedWDBNodeId2 => {
                  AssetTreeInspectorTool.Rename.renameAssetWDBNode(
                    ~nodeId=uploadedWDBNodeId2,
                    ~name=fileName1,
                    (),
                  );

                  (
                    MainEditorAssetWDBNodeTool.getWDBName(
                      ~nodeId=uploadedWDBNodeId1,
                      (),
                    ),
                    MainEditorAssetWDBNodeTool.getWDBName(
                      ~nodeId=uploadedWDBNodeId2,
                      (),
                    ),
                  )
                  |> expect == (fileName1, fileName2)
                  |> resolve;
                })
           );
      })
    );
  });