CREATE TABLE m.deti(
  "id" int not null PRIMARY KEY,
  "os_id" int not null REFERENCES m.osoba(id),
  "meno" char(50) not null,
  "datum_nar" date not null,
  "rodne_cislo" char(10) not null,
  "danovy_bonus" char(1) not null
);
COMMENT ON table m.deti IS 'tabulka s udajmi deti pre osoby';
COMMENT ON COLUMN m.deti.id IS 'poradove cislo zaznamu';
COMMENT ON COLUMN m.deti.os_id IS 'id osoby z tabulky osoba';
COMMENT ON COLUMN m.deti.rodne_cislo IS 'rodne cislo v tvar XXXXXXXXXX bez pomlcky';
COMMENT ON COLUMN m.deti.id IS 'Pobera danovy bonus na dieta A/N';

