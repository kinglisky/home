$(document).ready(function () {
	var ME = {
		DOM: {
			$menusWra: $('#menus-wra'),
			$goTopBtn: $('#go-top'),
			$menusBtn: $('#menus-btn'),
			$menusCloseBtn: $('#menus-btn').children().eq(0),
			$menusOpenBtn: $('#menus-btn').children().eq(1),
			$headerMark: $('#header-mark'),
			$page: $('html, body'),
			$body: $('body')
		},
		USE: {
			menuBtnStatus: false,
			bodyMTop: null,
			statuBtns: null
		},
		METHODS: {

		}
	};
	ME.USE.bodyMTop = (ME.DOM.$menusWra.height() + 70) | 0;

	ME.USE.statuBtns = [ME.DOM.$menusCloseBtn, ME.DOM.$menusOpenBtn];
	// 让页面滚到目标位置的
	ME.METHODS.scrollTo = function (dest, offset,dt) {
		var top = 0;
		if (dest) {
			top = (dest.offset().top + (offset || 0)) | 0;
		}
		ME.DOM.$page.animate({
			scrollTop: top
		}, dt||1000, 'swing');
	};
	// 改变关闭按钮的显示状态
	ME.METHODS.changeBtnStatus = function (status) {
		var showBtn, hiddenBtn, btns = ME.USE.statuBtns;
		showBtn = btns[status | 0];
		hiddenBtn = btns[(!status) | 0];
		showBtn.show(300);
		hiddenBtn.hide(300);

	};
	//	回到顶部
	ME.DOM.$goTopBtn.on('click', function (event) {
		ME.METHODS.scrollTo(null,800);
	});
	//	目录开关
	ME.DOM.$menusBtn.on('click', function (event) {
		var status = ME.USE.menuBtnStatus,
			animteSet = null;
		animteSet = status ? {
			"margin-top": '3%'
		} : {
			"margin-top": ME.USE.bodyMTop + 'px'
		};
		ME.METHODS.changeBtnStatus(status);
		ME.DOM.$body.animate(animteSet, 800, 'swing');
		ME.USE.menuBtnStatus = !status;
	});
	//	滚动到目的锚点
	ME.DOM.$menusWra.on('click', 'div>nav>a', function (event) {
		event.preventDefault();
		var dest = $(this).attr('href'),
			$dest = $(dest);
		if (!$dest) return console.log('目标不存在！');
		ME.METHODS.scrollTo($dest,-20);

	});
});
