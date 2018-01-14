open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "PanelExtension ui component",
    () => {
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
            "test snapshot",
            () =>
              test(
                "if specific atom component error",
                () => {
                  let extensionText = ExtensionToolUI.getExtensionSpecificCaseText();
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
              )
          );
          describe(
            "test logic",
            () => {
              test(
                "if can't set map in the store",
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
                  |> toThrowMessage("Failure,-2,appState:the extension componentsMap is empty")
              );
              test(
                "if can't find the specific map in the state componentsMap",
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
                  |> toThrowMessage(
                       "Failure,-2,appointMap:fakeComponent appoint map should exist in the mapState"
                     )
              )
            }
          )
        }
      )
    }
  );