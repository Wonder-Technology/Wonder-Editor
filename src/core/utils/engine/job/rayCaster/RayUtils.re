open ShapeType;

let _at = (t, {origin, direction}: RayType.ray) =>
  Vector3Service.multiplyScalar(direction, t)
  |> Wonderjs.Vector3Service.add(Wonderjs.Vector3Type.Float, _, origin);

let _createPerspectiveCameraRay =
    (
      {x, y}: CoordinateType.mouseData,
      {cameraToWorldMatrix, projectionMatrix}: RayType.perspectiveCameraData,
    )
    : RayType.ray => {
  let origin =
    cameraToWorldMatrix |> Wonderjs.Matrix4Service.getTranslationTuple;

  {
    origin,
    direction:
      Vector3Service.unproject(
        (x, y, (-1.0)),
        cameraToWorldMatrix,
        projectionMatrix,
      )
      |> Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, _, origin)
      |> Wonderjs.Vector3Service.normalize,
  };
};

let _getPerspectiveCameraData =
    (cameraGameObject, (editorState, engineState))
    : RayType.perspectiveCameraData => {
  cameraToWorldMatrix:
    BasicCameraViewEngineService.getBasicCameraViewWorldToCameraMatrix(
      GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
        cameraGameObject,
        engineState,
      ),
      engineState,
    )
    |> Wonderjs.Matrix4Service.invert(
         _,
         Wonderjs.Matrix4Service.createIdentityMatrix4(),
       ),
  projectionMatrix:
    PerspectiveCameraProjectionEngineService.unsafeGetPerspectiveCameraProjectionPMatrix(
      GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent(
        cameraGameObject,
        engineState,
      ),
      engineState,
    ),
};

let createPerspectiveCameraRayFromEvent =
    (
      {userData}: EventType.customEvent,
      cameraGameObject,
      (editorState, engineState),
    ) => {
  let {locationInView}: EventType.pointEvent =
    EventType.userDataToPointEvent(userData |> OptionService.unsafeGet);

  let (locationInViewX, locationInViewY) = locationInView;

  _createPerspectiveCameraRay(
    CoordinateUtils.convertMouselocationInViewToNDC(
      locationInView,
      CoordinateUtils.getSceneViewSize(editorState),
    ),
    _getPerspectiveCameraData(cameraGameObject, (editorState, engineState)),
  );
};

let applyMatrix4 = ({origin, direction}: RayType.ray, mat4) : RayType.ray => {
  let direction =
    Wonderjs.Vector3Service.add(Wonderjs.Vector3Type.Float, direction, origin)
    |> Wonderjs.Vector3Service.transformMat4Tuple(_, mat4);

  let origin = Wonderjs.Vector3Service.transformMat4Tuple(origin, mat4);

  {
    origin,
    direction:
      Wonderjs.Vector3Service.sub(
        Wonderjs.Vector3Type.Float,
        direction,
        origin,
      )
      |> Wonderjs.Vector3Service.normalize,
  };
};

let distanceToPlane =
    ({normal, constant} as plane, ({origin, direction}: RayType.ray) as ray) => {
  let denominator = Vector3Service.dot(normal, direction);

  denominator === 0. ?
    PlaneShapeUtils.distanceToPoint(origin, plane) === 0. ? Some(0.) : None :
    {
      let t =
        -. (Vector3Service.dot(origin, normal) +. constant) /. denominator;

      /* Return if the ray never intersects the plane */

      t >= 0. ? Some(t) : None;
    };
};

let checkIntersectPlane =
    ({normal, constant} as plane, ({origin, direction}: RayType.ray) as ray) =>
  switch (distanceToPlane(plane, ray)) {
  | None => None
  | Some(t) => Some(_at(t, ray))
  };

let isIntersectAABB =
    ({min, max}, ({origin, direction}: RayType.ray) as ray) => {
  let (originX, originY, originZ) = origin;
  let (directionX, directionY, directionZ) = direction;
  let (minX, minY, minZ) = min;
  let (maxX, maxY, maxZ) = max;

  let invdirx = 1. /. directionX;
  let invdiry = 1. /. directionY;
  let invdirz = 1. /. directionZ;

  let (tmin, tmax) =
    if (invdirx >= 0.) {
      ((minX -. originX) *. invdirx, (maxX -. originX) *. invdirx);
    } else {
      ((maxX -. originX) *. invdirx, (minX -. originX) *. invdirx);
    };

  let (tymin, tymax) =
    if (invdiry >= 0.) {
      ((minY -. originY) *. invdiry, (maxY -. originY) *. invdiry);
    } else {
      ((maxY -. originY) *. invdiry, (minY -. originY) *. invdiry);
    };

  if (tmin > tymax || tymin > tmax) {
    false;
  } else {
    /* These lines also handle the case where tmin or tmax is NaN
       (result of 0 * Infinity). x !== x returns true if x is NaN */

    let tmin = tymin > tmin || tmin !== tmin ? tymin : tmin;

    let tmax = tymax < tmax || tmax !== tmax ? tymax : tmax;

    let (tzmin, tzmax) =
      if (invdirz >= 0.) {
        ((minZ -. originZ) *. invdirz, (maxZ -. originZ) *. invdirz);
      } else {
        ((maxZ -. originZ) *. invdirz, (minZ -. originZ) *. invdirz);
      };

    if (tmin > tzmax || tzmin > tmax) {
      false;
    } else {
      let tmin = tzmin > tmin || tmin !== tmin ? tzmin : tmin;

      let tmax = tzmax < tmax || tmax !== tmax ? tzmax : tmax;

      if (tmax < 0.) {
        false;
      } else {
        true;
            /* _at(ray, tmin >= 0. ? tmin : tmax) |. Some; */
      };
    };
  };
};

