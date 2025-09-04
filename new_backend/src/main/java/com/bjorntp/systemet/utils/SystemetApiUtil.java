package com.bjorntp.systemet.utils;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import lombok.NoArgsConstructor;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

/**
 * SystemetApiUtil
 */
@Component
@NoArgsConstructor
public class SystemetApiUtil {

  final String BASE_API = "https://api-extern.systembolaget.se/sb-api-ecommerce/v1/productsearch/search";
  final HttpClient httpClient = HttpClient.newBuilder().followRedirects(HttpClient.Redirect.ALWAYS).build();
  final Pattern apiTokenPattern = Pattern.compile("NEXT_PUBLIC_API_KEY_APIM:\"([^\"]+)\"");
  final Pattern appBundlePathPattern = Pattern.compile("<script src=\"([^\"]+_app-[^\"]+.js)\"");

  public String getApiKey() {

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

  public JsonArray getAllData(String apiKey) {

    JsonArray returnArray = new JsonArray();
    JsonArray categories = getAllLevel2Categories(apiKey);
    for (int i = 0; i < categories.size(); i++) {
      HttpRequest searchRequest = HttpRequest.newBuilder()
          .uri(URI.create(BASE_API + "?CategoryLevel2="
              + categories.get(i).getAsJsonObject().get("value").toString().replaceAll("\"", "").replaceAll(" ",
                  "%20").replaceAll("&", "%26")))
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
        return new JsonArray();
      }

      JsonObject root = JsonParser.parseString(searchResponse.body()).getAsJsonObject();

      System.out.println("Kategori: " + categories.get(i).getAsJsonObject().get("value").toString() + " it has "
          + root.get("metadata").getAsJsonObject().get("docCount").toString() + " products.");
      int numberOfPages = root.get("metadata")
          .getAsJsonObject().get("totalPages").getAsInt();

      JsonArray products = root.get("products").getAsJsonArray();
      products.forEach(returnArray::add);

      for (int j = 2; j <= numberOfPages; j++) {
        HttpRequest iteratedSearchRequest = HttpRequest.newBuilder()
            .uri(URI.create(BASE_API + "?page=" + j + "&CategoryLevel2="
                +
                categories.get(i).getAsJsonObject().get("value").toString().replaceAll("\"",
                    "").replaceAll(" ",
                        "%20")
                    .replaceAll("&", "%26")))
            .GET()
            .header("Origin", "https://www.systembolaget.se")
            .header("Access-Control-Allow-Origin", "*")
            .header("Pragma", "no-cache")
            .header("Accept", "application/json")
            .header("Accept-Encoding", "gzip")
            .header("Cache-Control", "no-cache")
            .header("Ocp-Apim-Subscription-Key", apiKey)
            .build();

        HttpResponse<String> iteratedSearchResponse;

        try {
          iteratedSearchResponse = httpClient.send(iteratedSearchRequest,
              HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
          e.printStackTrace();
          return returnArray;
        }

        JsonObject iteratedRoot = JsonParser.parseString(iteratedSearchResponse.body()).getAsJsonObject();

        JsonArray iteratedProducts = iteratedRoot.get("products").getAsJsonArray();
        iteratedProducts.forEach(returnArray::add);

      }
    }
    return returnArray;
  }

  public JsonArray getAllLevel2Categories(String apiKey) {

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
