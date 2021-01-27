import {recHit} from './conexion';
import {bot} from './bot';
import {opcionesInicio} from '../funcionesBot';
async function userLogin(msg: any, historial: string = ''): Promise<loginObject>
{
    try
    {
        let idUsuarioTelegram: number = msg.from.id;
        let devolver: loginObject;
        let sql = ` SELECT Empresa as bbdd, Usuario as idUsuarioHit, Aux2 as telefono, Aux3 as chatId, nombreBBDD AS empresa FROM Secretaria WHERE Aux1 = '${idUsuarioTelegram}';
                    UPDATE Secretaria SET LastConnect = GETDATE() WHERE Aux1 = '${idUsuarioTelegram}';
                `;
        var info = await recHit('Hit', sql);
    
        if(info.length === 1)
        {
            let sql2    = `
                            DECLARE @nombre VARCHAR(255)
                            DECLARE @tipoUsuario VARCHAR(50)
                            DECLARE @email VARCHAR(255)
                            DECLARE @telefono VARCHAR(50) = '${info[0].telefono}'
                            DECLARE @idUsuarioHit VARCHAR(50) = ${info[0].idUsuarioHit}
                            DECLARE @idioma VARCHAR(10)
                            IF EXISTS (SELECT id as codi FROM dependentesExtes WHERE nom = 'TLF_MOBIL' AND valor = @telefono)
                                BEGIN
                                    SELECT @nombre = nom FROM Dependentes WHERE CODI = @idUsuarioHit;
                                    SELECT @email = valor FROM dependentesExtes WHERE id = @idUsuarioHit AND nom = 'EMAIL';
                                    SELECT @tipoUsuario = valor FROM dependentesExtes WHERE id = @idUsuarioHit and nom = 'TIPUSTREBALLADOR';
                                    SELECT @idioma = valor FROM dependentesExtes WHERE id = @idUsuarioHit AND nom = 'IDIOMA';
                                    SELECT @nombre as nombre, @email as email, @tipoUsuario as tipoUsuario, @idioma as idioma, 'OK' as resultado;
                                END
                            ELSE
                                BEGIN
                                    SELECT 'HAY CAMBIO' as resultado;
                                END
                        `;
            let info2   = await recHit(info[0].bbdd, sql2);
            if(info2.length === 1)
            {
                if(info2[0].resultado == 'OK')
                {
                    devolver = {
                        error: false,
                        idUsuarioHit: info[0].idUsuarioHit,
                        database: info[0].bbdd,
                        tipoUsuario: info2[0].tipoUsuario,
                        nombre: info2[0].nombre,
                        idUsuarioTelegram: idUsuarioTelegram,
                        email: info2[0].email,
                        telefono: info[0].telefono,
                        chatId: info[0].chatId,
                        idioma: info2[0].idioma,
                        empresa: info[0].empresa
                    };
                    if(historial == 'registro')
                    {
                        switch(devolver.idioma)
                        {
                            case 'CA': bot.sendMessage(msg.chat.id, `Hola ${devolver.nombre}! Benvingut@ a ${devolver.empresa}.`, opcionesInicio(devolver)); break;
                            case 'ES': bot.sendMessage(msg.chat.id, `¡Hola ${devolver.nombre}! Bienvenid@ a ${devolver.empresa}.`, opcionesInicio(devolver)); break;
                            default: bot.sendMessage(msg.chat.id, `Hola ${devolver.nombre}! Benvingut a ${devolver.empresa}.`, opcionesInicio(devolver)); break;
                        }
                    }
                    return devolver;
                }
                else
                {
                    if(info2[0].resultado == 'HAY CAMBIO')
                    {
                        await recHit('Hit', `DELETE FROM Secretaria WHERE Aux1 = '${idUsuarioTelegram}'`);

                        return {
                            error: true, 
                            mensaje: 'Error: La información de tu usuario ha cambiado. Contacta con oficina.',
                            idUsuarioHit: null,
                            database: null,
                            tipoUsuario: null,
                            nombre: null,
                            idUsuarioTelegram: null,
                            email: null,
                            telefono: null,
                            idioma: null,
                            chatId: null,
                            empresa: null
                        };
                    }
                }
            }
            else
            {
                return {
                    error: true, 
                    mensaje: 'Error: Fallo login.ts. Contactar con Hit Systems.',
                    idUsuarioHit: null,
                    database: null,
                    tipoUsuario: null,
                    nombre: null,
                    idUsuarioTelegram: null,
                    email: null,
                    telefono: null,
                    idioma: null,
                    chatId: null,
                    empresa: null
                };
            }
        }
        else
        {
            if(info.length === 0)
            {
                return {
                    error: true, 
                    mensaje: 'Error: Este teléfono no está registrado. Contacta con oficina.',
                    idUsuarioHit: null,
                    database: null,
                    tipoUsuario: null,
                    nombre: null,
                    idUsuarioTelegram: null,
                    email: null,
                    telefono: null,
                    idioma: null,
                    chatId: null,
                    empresa: null
                };
            }
            else
            {
                return {
                    error: true, 
                    mensaje: 'Error: Hay más de un usuario con este teléfono. Contacta con oficina.',
                    idUsuarioHit: null,
                    database: null,
                    tipoUsuario: null,
                    nombre: null,
                    idUsuarioTelegram: null,
                    email: null,
                    telefono: null,
                    idioma: null,
                    chatId: null,
                    empresa: null
                };
            }
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

export {userLogin};


