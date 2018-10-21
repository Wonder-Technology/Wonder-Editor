open AssetNodeType;

open AssetTreeNodeType;

open WonderBsJszip;

open Js.Promise;

let rec _getAssetAtomNodeArr = (assetRootArr, assetAtomNodeArr) =>
  assetRootArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. assetAtomNodeArr, {nodeId, type_, children} as assetTreeNode) => {
         let assetAtomNodeArr =
           children |> Js.Array.length == 0 ?
             assetAtomNodeArr |> ArrayService.push(assetTreeNode) :
             assetAtomNodeArr;

         _getAssetAtomNodeArr(children, assetAtomNodeArr);
       },
       assetAtomNodeArr,
     );

let rec _getAssetNodePathFromAssets =
        (parentNodeId, namePathArr, (editorState, engineState)) =>
  switch (parentNodeId) {
  | None => namePathArr |> Js.Array.reverseInPlace |> Js.Array.joinWith("/")
  | Some(parentNodeId) =>
    _getAssetNodePathFromAssets(
      AssetNodeUtils.getAssetNodeParentId(Folder, parentNodeId, editorState),
      namePathArr
      |> Js.Array.copy
      |> ArrayService.push(
           AssetNodeUtils.getAssetNodeTotalName(
             Folder,
             parentNodeId,
             (editorState, engineState),
           ),
         ),
      (editorState, engineState),
    )
  };

let _isAssetNodeNeedHandleSeparate = type_ =>
  type_ === Texture || type_ === Material;

