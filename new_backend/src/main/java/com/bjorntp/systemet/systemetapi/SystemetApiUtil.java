package com.bjorntp.systemet.systemetapi;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * SystemetApiUtil
 */
public class SystemetApiUtil {

  HttpClient httpClient;
  Pattern apiTokenPattern;
  Pattern appBundlePathPattern;
  final String BASE_API = "https://api-extern.systembolaget.se/sb-api-ecommerce/v1/productsearch/search";

  public SystemetApiUtil() {
    httpClient = HttpClient.newBuilder().followRedirects(HttpClient.Redirect.ALWAYS).build();
  }

  public String getApiKey() {
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

  public String getAllData(String apiKey) {

    httpClient = HttpClient.newBuilder().followRedirects(HttpClient.Redirect.ALWAYS).build();

    JsonArray allProducts;

    JsonArray categories = getAllLevel2Categories(apiKey);
    for (int i = 0; i < categories.size(); i++) {
      HttpRequest searchRequest = HttpRequest.newBuilder()
          .uri(URI.create(URLEncoder.encode(BASE_API + "?CategoryLevel2="
              + categories.get(i).getAsJsonObject().get("value").toString().replaceAll("\"", ""), StandardCharsets.UTF_8)))
          .GET()
          .header("Origin", "https://www.systembolaget.se")
          .header("Access-Control-Allow-Origin", "*")
          .header("Pragma", "no-cache")
          .header("Accept", "application/json")
          .header("Accept-Encoding", "gzip")
          .header("Cache-Control", "no-cache")
          .header("Ocp-Apim-Subscription-Key", apiKey)
          .build();

      HttpResponse<String> searchResponse;

      try {
        searchResponse = httpClient.send(searchRequest, HttpResponse.BodyHandlers.ofString());
      } catch (IOException | InterruptedException e) {
        e.printStackTrace();
        return "There was an error fetching the search results";
      }

      int numberOfPages = JsonParser.parseString(searchResponse.body()).getAsJsonObject().get("metadata")
          .getAsJsonObject().get("totalPages").getAsInt();
      System.out
          .println("Number of pages for " + categories.get(i).getAsJsonObject().get("value") + " is " + numberOfPages);
      ;

    }

    return "XD";
  }

  public JsonArray getAllLevel2Categories(String apiKey) {

    httpClient = HttpClient.newBuilder().followRedirects(HttpClient.Redirect.ALWAYS).build();

    HttpRequest searchRequest = HttpRequest.newBuilder().uri(URI.create(BASE_API + "?categoryLevel!=X")).GET()
        .header("Origin", "https://www.systembolaget.se")
        .header("Access-Control-Allow-Origin", "*")
        .header("Pragma", "no-cache")
        .header("Accept", "application/json")
        .header("Accept-Encoding", "gzip")
        .header("Cache-Control", "no-cache")
        .header("Ocp-Apim-Subscription-Key", apiKey)
        .build();

    HttpResponse<String> searchResponse;

    try {
      searchResponse = httpClient.send(searchRequest, HttpResponse.BodyHandlers.ofString());
    } catch (IOException | InterruptedException e) {
      return null;
    }

    JsonObject root = JsonParser.parseString(searchResponse.body()).getAsJsonObject();
    JsonArray filters = root.getAsJsonArray("filters");
    return filters.get(0).getAsJsonObject().get("child").getAsJsonObject().get("searchModifiers").getAsJsonArray();
  }
}
