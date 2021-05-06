'use strict';

var React = require("react");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var TestTool$WonderEditor = require("../../tool/TestTool.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");
var ExtensionParseUtils$WonderEditor = require("../../../src/extension/config/utils/extension_component/ExtensionParseUtils.js");

function cleanAppStateComponentsMap(param) {
  var state = TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return /* record */[
          /* isInitEngine */state[/* isInitEngine */0],
          /* mapState : record */[/* componentsMap */undefined],
          /* updateState */state[/* updateState */2],
          /* inspectorState */state[/* inspectorState */3],
          /* showComponentState */state[/* showComponentState */4]
        ];
}

function buildFakeExtensionAppState(extensionText) {
  var componentsMap = ExtensionParseUtils$WonderEditor.createComponentMap(extensionText);
  var state = TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return /* record */[
          /* isInitEngine */state[/* isInitEngine */0],
          /* mapState : record */[/* componentsMap */Caml_option.some(componentsMap)],
          /* updateState */state[/* updateState */2],
          /* inspectorState */state[/* inspectorState */3],
          /* showComponentState */state[/* showComponentState */4]
        ];
}

function buildSpecificExtesion(parentName, extensionText, index, fakeAppState) {
  var match = ArrayService$WonderCommonlib.get(index, ExtensionParseUtils$WonderEditor.extensionPanelComponent(parentName, extensionText, fakeAppState));
  if (match !== undefined) {
    return Caml_option.valFromOption(match);
  } else {
    return React.createElement("div", {
                className: "float-div-for-test"
              });
  }
}

function getNotFindFunctionInMethodExtensionCaseText(param) {
  return "\n    var panelExtension = [{\n        name: \"testPanel\",\n        parent:\"App\",\n        render: `[\n            {\n                \"name\":\"float_input\",\"className\":\"inline-component\",\"props\":[\n                    {\"name\":\"label\", \"value\":\"xXX\", \"type\":\"string\" },\n                    {\"name\":\"onChange\", \"value\":\"changeHandle\", \"type\":\"function\"}\n                ]\n            }\n            ]`,\n        initialState:function() {\n        },\n        willRender: function () {\n        },\n        didMount: function () {\n        }\n    }];\n    var methodExtension = [];\n    return {\n        name:\"notFindAtom\",\n        panelExtension,\n        methodExtension\n    };\n";
}

function getAttributeTypeErrorCaseText(param) {
  return "\n    var panelExtension = [{\n        name: \"testPanel\",\n        parent:\"App\",\n        render: `[\n            {\n                \"name\":\"float_input\",\"className\":\"inline-component\",\"props\":[\n                    {\"name\":\"label\", \"value\":\"xXX\", \"type\":\"string\" },\n                    {\"name\":\"onChange\", \"value\":\"changeHandle\", \"type\":\"Function\"}\n                ]\n            }\n            ]`,\n        initialState:function() {\n        },\n        willRender: function () {\n        },\n        didMount: function () {\n        }\n    }];\n    var methodExtension = [];\n    return {\n        name:\"notFindAtom\",\n        panelExtension,\n        methodExtension\n    };\n";
}

function getNotFindAtomAttributeCaseText(param) {
  return "\n    var panelExtension = [{\n        name: \"testPanel\",\n        parent:\"App\",\n        render: `[\n            {\n                \"name\":\"div\",\"className\":\"inline-component\",\"props\":[\n                    {\"name\":\"text_test\", \"value\":\"hehe\", \"type\":\"string\" }\n                ]\n            }\n            ]`,\n        initialState:function() {\n        },\n        willRender: function () {\n        },\n        didMount: function () {\n        }\n    }];\n    var methodExtension = [];\n    return {\n        name:\"notFindAtom\",\n        panelExtension,\n        methodExtension\n    };\n";
}

function getNotFindAtomCaseText(param) {
  return "\n    var panelExtension = [{\n        name: \"testPanel\",\n        parent:\"App\",\n        render: `[\n            {\n                \"name\":\"div_test\",\"className\":\"inline-component\",\"props\":[\n                    {\"name\":\"text_test\", \"value\":\"hehe\", \"type\":\"string_test\" }\n                ]\n            }\n            ]`,\n        initialState:function() {\n        },\n        willRender: function () {\n        },\n        didMount: function () {\n        }\n    }];\n    var methodExtension = [];\n    return {\n        name:\"notFindAtom\",\n        panelExtension,\n        methodExtension\n    };\n";
}

function getNoButtonTextCaseText(param) {
  return "\n    var panelExtension = [{\n        name: \"testPanel\",\n        parent:\"App\",\n        render: `[\n            {\n                \"name\":\"button\",\"className\":\"inline-component\",\"props\":[\n                ]\n            }\n            ]`,\n        initialState:function() {\n        },\n        willRender: function () {\n        },\n        didMount: function () {\n        }\n    }];\n    var methodExtension = [];\n    return {\n        name:\"noButtonText\",\n        panelExtension,\n        methodExtension\n    };\n";
}

