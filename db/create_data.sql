insert into users values ('tu_1', 'John Smith');
insert into users values ('tu_2', 'Elia Martell');

insert into communities values ('movies', 'Movies');
insert into communities values ('science', 'Science');
insert into communities values ('photography', 'Photography');

insert into issues (headline, published, community_id) values (
  'Best summer movies',
  date '2017-08-16',
  'movies'
);

insert into issues (headline, published, community_id) values (
  'Improve everything',
  date '2017-08-04',
  'photography'
);

insert into issues (headline, published, community_id) values (
  'Be better at pictures!',
  date '2017-09-08',
  'photography'
);

insert into posts (title, content, community_id, author_id) values (
  'Top-grossing 2017 summer movies',
  'Huge list here',
  'movies',
  'tu_2'
);

insert into posts (title, content, community_id, author_id) values (
  'My favorite scenes in Avatar',
  'Huge list here',
  'movies',
  'tu_2'
);

insert into posts (title, content, community_id, author_id) values (
  'Highest rated movies ever',
  'Huge list here',
  'movies',
  'tu_1'
);

insert into posts (title, content, community_id, author_id) values (
  'Intro to Photography',
  'This is how we do it',
  'photography',
  'tu_1'
);

insert into posts (title, content, community_id, author_id) values (
  'Empty Space',
  'This is a guide on empty space',
  'photography',
  'tu_1'
);

insert into issue_posts values (1, 1);
insert into issue_posts values (1, 2);
insert into issue_posts values (1, 3);
insert into issue_posts values (2, 4);
insert into issue_posts values (3, 5);
