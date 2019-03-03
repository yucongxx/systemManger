使用方法：
	1.	需要安装node / mongoDB    https://www.mongodb.com/ 安装

	启动数据库:
		找到C:\Program Files\MongoDB\Server\3.4\bin

		.\mongod --dbpath=数据库存放的位置 --port=27017 
	
	2.	使用npm install 安装依赖项

	3.	npm run dev  运行服务

	4.	在http://localhost:88 访问

	npm i nrm -g

	nrm test  查看哪个速度快

	nrm use cnpm  切换镜像

	





用户登录/注册： /api/user/register  /api/user/login (失败是-3)
	post  
		username: xxx
		password: xxx
	return
		{code:0,msg:提示信息}

		code:0 成功
		code:1 失败

用户验证用户名是否存在：/api/user/verifyuser
	post
			username:xxx
	return
		{code:0,msg:提示信息}

		code:0 成功
		code:1 失败





添加数据：  /api/product
	get
		act		add
		content		输入的内容
	return
		code   0为成功
		msg	   提示信息
		id		返回id
		time	返回时间戳

获取页码：  /api/product
	get
		act		get_page_count
		
	return
		code   0为成功
		msg	   提示信息
		count	页码

获取数据：  /api/product
	get
		act		get
		page	页码
	return
		数据数组
		若失败：
			code   错误码
			msg	   提示信息

审核数据是否通过：  /api/product
		geta
		act        audit
		id         id
		pPut       通过或不通过
	return 
		数据数组
		失败：
			code  错误码
			msg   提示信息

添加订单信息
http://localhost:88/api/order?act=add&oPrice=180&oMount=2&oAccount=191000&oPayMethod=0


删除：   /product
	get
		act		del
		id		id
	return
		code   0为成功
		msg	   提示信息
