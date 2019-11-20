CREATE TABLE m.vektor (
  "id" integer not null PRIMARY KEY,
  "popis" char(50) not null
)
COMMENT ON TABLE m.vektor IS 'V tabulke je ulozeny popis jednotlivych pozicii udajov ulozenych v tabulke vypoctu v poli vektor';
COMMENT ON COLUMN m.vektor.id IS ' poravove cislo pozicie vo vektore 0-249';
