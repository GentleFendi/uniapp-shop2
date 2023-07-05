---
title: uni-shop-2,
author: Fendi,
date: 2023/7/2,
details: 'A starter uniapp development project, for reference only.'
---

# uni-shop-2 微信小程序

---

## Git 管理项目

- ==本地管理==

  - 在项目中新建	`.gitignore`	忽略文件，指定忽略不需要`Git`管理的文件

    - ```gitignore
      # 忽略以下两个目录，以下两个目录不需要进行 Git 管理
      /node_modules		npm包目录，所有第三方包都在里面
      /unpackage/dist		运行项目时自动生成的文件
      ```

    - > 由于忽略了`unpackage`文件中的`dist`目录，因此默认情况下`unpackage`不会被`Git`追踪
      >
      > 为了让`Git`能够正常追踪`unpackage`目录，我们需要在`unpackage`目录下创建一个`.gitkeep`文件进行占位

  - 右键项目文件  `>`  打开  **Git Bash Here**

  - `git init`  >  `git status`  >  `git add .`  >  `git commit -m "init project"`  >  `git status`

    - `git status`：查看跟踪的文件，红色未跟踪、绿色已跟踪

    - `git add .`：将所有文件加入到暂存区

    - `git commit -m "提交的消息"`：本地提交更新

    - 提交完成后再次查看`git status`提示信息

      - ```
        // 处于 master 主分支
        > On branch master
        // 工作目干净，没有任何工作等待提交
        > nothing to commit, working tree clean
        ```

  - 完成以上操作后项目里会生成一个`.git`文件

- ==配置`SSH`公钥==

  - 生成并配置`SSH`公钥，打开 **Git Bash Here**，输入：`ssh-keygen -t rsa`

    - 一直回车，默认在 C盘用户文件下生成一个`.ssh`公钥文件

    - 输入：`cat ~/.ssh/id_rsa.pub`查看公钥，复制公钥

      ```
      > ssh-keygen -t rsa		// 生成 SSH 公钥文件
      > cat ~/.ssh/id_rsa.pub	// 查看公钥
      ```

  - `https://github.com/settings/keys`新建`New SSH key`，将复制的公钥粘贴上去创建SSH公钥

  - 打开 **Git Bash Here**  运行`ssh -T git@github.com`检测公钥是否配置成功，回答`yes`

    - ```
      > ssh -T git@github.com
      Are you sure you want to continue connecting (yes/no/[fingerprint])?	yes
      Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
      Hi GentleFendi! You've successfully authenticated, but GitHub does not provide shell access.
      ```

    - 以上状况就代表配置成功

- ==创建、上传`GitHub`远程仓库==

  - 创建一个储存库，选择`SSH`链接，直接复制`...or push an existing repository from the command line`下的代码

  - 打开项目文件，打开`Git Bash Here`，粘贴运行上面复制的代码，例如：

    - ```
      > git remote add origin git@github.com:GentleFendi/Java_back_end_interface.git
      > git branch -M main
      > git push -u origin main
      ```

  - 进度`100%`上传及为成功

- ==注意事项！！！==

   如果进行`Git`上传操作时报错：

   说明项目文件中没有`.git`文件，只需==本地管理==步骤重新做。

   ```
   > fatal: Not a git repository (or any of the parent directories): .git		// 没有 .git 配置文件
   ```

---

- ==Git 创建分支==

	> 基于`master/main`主分支在本地创建一个`A`子分支，用来开发`A`子分支的相关功能

	```
	> git checkout -b A							// 创建分支 A
	> git branch								// 查看所有分支
	```

- ==Git 分支提交与合并==

1. 将本地的`A`分支进行本地的`commit`提交：

   ```
   > git add .
   > git status
   > git commit -m "完成了 A 分支的开发"
   ```

2. 将本地的`A`分支推送到远程仓库保存:

   ```
   > git push -u origin A
   ```

3. 将本地的`A`分支合并到本地的`master / main`主分支:

   ```
   > git branch								// 查看当前分支
   > git checkout master / main				// 切换主分支
   > git merge A								// 将 A 分支与 master / main 主分支合并
   ```

4. 删除本地的`A`分支:

   ```
   > git branch -d A
   ```

   

---

## 项目结构

| 文件   | 分类 | 介绍         |
| ------ | ---- | ------------ |
| `Home` | 页面 | 主页面       |
| `Cate` | 页面 | 分类页面     |
| `Cart` | 页面 | 购物车页面   |
| `User` | 页面 | 用户信息页面 |
|        |      |              |
|        |      |              |

