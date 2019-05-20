open SelectTreeType;

let replaceNode = (targetNodeId, newTreeNode, tree) => {
  let _nodeFunc = (nodeId, nodeData, buildNodeByNodeDataFunc) =>
    nodeId === targetNodeId ?
      newTreeNode : buildNodeByNodeDataFunc(~nodeId, ~nodeData);
  let _valueNodeFunc = (nodeId, nodeData) =>
    _nodeFunc(
      nodeId,
      nodeData,
      ValueNodeSelectTreeService.buildNodeByNodeData,
    );
  let _folderNodeFunc = (nodeId, nodeData, children) =>
    _nodeFunc(
      nodeId,
      nodeData,
      FolderNodeSelectTreeService.buildNodeByNodeData(~children),
    );

  IterateTreeSelectTreeService.cata(
    ~tree,
    ~valueNodeFunc=_valueNodeFunc,
    ~folderNodeFunc=_folderNodeFunc,
    (),
  );
};

let updateNode = (nodeId, nodeData, buildNodeByNodeDataFunc, tree) =>
  tree |> replaceNode(nodeId, buildNodeByNodeDataFunc(~nodeId, ~nodeData));

let insertNode = (targetNodeId, newTreeNode, tree) => {
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|new tree node not exist in tree|j},
                   ~actual={j|exist|j},
                 ),
                 () =>
                 findNodeById(
                   NodeSelectTreeService.getNodeId(~node=newTreeNode),
                   tree,
                 )
                 |> Js.Option.isNone
                 |> assertTrue
               )
             )
           )
         ),
       StateEditorService.getStateIsDebug(),
     ); */

  let _folderNodeFunc = (nodeId, nodeData, children) =>
    FolderNodeSelectTreeService.buildNodeByNodeData(
      ~nodeId,
      ~nodeData,
      ~children=
        nodeId === targetNodeId ?
          children |> Js.Array.copy |> ArrayService.push(newTreeNode) :
          children,
    );

  IterateTreeSelectTreeService.cata(
    ~tree,
    ~folderNodeFunc=_folderNodeFunc,
    (),
  );
};