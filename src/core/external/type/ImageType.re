type error;

type htmlImage = {
  .
  "width": int,
  "height": int,
  "src": string,
  "onload": unit => unit,
  "onerror": error => unit,
};

external convertImgToHtmlImage : ReasonReact.reactElement => htmlImage =
  "%identity";

external convertDomToImageElement :
  htmlImage => WonderWebgl.DomExtendType.imageElement =
  "%identity";

external convertImageElementToSrcImageElements :
  WonderWebgl.DomExtendType.imageElement => htmlImage =
  "%identity";