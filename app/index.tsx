import React from 'react';

import {Text} from "react-native";
import BrewList from "./brewlist";

const Index = () =>
    <>
        <Text className="text-brown-700 text-4xl font-bold text-center">Kombucha Keeper</Text>

        <BrewList/>
    </>
export default Index;
