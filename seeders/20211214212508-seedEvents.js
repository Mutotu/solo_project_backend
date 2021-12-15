"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */ await queryInterface.bulkInsert("events", [
      {
        name: "Soft Ride",
        city: "San Francisco",
        state: "CA",
        date: "12/12/12",
        type: "Casual",
        details: "A ride through Fisherman's Warf",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hard Ride",
        city: "East Bay",
        state: "CA",
        date: "12/12/21",
        type: "Timed",
        details: "A ride through Rough Terrain",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Moderate Ride",
        city: "Highway 5",
        state: "CA",
        date: "12/12/22",
        type: "Smooth",
        details: "A ride through Pacifica",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mellow Ride",
        city: "Halfmoon Bay",
        state: "CA",
        date: "12/12/23",
        type: "Casual",
        details: "A ride through Halfmoon Bat",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hard Ride",
        city: "Tracy",
        state: "CA",
        date: "12/12/22",
        type: "Hard core",
        details: "A ride through no road!",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
