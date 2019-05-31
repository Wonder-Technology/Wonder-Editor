type state = {
  currentScript: Wonderjs.ScriptType.script,
  isShowScriptAttributeGroupForAdd: bool,
  isShowScriptAttributeGroupForChange: bool,
  lastScriptAttributeNodeIdForAdd: option(int),
  lastScriptAttributeNodeIdForChange: option(int),
  unUsedScriptAttributeNodeIds: array(NodeAssetType.nodeId),
};

type action =
  | ChangeScriptAttributeForAdd(
      NodeAssetType.nodeId,
      array(NodeAssetType.nodeId),
    )
  | ChangeScriptAttributeForChange(
      NodeAssetType.nodeId,
      array(NodeAssetType.nodeId),
    )
  | ShowScriptAttributeGroupForAdd(
      NodeAssetType.nodeId,
      array(NodeAssetType.nodeId),
    )
  | ShowScriptAttributeGroupForChange(
      NodeAssetType.nodeId,
      array(NodeAssetType.nodeId),
    )
  | HideScriptAttributeGroupForAdd
  | HideScriptAttributeGroupForChange;

module Method = {
  let _sendShowScriptAttributeGroupForChange =
      (
        currentScript,
        scriptAttributeNodeId,
        send,
        (editorState, engineState),
      ) =>
    send(
      ShowScriptAttributeGroupForChange(
        scriptAttributeNodeId,
        MainEditorScriptAttributeUtils.getUnUsedScriptAttributeNodeIds(
          currentScript,
          (editorState, engineState),
        ),
      ),
    );

  let _removeScriptAttribute = ScriptRemoveScriptAttributeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let _changeScriptAttributeFieldDefaultValue =
      (script, attributeName, fieldName, attribute, defaultValue) =>
    ScriptEngineService.setScriptAttributeFieldDefaultValueAndValue(
      script,
      attributeName,
      fieldName,
      defaultValue,
    )
    |> StateLogicService.getAndSetEngineState;

  let _isFloatValueEqual = (value1, value2) =>
    value1
    |> Wonderjs.ScriptAttributeType.scriptAttributeValueToFloat
    === (value2 |> Wonderjs.ScriptAttributeType.scriptAttributeValueToFloat);

  let _isIntValueEqual = (value1, value2) =>
    value1
    |> Wonderjs.ScriptAttributeType.scriptAttributeValueToInt
    === (value2 |> Wonderjs.ScriptAttributeType.scriptAttributeValueToInt);

