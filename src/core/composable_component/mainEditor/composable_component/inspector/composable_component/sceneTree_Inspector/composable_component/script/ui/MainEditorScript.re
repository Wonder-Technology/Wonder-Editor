type state = {
  isShowScriptEventFunctionGroupForAdd: bool,
  isShowScriptEventFunctionGroupForChange: bool,
  currentScript: Wonderjs.ScriptType.script,
  lastScriptEventFunctionNodeIdForAdd: option(int),
  lastScriptEventFunctionNodeIdForChange: option(int),
  unUsedScriptEventFunctionNodeIds: array(NodeAssetType.nodeId),
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
  | HideScriptEventFunctionGroupForChange;

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

  let _isNodeIdEqual = (currentNodeIdOpt, targetNodeId) =>
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

  /* TODO refactor: extract select asset ui component(e.g. select scriptEventFunction/geometry) */
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
    |> Js.Array.map(((name, eventFunctionData)) => {
         let scriptEventFunctionNodeId =
           OperateTreeAssetLogicService.findNodeIdByName(
             name,
             (editorState, engineState),
           )
           |> OptionService.unsafeGet;

         <div key={DomHelper.getRandomKey()} className="inspector-item">
           <div
             className="item-header"
             title={
               LanguageUtils.getInspectorLanguageDataByType(
                 "script-use-scriptEventFunction-describe",
                 languageType,
               )
             }>
             {DomHelper.textEl("Script Event Function")}
           </div>
           <div className="item-content">
             <div className="inspector-select">
               <div
                 className="select-name"
                 onClick={
                   _e =>
                     _sendShowScriptEventFunctionGroupForChange(
                       currentScript,
                       scriptEventFunctionNodeId,
                       send,
                     )
                     |> StateLogicService.getStateToGetData
                 }>
                 {DomHelper.textEl(name)}
               </div>
               <div
                 className="select-img"
                 onClick={
                   _e =>
                     _sendShowScriptEventFunctionGroupForChange(
                       currentScript,
                       scriptEventFunctionNodeId,
                       send,
                     )
                     |> StateLogicService.getStateToGetData
                 }>
                 <img src="./public/img/select.png" />
               </div>
             </div>
           </div>
           <button
             className="scriptEventFunction-field-remove"
             onClick={
               e =>
                 _removeScriptEventFunction(currentScript, name, dispatchFunc)
             }>
             {DomHelper.textEl("Remove")}
           </button>
         </div>;
       });
  };

  let _sortScriptEventFunctionNodeIds = scriptEventFunctionNodeIds =>
    scriptEventFunctionNodeIds |> Js.Array.sortInPlace;

  let showScriptEventFunctionAssets =
      (
        unUsedScriptEventFunctionNodeIds,
        currentScriptEventFunctionNodeId,
        changeScriptEventFunctionFunc,
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

    ArrayService.fastConcat(
      [|currentScriptEventFunctionNodeId |> OptionService.unsafeGet|],
      unUsedScriptEventFunctionNodeIds,
    )
    |> _sortScriptEventFunctionNodeIds
    |> Js.Array.map(scriptEventFunctionNodeId => {
         let className =
           _isNodeIdEqual(
             currentScriptEventFunctionNodeId,
             scriptEventFunctionNodeId,
           ) ?
             "select-item-content select-item-active" : "select-item-content";

         <div
           className
           key={DomHelper.getRandomKey()}
           onClick={
             _e =>
               changeScriptEventFunctionFunc(
                 currentScriptEventFunctionNodeId,
                 scriptEventFunctionNodeId,
               )
           }>
           {
             DomHelper.textEl(
               OperateTreeAssetLogicService.unsafeGetNodeNameById(
                 scriptEventFunctionNodeId,
               )
               |> StateLogicService.getStateToGetData,
             )
           }
         </div>;
       });
  };

  let _handleChangeScriptEventFunction =
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

    _isNodeIdEqual(
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

  let renderScriptEventFunctionGroupForChange =
      ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    <div className="select-component-content">
      <div className="select-component-item">
        <div className="select-item-header">
          {DomHelper.textEl("Change Script Event Function")}
        </div>
        <div className="select-item-body">
          {
            ReasonReact.array(
              showScriptEventFunctionAssets(
                state.unUsedScriptEventFunctionNodeIds,
                state.lastScriptEventFunctionNodeIdForChange,
                _handleChangeScriptEventFunction(
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
                  )
                ),
              ),
            )
          }
        </div>
      </div>
      <div
        className="select-component-bg"
        onClick={_e => send(HideScriptEventFunctionGroupForChange)}
      />
    </div>;

  let renderScriptEventFunctionGroupForAdd =
      ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    <div className="select-component-content">
      <div className="select-component-item">
        <div className="select-item-header">
          {DomHelper.textEl("Add Script Event Function")}
        </div>
        <div className="select-item-body">
          {
            ReasonReact.array(
              showScriptEventFunctionAssets(
                state.unUsedScriptEventFunctionNodeIds,
                state.lastScriptEventFunctionNodeIdForAdd,
                _handleChangeScriptEventFunction(
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
                  )
                ),
              ),
            )
          }
        </div>
      </div>
      <div
        className="select-component-bg"
        onClick={_e => send(HideScriptEventFunctionGroupForAdd)}
      />
    </div>;

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
        Method.renderScriptEventFunctionGroupForAdd(self) : ReasonReact.null
    }
    {
      state.isShowScriptEventFunctionGroupForChange ?
        Method.renderScriptEventFunctionGroupForChange(self) :
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
  </article>;
};

let make =
    (
      ~uiState,
      ~dispatchFunc,
      ~script,
      ~isShowScriptEventFunctionGroupForAdd=false,
      ~isShowScriptEventFunctionGroupForChange=false,
      _children,
    ) => {
  ...component,
  initialState: () => {
    currentScript: script,
    isShowScriptEventFunctionGroupForAdd,
    isShowScriptEventFunctionGroupForChange,
    lastScriptEventFunctionNodeIdForAdd: None,
    lastScriptEventFunctionNodeIdForChange: None,
    unUsedScriptEventFunctionNodeIds:
      WonderCommonlib.ArrayService.createEmpty(),
  },
  reducer,
  render: self => render((uiState, dispatchFunc), self),
};