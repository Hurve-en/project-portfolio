# 1. write the SQL file from schema.ts

npx drizzle-kit generate --name=create-projects
[✓] Your SQL migration file ➜ drizzle/0000
\_
create-projects.sql

# 2. apply every file the database has not run yet

npx drizzle-kit migrate
[✓] migrations applied successfully!

npx tsx db/seed.ts
