package com.bjorntp.systemet.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CorsConfig
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry regisistry) {
    regisistry.addMapping("/**")
        .allowedOrigins("https://bjorntp.com")
        .allowedMethods("GET")
        .allowedHeaders("*");
  }
}
