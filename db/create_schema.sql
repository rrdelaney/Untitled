drop table if exists articles cascade;
drop table if exists posts cascade;
drop table if exists issues cascade;
drop table if exists communities cascade;
drop table if exists users;

create table users (
  id varchar(50) primary key,
  name varchar(255) not null
);

create table communities (
  id serial primary key,
  name varchar(255) not null
);

create table issues (
  id serial primary key,
  name varchar(255) not null,
  community_id serial references communities(id)
);

create table posts (
  id serial primary key,
  title varchar(255) not null,
  content text not null,
  author_id varchar(50) references users(id)
);

create table articles (
  issue_id serial references issues(id),
  post_id serial references posts(id),
  primary key (issue_id, post_id)
);
