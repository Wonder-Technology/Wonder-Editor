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
  let _changeScriptAttribute =
      (
        currentScript,
        currentScriptAttributeNodeIdOpt,
        targetScriptAttributeNodeId,
        (editorState, engineState),
      ) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|targetScriptAttributeNodeId not be used|j},
                  ~actual={j|be used|j},
                ),
                () => {
                  let (name, _) =
                    ScriptAttributeNodeAssetEditorService.getNameAndAttribute(
                      targetScriptAttributeNodeId,
                      editorState,
                    );

                  ScriptEngineService.hasScriptAttributeData(
                    currentScript,
                    name,
                    engineState,
                  )
                  |> assertFalse;
                },
              )
            )
          )
        ),
      StateEditorService.getStateIsDebug(),
    );

    let (targetName, targetAttribute) =
      ScriptAttributeNodeAssetEditorService.getNameAndAttribute(
        targetScriptAttributeNodeId,
        editorState,
      );

    switch (currentScriptAttributeNodeIdOpt) {
    | None =>
      ScriptEngineService.addScriptAttribute(
        currentScript,
        targetName,
        targetAttribute,
        engineState,
      )
    | Some(currentScriptAttributeNodeId) =>
      let (sourceName, _) =
        ScriptAttributeNodeAssetEditorService.getNameAndAttribute(
          currentScriptAttributeNodeId,
          editorState,
        );

      ScriptEngineService.replaceScriptAttribute(
        currentScript,
        (sourceName, targetName),
        targetAttribute,
        engineState,
      );
    };
  };

  let _getUnUsedScriptAttributeNodes = (script, (editorState, engineState)) => {
    let allScriptAttributeNodes =
      ScriptAttributeNodeAssetEditorService.findAllScriptAttributeNodes(
        editorState,
      );

    let scriptAllAttributeEntries =
      ScriptEngineService.getScriptAllAttributeEntries(script, engineState);

    let allAttributeNames =
      scriptAllAttributeEntries
      |> Js.Array.map(((eventFunctionName, _)) => eventFunctionName);

    ArrayService.excludeWithFunc(
      scriptAllAttributeEntries,
      (scriptAllAttributeEntries, scriptAttributeNode) =>
        allAttributeNames
        |> Js.Array.includes(
             ScriptAttributeNodeAssetService.getNodeName(scriptAttributeNode),
           ),
      allScriptAttributeNodes,
    );
  };

  let _getUnUsedScriptAttributeNodeIds = (script, (editorState, engineState)) =>
    _getUnUsedScriptAttributeNodes(script, (editorState, engineState))
    |> Js.Array.map(node => NodeAssetService.getNodeId(~node));

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
        _getUnUsedScriptAttributeNodeIds(
          currentScript,
          (editorState, engineState),
        ),
      ),
    );

  let _removeScriptAttribute = (script, attributeName, dispatchFunc) => {
    ScriptEngineService.removeScriptAttribute(script, attributeName)
    |> StateLogicService.getAndSetEngineState;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };

  let _changeScriptAttributeFieldDefaultValue =
      (script, attributeName, fieldName, attribute, defaultValue, engineState) =>
    ScriptEngineService.setScriptAttributeFieldDefaultValueAndValue(
      script,
      attributeName,
      fieldName,
      defaultValue |> Wonderjs.ScriptAttributeType.floatToScriptAttributeValue,
      engineState,
    );

  let _renderScriptAttributeFieldDefaultValue =
      (languageType, script, attributeName, fieldName, type_, attribute) =>
    Wonderjs.(
      ScriptAttributeType.
        /* TODO handle Int: add MainEditorIntInputBaseComponent */
        (
          switch (type_) {
          | Float =>
            <MainEditorFloatInputBaseComponent
              label="Default Value"
              title={
                LanguageUtils.getInspectorLanguageDataByType(
                  "script-scriptAttribute-field-defaultValue-describe",
                  languageType,
                )
              }
              defaultValue={
                ScriptAttributeEngineService.unsafeGetScriptAttributeFieldDefaultValue(
                  fieldName,
                  attribute,
                )
                |> Wonderjs.ScriptAttributeType.scriptAttributeValueToFloat
              }
              changeComponentValueFunc=(
                value =>
                  _changeScriptAttributeFieldDefaultValue(
                    script,
                    attributeName,
                    fieldName,
                    attribute,
                    value,
                  )
                  |> StateLogicService.getAndSetEngineState
              )
              blurValueFunc=(
                value =>
                  /* TODO redo-undo */
                  ()
              )
              dragDropFunc=(
                value =>
                  /* TODO redo-undo */
                  ()
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
      (languageType, script, attributeName, attribute) =>
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
             <Text
               headerText="Field Name"
               headerTitle={
                 LanguageUtils.getInspectorLanguageDataByType(
                   "script-scriptAttribute-field-name-describe",
                   languageType,
                 )
               }
               bodyText=fieldName
             />
             <Text
               headerText="Type"
               headerTitle={
                 LanguageUtils.getInspectorLanguageDataByType(
                   "script-scriptAttribute-field-type-describe",
                   languageType,
                 )
               }
               bodyText={
                 ScriptAttributeTypeService.convertFieldTypeToJsObjStr(type_)
               }
             />
             {
               _renderScriptAttributeFieldDefaultValue(
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
        languageType,
        dispatchFunc,
        {state, send}: ReasonReact.self('a, 'b, 'c),
      ) => {
    let {currentScript} = state;

    let unUsedScriptAttributeNodeIds =
      _getUnUsedScriptAttributeNodeIds(currentScript)
      |> StateLogicService.getStateToGetData;

    ScriptEngineService.getScriptAllAttributeEntries(currentScript)
    |> StateLogicService.getEngineStateToGetData
    |> Js.Array.map(((name, attribute)) => {
         let scriptAttributeNodeId =
           OperateTreeAssetLogicService.findNodeIdByName(name)
           |> StateLogicService.getStateToGetData
           |> OptionService.unsafeGet;

         <div key={DomHelper.getRandomKey()}>
           <SelectAssetGroupBar
             headerText="Script Attribute"
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
           <button
             className="scriptAttribute-remove"
             onClick={
               e => _removeScriptAttribute(currentScript, name, dispatchFunc)
             }>
             {DomHelper.textEl("Remove")}
           </button>
           <div className="scriptAttribute-fields">
             {
               _renderScriptAttributeFields(
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

  let handleChangeScriptAttribute =
      (
        script,
        sendFunc,
        currentScriptAttributeNodeId,
        targetScriptAttributeNodeId,
      ) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|currentScriptAttributeNodeId|j},
                  ~actual={j|not|j},
                ),
                () =>
                currentScriptAttributeNodeId |> assertExist
              )
            )
          )
        ),
      StateEditorService.getStateIsDebug(),
    );

    MainEditorScriptUtils.isNodeIdEqual(
      currentScriptAttributeNodeId,
      targetScriptAttributeNodeId,
    ) ?
      () :
      {
        _changeScriptAttribute(
          script,
          currentScriptAttributeNodeId,
          targetScriptAttributeNodeId,
        )
        |> StateLogicService.getStateToGetData
        |> StateEngineService.setState;

        sendFunc(
          targetScriptAttributeNodeId,
          _getUnUsedScriptAttributeNodeIds(script)
          |> StateLogicService.getStateToGetData,
        );
      };
  };

  let addScriptAttribute = (languageType, (state, send)) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let {currentScript} = state;

    let unUsedScriptAttributeNodes =
      _getUnUsedScriptAttributeNodes(
        currentScript,
        (editorState, engineState),
      );

    unUsedScriptAttributeNodes |> Js.Array.length > 0 ?
      {
        let unUsedScriptAttributeNodeIds =
          unUsedScriptAttributeNodes
          |> Js.Array.map(node => NodeAssetService.getNodeId(~node));

        let (lastScriptAttributeNodeIdForAdd, unUsedScriptAttributeNodeIds) =
          unUsedScriptAttributeNodeIds |> ArrayService.removeFirst;

        let (name, attribute) =
          ScriptAttributeNodeAssetEditorService.getNameAndAttribute(
            lastScriptAttributeNodeIdForAdd,
            editorState,
          );

        let engineState =
          ScriptEngineService.addScriptAttribute(
            currentScript,
            name,
            attribute,
            engineState,
          );

        engineState |> StateEngineService.setState |> ignore;

        send(
          ShowScriptAttributeGroupForAdd(
            lastScriptAttributeNodeIdForAdd,
            unUsedScriptAttributeNodeIds,
          ),
        );
      } :
      ConsoleUtils.warn(
        LanguageUtils.getMessageLanguageDataByType(
          "need-add-scriptAttribute",
          languageType,
        ),
      )
      |> StateLogicService.getEditorState;
  };

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

  <article key="MainEditorScript" className="wonder-inspector-script">
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
                state.currentScript,
                (targetScriptAttributeNodeId, unUsedScriptAttributeNodeIds) =>
                  send(
                    ChangeScriptAttributeForAdd(
                      targetScriptAttributeNodeId,
                      unUsedScriptAttributeNodeIds,
                    ),
                  ),
                currentScriptAttributeNodeId,
                scriptAttributeNodeId,
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
                state.currentScript,
                (targetScriptAttributeNodeId, unUsedScriptAttributeNodeIds) =>
                  send(
                    ChangeScriptAttributeForChange(
                      targetScriptAttributeNodeId,
                      unUsedScriptAttributeNodeIds,
                    ),
                  ),
                currentScriptAttributeNodeId,
                scriptAttributeNodeId,
              );
            }
          }
          getTextFunc=Method.getSelectScriptAttributeGroupWidgetText
        /> :
        ReasonReact.null
    }
    {
      ReasonReact.array(
        Method.renderScriptAllAttributes(languageType, dispatchFunc, self),
      )
    }
    <button
      className="addable-btn"
      onClick={_e => Method.addScriptAttribute(languageType, (state, send))}>
      {
        DomHelper.textEl(
          LanguageUtils.getInspectorLanguageDataByType(
            "script-add-scriptAttribute",
            languageType,
          ),
        )
      }
    </button>
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