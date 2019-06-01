let buildState =
    (
      ~currentScript,
      ~isShowScriptAttributeGroupForAdd=false,
      ~isShowScriptAttributeGroupForChange=false,
      ~lastScriptAttributeNodeIdForAdd=None,
      ~lastScriptAttributeNodeIdForChange=None,
      ~unUsedScriptAttributeNodeIds=[||],
      (),
    )
    : MainEditorScriptAttribute.state => {
  currentScript,
  isShowScriptAttributeGroupForAdd,
  isShowScriptAttributeGroupForChange,
  lastScriptAttributeNodeIdForAdd,
  lastScriptAttributeNodeIdForChange,
  unUsedScriptAttributeNodeIds,
};

let reducer = (~action, ~state) =>
  MainEditorScriptAttribute.reducer(action, state);

let getUpdateState = (~state, ~func) => {
  let actionRef = ref(Obj.magic(-1));

  func(~send=action => {
    actionRef := action;

    ();
  });

  reducer(~action=actionRef^, ~state) |> ReactTool.getUpdateState;
};

let changeScriptAttribute =
    (
      ~currentScript,
      ~currentScriptAttributeNodeIdOpt,
      ~targetScriptAttributeNodeId,
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) =>
  ScriptChangeScriptAttributeEventHandler.CustomEventHandler._changeScriptAttribute(
    currentScript,
    currentScriptAttributeNodeIdOpt,
    targetScriptAttributeNodeId,
    (editorState, engineState),
  );

let addScriptAttribute =
    (
      ~script,
      ~send,
      ~languageType=LanguageType.EN,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorScriptAttribute.Method.addScriptAttribute(
    (uiState, dispatchFunc),
    (
      languageType,
      (lastScriptAttributeNodeIdForAdd, unUsedScriptAttributeNodeIds) =>
        send(
          MainEditorScriptAttribute.ShowScriptAttributeGroupForAdd(
            lastScriptAttributeNodeIdForAdd,
            unUsedScriptAttributeNodeIds,
          ),
        ),
    ),
    script,
  );

let sendShowScriptAttributeGroupForChange =
    (
      ~send,
      ~script,
      ~scriptAttributeNodeId,
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) =>
  MainEditorScriptAttribute.Method._sendShowScriptAttributeGroupForChange(
    script,
    scriptAttributeNodeId,
    send,
    (editorState, engineState),
  );

let handleChangeScriptAttributeForChange =
    (
      ~script,
      ~send,
      ~currentScriptAttributeNodeId,
      ~targetScriptAttributeNodeId,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorScriptAttribute.Method.handleChangeScriptAttribute(
    (uiState, dispatchFunc),
    (targetScriptAttributeNodeId, unUsedScriptAttributeNodeIds) =>
      send(
        MainEditorScriptAttribute.ChangeScriptAttributeForChange(
          targetScriptAttributeNodeId,
          unUsedScriptAttributeNodeIds,
        ),
      ),
    (script, currentScriptAttributeNodeId, targetScriptAttributeNodeId),
  );

let removeScriptAttribute =
    (
      ~script,
      ~attributeName,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorScriptAttribute.Method._removeScriptAttribute(
    (uiState, dispatchFunc),
    (),
    (script, attributeName),
  );

let changeScriptAttributeFieldDefaultValueFloat =
    (script, attributeName, fieldName, attribute, defaultValue) =>
  MainEditorScriptAttribute.Method._changeScriptAttributeFieldDefaultValue(
    script,
    (attributeName, fieldName),
    attribute,
    defaultValue |> Wonderjs.ScriptAttributeType.floatToScriptAttributeValue,
  );

let changeScriptAttributeFieldDefaultValueInt =
    (script, attributeName, fieldName, attribute, defaultValue) =>
  MainEditorScriptAttribute.Method._changeScriptAttributeFieldDefaultValue(
    script,
    (attributeName, fieldName),
    attribute,
    defaultValue |> Wonderjs.ScriptAttributeType.intToScriptAttributeValue,
  );

let blurScriptAttributeFieldDefaultValueFloat =
    (script, attributeName, fieldName, attribute, defaultValue) =>
  MainEditorScriptAttribute.Method._blurScriptAttributeFieldDefaultValue(
    (TestTool.buildEmptyAppState(), TestTool.getDispatch()),
    MainEditorScriptAttribute.Method._isFloatValueEqual,
    (
      script,
      attributeName,
      fieldName,
      attribute,
      defaultValue |> Wonderjs.ScriptAttributeType.floatToScriptAttributeValue,
    ),
  );