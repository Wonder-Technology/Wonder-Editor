let gameObject_all_component = {|
   [
       {
            "type":"camera",
            "include_component":[
                "cameraController"
            ],
            "exclude_component":[
                "boxGeometry"
            ],
            "all_component":[
                { "type" : "transform" },
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
                { "type" : "transform" },
                { "type" : "material" },
                { "type" : "sourceInstance" }
            ]
       }
   ]
|};