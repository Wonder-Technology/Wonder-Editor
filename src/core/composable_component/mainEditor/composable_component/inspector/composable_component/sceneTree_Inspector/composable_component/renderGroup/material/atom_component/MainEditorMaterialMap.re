open AssetNodeType;

type state = {style: ReactDOMRe.Style.t};

type retainedProps = {map: option(int)};

type action =
  | Nothing
  | DragEnter
  | DragLeave
  | DragDrop(int);

module Method = {
  let isWidge = startWidge =>
    switch (startWidge) {
    | None => false
    | Some(widge) => widge == AssetUtils.getWidge()
    };

  let isTypeValid = (startId, editorState) =>
    switch (startId) {
    | None => false
    | Some(id) =>
      editorState
      |> AssetTextureNodeMapEditorService.getTextureNodeMap
      |> WonderCommonlib.SparseMapService.get(id)
      |> Js.Option.isSome
    };

  let _isTriggerAction = (isWidgeFunc, isTypeValidFunc) => {
    let (widge, startId) =
      StateEditorService.getState()
      |> CurrentDragSourceEditorService.getCurrentDragSource;

    isWidgeFunc(widge)
    && isTypeValidFunc(startId, StateEditorService.getState());
  };

  let handleDragEnter = (isWidgeFunc, isTypeValidFunc, _event) =>
    _isTriggerAction(isWidgeFunc, isTypeValidFunc) ? DragEnter : Nothing;

  let handleDragLeave = (isWidgeFunc, isTypeValidFunc, event) => {
    ReactEventType.convertReactMouseEventToJsEvent(event)
    |> DomHelper.stopPropagation;

    _isTriggerAction(isWidgeFunc, isTypeValidFunc) ? DragLeave : Nothing;
  };

  let handleDragOver = event =>
    ReactEventType.convertReactMouseEventToJsEvent(event)
    |> DomHelper.preventDefault;

  let handleDrop = (isWidgeFunc, isTypeValidFunc, event) => {
    let startId =
      ReactEventType.convertReactMouseEventToJsEvent(event)
      |> DragUtils.getDragedUid;

    _isTriggerAction(isWidgeFunc, isTypeValidFunc) ?
      DragDrop(startId) : DragLeave;
  };

  let showMapComponent = (materialComponent, getMapFunc) =>
    switch (
      getMapFunc(materialComponent)
      |> StateLogicService.getEngineStateToGetData
    ) {
    | None => <img src="./public/img/null.jpg" />
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

  let buildDragDiv = (state, send) =>
    <div
      style=state.style
      className="texture_ground"
      onDragEnter=(_e => send(handleDragEnter(isWidge, isTypeValid, _e)))
      onDragLeave=(_e => send(handleDragLeave(isWidge, isTypeValid, _e)))
      onDragOver=handleDragOver
      onDrop=(_e => send(handleDrop(isWidge, isTypeValid, _e)))
    />;
};

let component = ReasonReact.reducerComponent("MainEditorMaterialMap");

let reducer =
    ((store, dispatchFunc), (materialComponent, onDropFunc), action, state) =>
  switch (action) {
  | DragEnter =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp("border", "2px dashed blue", state.style),
    })

  | DragLeave =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("border", "1px solid red", state.style),
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
  <article className="wonder-material-texture">
    (Method.buildDragDiv(state, send))
    <span className=""> (DomHelper.textEl(label)) </span>
    (Method.showMapComponent(materialComponent, getMapFunc))
    <button
      className="texture_remove"
      onClick=(
        e => removeTextureFunc((store, dispatchFunc), (), materialComponent)
      )>
      (DomHelper.textEl("remove"))
    </button>
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