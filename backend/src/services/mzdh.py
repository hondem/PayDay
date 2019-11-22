#!/usr/bin/python
# -*- encoding: utf-8 -*-
from datetime import datetime
import calendar
import sqlite3 
#import psycopg2
import math

#######################################################################################
# funkcia runsql( psql:string ) - make conection to database an run sql statement
#                               - resul: tuple with returned data
# for t in [('2006-03-28', 'BUY', 'IBM', 1000, 45.00),
#          ('2006-04-05', 'BUY', 'MSOFT', 1000, 72.00),
#          ('2006-04-06', 'SELL', 'IBM', 500, 53.00),
#         ]:
#    c.execute('insert into stocks values (?,?,?,?,?)', t)
#
# https://docs.python.org/3.1/library/sqlite3.html
#
# sqlite3.connect(database[, timeout, detect_types, isolation_level, check_same_thread, factory, cached_statements])
#
#    Opens a connection to the SQLite database file database. You can use ":memory:" to open a database connection to a database that resides in RAM instead of on disk.
#
#    When a database is accessed by multiple connections, and one of the processes modifies the database, the SQLite database is locked until that transaction is committed. The timeout parameter specifies how long the connection should wait for the lock to go away until raising an exception. The default for the timeout parameter is 5.0 (five seconds).
#
#    For the isolation_level parameter, please see the Connection.isolation_level property of Connection objects.
#
#    SQLite natively supports only the types TEXT, INTEGER, FLOAT, BLOB and NULL. If you want to use other types you must add support for them yourself. The detect_types parameter and the using custom converters registered with the module-level register_converter() function allow you to easily do that.
#
#    detect_types defaults to 0 (i. e. off, no type detection), you can set it to any combination of PARSE_DECLTYPES and PARSE_COLNAMES to turn type detection on.
#
#    By default, the sqlite3 module uses its Connection class for the connect call. You can, however, subclass the Connection class and make connect() use your class instead by providing your class for the factory parameter.
#
#    Consult the section SQLite and Python types of this manual for details.
#
#    The sqlite3 module internally uses a statement cache to avoid SQL parsing overhead. If you want to explicitly set the number of statements that are cached for the connection, you can set the cached_statements parameter. The currently implemented default is to cache 100 statements.
#
#######################################################################################
def runsql(psql):

    conn = sqlite3.connect('./db/alfa.sqlite')    ### !!! doplnit timeout + chybove hlasenie a osetrenie chyby 
    cur = conn.cursor()

    #print(psql)

    cur.execute(psql)
    vysl = cur.fetchall()

    #for row in cur:
    #   print(row)
    
    conn.commit()
    conn.close()

    return(vysl)

#######################################################################################
# funkcia runpsql( psql:string ) - make conection to database an run sql statement
#                                - resul: tuple with returned data
#######################################################################################
#def runpsql(psql):
#
#
#    try:
#        connection = psycopg2.connect(user = "sysadmin",
#                                  password = "pynative@#29",
#                                  host = "127.0.0.1",
#                                  port = "5432",
#                                  database = "postgres_db")
#
#        cursor = connection.cursor()
#        # Print PostgreSQL Connection properties
#        #print ( connection.get_dsn_parameters(),"\n")
#
#        # Print PostgreSQL version
#        cursor.execute(psql)
#        vysl = cursor.fetchall()
#        #print("You are connected to - ", record,"\n")
#
#    except(Exception, psycopg2.Error) as error :
#        print ("Error while connecting to PostgreSQL", error)
#        # doplnit co urobi ak je chyba pri volani
#    else:
#        print('inak')
#   
#    finally:
#        #closing database connection.
#        if(connection):
#            cursor.close()
#            connection.close()
#            #print("PostgreSQL connection is closed")
#    return(vysl)
######################################################################################
# funkcia mstr ( pint : integer ) - vrati retazec 8 znakov
######################################################################################

def mstr( pint ):
    ret = '        '
    return(ret)

######################################################################################
# funkcia mval (  : string ) - vrati integer | vstup je 8 znakovy retazec
######################################################################################

def mval( pstr ):
    ret = 0
    return(ret)

######################################################################################
# funkcia tr ( pstr : string ) - !!! nefunguje !!!
######################################################################################

def tr( pstr ):

    dic = {'á':'a','ä':'a','č':'c','ď':'d','é':'e','í':'i','ĺ':'l','ľ':'l','ň':'n','ó':'o','ô':'o','ŕ':'r','š':'s','ť':'t','ú':'u','ý':'y','ž':'z','Á':'A','Ä':'A','Č':'C','Ď':'D','É':'E','Í':'I','Ĺ':'L','Ĺ':'L','Ň':'N','Ó':'O','Ô':'O','Ŕ':'R','Š':'S','Ť':'T','Ú':'U','Ý':'Y','Ž':'Z'}
    ret = pstr
    
    for i in range(len(pstr)):
        try: 
            ret[i] = dic[pstr[i]]
        except:
            ret[i] = pstr[i]    
    return(ret)

######################################################################################
# funkcia rtrim ( pstr : string ) - vrati string zprava pocet znakov
######################################################################################

def rtrim( pstr, pocet ):
    
    dlzka = len(pstr)
    
    if ( dlzka > pocet ):
        ret = pstr[ dlzka-pocet : dlzka ]
        # for i in range( dlzka-pocet , dlzka ):
        
    else:
        ret = pstr        
        
    return(ret)

######################################################################################
# funkcia roundown ( pf : float , pdes : integer ) - vrati float 
#
# 1. par  - pf   - cislo ktore treba zaoktuhlit
# 2. par  - pdes - pocet desatinnych miest na ktore sa ma zaokruhlit nadol 
#
# napr. roundown( 17.589 ) = 17.58 
######################################################################################

def roundown( pf , pdes ):
    ret = 0.0
       
    nasob = math.pow( 10, pdes )
    ret = math.floor( pf * nasob ) / nasob
    
    return ret


######################################################################################
# funkcia poc_dni_vmes1 ( pdat : date ) - vrati pocet dni v mesiaci 
#                                         (pdat je tvare 'YYYY-MM-DD')
######################################################################################

def poc_dni_vmes1( pdat ):

    prok = int(pdat[:4])
    pmes = int(pdat[5:7])

    if pmes in ( 1,3,5,7,8,10,12 ):
        return 31

    if pmes in (4,6,9,11):
        return 30

    if pmes == 2:
        if prok % 4 == 0 :
            return 29
        else:
            return 28
            
######################################################################################
# funkcia poc_dni_vmes ( prok : integer , pmes : integer ) - vrati pocet dni v mesiaci
######################################################################################

def poc_dni_vmes( prok , pmes ):

    if pmes in ( 1,3,5,7,8,10,12 ):
        return 31

    if pmes in (4,6,9,11):
        return 30

    if pmes == 2:
        if prok % 4 == 0 :
            return 29
        else:
            return 28

######################################################################################
# funkcia eom( pdat : date ) - vrati datum konca mesiaca
# 
######################################################################################
def eom( pdat ):
    rok = pdat[:4]
    mes = pdat[5:7]
    
    ret = str(rok)+'-'+str(mes)+'-'+str(poc_dni_vmes1(pdat))
    return ret

######################################################################################
# funkcia bom( pdat : date ) - vrati datum zaciatku mesiaca
# 
######################################################################################
def bom( pdat ):
    rok = pdat[:4]
    mes = pdat[5:7]
    
    ret = str(rok)+'-'+str(mes)+'-'+'01'
    return ret

######################################################################################
# funkcia day( pdat : date ) - vrati cislo dna v mesiaci
# 
######################################################################################
def day( pdat ):
    rok = pdat[:4]
    mes = pdat[5:7]
    den = pdat[8:10]
    
    return den


######################################################################################
# funkcia addyear( pdat : date, prok : integer ) - pripocita rok k datumu
# 
######################################################################################
def addyear( pdat, prok ):

    rok = int(pdat[:4])
    mes = int(pdat[5:7])
    den = int(pdat[8:10])

    if ((den == 29) and (mes == 2) and ((rok % 4) == 0) and ((rok+prok) % 4 != 0)):
       den = 28

    if (mes < 10):
        m='0'
    else:
        m=''

    if (den < 10):
        d='0'
    else:
        d=''

    ret = str(rok+prok)+'-'+m+str(mes)+'-'+d+str(den)

    print('Y addyear:',ret)

    return ret

######################################################################################
# funkcia addmonth( pdat : date, pmes : integer ) - pripocita mesiac(e) k datumu
# !!! otestovat pre obdobie 2019-10-01  adddate(pobd,0,-10,0) 
######################################################################################

def addmonth( pdat, pmes ):
    
    if ( pmes > 0 ):
        log = 1
    elif ( pmes < 0 ): 
        log = -1
    else:
        log = 0
        
    i = pmes;
    
    rok = int(pdat[:4])
    mes = int(pdat[5:7])
    den = int(pdat[8:10])

    while (i != 0):
        if ( mes != 0 ):
            mes = mes + 1 * log
            i = i - 1 * log 
        if (( mes == 13 ) and ( log == 1 )):
            rok = rok + 1 
            mes = 1   
        if (( mes == 0 ) and (log == -1 )):
            rok = rok - 1 
            mes = 12  
        #print('i mes rok',i,mes,rok)
    
    if (mes < 10):
        m='0'
    else:
        m=''

    if (den < 10):
        d='0'
    else:
        d=''

    ret = str(rok)+'-'+m+str(mes)+'-'+d+str(den)

    return ret


######################################################################################
# funkcia addday( pdat : date, pdni : integer ) - pripocita mesiac(e) k datumu
# !!! nefunguje napr. -32 dni ak obdobie je 1/10/2019
######################################################################################

