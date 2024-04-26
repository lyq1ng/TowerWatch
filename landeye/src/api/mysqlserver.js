import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
//创建express实例
const app = express();

// 跨域处理
app.use(cors());

// 创建 MySQL 数据库连接池，连接池用于管理和复用数据库连接
const pool = mysql.createPool({
    connectionLimit: 100,
    host: '8.148.10.46',
    user: 'root',
    password: 'mysql_ZW7Grz',
    database: 'towerwatch'
});

// 获取告警信息id，类型，告警级别，告警时间，告警点位经纬度
app.get('/api/WarnMsg', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        connection.query('SELECT id,warnmsg_type_id,warnlevel,warn_time,cenlon,cenlat FROM warn_msg', (error, results) => {
        //使用获取到的数据库连接，执行一个 SQL 查询。这个查询从 warn_msg 表中选取多个字段。
            connection.release();//一旦查询完成，使用 release 方法将连接返回到连接池，这样其他代码可以复用该连接

            if (error) {
                console.error('Error fetching data from MySQL:', error);
                res.status(500).json({ error: 'Failed to retrieve data from MySQL' });
                return;
            }

            res.json(results);
        });
    });
});
//获取摄像头id，经纬度，地址，在离线状态，告警次数统计数据
app.get('/api/CameraList', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        connection.query('SELECT id,lon,lat,detailed_address,is_online,warn_amount FROM camera_list', (error, results) => {
            connection.release();

            if (error) {
                console.error('Error fetching data from MySQL:', error);
                res.status(500).json({ error: 'Failed to retrieve data from MySQL' });
                return;
            }
            //型3.5
            // 你可以继续问我：
            // 请问还有其他函数吗我该如何使用这个 Map 函数创建数组列表Texas Acads是什么语言
            //遍历 results 数组，并对每个元素执行一定的转换操作，以适应前端的显示需求
            const formattedResults = results.map(item => ({
                ...item,//将 item 的所有属性复制到新对象中
                id:item.id,
                lonlat: [item.lon, item.lat], // 将 lon 和 lat 合并为一个数组
                address: item.detailed_address, // 确保前端属性名称一致
                isOnline: item.is_online.toString(), // 确保数据类型一致（如果需要的话）
                warnCount: item.warn_amount
            }));

            res.json(formattedResults);//将结果以json格式返回
        });
    });
});
// 启动服务器
const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
