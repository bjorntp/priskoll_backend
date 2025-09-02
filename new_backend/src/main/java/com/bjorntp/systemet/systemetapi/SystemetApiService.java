package com.bjorntp.systemet.systemetapi;

import org.springframework.stereotype.Service;

import com.google.gson.JsonArray;

/**
 * SystemetApiService
 */
@Service
public class SystemetApiService {

  private final SystemetApiUtil apiUtil;
  private final SystemetRepository systemetRepository;

  public SystemetApiService(SystemetApiUtil apiUtil, SystemetRepository systemetRepository) {
    this.apiUtil = apiUtil;
    this.systemetRepository = systemetRepository;
  }

  public void fetchAndStoryProduts() {
    String apiKey = apiUtil.getApiKey();
    JsonArray products = apiUtil.getAllData(apiKey);
    systemetRepository.addJsonArrayToDb(products);
  }
}
