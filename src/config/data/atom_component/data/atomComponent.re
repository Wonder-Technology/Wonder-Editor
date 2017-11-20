let atom_component_data = {|[
 {
   "name":"number_input", "existProps":[
      {"name":"label"},
      {"name":"defaultValue"},
      {"name":"onChange"}
   ]
 },
 {
   "name":"main_editor", "existProps":[
      {"name":"state"},
      {"name":"dispatch"},
      {"name":"appState"}
   ]
 },
 {
   "name":"button", "existProps":[
      {"name":"text"},
      {"name":"onClick"}
   ]
 }
]|};

let atomRecord = atom_component_data |> AtomParseSystem.convertDataToRecord;