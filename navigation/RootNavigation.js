import React from 'react';

export const navigationRef = React.createRef();

export function dispatch(action) {
  navigationRef.current?.dispatch(action);
}