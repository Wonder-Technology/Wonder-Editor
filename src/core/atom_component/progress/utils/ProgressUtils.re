let getProgressChangePercentCustomGlobalEventName = () => "wd_editor_progress_change_percent";

let getProgressShowCustomGlobalEventName = () => "wd_editor_progress_show";

let getProgressHideCustomGlobalEventName = () => "wd_editor_progress_hide";

let show = eventEngineState => {
  let (eventEngineState, _) =
    ManageEventEngineService.triggerCustomGlobalEvent(
      CreateCustomEventEngineService.create(
        getProgressShowCustomGlobalEventName(),
        None,
      ),
      eventEngineState,
    );

  eventEngineState;
};

let hide = eventEngineState => {
  let (eventEngineState, _) =
    ManageEventEngineService.triggerCustomGlobalEvent(
      CreateCustomEventEngineService.create(
        getProgressHideCustomGlobalEventName(),
        None,
      ),
      eventEngineState,
    );

  eventEngineState;
};

let changePercent = (percent, eventEngineState) => {
  let (eventEngineState, _) =
    ManageEventEngineService.triggerCustomGlobalEvent(
      CreateCustomEventEngineService.create(
        getProgressChangePercentCustomGlobalEventName(),
        Some(percent |> EventType.convertIntToUserData),
      ),
      eventEngineState,
    );

  eventEngineState;
};

let finish = eventEngineState => eventEngineState |> changePercent(100) |> hide;