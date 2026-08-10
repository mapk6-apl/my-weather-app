//Asks the browser for permission to show notifications
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) return 'denied';
  if (Notification.permission === 'default') {
    return await Notification.requestPermission();
  }
  return Notification.permission;
};

export const sendWeatherAlert = (locationName: string,
  weather: { isDangerous: boolean; condition: string; wind: string; temp: number }) => {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  if (!weather.isDangerous) return;

  const alertKey = `alerted-${locationName}-${weather.condition}`;
  if (sessionStorage.getItem(alertKey)) return;

  new Notification(`Weather Alert - ${locationName}`, {
    body: `${weather.condition} conditions detected. Wind ${weather.wind}, ${weather.temp}°.`
  });

  sessionStorage.setItem(alertKey, 'true');
};

export const sendTestNotification = () => {
  if (!('Notification' in window)) {
    alert('This browser does not support notifications.');
    return;
  }
  if (Notification.permission !== 'granted') {
    alert('Click "Enable Alerts" first and allow the permission prompt.');
    return;
  }
  new Notification('Test Weather Alert', {
    body: 'This is a test — Thunderstorm conditions, wind 55 km/h, 21°.'
  });
};