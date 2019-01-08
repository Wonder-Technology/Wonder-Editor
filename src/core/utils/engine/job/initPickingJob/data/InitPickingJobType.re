type cull =
  | Back
  | Front
  | None
  | Both;

type mouseData = {
  x: float,
  y: float,
};

type perspectiveCameraData = {
  cameraToWorldMatrix: Js.Typed_array.Float32Array.t,
  projectionMatrix: Js.Typed_array.Float32Array.t,
};

type floatVec3 = (float, float, float);

type ray = {
  origin: floatVec3,
  direction: floatVec3,
};

external userDataToPointEvent : EventType.userData => EventType.pointEvent =
  "%identity";