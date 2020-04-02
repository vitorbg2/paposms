/**
 * Para facilitar o uso da biblioteca, esta função converte uma data do tipo Date para o padrão do webservice, que é: 2020-04-02 07:24
 *
 * @export
 * @param {Date} data - Data para ser formatada
 * @returns
 */
export function formatData(data: Date) {
  const ano = data.getUTCFullYear();
  let dia: any = data.getUTCDate();
  let mes: any = data.getUTCMonth() + 1;

  if (dia < 10) dia = '0' + dia;

  if (mes < 10) mes = '0' + mes;

  const YYYY_MM_DD = ano + '-' + mes + '-' + dia;

  let horas: any = data.getUTCHours();
  let minutos: any = data.getUTCMinutes();

  if (horas < 10) horas = '0' + horas;

  if (minutos < 10) minutos = '0' + minutos;

  return YYYY_MM_DD + ' ' + horas + ':' + minutos;
}
