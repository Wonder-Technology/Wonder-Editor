open Wonderjs;

open RenderGroupType;

open Js.Typed_array;

let create = GeometryAPI.createGeometry;

let getGeometryName = NameGeometryMainService.getName;

let unsafeGetGeometryName = GeometryAPI.unsafeGetGeometryName;

let setGeometryName = GeometryAPI.setGeometryName;

let createBoxGeometry = engineState =>
  /* let (vertices, texCoords, normals, indices) =
     ComputeBoxPointsGeometryService.generateAllFaces((
       0.5,
       0.5,
       0.5,
       1,
       1,
       1,
     )); */
  /* let vertices = [|
     0.5,
     0.5,
     0.5,
     0.5,
     0.5,
     (-0.5),
     0.5,
     (-0.5),
     0.5,
     0.5,
     (-0.5),
     (-0.5),
     (-0.5),
     0.5,
        (-0.5),
        (-0.5),
        0.5,
        0.5,
        (-0.5),
        (-0.5),
        (-0.5),
        (-0.5),
        (-0.5),
        0.5,
        (-0.5),
        0.5,
        (-0.5),
        0.5,
        0.5,
        (-0.5),
        (-0.5),
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        (-0.5),
        (-0.5),
        0.5,
        0.5,
        (-0.5),
        0.5,
        (-0.5),
        (-0.5),
        (-0.5),
        0.5,
        (-0.5),
        (-0.5),
        (-0.5),
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        (-0.5),
        (-0.5),
        0.5,
        0.5,
        (-0.5),
        0.5,
        0.5,
        0.5,
        (-0.5),
        (-0.5),
        0.5,
        (-0.5),
        0.5,
        (-0.5),
        (-0.5),
        (-0.5),
        (-0.5),
        (-0.5),
      |];

      let indices = [|
        0,
        2,
        1,
        2,
        3,
        1,
        4,
        6,
        5,
        6,
        7,
        5,
        8,
        10,
        9,
        10,
        11,
        9,
        12,
        14,
        13,
        14,
        15,
        13,
        16,
        18,
        17,
        18,
        19,
        17,
        20,
        22,
        21,
        22,
        23,
        21,
      |]; */
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
    /* let (engineState, geometry) = CreateGeometryMainService.create(. engineState);

       let vertices = [|-1.0, 0., 0., 0.,1.,0., 1.,0.,0.|];
       let normals = [|-1.0, 0., 0., 0.,1.,0., 1.,0.,0.|];
       let texCoords = [|-1.0, 0., 0.,1.,1.,0.|];
       let indices = [|2,1,0|];

       let engineState =
         engineState
         |> VerticesGeometryMainService.setVerticesByTypeArray(
              geometry,
              Float32Array.make(vertices),
            )
         |> TexCoordsGeometryMainService.setTexCoordsByTypeArray(
              geometry,
              Float32Array.make(texCoords),
            )
         |> NormalsGeometryMainService.setNormalsByTypeArray(
              geometry,
              Float32Array.make(normals),
            )
         |> IndicesGeometryMainService.setIndicesByUint16Array(
              geometry,
              Uint16Array.make(indices),
            ); */
    /* (engineState, geometry); */
    /* CreateDefaultGeometryGeometryMainService.create(
         (vertices, texCoords, normals, indices),
         engineState,
       ); */
  );

let createSphereGeometry = GeometryAPI.createSphereGeometry;

let getGeometryVertices = GeometryAPI.getGeometryVertices;

let setGeometryVertices = GeometryAPI.setGeometryVertices;

let getGeometryNormals = GeometryAPI.getGeometryNormals;

let setGeometryNormals = GeometryAPI.setGeometryNormals;

let getGeometryTexCoords = GeometryAPI.getGeometryTexCoords;

let setGeometryTexCoords = GeometryAPI.setGeometryTexCoords;

let getGeometryIndices = GeometryAPI.getGeometryIndices;

let setGeometryIndices = GeometryAPI.setGeometryIndices;

let getGeometryIndices32 = GeometryAPI.getGeometryIndices32;

let setGeometryIndices32 = GeometryAPI.setGeometryIndices32;

let hasGeometryTexCoords = (geometry, engineState) =>
  getGeometryTexCoords(geometry, engineState) |> Float32Array.length > 0;

/* let getAllGeometrys = GeometryAPI.getAllGeometrys; */

let unsafeGetGeometryGameObjects = Wonderjs.GeometryAPI.unsafeGetGeometryGameObjects;

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
    |> setGeometryIndices(geometry, Uint16Array.make(indices));

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

let hasIndices = indices => Js.Typed_array.Uint16Array.length(indices) > 0;

let hasIndices32 = indices32 =>
  Js.Typed_array.Uint32Array.length(indices32) > 0;