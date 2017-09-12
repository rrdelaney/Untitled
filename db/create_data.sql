insert into users values ('tu_1', 'John Smith');
insert into users values ('tu_2', 'Elia Martell');

insert into communities values ('movies', 'Movies');
insert into communities values ('science', 'Science');
insert into communities values ('photography', 'Photography');

insert into articles (title, published, content, community_id, author_id) values (
  'Top-grossing 2017 summer movies',
  date '2017-08-04',
  'Huge list here',
  'movies',
  'tu_2'
);

insert into articles (title, published, content, community_id, author_id) values (
  'My favorite scenes in Avatar',
  date '2017-08-04',
  'Huge list here',
  'movies',
  'tu_2'
);

insert into articles (title, published, content, community_id, author_id) values (
  'Highest rated movies ever',
  date '2017-08-04',
  'Huge list here',
  'movies',
  'tu_1'
);

insert into articles (title, published, content, community_id, author_id) values (
  'Intro to Photography',
  date '2017-08-04',
  'This is how we do it',
  'photography',
  'tu_1'
);

insert into articles (title, published, content, community_id, author_id) values (
  'Empty Space',
  date '2017-08-04',
  'This is a guide on empty space',
  'photography',
  'tu_1'
);

insert into issues (headline, published, post_ids, community_id) values (
  'Best summer movies',
  date '2017-08-16',
  '{1, 2, 3}',
  'movies'
);

insert into issues (headline, published, post_ids, community_id) values (
  'Improve everything',
  date '2017-08-04',
  '{4}',
  'photography'
);

insert into issues (headline, published, post_ids, community_id) values (
  'Be better at pictures!',
  date '2017-09-08',
  '{5}',
  'photography'
);
