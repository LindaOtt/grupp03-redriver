# Frågor till RedRiver

1. I er kravspecifikation under "Samtyckesfunktion" står det att samtycket kan återkallas av anhöriga. Tänker ni att det ska finnas en anhörig till användaren som också har tillgång till användarens konto? Vi pratade nu vid mötet om att målgruppen ska vara alla från tolv år och uppåt, inte bara äldre patienter. Ska anhörigkravet kvarstå? I så fall, har ni möjlighet att beskriva mer detaljerat hur ni har tänkt att det ska fungera?

2. Det står även i kravspecifikationen att "en superuser ska kunna begränsa även Admin så att denne endast ser de första 6 sifforna i t.ex. personnummer". Kan ni förtydliga vilken information och funktioner en admin har tillgång till när en superuser slår på denna begränsning?

3. Ett krav är att systemet ska vara skyddat mot skadlig kod och virus. Vilken form av virusskydd menar ni och skulle ni kuna ge exempel av hur detta skulle se ut?

4. Har ni några önskemål gällande grafisk profil? Typsnitt, färger och logotype?

5. Har ni beslutat om ett namn för applikationen?

6. De krav som har med lösenord att göra:  
* Admin kan sätta ett tillfälligt lösenord.  
* Admin kan meddela en användare att den kan logga in och byta sitt lösenord.  
Blir onödiga om inloggningen sker via mobilt BankID. Med mobilt BankID använder man sig redan av en bestämd kod som endast kan ändras via ens bank. Behövs de här kraven om vi ska använda oss av mobilt BankID?

7. Kravet: Administratörer har möjlighet att lägga till nya användare. Betyder det att det endast är admin som kan lägga till/registrera nya användare i applikationen?

8. Ska en användare kunna registrera sig själv i applikationen?

9. Kravet: Admin kopplar ihop användare med varandra, d.v.s. vilka som ska kunna chatta med varandra. Är det endast admin som kan koppla ihop vilka som kan chatta med varandra?

10. Ska användarna kunna connecta själva med sina vänner för att chatta? Eller behöver de vänta på att en admin ska koppla ihop dem?

11. När en användare drar tillbaka sitt samtycke genom att använda appens UI och sedan bekräftar detta genom att klicka på länken i mailet som följer, ska den användaren då direkt tas bort från systemet eller ska användaren exempelvis få 24 timmar på sig att lämna samtycke igen? Anledning: Det kan exempelvis finnas fall där man felaktigt dragit tillbaka sitt samtycke och därmed förlorar sitt konto och all sin data av misstag, särskilt om man har lite eller ingen erfarenhet av IT/chattapplikationer sedan tidigare.

12. Kraven: Kommunikation ska inte sparas längre än lagen kräven, därför ska loggen kunna rensas med jämna mellanrum. Administratör av appen ska kunna ställa in med vilka intervall data ska rensas. Ska admin ha olika alternativ för intervallerna som exempelvis en vecka, varannan vecka, en månad eller ska kommunikation tas bort automatiskt när den nått en viss ålder? Eller är kravet mest att admin ska kunna ange intervall utifall att lagstiftningen förändras från en tidsram till en annan?

13. Kravet: Användande av systemet ska inte innebära att systemet behöver samla in mer information än vad som behövs för systemet/tjänsten. Vad räknas in här? Användarnamn, personnummer, telefonnummer, address, föräldrars namn osv. Här skulle vi vilja ha ett förtydligande kring vad som är nödvändig information eller om vi själva bestämmer vad som är nödvändig information.

14. Kravet: Designen ska utgå från rekommendationerna i WCAG 2.0 eller högre. Vilken nivå vill ni att vi lägger oss på av A, AA och AAA?

15. Kravet: Det ska finnas skydd mot skadlig kod. Finns det specifika attacker ni vill att applikationen ska ha skydd mot exempelvis XSS, CSRF osv? Topp 10 på OWASP lista?

16. Kravet: Det skall i systemet finnas tillräcklig kapacitet för att hantera många användare samtidigt (inloggade samt inloggade och aktiva ) utan att systemets funktionalitet, tillgänglighet och användning påverkas eller försämras till det sämre. Här behöver vi ett förtydligande kring vad som menas med "tillräcklig kapacitet" och "många användare". Är det 100, 1000, 10000 eller fler användare? Detta behöver vi veta så att kravet blir testbart.

17. Kravet: Systemet ska vara utformat så att åtkomsten till personuppgifter begränsas till de som behöver den. Vad innebär detta mer konkret? Låt säga att en användare är nyfiken på en annan användares personuppgifter, ska den användaren då få tillgång till den andra användares personuppgifter? Eller vad menas med "de som behöver den"?
