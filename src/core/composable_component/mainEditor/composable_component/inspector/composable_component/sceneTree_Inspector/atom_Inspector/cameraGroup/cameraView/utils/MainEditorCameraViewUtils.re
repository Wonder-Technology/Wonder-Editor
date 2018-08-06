open SelectType;

open MainEditorCameraViewType;

let getMaterialOptions = () => [|
  {
    key: BasicCameraView |> convertCameraViewTypeToInt,
    value: "basic_cameraView",
  },
|];