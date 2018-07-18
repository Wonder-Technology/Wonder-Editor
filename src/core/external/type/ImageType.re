type htmlImage;

[@bs.new] external create : unit => htmlImage = "Image";

external convertImgToHtmlImage : ReasonReact.reactElement => htmlImage =
  "%identity";

external convertDomToImageElement :
  htmlImage => Wonderjs.DomType.imageElement =
  "%identity";