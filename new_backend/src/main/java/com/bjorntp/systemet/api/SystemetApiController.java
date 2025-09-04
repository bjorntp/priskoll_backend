package com.bjorntp.systemet.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bjorntp.systemet.services.SystemetApiService;

import lombok.AllArgsConstructor;

/**
 * SystemetApiController
 */
@AllArgsConstructor
@RestController
@RequestMapping("/api/systemet")
public class SystemetApiController {

  private final SystemetApiService service;

  @GetMapping("/import")
  public String importProducts() {
    long startTime = System.currentTimeMillis();
    try {
      service.fetchAndStoryProduts();
      long endTime = System.currentTimeMillis();
      long durationTime = (endTime - startTime) / 1000;
      return "Products imported in " + durationTime + " seconds.";
    } catch (Exception e) {
      e.printStackTrace();
      return "Error: " + e.getMessage();
    }
  }

}
