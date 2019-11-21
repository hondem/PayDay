import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.withSchema('m')
    .createTable('osoba', (table => {
      table.integer('id').references('m.osoba.id')
      table.date("platnost_od").notNullable(),
      table.string("druh", 1).notNullable(),
      table.string("trieda", 2).notNullable(),
      table.string("pracovna_doba_typ", 3).notNullable(),
      table.integer("kalendar_typ").notNullable().references(m.kalendar_typ.id),
      table.integer("uvazok").notNullable(),
      table.string("vypocet_sviatkov", 1).notNullable(),
      table.string("pracovny_pomer_nad_5dni", 1).notNullable(),
      table.string("pracovna_schopnost_znizena1", 1).notNullable(),
      table.string("pracovna_schopnost_znizena2", 1).notNullable(),
      table.string("pracovna_schopnost_znizena3", 1).notNullable(),
      table.string("pracovna_kategoria", 1).notNullable(),
      table.string("staticticky_udaj", 1).notNullable(),
      table.string("specialna_kategoria", 1).notNullable(),
      table.string("dochodca", 1).notNullable(),
      table.string("dochodok_typ", 1).notNullable(),
      table.string("pocet_deti", 1).notNullable(),
      table.integer("pocet_deti_do_6").notNullable(),
      table.integer("danovy_odpocet_manzelka").notNullable(),
      table.string("danovy_bonus", 1).notNullable(),
      table.string("nezdanitelne_min", 1).notNullable(),
      table.string("zdravotna_poistovna", 1).notNullable(),
      table.string("zc_zp", 1).notNullable(),
      table.string("zc_sp_dp", 1).notNullable(),
      table.string("zc_sp_np", 1).notNullable(),
      table.string("zc_sp_pvn", 1).notNullable(),
      table.string("zl_zp", 1).notNullable(),
      table.string("zl_sp_dp", 1).notNullable(),
      table.string("zl_sp_np", 1).notNullable(),
      table.string("zl_sp_pvn", 1).notNullable(),
      table.string("odbory", 1).notNullable(),
      table.primary(['id', 'platnost_od'])
    }))
}


export async function down(knex: Knex): Promise<any> {
}

