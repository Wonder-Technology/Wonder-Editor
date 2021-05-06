type assetData;

type state = {
  style: ReactDOMRe.Style.t,
  isShowAssetGroup: bool,
  currentAssetDataOpt: option(assetData),
};

external convertAssetDataTypeToInt: assetData => int = "%identity";

external convertIntToAssetDataType: int => assetData = "%identity";

external convertAssetDataTypeToString: assetData => string = "%identity";

external convertStringToAssetDataType: string => assetData = "%identity";

type action =
  | Nothing
  | DragEnter
  | DragLeave
  | SetAssetToEngine(TreeAssetType.tree)
  | ShowAssetGroup
  | HideAssetGroup
  | RemoveAsset;

module Method = {
  let isWidget = startWidget =>
    switch (startWidget) {
    | None => false
    | Some(widget) => widget == AssetWidgetService.getWidget()
    };

  let isTypeValid = (startNodeId, editorState) =>
    switch (startNodeId) {
    | None => false
    | Some(id) =>
      OperateTreeAssetEditorService.isNodeExistById(id, editorState)
    };

  let _isTriggerAction = (isWidgetFunc, isTypeValidFunc) => {
    let (widget, startNodeId) =
      StateEditorService.getState()
      |> CurrentDragSourceEditorService.getCurrentDragSource;

    isWidgetFunc(widget)
    && isTypeValidFunc(startNodeId, StateEditorService.getState());
  };

  let handleDragEnter = (isWidgetFunc, isTypeValidFunc, _event) =>
    _isTriggerAction(isWidgetFunc, isTypeValidFunc) ? DragEnter : Nothing;

  let handleDragLeave = (isWidgetFunc, isTypeValidFunc, event) => {
    ReactEventType.convertReactMouseEventToJsEvent(event)
    |> EventHelper.stopPropagation;

    _isTriggerAction(isWidgetFunc, isTypeValidFunc) ? DragLeave : Nothing;
  };

  let handleDragOver = event =>
    ReactEventType.convertReactMouseEventToJsEvent(event)
    |> EventHelper.preventDefault;

  let handleDragDrop = (isWidgetFunc, isTypeValidFunc, event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    let startNodeId = e |> DragUtils.getDragedId;

    EventHelper.preventDefault(e);

    _isTriggerAction(isWidgetFunc, isTypeValidFunc) ?
      SetAssetToEngine(
        OperateTreeAssetEditorService.unsafeFindNodeById(startNodeId)
        |> StateLogicService.getEditorState,
      ) :
      DragLeave;
  };

  let showAssetImage = (currentAssetDataOpt, getCurrentAssetImageSrcFunc) =>
    switch (currentAssetDataOpt) {
    | None => ReasonReact.null
    | Some(currentAssetData) =>
      <img
        src={
          getCurrentAssetImageSrcFunc(currentAssetData)
          |> StateLogicService.getStateToGetData
        }
      />
    };

  let _sortByName = (engineState, allAssetNodes) =>
    allAssetNodes
    |> Js.Array.sortInPlaceWith((node1, node2) =>
         Js.String.localeCompare(
           NodeNameAssetLogicService.getNodeName(node2, engineState)
           |> Js.String.charAt(0),
           NodeNameAssetLogicService.getNodeName(node1, engineState)
           |> Js.String.charAt(0),
         )
         |> NumberType.convertFloatToInt
       );

  let _buildAssetUIComponent =
      (
        (node, className),
        getAssetGroupSingleAssetImageSrcFunc,
        sendFunc,
        (editorState, engineState),
      ) =>
    <div
      className
      key={DomHelper.getRandomKey()}
      onClick={_e => sendFunc(SetAssetToEngine(node))}>
      <img
        src={
          getAssetGroupSingleAssetImageSrcFunc(
            node,
            (editorState, engineState),
          )
        }
        className="imgContent-img"
      />
      <div className="imgContent-text">
        {
          DomHelper.textEl(
            NodeNameAssetLogicService.getNodeName(node, engineState),
          )
        }
      </div>
    </div>;

  let showAssets =
      (
        state,
        isCurrentAssetFunc,
        getAssetGroupSingleAssetImageSrcFunc,
        sendFunc,
        findAllAssetRelatedDataFunc,
      ) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    findAllAssetRelatedDataFunc(editorState)
    |> _sortByName(engineState)
    |> Js.Array.map(node =>
         switch (state.currentAssetDataOpt) {
         | None =>
           _buildAssetUIComponent(
             (node, "select-item-imgContent"),
             getAssetGroupSingleAssetImageSrcFunc,
             sendFunc,
             (editorState, engineState),
           )
         | Some(currentAssetData) =>
           let className =
             isCurrentAssetFunc(currentAssetData, node) ?
               "select-item-imgContent select-item-active" :
               "select-item-imgContent";

           _buildAssetUIComponent(
             (node, className),
             getAssetGroupSingleAssetImageSrcFunc,
             sendFunc,
             (editorState, engineState),
           );
         }
       );
  };
};

let component = ReasonReact.reducerComponent("SelectAssetByImage");

let _handleSetAssetToEngine =
    (node, getCurrentAssetDataFromNodeFunc, onDropFunc, state) =>
  switch (state.currentAssetDataOpt) {
  | None =>
    ReasonReactUtils.updateWithSideEffects(
      {
        ...state,
        currentAssetDataOpt: Some(getCurrentAssetDataFromNodeFunc(node)),
      },
      _state =>
      onDropFunc(node)
    )
  | Some(sourceAssetData) =>
    let currentAssetData = getCurrentAssetDataFromNodeFunc(node);

    sourceAssetData === currentAssetData ?
      ReasonReact.NoUpdate :
      ReasonReactUtils.updateWithSideEffects(
        {...state, currentAssetDataOpt: Some(currentAssetData)}, _state =>
        onDropFunc(node)
      );
  };

