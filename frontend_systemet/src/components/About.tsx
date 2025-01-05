const AboutComponent = () => {
  return (
    <div className="bg-gradient-to-br from-baby via-sky-300 to-grotto h-screen w-screen flex">
      <div className={`sm:rounded-xl bg-grotto shadow-lg transform transition-all w-full sm:w-2/3 duration-1000 m-auto text-baby`}>
        <div className="py-9 px-9">
          <h1 className="text-2xl pb-2">Hejsan!</h1>
          <p className="pb-2">
            Välkommen hit, detta är en förhållandevis enkel hemsida skapad framförallt för att jag själv vill kunna fynda lite bätre viner när dess priser. </p>
          <p className="pb-2">
            Systembolaget presenterar inte själva när de sänker sina priser, rimligt eftersom det antagligen hade stridit mot deras <a className="underline underline-offset-2" href="https://www.omsystembolaget.se/vart-uppdrag/">uppdrag.</a>
          </p>
          <p className="pb-2">
            Sidan fungerar genom att med jämna mellanrum hämta all data från Systembolagets API och jämföra den med datan som redan finns i databasen. På sidorna visas endast de produkter vars pris har förändrats med minst 10 %.
          </p>
          <p className="pb-2">
            Då Systembolaget bara tillåter leverantörer att ändra sina priser fyra gånger om året så finns där inte anledning till att uppdatera datan speciellt ofta, här kör jag en gång i veckan.
          </p>
          <p className="pb-2">
            För att hämta datan så använder jag mig av ett API som går att hitta <a className="underline underline-offset-2" href="https://github.com/AlexGustafsson/systembolaget-api">här</a>. Sidans källkod är helt öppen och går att hitta på min <a className="underline underline-offset-2" href="https://github.com/bjorntp/priskoll_systemet">GitHub</a>. Där finns mycket som hade kunnat göras mer till sidan, till viss del vill jag hålla den så enkel som möjligt samtidigt som jag inte riktigt har tid just nu.
          </p>
          <p>
            Om du vill komma i kontakt med mig så går det hitta min kontaktinformation  <a className="underline underline-offset-2" href="https://tenje.se">här</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutComponent;
