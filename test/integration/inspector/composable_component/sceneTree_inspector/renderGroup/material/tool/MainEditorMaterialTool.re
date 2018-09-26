open MainEditorMaterialType;

let _getFromArray = (array, index) =>
  ArrayService.(unsafeGetNth(index, array));

let triggerChangeMaterialTypeEvent = (value, domChildren) => {
  let selectDiv = _getFromArray(domChildren, 1);
  let selectArticle = _getFromArray(selectDiv##children, 0);
  let select = _getFromArray(selectArticle##children, 1);
  BaseEventTool.triggerChangeEvent(
    select,
    BaseEventTool.buildFormEvent(value |> string_of_int),
  );
};

let triggerFileDragStartEvent = index => {
  let assetComponent = BuildComponentTool.buildAssetComponent();
  BaseEventTool.triggerComponentEvent(
    assetComponent,
    MaterialEventTool.triggerFileDragStartEvent(index),
  );
};
let triggerTextureRemoveClickEvent = () => {
  let inspectorComponent =
    BuildComponentTool.buildInspectorComponent(
      TestTool.buildEmptyAppState(),
      InspectorTool.buildFakeAllShowComponentConfig(),
    );
  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    MaterialEventTool.triggerRemoveTextureClickEvent,
  );
};
let triggerTextureDragEvent = () => {
  let inspectorComponent =
    BuildComponentTool.buildInspectorComponent(
      TestTool.buildEmptyAppState(),
      InspectorTool.buildFakeAllShowComponentConfig(),
    );
  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    MaterialEventTool.triggerTextureDragEnterEvent,
  );
  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    MaterialEventTool.triggerTextureDragDropEvent,
  );
};

let triggerDragTextureLeaveGameObjectMaterial = () => {
  let inspectorComponent =
    BuildComponentTool.buildInspectorComponent(
      TestTool.buildEmptyAppState(),
      InspectorTool.buildFakeAllShowComponentConfig(),
    );
  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    MaterialEventTool.triggerTextureDragEnterEvent,
  );
  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    MaterialEventTool.triggerTextureDragLeaveEvent,
  );
};

let triggerDragTextureToGameObjectMaterialWithSceneTreeInspectorDomIndex =
    sceneTreeInspectorDomIndex => {
  let inspectorComponent =
    BuildComponentTool.buildInspectorComponent(
      TestTool.buildEmptyAppState(),
      InspectorTool.buildFakeAllShowComponentConfig(),
    );

  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    MaterialEventTool.triggerTextureDragEnterEventWithSceneTreeInspectorDomIndex(
      sceneTreeInspectorDomIndex,
    ),
  );
  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    MaterialEventTool.triggerTextureDragDropEventWithSceneTreeInspectorDomIndex(
      sceneTreeInspectorDomIndex,
    ),
  );
};

let triggerDragTextureToGameObjectMaterial = () =>
  triggerDragTextureToGameObjectMaterialWithSceneTreeInspectorDomIndex(3);

let _getShininessInput = domChildren => {
  let article = _getFromArray(domChildren, 2);
  let inputArticle = _getFromArray(article##children, 0);
  let input =
    WonderCommonlib.ArrayService.unsafeGet(inputArticle##children, 1);

  input;
};

let triggerShininessChangeEvent = (value, domChildren) => {
  let input = _getShininessInput(domChildren);

  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value |> string_of_float),
  );
};

let triggerShininessBlurEvent = (value, domChildren) => {
  let input = _getShininessInput(domChildren);

  BaseEventTool.triggerBlurEvent(
    input,
    BaseEventTool.buildFormEvent(value |> string_of_float),
  );
};