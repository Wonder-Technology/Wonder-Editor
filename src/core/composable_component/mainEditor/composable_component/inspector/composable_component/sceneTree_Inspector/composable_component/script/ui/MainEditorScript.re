type state = {
  currentScript: Wonderjs.ScriptType.script,
  isShowScriptEventFunctionGroupForAdd: bool,
  isShowScriptEventFunctionGroupForChange: bool,
  lastScriptEventFunctionNodeIdForAdd: option(int),
  lastScriptEventFunctionNodeIdForChange: option(int),
  unUsedScriptEventFunctionNodeIds: array(NodeAssetType.nodeId),
  isShowScriptAttributeGroupForAdd: bool,
  isShowScriptAttributeGroupForChange: bool,
  lastScriptAttributeNodeIdForAdd: option(int),
  lastScriptAttributeNodeIdForChange: option(int),
  unUsedScriptAttributeNodeIds: array(NodeAssetType.nodeId),
};

type action =
  | ChangeScriptEventFunctionForAdd(
      NodeAssetType.nodeId,
      array(NodeAssetType.nodeId),
    )
  | ChangeScriptEventFunctionForChange(
      NodeAssetType.nodeId,
      array(NodeAssetType.nodeId),
    )
  | ShowScriptEventFunctionGroupForAdd(
      NodeAssetType.nodeId,
      array(NodeAssetType.nodeId),
    )
  | ShowScriptEventFunctionGroupForChange(
      NodeAssetType.nodeId,
      array(NodeAssetType.nodeId),
    )
  | HideScriptEventFunctionGroupForAdd
  | HideScriptEventFunctionGroupForChange
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
  let _changeScriptEventFunction =
      (
        currentScript,
        currentScriptEventFunctionNodeIdOpt,
        targetScriptEventFunctionNodeId,
        (editorState, engineState),
      ) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|targetScriptEventFunctionNodeId not be used|j},
                  ~actual={j|be used|j},
                ),
                () => {
                  let (name, _) =
                    ScriptEventFunctionNodeAssetEditorService.getNameAndData(
                      targetScriptEventFunctionNodeId,
                      editorState,
                    );

                  ScriptEngineService.hasScriptEventFunctionData(
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

    let (targetName, targetEventFunctionData) =
      ScriptEventFunctionNodeAssetEditorService.getNameAndData(
        targetScriptEventFunctionNodeId,
        editorState,
      );

    switch (currentScriptEventFunctionNodeIdOpt) {
    | None =>
      ScriptEngineService.addScriptEventFunctionData(
        currentScript,
        targetName,
        targetEventFunctionData,
        engineState,
      )
    | Some(currentScriptEventFunctionNodeId) =>
      let (sourceName, _) =
        ScriptEventFunctionNodeAssetEditorService.getNameAndData(
          currentScriptEventFunctionNodeId,
          editorState,
        );

      ScriptEngineService.replaceScriptEventFunctionData(
        currentScript,
        (sourceName, targetName),
        targetEventFunctionData,
        engineState,
      );
    };
  };

  let isNodeIdEqual = (currentNodeIdOpt, targetNodeId) =>
    switch (currentNodeIdOpt) {
    | None => false
    | Some(currentNodeId) =>
      NodeAssetService.isIdEqual(currentNodeId, targetNodeId)
    };

  let _getUnUsedScriptEventFunctionNodes =
      (script, (editorState, engineState)) => {
    let allScriptEventFunctionNodes =
      ScriptEventFunctionNodeAssetEditorService.findAllScriptEventFunctionNodes(
        editorState,
      );

    let allEventFunctionNames =
      ScriptEngineService.getScriptAllEventFunctionEntries(
        script,
        engineState,
      )
      |> Js.Array.map(((eventFunctionName, _)) => eventFunctionName);

    ArrayService.excludeWithFunc(
      ScriptEngineService.getScriptAllEventFunctionEntries(
        script,
        engineState,
      ),
      (scriptAllEventFunctionEntries, scriptEventFunctionNode) =>
        allEventFunctionNames
        |> Js.Array.includes(
             ScriptEventFunctionNodeAssetService.getNodeName(
               scriptEventFunctionNode,
             ),
           ),
      allScriptEventFunctionNodes,
    );
  };

  let _getUnUsedScriptEventFunctionNodeIds =
      (script, (editorState, engineState)) =>
    _getUnUsedScriptEventFunctionNodes(script, (editorState, engineState))
    |> Js.Array.map(node => NodeAssetService.getNodeId(~node));

  let _sendShowScriptEventFunctionGroupForChange =
      (
        currentScript,
        scriptEventFunctionNodeId,
        send,
        (editorState, engineState),
      ) =>
    send(
      ShowScriptEventFunctionGroupForChange(
        scriptEventFunctionNodeId,
        _getUnUsedScriptEventFunctionNodeIds(
          currentScript,
          (editorState, engineState),
        ),
      ),
    );

  let _removeScriptEventFunction = (script, eventFunctionName, dispatchFunc) => {
    ScriptEngineService.removeScriptEventFunctionData(
      script,
      eventFunctionName,
    )
    |> StateLogicService.getAndSetEngineState;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };

  let renderScriptAllEventFunctions =
      (
        languageType,
        dispatchFunc,
        {state, send}: ReasonReact.self('a, 'b, 'c),
      ) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let {currentScript} = state;

    let unUsedScriptEventFunctionNodeIds =
      _getUnUsedScriptEventFunctionNodeIds(
        currentScript,
        (editorState, engineState),
      );

    ScriptEngineService.getScriptAllEventFunctionEntries(
      currentScript,
      engineState,
    )
    |> Js.Array.map(((name, attribute)) => {
         let scriptEventFunctionNodeId =
           OperateTreeAssetLogicService.findNodeIdByName(
             name,
             (editorState, engineState),
           )
           |> OptionService.unsafeGet;

         <div key={DomHelper.getRandomKey()}>
           <SelectAssetGroupBar
             headerText="Script Event Function"
             headerTitle={
               LanguageUtils.getInspectorLanguageDataByType(
                 "script-use-scriptEventFunction-describe",
                 languageType,
               )
             }
             itemText=name
             selectItemFunc={
               send =>
                 _sendShowScriptEventFunctionGroupForChange(
                   currentScript,
                   scriptEventFunctionNodeId,
                   send,
                 )
                 |> StateLogicService.getStateToGetData
             }
             sendFunc=send
           />
           <button
             className="scriptEventFunction-remove"
             onClick={
               e =>
                 _removeScriptEventFunction(currentScript, name, dispatchFunc)
             }>
             {DomHelper.textEl("Remove")}
           </button>
         </div>;
       });
  };

  let sortScriptEventFunctionNodeIds = scriptEventFunctionNodeIds =>
    scriptEventFunctionNodeIds |> Js.Array.sortInPlace;

  let handleChangeScriptEventFunction =
      (
        script,
        sendFunc,
        currentScriptEventFunctionNodeId,
        targetScriptEventFunctionNodeId,
      ) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|currentScriptEventFunctionNodeId|j},
                  ~actual={j|not|j},
                ),
                () =>
                currentScriptEventFunctionNodeId |> assertExist
              )
            )
          )
        ),
      StateEditorService.getStateIsDebug(),
    );

    isNodeIdEqual(
      currentScriptEventFunctionNodeId,
      targetScriptEventFunctionNodeId,
    ) ?
      () :
      {
        _changeScriptEventFunction(
          script,
          currentScriptEventFunctionNodeId,
          targetScriptEventFunctionNodeId,
        )
        |> StateLogicService.getStateToGetData
        |> StateEngineService.setState;

        sendFunc(
          targetScriptEventFunctionNodeId,
          _getUnUsedScriptEventFunctionNodeIds(script)
          |> StateLogicService.getStateToGetData,
        );
      };
  };

  let addScriptEventFunction = (languageType, (state, send)) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let {currentScript} = state;

    let unUsedScriptEventFunctionNodes =
      _getUnUsedScriptEventFunctionNodes(
        currentScript,
        (editorState, engineState),
      );

    unUsedScriptEventFunctionNodes |> Js.Array.length > 0 ?
      {
        let unUsedScriptEventFunctionNodeIds =
          unUsedScriptEventFunctionNodes
          |> Js.Array.map(node => NodeAssetService.getNodeId(~node));

        let (
          lastScriptEventFunctionNodeIdForAdd,
          unUsedScriptEventFunctionNodeIds,
        ) =
          unUsedScriptEventFunctionNodeIds |> ArrayService.removeFirst;

        let (name, data) =
          ScriptEventFunctionNodeAssetEditorService.getNameAndData(
            lastScriptEventFunctionNodeIdForAdd,
            editorState,
          );

        let engineState =
          ScriptEngineService.addScriptEventFunctionData(
            currentScript,
            name,
            data,
            engineState,
          );

        engineState |> StateEngineService.setState |> ignore;

        send(
          ShowScriptEventFunctionGroupForAdd(
            lastScriptEventFunctionNodeIdForAdd,
            unUsedScriptEventFunctionNodeIds,
          ),
        );
      } :
      ConsoleUtils.warn(
        LanguageUtils.getMessageLanguageDataByType(
          "need-add-scriptEventFunction",
          languageType,
        ),
      )
      |> StateLogicService.getEditorState;
  };

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

  /* let isNodeIdEqual = (currentNodeIdOpt, targetNodeId) =>
     switch (currentNodeIdOpt) {
     | None => false
     | Some(currentNodeId) =>
       NodeAssetService.isIdEqual(currentNodeId, targetNodeId)
     }; */

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
      /* TODO extract text ui */
      |> Js.Array.map(((fieldName, field)) => {
           let type_ =
             ScriptAttributeEngineService.unsafeGetScriptAttributeFieldType(
               fieldName,
               attribute,
             );

           <div
             key={DomHelper.getRandomKey()} className="scriptAttribute-field">
             <div className="text">
               <span
                 className="text-header"
                 title={
                   LanguageUtils.getInspectorLanguageDataByType(
                     "script-scriptAttribute-field-name-describe",
                     languageType,
                   )
                 }>
                 {DomHelper.textEl("Field Name")}
               </span>
               <span className="text-body">
                 {DomHelper.textEl(fieldName)}
               </span>
             </div>
             <div className="text">
               <span
                 className="text-header"
                 title={
                   LanguageUtils.getInspectorLanguageDataByType(
                     "script-scriptAttribute-field-type-describe",
                     languageType,
                   )
                 }>
                 {DomHelper.textEl("Type")}
               </span>
               <span className="text-body">
                 {
                   DomHelper.textEl(
                     ScriptAttributeTypeService.convertFieldTypeToJsObjStr(
                       type_,
                     ),
                   )
                 }
               </span>
             </div>
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
             itemText=name
             selectItemFunc={
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

    isNodeIdEqual(currentScriptAttributeNodeId, targetScriptAttributeNodeId) ?
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

  let getAllScriptEventFunctions =
      (currentScriptEventFunctionNodeId, unUsedScriptEventFunctionNodeIds) =>
    ArrayService.fastConcat(
      [|currentScriptEventFunctionNodeId |> OptionService.unsafeGet|],
      unUsedScriptEventFunctionNodeIds,
    )
    |> sortScriptEventFunctionNodeIds;

  let isScriptEventFunction =
      (currentScriptEventFunctionNodeId, scriptEventFunctionNodeId) =>
    isNodeIdEqual(
      currentScriptEventFunctionNodeId,
      scriptEventFunctionNodeId,
    );

  let getSelectScriptEventFunctionGroupWidgetText = scriptEventFunctionNodeId =>
    OperateTreeAssetLogicService.unsafeGetNodeNameById(
      scriptEventFunctionNodeId,
    )
    |> StateLogicService.getStateToGetData;

  let getAllScriptAttributes =
      (currentScriptAttributeNodeId, unUsedScriptAttributeNodeIds) =>
    ArrayService.fastConcat(
      [|currentScriptAttributeNodeId |> OptionService.unsafeGet|],
      unUsedScriptAttributeNodeIds,
    )
    |> sortScriptAttributeNodeIds;

  let isScriptAttribute =
      (currentScriptAttributeNodeId, scriptAttributeNodeId) =>
    isNodeIdEqual(currentScriptAttributeNodeId, scriptAttributeNodeId);

  let getSelectScriptAttributeGroupWidgetText = scriptAttributeNodeId =>
    OperateTreeAssetLogicService.unsafeGetNodeNameById(scriptAttributeNodeId)
    |> StateLogicService.getStateToGetData;
};

let component = ReasonReact.reducerComponent("MainEditorScript");

let reducer = (action, state) =>
  switch (action) {
  | ChangeScriptEventFunctionForAdd(
      targetScriptEventFunctionNodeId,
      unUsedScriptEventFunctionNodeIds,
    ) =>
    ReasonReact.Update({
      ...state,
      lastScriptEventFunctionNodeIdForAdd:
        Some(targetScriptEventFunctionNodeId),
      unUsedScriptEventFunctionNodeIds,
    })
  | ChangeScriptEventFunctionForChange(
      targetScriptEventFunctionNodeId,
      unUsedScriptEventFunctionNodeIds,
    ) =>
    ReasonReact.Update({
      ...state,
      lastScriptEventFunctionNodeIdForChange:
        Some(targetScriptEventFunctionNodeId),
      unUsedScriptEventFunctionNodeIds,
    })
  | ShowScriptEventFunctionGroupForAdd(
      lastScriptEventFunctionNodeIdForAdd,
      unUsedScriptEventFunctionNodeIds,
    ) =>
    ReasonReact.Update({
      ...state,
      isShowScriptEventFunctionGroupForAdd: true,
      lastScriptEventFunctionNodeIdForAdd:
        Some(lastScriptEventFunctionNodeIdForAdd),
      unUsedScriptEventFunctionNodeIds,
    })
  | ShowScriptEventFunctionGroupForChange(
      lastScriptEventFunctionNodeIdForChange,
      unUsedScriptEventFunctionNodeIds,
    ) =>
    ReasonReact.Update({
      ...state,
      isShowScriptEventFunctionGroupForChange: true,
      lastScriptEventFunctionNodeIdForChange:
        Some(lastScriptEventFunctionNodeIdForChange),
      unUsedScriptEventFunctionNodeIds,
    })
  | HideScriptEventFunctionGroupForAdd =>
    ReasonReact.Update({
      ...state,
      isShowScriptEventFunctionGroupForAdd: false,
      lastScriptEventFunctionNodeIdForAdd: None,
    })
  | HideScriptEventFunctionGroupForChange =>
    ReasonReact.Update({
      ...state,
      isShowScriptEventFunctionGroupForChange: false,
      lastScriptEventFunctionNodeIdForChange: None,
    })

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
      state.isShowScriptEventFunctionGroupForAdd ?
        <SelectAssetGroupWidget
          headerText="Add Script Event Function"
          sendFunc=send
          clickHideGroupButtonFunc={
            send => send(HideScriptEventFunctionGroupForAdd)
          }
          getAllItemsFunc={
            () =>
              Method.getAllScriptEventFunctions(
                state.lastScriptEventFunctionNodeIdForAdd,
                state.unUsedScriptEventFunctionNodeIds,
              )
          }
          isItemFunc={
            scriptEventFunctionNodeId => {
              let currentScriptEventFunctionNodeId =
                state.lastScriptEventFunctionNodeIdForAdd;

              Method.isScriptEventFunction(
                currentScriptEventFunctionNodeId,
                scriptEventFunctionNodeId,
              );
            }
          }
          changeItemFunc={
            (scriptEventFunctionNodeId, send) => {
              let currentScriptEventFunctionNodeId =
                state.lastScriptEventFunctionNodeIdForAdd;

              Method.handleChangeScriptEventFunction(
                state.currentScript,
                (
                  targetScriptEventFunctionNodeId,
                  unUsedScriptEventFunctionNodeIds,
                ) =>
                  send(
                    ChangeScriptEventFunctionForAdd(
                      targetScriptEventFunctionNodeId,
                      unUsedScriptEventFunctionNodeIds,
                    ),
                  ),
                currentScriptEventFunctionNodeId,
                scriptEventFunctionNodeId,
              );
            }
          }
          getTextFunc=Method.getSelectScriptEventFunctionGroupWidgetText
        /> :
        ReasonReact.null
    }
    {
      state.isShowScriptEventFunctionGroupForChange ?
        <SelectAssetGroupWidget
          headerText="Change Script Event Function"
          sendFunc=send
          clickHideGroupButtonFunc={
            send => send(HideScriptEventFunctionGroupForChange)
          }
          getAllItemsFunc={
            () =>
              Method.getAllScriptEventFunctions(
                state.lastScriptEventFunctionNodeIdForChange,
                state.unUsedScriptEventFunctionNodeIds,
              )
          }
          isItemFunc={
            scriptEventFunctionNodeId => {
              let currentScriptEventFunctionNodeId =
                state.lastScriptEventFunctionNodeIdForChange;

              Method.isScriptEventFunction(
                currentScriptEventFunctionNodeId,
                scriptEventFunctionNodeId,
              );
            }
          }
          changeItemFunc={
            (scriptEventFunctionNodeId, send) => {
              let currentScriptEventFunctionNodeId =
                state.lastScriptEventFunctionNodeIdForChange;

              Method.handleChangeScriptEventFunction(
                state.currentScript,
                (
                  targetScriptEventFunctionNodeId,
                  unUsedScriptEventFunctionNodeIds,
                ) =>
                  send(
                    ChangeScriptEventFunctionForChange(
                      targetScriptEventFunctionNodeId,
                      unUsedScriptEventFunctionNodeIds,
                    ),
                  ),
                currentScriptEventFunctionNodeId,
                scriptEventFunctionNodeId,
              );
            }
          }
          getTextFunc=Method.getSelectScriptEventFunctionGroupWidgetText
        /> :
        ReasonReact.null
    }
    {
      ReasonReact.array(
        Method.renderScriptAllEventFunctions(
          languageType,
          dispatchFunc,
          self,
        ),
      )
    }
    <button
      className="addable-btn"
      onClick={
        _e => Method.addScriptEventFunction(languageType, (state, send))
      }>
      {
        DomHelper.textEl(
          LanguageUtils.getInspectorLanguageDataByType(
            "script-add-scriptEventFunction",
            languageType,
          ),
        )
      }
    </button>
    {
      state.isShowScriptAttributeGroupForAdd ?
        <SelectAssetGroupWidget
          headerText="Add Script Attribute"
          sendFunc=send
          clickHideGroupButtonFunc={
            send => send(HideScriptAttributeGroupForAdd)
          }
          getAllItemsFunc={
            () =>
              Method.getAllScriptAttributes(
                state.lastScriptAttributeNodeIdForAdd,
                state.unUsedScriptAttributeNodeIds,
              )
          }
          isItemFunc={
            scriptAttributeNodeId => {
              let currentScriptAttributeNodeId =
                state.lastScriptAttributeNodeIdForAdd;

              Method.isScriptAttribute(
                currentScriptAttributeNodeId,
                scriptAttributeNodeId,
              );
            }
          }
          changeItemFunc={
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
          getAllItemsFunc={
            () =>
              Method.getAllScriptAttributes(
                state.lastScriptAttributeNodeIdForChange,
                state.unUsedScriptAttributeNodeIds,
              )
          }
          isItemFunc={
            scriptAttributeNodeId => {
              let currentScriptAttributeNodeId =
                state.lastScriptAttributeNodeIdForChange;

              Method.isScriptAttribute(
                currentScriptAttributeNodeId,
                scriptAttributeNodeId,
              );
            }
          }
          changeItemFunc={
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
    isShowScriptEventFunctionGroupForAdd: false,
    isShowScriptEventFunctionGroupForChange: false,
    lastScriptEventFunctionNodeIdForAdd: None,
    lastScriptEventFunctionNodeIdForChange: None,
    unUsedScriptEventFunctionNodeIds:
      WonderCommonlib.ArrayService.createEmpty(),
    isShowScriptAttributeGroupForAdd: false,
    isShowScriptAttributeGroupForChange: false,
    lastScriptAttributeNodeIdForAdd: None,
    lastScriptAttributeNodeIdForChange: None,
    unUsedScriptAttributeNodeIds: WonderCommonlib.ArrayService.createEmpty(),
  },
  reducer,
  render: self => render((uiState, dispatchFunc), self),
};