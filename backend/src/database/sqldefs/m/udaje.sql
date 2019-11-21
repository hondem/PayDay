CREATE TABLE m.udaje (
  "id" int NOT NULL REFERENCES m.osoba(id),
  "platnost_od" date NOT NULL,
  "druh" char(1) NOT NULL,
  "trieda" char(2) NOT NULL,
  "pracovna_doba_typ" char(3) NOT NULL,
  "kalendar_typ" int not null REFERENCES m.kalendar_typ(id),
  "uvazok" real NOT NULL,
  "vypocet_sviatkov" char(1) NOT NULL,
  "pracovny_pomer_nad_5dni" char(1) NOT NULL,
  "pracovna_schopnost_znizena1" char(1) NOT NULL,
  "pracovna_schopnost_znizena2" char(1) NOT NULL,
  "pracovna_schopnost_znizena3" char(1) NOT NULL,
  "pracovna_kategoria" char(1) NOT NULL,
  "staticticky_udaj" char(1) NOT NULL,
  "specialna_kategoria" char(1) NOT NULL,
  "dochodca" char(1) NOT NULL,
  "dochodok_typ" char(1) NOT NULL,
  "pocet_deti" char(1) NOT NULL,
  "pocet_deti_do_6" int NOT NULL,
  "danovy_odpocet_manzelka" int NOT NULL,
  "danovy_bonus" char(1) NOT NULL,
  "nezdanitelne_min" char(1) NOT NULL,
  "zdravotna_poistovna" char(1) NOT NULL,
  "zc_zp" char(1) NOT NULL,
  "zc_sp_dp" char(1) NOT NULL,
  "zc_sp_np" char(1) NOT NULL,
  "zc_sp_pvn" char(1) NOT NULL,
  "zl_zp" char(1) NOT NULL,
  "zl_sp_dp" char(1) NOT NULL,
  "zl_sp_np" char(1) NOT NULL,
  "zl_sp_pvn" char(1) NOT NULL,
  "odbory" char(1) NOT NULL
  PRIMARY KEY (id, platnost_od),
);

