let app_composable_component_data = {|[
  {
    "name":"number_input","props":[
      {"name":"label", "value":"Arvin", "type":"string"},
      {"name":"onChange", "value":"fck2", "type":"function"}
    ]
  },
  {
    "name":"main_editor","props":[
      {"name":"state","value":"stringState", "type":"function"},
      {"name":"dispatch","value":"dispatch", "type":"function"}
    ]
  },
  {
    "name":"button","props":[
      {"name":"onClick", "value":"fck", "type":"function"},
      {"name":"text", "value":"btnText", "type":"string" }
    ]
  }
]|};

let appRecord = app_composable_component_data |> ComposableParseSystem.convertDataToRecord;