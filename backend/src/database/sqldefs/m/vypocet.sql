CREATE TABLE m.vypocet (
  "id" integer NOT NULL PRIMARY KEY,
  "obdobie" date NOT NULL,
  "vektor" varchar(2000) NOT NULL,
  "dovolenkovy_priemer" float NOT NULL,
  "nemocensky_priemer" float NOT NULL
);
COMMENT ON TABLE m.vypocet IS 'vypocitane udaje za kazdy mesiac za kazde osobne cislo (osobu s platnym prac. pomerom)';
COMMENT ON COLUMN m.vypocet.id IS ' - id osoby ';
COMMENT ON COLUMN m.vypocet.obdobie IS ' datum udavajuci obdobie za ktore su vypocitane mzdy napr. 01/01/2019 za januar 2019';
COMMENT ON COLUMN m.vypocet.vektor IS ' Znakove pole v ktorom sa nachadzaju zakodovane udaje vypocitanych miezd. Kazdy ciselny udaj je ukladany ako 8 znakovy retazec na pozicie s nasobkom 8. Tzn. prvy udaj je od vektor[0:8], druhy udaj vektor[9:16]... posledny vektor[n*8:(n+1)*8] kde n=249';
COMMENT ON COLUMN m.vypocet.dovolenkovy_priemer IS 'priemer pre PPU (pracovno pravne ucely) platny pre dane obdobie';
COMMENT ON COLUMN m.vypocet.nemocensky_priemer IS 'nemocensky priemer platny pre dane obdobie';
