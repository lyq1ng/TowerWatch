import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

// 跨域处理
app.use(cors());

// 创建 MySQL 数据库连接池
const pool = mysql.createPool({
    connectionLimit: 100,
    host: '8.148.10.46',
    user: 'root',
    password: 'mysql_ZW7Grz',
    database: 'towerwatch'
});

// 定义路由
app.get('/api/WarnMsg', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        connection.query('SELECT id,warnmsg_type_id,warnlevel,warn_time,cenlon,cenlat FROM warn_msg', (error, results) => {
            connection.release();

            if (error) {
                console.error('Error fetching data from MySQL:', error);
                res.status(500).json({ error: 'Failed to retrieve data from MySQL' });
                return;
            }

            res.json(results);
        });
    });
});
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
            const formattedResults = results.map(item => ({
                ...item,
                id:item.id,
                lonlat: [item.lon, item.lat], // 将 lon 和 lat 合并为一个数组
                address: item.detailed_address, // 确保前端属性名称一致
                isOnline: item.is_online.toString(), // 确保数据类型一致（如果需要的话）
                warnCount: item.warn_amount
            }));

            res.json(formattedResults);
        });
    });
});
// 启动服务器
const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
