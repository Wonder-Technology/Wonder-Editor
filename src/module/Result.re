module type Result = {
  type t('a, 'b) =
    | Success('a)
    | Fail('b);

  let success: 'a => t('a, 'b);

  let fail: 'b => t('a, 'b);

  let either: ('a => 'b, 'c => 'b, t('a, 'c)) => 'b;

  let map: ('a => 'b, t('a, 'c)) => t('b, 'c);

  let apply:
    (
      ~switchFunc: t('a => 'b, 'c),
      ~result: t('a, 'd),
      ~addFailureFunc: ('c, 'd) => 'e,
      ~handleFailAndSuceessFunc: ('c, 'a) => 'e,
      ~handleSuceessFuncAndFailFunc: ('a => 'b, 'd) => 'e
    ) =>
    t('b, 'e);
};

/* module MakeEditorStateResult = (Item: Result) => {
     type t = Item.t(EditorType.editorState, (string, EditorType.editorState));

     let success = Item.success;

     let fail = Item.fail;

     let apply = Item.apply;

     let getState = (x: t) =>
       switch (x) {
       | Success(state) => state
       | Fail((_, state)) => state
       };

     let either = (successFunc, twoTrackInput) =>
       Item.either(
         successFunc,
         ((msg, state)) => (msg, successFunc(state) |> getState) |> fail,
         twoTrackInput,
       );
   }; */

module Result = {
  type t('a, 'b) =
    | Success('a)
    | Fail('b);

  let success = result => Success(result);

  let fail = result => Fail(result);

  let either = (successFunc, failureFunc, twoTrackInput) =>
    switch (twoTrackInput) {
    | Success(s) => successFunc(s)
    | Fail(f) => failureFunc(f)
    };

  let bind = (switchFunc, twoTrackInput) =>
    either(switchFunc, fail, twoTrackInput);

  let map = (oneTrackFunc, twoTrackInput) =>
    either(result => result |> oneTrackFunc |> success, fail, twoTrackInput);

  /* let plus = (addSuccessFunc, addFailureFunc, switch1Func, switch2Func, x) =>
     switch (switch1Func(x), switch2Func(x)) {
     | (Success(s1), Success(s2)) => Success(addSuccessFunc(s1, s2))
     | (Fail(f1), Success(_)) => Fail(f1)
     | (Success(_), Fail(f2)) => Fail(f2)
     | (Fail(f1), Fail(f2)) => Fail(addFailureFunc(f1, f2))
     }; */

  let apply =
      (
        ~switchFunc,
        ~result,
        ~addFailureFunc,
        ~handleFailAndSuceessFunc,
        ~handleSuceessFuncAndFailFunc,
      ) =>
    switch (switchFunc, result) {
    | (Success(func), Success(s)) => Success(func(s))
    | (Fail(f1), Success(s)) => Fail(handleFailAndSuceessFunc(f1, s))
    | (Success(func), Fail(f2)) =>
      Fail(handleSuceessFuncAndFailFunc(func, f2))
    | (Fail(f1), Fail(f2)) => Fail(addFailureFunc(f1, f2))
    };
};

module MakeSameDataResult = (Item: Result) => {
  type t('a) = Item.t('a, (string, 'a));

  let success: 'a => t('a) = Item.success;

  let fail: ((string, 'a)) => t('a) = Item.fail;

  /* let fail = (result: (string, 'a)) : t('a) => Fail(result); */

  let apply:
    (
      ~switchFunc: t('a => 'b),
      ~result: t('a),
      ~addFailureFunc: ('c, 'd) => 'e,
      ~handleFailAndSuceessFunc: ('c, 'a) => 'e,
      ~handleSuceessFuncAndFailFunc: ('a => 'b, 'd) => 'e
    ) =>
    t('b) = Item.apply;

  let getData = (result: t('a)) =>
    switch (result) {
    | Success(data) => data
    | Fail((_, data)) => data
    };

  let map = (handleDataFunc, twoTrackInput) =>
    Item.either(
      handleDataFunc,
      ((msg, data)) => (msg, handleDataFunc(data) |> getData) |> fail,
      twoTrackInput,
    );

  /* let either = (successFunc, failureFunc, twoTrackInput) =>
     switch (twoTrackInput) {
     | Success(s) => successFunc(s)
     | Fail(f) => failureFunc(f)
     }; */

  let handleError = (successFunc, failFunc, result: t('a)) =>
    switch (result) {
    | Success(result) => successFunc(result)
    | Fail((msg, result)) => failFunc(msg, result)
    };
  /* let handleError = (handleFailFunc, result: t('a)) =>
     switch (result) {
     | Success(result) => result
     | Fail((msg, result)) => handleFailFunc(msg, result)
     }; */
};

module SameDataResult = MakeSameDataResult(Result);

module MakeRelationResult = (Item: Result) => {
  type t = Item.t(unit, option(string));

  let success: unit => t = () => Item.success();

  let fail: option(string) => t = Item.fail;

  let map: (unit => unit, t) => t = Item.map;

  let isSuccess = (result: t) =>
    switch (result) {
    | Success(_) => true
    | _ => false
    };

  let handleSuccess = (handleSuccessFunc, result: t): t =>
    switch (result) {
    | Success () => handleSuccessFunc()
    | Fail(msg) => result
    };

  let handleError = (handleFailFunc, result: t): t =>
    switch (result) {
    | Success () => result
    | Fail(msg) => handleFailFunc(msg)
    };
};

module RelationResult = MakeRelationResult(Result);

/* module MakeOperateTreeResult = (Item: Result) => {
     type t = Item.t(TreeAssetType.tree, (string, TreeAssetType.tree));

     let success = Item.success;

     let fail = Item.fail;
     /* let unsafeGetTree = result =>
          switch (result) {
          | Success(tree) => tree
          | Fail((_, tree)) => tree
          };

        let isFail = result =>
          switch (result) {
          | Fail(_) => true
          | Success(_) => false
          }; */
   };

   module OperateTreeResult = MakeOperateTreeResult(Result); */