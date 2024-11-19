'use strict';

module.exports = {
  register() {},
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["api::event.event"],
      populate: {
        users: true,
      },
      beforeUpdate: async (event) => {
        const { params } = event;
        const previousEvent = await strapi.entityService.findOne('api::event.event', params.where.id, {
          populate: ['users']
        });

        // Eğer users array'i değişmişse
        if (params.data.users) {
          const newUsersCount = params.data.users.length;
          const oldUsersCount = previousEvent.users.length;

          // Kullanıcı sayısındaki değişimi hesapla
          const userCountDifference = newUsersCount - oldUsersCount;

          // Kontenjan kontrolü
          if (previousEvent.current_person_count + userCountDifference > previousEvent.person_limit) {
            throw new Error('Etkinlik kontenjanı dolu');
          }

          // current_person_count'u güncelle
          params.data.current_person_count = previousEvent.current_person_count + userCountDifference;
        }
      },
      afterUpdate: async (event) => {
        const { result } = event;
        
        // Etkinlik güncellemesi sonrası loglama
        console.log(`Etkinlik güncellendi: ${result.id}`);
        console.log(`Güncel katılımcı sayısı: ${result.current_person_count}`);
      }
    });
  }
};
