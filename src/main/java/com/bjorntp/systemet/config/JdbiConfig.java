package com.bjorntp.systemet.config;

import javax.sql.DataSource;

import org.jdbi.v3.core.Jdbi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JdbiConfig {

  @Bean
  public Jdbi jdbi(DataSource dataSource) {
    Jdbi jdbi = Jdbi.create(dataSource);
    jdbi.installPlugins();
    return jdbi;
  }
}
