let buildComponentUIComponent = MainEditorInspector.Method._buildComponentUIComponent;

let buildFakeAllShowComponentConfig = () =>
  GameObjectAllComponentParseSystem.getGameObjectAllComponentConfig();

let _getErrorComponentConfig = () => {|
   [
       {
            "type":"camera",
            "include_component":[
                "cameraController"
            ],
            "exclude_component":[
                "boxGeometry",
                "material",
                "sourceInstance"
            ],
            "all_component":[
                { "type" : "transformError" },
                { "type" : "cameraController" }
            ]
       },
       {
            "type":"primitive",
            "include_component":[
                "boxGeometry"
            ],
            "exclude_component":[
                "cameraController"
            ],
            "all_component":[
                { "type" : "transformError" },
                { "type" : "material" },
                { "type" : "sourceInstance" }
            ]
       }
   ]
|};

let buildFakeErrorAllShowComponentConfig = () =>
  _getErrorComponentConfig() |> GameObjectAllComponentParseSystem.convertDataToRecord;