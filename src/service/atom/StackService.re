type t('a) = {
  count: int,
  list: list('a),
};

let count = ({count}: t('a)) : int => count;

let first = ({list}: t('a)) : option('a) => list |> ListService.first;
let firstOrRaise = ({list}: t('a)) : 'a => list |> ListService.firstOrRaise;

let addFirst = (value: 'a, {count, list}: t('a)) : t('a) => {
  count: count + 1,
  list: [value, ...list],
};

let empty = () : t('a) => {count: 0, list: []};

let fromList = (list: list('a)) : t('a) => {
  count: list |> ListService.count,
  list,
};

let removeAll = (_: t('a)) : t('a) => empty();

let removeFirstOrRaise = ({count, list}: t('a)) : t('a) => {
  count: count - 1,
  list:
    switch (list) {
    | [_, ...tail] => tail
    | [] => failwith("stack is empty")
    },
};

let return = (value: 'a) : t('a) => {count: 1, list: [value]};

let toList = ({list}: t('a)) : list('a) => list;