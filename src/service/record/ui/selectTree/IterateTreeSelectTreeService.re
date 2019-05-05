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

let rec fold =
        (~folderNodeFunc, ~acc, ~tree, ~valueNodeFunc=(acc, _, _) => acc, ())
        : 'r => {
  let recurse = (acc, child) =>
    fold(~acc, ~tree=child, ~valueNodeFunc, ~folderNodeFunc, ());

  switch (tree) {
  | ValueNode(nodeId, valueNodeData) =>
    valueNodeFunc(acc, nodeId, valueNodeData)
  | FolderNode(nodeId, folderNodeData, children) =>
    let localAccum = folderNodeFunc(acc, nodeId, folderNodeData, children);

    children
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. acc, child) => recurse(acc, child),
         localAccum,
       );
  };
};