const db = require("../helper/db");
const jwt = require("jsonwebtoken");
module.exports = {
  search: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM topup", (err, res) => {
        if (!err) {
          resolve(res);
        }
      });
    });
  },
  changePassword: (id, password, newPassword) => {
    db.query("SELECT password FROM user WHERE id=?", id, (err, result) => {
      // console.log(result[0].password);
      if (!err) {
        bcrypt.compare(password, result[0].password, (err, result) => {
          if (result) {
            bcrypt.hash(newPassword, 10, (err, hashNewPassword) => {
              if (!err) {
                db.query(
                  "UPDATE user SET password=? WHERE id=? ",
                  hashNewPassword,
                  id,
                  (err, result) => {
                    if (!err) {
                      resolve(result);
                    } else {
                      return reject(err);
                    }
                  }
                );
              } else {
                return reject(err);
              }
            });
          }
        });
      } else {
        return reject(err);
      }
    });
  },
  changePin: (id, newPin) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE user SET pin=${newPin} WHERE id=${id}`, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  },
  patchUser: (id, body, image) => {
    const data = Object.entries(body).map((item) => {
      return parseInt(item[1]) > 0
        ? `${item[0]}=${item[1]}`
        : `${item[0]}='${item[1]}'`;
    });
    const imageUpload = `${image}`;
    console.log(`${data}`, imageUpload);
    return new Promise((resolve, reject) => {
      // const imageUpload = `${image}`;
      if (imageUpload != "undefined") {
        console.log("ini fhoto");
        db.query(
          `UPDATE user SET img='${imageUpload}', ${data} WHERE id = ${id}`,
          (err, res) => {
            console.log(err);
            console.log(res);
            if (!err) {
              resolve(res);
            } else {
              reject(err);
            }
          }
        );
      } else if (data) {
        console.log("ini data");
        db.query(`UPDATE user SET ${data}  WHERE id = ${id}`, (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      } else {
        let data = "err";
        reject(data);
      }
    });
  },

  //hamzah
  home: (token) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select balance, phoneNumber from user where id=${token.id}`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  //edit sinta
  homehistory: (token, search, sortBy, sortType, limit, page) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select transfer.*, u1.fullName as sender,u2.fullname as receiveBy, u1.img from transfer 
                    inner join user as u1 on transfer.sendBy=u1.id 
                    inner join user as u2 on transfer.receiver=u2.id
                    where (sendBy=${token.id} or receiver=${token.id}) && (u2.fullname like '%${search}%') 
                    order by ${sortBy} ${sortType} limit ${limit} OFFSET ${page}`,
        (err, res) => {
          if (!err) {
            // data["data"] = res;
            // console.log(res, "percobaan kesekian");
            resolve(res);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  getAllUser: (search, sortBy, sortType, limit, page) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select id, fullName, email, password, pin, phoneNumber, balance, img, createdDate, isActive from user where isActive=1 and roleId=100 and fullName like '%${search}%'
                    order by ${sortBy} ${sortType} limit ${limit} OFFSET ${page}`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  getUserById: (token) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select fullName, email, password, pin, phoneNumber, balance, img, createdDate from user where id= ${token.id} and isActive = 1`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  deactivateUser: (id, active) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update user set isActive=${active} where id= ${id}`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  },
};
