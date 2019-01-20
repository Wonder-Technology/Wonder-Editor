open Js.Typed_array;

let isGeometryPointDataEqual = (points1, points2, getLengthFunc) =>
  getLengthFunc(points1) === getLengthFunc(points2);

let _isGeometryVertexDataEqual = (geometry1, geometry2, engineState) =>
  isGeometryPointDataEqual(
    GeometryEngineService.getGeometryVertices(geometry1, engineState),
    GeometryEngineService.getGeometryVertices(geometry2, engineState),
    Float32Array.length,
  )
  && isGeometryPointDataEqual(
       GeometryEngineService.getGeometryNormals(geometry1, engineState),
       GeometryEngineService.getGeometryNormals(geometry2, engineState),
       Float32Array.length,
     )
  && isGeometryPointDataEqual(
       GeometryEngineService.getGeometryTexCoords(geometry1, engineState),
       GeometryEngineService.getGeometryTexCoords(geometry2, engineState),
       Float32Array.length,
     )
  && isGeometryPointDataEqual(
       GeometryEngineService.getGeometryIndices(geometry1, engineState),
       GeometryEngineService.getGeometryIndices(geometry2, engineState),
       Uint16Array.length,
     );

let isGeometryEqualDefaultGeometryData =
    (geometry, defaultGeometry, defaultGeometryName, engineState) =>
  GeometryEngineService.unsafeGetGeometryName(geometry, engineState)
  == defaultGeometryName
  && _isGeometryVertexDataEqual(geometry, defaultGeometry, engineState);

let isDefaultGeometry = (geometry, (editorState, engineState)) => {
  let (defaultCubeGeometry, defaultCubeGeometryName) = (
    GeometryDataAssetEditorService.unsafeGetDefaultCubeGeometryComponent(
      editorState,
    ),
    PrepareDefaultComponentLogicService.getDefaultCubeGeometryName(),
  );
  let (defaultSphereGeometry, defaultSphereGeometryName) = (
    GeometryDataAssetEditorService.unsafeGetDefaultSphereGeometryComponent(
      editorState,
    ),
    PrepareDefaultComponentLogicService.getDefaultSphereGeometryName(),
  );

  isGeometryEqualDefaultGeometryData(
    geometry,
    defaultCubeGeometry,
    defaultCubeGeometryName,
    engineState,
  )
  || isGeometryEqualDefaultGeometryData(
       geometry,
       defaultSphereGeometry,
       defaultSphereGeometryName,
       engineState,
     );
};

let isGeometryAsset = (geometry, (editorState, engineState)) =>
  ! isDefaultGeometry(geometry, (editorState, engineState));

let getAllWDBGameObjects = (editorState, engineState) =>
  editorState
  |> WDBNodeAssetEditorService.findAllWDBNodes
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. allWDBGameObjects, wdbNode) =>
         ArrayService.fastConcat(
           allWDBGameObjects,
           HierarchyGameObjectEngineService.getAllGameObjects(
             WDBNodeAssetService.getWDBGameObject(wdbNode),
             engineState,
           ),
         ),
       [||],
     );

let getGeometryAssetsFromWDBGameObjects =
    (wdbGameObjects, (editorState, engineState)) =>
  wdbGameObjects
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. geometryAssetArr, gameObject) =>
         switch (
           GameObjectComponentEngineService.getGeometryComponent(
             gameObject,
             engineState,
           )
         ) {
         | Some(geometry) =>
           isGeometryAsset(geometry, (editorState, engineState)) ?
             geometryAssetArr |> ArrayService.push(geometry) :
             geometryAssetArr
         | None => geometryAssetArr
         },
       [||],
     )
  |> WonderCommonlib.ArrayService.removeDuplicateItems;

let getGeometryAssets = (editorState, engineState) =>
  getGeometryAssetsFromWDBGameObjects(
    getAllWDBGameObjects(editorState, engineState),
    (editorState, engineState),
  );