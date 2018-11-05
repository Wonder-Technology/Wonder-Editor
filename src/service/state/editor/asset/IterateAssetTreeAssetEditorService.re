open AssetTreeNodeType;

open CurrentNodeDataType;

let getChildrenNameAndIdArr = (nodeId, nodeType, (editorState, engineState)) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          test(
            Log.buildAssertMessage(
              ~expect={j|the parent asset node type should be Folder|j},
              ~actual={j|not|j},
            ),
            () =>
            editorState
            |> TreeRootAssetEditorService.getAssetTreeRoot
            |> OptionService.unsafeGet
            |> TreeAssetEditorService.getSpecificTreeNodeById(nodeId)
            |> OptionService.unsafeGet
            |> (({type_}) => type_ == Folder |> assertTrue)
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  editorState
  |> TreeRootAssetEditorService.getAssetTreeRoot
  |> OptionService.unsafeGet
  |> TreeAssetEditorService.getSpecificTreeNodeById(nodeId)
  |> OptionService.unsafeGet
  |> (
    ({children}: assetTreeNodeType) =>
      children
      |> Js.Array.filter(({type_ as childType}: assetTreeNodeType) =>
           childType === nodeType
         )
      |> Js.Array.map(({nodeId as currentNodeId, type_}: assetTreeNodeType) => {
           let name =
             editorState
             |> AssetNodeUtils.handleSpeficFuncByAssetNodeType(
                  type_,
                  (
                    FolderNodeMapAssetEditorService.getFolderName(
                      currentNodeId,
                    ),
                    OperateTextureLogicService.getTextureBaseName(
                      currentNodeId,
                    ),
                    AssetMaterialNodeMapLogicService.getMaterialBaseName(
                      currentNodeId,
                      engineState,
                    ),
                    WDBNodeMapAssetEditorService.getWDBBaseName(
                      currentNodeId,
                    ),
                  ),
                );

           (name, nodeId);
         })
  );
};

let rec iterateNameArrBuildNewName = (name, childrenNameArr) =>
  childrenNameArr |> Js.Array.includes(name) ?
    childrenNameArr
    |> iterateNameArrBuildNewName(FileNameService.buildNameSucc(name)) :
    name;

let getUniqueTreeNodeName =
    (name, nodeType, nodeId, (editorState, engineState)) =>
  switch (nodeId) {
  | None => name
  | Some(nodeId) =>
    (editorState, engineState)
    |> getChildrenNameAndIdArr(nodeId, nodeType)
    |> Js.Array.map(((name, nodeId)) => name)
    |> iterateNameArrBuildNewName(name)
  };