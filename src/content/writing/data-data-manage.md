---
title: Data Manage
date: '2015-11-16'
lang: en
description: 'Ok… for this leasson from data analisys use the data manage Code: #!/usr/bin/env python2.6 # vim: set fileencoding=utf-8 : # -*- coding: utf-8 -*- # # week2.py # Copyright 2015 arpagon # # This program is free…'
series: data-analysis
originalUrl: https://arpagondata.tumblr.com/post/133320870922/data-manage
---

Ok… for this leasson from data analisys use the data manage

**Code:**  

``` text
#!/usr/bin/env python2.6
# vim: set fileencoding=utf-8 :
# -*- coding: utf-8 -*-
#
#       week2.py
#       Copyright 2015 arpagon 
#       
#       This program is free software; you can redistribute it and/or modify
#       it under the terms of the GNU General Public License as published by
#       the Free Software Foundation; either version 2 of the License, or
#       (at your option) any later version.
#       
#       This program is distributed in the hope that it will be useful,
#       but WITHOUT ANY WARRANTY; without even the implied warranty of
#       MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#       GNU General Public License for more details.
#       
#       You should have received a copy of the GNU General Public License
#       along with this program; if not, write to the Free Software
#       Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#       MA 02110-1301, USA.

"""
Examine frequency distributions, for variables internetuserate, polityscore
urbanrate, incomeperperson.

On dataset of gapminder
"""

__version__ = "0.0.1"
__license__ = """The GNU General Public License (GPL-2.0)"""
__author__ = "Sebastian Rojo  @arpagon"
__contributors__ = []
_debug = 0


import pandas
import numpy

data = pandas.read_csv("gapminder.csv", low_memory=False)

print('Dataset gapminder \n')

print('Obeservations:', len(data)) #number of observations (rows)
print('Variables:', len(data.columns)) # number of variables (columns)

print('\n\nVariables chosen for the study are: internetuserate, polityscore')
print('Additional variables for the assignment: urbanrate, incomeperperson')

#internetuserate
data['internetuserate'] = data['internetuserate'].convert_objects(
                                                        convert_numeric=True)

sub1=data[['country','internetuserate', 'polityscore', 'urbanrate', 'incomeperperson']]

data_manage = sub1.copy()

# quartile split (use qcut function & ask for 4 groups - gives you quartile split)
print('intusegroup4 - 10 categories - 0 low use, 10 is massive use')
data_manage['intusegroup4']=pandas.cut(data_manage.internetuserate, [0, 10 , 20 , 30, 40, 50, 60, 70 , 80, 90, 100])

print('\n==Counts for internetuserate - grouped as intusegroup4 ==')
print('Internet users (per 100 people) Internet users are people with access\n' 
      'to the worldwide network.')
      
intusegroup4_count = data_manage['intusegroup4'].value_counts(sort=False)
print (intusegroup4_count)

print('\n==Percentages for internetuserate grouped as intusegroup4 ==')
print('''Internet users (per 100 people) Internet users are people with access 
to the worldwide network.''')
intusegroup4_percent = data_manage['intusegroup4'].value_counts(sort=False, normalize=True)
print (intusegroup4_percent)

#polityscore
data['polityscore'] = data['polityscore'].convert_objects(
                                                        convert_numeric=True)

print('\n==Counts for polityscore==')
print('''Overall polity score from the Polity IV dataset, calculated by
subtracting an autocracy score from a democracy score. The summary
measure of a country's democratic and free nature. -10 is the lowest
value, 10 the highest.''')
      
polityscore_count = data['polityscore'].value_counts(sort=False)
print (polityscore_count)

print('\n==Percentages for polityscore==')
print('''Overall polity score from the Polity IV dataset, calculated by
subtracting an autocracy score from a democracy score. The summary
measure of a country's democratic and free nature. -10 is the lowest
value, 10 the highest.''')

polityscore_percent = data['polityscore'].value_counts(sort=False, normalize=True)
print (polityscore_percent)

#urbanrate
data_manage['urbanrate'] = data_manage['urbanrate'].convert_objects(
                                                        convert_numeric=True)

# quartile split (use qcut function & ask for 4 groups - gives you quartile split)
print('urbanrategroup10 - 10 categories - 0 low urban rate, 10 is massive urban rate')
data_manage['urbanrategroup10']=pandas.cut(data_manage.urbanrate, [0, 10 , 20 , 30, 40, 50, 60, 70 , 80, 90, 100])

print('\n==Counts for urbanrategroup10==')
print('''Urban population refers to people living in urban areas as defined by
national statistical offices (calculated using World Bank population
estimates and urban ratios from the United Nations World Urbanization
Prospects)
10 categories - 0 low urban rate, 10 is massive urban rate''')
      
urbanrategroup10_count = data_manage['urbanrategroup10'].value_counts(sort=False)
print(urbanrategroup10_count)

print('\n==Percentages for urbanrategroup10==')
print('''Urban population refers to people living in urban areas as defined by
national statistical offices (calculated using World Bank population
estimates and urban ratios from the United Nations World Urbanization
Prospects)''')

urbanrategroup10_percent = data_manage['urbanrategroup10'].value_counts(sort=False, normalize=True)
print (urbanrategroup10_percent)

#incomeperperson
data_manage['incomeperperson'] = data_manage['incomeperperson'].convert_objects(
                                                        convert_numeric=True)

print('incomeperpersongroup10 - 10 categories by quantiles - 0 low incomeperperson, 10 is massive incomeperperson')
data_manage['incomeperpersongroup10']=pandas.qcut(data_manage.urbanrate, 10, labels=[0, 1, 2 , 3 , 4, 5, 6, 7, 8 , 9])


print('\n==Counts for incomeperpersongroup10==')
print('''Gross Domestic Product per capita in constant 2000 US$.
The inflation but not the differences in the cost of living between countries
has been taken into account.''')
      
incomeperpersongroup10_count = data_manage['incomeperpersongroup10'].value_counts(sort=False)
print(incomeperpersongroup10_count)

print('\n==Percentages for incomeperperson==')
print('''Gross Domestic Product per capita in constant 2000 US$.
The inflation but not the differences in the cost of living between countries
has been taken into account.''')

incomeperpersongroup10_percent = data_manage['incomeperpersongroup10'].value_counts(sort=False, normalize=True)
print (incomeperpersongroup10_percent)
```

