


function multiplyVector3(param, param$1) {
  var qw = param$1[3];
  var qz = param$1[2];
  var qy = param$1[1];
  var qx = param$1[0];
  var z = param[2];
  var y = param[1];
  var x = param[0];
  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z;
  return /* tuple */[
          ix * qw + iw * -qx + iy * -qz - iz * -qy,
          iy * qw + iw * -qy + iz * -qx - ix * -qz,
          iz * qw + iw * -qz + ix * -qy - iy * -qx
        ];
}

export {
  multiplyVector3 ,
  
}
/* No side effect */
