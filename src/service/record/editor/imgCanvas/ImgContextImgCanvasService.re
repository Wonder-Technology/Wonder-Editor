open ImgCanvasType;

let getImgContext = imgCanvasRecord => imgCanvasRecord.imgContext;

let setImgContext = (imgContext, imgCanvasRecord) => {
  ...imgCanvasRecord,
  imgContext: Some(imgContext),
};