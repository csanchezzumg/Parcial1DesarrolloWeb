$(document).ready(function () {
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
    $('#bio').text('Este perfil ha sido actualizado de una manera dinámica.');
  });

  $('#formPerfil').submit(function (e) {
    e.preventDefault();
    const nombre     = $('#nombre').val();
    const correo     = $('#correo').val();
    const comentario = $('#comentario').val();

    if (!nombre || !correo || !comentario) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    localStorage.setItem(
      'perfilData',
      JSON.stringify({ nombre, correo, comentario })
    );
    // Añadir comentario como nuevo interés
    $('#intereses').append(
      `<li class="list-group-item">${comentario}</li>`
    );
  });

  const perfilData = JSON.parse(localStorage.getItem('perfilData'));
  if (perfilData) {
    $('#nombre').val(perfilData.nombre);
    $('#correo').val(perfilData.correo);
    $('#comentario').val(perfilData.comentario);
  }

  // 7) Petición AJAX para traer el mensaje motivacional
  $('#btnMensaje').click(function () {
    $.ajax({
      url: 'https://s1uplfovq4.execute-api.us-east-1.amazonaws.com/default/example',
      method: 'GET',
      success: function (data) {
        // Mostrar el string del campo "mensaje"
        $('#resultado')
          .removeClass('d-none')
          .text(data.mensaje);
      },
      error: function () {
        $('#resultado')
          .removeClass('d-none')
          .text('Error al obtener datos.');
      }
    });
  });
});
