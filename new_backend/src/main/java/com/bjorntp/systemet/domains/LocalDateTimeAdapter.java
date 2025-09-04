package com.bjorntp.systemet.domains;

import java.lang.reflect.Type;
import java.time.format.DateTimeFormatter;

import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import com.google.gson.*;
import java.time.LocalDateTime;

public class LocalDateTimeAdapter implements JsonDeserializer<LocalDateTime>, JsonSerializer<LocalDateTime> {
  private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

  @Override
  public LocalDateTime deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
      throws JsonParseException {
    return LocalDateTime.parse(json.getAsString(), FORMATTER);
  }

  @Override
  public JsonElement serialize(LocalDateTime src, Type typeOfSrc, JsonSerializationContext context) {
    return new JsonPrimitive(FORMATTER.format(src));
  }
}
