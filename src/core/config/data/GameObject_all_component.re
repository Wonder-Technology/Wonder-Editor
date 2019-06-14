let gameObject_all_component = {|
   [
       {
            "type":"Mesh",
            "components":[
                { "type" : "Geometry" }
            ]
       },
       {
            "type":"Camera",
            "components":[
                { "type" : "CameraGroup" },
                { "type" : "ArcballCameraController" }
            ]
       },
       {
            "type":"Rendering",
            "components":[
                { "type" : "RenderGroup" },
                { "type" : "Light" }
                ]
            },
       {
            "type":"Script",
            "components":[
                { "type" : "Script" }
                ]
            }
    ]
|};