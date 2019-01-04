open InitPickingJobType;

let _forEachIndices = (indices16, indices32, indicesCount, isIntersectFunc) => {
  let index = ref(0);
  let isIntersect = ref(false);

  let indices =
    GeometryEngineService.hasIndices(indices16) ?
      indices16 : indices32 |> Obj.magic;

  let unsafeGetIndexFunc =
    GeometryEngineService.hasIndices(indices16) ?
      Js.Typed_array.Uint16Array.unsafe_get :
      Js.Typed_array.Uint32Array.unsafe_get |> Obj.magic;

  while (! isIntersect^ && index^ < indicesCount) {
    isIntersect :=
      isIntersectFunc(
        unsafeGetIndexFunc(indices, index^),
        unsafeGetIndexFunc(indices, index^ + 1),
        unsafeGetIndexFunc(indices, index^ + 2),
      );

    index := index^ + 3;
  };

  isIntersect^;
};

let _isIntersect =
    (cullType, (rayCasterNear, rayCasterFar), {origin} as ray, va, vb, vc) =>
  RayUtils.isIntersectTriangle(cullType, va, vb, vc, ray);

let isIntersectMesh =
    (
      localToWorldMatrix,
      cullType,
      (vertices, indices16, indices32, indicesCount),
      {origin, direction} as ray,
    ) => {
  let inverseMatrix =
    Wonderjs.Matrix4Service.invert(
      localToWorldMatrix,
      Wonderjs.Matrix4Service.createIdentityMatrix4(),
    );

  let ray = RayUtils.applyMatrix4(ray, inverseMatrix);

  _forEachIndices(
    indices16, indices32, indicesCount, (index1, index2, index3) =>
    _isIntersect(
      cullType,
      (0., infinity),
      ray,
      Vector3Service.fromBufferAttribute(vertices, index1),
      Vector3Service.fromBufferAttribute(vertices, index2),
      Vector3Service.fromBufferAttribute(vertices, index3),
    )
  );
};