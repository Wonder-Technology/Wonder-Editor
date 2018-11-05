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

  let _isValidGeometry = (geometry, engineState) =>
    GeometryEngineService.getGeometryVertices(geometry, engineState)
    |> Js.Typed_array.Float32Array.length > 0;

  let _isGameObjectMaterialComponentHasMap = (gameObject, engineState) =>
    GameObjectComponentEngineService.hasBasicMaterialComponent(
      gameObject,
      engineState,
    ) ?
      false :
      /* GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
           gameObject,
           engineState,
         )
         |> BasicMaterialEngineService.hasBasicMaterialMap(_, engineState) */
      GameObjectComponentEngineService.hasLightMaterialComponent(
        gameObject,
        engineState,
      ) ?
        {
          let material =
            GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
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

  let _getAllAssetGeometrys = engineState => {
    GeometryEngineService.getAllGeometrys(engineState)
    |> Js.Array.filter(geometry =>
         DefaultSceneUtils.isAssetGeometry(geometry)
         && _isValidGeometry(geometry, engineState)
       );
  };

  let _getAllShowGeometrys = (gameObject, engineState) =>
    _isGameObjectMaterialComponentHasMap(gameObject, engineState) ?
      engineState
      |> _getAllAssetGeometrys
      |> Js.Array.filter(geometry =>
           GeometryEngineService.hasGeometryTexCoords(geometry, engineState)
         ) :
      engineState |> _getAllAssetGeometrys;

  let showGeometryAssets = (send, currentSceneTreeNode, currentGeometry) => {
    let engineState = StateEngineService.unsafeGetState();
    let allGeometrys =
      _getAllShowGeometrys(currentSceneTreeNode, engineState);

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
               MainEditorGeometryUtils.getName(geometry)
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
    <div className="inspector-item">
      <div className="item-header"> (DomHelper.textEl("Geometry")) </div>
      <div className="item-content">
        <div className="inspector-select">
          <div className="select-name">
            (
              DomHelper.textEl(
                MainEditorGeometryUtils.getName(state.currentGeometry)
                |> StateLogicService.getEngineStateToGetData,
              )
            )
          </div>
          <div className="select-img" onClick=(_e => send(ShowGeometryGroup))>
            <img src="./public/img/select.png" />
          </div>
        </div>
      </div>
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
                Method.showGeometryAssets(
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
      ~isShowGeometryGroup,
      _children,
    ) => {
  ...component,
  initialState: () => {
    isShowGeometryGroup,
    currentGeometry: geometryComponent,
  },
  reducer: reducer((store, dispatchFunc), currentSceneTreeNode),
  render: self => render((store, dispatchFunc), currentSceneTreeNode, self),
};