import {getTeclado} from './components/permisos';
import {usaDiccionario} from './diccionario';
function opcionesPedirContacto(texto: string)
{
    return {
             reply_markup: JSON.stringify(
            {
                keyboard: [
                            [{text: texto, request_contact: true}]
                        ]
            })
    };
}

function opcionesInicio(sesion: loginObject)
{
  const menus: menuObject[] = [
    {
      menus: [ 
                [usaDiccionario('MENU_TIENDA', sesion.idioma)], 
                [usaDiccionario('MENU_FICHAR', sesion.idioma)], 
                [usaDiccionario('MENU_INCIDENCIAS', sesion.idioma)] 
              ],
      necesario: ['GERENT', 'GERENT_2', 'ADMINISTRACIO', 'CONTABILITAT', 'RESPONSABLE', 'FRANQUICIA']
    },
    {
      menus: [ 
                [usaDiccionario('MENU_LISTADOS', sesion.idioma)], 
                [usaDiccionario('MENU_PEDIDOS', sesion.idioma)] 
              ],
      necesario: ['ANY']
    }
  ];

  return {
    reply_markup: JSON.stringify({
        keyboard: getTeclado(sesion.tipoUsuario, menus),
        hide_keyboard: false,
        resize_keyboard: true,
        one_time_keyboard: true
      })
    };
}

function opcionesTienda(sesion: loginObject) //  "Principal"
{
  const menus: menuObject[] = [
    {
      menus: [ [usaDiccionario('MENU_VENTAS', sesion.idioma)], ['Comandero'], [usaDiccionario('MENU_TECNICO', sesion.idioma)], [usaDiccionario('MENU_PRINCIPAL', sesion.idioma)] ],
      necesario: ['ANY']
    }
  ];
  return {
      reply_markup: JSON.stringify({
        keyboard: getTeclado(sesion.tipoUsuario, menus),
        hide_keyboard: false,
        resize_keyboard: true,
        one_time_keyboard: true
    })
  }
}

function opcionesVentas(sesion: loginObject)
{
  const menus: menuObject[] = [
    {
      menus: [ 
        [ { text: usaDiccionario('MENU_HOY', sesion.idioma), callback_data: JSON.stringify({accion: "menuHoy"}) } ], 
        [ { text: usaDiccionario('MENU_AYER', sesion.idioma), callback_data: JSON.stringify({accion: "menuAyer"}) } ], 
        [ { text: usaDiccionario('MENU_SEMANA_PASADA', sesion.idioma), callback_data: JSON.stringify({accion: "menuSemanaPasada"}) } ], 
        [ { text: usaDiccionario('MENU_ANO_PASADO', sesion.idioma), callback_data: JSON.stringify({accion: "menuAñoPasado"}) } ] 
      ],
      necesario: ['ANY']
    }
  ];
  return {
    reply_markup: {
      inline_keyboard: getTeclado(sesion.tipoUsuario, menus)      
    }
  }
}


export {opcionesPedirContacto, opcionesInicio, opcionesTienda, opcionesVentas};