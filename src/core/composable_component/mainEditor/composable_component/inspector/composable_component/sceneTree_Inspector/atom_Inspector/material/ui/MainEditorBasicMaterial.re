open AssetNodeType;

open DiffType;

open Color;

type state = {
  style: ReactDOMRe.Style.t,
  isShowColorPick: bool,
};

type retainedProps = {
  color: string,
  map: option(int),
};

type action =
  | ToggleShowColorPick
  | Nothing
  | DragEnter
  | DragLeave
  | DragDrop(int);

module Method = {
  let isFlag = startFlag =>
    switch (startFlag) {
    | None => false
    | Some(flag) => flag == AssetUtils.getFlag()
    };

  let isTypeValid = (startId, assetState) =>
    switch (startId) {
    | None => false
    | Some(id) =>
      assetState
      |> TextureNodeMapAssetService.getTextureNodeMap
      |> WonderCommonlib.SparseMapService.get(id)
      |> Js.Option.isSome
    };

  let changeColor = ((store, dispatchFunc), materialComponent, value) =>
    MainEditorMaterialMarkRedoUndoEventHandler.MakeEventHandler.onMarkRedoUndoByStackLastReturnStore(
      (store, dispatchFunc),
      materialComponent,
      value
      |> Color.convertColorObjToColorPickType
      |> Color.getEngineColorRgbArr,
    );

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

  let _isTriggerAction = (isFlagFunc, isTypeValidFunc) => {
    let (flag, startId) =
      StateEditorService.getState()
      |> CurrentDragSourceEditorService.getCurrentDragSource;

    isFlagFunc(flag)
    && isTypeValidFunc(startId, StateAssetService.getState());
  };

  let handleDragEnter = (isFlagFunc, isTypeValidFunc, _event) =>
    _isTriggerAction(isFlagFunc, isTypeValidFunc) ? DragEnter : Nothing;

  let handleDragLeave = (isFlagFunc, isTypeValidFunc, event) => {
    ReactEvent.convertReactMouseEventToJsEvent(event)
    |> DomHelper.stopPropagation;

    _isTriggerAction(isFlagFunc, isTypeValidFunc) ? DragLeave : Nothing;
  };

  let handleDragOver = event =>
    ReactEvent.convertReactMouseEventToJsEvent(event)
    |> DomHelper.preventDefault;

  let handleDrop = (isFlagFunc, isTypeValidFunc, event) => {
    let startId =
      ReactEvent.convertReactMouseEventToJsEvent(event)
      |> DragUtils.getDragedUid;

    _isTriggerAction(isFlagFunc, isTypeValidFunc) ?
      DragDrop(startId) : DragLeave;
  };
};

let component =
  ReasonReact.reducerComponentWithRetainedProps("MainEditorBasicMaterial");

let reducer = ((store, dispatchFunc), materialComponent, action, state) =>
  switch (action) {
  | ToggleShowColorPick =>
    ReasonReact.Update({...state, isShowColorPick: ! state.isShowColorPick})
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
    <article className="wonder-material-color">
      <div className="">
        <span className=""> (DomHelper.textEl("color : ")) </span>
        /* <span className="">()</span> */
        <button className="" onClick=(_e => send(ToggleShowColorPick))>
          (DomHelper.textEl("pick color"))
        </button>
        (
          state.isShowColorPick ?
            <div className="">
              <ReactColor.Sketch
                color=retainedProps.color
                onChange=(
                  (value, e) =>
                    Method.changeColor(
                      (store, dispatchFunc),
                      materialComponent,
                      value,
                    )
                )
              />
            </div> :
            ReasonReact.nullElement
        )
      </div>
    </article>
    <article className="wonder-material-texture">
      <div
        style=state.style
        className="texture_ground"
        onDragEnter=(
          _e =>
            send(
              Method.handleDragEnter(Method.isFlag, Method.isTypeValid, _e),
            )
        )
        onDragLeave=(
          _e =>
            send(
              Method.handleDragLeave(Method.isFlag, Method.isTypeValid, _e),
            )
        )
        onDragOver=Method.handleDragOver
        onDrop=(
          _e =>
            send(Method.handleDrop(Method.isFlag, Method.isTypeValid, _e))
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
              |> ImageBase64MapAssetService.getImageBase64Map
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
    </article>
  </article>;

let shouldUpdate =
    ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps
  || oldSelf.state != newSelf.state;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~materialComponent, _children) => {
  ...component,
  retainedProps: {
    color:
      BasicMaterialEngineService.getColor(materialComponent)
      |> StateLogicService.getEngineStateToGetData
      |> Color.getHexString,
    map:
      BasicMaterialEngineService.getMap(materialComponent)
      |> StateLogicService.getEngineStateToGetData,
  },
  initialState: () => {
    style: ReactDOMRe.Style.make(~opacity="1", ()),
    isShowColorPick: false,
  },
  reducer: reducer((store, dispatchFunc), materialComponent),
  shouldUpdate,
  render: self => render((store, dispatchFunc), materialComponent, self),
};