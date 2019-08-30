open TreeAssetType;

open NodeAssetType;

let buildEmptyCustomData = () => Obj.magic(Js.Nullable.null);

let buildNodeData = (~name, ~execFunc, ~zIndex) => {
  name,
  execFuncData: {
    name,
    execFunc,
    customData: buildEmptyCustomData(),
    zIndex,
  },
};

let buildNode = (~nodeId, ~name, ~execFunc, ~zIndex) =>
  IMGUIExecFuncDataNode(nodeId, buildNodeData(~name, ~execFunc, ~zIndex));

let buildNodeByNodeData = (~nodeId, ~nodeData) =>
  IMGUIExecFuncDataNode(nodeId, nodeData);

let getNodeData = node =>
  switch (node) {
  | IMGUIExecFuncDataNode(nodeId, nodeData) => nodeData
  | _ =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        ~description={j|should be imgui exec func node|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let isNode = node =>
  switch (node) {
  | IMGUIExecFuncDataNode(_, _) => true
  | _ => false
  };

let rename = (~name, ~nodeData): imguiExecFuncDataNodeData => {
  ...nodeData,
  name,
};

let getNodeName = node => getNodeData(node).name;

let getNodeNameByData = ({name}: NodeAssetType.imguiExecFuncDataNodeData) => name;

let getZIndex = ({execFuncData}: NodeAssetType.imguiExecFuncDataNodeData) =>
  execFuncData.zIndex;

let getExecFunc = ({execFuncData}: NodeAssetType.imguiExecFuncDataNodeData) =>
  execFuncData.execFunc;