'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE ,TEXT, UUID, UUIDV4, DECIMAL } = app.Sequelize;

  const Project = app.model.define('project', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING,
    description: STRING,
    content: TEXT,
    project_type: INTEGER,
    donation: STRING,
    money: STRING,
    province: STRING,
    province_code: STRING,
    city:DATE,
    city_code:DATE,
    district:DATE,
    location:DATE,
    group_id:DATE,
    cover:DATE,
    thumb:DATE,
    qrcode:DATE,
    liable:DATE,
    mobile:DATE,
    grade:DATE,
    project_state:DATE,
    status:DATE,
    reason:DATE,
    sort:DATE,
    operate:DATE,
    end_time:DATE

  });

  return Project;
};
