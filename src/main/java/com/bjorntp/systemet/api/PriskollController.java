
package com.bjorntp.systemet.api;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bjorntp.systemet.domains.ApkPage;
import com.bjorntp.systemet.domains.ProductDTO;
import com.bjorntp.systemet.services.PriskollService;

import lombok.AllArgsConstructor;

/**
 * PriskollController
 */
@AllArgsConstructor
@RestController
@RequestMapping("/priskoll")
public class PriskollController {

  private PriskollService priskollService;

  @GetMapping("/lowered")
  public ArrayList<ProductDTO> lowered() {
    return priskollService.fetchLowered();
  }

  @GetMapping("/raised")
  public ArrayList<ProductDTO> raised() {
    return priskollService.fetchRaised();
  }

  @GetMapping("/apk")
  public ApkPage apk(@RequestParam(defaultValue = "30") int size,
      @RequestParam(defaultValue = "0") int page) {

    if (size > 100) {
      size = 100;
    }
    return priskollService.fetchApk(size, page);
  }
}