COMMENT ON TABLE m.udaje IS ' - mzdove udaje pracovnika s logovanim zmien - kazda zmena v nastaveni musi byt mesacne (za obdobie) logovana, tzn., ak nastane zmena prida sa novy zaznam s aktualnym datumom platiod, pricom v novom zazname budu udaje rovnake ako v predchadzajucom zazname + update zmeny prislusneho stlpca alebo stlpcov'
COMMENT ON COLUMN m.udaje.id IS 'id pacovnika (osc) (mandatory)';
COMMENT ON COLUMN m.udaje.platnost_od IS ' (mandatory) - datum platnosti zaznamu - plati od datum bude mat den vzdy 1. napr 01.05.2019 ';
COMMENT ON COLUMN m.udaje.druh IS ' pracovneho pomeru (mandatory) (hlavny prac.pomer, dohoda o briganickj cinnosti studentov, dohoda o prac.cinnosti, dohoda o vykonani prace)';
COMMENT ON COLUMN m.udaje.trieda IS ' - kodove oznacenie platobnej triedy napr 01,02, 03, A1, A2, ...  default hodnota ' ' medzera';
COMMENT ON COLUMN m.udaje.pracovna_doba_typ IS ' typ pracovnej doby - zatial nevyuzite.';
COMMENT ON COLUMN m.udaje.kalendar IS ' (mandatory) - kod kalendara z tabulky mkalh  - urcuje pocet prac. dni a pocet sviatkov, pocet hodin prac.dni a pocet hodin sviatkov,';
COMMENT ON COLUMN m.udaje.uvazok IS ' - ciselne oznacenie percentualneho vyjadrenia uvazku. vacsinou 100%, default hodnota 100';
COMMENT ON COLUMN m.udaje.vypocet_sviatkov IS ' - sposob prepoctu sviatkov - P - priemerom, T - tarifom , default hodnota T';
COMMENT ON COLUMN m.udaje.pracovny_pomer_nad_5dni IS ' - logicka premenna urcuje ci pracovnik pracuje viac ako 5 dni. Vacsinou True, default hodnota Nie';
COMMENT ON COLUMN m.udaje.pracovna_schopnost_znizena1 IS ' - znizena pracovna schopnost 1.kategoria (hodnoty  Ano/NIE), default hodnota Nie';
COMMENT ON COLUMN m.udaje.pracovna_schopnost_znizena2 IS ' - znizena pracovna schopnost 2.kategoria (hodnoty  Ano/NIE), default hodnota Nie';
COMMENT ON COLUMN m.udaje.pracovna_schopnost_znizena3 IS ' - znizena pracovna schopnost 3.kategoria (hodnoty  Ano/NIE), default hodnota Nie';
COMMENT ON COLUMN m.udaje.pracovna_kategoria IS ' - statisticky udaj - 1-6, default 1 ';
COMMENT ON COLUMN m.udaje.staticticky_udaj IS ' - statisticky udaj, default hodnota ' ' medzera,';
COMMENT ON COLUMN m.udaje.specialna_kategoria IS ' - statisticky udaj, default hodnota ' ' medzera';
COMMENT ON COLUMN m.udaje.dochodca IS ' - Ano/Nie, udava ci je dany clovek dochodca, default hodnota Nie';
COMMENT ON COLUMN m.udaje.dochodok_typ IS ' - typ dochodku, default ' ' medzera, hodnoty S-starobny, ...';
COMMENT ON COLUMN m.udaje.pocet_deti IS ' - udava celkovy pocet deti pracovnika pre danovy bonus, default hodnota 0';
COMMENT ON COLUMN m.udaje.pocet_deti_do_6 IS ' - udava pocet deti pracovnika pre danovy bonus do 6 rokov, default hodnota 0';
COMMENT ON COLUMN m.udaje.danovy_odpocet_manzelka IS ' - udava, ci si pracovnik uplatnuje danovy odpocet na manzelku, default hodnota Nie';
COMMENT ON COLUMN m.udaje.danovy_bonus IS ' - udava, ci si uplatnuje danovy bonus na deti, default hodnota Nie';
COMMENT ON COLUMN m.udaje.nezdanitelne_min IS ' - udava ci si uplatnuje nezdanitelne minimum, default hodnota Nie';
COMMENT ON COLUMN m.udaje.zdravotna_poistovna IS ' -  udava cislo zdravotnej poistovne - hodnoty su: 24-DÔVERA zdravotná poisťovňa, a. s., 25-VŠEOBECNÁ zdravotná poisťovňa, a. s., .27 -UNION zdravotná poisťovňa, a. s. ';
COMMENT ON COLUMN m.udaje.zc_zp IS ' -  udava ci sa pracovnikovi pocita zdravotne poistenie za zamestnanca, default hodnota Ano';
COMMENT ON COLUMN m.udaje.zc_sp_dp IS ' -  udava ci sa pracovnikovi pocita socialne poistenie (dochodkove a invalidne)za zamestnanca, default hodnota Ano';
COMMENT ON COLUMN m.udaje.zc_sp_np IS ' -  udava ci sa pracovnikovi pocita nemocenske poistenie za zamestnanca, default hodnota Ano';
COMMENT ON COLUMN m.udaje.zc_sp_pvn IS ' -  udava ci sa pracovnikovi pocita poistenie v nezamestnanosti za zamestnanca, default hodnota Ano';
COMMENT ON COLUMN m.udaje.zl_zp IS ' -  udava ci sa pracovnikovi pocita zdravotne poistenie za zamestnavatela, default hodnota Ano';
COMMENT ON COLUMN m.udaje.zl_sp_dp IS ' -  udava ci sa pracovnikovi pocita socialne poistenie za zamestnavatela, default hodnota Ano';
COMMENT ON COLUMN m.udaje.zl_sp_np IS ' -  udava ci sa pracovnikovi pocita nemocenske poistenie za zamestnavatela, default hodnota Ano';
COMMENT ON COLUMN m.udaje.zl_sp_pvn IS ' -  udava ci sa pracovnikovi pocita poistenie v nezamestnanosti za zamestnavatela, default hodnota Ano';
COMMENT ON COLUMN m.udaje.odbory IS ' - clenstvo v odboroch, default hodnota Nie';

