# ustrip

Strip utm tracking tokens from a url to open or copy

https://mhio.github.com/ustrip


## Project setup
```
# Add letsencrypt plugin if not installed
dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
dokku apps:create ustrip
dokku domains:add ustrip ustrip.example.com
dokku config:set --no-restart sstrip DOKKU_LETSENCRYPT_EMAIL=admin@example.com
dokku letsencrypt:enable sstrip
git remote add dokku dokku@ustrip.example.com:ustrip
git push dokku main
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production, in container
```
./make.sh build
```

### Lints and fixes files
```
yarn lint
```
