open SelectTreeType;

let _fatalShouldBeFolderNode = () =>
  WonderLog.Log.fatal(
    LogUtils.buildFatalMessage(
      ~description={j|should be folder node|j},
      ~reason="",
      ~solution={j||j},
      ~params={j||j},
    ),
  );

let buildNodeByNodeData = (~nodeId, ~nodeData, ~children) =>
  FolderNode(nodeId, nodeData, children);

/* let buildNode = (~nodeId, ~name, ~children=UIStateAssetService.build(), ()) =>
     FolderNode(nodeId, {name: name}, children);

   let getNodeData = folderNode =>
     switch (folderNode) {
     | FolderNode(_, nodeData, _) => nodeData
     | _ => _fatalShouldBeFolderNode()
     }; */

let isFolderNode = node =>
  switch (node) {
  | FolderNode(_, _, _) => true
  | _ => false
  };

let getChildren = folderNode =>
  switch (folderNode) {
  | FolderNode(_, _, children) => children
  | _ => _fatalShouldBeFolderNode()
  };

let setIsSelect = (isSelect, nodeData): folderNodeData => {
  ...nodeData,
  isSelect,
};

/* let getChildrenNodes = folderNode => getChildren(folderNode); */

/*

 let rename = (~name, ~nodeData): folderNodeData => {...nodeData, name};

 let getNodeName = ({name}: folderNodeData) => name;

 let getIsShowChildren = folderNode =>
   switch (folderNode) {
   | FolderNode(_, _, children) =>
     UIStateAssetService.getIsShowChildrenByState(children)
   | _ => _fatalShouldBeFolderNode()
   };

 let clearChildren = folderNode =>
   switch (folderNode) {
   | FolderNode(nodeId, nodeData, children) =>
     buildNodeByNodeData(
       ~nodeId,
       ~nodeData,
       /* ~children=UIStateAssetService.build(~children=[||], ()), */
       ~children=children |> UIStateAssetService.map(_ => [||]),
     )
   | _ => _fatalShouldBeFolderNode()
   };

 /*
 let hasChildren = folderNode =>
    folderNode |> getChildren |> UIStateAssetService.hasChildren; */

 let filterChildrenById = (targetNodeId, children) =>
   children
   |> UIStateAssetService.filter(Js.Array.filter, child =>
        !
          NodeAssetService.isIdEqual(
            NodeAssetService.getNodeId(~node=child),
            targetNodeId,
          )
      );

 let findChild = (folderNode, targetNode) =>
   folderNode
   |> getChildren
   |> UIStateAssetService.find(Js.Array.find, childNode =>
        NodeAssetService.isNodeEqualById(~sourceNode=childNode, ~targetNode)
      );

 let isFolderNode = node =>
   switch (node) {
   | FolderNode(_, _, _) => true
   | _ => false
   }; */