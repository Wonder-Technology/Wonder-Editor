let _isPickIMGUIGameObject =
    ((locationInViewX, locationInViewY), (x, y, width, height)) =>
  locationInViewX >= x
  && locationInViewX < x
  +. width
  && locationInViewY >= y
  && locationInViewY < y
  +. height;

let findPickedIMGUIGameObject =
    (event: EventType.customEvent, editorState, engineState) => {
  let {locationInView}: EventType.pointEvent =
    EventType.userDataToPointEvent(event.userData |> OptionService.unsafeGet);

  SceneViewIMGUIUtils.getIMGUIGameObjects(
    SceneEngineService.getSceneGameObject(engineState),
    engineState,
  )
  |> Js.Array.filter(imguiGameObject =>
       SceneViewIMGUIUtils.computePositionAndSize(
         imguiGameObject,
         editorState,
         engineState,
       )
       |> _isPickIMGUIGameObject(
            locationInView |> Vector2Service.convertIntToFloat,
          )
     )
  |> ArrayService.getFirst;
};