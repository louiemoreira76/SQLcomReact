import mysql from 'mysql2/promise';

const conx = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PWD,
        database: process.env.MYSQL_DB        //aributos do obejeto
}) //função não é executada a gente tem o resultado dela na hora, então usa o await para dá uma esperada

export { conx }; //importando para o index.js ter acesso a essa função