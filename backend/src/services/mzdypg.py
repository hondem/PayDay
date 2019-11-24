#!/usr/bin/python
# -*- encoding: utf-8 -*-
import calendar
import datetime
import time
#from datetime import datetime
import subprocess
import os
import mzdhpg
import psycopg2


# print format(cislo_float,'.2f') - formatovany vystup na 2 des.miesta
db='alfa.sqlite'
pdb='./db/'
pbackup='./backup/'
pzos='.'
pdef='./sqldefs/'
fdb=pdb+db
nl='\n'

# 'STAV'  # S-slob.,Z-zen./vyd.,R-rozv.,V-vdova

################### main ##########################

obdobie = '2019-05-01'
rok_akt = int(obdobie[:4])
mes_akt = int(obdobie[5:7])
den_akt = int(obdobie[9:11])
obdobiepg = datetime.date( rok_akt , mes_akt , den_akt )
obdobiepg1 = psycopg2.Date( rok_akt, mes_akt, den_akt)
osc=1
kal=1

while True:
   os.system('clear');
   print ('*************************************************************************')
   print ('******              S P R A C O V A N I E  M I E Z D                *****')
   print ('*************************************************************************')
   print ('* Aktualne obdobie:', rok_akt, '/', mes_akt, '/', den_akt)
   print ('* Aktualne osc    :', osc)
   print ('')
   print (' MENU 1. vyber osc')
   print ('      2. prepocitaj mzdu')
   print ('      3. tlac') 
   print ('      4. tlac vektora')
   print ('      5. test funkcie get_priemd')
   print ('      6. test funkcie')
   print ('      7. Nastavenia')
   print ('      8. zaloha db')
   print ('      9. test ')
   print ('      0. koniec')
   #print (obdobiepg,obdobiepg1)
   volba=int(input('Zahaj volbu:'))

   if   volba == 1:
        osc = mzdhpg.vyber_osc(osc)

   elif volba == 2:
        ret = mzdhpg.vypocet( osc , obdobie ) 
        if ret == 1:
            print ('Vypocet ok.')
        else: 
            print ('Vypocet zlyhal. Chyba:', ret)
        volba2 = input()

   elif volba == 3:
        print ('MENU 3.1. Tlac mzdovy listok        ')
        print ('     3.2. Tlac rekapitulacia   ')
        print ('     3.3. Tlac prikaz na uhradu     ')
        print ('     3.4. Tlac                      ')
        volba7 = int(input('Zadaj volbu podmenu 7:'))

        if volba7 == 1:
            ret = mzdhpg.tlac_mzdu( osc , obdobie , pzos + 'mzdlistok.txt' ) 
            os.system('enscript -p ' + pzos + 'mzdlistok.ps ' + pzos + 'mzdlistok.txt' )
            os.system('ps2pdf '+pzos+'mzdlistok.ps '+pzos+'mzdlistok.pdf' )
            os.system('evince ' + pzos + 'mzdlistok.pdf')
        if volba7 == 2:
            ret = mzdhpg.tlac_rekapitulaciu( obdobie , pzos + 'rekapitul' )
            os.system('evince ' + pzos + 'rekapitul.pdf')            
        if volba7 == 3:
            ret = mzdhpg.tlac_prikaz( obdobie , pzos + 'prikaz' )
            os.system('evince ' + pzos + 'prikaz.pdf')

        if ret == 1:
            print ('Tlac ok.')
        else: 
            print ('Tlac zlyhala. Chyba:', ret)

   elif volba == 4:
        ret = mzdhpg.vytlac_vektor( osc , obdobie ) 
        if ret == 1:
            print ('Tlac ok.')
        else: 
            print ('Tlac zlyhala. Chyba:', ret)


   elif volba == 5:
        ret = mzdhpg.get_priemd( osc , obdobie ) 
        print ('Vysledok priemer d:', ret)

        ret = mzdhpg.get_priemn( osc , obdobie ) 
        print ('Vysledok priemer d:', ret)

        volba5 = input()

   elif volba == 6:
        ret = mzdhpg.adddate(obdobie,-4,0,0 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,-12,-2 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,3,-3,-3 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,4,-10,-4 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,1,-5 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,2,-6 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,3,-7 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,4,-8 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,10,-9 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,11,-10) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,12,-11) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,1,0,-12) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,2,0,-13) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,3,0,-14) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,4,0,-15) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,-1,0,-16) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,-2,0,-17) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,-3,0,-18) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,-4,0,-19) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,-4,-12,-20) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,2,200,-21 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,0,-22 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,0,-23 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,0,-24 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,0,-25 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,0,-26 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,0,-27 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,0,-28 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,0,-29 ) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,0,-30) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,0,-31) 
        print(ret)
        ret = mzdhpg.adddate(obdobie,0,0,-32) 
        print(ret)
        volba6 = input()

   elif volba == 7: 
        print ('MENU 7.1. Nastavenie parametrov MZDY')
        print ('     7.2. Zobraz parametre MZDY')
        print ('     7.3. Nastavenie kalendara sviatkov')
        print ('     7.4. Generovanie prac.kalendara')
        volba7 = int(input('Zadaj volbu podmenu 7:'))

        if volba7 == 2:
            mzdhpg.zobraz_param(obdobie)
        if volba7 == 3:
            mzdhpg.zobraz_sviatky(rok_akt)
        if volba7 == 4:
            mzdhpg.zadaj_rok_kal()

   elif volba == 8:
        print ('Zalohovanie ...')
        from datetime import datetime
        pomdat = str(datetime.now())

        cmd =  'cp '+pdb+db+' '+pbackup
        p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT) ##os.system(cmd)
        cmd = 'mv '+pbackup+db+' '+pbackup+db+'.'+pomdat[:10]+'-'+pomdat[11:19]
        p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT) ##os.system(cmd)
        print ('Zaloha vytvorena ! datum a cas:'+pomdat+'')
        
   elif volba == 9:
        # sql = 'select * from m.osoba where id=1'
        # mzdhpg.runpsql(sql)
        # a = mzdhpg.get_fpd( obdobie, 1 )
        print('volba 9')
            
   elif volba == 0:
            break
