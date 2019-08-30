open TreeAssetType;

open NodeAssetType;

let buildEmptyCustomData = () => Obj.magic(Js.Nullable.null);

let buildNodeData = (~name, ~execFunc, ~execOrder) => {
  name,
  execFuncData: {
    name,
    execFunc,
    customData: buildEmptyCustomData(),
    execOrder,
  },
};

let buildNode = (~nodeId, ~name, ~execFunc, ~execOrder) =>
  IMGUIExecFuncDataNode(nodeId, buildNodeData(~name, ~execFunc, ~execOrder));

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

let getNodeName = node => getNodeData(node).name;

let getNodeNameByData = ({name}: NodeAssetType.imguiExecFuncDataNodeData) => name;

let getExecOrder = ({execFuncData}: NodeAssetType.imguiExecFuncDataNodeData) =>
  execFuncData.execOrder;

let getExecFunc = ({execFuncData}: NodeAssetType.imguiExecFuncDataNodeData) =>
  execFuncData.execFunc;