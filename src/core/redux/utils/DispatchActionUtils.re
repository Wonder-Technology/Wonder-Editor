let dispatchAction = (dispatchFunc, actionFunc, stateTuple) => {
    stateTuple |> actionFunc |> dispatchFunc;
    stateTuple
};