---
title: About Gapminder Dataset
date: '2016-01-12'
lang: en
description: 'Description about gapminder: Gapminder is a non-profit venture promoting sustainable global development and achievement of the United Nations Millennium Development Goals by increased use and understanding of…'
series: data-analysis
originalUrl: https://arpagondata.tumblr.com/post/137181151477/about-gapminder-dataset
---

## **Description about gapminder:**

Gapminder is a non-profit venture promoting sustainable global development and achievement of the United Nations Millennium Development Goals by increased use and understanding of statistics and other information about social, economic and environmental development at local, national and global levels.  

## **Sample:**

URL: <http://www.gapminder.org/data/>

The sample data from the GapMinder data set includes country-level indicators of health, wealth and development from 260 countries.  

The number of countries and territories to include is arbitrary, but we gapminder decided to include the following entities:

- 192 UN members (as of April 2008)
- 51 other entities listed in the “List of countries” in [Wikipedia](http://en.wikipedia.org/wiki/List_of_countries) (2008-05-13). These include the Vatican, dependent territories, special entities and disputed territories. We have excluded the two “sub-dependencies” Ascension Island and Tristan da Cunha, although they are listed by Wikipedia.
- 4 French overseas territories (Guadeloupe, Martinique, Reunion and French Guyana), although they are considered an integral part of France
- 10 former states
- 2 ad-hoc areas: “Serbia excluding Kosovo” and “the Channel Islands”. The latter is the collective name of the two dependent territories Guernsey and Jersey.

**UPDATE:** In spetember 2012 we added the new UN state “South Sudan” to our country list. The new number of UN members are hence 193.  

This gives a total of 193+51+4+10+2=260 countries and territories. Our goal is to have data for all these entities for at least two indicators (one of them being population), from 1800 onwards. However, most indicators will only have data for a selection of these entities.

All data are grouped at the country level. Data fields used to analyze the relationship between **  **

- Explanatory Variables: **Internet users (per 100 people) **
- Response Variable: **Democracy score (based on Polity IV)**  

## **Procedures:**

The values of the study were not controlled by the researcher and in my study, the explanatory variable has not been manipulated. No specific study was performed for obtaining the Gapminder data. Data reporting was used to get the observational data for Gapminder. The data I used were obtained from different institutions: 

- Polity IV project
- World Bank  

The data were collected to increase the use and understanding   of   statistics about   social, economic,   and  environmental  development at  local,  national, and global  levels.

## **variables and measured:**

**Internet users (per 100 people)**

URL: <http://data.worldbank.org/indicator/IT.NET.USER.P2>  

Internet users are individuals who have used the Internet (from any location) in the last 12 months. Internet can be used via a computer, mobile phone, personal digital assistant, games machine, digital TV etc.

**Democracy score (based on Polity IV) **

URL: <http://www.systemicpeace.org/polity/polity4.htm>  

Overall polity score from the Polity IV dataset, calculated by subtracting an autocracy score from a democracy score. It is a summary measure of a country’s democratic and free nature. -10 is the lowest value, 10 the highest.

Notes: Gapminder used the variable “polity2”. Polity2 is the same as “polity” with the following main differences: anarchy or interregnum has been coded as 0 (in “polity” it was coded as “-77”). Transitions were interpolated, when possible (in “polity” it was coded as “-88”). Foreign interuptions were left blank (in “polity” it was coded as “-66”).  

Gapminder modifications 1: Countries that emerged when older countries broke up (e.g. former USSR republics): When an area was part of an older unit (and hence had no rating) we used the rating for that older unit. We did this to avoid gaps in the data, which the program would in such case just interpolate (e.g. Estonia had availabeldata both from before the USSR era and after. If the USSR era would be left blank an interpolation would be displayed in the graph for the USSR years). 

Gapminder modification 2: Some countries that were created when older countries merged (e.g. Germany from East and West germany): We used the rating for the biggest unit for the relevant years.We did this to avoid gaps in the data, which the program would in such case just interpolate. We did this only when it was absolutely necessary to avoid such gaps.  

Gapminder modification 3: Years with “foreign interruptions” (coded as “-66” in polity and left blank in polity 2). We had to fill them to avoid simple interpolation by the program. We did guestimates based on a quick reading of the history of the event (e.g. from Wikipedia) - so the decisions are certainly open to discussion. We applied some rule of thumbs: (1) occupations by highly undemocratic countries (e.g. nazi germany) were assigned the lowest value (-10), although the nature of the occupation might have varied. (2) occupation of a democratic regime in a undemocratic one, that ended with a democracy (e.g. allie occupation of germany) were interpolated. (3) occupation in undemocratic countries by not fully democratic countries and where the effect on democracy after the intervention is unclear. We often either interpolated or reatined the ratings just before the intervention (however we would do it would in any case imply a low democracy score.
