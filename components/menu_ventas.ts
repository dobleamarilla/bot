import {recHit} from './conexion';
import {bot} from './bot';
import {userLogin} from './login';
import {registro} from './registro';
import {usaDiccionario} from '../diccionario';
import {getTeclado} from './permisos';

function opcionesVentasSupervisorasLista(sesion: loginObject, data: any)
{
  const menus: menuObject[] = [
    {
      menus: [ 
        [ { text: 'Cosita 1  😃', callback_data: JSON.stringify({accion: "ezequielucho"}) } ], 
        [ { text: 'Cosita 2', callback_data: 'menuAyer' } ], 
        [ { text: 'Cosita 3  😃', callback_data: 'menuSemanaPasada' } ], 
        [ { text: 'Cosita 4', callback_data: 'menuAñoPasado' } ] 
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

async function franquiciado_supervisora(sesion: loginObject):Promise<string>
{
  var sql1 = ` DECLARE @codigoClienteGdt VARCHAR(50) = ${sesion.idUsuarioHit}
  IF EXISTS (SELECT * FROM ConstantsClient WHERE variable = 'userFranquicia' AND Valor = @codigoClienteGdt)
    BEGIN
      SELECT 'FRANQUICIADO' AS resultado
    END
  ELSE
    BEGIN
      IF EXISTS (SELECT * FROM ConstantsClient WHERE variable = 'SupervisoraCodi' AND Valor = @codigoClienteGdt)
        BEGIN
          SELECT 'SUPERVISORA' AS resultado
        END
      ELSE
        BEGIN
          SELECT 'NINGUNO' AS resultado
        END
    END`;

  var res1 = await recHit(sesion.database, sql1);
  return res1[0].resultado;
}

/* DEVUELVE LAS TIENDAS DEL FRANQUICIADO */
async function cargarFranquiciado(sesion: loginObject, intervalo: string)
{
  var sql = `SELECT Codi AS codigoTienda FROM ConstantsClient WHERE variable = 'userFranquicia' AND Valor = ${sesion.idUsuarioHit}`;
  var res = await recHit(sesion.database, sql);
  return res;
}

/* DEVUELVE LA LISTA DE SUPERVISORAS CON LOS DATOS DE VENTAS DEL INTERVALO */
async function cargarSupervisoras(sesion: loginObject, intervalo: string, opts: any)
{
  var sql = "SELECT DISTINCT cc.Valor AS idUsuarioHit, de.NOM AS nombre FROM ConstantsClient cc LEFT JOIN Dependentes de ON cc.Valor = de.CODI WHERE variable = 'SupervisoraCodi' AND Valor IS NOT NULL AND Valor != ''";
  var supervisoras:supervisoraObject[] = await recHit(sesion.database, sql);
  if(supervisoras.length > 0)
  {
    var info: menuObject[] = [
      {
        menus: [],
        necesario: ['ANY'] 
      }
    ];
    for(let i = 0; i < supervisoras.length; i++)
    {
      info[0].menus.push([ { text: `${supervisoras[i].nombre}  😃`, callback_data: JSON.stringify({accion: "ventaSuperv", idHit: supervisoras[i].idUsuarioHit, fecha: intervalo}) } ]);
    }
    let objEnviar =   {
      reply_markup: {
        inline_keyboard: getTeclado(sesion.tipoUsuario, info)      
      }
    }
    bot.editMessageReplyMarkup(objEnviar.reply_markup, opts);
  }
  else
  {
    bot.editMessage(usaDiccionario('TEXTO_SIN_SUPERVISORAS', sesion.idioma), opts);
  }
}

function opcionesVentasTest(sesion: loginObject)
{
  const menus: menuObject[] = [
    {
      menus: [ 
        [ { text: 'JAJAJAJA', callback_data: JSON.stringify({accion: "menuHoy"}) } ], 
        [ { text: usaDiccionario('MENU_AYER', sesion.idioma), callback_data: JSON.stringify({accion: "menuAyer"}) } ], 
        [ { text: usaDiccionario('MENU_SEMANA_PASADA', sesion.idioma), callback_data: JSON.stringify({accion: "menuSemanaPasada"}) } ], 
        [ { text: usaDiccionario('MENU_ANO_PASADO', sesion.idioma), callback_data: JSON.stringify({accion: "menuAñoPasado"}) } ] 
      ],
      necesario: ['ANY']
    }
  ];
  console.log('BUENO:', getTeclado(sesion.tipoUsuario, menus));
  return {
    reply_markup: {
      inline_keyboard: getTeclado(sesion.tipoUsuario, menus)      
    }
  }
}

bot.on('callback_query', async (msg) => {
    const accion = msg.data;
    let text;
    let opts = {chat_id: msg.message.chat.id, message_id: msg.message.message_id};

    var callbackData = JSON.parse(msg.data);
    if(callbackData.accion == 'menuHoy' || callbackData.accion == 'menuAyer' || callbackData.accion == 'menuSemanaPasada' || callbackData.accion == 'menuAñoPasado')
    {
      var sesion: loginObject = await userLogin(msg);
      if(!sesion.error)
      {
        if(callbackData.accion == 'menuHoy')
        {
          var queSoy = await franquiciado_supervisora(sesion);
          
          if(queSoy == 'FRANQUICIADO')
          {
            cargarFranquiciado(sesion, 'HOY');
          }
          else
          {
            if(queSoy == 'SUPERVISORA' || queSoy == 'NINGUNO')
            {
              let objEnviar = await cargarSupervisoras(sesion, 'HOY', opts);
            }
          }
        }
        else if(callbackData.accion == "menuAyer")
        {

        }
        else if(callbackData.accion == "menuSemanaPasada")
        {

        }
        else if(callbackData.accion == "menuAñoPasado")
        {

        }
      }
      else
      {
        registro(msg, sesion.mensaje);
      } 
    }


  // console.log(msg.data);

  });