package com.bjorntp.systemet.utils;

import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.bjorntp.systemet.services.SystemetApiService;

import lombok.AllArgsConstructor;

/**
 * ScheduledTasks
 */
@Component
@AllArgsConstructor
public class ScheduledTasks {

  private final SystemetApiService service;

  @Scheduled(cron = "0 0 10 1 3,6,9,12 *")
  public void UpdateOnNewProducts() {
    service.fetchAndStoryProduts();
  }

  @Scheduled(cron = "0 10 9 * * 0,4")
  public void UpdateTwiceWeekly() {
    service.fetchAndStoryProduts();
  }

}
