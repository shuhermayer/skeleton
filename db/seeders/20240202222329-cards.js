const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cardArray = [
      {
        title: 'Card 1',
        description: 'Card 1 description',
        image: faker.image.urlLoremFlickr({ category: 'cats', width: 200, height: 200 }),
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Card 2',
        description: 'Card 2 description',
        image: faker.image.urlLoremFlickr({ category: 'cats', width: 200, height: 200 }),
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Card 3',
        description: 'Card 3 description',
        image: faker.image.urlLoremFlickr({ category: 'cats', width: 200, height: 200 }),
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Card 4',
        description: 'Card 4 description',
        image: faker.image.urlLoremFlickr({ category: 'cats', width: 200, height: 200 }),
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    await queryInterface.bulkInsert('Cards', cardArray, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
