const formularioContainer = document.getElementById("contact-us")


formularioContainer.addEventListener("submit", () =>{
swal("¡¡ El formulario fue enviado con éxito !!", "nos pondremos en contacto lo más pronto posible", "success");
formularioContainer.reset();
} )