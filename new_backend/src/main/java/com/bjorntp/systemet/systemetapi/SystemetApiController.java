package com.bjorntp.systemet.systemetapi;

/**
 * SystemetApiController
 */
public class SystemetApiController {

  private SystemetApiUtil systemetApiUtil;

  private String API_KEY;

  public SystemetApiController() {
    systemetApiUtil = new SystemetApiUtil();

    this.API_KEY = systemetApiUtil.getApiKey();

  }

}
