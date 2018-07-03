let cleanAppStateComponentsMap = () => {
  let state = TestTool.buildEmptyAppState();
  {
    ...state,
    mapState: {
      ...state.mapState,
      componentsMap: None,
    },
  };
};

let buildFakeExtensionAppState = extensionText => {
  let componentsMap = ExtensionParseUtils.createComponentMap(extensionText);
  let state = TestTool.buildEmptyAppState();
  {
    ...state,
    mapState: {
      ...state.mapState,
      componentsMap: Some(componentsMap),
    },
  };
};

let buildSpecificExtesion =
    (parentName, extensionText, index: int, fakeAppState) =>
  switch (
    WonderCommonlib.ArrayService.get(
      index,
      ExtensionParseUtils.extensionPanelComponent(
        parentName,
        extensionText,
        fakeAppState,
      ),
    )
  ) {
  | None => <div className="float-div-for-test" />
  | Some(element) => element
  };

let getNotFindFunctionInMethodExtensionCaseText = () => {|
    var panelExtension = [{
        name: "testPanel",
        parent:"App",
        render: `[
            {
                "name":"float_input","className":"inline-component","props":[
                    {"name":"label", "value":"xXX", "type":"string" },
                    {"name":"onChange", "value":"changeHandle", "type":"function"}
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
        name:"notFindAtom",
        panelExtension,
        methodExtension
    };
|};

let getAttributeTypeErrorCaseText = () => {|
    var panelExtension = [{
        name: "testPanel",
        parent:"App",
        render: `[
            {
                "name":"float_input","className":"inline-component","props":[
                    {"name":"label", "value":"xXX", "type":"string" },
                    {"name":"onChange", "value":"changeHandle", "type":"Function"}
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
        name:"notFindAtom",
        panelExtension,
        methodExtension
    };
|};

let getNotFindAtomAttributeCaseText = () => {|
    var panelExtension = [{
        name: "testPanel",
        parent:"App",
        render: `[
            {
                "name":"div","className":"inline-component","props":[
                    {"name":"text_test", "value":"hehe", "type":"string" }
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
        name:"notFindAtom",
        panelExtension,
        methodExtension
    };
|};

let getNotFindAtomCaseText = () => {|
    var panelExtension = [{
        name: "testPanel",
        parent:"App",
        render: `[
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
        name:"notFindAtom",
        panelExtension,
        methodExtension
    };
|};

let getNoButtonTextCaseText = () => {|
    var panelExtension = [{
        name: "testPanel",
        parent:"App",
        render: `[
            {
                "name":"button","className":"inline-component","props":[
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
        name:"noButtonText",
        panelExtension,
        methodExtension
    };
|};

let getNoDivTextCaseText = () => {|
    var panelExtension = [{
        name: "testPanel",
        parent:"App",
        render: `[
            {
                "name":"div","className":"inline-component","props":[
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
        name:"noDivText",
        panelExtension,
        methodExtension
    };
|};

let getExtensionSpecificCaseText = () => {|
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
            },
            {
                "name":"float_input","className":"inline-component","props":[
                    {"name":"label", "value":"xXX", "type":"string" },
                    {"name":"onChange", "value":"changeHandle", "type":"function"}
                ]
            },
            {
                "name":"float_input","className":"inline-component","props":[
                    {"name":"label", "value":"xXX", "type":"string" },
                    {"name":"onChange", "value":"changeHandle", "type":"Function"}
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
|};

let getExtensionText = () => {|
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
|};