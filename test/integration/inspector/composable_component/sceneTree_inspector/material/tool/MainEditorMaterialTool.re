open MainEditorMaterialType;

let _getFromArray = (array, index) => ArrayService.(getNth(index, array));

let triggerChangeMaterialTypeEvent = (value, domChildren) => {
  let selectDiv = _getFromArray(domChildren, 0);
  let selectArticle = _getFromArray(selectDiv##children, 0);
  let select = _getFromArray(selectArticle##children, 1);
  BaseEventTool.triggerChangeEvent(
    select,
    BaseEventTool.buildFormEvent(value |> string_of_int),
  );
};

let setMaterialTypeToBeBaiscMaterial = () => {
  let materialType = BasicMaterial |> convertMaterialTypeToInt;

  BaseEventTool.triggerComponentEvent(
    BuildComponentTool.buildMaterial(),
    triggerChangeMaterialTypeEvent(materialType),
  );
};

let triggerFileDragStartEvent = index => {
  let assetComponent = BuildComponentTool.buildAssetComponent();
  BaseEventTool.triggerComponentEvent(
    assetComponent,
    BasicMaterialEventTool.triggerFileDragStartEvent(index),
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
    BasicMaterialEventTool.triggerRemoveTextureClickEvent,
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
    BasicMaterialEventTool.triggerTextureDragEnterEvent,
  );
  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    BasicMaterialEventTool.triggerTextureDragDropEvent,
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
    BasicMaterialEventTool.triggerTextureDragEnterEvent,
  );
  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    BasicMaterialEventTool.triggerTextureDragLeaveEvent,
  );
};

let triggerDragTextureToGameObjectMaterial = () => {
  let inspectorComponent =
    BuildComponentTool.buildInspectorComponent(
      TestTool.buildEmptyAppState(),
      InspectorTool.buildFakeAllShowComponentConfig(),
    );

  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    BasicMaterialEventTool.triggerTextureDragEnterEvent,
  );
  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    BasicMaterialEventTool.triggerTextureDragDropEvent,
  );
};