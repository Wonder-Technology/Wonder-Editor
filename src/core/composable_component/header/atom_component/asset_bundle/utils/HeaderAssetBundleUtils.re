module GenerateAB = {
  let setSelectForSelectTree = (tree, isSelect, node) => {
    open SelectTreeType;

    let rec _toggle = (isSelect, node, tree) =>
      switch (node) {
      | FolderNode(nodeId, nodeData, children) =>
        let tree =
          FolderNodeSelectTreeUILocalService.setNodeData(
            nodeId,
            FolderNodeSelectTreeService.setIsSelect(isSelect, nodeData),
            children,
            tree,
          );

        children
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. tree, node) => _toggle(isSelect, node, tree),
             tree,
           );
      | ValueNode(nodeId, nodeData) =>
        ValueNodeSelectTreeUILocalService.setNodeData(
          nodeId,
          ValueNodeSelectTreeService.setIsSelect(isSelect, nodeData),
          tree,
        )
      };

    switch (node) {
    | FolderNode(_, nodeData, _) => _toggle(isSelect, node, tree)
    | ValueNode(nodeId, nodeData) =>
      ValueNodeSelectTreeUILocalService.setNodeData(
        nodeId,
        ValueNodeSelectTreeService.setIsSelect(isSelect, nodeData),
        tree,
      )
    };
  };
};

let downloadAB = (name, ab) => HeaderExportUtils.download(ab, name, "");