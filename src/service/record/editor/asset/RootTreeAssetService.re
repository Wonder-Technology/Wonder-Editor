let getAssetTreeRootName = () => "Assets";

let hasRootNode = tree =>
  tree
  |> FolderNodeAssetService.isFolderNode
  &&
  FolderNodeAssetService.getNodeName(
    FolderNodeAssetService.getNodeData(tree),
  ) === getAssetTreeRootName();

let getRootNode = tree => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|tree has root node|j},
                ~actual={j|not|j},
              ),
              () =>
              hasRootNode(tree) |> assertTrue
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );
  tree;
};

let buildRootNode = (name, index) => {
  let (newIndex, id) = IdAssetService.generateNodeId(index);

  (
    id,
    FolderNodeAssetService.buildNode(
      ~nodeId=id,
      ~name,
      ~children=UIStateAssetService.build(~isShowChildren=true, ()),
      (),
    ),
    newIndex,
  );
};