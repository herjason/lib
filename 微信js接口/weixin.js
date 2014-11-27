//WeixinJSBridge内置对象加载完成函数
function weixinReady(onBridgeReady)
{
	if (typeof WeixinJSBridge == "undefined"){
		if( document.addEventListener ){
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		}else if (document.attachEvent){
			document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
			document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		}
	}else{
		onBridgeReady();
	}
}

weixinReady(function onBridgeReady()
{
  	//发送给朋友
	WeixinJSBridge.on('menu:share:appmessage', function(argv){
		WeixinJSBridge.invoke('sendAppMessage',{ 
			//"appid":appId, 
			"img_url":sp['image_thumb'], 
			//"img_width":"640", 
			//"img_height":"640", 
			"link":location.href+'&agent_code='+agent_code, 
			"desc":sp['special_remark'], 
			"title":'超值！使用订么预约享特价，到店只需'+formatMoney(sp['price']).replace('&yen;','￥')+'享受原价'+formatMoney(sp['old_price']).replace('&yen;','￥')+'的'+sp['title']
		},function(res){
	            // 返回res.err_msg,取值
								/*经测试，不存在以下三个情况
								share_timeline:cancel 用户取消
								share_timeline:fail　发送失败
								share_timeline:ok 发送成功 */
				//经测试，返回值为以下两个情况：点击“取消”或“发送”
				//ios返回的情况：
					//send_app_msg:cancel用户取消
					//send_app_msg:confirm点击发送
				//安卓返回的情况：
					//send_app_msg:cancel用户取消
					//send_app_msg:ok点击发送
	            WeixinJSBridge.log(res.err_msg);
	        }); 
	//weixinSendAppMessage(sp['title'],sp['note'],'http://wechat.dingmore.com?sid='+store['store_id']+'&mid='+sp['menu_item_id']+'&agent_code='+agent_code,sp['image_thumb']);
	});
	//分享到朋友圈
	WeixinJSBridge.on('menu:share:timeline', function(argv){
		 WeixinJSBridge.invoke('shareTimeline',{ 
			//"appid":appId, 
			"img_url":sp['image_thumb'], 
			//"img_width":"640", 
			//"img_height":"640", 
			"link":location.href+'&agent_code='+agent_code, 
			"desc":sp['special_remark'], 
			"title":'超值！使用订么预约享特价，到店只需'+formatMoney(sp['price']).replace('&yen;','￥')+'享受原价'+formatMoney(sp['old_price']).replace('&yen;','￥')+'的'+sp['title']
		},function(res){
	            // 返回res.err_msg,取值
								/*经测试，不存在以下这个情况
								share_timeline:fail　发送失败
								*/
				//经测试，返回值为以下两个情况：点击“取消”或“发送”
				//ios返回的情况：
					//share_timeline:cancel 用户取消
					//share_timeline:ok 点击发送
				//安卓返回的情况：
					//share_timeline:ok用户取消和点击发送均返回该消息
	            WeixinJSBridge.log(res.err_msg);
	        }); 
		//weixinShareTimeline(sp['name'],sp['note'],'http://wechat.dingmore.com?sid='+store['store_id']+'&mid='+sp['menu_item_id'],sp['image_thumb']);
	});
	// 分享到微博;
	WeixinJSBridge.on('menu:share:weibo', function(argv){
		WeixinJSBridge.invoke('shareWeibo',{
			"content":title + link,
			"url":link,
			}, function(res) {
		});
	});
	//隐藏右上角的选项菜单入口;
	WeixinJSBridge.call('hideOptionMenu');
	}, false);
	//关闭微信浏览器窗口
	WeixinJSBridge.call('closeWindow');
	//打开微信图片浏览器
	WeixinJSBridge.invoke('imagePreview',{
	   'current' : curSrc,//curSrc为当前浏览显示的图片地址
	   'urls' : srcList//srcList为图片浏览器图片数组的json字符串
	}）;

});