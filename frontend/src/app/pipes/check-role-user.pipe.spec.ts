import { CheckRoleUserPipe } from './check-role-user.pipe';

describe('CheckRoleUserPipe', () => {
  it('create an instance', () => {
    const pipe = new CheckRoleUserPipe();
    expect(pipe).toBeTruthy();
  });
});
