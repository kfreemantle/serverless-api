const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema({
  id: String,
  name: String,
  age: Number,
});

const peopleModel = dynamoose.model('people', schema);

exports.handler = async (event) => {
  const parsedBody = JSON.parse(event.body);
  console.log(parsedBody);

  const response = { statusCode: null, body: null };

  try {
    const newPerson = await peopleModel.create(parsedBody);
    response.body = JSON.stringify(newPerson);
    response.statusCode = 200;
  } catch (e) {
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }

  return response;
};
