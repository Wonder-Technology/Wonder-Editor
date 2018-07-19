let bindClickStream = (~isSingleClick, debounceTime, clickStream) => {
  let count = ref(0);
  clickStream
  |> WonderBsMost.Most.tap(_event => count := count^ + 1)
  |> WonderBsMost.Most.debounce(debounceTime)
  |> WonderBsMost.Most.tap(_event =>
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
  |> WonderBsMost.Most.filter(_event => isSingleClick ? count^ === 1 : count^ >= 2)
  |> WonderBsMost.Most.tap(_event => count := 0);
};