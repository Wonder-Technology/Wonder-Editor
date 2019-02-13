let _getMouseButton = ({userData}: EventType.customEvent) => {
  open EventType;

  let {button}: mouseEvent =
    userDataToMouseEvent(userData |> OptionService.unsafeGet);

  button;
};

let isLeftMouseButton = (event: EventType.customEvent) =>
  /* let {locationInView}: EventType. mouseEvent =
     EventType.userDataToMouseEvent(event.userData |> OptionService.unsafeGet);
     WonderLog.Log.print(("locationInView:", locationInView)) |> ignore; */
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

/* TODO refactor: duplicate with engine */
let getMovementDeltaWhenPointerLocked = mouseDomEvent => (
  switch (Js.toOption(mouseDomEvent##movementX)) {
  | Some(movementX) => movementX
  | None =>
    switch (Js.toOption(mouseDomEvent##webkitMovementX)) {
    | Some(webkitMovementX) => webkitMovementX
    | None =>
      switch (Js.toOption(mouseDomEvent##mozMovementX)) {
      | Some(mozMovementX) => mozMovementX
      | None => 0
      }
    }
  },
  switch (Js.toOption(mouseDomEvent##movementY)) {
  | Some(movementY) => movementY
  | None =>
    switch (Js.toOption(mouseDomEvent##webkitMovementY)) {
    | Some(webkitMovementY) => webkitMovementY
    | None =>
      switch (Js.toOption(mouseDomEvent##mozMovementY)) {
      | Some(mozMovementY) => mozMovementY
      | None => 0
      }
    }
  },
);