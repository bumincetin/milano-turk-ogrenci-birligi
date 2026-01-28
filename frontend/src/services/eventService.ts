import eventsData from '@/data/events.json';

export const EventsAPI = {
  getAll: async () => {
    // Simulate async behavior
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      data: eventsData.data.filter(event => !event.attributes.blocked)
    };
  },

  getUsersEvents: async (userId: number, query: string = '') => {
    // In static mode, return empty array as there's no user session
    await new Promise(resolve => setTimeout(resolve, 100));
    return { events: [] };
  },

  getById: async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const event = eventsData.data.find(e => e.id === id);
    
    if (!event) {
      throw new Error('Etkinlik bulunamadı');
    }

    return { data: event };
  },

  enrollEvent: async (eventId: number) => {
    // In static mode, show a message instead of actual enrollment
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Simulate success response
    return {
      success: true,
      message: 'Bu özellik şu anda aktif değil. Etkinliklere kayıt için lütfen bizimle iletişime geçin.'
    };
  },

  cancelEnrollment: async (eventId: number) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      success: true,
      message: 'Bu özellik şu anda aktif değil.'
    };
  },

  checkEnrollmentStatus: async (eventId: number) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In static mode, user is never enrolled
    return { isEnrolled: false };
  },
};
