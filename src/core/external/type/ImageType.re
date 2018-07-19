type htmlImage;


external convertImgToHtmlImage : ReasonReact.reactElement => htmlImage =
  "%identity";

external convertDomToImageElement :
  htmlImage => Wonderjs.DomExtendType.imageElement =
  "%identity";