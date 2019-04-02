type state = {
  attributeEntries:
    array(
      (
        Wonderjs.ScriptAttributeType.fieldName,
        Wonderjs.ScriptAttributeType.scriptAttributeField,
      ),
    ),
};

type action =
  | UpdateAttributeEntries(Wonderjs.ScriptAttributeType.scriptAttribute);

module Method = {
  let _updateScriptAttributeNode =
      (nodeId, attributeName, attribute, editorState) =>
    ScriptAttributeNodeAssetEditorService.setNodeData(
      nodeId,
      ScriptAttributeNodeAssetService.buildNodeData(
        ~name=attributeName,
        ~attribute,
      ),
      editorState,
    );

  let _updateScriptAttributeNodeByReplaceFieldData =
      (nodeId, (fieldName, newFieldDataJsObjStr), editorState) => {
    let (attributeName, attribute) =
      ScriptAttributeNodeAssetEditorService.getNameAndAttribute(nodeId)
      |> StateLogicService.getEditorState;

    _updateScriptAttributeNode(
      nodeId,
      attributeName,
      ScriptAttributeEngineService.replaceScriptAttributeField(
        fieldName,
        newFieldDataJsObjStr |> Js.Json.parseExn |> Obj.magic,
        attribute,
      ),
      editorState,
    );
  };

  let _updateScriptAttributeNodeByRemoveFieldData =
      (nodeId, fieldName, editorState) => {
    let (attributeName, attribute) =
      ScriptAttributeNodeAssetEditorService.getNameAndAttribute(
        nodeId,
        editorState,
      );

    let newAttribute =
      ScriptAttributeEngineService.removeScriptAttributeField(
        fieldName,
        attribute,
      );

    (
      _updateScriptAttributeNode(
        nodeId,
        attributeName,
        newAttribute,
        editorState,
      ),
      newAttribute,
    );
  };

  let _getAttributeNodeData = (nodeId, editorState) =>
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId)
    |> StateLogicService.getEditorState
    |> ScriptAttributeNodeAssetService.getNodeData;

  let addDefaultField = (send, nodeId) => {
    let {name as attributeName, attribute}: NodeAssetType.scriptAttributeNodeData =
      _getAttributeNodeData(nodeId) |> StateLogicService.getEditorState;

    let attribute =
      ScriptAttributeEngineService.addScriptAttributeField(
        OperateTreeAssetLogicService.getUniqueScriptAttributeFieldName(
          ScriptAttributeNodeNameAssetService.getNewFieldName(),
          attribute,
        ),
        {
          "type": "int",
          "defaultValue":
            0 |> Wonderjs.ScriptAttributeType.intToScriptAttributeValue,
        },
        attribute,
      );

    /* TODO update script component */
    _updateScriptAttributeNode(nodeId, attributeName, attribute)
    |> StateLogicService.getAndSetEditorState;

    send(UpdateAttributeEntries(attribute));
  };

  let _convertFieldTypeToJsObjStr = type_ =>
    Wonderjs.(
      ScriptAttributeType.(
        switch (type_) {
        | Int => "int"
        | Float => "float"
        | type_ =>
          WonderLog.Log.fatal(
            WonderLog.Log.buildFatalMessage(
              ~title="_convertFieldTypeToJsObjStr",
              ~description={j|unknown type: $type_|j},
              ~reason="",
              ~solution={j||j},
              ~params={j||j},
            ),
          )
        }
      )
    );

  let _convertFieldToJsObjStr =
      (
        {type_, defaultValue}: Wonderjs.ScriptAttributeType.scriptAttributeField,
      ) => {
    let map = WonderCommonlib.MutableHashMapService.createEmpty();

    map
    |> WonderCommonlib.MutableHashMapService.set(
         "type",
         _convertFieldTypeToJsObjStr(type_),
       )
    |> WonderCommonlib.MutableHashMapService.set(
         "defaultValue",
         defaultValue |> Obj.magic,
       )
    |> Obj.magic
    |> Js.Json.stringify;
  };

  let _renameField = (send, nodeId, oldFieldName, newFieldName) => {
    /* TODO refactor */
    /* TODO update script component */

    let (attributeName, attribute) =
      ScriptAttributeNodeAssetEditorService.getNameAndAttribute(nodeId)
      |> StateLogicService.getEditorState;

    let newAttribute =
      ScriptAttributeEngineService.renameScriptAttributeField(
        oldFieldName,
        newFieldName,
        attribute,
      );

    _updateScriptAttributeNode(nodeId, attributeName, newAttribute)
    |> StateLogicService.getAndSetEditorState;

    send(UpdateAttributeEntries(newAttribute));
  };

  let getAttributeAllFieldsDomArr =
      (send, (languageType, nodeId), attributeEntries) =>
    attributeEntries
    |> Js.Array.mapi(((fieldName, field), i) =>
         <div key={DomHelper.getRandomKey()} className="field">
           <StringInput
             label="Field Name"
             title={
               LanguageUtils.getInspectorLanguageDataByType(
                 "scriptAttribute-field-name-describe",
                 languageType,
               )
             }
             defaultValue=fieldName
             onBlur={_renameField(send, nodeId, fieldName)}
             canBeNull=false
           />
           <FileInput
             buttonText="Set Field Data"
             inputValue={_convertFieldToJsObjStr(field)}
             onSubmit={
               value =>
                 /* TODO update script component */
                 _updateScriptAttributeNodeByReplaceFieldData(
                   nodeId,
                   (fieldName, value),
                 )
                 |> StateLogicService.getAndSetEditorState
             }
           />
           <button
             className="scriptAttribute-field-remove"
             onClick={
               e => {
                 /* TODO update script component */

                 let (editorState, newAttribute) =
                   _updateScriptAttributeNodeByRemoveFieldData(
                     nodeId,
                     fieldName,
                   )
                   |> StateLogicService.getEditorState;

                 editorState |> StateEditorService.setState |> ignore;

                 send(UpdateAttributeEntries(newAttribute));
               }
             }>
             {DomHelper.textEl("Remove")}
           </button>
         </div>
       );
};

