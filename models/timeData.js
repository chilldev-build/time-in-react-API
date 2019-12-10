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

  static async getById(e_id) {
    try {
      const response = await db.any(
        `SELECT id, starttime, endtime, round(cast(extract(minutes from hours)/60 + extract(hours from hours) as numeric),2) as hours 
        From time_punch WHERE eeid = $1 and starttime > '2019-10-21 00:00:00' ORDER BY ID;`, [e_id]
      );
      return response;
    } catch (err) {
      return err.message;
    }
  }

  async addStartTime(e_id) {
    try {
      const response = await db.result(
        `
            insert into time_punch (eeid, starttime) Values ( $1 , '${this.starttime}') RETURNING starttime;`,
        [e_id]
      );
      console.log(response);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  async addEndTime(e_id) {
    console.log("this is endtime");
    try {
      const response = await db.result(
        `UPDATE time_punch SET endtime = '${this.endtime}' 
            WHERE id = (select id from time_punch where eeid = $1 
            and endtime isnull and starttime >
            '2019-10-25 12:15:00')
             RETURNING endtime;`,
        [e_id]
      );
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async addHours(e_id) {
    try {
      const response = await db.result(
        `
            update time_punch set hours = (select endtime-starttime as hours from time_punch 
            where id =  (select max(id) from time_punch where eeid =$1)) where id = (select max(id) from
            time_punch where eeid = $2) RETURNING ID;`,
        [e_id, e_id]
      );
      console.log(response);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async getYears(e_id) {
    try {
      const response = await db.any(
        `
        SELECT DISTINCT cast(EXTRACT(year FROM period_end) AS numeric) AS year FROM calendar WHERE co_cid = (SELECT co_cid FROM employee WHERE id = $1) ORDER BY year;`,
        [e_id]
      );
      console.log(response);
      return response;
    } catch (err) {
      return err.message;
    }
  }

};



module.exports = Time;
