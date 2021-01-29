import {bot} from './bot';
import {recHit} from './conexion';
import {opcionesPedirContacto} from '../funcionesBot';
import {userLogin} from './login';
bot.on('contact', async (msg: any)=>{

    try
    {
        let phoneNumber     = msg.contact.phone_number;
        let idUsuario       = msg.from.id;
        let sql             = `SELECT id AS codi FROM dependentesextes WHERE nom = 'TLF_MOBIL' AND valor = '${phoneNumber.substr(2)}';`;
        let idChat          = msg.chat.id;
        let sqlBucle        = 'SELECT Nom AS nombre, Db AS bbdd FROM Web_Empreses';
        let listaBbdd       = await recHit('hit', sqlBucle);
        let i               = 0;
        let coincidencia    = false;

        while(listaBbdd.length > 0 && i < listaBbdd.length && coincidencia == false)
        {
            let info1 = await recHit(listaBbdd[i].bbdd, sql);
            if(info1.length === 1)
            {
                let codiUser    = info1[0].codi;
                /*
                    Nota: en la base de datos, el número de teléfono siempre se guarda sin prefijo.
                    empresa = Base de datos
                    usuario = ID Usuario Gestión de la Tienda
                    Aux1    = ID Usuario Telegram
                    Aux2    = Número de teléfono
                    Aux3    = ID Chat
                */
                let sql2         =   `
                                        DELETE FROM secretaria WHERE Usuario = '${codiUser}';
                                        INSERT INTO secretaria (Id, lastConnect, empresa, usuario, Aux1, Aux2, Aux3, nombreBBDD) VALUES (newid(), getdate(), '${listaBbdd[i].bbdd}', '${codiUser}', '${idUsuario}', '${phoneNumber.substr(2)}', '${idChat}', '${listaBbdd[i].nombre}');
                                    `;
                await recHit('Hit', sql2);
                userLogin(msg, 'registro');
                coincidencia = true;
            }
            i++;
        }
        if(coincidencia == false)
        {
            recHit('Hit', `DELETE FROM secretaria WHERE Aux1 = '${idUsuario}'`);
            bot.sendMessage(idChat, 'Error: Este teléfono no está registrado. Contacta con oficina 937161010.');
        }
    }
    catch(err)
    {
        console.log(err);
    }
});

function registro(msg: any, error = '')
{
    bot.sendMessage(msg.chat.id, error + "\n¡No sé quién eres! Necesito que me pases tu contacto para comprobarlo.", opcionesPedirContacto("Identificarme"));
}

export {registro};