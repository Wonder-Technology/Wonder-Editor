open ShapeType;

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
let _forEachVerticesWithMinAndMax =
    (vertices, verticesCount, (min, max), func) => {
  let index = ref(0);
  let minRef = ref(min);
  let maxRef = ref(max);

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
    GeometryEngineService.unsafeGetGeometryVertices(geometry, engineState);

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

let setFromPoints = vertices =>
  _forEachVertices(
    vertices,
    Js.Typed_array.Float32Array.length(vertices),
    (vertex, min, max) =>
    _expandByVertex(min, max, vertex)
  );

let setFromAllPointsAndLocalToWolrdMatrices =
    (
      allPointsAndLocalToWolrdMatrices:
        array(
          (Js.Typed_array.Float32Array.t, Js.Typed_array.Float32Array.t),
        ),
    ) =>
  allPointsAndLocalToWolrdMatrices
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. {min, max}, (vertices, localToWorldMatrixTypeArray)) =>
         _forEachVerticesWithMinAndMax(
           vertices,
           Js.Typed_array.Float32Array.length(vertices),
           (min, max),
           (vertex, min, max) =>
           Wonderjs.Vector3Service.transformMat4Tuple(
             vertex,
             localToWorldMatrixTypeArray,
           )
           |> _expandByVertex(min, max)
         ),
       {
         min: (infinity, infinity, infinity),
         max: (neg_infinity, neg_infinity, neg_infinity),
       },
     );

let getCenter = ({min, max}) =>
  Wonderjs.Vector3Service.add(Wonderjs.Vector3Type.Float, max, min)
  |> Wonderjs.Vector3Service.scale(Wonderjs.Vector3Type.Float, 0.5);

let calcRadiusOfAABB = ({min, max}, center) =>
  Vector3Service.distanceTo(max, center);

let getHalfExtends = ({min, max}) =>
  Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, max, min)
  |> Wonderjs.Vector3Service.scale(Wonderjs.Vector3Type.Float, 0.5);

let expandByScalar = (scalar, {min, max}) => {
  min: Vector3Service.addScalar(min, -. scalar),
  max: Vector3Service.addScalar(max, scalar),
};