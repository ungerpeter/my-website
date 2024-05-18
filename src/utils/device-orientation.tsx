export const addDeviceOrientationListener = (listenerFn: (ev: DeviceOrientationEvent) => void) => {
  if (!window?.DeviceOrientationEvent) {
    console.error('Device orientation not supported');
    return false;
  }
  window.addEventListener('deviceorientation', listenerFn);
  return true;
};

export const addDeviceMotionListener = (listenerFn: (ev: DeviceMotionEvent) => void) => {
  if (!window?.DeviceMotionEvent) {
    console.error('Device motion not supported');
    return false;
  }
  window.addEventListener('devicemotion', listenerFn);
  return true;
};