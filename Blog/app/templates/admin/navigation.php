<?php
$config = EZPost\Config::getInstance();
?>
<nav class="admin-navigation">
	<h1>
		<?= $config->get('app_name') ?>
	</h1>

	<button
		class="nav-toggle button"
		type="button"
	>
		<span class="open">
			<i class="fa-solid fa-bars"></i>
			Menu
		</span>

		<span class="close">
			<i class="fa-solid fa-times"></i>
			Close
		</span>
	</button>

	<div class="admin-menu">
		<a
			href="<?= resolve_url('admin/dashboard') ?>"
			class="menu-item"
		>
			Dashboard
		</a>

		<a
			href="<?= resolve_url('admin/edit') ?>"
			class="menu-item"
		>
			Create Post
		</a>

		<a
			href="<?= resolve_url('admin/settings') ?>"
			class="menu-item"
		>
			Settings
		</a>

		<a
			href="https://brazzellmarketing.com/Home-Health-Websites/Help-Files/EZPost.html"
			class="menu-item"
			target="_blank"
		>
			Help Files
		</a>

		<a
			class="menu-item"
			href="<?= resolve_url('admin/login?logout=true') ?>"
		>
			Logout
		</a>
	</div>
</nav>