def addday( pdat, pdni ):
    
    if ( pdni > 0 ):
        log = 1
    elif ( pdni < 0 ): 
        log = -1
    else:
        log = 0
        
    i = pdni;
    
    rok = int(pdat[:4])
    mes = int(pdat[5:7])
    den = int(pdat[8:10])

    while (i != 0):
        if ( den != 0 ):
            den = den + 1 * log
            i = i - 1 * log
             
        if ( mes in (1,3,5,7,8,10,12)):
            x = 32 
            y =30
        elif ( mes in (4,6,9,11)):
            x = 31
            y = 29
        elif ( mes == 2 and rok % 4 != 0):
            x = 29
            y = 27
        else:
            x = 30
            y = 28
            
        if (( den == x ) and ( log == 1 )):  # x = 32 pre januar
            mes = mes + 1 
            den = 1  
            if( mes == 13 ): 
                mes = 1
                rok = rok + 1 
        if (( den == 0 ) and (log == -1 )):
            mes = mes - 1 
            den = y # 31 
            if ( mes == 0 ):
                mes = 12
                rok = rok - 1 
        #print('i mes rok',i,mes,rok)
    
    if (mes < 10):
        m='0'
    else:
        m=''

    if (den < 10):
        d='0'
    else:
        d=''

    ret = str(rok)+'-'+m+str(mes)+'-'+d+str(den)

    return ret

######################################################################################
# funkcia adddate( pdat : date , prok : integer , pmes : integer , pden : integer) 
# !!! otestovat vsetky moznosti pripadne preobit !!! 
# obmedzenia : funguje len pre dni -31 do 31
######################################################################################

def adddate( pdat, prok, pmes, pden ):

    rok1 = int(pdat[:4])
    mes1 = int(pdat[5:7])
    den1 = int(pdat[8:10])
    vrok = 0; vmes = 0; vden = 0

    print('A prok,pmes, pden:',prok,pmes,pden)
    print('A rok, mes, den:',rok1,mes1,den1)
    
    pomdat1 = addyear( pdat, prok )
    print ('A pomdat1:',pomdat1)
    pomdat2 = addmonth( pomdat1 , pmes )
    print ('A pomdat2:',pomdat2)
    pomdat3 = addday( pomdat2 , pden )        
    print ('A pomdat3:',pomdat3)
    
    rok = int(pomdat3[:4])
    mes = int(pomdat3[5:7])
    den = int(pomdat3[8:10])

    if (mes < 10):
        m='0'
    else:
        m='' 

    if (den < 10):
        d='0'
    else:
        d='' 
 
    ret = str(rok)+'-'+m+str(mes)+'-'+d+str(den)
    print(ret)
    
    j=input('Pre pokracovanie stlac Enter...')
    return ret

######################################################################################
#   Funkcia je_sviatok( patum:datum ) - vrati 0 alebo 1 podla toho ci najde v mkas 
######################################################################################

def je_sviatok( pdatum ):

    sql = 'select count(*) from mkas where mkas_date='+'\''+str(pdatum)+'\''
    a=runsql(sql)
    #print(sql)
    return(a[0][0])

##############################################################################
### Funkcia get_fpd( pdat:datum, pkal:integer) 
###     input:  1. obdobie, ktore predstavuje datum napr. 2019-01-01
###             2. kalendar - poradove cislo kalendara z tabulky mkah,mkar
###     output  tuple() s udajmi:
###             1. cislo kalendara
###             2. nazov kalendara 
###             3. typ kalendara (mkar_typ)
###             4. priemerny poc.hod. za mesiac mkar_mhod
###             5. priemerny pocet hod. za tyzden mkar_thod
###             6. pocet hodin za den
###             7. pomerny poc hod. za den
###             8. priemerny pocet prac dni za tyzden
###             9. uvazok v percentach
###             10. poznamka
###             11. pocet prac.dni za mesiac
###             12. pocet prac.hod. za mesiac
###             13. pocet dni sviatok za mesiac
###             14. pocet sviatky hod. za mesiac
##############################################################################

def get_fpd( pdat, pkal ):
    sql = 'select mkah.*, sum(mkar_pdni) as pdni, sum(mkar_phod) as phod, sum(mkar_sdni) as sdni, sum(mkar_shod) as shod from mkah, mkar where mkah_kal=mkar_kal and mkar_kal='+str(pkal)+' and mkar_datum like '+'\''+pdat[:8]+'%\''
    #print(sql)
    a=runsql(sql)
    return a    

#############################################################################
#     Funkcia get_sviat ( pdat: date , pkal : integer ) !!! asi zrusit
#                                                     !!! rovnaka ako get_fpd
#     output: vrati pocet dni a hodin za dany kalendar a mesiac
#############################################################################

def get_sviat( pdat, pkal ):
    sql = 'select sum(mkar_sdni), sum(mkar_shod) from mkar where mkar_kal='+str(pkal)+' and mkar_datum like '+'\''+pdat[:7]+'%\''
    a=runsql(sql)
    return(a[0])

#############################################################################
#     Funkcia get_dni_hod ( pdat1: date , pdat2: date ,  pkal : integer ) 
#                                       
#     output: vrati pocet dni a hodin za dany rozsah datumov a kalendar 
#############################################################################

def get_dni_hod( pdat1, pdat2, pkal ):
    sql = 'select sum(mkar_pdni) as pdni, sum(mkar_phod) as phod, sum(mkar_sdni), sum(mkar_shod), count(*) from mkar where mkar_kal='+str(pkal)+' and mkar_datum >= '+'\''+pdat1+'\''+' and mkar_datum <= '+'\''+pdat2+'\''
    #print(sql)
    a=runsql(sql)
    
    return(a[0]) 

##############################################################################
#   funkcia generuj_kal( prok : integer , pkal : integer )
#
#   popis: generuje riadky kalendara za cely rok podla zadanych parametrov,
#           pricom kontroluje ci je v ten den sviatok alebo nie
##############################################################################
def generuj_kal(prok,pkal):
    lsviatok=0

    sqll=list()

    for x in range(1,13):
        pdni=poc_dni_vmes(prok,x)
        for y in range(1,pdni+1):

            datum=datetime.strptime(str(prok)+'-'+str(x)+'-'+str(y),'%Y-%m-%d' )
            dat=datum.date()
            pcden=datum.weekday()+1
            lsviatok=je_sviatok(dat)  ## pocet dni sviatkov v mes

            if pcden in (1,2,3,4,5) and lsviatok==0:
          
                dp=float(1.0); hp=float(8.0); ds=float(0.0); hs=float(0.0)

            elif pcden in (1,2,3,4,5) and lsviatok!=0:

                ds=float(1.0);hs=float(8.0);dp=float(0.0);hp=float(0.0)

            else:

                dp=float(0.0);hp=float(0.0);ds=float(0.0);hs=float(0.0)
                    
            sqll.append('insert into mkar (mkar_kal,mkar_datum,mkar_pdni,mkar_phod,mkar_sdni,mkar_shod) values('+str(kkal)+','+'\''+str(dat)+'\''+','+str(dp)+','+str(hp)+','+str(ds)+','+str(hs)+')')

        #for i in sqll:
        #    print(i)

    #########    pripojenie na db a spustenie selectov
    sql='delete from mkar where mkar_kal='+str(kkal)+' and mkar_datum LIKE'+'\''+str(krok)+'%\''
    #print(sql) 
    print('Mazem starre zaznamy v kalendari:',kkal,' za rok:',krok )
    vysl=runsql(sql)
    
    print('Vytvaram nove zaznamy v kalendari:',kkal,' za rok:',krok )
    for i in sqll:
        vysl=runsql(i)
        
    j=input('Pre pokracovanie stlac Enter...')

##############################################################################
#   Funkcia zobraz_sviatky( prok : integer ) - vypise sviatky v zadanom roku
##############################################################################
def zobraz_sviatky(prok):

    print('Kalendar sviatkov:')
    sql='select mkas_date from mkas where mkas_date like '+'\''+str(prok)+'%\''+' order by 1'
    #print(sql)
    vysl = runsql(sql)
    for row in vysl:
        print(row)

    cakaj=input('Pre pokracovanie stlac 0+Enter...')

#############################################################################
#   Funkcia zobraz_param( pdat : date ) - vypise parametre platne pre akt.obdobie
#############################################################################
def zobraz_param( pdat ):
    print('+-----------------------------------------------------------+')
    print('| Parametre mzdodoveho modulu platne pre obdobie:'+pdat+'|')
    print('+-----------------------------------------------------------+')
    par=get_par(pdat)
    print(par)
    
    cakaj=input('Pre pokracovanie stlac 0+Enter')
##################################################################################################
#   Funkcia get_par ( pdat : datum ) - vrati list() aktualne nastavenie param. miezd podla datumu
#   
#   Vracia list x[0][0] - por.cislo zaznamu v tabulke mpar
#               x[0][1] - datum od ktoreho platia dane parametre
#               x[0][2] - ICO 
#               x[0][3] - Nazov firmy
#               x[0][4] - DIC
#               x[0][5] - ICDPH
#               x[0][6] - Adresa1-ulica
#               x[0][7] - Adresa2-
#               x[0][8] - Adresa3-
#               x[0][9] - Adresa4-
#               x[0][10] -Adresa5- 
#               x[0][11] -PSC 
#               x[0][12] -kod banky 
#               x[0][13] -bank.ucet 
#               x[0][14] -ZP zam % 
#               x[0][15] -NP zam %
#               x[0][16] -DPs zam %
#               x[0][17] -DPi zam % 
#               x[0][18] -PvN zam % 
#               x[0][19] -ZP pod % 
#               x[0][20] -NP pod % 
#               x[0][21] -DPs pod % 
#               x[0][22] -DPi pod %
#               x[0][23] -PvN pod % 
#               x[0][24] -GP pod % 
#               x[0][25] -UP pod % 
#               x[0][26] -RF pod % 
#               x[0][27] -SF pod % 
#               x[0][28] -min.mzda hodinova kat 1 
#               x[0][29] -mm hod kat 2 
#               x[0][30] -mm hod kat 3 
#               x[0][31] -mm hod kat 4 
#               x[0][32] -mm hod kat 5 
#               x[0][33] -mm hod kat 6 
#               x[0][34] -Min. mzda mesacna kat 1 
#               x[0][35] -mm mes kat2 
#               x[0][36] -mm mes kat3 
#               x[0][37] -mm mes kat4 
#               x[0][38] -mm mes kat5 
#               x[0][39] -mm mes kat6 
#               x[0][40] -max.VZ pre SP 
#               x[0][41] -ziv. minimum 
#               x[0][42] -ziv. minimum1 n adalsiu posudz.odobu 
#               x[0][43] -ziv. minimum2 na dieta
#               x[0][44] -dan1 % 
#               x[0][45] -dan2 % 
#               x[0][46] -dan z dividend % 
#               x[0][47] -dan rezident % 
#               x[0][48] -dan nerezident % 
#               x[0][49] -dan us.cinitelia % 
#               x[0][50] -nezd.cast.zakladu dane rocna 
#               x[0][51] -nezd.cast zakladu dane mesacna 
#               x[0][52] -rszpdb 
#               x[0][53] -rocna sadzba dan.bonus dieta od 6.r
#               x[0][54] -(hzpdp) rozna sadzba dan. bonus dieta do 6.r 
#               x[0][55] -mmmpd 
#               x[0][56] -ovstud - oslobodeny prijem student
#               x[0][57] -ovdoch - odlobodeny prijem dochodca
#               x[0][58] -mopzp
#                   [59] -maxdvzr - maximalny denny vzr
#                   [60] -nahrkm 
#                   [61] -min. stravne
#                   [62] -strav0
#                   [63] -strav1
#                   [64] -strav2
#                   [65] -strav3
#                   [66] - 13 plat odlobodeny obdobie 1
#                   [67] - 13 plat odlobodeny obdobie 2
#                   [68] - 13 plat odlobodeny obdobie 3
#                   [69] - nasobok ziv.min. pre rozdelenie zakladu dane na 19% a 25%  (176.8)
##################################################################################################
def get_par(pdat): 

    sql='select * from mpar where mpar_datum<='+'\''+str(pdat)+'\''+' order by mpar_datum desc LIMIT 1'
    x=runsql(sql)

    return x

