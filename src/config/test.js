(() => {
    var panelExtend = [{
        name: "ffck",
        parent: "App",
        render: `[
            {
                "name":"button","className":"inline-component","props":[
                    {"name":"text", "value":"xme", "type":"string" },
                    {"name":"onClick", "value":"btnHandle", "type":"function"}
                ]
            }, 
            {
                "name":"FloatInput","className":"inline-component","props":[
                    {"name":"label", "value":"xXX", "type":"string" },
                    {"name":"onChange", "value":"changeHandle", "type":"function"}
                ]
            }
            ]`,
        willRender: function () {
            console.log("app panel component will render")
        },
        didMount: function () {
            console.log("app component did mount");
        }
    }];
    var funcExtned = [{
        name: "btnHandle",
        value: function () {
            console.log("the xme is click")
        }
    }, {
        name: "changeHandle",
        value: function (val) {
            console.log(val)
        }
    }];
    return {
        panelExtend,
        funcExtned
    };
})();