let buildEvent = checked => {
                              "target": {
                                "checked": checked,
                              },
                            } |> Obj.magic;

let setCurrentCamera =
    (
      ~cameraView,
      ~event=buildEvent(true),
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorCameraView.Method.setCurrentCamera(
    (store, dispatchFunc),
    cameraView,
    event,
  );