let component = ReasonReact.reducerComponent("ScriptAttributeInspector");

let reducer = ((uiState, dispatchFunc) as reduxTuple, action, state) =>
  switch (action) {
  | UpdateAttributeEntries(attribute) =>
    ReasonReact.Update({
      ...state,
      attributeEntries:
        ScriptAttributeEngineService.getScriptAttributeEntries(attribute),
    })
  };

let render =
    (
      (uiState, dispatchFunc),
      nodeId,
      renameFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  let (attributeName, attribute) =
    ScriptAttributeNodeAssetEditorService.getNameAndAttribute(nodeId)
    |> StateLogicService.getEditorState;

  <article
    key="ScriptAttributeInspector"
    className="wonder-scriptAttribute-inspector">
    <h1> {DomHelper.textEl("ScriptAttribute")} </h1>
    <hr />
    <StringInput
      label="Attribute Name"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "scriptAttribute-name-describe",
          languageType,
        )
      }
      defaultValue=attributeName
      onBlur=renameFunc
      canBeNull=false
    />
    <div className="scriptAttribute-data">
      <div className="fields">
        {
          ReasonReact.array(
            Method.getAttributeAllFieldsDomArr(
              send,
              (languageType, nodeId),
              state.attributeEntries,
            ),
          )
        }
      </div>
      <button
        className="addable-btn"
        onClick={_e => Method.addDefaultField(send, nodeId)}>
        {
          DomHelper.textEl(
            LanguageUtils.getInspectorLanguageDataByType(
              "add-scriptAttribute-field",
              languageType,
            ),
          )
        }
      </button>
    </div>
  </article>;
};

let make =
    (
      ~uiState,
      ~dispatchFunc,
      ~currentNodeId,
      ~name,
      ~attribute,
      ~renameFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {
    attributeEntries:
      ScriptAttributeEngineService.getScriptAttributeEntries(attribute),
  },
  reducer: reducer((uiState, dispatchFunc)),
  render: self =>
    render((uiState, dispatchFunc), currentNodeId, renameFunc, self),
};