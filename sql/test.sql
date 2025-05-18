INSERT INTO "Product" (name, description, price, currency, status, image, detail, "categoryId", "createdAt", "updatedAt")
VALUES 
('AeroTune X9', 'Wireless headset with quantum bass technology', 39.99, 'USD', 'HOT', 'http://yanxuan.nosdn.127.net/be1c0672aa4f82de4179ff25c9728359.jpg', 'this is test', 1, NOW(), NOW()),
('SoundBlast Pro', 'Premium wireless headphones with noise cancellation', 199.99, 'USD', 'NEW', 'http://yanxuan.nosdn.127.net/be1c0672aa4f82de4179ff25c9728359.jpg', 'this is test', 1, NOW(), NOW());

INSERT INTO "Category" (name) VALUES ('Headphones');

INSERT INTO "Product" (
    name,
    description,
    price,
    currency,
    status,
    image,
    detail,
    "categoryId",
    "createdAt",
    "updatedAt"
) VALUES (
    '高端智能手表',
    '一款功能强大且设计精美的个人助手。',
    299.99,
    'CNY',
    'NORMAL',
    'http://yanxuan.nosdn.127.net/be1c0672aa4f82de4179ff25c9728359.jpg',
    '<h2>探索未来科技 - 高端智能手表</h2>
     <p>这款智能手表不仅仅是一件配饰，它是一款功能强大且设计精美的个人助手。</p>
     <h3>主要特点：</h3>
     <ul>
       <li><strong>健康追踪：</strong> 监控心率、睡眠质量及运动数据，帮助您保持最佳状态。</li>
       <li><strong>智能通知：</strong> 来电、短信、社交媒体更新等实时提醒，让您不错过任何重要信息。</li>
       <li><strong>长续航电池：</strong> 单次充电可使用长达7天，满足日常需求。</li>
       <li><strong>防水设计：</strong> 无论是在雨中跑步还是游泳，都不必担心损坏设备。</li>
     </ul>
     <h3>设计与材质</h3>
     <p>采用航空级铝合金表身，搭配蓝宝石玻璃表面，既坚固又美观。提供多种颜色选择，适应不同场合和个人风格。</p>
     <img src="http://yanxuan.nosdn.127.net/be1c0672aa4f82de4179ff25c9728359.jpg" alt="智能手表外观" style="max-width:100%;height:auto;">
     <h3>技术规格</h3>
     <table border="1" cellpadding="10" cellspacing="0">
       <tr>
         <th>属性</th>
         <th>规格</th>
       </tr>
       <tr>
         <td>显示屏</td>
         <td>1.39英寸 AMOLED, 454x454 分辨率</td>
       </tr>
       <tr>
         <td>处理器</td>
         <td>Dual-core 1.2GHz</td>
       </tr>
       <tr>
         <td>内存</td>
         <td>4GB 存储空间</td>
       </tr>
       <tr>
         <td>传感器</td>
         <td>光学心率传感器, 加速度计, 陀螺仪</td>
       </tr>
     </table>
     <h3>用户评价</h3>
     <blockquote>
       "自从购买了这款智能手表，我的生活变得更加有序。它的健康追踪功能真的很有帮助！"
       <footer>- John Doe</footer>
     </blockquote>
     <p>立即购买，体验前所未有的便捷与时尚结合的生活方式。</p>',
    1, -- 假设 category ID 为 1
    NOW(),
    NOW()
);