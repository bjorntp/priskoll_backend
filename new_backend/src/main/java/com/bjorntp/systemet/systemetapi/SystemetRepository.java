package com.bjorntp.systemet.systemetapi;

import java.time.LocalDateTime;
import java.time.LocalTime;

import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Repository;

import com.bjorntp.systemet.domain.LocalDateTimeAdapter;
import com.bjorntp.systemet.domain.LocalTimeAdapter;
import com.bjorntp.systemet.domain.Product;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

import lombok.AllArgsConstructor;

/**
 * SystemetRepository
 */
@Repository
@AllArgsConstructor
public class SystemetRepository {

  private final Jdbi jdbi;

  public void addJsonArrayToDb(JsonArray productArray) {
    GsonBuilder gsonBuilder = new GsonBuilder();
    gsonBuilder.registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter());
    gsonBuilder.registerTypeAdapter(LocalTime.class, new LocalTimeAdapter());
    Gson gson = gsonBuilder.create();

    for (JsonElement jsonElement : productArray) {

      Product product = gson.fromJson(jsonElement, Product.class);

      this.jdbi.useTransaction(
          handle -> handle.createUpdate(
              """
                  INSERT INTO products (
                      "productId",
                      "productNumber",
                      "productNameBold",
                      "productNameThin",
                      "category",
                      "productNumberShort",
                      "producerName",
                      "supplierName",
                      "isKosher",
                      "bottleText",
                      "restrictedParcelQuantity",
                      "isOrganic",
                      "isSustainableChoice",
                      "isClimateSmartPackaging",
                      "isEthical",
                      "ethicalLabel",
                      "isWebLaunch",
                      "productLaunchDate",
                      "sellStartTime",
                      "isCompletelyOutOfStock",
                      "isTemporaryOutOfStock",
                      "alcoholPercentage",
                      "volumeText",
                      "volume",
                      "price",
                      "country",
                      "originLevel1",
                      "originLevel2",
                      "categoryLevel1",
                      "categoryLevel2",
                      "categoryLevel3",
                      "categoryLevel4",
                      "customCategoryTitle",
                      "assortmentText",
                      "usage",
                      "taste",
                      "tasteSymbols",
                      "tasteClockGroupBitter",
                      "tasteClockGroupSmokiness",
                      "tasteClockBitter",
                      "tasteClockFruitacid",
                      "tasteClockBody",
                      "tasteClockRoughness",
                      "tasteClockSweetness",
                      "tasteClockSmokiness",
                      "tasteClockCasque",
                      "recycleFee",
                      "isManufacturingCountry",
                      "isRegionalRestricted",
                      "packagingLevel1",
                      "packagingCo2ImpactLevel",
                      "isNews",
                      "isDiscontinued",
                      "isSupplierTemporaryNotAvailable",
                      "sugarContent",
                      "sugarContentGramPer100ml",
                      "seal",
                      "vintage",
                      "grapes",
                      "otherSelections",
                      "color",
                      "dishPoints",
                      "isRecommendedByTasteProfile",
                      "hasCasqueTaste",
                      "assortment",
                      "isBsAssortment",
                      "isPaAssortment",
                      "isFsAssortment",
                      "isTsAssortment",
                      "isTseAssortment",
                      "isTsLsAssortment",
                      "isTssAssortment",
                      "isTstAssortment",
                      "isTsvAssortment",
                      "isFsTsAssortment",
                      "apk"
                    ) VALUES (
                      :productId,
                      :productNumber,
                      :productNameBold,
                      :productNameThin,
                      :category,
                      :productNumberShort,
                      :producerName,
                      :supplierName,
                      :isKosher,
                      :bottleText,
                      :restrictedParcelQuantity,
                      :isOrganic,
                      :isSustainableChoice,
                      :isClimateSmartPackaging,
                      :isEthical,
                      :ethicalLabel,
                      :isWebLaunch,
                      :productLaunchDate,
                      :sellStartTime,
                      :isCompletelyOutOfStock,
                      :isTemporaryOutOfStock,
                      :alcoholPercentage,
                      :volumeText,
                      :volume,
                      :price,
                      :country,
                      :originLevel1,
                      :originLevel2,
                      :categoryLevel1,
                      :categoryLevel2,
                      :categoryLevel3,
                      :categoryLevel4,
                      :customCategoryTitle,
                      :assortmentText,
                      :usage,
                      :taste,
                      :tasteSymbols,
                      :tasteClockGroupBitter,
                      :tasteClockGroupSmokiness,
                      :tasteClockBitter,
                      :tasteClockFruitacid,
                      :tasteClockBody,
                      :tasteClockRoughness,
                      :tasteClockSweetness,
                      :tasteClockSmokiness,
                      :tasteClockCasque,
                      :recycleFee,
                      :isManufacturingCountry,
                      :isRegionalRestricted,
                      :packagingLevel1,
                      :packagingCo2ImpactLevel,
                      :isNews,
                      :isDiscontinued,
                      :isSupplierTemporaryNotAvailable,
                      :sugarContent,
                      :sugarContentGramPer100ml,
                      :seal,
                      :vintage,
                      :grapes,
                      :otherSelections,
                      :color,
                      :dishPoints,
                      :isRecommendedByTasteProfile,
                      :hasCasqueTaste,
                      :assortment,
                      :isBsAssortment,
                      :isPaAssortment,
                      :isFsAssortment,
                      :isTsAssortment,
                      :isTseAssortment,
                      :isTsLsAssortment,
                      :isTssAssortment,
                      :isTstAssortment,
                      :isTsvAssortment,
                      :isFsTsAssortment,
                      :apk)
                      ON CONFLICT ("productNumber") DO UPDATE
                        SET
                          price = EXCLUDED.price,
                         "isBsAssortment" = EXCLUDED."isBsAssortment",
                         "updatedAt" = NOW()
                    """).bindBean(product).execute());
    }
  }
}
