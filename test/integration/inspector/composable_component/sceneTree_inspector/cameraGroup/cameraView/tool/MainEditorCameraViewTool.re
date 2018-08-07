let triggerClickCheckBox = domChildren => {
  let checkBoxDiv = WonderCommonlib.ArrayService.unsafeGet(domChildren, 1);
  let checkBox =
    WonderCommonlib.ArrayService.unsafeGet(checkBoxDiv##children, 1);

  BaseEventTool.triggerClickFromEvent(
    checkBox,
    BaseEventTool.buildFormEvent(true),
  );
};

let triggerClickSetCurrentCameraEvent = () => {
  let component =
    BuildComponentTool.buildCameraView(TestTool.buildEmptyAppState());

  BaseEventTool.triggerComponentEvent(component, triggerClickCheckBox);
};