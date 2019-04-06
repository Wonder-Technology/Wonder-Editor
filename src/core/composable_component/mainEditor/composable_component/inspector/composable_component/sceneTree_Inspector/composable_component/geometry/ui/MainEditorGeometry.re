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

  let getAllShowGeometrys = (gameObject, (editorState, engineState)) =>
    _isGameObjectMaterialComponentHasMap(gameObject, engineState) ?
      _getAllGeometryAssetsAndDefaultGeometrys(editorState, engineState)
      |> Js.Array.filter(geometry =>
           GeometryEngineService.hasGeometryTexCoords(geometry, engineState)
         ) :
      _getAllGeometryAssetsAndDefaultGeometrys(editorState, engineState);
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
      (uiState, dispatchFunc),
      currentSceneTreeNode,
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="MainEditorGeometry" className="wonder-inspector-geometry">
    <SelectAssetGroupBar
      headerText="Geometry"
      headerTitle={
        LanguageUtils.getInspectorLanguageDataByType(
          "geometry-geometry-describe",
          languageType,
        )
      }
      assetText={
        MainEditorGeometryUtils.getName(state.currentGeometry)
        |> StateLogicService.getEngineStateToGetData
      }
      selectAssetFunc={send => send(ShowGeometryGroup)}
      sendFunc=send
    />
    {
      state.isShowGeometryGroup ?
        <SelectAssetGroupWidget
          headerText="Geometry"
          sendFunc=send
          clickHideGroupButtonFunc={send => send(HideGeometryGroup)}
          getAllAssetsFunc={
            () => {
              let editorState = StateEditorService.getState();
              let engineState = StateEngineService.unsafeGetState();

              Method.getAllShowGeometrys(
                currentSceneTreeNode,
                (editorState, engineState),
              );
            }
          }
          isAssetFunc={
            geometry => {
              let currentGeometry = state.currentGeometry;

              geometry === currentGeometry;
            }
          }
          changeAssetFunc={
            (geometry, send) => send(ChangeGeometry(geometry))
          }
          getTextFunc={
            geometry =>
              MainEditorGeometryUtils.getName(geometry)
              |> StateLogicService.getEngineStateToGetData
          }
        /> :
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