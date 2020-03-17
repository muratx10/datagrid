import faker from 'faker';

faker.seed(100);

const generateFakeData = (id) => ({
  id,
  name: faker.name.findName(),
  birthDate: faker.date.past(20).toUTCString(),
  startTime: faker.date.past(5).getTime(),
  bankName: `${faker.lorem.word()} Bank`.toUpperCase(),
  amount: Math.trunc(faker.finance.amount()),
  currency: faker.finance.currencyName(),
  gender: faker.random.boolean(),
  card: faker.random.arrayElement(['Visa', 'Mastercard', 'Maestro']),
  // eslint-disable-next-line max-len,no-undef
  // status: tableHeader.status[faker.random.number(tableHeader.status.length
  // - 1)], // enum
  locationName: {
    city: faker.address.city(),
    zipcode: faker.address.zipCode(),
  }, // object
  isActive: faker.random.boolean(), // boolean
});

export const generateFakeArray = (recordsCount) => [...new Array(recordsCount)]
  .map((_, index) => generateFakeData(1 + index));

export const fakeData = generateFakeArray(1000);
