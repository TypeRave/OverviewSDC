import sql from './data';

async function getUsersOver(age) {
  const users = await sql`
    select
      name,
      age
    from users
    where age > ${age}`;

  return users;
}
