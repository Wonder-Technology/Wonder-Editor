/* let buildState =
       (
         ~currentScript,
         ~isShowScriptEventFunctionGroupForAdd=false,
         ~isShowScriptEventFunctionGroupForChange=false,
         ~lastScriptEventFunctionNodeIdForAdd=None,
         ~lastScriptEventFunctionNodeIdForChange=None,
         ~unUsedScriptEventFunctionNodeIds=[||],
         /* ~isShowScriptAttributeGroupForAdd=false,
         ~isShowScriptAttributeGroupForChange=false,
         ~lastScriptAttributeNodeIdForAdd=None,
         ~lastScriptAttributeNodeIdForChange=None,
         ~unUsedScriptAttributeNodeIds=[||], */
         (),
       )
       : MainEditorScript.state => {
     currentScript,
     isShowScriptEventFunctionGroupForAdd,
     isShowScriptEventFunctionGroupForChange,
     lastScriptEventFunctionNodeIdForAdd,
     lastScriptEventFunctionNodeIdForChange,
     unUsedScriptEventFunctionNodeIds,
     /* isShowScriptAttributeGroupForAdd,
     isShowScriptAttributeGroupForChange,
     lastScriptAttributeNodeIdForAdd,
     lastScriptAttributeNodeIdForChange,
     unUsedScriptAttributeNodeIds, */
   }; */

/* let reducer = (~action, ~state) => MainEditorScript.reducer(action, state); */

let getScriptAllEventFunctionNodeIds = (script, (editorState, engineState)) =>
  ScriptEngineService.getScriptAllEventFunctionEntries(script, engineState)
  |> Js.Array.map(((name, eventFunctionData)) =>
       OperateTreeAssetLogicService.findNodeIdByName(
         name,
         (editorState, engineState),
       )
       |> OptionService.unsafeGet
     );

let getUnUsedScriptAttributeNodeIds = (script, (editorState, engineState)) =>
  MainEditorScriptAttribute.Method._getUnUsedScriptAttributeNodes(
    script,
    (editorState, engineState),
  )
  |> Js.Array.map(node => NodeAssetService.getNodeId(~node));

let getScriptAllAttributeNodeIds = (script, (editorState, engineState)) =>
  ScriptEngineService.getScriptAllAttributeEntries(script, engineState)
  |> Js.Array.map(((name, attributeData)) =>
       OperateTreeAssetLogicService.findNodeIdByName(
         name,
         (editorState, engineState),
       )
       |> OptionService.unsafeGet
     );