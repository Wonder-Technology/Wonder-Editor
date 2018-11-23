module Stack = {
  type t('a) = list('a);

  let empty = () => [];

  let count = stack => stack |> List.length;

  let addFirst = (value, stack) => [value, ...stack];

  let addLast = (value, stack) => stack @ [value];

  let first = stack => count(stack) === 0 ? None : stack |> List.hd |. Some;

  let removeFirstOrRaise = state => state |> List.tl;

  let sliceToFirst = (countToFirst, stack) => {
    let rec _slice = (count, stack, resultStack) =>
      count <= 0 ?
        resultStack :
        (
          switch (first(stack)) {
          | None => resultStack
          | Some(firstValue) =>
            _slice(
              count |> pred,
              removeFirstOrRaise(stack),
              addLast(firstValue, resultStack),
            )
          }
        );

    count(stack) <= countToFirst ? stack : _slice(countToFirst, stack, []);
  };
};