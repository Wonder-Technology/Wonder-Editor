let _getMouseButton = ({userData}: EventType.customEvent) => {
  open EventType;

  let {button}: mouseEvent =
    userDataToMouseEvent(userData |> OptionService.unsafeGet);

  button;
};

let isLeftMouseButton = (event: EventType.customEvent) =>
  EventType.(
    switch (_getMouseButton(event)) {
    | Left => true
    | _ => false
    }
  );

let isRightMouseButton = (event: EventType.customEvent) =>
  EventType.(
    switch (_getMouseButton(event)) {
    | Right => true
    | _ => false
    }
  );

let _replaceExceptionMovementDeltaToZero =
    ((movementX, movementY) as movementDelta) =>
  Js.Math.abs_int(movementX) > 500 || Js.Math.abs_int(movementY) > 500 ?
    (0, 0) : movementDelta;

let getMovementDeltaWhenPointerLockedAndFixBug = mouseDomEvent =>
  Wonderjs.HandleMouseEventMainService._getMovementDeltaWhenPointerLocked(
    mouseDomEvent,
  )
  |> _replaceExceptionMovementDeltaToZero;