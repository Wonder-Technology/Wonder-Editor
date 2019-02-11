
let getDragStartMouseLocationInViewForCenterBox =
    (event: EventType.customEvent) =>
  EventType.userDataToMouseEvent(event.userData |> OptionService.unsafeGet).
    locationInView;
