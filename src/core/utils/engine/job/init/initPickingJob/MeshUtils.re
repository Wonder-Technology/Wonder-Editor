let _forEachIndices =
    ((geometry, engineState), indices, indicesCount, checkIntersectFunc) => {
  let index = ref(0);
  let checkIntersectData = ref(None);

  while (checkIntersectData^ |> Js.Option.isNone && index^ < indicesCount) {
    checkIntersectData :=
      checkIntersectFunc(
        AbstractIndicesService.unsafeGetIndex(index^, indices),
        AbstractIndicesService.unsafeGetIndex(index^ + 1, indices),
        AbstractIndicesService.unsafeGetIndex(index^ + 2, indices),
      );

    index := index^ + 3;
  };

  checkIntersectData^;
};

let _checkIntersect =
    (
      cullType,
      (rayCasterNear, rayCasterFar),
      ({origin}: InitPickingJobType.ray) as ray,
      va,
      vb,
      vc,
    ) =>
  RayUtils.checkIntersectTriangle(cullType, va, vb, vc, ray);

let checkIntersectMesh =
    (
      (geometry, engineState),
      localToWorldMatrix,
      cullType,
      (vertices, indices16, indices32, indicesCount),
      ({origin, direction}: InitPickingJobType.ray) as ray,
    ) => {
  let inverseMatrix =
    Wonderjs.Matrix4Service.invert(
      localToWorldMatrix,
      Wonderjs.Matrix4Service.createIdentityMatrix4(),
    );

  let ray = RayUtils.applyMatrix4(ray, inverseMatrix);

  _forEachIndices(
    (geometry, engineState),
    GeometryEngineService.hasIndices16(geometry, engineState) ?
      indices16 |> Wonderjs.AbstractIndicesType.indices16ToIndices :
      indices32 |> Wonderjs.AbstractIndicesType.indices32ToIndices,
    indicesCount,
    (index1, index2, index3) =>
    _checkIntersect(
      cullType,
      (0., infinity),
      ray,
      Vector3Service.fromBufferAttribute(vertices, index1),
      Vector3Service.fromBufferAttribute(vertices, index2),
      Vector3Service.fromBufferAttribute(vertices, index3),
    )
  );
};