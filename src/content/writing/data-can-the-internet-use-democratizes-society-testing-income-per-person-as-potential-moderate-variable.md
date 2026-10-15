---
title: Can the Internet use democratizes society? Testing Income per person as Potential Moderate variable.
date: '2015-12-28'
lang: en
description: 'Original Question: Can the Internet use democratizes society? Original hypothesis: I am convinced, a deep democracy promotes the welfare of all people actively involved in the democratic process. Some years ago while…'
series: data-analysis
originalUrl: https://arpagondata.tumblr.com/post/136086466027/can-the-internet-use-democratizes
---

**Original Question:** Can the Internet use democratizes society?  
****Original** hypothesis:** I am convinced, a deep democracy promotes the welfare of all people actively involved in the democratic process. Some years ago while reading the book **[Why Nations Fail](https://books.google.com.co/books?id=yIV_NMDDIvYC&printsec=frontcover&dq=Why+Nations+Fail&hl=es-419&sa=X&redir_esc=y#v=onepage&q=Why%20Nations%20Fail&f=false).** Suggested the deep relationship between poverty and lawlessness in the building of democratic institutions.

**Moderate Question:** the income per person variable moderate the relationship by Internetuserate whit Poltic Score?

## **Code: **

``` text
#!/usr/bin/env python
# vim: set fileencoding=utf-8 :
# -*- coding: utf-8 -*-
#
#       week4.py
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
Perform  analysis of variance for variables internetuserate, polityscore
urbanrate, incomeperperson.

On dataset of gapminder
"""

__version__ = "0.0.1"
__license__ = """The GNU General Public License (GPL-2.0)"""
__author__ = "Sebastian Rojo  @arpagon"
__contributors__ = []
_debug = 0

_question="Can the Internet use democratizes society?"
_hypothesis='''
I am convinced, a deep democracy promotes the welfare of all people actively 
involved in the democratic process. Some years ago while reading the book 
Why Nations Fail. Suggested the deep relationship between poverty and 
lawlessness in the building of democratic institutions.
'''

import pandas
import numpy
import seaborn as sns
import scipy
import matplotlib.pyplot as plt

data = pandas.read_csv("../gapminder.csv", low_memory=False)

print('Dataset gapminder \n')

print('Obeservations:', len(data)) #number of observations (rows)
print('Variables:', len(data.columns)) # number of variables (columns)

print('\n\nVariables chosen for the study are: internetuserate, polityscore')
print('Additional variables for the assignment: urbanrate, incomeperperson')

#internetuserate
data['internetuserate'] = data['internetuserate'].convert_objects(
                                                        convert_numeric=True)
data['polityscore'] = data['polityscore'].convert_objects(
                                                        convert_numeric=True)

data['incomeperperson'] = data['incomeperperson'].convert_objects(
                                                        convert_numeric=True)
                                                    

data['internetuserate']=data['internetuserate'].replace(' ', numpy.nan)
data['polityscore']=data['polityscore'].replace(' ', numpy.nan)
data['incomeperperson']=data['incomeperperson'].replace(' ', numpy.nan)


sub1=data[['country','internetuserate', 'polityscore','incomeperperson']].dropna()

data_potential_moderator = sub1.copy()

#basic scatterplot:  Q->Q
plt.figure()
scat1 = sns.regplot(x="internetuserate", y="polityscore", data=data_potential_moderator)
plt.xlabel('Internet Use Rate')
plt.ylabel('Overall polity score')
plt.title('Scatterplot for the Association Between Internet Use Rate and' \
                                                        'Overall polity score')
plt.show()
plt.close()

print ('association between internetuserat and polityscore')
print (scipy.stats.pearsonr(data_potential_moderator['internetuserate'], data_potential_moderator['polityscore']))

#%% Incomperson as Potential Modarator

def incomegrp (row):
   if row['incomeperperson'] <= 744.239:
      return 1
   elif row['incomeperperson'] <= 9425.326 :
      return 2
   elif row['incomeperperson'] > 9425.326:
      return 3
   
data_potential_moderator['incomegrp'] = data_potential_moderator.apply (lambda row: incomegrp (row),axis=1)

chk1 = data_potential_moderator['incomegrp'].value_counts(sort=False, dropna=False)
print("Income Groups 1 = LOW INCOME, 2 = MEDIUM INCOME, 3=HIGT INCOME")
print(chk1)

sub1=data_potential_moderator[(data_potential_moderator['incomegrp']== 1)]
sub2=data_potential_moderator[(data_potential_moderator['incomegrp']== 2)]
sub3=data_potential_moderator[(data_potential_moderator['incomegrp']== 3)]

#%% LOW Incomperson as Potential Modarator
plt.figure()

scat1 = sns.regplot(x="internetuserate", y="polityscore", data=sub1)
plt.xlabel('Urban Rate')
plt.ylabel('Internet Use Rate')
plt.title('Scatterplot for the Association Between Internet Use Rate and Politic Score for LOW income countries')

plt.show()
plt.close()

print ('association between urbanrate and internetuserate for LOW income countries')
print (scipy.stats.pearsonr(sub1['internetuserate'], sub1['polityscore']))

#%% Middle Incomperson as Potential Modarator
plt.figure()

scat2 = sns.regplot(x="internetuserate", y="polityscore", data=sub2)
plt.xlabel('Internet Use Rate')
plt.ylabel('Politic Score')
plt.title('Scatterplot for the Association Between Internet Use Rate and Politic Score for MIDDLE income countries')

plt.show()
plt.close()

print ('association between urbanrate and internetuserate for MIDDLE income countries')
print (scipy.stats.pearsonr(sub2['internetuserate'], sub2['polityscore']))

#%% High Incomperson as Potential Modarator
plt.figure()

scat3 = sns.regplot(x="internetuserate", y="polityscore", data=sub3)
plt.xlabel('Internet Use Rate')
plt.ylabel('Politic Score')
plt.title('Scatterplot for the Association Between Internet Use Rate and Politic Score for HIGH income countries')

plt.show()
plt.close()

print ('association between urbanrate and internetuserate for HIGH income countries')
print (scipy.stats.pearsonr(sub3['internetuserate'], sub3['polityscore']))
```

## **Result:**

``` text

runfile('/home/arpagon/Workspace/DataAnalysisSpecialization/src/Data Analysis Tools/week4.py', wdir='/home/arpagon/Workspace/DataAnalysisSpecialization/src/Data Analysis Tools')
Dataset gapminder 

Obeservations: 213
Variables: 16


Variables chosen for the study are: internetuserate, polityscore
Additional variables for the assignment: urbanrate, incomeperperson

￼
association between internetuserat and polityscore
(0.36793963434864463, 2.8821795590767532e-06)
Income Groups 1 = LOW INCOME, 2 = MEDIUM INCOME, 3=HIGT INCOME
1    45
2    76
3    32
dtype: int64

￼
association between urbanrate and internetuserate for LOW income countries
(0.06563803599695886, 0.66837059684015609)

￼
association between urbanrate and internetuserate for MIDDLE income countries
(0.31325899553182263, 0.0058622755653961051)

￼
association between urbanrate and internetuserate for HIGH income countries
(0.075925075001272269, 0.67960207113372362)


```

## **Scatter Plots:**

<figure>
<img src="/media/writing/52c2bd1459ef7ea5.webp" loading="lazy" alt="Figure from the original article" />
</figure>

<figure>
<img src="/media/writing/0d310bb433131701.webp" loading="lazy" alt="Figure from the original article" />
</figure>

<figure>
<img src="/media/writing/5af121abe1ae3e1a.webp" loading="lazy" alt="Figure from the original article" />
</figure>

<figure>
<img src="/media/writing/fa05a5b1d17e5fed.webp" loading="lazy" alt="Figure from the original article" />
</figure>

## **Analysis:**

Ok….. in the Correlation Analysis result as very weak  relation in the Polity Score Whit Internet Use In Goups of countrys whit LOW and HIGH Income per person.  
  
In the MIDDLE Group has weak positive relation a coefficient of and **0.31** a p-value of 0.005. We conclude that the correlation is statistically significant.

**R=0.31**

Finally calculating the squared correlation coefficient (r2), we obtain the degree of variability of the variables that explain (or predict) the other.

**R²=0,0961**

In our case, the coefficient is equal to r2 = 0.1296. In other words, if we know the value of Politc Score, we can predict 9% of the variability we will see in Internet Use or we can not explain the other 91% of variability.
