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
          beforeEach(() => ExtensionToolUI.cleanAppStateComponentsMap());
          test(
            "accord to user json data, build component",
            () => {
              let extensionText = ExtensionToolUI.getExtensionText();
              let component =
                ReactTestRenderer.create(
                  ExtensionToolUI.buildSpecificExtesion(
                    "App",
                    extensionText,
                    0,
                    ExtensionToolUI.buildFakeExtensionAppState(extensionText)
                  )
                );
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "if the parent is different from the one specified in extensionText, don't render",
            () => {
              let extensionText = ExtensionToolUI.getExtensionText();
              let component =
                ReactTestRenderer.create(
                  ExtensionToolUI.buildSpecificExtesion(
                    "MainEditor",
                    extensionText,
                    0,
                    ExtensionToolUI.buildFakeExtensionAppState(extensionText)
                  )
                );
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          )
        }
      );
      describe(
        "deal with specific case",
        () => {
          beforeEach(() => ExtensionToolUI.cleanAppStateComponentsMap());
          describe(
            "test logic",
            () => {
              test(
                "if extension not add text for div, log error message and continue",
                () => {
                  let error = createMethodStubWithJsObjSandbox(sandbox, Console.console, "error");
                  let extensionText = ExtensionToolUI.getNoDivTextCaseText();
                  let component =
                    ReactTestRenderer.create(
                      ExtensionToolUI.buildSpecificExtesion(
                        "App",
                        extensionText,
                        0,
                        ExtensionToolUI.buildFakeExtensionAppState(extensionText)
                      )
                    );
                  LogToolUI.getErrorMessage(error) |> expect |> toContain("buildDiv")
                }
              );
              test(
                "if extension not add text for button, log error message and continue",
                () => {
                  let error = createMethodStubWithJsObjSandbox(sandbox, Console.console, "error");
                  let extensionText = ExtensionToolUI.getNoButtonTextCaseText();
                  let component =
                    ReactTestRenderer.create(
                      ExtensionToolUI.buildSpecificExtesion(
                        "App",
                        extensionText,
                        0,
                        ExtensionToolUI.buildFakeExtensionAppState(extensionText)
                      )
                    );
                  LogToolUI.getErrorMessage(error) |> expect |> toContain("buildButton")
                }
              );
              test(
                "if extension add error atom component name, log error message and continue",
                () => {
                  let error = createMethodStubWithJsObjSandbox(sandbox, Console.console, "error");
                  let extensionText = ExtensionToolUI.getNotFindAtomCaseText();
                  let component =
                    ReactTestRenderer.create(
                      ExtensionToolUI.buildSpecificExtesion(
                        "App",
                        extensionText,
                        0,
                        ExtensionToolUI.buildFakeExtensionAppState(extensionText)
                      )
                    );
                  LogToolUI.getErrorMessage(error)
                  |> expect
                  |> toContain("_getUniqueAtomAttribute")
                }
              );
              /* test(
                   "if extension add error atom component attribute name, log error message and continue",
                   () => {
                     let error = createMethodStubWithJsObjSandbox(sandbox, Console.console, "error");
                     let extensionText = ExtensionToolUI.getNotFindAtomAttributeCaseText();
                     let component =
                       ReactTestRenderer.create(
                         ExtensionToolUI.buildSpecificExtesion(
                           "App",
                           extensionText,
                           0,
                           ExtensionToolUI.buildFakeExtensionAppState(extensionText)
                         )
                       );
                     LogToolUI.getErrorMessage(error)
                     |> expect
                     |> toContain("_getUniqueAtomAttribute")
                   }
                 ); */
              test(
                "if extension add error atom component type, log error message and continue",
                () => {
                  let error = createMethodStubWithJsObjSandbox(sandbox, Console.console, "error");
                  let extensionText = ExtensionToolUI.getAttributeTypeErrorCaseText();
                  let component =
                    ReactTestRenderer.create(
                      ExtensionToolUI.buildSpecificExtesion(
                        "App",
                        extensionText,
                        0,
                        ExtensionToolUI.buildFakeExtensionAppState(extensionText)
                      )
                    );
                  LogToolUI.getErrorMessage(error) |> expect |> toContain("_createArgumentArray")
                }
              );
              test(
                "if extension not set function in methodExtension, log error message and continue",
                () => {
                  let error = createMethodStubWithJsObjSandbox(sandbox, Console.console, "error");
                  let extensionText =
                    ExtensionToolUI.getNotFindFunctionInMethodExtensionCaseText();
                  let component =
                    ReactTestRenderer.create(
                      ExtensionToolUI.buildSpecificExtesion(
                        "App",
                        extensionText,
                        0,
                        ExtensionToolUI.buildFakeExtensionAppState(extensionText)
                      )
                    );
                  LogToolUI.getErrorMessage(error)
                  |> expect
                  |> toContain(
                       "the specific function onChange : changeHandle not exist in appState->mapState->componentsMap"
                     )
                }
              );
              test(
                "if can't set map in the store, fatal",
                () =>
                  expect(
                    () => {
                      let extensionText = ExtensionToolUI.getExtensionText();
                      ReactTestRenderer.create(
                        ExtensionToolUI.buildSpecificExtesion(
                          "App",
                          extensionText,
                          0,
                          TestToolUI.buildEmptyAppState()
                        )
                      )
                    }
                  )
                  |> toThrowMessage("appState:the extension componentsMap is empty")
              );
              test(
                "if can't find the specific map in the state componentsMap, fatal",
                () =>
                  expect(
                    () => {
                      let extensionText = ExtensionToolUI.getExtensionText();
                      let specificExtensionText = ExtensionToolUI.getExtensionSpecificCaseText();
                      ReactTestRenderer.create(
                        ExtensionToolUI.buildSpecificExtesion(
                          "App",
                          extensionText,
                          0,
                          ExtensionToolUI.buildFakeExtensionAppState(specificExtensionText)
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
    }
  );