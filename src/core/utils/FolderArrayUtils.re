let isFileBeFolder = (fileId, editorState) =>
  editorState |> AssetEditorService.unsafeGetFolderArray |> Js.Array.includes(fileId);

let addFolderIntoFolderArray = (folderId, editorState) =>
  editorState
  |> AssetEditorService.setFolderArray(
       editorState |> AssetEditorService.unsafeGetFolderArray |> ArrayService.push(folderId)
     );

let removeFolderFromFolderArray = (folderId, editorState) =>
  editorState
  |> AssetEditorService.setFolderArray(
       editorState
       |> AssetEditorService.unsafeGetFolderArray
       |> Js.Array.filter((id) => folderId !== id)
     );