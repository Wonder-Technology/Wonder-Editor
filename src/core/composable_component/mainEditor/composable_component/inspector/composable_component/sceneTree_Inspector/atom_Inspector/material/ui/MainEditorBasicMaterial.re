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

  let handleTypeValid = (startId, editorState) =>
    switch (startId) {
    | None => false
    | Some(id) =>
      editorState
      |> AssetNodeMapEditorService.unsafeGetNodeMap
      |> WonderCommonlib.SparseMapService.unsafeGet(id)
      |> (({type_}) => type_ == AssetNodeType.Texture)
    };

  let setMaterialColor = MainEditorMaterialMarkRedoUndoEventHandler.MakeEventHandler.onMarkRedoUndoByLastStack;

  let _handleSetMap =
      (gameObject, materialComponent, mapId, engineStateToGetData) =>
    switch (
      BasicMaterialEngineService.getMap(
        materialComponent,
        engineStateToGetData,
      )
    ) {
    | None =>
      WonderLog.Log.print("remove material and create material") |> ignore;

      OperateTextureLogicService.setTextureMapToGameObjectMaterial(
        gameObject,
        materialComponent,
        mapId,
      );

    | Some(_map) =>
      WonderLog.Log.print("has material") |> ignore;

      OperateTextureLogicService.changeTextureMapAndRereshEngineState(
        materialComponent,
        mapId,
      );
    };

  let handleBoxGeometryAddMap =
      (gameObject, materialComponent, mapId, engineStateToGetData) =>
    engineStateToGetData
    |> GeometryEngineService.getBoxGeometryTexCoords
    |> GeometryService.hasTexCoords ?
      _handleSetMap(
        gameObject,
        materialComponent,
        mapId,
        engineStateToGetData,
      ) :
      WonderLog.Log.warn({j|the gameObject:$gameObject have no texCoords|j});

  /* let handleCustomGeometryAddMap =
       (gameObject, materialComponent, mapId, engineStateToGetData) =>
     engineStateToGetData
     |> GameObjectComponentEngineService.getGeometryComponent(gameObject)
     |. GeometryEngineService.getCustomGeometryTexCoords(engineStateToGetData)
     |> GeometryService.hasTexCoords ?
       _handleSetMap(
         gameObject,
         materialComponent,
         mapId,
         engineStateToGetData,
       ) :
       _handleNoTexCoords(gameObject); */

  let onDrop = (dispatchFunc, startId, materialComponent) => {
    StateEditorService.getState()
    |> AssetNodeMapEditorService.unsafeGetNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(startId)
    |> (
      ({name, type_, result}) => {
        let gameObject =
          SceneEditorService.unsafeGetCurrentSceneTreeNode
          |> StateLogicService.getEditorState;

        let engineStateToGetData = StateLogicService.getRunEngineState();

        GameObjectEngineService.hasGameObjectBoxGeometryComponent(
          gameObject,
          engineStateToGetData,
        ) ?
          handleBoxGeometryAddMap(
            gameObject,
            materialComponent,
            result |> OptionService.unsafeGet |> int_of_string,
            engineStateToGetData,
          ) :
          /* handleCustomGeometryAddMap(
               gameObject,
               materialComponent,
               result |> OptionService.unsafeGet |> int_of_string,
               engineStateToGetData,
             ); */
          ();
      }
    );
    dispatchFunc(AppStore.ReLoad);
  };

  let removeTexture = (dispatchFunc, materialComponent, _e) => {
    switch (
      BasicMaterialEngineService.getMap(materialComponent)
      |> StateLogicService.getEngineStateToGetData
    ) {
    | None => ()
    | Some(_mapId) =>
      WonderLog.Log.print("set map is null") |> ignore;

      OperateTextureLogicService.rebuildMaterialAndRefreshEngineState(
        SceneEditorService.unsafeGetCurrentSceneTreeNode
        |> StateLogicService.getEditorState,
        materialComponent,
        None,
      );
    };

    dispatchFunc(AppStore.ReLoad);
  };

  let _isTriggerEvent = (handleFlagFunc, handleTypeValidFunc) => {
    let editorState = StateEditorService.getState();
    let (flag, startId) =
      editorState |> CurrentDragSourceEditorService.getCurrentDragSource;

    handleFlagFunc(flag) && handleTypeValidFunc(startId, editorState);
  };

  let handleDragEnter = (handleFlagFunc, handleTypeValidFunc, _event) =>
    _isTriggerEvent(handleFlagFunc, handleTypeValidFunc) ?
      DragEnter : Nothing;

  let handleDragLeave = (handleFlagFunc, handleTypeValidFunc, event) => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    DomHelper.stopPropagation(e);
    _isTriggerEvent(handleFlagFunc, handleTypeValidFunc) ?
      DragLeave : Nothing;
  };

  let handleDragOver = event => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    DomHelper.preventDefault(e);
  };

  let handleDrop = (handleFlagFunc, handleTypeValidFunc, event) => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    let startId = DragUtils.getDragedUid(e);
    _isTriggerEvent(handleFlagFunc, handleTypeValidFunc) ?
      DragDrop(startId) : DragLeave;
  };
};

let component =
  ReasonReact.reducerComponentWithRetainedProps("MainEditorBasicMaterial");

let reducer = (dispatchFunc, materialComponent, action, state) =>
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
      Method.onDrop(dispatchFunc, startId, materialComponent)
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
              BasicSourceTextureEngineService.unsafeGetSource(map)
              |> StateLogicService.getEngineStateToGetData
              |. DomHelper.getAttribute("src")
            )
          />
        }
      )
      <button
        className="texture_remove"
        onClick=(
          e => Method.removeTexture(dispatchFunc, materialComponent, e)
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
    WonderLog.Log.print(("init material", materialComponent)) |> ignore;
    {
      color: "#ffffff",
      map:
        BasicMaterialEngineService.getMap(materialComponent)
        |> StateLogicService.getEngineStateToGetData,
    };
  },
  initialState: () => {style: ReactDOMRe.Style.make(~opacity="1", ())},
  reducer: reducer(dispatchFunc, materialComponent),
  shouldUpdate,
  render: self => render((store, dispatchFunc), materialComponent, self),
};