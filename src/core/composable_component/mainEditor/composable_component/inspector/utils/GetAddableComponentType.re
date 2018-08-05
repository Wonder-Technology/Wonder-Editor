open InspectorComponentType;

let getInspectorComponentType = type_ =>
  switch (type_) {
  | "MeshRenderer" => MeshRenderer
  | "Light" => Light
  | "Material" => Material
  | "CameraGroup" => CameraGroup
  | "ArcballCameraController" => ArcballCameraController
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getInspectorComponentType",
        ~description=
          {j|the type:$type_ in InspectorComponentType is can't add|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };