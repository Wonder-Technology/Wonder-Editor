let buildSpecificExtesion = (parentName, extensionText, index: int) =>
  WonderCommonlib.ArraySystem.get(
    index,
    ExtensionParseSystem.extensionPanelComponent(
      parentName,
      extensionText,
      UITestTool.buildFakeExtensionAppState(extensionText)
    )
  );

let extensionText = {|
    (() => {
        var panelExtension = [{
            name: "testPanel",
            parent:"App",
            render: `[
                {
                    "name":"button","className":"inline-component","props":[
                        {"name":"text", "value":"xme", "type":"string" },
                        {"name":"onClick", "value":"btnHandle", "type":"function"}
                    ]
                },
                {
                    "name":"number_input","className":"inline-component","props":[
                        {"name":"label", "value":"xXX", "type":"string" },
                        {"name":"onChange", "value":"changeHandle", "type":"function"}
                    ]
                }
                ]`,
            initialState:function() {
                console.log("app panel component will init")
            },
            willRender: function () {
                console.log("app panel component will render")
            },
            didMount: function () {
                console.log("app panel component did mount");
            }
        }];
        var methodExtension = [{
            name: "btnHandle",
            value: function () {
            }
        }, {
            name: "changeHandle",
            value: function (val) {
                console.log(val)
            }
        }];
        return {
            name:"fakeComponent",
            panelExtension,
            methodExtension
        };
    })();
|};