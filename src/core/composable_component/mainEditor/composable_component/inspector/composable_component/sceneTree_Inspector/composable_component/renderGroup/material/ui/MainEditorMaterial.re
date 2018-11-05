type state = {
  materialType: AssetMaterialDataType.materialType,
  isShowMaterialGroup: bool,
  currentMaterial: int,
};

type action =
  | ChangeMaterialType(int)
  | ChangeMaterial(
      option(AssetNodeType.nodeId),
      (int, AssetMaterialDataType.materialType),
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

  let _getAllMaterialDataAsset = editorState =>
    AssetNodeType.(
      Js.Array.concat(
        MaterialDataAssetEditorService.getAllDefaultMaterialData(editorState)
        |> Js.Array.map(materialData => (None, materialData)),
        MaterialNodeMapAssetEditorService.getResults(editorState)
        |> Js.Array.map(((materialNodeId, {materialComponent, type_})) =>
             (Some(materialNodeId), (materialComponent, type_))
           ),
      )
      |> Js.Array.sortInPlaceWith(
           ((_, (materialComponent1, _)), (_, (materialComponent2, _))) =>
           materialComponent2 - materialComponent1
         )
    );

  let showMaterialAssets =
      (send, currentSceneTreeNode, currentMaterial, currentMaterialType) => {
    let engineState = StateEngineService.unsafeGetState();
    let editorState = StateEditorService.getState();

    _getAllMaterialDataAsset(editorState)
    |> Js.Array.map(((materialNodeId, (material, materialType))) => {
         let className =
           (material, materialType) == (currentMaterial, currentMaterialType) ?
             "item-content item-active" : "item-content";

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
               MainEditorMaterialUtils.getName(
                 material,
                 materialType,
                 engineState,
               ),
             )
           )
         </div>;
       });
  };

  let _isEqualDefaultMaterial = (material, materialType, editorState) => {
    let (defaultMaterial, _) =
      MaterialDataAssetEditorService.unsafeGetMaterialDataByType(
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

let reducer = (reduxTuple, currentSceneTreeNode, action, state) =>
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
    ReasonReact.Update({...state, isShowMaterialGroup: false})
  };

let render =
    (
      (store, dispatchFunc),
      currentSceneTreeNode,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article key="MainEditorMaterial" className="wonder-inspector-material">
    <div className="inspector-item">
      <div className="item-header"> (DomHelper.textEl("Material")) </div>
      <div className="item-content">
        <div className="inspector-select">
          <div className="select-name">
            (
              DomHelper.textEl(
                MainEditorMaterialUtils.getName(
                  state.currentMaterial,
                  state.materialType,
                )
                |> StateLogicService.getEngineStateToGetData,
              )
            )
          </div>
          <div className="select-img" onClick=(_e => send(ShowMaterialGroup))>
            <img src="./public/img/select.png" />
          </div>
        </div>
      </div>
    </div>
    (
      state.isShowMaterialGroup ?
        <div className="select-component-content">
          <div className="select-component-item">
            <div className="item-header">
              (DomHelper.textEl("Material"))
            </div>
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
          <div
            className="select-component-bg"
            onClick=(_e => send(HideMaterialGroup))
          />
        </div> :
        ReasonReact.null
    )
    <div className="material-value">
      <Select
        label="Shader"
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