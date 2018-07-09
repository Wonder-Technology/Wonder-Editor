open AssetNodeType;
open DiffType;

type state = {style: ReactDOMRe.Style.t};

type retainedProps = {
  color: string,
  map: option(int),
};

type action =
  | Nothing
  | DragEnter
  | DragLeave
  | DragDrop(int);

module Method = {
  let handleFlag = startFlag =>
    switch (startFlag) {
    | None => false
    | Some(flag) => flag == AssetTreeUtils.getFlag()
    };

  let handleTypeValid = (startId, assetState) =>
    switch (startId) {
    | None => false
    | Some(id) =>
      assetState
      |> TextureNodeMapAssetService.unsafeGetTextureNodeMap
      |> WonderCommonlib.SparseMapService.get(id)
      |> Js.Option.isSome
    };

  let setMaterialColor = MainEditorMaterialMarkRedoUndoEventHandler.MakeEventHandler.onMarkRedoUndoByStackLastReturnStore;

  let onDrop = MainEditorMaterialDragEventHandler.MakeEventHandler.onMarkRedoUndoByStackLastReturnStore;

  let removeTexture = ((store, dispatchFunc), (), materialComponent) =>
    switch (
      BasicMaterialEngineService.getMap(materialComponent)
      |> StateLogicService.getEngineStateToGetData
    ) {
    | None => ()
    | Some(_mapId) =>
      WonderLog.Log.print("set map is null") |> ignore;
      MainEditorSceneTreeClickEventHandler.MakeEventHandler.onClick(
        (store, dispatchFunc),
        (),
        materialComponent,
      );
    };

  let _isTriggerEvent = (handleFlagFunc, handleTypeValidFunc) => {
    let (flag, startId) =
      StateEditorService.getState()
      |> CurrentDragSourceEditorService.getCurrentDragSource;

    handleFlagFunc(flag)
    && handleTypeValidFunc(startId, StateAssetService.getState());
  };

  let handleDragEnter = (handleFlagFunc, handleTypeValidFunc, _event) =>
    _isTriggerEvent(handleFlagFunc, handleTypeValidFunc) ?
      DragEnter : Nothing;

  let handleDragLeave = (handleFlagFunc, handleTypeValidFunc, event) => {
    ReactEvent.convertReactMouseEventToJsEvent(event)
    |> DomHelper.stopPropagation;

    _isTriggerEvent(handleFlagFunc, handleTypeValidFunc) ?
      DragLeave : Nothing;
  };

  let handleDragOver = event =>
    ReactEvent.convertReactMouseEventToJsEvent(event)
    |> DomHelper.preventDefault;

  let handleDrop = (handleFlagFunc, handleTypeValidFunc, event) => {
    let startId =
      ReactEvent.convertReactMouseEventToJsEvent(event)
      |> DragUtils.getDragedUid;

    _isTriggerEvent(handleFlagFunc, handleTypeValidFunc) ?
      DragDrop(startId) : DragLeave;
  };
};

let component =
  ReasonReact.reducerComponentWithRetainedProps("MainEditorBasicMaterial");

let reducer = ((store, dispatchFunc), materialComponent, action, state) =>
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
      Method.onDrop((store, dispatchFunc), materialComponent, startId)
    )

  | Nothing => ReasonReact.NoUpdate
  };

let render =
    (
      (store, dispatchFunc),
      materialComponent,
      {state, retainedProps, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-inspector-material">
    <StringInput
      defaultValue=retainedProps.color
      label="color"
      onBlur=(
        Method.setMaterialColor((store, dispatchFunc), materialComponent)
      )
    />
    <div className="material-texture">
      <div
        style=state.style
        className="texture_ground"
        onDragEnter=(
          _e =>
            send(
              Method.handleDragEnter(
                Method.handleFlag,
                Method.handleTypeValid,
                _e,
              ),
            )
        )
        onDragLeave=(
          _e =>
            send(
              Method.handleDragLeave(
                Method.handleFlag,
                Method.handleTypeValid,
                _e,
              ),
            )
        )
        onDragOver=Method.handleDragOver
        onDrop=(
          _e =>
            send(
              Method.handleDrop(
                Method.handleFlag,
                Method.handleTypeValid,
                _e,
              ),
            )
        )
      />
      <span className=""> (DomHelper.textEl("texture:")) </span>
      (
        switch (retainedProps.map) {
        | None => <img src="./public/img/null.jpg" />
        | Some(map) =>
          <img
            src=(
              StateAssetService.getState()
              |> ImageBase64MapAssetService.unsafeGetImageBase64Map
              |> WonderCommonlib.SparseMapService.unsafeGet(map)
            )
          />
        }
      )
      <button
        className="texture_remove"
        onClick=(
          e =>
            Method.removeTexture(
              (store, dispatchFunc),
              (),
              materialComponent,
            )
        )>
        (DomHelper.textEl("remove"))
      </button>
    </div>
  </article>;

let shouldUpdate =
    ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps
  || oldSelf.state != newSelf.state;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~materialComponent, _children) => {
  ...component,
  retainedProps: {
    let color =
      BasicMaterialEngineService.getColor(materialComponent)
      |> StateLogicService.getEngineStateToGetData;
    {
      color: "#ffffff",
      map:
        BasicMaterialEngineService.getMap(materialComponent)
        |> StateLogicService.getEngineStateToGetData,
    };
  },
  initialState: () => {style: ReactDOMRe.Style.make(~opacity="1", ())},
  reducer: reducer((store, dispatchFunc), materialComponent),
  shouldUpdate,
  render: self => render((store, dispatchFunc), materialComponent, self),
};