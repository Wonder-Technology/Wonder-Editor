module JsonData = {
  let composable_component_data = {|[


      {
      "name":"app","className":"","props":[
      ],
      "children":[
{"name":"main_editor", "type":"composable"}
      ]
      },


      {
      "name":"main_editor","className":"inline-component sceneTree-parent","props":[
        {"name":"state","value":"appState", "type":"state"}
      ],
      "children":[
{"name":"sceneTree", "type":"composable"},
{"name":"inspector", "type":"composable"}
      ]
      },


      {
      "name":"inspector","className":"inline-component sceneTree-parent","props":[
        {"name":"state","value":"appState", "type":"state"}
      ],

"exec_data":{
"type":"dynamic",
 "strategy":"getComponent"
 },


      "children":[
{"name":"transform", "type":"atom"},
{"name":"material", "type":"atom"}
      ]
      }
]|};
  let main_editorRecord = composable_component_data |> ComposableParseSystem.convertDataToRecord;
};