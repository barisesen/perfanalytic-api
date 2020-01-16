module.exports.show = (request, reply) => {
  return reply.code(200).send({ demo: request.query });
};


module.exports.store = (request, reply) => {
  console.log(request.body);

  return reply.code(200).send();
};
