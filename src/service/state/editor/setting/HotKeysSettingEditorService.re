open EditorType;

open HotKeysType;

open SettingType;

let getHotKeys = ({settingRecord}) =>
  OperateSettingService.getHotKeys(settingRecord);

let _preventBrowserHotKeys = event => {
  let e = ReactEventType.convertReactKeyboardEventToJsEvent(event);

  EventHelper.preventDefault(e);
};

let _handleHotKeyFunc = hotKeyDataArray =>
  hotKeyDataArray
  |> Js.Array.forEach(((hotKeys, hotKeyAction)) =>
       hotKeys
       |> Js.Array.joinWith(",")
       |. HotKeysJs.hotkeys((e, handler) => {
            _preventBrowserHotKeys(e);

            let handleFunc =
              OperateHotKeysService.getHandleFuncByHotKeyAction(hotKeyAction);

            handleFunc();
          })
     );

let bindHotKeys = editorState => {
  let hotKeyArray = editorState |> getHotKeys;

  hotKeyArray
  |> Js.Array.map(({name, values}) =>
       (values, OperateHotKeysService.getHotKeyAction(name))
     )
  |> _handleHotKeyFunc;

  editorState;
};