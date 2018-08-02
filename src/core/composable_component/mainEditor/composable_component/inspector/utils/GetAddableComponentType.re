open AddableComponentType;

let getAddableComponentType = type_ =>
  switch (type_) {
  | "MeshRenderer" => MeshRenderer
  | "Light" => Light
  | "Material" => Material
  | "BasicCameraView" => BasicCameraView
  | "PerspectiveCameraProjection" => PerspectiveCameraProjection
  | "ArcballCameraController" => ArcballCameraController
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getAddableComponentType",
        ~description={j|the type:$type_ is not find|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };