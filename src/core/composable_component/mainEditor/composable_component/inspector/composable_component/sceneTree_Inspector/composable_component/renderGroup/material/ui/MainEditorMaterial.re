type state = {
  materialType: AssetMaterialDataType.materialType,
  isShowMaterialGroup: bool,
  currentMaterial: int,
};

type action =
  | ChangeMaterialType(int)
  | ChangeMaterial((int, AssetMaterialDataType.materialType))
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

  let _getAllAssetMaterialData = editorState =>
    AssetNodeType.(
      Js.Array.concat(
        AssetMaterialDataEditorService.getAllDefaultMaterialData(editorState),
        AssetMaterialNodeMapEditorService.getResults(editorState)
        |> Js.Array.map(({materialComponent, type_}) =>
             (materialComponent, type_)
           ),
      )
    );

  let showMaterialAssets =
      (send, currentSceneTreeNode, currentMaterial, currentMaterialType) => {
    let engineState = StateEngineService.unsafeGetState();
    let editorState = StateEditorService.getState();

    _getAllAssetMaterialData(editorState)
    |> Js.Array.map(((material, materialType)) => {
         let className =
           (material, materialType) == (currentMaterial, currentMaterialType) ?
             "item-content item-active" : "item-content";

         <div
           className
           key=(DomHelper.getRandomKey())
           onClick=(_e => send(ChangeMaterial((material, materialType))))>
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

  let _isDefaultMaterial = (material, materialType, editorState) => {
    open AssetMaterialDataType;

    let unsafeGetMaterialDataFunc =
      switch (materialType) {
      | BasicMaterial => AssetMaterialDataEditorService.unsafeGetDefaultBasicMaterialData
      | LightMaterial => AssetMaterialDataEditorService.unsafeGetDefaultLightMaterialData
      };

    let (defaultMaterial, _) = unsafeGetMaterialDataFunc(editorState);

    material === defaultMaterial;
  };

  let buildShieldComponent = (currentMaterial, materialType) =>
    _isDefaultMaterial(
      currentMaterial,
      materialType,
      StateEditorService.getState(),
    ) ?
      <div className="material-shield" /> : ReasonReact.null;
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
  | ChangeMaterial((targetMaterial, targetMaterialType)) =>
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
  <article key="MainEditorMaterial" className="wonder-material">
    <div className="material-drag-div">
      <div className="material-drag-name" />
      <div className="material-select">
        (
          DomHelper.textEl(
            MainEditorMaterialUtils.getName(
              state.currentMaterial,
              state.materialType,
            )
            |> StateLogicService.getEngineStateToGetData,
          )
        )
        <span
          className="select-title" onClick=(_e => send(ShowMaterialGroup))>
          (DomHelper.textEl("select"))
        </span>
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
    </div>
    <div className="material-value">
      <div className="">
        <Select
          label="shader"
          options=(MainEditorMaterialUtils.getMaterialOptions())
          selectedKey=(
            state.materialType
            |> MainEditorMaterialType.convertMaterialTypeToInt
          )
          onChange=(value => send(ChangeMaterialType(value)))
        />
      </div>
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
      (Method.buildShieldComponent(state.currentMaterial, state.materialType))
    </div>
  </article>;

let make = (~store, ~dispatchFunc, ~currentSceneTreeNode, _children) => {
  ...component,
  initialState: () => {
    let materialType =
      MainEditorMaterialUtils.getMaterialTypeByGameObject(
        currentSceneTreeNode,
      )
      |> StateLogicService.getEngineStateToGetData;

    {
      materialType,
      isShowMaterialGroup: false,
      currentMaterial:
        MainEditorMaterialUtils.getMaterialCompnentByType(
          currentSceneTreeNode,
          materialType,
        )
        |> StateLogicService.getEngineStateToGetData,
    };
  },
  reducer: reducer((store, dispatchFunc), currentSceneTreeNode),
  render: self => render((store, dispatchFunc), currentSceneTreeNode, self),
};