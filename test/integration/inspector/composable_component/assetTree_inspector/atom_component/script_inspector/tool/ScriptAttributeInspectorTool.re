let addDefaultField =
    (~sandbox, ~nodeId, ~send=SinonTool.createOneLengthStub(sandbox^), ()) =>
  ScriptAttributeInspector.Method.addDefaultField(send, nodeId);

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
    (nodeId, (fieldName, newFieldDataJsObjStr), editorState) =>
  ScriptAttributeInspector.Method._updateScriptAttributeNodeByReplaceFieldData(
    nodeId,
    (fieldName, newFieldDataJsObjStr),
    editorState,
  );

let updateScriptAttributeNodeByRemoveFieldData =
    (nodeId, fieldName, editorState) => {
  let (editorState, _) =
    ScriptAttributeInspector.Method._updateScriptAttributeNodeByRemoveFieldData(
      nodeId,
      fieldName,
      editorState,
    );

  editorState;
};

let convertFieldToJsObjStr = field =>
  ScriptAttributeInspector.Method._convertFieldToJsObjStr(field);

let buildFieldJsObjStr = (~type_, ~defaultValue) => {j|
      {
        "type": "$type_",
        "defaultValue": $defaultValue
      }
      |j};

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
    languageType,
    send,
    nodeId,
    oldName,
    newName,
  );
};

let getScriptAttributeFieldDefaultValue = (nodeId, fieldName, editorState) =>
  ScriptAttributeEngineService.unsafeGetScriptAttributeFieldDefaultValue(
    fieldName,
    getAttribute(nodeId, editorState),
  );

let getDefaultFieldType = () =>
  ScriptAttributeInspector.Method._getDefaultFieldType();

let getDefaultFieldDefaultValue = () =>
  ScriptAttributeInspector.Method._getDefaultFieldDefaultValue();

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

    MainEditorScriptTool.addScriptAttribute(
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
    addDefaultField(
      ~sandbox,
      ~nodeId=addedNodeId,
      (),
    );

    MainEditorScriptTool.addScriptAttribute(
      ~script=script1,
      ~send=SinonTool.createOneLengthStub(sandbox^),
      (),
    );
    MainEditorScriptTool.addScriptAttribute(
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