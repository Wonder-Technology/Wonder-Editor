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

  let renderBasicMaterial = ((store, dispatchFunc), ()) => {
    let gameObject =
      SceneEditorService.unsafeGetCurrentSceneTreeNode
      |> StateLogicService.getEditorState;

    <MainEditorBasicMaterial
      store
      dispatchFunc
      materialComponent=(
        GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
          gameObject,
        )
        |> StateLogicService.getEngineStateToGetData
      )
    />;
  };

  let renderLightMaterial = ((store, dispatchFunc), ()) => {
    let gameObject =
      SceneEditorService.unsafeGetCurrentSceneTreeNode
      |> StateLogicService.getEditorState;

    <MainEditorLightMaterial
      store
      dispatchFunc
      materialComponent=(
        GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
          gameObject,
        )
        |> StateLogicService.getEngineStateToGetData
      )
    />;
  };

  let _sortByName = (allMaterialAssetData, engineState) =>
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
      |> _sortByName(_, engineState)
    );

  let showMaterialAssets =
      (send, currentSceneTreeNode, currentMaterial, currentMaterialType) => {
    let engineState = StateEngineService.unsafeGetState();
    let editorState = StateEditorService.getState();

    _getAllMaterialAssetData(editorState, engineState)
    |> Js.Array.map(((materialNodeId, (material, materialType))) => {
         let className =
           (material, materialType) == (currentMaterial, currentMaterialType) ?
             "select-item-content select-item-active" : "select-item-content";

         <div
           className
           key=(DomHelper.getRandomKey())
           onClick=(
             _e =>
               send(
                 ChangeMaterial(materialNodeId, (material, materialType)),
               )
           )>
           (
             DomHelper.textEl(
               NodeNameAssetLogicService.getMaterialNodeName(
                 ~material,
                 ~type_=materialType,
                 ~engineState,
               ),
             )
           )
         </div>;
       });
  };

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

let component = ReasonReact.reducerComponent("MainEditorMaterial");

let reducer =
    (
      (store, dispatchFunc) as reduxTuple,
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
        Method.changeMaterial(
          reduxTuple,
          currentSceneTreeNode,
          (
            materialNodeId,
            (sourceMaterial, targetMaterial),
            (state.materialType, targetMaterialType),
          ),
        )
      );
  | ShowMaterialGroup =>
    ReasonReact.Update({...state, isShowMaterialGroup: true})

  | HideMaterialGroup =>
    ReasonReactUtils.updateWithSideEffects(
      {...state, isShowMaterialGroup: false}, _state =>
      dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
      |> ignore
    )
  };

let _renderSelectMaterial = ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <div className="inspector-item">
    <div className="item-header"> (DomHelper.textEl("Material")) </div>
    <div className="item-content">
      <div className="inspector-select">
        <div className="select-name">
          (
            DomHelper.textEl(
              NodeNameAssetLogicService.getMaterialNodeName(
                ~material=state.currentMaterial,
                ~type_=state.materialType,
                ~engineState=StateEngineService.unsafeGetState(),
              ),
            )
          )
        </div>
        <div className="select-img" onClick=(_e => send(ShowMaterialGroup))>
          <img src="./public/img/select.png" />
        </div>
      </div>
    </div>
  </div>;

let _renderMaterialGroup =
    (currentSceneTreeNode, {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <div className="select-component-content">
    <div className="select-component-item">
      <div className="select-item-header">
        (DomHelper.textEl("Material"))
      </div>
      <div className="select-item-body">
        (
          ReasonReact.array(
            Method.showMaterialAssets(
              send,
              currentSceneTreeNode,
              state.currentMaterial,
              state.materialType,
            ),
          )
        )
      </div>
    </div>
    <div
      className="select-component-bg"
      onClick=(_e => send(HideMaterialGroup))
    />
  </div>;

let render =
    (
      (store, dispatchFunc),
      currentSceneTreeNode,
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) =>
  <article key="MainEditorMaterial" className="wonder-inspector-material">
    (_renderSelectMaterial(self))
    (
      state.isShowMaterialGroup ?
        _renderMaterialGroup(currentSceneTreeNode, self) : ReasonReact.null
    )
    <div className="material-value">
      <Select
        label="Type"
        options=(MainEditorMaterialUtils.getMaterialOptions())
        selectedKey=(
          state.materialType |> MainEditorMaterialType.convertMaterialTypeToInt
        )
        onChange=(value => send(ChangeMaterialType(value)))
      />
      <div className="">
        (
          MainEditorMaterialUtils.handleSpecificFuncByMaterialType(
            state.materialType,
            (
              Method.renderBasicMaterial((store, dispatchFunc)),
              Method.renderLightMaterial((store, dispatchFunc)),
            ),
          )
        )
      </div>
      (Method.buildShadeComponent(state.currentMaterial, state.materialType))
    </div>
  </article>;

let make =
    (
      ~store,
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
  reducer: reducer((store, dispatchFunc), currentSceneTreeNode),
  render: self => render((store, dispatchFunc), currentSceneTreeNode, self),
};