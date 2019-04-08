module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.ScriptAttributeType.scriptAttribute => unit;

  type dataTuple = NodeAssetType.nodeId;

  type return = unit;

  let _getAttributeNodeData = (nodeId, editorState) =>
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId)
    |> StateLogicService.getEditorState
    |> ScriptAttributeNodeAssetService.getNodeData;

  let _getDefaultFieldType = () => "float";

  let _getDefaultFieldDefaultValue = () =>
    0.0 |> Wonderjs.ScriptAttributeType.floatToScriptAttributeValue;

  let handleSelfLogic = ((uiState, dispatchFunc), sendFunc, nodeId) => {
    let {name as attributeName, attribute}: NodeAssetType.scriptAttributeNodeData =
      _getAttributeNodeData(nodeId) |> StateLogicService.getEditorState;

    let attribute =
      ScriptAttributeEngineService.addScriptAttributeFieldJsObj(
        OperateTreeAssetLogicService.getUniqueScriptAttributeFieldName(
          ScriptAttributeNodeNameAssetService.getNewFieldName(),
          attribute,
        ),
        {
          "type": _getDefaultFieldType(),
          "defaultValue": _getDefaultFieldDefaultValue(),
        },
        attribute,
      );

    ScriptAttributeInspectorUtils.updateScriptAttributeNode(
      nodeId,
      attributeName,
      attribute,
    )
    |> StateLogicService.getAndSetEditorState;

    ScriptEngineService.updateAttributeInAllScriptComponents(
      attributeName,
      attribute,
    )
    |> StateLogicService.getAndSetEngineState;

    sendFunc(attribute);
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);