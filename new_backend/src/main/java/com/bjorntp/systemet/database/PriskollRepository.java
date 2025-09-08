package com.bjorntp.systemet.database;

import java.util.ArrayList;

import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Repository;

import com.bjorntp.systemet.domains.ApkPage;
import com.bjorntp.systemet.domains.ProductDTO;

import lombok.AllArgsConstructor;

/**
 * PriskollRepository
 */
@Repository
@AllArgsConstructor
public class PriskollRepository {

  private final Jdbi jdbi;

  public ArrayList<ProductDTO> loweredPrices() {
    return (ArrayList<ProductDTO>) this.jdbi.withHandle(
        handle -> handle.createQuery(
            """
                SELECT * FROM products
                WHERE price / "oldPrice" <= 0.9;
                """).mapToBean(ProductDTO.class).list());
  }

  public ArrayList<ProductDTO> raisedPrices() {
    return (ArrayList<ProductDTO>) this.jdbi.withHandle(
        handle -> handle.createQuery(
            """
                SELECT * FROM products
                WHERE price / "oldPrice" >= 1.1;
                """).mapToBean(ProductDTO.class).list());
  }

  public ApkPage apkPage(int size, int page) {
    int offset = size * page;
    ArrayList<ProductDTO> products = (ArrayList<ProductDTO>) this.jdbi.withHandle(
        handle -> handle.createQuery(
            """
                SELECT * FROM products
                ORDER BY apk DESC
                LIMIT :size
                OFFSET :offset;
                """).bind("size", size).bind("offset", offset).mapToBean(ProductDTO.class).list());

    return new ApkPage(page, size, products);

  }
}
