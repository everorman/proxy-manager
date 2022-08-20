import { define } from "typeorm-seeding";
import { User } from "../../entity";


define(User, () => {
  const user = new User();
  user.firstName = 'Evert';
  user.lastName = 'Ortiz';
  user.email = 'evert.ortiz.m@gmail.com';
  user.password = user.setPassword('demo123');
  return user;
});