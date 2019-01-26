open ShapeType;

let distanceToPoint = (point, {normal, constant}) =>
  Vector3Service.dot(normal, point) +. constant;

let setFromNormalAndCoplanarPoint = (normal, point) => {
  normal,
  constant: -. Vector3Service.dot(point, normal),
};

let setFromCoplanarPoints = (a, b, c) => {
  let normal =
    Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, c, b)
    |> Wonderjs.Vector3Service.cross(
         _,
         Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, a, b),
       )
    |> Wonderjs.Vector3Service.normalize;

  /* Q: should an error be thrown if normal is zero (e.g. degenerate plane)? */

  setFromNormalAndCoplanarPoint(normal, a);
};

let isPlaneEqual = (plane1, plane2) =>
  plane1.constant === plane2.constant && plane1.normal == plane2.normal;

let computeAngleBetweenVecAndPlane =
    (vec, {normal, constant} as plane) => {

    };