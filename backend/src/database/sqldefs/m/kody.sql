CREATE TABLE m.kody (
  "id" integer not null PRIMARY KEY,
  "kod" char(10) not null,
  "skupina" char(1) not null,
  "popis" char(30) not null,
  "zc_zp" boolean not null,
  "zc_sp_dp" boolean not null,
  "zc_sp_np" boolean not null,
  "zc_sp_pvn" boolean not null,
  "zl_zp" boolean not null,
  "zl_sp_d" boolean not null,
  "zl_sp_np" boolean not null,
  "zl_sp_pvn" boolean not null,
  "zl_sp_up" boolean not null,
  "zl_garancny_fond" boolean not null,
  "zl_rezervny_fond" boolean not null,
  "zl_socialny_fond" boolean not null,
  "druh_vypoctu" char(1) not null,
  "minus_sviatok" boolean not null,
  "hod_celkom" integer not null,
  "hod1" integer not null,
  "hod2" integer not null,
  "hod3" integer not null,
  "hod4" integer not null,
  "hod5" integer not null,
  "hod6" integer not null,
  "hod7" integer not null,
  "hod8" integer not null,
  "algoritmus_koeficient" boolean not null,
  "pozicia_pomocny_vektor" integer not null,
  "mesacne_nahrady" float not null,
  "tarif" float not null,
  "percpm" char(1) not null,
  "percpls" char(1) not null,
  "hodnota" boolean not null,
  "hodiny" boolean not null,
  "perceto" boolean not null,
  "ucet_md" char(30) not null,
  "ucet_dal" char(30) not null,
  "zobraz" boolean not null,
  "vysledok_hod" integer not null,
  "vysledok_suma" integer not null,
  "vysledok_dni" integer not null,
  "vysledok_pocet" integer not null,
  "vypocet_nemoc" boolean not null,
  "nemoc1" float not null,
  "nemoc1_dni" integer not null,
  "nemoc2" float not null,
  "nemoc2_dni" integer not null,
  "skupina_zrazok" char(1) not null,
  "druh_vynatia" char(1) not null,
  "ukoncenie" boolean not null
);
COMMENT ON COLUMN m.kody.skupina IS '1-9:   1 – kody pre mzdy, 2- prekazky v praci, 3-priplatky, 4-odmeny, 5-nahrady, 6-dohody a odstupne, 7-ostatne osobne , 8 vyluky a mimoevidencny stav, 9-zrazky';
COMMENT ON COLUMN m.kody.zc_zp IS 'Ma sa pocitat zdrav.poist. pre zamestnaneca (Zc)  A/N';
COMMENT ON COLUMN m.kody.zc_sp_d IS 'Ma sa pocitat soc.poist. Doch. Zc  (starobne a invalidne) A/N';
COMMENT ON COLUMN m.kody.zc_sp_np IS 'Ma sa pocitat soc.poist. Nem. Zc  A/N';
COMMENT ON COLUMN m.kody.zc_sp_pvn IS 'Ma sa pocitat fond poistenie v nezamestnaosti (Zc)  A/N';
COMMENT ON COLUMN m.kody.zl_zp IS 'Ma sa pocitat zdrav.poist.za zamestnavatela (Zl)  A/N';
COMMENT ON COLUMN m.kody.zl_sp_d IS 'Ma sa pocitat soc.poist. Doch. (starobne a invalidne) Zl  A/N';
COMMENT ON COLUMN m.kody.zl_sp_np IS 'Ma sa pocitat soc.poist. Nem. Zl  A/N';
COMMENT ON COLUMN m.kody.zl_sp_pvn IS 'Ma sa pocitat fond poistenie v nezamest. Zl  A/N';
COMMENT ON COLUMN m.kody.zl_sp_up IS 'Ma sa pocitat urazove poistenie Zl  A/N';
COMMENT ON COLUMN m.kody.zl_garancny_fond IS 'Ma sa pocitat garancny fond  A/N';
COMMENT ON COLUMN m.kody.zl_rezervny_fond IS 'Ma sa pocitat rezervny fond  A/N';
COMMENT ON COLUMN m.kody.zl_socialny_fond IS 'Ma sa pocitat socialny fond  A/N';
COMMENT ON COLUMN m.kody.druh_vypoctu IS 'napocet hodiny a penazi A,B,C,D';
COMMENT ON COLUMN m.kody.minus_sviatok IS 'Ci znizuje sviatok hodiny pre dany kod  A/N';
COMMENT ON COLUMN m.kody.hod_celkom IS 'pozicia pre zapis hodin do vektora casovej bilancie celkom';
COMMENT ON COLUMN m.kody.hod1 IS 'pozicia pre zapis hodin do vektora casovej bilancie 1  0-20';
COMMENT ON COLUMN m.kody.hod2 IS 'pozicia napoctu casovej bilancie 2  0-20';
COMMENT ON COLUMN m.kody.hod3 IS 'pozicia napoctu casovej bilancie 3  0-20';
COMMENT ON COLUMN m.kody.hod4 IS 'pozicia napoctu casovej bilancie 4  0-20';
COMMENT ON COLUMN m.kody.hod5 IS 'pozicia napoctu casovej bilancie 5  0-20';
COMMENT ON COLUMN m.kody.hod6 IS 'pozicia napoctu casovej bilancie 6  0-20';
COMMENT ON COLUMN m.kody.hod7 IS 'pozicia napoctu casovej bilancie 7  0-20';
COMMENT ON COLUMN m.kody.hod8 IS 'pozicia napoctu casovej bilancie 8  0-20';
COMMENT ON COLUMN m.kody.algoritmus_koeficient IS 'algoritmus koeficient  A,B,C';
COMMENT ON COLUMN m.kody.pozicia_pomocny_vektor IS 'pozicia v pomocom vektore pre vypocet korun – poz. Pomocny vektr  1-50';
COMMENT ON COLUMN m.kody.mesacne_nahrady IS 'percento mesacnych nahrad';
COMMENT ON COLUMN m.kody.tarif IS 'percento tarifu';
COMMENT ON COLUMN m.kody.percpm IS 'percento_plus_mnimus -> Nikto nevie:: TODO';
COMMENT ON COLUMN m.kody.percpls IS 'percento_plus 100% + N%\N%  A/N -> Nikto nevie:: TODO';
COMMENT ON COLUMN m.kody.hodnota IS 'zadavanie hodnoty ( pri zadavani kodov pre pacovnika)  A/N';
COMMENT ON COLUMN m.kody.hodiny IS 'zadavanie hodin ( pri zadavani kodov pre pacovnika)  A/N';
COMMENT ON COLUMN m.kody.perceto IS 'zadavanie percent ( pri zadavani kodov pre pacovnika)  A/N';
COMMENT ON COLUMN m.kody.ucet_md IS 'MD (ma dat) ucet pre export do uctovnictva';
COMMENT ON COLUMN m.kody.ucet_dal IS 'DAL (dal) ucet pre export do uctovnictva  ';
COMMENT ON COLUMN m.kody.zobraz IS 'zobrazenie kodu, je/nieje Aktivny kod A/N  A/N';
COMMENT ON COLUMN m.kody.vysledok_hod IS 'pozicia pre zapis hodin do vektora (v tabulke mvy)  vid. Ciselnik pozicii 1-250 tabulka mvek';
COMMENT ON COLUMN m.kody.vysledok_suma IS 'pozicia pre zapis sumy penazi do vektora (v tabulke mvy)  vid. Ciselnik pozicii 1-250';
COMMENT ON COLUMN m.kody.vysledok_dni IS 'pozicia pre zapis dni do vektora (v tabulke mvy)  vid. Ciselnik pozicii 1-250';
COMMENT ON COLUMN m.kody.vysledok_pocet IS 'pozicia pre zapis poctu pripadov do vektora (v tabulke mvy)  vid. Ciselnik pozicii 1-250';
COMMENT ON COLUMN m.kody.vypocet_nemoc IS 'Ma sa volat vypocet nemoci ?  A/N';
COMMENT ON COLUMN m.kody.nemoc1 IS 'percento pre nemoc 1 interval = nizsia sadzba  ';
COMMENT ON COLUMN m.kody.nemoc1_dni IS 'pocet dni pre nemoc 1  ';
COMMENT ON COLUMN m.kody.nemoc2 IS 'percento pre nemoc 2 interval = vyssia sadzba';
COMMENT ON COLUMN m.kody.nemoc2_dni IS 'pocet dni pre nemoc 2  ';
COMMENT ON COLUMN m.kody.skupina_zrazok IS 'skupina zrazok – 0 – 9  - priorita zrazok  ';
COMMENT ON COLUMN m.kody.druh_vynatia IS 'druh vynatia pre statisticke ucely  ';
COMMENT ON COLUMN m.kody.ukoncenie IS 'nulovat pri ukonceni (A/N) Ak nastalo ukoncenie pracovneho pomeru, tak kody poloziek, ktore maju toto pole nastavene na Ano sa nuluju pri vypocte.  A/N';
