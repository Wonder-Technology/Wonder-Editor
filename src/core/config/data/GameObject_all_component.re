let gameObject_all_component = {|
   [
       {
            "type":"camera",
            "include_component":[
                "basicCameraView",
                "perspectiveCameraProjection"
            ],
            "exclude_component":[
                "boxGeometry"
            ],
            "all_component":[
                { "type" : "transform" },
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
                { "type" : "transform" },
                { "type" : "material" },
                { "type" : "light" },
                { "type" : "sourceInstance" }
                ]
            }
            ]
    |};