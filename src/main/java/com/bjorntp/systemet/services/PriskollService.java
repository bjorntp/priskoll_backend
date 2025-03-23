
package com.bjorntp.systemet.services;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.bjorntp.systemet.database.PriskollRepository;
import com.bjorntp.systemet.domains.ApkPage;
import com.bjorntp.systemet.domains.ProductDTO;

import lombok.AllArgsConstructor;

/**
 * PriskollService
 */
@Service
@AllArgsConstructor
public class PriskollService {

  private PriskollRepository priskollRepository;

  public ArrayList<ProductDTO> fetchLowered() {
    return priskollRepository.loweredPrices();
  }

  public ArrayList<ProductDTO> fetchRaised() {
    return priskollRepository.raisedPrices();
  }

  public ApkPage fetchApk(int size, int page) {
    return priskollRepository.apkPage(size, page);
  }
}
