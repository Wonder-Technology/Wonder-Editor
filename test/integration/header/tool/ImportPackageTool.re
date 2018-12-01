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

let getImportedMaterialAssetResults = () =>
  MaterialNodeMapAssetEditorService.getResults
  |> StateLogicService.getEditorState;

let getFirstImportedMaterialAssetData = () => {
  let (materialNodeId, {materialComponent}: AssetNodeType.materialResultType) =
    getImportedMaterialAssetResults() |> ArrayService.unsafeGetFirst;

  (materialNodeId, materialComponent);
};

let getImporteMaterialAssetMaterialComponents = () =>
  MaterialNodeMapAssetEditorService.getValidValues
  |> StateLogicService.getEditorState
  |> Js.Array.map(({materialComponent}: AssetNodeType.materialResultType) =>
       materialComponent
     );

let getImporteMaterialAssetBasicMaterialComponents = () =>
  MaterialNodeMapAssetEditorService.getValidValues
  |> StateLogicService.getEditorState
  |> Js.Array.filter(({type_}: AssetNodeType.materialResultType) =>
       type_ === AssetMaterialDataType.BasicMaterial
     )
  |> Js.Array.map(({materialComponent}: AssetNodeType.materialResultType) =>
       materialComponent
     );

let getImporteMaterialAssetLightMaterialComponents = () =>
  MaterialNodeMapAssetEditorService.getValidValues
  |> StateLogicService.getEditorState
  |> Js.Array.filter(({type_}: AssetNodeType.materialResultType) =>
       type_ === AssetMaterialDataType.LightMaterial
     )
  |> Js.Array.map(({materialComponent}: AssetNodeType.materialResultType) =>
       materialComponent
     );

let getImportedTextureAssetTextureComponents = () =>
  TextureNodeMapAssetEditorService.getValidValues
  |> StateLogicService.getEditorState
  |> Js.Array.map(({textureComponent}: AssetNodeType.textureResultType) =>
       textureComponent
     );

let getImportedWDBAssetData = () =>
  StateEditorService.getState()
  |> WDBNodeMapAssetEditorService.getWDBNodeMap
  |> SparseMapService.getValidDataArr;

let getFirstImportedWDBAssetData = () =>
  getImportedWDBAssetData() |> ArrayService.unsafeGetFirst;

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