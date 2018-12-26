open Js.Promise;

let testImportPackageWithoutExport =
    (
      ~testFunc,
      ~wpkArrayBuffer,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~fileName="Wpk",
      (),
    ) =>
  Header.Method.importPackage(
    (store, dispatchFunc),
    (_ => (), Obj.magic(-1)),
    BaseEventTool.buildPackageFileEvent(fileName, wpkArrayBuffer),
  )
  |> then_(_ => testFunc());

let testImportPackage =
    (
      ~testFunc,
      ~store=TestTool.buildEmptyAppState(),
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
    ~store,
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

let getImportedTextureAssetTextureComponents = () =>
  TextureNodeAssetEditorService.findAllTextureNodes
  |> StateLogicService.getEditorState
  |> Js.Array.map(node => {
       let {textureComponent}: NodeAssetType.textureNodeData =
         TextureNodeAssetService.getNodeData(node);

       textureComponent;
     });

let getImportedWDBAssetNodeId = () =>
  WDBNodeAssetEditorService.findAllWDBNodes
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

  let createElementStub = BuildCanvasTool.documentToJsObj(
                            BuildCanvasTool.document,
                          )##createElement;

  createElementStub |> withOneArg("canvas") |> returns(canvas) |> ignore;

  ();
};