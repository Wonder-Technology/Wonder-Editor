type t('a) = list('a);

let addFirst = (value: 'a, list: t('a)) : t('a) => [value, ...list];

let rec countImpl = (list: t('a), count: int) : int =>
  switch list {
  | [_, ...tail] => countImpl(tail, count + 1)
  | [] => count
  };

let count = (list: t('a)) : int => countImpl(list, 0);

let empty = () : t('a) => [];

let isEmpty = (list: t('a)) : bool =>
  switch list {
  | [] => true
  | _ => false
  };

let isNotEmpty = (list: t('a)) : bool =>
  switch list {
  | [] => false
  | _ => true
  };

let rec findOrRaise = (f: 'a => bool, list: t('a)) : 'a =>
  switch list {
  | [head, ...tail] =>
    if (f(head)) {
      head
    } else {
      findOrRaise(f, tail)
    }
  | [] => failwith("not found")
  };

let first = (list: t('a)) : option('a) =>
  switch list {
  | [head, ..._] => Some(head)
  | [] => None
  };

let firstOrRaise = (list: t('a)) : 'a =>
  switch list {
  | [head, ..._] => head
  | [] => failwith("empty")
  };

let removeAll = (_: t('a)) : t('a) => [];

let removeFirstOrRaise = (list: t('a)) : t('a) =>
  switch list {
  | [_, ...tail] => tail
  | [] => failwith("List is empty")
  };

let return = (value: 'a) : t('a) => [value];

let rec some = (f: 'a => bool, list: t('a)) : bool =>
  switch list {
  | [head, ...tail] => f(head) || some(f, tail)
  | [] => false
  };
