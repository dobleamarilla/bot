import {bot} from './bot';
import {userLogin} from './login';
import {opcionesPedirContacto, opcionesInicio, opcionesTienda, opcionesVentas} from '../funcionesBot';
import {registro} from './registro';
import {usaDiccionario} from '../diccionario';

//START
bot.onText(/\/start/, function onAudioText(msg: any) {
  bot.sendMessage(msg.chat.id, "¡Hola! ¿Quién eres?", opcionesPedirContacto("Identificarse"));
});

bot.on('message' , async (msg: any)=> {
  try
  {
    if(msg.contact == undefined)
    {
      let sesion: loginObject = await userLogin(msg);

      if(!sesion.error && msg.from.is_bot == false && msg.contact == undefined)
      {
        switch(msg.text)
        {
          case usaDiccionario('MENU_PRINCIPAL', 'CA'): 
          case usaDiccionario('MENU_PRINCIPAL', 'ES'): bot.sendMessage(msg.chat.id, usaDiccionario('MENU_PRINCIPAL_TEXTO', sesion.idioma), opcionesInicio(sesion)); break;

          case usaDiccionario('MENU_TIENDA', 'CA'): 
          case usaDiccionario('MENU_TIENDA', 'ES'): bot.sendMessage(msg.chat.id, usaDiccionario('OPCIONS_BOTIGA_TEXTO', sesion.idioma), opcionesTienda(sesion)); break;

          case usaDiccionario('MENU_VENTAS', 'CA'):
          case usaDiccionario('MENU_VENTAS', 'ES'): bot.sendMessage(msg.chat.id, usaDiccionario('OPCIONS_VENTAS_TEXTO', sesion.idioma), opcionesVentas(sesion)); break;
        }
      }
      else
      {
        registro(msg, sesion.mensaje);
      }
    }
  }
  catch(err)
  {
    console.log(err);
  }
});