let isIntersectSphere =
    ({center, radius}, ({origin, direction}: RayType.ray) as ray) => {
  let v1 =
    Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, origin, center);

  let b = Vector3Service.dot(direction, v1);

  let c = Vector3Service.dot(v1, v1) -. radius *. radius;

  let v2 = b *. b -. c;

  v2 < 0. ?
    false :
    {
      let sqrtV2 = Js.Math.sqrt(v2);

      let t0 = -. b +. sqrtV2;
      let t1 = -. b -. sqrtV2;

      t0 < 0. && t1 < 0. ? false : true;
    };
};

/*

 let _getCenter = (min, max) =>
      Wonderjs.Vector3Service.add(Wonderjs.Vector3Type.Float, max, min)
      |> Wonderjs.Vector3Service.scale(Wonderjs.Vector3Type.Float, 0.5);

    let _getHalfExtends = (min, max) =>
      Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, max, min)
      |> Wonderjs.Vector3Service.scale(Wonderjs.Vector3Type.Float, 0.5);

    let isIntersectAABB = ({min, max}, {origin, direction} as ray) => {
      let (originX, originY, originZ) = origin;
      let (directionX, directionY, directionZ) = direction;
      /* let (minX, minY, minZ) = min;
         let (maxX, maxY, maxZ) = max; */

      let (centerX, centerY, centerZ) as center = _getCenter(min, max);
      let (halfExtendsX, halfExtendsY, halfExtendsZ) as halfExtends =
        _getHalfExtends(min, max);




      let (diffX, diffY, diffZ) as diff =
        Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, origin, center);

      let (absDiffX, absDiffY, absDiffZ) as absDiff = (
        Js.Math.abs_float(diffX),
        Js.Math.abs_float(diffY),
        Js.Math.abs_float(diffZ),
      );

      let (prodX, prodY, prodZ) as prod =
        Wonderjs.Vector3Service.multiply(
          Wonderjs.Vector3Type.Float,
          diff,
          direction,
        );


      if (absDiffX > halfExtendsX
          && prodX >= 0.
          || absDiffY > halfExtendsY
          && prodY >= 0.
          || absDiffZ > halfExtendsZ
          && prodZ >= 0.) {
        false;
      } else {
        let (absDirX, absDirY, absDirZ) as absDir = (
          Js.Math.abs_float(directionX),
          Js.Math.abs_float(directionY),
          Js.Math.abs_float(directionZ),
        );

        let (crossX, crossY, crossZ) =
          Wonderjs.Vector3Service.cross(direction, diff);

        let (crossX, crossY, crossZ) as cross = (
          Js.Math.abs_float(crossX),
          Js.Math.abs_float(crossY),
          Js.Math.abs_float(crossZ),
        );

        if (crossX > halfExtendsY
            *. absDirZ
            +. halfExtendsZ
            *. absDirY
            || crossY > halfExtendsX
            *. absDirZ
            +. halfExtendsZ
            *. absDirX
            || crossZ > halfExtendsX
            *. absDirY
            +. halfExtendsY
            *. absDirX) {
          false;
        } else {
          true;
        };
      };
    }; */

let _checkIntersectTriangleForFrontCull =
    (
      (det, edge1, edge2, pvec),
      v0,
      v1,
      v2,
      {origin, direction}: RayType.ray,
    ) => {
  let inv_det = 1. /. det;

  let tvec =
    Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, origin, v0);

  let u = Vector3Service.dot(tvec, pvec) *. inv_det;

  u < 0. || u > 1. ?
    None :
    {
      let qvec = Wonderjs.Vector3Service.cross(tvec, edge1);

      let v = Vector3Service.dot(direction, qvec) *. inv_det;

      v < 0. || u +. v > 1. ?
        None :
        {
          let t = Vector3Service.dot(edge2, qvec) *. inv_det;

          Some(
            Wonderjs.Vector3Service.add(
              Wonderjs.Vector3Type.Float,
              origin,
              Vector3Service.multiplyScalar(direction, t),
            ),
          );
          /* var t = dot(edge2, qvec) *. inv_det;
             out[0] = origin[0] + t * direction[0];
             out[1] = origin[1] + t * direction[1];
             out[2] = origin[2] + t * direction[2];
             return out; */
        };
    };
};

