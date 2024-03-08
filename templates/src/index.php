<?php
$root_path = $_SERVER['DOCUMENT_ROOT'];
include($root_path . '/partials/head.php');
?>

<nav class="navigation" data-component='{ "component": "navigation" }'>
	<div class="container">
		<div class="navigation__inner">
			<a href="#" class="navigation__logo">
				<img class="navigation__logo__image" src="/assets/images/logo.svg" alt="Segelteam">
			</a>

			<div class="navigation__main">
				<ul class="navigation__links">
					<li>
						<a class="navigation__links__item label color-light" href="#">About us</a>
					</li>
					<li>
						<a class="navigation__links__item label color-light" href="#">Gallery</a>
					</li>
					<li>
						<a class="navigation__links__item label color-light" href="#">Crew</a>
					</li>
				</ul>

				<?php echo generate_component_button([
					'label' => 'Contact',
					'href' =>'#contact',
					'class' => 'navigation__button',
					'icon' => 'arrow-right',
					'icon_type' => 'symbol',
					'icon_right' => true,
				]) ?>
			</div>

			<div class="navigation__mobile-toggle js-navigation__mobile-toggle">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	</div>
</nav>

<section class="hero">
	<div class="hero__main">
		<div class="hero__visual">
			<?php echo generate_component_image([
				'sources' => [
					[
						'src' => '/assets/images/hero.jpg',
						'width' => 1920,
					]
				],
				'alt' => 'Segeln',
				'class' => 'hero__visual__image',
			]) ?>
		</div>
		<div class="hero__inner container">
			<div class="hero__inner__content">
				<?php echo generate_component_headline([
					'label' => 'This is my headline',
					'tag' => 'h1',
					'tag_class' => 'h1',
					'class' => 'hero__headline color-light'
				]); ?>
				<div class="hero__text copy color-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus
					massa est scelerisque penatibus. </div>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="hero__teasers">
			<?php for ($i = 0; $i < 3; $i++) {
				$style = null;
				$illustration = null;
				if ($i == 1)
					$style = 'black';
				if ($i == 2)
					$illustration = '/assets/images/map.svg';
				echo generate_component_teaser([
					'style' => $style,
					'illustration' => $illustration,
					'uptitle' => '0' . $i + 1 . ' Mai',
					'headline' => [
						'label' => 'My teaser title',
						'tag' => 'h2',
						'tag_class' => $i < 2 ? 'h5' : 'h3',
					],
					'subtitle' => 'Subtitle',
					'text' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				]);
			} ?>
		</div>
	</div>
</section>

<section class="text-content">
	<div class="container">
		<div class="text-content__inner">
			<div class="text-content__top">
				<?php echo generate_component_headline([
					'label' => 'This is my headline',
					'tag' => 'h2',
					'tag_class' => 'h2',
					'class' => 'text-content__headline'
				]); ?>
				<?php echo generate_component_headline([
					'label' => 'Subtitle goes here',
					'tag' => 'div',
					'tag_class' => 'h5',
					'class' => 'text-content__subtitle'
				]); ?>
			</div>
			<div class="text-content__text copy">
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
				rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
				explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
				consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
				dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
				incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Lorem ipsum dolor sit amet, consectetur
				adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
				Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
				laborum.
			</div>
		</div>
	</div>
</section>

<section class="visual">
	<div class="container">
		<div class="visual__inner">
			<div class="visual__visual">
				<?php echo generate_component_image([
					'sources' => [
						[
							'src' => '/assets/images/visual.jpg',
							'width' => 810,
						],
					],
					'class' => 'visual__visual__image',
				]); ?>
			</div>
		</div>
	</div>
</section>
<crew-section data-component='{"factory": "vue"}' />
<footer-site data-component='{"factory": "vue"}' />



<?php include($root_path . '/partials/foot.php'); ?>