open DomHelper;

open ExtensionParseType;

/* [@bs.new] external func : string =>( unit => Js.t({..}) ) = "Function"; */
let func = [%bs.raw
  {| function(extensionText) {
    return (new Function(extensionText))();
  }
  |}
];

let _buildExtensionRecord = (extensionText) => tFromJs(func(extensionText));

let _getExtensionName = (extensionRecord) =>
  extensionRecord.name
  |> WonderLog.Contract.ensureCheck(
       (r) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|the name exist|j}, ~actual={j|not|j}),
                 () => r |> assertNullableExist
               )
             )
           )
         ),
       EditorStateDataEdit.getStateIsDebug()
     );

let _getExtensionMethods = (extensionRecord) =>
  extensionRecord.methodExtension
  |> WonderLog.Contract.ensureCheck(
       (r) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|the methodExtension exist|j},
                   ~actual={j|not|j}
                 ),
                 () => r |> assertNullableExist
               )
             )
           )
         ),
       EditorStateDataEdit.getStateIsDebug()
     );

let _getExtensionPanels = (extensionRecord) =>
  extensionRecord.panelExtension
  |> WonderLog.Contract.ensureCheck(
       (r) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|the panelExtension exist|j}, ~actual={j|not|j}),
                 () => r |> assertNullableExist
               )
             )
           )
         ),
       EditorStateDataEdit.getStateIsDebug()
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