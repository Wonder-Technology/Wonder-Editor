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
      {"name":"dispatch"}
   ]
 },
 {
   "name":"inspector", "existProps":[
      {"name":"state"}
   ]
 },
 {
   "name":"sceneTree", "existProps":[
      {"name":"state"}
   ]
 },
 {
   "name":"button", "existProps":[
      {"name":"text"},
      {"name":"onClick"}
   ]
 },
 {
   "name":"div", "existProps":[
      {"name":"text"}
   ]
 }
]|};

let atomRecord = atom_component_data |> AtomParseSystem.convertDataToRecord;