let _buildFakeExtensionAppState = (extensionText) => {
  let componentsMap = ExtensionParseSystem.createComponentMap(extensionText);
  let state = TestToolUI.buildEmptyAppState();
  state.mapState.componentsMap = Some(componentsMap);
  state
};

let buildSpecificExtesion = (parentName, extensionText, index: int) =>
  switch (
    WonderCommonlib.ArraySystem.get(
      index,
      ExtensionParseSystem.extensionPanelComponent(
        parentName,
        extensionText,
        _buildFakeExtensionAppState(extensionText)
      )
    )
  ) {
  | None => <div className="float-div-for-test" />
  | Some(element) => element
  };

let getExtensionSpecificCaseText = () => {|
    (() => {
        var panelExtension = [{
            name: "testPanel",
            parent:"App",
            render: `[
                {
                    "name":"div","className":"inline-component","props":[
                    ]
                },
                {
                    "name":"button","className":"inline-component","props":[
                    ]
                },
                {
                    "name":"div_test","className":"inline-component","props":[
                        {"name":"text_test", "value":"hehe", "type":"string_test" }
                    ]
                }
                ]`,
            initialState:function() {
            },
            willRender: function () {
            },
            didMount: function () {
            }
        }];
        var methodExtension = [];
        return {
            name:"specificCaseComponent",
            panelExtension,
            methodExtension
        };
    })();
|};

let getExtensionText = () => {|
    (() => {
        var panelExtension = [{
            name: "testPanel",
            parent:"App",
            render: `[
                {
                    "name":"div","className":"inline-component","props":[
                    ]
                },
                {
                    "name":"button","className":"inline-component","props":[
                    ]
                },
                {
                    "name":"button","className":"inline-component","props":[
                        {"name":"text", "value":"xme", "type":"string" },
                        {"name":"onClick", "value":"btnHandle", "type":"function"}
                    ]
                },
                {
                    "name":"div_test","className":"inline-component","props":[
                        {"name":"text_test", "value":"hehe", "type":"string_test" }
                    ]
                },
                {
                    "name":"div","className":"inline-component","props":[
                        {"name":"text", "value":"hehe", "type":"string" }
                    ]
                },
                {
                    "name":"float_input","className":"inline-component","props":[
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