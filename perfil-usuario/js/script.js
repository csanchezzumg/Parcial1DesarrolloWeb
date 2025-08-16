$(document).ready(function () {
  // Mostrar alerta
  $('#btnBienvenida').click(function () {
    alert('¡Bienvenido, Carlos!');
  });

  $('#btnColor').click(function () {
    $('body').css('background-color', '#ffe4e1');
    localStorage.setItem('bgColor', '#ffe4e1');
  });

  const savedColor = localStorage.getItem('bgColor');
  if (savedColor) {
    $('body').css('background-color', savedColor);
  }

  $('#btnCambiarTexto').click(function () {
    $('#bio').text('Este perfil ha sido actualizado de una manera dinámiac.');
  });

  // Validación y almacenamiento del formulario
  $('#formPerfil').submit(function (e) {
    e.preventDefault();
    const nombre = $('#nombre').val();
    const correo = $('#correo').val();
    const comentario = $('#comentario').val();

    if (!nombre || !correo || !comentario) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    localStorage.setItem('perfilData', JSON.stringify({ nombre, correo, comentario }));
    $('#intereses').append(`<li class="list-group-item">${comentario}</li>`);
  });

  // Precargar datos
  const perfilData = JSON.parse(localStorage.getItem('perfilData'));
  if (perfilData) {
    $('#nombre').val(perfilData.nombre);
    $('#correo').val(perfilData.correo);
    $('#comentario').val(perfilData.comentario);
  }
});

$('#btnMensaje').click(function () {
    $.ajax({
        url: 'https://s1uplfovq4.execute-api.us-east-1.amazonaws.com/default/example',
        method: 'GET',
        success: function (data) {
            $('#resultado').removeClass('d-none').text(data.mensaje);
        },
        error: function () {
            $('#resultado').removeClass('d-none').text('Error al obtener datos.');
        }
    });
});

