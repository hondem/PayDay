CREATE TABLE m.zlozky (
  "id" integer not null PRIMARY KEY,
  "os_id" integer not null REFERENCES m.osoba(id),
  "kod" integer not null,
  "kod_ext" char(10) not null,
  "datum_od" date not null,
  "datum_do" date not null,
  "dni" float not null,
  "hod" float not null,
  "sadzba" float not null,
  "suma" float not null,
  "pozn" char(30) not null
);
COMMENT ON TABLE m.zlozky IS 'Mzdove odchylky, v tabulke su zaznamenane datumove, hodinove a hodnotove udaje potrebne pre vypocet mzdy pomocou kodov.';
COMMENT ON COLUMN m.zlozky.id IS 'poradove cislo zaznamu';
COMMENT ON COLUMN m.zlozky.os_id IS 'id osoby z tabulky osoba (mandatory)';
COMMENT ON COLUMN m.zlozky.kod IS 'id kod mzdovej zlozky z tabulky kody (mandatory)';
COMMENT ON COLUMN m.zlozky.kod_ext IS 'externy kod mzdovej zlozky z tabulky kody (mandatory)';
COMMENT ON COLUMN m.zlozky.datum_od IS ' datum platnosti od';
COMMENT ON COLUMN m.zlozky.datum_do IS ' datum platnosti do';