#################################################################################################
# Funkcia zadaj_rok_kal() - funkcia pre zadanie roku a kalendara pre generovanie kalendara
#################################################################################################

def zadaj_rok_kal():
    while True:
        try:
            krok=int(input('Zadaj rok (napr.2019):'))
        except ValueError:
            print("Zadaj cislo...")
            continue

        if krok >2099 or krok< 2000:
            print("Zadany rok je mimo hranice 2000-2099.")
            continue
        else:
            break

    while True:
        try:
            kkal=int(input('Zadaj cislo kalendara (1-99):'))
        except ValueError:
            print("Zadaj cislo.")
            continue

        if kkal >99 or kkal< 1:
            print("Zadane cislo kalendara je mimo rozsahu 1-99")
            continue
        else:
            break
    print('Chces generovat kalendar:'+str(kkal)+' pre rok:'+str(krok)+'?')
    vstup = input('Zadaj A/N:')
    if upper(vstup)=='A':
        generuj_kal(krok, kkal)
 
###########################################################################################
# Funkcia zobraz_kalendar( pkal : integer ) - zobrazi na obrazovku hlavicku kalendara
############################################################################################
def zobraz_kalendar(pkal):
    #########    pripojenie na db a spustenie selectov - zobrazenie vybraneho kalendara
    sql='select * from mkah where mkah_kal='+str(pkal)
    #print(sql)
    x=runsql(sql)

    for row in x:
       print(row)

    cakaj=input('Pre pokracovanie stlac Enter...')

##########################################################################################
# Funkcia vyber_osc( posc: integer ) - zobrazi na obrazovku zoznam existujucich osc 
#                                      z tabulky mos a caka na zadanie vybraneho osc
#                                       ktore bude potom vratene
# output: integer
##########################################################################################

def vyber_osc( posc ):
    lst_osc = list()
    sql = 'select mos_id, mos_meno, mos_meno2, mos_dnast, mos_dukon, mos_active from mos order by 1'
    vysl=runsql(sql)
    
    print('+---------+-------------+-------------------+--------------+--------------+---------+')
    print('|Os.cislo | Meno        | Priezvisko        |Datum nastupu | Datum Ukonc. | Aktivny |')
    print('+---------+-------------+-------------------+--------------+--------------+---------+')
    for row in vysl:
        print('|'+str(row[0])+'       '+' |'+row[1][:10]+'      '+'| '+(row[2]+'             ')[:17]+' | '+(row[3]+'     ')[:12]+' | '+(row[4]+'     ')[:12]+' | '+row[5]+'       |')
        lst_osc.append(int(row[0]))
    print('+---------+-------------+-------------------+--------------+--------------+---------+')

    par = int(input('Vyber-zadaj osc:'))

    if par in lst_osc:
        return par
    else: 
        return posc


#########################################################################################################
#
#   Funkcia get_mzl1 ( pid : integer, pdat : date ) - vrati list, ktory obsahuje zaznamy z mzl pre zadane
#                                                    jedno osc a pdat (aktualne obdobie) aj s mkod
#
#########################################################################################################

def get_mzl1( pid, pdat ):
    sql = 'select * from mzl,mkod where mzl_kod=mkod_kod and mzl_id=' + str( pid )+' and mzl_d1<='+'\''+eom(pdat)+'\''+' and mzl_d2>='+'\''+pdat+'\''+' order by mzl_kod'
    #(mzl_d1>='2019-01-31' and mzl_d2>='2019-01-01')
    #print(sql)
    vysl = runsql( sql )
    return vysl

#########################################################################################################
#
#   Funkcia get_mud ( pid : integer, pdat : date ) -vrati list, ktory obsahuje zaznam z mud pre zadany
#                                                    posc a pdat (aktualne obdobie)
#
#########################################################################################################

def get_mud( pid, pdat ):
    sql = 'select * from mud where mud_id=' + str( pid )+' and mud_plati<='+'\''+pdat+'\''+' LIMIT 1'
    #print(sql)
    vysl = runsql( sql )
    return vysl

#########################################################################################################
#
#   Funkcia get_osc ( pid  : integer ) - vrati list, ktory obsahuje 6 udajov z mos pre zadane posc 
#
#
#########################################################################################################

def get_osc( pid ):
    sql = 'select mos_osc, mos_meno, mos_meno2, mos_dnast, mos_dukon, mos_active from mos where mos_id='+str(pid)
    vysl=runsql(sql)
    return vysl

#########################################################################################################
#
#   Funkcia get_mos ( pid  : integer ) - vrati list, ktory obsahuje zaznam z mos pre zadane posc 
#
#
#########################################################################################################

def get_mos( pid  ):
    sql = 'select * from mos where mos_id='+str(pid)
    vysl=runsql(sql)
    return vysl

#########################################################################################################
#
#   Funkcia get_oscall ( pdat : date ) - vrati list zaznamov z tabulky mosc zotriedeny podla osc
#
#
#########################################################################################################

def get_oscall():
    sql = 'select mos_id , mos_meno, mos_meno2, mos_dnast, mos_dukon, mos_active from mos order by 2'
    vysl=runsql(sql)
    return vysl

#########################################################################################################
#
#   Funkcia get_oscaktiv ( pdat : date ) - vrati list zaznamov z mosc, ktore su aktivne
#
#   pozn. prehodnotit podmienku selectu, ci by nebolo vhodne tam nechat len aktivne a netestovat datumy!!
#########################################################################################################

def get_oscaktiv( pdat ):
    sql = 'select mos_id , mos_meno, mos_meno2, mos_dnast, mos_dukon from mos where mos_active=1 and mos_dnast>='+str(pdat)+' and mos_dukon>='+str(pdat)+' order by 2'
    vysl=runsql(sql)
    return vysl

########################################################################################################
#  Funkcia zapis_mvy ( pid : integer , pdat : date , v : list )  -  1.par OSC
#                                                                   2.par Obdobie
#                                                                   3.par list of 250 values
#  Output: 0 - chyba, 1 - zapis do tabulky ok
########################################################################################################

def zapis_mvy( pid, pdat, vektor):
    svektor=''
    vysl = 0
    
    # test na existenciu zaznamu
    sql='select count(*) from mvy where mvy_id='+str(pid)+' and mvy_datum='+'\''+pdat+'\''
    #print(sql)
    vysl = runsql(sql)
    existuje = vysl[0][0]
    
    for i in range(250):
        svektor=svektor+str(vektor[i])+';'
    if len(svektor)>2000:
        #print('Chyba - dlzka retazca prekrocila povolenu velkost mvy_vekt')
        vysl=-1
    else:
        if existuje:
            #print(svektor)
            sql='update mvy set mvy_vekt = '+'\''+svektor+'\''+' where mvy_id='+str(pid)+' and mvy_datum='+'\''+pdat+'\''
            #print(sql)
            vysl=runsql(sql)
        else:
            #print("Neexistuje zaznam v tabulke vypoctu, vytvaram novy")
            sql = 'insert into mvy (mvy_id,mvy_datum,mvy_vekt,mvy_prd, mvy_prn) VALUES ('+str(pid)+ \
            ','+'\''+pdat+'\''+','+'\''+svektor+'\''+','+'0.0,0.0'+')'
            #print(sql)
            vysl=runsql(sql)
            
    return vysl

########################################################################################################
#  Funkcia get_mvy ( pid : integer , pdat : date  )  -  1.par OSC
#                                                        2.par Obdobie
#  Output: list of mvy_vekt ( list of floats )
########################################################################################################

def get_mvy( pid, pdat):

        l=[];s='';vysls='';poz=0
        
        sql='select mvy_vekt from mvy where mvy_id='+str(pid)+' and mvy_datum='+'\''+pdat+'\''
        #print(sql)
        vysls=''.join(runsql(sql)[0])  #konverzia tuple[0] na retazec
        #vysls=''.join(vysl[0])
        vysll=vysls.split(';')         # rozdelenie retazca na list retazcov podla oddelovaca ';'
        vysll1=[float(i) for i in vysll[:-1]]  # konverzia na list float(ov)

        return vysll1

##########################################################################################
#   Funkcia get_mmsk ( pid : int , pdat : datum , pzost : int , priad : int , vekt : list[250])
#     - v je list vypocitanych hodnot bud z mvy alebo premennej
#     -  vrati sum napoctu z vektora
##########################################################################################

