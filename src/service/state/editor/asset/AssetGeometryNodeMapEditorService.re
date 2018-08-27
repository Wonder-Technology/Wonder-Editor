open EditorType;

open AssetNodeType;

let getGeometryNodeMap = editorState =>
  editorState.assetRecord |> GeometryNodeMapAssetService.getGeometryNodeMap;

let setGeometryNodeMap = (geometryNodeMap, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> GeometryNodeMapAssetService.setGeometryNodeMap(geometryNodeMap),
};

let setResult = (index, result, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> GeometryNodeMapAssetService.setResult(index, result),
};

let setAllGeometryIntoGeometryNodeMap = (geometryArr, editorState) => {
  geometryArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. editorState, geometry) => {
         let (editorState, newIndex) =
           AssetIdUtils.getAssetId |> StateLogicService.getEditorState;

         setResult(newIndex, geometry, editorState);
       },
       editorState,
     );
};