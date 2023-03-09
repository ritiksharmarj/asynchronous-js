const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
   return new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
         if (err) reject('Not found!');
         resolve(data);
      });
   });
};

const writeFilePromise = (file, data) => {
   return new Promise((resolve, reject) => {
      fs.writeFile(file, data, (err) => {
         if (err) reject('Could not write file 😢');
         resolve('Success.');
      });
   });
};

readFilePromise(`${__dirname}/dog.txt`)
   .then((data) => {
      console.log(`Breed: ${data}`);

      return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
   })
   .then((res) => {
      console.log(res.body.message);
      return writeFilePromise('dog-img.txt', res.body.message);
   })
   .then(() => {
      console.log('Random dog image saved to file!');
   })
   .catch((err) => {
      console.log(err.message);
   });

/*
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
   console.log(`Breed: ${data}`);

   superagent
      .get(`https://dog.ceo/api/breed/${data}/images/random`)
      // callback
      // .end((err, res) => {
      //    // Calling the end function will send the request
      //    if (err) return console.log(err.message);
      //    console.log(res.body.message);

      //    fs.writeFile('dog-img.txt', res.body.message, (err) => {
      //       console.log('Random dog image saved to file!');
      //    });
      // });

      // promise with then/catch
      .then((res) => {
         console.log(res.body.message);
         fs.writeFile('dog-img.txt', res.body.message, (err) => {
            console.log('Random dog image saved to file!');
         });
      })
      .catch((err) => {
         console.log(err.message);
      });
});
*/
