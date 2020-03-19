import faker from 'faker';

const moment = require('moment');

faker.seed(100);

const generateFakeData = (id) => ({
  id,
  name: faker.name.findName(),
  birthDate: moment(faker.date.past(20)).format('ll'),
  startTime: faker.date.past(5).getTime(),
  companyName: `${faker.company.companyName()} LLC`.toUpperCase(),
  amount: Math.trunc(faker.finance.amount()),
  currency: faker.finance.currencyName(),
  residence: faker.random.boolean(),
  card: faker.random.arrayElement(['Visa', 'Mastercard', 'Maestro', 'Halva']),
  locationName: {
    city: faker.address.city(),
    zipcode: faker.address.zipCode(),
  },
  isActive: faker.random.boolean(),
});

export const generateFakeArray = (recordsCount) => [...new Array(recordsCount)]
  .map((_, index) => generateFakeData(1 + index));

export const fakeData = generateFakeArray(1500);
