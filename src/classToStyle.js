class ClassToStyle{
   width(value){
      return {
        width:`${value}px`
      }
   };
   rectangle(width,height){
      return {
         width:`${width}px`,
         height:`${height}px`
       }
   };

   color(color){
      return {
         color:`${color}`,
       }
   };
  
}

module.exports =ClassToStyle;