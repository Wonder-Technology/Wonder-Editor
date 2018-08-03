open Js.Typed_array;

let create = Wonderjs.CustomGeometryAPI.createCustomGeometry;

let getCustomGeometryVertices = Wonderjs.CustomGeometryAPI.getCustomGeometryVertices;

let setCustomGeometryVertices = Wonderjs.CustomGeometryAPI.setCustomGeometryVertices;

let getCustomGeometryIndices = Wonderjs.CustomGeometryAPI.getCustomGeometryIndices;

let setCustomGeometryIndices = Wonderjs.CustomGeometryAPI.setCustomGeometryIndices;

let rec _generateGridPlanePoints =
        ((size, step, y), (num, index), vertices, indices) =>
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
    );

let createGridPlaneGameObject =
    ((size, step, y), color, (editorState, engineState)) => {
  let (editorState, (engineState, gameObject)) =
    GameObjectLogicService.createGameObject((editorState, engineState));

  let (engineState, customGeometry) = create(engineState);

  let (vertices, indices) =
    _generateGridPlanePoints((size, step, y), (-.size, 0), [||], [||]);

  let engineState =
    engineState
    |> setCustomGeometryVertices(
         customGeometry,
         Float32Array.make(vertices),
       )
    |> setCustomGeometryIndices(customGeometry, Uint16Array.make(indices));

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("gridPlane", gameObject);

  let (engineState, material) =
    BasicMaterialEngineService.create(engineState);
  let engineState =
    BasicMaterialEngineService.setColor(color, material, engineState);

  let (engineState, meshRenderer) =
    MeshRendererEngineService.create(engineState);

  let engineState =
    MeshRendererEngineService.setDrawMode(
      meshRenderer,
      Wonderjs.DrawModeType.Lines |> Wonderjs.DrawModeType.drawModeToUint8,
      engineState,
    );

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addBasicMaterialComponent(gameObject, material)
    |> GameObjectLogicService.addCustomGeometryComponent(
         gameObject,
         customGeometry,
       )
    |> GameObjectLogicService.addMeshRendererComponent(
         gameObject,
         meshRenderer,
       );

  (editorState, engineState, gameObject);
};