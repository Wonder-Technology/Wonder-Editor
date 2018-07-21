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