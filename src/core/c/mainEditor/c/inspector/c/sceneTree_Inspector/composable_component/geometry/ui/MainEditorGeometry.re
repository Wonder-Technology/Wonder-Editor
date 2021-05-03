module Method = {
  let changeGeometry = MainEditorChangeGeometryEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

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

let component = ReasonReact.statelessComponent("MainEditorGeometry");

let render =
    (
      (uiState, dispatchFunc),
      (currentSceneTreeNode, geometryComponent, isShowGeometryGroup),
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="MainEditorGeometry" className="wonder-inspector-geometry">
    <SelectAssetByText
      label="Geometry"
      assetGroupHeader="Geometry"
      isShowAssetGroup=isShowGeometryGroup
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "geometry-geometry-describe",
          languageType,
        )
      }
      currentAssetDataOpt=
        (geometryComponent |> SelectAssetByText.convertIntToAssetDataType)
        ->Some
      getCurrentAssetDataFromAssetRelatedDataFunc={
        assetRelatedData =>
          assetRelatedData
          |> SelectAssetByText.convertAssetRelatedDataTypeToInt
          |> SelectAssetByText.convertIntToAssetDataType
      }
      getAssetTextFunc={
        (currentAssetDataOpt, engineState) =>
          switch (currentAssetDataOpt) {
          | None => ""
          | Some(currentAssetData) =>
            MainEditorGeometryUtils.getName(
              currentAssetData |> SelectAssetByText.convertAssetDataTypeToInt,
              engineState,
            )
          }
      }
      isCurrentAssetFunc={
        (currentAssetData, assetRelatedData) =>
          currentAssetData
          |> SelectAssetByText.convertAssetDataTypeToInt
          === (
                assetRelatedData
                |> SelectAssetByText.convertAssetRelatedDataTypeToInt
              )
      }
      findAllAssetRelatedDataFunc={
        () => {
          let editorState = StateEditorService.getState();
          let engineState = StateEngineService.unsafeGetState();

          Method.getAllShowGeometrys(
            currentSceneTreeNode,
            (editorState, engineState),
          )
          |> Js.Array.map(geometryComponent =>
               geometryComponent
               |> SelectAssetByText.convertIntToAssetRelatedDataType
             );
        }
      }
      changeAssetFunc={
        (sourceAssetDataOpt, assetRelatedData) =>
          Method.changeGeometry(
            (UIStateService.getState(), dispatchFunc),
            currentSceneTreeNode,
            (
              sourceAssetDataOpt
              |> OptionService.unsafeGet
              |> SelectAssetByText.convertAssetDataTypeToInt,
              assetRelatedData
              |> SelectAssetByText.convertAssetRelatedDataTypeToInt,
            ),
          )
      }
      getTextFunc={
        assetRelatedData =>
          MainEditorGeometryUtils.getName(
            assetRelatedData
            |> SelectAssetByText.convertAssetRelatedDataTypeToInt,
          )
          |> StateLogicService.getEngineStateToGetData
      }
      removeAssetFuncOpt=None
    />
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
  render: _ =>
    render(
      (uiState, dispatchFunc),
      (currentSceneTreeNode, geometryComponent, isShowGeometryGroup),
    ),
};