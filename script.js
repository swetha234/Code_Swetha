$(document).ready(function() {
	$(document).on('click', '.like-btn', function() {
		// if the user clicks on the like button ...
		var post_id = $(this).data('id');
		var users_id = $(this).data('id1');

		$clicked_btn = $(this);
		if ($clicked_btn.hasClass('fa-thumbs-o-up')) {
			action = 'like';
		} else if ($clicked_btn.hasClass('fa-thumbs-up')) {
			action = 'unlike';
		}

		$.ajax({
			type: 'post',
			data: {
				action: action,
				post_id: post_id,
				users_id: users_id
			}, 
			success: function(data) {
				res = JSON.parse(data);
				if (action == 'like') {
					$clicked_btn.removeClass('fa-thumbs-o-up');
					$clicked_btn.addClass('fa-thumbs-up');
				} else if (action == 'unlike') {
					$clicked_btn.removeClass('fa-thumbs-up');
					$clicked_btn.addClass('fa-thumbs-o-up');
				}
				// display the number of likes and dislikes
				$clicked_btn.siblings('span.likes').text(res.likes);
				$clicked_btn.siblings('span.dislikes').text(res.dislikes);

				// change button styling of the other button if user is reacting the second time to post
				$clicked_btn
					.siblings('i.fa-thumbs-down')
					.removeClass('fa-thumbs-down')
					.addClass('fa-thumbs-o-down');
			}
		});
	});
});