let extendText = {|
    (() => {
        var panelExtend = [{
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
        var funcExtend = [{
            name: "btnHandle",
            value: function () {
                amy.extend();
                let state = amy.getEditorState();
            }
        }, {
            name: "changeHandle",
            value: function (val) {
                console.log(val)
            }
        }];
        return {
            name:"arvinTest",
            panelExtend,
            funcExtend
        };
    })();
|};