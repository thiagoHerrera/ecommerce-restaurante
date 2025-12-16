const { get, all } = require('./config/database');
const bcrypt = require('bcryptjs');

async function testDB() {
  try {
    console.log('Testing database...');
    
    const users = await all('SELECT * FROM users');
    console.log('Users in DB:', users);
    
    const admin = await get('SELECT * FROM users WHERE email = ?', ['admin@worchi-food.com']);
    console.log('Admin user:', admin);
    
    if (admin) {
      const testPassword = 'admin123';
      const isValid = await bcrypt.compare(testPassword, admin.password);
      console.log('Password test result:', isValid);
      console.log('Stored hash:', admin.password);
      console.log('Expected hash for admin123:', await bcrypt.hash('admin123', 10));
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testDB();