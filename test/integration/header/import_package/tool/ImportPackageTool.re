open Js.Promise;

let prepareLoad = sandbox => {
  LoadTool.buildFakeAtob();
  LoadTool.buildFakeBtoa();
  LoadTool.buildFakeTextEncoder();
  LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
  LoadTool.buildFakeURL(sandbox^);
  LoadTool.buildFakeLoadImage();
  MainEditorAssetTool.buildFakeFileReader();
  MainEditorAssetTool.buildFakeImage();
};

let testImportPackageWithoutExport =
    (
      ~testFunc,
      ~wpkArrayBuffer,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~fileName="Wpk",
      (),
    ) =>
  HeaderEdit.Method.importPackage(
    (uiState, dispatchFunc),
    _ => (),
    BaseEventTool.buildPackageFileEvent(fileName, wpkArrayBuffer),
  )
  |> then_(_ => testFunc());

let testImportPackage =
    (
      ~testFunc,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~execBeforeImportFunc=wpkArrayBuffer => (),
      ~fileName="Wpk",
      (),
    ) => {
  let wpkArrayBuffer = ExportPackageTool.exportWPK();

  execBeforeImportFunc(wpkArrayBuffer);

  testImportPackageWithoutExport(
    ~testFunc,
    ~wpkArrayBuffer,
    ~uiState,
    ~dispatchFunc,
    ~fileName,
    (),
  );
};

let getImportedMaterialAssetNodes = () =>
  MaterialNodeAssetEditorService.findAllMaterialNodes
  |> StateLogicService.getEditorState;

let getFirstImportedMaterialAssetData = () => {
  let node = getImportedMaterialAssetNodes() |> ArrayService.unsafeGetFirst;

  let {materialComponent}: NodeAssetType.materialNodeData =
    MaterialNodeAssetService.getNodeData(node);

  (NodeAssetService.getNodeId(~node), materialComponent);
};

let getImporteMaterialAssetMaterialComponents = () =>
  getImportedMaterialAssetNodes()
  |> Js.Array.map(node => {
       let {materialComponent}: NodeAssetType.materialNodeData =
         MaterialNodeAssetService.getNodeData(node);

       materialComponent;
     });

let getImporteMaterialAssetBasicMaterialComponents = () =>
  getImportedMaterialAssetNodes()
  |> Js.Array.filter(node => {
       let {type_}: NodeAssetType.materialNodeData =
         MaterialNodeAssetService.getNodeData(node);

       type_ === MaterialDataAssetType.BasicMaterial;
     })
  |> Js.Array.map(node => {
       let {materialComponent}: NodeAssetType.materialNodeData =
         MaterialNodeAssetService.getNodeData(node);

       materialComponent;
     });

let getImporteMaterialAssetLightMaterialComponents = () =>
  getImportedMaterialAssetNodes()
  |> Js.Array.filter(node => {
       let {type_}: NodeAssetType.materialNodeData =
         MaterialNodeAssetService.getNodeData(node);

       type_ === MaterialDataAssetType.LightMaterial;
     })
  |> Js.Array.map(node => {
       let {materialComponent}: NodeAssetType.materialNodeData =
         MaterialNodeAssetService.getNodeData(node);

       materialComponent;
     });


let getImportedTextureAssetNodes = () =>
  BasicSourceTypeTextureNodeAssetEditorService.findAllBasicSourceTypeTextureNodes
  |> StateLogicService.getEditorState;

let getImportedTextureAssetTextureComponents = () =>
  getImportedTextureAssetNodes()
  |> Js.Array.map(node => {
       let {textureComponent}: NodeAssetType.textureNodeData =
         TextureNodeAssetService.getNodeData(node);

       textureComponent;
     });

let getImportedWDBAssetNodeId = () =>
  WDBNodeAssetEditorService.findAllWDBNodes
  |> StateLogicService.getEditorState
  |> Js.Array.map(node => NodeAssetService.getNodeId(~node));

let getImportedScriptEventFunctionAssetNodeId = () =>
  ScriptEventFunctionNodeAssetEditorService.findAllScriptEventFunctionNodes
  |> StateLogicService.getEditorState
  |> Js.Array.map(node => NodeAssetService.getNodeId(~node));

let getImportedScriptAttributeAssetNodeId = () =>
  ScriptAttributeNodeAssetEditorService.findAllScriptAttributeNodes
  |> StateLogicService.getEditorState
  |> Js.Array.map(node => NodeAssetService.getNodeId(~node));

let disposeAssets = () => {
  HeaderImportPackageUtils._disposeAssets();

  JobEngineService.execDisposeJob |> StateLogicService.getAndSetEngineState;
};

let buildFakeCanvas = (sandbox, base64, callIndex) => {
  open Sinon;

  let toDataURLStub = createEmptyStubWithJsObjSandbox(sandbox);
  toDataURLStub |> returns(base64);

  let canvasDom = {
    "width": 0,
    "height": 0,
    "getContext": () => {
      "drawImage": createEmptyStubWithJsObjSandbox(sandbox),
      "clearRect": createEmptyStubWithJsObjSandbox(sandbox),
    },
    "toDataURL": toDataURLStub,
  };

  canvasDom;
};

let buildBase64_1 = () => "data:image/png;base64,aaaacccccccccccccccccccccccaaacccccccccccccccccccccccaaacccccccccccccccccccccccaacccccccccccccccccccccccaaaacccccccccccccccccccccccaaacccccccccccccccccccccccaaacccccccccccccccccccccccaaccccccccccccccccccccccc";

let buildBase64_2 = () => "data:image/jpeg;base64,bbb";

let prepareFakeCanvas = sandbox => {
  open Sinon;

  let canvas = buildFakeCanvas(sandbox, buildBase64_2(), 0);

  let createElementStub =
    BuildCanvasTool.documentToJsObj(BuildCanvasTool.document)##createElement;

  createElementStub |> withOneArg("canvas") |> returns(canvas) |> ignore;

  ();
};

module Cubemap = {
  let getImportedCubemapAssetCubemapComponents = () =>
    CubemapNodeAssetEditorService.findAllCubemapNodes
    |> StateLogicService.getEditorState
    |> Js.Array.map(node => {
         let {textureComponent}: NodeAssetType.cubemapNodeData =
           CubemapNodeAssetService.getNodeData(node);

         textureComponent;
       });

  let prepareForAddOneCubemapAsset = sandbox => {
    WDBTool.prepareFakeCanvas(sandbox) |> ignore;
    let assetTreeData =
      MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
    let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
    MainEditorAssetHeaderOperateNodeTool.addCubemap();

    let (
      (editorState, engineState),
      (source1, source2, source3, source4, source5, source6),
      (base64_1, base64_2, base64_3, base64_4, base64_5, base64_6),
    ) =
      MainEditorAssetCubemapNodeTool.setAllSources(~nodeId=addedNodeId, ());

    (editorState, engineState) |> StateLogicService.setState;

    (
      (source1, source2, source3, source4, source5, source6),
      (base64_1, base64_2, base64_3, base64_4, base64_5, base64_6),
      addedNodeId,
    );
  };
};