def get_msk_suma( pzost, priad, vekt):

        suma = 0.0

        sql='select * from mmsk where mmsk_skupzob='+str(pzost)+' and mmsk_pozicia='+str(priad)
        mmsk = runsql( sql )
        
        for i in range(5,155):
        
            poz = mmsk[0][i]
            
            if (poz == 0):
                continue
            else:                
                if (i<105):
                    suma = suma + vekt[poz]
                else: 
                    suma = suma - vekt[poz]
            #print(str(i)+' '+str(poz)+' '+str(vekt[poz])+' '+str(suma))                
        #xx=input('Kontrola...')    
        return round(suma,2)

###################################################################################################
# Funkcia get_priemd( pid : integer, pdat : date ) - funkcia vracia dov.priemer, ak neexistuje 
#                                                    spocita pravdepodobny, alebo novy ak je 
#                                                    1,4,7,9 mesiac 
# output: float
###################################################################################################
def get_priemd( pid, pdat ):
    ## !! podla datumu nastupu resp. odpracovanych dni spocitat pravdepodobny priemer alebo
    ## ak je mesiac 1,4,7,9 tak spocitaj novy priemer
    try:    
        sql = 'select mvy_prd from mvy where mvy_id='+str(pid)+' and mvy_datum='+'\''+pdat+'\''
        #print(sql)
        vyslf = runsql(sql)[0][0]
        return vyslf
    except:
        return 0.0


###################################################################################################
# Funkcia get_priemn( pid : integer, pdat : date ) - funkcia vracia dov.priemer, ak neexistuje 
#                                                    spocita pravdepodobny, alebo novy ak je 
#                                                    1,4,7,9 mesiac 
# output: float
###################################################################################################
def get_priemn( pid, pdat ):

    try:
        sql = 'select mvy_prn from mvy where mvy_id='+str(pid)+' and mvy_datum='+'\''+pdat+'\''
        #vysls=''.join(runsql(sql)[0])  #konverzia tuple[0] na retazec
        vyslf = runsql(sql)[0][0]
        return vyslf
    except:
        return 0.0

#######################################################################################################
# Funkcia tlac_rekapitulaciu( pdat , psub )
# 
# 
#######################################################################################################

def tlac_rekapitulaciu( pdat , psub ):

    try :    
        f = open ( psub , 'w' )
    except:
        print('Chyba otvorenia suboru...')
        return -1
        
    print('Tlac mzdy. do suboru pdf..tu bude..treba doprogramovat')

    f.write('+--------------------------------------------------------------------------------+\n')
    
    f.close()
    
    #print(mvy)
    cakaj = input('Pre pokracovanie stlac enter')
    return 1
    
    return 0

#######################################################################################################
# Funkcia tlac_prikaz( pdat , psub )
# 
# 
#######################################################################################################

def tlac_prikaz( pdat , psub ):

    try :    
        f = open ( psub , 'w' )
    except:
        print('Chyba otvorenia suboru...')
        return -1
        
    print('Tlac mzdy. do suboru pdf..tu bude..treba doprogramovat')
    f.write('+--------------------------------------------------------------------------------+\n')
    
    f.close()
    
    #print(mvy)
    cakaj = input('Pre pokracovanie stlac enter')
    return 1
    
    return 0
    
