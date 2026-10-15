---
title: Can the Internet use democratizes society? Analysis of Variance
date: '2015-12-07'
lang: en
description: 'Question: Can the Internet use democratizes society? hypothesis: I am convinced, a deep democracy promotes the welfare of all people actively involved in the democratic process. Some years ago while reading the book…'
series: data-analysis
originalUrl: https://arpagondata.tumblr.com/post/134708527487/can-the-internet-use-democratizes-society
---

**Question:** Can the Internet use democratizes society?  
**hypothesis:** I am convinced, a deep democracy promotes the welfare of all people actively involved in the democratic process. Some years ago while reading the book **[Why Nations Fail](https://books.google.com.co/books?id=yIV_NMDDIvYC&printsec=frontcover&dq=Why+Nations+Fail&hl=es-419&sa=X&redir_esc=y#v=onepage&q=Why%20Nations%20Fail&f=false).** Suggested the deep relationship between poverty and lawlessness in the building of democratic institutions.

## Code: 

``` text
#!/usr/bin/env python
# vim: set fileencoding=utf-8 :
# -*- coding: utf-8 -*-
#
#       week1.py
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
import statsmodels.formula.api as smf
import statsmodels.stats.multicomp as multi 

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

sub1=data[['country','internetuserate', 'polityscore']].dropna()

data_variance = sub1.copy()

print('intusegroup4 - 4 categories - 0 low use, 10 is massive use')
data_variance['intusegroup4']=pandas.cut(data_variance.internetuserate, 
                                                         [0, 25 , 50, 75, 100])

intusegroup4_count = data_variance['intusegroup4'].value_counts(sort=False)
print (intusegroup4_count)

print('\n==Percentages for internetuserate grouped as intusegroup4 ==')
print('''Internet users (per 100 people) Internet users are people with access 
to the worldwide network.''')

intusegroup4_percent = data_variance['intusegroup4'].value_counts(sort=False, 
                                                                normalize=True)
print (intusegroup4_percent)

model = smf.ols(formula='polityscore ~ C(intusegroup4)', data=data_variance).fit()
print (model.summary())


mc1 = multi.MultiComparison(data_variance['polityscore'], data_variance['intusegroup4'])
res1 = mc1.tukeyhsd()
print(res1.summary())
```

## Result:

``` text
Dataset gapminder 

Obeservations: 213
Variables: 16


Variables chosen for the study are: internetuserate, polityscore
Additional variables for the assignment: urbanrate, incomeperperson
intusegroup4 - 4 categories - 0 low use, 10 is massive use
(0, 25]      74
(25, 50]     41
(50, 75]     23
(75, 100]    17
dtype: int64

==Percentages for internetuserate grouped as intusegroup4 ==
Internet users (per 100 people) Internet users are people with access 
to the worldwide network.
(0, 25]      0.477419
(25, 50]     0.264516
(50, 75]     0.148387
(75, 100]    0.109677
dtype: float64
                            OLS Regression Results                            
==============================================================================
Dep. Variable:            polityscore   R-squared:                       0.133
Model:                            OLS   Adj. R-squared:                  0.116
Method:                 Least Squares   F-statistic:                     7.733
Date:                Mon, 07 Dec 2015   Prob (F-statistic):           7.71e-05
Time:                        00:46:23   Log-Likelihood:                -492.18
No. Observations:                 155   AIC:                             992.4
Df Residuals:                     151   BIC:                             1005.
Df Model:                           3                                         
Covariance Type:            nonrobust                                         
================================================================================================
                                   coef    std err          t      P>|t|      [95.0% Conf. Int.]
------------------------------------------------------------------------------------------------
Intercept                        1.9054      0.682      2.793      0.006         0.558     3.253
C(intusegroup4)[T.(25, 50]]      1.9239      1.142      1.684      0.094        -0.333     4.181
C(intusegroup4)[T.(50, 75]]      5.4424      1.401      3.885      0.000         2.675     8.210
C(intusegroup4)[T.(75, 100]]     5.6828      1.578      3.601      0.000         2.565     8.801
==============================================================================
Omnibus:                       21.202   Durbin-Watson:                   2.057
Prob(Omnibus):                  0.000   Jarque-Bera (JB):               26.417
Skew:                          -1.010   Prob(JB):                     1.84e-06
Kurtosis:                       3.082   Cond. No.                         4.02
==============================================================================

Warnings:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
Multiple Comparison of Means - Tukey HSD,FWER=0.05
=================================================
 group1    group2  meandiff  lower  upper  reject
-------------------------------------------------
(0, 25]   (25, 50]  1.9239  -1.0442 4.892  False 
(0, 25]   (50, 75]  5.4424   1.8029 9.0819  True 
(0, 25]  (75, 100]  5.6828   1.5825 9.7831  True 
(25, 50]  (50, 75]  3.5186  -0.4531 7.4902 False 
(25, 50] (75, 100]  3.759   -0.6388 8.1567 False 
(50, 75] (75, 100]  0.2404  -4.6357 5.1166 False 
-------------------------------------------------
```

## **Model Interpretation for ANOVA:**

When examining the association between current polityscore (quantitative response) and internetuserate categorize in 4 groups  

          Group       Count  

- (0, 25\]       74
- (25, 50\]     41
- (50, 75\]     23
- (75, 100\]   17  

(categorical explanatory), an Analysis of Variance (ANOVA) revealed that among daily, young adult smokers (my sample), those with better internet Use  significantly more polityscore.

Following ‘F’ can be found in the OLS table as the DF model and DF residuals. In this example 7.733 is the actual F value from the OLS table and we commonly report a very small p value as simply \<.0001. (7.71e-05)  

  

## **Model Interpretation for post hoc ANOVA results:**

ANOVA revealed de intenetusereat and polityscore were significantly associated, F=7.733, p=7.71e-05 Post hoc comparisons of mean internetuserate groups by polityscore. All other comparisons were statistically similar.
