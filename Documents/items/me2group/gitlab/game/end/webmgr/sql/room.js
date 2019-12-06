/**
 * Created by slowsay on 2018/2/28.
 */
'use strict';
module.exports = {
    user_getByOpenid_sql: 'select id,phone,nickname,region,passwordHash,passwordSalt,createdAt,updatedAt,portraitUrl from users where phone=? limit 1',
    user_add_sql: 'insert into users(phone,nickname,region,passwordHash,passwordSalt,createdAt,updatedAt,portraiturl) values(?,?,?,?,?,now(),now(),?)',
    user_update_sql: 'update users set nickname=? where id=?',
    user_delete_sql: 'update users set deletedAt where id=?'
}