#######################################################################################################
# Funkcia tlac_mzdu( pid , pdat, psub )
# 
# 
#######################################################################################################
def tlac_mzdu( pid , pdat , psub ):

    try :    
        f = open ( psub , 'w' )
    except:
        print('Chyba otvorenia suboru...')
        return -1
        
    print('Tlac mzdy. do suboru pdf..tu bude..treba doprogramovat')
    
    mpar= get_par( pdat )
    mos = get_mos( pid )
    mud = get_mud( pid, pdat )
    mvy = get_mvy( pid , pdat )
    priemd = get_priemd( pid , pdat )
    priemn = get_priemn( pid , pdat )
    m1=' ';m2='  ';m3='   ';m4='    ';m5='     ';m8='          '
    m10='          ';m15='               ';m50='                                                  '

    s_hm = get_msk_suma( 100 , 100 , mvy )
    s_cm = get_msk_suma( 100 , 110 , mvy )
    print('s_hm',s_hm)
    print('s_cm',s_cm)

    p001=''+mpar[0][3]+m50         # nazov firmy[50]
    p002=''+pdat[:7]+m8             # obdobie[7]
    p003=''+str(pid)+m5             # osc[5]
    p004=mos[0][2]+' '+mos[0][3]+' '+mos[0][4]+m50 # meno + prizv + titul[40]   # unicode tlac vyriesit !!!
    #p004=mos[0][2]+' '+' '+' '+' '+m50 # meno + prizv + titul[40]   
    p005=''+mos[0][12]+m5           # stredisko[5]
    p006=''+m10                     # !!Druh PP
    p007=''+m5                      # !!uvazok
    p008=''+m5                      # !!Tyzd.Prac.Doba
    p009=''+m5                      # !!Denna Pac.Doba
    p010=''+str(mud[0][23])+m10+m3  # !!Zdr.poistovna cislo
    p011=''+str(mvy[100])+m10       # zakladny plat poz(101) v mvek
    p012=''+m10                     # tarif.trieda
    p013=''+m10                     # tarif.stupen
    p014=''+str(priemd)+m10         # priemer dovolenkovy - bude potom aj v mvy[1]
    p015=''+str(priemn)+m10         # DVZ nahr. - denny vym.zaklad nahrady - bude potom aj v mvy[2]
    p016=''+'Uprava zakl.dane'+m10
    p017=''+str(mvy[182])+m10    # - nezd.cast zakl.dane mesacna
    p018=''+str(mvy[183]+mvy[184])+m10  # DDS+ZP +/- k zakladu dane
    p019=''+str(mvy[185])+m10                     # + auto k zakladu dane
    p020=''+str(mvy[186])+m10                     # +/- ostatne k zakladu dane
    p021=''+str(mvy[171])+m10       # VZ ZP 
    p022=''+str(mvy[172])+m10       # VZ NP
    p025=''+str(mvy[173])+m10       # VZ DPs
    p024=''+str(mvy[174])+m10       # VZ DPi
    p023=''+str(mvy[175])+m10       # VZ PvN
    p026=''+str(mvy[3])+m10         # Dovolenka narok dany rok
    p027=''+str(mvy[5])+m10         # Dovolenka min.r. 
    p028=''+str(mvy[4])+m10         # Dovolenka dodatk. dany rok
    p029=''+str(mvy[6])+m10         # Dovolenka cerpanie od zac.roka
    p030=''+str(mvy[3]+mvy[4]+mvy[5]-mvy[6])+m10 # Dovolenka zostatok od zaciatku roka
    p031=''+str(mvy[8])+m10         # Dovolenka skut.zostatok od zaciatku roka
    p032=''+str(mvy[7])+m10         # Dovolenka kratenie od zaciatku roka
    p040=''+str(mvy[210])+m10       # na ucet
    p041=''+str(mvy[211])+m10       # hotovost
    p042=''+str(mvy[212])+m10       # postou
    # inicializacia riadkov vyplatnej pasky 19 riadkov x 3 stlpce
    p=[]
    for i in range(115):
        p.append(m10+m3)
        
    p[1] =('Hruba mzda'+m15)[:13]; p[2]  = rtrim(m15+str(s_hm)+m2,13)
    p[3] =('-  poistne'+m15)[:13]; p[4]  = rtrim(m15+str(round((mvy[151]+mvy[152]+mvy[153]+mvy[154]+mvy[155]),2))+m2,13)
    
    
    p[5]=('-      dan'+m15)[:13] 
    p[6]=rtrim(m15+str(round(mvy[190]+mvy[191]+mvy[192]+mvy[193],2))+m2,13)
    p[7] =('+dan.bonus'+m15)[:13]; 
    p[8]  = rtrim(m15+str(mvy[194])+m2,13)
    p[9] =('Cista mzda'+m15)[:13]; p[10] = rtrim(m15+str(s_cm)+m2,13)

    p[39] =('Zdr.p.'+m15)[:13];   p[40] =rtrim(m15+str(mvy[151])+m2,13)
    p[41] =('Nem.p.'+m15)[:13];   p[42] =rtrim(m15+str(mvy[152])+m2,13)
    p[43] =('Std.p.'+m15)[:13];   p[44] =rtrim(m15+str(mvy[153])+m2,13)
    p[45] =('Sti.p.'+m15)[:13];   p[46] =rtrim(m15+str(mvy[154])+m2,13)
    p[47] =('PvN.p.'+m15)[:13];   p[48]=rtrim(m15+str(mvy[155])+m2,13)
    p[49]=('Spolu poi.'+m15)[:13];p[50]=rtrim(m15+str(round(mvy[151]+mvy[152]+mvy[153]+mvy[154]+mvy[155],2))+m2,13)
    p[51]=('Zdr.p.fy'+m15)[:13];  p[52]=rtrim(m15+str(mvy[161])+m2,13)
    p[53]=('Nem.p.fy'+m15)[:13];  p[54]=rtrim(m15+str(mvy[162])+m2,13)
    p[55]=('Std.p.fy'+m15)[:13];  p[56]=rtrim(m15+str(mvy[163])+m2,13)
    p[57]=('Sti.p.fy'+m15)[:13];  p[58]=rtrim(m15+str(mvy[164])+m2,13)
    p[59]=('PvN.p.fy'+m15)[:13];  p[60]=rtrim(m15+str(mvy[165])+m2,13)
    p[61]=('Gar.p.fy'+m15)[:13];  p[62]=rtrim(m15+str(mvy[166])+m2,13)
    p[63]=('Rez.f.fy'+m15)[:13];  p[64]=rtrim(m15+str(mvy[167])+m2,13)
    p[65]=('Ur.p.fy'+m15)[:13];   p[66]=rtrim(m15+str(mvy[168])+m2,13)
    p[67]=('Spolu p.fy'+m15)[:13];p[68]=rtrim(m15+str(round(mvy[161]+mvy[162]+mvy[163]+mvy[164]+mvy[165]+mvy[166]+mvy[167]+mvy[168],2))+m2,13)
    p[69]=('Zakl.Dane'+m15)[:13]; p[70]=rtrim(m15+str(mvy[181])+m2,13)
    p[71]=('Dan'+m15)[:13];       p[72]=rtrim(m15+str(round(mvy[190]+mvy[191]+mvy[192]+mvy[193],2))+m2,13)
    p[73]=('Dan.Bonus'+m15)[:13]; p[74]=rtrim(m15+str(mvy[194])+m2,13)

    #print(p015)
    # vystup na obrazovku
    print('+--------------------------------------------------------------------------------+')
    print('|'+p001[:50]+m2+m5+' Za obdobie: '+p002[:9]+' |')
    print('|                                                                                |')
    print('| Os.cislo: '+p003[:5]+' Meno: '+p004[:40]+' Stredisko: '+p005[:5]+'|')
    print('+--------------------------------------------------------------------------------+')
    print('| Druh PP: '+p006[:10]+'| Uvazok: '+p007[:5]+' |  TPD/DPD: '+p008[:5]+'/'+p009[:5]+' | ZP: '+p010[:13]+' |')
    print('+--------------------------------------------------------------------------------+')
    print('| Zakl.plat : ' + p011[:10] + '| Uprava zakl. dane'   + ' | VZ ZP: '+p021[:10]+' | D-narok: '+p026[:5]+' |') 
    print('| Tarif.tr. : ' + p012[:10] + '| NCZD:  ' + p017[:10] + ' | VZ NP: '+p022[:10]+' | D-min.r.:'+p027[:5]+' |')
    print('| Tarif.st. : ' + p013[:10] + '| DDS/ZP:' + p018[:10] + ' | VZ PvN:'+p023[:10]+' | D-dodat.:'+p028[:5]+' |') 
    print('| Priem.nahr: ' + p014[:10] + '| Auto:  ' + p019[:10] + ' | VZ DPi:'+p024[:10]+' | D-cerp.: '+p029[:5]+' |')
    print('| OVZ nahr. : ' + p015[:10] + '| Ine:   ' + p020[:10] + ' | VZ DPs:'+p025[:10]+' | D-Zost.: '+p030[:5]+' |')
    print('+--------------------------------------------------------------------------------+')
    print('| '+p[1]+p[2]+p[39]+p[40]+p[77]+p[78]+' |')
    print('| '+p[3]+p[4]+p[41]+p[42]+p[79]+p[80]+' |')
    print('| '+p[5]+p[6]+p[43]+p[44]+p[81]+p[82]+' |')
    print('| '+p[7]+p[8]+p[45]+p[46]+p[83]+p[84]+' |')
    print('| '+p[9]+p[10]+p[47]+p[48]+p[85]+p[86]+' |')
    print('| '+p[11]+p[12]+p[49]+p[50]+p[87]+p[88]+' |')
    print('| '+p[13]+p[14]+p[51]+p[52]+p[89]+p[90]+' |')
    print('| '+p[15]+p[16]+p[53]+p[54]+p[91]+p[92]+' |')
    print('| '+p[17]+p[18]+p[55]+p[56]+p[93]+p[94]+' |')
    print('| '+p[19]+p[20]+p[57]+p[58]+p[95]+p[96]+' |')
    print('| '+p[21]+p[22]+p[59]+p[60]+p[97]+p[98]+' |')
    print('| '+p[23]+p[24]+p[61]+p[62]+p[99]+p[100]+' |')
    print('| '+p[25]+p[26]+p[63]+p[64]+p[101]+p[102]+' |')
    print('| '+p[27]+p[28]+p[65]+p[66]+p[103]+p[104]+' |')
    print('| '+p[29]+p[30]+p[67]+p[68]+p[105]+p[106]+' |')
    print('| '+p[31]+p[32]+p[69]+p[70]+p[107]+p[108]+' |')
    print('| '+p[33]+p[34]+p[71]+p[72]+p[109]+p[110]+' |')
    print('| '+p[35]+p[36]+p[73]+p[74]+p[111]+p[112]+' |')
    print('| '+p[37]+p[38]+p[75]+p[76]+p[113]+p[114]+' |')
    print('+--------------------------------------------------------------------------------+')
    print('| K VYPLATE NA UCET / HOTOVOST / POSTOU:  '+p040[:10]+'  / '+p041[:10]+'  / '+p042[:10]+' |')
    print('+--------------------------------------------------------------------------------+')

    f.write('+--------------------------------------------------------------------------------+\n')
    f.write('|'+p001[:50]+m2+m5+' Za obdobie: '+p002[:9]+' |\n')
    f.write('|                                                                                |\n')
    #f.write('| Os.cislo: '+p003[:5]+' Meno: '+p004[:40]+' Stredisko: '+p005[:5]+'|\n')
    f.write('| Os.cislo: '+p003[:5]+' Meno: '+'                                        '+' Stredisko: '+p005[:5]+'|\n')    
    f.write('+--------------------------------------------------------------------------------+\n')
    f.write('| Druh PP: '+p006[:10]+'| Uvazok: '+p007[:5]+' |  TPD/DPD: '+p008[:5]+'/'+p009[:5]+' | ZP: '+p010[:13]+' |\n')
    f.write('+--------------------------------------------------------------------------------+\n')
    f.write('| Zakl.plat : ' + p011[:10] + '| Uprava zakl. dane'   + ' | VZ ZP: '+p021[:10]+' | D-narok: '+p026[:5]+' |\n') 
    f.write('| Tarif.tr. : ' + p012[:10] + '| NCZD:  ' + p017[:10] + ' | VZ NP: '+p022[:10]+' | D-min.r.:'+p027[:5]+' |\n')
    f.write('| Tarif.st. : ' + p013[:10] + '| DDS/ZP:' + p018[:10] + ' | VZ PvN:'+p023[:10]+' | D-dodat.:'+p028[:5]+' |\n') 
    f.write('| Priem.nahr: ' + p014[:10] + '| Auto:  ' + p019[:10] + ' | VZ DPi:'+p024[:10]+' | D-cerp.: '+p029[:5]+' |\n')
    f.write('| OVZ nahr. : ' + p015[:10] + '| Ine:   ' + p020[:10] + ' | VZ DPs:'+p025[:10]+' | D-Zost.: '+p030[:5]+' |\n')
    f.write('+--------------------------------------------------------------------------------+\n')
    f.write('| '+p[1]+p[2]+p[39]+p[40]+p[77]+p[78]+' |\n')
    f.write('| '+p[3]+p[4]+p[41]+p[42]+p[79]+p[80]+' |\n')
    f.write('| '+p[5]+p[6]+p[43]+p[44]+p[81]+p[82]+' |\n')
    f.write('| '+p[7]+p[8]+p[45]+p[46]+p[83]+p[84]+' |\n')
    f.write('| '+p[9]+p[10]+p[47]+p[48]+p[85]+p[86]+' |\n')
    f.write('| '+p[11]+p[12]+p[49]+p[50]+p[87]+p[88]+' |\n')
    f.write('| '+p[13]+p[14]+p[51]+p[52]+p[89]+p[90]+' |\n')
    f.write('| '+p[15]+p[16]+p[53]+p[54]+p[91]+p[92]+' |\n')
    f.write('| '+p[17]+p[18]+p[55]+p[56]+p[93]+p[94]+' |\n')
    f.write('| '+p[19]+p[20]+p[57]+p[58]+p[95]+p[96]+' |\n')
    f.write('| '+p[21]+p[22]+p[59]+p[60]+p[97]+p[98]+' |\n')
    f.write('| '+p[23]+p[24]+p[61]+p[62]+p[99]+p[100]+' |\n')
    f.write('| '+p[25]+p[26]+p[63]+p[64]+p[101]+p[102]+' |\n')
    f.write('| '+p[27]+p[28]+p[65]+p[66]+p[103]+p[104]+' |\n')
    f.write('| '+p[29]+p[30]+p[67]+p[68]+p[105]+p[106]+' |\n')
    f.write('| '+p[31]+p[32]+p[69]+p[70]+p[107]+p[108]+' |\n')
    f.write('| '+p[33]+p[34]+p[71]+p[72]+p[109]+p[110]+' |\n')
    f.write('| '+p[35]+p[36]+p[73]+p[74]+p[111]+p[112]+' |\n')
    f.write('| '+p[37]+p[38]+p[75]+p[76]+p[113]+p[114]+' |\n')
    f.write('+--------------------------------------------------------------------------------+\n')
    f.write('| K VYPLATE NA UCET / HOTOVOST / POSTOU:  '+p040[:10]+'  / '+p041[:10]+'  / '+p042[:10]+' |\n')
    f.write('+--------------------------------------------------------------------------------+\n')
    
    f.close()
    
    #print(mvy)
    cakaj = input('Pre pokracovanie stlac enter')
    return 1

#######################################################################################################
# Funkcia vytlac_vektor ( v : list of floats ) 
#
#######################################################################################################

def vytlac_vektor( pid, pdat ):

    v = get_mvy( pid , pdat )
    #l_str=[]
    
    #for i in range(250):
    #    l_str.append('v[' + str( i*10 ) + ']: ' + str( v[i*10] ))

    for i in range(25):    
        print('v[%3d]: %8.2f  v[%3d]: %8.2f  v[%3d]: %8.2f  v[%3d]: %8.2f  v[%3d]: %8.2f  v[%3d]: %8.2f \
               v[%3d]: %8.2f  v[%3d]: %8.2f  v[%3d]: %8.2f  v[%3d]: %8.2f' % \
               (i*10, v[i*10], i*10+1, v[i*10+1], i*10+2, v[i*10+2], i*10+3, v[i*10+3], i*10+4, v[i*10+4],\
                i*10+5, v[i*10+5], i*10+6, v[i*10+6], i*10+7, v[i*10+7], i*10+8, v[i*10+8], i*10+9, v[i*10+9]))
        
    cakaj = input('Pre pokracovanie stlac enter')

#######################################################################################################
# Funkcia vytlac_vektor1( v : list of floats ) 
#
#######################################################################################################

def vytlac_vektor1( pid, pdat ):

    v = get_mvy( pid , pdat )
    #l_str=[]
    
    #for i in range(250):
    #    l_str.append('v[' + str( i*10 ) + ']: ' + str( v[i*10] ))

    for i in range(250):    
        print('v[%3d]: %8.4f ' % (i, v[i]))
        
    cakaj = input('Pre pokracovanie stlac enter')
            
