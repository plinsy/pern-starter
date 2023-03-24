# Jarvis

## Comment installer l'application?

```bash
git clone git@github.com:esmia-hackaton/jarvis.git
```

```bash
cd jarvis/
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

### Les routes disponibles

#### Serveur

```text
GET /
```

```text
POST /api/login
```
