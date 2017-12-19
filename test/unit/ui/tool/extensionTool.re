let buildFakePanelExtensionRecord = () => {
  let panelExtensionRecord: ExtensionParseType.panelType = {
    name: "fakePanel",
    parent: "App",
    render: {|
        [
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
                ]
            |},
    willRender: () => Js.log("extension component will render"),
    didMount: () => Js.log("extension component did mount")
  };
  panelExtensionRecord
};
let extensionText = {|
    (() => {
        var panelExtension = [{
            name: "testPanel",
            parent: "App",
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
            willRender: function () {
                console.log("app panel component will render")
            },
            didMount: function () {
                console.log("app panel component did mount");
            }
        }];
        var funcExtension = [{
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
            funcExtension
        };
    })();
|};