package com.bjorntp.systemet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bjorntp.systemet.systemetapi.SystemetApiController;
import com.bjorntp.systemet.systemetapi.SystemetApiUtil;

@SpringBootApplication
@RestController
public class SystemetApplication {

  public static void main(String[] args) {
    SpringApplication.run(SystemetApplication.class, args);
  }

  @GetMapping("/hello")
  public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
    return String.format("Hello %s!", name);
  }

  @GetMapping("/key")
  public String sup() {
    var a = new SystemetApiUtil();
    return a.getApiKey();
  }

  @GetMapping("/search")
  public String search() {
    var a = new SystemetApiController();
    return a.search();
  }

}
