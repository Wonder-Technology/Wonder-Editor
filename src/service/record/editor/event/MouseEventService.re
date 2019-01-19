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