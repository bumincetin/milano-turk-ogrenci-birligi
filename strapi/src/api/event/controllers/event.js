'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({ strapi }) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async findOne(ctx) {
    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  },

  async create(ctx) {
    const { data, meta } = await super.create(ctx);
    return { data, meta };
  },

  async update(ctx) {
    const { data, meta } = await super.update(ctx);
    return { data, meta };
  },

  async delete(ctx) {
    const { data, meta } = await super.delete(ctx);
    return { data, meta };
  },
  
  // Özel kayıt metodu
  async enroll(ctx) {
    const { id } = ctx.params;
    const userId = ctx.state.user?.id;

    // Kullanıcı kontrolü
    if (!userId) {
      return ctx.unauthorized('Giriş yapmanız gerekmektedir.');
    }

    try {
      // Yetki kontrolü
      const canEnroll = await strapi.service('api::event.event').isAllowedToEnroll(userId);
      if (!canEnroll) {
        return ctx.forbidden('Bu işlem için yetkiniz bulunmuyor.');
      }

      // Etkinliği bul
      const event = await strapi.entityService.findOne('api::event.event', id, {
        populate: ['users']
      });

      if (!event) {
        return ctx.notFound('Etkinlik bulunamadı');
      }

      // Kontroller
      if (event.blocked) {
        return ctx.badRequest('Bu etkinliğe kayıt alınmamaktadır.');
      }

      if (event.current_person_count >= event.person_limit) {
        return ctx.badRequest('Etkinlik kontenjanı dolmuştur.');
      }

      if (new Date(event.last_enroll_time) < new Date()) {
        return ctx.badRequest('Etkinlik kayıt süresi dolmuştur.');
      }

      // Kullanıcının daha önce kaydolup olmadığını kontrol et
      const isAlreadyEnrolled = event.users.some(user => user.id === userId);
      if (isAlreadyEnrolled) {
        return ctx.badRequest('Bu etkinliğe zaten kayıtlısınız.');
      }

      // Etkinliğe kayıt ol
      const updatedEvent = await strapi.entityService.update('api::event.event', id, {
        data: {
          users: [...event.users.map(user => user.id), userId],
          current_person_count: event.current_person_count + 1
        }
      });

      return ctx.send({
        data: updatedEvent,
        message: 'Etkinliğe başarıyla kayıt oldunuz.'
      });

    } catch (error) {
      console.error('Kayıt hatası:', error);
      return ctx.badRequest('Kayıt işlemi sırasında bir hata oluştu');
    }
  },

  async cancelEnrollment(ctx) {
    const { id } = ctx.params;
    const userId = ctx.state.user?.id;

    // Kullanıcı kontrolü
    if (!userId) {
      return ctx.unauthorized('Giriş yapmanız gerekmektedir.');
    }

    try {
      // Etkinliği bul
      const event = await strapi.entityService.findOne('api::event.event', id, {
        populate: ['users']
      });

      if (!event) {
        return ctx.notFound('Etkinlik bulunamadı');
      }

      // Kullanıcının etkinliğe kayıtlı olup olmadığını kontrol et
      const isEnrolled = event.users.some(user => user.id === userId);
      if (!isEnrolled) {
        return ctx.badRequest('Bu etkinliğe kayıtlı değilsiniz.');
      }

      // Etkinlikten çıkış yap
      const updatedEvent = await strapi.entityService.update('api::event.event', id, {
        data: {
          users: {
            disconnect: [userId]
          },
          current_person_count: event.current_person_count - 1
        }
      });

      return {
        data: updatedEvent,
        message: 'Etkinlik kaydınız başarıyla iptal edildi.'
      };

    } catch (error) {
      console.error('Kayıt iptal hatası:', error);
      return ctx.badRequest('Kayıt iptal işlemi sırasında bir hata oluştu');
    }
  }
}));
