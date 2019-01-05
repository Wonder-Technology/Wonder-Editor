let unproject = (vec3, cameraToWorldMatrix, projectionMatrix) =>
  Wonderjs.Matrix4Service.multiply(
    cameraToWorldMatrix,
    Wonderjs.Matrix4Service.invert(
      projectionMatrix,
      Wonderjs.Matrix4Service.createIdentityMatrix4(),
    ),
    Wonderjs.Matrix4Service.createIdentityMatrix4(),
  )
  |> Wonderjs.Vector3Service.transformMat4Tuple(vec3);

let multiplyScalar = ((x, y, z), scalar) => (
  x *. scalar,
  y *. scalar,
  z *. scalar,
);

let fromBufferAttribute = (vertices, index) => {
  let vIndex = index * 3;

  (
    Js.Typed_array.Float32Array.unsafe_get(vertices, vIndex),
    Js.Typed_array.Float32Array.unsafe_get(vertices, vIndex + 1),
    Js.Typed_array.Float32Array.unsafe_get(vertices, vIndex + 2),
  );
};

let distanceToSquared = ((x, y, z), (vx, vy, vz)) => {
  let dx = x -. vx;
  let dy = y -. vy;
  let dz = z -. vz;

  dx *. dx +. dy *. dy +. dz *. dz;
};

let distanceTo = (vec, v) => Js.Math.sqrt(distanceToSquared(vec, v));

let dot = ((x, y, z), (vx, vy, vz)) => x *. vx +. y *. vy +. z *. vz;

let min = ((x, y, z), (vx, vy, vz)) => (
  x > vx ? vx : x,
  y > vy ? vy : y,
  z > vz ? vz : z,
);

let max = ((x, y, z), (vx, vy, vz)) => (
  x < vx ? vx : x,
  y < vy ? vy : y,
  z < vz ? vz : z,
);

let length = ((x, y, z)) => Js.Math.sqrt(x *. x +. y *. y +. z *. z);