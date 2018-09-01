open Wonderjs;

open RenderGroupType;

open Js.Typed_array;

let create = GeometryAPI.createGeometry;

let getGeometryName = NameGeometryMainService.getName;

let unsafeGetGeometryName = GeometryAPI.unsafeGetGeometryName;

let getDefaultGeometryNameIfNotExistName = (geometry, state) =>
  switch (state |> getGeometryName(geometry)) {
  | None => "New Geometry"
  | Some(geometryName) => geometryName
  };

let setGeometryName = GeometryAPI.setGeometryName;

let createCubeGeometry = GeometryAPI.createBoxGeometry;

let createSphereGeometry = GeometryAPI.createSphereGeometry;

let getGeometryVertices = GeometryAPI.getGeometryVertices;

let setGeometryVertices = GeometryAPI.setGeometryVertices;

let getGeometryNormals = GeometryAPI.getGeometryNormals;

let setGeometryNormals = GeometryAPI.setGeometryNormals;

let getGeometryTexCoords = GeometryAPI.getGeometryTexCoords;

let setGeometryTexCoords = GeometryAPI.setGeometryTexCoords;

let getGeometryIndices = GeometryAPI.getGeometryIndices;

let setGeometryIndices = GeometryAPI.setGeometryIndices;

let hasGeometryTexCoords = (geometry, engineState) =>
  getGeometryTexCoords(geometry, engineState) |> Float32Array.length > 0;

let getAllGeometrys = GeometryAPI.getAllGeometrys;
let unsafeGetGeometryGameObjects = Wonderjs.GeometryAPI.unsafeGetGeometryGameObjects;

let getAllUniqueGeometrys = (gameObject, engineState) => {
  let rec _iterateGameObjectArr = (gameObjectArr, resultArr, engineState) =>
    gameObjectArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. resultArr, gameObject) => {
           let resultArr =
             engineState
             |> GameObjectComponentEngineService.hasGeometryComponent(
                  gameObject,
                ) ?
               resultArr
               |> ArrayService.push(
                    engineState
                    |> GameObjectComponentEngineService.unsafeGetGeometryComponent(
                         gameObject,
                       ),
                  ) :
               resultArr;

           _iterateGameObjectArr(
             engineState |> GameObjectUtils.getChildren(gameObject),
             resultArr,
             engineState,
           );
         },
         resultArr,
       );

  _iterateGameObjectArr([|gameObject|], [||], engineState)
  |> ArrayService.removeDuplicateItems((. id) => id |> string_of_int);
};

let replaceAllGameObjectGeometryToDefaultGeometry =
    (gameObject, targetGeometry, engineState) =>
  engineState
  |> getAllUniqueGeometrys(gameObject)
  |> Js.Array.map(geometryIndex =>
       engineState |> unsafeGetGeometryGameObjects(geometryIndex)
     )
  |> WonderCommonlib.ArrayService.flatten
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, gameObject) =>
         state
         |> GameObjectComponentEngineService.removeGeometryComponent(
              gameObject,
              state
              |> GameObjectComponentEngineService.unsafeGetGeometryComponent(
                   gameObject,
                 ),
            )
         |> GameObjectComponentEngineService.addGeometryComponent(
              gameObject,
              targetGeometry,
            ),
       engineState,
     );

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
    GameObjectLogicService.createGameObjectForEditEngineState(engineState);

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
    |> GameObjectLogicService.addGeometryForEditEngineState(
         gameObject,
         geometry,
       )
    |> GameObjectLogicService.addRenderGroupForEditEngineState(
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