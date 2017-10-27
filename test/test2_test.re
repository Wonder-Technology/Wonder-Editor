open Jest;

let _ = describe "Expect" (fun () => Expect.(test "toBe" (fun () => expect (1 + 2) |> toBe 3)));

describe
  "Expect.Operators"
  (
    fun () => {
      open Expect;
      open! Expect.Operators;
      test "==" (fun () => expect (1 + 2) == 3)
    }
  );