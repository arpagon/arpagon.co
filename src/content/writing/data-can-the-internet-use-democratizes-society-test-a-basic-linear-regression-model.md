---
title: Can the Internet use democratizes society? Test a Basic Linear Regression Model
date: '2016-01-18'
lang: en
description: 'Question: Can the Internet use democratizes society? hypothesis: I am convinced, a deep democracy promotes the welfare of all people actively involved in the democratic process. Some years ago while reading the book…'
series: data-analysis
originalUrl: https://arpagondata.tumblr.com/post/137523884277/can-the-internet-use-democratizes-society-test-a
---

**Question:** Can the Internet use democratizes society?  
**hypothesis:** I am convinced, a deep democracy promotes the welfare of all people actively involved in the democratic process. Some years ago while reading the book **[Why Nations Fail](https://books.google.com.co/books?id=yIV_NMDDIvYC&printsec=frontcover&dq=Why+Nations+Fail&hl=es-419&sa=X&redir_esc=y#v=onepage&q=Why%20Nations%20Fail&f=false).** Suggested the deep relationship between poverty and lawlessness in the building of democratic institutions

## Code:

``` text
#!/usr/bin/env python
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
Test a Basic Linear Regression Model
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
import statsmodels.api
import statsmodels.formula.api as smf


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
                                                    

data['internetuserate']=data['internetuserate'].replace(' ', numpy.nan)
data['polityscore']=data['polityscore'].replace(' ', numpy.nan)


sub1=data[['country','internetuserate', 'polityscore']].dropna()

#basic scatterplot:  Q->Q
plt.figure()
scat1 = sns.regplot(x="internetuserate", y="polityscore", data=sub1)
plt.xlabel('Internet Use Rate')
plt.ylabel('Overall polity score')
plt.title('Scatterplot for the Association Between Internet Use Rate and' \
                                                        'Overall polity score')
plt.show()
plt.close()

#Univariate histogram for quantitative variable:
plt.figure()
sns.distplot(sub1["internetuserate"].dropna(), kde=False);
plt.xlabel('Internet users (per 100 people)')
plt.title('Histogram of internetuser in the gapminder')
plt.show()
plt.close()

#%% Center explanatory variable
data_prepare = sub1.copy()

mean_internetuserate=data_prepare['internetuserate'].mean()
print(mean_internetuserate)

data_prepare['internetuseratecenter'] = data_prepare['internetuserate'] - mean_internetuserate

mean_internetuserate_center=data_prepare['internetuseratecenter'].mean()
print(mean_internetuserate_center)

#basic scatterplot:  Q->Q
plt.figure()
scat1 = sns.regplot(x="internetuseratecenter", y="polityscore", 
                                                             data=data_prepare)
plt.xlabel('Internet Use Rate center')
plt.ylabel('Overall polity score')
plt.title('Scatterplot for the Association Between Internet Use Rate Center '  
                                                        'Overall polity score')
plt.show()
plt.close()

#Univariate histogram for quantitative variable:
plt.figure()
sns.distplot(data_prepare["internetuseratecenter"].dropna(), kde=False);
plt.xlabel('Internet users (per 100 people)')
plt.title('Histogram of internetuser in the gapminder')
plt.show()
plt.close()


#%% Test a linear regression model and summarize 

print ("OLS regression model for the association between urban rate and internet use rate")
reg1 = smf.ols('internetuseratecenter ~ polityscore', data=data_prepare).fit()
print (reg1.summary())

```

## Result:

``` text

runfile('/home/arpagon/Workspace/DataAnalysisSpecialization/src/Regression Modeling in Practice/week2.py', wdir='/home/arpagon/Workspace/DataAnalysisSpecialization/src/Regression Modeling in Practice')
Dataset gapminder 

Obeservations: 213
Variables: 16


Variables chosen for the study are: internetuserate, polityscore
Additional variables for the assignment: urbanrate, incomeperperson

￼

￼
32.530946372
-1.36149156465e-14

￼

￼
OLS regression model for the association between urban rate and internet use rate
                              OLS Regression Results                             
=================================================================================
Dep. Variable:     internetuseratecenter   R-squared:                       0.133
Model:                               OLS   Adj. R-squared:                  0.127
Method:                    Least Squares   F-statistic:                     23.42
Date:                   Sun, 17 Jan 2016   Prob (F-statistic):           3.15e-06
Time:                           22:05:25   Log-Likelihood:                -721.96
No. Observations:                    155   AIC:                             1448.
Df Residuals:                        153   BIC:                             1454.
Df Model:                              1                                         
Covariance Type:               nonrobust                                         
===============================================================================
                  coef    std err          t      P>|t|      [95.0% Conf. Int.]
-------------------------------------------------------------------------------
Intercept      -6.1686      2.424     -2.545      0.012       -10.958    -1.380
polityscore     1.6043      0.331      4.840      0.000         0.949     2.259
==============================================================================
Omnibus:                       12.405   Durbin-Watson:                   1.565
Prob(Omnibus):                  0.002   Jarque-Bera (JB):                9.960
Skew:                           0.523   Prob(JB):                      0.00687
Kurtosis:                       2.330   Cond. No.                         8.64
==============================================================================

Warnings:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.


```

**Histogram Internet Use Rate:**

<figure>
<img src="/media/writing/980676a7113c3a79.webp" loading="lazy" alt="image" />
</figure>

**Histogram Internet Use Rate Center:**

<figure>
<img src="/media/writing/5f5d3da7859507b8.webp" loading="lazy" alt="image" />
</figure>

**Scatterplot Internet Use ~ Polytic score:**

<figure>
<img src="/media/writing/abbba15df9ef4a86.webp" loading="lazy" alt="image" />
</figure>

## **Result:**

The results of the linear regression model indicated that Internet Use Rate (Beta=0.133, p=.0001). was weak significantly and positively associated with Politic score.

politcscore = -6.1686 + 1.6043 \* (”center internet Use”)
