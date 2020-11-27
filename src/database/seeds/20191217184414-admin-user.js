const { uuid } = require('uuidv4');

const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          id: uuid(),
          name: 'Administrador',
          email: 'admin@admin.com',
          password_hash: bcrypt.hashSync('123456', 8),
          role: 'admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
