import axios = require('axios');
import qs = require('querystring');
import { formatData } from './utils/formatData';

class PapoSMS {
  user: string;
  password: string;

  // Esta é uma biblioteca não oficial para consumir o webservice da papoSMS, que realiza envio de sms através do seu webservice
  // Para mais informações ou mudanças repentinas no webservice da papoSMS, visite: https://www.paposms.com/desenvolvedores

  /**
   * Creates an instance of PapoSMS.
   * @param {string} user - No parâmetro “user” deve ser digitado o email de uma conta PAPO válida.
   * @param {string} password - No parâmetro “pass” deve ser digitado a senha correspondente ao email digitado em “user”
   * @memberof PapoSMS
   */
  constructor(user: string, password: string) {
    this.user = user;
    this.password = password;
  }

  /**
   *
   *
   * @param {string[]} numeros - Deve ser digitado os números de telefone celular para ser o destino da mensagem eg ['410000000','4200000000']
   * @param {string} mensagem - No parâmetro “message” deve ser digitado o texto o qual será enviado para o(s) número(s) do parâmetro “numbers”. Observação: O texto deve conter, no máximo, 140 caracteres
   * @param {Date} [data] - No parâmetro “date” deve ser digitada a data de agendamento, para o envio do SMS. Observações: O formato da data deve corresponder a “yyyy-mm-dd hh:ii”, onde “yyyy” é o ano, ”mm” é o mês, “dd” é o dia, “hh” é a hora e “ii” os minutos. Se esse parâmetro não for passado, a hora de agendamento será a do servidor.
   * @returns - Retorna uma promise que é rejeitada caso ocorra algum erro de conexão ou erro de resposta do servidor, a promise é aceita caso se tenha sucesso no envio do SMS
   * @memberof PapoSMS
   */
  send(numeros: string[], mensagem: string, data?: Date) {
    let requestBody = {};

    if (data === undefined) {
      requestBody = {
        user: this.user,
        pass: this.password,
        numbers: numeros.join('; '),
        message: mensagem,
        return_format: 'json',
      };
    } else {
      requestBody = {
        user: this.user,
        pass: this.password,
        numbers: numeros.join('; '),
        message: mensagem,
        date: formatData(data),
        return_format: 'json',
      };
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    return new Promise((resolve, reject) => {
      axios.default
        .post('https://www.paposms.com/webservice/1.0/send/?', qs.stringify(requestBody), config)
        .then((request) => {
          if (request.data.result) {
            resolve({
              resposta: request.data.label,
              numerosSucesso: request.data.ids,
              numerosFalha: request.data.rejectds,
            });
          } else {
            reject(request.data.label);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export { PapoSMS };
