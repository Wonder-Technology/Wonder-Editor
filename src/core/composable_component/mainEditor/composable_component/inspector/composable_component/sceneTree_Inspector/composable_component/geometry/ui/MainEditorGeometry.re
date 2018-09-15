type state = {
  isShowGeometryGroup: bool,
  currentGeometry: int,
};

type action =
  | ChangeGeometry(int)
  | ShowGeometryGroup
  | HideGeometryGroup;

module Method = {
  let changeGeometry = MainEditorChangeGeometryEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let _isGameObjectMaterialComponentHasMap = (gameObject, engineState) =>
    GameObjectComponentEngineService.hasBasicMaterialComponent(
      gameObject,
      engineState,
    ) ?
      GameObjectComponentEngineService.getBasicMaterialComponent(
        gameObject,
        engineState,
      )
      |> BasicMaterialEngineService.hasMap(_, engineState) :
      GameObjectComponentEngineService.hasLightMaterialComponent(
        gameObject,
        engineState,
      ) ?
        {
          let material =
            GameObjectComponentEngineService.getLightMaterialComponent(
              gameObject,
              engineState,
            );

          LightMaterialEngineService.hasLightMaterialDiffuseMap(
            material,
            engineState,
          )
          || LightMaterialEngineService.hasLightMaterialSpecularMap(
               material,
               engineState,
             );
        } :
        false;

  let buildAssetGeometryComponent =
      (send, currentSceneTreeNode, currentGeometry) => {
    let engineState = StateEngineService.unsafeGetState();
    let allGeometrys =
      _isGameObjectMaterialComponentHasMap(
        currentSceneTreeNode,
        engineState,
      ) ?
        engineState
        |> GeometryEngineService.getAllAssetGeometrys
        |> Js.Array.filter(geometry =>
             GeometryEngineService.hasGeometryTexCoords(
               geometry,
               engineState,
             )
           ) :
        engineState |> GeometryEngineService.getAllAssetGeometrys;

    allGeometrys
    |> Js.Array.map(geometry => {
         let className =
           geometry === currentGeometry ?
             "item-content item-active" : "item-content";

         <div
           className
           key=(DomHelper.getRandomKey())
           onClick=(_e => send(ChangeGeometry(geometry)))>
           (
             DomHelper.textEl(
               GeometryEngineService.getDefaultGeometryNameIfNotExistName(
                 geometry,
               )
               |> StateLogicService.getEngineStateToGetData,
             )
           )
         </div>;
       });
  };
};

let component = ReasonReact.reducerComponent("MainEditorGeometry");

let reducer = (reduxTuple, currentSceneTreeNode, action, state) =>
  switch (action) {
  | ChangeGeometry(targetGeometry) =>
    let sourceGeometry = state.currentGeometry;

    sourceGeometry === targetGeometry ?
      ReasonReact.NoUpdate :
      ReasonReactUtils.updateWithSideEffects(
        {...state, currentGeometry: targetGeometry}, _state =>
        Method.changeGeometry(
          reduxTuple,
          currentSceneTreeNode,
          (sourceGeometry, targetGeometry),
        )
      );

  | ShowGeometryGroup =>
    ReasonReact.Update({...state, isShowGeometryGroup: true})

  | HideGeometryGroup =>
    ReasonReact.Update({...state, isShowGeometryGroup: false})
  };

let render =
    (
      (store, dispatchFunc),
      currentSceneTreeNode,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article key="MainEditorGeometry" className="wonder-inspector-geometry">
    <div className="geometry-select">
      (
        DomHelper.textEl(
          GeometryEngineService.getDefaultGeometryNameIfNotExistName(
            state.currentGeometry,
          )
          |> StateLogicService.getEngineStateToGetData,
        )
      )
      <span className="select-title" onClick=(_e => send(ShowGeometryGroup))>
        (DomHelper.textEl("select"))
      </span>
    </div>
    (
      state.isShowGeometryGroup ?
        <div className="select-component-content">
          <div className="select-component-item">
            <div className="item-header">
              (DomHelper.textEl("Geometry"))
            </div>
            (
              ReasonReact.array(
                Method.buildAssetGeometryComponent(
                  send,
                  currentSceneTreeNode,
                  state.currentGeometry,
                ),
              )
            )
          </div>
          <div
            className="select-component-bg"
            onClick=(_e => send(HideGeometryGroup))
          />
        </div> :
        ReasonReact.null
    )
  </article>;

let make =
    (
      ~store,
      ~dispatchFunc,
      ~currentSceneTreeNode,
      ~geometryComponent,
      _children,
    ) => {
  ...component,
  initialState: () => {
    isShowGeometryGroup: false,
    currentGeometry: geometryComponent,
  },
  reducer: reducer((store, dispatchFunc), currentSceneTreeNode),
  render: self => render((store, dispatchFunc), currentSceneTreeNode, self),
};