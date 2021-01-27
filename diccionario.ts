var diccionario = [];
diccionario["MENU_PRINCIPAL_TEXTO"] = ['Hola! Aquí tens el menú principal', '¡Hola! Aquí tienes el menú principal'];
diccionario["MENU_PRINCIPAL"] = ['Menú principal', 'Menú principal'];
diccionario["OPCIONS_BOTIGA_TEXTO"] = ['Opcions de botiga', 'Opciones de tienda'];
diccionario["OPCIONS_VENTAS_TEXTO"] = ['Opcions de vendes', 'Opciones de ventas'];
diccionario["MENU_TIENDA"] = ['Botiga', 'Tienda'];
diccionario["MENU_FICHAR"] = ['Fitxar', 'Fichar'];
diccionario["MENU_INCIDENCIAS"] = ['Incidències', 'Incidencias'];
diccionario["MENU_LISTADOS"] = ['Llistats', 'Listados'];
diccionario["MENU_PEDIDOS"] = ['Comandes', 'Pedidos'];
diccionario["MENU_VENTAS"] = ['Vendes', 'Ventas'];
diccionario["MENU_PEDIDOS"] = ['Comandes', 'Pedidos'];
diccionario["MENU_TECNICO"] = ['Tècnic', 'Técnico'];
diccionario["MENU_HOY"] = ['Avui', 'Hoy'];
diccionario["MENU_AYER"] = ['Ahir', 'Ayer'];
diccionario["MENU_SEMANA_PASADA"] = ['La setmana passada', 'La semana pasada'];
diccionario["MENU_ANO_PASADO"] = ["L'any passat", 'El año pasado'];
diccionario["TEXTO_SIN_SUPERVISORAS"] = ['No hi ha supervisores', 'No hay supervisoras'];

function usaDiccionario(key: string, idioma: string): string
{
    switch(idioma)
    {
        case 'CA': return diccionario[key][0];
        case 'ES': return diccionario[key][1];
        default: return diccionario[key][0];
    }
}
export {usaDiccionario};