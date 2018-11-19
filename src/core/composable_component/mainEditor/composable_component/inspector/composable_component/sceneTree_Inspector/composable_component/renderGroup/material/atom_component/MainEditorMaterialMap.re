open AssetNodeType;

type state = {style: ReactDOMRe.Style.t};

type retainedProps = {map: option(int)};

type action =
  | Nothing
  | DragEnter
  | DragLeave
  | DragDrop(int);

module Method = {
  let isWidget = startWidget =>
    switch (startWidget) {
    | None => false
    | Some(widget) => widget == AssetUtils.getWidget()
    };

  let isTypeValid = (startId, editorState) =>
    switch (startId) {
    | None => false
    | Some(id) =>
      editorState
      |> TextureNodeMapAssetEditorService.getTextureNodeMap
      |> WonderCommonlib.SparseMapService.get(id)
      |> Js.Option.isSome
    };

  let _isTriggerAction = (isWidgetFunc, isTypeValidFunc) => {
    let (widget, startId) =
      StateEditorService.getState()
      |> CurrentDragSourceEditorService.getCurrentDragSource;

    isWidgetFunc(widget)
    && isTypeValidFunc(startId, StateEditorService.getState());
  };

  let handleDragEnter = (isWidgetFunc, isTypeValidFunc, _event) =>
    _isTriggerAction(isWidgetFunc, isTypeValidFunc) ? DragEnter : Nothing;

  let handleDragLeave = (isWidgetFunc, isTypeValidFunc, event) => {
    ReactEventType.convertReactMouseEventToJsEvent(event)
    |> DomHelper.stopPropagation;

    _isTriggerAction(isWidgetFunc, isTypeValidFunc) ? DragLeave : Nothing;
  };

  let handleDragOver = event =>
    ReactEventType.convertReactMouseEventToJsEvent(event)
    |> DomHelper.preventDefault;

  let handleDrop = (isWidgetFunc, isTypeValidFunc, event) => {
    let startId =
      ReactEventType.convertReactMouseEventToJsEvent(event)
      |> DragUtils.getDragedId;

    _isTriggerAction(isWidgetFunc, isTypeValidFunc) ?
      DragDrop(startId) : DragLeave;
  };

  let showMapComponent = (materialComponent, getMapFunc) =>
    switch (
      getMapFunc(materialComponent)
      |> StateLogicService.getEngineStateToGetData
    ) {
    | None => ReasonReact.null
    | Some(map) =>
      let source =
        BasicSourceTextureEngineService.unsafeGetSource(
          map,
          StateEngineService.unsafeGetState(),
        );

      <img
        src=ImageType.convertImageElementToSrcImageElements(source)##src
      />;
    };
};

let component = ReasonReact.reducerComponent("MainEditorMaterialMap");

let reducer =
    ((store, dispatchFunc), (materialComponent, onDropFunc), action, state) =>
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

  | DragDrop(startId) =>
    ReasonReactUtils.sideEffects(() =>
      onDropFunc((store, dispatchFunc), materialComponent, startId)
    )

  | Nothing => ReasonReact.NoUpdate
  };
let render =
    (
      (store, dispatchFunc),
      (materialComponent, label),
      (getMapFunc, removeTextureFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="inspector-item">
    <div className="item-header"> (DomHelper.textEl(label)) </div>
    <div className="item-content item-texture">
      <div className="texture-img" style=state.style>
        <div
          className="img-dragBg"
          onDragEnter=(
            _e =>
              send(
                Method.handleDragEnter(
                  Method.isWidget,
                  Method.isTypeValid,
                  _e,
                ),
              )
          )
          onDragLeave=(
            _e =>
              send(
                Method.handleDragLeave(
                  Method.isWidget,
                  Method.isTypeValid,
                  _e,
                ),
              )
          )
          onDragOver=Method.handleDragOver
          onDrop=(
            _e =>
              send(
                Method.handleDrop(Method.isWidget, Method.isTypeValid, _e),
              )
          )
        />
        (Method.showMapComponent(materialComponent, getMapFunc))
      </div>
      <button
        className="texture-remove"
        onClick=(
          e =>
            removeTextureFunc((store, dispatchFunc), (), materialComponent)
        )>
        (DomHelper.textEl("Remove"))
      </button>
    </div>
  </article>;

let make =
    (
      ~store: AppStore.appState,
      ~dispatchFunc,
      ~materialComponent,
      ~label,
      ~getMapFunc,
      ~onDropFunc,
      ~removeTextureFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {style: ReactDOMRe.Style.make(~opacity="1", ())},
  reducer: reducer((store, dispatchFunc), (materialComponent, onDropFunc)),
  render: self =>
    render(
      (store, dispatchFunc),
      (materialComponent, label),
      (getMapFunc, removeTextureFunc),
      self,
    ),
};