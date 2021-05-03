open Wonderjs;

open ScriptAttributeType;

open SelectType;

let getScriptAttributeOptions = () => [|
  {
    key: Int |> ScriptAttributeTypeUtils.convertScriptAttributeTypeToInt,
    value: "Int",
  },
  {
    key: Float |> ScriptAttributeTypeUtils.convertScriptAttributeTypeToInt,
    value: "Float",
  },
|];

let updateScriptAttributeNode =
    (nodeId, attributeName, attribute, editorState) =>
  ScriptAttributeNodeAssetEditorService.setNodeData(
    nodeId,
    ScriptAttributeNodeAssetService.buildNodeData(
      ~name=attributeName,
      ~attribute,
    ),
    editorState,
  );