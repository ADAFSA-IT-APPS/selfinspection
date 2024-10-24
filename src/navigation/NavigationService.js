import * as React from 'react';
import { createNavigationContainerRef } from '@react-navigation/native';

// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = createNavigationContainerRef()

function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
function goBack() {
  navigationRef.goBack();
}

export default {
  navigate,
  goBack,
};