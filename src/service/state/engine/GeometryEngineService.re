open Wonderjs;

open RenderGroupType;

open Js.Typed_array;

let create = GeometryAPI.createGeometry;

let getGeometryName = NameGeometryMainService.getName;

let unsafeGetGeometryName = GeometryAPI.unsafeGetGeometryName;

let setGeometryName = GeometryAPI.setGeometryName;

let createCubeGeometry = engineState =>
  CreateDefaultGeometryGeometryMainService.create(
    ComputeBoxPointsGeometryService.generateAllFaces((
      0.5,
      0.5,
      0.5,
      1,
      1,
      1,
    )),
    engineState,
  );

let createSphereGeometry = GeometryAPI.createSphereGeometry;

let createCylinderGeometry = GeometryAPI.createCylinderGeometry;

let createConeGeometry = GeometryAPI.createConeGeometry;

let createPlaneGeometry = GeometryAPI.createPlaneGeometry;

let getGeometryVertices = GeometryAPI.getGeometryVertices;

let setGeometryVertices = GeometryAPI.setGeometryVertices;

let getGeometryNormals = GeometryAPI.getGeometryNormals;

let setGeometryNormals = GeometryAPI.setGeometryNormals;

let getGeometryTexCoords = GeometryAPI.getGeometryTexCoords;

let setGeometryTexCoords = GeometryAPI.setGeometryTexCoords;

let getGeometryIndices16 = GeometryAPI.getGeometryIndices16;

let setGeometryIndices16 = GeometryAPI.setGeometryIndices16;

let getGeometryIndices32 = GeometryAPI.getGeometryIndices32;

let setGeometryIndices32 = GeometryAPI.setGeometryIndices32;

let hasGeometryTexCoords = (geometry, engineState) =>
  getGeometryTexCoords(geometry, engineState) |> Float32Array.length > 0;

let getAllGeometrys = GeometryAPI.getAllGeometrys;

let unsafeGetGeometryGameObjects = Wonderjs.GeometryAPI.unsafeGetGeometryGameObjects;

let getBasicMaterialGameObjects = (geometry, engineState) =>
  GameObjectGeometryService.getGameObjects(
    geometry,
    RecordGeometryMainService.getRecord(engineState),
  );

let hasGeometryGameObjects = (geometry, engineState) =>
  getBasicMaterialGameObjects(geometry, engineState) |> Js.Option.isSome;

let rec _generateGridPlanePoints =
        ((size, step, y), (num, index), vertices, indices) =>
  WonderEditor.(
    num > size ?
      (vertices, indices) :
      _generateGridPlanePoints(
        (size, step, y),
        (num +. step, index + 4),
        vertices
        |> ArrayService.pushMany([|-. size, y, num|])
        |> ArrayService.pushMany([|size, y, num|])
        |> ArrayService.pushMany([|num, y, -. size|])
        |> ArrayService.pushMany([|num, y, size|]),
        indices
        |> ArrayService.pushMany([|index, index + 1, index + 2, index + 3|]),
      )
  );

let createGridPlaneGameObject = ((size, step, y), color, engineState) => {
  let (engineState, gameObject) =
    GameObjectEngineService.create(engineState);

  let (engineState, geometry) = create(engineState);

  let (vertices, indices) =
    _generateGridPlanePoints((size, step, y), (-. size, 0), [||], [||]);

  let engineState =
    engineState
    |> setGeometryVertices(geometry, Float32Array.make(vertices))
    |> setGeometryIndices16(geometry, Uint16Array.make(indices));

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("gridPlane", gameObject);

  let (engineState, renderGroup) =
    engineState
    |> RenderGroupEngineService.createRenderGroup((
         MeshRendererEngineService.create,
         BasicMaterialEngineService.create,
       ));

  let engineState =
    MeshRendererEngineService.setDrawMode(
      DrawModeType.Lines |> DrawModeType.drawModeToUint8,
      renderGroup.meshRenderer,
      engineState,
    )
    |> BasicMaterialEngineService.setColor(color, renderGroup.material)
    |> GameObjectComponentEngineService.addGeometryComponent(
         gameObject,
         geometry,
       )
    |> RenderGroupEngineService.addRenderGroupComponents(
         gameObject,
         renderGroup,
         (
           GameObjectAPI.addGameObjectMeshRendererComponent,
           GameObjectAPI.addGameObjectBasicMaterialComponent,
         ),
       );

  (engineState, gameObject);
};

let getGeometryTexCoords = GeometryAPI.getGeometryTexCoords;

let batchDisposeGeometry = GeometryAPI.batchDisposeGeometry;

let getIndicesCount = (geometry, engineState) => {
  open StateDataMainType;
  open GeometryType;

  /* let {geometryRecord} = engineState; */

  let {indicesInfos} = RecordGeometryMainService.getRecord(engineState);
  let (startIndex, endIndex) =
    ReallocatedPointsGeometryService.getInfo(
      BufferGeometryService.getInfoIndex(geometry),
      indicesInfos,
    );
  endIndex - startIndex;
};

let hasIndices16 = GeometryAPI.hasGeometryIndices16;

let hasIndices32 = GeometryAPI.hasGeometryIndices32;