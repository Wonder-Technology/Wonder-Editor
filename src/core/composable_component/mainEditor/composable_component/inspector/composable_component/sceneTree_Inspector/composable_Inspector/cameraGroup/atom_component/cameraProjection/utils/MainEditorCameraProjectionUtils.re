open SelectType;

open MainEditorCameraProjectionType;

let getCameraProjectionOptions = () => [|
  {
    key: PerspectiveCamera |> convertCameraProjectionTypeToInt,
    value: "perspective",
  },
|];