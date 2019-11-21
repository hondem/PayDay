CREATE TABLE m.osoba (
  "id" int NOT NULL PRIMARY KEY,
  "osobne_cislo" varchar(10) NOT NULL,
  "meno" varchar(255) NOT NULL,
  "stredne_meno" varchar(255),
  "priezvisko" varchar(255) NOT NULL,
  "externe_osobne_cislo" varchar(20) NOT NULL, --externe cislo
  "aktivny" boolean NOT NULL,
  "funkcia" varchar(50) NOT NULL,
  "pozicia" varchar(50) NOT NULL,
  "oddelenie" varchar(20) NOT NULL,
  "pobocka" varchar(20) NOT NULL,
  "stredisko" varchar(10) NOT NULL,
  "telefon_pracovny" varchar(25) NOT NULL,
  "telefon_sukromny" varchar(25) NOT NULL,
  "telefon_iny" varchar(25) NOT NULL,
  "skype" varchar(100),
  "email" varchar(100),
  "rodne_cislo" varchar(10) NOT NULL,
  "datum_nar" date NOT NULL,
  "pohlavie" char(1) NOT NULL,
  "statna_prislusnost" varchar(20) NOT NULL,
  "miesto_narodenia" varchar(100) NOT NULL,
  "stav" char(1) NOT NULL,
  "obcianky" varchar(25) NOT NULL,
  "pas" varchar(25) NOT NULL,
  "adresa_ulica_trvale" varchar(100) NOT NULL,
  "adresa_cislo_popisne_trvale" varchar(100) NOT NULL,
  "adresa_cislo_domu_trvale" varchar(100) NOT NULL,
  "psc_trvale" varchar(6) NOT NULL,
  "mesto_trvale" varchar(100) NOT NULL,
  "okres_trvale" varchar(100) NOT NULL,
  "kraj_trvale" varchar(100) NOT NULL,
  "krajina_trvale" varchar(100) NOT NULL,
  "adresa_ulica_prechodne" varchar(100),
  "adresa_cislo_popisne_prechodne" varchar(100),
  "adresa_cislo_domu_prechodne" varchar(100),
  "psc_prechodne" varchar(6),
  "mesto_prechodne" varchar(100),
  "okres_prechodne" varchar(100),
  "kraj_prechodne" varchar(100),
  "krajina_prechodne" varchar(100),
  "nastup" date NOT NULL,
  "ukocenie" date NOT NULL,
  "pozn" varchar(255)
);


COMMENT ON COLUMN m.osoba.aktivny IS '  udaj oznacuje ci je mozne s danym zaznamom pracovat alebo nie. Nie - nevyberie sa pre spracovanie miezd';
COMMENT ON COLUMN m.osoba.nastup IS '  datum zaciatku pracovneho pomeru';
COMMENT ON COLUMN m.osoba.ukoncenie IS ' datum ukoncenia pracovneho pomeru';
COMMENT ON COLUMN m.osoba.stav IS 'zadany/nezadany';