**Result:**

``` text

runfile('/home/arpagon/Workspace/DataAnalysisSpecialization/src/week3.py', wdir='/home/arpagon/Workspace/DataAnalysisSpecialization/src')
Dataset gapminder 

Obeservations: 213
Variables: 16


Variables chosen for the study are: internetuserate, polityscore
Additional variables for the assignment: urbanrate, incomeperperson
intusegroup4 - 10 categories - 0 low use, 10 is massive use

==Counts for internetuserate - grouped as intusegroup4 ==
Internet users (per 100 people) Internet users are people with access
to the worldwide network.
(0, 10]      49
(10, 20]     27
(20, 30]     17
(30, 40]     18
(40, 50]     25
(50, 60]      9
(60, 70]     14
(70, 80]     16
(80, 90]     12
(90, 100]     5
dtype: int64

==Percentages for internetuserate grouped as intusegroup4 ==
Internet users (per 100 people) Internet users are people with access 
to the worldwide network.
(0, 10]      0.230047
(10, 20]     0.126761
(20, 30]     0.079812
(30, 40]     0.084507
(40, 50]     0.117371
(50, 60]     0.042254
(60, 70]     0.065728
(70, 80]     0.075117
(80, 90]     0.056338
(90, 100]    0.023474
dtype: float64

==Counts for polityscore==
Overall polity score from the Polity IV dataset, calculated by
subtracting an autocracy score from a democracy score. The summary
measure of a country's democratic and free nature. -10 is the lowest
value, 10 the highest.
 0      6
 1      3
 2      3
 3      2
 4      4
 5      7
 6     10
 7     13
 8     19
 9     15
 10    33
-1      4
-10     2
-9      4
-8      2
-7     12
-6      3
-5      2
-4      6
-3      6
-2      5
dtype: int64

==Percentages for polityscore==
Overall polity score from the Polity IV dataset, calculated by
subtracting an autocracy score from a democracy score. The summary
measure of a country's democratic and free nature. -10 is the lowest
value, 10 the highest.
 0     0.028169
 1     0.014085
 2     0.014085
 3     0.009390
 4     0.018779
 5     0.032864
 6     0.046948
 7     0.061033
 8     0.089202
 9     0.070423
 10    0.154930
-1     0.018779
-10    0.009390
-9     0.018779
-8     0.009390
-7     0.056338
-6     0.014085
-5     0.009390
-4     0.028169
-3     0.028169
-2     0.023474
dtype: float64
urbanrategroup10 - 10 categories - 0 low urban rate, 10 is massive urban rate

==Counts for urbanrategroup10==
Urban population refers to people living in urban areas as defined by
national statistical offices (calculated using World Bank population
estimates and urban ratios from the United Nations World Urbanization
Prospects)
10 categories - 0 low urban rate, 10 is massive urban rate
(0, 10]       0
(10, 20]     13
(20, 30]     22
(30, 40]     24
(40, 50]     22
(50, 60]     24
(60, 70]     34
(70, 80]     24
(80, 90]     21
(90, 100]    19
dtype: int64

==Percentages for urbanrategroup10==
Urban population refers to people living in urban areas as defined by
national statistical offices (calculated using World Bank population
estimates and urban ratios from the United Nations World Urbanization
Prospects)
(0, 10]      0.000000
(10, 20]     0.061033
(20, 30]     0.103286
(30, 40]     0.112676
(40, 50]     0.103286
(50, 60]     0.112676
(60, 70]     0.159624
(70, 80]     0.112676
(80, 90]     0.098592
(90, 100]    0.089202
dtype: float64
incomeperpersongroup10 - 10 categories by quantiles - 0 low incomeperperson, 10 is massive incomeperperson

==Counts for incomeperpersongroup10==
Gross Domestic Product per capita in constant 2000 US$.
The inflation but not the differences in the cost of living between countries
has been taken into account.
0    21
1    20
2    20
3    20
4    21
5    20
6    20
7    20
8    20
9    21
dtype: int64

==Percentages for incomeperperson==
Gross Domestic Product per capita in constant 2000 US$.
The inflation but not the differences in the cost of living between countries
has been taken into account.
0    0.098592
1    0.093897
2    0.093897
3    0.093897
4    0.098592
5    0.093897
6    0.093897
7    0.093897
8    0.093897
9    0.098592
dtype: float64


```

**Conclusion/analysis:**

I collapsed the responses for urbanrate, internetuse. to show 10 categories represent the percentage of urban rate and internet use. Use 10 categories for incomeperperson dividen in qunatiles. and set NaN for Politicscore to create three new variables.   
  
Is incredible too see 23% of countries have internet use in the lowes rate. 0-10
