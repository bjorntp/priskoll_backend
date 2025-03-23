package com.bjorntp.systemet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SystemetApplication {

  public static void main(String[] args) {
    SpringApplication.run(SystemetApplication.class, args);
  }
}
