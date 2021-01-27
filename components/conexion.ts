var sql = require("mssql");

function recHit(database: string, consultaSQL:string):Promise<any> 
{
    var config =
    {
        user: process.env['USER'],
        password: process.env['PASSWORD'],
        server: process.env['SERVER'],
        database: database,
        options: {
            encrypt: true,
            enableArithAbort: true
        },
    };
    var devolver = new Promise((dev, rej) => {
        new sql.ConnectionPool(config).connect().then((pool: any) => {
            return pool.request().query(consultaSQL);
        }).then((result: any) => {
            dev(result.recordset);
            sql.close();
        }).catch((err: any) => {
            console.log(err);
            console.log("SQL: ", consultaSQL)
            sql.close();
        });
    });
    return devolver;
}


// exports.recHit = recHit;
export {recHit};