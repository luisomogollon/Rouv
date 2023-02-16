import Swal from "sweetalert2";
import axios from "axios";

export function show_alerta(mensaje, icono, foco = "") {
  if (foco !== "") {
    document.getElementById(foco).focus();
  }
  Swal.fire({
    title: mensaje,
    icon: icono,
    customClass: { confirmButton: "btn btn-primary", popup: "animated zoomIn" },
    buttonsStyling: false,
  });
}

export function confirmar(id, title) {
  var url = "https://fakestoreapi.com/products/" + id;
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2",
      cancelButton:
        "text-white bg-gray-400 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Seguro de Eliminar El Producto " + title,
      text: "Se perderá la información del producto",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: '<i class="fa-solid fa-check"></i> Si,eliminar',
      cancelButtonText: '<i class="fa-solid fa-ban"></i>  Cancelar',
    })
    .then((ressult) => {
      if (ressult.isConfirmed) {
        axios
          .delete(url)
          .then((res) => {
            if (res.status === 200) {
              show_alerta("Producto eliminado", "success");
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        show_alerta("Operación cancelada", "info");
      }
    });
}

export function enviarSolicitud(metodo,parametros,url,mensaje){
    axios({method:metodo,url:url,data:parametros}).then(function(respuesta){
        var status = respuesta.data[0]['status'];
        if(status ==='success'){
            show_alerta(mensaje,status);
            window.setTimeout(function(){
                window.location.href='/';
            },1000);
        }
        else{
            var listado='';
            var errores = respuesta.data[1]['errors'];
            Object.keys(errores).forEach(
                key => listado += errores[key][0]+'.'
            );
            show_alerta(listado,'error');
        }
    }).catch(function(error){
        show_alerta('Error en la solicitud','error');
    });
}
