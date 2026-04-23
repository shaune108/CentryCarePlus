<?php extract(template_vars(['post', 'target' => false])) ?>

<div class="post-card">
     <div class="Card-Header">
                <div class="Card-Header-BG">
             <i class="fa-duotone fa-file-lines"><!--Icon--></i>
                    </div>
                </div>
	<h2 class="post-card-title">

		<?= $post->title ?>

	</h2>



	<p class="post-card-description">

		<?php

		if (strlen($post->description) > 200) {

			print substr($post->description, 0, 197) . '...';

		} else print $post->description;

		?>

	</p>



	<a

		href="<?= $post->getPermalink() ?>"

		class="post-card-readmore"

		<?= $target ? "target=\"$target\"" : '' ?>

	>

		Read more

	</a>
</div>

