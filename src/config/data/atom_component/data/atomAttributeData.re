let atom_attibute_data = {|[
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

let atomAttributeRecord = atom_attibute_data |> AtomAttributeParse.convertDataToRecord;