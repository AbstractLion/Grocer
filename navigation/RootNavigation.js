import React from 'react';

export const navigationRef = React.createRef();
export const isMountedRef = React.createRef();

export function dispatch(action) {
  navigationRef.current?.dispatch(action);
}

export function setOptions(options) {
  if (isMountedRef.current && navigationRef.current) {
    if (navigationRef.current?.setOptions) {
      navigationRef.current?.setOptions(options);
    }
  }
}