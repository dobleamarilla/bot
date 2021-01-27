function excluido(tipoUsuario: string, lista: string[]): boolean
{
    if(lista != undefined)
    {
        for(let i = 0; i < lista.length; i++)
        {
            if(lista[i] == tipoUsuario)
            {
                return true;
            }
        }
    }
    return false;
}
function getTeclado(tipoUsuario: string, configuracion: menuObject[]): string[][]
{
    var devolverMenu = [];
    for(let i = 0; i < configuracion.length; i++)
    {
        for(let j = 0; j < configuracion[i].necesario.length; j++)
        {
            if(configuracion[i].necesario[j] == tipoUsuario || configuracion[i].necesario[j] == 'ANY')
            {
                if(!excluido(tipoUsuario, configuracion[i].exclusion))
                {
                    let k = 0;
                    while(k < configuracion[i].menus.length)
                    {
                        devolverMenu.push(configuracion[i].menus[k]);
                        k++;
                    }
                    break;
                }
                else
                {
                    break;
                }
            }
        }
    }
    return devolverMenu;
}

export {getTeclado}