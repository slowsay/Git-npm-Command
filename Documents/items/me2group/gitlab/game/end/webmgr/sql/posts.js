/**
 * Created by slowsay on 2018/3/7.
 */
'use strict';
module.exports = {
    post_getByTitle: 'select id,title,price from posts where title=? limit 1',
    post_getById_Info:'select id,title,maparea,pic,price,content,zan,updatedAt from posts where isdelete=0 and userid=? order by createdAt desc',
    post_getAllList: 'select id,title,maparea,pic,price,content,zan,updatedAt from posts where isdelete=0  order by createdAt desc limit ?,20',
    post_add_sql: 'insert ignore into posts(title,maparea,price,pic,content,userid,createdAt,updatedAt) values(?,?,?,?,?,?,now(),now())',
    post_update_sql:'update posts set title=?,maparea=?,price=?,pic=?,content=?,updatedAt=now() where id=? and isdelete=0',
    post_delete_sql:'update posts set isdelete=1 where id=?'
}