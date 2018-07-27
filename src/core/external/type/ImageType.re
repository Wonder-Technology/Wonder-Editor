type htmlImage;


external convertImgToHtmlImage : ReasonReact.reactElement => htmlImage =
  "%identity";

external convertDomToImageElement :
  htmlImage => WonderWebgl.DomExtendType.imageElement =
  "%identity";