#################################################################################
#  Pomocna tlac 
#################################################################################

def pom_tlac(t0,t1,t2,t3,t4):

    print('mpar:')
    for row in t0:
        print(row)        
    
    print('fpd')
    for row in t1:
       print(row)

    print('mos:')
    for row in t2:
        print(row)
    
    print('mud')
    for row in t3:
        print(row)

    print('mzl')
    for row in t4:
        print(row)


#########################################################################################################
#   Funkcia vypocet ( pid  : integer, pdat : date )
#
#   input:  1.par pid  - osobne cislo
#           2.par pdat - aktualne obdobie pre vypocet
#  
#   output: 0 | 1  
#           
#
#   a. vyriesit pracu s priemermi a funkciu get_priemd, get_priemn
#   b. vyriesit kodovanie vo vektore cislo na 8 zn char napr deka*100 -> hexa
#   c. dorobit invalidnych poistencov vypocet poistneho
#   d. zaokruhlenie poistneho podla zakona
#   e. zaokruhlenie dane podla zakona
#   f. dane - auto, danovy bonus, DDS, ZivPoist, Ine
#   g. doriesit uvazok mensi ako 100%
#
#   Postup vypoctu:
# ok  1. Nacitaj potrebne data z mpar, mos, mud, mzl, fpd, kal
#     2. vypocet udajov FPD  
#     3. vypocet z mzl - postupne po skupinach kodov 1-9
#     4. vypocet odvodov !!! invalidov doplnit
#     5. vypocet dane 
#     6. danovy bonus na deti od 1.4.2019 na 2nasobok 44.37 eur ak este nedovrsilo 6 rokov. 
#     7. 
#     8. vypocet zrazok
#     9. zapis do mvy
#
#########################################################################################################
    ### napocet z mzl   
    ###                 poz row[0] - osc
    ###                 poz row[1] - kod 
    ###                 poz row[2] - kodext
    ###                 poz row[3] - datum_od
    ###                 poz row[4] - datum_do
    ###                 poz row[5] - dni
    ###                 poz row[6] - hod
    ###                 poz row[7] - sadzba
    ###                 poz row[8] - hodnota 
    ###                 poz row[9] - pozn
    ###                 poz skup : row[13]      1 - zakladne, 2 - nahrady , 3 - ... 9-zrazky
    ###                 poz f1,2,3,4 zc         : 14,15,16,17
    ###                 poz f1,2,3,4,5,6,7,8 zl :    18,19,20,21,22,23,24,25
    ###                 poz hak:                : 26          # A - € celkom, B – sadzba * hod odprac., C – hodiny * suma_na_hod , D - datum od - do 
    ###                 poz znizuje hod sviatok : 27 
    ###                 poz alg1 koef           : 37  
    ###                 poz alg2 vyp.korun      : 38
    ###                 poz alg3 percMN         : 39
    ###                 poz alg4 perc.tarif     : 40
    ###                 poz alg5 perc.rezer     : 41   - preplatenie hodin sadzbou v centoch 
    ###                 poz alg6 perc.+/-       : 42
    ###                 poz alg7 perc.pls       : 43          100%+N%\N%
    ###                 poz hod                 : row[52] 
    ###                 poz sk                  : row[53] 
    ###                 poz dni                 : row[54]  
    ###                 poz poc                 : row[55]
    ###                 poz prg nemoc           : 56
    ###                 poz % pre nemoc1        : 57
    ###                 poz poc.dni pre nem.1   : 58
    ###                 poz % pre nemoc2        : 59
    ###                 poz poc.dni pre nem.    : 60    

def vypocet( pid, pdat ):
    rokp = int(pdat[:4])
    mesp = int(pdat[5:7])

    # inicializacia premennych  
    # inicializacia vektora v - list of floats
    v = []               # vektor do ktoreha sa ukladaju vypocitane udaje
    for i in range(250): 
        v.append(0.0)    # popis vektora je v tabulke mvek

    v_vektor = []        # pomocny vektor
    for i in range(45): 
        v_vektor.append(0.0)    # pridaj 45 prvkov obsahujucich 0.0 do v_vektora
    
    d_neodp  = 0.0   # dni neodpracovane
    h_neodp  = 0.0   # hodiny neodpracovane
    fpd_hod  = 0.0   # fond pracovnej doby pracovne hodiny za mesiac aj so sviatkami
    fpd_hodp = 0.0   # fond pracovnej doby pracovne hodiny za mesiac
    fpd_hods = 0.0   # fond pracovnej doby hodiny sviatok za mesiac
    fpd_dni  = 0.0   # fond pracovnej doby pracovne dni aj so sviatkami 
    fpd_dnip = 0.0   # fond pracovnej doby pracovne dni za mesiac 
    fpd_dnis = 0.0   # fond pracovnej doby dni sviatok za mesiac 
    fpd_priem = 0.0  # fond pracovnej doby priemerny za mesiac
    
    d_neodp = 0.0  # neodpracovane dni
    h_neodp = 0.0  # neodpracovane hodiny

    v_pracdni = 0.0
    v_prachod = 0.0
    v_sviatdni = 0.0
    v_sviathod = 0.0
    v_prelateny_sviatok = 0.0
    v_tarif_na_hod = 0.0
    
    v_pracuje = False   # logicka premenna urcuje 1 - pracovnik pracuje a je aktivny , 0 - nepracuje alebo nie je aktivny
    v_500 = False       # ma zadany kod 500
    
    VZ_ZP = 0.0; VZ_SP = 0.0; VZ_NP = 0.0; VZ_UP = 0.0; VZ_DPs = 0.0; VZ_DPi = 0.0; VZ_PvN = 0.0; VZ_GP  = 0.0; VZ_RF  = 0.0 
    ZPzam = 0.0; NPzam = 0.0; DPszam = 0.0; DPizam = 0.0; PvNzam = 0.0; 
    ZPpod = 0.0; NPpod = 0.0; DPspod = 0.0; DPipod = 0.0; PvNpod = 0.0;  GPpod = 0.0; RFpod = 0.0; UPpod = 0.0
    
    s_zivpoist = 0.0 ; s_dds = 0.0 ; s_auto = 0.0; s_odpocetost = 0.0; s_opravadaneminr = 0.0; s_rozdielzrch = 0.0  
    s_dan_mes = 0.0; s_ciast_zaklad_dane = 0.0; s_danbonus = 0.0; s_dan_roc = 0.0; s_nezdcastdane = 0.0 

    l_vyplata = 'H'                     # default hodnota kam smerovat vyplatu 'B' banka 'H' hotovost 'P' posta
    s_platzakl = 0.0                    # zakladny plat - tarif zo zmluvy
    ### koniec inicializacie premennych

    # nacitanie dat z mpar, mos, mud, mzl a kalendara mkalh,mkalr pre pid (osobne cislo)
    mpar = get_par( pdat )              # popis navratovej hodnoty je vo funkcii
    mos  = get_mos( pid  )              # osc[0][1] os.cis., [6]-activ(0,1), [44]-d.nastupu, [45]-d.ukon.
    mud  = get_mud( pid  , pdat )       # 6 - kal | 7 - uvazok | 8 - preplatenie sviatku P - priemer , T - tarif | 11,12,13 - zniz.prac.sch. | 18 - druh dochodku|19,20 - pocet deti | 21 - dan.banus| 22 - nezd.cast.dane | 24,25,26,27 poist.zam | 28,29,30,31 poi.pod
    mzl  = get_mzl1( pid , pdat )       # vrati mzl(9 poli)+mkod(62 poli)
    fpd  = get_fpd( pdat , mud[0][6] )  # vrati hodnoty z kalendara pre mesacne casove udaje pre fond pracovnej doby (fpd)
    
    mos_id  = mos[0][0]
    mos_osc = mos[0][1]
    mos_datum_nastup = mos[0][44]
    mos_datum_ukonc = mos[0][45]
    
    v_pracuje = ( mos[0][6]=='1' and not( ( eom(pdat) < mos[0][44] ) or  ( pdat > mos[0][45] ) ))  # test ci pracuje podla datumov nastupu a ukoncenia a ci je oznaceny v mos_active==1 

    if v_pracuje:
        v_priemer_dovolenka = get_priemd( pid, pdat )  # nacitaj aktualne platny priemer, ak neexistuje vypocitaj
        v_priemer_nemoc     = get_priemn( pid, pdat )  # nacitaj platny priemer pre nemoc, ak neexistuje vypocitaj
    else:
        print("Pracuje:",v_pracuje)
        print("mos[0][6]:",mos[0][6])
        print("datum zaciatku PPV - mos[0][44]:",mos[0][44])
        print("datum ukoncen. PPV - mos[0][45]:",mos[0][45])
        print("test pracuje:", mos[0][6]=='1' and not( ( eom(pdat) < mos[0][44] ) or  ( pdat > mos[0][45] ))) 
        return(0)
       
    p_deti_od6 = mud[0][19]             # pocet deti z mud viac ako 6 rokov 
    p_deti_do6 = mud[0][20]             # pocet deti z mud menej ako 6 rokov 
    
    pom_tlac(mpar, fpd, mos, mud, mzl)  # pomocna tlac pre kontrolu dat:wq:
    
    fpd_kal = fpd[0][0]             # cislo kalendara  
    fpd_ka1popis  = fpd[0][1]       # popis kalendara
    fpd_pphodm = fpd[0][3]          # priem. pocet hodin za mesiac z kalendara
    fpd_pphodw = fpd[0][4]          # priem. pocet hodin za tyzden z kalendara
    fpd_pphodd = fpd[0][5]          # priem. pocet hodin za den z kalendara     
    fpd_pomerphodd = fpd[0][6]      # pomerny pocet hodin z kalendara za den (podla uvazku z kalendara)
    fpd_ppdw = fpd[0][7]            # pocet dni pracovnych v tyzdni z kalendara
    fpd_dnip = fpd[0][11]           # pocet dni pracovnych z kalendara (nie odpracovanych) je to fpd z kalendara
    fpd_hodp = fpd[0][12]           # pocet hod pracovnych z kalendara
    fpd_dnis = fpd[0][13]            # pocet dni sviatkov z kalendara
    fpd_hods = fpd[0][14]            # pocet hodin sviatkov z kalendara
    fpd_hod  = fpd_hodp + fpd_hods   # fpd hod za mesiac aj so sviatkami
    fpd_dni  = fpd_dnip + fpd_dnis   # fpd dni za mesiac aj so sviatkami        
    dni_mes  = calendar.monthrange(rokp,mesp)[1] # celkovy pocet dni v mesiaci