  let _blurScriptAttributeFieldDefaultValue =
      (
        (uiState, dispatchFunc),
        isValueEqualFunc,
        (script, attributeName, fieldName, attribute, defaultValue),
      ) =>
    ScriptEngineService.unsafeGetScriptAttributeFieldDefaultValue(
      script,
      attributeName,
      fieldName,
    )
    |> StateLogicService.getEngineStateToGetData
    |> isValueEqualFunc(defaultValue) ?
      () :
      ScriptBlurScriptAttributeFieldDefaultValueEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        (),
        (script, attributeName, fieldName, attribute, defaultValue),
      );

  let _renderScriptAttributeFieldDefaultValue =
      (
        (uiState, dispatchFunc),
        languageType,
        script,
        attributeName,
        fieldName,
        type_,
        attribute,
      ) =>
    Wonderjs.(
      ScriptAttributeType.(
        switch (type_) {
        | Float =>
          <FloatInput
            label=fieldName
            title=fieldName
            defaultValue={
              ScriptAttributeEngineService.unsafeGetScriptAttributeFieldDefaultValue(
                fieldName,
                attribute,
              )
              |> Wonderjs.ScriptAttributeType.scriptAttributeValueToFloat
              |> string_of_float
            }
            onChange=(
              value =>
                _changeScriptAttributeFieldDefaultValue(
                  script,
                  attributeName,
                  fieldName,
                  attribute,
                  value
                  |> Wonderjs.ScriptAttributeType.floatToScriptAttributeValue,
                )
            )
            onBlur=(
              value =>
                _blurScriptAttributeFieldDefaultValue(
                  (uiState, dispatchFunc),
                  _isFloatValueEqual,
                  (
                    script,
                    attributeName,
                    fieldName,
                    attribute,
                    value
                    |> Wonderjs.ScriptAttributeType.floatToScriptAttributeValue,
                  ),
                )
            )
            onDragDrop=(
              value =>
                _blurScriptAttributeFieldDefaultValue(
                  (uiState, dispatchFunc),
                  _isFloatValueEqual,
                  (
                    script,
                    attributeName,
                    fieldName,
                    attribute,
                    value
                    |> Wonderjs.ScriptAttributeType.floatToScriptAttributeValue,
                  ),
                )
            )
          />
        | Int =>
          <IntInput
            key={DomHelper.getRandomKey()}
            label=fieldName
            title=fieldName
            defaultValue={
              ScriptAttributeEngineService.unsafeGetScriptAttributeFieldDefaultValue(
                fieldName,
                attribute,
              )
              |> Wonderjs.ScriptAttributeType.scriptAttributeValueToInt
              |> string_of_int
            }
            onChange=(
              value =>
                _changeScriptAttributeFieldDefaultValue(
                  script,
                  attributeName,
                  fieldName,
                  attribute,
                  value
                  |> Wonderjs.ScriptAttributeType.intToScriptAttributeValue,
                )
            )
            onBlur=(
              value =>
                _blurScriptAttributeFieldDefaultValue(
                  (uiState, dispatchFunc),
                  _isIntValueEqual,
                  (
                    script,
                    attributeName,
                    fieldName,
                    attribute,
                    value
                    |> Wonderjs.ScriptAttributeType.intToScriptAttributeValue,
                  ),
                )
            )
            onDragDrop=(
              value =>
                _blurScriptAttributeFieldDefaultValue(
                  (uiState, dispatchFunc),
                  _isIntValueEqual,
                  (
                    script,
                    attributeName,
                    fieldName,
                    attribute,
                    value
                    |> Wonderjs.ScriptAttributeType.intToScriptAttributeValue,
                  ),
                )
            )
          />
        | type_ =>
          WonderLog.Log.fatal(
            WonderLog.Log.buildFatalMessage(
              ~description={j|unknown field type: $type_|j},
              ~reason="",
              ~solution={j||j},
              ~params={j||j},
            ),
          )
        }
      )
    );

  let _renderScriptAttributeFields =
      (
        (uiState, dispatchFunc),
        languageType,
        script,
        attributeName,
        attribute,
      ) =>
    ReasonReact.array(
      ScriptAttributeEngineService.getScriptAttributeEntries(attribute)
      |> Js.Array.map(((fieldName, field)) => {
           let type_ =
             ScriptAttributeEngineService.unsafeGetScriptAttributeFieldType(
               fieldName,
               attribute,
             );

           <div
             key={DomHelper.getRandomKey()} className="scriptAttribute-field">
             {
               _renderScriptAttributeFieldDefaultValue(
                 (uiState, dispatchFunc),
                 languageType,
                 script,
                 attributeName,
                 fieldName,
                 type_,
                 attribute,
               )
             }
           </div>;
         }),
    );

  let renderScriptAllAttributes =
      (
        (uiState, dispatchFunc),
        languageType,
        dispatchFunc,
        {state, send}: ReasonReact.self('a, 'b, 'c),
      ) => {
    let {currentScript} = state;

    ScriptEngineService.getScriptAllAttributeEntries(currentScript)
    |> StateLogicService.getEngineStateToGetData
    |> Js.Array.map(((name, attribute)) => {
         let scriptAttributeNodeId =
           OperateTreeAssetLogicService.findNodeIdByName(name)
           |> StateLogicService.getStateToGetData
           |> OptionService.unsafeGet;

         <div
           key={DomHelper.getRandomKey()} className="wonder-script-attribute">
           <div className="component-header">
             <div className="header-title">
               {DomHelper.textEl("Script Attribute")}
             </div>
             <div className="header-close">
               <img
                 src="./public/img/close.png"
                 onClick={
                   _e =>
                     _removeScriptAttribute(
                       (uiState, dispatchFunc),
                       (),
                       (currentScript, name),
                     )
                 }
               />
             </div>
           </div>
           <SelectAssetGroupBar
             headerText="Name"
             headerTitle={
               LanguageUtils.getInspectorLanguageDataByType(
                 "script-use-scriptAttribute-describe",
                 languageType,
               )
             }
             assetText=name
             selectAssetFunc={
               send =>
                 _sendShowScriptAttributeGroupForChange(
                   currentScript,
                   scriptAttributeNodeId,
                   send,
                 )
                 |> StateLogicService.getStateToGetData
             }
             sendFunc=send
           />
           <div className="scriptAttribute-fields">
             {
               _renderScriptAttributeFields(
                 (uiState, dispatchFunc),
                 languageType,
                 currentScript,
                 name,
                 attribute,
               )
             }
           </div>
         </div>;
       });
  };

  let sortScriptAttributeNodeIds = scriptAttributeNodeIds =>
    scriptAttributeNodeIds |> Js.Array.sortInPlace;

  let handleChangeScriptAttribute = ScriptChangeScriptAttributeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let addScriptAttribute = ScriptAddScriptAttributeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let getAllScriptAttributes =
      (currentScriptAttributeNodeId, unUsedScriptAttributeNodeIds) =>
    ArrayService.fastConcat(
      [|currentScriptAttributeNodeId |> OptionService.unsafeGet|],
      unUsedScriptAttributeNodeIds,
    )
    |> sortScriptAttributeNodeIds;

  let isScriptAttribute =
      (currentScriptAttributeNodeId, scriptAttributeNodeId) =>
    MainEditorScriptUtils.isNodeIdEqual(
      currentScriptAttributeNodeId,
      scriptAttributeNodeId,
    );

  let getSelectScriptAttributeGroupWidgetText = scriptAttributeNodeId =>
    OperateTreeAssetLogicService.unsafeGetNodeNameById(scriptAttributeNodeId)
    |> StateLogicService.getStateToGetData;
};

