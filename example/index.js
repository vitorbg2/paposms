const papoSMS = require('../lib/index');
const sms = new papoSMS('teste@teste.com', 'senha123');


sms.send(["22987654321"], "Teste npm 4")
    .then((res) => {
        console.log(res);
    }).catch((err) => {
        console.error(err);
    })