open TreeAssetType;

open NodeAssetType;

let getNewName = () => "New Fnt";

let buildNodeData = (~name, ~fntContent) => {name, fntContent};

let buildNode = (~nodeId, ~name, ~fntContent) =>
  FntNode(nodeId, buildNodeData(~name, ~fntContent));

let buildNodeByNodeData = (~nodeId, ~nodeData) => FntNode(nodeId, nodeData);

let getNodeData = node =>
  switch (node) {
  | FntNode(nodeId, nodeData) => nodeData
  | _ =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        ~description={j|should be fnt node|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let isNode = node =>
  switch (node) {
  | FntNode(_, _) => true
  | _ => false
  };

let getNodeName = node => getNodeData(node).name;

let getNodeNameByData = ({name}: fntNodeData) => name;

let getFntContent = ({fntContent}: fntNodeData) => fntContent;

let rename = (~name, ~nodeData): fntNodeData => {...nodeData, name};