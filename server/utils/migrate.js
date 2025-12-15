const fs = require('fs');
const path = require('path');
const { run } = require('../config/database');

const runMigrations = async () => {
  const migrationsDir = path.join(__dirname, '../../database/migrations');
  const seedsDir = path.join(__dirname, '../../database/seeds');
  
  try {
    // Ejecutar migraciones
    const migrationFiles = fs.readdirSync(migrationsDir).sort();
    console.log('🔄 Ejecutando migraciones...');
    
    for (const file of migrationFiles) {
      if (file.endsWith('.sql')) {
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        await run(sql);
        console.log(`✅ Migración ejecutada: ${file}`);
      }
    }
    
    // Ejecutar seeds
    const seedFiles = fs.readdirSync(seedsDir).sort();
    console.log('🌱 Ejecutando seeds...');
    
    for (const file of seedFiles) {
      if (file.endsWith('.sql')) {
        const sql = fs.readFileSync(path.join(seedsDir, file), 'utf8');
        await run(sql);
        console.log(`✅ Seed ejecutado: ${file}`);
      }
    }
    
    console.log('🎉 Base de datos inicializada correctamente');
  } catch (error) {
    console.error('❌ Error en migraciones:', error);
  }
};

module.exports = { runMigrations };