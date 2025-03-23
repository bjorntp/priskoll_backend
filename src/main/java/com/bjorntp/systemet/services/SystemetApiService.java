package com.bjorntp.systemet.services;

import org.springframework.stereotype.Service;

import com.bjorntp.systemet.database.SystemetRepository;
import com.bjorntp.systemet.utils.SystemetApiUtil;
import com.google.gson.JsonArray;

import lombok.AllArgsConstructor;

/**
 * SystemetApiService
 */
@Service
@AllArgsConstructor
public class SystemetApiService {

  private final SystemetApiUtil apiUtil;
  private final SystemetRepository systemetRepository;

  public void fetchAndStoryProduts() {
    String apiKey = apiUtil.getApiKey();
    JsonArray products = apiUtil.getAllData(apiKey);
    systemetRepository.addJsonArrayToDb(products);
  }
}
