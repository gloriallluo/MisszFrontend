# MisszFrontend

The frontend of MissZ.


## Project setup

```
npm install
```

## Compiles and hot-reloads for development

```
npm run serve
```

## Compiles and minifies for production

### Nginx Setting
```
# nginx.conf
server {
    # Frontend runs at port 80
	listen 80;
	server_name  localhost;
	root /root/to/dist;
	server_name_in_redirect off;
	client_max_body_size 100M;

	location / {
	}

	location /backend/ {
        # Backend runs at port 8000
		proxy_pass http://127.0.0.1:8000/;
	}
}
```

### Run
```
npm run build
sudo nginx
```

### Reload or Stop
```
sudo nginx -s reload
sudo nginx -s stop
```

## Lints and fixes files

```
npm run lint
```

## Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

