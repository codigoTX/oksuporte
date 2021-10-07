create schema `oksuporte`

default character set `utf8`
default collate `utf8_general_ci`;

create table `users`(
	`user_id` int auto_increment primary key not null, 
	`user_name` varchar(50) not null,
	`user_cpf` varchar(11),
	`user_reg_date` datetime,
	`user_status` set('0', '1'),
	`user_class` set('Tipo X', 'Tipo A', 'Tipo B', 'Tipo C') not null default 'Tipo C',
	`user_phone` varchar(11),
	`user_email` varchar(100)  not null,
	`user_password` varchar(32)  not null,
	`user_obs` varchar(255),
	`company_id` int,
constraint `company_id` foreign key (`company_id`) references `companies`.`company_id`
);

create table `companies`(
	`company_id` int auto_increment primary key not null,
	`company_name` varchar(100) not null,
	`company_representant` varchar(50),
	`company_cnpj` varchar(18),
	`company_city` varchar(30)  not null,
	`company_state` varchar(30)  not null,
	`company_cep` varchar(10),
	`company_phone` varchar(11)  not null, 
	`company_email` varchar(100) not null,
	`company_reg_date` datetime,
	`company_status` set('0', '1') default '1' -- 1 Liberada/0 Bloqueado (questões financeiras, decisão da fábrica, etc.)
);

create table `calls`(
	`call_id` int auto_increment primary key not null,
	`call_title` varchar(40),
	`call_description` varchar(255),
	`call_opening` datetime,
	`call_closing` datetime,
	`call_status` set('Aberto', 'Em atendimento', 'Respondido', 'Finalizado'), -- aberto/em atendimento/respondido/finalizado
	`call_priority` set ('Baixa', 'Média', 'Alta'),
	`call_attachment` varbinary(50),
	`user_id` varchar(50),
	`company_id` int,
constraint `user_id` foreign key(`user_id`) references `users`.`user_id`,
constraint `company_id` foreign key(`company_id`) references `companies`.`company_id`
);

insert into `users`(`user_name`, `user_email`, `user_password`) 
values ('Rafael Teixeira', 'rt@qualquercoisa.com', '123');

insert into `companies`(`company_name`, `company_email`, `company_city`, `company_state`, `company_phone`) 
values ('Empresa 1', 'empresa1@qualquercoisa.com', 'Feira de Santana', 'Bahia', '987654321');

update `companies`set 
	`company_name` = 'Empresa 2', 
	`company_email` = 'empresa2@qualquercoisa.com' ,
	`company_phone` = '12345678' where `company_id` = 2;

delete from `users` where `user_id` = '2';

select * from `users`;
select `company_name`, `company_email` from `companies` order by `company_id` desc;

create table `orders`(
	`order_id` int auto_increment primary key not null,
    `order_title` varchar(30) not null,
    `order_price` decimal(4,2),
    `order_status` enum('recebido', 'corte', 'fitamento', 'furação e usinagem', 'limpeza e embalagem', 'aguardando retirada', 'fila de entrega', 'cancelado', 'pausado'),    
    `order_project` varbinary(100),
    `order_obs` varchar(255),
    `interactions_id` varchar(255)
);

create table `interactions` (
	`interaction_id` int auto_increment primary key not null,
    `interaction_message` varchar(255),
    `user_id` int,
    `interaction_date` datetime,
    constraint `user_id` foreign key(`user_id`) references `users`.`user_id`
);












