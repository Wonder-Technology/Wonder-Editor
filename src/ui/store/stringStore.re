type stringAction =
  | A
  | B;

let stringReduce = (state, action) =>
  switch action {
  | A => state ++ "a"
  | B => state ++ "b"
  };