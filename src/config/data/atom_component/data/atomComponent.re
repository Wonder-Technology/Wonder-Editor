let atom_component_data = {|[
 {
   "name":"number_input", "existProps":[
      {"name":"label"},
      {"name":"defaultValue"},
      {"name":"onChange"}
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