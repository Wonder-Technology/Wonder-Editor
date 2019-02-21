let getMaterialComponent =
    (~nodeId, ~editorState=StateEditorService.getState(), ()) => {
  let {materialComponent}: NodeAssetType.materialNodeData =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
    |> MaterialNodeAssetService.getNodeData;

  materialComponent;
};

let getMaterialName =
    (
      ~nodeId,
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) => {
  let {materialComponent, type_}: NodeAssetType.materialNodeData =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
    |> MaterialNodeAssetService.getNodeData;

  NodeNameAssetLogicService.getMaterialNodeName(
    ~material=materialComponent,
    ~type_,
    ~engineState,
  );
};

let getMaterialType =
    (~nodeId, ~editorState=StateEditorService.getState(), ()) => {
  let {type_}: NodeAssetType.materialNodeData =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
    |> MaterialNodeAssetService.getNodeData;

  type_;
};

let _findNodeByMaterialComponentAndType =
    (material, materialType, editorState) =>
  IterateTreeAssetService.findOne(
    ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
    ~predMaterialNodeFunc=
      node => {
        let {materialComponent, type_}: NodeAssetType.materialNodeData =
          MaterialNodeAssetService.getNodeData(node);

        materialComponent === material && materialType === type_;
      },
    (),
  );

let hasMaterialComponent = (material, materialType, editorState) =>
  _findNodeByMaterialComponentAndType(material, materialType, editorState)
  |> Js.Option.isSome;

let findNodeIdByMaterialComponentAndType =
    (material, materialType, editorState) =>
  _findNodeByMaterialComponentAndType(material, materialType, editorState)
  |> Js.Option.map((. node) => NodeAssetService.getNodeId(~node));