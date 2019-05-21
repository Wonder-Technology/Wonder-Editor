open Wonder_jest;

/* open AssetTreeTwoLayerTypeTool; */

open Expect;

open Expect.Operators;

open Sinon;

/* open NodeAssetType; */

open Js.Promise;

open Js.Typed_array;

let _ =
  describe("MainEditorAssetHeader->load asset bundle zip", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorAssetHeaderLoadTool.prepareInspectorCanvas(sandbox);

      MainEditorSceneTool.prepareScene(sandbox);
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test load asset bundle zip", () => {
      let _buildFakeZipData = [%bs.raw
        (wab, sab) => {|
  return [
    ["A.wab",{
      async: function(){
          return new Promise((resolve, _) => resolve(
new Uint8Array(wab)
          ))
      },
    }],
    ["SAB",{
      async: function(){
          return new Promise((resolve, _) => resolve(
          ))
      },
    }],
    ["SAB/B.sab",{
      async: function(){
          return new Promise((resolve, _) => resolve(
new Uint8Array(sab)
          ))
      },
    }]
  ]
|}
      ];

      let _getWABName = () => "A";

      let _getSABName = () => "B";

      let _prepare = () => {
        let addedFolderNodeId = MainEditorAssetIdTool.getNewAssetId();

        MainEditorAssetHeaderOperateNodeTool.addFolder();

        let wab = ArrayBuffer.make(3);
        let sab = ArrayBuffer.make(2);

        let obj =
          MainEditorAssetHeaderLoadZipTool.buildImportFakeJsZipCreateFunc(
            sandbox^,
            _buildFakeZipData(wab, sab),
          );

        MainEditorAssetTreeTool.Select.selectFolderNode(
          ~nodeId=addedFolderNodeId,
          (),
        );

        (obj, wab, sab);
      };

      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();
        LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
        LoadTool.buildFakeTextEncoder();
        LoadTool.buildFakeURL(sandbox^);
        LoadTool.buildFakeLoadImage(.);

        EventListenerTool.buildFakeDom()
        |> EventListenerTool.stubGetElementByIdReturnFakeDom;
      });

      testPromise("should add to asset children", () => {
        let (obj, wab, sab) = _prepare();

        MainEditorAssetUploadTool.loadOneAssetBundleZip(
          ~sandbox,
          ~createJsZipFunc=() => obj,
          (),
        )
        |> then_(uploadedWDBNodeId =>
             BuildComponentTool.buildAssetChildrenNode()
             |> ReactTestTool.createSnapshotAndMatch
             |> resolve
           );
      });
      testPromise("should store assetBundle arrayBuffer", () => {
        let (obj, wab, sab) = _prepare();

        MainEditorAssetUploadTool.loadOneAssetBundleZip(
          ~sandbox,
          ~createJsZipFunc=() => obj,
          (),
        )
        |> then_(() =>
             (
               MainEditorAssetAssetBundleNodeTool.getAssetBundleNodeByName(
                 _getWABName(),
               )
               |> StateLogicService.getStateToGetData
               |> AssetBundleNodeAssetService.getAssetBundle,
               MainEditorAssetAssetBundleNodeTool.getAssetBundleNodeByName(
                 _getSABName(),
               )
               |> StateLogicService.getStateToGetData
               |> AssetBundleNodeAssetService.getAssetBundle,
             )
             |> expect == (wab, sab)
             |> resolve
           );
      });
    });
  });