open SelectType;

open MainEditorCameraViewType;

let getCameraViewOptions = () => [|
  {
    key: BasicCameraView |> convertCameraViewTypeToInt,
    value: "basic_cameraView",
  },
|];