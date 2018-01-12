open Contract;

open DomHelper;

open ExtensionParseType;

/* [@bs.new] external func : string => Js.t({..}) = "Function"; */
[@bs.val] external eval : string => Js.t({..}) = "";

let _buildExtensionRecord = (extensionText) => tFromJs(eval(extensionText));

let _getExtensionName = (extensionRecord) =>
  extensionRecord.name
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "the name should exist",
             () => Js.Undefined.to_opt(Js.Undefined.return(r)) |> assertExist
           )
         )
     );

let _getExtensionMethods = (extensionRecord) =>
  extensionRecord.methodExtension
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "the methodExtension should exist",
             () => Js.Undefined.to_opt(Js.Undefined.return(r)) |> assertExist
           )
         )
     );

let _getExtensionPanels = (extensionRecord) =>
  extensionRecord.panelExtension
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "the panelExtension should exist",
             () => Js.Undefined.to_opt(Js.Undefined.return(r)) |> assertExist
           )
         )
     );

let createComponentMap = (extensionText) => {
  let extensionRecord = _buildExtensionRecord(extensionText);
  _getExtensionMethods(extensionRecord)
  |> ExtensionMethodMapSystem.createExtensionMap
  |> ComponentMapSystem.addExtensionMap(
       ComponentMapSystem.createComponentMap(),
       _getExtensionName(extensionRecord)
     )
};

let _convertdRecord = (extensionObj) => {
  name: extensionObj##name,
  parent: extensionObj##parent,
  render: extensionObj##render,
  initialState: extensionObj##initialState,
  willRender: extensionObj##willRender,
  didMount: extensionObj##didMount
};

let extensionPanelComponent = (componentName, extensionText, store) => {
  let extensionRecord = _buildExtensionRecord(extensionText);
  _getExtensionPanels(extensionRecord)
  |> Js.Array.map((panel: panelType) => parsePanelTypeToJsObj(panel))
  |> Js.Array.filter((panel) => panel##parent === componentName)
  |> (
    (panelArray) => {
      let len = panelArray |> Js.Array.length;
      switch len {
      | 0 => [||]
      | _ =>
        panelArray
        |> Js.Array.map((panelObj) => panelObj |> _convertdRecord)
        |> Js.Array.map(
             (record) =>
               <PanelExtension
                 key=(getRandomKey())
                 record
                 name=(_getExtensionName(extensionRecord))
                 store
               />
           )
      }
    }
  )
};