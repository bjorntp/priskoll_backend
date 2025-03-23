CREATE TABLE product_prices (
  id BIGSERIAL PRIMARY KEY,
  "productIdNumber" VARCHAR(50) references products("productIdNumber") ON DELETE CASCADE,
  "newPrice" NUMERIC(10,2),
  "oldPrice" NUMERIC(10,2),
  "dateOfChange" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