let component = ReasonReact.reducerComponent("MainEditorScriptAttribute");

let reducer = (action, state) =>
  switch (action) {
  | ChangeScriptAttributeForAdd(
      targetScriptAttributeNodeId,
      unUsedScriptAttributeNodeIds,
    ) =>
    ReasonReact.Update({
      ...state,
      lastScriptAttributeNodeIdForAdd: Some(targetScriptAttributeNodeId),
      unUsedScriptAttributeNodeIds,
    })
  | ChangeScriptAttributeForChange(
      targetScriptAttributeNodeId,
      unUsedScriptAttributeNodeIds,
    ) =>
    ReasonReact.Update({
      ...state,
      lastScriptAttributeNodeIdForChange: Some(targetScriptAttributeNodeId),
      unUsedScriptAttributeNodeIds,
    })
  | ShowScriptAttributeGroupForAdd(
      lastScriptAttributeNodeIdForAdd,
      unUsedScriptAttributeNodeIds,
    ) =>
    ReasonReact.Update({
      ...state,
      isShowScriptAttributeGroupForAdd: true,
      lastScriptAttributeNodeIdForAdd: Some(lastScriptAttributeNodeIdForAdd),
      unUsedScriptAttributeNodeIds,
    })
  | ShowScriptAttributeGroupForChange(
      lastScriptAttributeNodeIdForChange,
      unUsedScriptAttributeNodeIds,
    ) =>
    ReasonReact.Update({
      ...state,
      isShowScriptAttributeGroupForChange: true,
      lastScriptAttributeNodeIdForChange:
        Some(lastScriptAttributeNodeIdForChange),
      unUsedScriptAttributeNodeIds,
    })
  | HideScriptAttributeGroupForAdd =>
    ReasonReact.Update({
      ...state,
      isShowScriptAttributeGroupForAdd: false,
      lastScriptAttributeNodeIdForAdd: None,
    })
  | HideScriptAttributeGroupForChange =>
    ReasonReact.Update({
      ...state,
      isShowScriptAttributeGroupForChange: false,
      lastScriptAttributeNodeIdForChange: None,
    })
  };

