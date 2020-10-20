# Migration `20200708155140-add-vote-model`

This migration has been generated by Marc Woolliscroft at 7/8/2020, 3:51:40 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "Vote" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"linkId" INTEGER NOT NULL,
"userId" INTEGER NOT NULL,FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE UNIQUE INDEX "Vote.linkId_userId" ON "Vote"("linkId","userId")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200708091516-add-user-model..20200708155140-add-vote-model
--- datamodel.dml
+++ datamodel.dml
@@ -1,25 +1,37 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model Link {
-  id Int @id @default(autoincrement())
-  createdAt DateTime @default(now())
+  id          Int      @id @default(autoincrement())
+  createdAt   DateTime @default(now())
   description String
-  url String
-  postedBy User? @relation(fields: [postedById], references: [id])
-  postedById Int?
+  url         String
+  postedBy    User?    @relation(fields: [postedById], references: [id])
+  postedById  Int?
+  Vote        Vote[]
 }
 model User {
-  id Int @id @default(autoincrement())
-  name String
-  email String @unique
+  id       Int    @id @default(autoincrement())
+  name     String
+  email    String @unique
   password String
-  links Link[]
+  links    Link[]
+  Vote     Vote[]
 }
+
+model Vote {
+  id     Int  @id @default(autoincrement())
+  link   Link @relation(fields: [linkId], references: [id])
+  linkId Int
+  user   User @relation(fields: [userId], references: [id])
+  userId Int
+
+  @@unique([linkId, userId])
+}
```

