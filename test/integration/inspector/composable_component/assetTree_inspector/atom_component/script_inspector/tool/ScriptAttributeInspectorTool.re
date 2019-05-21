let addDefaultField =
    (~sandbox, ~nodeId, ~send=SinonTool.createOneLengthStub(sandbox^), ()) =>
  ScriptAttributeInspector.Method.addDefaultField(
    (TestTool.buildEmptyAppState(), TestTool.getDispatch()),
    attribute =>
      send(ScriptAttributeInspector.UpdateAttributeEntries(attribute)),
    nodeId,
  );

let getAttributeName = (nodeId, editorState) => {
  open NodeAssetType;

  let {name}: scriptAttributeNodeData =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId)
    |> StateLogicService.getEditorState
    |> ScriptAttributeNodeAssetService.getNodeData;

  name;
};

let getAttribute = (nodeId, editorState) => {
  open NodeAssetType;

  let {attribute}: scriptAttributeNodeData =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId)
    |> StateLogicService.getEditorState
    |> ScriptAttributeNodeAssetService.getNodeData;

  attribute;
};

let getAttributeEntries = (nodeId, editorState) =>
  getAttribute(nodeId, editorState)
  |> ScriptAttributeEngineService.getScriptAttributeEntries;

let updateScriptAttributeNodeByReplaceFieldData =
    (nodeId, (fieldName, newAttributeFieldJsObj)) =>
  ScriptAttributeInspector.Method._updateScriptAttributeNodeByReplaceFieldData(
    (TestTool.buildEmptyAppState(), TestTool.getDispatch()),
    (),
    (nodeId, fieldName, newAttributeFieldJsObj),
  );

let updateScriptAttributeNodeByRemoveFieldData =
    (
      ~sandbox,
      ~nodeId,
      ~fieldName,
      ~send=SinonTool.createOneLengthStub(sandbox^),
      (),
    ) =>
  ScriptAttributeInspector.Method._updateScriptAttributeNodeByRemoveFieldData(
    (TestTool.buildEmptyAppState(), TestTool.getDispatch()),
    attribute =>
      send(ScriptAttributeInspector.UpdateAttributeEntries(attribute)),
    (nodeId, fieldName),
  );

let buildFieldJsObj =
    (~type_, ~defaultValue)
    : Wonderjs.ScriptAttributeType.scriptAttributeFieldJsObj => {
  "type": type_,
  "defaultValue": defaultValue |> Obj.magic,
};

let buildField =
    (~type_, ~defaultValue): Wonderjs.ScriptAttributeType.scriptAttributeField => {
  type_,
  defaultValue: defaultValue |> Obj.magic,
  value: defaultValue |> Obj.magic,
};

let renameField =
    (
      ~sandbox,
      ~nodeId,
      ~oldName,
      ~newName,
      ~send=SinonTool.createOneLengthStub(sandbox^),
      (),
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  ScriptAttributeInspector.Method._renameField(
    (TestTool.buildEmptyAppState(), TestTool.getDispatch()),
    (
      languageType,
      attribute =>
        send(ScriptAttributeInspector.UpdateAttributeEntries(attribute)),
    ),
    (nodeId, oldName, newName),
  );
};

let unsafeGetScriptAttributeFieldDefaultValue =
    (nodeId, fieldName, editorState) =>
  ScriptAttributeEngineService.unsafeGetScriptAttributeFieldDefaultValue(
    fieldName,
    getAttribute(nodeId, editorState),
  );

let getDefaultFieldType = () =>
  AddScriptAttributeDefaultFieldEventHandler.CustomEventHandler._getDefaultFieldType();

let getDefaultFieldDefaultValue = () =>
  AddScriptAttributeDefaultFieldEventHandler.CustomEventHandler._getDefaultFieldDefaultValue();

module TestUpdateScriptAttributeInAllScriptComponents = {
  let createDefaultSceneAndAddScriptComponent = sandbox => {
    MainEditorSceneTool.createDefaultScene(
      sandbox,
      MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
    );

    MainEditorInspectorAddComponentTool.addScriptComponent();
    /* (
       GameObjectTool.getCurrentSceneTreeNodeScript()
                 ) */
  };

  let prepareForOneScriptComponent = sandbox => {
    let script = GameObjectTool.getCurrentSceneTreeNodeScript();
    let assetTreeData =
      MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
    let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
    MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
    addDefaultField(~sandbox, ~nodeId=addedNodeId, ());

    MainEditorScriptAttributeTool.addScriptAttribute(
      ~script,
      ~send=SinonTool.createOneLengthStub(sandbox^),
      (),
    );

    let (fieldName, field) =
      getAttributeEntries(addedNodeId)
      |> StateLogicService.getEditorState
      |> ArrayService.unsafeGetFirst;

    (script, addedNodeId, fieldName);
  };

  let prepareForTwoScriptComponents = sandbox => {
    let script1 = GameObjectTool.getCurrentSceneTreeNodeScript();
    MainEditorSceneTool.setSecondCubeToBeCurrentSceneTreeNode();
    MainEditorInspectorAddComponentTool.addScriptComponent();
    let script2 = GameObjectTool.getCurrentSceneTreeNodeScript();

    let assetTreeData =
      MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
    let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
    MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
    addDefaultField(~sandbox, ~nodeId=addedNodeId, ());

    MainEditorScriptAttributeTool.addScriptAttribute(
      ~script=script1,
      ~send=SinonTool.createOneLengthStub(sandbox^),
      (),
    );
    MainEditorScriptAttributeTool.addScriptAttribute(
      ~script=script2,
      ~send=SinonTool.createOneLengthStub(sandbox^),
      (),
    );

    let (fieldName, field) =
      getAttributeEntries(addedNodeId)
      |> StateLogicService.getEditorState
      |> ArrayService.unsafeGetFirst;

    ((script1, script2), addedNodeId, fieldName);
  };
};