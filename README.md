# 神界：原罪（增强版）合成配方表（中文）

本项目把配方数据做成中文，并提供一个不依赖第三方 JS 的中文页面用于浏览、搜索与排序。

## 文件说明

- recipe_list.en.json：原始英文配方
- recipe_list.zh-CN.json：中文化后的配方
- translation_map.zh-CN.json：英文→中文词条映射（可手动微调以更贴近游戏内文本）
- tools/localize_zh_cn.mjs：中文化生成脚本

## 运行方式

由于页面通过 fetch 读取 JSON，建议用本地 HTTP 服务打开 index.html（直接用 file:// 打开在部分浏览器会被拦截）。

最简单方式：

```powershell
node app.js
```

然后浏览器打开输出的地址（默认 http://localhost:4173/）。
