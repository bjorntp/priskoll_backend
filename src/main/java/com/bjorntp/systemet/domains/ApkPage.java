package com.bjorntp.systemet.domains;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * ApkPage
 */
@Data
@AllArgsConstructor
public class ApkPage {

  private int page;
  private int size;
  private List<ProductDTO> products;

}
