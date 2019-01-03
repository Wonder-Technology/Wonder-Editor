open ShapeType;

open InitPickingJobType;

let _at = (t, {origin, direction}) =>
  Vector3Service.multiplyScalar(direction, t)
  |> Wonderjs.Vector3Service.add(Wonderjs.Vector3Type.Float, _, origin);

let createPerspectiveCameraRay =
    ({x, y}, {cameraToWorldMatrix, projectionMatrix}) => {
  let origin =
    cameraToWorldMatrix |> Wonderjs.Matrix4Service.getTranslationTuple;

  /* let x = -0.09176470588235297;
     let y = -0.03664921465968596; */

  WonderLog.Log.print((x, y, cameraToWorldMatrix, projectionMatrix)) |> ignore;

  {
    origin,
    direction:
      Vector3Service.unproject(
        /* (x, y, 0.5), */
        (x, y, (-1.0)),
        cameraToWorldMatrix,
        projectionMatrix,
      )
      /* |> WonderLog.Log.print */
      |> Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, _, origin)
      |> Wonderjs.Vector3Service.normalize,
  };
  /* {
       origin: ((-1.7738624811172485), 3.446659564971924, 2.2855961322784424),
       direction: (
         0.2890584075902329,
         (-0.7739965350589404),
         (-0.5633600986209027),
       ),
     }; */
};

/* let createPerspectiveCameraRay =
       (
         (locationInViewX, locationInViewY),
         (viewWidth, viewHeight),
         (position, worldToCameraMatrix, projectionMatrix, near, far),
       ) => {
     WonderLog.Log.print((
       (locationInViewX, locationInViewY),
       (viewWidth, viewHeight),
       (position, worldToCameraMatrix, projectionMatrix, near, far),
     ))
     |> ignore;

     let from =
       PerspectiveCameraUtils.convertScreenToWorld(
         (locationInViewX, locationInViewY),
         (viewWidth, viewHeight),
         (position, worldToCameraMatrix, projectionMatrix, far),
         near,
       );
     let to_ =
       PerspectiveCameraUtils.convertScreenToWorld(
         (locationInViewX, locationInViewY),
         (viewWidth, viewHeight),
         (position, worldToCameraMatrix, projectionMatrix, far),
         far,
       );

     WonderLog.Log.print(("from, to: ", from, to_)) |> ignore;

     {
       origin: from,
       direction:
         /* Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, to_, from), */
         Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, to_, from)
         |> Wonderjs.Vector3Service.normalize,
     };
   }; */

let applyMatrix4 = ({origin, direction}, mat4) => {
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

/* let isIntersectAABB = ({min, max}, {origin, direction} as ray) => {
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
   }; */

let isIntersectSphere = ({center, radius}, {origin, direction} as ray) => {
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

        WonderLog.Log.print(("inn")) |> ignore;


        WonderLog.Log.print((min, max, center, halfExtends)) |> ignore;

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

        WonderLog.Log.print(("inter: ",

        absDiff, halfExtends, prod
        )) |> ignore;

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

let checkIntersectTriangle =
    (isBackfaceCulling, va, vb, vc, {origin, direction} as ray) => {
  let edge1 = Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, vb, va);

  let edge2 = Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, vc, va);

  let normal = Wonderjs.Vector3Service.cross(edge1, edge2);

  /* Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
     E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
       |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
       |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
          |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N) */

  let ddn = Vector3Service.dot(direction, normal);
  let sign = 0.;

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
        WonderLog.Log.print("aaaaa") |> ignore;
        /* Line intersects triangle, check if ray does. */
        let qdn = -. sign *. Vector3Service.dot(diff, normal);

        qdn < 0. ? None : Some(_at(qdn /. ddn, ray));
      };
    };
  };
};

/* let _check = [%bs.raw
     (pt, dir, tri) => {|

       function cross(out, a, b) {
         var ax = a[0], ay = a[1], az = a[2],
             bx = b[0], by = b[1], bz = b[2]

         out[0] = ay * bz - az * by
         out[1] = az * bx - ax * bz
         out[2] = ax * by - ay * bx
         return out
     }

     function dot(a, b) {
       return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
   }

   function sub(out, a, b) {
     out[0] = a[0] - b[0]
     out[1] = a[1] - b[1]
     out[2] = a[2] - b[2]
     return out
   }



     var EPSILON = 0.000001;
     var edge1 = [0,0,0];
     var edge2 = [0,0,0];
     var tvec = [0,0,0];
     var pvec = [0,0,0];
     var qvec = [0,0,0];


     var out = [];

         sub(edge1, tri[1], tri[0]);
         sub(edge2, tri[2], tri[0]);

         cross(pvec, dir, edge2);
         var det = dot(edge1, pvec);

         if (det < EPSILON) return false;
         sub(tvec, pt, tri[0]);
         var u = dot(tvec, pvec);
         if (u < 0 || u > det) return false;
         cross(qvec, tvec, edge1);
         var v = dot(dir, qvec);
         if (v < 0 || u + v > det) return false;

         var t = dot(edge2, qvec) / det;
         out[0] = pt[0] + t * dir[0];
         out[1] = pt[1] + t * dir[1];
         out[2] = pt[2] + t * dir[2];
         /* return out; */
         return true;

     |}
   ]; */