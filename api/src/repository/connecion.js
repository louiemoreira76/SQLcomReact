import mysql from 'mysql2/promise';

const conx = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PWD,
        database: process.env.MYSQL_DB,        //aributos do obejeto
 //função não é executada a gente tem o resultado dela na hora, então usa o await para dá uma esperada
        typeCast: function (field, next){ // typeCast vai ser responsavel por converter o tipo dos dados do DB
                if (field.type === 'TINY' && field.length === 1){//Quando for um typeINT coverte para boleano
                        return(field.string() === '1'); //aqui em cimamse for TINY ou 1(caratere), linha de agr compara o valor com1
                }   else {         //se oq tiver for 1 ent true ou false
                        return next(); // se for nada prosegue a API
                }
        }
})

console.log('DB conectado!:)')
export { conx }; //importando para o index.js ter acesso a essa função