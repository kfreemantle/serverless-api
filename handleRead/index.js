const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema({
  id: String,
  name: String,
  age: Number,
});

const peopleModel = dynamoose.model('people', schema);

exports.handler = async (event) => {
  const personId = event.pathParameters && event.pathParameters.id;
  const response = { statusCode: null, body: null };

  try {
    if (personId) {
      const person = await peopleModel.get(personId);
      response.body = JSON.stringify(person);
      response.statusCode = 200;
    } else {
      const people = await peopleModel.scan().exec();
      response.body = JSON.stringify(people);
      response.statusCode = 200;
    }
  } catch (e) {
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }

  return response;
};
