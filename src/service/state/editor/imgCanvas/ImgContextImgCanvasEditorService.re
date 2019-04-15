open EditorType;

let getImgContext = editorState =>
  editorState.imgCanvasRecord |> ImgContextImgCanvasService.getImgContext;

let unsafeGetImgContext = editorState =>
  editorState.imgCanvasRecord
  |> ImgContextImgCanvasService.getImgContext
  |> OptionService.unsafeGet;

let setImgContext = (imgContext, editorState) => {
  ...editorState,
  imgCanvasRecord:
    editorState.imgCanvasRecord
    |> ImgContextImgCanvasService.setImgContext(imgContext),
};