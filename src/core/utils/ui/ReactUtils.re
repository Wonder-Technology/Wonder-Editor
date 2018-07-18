external convertImageToReactElement :
  Wonderjs.DomType.imageElement => ReasonReact.reactElement =
  "%identity";

let addStyleProp = (name, prop, style) =>
  ReactDOMRe.Style.unsafeAddProp(style, name, prop);