### zisti tarif
    i=0
    for row in mzl:
        mzl_osc = row[0]     ; mzl_kod = row[1]     ; mzl_kodext = row[2]  ; mzl_datumod = row[3]; mzl_datumdo = row[4]
        mzl_dni = row[5]     ; mzl_hod = row[6]     ; mzl_sadzba = row[7]  ; mzl_hodnota = row[8]; mkod_typ_hak = row[26]
        mkod_zniz_hod_sviatku = row[27]             ; mkod_poz   = row[28] ; 
        mkod_pozhod = row[52]; mkod_pozkor = row[53]; mkod_pozdni = row[54]; mkod_pozpoc = row[55]; mkod_pozdninek = row[66]
        
        if (mzl_kod in (1110,1120,1130)):
            v_tarif_na_hod = mzl_hodnota / fpd_pphodm   # vypocet suma na hodinu z mesacneho platu / priemer.pocet hodin z kalendara 
            s_platzakl = s_platzakl + mzl_hodnota
            v_pozicia_tarif_hodiny  = mkod_pozhod
            v_pozicia_tarif_hodnota = mkod_pozkor
            v_pozicia_tarif_dni     = mkod_pozdni                       
        elif (mzl_kod in (1200,1210)): 
            v_tarif_na_hod = mzl_hodnota            # vypocet suma na hodinu z mesacneho platu / priemer.pocet hodin z kalendara 
            s_platzakl = s_platzakl +  mzl_hodnota * fpd_hod   # !!!?? vypocet zakladneho platu z hodinovej sadzby
            v_pozicia_tarif_hodiny  = mkod_pozhod
            v_pozicia_tarif_hodnota = mkod_pozkor
            v_pozicia_tarif_dni     = mkod_pozdni       
        else:    
            print('Nema tarif!')
    
# napocet kodov START  ########################################

    i=0   # pocitadlo zaznamov v cykle

    for row in mzl:   
        mzl_osc     = row[0] ; mzl_kod      = row[1];  mzl_kodext  =  row[2]; mzl_datumod = row[3];  mzl_datumdo  = row[4]
        mzl_dni     = row[5] ; mzl_hod      = row[6];  mzl_sadzba  = row[7] ; mzl_hodnota = row[8];  mkod_typ_hak = row[26]; mkod_zniz_hod_sviatku = row[27]
        mkod_alg1   = row[37]; mkod_alg2    = row[38]; mkod_alg3   = row[39]; mkod_alg4   = row[40]; mkod_alg5    = row[40]; mkod_alg6 = row[40]; mkod_alg7 = row[40]  
        mkod_pozhod = row[52]; mkod_pozkor  = row[53]; mkod_pozdni = row[54]; mkod_pozpoc = row[55]; mkod_pozdninek = row[66]
        #row[26]: A - € celkom, B – sadzba * hod odprac., C – hodiny (bud priemerom alebo tarifom /*%) D - vyluky 
       
        print('Riadok:',i)
        print('osc a kod:',row[0],row[1])
        print('row[12]',row[12],type(row[12]))
        print("v_tarif_na_hod:", v_tarif_na_hod)
        print("Priem.pocet hod/mes z kal.:",fpd_pphodm)
        #print('mzl.kod-A:',row[1]);print('mzl.d1-d2:',row[2]+'-',row[3]);print('mzl.dni:',row[4]);print('mzl.dni:',row[4]);
        #print('mzl.dni:',row[4]);print('mzl.dni:',row[4]);print('mkod.hak:',row[25]);print('mkod.poz:',row[27]);
        #print('mkod.pozhod:',row[51]);print('mkod.pozsk:',row[52]);print('mkod.pozdni:',row[53]);print('mkod.pozpoc:',row[54])
 
        if ( mkod_typ_hak == 'A' and mzl_kod not in (1110,1120,1130)):   # pre kody 'A' zapis sumu do vektora vyoctu 
            v[mkod_pozkor] = v[mkod_pozkor] + mzl_hodnota                      
           
#        if (mkod_typ_hak == 'B' and mzl_kod not in (1200,1210)):
#        
#            s_platzakl = s_platzakl + mzl_hodnota * fpd_hod
        
        if (mkod_typ_hak == 'C'):                                        # pre kody 'C' zapis hodiny, sumu a dni do vektora
            # REP (V[],MSTR (MVAL (MID (V[],Vys dni zapisat*4+1,4)) + (32 - DAY (p obdobie + 31)) / v FPD * Hodiny,4),Vys dni zapisat * 4  poc.dni.v mes./ v.FPD * hodiny (25)
            #   + 1,4)                
            mzl_hodnota = 0.0
            mzl_dni         = day(eom(p_dat)) / FPD_hod * mzl_hod   # vypocet poctu dni z hodin
            #mzl_hodnota = {mzl_func}(mzl_hodiny,v_tarif_na_hod,v_priemer_dovolenka)    # vypocet pomocou algoritmu pre kod du buducej verzie
            if ( mkod_alg3 > 0 ):                                               # prepocet priemerom - ak je percento priemeru PPU > 0
                mzl_hodnota = mzl_hod * v_priemer_dovolenka * mkod_alg3 / 100         
            if ( mkod_alg4 > 0 ):                                               # prepocet tarifom - ak je percento tarifu > 0
                mzl_hodnota = mzl_hod * v_tarif_na_hod * mkod_alg4 /100  
            if ( mkod_alg5 > 0 ):                                               # prepocet sadzbou - ak je sadzba v centoch > 0
                mzl_sadzba  = mkod_alg4 
                mzl_hodnota = mzl_hod * mkod_alg4 / 100                         # preplatenie sadzbou na hodinu            

            if( mkod_pozhod > 0 ): v[mkod_pozhod] = v[mkod_pozhod] + mzl_hodiny          
            if( mkod_pozkor > 0 ): v[mkod_pozkor] = v[mkod_pozkor] + mzl_hodnota         # prepocet sumy podla zadaneho algoritmu
            if( mkod_pozdni > 0 ): v[mkod_pozdni] = v[mkod_pozdni] + mzl_dni 

        if (mkod_typ_hak == 'D'):

            if ( mzl_datumod < pdat ):               #            #IF (EV<DJ,DJ,EV)           
                v_datumod = pdat
            else:
                v_datumod = mzl_datumod

            if ( mzl_datumdo > eom( pdat )):               #            IF (EW>EOM (DJ),EOM(DJ),EW)
                v_datumdo = eom( pdat )
            else:
                v_datumod = mzl_datumdo
                
            kod_dniahod = get_dni_hod( v_datumod , v_datumdo , fpd_kal )

            v_pracdni  =  kod_dniahod[0]                          # dni celkom pre kod
            v_prachod  =  kod_dniahod[1]                          # dni celkom pre kod            
            v_sviatdni =  kod_dniahod[2]                          # dni celkom pre kod
            v_sviathod =  kod_dniahod[3]                          # dni celkom pre kod
            
            print("Kod a dni a hod:",mzl_kod+' Dni_p:'+str(v_kod_dniprac)+' Hod_p:'+str(v_kod_hodprac)+' Dni_s:'+str(v_kod_dnisviat)+' Hod_s:'+str(v_kod_hodsviat))
            
            v_dni = 0.0           #IF (EY>=FM/2 AND EV>=DJ AND EY<>0,DL+DN-1,DL+DN)  
            if (pdat > mzl_datumod):
                v_hod = 0 
            else: 
                v_hod = mzl_hod   #v prac hod * 22 Uvazok v % / 100 - IF (p obdobie > Od,0,Hodiny - SK/hod)
                
            pom_hodiny = v_prachod * 100 / 100 -  v_hod            # prva 100 je uvazok z mud
            
            if (mkod_zniz_hod_sviatku == 'A'):
                pom_hodiny = pom_hodiny + v_sviathod * 100/ 100    # prva 100 je uvazok z mud
                v_preplateny_sviatok = v_preplateny_sviatok - v_sviathod * 100 / 100    # prva 100 je uvazok z mud
            
            if( mkod_pozhod > 0 ): 
                v[mkod_pozhod] = v[mkod_pozhod] + mzl_hod
            if( mkod_pozkor > 0 ): 
                v[mkod_pozkor] = v[mkod_pozkor] + mzl_hodnota   # prepocet sumy podla zadaneho algoritmu
            if( mkod_pozdni > 0 ): 
                v[mzl_pozdni]  = v[mzl_pozdni] + mzl_dni  #23 (v[],v[] + IF (Do > EOM (pdat),EOM (pdat),Do) - IF (Od < pdat,pdat,Od)+1,4),Vys dni zapisat*4+1,4)                              
            if( mkod_pozdninek > 0 ): 
                v[mzl_poz_dninek]=v[mzl_poz_dninek] + v_dni  #24 REP (Virtualne pole,MSTR (MVAL (MID (Virtualne pole,Vysledok dni ne*4+1,4)) + v dni,4),Vysledok dni ne * 4 + 1,4)   
            # skontrolovat v_dni ci sa napocitava !!!   
            if ((mzl_kod == 500) and ( mzl_datumod < eom(pdat) ) and (mzl_datumdo > eom(pdat)) and (eom(mos_datum_ukonc) > pdat)):                   
                v_pomdatum = mzl_datumod

        if (( mzl_kod == 500 ) and ( mzl_datumod <= pdat ) and ( eom( pdat ) <= mzl_datumdo )):  #TRIM (Kod pripadu) = '500' AND Od <= p obdobie AND EOM (p obdobie) <= Do
            v_500 = true    
                        
        i += 1   # pripocita riadok
        
