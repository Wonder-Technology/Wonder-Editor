let _getDispathForTest = [%bs.raw
  dispatchFunc => {|
    if (typeof window.dispathFuncStub_wonder_editor !== "undefined") {
        return window.dispathFuncStub_wonder_editor;
    }
    else{
        return dispatchFunc
    }
    |}
];

let getDispatch = () =>
  _getDispathForTest(Reductive.Store.dispatch(IndexStore.store));

let getState = () => Reductive.Store.getState(IndexStore.store);