function getNoDivTextCaseText(param) {
  return "\n    var panelExtension = [{\n        name: \"testPanel\",\n        parent:\"App\",\n        render: `[\n            {\n                \"name\":\"div\",\"className\":\"inline-component\",\"props\":[\n                ]\n            }\n            ]`,\n        initialState:function() {\n        },\n        willRender: function () {\n        },\n        didMount: function () {\n        }\n    }];\n    var methodExtension = [];\n    return {\n        name:\"noDivText\",\n        panelExtension,\n        methodExtension\n    };\n";
}

function getExtensionSpecificCaseText(param) {
  return "\n    var panelExtension = [{\n        name: \"testPanel\",\n        parent:\"App\",\n        render: `[\n            {\n                \"name\":\"div\",\"className\":\"inline-component\",\"props\":[\n                ]\n            },\n            {\n                \"name\":\"button\",\"className\":\"inline-component\",\"props\":[\n                ]\n            },\n            {\n                \"name\":\"div_test\",\"className\":\"inline-component\",\"props\":[\n                    {\"name\":\"text_test\", \"value\":\"hehe\", \"type\":\"string_test\" }\n                ]\n            },\n            {\n                \"name\":\"float_input\",\"className\":\"inline-component\",\"props\":[\n                    {\"name\":\"label\", \"value\":\"xXX\", \"type\":\"string\" },\n                    {\"name\":\"onChange\", \"value\":\"changeHandle\", \"type\":\"function\"}\n                ]\n            },\n            {\n                \"name\":\"float_input\",\"className\":\"inline-component\",\"props\":[\n                    {\"name\":\"label\", \"value\":\"xXX\", \"type\":\"string\" },\n                    {\"name\":\"onChange\", \"value\":\"changeHandle\", \"type\":\"Function\"}\n                ]\n            }\n            ]`,\n        initialState:function() {\n        },\n        willRender: function () {\n        },\n        didMount: function () {\n        }\n    }];\n    var methodExtension = [];\n    return {\n        name:\"specificCaseComponent\",\n        panelExtension,\n        methodExtension\n    };\n";
}

function getExtensionText(param) {
  return "\n    var panelExtension = [{\n        name: \"testPanel\",\n        parent:\"App\",\n        render: `[\n            {\n                \"name\":\"button\",\"className\":\"inline-component\",\"props\":[\n                    {\"name\":\"text\", \"value\":\"xme\", \"type\":\"string\" },\n                    {\"name\":\"onClick\", \"value\":\"btnHandle\", \"type\":\"function\"}\n                ]\n            },\n            {\n                \"name\":\"div\",\"className\":\"inline-component\",\"props\":[\n                    {\"name\":\"text\", \"value\":\"hehe\", \"type\":\"string\" }\n                ]\n            },\n            {\n                \"name\":\"float_input\",\"className\":\"inline-component\",\"props\":[\n                    {\"name\":\"label\", \"value\":\"xXX\", \"type\":\"string\" },\n                    {\"name\":\"onChange\", \"value\":\"changeHandle\", \"type\":\"function\"}\n                ]\n            }\n            ]`,\n        initialState:function() {\n            console.log(\"app panel component will init\")\n        },\n        willRender: function () {\n            console.log(\"app panel component will render\")\n        },\n        didMount: function () {\n            console.log(\"app panel component did mount\");\n        }\n    }];\n    var methodExtension = [{\n        name: \"btnHandle\",\n        value: function () {\n        }\n    }, {\n        name: \"changeHandle\",\n        value: function (val) {\n            console.log(val)\n        }\n    }];\n    return {\n        name:\"fakeComponent\",\n        panelExtension,\n        methodExtension\n    };\n";
}

exports.cleanAppStateComponentsMap = cleanAppStateComponentsMap;
exports.buildFakeExtensionAppState = buildFakeExtensionAppState;
exports.buildSpecificExtesion = buildSpecificExtesion;
exports.getNotFindFunctionInMethodExtensionCaseText = getNotFindFunctionInMethodExtensionCaseText;
exports.getAttributeTypeErrorCaseText = getAttributeTypeErrorCaseText;
exports.getNotFindAtomAttributeCaseText = getNotFindAtomAttributeCaseText;
exports.getNotFindAtomCaseText = getNotFindAtomCaseText;
exports.getNoButtonTextCaseText = getNoButtonTextCaseText;
exports.getNoDivTextCaseText = getNoDivTextCaseText;
exports.getExtensionSpecificCaseText = getExtensionSpecificCaseText;
exports.getExtensionText = getExtensionText;
/* react Not a pure module */
