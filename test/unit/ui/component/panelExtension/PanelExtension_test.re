open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "PanelExtension ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test snapshot",
        () => {
          beforeEach(() => ExtensionTool.cleanAppStateComponentsMap());
          test(
            "accord to user json data, build component",
            () => {
              let extensionText = ExtensionTool.getExtensionText();
              let component =
                ReactTestRenderer.create(
                  ExtensionTool.buildSpecificExtesion(
                    "App",
                    extensionText,
                    0,
                    ExtensionTool.buildFakeExtensionAppState(extensionText)
                  )
                );
              component |> ReactTestTool.createSnapshotAndMatch
            }
          );
          test(
            "if the parent is different from the one specified in extensionText, don't render",
            () => {
              let extensionText = ExtensionTool.getExtensionText();
              let component =
                ReactTestRenderer.create(
                  ExtensionTool.buildSpecificExtesion(
                    "MainEditor",
                    extensionText,
                    0,
                    ExtensionTool.buildFakeExtensionAppState(extensionText)
                  )
                );
              component |> ReactTestTool.createSnapshotAndMatch
            }
          )
        }
      );
      describe(
        "deal with specific case",
        () => {
          beforeEach(() => ExtensionTool.cleanAppStateComponentsMap());
          describe(
            "test logic",
            () =>
              describe(
                "test exception",
                () => {
                  describe(
                    "test error",
                    () => {
                      let _test = (extensionText, expectedMsg) => {
                        let error =
                          createMethodStubWithJsObjSandbox(sandbox, Console.console, "error");
                        let component =
                          ReactTestRenderer.create(
                            ExtensionTool.buildSpecificExtesion(
                              "App",
                              extensionText,
                              0,
                              ExtensionTool.buildFakeExtensionAppState(extensionText)
                            )
                          );
                        LogTool.getErrorMessage(error) |> expect |> toContain(expectedMsg)
                      };
                      test(
                        "if extension not add text for div, log error message and continue",
                        () => _test(ExtensionTool.getNoDivTextCaseText(), "buildDiv")
                      );
                      test(
                        "if extension not add text for button, log error message and continue",
                        () => _test(ExtensionTool.getNoButtonTextCaseText(), "buildButton")
                      );
                      test(
                        "if extension add error atom component name, log error message and continue",
                        () =>
                          _test(
                            ExtensionTool.getNotFindAtomCaseText(),
                            "_getUniqueAtomAttribute"
                          )
                      );
                      test(
                        "if extension add error atom component type, log error message and continue",
                        () =>
                          _test(
                            ExtensionTool.getAttributeTypeErrorCaseText(),
                            "_createArgumentArray"
                          )
                      );
                      test(
                        "if extension not set function in methodExtension, log error message and continue",
                        () =>
                          _test(
                            ExtensionTool.getNotFindFunctionInMethodExtensionCaseText(),
                            "the specific function onChange : changeHandle not exist in appState->mapState->componentsMap"
                          )
                      )
                    }
                  );
                  describe(
                    "test fatal",
                    () => {
                      test(
                        "if can't set map in the store, fatal",
                        () =>
                          expect(
                            () => {
                              let extensionText = ExtensionTool.getExtensionText();
                              ReactTestRenderer.create(
                                ExtensionTool.buildSpecificExtesion(
                                  "App",
                                  extensionText,
                                  0,
                                  TestTool.buildEmptyAppState()
                                )
                              )
                            }
                          )
                          |> toThrowMessageRe(
                               [%re {|/appState->mapState->componentsMap is none/img|}]
                             )
                      );
                      test(
                        "if can't find the specific map in the state componentsMap, fatal",
                        () =>
                          expect(
                            () => {
                              let extensionText = ExtensionTool.getExtensionText();
                              let specificExtensionText =
                                ExtensionTool.getExtensionSpecificCaseText();
                              ReactTestRenderer.create(
                                ExtensionTool.buildSpecificExtesion(
                                  "App",
                                  extensionText,
                                  0,
                                  ExtensionTool.buildFakeExtensionAppState(specificExtensionText)
                                )
                              )
                            }
                          )
                          |> toThrowMessageRe([%re {|/_getUniqueMapByComponentName/img|}])
                      )
                    }
                  )
                }
              )
          )
        }
      )
    }
  );