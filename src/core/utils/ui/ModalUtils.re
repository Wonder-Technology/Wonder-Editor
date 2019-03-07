let iterateModalArrayBuildComponent = modalArray =>
  modalArray
  |> Js.Array.map(((title, content, isLink, link)) =>
       <div className="content-field" key=title>
         <div className="field-title"> {DomHelper.textEl(title)} </div>
         <div className="field-content">
           {
             isLink ?
               <a href=link target="_blank">
                 {DomHelper.textEl(content)}
               </a> :
               DomHelper.textEl(content)
           }
         </div>
       </div>
     );