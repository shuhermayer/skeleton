/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cardArray = [
      {
        title: 'Card 1',
        description: 'Card 1 description',
        image: 'https://dummyjson.com/image/400x200/008080/ffffff?text=Card+1!&fontSize=22',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Card 2',
        description: 'Card 2 description',
        image: 'https://dummyjson.com/image/400x200/008080/ffffff?text=Card+2!&fontSize=22',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Card 3',
        description: 'Card 3 description',
        image: 'https://dummyjson.com/image/400x200/008080/ffffff?text=Card+3!&fontSize=22',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Card 4',
        description: 'Card 4 description',
        image: 'https://dummyjson.com/image/400x200/008080/ffffff?text=Card+4!&fontSize=22',
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
