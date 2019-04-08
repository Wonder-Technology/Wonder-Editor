type state = {
  materialType: MaterialDataAssetType.materialType,
  isShowMaterialGroup: bool,
  currentMaterial: int,
};

type action =
  | ChangeMaterialType(int)
  | ChangeMaterial(
      option(NodeAssetType.nodeId),
      (int, MaterialDataAssetType.materialType),
    )
  | ShowMaterialGroup
  | HideMaterialGroup;

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

  let _getAllMaterialAssetData = (editorState, engineState) =>
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

  let handleChangeMaterial =
      (
        reduxTuple,
        currentSceneTreeNode,
        (materialNodeId, (targetMaterial, targetMaterialType)),
        state,
      ) => {
    let sourceMaterial = state.currentMaterial;
    let sourceMaterialType = state.materialType;

    (sourceMaterial, sourceMaterialType)
    == (targetMaterial, targetMaterialType) ?
      ReasonReact.NoUpdate :
      ReasonReactUtils.updateWithSideEffects(
        {
          ...state,
          currentMaterial: targetMaterial,
          materialType: targetMaterialType,
        },
        _state =>
        changeMaterial(
          reduxTuple,
          currentSceneTreeNode,
          (
            materialNodeId,
            (sourceMaterial, targetMaterial),
            (state.materialType, targetMaterialType),
          ),
        )
      );
  };
};

let component = ReasonReact.reducerComponent("MainEditorMaterial");

let reducer =
    (
      (uiState, dispatchFunc) as reduxTuple,
      currentSceneTreeNode,
      action,
      state,
    ) =>
  switch (action) {
  | ChangeMaterialType(value) =>
    let sourceMaterialType = state.materialType;
    let targetMaterialType =
      value |> MainEditorMaterialType.convertIntToMaterialType;

    ReasonReactUtils.updateWithSideEffects(
      {...state, materialType: targetMaterialType}, state =>
      Method.changeMaterialType(
        reduxTuple,
        (),
        (sourceMaterialType, targetMaterialType),
      )
    );
  | ChangeMaterial(materialNodeId, (targetMaterial, targetMaterialType)) =>
    Method.handleChangeMaterial(
      reduxTuple,
      currentSceneTreeNode,
      (materialNodeId, (targetMaterial, targetMaterialType)),
      state,
    )
  | ShowMaterialGroup =>
    ReasonReact.Update({...state, isShowMaterialGroup: true})
  | HideMaterialGroup =>
    ReasonReactUtils.updateWithSideEffects(
      {...state, isShowMaterialGroup: false}, _state =>
      dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
      |> ignore
    )
  };

let render =
    (
      (uiState, dispatchFunc),
      currentSceneTreeNode,
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="MainEditorMaterial" className="wonder-inspector-material">
    <SelectAssetGroupBar
      headerText="Material"
      headerTitle={
        LanguageUtils.getInspectorLanguageDataByType(
          "material-material-describe",
          languageType,
        )
      }
      assetText={
        NodeNameAssetLogicService.getMaterialNodeName(
          ~material=state.currentMaterial,
          ~type_=state.materialType,
          ~engineState=StateEngineService.unsafeGetState(),
        )
      }
      selectAssetFunc={send => send(ShowMaterialGroup)}
      sendFunc=send
    />
    {
      state.isShowMaterialGroup ?
        <SelectAssetGroupWidget
          headerText="Material"
          sendFunc=send
          clickHideGroupButtonFunc={send => send(HideMaterialGroup)}
          getAllAssetsFunc={
            () => {
              let engineState = StateEngineService.unsafeGetState();
              let editorState = StateEditorService.getState();

              Method._getAllMaterialAssetData(editorState, engineState);
            }
          }
          isAssetFunc={
            ((materialNodeId, (material, materialType))) => {
              let currentMaterial = state.currentMaterial;
              let currentMaterialType = state.materialType;

              (material, materialType)
              == (currentMaterial, currentMaterialType);
            }
          }
          changeAssetFunc={
            ((materialNodeId, (material, materialType)), send) =>
              send(ChangeMaterial(materialNodeId, (material, materialType)))
          }
          getTextFunc={
            ((materialNodeId, (material, materialType))) =>
              NodeNameAssetLogicService.getMaterialNodeName(
                ~material,
                ~type_=materialType,
                ~engineState=StateEngineService.unsafeGetState(),
              )
          }
        /> :
        ReasonReact.null
    }
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
          state.materialType |> MainEditorMaterialType.convertMaterialTypeToInt
        }
        onChange={value => send(ChangeMaterialType(value))}
      />
      <div className="">
        {
          MainEditorMaterialUtils.handleSpecificFuncByMaterialType(
            state.materialType,
            (
              Method.renderBasicMaterial((uiState, dispatchFunc)),
              Method.renderLightMaterial((uiState, dispatchFunc)),
            ),
          )
        }
      </div>
      {Method.buildShadeComponent(state.currentMaterial, state.materialType)}
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
  initialState: () => {
    let materialType =
      MainEditorMaterialUtils.getMaterialTypeByGameObject(
        currentSceneTreeNode,
      )
      |> StateLogicService.getEngineStateToGetData;

    {
      materialType,
      isShowMaterialGroup,
      currentMaterial:
        MainEditorMaterialUtils.getMaterialComponentByType(
          currentSceneTreeNode,
          materialType,
        )
        |> StateLogicService.getEngineStateToGetData,
    };
  },
  reducer: reducer((uiState, dispatchFunc), currentSceneTreeNode),
  render: self =>
    render((uiState, dispatchFunc), currentSceneTreeNode, self),
};