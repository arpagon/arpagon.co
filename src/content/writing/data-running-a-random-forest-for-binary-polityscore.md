---
title: Running a Random Forest for binary polityscore
date: '2016-03-07'
lang: en
description: Random forest analysis was performed to evaluate the importance of a series of explanatory variables in predicting a binary, categorical response variable. The following explanatory variables were included as possible…
series: data-analysis
originalUrl: https://arpagondata.tumblr.com/post/140645590697/running-a-random-forest-for-binary-polityscore
---

Random forest analysis was performed to evaluate the importance of a series of explanatory variables in predicting a binary, categorical response variable. The following explanatory variables were included as possible contributors to a random forest evaluating  polityscore (my response variable) and the explantory variables next:

internetuserate  
incomeperperson  
urbanrate  
alcconsumption  
armedforcesrate  
breastcancerper100th  
co2emissions  
femaleemployrate  
hivrate  
lifeexpectancy  
oilperperson  
relectricperperson  
suicideper100th  
employrate  

The explanatory variables with the highest relative importance scores were   internetuserate and  incomeperperson, deviance and grade point average.  

``` text
Target Variable chosen for the study are: polityscore
Predictors variables for the assignment: internetuserate incomeperperson urbanrate alcconsumption armedforcesrate breastcancerper100th co2emissions femaleemployrate hivrate lifeexpectancy oilperperson relectricperperson suicideper100th employrate
[[ 8  1]
 [ 3 10]]
0.818181818182
[ 0.2075289   0.11358815  0.04904959  0.09347312  0.06755082  0.1234881
  0.01568182  0.04710498  0.02204712  0.11837124  0.0386859   0.05551033
  0.03180944  0.01611049]
```

The accuracy of the random forest was 81%, with the subsequent growing of multiple trees rather than a single tree, adding little to the overall accuracy of the model, and suggesting that interpretation of a single decision tree may be appropriate.

## **Code:**

