const AboutComponent = () => {
  return (
    <div className="bg-gradient-to-br from-baby via-sky-300 to-grotto h-screen w-screen flex">
      <div className={`sm:rounded-xl bg-grotto shadow-lg transform transition-all w-full sm:w-2/3 duration-1000 m-auto text-baby`}>
        <div className="py-9 px-9">
          <h1 className="text-2xl pb-2">Hejsan!</h1>
          <p className="pb-2">
            Välkommen hit! Detta är en relativt enkel hemsida som jag har skapat främst för att själv kunna hitta bättre viner när deras priser sänks.
          </p>
          <p className="pb-2">
            Systembolaget informerar inte om när de sänker sina priser, vilket är förståeligt eftersom det skulle kunna strida mot deras <a className="underline underline-offset-2" href="https://www.omsystembolaget.se/vart-uppdrag/">uppdrag</a>.
          </p>
          <p className="pb-2">
            Sidan fungerar genom att regelbundet hämta all data från Systembolagets API och jämföra den med befintlig data i databasen. På sidan visas endast de produkter vars pris har förändrats med minst 10 %.
          </p>
          <p className="pb-2">
            Eftersom Systembolaget endast tillåter leverantörer att ändra sina priser fyra gånger per år, finns det ingen anledning att uppdatera datan särskilt ofta. Därför kör jag uppdateringen en gång i veckan.
          </p>
          <p className="pb-2">
            För att hämta datan använder jag ett API som du kan hitta <a className="underline underline-offset-2" href="https://github.com/AlexGustafsson/systembolaget-api">här</a>. Sidans källkod är helt öppen och finns tillgänglig på min <a className="underline underline-offset-2" href="https://github.com/bjorntp/priskoll_systemet">GitHub</a>. Det finns mycket som skulle kunna förbättras med sidan. Jag vill dock hålla den enkel och har inte riktigt tid att göra allt just nu.
          </p>
          <p>
            Om du vill komma i kontakt med mig hittar du min kontaktinformation <a className="underline underline-offset-2" href="https://tenje.se">här</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutComponent;
