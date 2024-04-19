const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnect } = require('./utils/dbConnect');
const { productRouter } = require('./routes/productRouter');
const { userRouter } = require('./routes/userRouter');
const { commentRouter } = require('./routes/commentRouter');
const { cartRouter } = require('./routes/cartRouter');
const { orderRouter } = require('./routes/orderRouter');

const app = express();
const PORT = process.env.PORT || 8080;

dbConnect();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'));

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/orders', orderRouter);

app.get('/', (req, res) => {
  res.send('Vivek Thakur web-final-backend ');
});

app.listen(PORT, () => {
  console.log(
    `VivekThakur web-final-backend has started on http://localhost:${PORT}/`
  );
});
