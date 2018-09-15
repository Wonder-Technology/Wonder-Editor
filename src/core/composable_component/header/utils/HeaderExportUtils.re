open AssetNodeType;

open AssetTreeNodeType;

open WonderBsJszip;

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
  | _ =>
    jsZip
    |. Zip.write(
         ~options=Options.makeWriteOptions(~binary=true, ()),
         pathName,
         `trustme("the type: material/texture can't resolve now"),
       )
  };

let jsZipWriteAllAssetAtomNode = (jsZip, editorState) =>
  _getAssetAtomNodeArr(
    [|
      editorState
      |> AssetTreeRootEditorService.getAssetTreeRoot
      |> OptionService.unsafeGet,
    |],
    [||],
  )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. jsZip, {id, type_} as assetAtomNode) => {
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

let exportPackage = createZipFunc => {
  let engineState = StateEngineService.unsafeGetState();

  let (engineState, sceneGraphArrayBuffer) =
    GenerateSceneGraphEngineService.generateWDB(
      SceneEngineService.getSceneGameObject(engineState),
      Js.Nullable.null,
      engineState,
    );

  engineState |> StateEngineService.setState;

  createZipFunc()
  |. jsZipWriteAllAssetAtomNode(StateEditorService.getState())
  |. Zip.write(
       ~options=Options.makeWriteOptions(~binary=true, ()),
       "scene.wdb",
       `trustme(
         sceneGraphArrayBuffer |> TypeArrayType.newBlobFromArrayBuffer,
       ),
     )
  |. Zip.generateAsyncBlob(Zip.makeAsyncBlobOptions())
  |> Js.Promise.then_(content =>
       FileSaver.saveAs(content, "wonderpackage.zip") |> Js.Promise.resolve
     )
  |> ignore;
};