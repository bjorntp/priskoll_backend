package com.bjorntp.systemet.domains;

import java.lang.reflect.Type;
import java.time.format.DateTimeFormatter;

import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import com.google.gson.*;
import java.time.LocalTime;

public class LocalTimeAdapter implements JsonDeserializer<LocalTime>, JsonSerializer<LocalTime> {
  private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_TIME;

  @Override
  public LocalTime deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
      throws JsonParseException {
    return LocalTime.parse(json.getAsString(), FORMATTER);
  }

  @Override
  public JsonElement serialize(LocalTime src, Type typeOfSrc, JsonSerializationContext context) {
    return new JsonPrimitive(FORMATTER.format(src));
  }
}
