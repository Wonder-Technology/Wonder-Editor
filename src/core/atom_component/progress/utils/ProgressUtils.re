let getProgressChangePercentCustomGlobalEventName = () => "wd_editor_progress_change_percent";

let getProgressShowCustomGlobalEventName = () => "wd_editor_progress_show";

let getProgressHideCustomGlobalEventName = () => "wd_editor_progress_hide";

let getProgressFinishCustomGlobalEventName = () => "wd_editor_progress_finish";

let show = engineState => {
  let (engineState, _) =
    ManageEventEngineService.triggerCustomGlobalEvent(
      CreateCustomEventEngineService.create(
        getProgressShowCustomGlobalEventName(),
        None,
      ),
      engineState,
    );

  engineState;
};

let hide = engineState => {
  let (engineState, _) =
    ManageEventEngineService.triggerCustomGlobalEvent(
      CreateCustomEventEngineService.create(
        getProgressHideCustomGlobalEventName(),
        None,
      ),
      engineState,
    );

  engineState;
};

let changePercent = (percent, engineState) => {
  let (engineState, _) =
    ManageEventEngineService.triggerCustomGlobalEvent(
      CreateCustomEventEngineService.create(
        getProgressChangePercentCustomGlobalEventName(),
        Some(percent |> EventType.convertIntToUserData),
      ),
      engineState,
    );

  engineState;
};

let finish = engineState => {
  let (engineState, _) =
    ManageEventEngineService.triggerCustomGlobalEvent(
      CreateCustomEventEngineService.create(
        getProgressFinishCustomGlobalEventName(),
        None,
      ),
      engineState,
    );

  engineState;
};