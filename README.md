
# paposms
Uma biblioteca de ajuda para usar os serviços do PapoSMS
## Importante
Esta é uma biblioteca não oficial, apenas tem o intuito de ajudar outros desenvolvedores à consumirem os serviços da papoSMS de uma forma mais ágil e efetiva.  

Para maiores detalhes sobre o webservice aqui abstraído vá até a [documentação oficial](https://www.paposms.com/desenvolvedores).

## Instalação
Usando npm:
```
npm install paposms
```

## Exemplo

### Enviando um SMS

```Typescript
const papoSMS = require('paposms');
// Faça sua autenticação na instanciação da classe
// papoSMS(user,pass)
const sms = new papoSMS('teste@teste.com','senha123');  

sms.send(["22987654321"], "Teste npm 4")
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.error(err);
	});
```

<b>sms.send(numeros: string[], mensagem: string, data?: Date)</b>

*numeros - Array*: Deve ser digitado os números de telefone celular para ser o destino da mensagem.
*mensagem - String*: Deve ser digitado o texto o qual será enviado para o(s) número(s) do parâmetro numeros.
*data (Opcional) - Date*: Deve ser digitada a data de agendamento, para o envio do SMS. Se esse parâmetro não for passado, a hora de agendamento será a do servidor