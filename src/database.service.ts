import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      // Crear la base de datos 'todotasks' si no existe
      await queryRunner.query(`CREATE DATABASE "todotasks"`);

      // Otorgar todos los privilegios al usuario 'postgres' en la base de datos 'todotasks'
      await queryRunner.query(`
        GRANT ALL PRIVILEGES ON DATABASE "todotasks" TO postgres;
      `);

      // Asegurar que 'postgres' tenga permisos sobre todas las tablas actuales y futuras en el esquema 'public'
      await queryRunner.query(`
        ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres;
      `);

    } catch (error) {
      // Si la base de datos ya existe, ignora el error específico, de lo contrario, muestra el error
      if (error.code !== '42P04') { // Código de error para "database already exists" en PostgreSQL
        console.error('Error setting up database and user:', error);
      }
    } finally {
      await queryRunner.release();
    }
  }
}
