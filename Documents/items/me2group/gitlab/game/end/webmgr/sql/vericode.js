/**
 * Created by slowsay on 2018/3/8.
 */
'use strict';
module.exports = {
    vericode_add_sql: 'insert into verifications(region,phone,code,token,createdAt,updatedAt) values(?,?,?,?,now(),now())',
    vericode_getByphone_sql: 'select id,phone from verifications where phone=? and code=? limit 1',
    vericode_getByid_sql: 'select id,phone from verifications where phone=? limit 1',
    vericode_updateCode_sql: 'update verifications set code=? where id=? limit 1'

}