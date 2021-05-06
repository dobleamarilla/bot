import { bot } from './bot';
import { recHit } from './conexion';
import { userLogin } from './login';
import { registro } from './registro';
import { usaDiccionario } from '../diccionario';
import { getTeclado } from './permisos';

bot.on('message', async (msg: any) => {
	try {
		if (msg.text == usaDiccionario("MENU_FICHAR", "CA") || msg.text == usaDiccionario("MENU_FICHAR", "ES")) {
			let sesion: loginObject = await userLogin(msg);
			fichar(sesion, msg);
			bot.sendMessage(msg.chat.id, "Tiendas", verEmpresas(sesion));
	

		} else if (msg.location != null) {
			let lloc = `${msg.location.latitude}, ${msg.location.longitude}`;

			let sesion: loginObject = await userLogin(msg);
			// ficharLocalizacion(sesion,msg,lloc);
		}


	}
	catch (err) {
		console.log(err);
	}
});
function fichar(sesion: loginObject, msg) {
	let id = sesion.idUsuarioHit;

	/*key.push([{'text': '<<<<', 'callback_data': 'Comandes #TriClient#' + off + '#SiBorra'}]);
	info.recordset.forEach(element => {
		keyboard.push([ {'text':element.q + ' , ' + element.nom , 'callback_data': 'Comandes #AaV#' + off + '#' + CliNom + '#' + CliCodi  + '#' + element.codi + '#' + parseInt(element.q + 1) + '#' + element.codi + '#' + element.q}])					
		})
		let p1=parseInt(p)-1
		if (p1<0)p1=0
		let p2=parseInt(p)+1
		if(keyboard.lenth<10) p2=parseInt(p)-1
		keyboard.push([{'text': '<<< ' + p1 + '0', 'callback_data': 'Comandes #ArticleNou#' + off + '#' + CliNom + '#' + CliCodi + '#' + p1},
					   {'text':  p2 + '0' + ' >>>', 'callback_data': 'Comandes #ArticleNou#' + off + '#' + CliNom + '#' + CliCodi + '#' + p2}]);
		bot.deleteMessage(msg.from.id, msg.message.message_id)						
		botsendMessage(msg,'data : ' + today + '\nClient ' + CliNom + '\n',  {reply_markup: JSON.stringify({inline_keyboard: keyboard})});
		*/




	/*let accio = `select top 1 accio from cdpDadesFichador where usuari = ${id}  order by tmst desc`;
	 recHit( sesion.database,accio).then((data) => {
		let nuevaAccion = (data[0].accio == 1) ? 2 : 1;
		let sqlfichar = `insert into cdpDadesFichador values (0, getdate(), ${nuevaAccion}, ${id}, newid(), null, null, NULL , '[Desde: TELEGRAM]')`;
		 recHit(sesion.database, sqlfichar).then(() => {
			let frase = ["Benvingut ", "Descansa "];
			bot.sendMessage(msg.chat.id, `${frase[nuevaAccion-1]} ${sesion.nombre}`);
			
		});
	});*/

}
function ficharLocalizacion(sesion: loginObject, msg, lloc) {
	let id = sesion.idUsuarioHit;

	let accio = `select top 1 accio from cdpDadesFichador where usuari = ${id}  order by tmst desc`;
	recHit(sesion.database, accio).then((data) => {
		let nuevaAccion = (data[0].accio == 1) ? 2 : 1;
		let sqlfichar = `insert into cdpDadesFichador values (0, getdate(), ${nuevaAccion}, ${id}, newid(), null, null, null ,' ${lloc}')`;
		recHit(sesion.database, sqlfichar).then(() => {

			/*off = parseInt( msg.data.split('#')[2] );
							CliNom = msg.data.split('#')[3] 
							CliCodi = msg.data.split('#')[4] 
							p = msg.data.split('#')[5] 
							if (p<0)p=0
							
							today = new Date(new Date().getTime() + (86400000 * parseInt( msg.data.split('#')[2])))
							Sql ="if ( select count(*) from paramshw where codi = " + CliCodi + ") = 0 "
							Sql+="begin "
							Sql+="select nom,codi,1 q  "
							Sql+="from articles where not codi in(select distinct codiarticle from " + nomTaulaServit(today) + " where Client = " + CliCodi + " and quantitatdemanada>0) "
							Sql+="group by nom,codi "
							Sql+="order by nom  OFFSET " + ( 10 * p ) + " ROWS FETCH NEXT 10 ROWS ONLY "
							Sql+="END else  "
							Sql+="select a.nom,a.codi,sum(s.q) q "
							Sql+="from "
							Sql+="(select Plu,sum(Quantitat) q from " + nomTaulaVenut(today) + " where botiga = " + CliCodi + " and day(data) = " + today.getDate() + " group by plu)  "
							Sql+="s join articles a on a.Codi = s.plu  "
							Sql+="where not plu in(select distinct codiarticle from " + nomTaulaServit(today) + " where Client = " + CliCodi + " and quantitatdemanada>0) "
							Sql+="group by a.nom,a.codi "
							Sql+="order by a.nom  OFFSET " + ( 10 * p ) + " ROWS FETCH NEXT 10 ROWS ONLY "
			//botsendMessage(msg,Sql)
							conexion.recHit(estat[0].Valor, Sql).then(info => {
								keyboard.push([{'text': '<<<<', 'callback_data': 'Comandes #TriClient#' + off + '#SiBorra'}]);
								info.recordset.forEach(element => {
									keyboard.push([ {'text':element.q + ' , ' + element.nom , 'callback_data': 'Comandes #AaV#' + off + '#' + CliNom + '#' + CliCodi  + '#' + element.codi + '#' + parseInt(element.q + 1) + '#' + element.codi + '#' + element.q}])					
									})
									p1=parseInt(p)-1
									if (p1<0)p1=0
									p2=parseInt(p)+1
									if(keyboard.lenth<10) p2=parseInt(p)-1
									keyboard.push([{'text': '<<< ' + p1 + '0', 'callback_data': 'Comandes #ArticleNou#' + off + '#' + CliNom + '#' + CliCodi + '#' + p1},
												   {'text':  p2 + '0' + ' >>>', 'callback_data': 'Comandes #ArticleNou#' + off + '#' + CliNom + '#' + CliCodi + '#' + p2}]);
									bot.deleteMessage(msg.from.id, msg.message.message_id)
			console.log(keyboard)						
									botsendMessage(msg,'data : ' + today + '\nClient ' + CliNom + '\n',  {reply_markup: JSON.stringify({inline_keyboard: keyboard})});
							})	*/






			let frase = ["Benvingut ", "Descansa "];
			bot.sendMessage(msg.chat.id, `${frase[nuevaAccion - 1]} ${sesion.nombre}`);

		});
	});
}
	function verEmpresas(sesion: loginObject, msg) {
		var keyboard = new Array();
		let Sql = "select nom from clients c join paramshw w on w.codi = c.codi order by c.nom";
		//botsendMessage(msg,Sql)
		recHit(sesion.database, Sql).then(info => {

			console.log(` esto es lo que tiene la consulta `)
			
			keyboard.push([{'text': info[0]  , 'callback_data': insertarcordenadastienda() }])

			bot.sendMessage(msg,"Te" , {reply_markup: JSON.stringify({	inline_keyboard: keyboard})})
			
		})

	}
	function insertarcordenadastienda() {

		console.log(`Cordenadas Insertadaa`)
	}

