$(document).ready(function(){
    $("#boton-bazar").click(function(){
        $("#electro,#cocina,#bazar,#audio").show()
       $("#electro,#cocina,#audio").toggle()
    }); 

    $("#boton-cocina").click(function(){
        $("#electro,#cocina,#bazar,#audio").show()
        $("#electro,#bazar,#audio").toggle()
     }); 

     $("#boton-electro").click(function(){
        $("#electro,#cocina,#bazar,#audio").show()
        $("#cocina,#bazar,#audio").toggle()
     }); 

     $("#boton-audio").click(function(){
      $("#electro,#cocina,#bazar,#audio").show()
      $("#cocina,#bazar,#electro").toggle()
   }); 

     $("#boton-todo").click(function(){
        $("#electro,#cocina,#bazar,#audio").show()
     }); 

     
    }); 


   

    






