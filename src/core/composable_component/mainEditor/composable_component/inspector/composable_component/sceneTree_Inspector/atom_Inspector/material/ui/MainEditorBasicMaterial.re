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
  | DragEnd
  | DragDrop(int);

module Method = {
  let handleFlag = startFlag =>
    switch (startFlag) {
    | None => false
    | Some(flag) => flag == AssetTreeUtils.getFlag()
    };

  let _getNodeResultFromNodeMap = (id, editorState) =>
    editorState
    |> AssetNodeMapEditorService.unsafeGetNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(id);

  let handleTypeValid = (startId, editorState) =>
    switch (startId) {
    | None => false
    | Some(id) =>
      editorState
      |> _getNodeResultFromNodeMap(id)
      |> (({type_}) => type_ == AssetNodeType.Texture)
    };

  let setMaterialColor = MainEditorMaterialMarkRedoUndoEventHandler.MakeEventHandler.onMarkRedoUndoByLastStack;

  let _handleSetMap =
      (gameObject, materialComponent, mapId, engienStateToGetData) =>
    switch (
      BasicMaterialEngineService.getMap(
        materialComponent,
        engienStateToGetData,
      )
    ) {
    | None =>
      WonderLog.Log.print("remove material and create material") |> ignore;
      let color =
        engienStateToGetData
        |> BasicMaterialEngineService.getColor(materialComponent);

      let (editEngineState, runEngineState) =
        (
          StateLogicService.getEditEngineState(),
          StateLogicService.getRunEngineState(),
        )
        |> StateLogicService.handleFuncWithDiff(
             [|
               {arguments: [|gameObject|], type_: GameObject},
               {arguments: [|materialComponent|], type_: Material},
             |],
             GameObjectEngineService.disposeGameObjectBasicMaterialComponent,
           );

      let (newMaterial, editEngineState, runEngineState) =
        GeometryUtils.createGeometry(editEngineState, runEngineState);

      let (editEngineState, runEngineState) =
        (editEngineState, runEngineState)
        |> StateLogicService.handleFuncWithDiff(
             [|{arguments: [|newMaterial|], type_: Material}|],
             BasicMaterialEngineService.setColor(color),
           )
        |> StateLogicService.handleFuncWithDiff(
             [|
               {arguments: [|mapId|], type_: Texture},
               {arguments: [|newMaterial|], type_: Material},
             |],
             BasicMaterialEngineService.setMap,
           )
        |> StateLogicService.handleFuncWithDiff(
             [|
               {arguments: [|gameObject|], type_: GameObject},
               {arguments: [|newMaterial|], type_: Material},
             |],
             GameObjectComponentEngineService.addBasicMaterialComponent,
           )
        |> StateLogicService.handleFuncWithDiff(
             [|{arguments: [|gameObject|], type_: GameObject}|],
             GameObjectEngineService.initGameObject,
           );

      editEngineState
      |> DirectorEngineService.loopBody(0.)
      |> StateLogicService.setEditEngineState;
      runEngineState
      |> DirectorEngineService.loopBody(0.)
      |> StateLogicService.setRunEngineState;

    | Some(_map) =>
      WonderLog.Log.print("has material") |> ignore;
      let (editEngineState, runEngineState) =
        (
          StateLogicService.getEditEngineState(),
          StateLogicService.getRunEngineState(),
        )
        |> StateLogicService.handleFuncWithDiff(
             [|
               {arguments: [|mapId|], type_: Texture},
               {arguments: [|materialComponent|], type_: Material},
             |],
             BasicMaterialEngineService.setMap,
           );

      editEngineState
      |> DirectorEngineService.loopBody(0.)
      |> StateLogicService.setEditEngineState;
      runEngineState
      |> DirectorEngineService.loopBody(0.)
      |> StateLogicService.setRunEngineState;
    };

  let _handleNoTexCoords = gameObject =>
    WonderLog.Log.warn({j|the gameObject:$gameObject have no texCoords|j});

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
      _handleNoTexCoords(gameObject);

  let handleCustomGeometryAddMap =
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
      _handleNoTexCoords(gameObject);

  let onDrop = (dispatchFunc, startId, materialComponent) => {
    WonderLog.Log.print(("id", startId)) |> ignore;
    StateEditorService.getState()
    |> _getNodeResultFromNodeMap(startId)
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
          handleCustomGeometryAddMap(
            gameObject,
            materialComponent,
            result |> OptionService.unsafeGet |> int_of_string,
            engineStateToGetData,
          );
      }
    );
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

  let handleDrageEnd = _event => {
    CurrentDragSourceEditorService.clearCurrentDragSource
    |> StateLogicService.getAndSetEditorState;
    DragEnd;
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

  | DragEnd =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp("opacity", "1", state.style)
        |> ReactUtils.addStyleProp("border", "1px solid red"),
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
    <div className="material-texture" style=state.style>
      <div
        className="texture_ground"
        onDragEnd=(_e => send(Method.handleDrageEnd(_e)))
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
          WonderLog.Log.print(("map", map)) |> ignore;
          <img
            src=(
              BasicSourceTextureEngineService.unsafeGetSource(map)
              |> StateLogicService.getEngineStateToGetData
              |. DomHelper.getAttribute("src")
            )
          />;
        }
      )
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