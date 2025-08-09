# WhoAmI - 个人网站

一个基于 React + Vite 构建的个人网站项目，支持容器化部署。

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 容器化部署

#### 方式一：使用 docker-compose（推荐）

```bash
# 克隆项目
git clone <your-repo-url>
cd WhoAmI

# 一键部署
./deploy.sh
```

#### 方式二：手动 Docker 命令

```bash
# 构建镜像
docker build -t whoami .

# 运行容器（使用8080端口避免冲突）
docker run -d -p 8080:80 --name whoami-web whoami
```

#### 方式三：使用 docker-compose

```bash
# 启动服务
docker-compose up -d

# 查看状态
docker-compose ps

# 查看日志
docker-compose logs

# 停止服务
docker-compose down
```

## 📁 项目结构

```
.
├── src/                 # 源代码
│   ├── App.jsx         # 主应用组件
│   ├── App.css         # 样式文件
│   └── ...
├── public/             # 静态资源
├── Dockerfile          # Docker 构建文件
├── docker-compose.yml  # Docker Compose 配置
├── nginx.conf          # Nginx 配置
├── deploy.sh           # 部署脚本
└── README.md           # 项目说明
```

## 🔧 配置说明

### Dockerfile
- 使用多阶段构建，优化镜像大小
- 基于 nginx:alpine 提供静态文件服务
- 支持 React Router 的 SPA 路由

### nginx.conf
- 配置了 React Router 支持
- 启用 Gzip 压缩
- 设置静态资源缓存
- 添加安全头

### docker-compose.yml
- 简化容器管理
- 包含健康检查
- 支持自动重启
- 使用自定义网络避免容器冲突
- 默认使用8080端口（可自定义）

## 🔧 多容器环境配置

### 避免端口冲突

如果服务器上已有其他容器使用80端口，可以修改 `docker-compose.yml` 中的端口映射：

```yaml
services:
  web:
    ports:
      - "8080:80"  # 改为其他可用端口，如8080、3000、9000等
```

### 自定义端口部署

```bash
# 方式一：修改docker-compose.yml后部署
vim docker-compose.yml  # 修改端口
./deploy.sh

# 方式二：使用环境变量（需要先修改docker-compose.yml支持环境变量）
PORT=9000 docker-compose up -d

# 方式三：直接使用docker命令指定端口
docker run -d -p 9000:80 --name whoami-web-9000 whoami
```

### 网络隔离

项目使用自定义网络 `whoami-network`，与其他容器网络隔离：

```bash
# 查看网络
docker network ls

# 查看网络详情
docker network inspect whoami-network

# 如果需要容器间通信，可以将其他容器加入同一网络
docker network connect whoami-network other-container
```

### 常见端口冲突解决

```bash
# 检查端口占用
sudo netstat -tlnp | grep :80
sudo lsof -i :80

# 查看所有容器端口映射
docker ps --format "table {{.Names}}\t{{.Ports}}"

# 停止冲突的容器
docker stop conflicting-container
```

## 🌐 部署到服务器

### 腾讯云轻量应用服务器部署

1. **安装 Docker 和 docker-compose**
```bash
# 安装 Docker
curl -fsSL https://get.docker.com | bash
sudo systemctl start docker
sudo systemctl enable docker

# 安装 docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

2. **克隆项目并部署**
```bash
# 克隆项目
git clone <your-repo-url>
cd WhoAmI

# 执行部署
./deploy.sh
```

3. **配置防火墙**
```bash
# 开放 8080 端口（根据实际使用的端口调整）
sudo ufw allow 8080
sudo ufw enable

# 如果使用其他端口，相应调整
# sudo ufw allow 9000
```

### 其他云服务器

部署步骤基本相同，只需确保：
- 安装了 Docker 和 docker-compose
- 开放了 80 端口
- 有足够的内存和存储空间

## 📝 常用命令

```bash
# 查看容器状态
docker-compose ps

# 查看实时日志
docker-compose logs -f

# 重启服务
docker-compose restart

# 更新部署
git pull
./deploy.sh

# 清理未使用的镜像
docker image prune -f
```

## 🛠️ 故障排除

### 容器无法启动
```bash
# 查看详细日志
docker-compose logs web

# 检查端口占用
sudo netstat -tlnp | grep :80
```

### 应用无法访问
```bash
# 检查容器状态
docker-compose ps

# 检查防火墙
sudo ufw status

# 测试本地访问（根据实际端口调整）
curl http://localhost:8080

# 检查端口是否被占用
sudo netstat -tlnp | grep :8080

# 查看容器日志
docker-compose logs web
```

## 📄 许可证

MIT License
