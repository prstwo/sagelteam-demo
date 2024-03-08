import generateIcon from 'Models/icon';

export default function generateButton (customSettings = {}) {
	const defaultSettings = {
		style: 'primary',
		size: 'default',
		tag: 'a',
		href: false,
		label: false,
		icon: false,
		iconType: 'inline',
		iconRight: false,
		secondaryIcon: false,
		secondaryIconType: 'inline',
		secondaryIconRight: false,
		class: false,
		customAttribute: false,
		target: false,
	};
	const settings = { ...defaultSettings, ...customSettings };

	const iconOnly = settings.icon && !settings.label;

	return `<${settings.tag}${settings.href ? ` href="${settings.href}"` : ''}${settings.target ? ` target="${settings.target}"` : ''} class="button button--style--${settings.style} button--size--${settings.size}${iconOnly ? ' button--icon-only' : ''}${settings.class ? ` ${settings.class}` : ''}"${settings.customAttribute ? ` ${settings.customAttribute}` : ''}>
		<div class="button__inner">
			${settings.secondaryIcon ? generateIcon(settings.secondaryIcon, settings.secondaryIconRight === 'symbol', `button__icon button__icon--secondary${settings.secondaryIconRight ? ' button__icon--secondary--right' : ''}`) : ''}
			${settings.icon ? generateIcon(settings.icon, settings.iconType === 'symbol', `button__icon${settings.iconRight ? ' button__icon--right' : ''}`) : ''}
			${settings.label ? `<span class="button__label">${settings.label}</span>` : ''}
		</div>
	</${settings.tag}>`;
}
