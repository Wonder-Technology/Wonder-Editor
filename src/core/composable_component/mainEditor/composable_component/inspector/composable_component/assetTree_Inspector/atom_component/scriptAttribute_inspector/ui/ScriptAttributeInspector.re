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

  let _isOnlyFieldDefaultValueChange =
      (
        (
          {type_, defaultValue}: Wonderjs.ScriptAttributeType.scriptAttributeField
        ) as oldAttributeField,
        newAttributeFieldJsObj,
      ) => {
    let newType =
      ScriptAttributeTypeService.getTypeFromJsObj(newAttributeFieldJsObj);

    let newDefaultValue = newAttributeFieldJsObj##defaultValue;

    type_
    |> ScriptAttributeTypeService.convertFieldTypeToJsObjStr === newType
    && defaultValue !== newDefaultValue;
  };

  let _updateScriptAttributeNodeByReplaceFieldData =
      (
        nodeId,
        (fieldName, newFieldDataJsObjStr),
        (editorState, engineState),
      ) =>
    Console.tryCatch(
      () => {
        let (attributeName, attribute) =
          ScriptAttributeNodeAssetEditorService.getNameAndAttribute(nodeId)
          |> StateLogicService.getEditorState;

        let newAttributeFieldJsObj =
          newFieldDataJsObjStr |> Js.Json.parseExn |> Obj.magic;

        let isOnlyFieldDefaultValueChange =
          _isOnlyFieldDefaultValueChange(
            ScriptAttributeEngineService.unsafeGetScriptAttributeField(
              fieldName,
              attribute,
            ),
            newAttributeFieldJsObj,
          );

        let newAttribute =
          ScriptAttributeEngineService.replaceScriptAttributeField(
            fieldName,
            newAttributeFieldJsObj,
            attribute,
          );

        let editorState =
          _updateScriptAttributeNode(
            nodeId,
            attributeName,
            newAttribute,
            editorState,
          );

        isOnlyFieldDefaultValueChange ?
          (editorState, engineState) :
          {
            let engineState =
              ScriptEngineService.updateAttributeInAllScriptComponents(
                attributeName,
                newAttribute,
                engineState,
              );

            (editorState, engineState);
          };
      },
      e => {
        let message = e##message;

        ConsoleUtils.error(
          LogUtils.buildErrorMessage(
            ~description={j|$message|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j},
          ),
        )
        |> StateLogicService.getEditorState;

        (editorState, engineState);
      },
    );

  let _updateScriptAttributeNodeByRemoveFieldData =
      (nodeId, fieldName, (editorState, engineState)) => {
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

    let editorState =
      editorState
      |> _updateScriptAttributeNode(nodeId, attributeName, newAttribute);

    let engineState =
      ScriptEngineService.updateAttributeInAllScriptComponents(
        attributeName,
        newAttribute,
        engineState,
      );

    ((editorState, engineState), newAttribute);
  };

  let _getAttributeNodeData = (nodeId, editorState) =>
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId)
    |> StateLogicService.getEditorState
    |> ScriptAttributeNodeAssetService.getNodeData;

  let _getDefaultFieldType = () => "float";

  let _getDefaultFieldDefaultValue = () =>
    0.0 |> Wonderjs.ScriptAttributeType.floatToScriptAttributeValue;

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
          "type": _getDefaultFieldType(),
          "defaultValue": _getDefaultFieldDefaultValue(),
        },
        attribute,
      );

    _updateScriptAttributeNode(nodeId, attributeName, attribute)
    |> StateLogicService.getAndSetEditorState;

    ScriptEngineService.updateAttributeInAllScriptComponents(
      attributeName,
      attribute,
    )
    |> StateLogicService.getAndSetEngineState;

    send(UpdateAttributeEntries(attribute));
  };

  let _convertFieldToJsObjStr =
      (
        {type_, defaultValue}: Wonderjs.ScriptAttributeType.scriptAttributeField,
      ) => {
    let map = WonderCommonlib.MutableHashMapService.createEmpty();

    map
    |> WonderCommonlib.MutableHashMapService.set(
         "type",
         ScriptAttributeTypeService.convertFieldTypeToJsObjStr(type_),
       )
    |> WonderCommonlib.MutableHashMapService.set(
         "defaultValue",
         defaultValue |> Obj.magic,
       )
    |> Obj.magic
    |> Js.Json.stringify;
  };

  let _renameField = (languageType, send, nodeId, oldFieldName, newFieldName) =>
    oldFieldName === newFieldName ?
      () :
      {
        let (attributeName, attribute) =
          ScriptAttributeNodeAssetEditorService.getNameAndAttribute(nodeId)
          |> StateLogicService.getEditorState;

        ScriptAttributeEngineService.hasScriptAttributeField(
          newFieldName,
          attribute,
        ) ?
          {
            ConsoleUtils.warn(
              LanguageUtils.getMessageLanguageDataByType(
                "asset-rename-scriptAttribute-field",
                languageType,
              ),
            )
            |> StateLogicService.getEditorState;

            send(UpdateAttributeEntries(attribute));
          } :
          {
            let newAttribute =
              ScriptAttributeEngineService.renameScriptAttributeField(
                oldFieldName,
                newFieldName,
                attribute,
              );

            _updateScriptAttributeNode(nodeId, attributeName, newAttribute)
            |> StateLogicService.getAndSetEditorState;

            ScriptEngineService.updateAttributeInAllScriptComponents(
              attributeName,
              newAttribute,
            )
            |> StateLogicService.getAndSetEngineState;

            send(UpdateAttributeEntries(newAttribute));
          };
      };

  let _sortAttributeEntries = attributeEntries =>
    attributeEntries
    |> Js.Array.sortInPlaceWith(((fieldName1, _), (fieldName2, _)) =>
         SortService.buildSortByNameFunc(fieldName1, fieldName2)
       );

  let getAttributeAllFieldsDomArr =
      (send, (languageType, nodeId), attributeEntries) =>
    attributeEntries
    |> _sortAttributeEntries
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
             onBlur={_renameField(languageType, send, nodeId, fieldName)}
             canBeNull=false
           />
           <FileInput
             buttonText="Set Field Data"
             inputValue={_convertFieldToJsObjStr(field)}
             onSubmit={
               value =>
                 _updateScriptAttributeNodeByReplaceFieldData(
                   nodeId,
                   (fieldName, value),
                 )
                 |> StateLogicService.getAndSetState
             }
           />
           <button
             className="scriptAttribute-field-remove"
             onClick={
               e => {
                 let ((editorState, engineState), newAttribute) =
                   _updateScriptAttributeNodeByRemoveFieldData(
                     nodeId,
                     fieldName,
                   )
                   |> StateLogicService.getStateToGetData;

                 editorState |> StateEditorService.setState |> ignore;
                 engineState |> StateEngineService.setState |> ignore;

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