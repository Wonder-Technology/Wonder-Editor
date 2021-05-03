module Method = {
  let changeMaterialType = MainEditorChangeMaterialTypeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let changeMaterial = MainEditorChangeMaterialEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let renderBasicMaterial = ((uiState, dispatchFunc), ()) => {
    let gameObject =
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
      |> StateLogicService.getEditorState;

    <MainEditorBasicMaterialForGameObject
      uiState
      dispatchFunc
      materialComponent={
        GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
          gameObject,
        )
        |> StateLogicService.getEngineStateToGetData
      }
    />;
  };

  let renderLightMaterial = ((uiState, dispatchFunc), ()) => {
    let gameObject =
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
      |> StateLogicService.getEditorState;

    <MainEditorLightMaterialForGameObject
      uiState
      dispatchFunc
      materialComponent={
        GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
          gameObject,
        )
        |> StateLogicService.getEngineStateToGetData
      }
    />;
  };

  let _sortByName = (engineState, allMaterialAssetData) =>
    allMaterialAssetData
    |> Js.Array.sortInPlaceWith(
         (
           (_, (materialComponent1, materialType1)),
           (_, (materialComponent2, materialType2)),
         ) =>
         Js.String.localeCompare(
           NodeNameAssetLogicService.getMaterialNodeName(
             ~material=materialComponent2,
             ~type_=materialType2,
             ~engineState,
           )
           |> Js.String.charAt(0),
           NodeNameAssetLogicService.getMaterialNodeName(
             ~material=materialComponent1,
             ~type_=materialType1,
             ~engineState,
           )
           |> Js.String.charAt(0),
         )
         |> NumberType.convertFloatToInt
       );

  let getAllMaterialAssetData = (editorState, engineState) =>
    NodeAssetType.(
      ArrayService.fastConcat(
        MaterialNodeAssetEditorService.findAllMaterialNodes(editorState)
        |> Js.Array.map(materialNode => {
             let {materialComponent, type_}: NodeAssetType.materialNodeData =
               MaterialNodeAssetService.getNodeData(materialNode);

             (
               Some(NodeAssetService.getNodeId(~node=materialNode)),
               (materialComponent, type_),
             );
           }),
        MaterialDataAssetEditorService.getAllDefaultMaterialData(editorState)
        |> Js.Array.map(materialData => (None, materialData)),
      )
      |> _sortByName(engineState)
    );

  let _isEqualDefaultMaterial = (material, materialType, editorState) => {
    let (defaultMaterial, _) =
      MaterialDataAssetEditorService.unsafeGetDefaultMaterialDataByType(
        materialType,
        editorState,
      );

    material === defaultMaterial;
  };

  let buildShadeComponent = (currentMaterial, materialType) =>
    _isEqualDefaultMaterial(
      currentMaterial,
      materialType,
      StateEditorService.getState(),
    ) ?
      <div className="material-shade" /> : ReasonReact.null;
};

let component = ReasonReact.statelessComponent("MainEditorMaterial");

