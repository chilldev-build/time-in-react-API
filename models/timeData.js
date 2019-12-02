const db = require("./conn.js");

class Time {
  constructor(id, eeid, starttime, endtime, active) {
    this.id = id;
    this.eeid = eeid;
    this.starttime = starttime;
    this.starttime = starttime;
    this.endtime = endtime;
    this.active = active;
  }

  static async getAll() {
    try {
      const response = await db.any(`select * from time_punch;`);
      console.log(response);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async getById(e_id) {
    try {
      const response = await db.any(
        `select * from time_punch where eeid = ${e_id}`
      );
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async removeEntry(p_id) {
    try {
      const response = await db.result(`delete from posts where id = ${p_id}`);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async addEntry(title, author_id, content) {
    const query = `INSERT INTO posts (title, author_id, content) VALUES ('${title}', ${author_id}, '${content}')`;

    try {
      const response = await db.result(query);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async updateEntry(id, column, content) {
    const query = `UPDATE posts SET ${column} = ${content} WHERE id = '${id}'`;
    try {
      const response = await db.result(query);
      return response;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Time;