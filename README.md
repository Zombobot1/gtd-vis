# Exploration of Trends In Terrorist Attacks

## Table of Contents
- [Introduction](#introduction)
- [Visualization Design](#visualization-design)
    - [Domain Characterization](#domain-characterization)
    - [Data Abstraction](#data-abstraction)
    - [Visual Encoding and Interaction Design](#visual-encoding-and-interaction-design)
    - [Algorithm Design](#algorithm-design)
- [Running the Application](#running-the-application)
- [Screencast](#screencast)
- [Authors](#authors)
- [References](#references)


## Introduction <a name="introduction"></a>

Terrorist attacks have massive economic and psycological effect on wide range of population. In the sense that the dynamics such as change over years in target groups, weapon types, terrorist groups, numbers of terrorist attacks are analysed, that could enable policy makers, researchers, analysts extrapolating the useful information from the attacks where they happened in past.

[The Global Terrorism Database (GTD)](https://www.start.umd.edu/gtd/access/) is the source for our data defines a terrorist attack as the threatened or actual use of illegal force and violence by a non-state actor to attain a political, economic, religious, or social goal through fear, coercion, or intimidation. The GTD is an event-level database containing more than 200,000 records of terrorist attacks that took place around the world beteween years 1970 and 2019. For each event, a wide range of information is available, including the date and location of the incident, the weapons used, nature of the target, the number of casualties, and – when identifiable – the group or individual responsible. It is maintained by the National Consortium for the Study of Terrorism and Responses to Terrorism (START) at the University of Maryland. 

## Visualization Design <a name="visualization-design"></a>

### Domain Characterization <a name="domain-characterization"></a>

In our study, we contacted with a researcher who working in think tank which conducts the projects in areas of foreign and security policy or international and European politics. With regarding the needs of our target user group, the following cases are determined. 

1. The change in number of attacks over years both for global and country based, that would help them to take an overview about the state of last 10 years.
2. Comparing and finding correlation between the fatalities and injuries with number of attacks in order to understand whether a country has improvement in their intelligence service. Mostly attacks have a design to target crowds such as after exploding the bombs in first stage, to the points where people escape, another set of bombs are placed, even some of attacks had third stage with weapons.
3. The change in frequently used attack type, that give insights for future attacks to take precaution against these types.
4. Comparing the affiliated and unknown attacks of most attacked countries over years in an effort to have an idea about intelligence service of countries. Affiliated attacks which were carried out by groups were identified by government, however unknown attacks were not.
5. Inspecting the activities of most influential terrorist groups over years. Influential can be described as having much more attacks that were carried out.

In this context, only the attacks that were attempted either they are succesful or not, classified as not doubted and only last 10 years, are taken into account. This approach allow us to evaluate data from broader perspective and obtaining more up-to-date view. The dashboard includes both Global and Country level statistics, some of them gives them opportunity to compare the data over years. Hence they can easily detect the trends especially in the areas of target type, affiliated attacks and most dangerous groups.

### Data Abstraction <a name="data-abstraction"></a>

As a first approach, all data is used for visualization and the dashboard had 4 visuals, as such World Map with Safety Index, Organized and Unorganized Attacks, for selected countries teh change in organized and unorganized attacks, the change in number of killed and wounded people over years. However we have noticed that a number of countries are different than today because of political issues such as splitting or merging into another countries. This situaton caused to not show values properly on world map, beside the size of data bottlenecked the loading of visuals in our first prototype which was developed in python programming language with using Plotly and Dash library. 

After preparing first prototype, we have interviewed with our user and evaluate the visuals. Color encodings on map were needed to be changed because of not being suitable for color-blinded users and not carrying the message to user as we expected. Safety Index should have taken other measures about attacks into account. Moreover the change in target type and most influential groups would convey more efficacious information for them. Showing all data (1970-2019) was not useful at all, the dynamics are constantly changing, hence last 10 years would be helpful for getting insights about current situation.

In this context, we have transformed the dashboard into accommodately the need of users. Therefore data became more structured and approptiate to load them faster on user interface. The data was filtered out of last 10 years, selected only necessary fields and aggreagated with regarding to the case study. For each specific case, new dataset is structured with required filters and saved as json files. All dataset are described in below.

- **The numbers of incidents, injured and killed people by countries over years:** year, country, id(code of country to be used in map), unique count of events, sum of number of killed people, sum of number of wounded people 
- **The numbers of injured and killed people over years:** year, country, id(code of country to be used in map), sum of number of killed people, sum of number of wounded people 
- **Attack type over years:**  year, country, id(code of country to be used in map), attack type, percentage of unique count of events by attack type in the country and year
- **Affiliated and non-affiliated attacks over years:** year, country, id(code of country to be used in map), affiliation(indicator if group is unknown or has a name), unique count of events
- **The most influential terrorist groups over years:** group name, year, unique count of events
- **The most attacked countries over years:** year, country id (code of the country), unique count of events for affiliated attacks and attacks without affiliation with terrorist group


### Visual Encoding and Interaction Design <a name="visual-encoding-and-interaction-design"></a>

The dashboard mainly consist of 5 visuals. Each visual is explained in detail below.

**Representations:**
- Attack numbers - Worldwide map 
    - Shows yearly statistics by countries on number of incidents, killed and wounded people.
    - Number of incidents  is encoded with the colors from light orange to dark red.
- Fatalities and Injuries - Line charts:
    - Shows dynamics of fatalities and wounded people over years for chosen country
- Most attacked countries over the time - Sorted stacked horizontal bar chart:
    - Shows yearly statistics of the top attacked countries by affiliated and non affiliated attacks.
- Attack type - Pie chart:
    - Shows all time percentages of attacks by the type of attack.
- Top 5 terrorist groups according to number of attacks - Stacked line chart:
    - Shows the attack numbers over time for top 5 group.
    - 
**Use of timeline:**

    - Timeline was used to show dynamics of the measures for all visuals excluding Attack Type pie chart.
    
**Color encoding:**

Generally, we have avoid to use red and green colors together to the users who can be color-blind. Due to the perception of topic, we decided to apply predominantly dark red in background and coherent colors.
    - World map: Unified color pallet from light orange to dark red was used in all graphs and on the map. Darker colors represent higher numbers
    - Fatalities and injuries: Light pink represent the fatalities and light beige represents the injuries.
    - Attack type: Basically used only 4 colors to show the share of the most occured attack types for global and country selection.
    - Most attacked countries over the time: Light beige represents affiliated, orange represents unknown groups who carried out the attacks.
    - Top 5 terrorist groups according to number of attacks: Top 5 terrorist groups is represented with light beige to dark red colors.
    
 The globe page of dashboard is built in showing the values based on interaction. Interactive world map allow the users,
    - hover on countries and check the details of number of killed, injured, events
    - rotate and zoom in/out the globe to choose the country in order to inspect the 'Fatalieties and Injured', 'Attack Type' visuals and overall statistics  at the left-hand side of dashboard.
The most attacked countries over time chart in detail section enables the users to choose the interested year to inspect most attacked countries for selected year.
Top 5 terrorist groups according to number of attacks is used for analyzing the values of each groups hovered over year.

### Algorithm Design <a name="algorithm-design"></a>

This project represents a visualization of data from a large dataset of terrorist attacks from 1977 to 2019 (over 200,000 rows and over 70 columns).
Based on user requirements, the data for visualization was limited to 2011-2019.
In order to reduce computational complexity and provide a fast response of the application, a separate set of data was prepared in the required analytics for each visualization (See Data Abstraction section).

In order to ensure fast application response and comfortable user interaction with the app, we refused the tools that we used in the first prototype (plotly, dash) and implemented visualization in javascript using specialized libraries [nivo.rocks](https://nivo.rocks/). We have run a lot of tests to check the app's responsiveness and ergonomics, as well as the ease of presentation of information on various devices.


## Running the Application <a name="running-the-application"></a>

In order to run this application on your computer and make changes on the project, you should run these steps which are stated below sequentially.

```
git clone https://github.com/Zombobot1/gtd-vis.git
cd path/to/file
npm i
npm start
```

The project is currently deployed to [Github Pages](https://zombobot1.github.io/gtd-vis/).

## Screencast <a name="screencast"></a>

The screencast of the project is accessible over the [the screencast link](https://youtu.be/VyhLRJVoIrI) given below.

<a href="https://youtu.be/VyhLRJVoIrI" target="_blank"> 
    <img src="https://img.youtube.com/vi/VyhLRJVoIrI/hqdefault.jpg" alt="Screencast - GTD Data Visualization" width="240" height="180" border="10" />
</a>

## Authors <a name="authors"></a>

- Ali OMAROV
- Esra GÜCÜKBEL
- Evgenia SLIVKO

