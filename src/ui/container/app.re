let component = ReasonReact.statelessComponent "App";

let make state::(state: AppStore.appState) ::dispatch _children => {
  let incrementIfOdd
      (store: Reductive.Store.t (ReduxThunk.thunk AppStore.appState) AppStore.appState) =>
    switch (Reductive.Store.getState store) {
    | {counter} when counter mod 2 === 1 =>
      Reductive.Store.dispatch store (AppStore.CounterAction SimpleStore.Increment)
    | _ => ()
    };
  let incrementAsync store =>
    ignore (
      Js.Global.setTimeout
        (fun () => Reductive.Store.dispatch store (AppStore.CounterAction SimpleStore.Increment))
        1000
    );
  {
    ...component,
    render: fun _self =>
      <div>
        <div> (ReasonReact.stringToElement ("string: " ^ state.notACounter)) </div>
        <div> (ReasonReact.stringToElement ("counter: " ^ string_of_int state.counter)) </div>
        <button onClick=(fun _ => dispatch (AppStore.CounterAction SimpleStore.Increment))>
          (ReasonReact.stringToElement "Increment")
        </button>
        <button onClick=(fun _ => dispatch (AppStore.CounterAction SimpleStore.Decrement))>
          (ReasonReact.stringToElement "Decrement")
        </button>
        <button onClick=(fun _ => dispatch (AppStore.StringAction AppStore.A))>
          (ReasonReact.stringToElement "add a")
        </button>
        <button onClick=(fun _ => dispatch (ReduxThunk.Thunk incrementAsync))>
          (ReasonReact.stringToElement "Increment Async")
        </button>
        <button onClick=(fun _ => dispatch (ReduxThunk.Thunk incrementIfOdd))>
          (ReasonReact.stringToElement "Increment if Odd")
        </button>
      </div>
  }
};