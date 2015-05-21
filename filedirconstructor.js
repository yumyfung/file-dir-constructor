var fileDirConstructor = {
	//处理根目录
	getRoot: function(root){
		return '<div class="line"><span class="text">' + root + '</span></div>';
	},
	//按路径去画出空格和竖线，path数组0~path.length-1之间的数值就是路径的表示
	//true表示画&#xA0; false表示画&#x2502;
	getSpace: function(path){
		var str = '';
		for(var i = 0; i< path.length - 1; i++){
			if(path[i]){
				str += '&#xA0;&#xA0;&#xA0;&#xA0;';
			}else {
				str += '&#x2502;&#xA0;&#xA0;&#xA0;';
			}
		}
		return str;
	},
	//绘制字符│
	getBase1: function(path){
		return str = '<div class="line"><span class="text">'+ this.getSpace(path) +'&#x2502;</span></div>';
	},
	//绘制字符├──
	getBase2: function(dir, path){
		return str = '<div class="line"><span class="text">'+ this.getSpace(path) +'&#x251C;&#x2500;&#x2500;&#xA0;' + dir + '&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;</span></div>';
	},
	//绘制字符└──
	getBase3: function(dir, path){
		return str = '<div class="line"><span class="text">'+ this.getSpace(path) +'&#x2514;&#x2500;&#x2500;&#xA0;' + dir + '</span></div>';
	},
	//递归深度遍历处理目录
	getDir: function(dir, str, path){
		for(var i = 0; i < dir.length; i++){
			//记录路径
			if(i == dir.length - 1){
				path.push(true);
			}else {
				path.push(false);
			}
			if(typeof dir[i] == 'string'){
				if(i == dir.length - 1){
					str += this.getBase3(dir[i], path);
				}else {
					str += this.getBase2(dir[i], path);
				}

			}else if(typeof dir[i] == 'object'){
				for(var key in dir[i]){
					if(i == dir.length - 1){
						str += this.getBase1(path) + this.getBase3(key, path);
					}else {
						str += this.getBase1(path) + this.getBase2(key, path);
					} 
					str = this.getDir(dir[i][key], str, path);
				}
			}
			path.pop();
		}
		return str;
	},
	//执行入口
	run: function(dir){
		var result = '';
		for(var key in dir){
			result = this.getRoot(key) + this.getBase1([]);
			if(dir[key].length){
				result = this.getDir(dir[key], result, []);
			}
		}
		return result;
	}
}