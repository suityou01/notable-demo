# Running locally 

### Create Environment file
```bash
echo "DATABASE_URL='mysql://notable_user:n0tabl3@localhost:3306/notable_db'" > backend/.env
```

# Docker
### Initial setup

```bash
docker-compose --profile dbinit up --build
```

### Full stack
```bash
docker-compose --profile fullstack up
```

### DB Only 
```bash
docker-compose --profile dbonly
```


