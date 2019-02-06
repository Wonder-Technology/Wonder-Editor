let setFromAxisAngle = (angle, axis) => {
  let (axisX, axisY, axisZ) = Wonderjs.Vector3Service.normalize(axis);

  let angle = angle *. 0.5 *. AngleService.getDegToRad();

  let sa = Js.Math.sin(angle);
  let ca = Js.Math.cos(angle);

  (sa *. axisX, sa *. axisY, sa *. axisZ, ca);
};

let multiplyVector3 = ((x, y, z), (qx, qy, qz, qw)) => {
  /* calculate quat * vector */
  let ix = qw *. x +. qy *. z -. qz *. y;
  let iy = qw *. y +. qz *. x -. qx *. z;
  let iz = qw *. z +. qx *. y -. qy *. x;
  let iw = -. qx *. x -. qy *. y -. qz *. z;

  /* calculate result *. inverse quat */
  (
    ix *. qw +. iw *. (-. qx) +. iy *. (-. qz) -. iz *. (-. qy),
    iy *. qw +. iw *. (-. qy) +. iz *. (-. qx) -. ix *. (-. qz),
    iz *. qw +. iw *. (-. qz) +. ix *. (-. qy) -. iy *. (-. qx),
  );
};