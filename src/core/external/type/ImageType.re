type htmlImage = {. "src": string};

external convertImgToHtmlImage : ReasonReact.reactElement => htmlImage =
  "%identity";

external convertDomToImageElement :
  htmlImage => WonderWebgl.DomExtendType.imageElement =
  "%identity";

external convertImageElementToSrcImageElements :
  WonderWebgl.DomExtendType.imageElement => htmlImage =
  "%identity";