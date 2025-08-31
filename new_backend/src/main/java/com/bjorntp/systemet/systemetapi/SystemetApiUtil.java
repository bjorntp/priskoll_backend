package com.bjorntp.systemet.systemetapi;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * SystemetApiUtil
 */
public class SystemetApiUtil {

  HttpClient httpClient;
  Pattern apiTokenPattern;
  Pattern appBundlePathPattern;

  public SystemetApiUtil() {
  }

  public String getApiKey() {
    httpClient = HttpClient.newBuilder().followRedirects(HttpClient.Redirect.ALWAYS).build();
    apiTokenPattern = Pattern.compile("NEXT_PUBLIC_API_KEY_APIM:\"([^\"]+)\"");
    appBundlePathPattern = Pattern.compile("<script src=\"([^\"]+_app-[^\"]+.js)\"");

    HttpRequest mainPageRequest = HttpRequest.newBuilder()
        .uri(URI.create("https://systembolaget.se")).GET().header("User-Agent", "Java HttpClient")
        .build();

    HttpResponse<String> mainPageResponse;

    try {
      mainPageResponse = httpClient.send(mainPageRequest, HttpResponse.BodyHandlers.ofString());
    } catch (IOException | InterruptedException e) {
      e.printStackTrace();
      return "No key found";
    }

    String mainPageHtmlBody = mainPageResponse.body();

    Matcher appBundleMatcher = appBundlePathPattern.matcher(mainPageHtmlBody);

    if (!appBundleMatcher.find()) {
      return "No key found";
    }

    String uri = "https://systembolaget.se"
        + appBundleMatcher.group().substring(appBundleMatcher.group().indexOf('\"') + 1,
            appBundleMatcher.group().lastIndexOf('\"'));

    System.out.println("-------------- Searching for KEY WITH BUNDLE: " + uri);
    HttpRequest getAppBundleRequest = HttpRequest.newBuilder()
        .uri(URI.create(uri))
        .GET()
        .header("User-Agent", "Java HttpClient")
        .build();

    HttpResponse<String> appBundleResponse;

    try {
      appBundleResponse = httpClient.send(getAppBundleRequest, HttpResponse.BodyHandlers.ofString());
    } catch (IOException | InterruptedException e) {
      return "No key found";
    }

    String appBundleHtmlBody = appBundleResponse.body();

    Matcher apiTokenMatcher = apiTokenPattern.matcher(appBundleHtmlBody);

    if (!apiTokenMatcher.find()) {
      return "No key found";
    }

    String apiMatch = apiTokenMatcher.group();

    String apiKey = apiMatch.substring(apiMatch.indexOf('\"') + 1, apiMatch.lastIndexOf('\"'));

    return apiKey;
  }
}
