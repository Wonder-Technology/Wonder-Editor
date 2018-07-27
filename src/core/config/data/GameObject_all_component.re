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
                { "type" : "perspectiveCameraProjection" },
                { "type" : "arcballCamera" }
            ]
       },
       {
            "type":"primitive",
            "include_component":[
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

let gameObject_all_component_test = {|
   [
       {
            "type":"Mesh",
            "components":[
                { "type" : "MeshRenderer" }
            ]
       },
       {
            "type":"Rendering",
            "components":[
                { "type" : "BasicCameraView" },
                { "type" : "PerspectiveCameraProjection" },
                { "type" : "Light" },
                { "type" : "Material" },
                { "type" : "SourceInstance" }
            ]
        }
    ]
|};