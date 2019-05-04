open SelectTreeType;

let rec cata =
        (
          ~tree,
          ~valueNodeFunc=(nodeId, nodeData) =>
                           ValueNodeSelectTreeService.buildNodeByNodeData(
                             ~nodeId,
                             ~nodeData,
                           ),
          ~folderNodeFunc=(nodeId, nodeData, children) =>
                            FolderNodeSelectTreeService.buildNodeByNodeData(
                              ~nodeId,
                              ~nodeData,
                              ~children,
                            ),
          (),
        )
        : 'r => {
  let recurse = cata(~valueNodeFunc, ~folderNodeFunc);

  switch (tree) {
  | ValueNode(nodeId, valueNodeData) => valueNodeFunc(nodeId, valueNodeData)
  | FolderNode(nodeId, folderNodeData, children) =>
    folderNodeFunc(
      nodeId,
      folderNodeData,
      children |> Js.Array.map(node => recurse(~tree=node, ())),
    )
  };
};