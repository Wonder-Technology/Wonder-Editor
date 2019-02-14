let buildEvent = checked => {
                              "target": {
                                "checked": checked,
                              },
                            } |> Obj.magic;

let setCurrentCamera =
    (
      ~cameraView,
      ~event=buildEvent(true),
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorCameraView.Method.setCurrentCamera(
    (uiState, dispatchFunc),
    cameraView,
    event,
  );