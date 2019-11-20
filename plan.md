Payday
======

        Informační systém pre spracovanie personalnych udajov a vypocet mzdy pracovnikov. 


BASIC SOLUTION
==============

### Menu programu:
    Prilasenie--+---- Personalistika -------+-------- Prvok pre vlozenie a opravu personalnych udajov 
                |    (zoznam pracovnikov)
                |
                +--- Mzdy ------------------+-------- Prvok pre zadavanie mzdovych udajov
                |   (zoznam pracovnikov)    |
                |                           +-------- Prvok pre zadanie zmien pre dany mesiac (mzdove zlozky) - kalendar
                |                           |
                |                           +-------- Prvok pre spustenie vypoctu za daneho pracovnika a dany aktualny mesiac a zobrazenie vypocitanej mzdy
                |
                +---- Mesacne spracovanie --+-------- Prvok pre spustenie hromadneho vypoctu pre vsetkych pracovnikov za aktualne obdobie 
                |                                     (mohlo by zobrazovat, aktualne spracovavane osobne cislo, alebo ukazovatel od 0-100% vypocitanych miezd) 
                |
                |
                |
                +---- Help 

### opravnenia:
        2 typy: pristup povoleny, pristup nepovoleny. 


## Typy pouzivatelov:
        legenda: 
                +  ma pravo
                -  nema pravo
        admin
                + vsetky prava
        
        accountant
                + vytvara nove zaznamy o pracovnikoch (pridat pracovnika)
                + upravit personalne data o pracovnikoch
                + moze vydiet mzdove udaje o pracovnikoch (kalendar)
                - nemoze menit mzdove udaje o pracovnikoch
        
        mzdova uctovnicka:
                + spravuje mzdove udaje o pracovnikoch (moze menit mzdove udaje o pracovnikoch)
                + ma moznost spustit vypocet mzdy pre jednotlivych pracovnikov, alebo hromadne
                - nemozse pridat pracovnikov

















ADVANCED SOLUTION (sem a nizsie nepozerat :D)
================= 
## Typy pouzivatelov:
        legenda: 
                +  ma pravo
                -  nema pravo
                () doplnkova funkcionalita
        
        administrator
                + spravovat uživatelov systemu
                + nastavovat opravnenia uzivatelov
                + má práva všechtkych následujucich rolí

        veduci:
                + spravuje vsetky ciselniky
                + ma pravo na hromadne spracovanie miezd 
                + pridava mzdovu uctovncku ku jednotlivym pracovnikom
                + ma pravo zmeny mzdovej uctovnicky pre pracovnika
                + má vsetky práva mzdovej uctovnicky aj personalistu
                   () + tvorbu podnikovych reportov
                - nemoze tvorit, upravovat a nastavovat prava uzivatelov systemu

        personalista:
                + vytvara nove zaznamy o pracovnikoch (pridat pracovnika)
                + upravut personalne data o pracovnikoch
                + moze vydiet mzdove udaje o pracovnikoch (kalendar)

                - nemoze menit mzdove udaje o pracovnikoch

                // - tabulka m.os

        mzdova uctovnicka:
                + 
                - spravuje mzdove udaje o pracovnikoch,
                ma moznost spustit vypocet mzdy pre jednotlivych pracovnikov,
                - spravuje mzdove data o pracovnikoch, ktore su priradene k dane mzdovej uctovnicke 
                spousti reporty urcene pro mzdove uctovnicku


