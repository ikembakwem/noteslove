const Query = require("./query");
const Mutation = require("./mutation");
const { DateTimeScalar } = require("graphql-date-scalars");

module.exports = {
  Query,
  Mutation,
  DateTime: DateTimeScalar,
};
