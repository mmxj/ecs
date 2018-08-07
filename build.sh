#!/bin/bash

echo "删除原有文件"

rm -f ../../index.html
rm -rf ../../static

echo "成功删除文件"
echo "开始重新构建"

gulp

npm run build

echo "构建完毕"
# echo "复制微信授权校验文件"
# cp ./MP_verify_wMziy7yj3cVbz4mj.txt ./dist/
# echo "复制成功"
