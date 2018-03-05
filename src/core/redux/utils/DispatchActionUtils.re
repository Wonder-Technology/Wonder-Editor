let dispatchAction = (dispatch, actionFunc, stateTuple) => {
    stateTuple |> actionFunc |> dispatch;
    stateTuple
};