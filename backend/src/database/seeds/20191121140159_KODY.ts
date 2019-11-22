import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  return knex.raw(`
     insert into m.kody values 
    (500,'500','0','Ukončenie/začiatok prac. pom. ','f','f','f','f','f','f','f','f','f','f','f','f','D','t','A',0.0,0.0,'f','t','f','t','f','          ','          ','t',20,0,248,0,'f',0.0,0,0.0,0,' ','   ','f'),
    (1100,'111','5','Mesačný plat THP              ','t','t','t','t','t','t','t','t','t','t','t','t','A','f','C',0.0,0.0,'f','t','t','f','f','521.1','331.1','t',51,101,11,0,'f',0.0,0,0.0,0,' ','   ','t'),
    (1101,'1110','4','Mesačný plat – čiastka        ','t','t','t','t','t','t','t','t','t','t','t','t','C','f','A',0.0,0.0,'f','t','t','t','f','521.1','331.1','t',51,101,11,0,'f',0.0,0,0.0,0,' ','   ','t'),
    (1111,'1111','1','Mesačný plat čiastka','t','t','t','t','t','t','t','t','t','t','t','t','C','f','4',0.0,0.0,'f','t','t','t','f','','','t',0,101,0,0,'f',0.0,0,0.0,0,'0','0','f'),
    (1200,'120','6','Tarifa os. triedy pre úkol    ','t','t','t','t','t','t','t','t','t','t','t','t','B','f','B',0.0,0.0,'f','t','t','f','f','          ','          ','t',0,0,0,0,'f',0.0,0,0.0,0,' ','   ','t'),
    (1210,'121','6','Tarifa os. triedy pre hod.odm.','t','t','t','t','t','t','t','t','t','t','t','t','B','f','B',0.0,0.0,'f','t','t','f','f','521.1','331.1','t',51,101,11,0,'f',0.0,0,0.0,0,' ','   ','t'),
    (1301,'1412','2','Úkol jednicový- koruny       ','t','t','t','t','t','t','t','t','t','t','t','t','A','f','A',0.0,0.0,'f','t','t','t','f','521','331.1','t',0,52,0,0,'f',0.0,0,0.0,0,' ','   ','t'),
    (1302,'1411','4','Úkol jednicový - hodiny       ','f','f','f','f','t','t','t','t','t','t','t','t',' ','f',' ',0.0,0.0,'f','t','f','t','f','          ','          ','t',2,0,0,0,'f',0.0,0,0.0,0,' ','   ','t'),
    (5000,'521','0','Riadna dovolenka              ','t','t','t','t','t','t','t','t','t','t','t','t','D','f','A',100.0,0.0,'f','t','f','t','f','521.1','331.1','t',17,124,247,0,'f',0.0,0,0.0,0,' ','   ','t'),
    (5001,'524','4','Preplatenie riad.dovol.-čiastka','t','t','t','t','t','t','t','t','t','t','t','t','A','f','A',0.0,0.0,'f','t','t','f','f','521.1','331.1','t',0,124,0,0,'f',0.0,0,0.0,0,' ','   ','t');    
  `);
};