let checkIntersectTriangle =
    (
      cullType: RayType.cull,
      va,
      vb,
      vc,
      ({origin, direction}: RayType.ray) as ray,
    ) =>
  switch (cullType) {
  | Both => None
  | Front =>
    let epsilon = 0.000001;

    let edge1 =
      Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, vb, va);

    let edge2 =
      Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, vc, va);

    let pvec = Wonderjs.Vector3Service.cross(direction, edge2);

    let det = Vector3Service.dot(edge1, pvec);

    det > epsilon ?
      None :
      _checkIntersectTriangleForFrontCull(
        (det, edge1, edge2, pvec),
        va,
        vb,
        vc,
        {origin, direction}: RayType.ray,
      );
  | _ =>
    let edge1 =
      Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, vb, va);

    let edge2 =
      Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, vc, va);

    let normal = Wonderjs.Vector3Service.cross(edge1, edge2);

    /*
          //from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h

     Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
        E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
          |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
          |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
             |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N) */

    let ddn = Vector3Service.dot(direction, normal);
    let sign = 0.;

    let isBackfaceCulling =
      switch (cullType) {
      | Back => true
      | None => false
      };

    let (isEndCheck, sign, ddn) =
      if (ddn > 0.) {
        isBackfaceCulling ? (Some(false), sign, ddn) : (None, 1., ddn);
      } else if (ddn < 0.) {
        (None, (-1.), -. ddn);
      } else {
        (Some(false), sign, ddn);
      };

    switch (isEndCheck) {
    | Some(isIntersect) => None
    | None =>
      let diff =
        Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, origin, va);

      let edge2 = Wonderjs.Vector3Service.cross(diff, edge2);

      let ddqxe2 =
        sign
        *. Vector3Service.dot(
             direction,
             /* Wonderjs.Vector3Service.cross(diff, edge2), */
             edge2,
           );

      /* b1 < 0, no intersection */
      if (ddqxe2 < 0.) {
        None;
      } else {
        let dde1xq =
          sign
          *. Vector3Service.dot(
               direction,
               Wonderjs.Vector3Service.cross(edge1, diff),
             );

        /* b2 < 0, no intersection */
        if (dde1xq < 0.) {
          None;
        } else if
          /* b1+b2 > 1, no intersection */
          (ddqxe2 +. dde1xq > ddn) {
          None;
        } else {
          /* Line intersects triangle, check if ray does. */
          let qdn = -. sign *. Vector3Service.dot(diff, normal);

          qdn < 0. ? None : Some(_at(qdn /. ddn, ray));
        };
      };
    };
  };

/*
 need fix bug: when ray->origin is in the model, sometimes the intersected point is the opposite point of the two intersected points!


 let _checkIntersectTriangleForFrontAndNoneCull =_checkIntersectTriangleForFrontCull;

 let checkIntersectTriangle =
      (
        cullType: RayType.cull,
        v0,
        v1,
        v2,
        {origin, direction}: RayType.ray,
      ) =>
    switch (cullType) {
    | Both => None
    | _ =>
      let epsilon = 0.000001;

      let edge1 =
        Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, v1, v0);

      let edge2 =
        Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, v2, v0);

      let pvec = Wonderjs.Vector3Service.cross(direction, edge2);

      let det = Vector3Service.dot(edge1, pvec);

      switch (cullType) {
      | Back =>
        det < epsilon ?
          None :
          {
            let tvec =
              Wonderjs.Vector3Service.sub(
                Wonderjs.Vector3Type.Float,
                origin,
                v0,
              );

            let u = Vector3Service.dot(tvec, pvec);

            u < 0. || u > det ?
              None :
              {
                let qvec = Wonderjs.Vector3Service.cross(tvec, edge1);

                let v = Vector3Service.dot(direction, qvec);

                v < 0. || u +. v > det ?
                  None :
                  {
                    let t = Vector3Service.dot(edge2, qvec) /. det;

                    /* var t = dot(edge2, qvec) / det;
                       out[0] = origin[0] + t * direction[0];
                       out[1] = origin[1] + t * direction[1];
                       out[2] = origin[2] + t * direction[2];
                       return out; */
                    Some(
                      Wonderjs.Vector3Service.add(
                        Wonderjs.Vector3Type.Float,
                        origin,
                        Vector3Service.multiplyScalar(direction, t),
                      ),
                    );
                  };
              };
          }
      | Front =>
        det > epsilon ?
          None :
          _checkIntersectTriangleForFrontAndNoneCull(
            (det, edge1, edge2, pvec),
            v0,
            v1,
            v2,
            {origin, direction},
          )
      | None =>
        det > -. epsilon && det < epsilon ?
          None :
          _checkIntersectTriangleForFrontAndNoneCull(
            (det, edge1, edge2, pvec),
            v0,
            v1,
            v2,
            {origin, direction},
          )
      };
    }; */