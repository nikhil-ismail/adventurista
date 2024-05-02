import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

// Stacks
import FeedNavigator from "./FeedNavigator";
import CalendarNavigator from "./CalendarNavigator";
import PostNavigator from "./PostNavigator";
import SavedEventsNavigator from "./SavedEventsNavigator";
import ProfileNavigator from "./ProfileNavigator";
import AuthenticationNavigator from "./AuthenticationNavigator";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, selectIsLoggedIn } from '../Redux/userSlice';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUserInfo);
    const dispatch = useDispatch();

    const PostButton = () => {
      // console.log("metrics button", user.metricsId)
      if (user.metricsId === 'small') {
        return (
          <FontAwesomeIcon icon="plus" size={25} />
        );
      }
      else if (user.metricsId  === 'medium') {
        return (
          <FontAwesomeIcon icon="plus" size={35} color="#D99BFF"/>
        );
      }
      else {
        return (
          <FontAwesomeIcon icon="square-plus" size={35} color="#D99BFF"/>
        );
      }
    }

    if (isLoggedIn) {
        return (
            <Tab.Navigator
                initialRouteName="Feed"
                screenOptions={{
                  keyboardHidesTabBar: true,
                  tabBarShowLabel: false,
                  tabBarActiveTintColor: "#D99BFF",
                  tabBarInactiveTintColor: "#777777"
                }}
            >
                <Tab.Screen
                name="Feed"
                component={FeedNavigator}
                options={{
                    tabBarIcon: () => (
                      <FontAwesomeIcon icon="house" size={25} />
                    ),
                    headerShown: false
                  }}
                />
                <Tab.Screen
                name="Calendar"
                component={CalendarNavigator}
                options={{
                    tabBarIcon: () => (
                      <FontAwesomeIcon icon="calendar" size={25} />
                    ),
                    headerShown: false
                  }}
                />
                <Tab.Screen
                name="Post"
                component={PostNavigator}
                options={{
                    tabBarIcon: () => (
                      // <FontAwesomeIcon icon="plus" size={25} />
                      <PostButton />
                    ),
                    headerShown: false
                  }}
                />
                <Tab.Screen
                name="Saved Events"
                component={SavedEventsNavigator}
                options={{
                    tabBarIcon: () => (
                      <FontAwesomeIcon icon="bookmark" size={25} />
                    ),
                    headerShown: false
                  }}
                />
                <Tab.Screen
                name="Profile"
                component={ProfileNavigator}
                options={{
                    tabBarIcon: () => (
                      <FontAwesomeIcon icon="user" size={25} />
                    ),
                    headerShown: false
                  }}
                />
            </Tab.Navigator>
        );
    } else {
        return <AuthenticationNavigator />;
    }
};

export default MainNavigator;