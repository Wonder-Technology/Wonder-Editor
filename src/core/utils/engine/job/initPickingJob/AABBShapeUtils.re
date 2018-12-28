open InitPickingJobType;

let _forEachVertices = (vertices, verticesCount, func) => {
  let index = ref(0);
  let minRef = ref((infinity, infinity, infinity));
  let maxRef = ref((neg_infinity, neg_infinity, neg_infinity));

  while (index^ < verticesCount) {
    let (min, max) =
      func(
        (
          Js.Typed_array.Float32Array.unsafe_get(vertices, index^),
          Js.Typed_array.Float32Array.unsafe_get(vertices, index^ + 1),
          Js.Typed_array.Float32Array.unsafe_get(vertices, index^ + 2),
        ),
        minRef^,
        maxRef^,
      );

    minRef := min;
    maxRef := max;
    index := index^ + 3;
  };

  {min: minRef^, max: maxRef^};
};

let _expandByVertex = (min, max, vertex) => (
  Vector3Service.min(min, vertex),
  Vector3Service.max(max, vertex),
);

let setFromGameObject = (gameObject, engineState) => {
  let localToWorldMatrixTypeArray =
    TransformEngineService.getLocalToWorldMatrixTypeArray(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        gameObject,
        engineState,
      ),
      engineState,
    );

  let geometry =
    GameObjectComponentEngineService.unsafeGetGeometryComponent(
      gameObject,
      engineState,
    );

  let vertices =
    GeometryEngineService.getGeometryVertices(geometry, engineState);

  _forEachVertices(
    vertices,
    Js.Typed_array.Float32Array.length(vertices),
    (vertex, min, max) =>
    Wonderjs.Vector3Service.transformMat4Tuple(
      vertex,
      localToWorldMatrixTypeArray,
    )
    |> _expandByVertex(min, max)
  );
};