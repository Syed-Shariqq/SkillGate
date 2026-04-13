const MODE = 'mock'; // Can be 'mock' | 'supabase' | 'api'

const apiClient = {
  getAll: (collection) => {
    if (MODE === 'mock') {
      try {
        const data = localStorage.getItem(collection);
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error(`Error parsing localStorage for ${collection}:`, error);
        return [];
      }
    }
    // TODO: Implement other modes
    return [];
  },

  getOne: (collection, matchFn) => {
    if (MODE === 'mock') {
      const items = apiClient.getAll(collection);
      return items.find(matchFn) || null;
    }
    return null;
  },

  save: (collection, item) => {
    if (MODE === 'mock') {
      const items = apiClient.getAll(collection);
      items.push(item);
      localStorage.setItem(collection, JSON.stringify(items));
      return item;
    }
  },

  update: (collection, matchFn, updater) => {
    if (MODE === 'mock') {
      const items = apiClient.getAll(collection);
      const index = items.findIndex(matchFn);
      
      if (index !== -1) {
        const updatedItem = updater(items[index]);
        items[index] = updatedItem;
        localStorage.setItem(collection, JSON.stringify(items));
        return updatedItem;
      }
      return null;
    }
  },

  remove: (collection, matchFn) => {
    if (MODE === 'mock') {
      const items = apiClient.getAll(collection);
      const filteredItems = items.filter(item => !matchFn(item));
      localStorage.setItem(collection, JSON.stringify(filteredItems));
    }
  },

  setSession: (user) => {
    if (MODE === 'mock') {
      localStorage.setItem('sg_session', JSON.stringify(user));
    }
  },

  getSession: () => {
    if (MODE === 'mock') {
      try {
        const session = localStorage.getItem('sg_session');
        return session ? JSON.parse(session) : null;
      } catch (error) {
        console.error('Error parsing session from localStorage:', error);
        return null;
      }
    }
    return null;
  },

  clearSession: () => {
    if (MODE === 'mock') {
      localStorage.removeItem('sg_session');
    }
  }
};

export default apiClient;
