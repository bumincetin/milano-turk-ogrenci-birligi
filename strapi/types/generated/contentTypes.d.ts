import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    name: Attribute.String & Attribute.Required;
    lastname: Attribute.String;
    description: Attribute.Text;
    birthday: Attribute.Date;
    avatar: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    position: Attribute.String;
    twitter: Attribute.Text;
    linkedin: Attribute.Text;
    website: Attribute.Text;
    purchases: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::purchase.purchase'
    >;
    ticket: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::ticket.ticket'
    >;
    telephone: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 14;
      }>;
    universityName: Attribute.String & Attribute.Required;
    universityDepartment: Attribute.String & Attribute.Required;
    universityClass: Attribute.String & Attribute.Required;
    blog_posts: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::blog-post.blog-post'
    >;
    events: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::event.event'
    >;
    isTeam: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBillingInformationBillingInformation
  extends Schema.CollectionType {
  collectionName: 'billing_informations';
  info: {
    singularName: 'billing-information';
    pluralName: 'billing-informations';
    displayName: 'Billing Information';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    company_name: Attribute.String;
    tax_number: Attribute.String;
    tax_administration: Attribute.String;
    address: Attribute.Text;
    type: Attribute.Enumeration<['individual', 'corporate']>;
    ticket_histories: Attribute.Relation<
      'api::billing-information.billing-information',
      'oneToMany',
      'api::ticket-history.ticket-history'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::billing-information.billing-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::billing-information.billing-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogPostBlogPost extends Schema.CollectionType {
  collectionName: 'blog_posts';
  info: {
    singularName: 'blog-post';
    pluralName: 'blog-posts';
    displayName: 'Blog Posts';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMaxLength<{
        maxLength: 25;
      }> &
      Attribute.DefaultTo<'Title'>;
    slug: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMaxLength<{
        maxLength: 35;
      }>;
    summary: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    content: Attribute.Blocks &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    cover: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    users_permissions_user: Attribute.Relation<
      'api::blog-post.blog-post',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    published: Attribute.DateTime &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    status: Attribute.Enumeration<['draft', 'published', 'deleted']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-post.blog-post',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-post.blog-post',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::blog-post.blog-post',
      'oneToMany',
      'api::blog-post.blog-post'
    >;
    locale: Attribute.String;
  };
}

export interface ApiCouponCoupon extends Schema.CollectionType {
  collectionName: 'coupons';
  info: {
    singularName: 'coupon';
    pluralName: 'coupons';
    displayName: 'Coupon';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    code: Attribute.String & Attribute.Unique;
    count: Attribute.Integer;
    count_available: Attribute.Integer;
    discount: Attribute.Decimal;
    discount_type: Attribute.Enumeration<['percent', 'price']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::coupon.coupon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::coupon.coupon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEventEvent extends Schema.CollectionType {
  collectionName: 'events';
  info: {
    singularName: 'event';
    pluralName: 'events';
    displayName: 'Event';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    event_time: Attribute.DateTime;
    last_enroll_time: Attribute.DateTime;
    summary: Attribute.Text;
    details: Attribute.Blocks;
    blocked: Attribute.Boolean;
    person_limit: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    current_person_count: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    cover: Attribute.Media<'images'>;
    category: Attribute.Enumeration<
      ['City Tour', 'Workshop', 'Cultural', 'Food', 'Sport', 'Meeting']
    >;
    location: Attribute.String;
    users: Attribute.Relation<
      'api::event.event',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHakkimizdaHakkimizda extends Schema.SingleType {
  collectionName: 'hakkimizdas';
  info: {
    singularName: 'hakkimizda';
    pluralName: 'hakkimizdas';
    displayName: 'Hakk\u0131m\u0131zda';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    hakkimizda: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::hakkimizda.hakkimizda',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::hakkimizda.hakkimizda',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNewsSubscriptionNewsSubscription
  extends Schema.CollectionType {
  collectionName: 'news_subscriptions';
  info: {
    singularName: 'news-subscription';
    pluralName: 'news-subscriptions';
    displayName: 'News Subscription';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    email: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::news-subscription.news-subscription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::news-subscription.news-subscription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPurchasePurchase extends Schema.CollectionType {
  collectionName: 'purchases';
  info: {
    singularName: 'purchase';
    pluralName: 'purchases';
    displayName: 'Purchase';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    user: Attribute.Relation<
      'api::purchase.purchase',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    user_baskets: Attribute.Relation<
      'api::purchase.purchase',
      'oneToMany',
      'api::user-basket.user-basket'
    >;
    date: Attribute.DateTime;
    admin_check: Attribute.Relation<
      'api::purchase.purchase',
      'oneToOne',
      'admin::user'
    >;
    tickets: Attribute.Relation<
      'api::purchase.purchase',
      'oneToMany',
      'api::ticket.ticket'
    >;
    code: Attribute.String & Attribute.Unique;
    status: Attribute.Enumeration<['paid', 'unpaid', 'canceled']>;
    for_personal_invoice: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    billing_information: Attribute.Relation<
      'api::purchase.purchase',
      'oneToOne',
      'api::billing-information.billing-information'
    >;
    payment_method: Attribute.Enumeration<['credit-card', 'bank-transfer']>;
    iyzico_init_res: Attribute.JSON;
    payment_progress: Attribute.Enumeration<
      ['in-progress', 'on-hold', 'done', 'canceled']
    >;
    iyzico_x_iyzi_rnd: Attribute.String;
    iyzico_authorization: Attribute.String;
    ticket_histories: Attribute.Relation<
      'api::purchase.purchase',
      'oneToMany',
      'api::ticket-history.ticket-history'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::purchase.purchase',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::purchase.purchase',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSpeakerSpeaker extends Schema.CollectionType {
  collectionName: 'speakers';
  info: {
    singularName: 'speaker';
    pluralName: 'speakers';
    displayName: 'Speaker';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    lastname: Attribute.String;
    twitter: Attribute.String;
    linkedin: Attribute.String;
    youtube: Attribute.String;
    profession: Attribute.String;
    description: Attribute.Text;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    company: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::speaker.speaker',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::speaker.speaker',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSponsorSponsor extends Schema.CollectionType {
  collectionName: 'sponsors';
  info: {
    singularName: 'sponsor';
    pluralName: 'sponsors';
    displayName: 'Sponsor';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    img: Attribute.Media<'images'> & Attribute.Required;
    alt: Attribute.String;
    height: Attribute.String;
    year: Attribute.Enumeration<['y2023', 'y2024', 'y2025']>;
    category: Attribute.String;
    order: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sponsor.sponsor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sponsor.sponsor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSponsorRegistrationSponsorRegistration
  extends Schema.CollectionType {
  collectionName: 'sponsor_registrations';
  info: {
    singularName: 'sponsor-registration';
    pluralName: 'sponsor-registrations';
    displayName: 'Sponsor Registration';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    email: Attribute.Email;
    company: Attribute.String;
    title: Attribute.String;
    message: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sponsor-registration.sponsor-registration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sponsor-registration.sponsor-registration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStakeholderStakeholder extends Schema.CollectionType {
  collectionName: 'stakeholders';
  info: {
    singularName: 'stakeholder';
    pluralName: 'stakeholders';
    displayName: 'Stakeholder';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Attribute.String;
    title: Attribute.String;
    subjects: Attribute.RichText;
    description: Attribute.Text;
    image: Attribute.Media<'images'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::stakeholder.stakeholder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::stakeholder.stakeholder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubscriptionSubscription extends Schema.CollectionType {
  collectionName: 'subscriptions';
  info: {
    singularName: 'subscription';
    pluralName: 'subscriptions';
    displayName: 'Ticket Subscription';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    email: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::subscription.subscription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::subscription.subscription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTicketTicket extends Schema.CollectionType {
  collectionName: 'tickets';
  info: {
    singularName: 'ticket';
    pluralName: 'tickets';
    displayName: 'Ticket';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    purchase: Attribute.Relation<
      'api::ticket.ticket',
      'manyToOne',
      'api::purchase.purchase'
    >;
    code: Attribute.String & Attribute.Required;
    ticket_type: Attribute.Relation<
      'api::ticket.ticket',
      'oneToOne',
      'api::ticket-type.ticket-type'
    >;
    owner: Attribute.Relation<
      'api::ticket.ticket',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    redemption_user: Attribute.Relation<
      'api::ticket.ticket',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    status: Attribute.Enumeration<['done', 'waiting', 'error']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ticket.ticket',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ticket.ticket',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTicketHistoryTicketHistory extends Schema.CollectionType {
  collectionName: 'ticket_histories';
  info: {
    singularName: 'ticket-history';
    pluralName: 'ticket-histories';
    displayName: 'Ticket History';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    code: Attribute.String;
    purchase: Attribute.Relation<
      'api::ticket-history.ticket-history',
      'manyToOne',
      'api::purchase.purchase'
    >;
    ticket_type: Attribute.Relation<
      'api::ticket-history.ticket-history',
      'oneToOne',
      'api::ticket-type.ticket-type'
    >;
    owner: Attribute.Relation<
      'api::ticket-history.ticket-history',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    redemption_user: Attribute.Relation<
      'api::ticket-history.ticket-history',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    status: Attribute.Enumeration<['done', 'waiting', 'error']>;
    date: Attribute.DateTime;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ticket-history.ticket-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ticket-history.ticket-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTicketLogTicketLog extends Schema.CollectionType {
  collectionName: 'ticket_logs';
  info: {
    singularName: 'ticket-log';
    pluralName: 'ticket-logs';
    displayName: 'Ticket Log';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    date: Attribute.DateTime;
    purchase: Attribute.Relation<
      'api::ticket-log.ticket-log',
      'oneToOne',
      'api::purchase.purchase'
    >;
    tickets: Attribute.Relation<
      'api::ticket-log.ticket-log',
      'oneToMany',
      'api::ticket.ticket'
    >;
    owner: Attribute.Relation<
      'api::ticket-log.ticket-log',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    transfer_from: Attribute.Relation<
      'api::ticket-log.ticket-log',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    redemption: Attribute.Relation<
      'api::ticket-log.ticket-log',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    status: Attribute.Enumeration<['paid', 'unpaid']>;
    payment: Attribute.Enumeration<['bank-transfer', 'credit-card']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ticket-log.ticket-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ticket-log.ticket-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTicketPriceTicketPrice extends Schema.CollectionType {
  collectionName: 'ticket_prices';
  info: {
    singularName: 'ticket-price';
    pluralName: 'ticket-prices';
    displayName: 'Ticket Price';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    price: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    key: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.DefaultTo<'key'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ticket-price.ticket-price',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ticket-price.ticket-price',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTicketTypeTicketType extends Schema.CollectionType {
  collectionName: 'ticket_types';
  info: {
    singularName: 'ticket-type';
    pluralName: 'ticket-types';
    displayName: 'Ticket Type';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    ticket_prices: Attribute.Relation<
      'api::ticket-type.ticket-type',
      'oneToMany',
      'api::ticket-price.ticket-price'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ticket-type.ticket-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ticket-type.ticket-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUserBasketUserBasket extends Schema.CollectionType {
  collectionName: 'user_baskets';
  info: {
    singularName: 'user-basket';
    pluralName: 'user-baskets';
    displayName: 'User Basket';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    count: Attribute.Integer;
    ticket_type: Attribute.Relation<
      'api::user-basket.user-basket',
      'oneToOne',
      'api::ticket-type.ticket-type'
    >;
    user: Attribute.Relation<
      'api::user-basket.user-basket',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    ticket_price: Attribute.Relation<
      'api::user-basket.user-basket',
      'oneToOne',
      'api::ticket-price.ticket-price'
    >;
    active: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    purchase: Attribute.Relation<
      'api::user-basket.user-basket',
      'manyToOne',
      'api::purchase.purchase'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::user-basket.user-basket',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::user-basket.user-basket',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUserCouponUserCoupon extends Schema.CollectionType {
  collectionName: 'user_coupons';
  info: {
    singularName: 'user-coupon';
    pluralName: 'user-coupons';
    displayName: 'User Coupon';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    coupon: Attribute.Relation<
      'api::user-coupon.user-coupon',
      'oneToOne',
      'api::coupon.coupon'
    >;
    user: Attribute.Relation<
      'api::user-coupon.user-coupon',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    active: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::user-coupon.user-coupon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::user-coupon.user-coupon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUserInboxUserInbox extends Schema.CollectionType {
  collectionName: 'user_inboxes';
  info: {
    singularName: 'user-inbox';
    pluralName: 'user-inboxes';
    displayName: 'User Inbox';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    code: Attribute.String & Attribute.Required & Attribute.Unique;
    purchase_user: Attribute.Relation<
      'api::user-inbox.user-inbox',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    ticket_type: Attribute.Relation<
      'api::user-inbox.user-inbox',
      'oneToOne',
      'api::ticket-type.ticket-type'
    >;
    ticket_price: Attribute.Relation<
      'api::user-inbox.user-inbox',
      'oneToOne',
      'api::ticket-price.ticket-price'
    >;
    reedem_email: Attribute.Email;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::user-inbox.user-inbox',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::user-inbox.user-inbox',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::billing-information.billing-information': ApiBillingInformationBillingInformation;
      'api::blog-post.blog-post': ApiBlogPostBlogPost;
      'api::coupon.coupon': ApiCouponCoupon;
      'api::event.event': ApiEventEvent;
      'api::hakkimizda.hakkimizda': ApiHakkimizdaHakkimizda;
      'api::news-subscription.news-subscription': ApiNewsSubscriptionNewsSubscription;
      'api::purchase.purchase': ApiPurchasePurchase;
      'api::speaker.speaker': ApiSpeakerSpeaker;
      'api::sponsor.sponsor': ApiSponsorSponsor;
      'api::sponsor-registration.sponsor-registration': ApiSponsorRegistrationSponsorRegistration;
      'api::stakeholder.stakeholder': ApiStakeholderStakeholder;
      'api::subscription.subscription': ApiSubscriptionSubscription;
      'api::ticket.ticket': ApiTicketTicket;
      'api::ticket-history.ticket-history': ApiTicketHistoryTicketHistory;
      'api::ticket-log.ticket-log': ApiTicketLogTicketLog;
      'api::ticket-price.ticket-price': ApiTicketPriceTicketPrice;
      'api::ticket-type.ticket-type': ApiTicketTypeTicketType;
      'api::user-basket.user-basket': ApiUserBasketUserBasket;
      'api::user-coupon.user-coupon': ApiUserCouponUserCoupon;
      'api::user-inbox.user-inbox': ApiUserInboxUserInbox;
    }
  }
}