let render =
    (
      (uiState, dispatchFunc),
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article
    key="MainEditorScriptAttribute"
    className="wonder-inspector-scriptAttribute">
    <div className="inspector-component">
      <div
        className="component-title"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "mesh-render-describe",
            languageType,
          )
        }>
        {DomHelper.textEl("Script Attribute Group")}
      </div>
      <hr />
      <div className="component-content">
        {
          ReasonReact.array(
            Method.renderScriptAllAttributes(
              (uiState, dispatchFunc),
              languageType,
              dispatchFunc,
              self,
            ),
          )
        }
        <button
          className="addable-btn"
          onClick={
            _e =>
              Method.addScriptAttribute(
                (uiState, dispatchFunc),
                (
                  languageType,
                  (
                    lastScriptAttributeNodeIdForAdd,
                    unUsedScriptAttributeNodeIds,
                  ) =>
                    send(
                      ShowScriptAttributeGroupForAdd(
                        lastScriptAttributeNodeIdForAdd,
                        unUsedScriptAttributeNodeIds,
                      ),
                    ),
                ),
                state.currentScript,
              )
          }>
          {
            DomHelper.textEl(
              LanguageUtils.getInspectorLanguageDataByType(
                "script-add-scriptAttribute",
                languageType,
              ),
            )
          }
        </button>
      </div>
    </div>
    {
      state.isShowScriptAttributeGroupForAdd ?
        <SelectAssetGroupWidget
          headerText="Add Script Attribute"
          sendFunc=send
          clickHideGroupButtonFunc={
            send => send(HideScriptAttributeGroupForAdd)
          }
          getAllAssetsFunc={
            () =>
              Method.getAllScriptAttributes(
                state.lastScriptAttributeNodeIdForAdd,
                state.unUsedScriptAttributeNodeIds,
              )
          }
          isAssetFunc={
            scriptAttributeNodeId => {
              let currentScriptAttributeNodeId =
                state.lastScriptAttributeNodeIdForAdd;

              Method.isScriptAttribute(
                currentScriptAttributeNodeId,
                scriptAttributeNodeId,
              );
            }
          }
          changeAssetFunc={
            (scriptAttributeNodeId, send) => {
              let currentScriptAttributeNodeId =
                state.lastScriptAttributeNodeIdForAdd;

              Method.handleChangeScriptAttribute(
                (uiState, dispatchFunc),
                (targetScriptAttributeNodeId, unUsedScriptAttributeNodeIds) =>
                  send(
                    ChangeScriptAttributeForAdd(
                      targetScriptAttributeNodeId,
                      unUsedScriptAttributeNodeIds,
                    ),
                  ),
                (
                  state.currentScript,
                  currentScriptAttributeNodeId,
                  scriptAttributeNodeId,
                ),
              );
            }
          }
          getTextFunc=Method.getSelectScriptAttributeGroupWidgetText
        /> :
        ReasonReact.null
    }
    {
      state.isShowScriptAttributeGroupForChange ?
        <SelectAssetGroupWidget
          headerText="Change Script Attribute"
          sendFunc=send
          clickHideGroupButtonFunc={
            send => send(HideScriptAttributeGroupForChange)
          }
          getAllAssetsFunc={
            () =>
              Method.getAllScriptAttributes(
                state.lastScriptAttributeNodeIdForChange,
                state.unUsedScriptAttributeNodeIds,
              )
          }
          isAssetFunc={
            scriptAttributeNodeId => {
              let currentScriptAttributeNodeId =
                state.lastScriptAttributeNodeIdForChange;

              Method.isScriptAttribute(
                currentScriptAttributeNodeId,
                scriptAttributeNodeId,
              );
            }
          }
          changeAssetFunc={
            (scriptAttributeNodeId, send) => {
              let currentScriptAttributeNodeId =
                state.lastScriptAttributeNodeIdForChange;

              Method.handleChangeScriptAttribute(
                (uiState, dispatchFunc),
                (targetScriptAttributeNodeId, unUsedScriptAttributeNodeIds) =>
                  send(
                    ChangeScriptAttributeForChange(
                      targetScriptAttributeNodeId,
                      unUsedScriptAttributeNodeIds,
                    ),
                  ),
                (
                  state.currentScript,
                  currentScriptAttributeNodeId,
                  scriptAttributeNodeId,
                ),
              );
            }
          }
          getTextFunc=Method.getSelectScriptAttributeGroupWidgetText
        /> :
        ReasonReact.null
    }
  </article>;
};

let make = (~uiState, ~dispatchFunc, ~script, _children) => {
  ...component,
  initialState: () => {
    currentScript: script,
    isShowScriptAttributeGroupForAdd: false,
    isShowScriptAttributeGroupForChange: false,
    lastScriptAttributeNodeIdForAdd: None,
    lastScriptAttributeNodeIdForChange: None,
    unUsedScriptAttributeNodeIds: WonderCommonlib.ArrayService.createEmpty(),
  },
  reducer,
  render: self => render((uiState, dispatchFunc), self),
};