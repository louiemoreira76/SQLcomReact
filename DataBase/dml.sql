USE CatalagoFilmesAPI;

-- carga inicial usuario adim
INSERT INTO tb_usuario (nm_usuario, ds_email, ds_senha)
	VALUES ('admin', 'admin@admin.com.br', '1234');

--efetuar login
SELECT 	id_usuario	id,
		nm_usuario	nome,
        ds_email	email
FROM tb_usuario
WHERE ds_email	=	'admin@admin.com.br'
AND   ds_senha	=	'1234';

--cadastrar novo filme 
INSERT INTO tb_filmes (id_filme, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
	VALUES (1, 'Brunex O Ninja', 'O ninja TEC está com sangue nos olhos para PROGRAMAR', 9.9, '2023-08-18', true);

--alterar imagem do filme
UPDATE tb_filmes
    SET img_filme   =  '/storage/filme/adshsf.jpg'
WHERE   id_filme = 1;

--alterar filme
UPDATE tb_filmes
    SET nm_filme = 'O Kara',
        ds_sinopse = 'Homem mais pika de todos',
        vl_avaliacao = 3.2,
        dt_lancamento = '2010/08/17',
        bt_disponivel = true
WHERE   id_filme = 1;

--colsultar todos filmes 
SELECT id_filme     id,
       nm_filme     nome,
       vl_avaliacao     avaliacao,
       dt_lancamento    lancamento,
       bt_disponivel    disponivel
    FROM tb_filmes;
--colsultar todos filmes por nome
SELECT id_filme     id,
       nm_filme     nome,
       vl_avaliacao     avaliacao,
       dt_lancamento    lancamento,
       bt_disponivel    disponivel
    FROM tb_filmes
    WHERE nm_filme      like '%a%';
    
--colsultar todos filmes por id 
SELECT id_filme     id,
       nm_filme     nome,
       vl_avaliacao     avaliacao,
       dt_lancamento    lancamento,
       bt_disponivel    disponivel
    FROM tb_filmes
    WHERE id_filme      = 1;
    