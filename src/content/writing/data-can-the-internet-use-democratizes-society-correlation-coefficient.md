---
title: Can the Internet use democratizes society? Correlation Coefficient
date: '2015-12-22'
lang: en
description: '3Question: Can the Internet use democratizes society? hypothesis: I am convinced, a deep democracy promotes the welfare of all people actively involved in the democratic process. Some years ago while reading the book…'
series: data-analysis
originalUrl: https://arpagondata.tumblr.com/post/135681979137/can-the-internet-use-democratizes-society
---

3**Question:** Can the Internet use democratizes society?  
**hypothesis:** I am convinced, a deep democracy promotes the welfare of all people actively involved in the democratic process. Some years ago while reading the book **[Why Nations Fail](https://books.google.com.co/books?id=yIV_NMDDIvYC&printsec=frontcover&dq=Why+Nations+Fail&hl=es-419&sa=X&redir_esc=y#v=onepage&q=Why%20Nations%20Fail&f=false).** Suggested the deep relationship between poverty and lawlessness in the building of democratic institutions.

## **Code:**

``` text
#!/usr/bin/env python
# vim: set fileencoding=utf-8 :
# -*- coding: utf-8 -*-
#
#       week3.py
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

data['urbanrate'] = data['urbanrate'].convert_objects(
                                                        convert_numeric=True)

data['internetuserate']=data['internetuserate'].replace(' ', numpy.nan)
data['urbanrate']=data['urbanrate'].replace(' ', numpy.nan)
data['polityscore']=data['polityscore'].replace(' ', numpy.nan)




sub1=data[['country','internetuserate', 'polityscore','urbanrate']].dropna()

data_variance = sub1.copy()

#basic scatterplot:  Q->Q
plt.figure()
scat1 = sns.regplot(x="internetuserate", y="polityscore", data=data_variance)
plt.xlabel('Internet Use Rate')
plt.ylabel('Overall polity score')
plt.title('Scatterplot for the Association Between Internet Use Rate and' \
                                                        'Overall polity score')
plt.show()
plt.close()

data_clean=data_variance.dropna()

print ('association between urbanrate and internetuserate')
print (scipy.stats.pearsonr(data_clean['internetuserate'], data_clean['polityscore']))


#basic scatterplot:  Q->Q
plt.figure()
scat1 = sns.regplot(x="urbanrate", y="polityscore", data=data_variance)
plt.xlabel('Urban Rate')
plt.ylabel('Overall polity score')
plt.title('Scatterplot for the Association Between Urban Rate and' \
                                                        'Overall polity score')
plt.show()
plt.close()

data_clean=data_variance.dropna()

print ('association between urbanrate and polityscore')
print (scipy.stats.pearsonr(data_clean['urbanrate'], data_clean['polityscore']))

```

## **Result:**

``` text
In [6]: runfile('/home/arpagon/Workspace/DataAnalysisSpecialization/src/Data Analysis Tools/week3.py', wdir='/home/arpagon/Workspace/DataAnalysisSpecialization/src/Data Analysis Tools')
Dataset gapminder 

Obeservations: 213
Variables: 16


Variables chosen for the study are: internetuserate, polityscore
Additional variables for the assignment: urbanrate, incomeperperson

￼
association between urbanrate and internetuserate
(0.36438422712027008, 3.1453595920263592e-06)

￼
association between urbanrate and polityscore
(0.36438422712027008, 3.1453595920263592e-06)

In [7]: 
```

**scatter plots:**

<figure>
<img src="/media/writing/dce61d4dd2a503cf.webp" loading="lazy" alt="image" />
</figure>

##  

<figure>
<img src="/media/writing/a4015033321dece7.webp" loading="lazy" alt="image" />
</figure>

## **Analysis:**

*Internet Use \<-\> Potity Score*

  

The Pearson correlation chart indicates that the  relationship between INCOMEPERPERSON and LIFEEXPECTANCY, has a coefficient of 0.60  

We conclude that the correlation is statistically significant.

  
In our case, the coefficient is equal to r2 (0.60152 \* 0.60152) = 0.3618. In other words, if we know the value of INCOMEPERPERSON, we can predict 36% of the variability we will see in LIFEEXPECTANCY, or we can not explain the other 64% of variability.

Ok….. in the Correlation Analysis result as weak positive relation in the Polity Score Whit Internet Use. has a coefficient of and **0.36** a p-value of 0.001. We conclude that the correlation is statistically significant.

**R=0.36**

Finally calculating the squared correlation coefficient (r2), we obtain the degree of variability of the variables that explain (or predict) the other.

**R²=0,1296**

In our case, the coefficient is equal to r2 = 0.1296. In other words, if we know the value of Politc Score, we can predict 12% of the variability we will see in Internet Use or we can not explain the other 87% of variability.

*(Aditional Test ) Urban Rate \<-\> Potity Score*

Correlation Analysis result as week positive relation in the Polity Score Whit Internet Use.

**R=0.16**

**R²=0,0256**
