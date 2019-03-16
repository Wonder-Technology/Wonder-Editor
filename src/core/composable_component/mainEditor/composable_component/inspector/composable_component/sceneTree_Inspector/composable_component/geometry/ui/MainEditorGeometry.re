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

  /* let _isValidGeometry = (geometry, engineState) =>
     GeometryEngineService.getGeometryVertices(geometry, engineState)
     |> Js.Typed_array.Float32Array.length > 0; */

  let _isGameObjectLightMaterialComponentHasMap = (gameObject, engineState) => {
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
  };

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
        _isGameObjectLightMaterialComponentHasMap(gameObject, engineState) :
        false;

  let _sortByName = (engineState, allGeometryAssets) =>
    allGeometryAssets
    |> Js.Array.sortInPlaceWith((geometry1, geometry2) =>
         Js.String.localeCompare(
           MainEditorGeometryUtils.getName(geometry2, engineState)
           |> Js.String.charAt(0),
           MainEditorGeometryUtils.getName(geometry1, engineState)
           |> Js.String.charAt(0),
         )
         |> NumberType.convertFloatToInt
       );

  let _getAllGeometryAssetsAndDefaultGeometrys = (editorState, engineState) =>
    ArrayService.fastConcat(
      GeometryAssetLogicService.getGeometryAssets(editorState, engineState)
      |> _sortByName(engineState),
      GeometryDataAssetEditorService.unsafeGetDefaultGeometryComponents(
        editorState,
      ),
    );

  let _getAllShowGeometrys = (gameObject, (editorState, engineState)) =>
    _isGameObjectMaterialComponentHasMap(gameObject, engineState) ?
      _getAllGeometryAssetsAndDefaultGeometrys(editorState, engineState)
      |> Js.Array.filter(geometry =>
           GeometryEngineService.hasGeometryTexCoords(geometry, engineState)
         ) :
      _getAllGeometryAssetsAndDefaultGeometrys(editorState, engineState);

  let showGeometryAssets = (send, currentSceneTreeNode, currentGeometry) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();
    let allGeometrys =
      _getAllShowGeometrys(currentSceneTreeNode, (editorState, engineState));

    allGeometrys
    |> Js.Array.map(geometry => {
         let className =
           geometry === currentGeometry ?
             "select-item-content select-item-active" : "select-item-content";

         <div
           className
           key={DomHelper.getRandomKey()}
           onClick={_e => send(ChangeGeometry(geometry))}>
           {
             DomHelper.textEl(
               MainEditorGeometryUtils.getName(geometry)
               |> StateLogicService.getEngineStateToGetData,
             )
           }
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

let _renderGeometryGroup =
    (
      uiState,
      currentSceneTreeNode,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <div className="select-component-content">
    <div className="select-component-item">
      <div className="select-item-header">
        {DomHelper.textEl("Geometry")}
      </div>
      <div className="select-item-body">
        {
          ReasonReact.array(
            Method.showGeometryAssets(
              send,
              currentSceneTreeNode,
              state.currentGeometry,
            ),
          )
        }
      </div>
    </div>
    <div
      className="select-component-bg"
      onClick={_e => send(HideGeometryGroup)}
    />
  </div>;

let render =
    (
      (uiState, dispatchFunc),
      currentSceneTreeNode,
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="MainEditorGeometry" className="wonder-inspector-geometry">
    <div className="inspector-item">
      <div
        className="item-header"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "geometry-geometry-describe",
            languageType,
          )
        }>
        {DomHelper.textEl("Geometry")}
      </div>
      <div className="item-content">
        <div className="inspector-select">
          <div
            className="select-name" onClick={_e => send(ShowGeometryGroup)}>
            {
              DomHelper.textEl(
                MainEditorGeometryUtils.getName(state.currentGeometry)
                |> StateLogicService.getEngineStateToGetData,
              )
            }
          </div>
          <div className="select-img" onClick={_e => send(ShowGeometryGroup)}>
            <img src="./public/img/select.png" />
          </div>
        </div>
      </div>
    </div>
    {
      state.isShowGeometryGroup ?
        _renderGeometryGroup(uiState, currentSceneTreeNode, self) :
        ReasonReact.null
    }
  </article>;
};

let make =
    (
      ~uiState,
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
  reducer: reducer((uiState, dispatchFunc), currentSceneTreeNode),
  render: self =>
    render((uiState, dispatchFunc), currentSceneTreeNode, self),
};