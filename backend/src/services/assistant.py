import math
######################################################################################
# funkcia poc_dni_vmes1 ( pdat : str ) - vrati pocet dni v mesiaci 
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
# funkcia eom( pdat : str ) - vrati datum konca mesiaca
######################################################################################
def eom( pdat ):
    rok = pdat[:4]
    mes = pdat[5:7]
    
    ret = str(rok)+'-'+str(mes)+'-'+str(poc_dni_vmes1(pdat))
    return ret


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
# funkcia day( pdat : str ) - vrati cislo dna v mesiaci
######################################################################################
def day( pdat ):
    rok = pdat[:4]
    mes = pdat[5:7]
    den = pdat[8:10]
    
    return den