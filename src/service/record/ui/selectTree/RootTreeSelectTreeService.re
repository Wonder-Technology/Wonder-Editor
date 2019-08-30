/* let getAssetTreeRootName = () => "Assets"; */

let hasRootNode = tree =>
  tree
  |> FolderNodeSelectTreeService .isFolderNode;
  /* &&
  FolderNodeAssetService.getNodeNameByData(
    FolderNodeAssetService.getNodeData(tree),
  )
   === getAssetTreeRootName(); */

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
