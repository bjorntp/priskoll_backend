CREATE OR REPLACE FUNCTION log_price_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Log in separate history table
    INSERT INTO product_prices ("productIdNumber", "oldPrice", "newPrice", "dateOfChange")
    VALUES (OLD."productIdNumber", OLD.price, NEW.price, NOW());

    -- Update the products table with old price + timestamp
    UPDATE products
    SET "oldPrice" = OLD.price,
        "dateOfPriceChange" = NOW()
    WHERE "productIdNumber" = OLD."productIdNumber";

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_price_change
AFTER UPDATE OF price ON products
FOR EACH ROW
WHEN (OLD.price IS DISTINCT FROM NEW.price AND OLD."updatedAt" IS DISTINCT FROM NEW."updatedAt")
EXECUTE FUNCTION log_price_change();
