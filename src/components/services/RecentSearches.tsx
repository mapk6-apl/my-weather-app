const STORAGE_KEY = 'recent-weather-searches';
const MAX_RECENT = 10;

export const getRecentSearches = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : []; // reads saved list or return empty array if nothing is saved yet.
  } catch (error) {
    console.warn('Failed reading recent searches:', error);
    return [];
  }
};

export const addRecentSearch = (entry: {
    fullName: string;
    latitude: number;
    longitude: number;
    temp: number;
    condition: string;
    icon: string;
}) => {
    const existing = getRecentSearches().filter((search: any) => search.fullName !== entry.fullName);
    const updated = [entry, ...existing].slice(0, MAX_RECENT); //the ... is a spread operator that creates a new array, with the entry items being the first, then unpacks the existing items too and adds to that array too
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
};

export const clearRecentSearches = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear recent searches:', error)
  }
};
