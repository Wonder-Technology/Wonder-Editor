open Wonderjs;

open RenderGroupType;

open Js.Typed_array;

let create = Wonderjs.GeometryAPI.createGeometry;

let createBoxGeometry = Wonderjs.GeometryAPI.createBoxGeometry;

let getGeometryVertices = Wonderjs.GeometryAPI.getGeometryVertices;

let setGeometryVertices = Wonderjs.GeometryAPI.setGeometryVertices;

let getGeometryIndices = Wonderjs.GeometryAPI.getGeometryIndices;

let setGeometryIndices = Wonderjs.GeometryAPI.setGeometryIndices;

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

let createGridPlaneGameObject =
    ((size, step, y), color, (editorState, engineState)) => {
  let (editorState, (engineState, gameObject)) =
    GameObjectLogicService.createGameObject((editorState, engineState));

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
    |> BasicMaterialEngineService.setColor(color, renderGroup.material);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addGeometryComponent(gameObject, geometry)
    |> GameObjectLogicService.addRenderGroup(
         gameObject,
         renderGroup,
         (
           GameObjectAPI.addGameObjectMeshRendererComponent,
           GameObjectAPI.addGameObjectBasicMaterialComponent,
         ),
       );

  (editorState, engineState, gameObject);
};

let getGeometryTexCoords = GeometryAPI.getGeometryTexCoords;