``` text
#!/usr/bin/env python3
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
Running a Random Forest
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

from pandas import Series, DataFrame
import pandas 
import numpy as np
import os
import matplotlib.pylab as plt
from sklearn.cross_validation import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import classification_report
import sklearn.metrics
 # Feature Importance
from sklearn import datasets
from sklearn.ensemble import ExtraTreesClassifier

#%%# Data Managment 1

data = pandas.read_csv("../gapminder.csv", low_memory=False)

#Preapare Dataset
data['polityscore']=pandas.to_numeric(data['polityscore'], errors='coerce')


data['incomeperperson']=pandas.to_numeric(data['incomeperperson'], errors='coerce')
data['alcconsumption']=pandas.to_numeric(data['alcconsumption'], errors='coerce')
data['armedforcesrate']=pandas.to_numeric(data['armedforcesrate'], errors='coerce')
data['breastcancerper100th']=pandas.to_numeric(data['breastcancerper100th'], errors='coerce')
data['co2emissions']=pandas.to_numeric(data['co2emissions'], errors='coerce')
data['femaleemployrate']=pandas.to_numeric(data['femaleemployrate'], errors='coerce')
data['hivrate']=pandas.to_numeric(data['hivrate'], errors='coerce')
data['internetuserate']=pandas.to_numeric(data['internetuserate'], errors='coerce')
data['lifeexpectancy']=pandas.to_numeric(data['lifeexpectancy'], errors='coerce')
data['oilperperson']=pandas.to_numeric(data['oilperperson'], errors='coerce')
data['relectricperperson']=pandas.to_numeric(data['relectricperperson'], errors='coerce')
data['suicideper100th']=pandas.to_numeric(data['suicideper100th'], errors='coerce')
data['employrate']=pandas.to_numeric(data['employrate'], errors='coerce')
data['urbanrate']=pandas.to_numeric(data['urbanrate'], errors='coerce')

print('''
Chosee the Countrys whit a unperfect democracy as comparation point
''')

data['polityscore2']=pandas.cut(data.polityscore, [-10, 9 , 10], labels=[0,1])
data['polityscore2']=pandas.to_numeric(data['polityscore2'], errors='coerce')

data_clean = data.dropna()

data_clean.dtypes
data_clean.describe()


print('Dataset gapminder \n')

print('Obeservations:', len(data)) #number of observations (rows)
print('Variables:', len(data.columns)) # number of variables (columns)

print('\n\nTarget Variable chosen for the study are: polityscore')
print('Predictors variables for the assignment:',
                         'internetuserate','incomeperperson','urbanrate', 
                         'alcconsumption', 'armedforcesrate', 
                         'breastcancerper100th', 'co2emissions', 
                         'femaleemployrate', 'hivrate', 'lifeexpectancy', 
                         'oilperperson', 'relectricperperson', 
                         'suicideper100th', 'employrate',)

#%%# Split into training and testing sets
predictors = data_clean[['internetuserate','incomeperperson','urbanrate', 
                         'alcconsumption', 'armedforcesrate', 
                         'breastcancerper100th', 'co2emissions', 
                         'femaleemployrate', 'hivrate', 'lifeexpectancy', 
                         'oilperperson', 'relectricperperson', 
                         'suicideper100th', 'employrate',
                         ]]

targets = data_clean.polityscore2

pred_train, pred_test, tar_train, tar_test  = train_test_split(predictors, targets, test_size=.4)

pred_train.shape
pred_test.shape
tar_train.shape
tar_test.shape


#%%# uild model on training data
from sklearn.ensemble import RandomForestClassifier

classifier=RandomForestClassifier(n_estimators=25)
classifier=classifier.fit(pred_train,tar_train)

predictions=classifier.predict(pred_test)

print(sklearn.metrics.confusion_matrix(tar_test,predictions))
print(sklearn.metrics.accuracy_score(tar_test, predictions))


# fit an Extra Trees model to the data
model = ExtraTreesClassifier()
model.fit(pred_train,tar_train)
# display the relative importance of each attribute
print(model.feature_importances_)


"""
Running a different number of trees and see the effect
 of that on the accuracy of the prediction
"""

trees=range(25)
accuracy=np.zeros(25)

for idx in range(len(trees)):
   classifier=RandomForestClassifier(n_estimators=idx + 1)
   classifier=classifier.fit(pred_train,tar_train)
   predictions=classifier.predict(pred_test)
   accuracy[idx]=sklearn.metrics.accuracy_score(tar_test, predictions)
   
plt.cla()
plt.plot(trees, accuracy)
```

## **Result:** 

``` text
Python 3.4.3+ (default, Oct 14 2015, 16:03:50) 
Type "copyright", "credits" or "license" for more information.

IPython 2.3.0 -- An enhanced Interactive Python.
?         -> Introduction and overview of IPython's features.
%quickref -> Quick reference.
help      -> Python's own help system.
object?   -> Details about 'object', use 'object??' for extra details.
%guiref   -> A brief reference about the graphical user interface.


In [7]: runfile('/home/arpagon/Workspace/DataAnalysisSpecialization/src/Machine Learning/week2.py', wdir='/home/arpagon/Workspace/DataAnalysisSpecialization/src/Machine Learning')


Chosee the Countrys whit a unperfect democracy as comparation point

Dataset gapminder 

Obeservations: 213
Variables: 17


Target Variable chosen for the study are: polityscore
Predictors variables for the assignment: internetuserate incomeperperson urbanrate alcconsumption armedforcesrate breastcancerper100th co2emissions femaleemployrate hivrate lifeexpectancy oilperperson relectricperperson suicideper100th employrate
[[ 8  1]
 [ 3 10]]
0.818181818182
[ 0.2075289   0.11358815  0.04904959  0.09347312  0.06755082  0.1234881
  0.01568182  0.04710498  0.02204712  0.11837124  0.0386859   0.05551033
  0.03180944  0.01611049]

￼

In [8]: 
```

<figure>
<img src="/media/writing/f12ac5213a77d960.webp" loading="lazy" alt="Figure from the original article" />
</figure>
