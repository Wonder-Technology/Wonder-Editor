let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let _getAddComponentButtonByIndex = (index, domChildren) => {
  let articleParent = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);

  let article =
    WonderCommonlib.ArrayService.unsafeGet(articleParent##children, index);
  let div = WonderCommonlib.ArrayService.unsafeGet(article##children, 0);
  let button = WonderCommonlib.ArrayService.unsafeGet(div##children, 0);

  button;
};

let triggerClickShowComponentList = (componentCount, domChildren) => {
  let button = _getAddComponentButtonByIndex(componentCount, domChildren);

  BaseEventTool.triggerClickEvent(button);
};

let _getComponentCategoryByLayerIndex = (index, firstLayer, domChildren) => {
  let articleParent = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let article =
    WonderCommonlib.ArrayService.unsafeGet(articleParent##children, index);
  let addableComponent =
    WonderCommonlib.ArrayService.unsafeGet(article##children, 0);
  let componentList =
    WonderCommonlib.ArrayService.unsafeGet(addableComponent##children, 1);

  let addableComponentBoxByIndex =
    WonderCommonlib.ArrayService.unsafeGet(
      componentList##children,
      firstLayer,
    );

  addableComponentBoxByIndex;
};

let _getComponentByLayerIndex = (index, firstLayer, secondLayer, domChildren) => {
  let addableComponentBoxByIndex =
    _getComponentCategoryByLayerIndex(index, firstLayer, domChildren);

  let categoryContent =
    WonderCommonlib.ArrayService.unsafeGet(
      addableComponentBoxByIndex##children,
      1,
    );

  let componentDiv =
    WonderCommonlib.ArrayService.unsafeGet(
      categoryContent##children,
      secondLayer,
    );

  componentDiv;
};

let triggerClickShowCategory = (componentCount, categoryIndex, domChildren) => {
  let addableComponentBoxByIndex =
    _getComponentCategoryByLayerIndex(
      componentCount,
      categoryIndex,
      domChildren,
    );
  let categoryHeader =
    WonderCommonlib.ArrayService.unsafeGet(
      addableComponentBoxByIndex##children,
      0,
    );

  BaseEventTool.triggerClickEvent(categoryHeader);
};

let triggerClickAddComponent =
    (componentCount, categoryIndex, typeIndex, domChildren) => {
  let componentDiv =
    _getComponentByLayerIndex(
      componentCount,
      categoryIndex,
      typeIndex,
      domChildren,
    );

  BaseEventTool.triggerClickEvent(componentDiv);
};

let _getColorPickDivDom = domChildren => {
  let articleParent = WonderCommonlib.ArrayService.unsafeGet(domChildren, 4);
  let div =
    WonderCommonlib.ArrayService.unsafeGet(articleParent##children, 0);
  let colorPickArticle =
    WonderCommonlib.ArrayService.unsafeGet(div##children, 0);
  let colorPickDiv =
    WonderCommonlib.ArrayService.unsafeGet(colorPickArticle##children, 0);

  colorPickDiv;
};

let triggerShowColorPickEvent = domChildren => {
  let colorPickDiv = _getColorPickDivDom(domChildren);

  let button =
    WonderCommonlib.ArrayService.unsafeGet(colorPickDiv##children, 2);
  BaseEventTool.triggerClickEvent(button);
};

let triggerCloseColorPickEvent = domChildren => {
  let colorPickDiv = _getColorPickDivDom(domChildren);

  let div = WonderCommonlib.ArrayService.unsafeGet(colorPickDiv##children, 3);
  let closeDiv = WonderCommonlib.ArrayService.unsafeGet(div##children, 1);

  BaseEventTool.triggerClickEvent(closeDiv);
};

let addComponentIntoCurrentGameObject =
    (componentCount, categoryIndex, componentIndex) => {
  let component =
    BuildComponentTool.buildInspectorComponent(
      TestTool.buildEmptyAppState(),
      InspectorTool.buildFakeAllShowComponentConfig(),
    );

  BaseEventTool.triggerComponentEvent(
    component,
    triggerClickShowComponentList(componentCount),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    triggerClickShowCategory(componentCount, categoryIndex),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    triggerClickAddComponent(componentCount, categoryIndex, componentIndex),
  );
};