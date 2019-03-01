type window;

[@bs.val] external window: Js.t({..}) = "global";

let buildFakeLocalStorage = () => {
  let fakeLocalStorage = WonderCommonlib.MutableHashMapService.createEmpty();

  window##_localStorage #= fakeLocalStorage;
};

let removeFakeLocalStorageItem = key => {
  let localStorage =
    WonderCommonlib.MutableHashMapService.deleteVal(
      key,
      window##localStorage,
    );

  window##localStorage #= localStorage;
};

let getExtensionTestKey = () => "databaseTest";