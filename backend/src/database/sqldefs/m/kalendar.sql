CREATE TABLE m.kalendar (
typ integer NOT NULL REFERENCES m.kalendar_typ(id),
datum date NOT NULL,
pracovne_dni float NOT NULL,
pracovne_hod float NOT NULL,
sviatky_dni  float NOT NULL,
sviatky_hod float NOT NULL,
PRIMARY KEY (typ, datum)
);
COMMENT ON table m.kalendar_typ IS 'Riadky kalendara osahujuce jednotlive dni v roku s vyznacenim poctu pracovnych hodin a dni a poctu dni a hodin sviatkov';
COMMENT ON COLUMN m.kalendar.pracovne_dni IS ' je pracovny den (1 alebo 0)';
COMMENT ON COLUMN m.kalendar.pracovne_hod IS ' pocet pracovnych hodin pre dany den (0-24) (vacsinou 0-12)';
COMMENT ON COLUMN m.kalendar.sviatky_dni IS ' je sviatok (1 alebo 0)';
COMMENT ON COLUMN m.kalendar.sviatky_hod IS ' pocet hodin sviatku pre dany den (0-24) (vacsinou 0-8, pre 8 hodinovy pracovny cas 0 alebo 8)';