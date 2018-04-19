let buildComponentUIComponent = MainEditorInspector.Method._buildComponentUIComponent;

let buildFakeAllShowComponentConfig = () =>
  GameObjectAllComponentParseSystem.getGameObjectAllComponentConfig();

let _getErrorComponentConfig = () => {|
   [
       {
            "type":"camera",
            "include_component":[
                "basicCameraView",
                "perspectiveCameraProjection"
            ],
            "exclude_component":[
                "boxGeometry",
                "basicMaterial",
                "sourceInstance"
            ],
            "all_component":[
                { "type" : "transformError" },
                { "type" : "basicCameraView" },
                { "type" : "perspectiveCameraProjection" }
            ]
       },
       {
            "type":"primitive",
            "include_component":[
                "boxGeometry"
            ],
            "exclude_component":[
                "basicCameraView",
                "perspectiveCameraProjection"
            ],
            "all_component":[
                { "type" : "transformError" },
                { "type" : "basicMaterial" },
                { "type" : "sourceInstance" }
            ]
       }
   ]
|};

let buildFakeErrorAllShowComponentConfig = () =>
  _getErrorComponentConfig() |> GameObjectAllComponentParseSystem.convertDataToRecord;