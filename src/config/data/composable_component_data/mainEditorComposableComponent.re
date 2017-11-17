let mainEditor_composable_component_data = {|[
  {
    "name":"number_input","components":[
      {"name":"label","value":"XXX"},
      {"name":"onChange","value":"fck2"}
    ]
  },
  {
    "name":"main_editor","components":[
      {"name":"state","value":"string"},
      {"name":"dispatch","value":"dispatch"}
    ]
  },
  {
    "name":"button","components":[
      {"name":"onClick","value":"fck"},
      {"name":"text","value":"btnText"}
    ]
  }
]|};

let mainEditorRecord =
  mainEditor_composable_component_data |> ComposableParseSystem.convertDataToRecord;