let render =
    (
      (uiState, dispatchFunc),
      (currentSceneTreeNode, isShowMaterialGroup),
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  let materialType =
    MainEditorMaterialUtils.getMaterialTypeByGameObject(currentSceneTreeNode)
    |> StateLogicService.getEngineStateToGetData;

  let material =
    MainEditorMaterialUtils.getMaterialComponentByType(
      currentSceneTreeNode,
      materialType,
    )
    |> StateLogicService.getEngineStateToGetData;

  <article key="MainEditorMaterial" className="wonder-inspector-material">
    <SelectAssetByText
      label="Material"
      assetGroupHeader="Material"
      isShowAssetGroup=isShowMaterialGroup
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "material-material-describe",
          languageType,
        )
      }
      currentAssetDataOpt=
        (
          (material, materialType)
          |> SelectAssetByText.convertMaterialAssetDataToAssetDataType
        )
        ->Some
      getCurrentAssetDataFromAssetRelatedDataFunc={
        assetRelatedData => {
          let (_, (material, materialType)) =
            assetRelatedData
            |> SelectAssetByText.convertAssetRelatedDataTypeToMaterialAssetRelatedData;

          (material, materialType)
          |> SelectAssetByText.convertMaterialAssetDataToAssetDataType;
        }
      }
      getAssetTextFunc={
        (currentAssetDataOpt, engineState) =>
          switch (currentAssetDataOpt) {
          | None => ""
          | Some(currentAssetData) =>
            let (material, materialType) =
              currentAssetData
              |> SelectAssetByText.convertAssetDataTypeToMaterialAssetData;

            NodeNameAssetLogicService.getMaterialNodeName(
              ~material,
              ~type_=materialType,
              ~engineState,
            );
          }
      }
      isCurrentAssetFunc={
        (currentAssetData, assetRelatedData) => {
          let (_, (material, materialType)) =
            assetRelatedData
            |> SelectAssetByText.convertAssetRelatedDataTypeToMaterialAssetRelatedData;

          currentAssetData
          |> SelectAssetByText.convertAssetDataTypeToMaterialAssetData
          == (material, materialType);
        }
      }
      findAllAssetRelatedDataFunc={
        () => {
          let engineState = StateEngineService.unsafeGetState();
          let editorState = StateEditorService.getState();

          Method.getAllMaterialAssetData(editorState, engineState)
          |> Js.Array.map(materialRelatedData =>
               materialRelatedData
               |> SelectAssetByText.convertMaterialAssetRelatedDataToAssetRelatedDataType
             );
        }
      }
      changeAssetFunc={
        (sourceAssetDataOpt, assetRelatedData) => {
          let (materialNodeId, (targetMaterial, targetMaterialType)) =
            assetRelatedData
            |> SelectAssetByText.convertAssetRelatedDataTypeToMaterialAssetRelatedData;

          let (sourceMaterial, sourceMaterialType) =
            sourceAssetDataOpt
            |> OptionService.unsafeGet
            |> SelectAssetByText.convertAssetDataTypeToMaterialAssetData;

          Method.changeMaterial(
            (UIStateService.getState(), dispatchFunc),
            currentSceneTreeNode,
            (
              materialNodeId,
              (sourceMaterial, targetMaterial),
              (sourceMaterialType, targetMaterialType),
            ),
          );
        }
      }
      getTextFunc={
        assetRelatedData => {
          let (_, (material, materialType)) =
            assetRelatedData
            |> SelectAssetByText.convertAssetRelatedDataTypeToMaterialAssetRelatedData;

          NodeNameAssetLogicService.getMaterialNodeName(
            ~material,
            ~type_=materialType,
            ~engineState=StateEngineService.unsafeGetState(),
          );
        }
      }
      removeAssetFuncOpt=None
    />
    <div className="material-value">
      <Select
        label="Type"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "material-type-describe",
            languageType,
          )
        }
        options={MainEditorMaterialUtils.getMaterialOptions()}
        selectedKey={
          materialType |> MainEditorMaterialType.convertMaterialTypeToInt
        }
        onChange={
          value =>
            Method.changeMaterialType(
              (UIStateService.getState(), dispatchFunc),
              (),
              (
                materialType,
                value |> MainEditorMaterialType.convertIntToMaterialType,
              ),
            )
        }
      />
      <div>
        {
          MainEditorMaterialUtils.handleSpecificFuncByMaterialType(
            materialType,
            (
              Method.renderBasicMaterial((uiState, dispatchFunc)),
              Method.renderLightMaterial((uiState, dispatchFunc)),
            ),
          )
        }
      </div>
      {Method.buildShadeComponent(material, materialType)}
    </div>
  </article>;
};

let make =
    (
      ~uiState,
      ~dispatchFunc,
      ~currentSceneTreeNode,
      ~isShowMaterialGroup=false,
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      (uiState, dispatchFunc),
      (currentSceneTreeNode, isShowMaterialGroup),
      self,
    ),
};