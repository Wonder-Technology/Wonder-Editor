let bindClickStream = (~isSingleClick, debounceTime, clickStream) => {
  let count = ref(0);
  clickStream
  |> Most.tap(_event => count := count^ + 1)
  |> Most.debounce(debounceTime)
  |> Most.tap(_event =>
       isSingleClick ?
         if (count^ !== 1) {
           count := 0;
         } :
         (
           if (count^ < 2) {
             count := 0;
           }
         )
     )
  |> Most.filter(_event => isSingleClick ? count^ === 1 : count^ >= 2)
  |> Most.tap(_event => count := 0);
};