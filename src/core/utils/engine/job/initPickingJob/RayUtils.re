open InitPickingJobType;

let createPerspectiveCameraRay =
    ({x, y}, {cameraToWorldMatrix, projectionMatrix}) => {
  let origin =
    cameraToWorldMatrix |> Wonderjs.Matrix4Service.getTranslationTuple;

  {
    origin,
    direction:
      Vector3Service.unproject(
        (x, y, 0.5),
        cameraToWorldMatrix,
        projectionMatrix,
      )
      |> Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, _, origin)
      |> Wonderjs.Vector3Service.normalize,
  };
};

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

let isIntersectAABB = ({min, max}, {origin, direction} as ray) => {
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

    let tmax = tymin < tmax || tmax !== tmax ? tymax : tmax;

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

let isIntersectTriangle =
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

  let (isIntersect, sign, ddn) =
    if (ddn > 0.) {
      isBackfaceCulling ? (Some(false), sign, ddn) : (None, 1., ddn);
    } else if (ddn < 0.) {
      (None, (-1.), -. ddn);
    } else {
      (Some(false), sign, ddn);
    };

  switch (isIntersect) {
  | Some(isIntersect) => isIntersect
  | None =>
    let diff =
      Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, origin, va);

    let ddqxe2 =
      sign
      *. Vector3Service.dot(
           direction,
           Wonderjs.Vector3Service.cross(diff, edge2),
         );

    /* b1 < 0, no intersection */
    if (ddqxe2 < 0.) {
      false;
    } else {
      let dde1xq =
        sign
        *. Vector3Service.dot(
             direction,
             Wonderjs.Vector3Service.cross(edge1, diff),
           );

      /* b2 < 0, no intersection */
      if (dde1xq < 0.) {
        false;
      } else if
        /* b1+b2 > 1, no intersection */
        (ddqxe2 +. dde1xq > ddn) {
        false;
      } else {
        /* Line intersects triangle, check if ray does. */
        let qdn = -. sign *. Vector3Service.dot(diff, normal);

        qdn < 0. ? false : true;
      };
    };
  };
};