// @ts-nocheck

var btt = {
	Ani: false,
	Disabled: false,
	Start: $(window).height() * 0.25,
}

$(document).ready(function () {
	$('#BackToTop').on('click tap', function () {
		$('html, body').animate({ scrollTop: '0px' }, 500)
		btt.Ani = true
		$('.BackToTop')
			.stop()
			.animate({ opacity: 0 }, 500, function () {
				$('.BackToTop').css({ visibility: 'hidden' })
				btt.Ani = false
			})
	})

	$('#CloseBTT').on('click touchstart', function () {
		btt.Ani = true
		btt.Disabled = true
		$('.BackToTop')
			.stop()
			.animate({ opacity: 0 }, 500, function () {
				$('.BackToTop').css({ visibility: 'hidden' })
				btt.Ani = false
			})
	})

	$(window).on('wheel touchmove', function () {
		var scroll = $(window).scrollTop()
		if (!btt.Ani && !btt.Disabled) {
			if (btt.Start < scroll) {
				btt.Ani = true
				$('.BackToTop')
					.stop()
					.css({ visibility: 'visible' })
					.animate({ opacity: 1 }, 500, function () {
						btt.Ani = false
					})
			} else {
				btt.Ani = true
				$('.BackToTop')
					.stop()
					.animate({ opacity: 0 }, 500, function () {
						$('.BackToTop').css({ visibility: 'hidden' })
						btt.Ani = false
					})
			}
		}
	})

	$(window)
		.on('resize', function () {
			if ($(window).width() < 1050) {
				//$("html, body").css({ width: $(window).width() });
				$('#SMS').show()
			} else {
				//$("html, body").css({ width: $(window).width() });
				$('#SMS').hide()
			}
		})
		.resize()
})
