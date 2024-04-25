// server.js
import express from 'express';
import pg from 'pg';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
const { Pool } = pg;
// 跨域处理
app.use(cors());

// 创建 PostgreSQL 数据库连接池
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Internet_GIS',
    password: '123456',
    port: 5432,
});

// 定义路由
app.get('/api/alarm', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM warnmsg'); // 假设你的表名为 alarm_data
        const dataList = result.rows;
        client.release();
        res.json(dataList);
    } catch (error) {
        //console.error('Error fetching data:', error);
        //console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 启动服务器
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
