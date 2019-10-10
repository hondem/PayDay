Payday
======

    Informační systém pre spracovanie personalnych udajov a vypocet mzdy pracovnikov. 

Casti:
- evidencia pracovnikov
- vypocet mzdy


## Typy pouzivatelov:
        administrator
                - prava: vsetky
                - spravuje uživatelov, nastavuje opravnenia uzivatelov
                má práva všechych následujucich rolí

        veduci:
                - spravuje vsetky ciselniky, ma pravo na hromadne spracovanie miezd a tvorbu podnikovych reportu
                - ma pravo zmeny mzdovej uctovnicky pre pracovnika
                - má práva mzdovej uctovnicky

        personalista:
                - vytvara nove zaznamy o pracovnikoch
                - spravuje personalne data o pracovnikoch

        mzdova uctovnicka:
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

    - mzdove udaje pracovnika s logovanim zmien - kazda zmena v nastaveni musi byt mesacne (za obdobie) logovana, tzn., ak nastane zmena prida sa novy zaznam s aktualnym datumom "platiod"
    (tabulka mzu)            pricom v novom zazname budu udaje rovnake ako v predchadzajucom zazname + update zmeny  
                            
                            id pacovnika (osc) (mandatory)
                            platiod (mandatory) - datum platnosti zaznamu - plati od datum bude mat den vzdy 1. napr 01.05.2019 
                            druh pracovneho pomeru (mandatory) (hlavny prac.pomer, dohoda o brignickj cinnosti studentov, dohoda o prac.cinnosti, dohoda o vykonani prace)
                            trieda - kodove oznacenie platobnej triedy napr 01,02, 03, A1, A2, ...  default hodnota ' ' medzera
                            typ pracovnej doby - zatial nevyuzite.
                            kalendar (mandatory) - kod kalendara z tabulky mkalh  - urcuje pocet prac. dni a pocet sviatkov, pocet hodin prac.dni a pocet hodin sviatkov,
                                                   default hodnota 1
                            uvazok - ciselne oznacenie percentualneho vyjadrenia uvazku. vacsinou 100%, default hodnota 100
                            vypsviat - sposob prepoctu sviatkov - P - priemerom, T - tarifom , default hodnota T
                            pp5d - logicka premenna urcuje ci pracovnik pracuje viac ako 5 dni. Vacsinou True, default hodnota Nie
                            odprac5d - zatial nepouzita, default hodnota Nie
                            zpracsch1 - znizena pracovna schopnost 1.kategoria (hodnoty  Ano/NIE), default hodnota Nie
                            zpracsch2 - znizena pracovna schopnost 2.kategoria (hodnoty  Ano/NIE), default hodnota Nie
                            zpracsch3 - znizena pracovna schopnost 3.kategoria (hodnoty  Ano/NIE), default hodnota Nie
                            mud_prackat - statisticky udaj - 1-6, default 1 
                            mud_statkat - statisticky udaj, default hodnota ' ' medzera,
                            mud_speckat - statisticky udaj, default hodnota ' ' medzera
                            mud_dochodca - Ano/Nie, udava ci je dany clovek dochodca, default hodnota Nie
                            mud_druhdoch - typ dochodku, default ' ' medzera, hodnoty S-starobny, ...
                            mud_pocdeti - udava pocet deti pracovnika pre danovy bonus, default hodnota 0
                            mud_odpmanz - udava, ci si pracovnik uplatnuje danovy odpocet na manzelku, default hodnota Nie
                            mud_danbon - udava, ci si uplatnuje danovy bonus na deti, default hodnota Nie
                            mud_nezdmin - udava ci si uplatnuje nezdanitelne minimum, default hodnota Nie
                            mud_zdrpoi -  udava cislo zdravotnej poistovne - hodnoty su: 24-DÔVERA zdravotná poisťovňa, a. s. 
                                                                                         25-VŠEOBECNÁ zdravotná poisťovňa, a. s.
                                                                                         27-UnionUNION zdravotná poisťovňa, a. s. 
                            mud_zpzc -  udava ci sa pracovnikovi pocita zdravotne poistenie za zamestnanca, default hodnota Ano
                            mud_dpzc -  udava ci sa pracovnikovi pocita socialne poistenie (dochodkove a invalidne)za zamestnanca, default hodnota Ano
                            mud_npzc -  udava ci sa pracovnikovi pocita nemocenske poistenie za zamestnanca, default hodnota Ano
                            mud_fzzc -  udava ci sa pracovnikovi pocita poistenie v nezamestnanosti za zamestnanca, default hodnota Ano
                            mud_zpzl -  udava ci sa pracovnikovi pocita zdravotne poistenie za zamestnavatela, default hodnota Ano
                            mud_dpzl -  udava ci sa pracovnikovi pocita socialne poistenie za zamestnavatela, default hodnota Ano
                            mud_npzl -  udava ci sa pracovnikovi pocita nemocenske poistenie za zamestnavatela, default hodnota Ano
                            mud_fzzl -  udava ci sa pracovnikovi pocita poistenie v nezamestnanosti za zamestnavatela, default hodnota Ano
                            mud_narrd - nevyuzite (povodne narok na dovolenku za rok)
                            mud_narrddod - nevyuzite (povodne narok na dodatkovu dovolenku)
                            mud_narrdkrat - nevyuzite (povodne kratenie dovolenky)
                            mud_narrdmr - nevyuzite  (povodne zostatok dovolenky z minuleho roku.)
                            mud_vzddoprac - nevyuzite
                            mud_odbory - clenstvo v odboroch, default hodnota Nie
                            mud_druhcin - staisticka hodnota, druh cinnosti, default hodnota ' ', vyber z ciselnika, zatial nedefinovane
                            mud_zamest - statisticka hodnota, druh zamestnania, default hodnota ' ', vyber z ciselnika, zatial nedefinovane
                            mud_hodpcinn - nevyuzite
                            mud_p1 rezerva pre buduce pouzitie, default hodnota ' '
                            mud_p2 rezerva pre buduce pouzitie, default hodnota ' '
                            mud_p3 rezerva pre buduce pouzitie, default hodnota ' '
                            mud_p4 rezerva pre buduce pouzitie, default hodnota ' '
                            mud_p5 rezerva pre buduce pouzitie, default hodnota ' '
                            mud_p6 rezerva pre buduce pouzitie, default hodnota ' '
                            mud_p7 rezerva pre buduce pouzitie, default hodnota ' '
                            mud_p8 rezerva pre buduce pouzitie, default hodnota ' '
                            
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
                            
    - parametre pre nastavenie miezd (globalne) - ulozene v tabulke mpar:
                            tabulka mpar obsahuje globalne parametre pouzivane pre vypocet miezd. 
                            jednotlive zaznamy predstavuju platne hodnoty pre casove obdobie dane datumom mpar_datum
                            
                            mpar_id - poradove cislo zaznamu
                            mpar_datum - datum platnosti od - od kedy platia hodnoty v zazname
                            mpar_ico - ICO firmy z registra firiem (www.orsr.sk)
                            mpar_nazov - nazov firmy z registra firiem (www.orsr.sk)
                            mpar_dic - DIC firmy
                            mpar_icdph - IC DPH firmy 
                            mpar_addr1..6 - riadky adresy firmy
                            mpar_psc - psc
                            mpar_bkod - kod banky (vyber z ciselnika bank cba) napr. 0200 - Vseobecna Uverova Banka, a.s.
                            mpar_bucet - IBAN ucet firmy, z ktoreho sa platia vyplaty
                            mpar_zp1 - sadzba v percentach pre zdravotne poistenie zamestnanca
                            mpar_np1 - sadzba v percentach pre nemocenske poistenie zamestnanca
                            mpar_dps1 - sadzba v percentach pre dochodkove poistenie starobne zamestnanca
                            mpar_dpi1 - sadzba v percentach pre dochodkove poistenie invalidne zamestnanca
                            mpar_pvn1 - sadzba v percentach pre poistenie v nezamestnanosti zamestnanca
                            mpar_zp2 - sadzba v percentach pre zdravotne poistenie zamestnavatel
                            mpar_np2 - sadzba v percentach pre nemocenske poistenie zamestnavatel
                            mpar_dps2 - sadzba v percentach pre dochodkove poistenie starobne zamestnavatel
                            mpar_dpi2 - sadzba v percentach pre dochodkove poistenie invalidne zamestnavatel
                            mpar_pvn2 - sadzba v percentach pre poistenie v nezamestnanosti zamestnavatel
                            mpar_gp2 - sadzba v percentach pre garancne poistenie zamestnavatel
                            mpar_up2 - sadzba v percentach pre urazove poistenie zamestnavatel
                            mpar_rf2 - sadzba v percentach pre rezervny fond zamestnavatel
                            mpar_sf2 - sadzba v percentach pre socialny fond zamestnavatel
                            mmpar_mmhod1 - minimalna mzda hodinova pre kategoriu 1 
                            mmpar_mmhod2 - minimalna mzda hodinova pre kategoriu 2
                            mmpar_mmhod3 - minimalna mzda hodinova pre kategoriu 3
                            mmpar_mmhod4 - minimalna mzda hodinova pre kategoriu 4
                            mmpar_mmhod5 - minimalna mzda hodinova pre kategoriu 5                                         
                            mmpar_mmhod6 - minimalna mzda hodinova pre kategoriu 6
                            mmpar_mmmes1 - minimalna mzda mesacnaa pre kategoriu 1
                            mmpar_mmmes2 - minimalna mzda mesacnaa pre kategoriu 2
                            mmpar_mmmes3 - minimalna mzda mesacnaa pre kategoriu 3
                            mmpar_mmmes4 - minimalna mzda mesacnaa pre kategoriu 4
                            mmpar_mmmes5 - minimalna mzda mesacnaa pre kategoriu 5
                            mmpar_mmmes6 - minimalna mzda mesacnaa pre kategoriu 6                            
                            mpar_maxvzsp - maximalny vymeriavaci zaklad socialna poistovna
                            mpar_zivmin - zivotne minimum 210,20 € mesačne, ak ide o jednu plnoletú fyzickú osobu,
                            mpar_zivmin1 -     146,64 € mesačne, ak ide o ďalšiu spoločne posudzovanú plnoletú fyzickú osobu,
                            mpar_zivmin2 -       95,96 € mesačne, ak ide o nezaopatrené dieťa alebo zaopatrené neplnoleté dieťa.
                            mpar_dan1 - zakladna sadzba dane pre vypocet mzdy (19%)
                            mpar_dan2 - zvysena sadzba dane pre vypocet mzdy  (25%)
                            mpar_dandiv - sadzba dane z vyplatenych dividend  (7%)
                            mpar_danrez - sadzba dane pre pre rezidenta (19%)
                            mpar_dannerez - sadzba dane pre nerezidenta (35%)
                            mpar_danucin - sadzba dane pre ustavnych cinitelov (5%)
                            mpar_nczdr - nezdanitelna ciastka zakladu dane rocna (3937.35 eur)
                            mpar_nczdm - nezdanitelna ciastka zakladu dane mesacna (328.12 eur)
                            mpar_rszpdb - rezerva
                            mpar_rsdb - rocna sadzba danovy bonus na dieta (266.04 eur)
                            mpar_hzpdp Hranica zdanitelneho prijmu pre dan.bonus prijem min. 3120eur 6xmin.mzda
                            mpar_mmmpdb - minimalna mesacna mzda pre danovy bonus
                            mpar_ovstud - Odvodova vynimka student
                            mpar_ovdoch - Odvodova vynimka dochodca
                            mpar_mopzp - odpocitatelna polozka zdravotne poistenie
                            mpar_mdvznd - maximalny denny vym.zaklad nem.davky
                            mpar_nahrkm - nahrada za kilometer jazdy sluz.cesta dvojstopove vozidlo
                            mpar_minstr - minimalne stravne
                            mpar_strav0 - nahrada stravne za 4 hod odprac.smenu
                            mpar_strav1 - Stravne 5-12 h
                            mpar_strav2 - Stravne 12-18 h
                            mpar_strav3 - stravne nad 18 h
                            mpar_13plo1 - 13 plat rok1
                            mpar_13plo2 - 13 plat rok2
                            mpar_13plo3 - 13 plat rok3
                            mpar_nasob - nasobok ziv.minima pre rozdelenie zakladu dane na 19% a 25% (176.8)
                            

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
                    mkod_stopd1	- zastav na datume od
                    mkod_stopd2	- zastav na datume do
                    mkod_stopsk	- zastav na suma
                    mkod_stophod - zastav na hod
                    mkod_stoperc - zastav na percentach (koeficient)

            udaj    mkod_zobraz	(Ano/Nie) udava ci sa bude uvedeny kod ponukat pouzivatelovi pre zadavanie alebo nie.
  
            udaje na zaklade ktorych sa zapise vypocitana hodnota na spravnu poziciu vo vektore (do tabulky mvy):

                    mkod_vyshod	-	pozicia	pre zapisanie hodin pri prepocte daneho kodu (odpracovanych, dovolenky, nemoc a pod.)	vid. Ciselnik pozicii 1-250 tabulka mvek
                    mkod_vyskor	-	pozicia	pre zapisanie sumy penazi v EUR pri prepocte daneho kodu	vid. Ciselnik pozicii 1-250
                    mkod_vysdni	-	pozicia pre zapisanie poctu dni pri prepocte daneho kodu		vid. Ciselnik pozicii 1-250
                    mkod_vyspoc	-   pozicia	pre pocet pripadov napr. nemoc 2x v mesiaci.	vid. Ciselnik pozicii 1-250
            
            udaje ovplyvnujuce vypocet nemocenskych davok:
                    mkod_prgnem		A/N  - ak ma mzdovy kod pocitat nemocenske davky, tak hodnota=Ano inak NIE
                    mkod_percnm1	- percento pre nemoc
                    mkod_pocdnm1	- pocet dni pre nemoc
                    mkod_percnm2	- percento pre nemoc
                    mkod_pocdnm2	- pocet dni pre nemoc

            kody zrazok maju urcenu skupinu, ktora vyjadruje prioritu spracovania. 
            Niektore zrazky maju najvyssiu prioritu 1 napr. exekucie, to znamena ze sa zrealizuju ako prve.     
            Zrazky s najnizsou prioritou ako posledne.
                    mkod_skzraz	- skupina zrazok (priorite) nadobuda hodnotu 1-9 

            dalsie udaje 
                    mkod_druhvyn - druh vynatia. pre statisticke ucely
                    mkod_nulukon - nulovat pri ukonceni	(A/N) Ak nastalo ukoncenie pracovneho pomeru, tak kody poloziek, ktore maju toto pole nastavene na Ano sa nuluju pri vypocte.
                    mkod_par10	nepouzite, rezerva pre dalsiu funkcionalitu
                    mkod_par11	nepouzite, rezerva pre dalsiu funkcionalitu
                    mkod_par12	nepouzite, rezerva pre dalsiu funkcionalitu
                    mkod_par13	nepouzite, rezerva pre dalsiu funkcionalitu
                    mkod_par14	nepouzite, rezerva pre dalsiu funkcionalitu
                    mkod_par15	nepouzite, rezerva pre dalsiu funkcionalitu





## Možne rozšírenia:
    - Sumarizacni reporty za firmu, za uctovnicku, za organizacnu jednotku a pod.
    - Povinne vytvarane reporty (subory) podla legislativy...