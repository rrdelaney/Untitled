drop table if exists posts cascade;
drop table if exists users;

create table users (
  id varchar(50) primary key,
  name varchar(255) not null
);

create table posts (
  id serial primary key,
  title varchar(255) not null,
  author_id varchar(50) references users(id)
);
