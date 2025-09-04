package com.bjorntp.systemet.database;

import java.util.ArrayList;

import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Repository;

import com.bjorntp.systemet.domains.ApkPage;
import com.bjorntp.systemet.domains.Product;

import lombok.AllArgsConstructor;

/**
 * PriskollRepository
 */
@Repository
@AllArgsConstructor
public class PriskollRepository {

  private final Jdbi jdbi;

  public ArrayList<Product> loweredPrices() {
    return (ArrayList<Product>) this.jdbi.withHandle(
        handle -> handle.createQuery(
            """
                SELECT * FROM products
                WHERE price / "oldPrice" <= 0.9;
                """).mapToBean(Product.class).list());
  }

  public ArrayList<Product> raisedPrices() {
    return (ArrayList<Product>) this.jdbi.withHandle(
        handle -> handle.createQuery(
            """
                SELECT * FROM products
                WHERE price / "oldPrice" >= 1.1;
                """).mapToBean(Product.class).list());
  }

  public ApkPage apkPage(int size, int page) {
    int offset = size * page;
    ArrayList<Product> products = (ArrayList<Product>) this.jdbi.withHandle(
        handle -> handle.createQuery(
            """
                SELECT * FROM products
                ORDER BY apk DESC
                LIMIT :size
                OFFSET :offset;
                """).bind("size", size).bind("offset", offset).mapToBean(Product.class).list());

    return new ApkPage(page, size, products);

  }
}
