drop table if exists issue_posts cascade;
drop table if exists posts cascade;
drop table if exists issues cascade;
drop table if exists communities cascade;
drop table if exists users;

create table users (
  id varchar(50) primary key,
  name varchar(255) not null
);

create table communities (
  id varchar(50) primary key,
  name varchar(255) not null
);

create table issues (
  id serial primary key,
  headline varchar(255) not null,
  published date not null,
  community_id varchar(50) references communities(id)
);

create table posts (
  id serial primary key,
  title varchar(255) not null,
  content text not null,
  community_id varchar(50) references communities(id),
  author_id varchar(50) references users(id)
);

create table issue_posts (
  issue_id serial references issues(id),
  post_id serial references posts(id),
  primary key (issue_id, post_id)
);
