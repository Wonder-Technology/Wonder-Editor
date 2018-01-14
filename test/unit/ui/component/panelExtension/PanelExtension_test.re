open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "PanelExtension ui component",
    () => {
      describe(
        "deal with specific case",
        () => {
          describe(
            "test logic",
            () =>
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
              )
          );
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
        }
      );
      describe(
        "test snapshot",
        () => {
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
    }
  );