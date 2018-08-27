open Wonderjs;

open RenderGroupType;

open Js.Typed_array;

let create = Wonderjs.GeometryAPI.createGeometry;

let getGeometryName = Wonderjs.NameGeometryMainService.getName;

let unsafeGetGeometryName = Wonderjs.GeometryAPI.unsafeGetGeometryName;

let getDefaultGeometryNameIfNotExistName = (geometry, state) =>
  switch (state |> getGeometryName(geometry)) {
  | None => "New Geometry"
  | Some(geometryName) => geometryName
  };

let setGeometryName = Wonderjs.GeometryAPI.setGeometryName;

let createCubeGeometry = Wonderjs.GeometryAPI.createBoxGeometry;

let createSphereGeometry = Wonderjs.GeometryAPI.createSphereGeometry;

let getGeometryVertices = Wonderjs.GeometryAPI.getGeometryVertices;

let setGeometryVertices = Wonderjs.GeometryAPI.setGeometryVertices;

let getGeometryIndices = Wonderjs.GeometryAPI.getGeometryIndices;

let setGeometryIndices = Wonderjs.GeometryAPI.setGeometryIndices;

let getAllUniqueGeometrys  = (gameObject, engineState) => {

  let rec _iterateGameObjectArr = (gameObjectArr, resultArr,engineState) => {
    
    gameObjectArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
      (. resultArr, gameObject ) => {
        let resultArr = 
          engineState 
          |> GameObjectComponentEngineService.hasGeometryComponent(gameObject) ? 
        resultArr
        |> ArrayService.push(
          engineState 
          |> GameObjectComponentEngineService.unsafeGetGeometryComponent(gameObject)
        ) : resultArr;

        _iterateGameObjectArr(
          engineState 
          |> GameObjectUtils.getChildren(gameObject),
          resultArr,
          engineState,
        );

      },
      resultArr
    )

  };

  _iterateGameObjectArr([|gameObject|],[||], engineState)
  |> ArrayService.removeDuplicateItems(((. id) => id |> string_of_int ))

};

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
      Wonderjs.DrawModeType.Lines |> Wonderjs.DrawModeType.drawModeToUint8,
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