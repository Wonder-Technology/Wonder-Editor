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
  let _updateScriptAttributeNodeByRemoveFieldData = RemoveScriptAttributeFieldEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let _updateScriptAttributeNodeByReplaceFieldData = UpdateScriptAttributeFieldEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let addDefaultField = AddScriptAttributeDefaultFieldEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let _renameField = RenameScriptAttributeFieldEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let _sortAttributeEntries = attributeEntries =>
    attributeEntries
    |> Js.Array.sortInPlaceWith(((fieldName1, _), (fieldName2, _)) =>
         SortService.buildSortByNameFunc(fieldName1, fieldName2)
       );

  let getAttributeAllFieldsDomArr =
      (
        (uiState, dispatchFunc),
        send,
        (languageType, nodeId),
        attributeEntries,
      ) =>
    attributeEntries
    |> _sortAttributeEntries
    |> Js.Array.map(((fieldName, field)) =>
         <AttributeBox
           key={DomHelper.getRandomKey()}
           fieldName
           nodeId
           field
           renameFunc={
             _renameField(
               (uiState, dispatchFunc),
               (
                 languageType,
                 attribute => send(UpdateAttributeEntries(attribute)),
               ),
             )
           }
           removeFunc={
             _updateScriptAttributeNodeByRemoveFieldData(
               (uiState, dispatchFunc), newAttribute =>
               send(UpdateAttributeEntries(newAttribute))
             )
           }
           submitFunc={
             _updateScriptAttributeNodeByReplaceFieldData(
               (uiState, dispatchFunc),
               (),
             )
           }
         />
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
    <h1> {DomHelper.textEl("Script Attribute")} </h1>
    <hr />
    <StringInput
      label="Name"
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
      <div className="data-fields">
        {
          ReasonReact.array(
            Method.getAttributeAllFieldsDomArr(
              (uiState, dispatchFunc),
              send,
              (languageType, nodeId),
              state.attributeEntries,
            ),
          )
        }
      </div>
      <hr />
      <button
        className="data-addable-btn"
        onClick={
          _e =>
            Method.addDefaultField(
              (uiState, dispatchFunc),
              attribute => send(UpdateAttributeEntries(attribute)),
              nodeId,
            )
        }>
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