let _getPositionInputByIndex = (index, domChildren) => {
  let itemDiv = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let templateArticle =
    WonderCommonlib.ArrayService.unsafeGet(itemDiv##children, 1);

  let floatArticle =
    WonderCommonlib.ArrayService.unsafeGet(templateArticle##children, index);

  let input =
    WonderCommonlib.ArrayService.unsafeGet(floatArticle##children, 1);

  input;
};

let triggerChangePositionX = (value, domChildren) => {
  let input = _getPositionInputByIndex(0, domChildren);

  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value),
  );
};

let triggerBlurPositionX = (value, domChildren) => {
  let input = _getPositionInputByIndex(0, domChildren);

  BaseEventTool.triggerBlurEvent(input, BaseEventTool.buildFormEvent(value));
};

let triggerChangePositionY = (value, domChildren) => {
  let input = _getPositionInputByIndex(1, domChildren);

  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value),
  );
};

let triggerBlurPositionY = (value, domChildren) => {
  let input = _getPositionInputByIndex(1, domChildren);

  BaseEventTool.triggerBlurEvent(input, BaseEventTool.buildFormEvent(value));
};

let triggerChangePositionZ = (value, domChildren) => {
  let input = _getPositionInputByIndex(2, domChildren);

  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value),
  );
};

let simulateTwiceChangePosition = (~firstValue="11.25", ~secondValue="15", ()) => {
  let currentGameObjectTransform =
    GameObjectTool.getCurrentSceneTreeNodeTransform();

  let component =
    BuildComponentTool.buildMainEditorTransformComponent(
      TestTool.buildEmptyAppState(),
      currentGameObjectTransform,
    );

  BaseEventTool.triggerComponentEvent(
    component,
    triggerChangePositionX(firstValue),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    triggerBlurPositionX(firstValue),
  );

  BaseEventTool.triggerComponentEvent(
    component,
    triggerChangePositionY(secondValue),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    triggerBlurPositionY(secondValue),
  );
};

let _getScaleInputByIndex = (index, domChildren) => {
  let itemDiv = WonderCommonlib.ArrayService.unsafeGet(domChildren, 1);
  let templateArticle =
    WonderCommonlib.ArrayService.unsafeGet(itemDiv##children, 1);

  let floatArticle =
    WonderCommonlib.ArrayService.unsafeGet(templateArticle##children, index);

  let input =
    WonderCommonlib.ArrayService.unsafeGet(floatArticle##children, 1);

  input;
};

let triggerChangeScaleX = (value, domChildren) => {
  let input = _getScaleInputByIndex(0, domChildren);

  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value),
  );
};

let triggerBlurScaleX = (value, domChildren) => {
  let input = _getScaleInputByIndex(0, domChildren);

  BaseEventTool.triggerBlurEvent(input, BaseEventTool.buildFormEvent(value));
};

let triggerChangeScaleY = (value, domChildren) => {
  let input = _getScaleInputByIndex(1, domChildren);

  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value),
  );
};

let triggerBlurScaleY = (value, domChildren) => {
  let input = _getScaleInputByIndex(1, domChildren);

  BaseEventTool.triggerBlurEvent(input, BaseEventTool.buildFormEvent(value));
};

let triggerChangeScaleZ = (value, domChildren) => {
  let input = _getScaleInputByIndex(2, domChildren);

  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value),
  );
};