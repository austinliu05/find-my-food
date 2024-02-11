// utils.js
// Function to check if Ratty is open
export function isRattyOpen(hours) {
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  // Check if current time is within weekday operating hours
  return currentHour >= hours.start && currentHour < hours.end;
}
// Function to checks if Andrews is open
export function isAndrewsOpen(hours) {
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  // Check if current time is within weekday operating hours
  return currentHour >= hours.start && currentHour < hours.end;
}
// Function to check if Ivy is open
export function isIvyOpen(hours) {
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const dayOfWeek = now.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
  console.log(currentHour);
  // Closed all day on Saturdays
  if (dayOfWeek === 6) return false;

  // Open only in the evening on Sundays (closed Sundays before 5pm)
  if (dayOfWeek === 0 && currentHour < 17) return false;

  // Check if current time is within weekday operating hours
  return hours.some(({ start, end }) => currentHour >= start && currentHour < end);
}
// Function to check if VDub is open
export function isVDubOpen(hours) {
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const dayOfWeek = now.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6

  // Closed all day on Saturdays
  if (dayOfWeek === 6 || dayOfWeek === 0) return false;

  // Check if current time is within weekday operating hours
  return currentHour >= hours.start && currentHour < hours.end;
}

// Gets the current time and sets meal correspondingly
export function getCurrentMealTime() {
  const currentHour = new Date().getHours();
  if (currentHour < 11 && currentHour > 0) {
    return 'breakfast';
  } else if (currentHour >= 11 && currentHour < 16) {
    return 'lunch';
  } else {
    return 'dinner';
  }
}
// Capitalize first letter
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
