/**
 * Created by slowsay on 2018/2/28.
 */
'use strict';
module.exports = {
    user_getByOpenid_sql: 'select openid,nickname,portraitUrl,floor from users where openid=? limit 1',
    user_add_sql: 'insert into users(openid,city,country,province,nickname,sex,portraitUrl,createdAt,updatedAt) values(?,?,?,?,?,?,?,now(),now())',
    user_update_sql: 'update users set nickname=? where id=?',
    user_delete_sql: 'update users set deletedAt where id=?',
    user_getListByfloor_sql: 'select * from users where isdelete==0 order by floor desc limit ?,?',
}