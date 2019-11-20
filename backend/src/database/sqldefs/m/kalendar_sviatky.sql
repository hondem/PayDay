CREATE TABLE m.kalendar_sviatky (
  "datum" date PRIMARY KEY not null
);
COMMENT ON table m.kalendar_sviatky IS ' Obsahuje dni sviatkov';
COMMENT ON COLUMN m.kalendar_datum IS ' datum sviatku (napr. 01/05/2019)';