let reducer = (getCurrentAssetDataFromNodeFunc, onDropFunc, action, state) =>
  switch (action) {
  | DragEnter =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp("border", "2px solid coral", state.style),
    })
  | DragLeave =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp(
          "border",
          "2px solid rgb(167,165,165)",
          state.style,
        ),
    })
  | SetAssetToEngine(node) =>
    _handleSetAssetToEngine(
      node,
      getCurrentAssetDataFromNodeFunc,
      onDropFunc,
      state,
    )
  | Nothing => ReasonReact.NoUpdate
  | ShowAssetGroup => ReasonReact.Update({...state, isShowAssetGroup: true})
  | HideAssetGroup => ReasonReact.Update({...state, isShowAssetGroup: false})
  | RemoveAsset => ReasonReact.Update({...state, currentAssetDataOpt: None})
  };

let _renderDragableImage =
    (
      {state, send}: ReasonReact.self('a, 'b, 'c),
      getCurrentAssetImageSrcFunc,
    ) =>
  <div
    className="texture-img" onClick={_e => send(ShowAssetGroup)} style={state.style}>
    <div
      className="img-dragBg"
      onDragEnter={
        _e =>
          send(
            Method.handleDragEnter(Method.isWidget, Method.isTypeValid, _e),
          )
      }
      onDragLeave={
        _e =>
          send(
            Method.handleDragLeave(Method.isWidget, Method.isTypeValid, _e),
          )
      }
      onDragOver=Method.handleDragOver
      onDrop={
        _e =>
          send(
            Method.handleDragDrop(Method.isWidget, Method.isTypeValid, _e),
          )
      }
    />
    {
      Method.showAssetImage(
        state.currentAssetDataOpt,
        getCurrentAssetImageSrcFunc,
      )
    }
  </div>;

let _renderAssetGroup =
    (
      assetGroupHeader,
      state,
      isCurrentAssetFunc,
      getAssetGroupSingleAssetImageSrcFunc,
      sendFunc,
      findAllAssetRelatedDataFunc,
    ) =>
  <div className="select-component-content">
    <div className="select-component-item">
      <div className="select-item-header">
        {DomHelper.textEl(assetGroupHeader)}
      </div>
      <div className="select-item-imgBody">
        <div className="imgBody-content">
          {
            ReasonReact.array(
              Method.showAssets(
                state,
                isCurrentAssetFunc,
                getAssetGroupSingleAssetImageSrcFunc,
                sendFunc,
                findAllAssetRelatedDataFunc,
              ),
            )
          }
        </div>
      </div>
    </div>
    <div
      className="select-component-bg"
      onClick={_e => sendFunc(HideAssetGroup)}
    />
  </div>;

let render =
    (
      (label, title, assetGroupHeader),
      (
        getCurrentAssetImageSrcFunc,
        getAssetGroupSingleAssetImageSrcFunc,
        isCurrentAssetFunc,
        renderAssetNameFunc,
        removeAssetFunc,
        findAllAssetRelatedDataFunc,
      ),
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article className="selectAssetByImage-item inspector-item">
    <div className="item-header" title> {DomHelper.textEl(label)} </div>
    <div className="item-content item-texture">
      {_renderDragableImage(self, getCurrentAssetImageSrcFunc)}
      {
        renderAssetNameFunc(state.currentAssetDataOpt)
        |> StateLogicService.getEngineStateToGetData
      }
      <button
        className="remove"
        onClick={
          e => {
            removeAssetFunc();

            send(RemoveAsset);
          }
        }>
        {DomHelper.textEl("Remove")}
      </button>
    </div>
    {
      state.isShowAssetGroup ?
        _renderAssetGroup(
          assetGroupHeader,
          state,
          isCurrentAssetFunc,
          getAssetGroupSingleAssetImageSrcFunc,
          send,
          findAllAssetRelatedDataFunc,
        ) :
        ReasonReact.null
    }
  </article>;
};

let make =
    (
      ~label,
      ~assetGroupHeader,
      ~currentAssetDataOpt,
      ~getCurrentAssetDataFromNodeFunc,
      ~onDropFunc,
      ~getCurrentAssetImageSrcFunc,
      ~getAssetGroupSingleAssetImageSrcFunc,
      ~isCurrentAssetFunc,
      ~renderAssetNameFunc,
      ~removeAssetFunc,
      ~findAllAssetRelatedDataFunc,
      ~isShowAssetGroup,
      ~title,
      _children,
    ) => {
  ...component,
  initialState: () => {
    style: ReactDOMRe.Style.make(~opacity="1", ()),
    isShowAssetGroup,
    currentAssetDataOpt,
  },
  reducer: reducer(getCurrentAssetDataFromNodeFunc, onDropFunc),
  render: self =>
    render(
      (label, title, assetGroupHeader),
      (
        getCurrentAssetImageSrcFunc,
        getAssetGroupSingleAssetImageSrcFunc,
        isCurrentAssetFunc,
        renderAssetNameFunc,
        removeAssetFunc,
        findAllAssetRelatedDataFunc,
      ),
      self,
    ),
};