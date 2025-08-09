#!/bin/bash

# 部署脚本
# 使用方法：./deploy.sh

set -e

echo "🚀 开始部署 WhoAmI 项目..."

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

# 检查docker-compose是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose 未安装，请先安装 docker-compose"
    exit 1
fi

# 停止并删除旧容器
echo "🛑 停止旧容器..."
docker-compose down --remove-orphans

# 删除旧镜像（可选）
echo "🗑️  清理旧镜像..."
docker image prune -f

# 构建新镜像
echo "🔨 构建新镜像..."
docker-compose build --no-cache

# 启动容器
echo "▶️  启动容器..."
docker-compose up -d

# 等待容器启动
echo "⏳ 等待容器启动..."
sleep 10

# 检查容器状态
echo "📊 检查容器状态..."
docker-compose ps

# 检查健康状态
echo "🏥 检查应用健康状态..."
if curl -f http://localhost:8080 > /dev/null 2>&1; then
    echo "✅ 部署成功！应用已在 http://localhost:8080 运行"
else
    echo "❌ 部署可能有问题，请检查日志：docker-compose logs"
    exit 1
fi

echo "🎉 部署完成！"