jQuery(document).ready(function($){
	$('.cu-turnround-default').TurnRound().ready(function(){
		setCuImgSize();
	});
	$(window).resize(function(){
		setCuImgSize();
	});


	var setCuImgSize = function(){
		var originalWidth = 0,
			originalHeight = 0,
			paddingBottom = 0;
		$('.cu-turnround-default').each(function(){
			originalWidth = $(this).attr('data-cuturnroundow');
			originalHeight = $(this).attr('data-cuturnroundoh');
			paddingBottom = originalHeight * 100 / originalWidth;
			currentWidth = $(this).width();
			if(currentWidth < originalWidth){
				$(this).css({
					'width': '100%',
					'height': 0,
					'padding-bottom': paddingBottom + '%'
				});
			}else{
				$(this).css({
					'width': originalWidth,
					'height': originalHeight,
					'padding-bottom': 0
				});
			}
		});
	};
});