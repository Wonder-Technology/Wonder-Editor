open Js.Typed_array;

let isGeometryPointDataEqual = (points1, points2, getLengthFunc) =>
  getLengthFunc(points1) === getLengthFunc(points2);

let _isGeometryVertexDataEqual = (geometry1, geometry2, engineState) =>
  isGeometryPointDataEqual(
    GeometryEngineService.unsafeGetGeometryVertices(geometry1, engineState),
    GeometryEngineService.unsafeGetGeometryVertices(geometry2, engineState),
    Float32Array.length,
  )
  && isGeometryPointDataEqual(
       GeometryEngineService.unsafeGetGeometryNormals(geometry1, engineState),
       GeometryEngineService.unsafeGetGeometryNormals(geometry2, engineState),
       Float32Array.length,
     )
  && isGeometryPointDataEqual(
       GeometryEngineService.unsafeGetGeometryTexCoords(geometry1, engineState),
       GeometryEngineService.unsafeGetGeometryTexCoords(geometry2, engineState),
       Float32Array.length,
     )
  && isGeometryPointDataEqual(
       GeometryEngineService.unsafeGetGeometryIndices16(geometry1, engineState),
       GeometryEngineService.unsafeGetGeometryIndices16(geometry2, engineState),
       Uint16Array.length,
     );

let isGeometryEqualDefaultGeometryData =
    (geometry, defaultGeometry, defaultGeometryName, engineState) =>
  switch (GeometryEngineService.getGeometryName(geometry, engineState)) {
  | None => false
  | Some(name) =>
    name == defaultGeometryName
    && _isGeometryVertexDataEqual(geometry, defaultGeometry, engineState)
  };

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
  !isDefaultGeometry(geometry, (editorState, engineState));

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