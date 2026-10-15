---
title: Can the Internet use democratizes society? Test a Logistic Regression Model
date: '2016-02-04'
lang: en
description: 'Question: Can the Internet use democratizes society? hypothesis: I am convinced, a deep democracy promotes the welfare of all people actively involved in the democratic process. Some years ago while reading the book…'
series: data-analysis
originalUrl: https://arpagondata.tumblr.com/post/138648271737/can-the-internet-use-democratizes-society-test-a
---

**Question:** Can the Internet use democratizes society?  
**hypothesis:** I am convinced, a deep democracy promotes the welfare of all people actively involved in the democratic process. Some years ago while reading the book **[Why Nations Fail](http://t.umblr.com/redirect?z=https%3A%2F%2Fbooks.google.com.co%2Fbooks%3Fid%3DyIV_NMDDIvYC%26printsec%3Dfrontcover%26dq%3DWhy+Nations+Fail%26hl%3Des-419%26sa%3DX%26redir_esc%3Dy%23v%3Donepage%26q%3DWhy+Nations+Fail%26f%3Dfalse&t=MmRhOWU0MTY3YTRmMDQxNDhiYTBlNzVkODAxZTMyYjYwYWRhYjAzYSxremE5ZUE1Tg%3D%3D).** Suggested the deep relationship between poverty and lawlessness in the building of democratic institutions.

## **Code:**

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
Test a Logistic Regression Mode
polityscore, internetuserate, incomeperperson.

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
import statsmodels.api as sm
import statsmodels.formula.api as smf

data = pandas.read_csv("../gapminder.csv", low_memory=False)

print('Dataset gapminder \n')

print('Obeservations:', len(data)) #number of observations (rows)
print('Variables:', len(data.columns)) # number of variables (columns)

print('\n\nVariables chosen for the study are: internetuserate, polityscore')
print('Additional variables for the assignment: urbanrate, incomeperperson')

#%%# Data Managment 1

#Preapare Dataset
data['urbanrate']=pandas.to_numeric(data['urbanrate'], errors='coerce')
data['internetuserate']=pandas.to_numeric(data['internetuserate'], errors='coerce')
data['polityscore']=pandas.to_numeric(data['polityscore'], errors='coerce')

data['internetuserate'] = data['internetuserate'].convert_objects(
                                                        convert_numeric=True)
data['polityscore'] = data['polityscore'].convert_objects(
                                                        convert_numeric=True)
data['incomeperperson'] = data['incomeperperson'].convert_objects(
                                                        convert_numeric=True)
data['urbanrate'] = data['urbanrate'].convert_objects(
                                                        convert_numeric=True)
                                                    

data['internetuserate']=data['internetuserate'].replace(' ', numpy.nan)
data['polityscore']=data['polityscore'].replace(' ', numpy.nan)
data['incomeperperson']=data['incomeperperson'].replace(' ', numpy.nan)
data['urbanrate']=data['urbanrate'].replace(' ', numpy.nan)


sub1=data[['country',
           'internetuserate', 
            'polityscore', 
            'incomeperperson',
            'urbanrate']].dropna()
            
#%%# ppolityscore2 bin it into two categories. (Data Managment 2)
print('''
Chosee the Countrys whit a unperfect democracy as comparation point
''')

sub1['polityscore2']=pandas.cut(sub1.polityscore, [-10, 7 , 10], labels=[0,1])
sub1['polityscore2']=pandas.to_numeric(sub1['polityscore2'], errors='coerce')

sub1['incomeperpersongroup4']=pandas.qcut(sub1.urbanrate, 4, 
                                                        labels=[0, 1, 2 , 3])

sub1['incomeperpersongroup2']=pandas.qcut(sub1.urbanrate, 2, 
                                                        labels=[0, 1])
                                                        


sub1=sub1[['country',
           'internetuserate', 
            'polityscore', 
            'incomeperperson',
            'urbanrate',
            'polityscore2',
            'incomeperpersongroup4',
            'incomeperpersongroup2']].dropna()
            



#%%# center quantitative IVs for regression analysis
sub1['internetuserate_c'] = (sub1['internetuserate'] - sub1['internetuserate'].mean())
sub1['incomeperperson_c'] = (sub1['incomeperperson'] - sub1['incomeperperson'].mean())
sub1['urbanrate_c'] = (sub1['urbanrate'] - sub1['urbanrate'].mean())
print(sub1[["internetuserate_c","incomeperperson_c", "urbanrate_c", "incomeperpersongroup4"]].describe())

# can override the default ad specify a different reference group
# non-Hispanic White as reference group 
reg6 = smf.ols('polityscore ~ internetuserate_c + urbanrate_c + \
                            C(incomeperpersongroup4, Treatment(reference=3))', 
                                                               data=sub1).fit()
print (reg6.summary())

print(sub1['polityscore2'].value_counts(sort=False, dropna=False))

#%%# LOGISTIC REGRESSION

# logistic regression with social phobia
lreg1 = smf.logit(formula = 'polityscore2 ~ internetuserate', data = sub1).fit()
print (lreg1.summary())
# odds ratios
print ("Odds Ratios")
print (numpy.exp(lreg1.params))

# odd ratios with 95% confidence intervals
params = lreg1.params
conf = lreg1.conf_int()
conf['OR'] = params
conf.columns = ['Lower CI', 'Upper CI', 'OR']
print (numpy.exp(conf))


# logistic regression with social phobia
lreg1 = smf.logit(formula = 'polityscore2 ~ internetuserate + urbanrate', data = sub1).fit()
print (lreg1.summary())
# odds ratios
print ("Odds Ratios")
print (numpy.exp(lreg1.params))

# odd ratios with 95% confidence intervals
params = lreg1.params
conf = lreg1.conf_int()
conf['OR'] = params
conf.columns = ['Lower CI', 'Upper CI', 'OR']
print (numpy.exp(conf))


```

  

## **Result:**

``` text

runfile('/home/arpagon/Workspace/DataAnalysisSpecialization/src/Regression Modeling in Practice/week4.py', wdir='/home/arpagon/Workspace/DataAnalysisSpecialization/src/Regression Modeling in Practice')
Dataset gapminder 

Obeservations: 213
Variables: 16


Variables chosen for the study are: internetuserate, polityscore
Additional variables for the assignment: urbanrate, incomeperperson

Chosee the Countrys whit a unperfect democracy as comparation point

       internetuserate_c  incomeperperson_c  urbanrate_c
count       1.510000e+02       1.510000e+02   151.000000
mean       -7.717153e-15       1.445554e-13     0.000000
std         2.743633e+01       9.598839e+03    22.285121
min        -3.209319e+01      -6.383374e+03   -44.450596
25%        -2.415311e+01      -5.893678e+03   -18.300596
50%        -5.826034e+00      -4.265964e+03     2.329404
75%         1.929407e+01      -3.002972e+01    16.399404
max         6.097425e+01       3.348520e+04    45.149404
                            OLS Regression Results                            
==============================================================================
Dep. Variable:            polityscore   R-squared:                       0.197
Model:                            OLS   Adj. R-squared:                  0.170
Method:                 Least Squares   F-statistic:                     7.128
Date:                Wed, 03 Feb 2016   Prob (F-statistic):           5.45e-06
Time:                        23:18:55   Log-Likelihood:                -468.70
No. Observations:                 151   AIC:                             949.4
Df Residuals:                     145   BIC:                             967.5
Df Model:                           5                                         
Covariance Type:            nonrobust                                         
=========================================================================================================================
                                                            coef    std err          t      P>|t|      [95.0% Conf. Int.]
-------------------------------------------------------------------------------------------------------------------------
Intercept                                                 4.4448      2.156      2.062      0.041         0.184     8.706
C(incomeperpersongroup4, Treatment(reference=3))[T.0]    -1.6970      4.198     -0.404      0.687        -9.995     6.601
C(incomeperpersongroup4, Treatment(reference=3))[T.1]    -0.9596      2.737     -0.351      0.726        -6.370     4.451
C(incomeperpersongroup4, Treatment(reference=3))[T.2]     1.4337      1.774      0.808      0.420        -2.073     4.941
internetuserate_c                                         0.1011      0.022      4.542      0.000         0.057     0.145
urbanrate_c                                              -0.0561      0.070     -0.801      0.424        -0.194     0.082
==============================================================================
Omnibus:                       19.595   Durbin-Watson:                   1.953
Prob(Omnibus):                  0.000   Jarque-Bera (JB):               23.774
Skew:                          -0.970   Prob(JB):                     6.88e-06
Kurtosis:                       3.135   Cond. No.                         400.
==============================================================================

Warnings:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
0    85
1    66
Name: polityscore2, dtype: int64
Optimization terminated successfully.
         Current function value: 0.488711
         Iterations 6
                           Logit Regression Results                           
==============================================================================
Dep. Variable:           polityscore2   No. Observations:                  151
Model:                          Logit   Df Residuals:                      149
Method:                           MLE   Df Model:                            1
Date:                Wed, 03 Feb 2016   Pseudo R-squ.:                  0.2868
Time:                        23:18:55   Log-Likelihood:                -73.795
converged:                       True   LL-Null:                       -103.47
                                        LLR p-value:                 1.325e-14
===================================================================================
                      coef    std err          z      P>|z|      [95.0% Conf. Int.]
-----------------------------------------------------------------------------------
Intercept          -2.0974      0.351     -5.979      0.000        -2.785    -1.410
internetuserate     0.0571      0.009      6.189      0.000         0.039     0.075
===================================================================================
Odds Ratios
Intercept          0.122776
internetuserate    1.058719
dtype: float64
                 Lower CI  Upper CI        OR
Intercept        0.061735  0.244170  0.122776
internetuserate  1.039759  1.078024  1.058719
Optimization terminated successfully.
         Current function value: 0.488463
         Iterations 6
                           Logit Regression Results                           
==============================================================================
Dep. Variable:           polityscore2   No. Observations:                  151
Model:                          Logit   Df Residuals:                      148
Method:                           MLE   Df Model:                            2
Date:                Wed, 03 Feb 2016   Pseudo R-squ.:                  0.2871
Time:                        23:18:55   Log-Likelihood:                -73.758
converged:                       True   LL-Null:                       -103.47
                                        LLR p-value:                 1.252e-13
===================================================================================
                      coef    std err          z      P>|z|      [95.0% Conf. Int.]
-----------------------------------------------------------------------------------
Intercept          -2.2224      0.580     -3.833      0.000        -3.359    -1.086
internetuserate     0.0553      0.011      4.909      0.000         0.033     0.077
urbanrate           0.0033      0.012      0.274      0.784        -0.020     0.027
===================================================================================
Odds Ratios
Intercept          0.108346
internetuserate    1.056811
urbanrate          1.003261
dtype: float64
                 Lower CI  Upper CI        OR
Intercept        0.034778  0.337544  0.108346
internetuserate  1.033749  1.080386  1.056811
urbanrate        0.980150  1.026918  1.003261

```

  

## **Note About Data Management** 

My response variable is quantitative, so I had to bin it into 2 groups for the purpose of this exercise. I binned it into imperfect Democracy (-10 to 7) and Democratic countries.  

  

## **Conclusion** 

All of my explanatory variables were found to have a significant positive influence on breast cancer rates:

- internetuserate (Beta=0.055, P\<0.001)
- urban rate (Beta=0.003, P=0.78)

Although these variables all support the alternate hypothesis that they do have a statistically significant effect on Politic Score rates, all of these associations appear to be weak, based on the low Beta values. The effect of my primary explanatory variable (internetuserate).  

- internet use rate 95% CI = 1.033749  - 1.080386  
- urban rate 95% CI = 0.980150 -  1.026918  

When I examined each of these variables in isolation, internet use rate appears to be the most significant  variable, having a more significant negative impact on the odds ratios of the others. Again, I feel logistic regression is not necessarily the most useful method for investigating my research question.
