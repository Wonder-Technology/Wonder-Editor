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




module MapManager = {
  let createMainEditorMap = (dispatch) => {
    let addA = (action, _) => dispatch(action);
    let addB = (action, _) => dispatch(action);
    let main_editorMap = WonderCommonlib.HashMapSystem.createEmpty();
    WonderCommonlib.HashMapSystem.set(
      "addA",
      Obj.magic(addA(AppStore.StringAction(StringStore.A))),
      main_editorMap
    )
    |> WonderCommonlib.HashMapSystem.set(
         "addB",
         Obj.magic(addA(AppStore.StringAction(StringStore.B)))
       )
    |> ignore;
    main_editorMap
  };
};