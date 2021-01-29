import {bot} from './bot';
import {recHit} from './conexion';
import {userLogin} from './login';
import {registro} from './registro';
import {usaDiccionario} from '../diccionario';

bot.on('message' , async (msg: any)=> {
    try
    {
        
        if(msg.text == usaDiccionario("MENU_FICHAR","CA")||msg.text ==usaDiccionario("MENU_FICHAR","ES")){
            let sesion: loginObject = await userLogin(msg);
            fichar(sesion,msg);

        }
    }
    catch(err)
    {
      console.log(err);
    }
  });
   function fichar(sesion: loginObject,msg){
    let id = sesion.idUsuarioHit;
 
					let accio = `select top 1 accio from cdpDadesFichador where usuari = ${id}  order by tmst desc`;
                     recHit( sesion.database,accio).then((data) => {
						let nuevaAccion = (data[0].accio == 1) ? 2 : 1;
						let sqlfichar = `insert into cdpDadesFichador values (0, getdate(), ${nuevaAccion}, ${id}, newid(), null, null, NULL , '[Desde: TELEGRAM]')`;
                         recHit(sesion.database, sqlfichar).then(() => {
							let frase = ["Benvingut ", "Descansa "];
                            bot.sendMessage(msg.chat.id, `${frase[nuevaAccion-1]} ${sesion.nombre}`);
							
						});
					});
				
}