## Vypocet mzdy:
        vstupy:
            - aktualne obdobie (za ktore sa pocitaju mzdy)
            - globalne parametre vychadzajuce z legislativy (vyber aktualneho zaznamu zo suboru globalnych parametrov, podla aktualneho obdobia)
            - kalendar - (kazdy pracovnik ma svoj kalendar definovany v mzdovych udajoch) 
             (z kalendara sa napocita Fond pracovnej doby - urcuje kolko hodin v mesiaci je pracovnych a kolko je platenych sviatkov. Kaledara je priradeny kazemu pracovnikovi vo mzdovych udajoch.) 
            - datum nastupu (z kmenovych udajov pracovnika)
            - datum ukoncenia pracovneho pomeru (z kmenovych udajov pracovnika)
            - mzdove udaje (vyfiltrovane aktualne platne podla aktualneho obdobia v torom sa pocitaju mzdy) 
            - zmenove kody vyfiltrovane pre aktualne obdobie za ktore sa pocitaju mzdy

        vystupy:
            - vypocitane udaje sa zapisu do tabulky mesacneho vypoctu mvy, ktora obsahuje odobne cislo, obdobie a 2000 znakove pole, do ktoreho sa zapisuju vypocitane udaje v zakodovanom tvare 
            na poziciu definovanu v takulke mvek. Na zapis a citanie z vektora sa pouziju funkcie mval(a:string[8]):double a mstr(a:double):string[8]. Do 2000 znakoveho pola sa da tymto sposobom 
            zapisat 250 ciselnych udajov. (priklad.: Fondpracovnej doby pozicia cislo 10. )   
        
        Zobrazenie vypocitanych udajov na obrazovke:    
            Vypocitane udaje sa nacitaju z tabulky mesacneho vypoctu mvy a zobrazia sa pouzivatelovi vo vhodnom tvare na obrazovke:
        
        Minimalne zobrazenie zahrna tieto udaje:
            - FPD, Odpracovane dni/hodiny, dni/hodiny sviatky, 
            - Hruba mzda - napocet definovanych pozicii podla tabulky mmask riadok=100 z tabulky mesacneho vypoctu
            - Odvody - napocet definovanych pozicii podla tabulky mmask riadok=101 z tabulky mesacneho vypoctu
            - Dan - napocet definovanych pozicii podla tabulky mmask riadok=102 z tabulky mesacneho vypoctu
            - Cista mzda - napocet definovanych pozicii podla tabulky mmask riadok=111 z tabulky mesacneho vypoctu

        Rozsirene zobrazenie obsahuje tieto udaje:
            - FPD, Odpracovane dni/hodiny, dni/hodiny sviatky, 
            - mzda za odpracovany cas
            - mzda za ostatne mzdove zlozky rozpiana po polozkach
            - Hruba mzda - napocet definovanych pozicii podla tabulky mmask riadok=100 z tabulky mesacneho vypoctu
            - Odvody zamestnanec - napocet definovanych pozicii podla tabulky mmask riadok=101 z tabulky mesacneho vypoctu
            - Odvody zamestnavatel - napocet definovanych pozicii podla tabulky mmask riadok=114 z tabulky mesacneho vypoctu
            - Dan Celkom - napocet definovanych pozicii podla tabulky mmask riadok=102 z tabulky mesacneho vypoctu
            - Cista mzda - napocet definovanych pozicii podla tabulky mmask riadok=111 z tabulky mesacneho vypoctu
            - Zrazky - napocet definovanych pozicii podla tabulky mmask riadok=112 z tabulky mesacneho vypoctu
            - K vyplate - napocet definovanych pozicii podla tabulky mmask riadok=113 z tabulky mesacneho vypoctu    


## Data:
    O pracovnikovi sa vedu nasledovne udaje:
    // Kazdy pracovnik je jednoznacne identifikovany unitarnim osobnym cislem a fotografiou (nepovinna). 
    - personalne (kmenove udaje pracovnika):   
                            osobne cislo pracovnika (id pracovnika) (mandatory),
                            meno, druhe meno, priezvisko, titul 
                            rodne cislo, 
                            datum narodenia,
                            statna prislusnost - (vyber z ciselnika krajin),
                            miesto narodenia,
                            pohlavie (muz, zena)
                            stav (zenaty , slobodny, rozvedeny,...)
                            cislo obcianskeho preukazu (id preukazu),
                            cislo pasu,
                            adresa trvaleho pobytu (z OP)
                            adresa prechodneho pobytu
                            telefonne cislo 1,2,3
                            mailova adresa 1,2
                            skype
                            funkcia (pracovna)
                            pozicia
                            oddelenie
                            pobocka
                            manager (nadriadeny)
                            kod pouzivatela (pod ktorym sa prihlasuje do systemu)
                            nakladove stredisko
                            
                            datum nastupu 
                            datum ukoncenia
                            dovod ukoncenia
                            status - udava, ci je pracovnik aktivny alebo nie. Aktivny znamena, ze pre neho pocitam mzdy a spracovavam vsetky agendy. 
                            
                            vzdelanie - (zakladne, stredoskolske, vysokoskolske I.stupna, vysokoskolske II.stupna, vysokoskolske III.stupna)
                            certifikaty a ocenenia 
                            predchadzajuce pracovne skusenosti (zamestnania)
                            poznamka
                            prilohy - moznost ukladat pdf prilohy k pracovnikovi - napriklad pracovna zmluva ako pdf.

                            
    - mesacne vypocitane udaje o spracovanych mzdach:
                            id pracovnika
                            obdobie - datum (datum predstavuje mesiac a rok, za ktory su udaje ulozene, bude mat den vzdy 1. napr 01.05.2019 )
                            vekt - znakove pole o dlzke 2000 znakov, ktore sluzi pre ukladanie vypocitanych hodnot pri vypocte miezd. 
                                   Je mozne ulozit do tohoto pola 250 hodnot, pricom kazda hodnota je zakodovana do 8 znakoveho retazca. 
                                   Pre kodovanie a dekodovanie sa pouziju funkcie mval(a:string(8)):double a mstr(a:double):string(8).

