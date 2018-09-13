const fs = require('fs');
const mongoose = require('mongoose');
const School = require('./school_model');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => console.log('DB Connected'))
  .catch(err => console.log('DB failed to connect', err));


fs.readFile('./schools.json', 'utf8', async function(err, schoolFileData){
  const schools = JSON.parse(schoolFileData);
  console.log(schools.length);

  await School.remove({});

  schools.forEach(school => {
    School.create({
      name: school.name,
      aliases: school.alias,
    });
  });
});

