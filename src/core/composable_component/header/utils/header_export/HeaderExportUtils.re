open AssetNodeType;

open AssetTreeNodeType;

open WonderBsJszip;

open Js.Promise;

let rec _getAssetAtomNodeArr = (assetRootArr, assetAtomNodeArr) =>
  assetRootArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. assetAtomNodeArr, {id, type_, children} as assetTreeNode) => {
         let assetAtomNodeArr =
           children |> Js.Array.length == 0 ?
             assetAtomNodeArr |> ArrayService.push(assetTreeNode) :
             assetAtomNodeArr;

         _getAssetAtomNodeArr(children, assetAtomNodeArr);
       },
       assetAtomNodeArr,
     );

let rec _getAssetNodePathFromAssets = (parentId, namePathArr, editorState) =>
  switch (parentId) {
  | None => namePathArr |> Js.Array.reverseInPlace |> Js.Array.joinWith("/")
  | Some(parentId) =>
    _getAssetNodePathFromAssets(
      AssetNodeUtils.getAssetNodeParentId(Folder, parentId, editorState),
      namePathArr
      |> Js.Array.copy
      |> ArrayService.push(
           AssetNodeUtils.getAssetNodeTotalName(
             Folder,
             parentId,
             editorState,
           ),
         ),
      editorState,
    )
  };

let _isAssetNodeNeedHandleSeparate = type_ =>
  type_ === Texture || type_ === Material;

let _storeJsZipByType = ((type_, id), pathName, jsZip, editorState) =>
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
  |> SparseMapService.getValidDataArr
  |> Js.Array.map(((nodeId, {textureIndex, parentId, imageId})) => {
       let pathName =
         _getAssetNodePathFromAssets(
           AssetNodeUtils.getAssetNodeParentId(Texture, nodeId, editorState),
           ArrayService.create()
           |> ArrayService.push(
                AssetNodeUtils.getAssetNodeTotalName(
                  Texture,
                  nodeId,
                  editorState,
                ),
              ),
           editorState,
         );

       (
         pathName,
         textureIndex,
         BasicSourceTextureEngineService.getWrapS(textureIndex, engineState)
         |> TextureTypeUtils.convertWrapToInt,
         BasicSourceTextureEngineService.getWrapT(textureIndex, engineState)
         |> TextureTypeUtils.convertWrapToInt,
         BasicSourceTextureEngineService.getMinFilter(
           textureIndex,
           engineState,
         )
         |> TextureTypeUtils.convertFilterToInt,
         BasicSourceTextureEngineService.getMagFilter(
           textureIndex,
           engineState,
         )
         |> TextureTypeUtils.convertFilterToInt,
       );
     });
};

let getImageSourceDataArr = editorState =>
  editorState
  |> AssetImageBase64MapEditorService.getImageBase64Map
  |> SparseMapService.getValidValues
  |> Js.Array.map(image => image |> ExportAssetType.convertImageResultToSource);

let storeAllAssetIntoJson = editorState => {
  let textureDataArr = getAssetTextureDataArr(editorState);

  let imageSourceDataArr = getImageSourceDataArr(editorState);

  HeaderEncodeAssetUtils.encodeAsset(textureDataArr, imageSourceDataArr);
};

let _jsZipWriteAllAssetAtomNode = (jsZip, editorState) =>
  _getAssetAtomNodeArr(
    [|
      editorState
      |> AssetTreeRootEditorService.getAssetTreeRoot
      |> OptionService.unsafeGet,
    |],
    [||],
  )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. jsZip, {id, type_} as assetAtomNode) =>
         _isAssetNodeNeedHandleSeparate(type_) ?
           jsZip :
           {
             let pathName =
               _getAssetNodePathFromAssets(
                 AssetNodeUtils.getAssetNodeParentId(type_, id, editorState),
                 ArrayService.create()
                 |> ArrayService.push(
                      AssetNodeUtils.getAssetNodeTotalName(
                        type_,
                        id,
                        editorState,
                      ),
                    ),
                 editorState,
               );

             _storeJsZipByType((type_, id), pathName, jsZip, editorState);
           },
       jsZip,
     );

let exportPackage = (createZipFunc, fetchFunc) => {
  let engineState = StateEngineService.unsafeGetState();

  let (engineState, sceneGraphArrayBuffer) =
    GenerateSceneGraphEngineService.generateWDB(
      SceneEngineService.getSceneGameObject(engineState),
      Js.Nullable.null,
      engineState,
    );

  engineState |> StateEngineService.setState;

  createZipFunc()
  |> WonderBsMost.Most.just
  |> WonderBsMost.Most.flatMap(zip =>
       WonderBsMost.Most.fromPromise(
         HeaderExportLoadDataUtils.loadIndexHtmlData(fetchFunc, zip),
       )
     )
  |> WonderBsMost.Most.flatMap(zip =>
       WonderBsMost.Most.fromPromise(
         HeaderExportLoadDataUtils.loadIndexJsData(fetchFunc, zip),
       )
     )
  |> WonderBsMost.Most.tap(zip =>
       zip
       |. _jsZipWriteAllAssetAtomNode(StateEditorService.getState())
       |. Zip.write(
            ~options=Options.makeWriteOptions(~binary=true, ()),
            "Scene.wdb",
            `trustme(
              sceneGraphArrayBuffer |> TypeArrayType.newBlobFromArrayBuffer,
            ),
          )
       |. Zip.write(
            "Assets.json",
            `str(storeAllAssetIntoJson |> StateLogicService.getEditorState),
          )
       |. Zip.generateAsyncBlob(Zip.makeAsyncBlobOptions())
       |> Js.Promise.then_(content =>
            FileSaver.saveAs(content, "wonderpackage.zip")
            |> Js.Promise.resolve
          )
       |> ignore
     )
  |> WonderBsMost.Most.drain;
};