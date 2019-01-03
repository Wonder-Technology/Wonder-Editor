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
    (
      (isBackSide, isDoubleSide),
      localToWorldMatrix,
      (rayCasterNear, rayCasterFar),
      {origin} as ray,
      va,
      vb,
      vc,
    ) => {
  /* let ray = {
       origin: ((-1.7738624811172485), 3.755427862065978, (-1.7321008658612196)),
       direction: (
         0.2890584075902329,
         (-0.8859624926336089),
         0.36265093223076283,
       ),
     }; */
  /* direction: Vector3
     x: 0.2890584075902329
     y: -0.8859624926336089
     z: 0.36265093223076283
     __proto__: Object
     origin: Vector3 {x: -1.7738624811172485, y: 3.755427862065978, z: -1.7321008658612196}
     __proto__: Object */

  /* let result2 =
       RayUtils.checkIntersectTriangle(
         true,
         /* false, */
         ((-0.5), (-0.5), (-0.5)),
         ((-0.5), (-0.5), 0.5),
         ((-0.5), 0.5, 0.5),
         ray,
       );

     WonderLog.Log.print(("result2: ", result2,

     /* va,vb,vc */
     )) |> ignore; */

  let result =
    isBackSide ?
      RayUtils.checkIntersectTriangle(false, vc, vb, va, ray) :
      RayUtils.checkIntersectTriangle(! isDoubleSide, va, vb, vc, ray);

  switch (result) {
  | None => false
  | Some(point) =>
    let intersectionPointWorld =
      Wonderjs.Vector3Service.transformMat4Tuple(point, localToWorldMatrix);

    let distance = Vector3Service.distanceTo(origin, intersectionPointWorld);

    distance >= rayCasterNear && distance <= rayCasterFar;
  };

  /* let result = RayUtils._check(ray.origin, ray.direction, [|va, vb, vc|]); */

  /* result; */
};

let isIntersectMesh =
    (
      localToWorldMatrix,
      (isBackSide, isDoubleSide),
      (vertices, indices16, indices32, indicesCount),
      {origin, direction} as ray,
    ) => {
  /* let localToWorldMatrix =
     Js.Typed_array.Float32Array.make([|
       1.,
       0.,
       0.,
       0.,
       0.,
       0.5253219888177296,
       0.8509035245341184,
       0.,
       0.,
       (-0.8509035245341184),
       0.5253219888177296,
       0.,
       0.,
       0.,
       0.,
       1.,
     |]); */

  let inverseMatrix =
    Wonderjs.Matrix4Service.invert(
      localToWorldMatrix,
      Wonderjs.Matrix4Service.createIdentityMatrix4(),
    );

  let ray = RayUtils.applyMatrix4(ray, inverseMatrix);

  WonderLog.Log.print(("ray: ", ray)) |> ignore;

  _forEachIndices(
    indices16, indices32, indicesCount, (index1, index2, index3) =>{

      WonderLog.Log.print(("index: ", 
     index1, index2, index3 
      )) |> ignore;

    _isIntersect(
      (isBackSide, isDoubleSide),
      localToWorldMatrix,
      (0., infinity),
      ray,
      Vector3Service.fromBufferAttribute(vertices, index1),
      Vector3Service.fromBufferAttribute(vertices, index2),
      Vector3Service.fromBufferAttribute(vertices, index3),
    )
    }
  );
};