let _writeFolderAndWDBToPackage = ((type_, id), pathName, jsZip, editorState) =>
  switch (type_) {
  | Folder =>
    jsZip
    |. Zip.write(
         ~options=Options.makeWriteOptions(~dir=true, ()),
         pathName,
         `trustme(),
       )
  | WDB =>
    let {wdbArrayBuffer} =
      editorState
      |> AssetWDBNodeMapEditorService.getWDBNodeMap
      |> WonderCommonlib.SparseMapService.unsafeGet(id);

    jsZip
    |. Zip.write(
         ~options=Options.makeWriteOptions(~binary=true, ()),
         pathName,
         `trustme(wdbArrayBuffer |> TypeArrayType.newBlobFromArrayBuffer),
       );
  | Json =>
    let {jsonResult} =
      editorState
      |> AssetJsonNodeMapEditorService.getJsonNodeMap
      |> WonderCommonlib.SparseMapService.unsafeGet(id);

    jsZip
    |. Zip.write(
         ~options=Options.makeWriteOptions(~binary=true, ()),
         pathName,
         `trustme(jsonResult),
       );
  | _ => jsZip
  };

let getAssetTextureDataArr = editorState => {
  let engineState = StateEngineService.unsafeGetState();

  editorState
  |> AssetTextureNodeMapEditorService.getTextureNodeMap
  /* TODO not get valid? */
  |> SparseMapService.getValidDataArr
  |> Js.Array.map(((nodeId, {textureComponent, parentNodeId, imageId})) => {
       let pathName =
         _getAssetNodePathFromAssets(
           /* AssetNodeUtils.getAssetNodeParentId(Texture, nodeId, editorState), */
           parentNodeId,
           ArrayService.create()
           |> ArrayService.push(
                AssetNodeUtils.getAssetNodeTotalName(
                  Texture,
                  nodeId,
                  (editorState, engineState),
                ),
              ),
           (editorState, engineState),
         );

       (
         pathName,
         /* TODO use imageId? */
         textureComponent,
         BasicSourceTextureEngineService.getWrapS(
           textureComponent,
           engineState,
         )
         |> TextureTypeUtils.convertWrapToInt,
         BasicSourceTextureEngineService.getWrapT(
           textureComponent,
           engineState,
         )
         |> TextureTypeUtils.convertWrapToInt,
         BasicSourceTextureEngineService.getMinFilter(
           textureComponent,
           engineState,
         )
         |> TextureTypeUtils.convertFilterToInt,
         BasicSourceTextureEngineService.getMagFilter(
           textureComponent,
           engineState,
         )
         |> TextureTypeUtils.convertFilterToInt,
       );
     });
};

/* TODO not get valid? */
let getImageSourceDataArr = editorState =>
  editorState
  |> AssetImageBase64MapEditorService.getImageBase64Map
  |> SparseMapService.getValidValues
  |> Js.Array.map(image => image |> ExportAssetType.convertImageResultToSource);

let buildAssetJson = editorState => {
  let textureDataArr = getAssetTextureDataArr(editorState);

  let imageSourceDataArr = getImageSourceDataArr(editorState);

  HeaderEncodeAssetUtils.encodeAsset(textureDataArr, imageSourceDataArr);
};

let _writeAllFolderAndWDBToPackage = (jsZip, (editorState, engineState)) =>
  _getAssetAtomNodeArr(
    [|
      editorState
      |> AssetTreeRootEditorService.getAssetTreeRoot
      |> OptionService.unsafeGet,
    |],
    [||],
  )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. jsZip, {nodeId, type_} as assetAtomNode) =>
         _isAssetNodeNeedHandleSeparate(type_) ?
           jsZip :
           {
             let pathName =
               _getAssetNodePathFromAssets(
                 AssetNodeUtils.getAssetNodeParentId(
                   type_,
                   nodeId,
                   editorState,
                 ),
                 ArrayService.create()
                 |> ArrayService.push(
                      AssetNodeUtils.getAssetNodeTotalName(
                        type_,
                        nodeId,
                        (editorState, engineState),
                      ),
                    ),
                 (editorState, engineState),
               );

             _writeFolderAndWDBToPackage(
               (type_, nodeId),
               pathName,
               jsZip,
               editorState,
             );
           },
       jsZip,
     );

let _generateWDB = engineState => {
  let isRun = SceneEditorService.getIsRun(StateEditorService.getState());
  let engineState =
    isRun ?
      engineState :
      engineState
      |> ArcballCameraControllerLogicService.bindGameViewActiveCameraArcballCameraControllerEvent;

  let (engineState, sceneGraphArrayBuffer) =
    GenerateSceneGraphEngineService.generateWDB(
      SceneEngineService.getSceneGameObject(engineState),
      Js.Nullable.null,
      engineState,
    );

  let engineState =
    isRun ?
      engineState :
      engineState
      |> ArcballCameraControllerLogicService.unbindGameViewActiveCameraArcballCameraControllerEvent;

  (engineState, sceneGraphArrayBuffer);
};

let exportPackage = (createZipFunc, fetchFunc, exportPackageName) => {
  let engineState = StateEngineService.unsafeGetState();

  let (engineState, sceneGraphArrayBuffer) = _generateWDB(engineState);

  engineState |> StateEngineService.setState;

  createZipFunc()
  |> WonderBsMost.Most.just
  |> WonderBsMost.Most.flatMap(zip =>
       WonderBsMost.Most.fromPromise(
         HeaderExportLoadDataUtils.loadAndWriteIndexHtmlData(
           sceneGraphArrayBuffer,
           fetchFunc,
           zip,
         ),
       )
     )
  |> WonderBsMost.Most.flatMap(zip =>
       WonderBsMost.Most.fromPromise(
         HeaderExportLoadDataUtils.loadAndWriteIndexJsData(fetchFunc, zip),
       )
     )
  |> WonderBsMost.Most.flatMap(zip =>
       WonderBsMost.Most.fromPromise(
         HeaderExportLoadDataUtils.loadAndWriteResData(fetchFunc, zip),
       )
     )
  |> WonderBsMost.Most.flatMap(zip =>
       WonderBsMost.Most.fromPromise(
         HeaderExportLoadDataUtils.loadAndWriteConfigData(fetchFunc, zip),
       )
     )
  |> WonderBsMost.Most.tap(zip =>
       zip
       |. _writeAllFolderAndWDBToPackage((
            StateEditorService.getState(),
            StateEngineService.unsafeGetState(),
          ))
       |. Zip.write(
            ~options=Options.makeWriteOptions(~binary=true, ()),
            "Scene.wdb",
            `trustme(
              sceneGraphArrayBuffer |> TypeArrayType.newBlobFromArrayBuffer,
            ),
          )
       |. Zip.write(
            "Assets.json",
            `str(buildAssetJson |> StateLogicService.getEditorState),
          )
       |. Zip.generateAsyncBlob(Zip.makeAsyncBlobOptions())
       |> Js.Promise.then_(content =>
            FileSaver.saveAs(content, exportPackageName ++ ".zip")
            |> Js.Promise.resolve
          )
       |> ignore
     )
  |> WonderBsMost.Most.drain;
};