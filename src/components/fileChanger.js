import fs from "fs";
export function readFile(fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (err, data) {
      if (err) throw err;
      resolve(JSON.parse(data));
    });
  });
}
export function writeFile(fileName, data) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(fileName, data, (err) => {
      if (err) throw err;
    });
  });
}