### Informacie o mzdach:
    - udaje o mzdovych zlozkach, na zaklade ktorych sa spocita mzda: ...
                            id pracovnika - 
                            poradove cislo zaznamu
                            kod - kod mzdovej zlozky, na zaklade ktoreho sa pocita mzda. podpobnejsi popis k mzdovym zlozkam vid. ciselnik mzdovych zloziek.
                            d1 - datum platnosti od 
                            d2 - datum platnosti do 
                            dni - zadane dni
                            hod - zadane hodiny
                            sadzba - koeficient alebo percentualna sadzba
                            suma - celkova suma pre danu mzdovu zlozku.  
                            pozn - poznamka
                            
                            Udaje dni, hodiny, sadzba a suma sa vyplnaju podla toho o aky kod sa jedna. Pri niektorych kodoch nemusia byt vypnene vobec, 
                            napr. u tych ktore predstavuju len datumovy rozsah ako napr. dovolenka alebo mimoevidency stav ako materska dovolenka a pod.
                            
  

    - ciselnik kalendarov - kalendar urcuje fond pracovnej doby a pocet hodin na smenu.
                         sklada sa z hlavicky kalendara a riadkov. 
                          
                         hlavicka obsahuje: 
                            kod kalendara jednojednoznacny
                            nazov kalendara (napr. 40 hod/tyzden )
                            priemerny pocet pracovnych dni za mesiac (21.74 pre 8 hodinovy denny pracovny cas) 
                            priemerny pocet pracovnych hodin v mesiaci (173.92 pre 8 hodinovy denny pracovny cas)
                            pracovnych hodin v tyzdni (40 pri 8 hod/den)
                            pracovnych hodin za den ( 8 za den )
                         riadky kalendara obsahuju:
                            kod kalendara
                            den (datum)
                            pracovne dni (1 alebo 0)
                            pracovne hod (8 alebo 0)
                            sviatky dni  (1 alebo 0)
                            sviatky hodiny (8 alebo nula)  
    
    - ciselnik mzdovych zloziek (kodov) - mzdove kody sa pouzivaju pre zadavanie zmien odpracovaneho casu, prekazok v praci, priplatkov, odmien, ostatnych osobnych nakladov, socialnych davok, zrazok a pod.
           jednotlive kody su rozdelene od kategorii ( kategoria je prvy znak kodu):
                    1-kody sluziace pre zadavanie zmeny odpracovaneho casu
                    2-prekazky v praci
                    3-priplatky
                    4-odmeny
                    5-nahrady
                    6-dohody a odstupne
                    7-Ostatne osobne nahrady
                    8-vyluky a mimoevidencny stav
                    9-zrazky
            dalej sa delia podla sposobu vypoctu (mkod_hak):
                    A - suma celkom v € 
                    B - sadzba * hod odprac.
                    C - sadzba * hodiny / FPD
                    D - vypocet na zaklade rozsahu datumu od - do
            
            udaje ovplyvnujuce zastavenie kurzora alebo aktivne/neaktivne pole pre editovanie. V pripade ze sa vyberie kod, ktory ma vyplnene Ano 
                    mkod_stopd1  - zastav na datume od
                    mkod_stopd2  - zastav na datume do
                    mkod_stopsk  - zastav na suma
                    mkod_stophod - zastav na hod
                    mkod_stoperc - zastav na percentach (koeficient)

            udaj    mkod_zobraz  (Ano/Nie) udava ci sa bude uvedeny kod ponukat pouzivatelovi pre zadavanie alebo nie.
  
            udaje na zaklade ktorych sa zapise vypocitana hodnota na spravnu poziciu vo vektore (do tabulky mvy):

                    mkod_vyshod  -  pozicia  pre zapisanie hodin pri prepocte daneho kodu (odpracovanych, dovolenky, nemoc a pod.)  vid. Ciselnik pozicii 1-250 tabulka mvek
                    mkod_vyskor  -  pozicia  pre zapisanie sumy penazi v EUR pri prepocte daneho kodu  vid. Ciselnik pozicii 1-250
                    mkod_vysdni  -  pozicia pre zapisanie poctu dni pri prepocte daneho kodu    vid. Ciselnik pozicii 1-250
                    mkod_vyspoc  -   pozicia  pre pocet pripadov napr. nemoc 2x v mesiaci.  vid. Ciselnik pozicii 1-250
            
            udaje ovplyvnujuce vypocet nemocenskych davok:
                    mkod_prgnem    A/N  - ak ma mzdovy kod pocitat nemocenske davky, tak hodnota=Ano inak NIE
                    mkod_percnm1  - percento pre nemoc
                    mkod_pocdnm1  - pocet dni pre nemoc
                    mkod_percnm2  - percento pre nemoc
                    mkod_pocdnm2  - pocet dni pre nemoc

            kody zrazok maju urcenu skupinu, ktora vyjadruje prioritu spracovania. 
            Niektore zrazky maju najvyssiu prioritu 1 napr. exekucie, to znamena ze sa zrealizuju ako prve.     
            Zrazky s najnizsou prioritou ako posledne.
                    mkod_skzraz  - skupina zrazok (priorite) nadobuda hodnotu 1-9 

            dalsie udaje 
                    mkod_druhvyn - druh vynatia. pre statisticke ucely
                    mkod_nulukon - nulovat pri ukonceni  (A/N) Ak nastalo ukoncenie pracovneho pomeru, tak kody poloziek, ktore maju toto pole nastavene na Ano sa nuluju pri vypocte.


## Možne rozšírenia:
    - Sumarizacni reporty za firmu, za uctovnicku, za organizacnu jednotku a pod.
    - Povinne vytvarane reporty (subory) podla legislativy...