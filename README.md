# MisszFrontend

The frontend of MissZ.



## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### Nginx 联网调试方法

#### 配置 Nginx

配置 `nginx.conf` 文件，把 `server` 一项改成：

```
server {
	listen 80; # 前端项目运行在 80 端口
	server_name  localhost;
	# 改成自己项目的 dist 的路径
	root /Users/gloriallluo/WebstormProjects/missz-frontend/dist;
	server_name_in_redirect off;
	client_max_body_size 100M;

	location / {
	}

	location /backend/ {
		proxy_pass http://127.0.0.1:8000/;
	}
}
```



#### 本地调试

```shell
npm run build
sudo nginx
```

结束运行：

```shell
sudo nginx -s stop
```

