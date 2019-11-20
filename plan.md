Payday
======

        Informační systém pre spracovanie personalnych udajov a vypocet mzdy pracovnikov. 


BASIC SOLUTION
==============

### Menu programu:
    Prilasenie--+---- Personalistika -------+-------- Prvok pre vlozenie a upravu personalnych udajov 
                |    (zoznam pracovnikov)
                |
                +--- Mzdy ------------------+-------- Prvok pre zadavanie mzdovych udajov
                |   (zoznam pracovnikov)    |
                |                           +-------- Prvok pre zadanie zmien pre dany mesiac (mzdove zlozky) - kalendar
                |                           |
                |                           +-------- Prvok pre spustenie vypoctu za daneho pracovnika a dany aktualny mesiac a zobrazenie vypocitanej mzdy
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

## Zobrazenie (UI)
    vstupy:
        Udaje pracovnika:
        - unitarne osobne cislo a fotografiou (nepovinna) 
                + vsetko co je v tabulke m.osoba
                + vsetko co je v tabulke m.udaje

    vystupy:
        Vyplatny listok:
                + zobrazene data z m.osoba + m.vypocet
                        Zobrazenie vypocitanych udajov na obrazovke:    
                            - Vypocitane udaje sa nacitaju z tabulky mesacneho vypoctu m.vypocet
                            - zobrazia sa pouzivatelovi vo vhodnom tvare na obrazovke:
                        Minimalne zobrazenie zahrna tieto udaje:
                            - FPD, Odpracovane dni/hodiny, dni/hodiny sviatky, 
                            - Hruba mzda - napocet definovanych pozicii podla tabulky m.masky riadok=100 z tabulky mesacneho vypoctu
                            - Odvody - napocet definovanych pozicii podla tabulky m.masky riadok=101 z tabulky mesacneho vypoctu
                            - Dan - napocet definovanych pozicii podla tabulky m.masky riadok=102 z tabulky mesacneho vypoctu
                            - Cista mzda - napocet definovanych pozicii podla tabulky m.masky riadok=111 z tabulky mesacneho vypoctu


## Vypocet mzdy (python script):
    vstupy:
        - aktualne obdobie (za ktore sa pocitaju mzdy)
        - id zamestnanca
            + data v tabulke m.udaje a m.oboba
                    - kalendar - (kazdy pracovnik ma svoj kalendar definovany v mzdovych udajoch) 
                    (z kalendara sa napocita Fond pracovnej doby - urcuje kolko hodin v mesiaci je pracovnych a kolko je platenych sviatkov. Kaledara je priradeny kazemu pracovnikovi vo mzdovych udajoch.) 
                    - datum nastupu (z kmenovych udajov pracovnika)
                    - datum ukoncenia pracovneho pomeru (z kmenovych udajov pracovnika)
                    - mzdove udaje (vyfiltrovane aktualne platne podla aktualneho obdobia v torom sa pocitaju mzdy) 
                    - zmenove kody vyfiltrovane pre aktualne obdobie za ktore sa pocitaju mzdy

    vystupy:
        - vypocitane udaje sa zapisu do tabulky mesacneho vypoctu m.vypocet
         ktora obsahuje odobne cislo, obdobie a 2000 znakove pole, do ktoreho sa zapisuju vypocitane udaje v zakodovanom tvare 
         na poziciu definovanu v takulke mvek. Na zapis a citanie z vektora sa pouziju funkcie mval(a:string[8]):double a mstr(a:double):string[8]. Do 2000 znakoveho pola sa da tymto sposobom 
         zapisat 250 ciselnych udajov. (priklad.: Fondpracovnej doby pozicia cislo 10. )   




































ADVANCED SOLUTION (sem a nizsie nepozerat :D)
=================

## menu:
         Prilasenie--+---- Personalistika -------+-------- Obrazovka pre vlozenie a opravu personalnych udajov 
                        |    (zoznam pracovnikov)
                        |
                        +--- Mzdy ------------------+-------- Obrazovka pre zadavanie mzdovych udajov
                        |   (zoznam pracovnikov)    |
                        |                           +-------- Obrazovka pre zadanie zmien pre dany mesiac (mzdove zlozky) - kalendar
                        |                           |
                        |                           +-------- Obrazovka pre spustenie vypoctu za daneho pracovnika a dany aktualny mesiac a zobrazenie  vypocitanej mzdy
                        |
                        +---- Mesacne spracovanie --+-------- Obrazovka pre spustenie hromadneho vypoctu pre vsetkych pracovnikov za aktualne obdobie 
                        |                                     (mohlo by zobrazovat, aktualne spracovavane osobne cislo, alebo ukazovatel od 0-100%      vypocitanych miezd) 
                        |
                        +---- Reporty --------------+-------- Report vyplatne pasky pre vsetkych pracovnikov
                        |                           |
                        |                           +-------- Report rekapitulacia
                        |                           |
                        |                           +-------- report prikaz na uhradu ( hromadny prikaz na odoslanie miezd bud ako pdf subor alebo ako .xml     subor v predpisanom tvare )
                        |                           |
                        |                           +-------- report pre danovy urad ( povinny report pre danovy urad)
                        |
                        |
                        |
                        |
                        +---- Nastavenia ---+---- obrazovka parametre miezd (pridanie, modifikacia alebo kopia zaznamu )
                        |                   |
                        |                   +---- obrazovka pre udrzbu opravneni
                        |                   |
                        |                   +---- obrazovka pre udrzbu ciselnikov (mzdove kody, mesta, krajiny, banky, masky, ...) 
                        |                   |
                        |                   +---- udrzba/generovanie kalendarov
                        +---- Help 
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

        mzdova uctovnicka:
                + spravuje mzdove udaje o pracovnikoch (moze menit mzdove udaje o pracovnikoch)
                + ma moznost spustit vypocet mzdy pre jednotlivych pracovnikov, alebo hromadne
                - nemozse pridat pracovnikov


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

### Zobrazenie
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
    - Kazdy pracovnik je jednoznacne identifikovany unitarnim osobnym cislem a fotografiou (nepovinna). 
    - vsetko co je v tabulke m.osoba


## Možne rozšírenia:
    - Sumarizacni reporty za firmu, za uctovnicku, za organizacnu jednotku a pod.
    - Povinne vytvarane reporty (subory) podla legislativy...