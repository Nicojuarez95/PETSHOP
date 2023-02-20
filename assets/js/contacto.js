const formularioContainer = document.getElementById("contact-us")


formularioContainer.addEventListener("submit", (e) =>{
e.preventDefault()
swal("¡¡El formulario fue enviado con éxito!!", "Nos pondremos en contacto lo más pronto posible", "success");
formularioContainer.reset()
} )