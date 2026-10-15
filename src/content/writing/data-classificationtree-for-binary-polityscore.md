---
title: ClassificationTree for binary polityscore
date: '2016-04-14'
lang: en
description: Decision tree analysis was performed to test nonlinear relationships among a series of explanatory variables and a binary, categorical response variable. All possible separations (categorical) or cut points…
series: data-analysis
originalUrl: https://arpagondata.tumblr.com/post/142775987452/classificationtree-for-binary-polityscore
---

<figure>
<img src="/media/writing/8adec42534947808.webp" loading="lazy" alt="image" />
</figure>

  

  

  

  
Decision tree analysis was performed to test nonlinear relationships among a series of explanatory variables and a binary, categorical response variable. All possible separations (categorical) or cut points (quantitative) are tested. For the present analyses, the entropy “goodness of split” criterion was used to grow the tree and a cost complexity algorithm was used for pruning the full tree into a final subtree.

The following explanatory variables were included as possible contributors to a classification tree model 

X\[0\] internetuserate  
X\[1\] incomeperperson  
X\[2\] urbanrate  
X\[3\] armedforcesrate  
X\[4\] lifeexpectancy  
X\[5\] employrate

The total model classified 86% of the sample correctly, 100% of inperct politycscor (sensitivity) and 96% of perferct politicscore (specificity).

  

\[\[13  3\]  
\[ 0  6\]\]  
0.863636363636

  

## **CODE:**

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

#Displaying the decision tree
from sklearn import tree
#from StringIO import StringIO
from io import StringIO
#from StringIO import StringIO 
from IPython.display import Image

import pydotplus

#from sklearn import datasets
#from sklearn.ensemble import ExtraTreesClassifier

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
                         'armedforcesrate', 'lifeexpectancy', 
                         'employrate',
                         ]]

targets = data_clean.polityscore2

pred_train, pred_test, tar_train, tar_test  = train_test_split(predictors, targets, test_size=.4)

pred_train.shape
pred_test.shape
tar_train.shape
tar_test.shape


#%%# Build model on training data

classifier=DecisionTreeClassifier()
classifier=classifier.fit(pred_train,tar_train)

predictions=classifier.predict(pred_test)

print(sklearn.metrics.confusion_matrix(tar_test,predictions))
print(sklearn.metrics.accuracy_score(tar_test, predictions))

out = StringIO()
tree.export_graphviz(classifier, out_file=out)
graph=pydotplus.graph_from_dot_data(out.getvalue())
Image(graph.create_png())

```

  
  

## **RESULT:**

``` text
Chosee the Countrys whit a unperfect democracy as comparation point

Dataset gapminder 

Obeservations: 213
Variables: 17


Target Variable chosen for the study are: polityscore
Predictors variables for the assignment: internetuserate incomeperperson urbanrate alcconsumption armedforcesrate breastcancerper100th co2emissions femaleemployrate hivrate lifeexpectancy oilperperson relectricperperson suicideper100th employrate
[[7 4]
 [5 6]]
0.590909090909

In [2]: runfile('/home/arpagon/Workspace/DataAnalysisSpecialization/src/Machine Learning/week1.py', wdir='/home/arpagon/Workspace/DataAnalysisSpecialization/src/Machine Learning')
Reloaded modules: sklearn.feature_selection.rfe, sklearn.utils.extmath, sklearn.metrics.cluster.bicluster, sklearn.feature_selection.univariate_selection, sklearn.utils._scipy_sparse_lsqr_backport, sklearn.externals.joblib._multiprocessing_helpers, sklearn.metrics.classification, sklearn.externals.joblib.logger, sklearn.externals.joblib.func_inspect, sklearn.externals.joblib._memory_helpers, sklearn.externals.joblib.format_stack, sklearn.externals, sklearn.metrics.pairwise, sklearn.externals.joblib._compat, sklearn.utils.linear_assignment_, sklearn.metrics, sklearn.utils.lgamma, sklearn.tree._splitter, sklearn.externals.joblib, sklearn.preprocessing._function_transformer, sklearn.preprocessing, sklearn.externals.six, sklearn.metrics.cluster.unsupervised, sklearn.externals.joblib.memory, sklearn.utils.metaestimators, sklearn.externals.joblib.parallel, sklearn.__check_build._check_build, sklearn.preprocessing.imputation, sklearn.utils.sparsefuncs_fast, sklearn.feature_selection.variance_threshold, sklearn.externals.joblib.disk, sklearn.metrics.regression, sklearn.feature_selection.from_model, sklearn.utils.validation, sklearn.externals.joblib.my_exceptions, sklearn.externals.joblib.hashing, sklearn.utils.murmurhash, sklearn.preprocessing.label, sklearn.tree, sklearn.cross_validation, sklearn.utils.stats, sklearn.tree._criterion, sklearn.feature_selection, sklearn.metrics.cluster.supervised, sklearn.feature_selection.base, sklearn.utils.class_weight, sklearn.__check_build, sklearn, sklearn.tree._tree, sklearn.externals.joblib.pool, sklearn.externals.joblib.numpy_pickle, sklearn.preprocessing.data, sklearn.base, sklearn.metrics.cluster.expected_mutual_info_fast, sklearn.metrics.base, sklearn.utils._logistic_sigmoid, sklearn.utils, sklearn.tree.tree, sklearn.utils.sparsefuncs, sklearn.metrics.scorer, sklearn.metrics.ranking, sklearn.utils.fixes, sklearn.metrics.cluster, sklearn.tree._utils, sklearn.utils.multiclass, sklearn.metrics.pairwise_fast, sklearn.tree.export

Chosee the Countrys whit a unperfect democracy as comparation point

Dataset gapminder 

Obeservations: 213
Variables: 17


Target Variable chosen for the study are: polityscore
Predictors variables for the assignment: internetuserate incomeperperson urbanrate alcconsumption armedforcesrate breastcancerper100th co2emissions femaleemployrate hivrate lifeexpectancy oilperperson relectricperperson suicideper100th employrate
[[13  3]
 [ 0  6]]
0.863636363636
```