# END napocet kodov END ##############################################
    ## koniec spracovania mzl #######################################################################################
    #################################################################################################################
    
    ## vypocet mzdy po spracovani kodov        
    
    ## Zapis do vektora dni odpracovane ##  
    #!!! zmenit na get_msk_suma() - napocet odpracovanych dni a hodin a neodpracovanych dni a hod
    v[10]=fpd_dni; 
    v[11]=fpd_dni - d_neodp; 
    v[13] = fpd_dnis;  # zapis do pomocneho vektora vypoctu v
    ## Zapis do vektora hod odpracovane##
    v[50]=fpd_hod; 
    v[51]=fpd_hod - h_neodp; 
    v[53] = fpd_hods;  # zapis do pomocneho vektora vypoctu v
    ## Zapis do vektora sumy odpracovane ##
    v[100] = s_platzakl                                                           # tarifny plat 
    v[101] = round(  s_platzakl / fpd_hod * ( fpd_hod - h_neodp ), 2) # odpracovane suma
    if ( mud[0][8] == 'T' ):
        v[123] = round(( s_platzakl / fpd_hod * fpd_hods ) ,2 )              # sviatok suma platom
    else:
        v[123] = round(( v_priemer_dovolenka * fpd_hods    ) ,2 )

# END mzl END ##############################################################################################

# vypocet odvodov start #########################################################################################
    # inicializacia premennych?
    # napocet VZ_ZP z mmsk par1 - zostava par2 - riadok 
    VZ_ZP  = get_msk_suma( 100 , 2 , v )  ### kontrola zaokruhlenia !!!
    #if (VZ_ZP > xxxx): Maximalny VZ ZP nie je stanoveny
    #    VZ_ZP = xxxx
    
    VZ_SP = get_msk_suma( 100 , 3 , v ) 
    VZ_UP = VZ_SP               # neohraniceny VZ pre urazove poistenie
    
    if ( VZ_SP > mpar[0][40] ): # kontrola hranice VZ 
        VZ_SP = mpar[0][40]

    VZ_NP  = VZ_SP; VZ_DPs = VZ_SP; VZ_DPi = VZ_SP; VZ_PvN = VZ_SP; VZ_GP  = VZ_SP; VZ_RF  = VZ_SP 
    
    # vypocet poistneho - zohladnuje sa nastavenie v mud poistnie A/N, invalidita, dochodca a pod. , parametre v mpar 
    # !!! vid riadok hore
    #
    # zaokruhlenie odvodov je na najblizsi eurocent nadol. napr. 5.051 -> 5.05, 5.05999 -> 5.05 ??? Otazka je ci len pre Zam alebo aj Pod !!!
    #
    # Odpocitatelna polozka ZP = [380 - ((prijem zo zarobkovej cinnosti - 380) * 2) / pocet dni mesiaca] * ppcet odpracovanych dni 
    # DPi - poistenec, ktory je dochodkovo poisteny po priznani starobneho dochodku alebo predcasneho starobneho dochodku alebo ak je poberatelom vysluhoveho dochodku podla osobitneho predpisu a dovrsil dochodkovy vek neplati DPi
    # DPi - zamestnavatel za zamestnanca, ktory je dochodkovo poisteny po priznani starobneho dochodku alebo predcasneho starobneho dochodku alebo ak je poberatelom vysluhoveho dochodku a dovrsil dochodkovy vek neplati DPi.
    
    if (mud[0][24] == 'A'):
        ZPzam  = roundown( (VZ_ZP  * mpar[0][14] / 100 ) , 2 )
    else:
        ZPzam = 0.0
        
    if (mud[0][25] == 'A'):
        NPzam  = roundown( (VZ_NP  * mpar[0][15] / 100 ) , 2 )
    else:
        NPzam = 0.0        

    if (mud[0][26] == 'A'):
        DPszam = roundown( (VZ_DPs * mpar[0][16] / 100 ) , 2 )
        DPizam = roundown( (VZ_DPi * mpar[0][17] / 100 ) , 2 )
    else:
        DPszam = 0.0
        DPizam = 0.0
    
    if (mud[0][27] == 'A'):
        PvNzam = roundown( (VZ_PvN * mpar[0][18] / 100 ) , 2 )
    else:
        PvNzam = 0.0
    
    if (mud[0][28] == 'A'):
        ZPpod  = roundown( (VZ_ZP  * mpar[0][19] / 100 ) , 2 )
    else:
        ZPpod = 0.0
    
    if (mud[0][29] == 'A'):
        NPpod  = roundown( (VZ_NP  * mpar[0][20] / 100 ) , 2 )
    else:
        NPpod = 0.0
    
    if (mud[0][30] == 'A'):
        DPspod = roundown( (VZ_DPs * mpar[0][21] / 100 ) , 2 )
        DPipod = roundown( (VZ_DPi * mpar[0][22] / 100 ) , 2 )
    else:
        DPspod = 0.0
        DPipod = 0.0
        
    if (mud[0][31] == 'A'):
        PvNpod = roundown( (VZ_PvN * mpar[0][23] / 100 ) , 2 )
    else:
        PvNpod = 0.0

    # ak student alebo dochodca do 200eur,tak neplati zamestnavatel 
    GPpod  = roundown( (VZ_GP * mpar[0][24] / 100 ) , 2 )   ## !!! zaokruhlenie nadol?
    RFpod  = roundown( (VZ_RF * mpar[0][25] / 100 ) , 2 )
    UPpod  = roundown( (VZ_UP * mpar[0][26] / 100 ) , 2 )
    
    # zapis odvodov do vektora v
    v[151] = v[151] + ZPzam
    v[152] = v[152] + NPzam
    v[153] = v[153] + DPszam
    v[154] = v[154] + DPizam
    v[155] = v[155] + PvNzam
    v[161] = v[161] + ZPpod 
    v[162] = v[162] + NPpod
    v[163] = v[163] + DPspod
    v[164] = v[164] + DPipod
    v[165] = v[165] + PvNpod
    v[166] = v[166] + GPpod
    v[167] = v[167] + RFpod
    v[168] = v[168] + UPpod
    v[171] = VZ_ZP; v[172] = VZ_NP; v[173] = VZ_DPs; v[174] = VZ_DPi; v[175] = VZ_PvN; v[176] = VZ_GP ; v[177] = VZ_RF; v[178] = VZ_UP                 

# vypocet odvodov end   #########################################################################################

# dane start   ##################################################################################################
    # Zakl.dane 181  Nezd.Cast 182  Uprava zakl.DDS 183  Uprava zakl.ZS 184  Uprava zakl.AUTO 185 Ine 186
    # Dan mes.  190  Dan roc.  191  Oprava z min.r. 192  Rozd. z r.zuc. 193  Dan.bonus 194
    # !!! doplnit napocitanie odpoctov s_zivpoist, s_dds, s_auto, a_odpocetost
    # dan sa zaokruhluje na najblizsi eurocent nadol
        
    if (p_deti_do6>0):
        s_danbonus = s_danbonus + mpar[0][53] * p_deti_od6 / 12 
    if (p_deti_od6>0):  
        s_danbonus = s_danbonus + mpar[0][54] * p_deti_od6 / 12  #!!! od 1.4.2019 deti do 6 r. dvojnas. bonus | rocny dan.bonus z mpar / 12 * pocet deti z mud
        
    if ( mud[0][22] == 'A'):                            # ak si uplatnuje nezd.cast zakl.dane mesacnu
        s_nezdcastzdane = mpar[0][51]                   ###!!!!! overit ?????????
    else: 
        s_nezdcastzdane = 0.0
    
    s_ciast_zaklad_dane1 = get_msk_suma( 100 , 9 , v )  # napocet podla mmsk
    s_ciast_zaklad_dane = round(s_ciast_zaklad_dane1 - s_nezdcastzdane - s_zivpoist - s_dds + s_auto + s_odpocetost,2)

    if (s_ciast_zaklad_dane<0.0):
        s_ciast_zaklad_dane=0.0
        
    ## rozdelenie na 19% dan a 25% dan - ak je nczd > ako 176.8 nasobok ziv.minima / 12
    hranica = round( mpar[0][69] * mpar[0][41] / 12 , 2 )
    
    if ( s_ciast_zaklad_dane > hranica ):
    
        s_czd1 = hranica
        s_czd2 = round(s_ciast_zaklad_dane - hranica,2)
        
    else:
        s_czd1 = s_ciast_zaklad_dane
        s_czd2 = 0.0
         
    s_dan_mes = roundown(( s_czd1  * mpar[0][44] / 100  + s_czd2  *  mpar[0][45] / 100 ) , 2)
    print('s_ciast_zaklad_dane:',s_ciast_zaklad_dane)  

    if (s_dan_mes < 0 ):
        s_dan_mes = 0.0 
    
    # print('Nezd.c., ciast.z.dane, dane_mes, %dane:, hranica', s_nezdcastzdane, s_ciast_zaklad_dane, s_dan_mes, mpar[0][44], hranica )
    
    # zapis dane do vektora v
    v[181] = s_ciast_zaklad_dane   
    v[182] = s_nezdcastzdane            ## !!!!! chyba ?????????? overit
    v[183] = v[183] + s_dds
    v[184] = v[184] + s_zivpoist
    v[185] = v[185] + s_auto
    v[186] = v[186] + s_odpocetost
    
    v[190] = v[190] + s_dan_mes
    v[191] = v[191] + s_dan_roc
    v[192] = v[192] + s_opravadaneminr
    v[193] = v[193] + s_rozdielzrch
    v[194] = v[194] + s_danbonus
# dane END     #########################################################################################
# zrazky START
    # doplnit spracovanie kodov zrazok
    
    s_vyplata = get_msk_suma ( 100 , 111 , v )  # na ucet
    
    if ( l_vyplata == 'B' ):
        v[210] = s_vyplata
    if ( l_vyplata == 'H' ):
        v[211] = s_vyplata  # do sacku
    if ( l_vyplata == 'P' ):
        v[212] = s_vyplata  # postou
# zrazky END   #########################################################################################

    zapis_mvy( pid, pdat, v) # uloz vypocitane udaje do databazy
    
    return 1


