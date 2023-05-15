# PERN

## Comment installer l'application?

```bash
git clone git@github.com:esmia-hackaton/PERN.git
```

```bash
cd PERN/
```

```bash
npm install
```

Créer un `.env` à la racine du projet

```text
PORT=5000
DB_NAME=evaluationdb
DB_USERNAME=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET="No secret between us"
```

**Importer la configuration de la BDD qui se trouve dans `config/db.sql`**

Lancer le serveur

```bash
npm start
```

Le serveur est disponible à l'adrese http://localhost:5000

## Lancer le serveur client

```bash
cd ./client/
```

```bash
npm install
```

```bash
npm start
```

Le serveur du client est lancé à l'adresse http://localhost:3000

## Documentation

### Quelles sont les dépendances par défaut

Server

```json
{
  "dependencies": {
    "bcrypt": "^5.1.0",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.2",
    "bootstrap": "^5.3.0-alpha1",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "pg": "^8.10.0",
    "sequelize": "^6.29.3"
  },
  "devDependencies": {
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/jsonwebtoken": "^9.0.1",
    "@types/node": "^18.15.3",
    "nodemon": "^2.0.21",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.2"
  }
}
```

Client

```json
{
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.16",
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "animate.css": "^4.1.1",
    "axios": "^1.3.4",
    "bootstrap": "^5.0.0",
    "formik": "^2.2.9",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-jwt": "^1.1.8",
    "react-router-dom": "^6.9.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4",
    "yup": "^1.0.2"
  }
}
```

### Les routes disponibles

#### Serveur

Accueil

```bash
GET /
```

Connexion

```bash
POST /api/login
```

Inscription

```bash
POST /api/register
```

Compte

```bash
GET /me
```

#### Client

```bash
GET /
```

```bash
GET /accounts/login
```

```bash
GET /accounts/register
```

```bash
GET /dashboard # accessible uniquement lorsque l'utilisateur est connecté
```

```bash
GET /accounts
```
