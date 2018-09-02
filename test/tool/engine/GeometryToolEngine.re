let createGameObjectAndSetPointData = (~state, ~hasTexCoords=true, ()) => {
  open Js.Typed_array;
  let (state, geometry) = GeometryEngineService.create(state);
  let (state, gameObject) = GameObjectEngineService.create(state);

  let state =
    state
    |> GameObjectComponentEngineService.addGeometryComponent(
         gameObject,
         geometry,
       );
  let vertices1 = Float32Array.make([|10.|]);
  let texCoords1 = Float32Array.make([|0.5|]);
  let normals1 = Float32Array.make([|1.|]);
  let indices1 = Uint16Array.make([|2|]);
  let state =
    state
    |> GeometryEngineService.setGeometryVertices(geometry, vertices1)
    |> GeometryEngineService.setGeometryNormals(geometry, normals1)
    |> GeometryEngineService.setGeometryIndices(geometry, indices1);

  let state =
    hasTexCoords ?
      state
      |> GeometryEngineService.setGeometryTexCoords(geometry, texCoords1) :
      state;

  let name = "geometryNoTexCoord";

  let state = state |> GeometryEngineService.setGeometryName(geometry, name);

  (
    state,
    gameObject,
    geometry,
    (vertices1, texCoords1, normals1, indices1),
    name,
  );
};