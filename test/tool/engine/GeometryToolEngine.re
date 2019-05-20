open Wonderjs.GeometryType;

let createGameObjectAndSetPointData = (~engineState, ~hasTexCoords=true, ()) => {
  open Js.Typed_array;
  let (engineState, geometry) = GeometryEngineService.create(engineState);
  let (engineState, gameObject) =
    GameObjectEngineService.create(engineState);

  let engineState =
    engineState
    |> GameObjectComponentEngineService.addGeometryComponent(
         gameObject,
         geometry,
       );
  let vertices1 = Float32Array.make([|10.|]);
  let texCoords1 = Float32Array.make([|0.5|]);
  let normals1 = Float32Array.make([|1.|]);
  let indices1 = Uint16Array.make([|2|]);
  let engineState =
    engineState
    |> GeometryEngineService.setGeometryVertices( vertices1,geometry)
    |> GeometryEngineService.setGeometryNormals(normals1,geometry)
    |> GeometryEngineService.setGeometryIndices16( indices1,geometry);

  let engineState =
    hasTexCoords ?
      engineState
      |> GeometryEngineService.setGeometryTexCoords(texCoords1,geometry) :
      engineState;

  let name = hasTexCoords ? "geometryWithTexCoord" : "geometryNoTexCoord";

  let engineState =
    engineState |> GeometryEngineService.setGeometryName(geometry, name);

  (
    engineState,
    gameObject,
    geometry,
    (vertices1, texCoords1, normals1, indices1),
    name,
  );
};

let getNewGeometry = (~engineState=StateEngineService.unsafeGetState(), ()) => {
  let {disposedIndexArray, index} as geometryRecord =
    Wonderjs.RecordGeometryMainService.getRecord(engineState);

  let (index, newIndex, disposedIndexArray) =
    ComponentToolEngine.computeGeneratedIndex(index, disposedIndexArray);

  index;
};

let isGeometryDisposed = (geometry, engineState) =>
  !
    Wonderjs.DisposeGeometryMainService.isAliveWithRecord(
      geometry,
      engineState |> Wonderjs.RecordGeometryMainService.getRecord,
    );

let getVertices = engineState => {
  let {vertices} as geometryRecord =
    Wonderjs.RecordGeometryMainService.getRecord(engineState);

  vertices;
};

let getGameObjectVertices = (gameObject, engineState) =>
  GameObjectComponentEngineService.unsafeGetGeometryComponent(
    gameObject,
    engineState,
  )
  |> GeometryEngineService.unsafeGetGeometryVertices(_, engineState);

let getGameObjectNormals = (gameObject, engineState) =>
  GameObjectComponentEngineService.unsafeGetGeometryComponent(
    gameObject,
    engineState,
  )
  |> GeometryEngineService.unsafeGetGeometryNormals(_, engineState);

let getGameObjectTexCoords = (gameObject, engineState) =>
  GameObjectComponentEngineService.unsafeGetGeometryComponent(
    gameObject,
    engineState,
  )
  |> GeometryEngineService.unsafeGetGeometryTexCoords(_, engineState);

let getGameObjectIndices16 = (gameObject, engineState) =>
  GameObjectComponentEngineService.unsafeGetGeometryComponent(
    gameObject,
    engineState,
  )
  |> GeometryEngineService.unsafeGetGeometryIndices16(_, engineState);