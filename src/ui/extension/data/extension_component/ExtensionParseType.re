[@bs.deriving jsConverter]
type panelType = {
  name: string,
  parent: string,
  render: string,
  initialState: unit => unit,
  willRender: unit => unit,
  didMount: unit => unit
};

[@bs.deriving jsConverter]
type funcType;

/* TODO use Js.Nullable.t */
[@bs.deriving jsConverter]
type t = {
  panelExtension: array(panelType),
  methodExtension: array(funcType),
  name: string
};

external parsePanelTypeToJsObj : panelType => Js.t({..}) = "%identity";

external parseFuncTypeToJsObj : funcType => Js.t({..}) = "%identity";