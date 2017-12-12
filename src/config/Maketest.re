type resType = {
  name: string,
  render: string,
  didMount: unit => unit
};

let res = {
  name: "fffck",
  render: {|[
  {
    "name":"button","className":"inline-component","props":[
      {"name":"text", "value":"redoBtn", "type":"string" },
      {"name":"onClick", "value":"redo", "type":"function"}
    ]
  },
  {
    "name":"button","className":"inline-component","props":[
      {"name":"text", "value":"undoBtn", "type":"string" },
      {"name":"onClick", "value":"undo", "type":"function"}
    ]
  }
]|},
  didMount: () => Js.log(123213)
};