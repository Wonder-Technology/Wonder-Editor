open TreeAssetType;

open NodeAssetType;

let getNewName = () => "New Text";

let buildNodeData = (~type_, ~name, ~content) => {type_, name, content};

let buildNode = (~nodeId, ~type_, ~name, ~content) =>
  TextNode(nodeId, buildNodeData(~type_, ~name, ~content));

let buildNodeByNodeData = (~nodeId, ~nodeData) => TextNode(nodeId, nodeData);

let getNodeData = node =>
  switch (node) {
  | TextNode(nodeId, nodeData) => nodeData
  | _ =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        ~description={j|should be wdb node|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let isNode = node =>
  switch (node) {
  | TextNode(_, _) => true
  | _ => false
  };

let rename = (~name, ~nodeData): textNodeData => {...nodeData, name};

let getNodeNameByData = ({name}: textNodeData) => name;